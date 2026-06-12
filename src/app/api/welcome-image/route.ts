import { NextResponse } from "next/server";

/**
 * Generates a personalized welcome IMAGE (PNG) with the member's first name,
 * uploads it to Supabase, and returns a public URL the WhatsApp engine can
 * attach to the confirmation message.
 *
 * Same pipeline as the report PDF: HTML → Gotenberg screenshot → Supabase.
 */

function buildWelcomeHTML(firstName: string, startDate: string): string {
  const safe = (firstName || "Friend").replace(/[<>&]/g, "").slice(0, 18);
  const dateSafe = (startDate || "tomorrow").replace(/[<>&]/g, "").slice(0, 40);
  // Personalized version of the static Sun/Heart/Moon WELCOME banner. Same look:
  // light-green radial gradient, WhatsApp glyph + confetti up top, big green
  // "Welcome <Name>!", the challenge line, the start date, and the three line
  // icons (smiling sun · heartbeat · crescent moon). Rendered square 1080x1080.
  const confetti = [
    [60, 90, "#3ddc84", 8], [200, 50, "#d4af37", -14], [340, 120, "#9be7b4", 20],
    [480, 60, "#ffffff", 35], [620, 130, "#3ddc84", -22], [760, 55, "#d4af37", 12],
    [900, 115, "#9be7b4", -30], [1000, 70, "#ffffff", 18], [140, 200, "#3ddc84", 25],
    [930, 210, "#d4af37", 40], [40, 320, "#9be7b4", -18], [1020, 330, "#3ddc84", -12],
    [280, 40, "#ffffff", 30], [700, 200, "#9be7b4", -25], [420, 175, "#d4af37", 15],
    [840, 175, "#ffffff", -20], [120, 430, "#9be7b4", 22], [960, 440, "#3ddc84", -16],
  ].map(([x, y, c, r]) =>
    `<div class="conf" style="left:${x}px;top:${y}px;background:${c};transform:rotate(${r}deg)"></div>`
  ).join("");
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1080px;overflow:hidden}
.card{width:1080px;height:1080px;position:relative;overflow:hidden;
  font-family:'Inter',-apple-system,sans-serif;
  background:radial-gradient(120% 120% at 50% 38%, #ffffff 0%, #eafaf0 44%, #c9f0d6 78%, #a8e6bf 100%);
  display:flex;flex-direction:column;align-items:center;justify-content:center;padding-bottom:40px;}
.conf{position:absolute;width:30px;height:13px;border-radius:3px;opacity:0.95}
.wa{width:120px;height:120px;border-radius:50%;
  background:#25d366;display:flex;align-items:center;justify-content:center;
  box-shadow:0 14px 34px -10px rgba(37,211,102,0.6);position:relative;z-index:2;margin-bottom:46px}
.wa svg{width:72px;height:72px;fill:#fff}
.welcome{font-size:118px;font-weight:900;color:#1aa84f;
  letter-spacing:-0.02em;line-height:1.0;text-align:center;position:relative;z-index:2;
  text-shadow:0 2px 0 rgba(255,255,255,0.6);padding:0 40px}
.title{margin-top:26px;font-size:60px;font-weight:800;color:#15924a;
  letter-spacing:-0.01em;text-align:center;position:relative;z-index:2}
.date{margin-top:30px;font-size:46px;font-weight:700;color:#1f8a47;
  background:rgba(255,255,255,0.6);border-radius:18px;padding:14px 40px;
  text-align:center;position:relative;z-index:2}
.icons{margin-top:64px;display:flex;gap:120px;align-items:center;position:relative;z-index:2}
.icons svg{width:118px;height:118px;stroke:#1f7a43;stroke-width:5;fill:none;
  stroke-linecap:round;stroke-linejoin:round}
</style></head>
<body>
<div class="card">
  ${confetti}
  <div class="wa">
    <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.07zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
  </div>
  <div class="welcome">Welcome ${safe}!</div>
  <div class="title">7-Day WhatsApp Challenge</div>
  <div class="date">📅 Starts ${dateSafe}</div>
  <div class="icons">
    <svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="13"/><circle cx="27.5" cy="30" r="1.6" fill="#1f7a43" stroke="none"/><circle cx="36.5" cy="30" r="1.6" fill="#1f7a43" stroke="none"/><path d="M27.5 35.5c1.6 2 7.4 2 9 0"/><path d="M32 7v6M32 51v6M7 32h6M51 32h6M13.5 13.5l4 4M46.5 46.5l4 4M50.5 13.5l-4 4M17.5 46.5l-4 4"/></svg>
    <svg viewBox="0 0 64 64"><path d="M6 38h11l5-15 8 26 6-17 4 6h12"/></svg>
    <svg viewBox="0 0 64 64"><path d="M41 12a20 20 0 100 40 16 16 0 010-40z"/><path d="M50 15l1.6 4.2 4.2 1.6-4.2 1.6-1.6 4.2-1.6-4.2-4.2-1.6 4.2-1.6z" fill="#1f7a43" stroke="none"/><circle cx="49" cy="40" r="1.9" fill="#1f7a43" stroke="none"/></svg>
  </div>
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

    // Store in Neon (replaces Supabase) and return the public /api/file URL.
    const { putFile } = await import("@/lib/fileStore");
    const safeName = firstName.replace(/\s+/g, "-").toLowerCase().replace(/[^a-z0-9-]/g, "");
    const filename = `welcome-${safeName}-${Date.now()}.png`;
    const imageUrl = await putFile(filename, pngBuffer, "image/png");

    return NextResponse.json({ success: true, firstName, imageUrl });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[welcome-image]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
