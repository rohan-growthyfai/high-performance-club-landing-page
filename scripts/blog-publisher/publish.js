/**
 * HPC Blog Auto-Publisher
 * - openai/gpt-4o-mini via OpenRouter for article + 1 contextual inline CTA
 * - google/gemini-2.5-flash-image via OpenRouter for hero image
 * - Newest article appears first in the blog index
 * - Strict dedup: checks filesystem + index + state.json — never publishes same slug twice
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Repo location ─────────────────────────────────────────────────────────────
// ACTIONS_MODE (GitHub Actions): the script runs INSIDE the checked-out repo, so
//   the repo root is two levels up from scripts/blog-publisher/. Actions handles
//   git auth + push itself — no clone or token needed in the script.
// Local (default): write to the sibling landing-page folder.
const ACTIONS_MODE = String(process.env.ACTIONS_MODE || "").toLowerCase() === "true";

const REPO_ROOT = ACTIONS_MODE
  ? path.resolve(__dirname, "../..")            // scripts/blog-publisher/ -> repo root
  : path.resolve(__dirname, "../../landing-page");

const BLOGS_DIR = path.join(REPO_ROOT, "src/app/blogs");
const BLOGS_INDEX = path.join(BLOGS_DIR, "page.tsx");
const PUBLIC_DIR = path.join(REPO_ROOT, "public/blog-images");
const STATE_FILE = path.join(__dirname, "state.json");
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY || "";
if (!OPENROUTER_KEY) {
  console.error("Missing OPENROUTER_API_KEY env var. Set it as a GitHub Actions secret (or export it locally).");
  process.exit(1);
}

// ── Topic pool ───────────────────────────────────────────────────────────────
const TOPICS = [
  // ── Data-driven (auto-updated 7 Jun 2026) ──
  { keyword:"sleep habits better energy tips", title:"Sleep Habits Better Energy: Advanced Tips That Actually Work", slug:"sleep-habits-better-energy-tips-guide", category:"Health Habits", emoji:"😴", accent:"#8b5cf6" },

  { keyword:"how to increase energy levels naturally", title:"How to Increase Energy Levels Naturally (Without Coffee or Supplements)", slug:"how-to-increase-energy-levels-naturally", category:"Health Habits", emoji:"⚡", accent:"#10b981" },
  { keyword:"how to be more productive at work", title:"How to Be More Productive at Work: 8 Daily Habits That Actually Work", slug:"how-to-be-more-productive-at-work-india", category:"Productivity Habits", emoji:"📈", accent:"#f97316" },
  { keyword:"how to sleep better at night naturally", title:"How to Sleep Better at Night: 7 Science-Backed Habits That Actually Work", slug:"how-to-sleep-better-at-night-naturally", category:"Health Habits", emoji:"😴", accent:"#8b5cf6" },
  { keyword:"how to stop procrastinating and get things done", title:"How to Stop Procrastinating: The Only Guide You Need in 2026", slug:"how-to-stop-procrastinating-get-things-done", category:"Productivity Habits", emoji:"🎯", accent:"#ef4444" },
  { keyword:"best habits for mental focus and concentration", title:"Best Habits for Mental Focus and Concentration (Tested in 2026)", slug:"best-habits-for-mental-focus-concentration", category:"Focus Habits", emoji:"🧠", accent:"#6366f1" },
  { keyword:"morning routine habits for high performance", title:"Morning Routine Habits for High Performance: What Actually Works", slug:"morning-routine-habits-high-performance", category:"Health Habits", emoji:"🌅", accent:"#b8853a" },
  { keyword:"how to build better relationships daily habits", title:"How to Build Better Relationships: 6 Daily Habits That Transform Your Connections", slug:"how-to-build-better-relationships-daily-habits", category:"Relationships", emoji:"🤝", accent:"#f59e0b" },
  { keyword:"top habits of highly efficient people 2026", title:"Top Habits of Highly Efficient People (2026 Edition)", slug:"top-habits-highly-efficient-people-india-2026", category:"Productivity Habits", emoji:"🏆", accent:"#0ea5e9" },
  { keyword:"what are the top habits for success in life", title:"What Are the Top Habits for Success? 10 That Changed Real Lives", slug:"top-habits-for-success-in-life", category:"Habit Science", emoji:"🔬", accent:"#8b5cf6" },
  { keyword:"phone addiction digital detox habits 2026", title:"Phone Addiction in 2026: The Digital Detox Habits That Actually Break the Cycle", slug:"phone-addiction-digital-detox-habits-2026", category:"Focus Habits", emoji:"📵", accent:"#ec4899" },
  { keyword:"evening routine habits for better sleep and recovery", title:"Evening Routine Habits for Better Sleep, Faster Recovery, and Calmer Nights", slug:"evening-routine-habits-better-sleep-recovery", category:"Health Habits", emoji:"🌙", accent:"#6366f1" },
  { keyword:"habit stacking technique productivity", title:"Habit Stacking: The Technique That Lets You Build 5 Habits at Once", slug:"habit-stacking-technique-productivity-india", category:"Habit Science", emoji:"🔗", accent:"#10b981" },
  { keyword:"work from home focus habits 2026", title:"Work From Home Focus Habits in 2026: What High Performers Actually Do", slug:"work-from-home-focus-habits-2026-india", category:"Focus Habits", emoji:"🏠", accent:"#0ea5e9" },
  { keyword:"how to build self discipline habits that stick", title:"How to Build Self-Discipline: The Only Habit System You Need", slug:"how-to-build-self-discipline-habits-that-stick", category:"Productivity Habits", emoji:"💪", accent:"#06b6d4" },
  { keyword:"how to reduce stress habits mindfulness", title:"How to Reduce Stress: 7 Daily Habits That Actually Work for Busy Professionals", slug:"how-to-reduce-stress-habits-mindfulness-india", category:"Health Habits", emoji:"🧘", accent:"#84cc16" },
  { keyword:"5 minute habits that change your life", title:"5-Minute Habits That Change Your Life: The Micro-Habit Revolution", slug:"5-minute-habits-that-change-your-life-india", category:"Habit Science", emoji:"⏱️", accent:"#f97316" },
  { keyword:"how to improve mental health daily habits", title:"How to Improve Mental Health: 8 Daily Habits That Make a Real Difference", slug:"how-to-improve-mental-health-daily-habits-india", category:"Health Habits", emoji:"💚", accent:"#10b981" },
  { keyword:"how to wake up early morning habit", title:"How to Wake Up Early: A Practical Habit System for People Who Hate Mornings", slug:"how-to-wake-up-early-morning-habit-india", category:"Health Habits", emoji:"⏰", accent:"#b8853a" },
  { keyword:"atomic habits key lessons 2026", title:"Atomic Habits Key Lessons: What Actually Works in 2026", slug:"atomic-habits-key-lessons-india-2026", category:"Habit Science", emoji:"⚛️", accent:"#6366f1" },
  { keyword:"daily routine for high performance person", title:"The Ideal Daily Routine for a High Performance Person (That Actually Fits Real Life)", slug:"daily-routine-high-performance-person-india", category:"Productivity Habits", emoji:"📋", accent:"#f97316" },
  { keyword:"how to exercise habit busy schedule", title:"How to Build an Exercise Habit When You Have Zero Time", slug:"how-to-build-exercise-habit-busy-schedule-india", category:"Health Habits", emoji:"🏃", accent:"#06b6d4" },
  { keyword:"journaling habit benefits productivity", title:"Why Journaling is the One Habit Most High Performers Swear By", slug:"journaling-habit-benefits-productivity-india", category:"Productivity Habits", emoji:"📓", accent:"#f59e0b" },
  { keyword:"how to drink more water daily habit", title:"How to Drink More Water: The Tiny Habit That Transforms Your Energy and Focus", slug:"how-to-drink-more-water-daily-habit-india", category:"Health Habits", emoji:"💧", accent:"#0ea5e9" },
  { keyword:"best books on habits and productivity 2026", title:"Best Books on Habits and Productivity in 2026: What to Read and What to Actually Do", slug:"best-books-habits-productivity-2026", category:"Habit Science", emoji:"📚", accent:"#8b5cf6" },
];

// ── State ────────────────────────────────────────────────────────────────────

function loadState() {
  if (!fs.existsSync(STATE_FILE)) return { published: [] };
  return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function slugExists(slug) {
  return fs.existsSync(path.join(BLOGS_DIR, slug, "page.tsx"));
}

// Read all slugs already listed in the blog index file
function slugsInIndex() {
  try {
    const content = fs.readFileSync(BLOGS_INDEX, "utf8");
    const matches = content.matchAll(/slug:"([^"]+)"/g);
    return new Set([...matches].map(m => m[1]));
  } catch { return new Set(); }
}

// Static list as fallback only.
function pickFromStaticList(state) {
  const inIndex = slugsInIndex();
  for (const topic of TOPICS) {
    const alreadyDone = state.published.includes(topic.slug)
      || slugExists(topic.slug) || inIndex.has(topic.slug);
    if (!alreadyDone) return topic;
  }
  return null;
}

// All slugs+titles we've ever used (filesystem + index) — so AI never repeats one.
function existingTitlesAndSlugs() {
  const slugs = new Set();
  try {
    for (const d of fs.readdirSync(BLOGS_DIR)) {
      if (fs.existsSync(path.join(BLOGS_DIR, d, "page.tsx"))) slugs.add(d);
    }
  } catch {}
  for (const s of slugsInIndex()) slugs.add(s);
  return [...slugs];
}

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 70);

// ── AI trend-aware, SEO topic generator ──────────────────────────────────────
// Each run, ask the model for a HIGH search-intent, currently-relevant blog
// topic in the habits/health/sleep/energy/productivity niche — the kind of
// long-tail query people actually Google ("how to…", "why…", "best…", "X vs Y",
// "for busy professionals", year-stamped) — and that's realistic to rank for.
// We pass the list of already-published slugs so it never repeats.
async function pickTopicWithAI(state) {
  const used = existingTitlesAndSlugs();
  const month = new Date().toLocaleString("en", { month: "long" });
  const year = new Date().getFullYear();

  const prompt = `You are an SEO content strategist for "High Performance Club", a brand teaching tiny daily habits for more ENERGY, better HEALTH, and better SLEEP, aimed at busy Indian professionals aged 25-45.

Today is ${month} ${year}. Propose ONE new, high-value blog article topic that real people are actively searching for on Google right now in the habits / health / sleep / energy / focus / productivity / wellness space.

Pick a topic with strong, realistic SEARCH INTENT and rankability — favour long-tail, question-style, or "best/how-to/why" queries that get steady search volume (e.g. "how to fix afternoon energy crash", "morning habits for better focus", "natural ways to sleep deeper", "5-minute habits for busy professionals"). Prefer evergreen + currently-relevant angles. India-relevant where natural.

Do NOT reuse any of these already-published slugs:
${used.join(", ")}

Return ONLY a compact JSON object, no markdown, with exactly these keys:
{"keyword":"the primary search keyword/phrase (lowercase, what people type into Google)","title":"a compelling, click-worthy, SEO blog title under 65 characters","slug":"url-slug-in-kebab-case","category":"one of: Health Habits | Productivity Habits | Focus Habits | Habit Science | Relationships","emoji":"one relevant emoji","accent":"a hex color like #10b981"}`;

  try {
    const raw = await openrouter({
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,
    });
    const json = JSON.parse(raw.replace(/```json|```/g, "").trim());
    let slug = slugify(json.slug || json.title || json.keyword);
    // Guarantee uniqueness against filesystem + index.
    if (slugExists(slug) || slugsInIndex().has(slug)) {
      slug = slugify(`${slug}-${month.toLowerCase()}-${year}`);
    }
    let n = 2;
    while (slugExists(slug) || slugsInIndex().has(slug)) {
      slug = slugify(`${json.slug || json.title}-${n++}`);
      if (n > 20) break;
    }
    return {
      keyword: json.keyword || json.title,
      title: json.title,
      slug,
      category: json.category || "Health Habits",
      emoji: json.emoji || "💡",
      accent: json.accent || "#10b981",
    };
  } catch (e) {
    console.warn(`  ⚠ AI topic generation failed (${e.message}) — falling back to static list.`);
    return null;
  }
}

// Primary entry: try AI trend topic first, fall back to static list, then dated variant.
async function pickNextTopic(state) {
  const aiTopic = await pickTopicWithAI(state);
  if (aiTopic && !slugExists(aiTopic.slug) && !slugsInIndex().has(aiTopic.slug)) {
    console.log("  ✓ AI-generated trend topic");
    return aiTopic;
  }
  const fromList = pickFromStaticList(state);
  if (fromList) return fromList;
  // Last-resort dated variant of a static topic.
  const month = new Date().toLocaleString("en", { month: "short" }).toLowerCase();
  const year = new Date().getFullYear();
  for (const topic of TOPICS) {
    const variantSlug = `${topic.slug}-${month}-${year}`;
    if (!slugExists(variantSlug) && !slugsInIndex().has(variantSlug)) {
      return { ...topic, slug: variantSlug, title: `${topic.title} (${month} ${year})` };
    }
  }
  return TOPICS[0];
}

// ── OpenRouter fetch helper ──────────────────────────────────────────────────

async function openrouter(body) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://highperformanceclub.co",
      "X-Title": "HPC Blog Publisher",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`OpenRouter ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices[0].message.content.trim();
}

// ── Image generation via Gemini on OpenRouter ────────────────────────────────
// Uses google/gemini-2.5-flash-image — returns base64 PNG in message.images[]

async function generateAndSaveImage(topic) {
  console.log("  Generating hero image with Gemini (OpenRouter)...");

  const imagePrompt = `Generate a high-quality photorealistic editorial lifestyle photograph for a blog article about "${topic.keyword}".
Scene: Modern aspirational setting relevant to the topic. Warm natural lighting. Clean minimal background.
Style: Magazine editorial photography. Warm golden tones. No text, no watermarks, no logos, no people's faces shown closely.`;

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://highperformanceclub.co",
        "X-Title": "HPC Blog Publisher",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [{ role: "user", content: imagePrompt }],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.warn(`  ⚠ Image API error ${res.status}: ${err.slice(0, 120)}`);
      return null;
    }

    const data = await res.json();
    // Gemini returns the image in message.images[] as base64 data URLs
    const images = data.choices?.[0]?.message?.images;
    if (!images || images.length === 0) {
      console.warn("  ⚠ No images in response");
      return null;
    }

    const dataUrl = images[0]?.image_url?.url || "";
    if (!dataUrl.startsWith("data:image")) {
      console.warn("  ⚠ Unexpected image format");
      return null;
    }

    // Decode base64 and save to public/blog-images/
    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    const filename = `${topic.slug}.png`;
    const localPath = path.join(PUBLIC_DIR, filename);
    const publicPath = `/blog-images/${filename}`;

    fs.writeFileSync(localPath, buffer);
    const sizeKB = Math.round(buffer.length / 1024);
    console.log(`  ✓ Hero image generated by Gemini: ${publicPath} (${sizeKB}KB)`);
    return publicPath;

  } catch (e) {
    console.warn("  ⚠ Image generation failed:", e.message);
    return null;
  }
}



// ── Article + contextual CTAs generation ────────────────────────────────────

async function generateArticle(topic) {
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  const systemPrompt = `You are an expert SEO content writer for a health and habits blog. Your tone is warm, direct, conversational, and science-backed — like a knowledgeable friend who genuinely wants to help. Never preachy.

CRITICAL RULES:
- Never mention India, Indians, or any specific country or nationality. Write for a universal global audience.
- Never use the abbreviation "HPC". Always write "High Performance Club" in full.
- Habits must be UNIQUE, SURPRISING, and FRESH — not generic advice readers have seen before.`;

  const userPrompt = `Write a complete, SEO-optimised blog article on the topic below.

Primary keyword: "${topic.keyword}"
Title: "${topic.title}"
Target reader: busy professional aged 25-45 who struggles to maintain healthy habits
Length: 1200-1500 words
Date: ${today}

═══════════════════════════════════════════════════
HABITS SECTION STANDARDS — THIS IS THE MOST IMPORTANT PART
═══════════════════════════════════════════════════

Every habit you include MUST pass ALL five of these filters:
1. Is it directly relevant to the blog topic?
2. Can the reader implement it today?
3. Is there a scientific or logical reason why it works (briefly explain the mechanism)?
4. Would the average reader likely find it FRESH or surprising — not something they already know?
5. Does it offer a unique perspective vs. typical blog advice?

If any answer is "No" — improve, reframe, or replace the habit.

UNIQUENESS STANDARD:
- 90% of habits must be uncommon, surprising, or presented from a fresh perspective
- Readers should think: "I've never thought of doing it that way" or "I can try this today"
- Generic habits (drink more water, go for a walk, practice gratitude) must NEVER appear in their standard form
- They must be reframed with a specific mechanism, trigger, or context that makes them feel new

EXAMPLES of upgrading generic → unique:
❌ Drink more water
✅ Drink 500ml of water at every task transition (meeting→work, work→lunch). This creates a psychological reset point and reduces cognitive carryover between activities.

❌ Go for a walk
✅ Take a 7-minute "decision walk" before making any important choice. Movement increases cognitive flexibility and creative problem-solving — the walk primes a different mental state before you decide.

❌ Practice gratitude
✅ End each day by identifying one problem that did NOT happen. This trains the brain to notice invisible wins and rebalances the negativity bias.

Each habit should:
- Name the habit clearly
- Explain exactly what to do (specific trigger, timing, or context)
- Give the brief scientific/logical reason WHY it works
- Feel immediately actionable

═══════════════════════════════════════════════════
ARTICLE STRUCTURE
═══════════════════════════════════════════════════
- Use the primary keyword naturally in the first 100 words
- 4-6 H2 subheadings using related keywords naturally
- 1-2 H3 subheadings where appropriate
- End with a FAQ section: 3 People Also Ask questions with answers

═══════════════════════════════════════════════════
CTA — EXACTLY ONE INLINE CTA
═══════════════════════════════════════════════════
Place ONE contextual inline CTA after the 2nd H2 section. Rules:
- Must flow naturally from the paragraph above it
- Must reference that paragraph's specific concept, then connect to the High Performance Club free WhatsApp challenge
- Format: <p class="inline-cta"><a href="/">YOUR CTA TEXT →</a></p>

CORE PHRASE — this exact text never changes:
"join the FREE 7 Days Habits WhatsApp Challenge and get 1 tiny good habit delivered in your WhatsApp daily"

Structure: [Opening sentence about reader's specific pain point] — [CORE PHRASE] — [brief benefit specific to this article's topic] →

RULES:
- The opening sentence must relate directly to what was just discussed in the paragraph above
- Do NOT add "Try the" or "Join" before the core phrase — the core phrase already starts with "join"
- The opening sentence ends with " — " (em dash) before the core phrase begins
- After the core phrase, add " — " and a short closing benefit relevant to the topic
- The whole thing must read as ONE natural flowing sentence

Good example (sleep article — after discussing sleep cycles):
<p class="inline-cta"><a href="/">Still waking up groggy no matter how long you sleep — join the FREE 7 Days Habits WhatsApp Challenge and get 1 tiny good habit delivered in your WhatsApp daily — most people notice a real shift by Day 3. →</a></p>

Good example (focus article — after discussing distractions):
<p class="inline-cta"><a href="/">If distractions keep pulling you away from deep work — join the FREE 7 Days Habits WhatsApp Challenge and get 1 tiny good habit delivered in your WhatsApp daily — small daily shifts create lasting focus. →</a></p>

Good example (productivity article — after discussing procrastination):
<p class="inline-cta"><a href="/">If getting started is always the hardest part of your day — join the FREE 7 Days Habits WhatsApp Challenge and get 1 tiny good habit delivered in your WhatsApp daily — it takes less than 5 minutes. →</a></p>

Bad (NEVER do these):
❌ Join the Try the FREE... (doubled action word)
❌ Try the FREE 7 Days... (wrong — core phrase starts with "join", not "try")
❌ Join our free challenge (too vague — missing the core phrase)
❌ Curious how habits work? Join the free... (context-less opening)

Final callout box (after FAQ, absolute end):
<div class="callout">
<p><strong>Ready to stop reading and start doing?</strong> Try the FREE 7 Days Habits WhatsApp Challenge and get 1 tiny good habit delivered in your WhatsApp daily. 7 days. Completely free. No app, no login, no complicated routine.</p>
<a href="/">Start the FREE 7 Days Habits WhatsApp Challenge →</a>
</div>

═══════════════════════════════════════════════════
FORMATTING — raw HTML only
═══════════════════════════════════════════════════
- Paragraphs: <p>text</p>
- Headings: <h2>text</h2> and <h3>text</h3>
- Bold: <strong>text</strong>
- Lists: <ul><li>item</li></ul> or <ol><li>item</li></ol>
- Dividers: <hr style="border:none;border-top:1px solid #e2dfd6;margin:40px 0" />
- Use &amp; for &, &apos; for apostrophes, &ldquo; and &rdquo; for curly quotes
- NO markdown, NO code fences, NO explanation, NO wrapping tags
- Return raw HTML content only`;

  const raw = await openrouter({
    model: "openai/gpt-4o-mini",
    max_tokens: 3500,
    temperature: 0.75,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  return raw.replace(/^```html?\n?/i, "").replace(/\n?```$/i, "").trim();
}

// ── File writers ─────────────────────────────────────────────────────────────

function writePageTsx(topic, htmlContent, heroImagePath) {
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const safeTitle = topic.title.replace(/"/g, "&quot;");
  const safeKeyword = topic.keyword.replace(/"/g, "&quot;");
  const heroImageProp = heroImagePath ? `\n      heroImage="${heroImagePath}"` : "";

  const file = `import BlogPostLayout from "@/components/BlogPostLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "${safeTitle} — High Performance Club",
  description: "Discover practical, science-backed habits for ${safeKeyword}. Built for busy professionals who want real results without complicated routines.",
  keywords: ["${topic.keyword}", "habits", "high performance", "India", "${topic.category.toLowerCase()}", "healthy habits"],
  openGraph: {
    title: "${safeTitle}",
    description: "Practical habits for ${safeKeyword} — for busy professionals in India and worldwide.",
    type: "article",
  },
};

export default function Post() {
  const CONTENT = ${JSON.stringify(htmlContent)};
  return (
    <BlogPostLayout
      emoji="${topic.emoji}"
      category="${topic.category}"
      readTime="6 min read"
      date="${today}"
      title="${safeTitle}"
      accent="${topic.accent}"
      bg="#fef9ec"${heroImageProp}
    >
      <div dangerouslySetInnerHTML={{ __html: CONTENT }} />
    </BlogPostLayout>
  );
}
`;

  const dir = path.join(BLOGS_DIR, topic.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "page.tsx"), file);
  console.log(`  ✓ Wrote ${topic.slug}/page.tsx`);
}

// Insert newest article at the TOP of the posts array in page.tsx
function updateBlogsIndex(topic, heroImagePath) {
  const indexContent = fs.readFileSync(BLOGS_INDEX, "utf8");

  // Guard: never insert if slug already exists anywhere in the file
  if (indexContent.includes(`slug:"${topic.slug}"`)) {
    console.log(`  ✓ Slug already in index — skipping duplicate insert`);
    return;
  }

  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const image = heroImagePath || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop&q=80";
  const safeTitle = topic.title.replace(/"/g, "&quot;");

  const newEntry = `  { slug:"${topic.slug}", title:"${safeTitle}", excerpt:"Discover practical, science-backed habits for ${topic.keyword}. Built for busy people who want real results without complicated routines.", category:"${topic.category}", readTime:"6 min read", date:"${today}", emoji:"${topic.emoji}", accent:"${topic.accent}", image:"${image}", featured:false },\n`;

  // Insert as FIRST item in the posts array (after "const posts = [")
  const updated = indexContent.replace(
    /^(const posts = \[)\n/m,
    `$1\n${newEntry}`
  );

  if (updated === indexContent) {
    console.warn("  ⚠ Could not insert at top of posts array — appending instead");
    const fallback = indexContent.replace(/(\n];)\n\n\/\* eslint/, `\n${newEntry.trimEnd()}$1\n\n/* eslint`);
    fs.writeFileSync(BLOGS_INDEX, fallback === indexContent ? indexContent : fallback);
  } else {
    fs.writeFileSync(BLOGS_INDEX, updated);
  }
  console.log(`  ✓ Inserted at top of blog index`);
}

// ── Add inline-cta styles to BlogPostLayout (once) ──────────────────────────
// The .inline-cta class needs to be in the global stylesheet.
function ensureInlineCTAStyle() {
  const layoutPath = path.join(REPO_ROOT, "src/components/BlogPostLayout.tsx");
  const layout = fs.readFileSync(layoutPath, "utf8");
  if (layout.includes("inline-cta")) return; // already added

  const updated = layout.replace(
    `.callout a:hover { text-decoration: underline; }`,
    `.callout a:hover { text-decoration: underline; }
        .blog-content .inline-cta {
          margin: 4px 0 32px !important;
        }
        .blog-content .inline-cta a {
          display: inline-block;
          color: #b8853a !important;
          font-weight: 700 !important;
          font-size: 16px !important;
          text-decoration: underline !important;
          text-underline-offset: 3px;
          line-height: 1.6;
        }
        .blog-content .inline-cta a:hover {
          color: #8a6428 !important;
        }`
  );
  fs.writeFileSync(layoutPath, updated);
  console.log("  ✓ Added inline-cta styles to BlogPostLayout");
}

// ── Git ───────────────────────────────────────────────────────────────────────

function gitCommitAndPush(topic) {
  // In GitHub Actions, the workflow does the commit+push step itself (using its
  // built-in auth), so the script only writes files. Locally, it commits+pushes.
  if (ACTIONS_MODE) {
    console.log(`  ✓ Files written — Actions workflow will commit & push`);
    return;
  }
  execSync(`git -C "${REPO_ROOT}" add -A`, { stdio: "pipe" });
  execSync(`git -C "${REPO_ROOT}" commit -m "blog: ${topic.title}"`, { stdio: "pipe" });
  execSync(`git -C "${REPO_ROOT}" push origin main`, { stdio: "pipe" });
  console.log(`  ✓ Pushed → Vercel deploy triggered`);
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n[${new Date().toISOString()}] HPC Blog Publisher starting...`);

  const state = loadState();
  const topic = await pickNextTopic(state);

  console.log(`  Topic  : ${topic.title}`);
  console.log(`  Keyword: ${topic.keyword}`);

  // Run image generation and article generation in parallel
  const [heroImagePath, html] = await Promise.all([
    generateAndSaveImage(topic).catch(e => { console.warn("  ⚠ Image skipped:", e.message); return null; }),
    generateArticle(topic),
  ]);

  console.log(`  Generated ${html.length} chars of HTML`);

  ensureInlineCTAStyle();
  writePageTsx(topic, html, heroImagePath);
  updateBlogsIndex(topic, heroImagePath);
  gitCommitAndPush(topic);

  state.published.push(topic.slug);
  saveState(state);

  console.log(`  Done. Total published: ${state.published.length}\n`);
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
