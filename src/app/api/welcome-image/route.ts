import { NextResponse } from "next/server";

/**
 * Generates a personalized welcome IMAGE (PNG) with the member's first name,
 * uploads it to Supabase, and returns a public URL the WhatsApp engine can
 * attach to the confirmation message.
 *
 * Same pipeline as the report PDF: HTML → Gotenberg screenshot → Supabase.
 */

function buildWelcomeHTML(firstName: string, startDate: string): string {
  const safe = (firstName || "Friend").replace(/[<>&]/g, "").slice(0, 24);
  const dateSafe = (startDate || "tomorrow").replace(/[<>&]/g, "").slice(0, 40);
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Playfair+Display:ital,wght@1,500;0,700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1080px;overflow:hidden}
.card{
  width:1080px;height:1080px;position:relative;
  background:linear-gradient(150deg,#0a0a0a 0%,#0f1f14 45%,#16341f 100%);
  font-family:'Inter',sans-serif;overflow:hidden;
  display:flex;flex-direction:column;justify-content:center;align-items:center;
  padding:90px;text-align:center;
}
/* WhatsApp-green glow */
.glow1{position:absolute;top:-200px;left:-160px;width:560px;height:560px;border-radius:50%;
  background:radial-gradient(circle,rgba(37,211,102,0.28) 0%,transparent 70%);filter:blur(20px)}
.glow2{position:absolute;bottom:-220px;right:-180px;width:600px;height:600px;border-radius:50%;
  background:radial-gradient(circle,rgba(37,211,102,0.18) 0%,transparent 70%);filter:blur(20px)}
.badge{position:relative;display:inline-flex;align-items:center;gap:14px;
  background:rgba(37,211,102,0.12);border:2px solid rgba(37,211,102,0.4);
  color:#4ade80;font-size:26px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;
  padding:14px 36px;border-radius:999px;margin-bottom:54px}
.dot{width:14px;height:14px;border-radius:50%;background:#25d366;box-shadow:0 0 16px #25d366}
.welcome{position:relative;font-size:46px;font-weight:600;color:rgba(255,255,255,0.55);
  letter-spacing:0.02em;margin-bottom:10px}
.name{position:relative;font-family:'Playfair Display',serif;font-weight:700;
  font-size:128px;line-height:1.0;letter-spacing:-0.02em;margin-bottom:48px;
  background:linear-gradient(135deg,#ffffff 0%,#4ade80 100%);
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.sub{position:relative;font-size:42px;font-weight:600;color:#fff;line-height:1.4;
  max-width:780px;margin-bottom:18px}
.sub em{font-family:'Playfair Display',serif;font-style:italic;color:#4ade80;font-weight:500}
.tag{position:relative;font-size:30px;color:rgba(255,255,255,0.5);margin-top:36px}
.divider{position:relative;width:90px;height:5px;border-radius:999px;
  background:linear-gradient(90deg,#25d366,transparent);margin:40px 0}
.datebox{position:relative;margin-top:18px;display:flex;flex-direction:column;align-items:center;gap:8px;
  background:rgba(37,211,102,0.1);border:2px solid rgba(37,211,102,0.35);border-radius:24px;padding:24px 44px}
.datebox span{font-size:26px;color:rgba(255,255,255,0.55);font-weight:500}
.datebox strong{font-family:'Playfair Display',serif;font-size:40px;color:#4ade80;font-weight:700}
</style></head>
<body>
<div class="card">
  <div class="glow1"></div>
  <div class="glow2"></div>
  <div class="badge"><span class="dot"></span>You're In</div>
  <div class="welcome">Welcome,</div>
  <div class="name">${safe}!</div>
  <div class="divider"></div>
  <div class="sub">Your seat in the<br><em>FREE 7-Day WhatsApp Challenge</em><br>is confirmed 🎉</div>
  <div class="datebox"><span>📅 Your challenge starts</span><strong>${dateSafe}</strong></div>
  <div class="tag">1 tiny habit a day · delivered on WhatsApp</div>
</div>
</body></html>`;
}

export async function POST(request: Request) {
  try {
    const { firstName, startDate } = await request.json();
    if (!firstName) return NextResponse.json({ error: "firstName required" }, { status: 400 });

    const html = buildWelcomeHTML(firstName, startDate || "tomorrow, 6 AM");

    // Render HTML → PNG via Gotenberg's screenshot endpoint (free public instance)
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
    if (!gotenbergRes.ok) {
      throw new Error(`Gotenberg screenshot failed: ${gotenbergRes.status}`);
    }
    const pngBuffer = Buffer.from(await gotenbergRes.arrayBuffer());

    // Upload to Supabase
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase credentials not configured");
    }
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const safeName = firstName.replace(/\s+/g, "-").toLowerCase().replace(/[^a-z0-9-]/g, "");
    const filename = `welcome-${safeName}-${Date.now()}.png`;

    const { error: uploadError } = await supabase.storage
      .from("reports")
      .upload(filename, pngBuffer, { contentType: "image/png", upsert: true });
    if (uploadError) throw new Error(`Supabase upload failed: ${uploadError.message}`);

    const { data: urlData } = supabase.storage.from("reports").getPublicUrl(filename);

    return NextResponse.json({ success: true, firstName, imageUrl: urlData.publicUrl });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[welcome-image]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
