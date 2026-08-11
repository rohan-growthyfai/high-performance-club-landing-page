import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

/**
 * 5-Minute Body Challenge registration.
 *
 * Captures a free-challenge registration (name + WhatsApp + chosen session)
 * from the /5minbodychallenge landing page, saves it to Neon, and
 * (best-effort) pings the WhatsApp engine so the registrant can receive the
 * daily challenge sequence. Table is auto-created on first write.
 *
 * POST /api/5minbody-register
 *   body: { name, whatsapp, session?, referredBy? }
 * Returns: { ok, registrationId? }
 *
 * Env: DATABASE_URL, WA_ENGINE_URL (optional)
 */

function normalizePhone(p: string): string {
  let clean = String(p || "").replace(/[\s\-()]/g, "");
  if (!clean.startsWith("+")) clean = "+" + clean;
  return clean;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const whatsapp = normalizePhone(body.whatsapp || "");
    const session = String(body.session || "").trim().toLowerCase(); // "morning" | "evening" | ""
    const referredBy = String(body.referredBy || "").trim();

    if (!name || whatsapp.length < 8) {
      return NextResponse.json(
        { error: "name and valid whatsapp required" },
        { status: 400 }
      );
    }

    // ── Save to Neon (best-effort; never block the user on DB issues) ──
    const dbUrl = process.env.DATABASE_URL;
    let registrationId: number | null = null;
    if (dbUrl) {
      try {
        const sql = neon(dbUrl);
        await sql`
          CREATE TABLE IF NOT EXISTS fivemin_registrations (
            id            SERIAL PRIMARY KEY,
            name          TEXT NOT NULL,
            whatsapp      TEXT NOT NULL,
            session       TEXT,
            challenge     TEXT NOT NULL DEFAULT '5min-body',
            referred_by   TEXT,
            source        TEXT DEFAULT 'landing',
            created_at    TIMESTAMPTZ DEFAULT now(),
            UNIQUE (whatsapp, challenge)
          )`;
        const rows = (await sql`
          INSERT INTO fivemin_registrations
            (name, whatsapp, session, challenge, referred_by, source)
          VALUES
            (${name}, ${whatsapp}, ${session}, '5min-body', ${referredBy}, 'landing')
          ON CONFLICT (whatsapp, challenge) DO UPDATE SET
            name    = EXCLUDED.name,
            session = COALESCE(NULLIF(EXCLUDED.session, ''), fivemin_registrations.session),
            referred_by = COALESCE(NULLIF(EXCLUDED.referred_by, ''), fivemin_registrations.referred_by)
          RETURNING id`) as Array<{ id: number }>;
        registrationId = rows?.[0]?.id ?? null;
      } catch (e) {
        console.error("[5minbody-register] neon write failed:", e);
      }
    } else {
      console.warn("[5minbody-register] DATABASE_URL not set — skipping DB save");
    }

    // ── Best-effort: notify WhatsApp engine for the daily challenge sequence ──
    const engineUrl = process.env.WA_ENGINE_URL;
    if (engineUrl) {
      try {
        await fetch(`${engineUrl}/5minbody-register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, whatsapp, session, challenge: "5min-body", referredBy }),
          signal: AbortSignal.timeout(8000),
        });
      } catch {
        // Engine not reachable — the registration is already saved in Neon.
      }
    }

    return NextResponse.json({ ok: true, registrationId });
  } catch (err) {
    console.error("[5minbody-register] error:", err);
    // Return ok so transient backend issues never show the user an error.
    return NextResponse.json({ ok: true });
  }
}
