import { NextResponse } from "next/server";

/**
 * Generates a personalized Promise Card image (PNG) — a signable commitment
 * card with the member's name. Same Gotenberg screenshot → Supabase pipeline.
 */

function buildHTML(firstName: string, startDate: string): string {
  const safe = (firstName || "Friend").replace(/[<>&]/g, "").slice(0, 24);
  const dateSafe = (startDate || "tomorrow").replace(/[<>&]/g, "").slice(0, 40);
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,500&family=Caveat:wght@600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px}
/* wrap grows to fit the card (auto height) with generous vertical padding so the
   seal at the top and footer at the bottom are never clipped. */
.wrap{width:1080px;min-height:1080px;background:linear-gradient(150deg,#0a0a0a 0%,#0f1f14 50%,#16341f 100%);
  display:flex;align-items:center;justify-content:center;font-family:'Inter',sans-serif;position:relative;
  padding:90px 0;overflow:hidden}
.glow{position:absolute;top:-160px;right:-160px;width:520px;height:520px;border-radius:50%;
  background:radial-gradient(circle,rgba(37,211,102,0.22) 0%,transparent 70%);filter:blur(18px)}
.card{position:relative;width:960px;background:#fffdf8;border-radius:40px;padding:64px 72px 84px;
  box-shadow:0 40px 120px rgba(0,0,0,0.5);text-align:center;border:1px solid rgba(0,0,0,0.05)}
/* HPC brand header at the very top of the card */
.brand{display:flex;align-items:center;justify-content:center;gap:18px;margin-bottom:30px}
.brand img{width:64px;height:64px;border-radius:50%;object-fit:cover}
.brand .bt{font-family:'Inter',sans-serif;font-size:34px;font-weight:800;color:#18181b;letter-spacing:-0.01em}
.seal{position:relative;margin:0 auto 0;
  width:104px;height:104px;border-radius:50%;background:linear-gradient(135deg,#25d366,#1da851);
  display:flex;align-items:center;justify-content:center;font-size:52px;
  box-shadow:0 12px 30px rgba(29,168,81,0.4)}
.kicker{margin-top:26px;font-size:28px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#1da851}
.title{font-family:'Playfair Display',serif;font-size:76px;font-weight:700;color:#18181b;margin:12px 0 44px}
.body{font-size:42px;line-height:1.55;color:#374151;font-weight:500}
.name{font-family:'Caveat',cursive;font-size:88px;color:#1da851;font-weight:700;display:inline-block}
.commit{margin-top:40px;font-size:36px;line-height:1.55;color:#6b7280;font-style:italic}
.divider{width:96px;height:5px;border-radius:999px;background:linear-gradient(90deg,#25d366,#1da851);margin:46px auto}
.datebox{display:inline-flex;align-items:center;gap:12px;background:#f0fdf4;border:2px solid #bbf7d0;
  border-radius:20px;padding:20px 38px;font-size:32px;color:#15803d;font-weight:700;margin-top:8px}
.footer{margin-top:44px;font-size:26px;color:#9ca3af;font-weight:600;letter-spacing:0.06em}
</style></head>
<body>
<div class="wrap">
  <div class="glow"></div>
  <div class="card">
    <div class="brand">
      <img src="https://www.highperformanceclub.co/hpc-logo.png" alt="logo" />
      <div class="bt">High Performance Club</div>
    </div>
    <div class="seal">🤝</div>
    <div class="kicker">My Promise</div>
    <div class="title">I'm All In</div>
    <div class="body">
      I, <span class="name">${safe}</span>, promise myself to stay committed and complete the
      <strong>7-Days WhatsApp habits challenge</strong> for my overall health and wellbeing.
    </div>
    <div class="commit">"I commit to do all the tiny habits every day — even on busy days."</div>
    <div class="divider"></div>
    <div class="datebox">📅 Starts ${dateSafe}</div>
    <div class="footer">FREE 7-DAY WHATSAPP HABITS CHALLENGE</div>
  </div>
</div>
</body></html>`;
}

export async function POST(request: Request) {
  try {
    const { firstName, startDate } = await request.json();
    if (!firstName) return NextResponse.json({ error: "firstName required" }, { status: 400 });

    const html = buildHTML(firstName, startDate || "tomorrow");

    const form = new FormData();
    form.append("files", new Blob([html], { type: "text/html" }), "index.html");
    form.append("format", "png");
    form.append("width", "1080");
    // No fixed height / clip — capture the FULL page height so the card (seal at
    // top, footer at bottom) is never cropped. The wrap keeps a 1080px minimum,
    // and grows taller only if the content needs it.

    const got = await fetch("https://demo.gotenberg.dev/forms/chromium/screenshot/html", { method: "POST", body: form });
    if (!got.ok) throw new Error(`Gotenberg screenshot failed: ${got.status}`);
    const png = Buffer.from(await got.arrayBuffer());

    const { putFile } = await import("@/lib/fileStore");
    const safeName = firstName.replace(/\s+/g, "-").toLowerCase().replace(/[^a-z0-9-]/g, "");
    const filename = `promise-${safeName}-${Date.now()}.png`;
    const publicUrl = await putFile(filename, Buffer.from(png), "image/png");

    return NextResponse.json({ success: true, imageUrl: publicUrl });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[promise-card]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
