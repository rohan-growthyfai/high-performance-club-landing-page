import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

/**
 * AI Career Growth Masterclass — free live masterclass registration.
 *
 * For working professionals: how to use AI (plus the human skills AI can't
 * replace) to grow in their career instead of being left behind.
 *
 * Captures name + email + WhatsApp from the /ai-career-masterclass page.
 * Primary sink  → Google Sheet via Apps Script Web App (env: AI_CAREER_SHEET_WEBHOOK).
 * Backup sink   → Neon table `ai_career_registrations` (env: DATABASE_URL).
 * Always returns { ok: true } on the happy path so a backend hiccup never
 * shows the visitor an error after they registered.
 *
 * POST /api/ai-career-register
 *   body: { name, email, whatsapp, experience?, referredBy? }
 */

const SERIES_KEY = "ai-career-masterclass";

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
    const experience = String(body.experience || "").trim();
    const referredBy = String(body.referredBy || "").trim();

    if (!name || whatsapp.length < 8 || !email.includes("@")) {
      return NextResponse.json(
        { error: "name, valid email and whatsapp required" },
        { status: 400 }
      );
    }

    // ── Primary: append a row to the Google Sheet (Apps Script Web App) ──
    const sheetWebhook = process.env.AI_CAREER_SHEET_WEBHOOK;
    if (sheetWebhook) {
      try {
        await fetch(sheetWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            whatsapp,
            experience,
            series: SERIES_KEY,
            referredBy,
            source: "landing",
            timestamp: new Date().toISOString(),
          }),
          signal: AbortSignal.timeout(8000),
        });
      } catch (e) {
        console.error("[ai-career-register] sheet webhook failed:", e);
      }
    }

    // ── Backup: mirror into Neon (never block the user on DB issues) ──
    const dbUrl = process.env.DATABASE_URL;
    let registrationId: number | null = null;
    if (dbUrl) {
      try {
        const sql = neon(dbUrl);
        await sql`
          CREATE TABLE IF NOT EXISTS ai_career_registrations (
            id            SERIAL PRIMARY KEY,
            name          TEXT NOT NULL,
            email         TEXT NOT NULL,
            whatsapp      TEXT NOT NULL,
            experience    TEXT,
            referred_by   TEXT,
            source        TEXT DEFAULT 'landing',
            created_at    TIMESTAMPTZ DEFAULT now(),
            UNIQUE (whatsapp)
          )`;
        const rows = (await sql`
          INSERT INTO ai_career_registrations
            (name, email, whatsapp, experience, referred_by, source)
          VALUES
            (${name}, ${email}, ${whatsapp}, ${experience}, ${referredBy}, 'landing')
          ON CONFLICT (whatsapp) DO UPDATE SET
            name       = EXCLUDED.name,
            email      = COALESCE(NULLIF(EXCLUDED.email, ''), ai_career_registrations.email),
            experience = COALESCE(NULLIF(EXCLUDED.experience, ''), ai_career_registrations.experience),
            referred_by = COALESCE(NULLIF(EXCLUDED.referred_by, ''), ai_career_registrations.referred_by)
          RETURNING id`) as Array<{ id: number }>;
        registrationId = rows?.[0]?.id ?? null;
      } catch (e) {
        console.error("[ai-career-register] neon write failed:", e);
      }
    }

    return NextResponse.json({ ok: true, registrationId });
  } catch (err) {
    console.error("[ai-career-register] error:", err);
    return NextResponse.json({ ok: true });
  }
}
