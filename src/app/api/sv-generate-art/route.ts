import { NextResponse } from "next/server";
import { putFile } from "@/lib/fileStore";
import { neon } from "@neondatabase/serverless";

export const maxDuration = 300;

/**
 * StoryVerse — illustration generator.
 *
 * Generates ALL illustrations for a story ONCE (cover + one per page) using the
 * locked StoryVerse art style, stores them in the Neon fileStore, and writes the
 * public URLs back onto the sv_stories row. Art is child-agnostic (the child's
 * NAME lives in the PDF text, not the image), so we generate per-story, not
 * per-child — the key cost trick.
 *
 * POST /api/sv-generate-art   body: { storyId: string, force?: boolean }
 * Returns: { success, storyId, coverImageUrl, pageImageUrls: string[] }
 *
 * Env: OPENROUTER_API_KEY, DATABASE_URL
 */

// The LOCKED StoryVerse art style — prepended to every image prompt so the whole
// product feels like one consistent, cohesive world.
const STYLE_LOCK = `Soft storybook watercolor blended with gentle digital painting. Warm golden-hour lighting, dreamy pastel palette (peach, honey-gold, soft teal, lavender, cream). Rounded friendly shapes, big expressive eyes, cozy magical atmosphere. Pixar warmth meets classic Indian picture-book charm. Hand-painted texture, soft glow, no harsh lines. Any children shown look 4-7 years old, Indian, chubby-cheeked, wholesome, and are ALWAYS fully clothed in comfortable everyday clothes. Wholesome, safe, calm, wondrous — never scary, dark, violent, or sad. High-resolution, beautiful, tender.`;

// Hard negative rules for a kids' product.
const NEGATIVE = `ABSOLUTELY NO text, letters, words, captions, watermarks, or signatures anywhere in the image. No nudity, no bare torsos, no underwear — every character fully clothed at all times. No scary monsters, no violence, no weapons, no blood, no gore, no darkness-without-warmth. No distorted faces, no extra limbs, no extra fingers, no broken anatomy, no creepy or uncanny features. Not cartoonish-flat, not clip-art, not photo-realistic — keep the soft painted storybook look.`;

function buildImagePrompt(scenePrompt: string, aspect: "landscape" | "square"): string {
  const ratio =
    aspect === "square"
      ? "Square 1:1 composition, centered."
      : "Landscape 3:2 composition, cinematic gentle framing.";
  return `Generate a single beautiful children's storybook illustration.

ART STYLE (must follow exactly): ${STYLE_LOCK}

${ratio}

SCENE TO ILLUSTRATE: ${scenePrompt}

${NEGATIVE}`;
}

async function generateOneImage(
  apiKey: string,
  scenePrompt: string,
  aspect: "landscape" | "square",
  keyPrefix: string
): Promise<string | null> {
  const prompt = buildImagePrompt(scenePrompt, aspect);

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://www.highperformanceclub.co",
      "X-Title": "StoryVerse",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-image",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[sv-generate-art] OpenRouter error", res.status, err.slice(0, 200));
    return null;
  }

  const data = await res.json();
  const msg = data.choices?.[0]?.message;
  if (!msg) return null;

  let base64: string | null = null;
  let mime = "image/png";

  if (Array.isArray(msg.images) && msg.images.length > 0) {
    const url: string = msg.images[0]?.image_url?.url || "";
    if (url.startsWith("data:")) {
      const [meta, b64] = url.split(",");
      mime = meta.replace("data:", "").replace(";base64", "");
      base64 = b64;
    }
  }
  if (!base64 && Array.isArray(msg.content)) {
    const part = msg.content.find(
      (p: { type: string; image_url?: { url: string } }) =>
        p.type === "image_url" && p.image_url?.url?.startsWith("data:")
    );
    if (part?.image_url?.url) {
      const [meta, b64] = part.image_url.url.split(",");
      mime = meta.replace("data:", "").replace(";base64", "");
      base64 = b64;
    }
  }
  if (!base64 && typeof msg.content === "string") {
    const m = msg.content.match(/data:(image\/\w+);base64,([A-Za-z0-9+/=\n]+)/);
    if (m) {
      mime = m[1];
      base64 = m[2].replace(/\n/g, "");
    }
  }
  if (!base64) {
    console.error("[sv-generate-art] no image in response");
    return null;
  }

  const ext = mime.includes("png") ? "png" : "jpg";
  const filename = `sv-art-${keyPrefix}-${Date.now()}.${ext}`;
  const buffer = Buffer.from(base64, "base64");
  return putFile(filename, buffer, mime);
}

export async function POST(request: Request) {
  try {
    const { storyId, force } = await request.json();
    if (!storyId) {
      return NextResponse.json({ error: "storyId required" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OPENROUTER_API_KEY not set" }, { status: 500 });
    }
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      return NextResponse.json({ error: "DATABASE_URL not set" }, { status: 500 });
    }
    const sql = neon(dbUrl);

    const rows = (await sql`
      SELECT id, title, pages, cover_art_prompt, cover_image_url, page_image_urls, art_ready
      FROM sv_stories WHERE id = ${storyId} LIMIT 1`) as Array<{
      id: string;
      title: string;
      pages: Array<{ text: string; art_prompt: string }>;
      cover_art_prompt: string;
      cover_image_url: string | null;
      page_image_urls: string[] | null;
      art_ready: boolean;
    }>;

    if (!rows.length) {
      return NextResponse.json({ error: "story not found" }, { status: 404 });
    }
    const story = rows[0];

    // Already generated and not forcing → return cached.
    if (story.art_ready && !force) {
      return NextResponse.json({
        success: true,
        storyId,
        cached: true,
        coverImageUrl: story.cover_image_url,
        pageImageUrls: story.page_image_urls || [],
      });
    }

    const slug = storyId.replace(/[^a-z0-9]/gi, "-");

    // Cover (square hero portrait).
    const coverUrl = await generateOneImage(
      apiKey,
      story.cover_art_prompt || story.pages?.[0]?.art_prompt || story.title,
      "square",
      `${slug}-cover`
    );

    // One landscape illustration per page.
    const pageUrls: string[] = [];
    for (let i = 0; i < story.pages.length; i++) {
      const url = await generateOneImage(
        apiKey,
        story.pages[i].art_prompt,
        "landscape",
        `${slug}-p${i + 1}`
      );
      pageUrls.push(url || "");
    }

    const allOk = !!coverUrl && pageUrls.every((u) => !!u);

    await sql`
      UPDATE sv_stories
      SET cover_image_url = ${coverUrl},
          page_image_urls = ${JSON.stringify(pageUrls)}::jsonb,
          art_ready = ${allOk},
          updated_at = now()
      WHERE id = ${storyId}`;

    return NextResponse.json({
      success: allOk,
      storyId,
      coverImageUrl: coverUrl,
      pageImageUrls: pageUrls,
      art_ready: allOk,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[sv-generate-art]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
