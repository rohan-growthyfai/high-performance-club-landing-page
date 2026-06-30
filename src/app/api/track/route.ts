import { NextResponse } from "next/server";
import { neon, NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Link tracking redirect.
 * URL: /api/track?phone=918956146485&campaign=duc_pitch
 *
 * 1. Logs the click to duc_link_clicks table (upserts so duplicate clicks are idempotent).
 * 2. Redirects to the DUC page.
 *
 * Table is created on first hit (CREATE TABLE IF NOT EXISTS) so no migration needed.
 */

const DUC_URL = "https://www.highperformanceclub.co/daily-upgrade-club";

async function ensureTable(sql: NeonQueryFunction<false, false>) {
  await sql`
    CREATE TABLE IF NOT EXISTS duc_link_clicks (
      id          SERIAL PRIMARY KEY,
      whatsapp    TEXT NOT NULL,
      campaign    TEXT NOT NULL DEFAULT 'duc_pitch',
      clicked_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE (whatsapp, campaign)
    )
  `;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const phone = url.searchParams.get("phone") || "";
    const campaign = url.searchParams.get("campaign") || "duc_pitch";

    if (phone) {
      const sql = neon(process.env.DATABASE_URL!);
      await ensureTable(sql);
      // Upsert — record first click only (idempotent on repeat clicks)
      await sql`
        INSERT INTO duc_link_clicks (whatsapp, campaign)
        VALUES (${phone}, ${campaign})
        ON CONFLICT (whatsapp, campaign) DO NOTHING
      `;
    }
  } catch (e) {
    // Never block the redirect on a tracking error
    console.error("[TRACK] click log error:", e);
  }

  // Always redirect, even if tracking failed
  return NextResponse.redirect(DUC_URL, { status: 302 });
}
