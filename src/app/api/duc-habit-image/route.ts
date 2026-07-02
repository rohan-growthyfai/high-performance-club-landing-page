import { NextResponse } from "next/server";

export const maxDuration = 60;

function buildDucHabitHTML(dayNumber: number, glimpse: string): string {
  const safe    = String(dayNumber || 1);
  const glimpseSafe = (glimpse || "").replace(/[<>&"]/g, c => ({ "<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;" }[c] || c)).slice(0, 80);
  const logo    = "https://www.highperformanceclub.co/hpc-logo.png";

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1080px;overflow:hidden}
.card{width:1080px;height:1080px;background:#f7f9f8;font-family:'Inter',-apple-system,sans-serif;
  display:flex;flex-direction:column;align-items:center;justify-content:flex-start;
  padding:64px 80px 0;position:relative;overflow:hidden}
.blob1{position:absolute;top:-160px;right:-140px;width:480px;height:480px;border-radius:50%;
  background:rgba(37,211,102,0.09)}
.blob2{position:absolute;bottom:100px;left:-170px;width:440px;height:440px;border-radius:50%;
  background:rgba(184,133,58,0.07)}
.logo-row{position:relative;display:flex;flex-direction:column;align-items:center;gap:0;margin-bottom:60px}
.logo-row img{width:100px;height:100px;border-radius:50%;object-fit:cover}
.daybox{position:relative;background:#18181b;border-radius:36px;
  width:880px;padding:52px 60px 48px;text-align:center;margin-bottom:40px;
  box-shadow:0 20px 60px -16px rgba(0,0,0,0.28)}
.daybox .day-label{font-size:44px;font-weight:700;color:rgba(255,255,255,0.60);
  letter-spacing:0.04em;text-transform:uppercase;margin-bottom:6px}
.daybox .day-num{font-size:130px;font-weight:900;color:#f5c842;line-height:1.0;
  letter-spacing:-0.03em}
.daybox .sub{font-size:38px;font-weight:700;color:rgba(255,255,255,0.80);
  letter-spacing:0.01em;margin-top:6px}
.glimpse-box{position:relative;background:#fff;border-radius:28px;
  width:880px;padding:36px 50px;text-align:center;
  box-shadow:0 8px 32px -8px rgba(0,0,0,0.10);margin-bottom:0}
.glimpse-box .glimpse-text{font-size:42px;font-weight:700;color:#18181b;
  line-height:1.28;letter-spacing:-0.01em}
.footer{position:absolute;bottom:0;left:0;right:0;background:#1da851;
  padding:42px;text-align:center}
.footer span{font-size:40px;font-weight:800;color:#fff;letter-spacing:0.01em}
.arrow{margin-left:8px;font-style:normal}
</style></head>
<body>
<div class="card">
  <div class="blob1"></div><div class="blob2"></div>
  <div class="logo-row">
    <img src="${logo}" alt="HPC" />
  </div>
  <div class="daybox">
    <div class="day-label">Day</div>
    <div class="day-num">${safe}</div>
    <div class="sub">Daily Upgrade Club</div>
  </div>
  <div style="height:40px"></div>
  <div class="glimpse-box">
    <div class="glimpse-text">${glimpseSafe}</div>
  </div>
  <div class="footer"><span>Type below to reveal today's tiny habit<i class="arrow">⬇</i></span></div>
</div>
</body></html>`;
}

export async function POST(request: Request) {
  try {
    const { dayNumber, glimpse } = await request.json();
    if (!dayNumber) return NextResponse.json({ error: "dayNumber required" }, { status: 400 });

    const html = buildDucHabitHTML(Number(dayNumber), glimpse || "Today's tiny healthy habit is ready.");

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
