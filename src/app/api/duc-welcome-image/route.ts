import { NextResponse } from "next/server";

export const maxDuration = 60;

function buildDucWelcomeHTML(firstName: string, startDate: string): string {
  const safe     = (firstName || "Friend").replace(/[<>&]/g, "").slice(0, 24);
  const dateSafe = (startDate  || "tomorrow").replace(/[<>&]/g, "").slice(0, 40);
  const logo     = "https://www.highperformanceclub.co/hpc-logo.png";

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1080px;overflow:hidden}
.card{width:1080px;height:1080px;position:relative;overflow:hidden;
  background:#f7f9f8;font-family:'Inter',-apple-system,sans-serif;
  display:flex;flex-direction:column;padding:70px 80px 0;}
.blob1{position:absolute;top:-140px;right:-120px;width:460px;height:460px;border-radius:50%;
  background:rgba(37,211,102,0.10)}
.blob2{position:absolute;bottom:120px;left:-160px;width:420px;height:420px;border-radius:50%;
  background:rgba(184,133,58,0.07)}
.head{position:relative;display:flex;align-items:center;gap:20px;margin-bottom:70px}
.head img{width:78px;height:78px;border-radius:50%;object-fit:cover}
.head .brand{font-size:34px;font-weight:800;color:#18181b;letter-spacing:-0.01em}
.welcome{position:relative;font-size:64px;font-weight:600;color:#3f4a44;margin-bottom:6px}
.name{position:relative;font-size:104px;font-weight:900;color:#18181b;line-height:1.0;
  letter-spacing:-0.03em;margin-bottom:50px}
.name b{color:#1da851}
.cbox{position:relative;background:linear-gradient(135deg,#1da851,#16893f);border-radius:32px;
  padding:46px 54px;box-shadow:0 24px 60px -20px rgba(29,168,81,0.5);max-width:840px}
.cbox .small{font-size:34px;font-weight:600;color:rgba(255,255,255,0.85);margin-bottom:8px}
.cbox .big{font-size:58px;font-weight:900;color:#fff;letter-spacing:-0.02em;line-height:1.05;margin-bottom:18px}
.cbox .date{display:inline-flex;align-items:center;gap:12px;background:rgba(255,255,255,0.18);
  border-radius:16px;padding:14px 28px;font-size:38px;font-weight:800;color:#fff}
.footer{position:absolute;bottom:0;left:0;right:0;background:#18181b;
  padding:38px;text-align:center}
.footer span{font-size:42px;font-weight:800;color:#fff;letter-spacing:0.01em}
.footer .arrow{color:#4ade80;margin-left:6px}
</style></head>
<body>
<div class="card">
  <div class="blob1"></div><div class="blob2"></div>
  <div class="head">
    <img src="${logo}" alt="logo" />
    <div class="brand">Daily Upgrade Club</div>
  </div>
  <div class="welcome">Welcome,</div>
  <div class="name"><b>${safe}</b> 🙏</div>
  <div class="cbox">
    <div class="small">You're registered for the</div>
    <div class="big">Daily Upgrade Club<br>Membership</div>
    <div class="date">📅 Starts ${dateSafe}</div>
  </div>
  <div class="footer"><span>Click Button Below<span class="arrow">⬇</span></span></div>
</div>
</body></html>`;
}

export async function POST(request: Request) {
  try {
    const { firstName, startDate } = await request.json();
    if (!firstName) return NextResponse.json({ error: "firstName required" }, { status: 400 });

    // Default: "Tomorrow, July 2" — same format as free challenge
    const resolvedDate = startDate || (() => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      const dateStr = d.toLocaleDateString("en-US", { timeZone: "Asia/Kolkata", month: "long", day: "numeric" });
      return `Tomorrow, ${dateStr}`;
    })();

    const html = buildDucWelcomeHTML(firstName, resolvedDate);

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
    const safeName = firstName.replace(/\s+/g, "-").toLowerCase().replace(/[^a-z0-9-]/g, "");
    const filename  = `duc-welcome-${safeName}-${Date.now()}.png`;
    const imageUrl  = await putFile(filename, pngBuffer, "image/png");

    return NextResponse.json({ success: true, firstName, imageUrl });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[duc-welcome-image]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
