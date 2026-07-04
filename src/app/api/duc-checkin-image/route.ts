import { NextResponse } from "next/server";

export const maxDuration = 60;

function buildCheckinHTML(opts: {
  firstName: string;
  dayNumber: number;
  habitTitle: string;
  trackName: string;
  trackEmoji: string;
  streak: number;
}): string {
  const safe        = (opts.firstName || "Friend").replace(/[<>&]/g, "").slice(0, 24);
  const habitSafe   = (opts.habitTitle || "Today's Tiny Habit").replace(/[<>&]/g, "").slice(0, 60);
  const trackSafe   = (opts.trackName || "Habit Track").replace(/[<>&]/g, "").slice(0, 40);
  const emojiSafe   = (opts.trackEmoji || "🌿").slice(0, 4);
  const day         = Math.max(1, opts.dayNumber || 1);
  const streak      = opts.streak || 0;
  const logo        = "https://www.highperformanceclub.co/hpc-logo.png";


  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1080px;overflow:hidden}
.card{width:1080px;height:1080px;position:relative;overflow:hidden;
  background:#0d1117;font-family:'Inter',-apple-system,sans-serif;
  display:flex;flex-direction:column;padding:70px 80px 0;}
.blob1{position:absolute;top:-100px;right:-100px;width:420px;height:420px;border-radius:50%;
  background:rgba(37,211,102,0.08)}
.blob2{position:absolute;bottom:140px;left:-140px;width:380px;height:380px;border-radius:50%;
  background:rgba(37,211,102,0.05)}
.head{position:relative;display:flex;align-items:center;gap:20px;margin-bottom:64px}
.head img{width:72px;height:72px;border-radius:50%;object-fit:cover}
.head .brand{font-size:32px;font-weight:800;color:#e8f5e9;letter-spacing:-0.01em}
.greeting{position:relative;font-size:52px;font-weight:600;color:#9ca3af;margin-bottom:4px}
.name{position:relative;font-size:96px;font-weight:900;color:#f9fafb;line-height:1.0;
  letter-spacing:-0.03em;margin-bottom:52px}
.name b{color:#25d366}
.cbox{position:relative;background:linear-gradient(135deg,#1a2e20,#0f1f14);
  border:2px solid rgba(37,211,102,0.3);
  border-radius:32px;padding:46px 54px;max-width:900px;margin-bottom:44px}
.cbox .label{font-size:30px;font-weight:600;color:#4ade80;margin-bottom:14px;
  display:flex;align-items:center;gap:12px;letter-spacing:0.02em}
.cbox .label .daybadge{background:rgba(74,222,128,0.15);border:1px solid rgba(74,222,128,0.4);
  border-radius:10px;padding:4px 18px;font-size:28px;font-weight:700;color:#4ade80}
.cbox .habit{font-size:66px;font-weight:900;color:#f9fafb;line-height:1.08;letter-spacing:-0.02em}
.footer{position:absolute;bottom:0;left:0;right:0;
  background:linear-gradient(135deg,#1da851,#16893f);
  padding:40px;display:flex;align-items:center;justify-content:center;gap:16px}
.footer span{font-size:44px;font-weight:900;color:#fff;letter-spacing:-0.01em}
.footer .sub{font-size:30px;font-weight:600;color:rgba(255,255,255,0.8)}
</style></head>
<body>
<div class="card">
  <div class="blob1"></div><div class="blob2"></div>
  <div class="head">
    <img src="${logo}" alt="logo" />
    <div class="brand">Daily Upgrade Club</div>
  </div>
  <div class="greeting">Day ${day} Check-In,</div>
  <div class="name"><b>${safe}</b> 🌙</div>
  <div class="cbox">
    <div class="label">
      <span>${emojiSafe} ${trackSafe}</span>
      <span class="daybadge">Day ${day}</span>
    </div>
    <div class="habit">${habitSafe}</div>
  </div>
  <div class="footer">
    <span>Reply ✅ DONE &amp; Continue Your Streak</span>
  </div>
</div>
</body></html>`;
}

export async function POST(request: Request) {
  try {
    const { firstName, dayNumber, habitTitle, trackName, trackEmoji, streak } = await request.json();
    if (!firstName) return NextResponse.json({ error: "firstName required" }, { status: 400 });

    const html = buildCheckinHTML({ firstName, dayNumber, habitTitle, trackName, trackEmoji, streak });

    const form = new FormData();
    form.append("files", new Blob([html], { type: "text/html" }), "index.html");
    form.append("format", "png");
    form.append("width",  "1080");
    form.append("height", "1080");
    form.append("clip",   "true");

    let pngBuffer: Buffer | null = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 15000);
        const res = await fetch("https://demo.gotenberg.dev/forms/chromium/screenshot/html", {
          method: "POST", body: form, signal: controller.signal,
        });
        clearTimeout(timer);
        if (!res.ok) throw new Error(`Gotenberg ${res.status}`);
        pngBuffer = Buffer.from(await res.arrayBuffer());
        break;
      } catch (e) {
        if (attempt === 3) throw e;
      }
    }
    if (!pngBuffer) throw new Error("Image generation failed after 3 attempts");

    const { putFile } = await import("@/lib/fileStore");
    const safeName = (firstName || "member").replace(/\s+/g, "-").toLowerCase().replace(/[^a-z0-9-]/g, "");
    const filename = `duc-checkin-${safeName}-day${dayNumber || 1}-${Date.now()}.png`;
    const imageUrl = await putFile(filename, pngBuffer, "image/png");

    return NextResponse.json({ success: true, imageUrl });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[duc-checkin-image]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
