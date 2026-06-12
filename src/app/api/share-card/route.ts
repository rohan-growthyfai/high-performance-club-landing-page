import { NextResponse } from "next/server";

/**
 * Generates the generic shareable Challenge Card (PNG) — same for everyone,
 * designed to be forwarded / put on WhatsApp Status. The referral link travels
 * as TEXT in the WhatsApp message (not baked into the image) so it stays
 * clickable when forwarded. Cached after first generation.
 */

const CACHED_FILENAME = "challenge-share-card.png";

function buildHTML(): string {
  const items = [
    { emoji: "📩", text: "1 tiny habit delivered every morning" },
    { emoji: "⏱️", text: "Takes under 5 minutes a day" },
    { emoji: "📱", text: "100% on WhatsApp — no app needed" },
    { emoji: "🎁", text: "Personalised report on Day 7" },
  ];
  const list = items.map(i => `<div class="item"><span class="ie">${i.emoji}</span><span>${i.text}</span></div>`).join("");
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;1,500&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1080px;overflow:hidden}
.card{width:1080px;height:1080px;position:relative;overflow:hidden;
  background:linear-gradient(150deg,#0a0a0a 0%,#0f1f14 48%,#16341f 100%);
  font-family:'Inter',sans-serif;display:flex;flex-direction:column;justify-content:center;
  padding:96px;color:#fff}
.glow1{position:absolute;top:-180px;right:-140px;width:560px;height:560px;border-radius:50%;
  background:radial-gradient(circle,rgba(37,211,102,0.26) 0%,transparent 70%);filter:blur(20px)}
.glow2{position:absolute;bottom:-200px;left:-160px;width:560px;height:560px;border-radius:50%;
  background:radial-gradient(circle,rgba(37,211,102,0.16) 0%,transparent 70%);filter:blur(20px)}
.badge{position:relative;display:inline-flex;align-self:flex-start;align-items:center;gap:14px;
  background:rgba(37,211,102,0.12);border:2px solid rgba(37,211,102,0.4);color:#4ade80;
  font-size:24px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;
  padding:13px 32px;border-radius:999px;margin-bottom:44px}
.dot{width:13px;height:13px;border-radius:50%;background:#25d366;box-shadow:0 0 14px #25d366}
.title{position:relative;font-family:'Playfair Display',serif;font-weight:700;
  font-size:96px;line-height:1.05;letter-spacing:-0.02em;margin-bottom:18px}
.title em{font-style:italic;color:#4ade80}
.free{position:relative;font-size:40px;color:rgba(255,255,255,0.6);margin-bottom:54px;font-weight:500}
.item{position:relative;display:flex;align-items:center;gap:24px;margin-bottom:30px;
  font-size:36px;color:#fff;font-weight:600}
.ie{font-size:42px;width:60px;flex-shrink:0}
.cta{position:relative;margin-top:50px;display:inline-flex;align-self:flex-start;align-items:center;gap:16px;
  background:linear-gradient(135deg,#25d366,#1da851);color:#fff;font-size:36px;font-weight:800;
  padding:26px 54px;border-radius:999px;box-shadow:0 16px 40px rgba(29,168,81,0.4)}
.foot{position:absolute;bottom:60px;left:96px;right:96px;font-size:26px;color:rgba(255,255,255,0.45);font-weight:600}
</style></head>
<body>
<div class="card">
  <div class="glow1"></div><div class="glow2"></div>
  <div class="badge"><span class="dot"></span>Free Challenge</div>
  <div class="title">Build Better<br><em>Habits</em> in 7 Days</div>
  <div class="free">A FREE 7-Day WhatsApp Habits Challenge</div>
  ${list}
  <div class="cta">Join Free 👉 Link below</div>
  <div class="foot">Tap the link in the message to reserve your free seat</div>
</div>
</body></html>`;
}

export async function POST() {
  try {
    const html = buildHTML();
    const form = new FormData();
    form.append("files", new Blob([html], { type: "text/html" }), "index.html");
    form.append("format", "png");
    form.append("width", "1080");
    form.append("height", "1080");
    form.append("clip", "true");

    const got = await fetch("https://demo.gotenberg.dev/forms/chromium/screenshot/html", { method: "POST", body: form });
    if (!got.ok) throw new Error(`Gotenberg screenshot failed: ${got.status}`);
    const png = Buffer.from(await got.arrayBuffer());

    const { putFile } = await import("@/lib/fileStore");
    const publicUrl = await putFile(CACHED_FILENAME, Buffer.from(png), "image/png");

    return NextResponse.json({ success: true, imageUrl: publicUrl, cached: false });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[share-card]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
