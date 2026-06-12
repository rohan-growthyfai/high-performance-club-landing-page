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
  // Personalized version of the static Sun/Heart/Moon WELCOME banner: rich green
  // corner-vignette gradient over a white center, dense green/gold/white confetti
  // + sparkles, WhatsApp glyph, big green "Welcome <Name>!", the challenge line,
  // the start date, and three filled icons (smiling sun · heart · crescent moon).
  // Rendered square 1080x1080.
  //
  // Confetti: a deterministic scatter of rectangles + small circles ("sparkles")
  // densely covering the top band and corners, in the brand green/gold/white mix.
  const COLORS = ["#2bb673", "#3ddc84", "#9be7b4", "#d4af37", "#e8c766", "#ffffff", "#1aa84f"];
  const pieces: string[] = [];
  // pseudo-random but fixed (no Math.random — keeps renders consistent)
  let seed = 12345;
  const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  for (let i = 0; i < 70; i++) {
    const x = Math.round(rnd() * 1080);
    // bias toward the top third + a lighter sprinkle lower down
    const y = i < 50 ? Math.round(rnd() * 360) : Math.round(360 + rnd() * 680);
    const c = COLORS[Math.floor(rnd() * COLORS.length)];
    const rot = Math.round(rnd() * 360);
    const op = (0.6 + rnd() * 0.4).toFixed(2);
    if (rnd() < 0.42) {
      // sparkle (small circle/dot)
      const d = 8 + Math.round(rnd() * 12);
      pieces.push(`<div class="spark" style="left:${x}px;top:${y}px;width:${d}px;height:${d}px;background:${c};opacity:${op}"></div>`);
    } else {
      // confetti rectangle
      const w = 22 + Math.round(rnd() * 16);
      const h = 9 + Math.round(rnd() * 7);
      pieces.push(`<div class="conf" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:${c};transform:rotate(${rot}deg);opacity:${op}"></div>`);
    }
  }
  const confetti = pieces.join("");
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1080px;overflow:hidden}
.card{width:1080px;height:1080px;position:relative;overflow:hidden;
  font-family:'Inter',-apple-system,sans-serif;
  /* rich green vignette in all four corners, fading to a clean white center */
  background:
    radial-gradient(60% 55% at 0% 0%, rgba(43,182,115,0.55) 0%, rgba(43,182,115,0) 60%),
    radial-gradient(60% 55% at 100% 0%, rgba(43,182,115,0.55) 0%, rgba(43,182,115,0) 60%),
    radial-gradient(65% 60% at 0% 100%, rgba(26,168,79,0.6) 0%, rgba(26,168,79,0) 62%),
    radial-gradient(65% 60% at 100% 100%, rgba(26,168,79,0.6) 0%, rgba(26,168,79,0) 62%),
    radial-gradient(120% 120% at 50% 45%, #ffffff 0%, #f1fbf5 50%, #d6f3e0 80%, #aee9c4 100%);
  display:flex;flex-direction:column;align-items:center;justify-content:center;padding-bottom:40px;}
.conf{position:absolute;border-radius:3px}
.spark{position:absolute;border-radius:50%;box-shadow:0 0 6px rgba(255,255,255,0.4)}
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
.icons svg{width:120px;height:120px;fill:#1f7a43}
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
    <!-- SUN: filled disc with rays + smiling face (face cut out in white) -->
    <svg viewBox="0 0 64 64">
      <circle cx="32" cy="30" r="15"/>
      <g stroke="#1f7a43" stroke-width="4" stroke-linecap="round">
        <line x1="32" y1="4" x2="32" y2="11"/>
        <line x1="32" y1="49" x2="32" y2="56"/>
        <line x1="6" y1="30" x2="13" y2="30"/>
        <line x1="51" y1="30" x2="58" y2="30"/>
        <line x1="13.5" y1="11.5" x2="18.5" y2="16.5"/>
        <line x1="45.5" y1="43.5" x2="50.5" y2="48.5"/>
        <line x1="50.5" y1="11.5" x2="45.5" y2="16.5"/>
        <line x1="18.5" y1="43.5" x2="13.5" y2="48.5"/>
      </g>
      <circle cx="27" cy="28" r="1.9" fill="#fff"/>
      <circle cx="37" cy="28" r="1.9" fill="#fff"/>
      <path d="M26 34c2.2 2.6 9.8 2.6 12 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>
    </svg>
    <!-- HEART: solid filled heart -->
    <svg viewBox="0 0 64 64">
      <path d="M32 56S6 40 6 22.5C6 13.4 13.4 6 22.5 6c5.6 0 10.5 2.9 13.5 7.3C39 8.9 43.9 6 49.5 6 58.6 6 66 13.4 66 22.5 66 40 32 56 32 56z" transform="translate(-2,0)"/>
    </svg>
    <!-- MOON: crescent + two stars -->
    <svg viewBox="0 0 64 64">
      <path d="M44 8a24 24 0 100 48 19 19 0 010-48z"/>
      <path d="M50 10l1.8 4.6 4.6 1.8-4.6 1.8-1.8 4.6-1.8-4.6-4.6-1.8 4.6-1.8z"/>
      <circle cx="52" cy="40" r="2.4"/>
    </svg>
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
