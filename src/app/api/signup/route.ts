import { NextResponse } from "next/server";

/**
 * Signup API — receives form data, forwards to local WhatsApp engine
 * (port 4001) which handles sheet + WhatsApp confirmation + Day 1 assessment.
 * Falls back to Pabbly webhook if engine is unavailable.
 */

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.whatsapp) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Primary: call local WhatsApp engine
    const engineUrl = process.env.WA_ENGINE_URL || "https://hpc-whatsapp-engine-production.up.railway.app";
    try {
      const res = await fetch(`${engineUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:       body.name,
          whatsapp:   body.whatsapp,
          email:      body.email || "",
          struggle:   body.struggle || "",
          referredBy: body.referredBy || "",
        }),
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) {
        return NextResponse.json({ ok: true });
      }
    } catch {
      // Engine not reachable — fall through to Pabbly fallback
    }

    // Fallback: Pabbly webhook (keeps existing automation working)
    const pabblyUrl = process.env.PABBLY_WEBHOOK_URL;
    if (pabblyUrl) {
      try {
        await fetch(pabblyUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...body, source: "landing-page", timestamp: new Date().toISOString() }),
        });
      } catch (e) {
        console.error("[signup] Pabbly fallback failed:", e);
      }
    }

    // Always return ok to the user — backend failures are logged server-side
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[signup] error:", err);
    // Still return ok so users don't see errors for transient backend issues
    return NextResponse.json({ ok: true });
  }
}
