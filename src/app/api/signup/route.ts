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
    const engineUrl = process.env.WA_ENGINE_URL || "http://localhost:4001";
    try {
      const res = await fetch(`${engineUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:     body.name,
          whatsapp: body.whatsapp,
          email:    body.email || "",
          struggle: body.struggle || "",
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
      const res = await fetch(pabblyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, source: "landing-page", timestamp: new Date().toISOString() }),
      });
      if (!res.ok) {
        return NextResponse.json({ error: "Registration service unavailable" }, { status: 502 });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[signup] error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
