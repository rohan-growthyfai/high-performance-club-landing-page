import { NextResponse } from "next/server";

// Stub API route — forwards signup data to Pabbly Connect webhook.
// Set PABBLY_WEBHOOK_URL in your environment (.env.local) when you wire automation.

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.name || !body.whatsapp || !body.email || !body.consent) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.PABBLY_WEBHOOK_URL;

    if (webhookUrl) {
      // Forward to Pabbly Connect → triggers WhatsApp Day 1 sequence
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...body,
          source: "landing-page",
          timestamp: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        return NextResponse.json(
          { error: "Webhook forwarding failed" },
          { status: 502 }
        );
      }
    } else {
      // Dev mode — log to server console
      console.log("[signup] (dev mode, no webhook configured):", body);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[signup] error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
