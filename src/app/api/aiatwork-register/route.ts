import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

/**
 * AI at Work™ — free 14-day LIVE series registration.
 *
 * Captures name + email + WhatsApp from the /aiatwork landing page, then
 * (optionally) enriches with a light profile — work role + what they want AI
 * to help with — which the modal asks AFTER the lead is already captured.
 *
 * Primary sink  → Google Sheet, via a Google Apps Script Web App URL
 *                  (env: AIATWORK_SHEET_WEBHOOK), if configured.
 * Backup sink   → Neon table `aiatwork_registrations`, so a lead is never lost
 *                  even if the Sheet webhook is down or absent.
 *
 * The response is always { ok: true } on the happy path so a transient backend
 * hiccup never shows the visitor an error after they registered.
 *
 * POST /api/aiatwork-register
 *   body: { name, email, whatsapp, role?, focus?, referredBy? }
 *
 * Env: AIATWORK_SHEET_WEBHOOK (Apps Script URL, optional), DATABASE_URL (optional)
 */

const SERIES_KEY = "aiatwork";

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
    const role = String(body.role || "").trim();
    const focus = String(body.focus || "").trim();
    const referredBy = String(body.referredBy || "").trim();

    if (!name || whatsapp.length < 8 || !email.includes("@")) {
      return NextResponse.json(
        { error: "name, valid email and whatsapp required" },
        { status: 400 }
      );
    }

    // ── Primary: append a row to the Google Sheet (Apps Script Web App) ──
    const sheetWebhook = process.env.AIATWORK_SHEET_WEBHOOK;
    if (sheetWebhook) {
      try {
        await fetch(sheetWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            whatsapp,
            role,
            focus,
            series: SERIES_KEY,
            referredBy,
            source: "landing",
            timestamp: new Date().toISOString(),
          }),
          signal: AbortSignal.timeout(8000),
        });
      } catch (e) {
        console.error("[aiatwork-register] sheet webhook failed:", e);
      }
    }

    // ── Backup: mirror into Neon (never block the user on DB issues) ──
    const dbUrl = process.env.DATABASE_URL;
    let registrationId: number | null = null;
    if (dbUrl) {
      try {
        const sql = neon(dbUrl);
        await sql`
          CREATE TABLE IF NOT EXISTS aiatwork_registrations (
            id            SERIAL PRIMARY KEY,
            name          TEXT NOT NULL,
            email         TEXT NOT NULL,
            whatsapp      TEXT NOT NULL,
            role          TEXT,
            focus         TEXT,
            referred_by   TEXT,
            source        TEXT DEFAULT 'landing',
            created_at    TIMESTAMPTZ DEFAULT now(),
            UNIQUE (whatsapp)
          )`;
        const rows = (await sql`
          INSERT INTO aiatwork_registrations
            (name, email, whatsapp, role, focus, referred_by, source)
          VALUES
            (${name}, ${email}, ${whatsapp}, ${role}, ${focus}, ${referredBy}, 'landing')
          ON CONFLICT (whatsapp) DO UPDATE SET
            name  = EXCLUDED.name,
            email = COALESCE(NULLIF(EXCLUDED.email, ''), aiatwork_registrations.email),
            role  = COALESCE(NULLIF(EXCLUDED.role, ''),  aiatwork_registrations.role),
            focus = COALESCE(NULLIF(EXCLUDED.focus, ''), aiatwork_registrations.focus),
            referred_by = COALESCE(NULLIF(EXCLUDED.referred_by, ''), aiatwork_registrations.referred_by)
          RETURNING id`) as Array<{ id: number }>;
        registrationId = rows?.[0]?.id ?? null;
      } catch (e) {
        console.error("[aiatwork-register] neon write failed:", e);
      }
    }

    return NextResponse.json({ ok: true, registrationId });
  } catch (err) {
    console.error("[aiatwork-register] error:", err);
    // Return ok so transient backend issues never show the user an error.
    return NextResponse.json({ ok: true });
  }
}
