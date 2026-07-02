import { NextResponse } from "next/server";

export const maxDuration = 60;

function buildDucHabitHTML(dayNumber: number, glimpse: string, emoji: string): string {
  const safe    = String(dayNumber || 1);
  const glimpseSafe = (glimpse || "").replace(/[<>&"]/g, c => ({ "<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;" }[c] || c)).slice(0, 80);
  const emojiSafe   = (emoji  || "").replace(/[<>&"]/g, "").slice(0, 8);
  const logo    = "https://www.highperformanceclub.co/hpc-logo.png";

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1080px;overflow:hidden}
.card{width:1080px;height:1080px;background:#f5f5f0;font-family:'Inter',-apple-system,sans-serif;
  display:flex;flex-direction:column;align-items:center;justify-content:flex-start;
  padding:56px 80px 0;position:relative;overflow:hidden}
.logo-row{position:relative;display:flex;flex-direction:column;align-items:center;margin-bottom:48px}
.logo-row img{width:110px;height:110px;border-radius:50%;object-fit:cover}
.daybox{position:relative;background:#18181b;border-radius:36px;
  width:900px;padding:48px 60px 44px;text-align:center;margin-bottom:44px;
  box-shadow:0 24px 64px -16px rgba(0,0,0,0.40)}
.daybox .day-row{font-size:130px;font-weight:900;color:#f5c842;line-height:1.0;
  letter-spacing:-0.02em;display:flex;align-items:baseline;justify-content:center;gap:24px}
.daybox .day-word{font-size:130px;font-weight:900;color:#f5c842;letter-spacing:-0.02em}
.daybox .sub{font-size:36px;font-weight:600;color:rgba(255,255,255,0.70);
  letter-spacing:0.02em;margin-top:14px}
.glimpse-box{position:relative;background:#fff;border-radius:28px;
  width:900px;padding:38px 52px;
  box-shadow:0 8px 32px -8px rgba(0,0,0,0.10);
  display:flex;align-items:center;gap:28px}
.glimpse-emoji{font-size:64px;line-height:1;flex-shrink:0}
.glimpse-text{font-size:44px;font-weight:800;color:#18181b;
  line-height:1.22;letter-spacing:-0.01em;text-align:left}
.footer{position:absolute;bottom:0;left:0;right:0;background:#1da851;
  padding:48px 60px;text-align:center}
.footer span{font-size:44px;font-weight:900;color:#fff;letter-spacing:0.01em}
</style></head>
<body>
<div class="card">
  <div class="logo-row">
    <img src="${logo}" alt="HPC" />
  </div>
  <div class="daybox">
    <div class="day-row">
      <span class="day-word">DAY</span>
      <span class="day-word">${safe}</span>
    </div>
    <div class="sub">Daily Upgrade Club</div>
  </div>
  <div class="glimpse-box">
    ${emojiSafe ? `<span class="glimpse-emoji">${emojiSafe}</span>` : ""}
    <div class="glimpse-text">${glimpseSafe}</div>
  </div>
  <div class="footer"><span>Tap below to reveal today's tiny habit ⬇</span></div>
</div>
</body></html>`;
}

export async function POST(request: Request) {
  try {
    const { dayNumber, glimpse, emoji } = await request.json();
    if (!dayNumber) return NextResponse.json({ error: "dayNumber required" }, { status: 400 });

    const html = buildDucHabitHTML(Number(dayNumber), glimpse || "Today's tiny healthy habit is ready.", emoji || "");

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
    const filename  = `duc-habit-day${dayNumber}-${Date.now()}.png`;
    const imageUrl  = await putFile(filename, pngBuffer, "image/png");

    return NextResponse.json({ success: true, dayNumber, imageUrl });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[duc-habit-image]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
