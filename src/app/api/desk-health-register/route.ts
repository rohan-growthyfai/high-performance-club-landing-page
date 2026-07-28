import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

/**
 * Desk Health System™ — free webinar registration.
 *
 * Captures name + email + WhatsApp from the /desk-health-system landing page.
 *
 * Primary sink  → Google Sheet, via a Google Apps Script Web App URL
 *                  (env: DESK_HEALTH_SHEET_WEBHOOK). No Google credentials
 *                  are needed on our side — the Apps Script owns the sheet.
 * Backup sink   → Neon table `webinar_registrations` (webinar='desk-health'),
 *                  so a lead is never lost even if the Sheet webhook is down.
 *
 * The response is always { ok: true } on the happy path so a transient
 * backend hiccup never shows the visitor an error after they registered.
 *
 * POST /api/desk-health-register
 *   body: { name, email, whatsapp, referredBy? }
 *
 * Env: DESK_HEALTH_SHEET_WEBHOOK (Apps Script URL), DATABASE_URL (optional)
 */

const WEBINAR_KEY = "desk-health";

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

    // ── Primary: append a row to the Google Sheet (Apps Script Web App) ──
    const sheetWebhook = process.env.DESK_HEALTH_SHEET_WEBHOOK;
    if (sheetWebhook) {
      try {
        await fetch(sheetWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            whatsapp,
            webinar: WEBINAR_KEY,
            referredBy,
            source: "landing",
            timestamp: new Date().toISOString(),
          }),
          signal: AbortSignal.timeout(8000),
        });
      } catch (e) {
        console.error("[desk-health-register] sheet webhook failed:", e);
      }
    } else {
      console.warn(
        "[desk-health-register] DESK_HEALTH_SHEET_WEBHOOK not set — skipping Sheet append"
      );
    }

    // ── Backup: mirror into Neon (never block the user on DB issues) ──
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
            (${name}, ${email}, ${whatsapp}, ${WEBINAR_KEY}, ${referredBy}, 'landing')
          ON CONFLICT (whatsapp, webinar) DO UPDATE SET
            name  = EXCLUDED.name,
            email = COALESCE(NULLIF(EXCLUDED.email, ''), webinar_registrations.email),
            referred_by = COALESCE(NULLIF(EXCLUDED.referred_by, ''), webinar_registrations.referred_by)
          RETURNING id`) as Array<{ id: number }>;
        registrationId = rows?.[0]?.id ?? null;
      } catch (e) {
        console.error("[desk-health-register] neon write failed:", e);
      }
    }

    return NextResponse.json({ ok: true, registrationId });
  } catch (err) {
    console.error("[desk-health-register] error:", err);
    // Return ok so transient backend issues never show the user an error.
    return NextResponse.json({ ok: true });
  }
}
