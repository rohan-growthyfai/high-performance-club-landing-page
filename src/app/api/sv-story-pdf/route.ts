import { NextResponse } from "next/server";
import { putFile } from "@/lib/fileStore";
import { neon } from "@neondatabase/serverless";

export const maxDuration = 120;

/**
 * StoryVerse — personalized PDF magazine generator.
 *
 * Takes a story + a child's name/gender, injects the child as the hero, and
 * builds a beautiful multi-page illustrated "bedtime magazine" PDF:
 *   Cover  → hero portrait + "{Name} and the ..." + theme badge
 *   Pages  → story text + one illustration each
 *   Ending → tonight's lesson + a bedtime question + collectible footer
 *
 * HTML → Gotenberg (Chromium) → PDF buffer → Neon fileStore → public URL.
 * Result is cached per (storyId|name|gender) so re-sends are instant.
 *
 * POST /api/sv-story-pdf
 *   body: { storyId, childName, childGender?, storiesReceived?, referralCode?, force? }
 * Returns: { success, pdfUrl, title }
 *
 * Env: DATABASE_URL
 */

type Gender = "boy" | "girl" | "neutral";

function pronouns(g: Gender) {
  switch (g) {
    case "boy":
      return { they: "he", them: "him", their: "his", theyre: "he's" };
    case "girl":
      return { they: "she", them: "her", their: "her", theyre: "she's" };
    default:
      return { they: "they", them: "them", their: "their", theyre: "they're" };
  }
}

function personalize(text: string, name: string, g: Gender): string {
  const p = pronouns(g);
  return (text || "")
    .replace(/\{name\}/g, name)
    .replace(/\{theyre\}/g, p.theyre)
    .replace(/\{they\}/g, p.they)
    .replace(/\{them\}/g, p.them)
    .replace(/\{their\}/g, p.their);
}

