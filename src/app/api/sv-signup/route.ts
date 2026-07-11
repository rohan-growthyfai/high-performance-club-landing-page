import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

/**
 * StoryVerse signup — parent registers a child.
 *
 * Creates/updates an sv_subscribers row (one per child), starts a 3-day free
 * trial, and pings the WhatsApp engine to send the welcome + first story.
 *
 * POST /api/sv-signup
 *   body: { parentName?, whatsapp, childName, childGender?, childAge?, referredBy? }
 * Returns: { ok, subscriberId, referralCode }
 *
 * Env: DATABASE_URL, WA_ENGINE_URL
 */

function normalizePhone(p: string): string {
  let clean = String(p || "").replace(/[\s\-()]/g, "");
  if (!clean.startsWith("+")) clean = "+" + clean;
  return clean;
}

function makeReferralCode(childName: string, phone: string): string {
  const namePart =
    String(childName || "hero").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 12) || "hero";
  const digits = String(phone || "").replace(/\D/g, "").slice(-4) || "0000";
  return `sv-${namePart}-${digits}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const whatsapp = normalizePhone(body.whatsapp || "");
    const childName = String(body.childName || "").trim();
    const parentName = String(body.parentName || "").trim();
    const childGender = ["boy", "girl", "neutral"].includes(body.childGender)
      ? body.childGender
      : "neutral";
    const childAge = Number(body.childAge) || null;
    const referredBy = String(body.referredBy || "").trim();

    if (!whatsapp || whatsapp.length < 8 || !childName) {
      return NextResponse.json({ error: "whatsapp and childName required" }, { status: 400 });
    }

    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      return NextResponse.json({ error: "DATABASE_URL not set" }, { status: 500 });
    }
    const sql = neon(dbUrl);

    const referralCode = makeReferralCode(childName, whatsapp);

    // 3-day free trial from now.
    const rows = (await sql`
      INSERT INTO sv_subscribers
        (parent_phone, parent_name, child_name, child_gender, child_age,
         status, trial_ends_at, next_story_seq, referral_code, referred_by, source)
      VALUES
        (${whatsapp}, ${parentName}, ${childName}, ${childGender}, ${childAge},
         'trial', now() + interval '3 days', 1, ${referralCode}, ${referredBy}, 'landing')
      ON CONFLICT (parent_phone, lower(child_name)) DO UPDATE SET
         parent_name = COALESCE(NULLIF(EXCLUDED.parent_name,''), sv_subscribers.parent_name),
         child_gender = EXCLUDED.child_gender,
         child_age = COALESCE(EXCLUDED.child_age, sv_subscribers.child_age),
         referred_by = COALESCE(NULLIF(EXCLUDED.referred_by,''), sv_subscribers.referred_by),
         updated_at = now()
      RETURNING id, referral_code, (xmax = 0) AS inserted`) as Array<{
      id: number;
      referral_code: string;
      inserted: boolean;
    }>;

    const sub = rows[0];

    // Ping the WhatsApp engine to send welcome + tonight's first story.
    const engineUrl =
      process.env.WA_ENGINE_URL || "https://hpc-whatsapp-engine-production.up.railway.app";
    try {
      await fetch(`${engineUrl}/sv-welcome`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriberId: sub.id, whatsapp, childName, childGender }),
        signal: AbortSignal.timeout(8000),
      });
    } catch {
      // Engine unreachable — the daily cron will still pick this subscriber up.
    }

    return NextResponse.json({
      ok: true,
      subscriberId: sub.id,
      referralCode: sub.referral_code,
      isNew: sub.inserted,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[sv-signup]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
