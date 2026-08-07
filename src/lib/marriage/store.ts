/**
 * Marriage Intelligence Platform — pairing & persistence (Neon)
 * -------------------------------------------------------------
 * A "match" pairs two people who each answer INDEPENDENTLY via their own
 * unique link. The report unlocks only when both have completed.
 *
 * Flow:
 *   1. Person A starts  -> creates a match, gets a match code + two invite
 *      tokens (one for self, one to share with Person B).
 *   2. Each person opens their token link, answers, submits.
 *   3. When both submitted -> status "complete" -> report can be generated.
 *
 * Tables (auto-created, best-effort):
 *   marriage_matches   — one row per pairing
 *   marriage_responses — one row per person's submitted answers
 *
 * Env: DATABASE_URL (Neon). All functions no-op-safe if it's missing.
 */

import { neon } from "@neondatabase/serverless";
import { randomUUID } from "crypto";
import { AnswerMap } from "./types";

export type Slot = "a" | "b";

export interface MatchRow {
  code: string;
  tokenA: string;
  tokenB: string;
  nameA: string | null;
  nameB: string | null;
  submittedA: boolean;
  submittedB: boolean;
  status: "pending" | "complete";
  createdAt: string;
}

function db() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not configured");
  return neon(url);
}

let ensured = false;
async function ensureTables() {
  if (ensured) return;
  const sql = db();
  await sql`
    CREATE TABLE IF NOT EXISTS marriage_matches (
      code       TEXT PRIMARY KEY,
      token_a    TEXT UNIQUE NOT NULL,
      token_b    TEXT UNIQUE NOT NULL,
      name_a     TEXT,
      name_b     TEXT,
      submitted_a BOOLEAN DEFAULT FALSE,
      submitted_b BOOLEAN DEFAULT FALSE,
      status     TEXT DEFAULT 'pending',
      created_at TIMESTAMPTZ DEFAULT now()
    )`;
  await sql`
    CREATE TABLE IF NOT EXISTS marriage_responses (
      id         BIGSERIAL PRIMARY KEY,
      code       TEXT NOT NULL REFERENCES marriage_matches(code),
      slot       TEXT NOT NULL,
      name       TEXT,
      dob        TEXT,
      birth_time TEXT,
      birth_place TEXT,
      answers    JSONB NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now(),
      UNIQUE (code, slot)
    )`;
  ensured = true;
}

/** Short, human-shareable, unambiguous code (no confusing chars). */
function shortCode(len = 6): string {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // no I,L,O,0,1
  const bytes = randomUUID().replace(/-/g, "");
  let out = "";
  for (let i = 0; i < len; i++) {
    out += alphabet[parseInt(bytes[i], 16) % alphabet.length];
  }
  return out;
}

/** Create a new match. Returns the code + both invite tokens. */
export async function createMatch(starterName: string, starterSlot: Slot = "a"): Promise<{
  code: string; tokenA: string; tokenB: string; selfToken: string; partnerToken: string;
}> {
  await ensureTables();
  const sql = db();
  const code = shortCode();
  const tokenA = randomUUID();
  const tokenB = randomUUID();
  const nameA = starterSlot === "a" ? starterName : null;
  const nameB = starterSlot === "b" ? starterName : null;
  await sql`
    INSERT INTO marriage_matches (code, token_a, token_b, name_a, name_b)
    VALUES (${code}, ${tokenA}, ${tokenB}, ${nameA}, ${nameB})`;
  return {
    code, tokenA, tokenB,
    selfToken: starterSlot === "a" ? tokenA : tokenB,
    partnerToken: starterSlot === "a" ? tokenB : tokenA,
  };
}

/** Resolve a token to its match + which slot it belongs to. */
export async function resolveToken(token: string): Promise<{ match: MatchRow; slot: Slot } | null> {
  await ensureTables();
  const sql = db();
  const rows = (await sql`
    SELECT * FROM marriage_matches WHERE token_a = ${token} OR token_b = ${token} LIMIT 1`) as Array<Record<string, unknown>>;
  if (!rows.length) return null;
  const r = rows[0];
  const slot: Slot = r.token_a === token ? "a" : "b";
  return { match: rowToMatch(r), slot };
}

export async function getMatch(code: string): Promise<MatchRow | null> {
  await ensureTables();
  const sql = db();
  const rows = (await sql`SELECT * FROM marriage_matches WHERE code = ${code} LIMIT 1`) as Array<Record<string, unknown>>;
  return rows.length ? rowToMatch(rows[0]) : null;
}

/** Save a person's answers and mark their slot submitted. Flips status when both are in. */
export async function submitResponse(params: {
  token: string;
  name: string;
  answers: AnswerMap;
  dob?: string;
  birthTime?: string;
  birthPlace?: string;
}): Promise<{ ok: boolean; code: string; slot: Slot; bothComplete: boolean } | { ok: false; error: string }> {
  await ensureTables();
  const resolved = await resolveToken(params.token);
  if (!resolved) return { ok: false, error: "This link is invalid or has expired." };
  const { match, slot } = resolved;
  const sql = db();

  await sql`
    INSERT INTO marriage_responses (code, slot, name, dob, birth_time, birth_place, answers)
    VALUES (${match.code}, ${slot}, ${params.name}, ${params.dob ?? null}, ${params.birthTime ?? null}, ${params.birthPlace ?? null}, ${JSON.stringify(params.answers)})
    ON CONFLICT (code, slot) DO UPDATE SET
      name = EXCLUDED.name, dob = EXCLUDED.dob, birth_time = EXCLUDED.birth_time,
      birth_place = EXCLUDED.birth_place, answers = EXCLUDED.answers, created_at = now()`;

  if (slot === "a") {
    await sql`UPDATE marriage_matches SET submitted_a = TRUE, name_a = ${params.name} WHERE code = ${match.code}`;
  } else {
    await sql`UPDATE marriage_matches SET submitted_b = TRUE, name_b = ${params.name} WHERE code = ${match.code}`;
  }

  const updated = await getMatch(match.code);
  const bothComplete = Boolean(updated?.submittedA && updated?.submittedB);
  if (bothComplete && updated?.status !== "complete") {
    await sql`UPDATE marriage_matches SET status = 'complete' WHERE code = ${match.code}`;
  }
  return { ok: true, code: match.code, slot, bothComplete };
}

export interface StoredResponse {
  slot: Slot;
  name: string;
  dob?: string;
  birthTime?: string;
  birthPlace?: string;
  answers: AnswerMap;
}

/** Fetch both people's responses for a completed match. */
export async function getResponses(code: string): Promise<StoredResponse[]> {
  await ensureTables();
  const sql = db();
  const rows = (await sql`SELECT slot, name, dob, birth_time, birth_place, answers FROM marriage_responses WHERE code = ${code}`) as Array<Record<string, unknown>>;
  return rows.map((r) => ({
    slot: r.slot as Slot,
    name: (r.name as string) || "",
    dob: (r.dob as string) || undefined,
    birthTime: (r.birth_time as string) || undefined,
    birthPlace: (r.birth_place as string) || undefined,
    answers: (r.answers as AnswerMap) || {},
  }));
}

function rowToMatch(r: Record<string, unknown>): MatchRow {
  return {
    code: r.code as string,
    tokenA: r.token_a as string,
    tokenB: r.token_b as string,
    nameA: (r.name_a as string) ?? null,
    nameB: (r.name_b as string) ?? null,
    submittedA: Boolean(r.submitted_a),
    submittedB: Boolean(r.submitted_b),
    status: (r.status as "pending" | "complete") ?? "pending",
    createdAt: String(r.created_at ?? ""),
  };
}
