import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

/**
 * AI Agents Masterclass — free 90-min LIVE masterclass registration.
 * Sun 23 Aug 2026 · 11:00 AM IST.
 *
 * Angle: "Clone yourself" — build AI agents & automations that do your
 * day-to-day work, so you get your time back.
 *
 * Captures name + email + WhatsApp from the /ai-agents-masterclass page.
 * Primary sink  → Google Sheet via Apps Script Web App (env: AI_AGENTS_SHEET_WEBHOOK).
 * Backup sink   → Neon table `ai_agents_registrations` (env: DATABASE_URL).
 * Always returns { ok: true } on the happy path so a backend hiccup never
 * shows the visitor an error after they registered.
 *
 * POST /api/ai-agents-register
 *   body: { name, email, whatsapp, goal?, referredBy? }
 */

const SERIES_KEY = "ai-agents-masterclass";

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
    const goal = String(body.goal || "").trim();
    const referredBy = String(body.referredBy || "").trim();

    if (!name || whatsapp.length < 8 || !email.includes("@")) {
      return NextResponse.json(
        { error: "name, valid email and whatsapp required" },
        { status: 400 }
      );
    }

    // ── Primary: append a row to the Google Sheet (Apps Script Web App) ──
    const sheetWebhook = process.env.AI_AGENTS_SHEET_WEBHOOK;
    if (sheetWebhook) {
      try {
        await fetch(sheetWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            whatsapp,
            goal,
            series: SERIES_KEY,
            referredBy,
            source: "landing",
            timestamp: new Date().toISOString(),
          }),
          signal: AbortSignal.timeout(8000),
        });
      } catch (e) {
        console.error("[ai-agents-register] sheet webhook failed:", e);
      }
    }

    // ── Backup: mirror into Neon (never block the user on DB issues) ──
    const dbUrl = process.env.DATABASE_URL;
    let registrationId: number | null = null;
    if (dbUrl) {
      try {
        const sql = neon(dbUrl);
        await sql`
          CREATE TABLE IF NOT EXISTS ai_agents_registrations (
            id            SERIAL PRIMARY KEY,
            name          TEXT NOT NULL,
            email         TEXT NOT NULL,
            whatsapp      TEXT NOT NULL,
            goal          TEXT,
            referred_by   TEXT,
            source        TEXT DEFAULT 'landing',
            created_at    TIMESTAMPTZ DEFAULT now(),
            UNIQUE (whatsapp)
          )`;
        const rows = (await sql`
          INSERT INTO ai_agents_registrations
            (name, email, whatsapp, goal, referred_by, source)
          VALUES
            (${name}, ${email}, ${whatsapp}, ${goal}, ${referredBy}, 'landing')
          ON CONFLICT (whatsapp) DO UPDATE SET
            name  = EXCLUDED.name,
            email = COALESCE(NULLIF(EXCLUDED.email, ''), ai_agents_registrations.email),
            goal  = COALESCE(NULLIF(EXCLUDED.goal, ''),  ai_agents_registrations.goal),
            referred_by = COALESCE(NULLIF(EXCLUDED.referred_by, ''), ai_agents_registrations.referred_by)
          RETURNING id`) as Array<{ id: number }>;
        registrationId = rows?.[0]?.id ?? null;
      } catch (e) {
        console.error("[ai-agents-register] neon write failed:", e);
      }
    }

    return NextResponse.json({ ok: true, registrationId });
  } catch (err) {
    console.error("[ai-agents-register] error:", err);
    return NextResponse.json({ ok: true });
  }
}
