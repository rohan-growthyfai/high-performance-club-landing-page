import { NextResponse } from "next/server";

/**
 * Generates the shareable CHALLENGE BANNER image (PNG) — a HaBuild-style single
 * image that carries the full context of the FREE 7-Day WhatsApp Habits Challenge.
 *
 * This image is NOT personalized — it's the forwardable invite asset attached to
 * the "INVITE FRIENDS" reply, so a member can forward it to friends & family.
 *
 * Cached at a stable filename so we render it once and reuse the same public URL.
 * Pass ?refresh=1 to force a re-render (e.g. after editing the design).
 *
 * Same pipeline as the welcome image: HTML → Gotenberg screenshot → Supabase.
 */

const BANNER_FILENAME = "challenge-banner.png";

function buildBannerHTML(): string {
  const logo = "https://www.highperformanceclub.co/hpc-logo.png";
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1080px;overflow:hidden}
.card{width:1080px;height:1080px;position:relative;overflow:hidden;
  background:#f7f9f8;font-family:'Inter',-apple-system,sans-serif;
  display:flex;flex-direction:column;padding:64px 80px 0;}
.blob1{position:absolute;top:-140px;right:-120px;width:460px;height:460px;border-radius:50%;
  background:rgba(37,211,102,0.10)}
.blob2{position:absolute;bottom:140px;left:-160px;width:420px;height:420px;border-radius:50%;
  background:rgba(184,133,58,0.07)}
.head{position:relative;display:flex;align-items:center;gap:20px;margin-bottom:54px}
.head img{width:74px;height:74px;border-radius:50%;object-fit:cover}
.head .brand{font-size:34px;font-weight:800;color:#18181b;letter-spacing:-0.01em}
.kicker{position:relative;font-size:40px;font-weight:700;color:#1da851;margin-bottom:10px}
.title{position:relative;font-size:96px;font-weight:900;color:#18181b;line-height:0.98;
  letter-spacing:-0.03em;margin-bottom:14px}
.title .free{color:#1da851}
.sub{position:relative;font-size:42px;font-weight:600;color:#3f4a44;margin-bottom:44px}
.benes{position:relative;display:flex;flex-direction:column;gap:20px;margin-bottom:44px}
.bene{display:flex;align-items:center;gap:20px;font-size:40px;font-weight:600;color:#27322c}
.bene .ic{width:64px;height:64px;border-radius:18px;background:rgba(29,168,81,0.12);
  display:flex;align-items:center;justify-content:center;font-size:34px;flex:0 0 auto}
.cbox{position:relative;background:linear-gradient(135deg,#1da851,#16893f);border-radius:28px;
  padding:34px 46px;box-shadow:0 24px 60px -20px rgba(29,168,81,0.5);max-width:840px;
  display:flex;align-items:center;gap:28px}
.cbox .big{font-size:50px;font-weight:900;color:#fff;letter-spacing:-0.02em;line-height:1.08}
.cbox .badge{flex:0 0 auto;background:rgba(255,255,255,0.18);border-radius:16px;
  padding:14px 24px;font-size:34px;font-weight:800;color:#fff;white-space:nowrap}
.footer{position:absolute;bottom:0;left:0;right:0;background:#18181b;
  padding:36px;text-align:center}
.footer span{font-size:42px;font-weight:800;color:#fff;letter-spacing:0.01em}
.footer .arrow{color:#4ade80;margin-left:6px}
</style></head>
<body>
<div class="card">
  <div class="blob1"></div><div class="blob2"></div>
  <div class="head">
    <img src="${logo}" alt="logo" />
    <div class="brand">High Performance Club</div>
  </div>
  <div class="kicker">7-Day Online</div>
  <div class="title"><span class="free">FREE</span><br>Habits Challenge</div>
  <div class="sub">1 tiny habit a day · on WhatsApp · under 5 minutes</div>
  <div class="benes">
    <div class="bene"><span class="ic">⚡</span> Feel more energetic every day</div>
    <div class="bene"><span class="ic">💚</span> Build healthy habits that stick</div>
    <div class="bene"><span class="ic">😴</span> Sleep better &amp; feel calmer</div>
    <div class="bene"><span class="ic">🎯</span> Sharper focus &amp; productivity</div>
  </div>
  <div class="cbox">
    <div class="big">Join the movement<br>— completely FREE</div>
    <div class="badge">📱 On WhatsApp</div>
  </div>
  <div class="footer"><span>Click The Link Below<span class="arrow">⬇</span></span></div>
</div>
</body></html>`;
}

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const refresh = url.searchParams.get("refresh") === "1";

    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase credentials not configured");
    }
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const publicUrl = supabase.storage.from("reports").getPublicUrl(BANNER_FILENAME).data.publicUrl;

    // Reuse the already-rendered banner unless a refresh is requested.
    if (!refresh) {
      const head = await fetch(publicUrl, { method: "HEAD" });
      if (head.ok) {
        return NextResponse.json({ success: true, imageUrl: publicUrl, cached: true });
      }
    }

    // Render HTML → PNG via Gotenberg's screenshot endpoint
    const html = buildBannerHTML();
    const form = new FormData();
    form.append("files", new Blob([html], { type: "text/html" }), "index.html");
    form.append("format", "png");
    form.append("width", "1080");
    form.append("height", "1080");
    form.append("clip", "true");

    const gotenbergRes = await fetch("https://demo.gotenberg.dev/forms/chromium/screenshot/html", {
      method: "POST",
      body: form,
    });
    if (!gotenbergRes.ok) throw new Error(`Gotenberg screenshot failed: ${gotenbergRes.status}`);
    const pngBuffer = Buffer.from(await gotenbergRes.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from("reports")
      .upload(BANNER_FILENAME, pngBuffer, { contentType: "image/png", upsert: true });
    if (uploadError) throw new Error(`Supabase upload failed: ${uploadError.message}`);

    return NextResponse.json({ success: true, imageUrl: publicUrl, cached: false });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[challenge-banner]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
