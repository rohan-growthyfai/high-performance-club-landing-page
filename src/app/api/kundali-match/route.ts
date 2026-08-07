import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { generateMatchReport } from "@/lib/kundali/report";

/**
 * Kundali Match — compatibility report API.
 *
 * Takes two people (name + date of birth only) and returns a fully-sourced
 * Ashtakoota (36-point Guna Milan) compatibility report computed from the
 * real sidereal Moon position. Nothing interpretive is invented — every
 * koota carries its classical-text citation.
 *
 * A row is (best-effort) logged to Neon table `kundali_matches` so demand
 * can be measured during the free MVP. A DB hiccup never blocks the report.
 *
 * POST /api/kundali-match
 *   body: { boyName, boyDob, girlName, girlDob }  (dob = YYYY-MM-DD)
 *
 * Env: DATABASE_URL (optional — logging is skipped if absent)
 */

export const runtime = "nodejs"; // astronomia + ephemeris math needs Node runtime

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function validDate(s: string): boolean {
  if (!DATE_RE.test(s)) return false;
  const [y, m, d] = s.split("-").map(Number);
  if (m < 1 || m > 12 || d < 1 || d > 31) return false;
  const dt = new Date(Date.UTC(y, m - 1, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d) return false;
  // Reasonable range.
  const year = y;
  return year >= 1900 && year <= 2100;
}

async function logMatch(row: {
  boyName: string; boyDob: string; girlName: string; girlDob: string;
  score: number; verdict: string;
}) {
  if (!process.env.DATABASE_URL) return;
  try {
    const sql = neon(process.env.DATABASE_URL);
    await sql`
      CREATE TABLE IF NOT EXISTS kundali_matches (
        id BIGSERIAL PRIMARY KEY,
        boy_name TEXT, boy_dob DATE,
        girl_name TEXT, girl_dob DATE,
        score NUMERIC, verdict TEXT,
        created_at TIMESTAMPTZ DEFAULT now()
      )`;
    await sql`
      INSERT INTO kundali_matches (boy_name, boy_dob, girl_name, girl_dob, score, verdict)
      VALUES (${row.boyName}, ${row.boyDob}, ${row.girlName}, ${row.girlDob}, ${row.score}, ${row.verdict})`;
  } catch (e) {
    console.error("[kundali-match] log failed (non-fatal):", e);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const boyName = String(body.boyName || "").trim();
    const boyDob = String(body.boyDob || "").trim();
    const girlName = String(body.girlName || "").trim();
    const girlDob = String(body.girlDob || "").trim();

    if (!boyName || !girlName) {
      return NextResponse.json({ ok: false, error: "Both names are required." }, { status: 400 });
    }
    if (!validDate(boyDob) || !validDate(girlDob)) {
      return NextResponse.json(
        { ok: false, error: "Both dates of birth must be valid dates (YYYY-MM-DD) between 1900 and 2100." },
        { status: 400 }
      );
    }

    const report = generateMatchReport(
      { name: boyName, dob: boyDob },
      { name: girlName, dob: girlDob }
    );

    // Fire-and-forget demand logging.
    void logMatch({
      boyName, boyDob, girlName, girlDob,
      score: report.ashtakoota.totalScore,
      verdict: report.verdict.label,
    });

    return NextResponse.json({ ok: true, report });
  } catch (e) {
    console.error("[kundali-match] error:", e);
    return NextResponse.json(
      { ok: false, error: "Could not generate the compatibility report. Please check the dates and try again." },
      { status: 500 }
    );
  }
}