function esc(s: string): string {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

interface Story {
  id: string;
  title: string;
  theme: string;
  theme_emoji: string;
  lesson: string;
  bedtime_question: string;
  pages: Array<{ text: string; art_prompt: string }>;
  cover_image_url: string | null;
  page_image_urls: string[] | null;
}

function buildHTML(
  story: Story,
  name: string,
  g: Gender,
  storiesReceived: number,
  referralCode: string
): string {
  const title = personalize(story.title, name, g);
  const cover = story.cover_image_url || "";
  const pageImgs = story.page_image_urls || [];
  const collected = Math.max(storiesReceived, 1);

  // Story pages (text + illustration)
  const pageCards = story.pages
    .map((pg, i) => {
      const txt = esc(personalize(pg.text, name, g));
      const img = pageImgs[i] || cover;
      return `
      <section class="page story-page">
        <div class="scene">${img ? `<img src="${img}" alt=""/>` : ""}</div>
        <div class="para">${txt}</div>
        <div class="pagenum">${i + 1}</div>
      </section>`;
    })
    .join("");

  const question = esc(personalize(story.bedtime_question, name, g));
  const lesson = esc(personalize(story.lesson, name, g));
  const referUrl = referralCode
    ? `wa.me/919284612986?text=I%20found%20StoryVerse%20for%20${encodeURIComponent(name)}`
    : "storyverse";

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Quicksand:wght@400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --peach:#ffe8d6; --honey:#ffcf87; --cream:#fff7ec; --teal:#7fd1c4;
  --lav:#cdb4f0; --ink:#3a2f4a; --soft:#6b5f78; --gold:#e8a94b;
}
html,body{width:800px;font-family:'Quicksand',sans-serif;color:var(--ink);background:var(--cream)}
.page{width:800px;min-height:1000px;position:relative;overflow:hidden;page-break-after:always;padding:0}
.page:last-child{page-break-after:auto}

/* ── COVER ── */
.cover{background:
  radial-gradient(1200px 500px at 80% -10%, rgba(255,207,135,.7), transparent 60%),
  radial-gradient(900px 600px at -10% 110%, rgba(205,180,240,.6), transparent 60%),
  linear-gradient(160deg,#fff3e0 0%,#ffe8d6 45%,#f6e6ff 100%);
  display:flex;flex-direction:column;align-items:center;text-align:center;padding:54px 56px}
.brand{display:inline-flex;align-items:center;gap:8px;background:rgba(58,47,74,.92);color:#fff;
  padding:9px 20px;border-radius:999px;font-family:'Baloo 2';font-weight:700;font-size:15px;letter-spacing:.06em;box-shadow:0 6px 18px rgba(58,47,74,.25)}
.brand .star{color:var(--honey)}
.badge{margin-top:26px;display:inline-flex;align-items:center;gap:8px;background:#fff;border:2px solid var(--honey);
  color:var(--gold);font-family:'Baloo 2';font-weight:700;font-size:15px;padding:7px 18px;border-radius:999px;box-shadow:0 4px 14px rgba(232,169,75,.18)}
.tonight{margin-top:22px;font-family:'Quicksand';font-weight:600;color:var(--soft);font-size:16px;letter-spacing:.02em}
.cover-title{font-family:'Baloo 2';font-weight:800;font-size:50px;line-height:1.1;color:var(--ink);margin:8px 40px 0;text-shadow:0 2px 0 #fff}
.hero-frame{margin-top:26px;width:520px;height:520px;border-radius:34px;overflow:hidden;border:10px solid #fff;
  box-shadow:0 24px 50px rgba(58,47,74,.22);background:#fff}
.hero-frame img{width:100%;height:100%;object-fit:cover;display:block}
.cover-foot{margin-top:auto;padding-top:24px;color:var(--soft);font-size:14px;font-weight:600}

/* ── STORY PAGES ── */
.story-page{background:
  radial-gradient(700px 400px at 110% -5%, rgba(127,209,196,.28), transparent 60%),
  linear-gradient(180deg,#fff7ec 0%,#fff 100%);
  padding:60px 64px 72px;display:flex;flex-direction:column}
.scene{width:100%;height:470px;border-radius:28px;overflow:hidden;border:8px solid #fff;
  box-shadow:0 18px 40px rgba(58,47,74,.16);background:#f3ece0}
.scene img{width:100%;height:100%;object-fit:cover;display:block}
.para{margin-top:38px;font-family:'Quicksand';font-weight:500;font-size:26px;line-height:1.7;color:#4a3f58;letter-spacing:.005em}
.pagenum{position:absolute;bottom:26px;left:50%;transform:translateX(-50%);width:40px;height:40px;border-radius:50%;
  background:var(--honey);color:#fff;font-family:'Baloo 2';font-weight:800;font-size:18px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 10px rgba(232,169,75,.3)}

/* ── ENDING ── */
.ending{background:
  radial-gradient(1000px 600px at 50% -10%, rgba(205,180,240,.55), transparent 60%),
  linear-gradient(160deg,#f7ecff 0%,#fff3e0 100%);
  padding:64px 60px;display:flex;flex-direction:column;align-items:center;text-align:center}
.moon{font-size:52px;margin-bottom:6px}
.lesson-card{background:#fff;border-radius:28px;padding:34px 36px;margin-top:8px;box-shadow:0 16px 40px rgba(58,47,74,.14);width:100%}
.lesson-label{font-family:'Baloo 2';font-weight:800;color:var(--gold);font-size:16px;letter-spacing:.08em;text-transform:uppercase}
.lesson-text{font-family:'Baloo 2';font-weight:700;font-size:30px;line-height:1.35;color:var(--ink);margin-top:12px}
.q-card{background:linear-gradient(135deg,var(--teal),#5cb8ab);color:#fff;border-radius:28px;padding:34px 36px;margin-top:26px;width:100%;box-shadow:0 16px 40px rgba(92,184,171,.3)}
.q-label{font-family:'Baloo 2';font-weight:800;font-size:15px;letter-spacing:.08em;text-transform:uppercase;opacity:.95}
.q-text{font-family:'Baloo 2';font-weight:700;font-size:27px;line-height:1.4;margin-top:12px}
.collect{margin-top:30px;background:#fff;border:2px dashed var(--honey);border-radius:22px;padding:22px 28px;width:100%}
.collect-title{font-family:'Baloo 2';font-weight:800;font-size:20px;color:var(--ink)}
.collect-sub{font-size:15px;color:var(--soft);margin-top:6px;font-weight:600}
.stars{margin-top:14px;font-size:22px;letter-spacing:3px}
.refer{margin-top:26px;color:var(--soft);font-size:14px;font-weight:600;line-height:1.6}
.refer b{color:var(--gold)}
.foot{margin-top:22px;font-family:'Baloo 2';font-weight:700;color:var(--ink);font-size:16px}
.foot .star{color:var(--honey)}
</style></head><body>

<!-- COVER -->
<section class="page cover">
  <div class="brand"><span class="star">✦</span> STORYVERSE</div>
  <div class="badge">${esc(story.theme_emoji)} Week of ${esc(story.theme)}</div>
  <div class="tonight">Tonight's magical story for ${esc(name)}</div>
  <div class="cover-title">${title}</div>
  <div class="hero-frame">${cover ? `<img src="${cover}" alt=""/>` : ""}</div>
  <div class="cover-foot">A bedtime magazine made just for ${esc(name)} ✨</div>
</section>

<!-- STORY PAGES -->
${pageCards}

<!-- ENDING -->
<section class="page ending">
  <div class="moon">🌙</div>
  <div class="lesson-card">
    <div class="lesson-label">Tonight's Little Lesson</div>
    <div class="lesson-text">${lesson}</div>
  </div>
  <div class="q-card">
    <div class="q-label">A bedtime question to ask ${esc(name)}</div>
    <div class="q-text">"${question}"</div>
  </div>
  <div class="collect">
    <div class="collect-title">🏆 ${esc(name)}'s Story Collection</div>
    <div class="collect-sub">You've collected <b>${collected}</b> ${collected === 1 ? "story" : "stories"} so far — keep the magic going every night!</div>
    <div class="stars">${"⭐".repeat(Math.min(collected, 10))}</div>
  </div>
  <div class="refer">💛 Loved tonight's story? <b>Gift a friend's child 7 free stories.</b><br/>Share StoryVerse — every child deserves to be the hero.</div>
  <div class="foot"><span class="star">✦</span> StoryVerse · One magical story every night</div>
</section>

</body></html>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const storyId: string = body.storyId;
    const childName: string = (body.childName || "").trim();
    const childGender: Gender = (body.childGender || "neutral") as Gender;
    const storiesReceived: number = Number(body.storiesReceived) || 1;
    const referralCode: string = body.referralCode || "";
    const force: boolean = !!body.force;

    if (!storyId || !childName) {
      return NextResponse.json({ error: "storyId and childName required" }, { status: 400 });
    }
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      return NextResponse.json({ error: "DATABASE_URL not set" }, { status: 500 });
    }
    const sql = neon(dbUrl);

    // Cache key: same (story, name, gender) → same magazine. But we WANT the
    // collection counter to update per delivery, so cache only when not passing a
    // meaningful counter; simplest & safe: cache by story|name|gender and ignore
    // the counter for the cached PDF. For personalized freshness we skip cache
    // when force=true (used by first-send / previews).
    const cacheKey = `${storyId}|${childName.toLowerCase()}|${childGender}`;

    if (!force) {
      const cached = (await sql`
        SELECT pdf_url FROM sv_pdf_cache WHERE cache_key = ${cacheKey} LIMIT 1`) as Array<{
        pdf_url: string;
      }>;
      if (cached.length) {
        return NextResponse.json({ success: true, pdfUrl: cached[0].pdf_url, cached: true });
      }
    }

    const rows = (await sql`
      SELECT id, title, theme, theme_emoji, lesson, bedtime_question, pages,
             cover_image_url, page_image_urls
      FROM sv_stories WHERE id = ${storyId} LIMIT 1`) as unknown as Story[];
    if (!rows.length) {
      return NextResponse.json({ error: "story not found" }, { status: 404 });
    }
    const story = rows[0];

    const html = buildHTML(story, childName, childGender, storiesReceived, referralCode);

    const form = new FormData();
    form.append("files", new Blob([html], { type: "text/html" }), "index.html");
    form.append("paperWidth", "8.27"); // A4-ish portrait to match 800px layout nicely
    form.append("paperHeight", "10.34");
    form.append("marginTop", "0");
    form.append("marginBottom", "0");
    form.append("marginLeft", "0");
    form.append("marginRight", "0");
    form.append("printBackground", "true");
    form.append("preferCssPageSize", "false");

    const got = await fetch("https://demo.gotenberg.dev/forms/chromium/convert/html", {
      method: "POST",
      body: form,
    });
    if (!got.ok) {
      const t = await got.text();
      throw new Error(`Gotenberg failed: ${got.status} ${t.slice(0, 120)}`);
    }
    const pdfBuffer = Buffer.from(await got.arrayBuffer());

    const nameSlug = childName.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 20) || "child";
    const filename = `sv-${storyId}-${nameSlug}-${childGender}.pdf`;
    const pdfUrl = await putFile(filename, pdfBuffer, "application/pdf");

    // Cache it (upsert)
    await sql`
      INSERT INTO sv_pdf_cache (cache_key, pdf_url) VALUES (${cacheKey}, ${pdfUrl})
      ON CONFLICT (cache_key) DO UPDATE SET pdf_url = EXCLUDED.pdf_url, created_at = now()`;

    return NextResponse.json({
      success: true,
      pdfUrl,
      title: personalize(story.title, childName, childGender),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[sv-story-pdf]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
