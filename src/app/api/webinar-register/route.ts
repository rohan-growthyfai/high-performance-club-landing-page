import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

/**
 * Webinar registration — "Stop Starting Over With Weight Loss".
 *
 * Captures a normal registration form (name + email + WhatsApp) from the
 * /weight-habits-webinar landing page, saves it to Neon, and (best-effort)
 * pings the WhatsApp engine so the registrant can receive the pre-webinar
 * sequence. Table is auto-created on first write — no migration needed.
 *
 * POST /api/webinar-register
 *   body: { name, email, whatsapp, referredBy? }
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
    const email = String(body.email || "").trim();
    const whatsapp = normalizePhone(body.whatsapp || "");
    const referredBy = String(body.referredBy || "").trim();

    if (!name || whatsapp.length < 8 || !email.includes("@")) {
      return NextResponse.json(
        { error: "name, valid email and whatsapp required" },
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
          CREATE TABLE IF NOT EXISTS webinar_registrations (
            id            SERIAL PRIMARY KEY,
            name          TEXT NOT NULL,
            email         TEXT NOT NULL,
            whatsapp      TEXT NOT NULL,
            webinar       TEXT NOT NULL DEFAULT 'weight-habits',
            referred_by   TEXT,
            source        TEXT DEFAULT 'landing',
            created_at    TIMESTAMPTZ DEFAULT now(),
            UNIQUE (whatsapp, webinar)
          )`;
        const rows = (await sql`
          INSERT INTO webinar_registrations
            (name, email, whatsapp, webinar, referred_by, source)
          VALUES
            (${name}, ${email}, ${whatsapp}, 'weight-habits', ${referredBy}, 'landing')
          ON CONFLICT (whatsapp, webinar) DO UPDATE SET
            name  = EXCLUDED.name,
            email = COALESCE(NULLIF(EXCLUDED.email, ''), webinar_registrations.email),
            referred_by = COALESCE(NULLIF(EXCLUDED.referred_by, ''), webinar_registrations.referred_by)
          RETURNING id`) as Array<{ id: number }>;
        registrationId = rows?.[0]?.id ?? null;
      } catch (e) {
        console.error("[webinar-register] neon write failed:", e);
      }
    } else {
      console.warn("[webinar-register] DATABASE_URL not set — skipping DB save");
    }

    // ── Best-effort: notify WhatsApp engine for the pre-webinar sequence ──
    const engineUrl = process.env.WA_ENGINE_URL;
    if (engineUrl) {
      try {
        await fetch(`${engineUrl}/webinar-register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, whatsapp, webinar: "weight-habits", referredBy }),
          signal: AbortSignal.timeout(8000),
        });
      } catch {
        // Engine not reachable — the registration is already saved in Neon.
      }
    }

    return NextResponse.json({ ok: true, registrationId });
  } catch (err) {
    console.error("[webinar-register] error:", err);
    // Return ok so transient backend issues never show the user an error.
    return NextResponse.json({ ok: true });
  }
}
