import { NextResponse } from "next/server";
import { putFile } from "@/lib/fileStore";

export const maxDuration = 60;

// POST /api/duc-habit-image
// Body: { habitTitle: string, actionLine: string }
// Returns: { imageUrl: string }
// Uses OpenRouter → google/gemini-2.5-flash-image
export async function POST(request: Request) {
  try {
    const { habitTitle, actionLine } = await request.json();
    if (!habitTitle || !actionLine) {
      return NextResponse.json({ error: "habitTitle and actionLine required" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OPENROUTER_API_KEY not set" }, { status: 500 });
    }

    const prompt = `Create a premium square wellness infographic image in the same visual format as the Daily Upgrade Club healthy habit challenge tutorial images.

INPUT VARIABLES:
Habit Name: ${habitTitle}
How to Perform the Habit: ${actionLine}

BRAND & LOGO:
Place a premium black rounded-rectangle badge with a thin metallic gold border at the top center.
Inside this badge, write "DAILY UPGRADE CLUB" in elegant gold text.
Do not write "High Performance Club" anywhere.

CANVAS:
Square 1:1 format.
High-resolution, clean, premium, polished, social-media-ready.
Use a soft wellness poster style, similar to a luxury health challenge visual.
No clutter. Everything should look calm, elegant, and easy to understand.

OVERALL DESIGN STYLE:
Premium health and wellness infographic.
Soft glowing background with pastel gradients.
Use elegant leaves in the corners, subtle sparkles, soft light particles, gentle wave lines, and a fresh natural feel.
Use rounded white panels with thin borders and soft shadows.
The design should feel like a clean guided habit tutorial, not a medical poster.
Visual style should be realistic, soft, warm, and aspirational.

TITLE:
Place "${habitTitle}" as a large elegant serif title below the logo badge.
Use a premium serif font style, large and centered.
Color should match the habit mood:
- Energy habits: warm orange / golden
- Calm or breathing habits: soft blue / teal
- Focus or eye habits: sky blue / deep navy
- Gratitude or emotional habits: warm peach / coral
- Movement habits: teal / fresh green
Add a small decorative line, dot, and heart icon under the title.

LAYOUT STRUCTURE:
Create a 2-section or 3-section tutorial layout depending on the habit instruction.

Top instruction panel:
Show the first action or starting position.
Use realistic human visuals or relevant body-part close-ups depending on the habit.
Example:
- If the habit is about hands, show hands.
- If it is about eyes, show eyes.
- If it is about shoulders, show upper body.
- If it is about breathing, show person breathing calmly.
- If it is about gratitude or communication, show two people interacting warmly.
- If it is about walking, stretching, drinking water, posture, journaling, smiling, or any other habit, show the most relevant realistic visual representation.

If the habit has multiple steps, show them as numbered steps inside the top panel.
Use small circular number badges like 1, 2, 3.
Use arrows between steps to show flow.
Use motion lines, curved arrows, or soft glow effects to show movement clearly.

Bottom completion panel:
Show the final action or finished state of the habit.
Make this panel slightly more glowing and rewarding, as if the habit is complete.
Use a timer icon, stopwatch icon, heart icon, lotus icon, check icon, or simple wellness icon depending on the habit.
Add one short label that summarizes the habit completion.

TEXT LABELS:
Use short, clear labels only.
Extract the main action from "${actionLine}" and turn it into simple labels.

Examples of label style:
"Shake both hands" / "Blink x20" / "Close eyes 10 sec" / "Roll shoulders backward x10" / "Inhale slowly" / "Hold 3 sec" / "Exhale slowly" / "Repeat x3" / "Say: Thank you" / "Smile for 10 sec" / "Drink slowly" / "Write one line" / "Stand tall" / "Walk for 2 min"

Use rounded pill-shaped white label boxes with thin colored borders.
Add small matching icons inside the labels.
Make the labels readable and centered.
Do not use long sentences inside the image.

VISUAL INSTRUCTION LOGIC:
Convert "${actionLine}" into a clear visual tutorial automatically.

If the habit is one simple action:
- Show before/action visual on top.
- Show action being performed with movement arrows.
- Show timer or repetition count in the bottom panel.

If the habit has 2 steps:
- Show Step 1 and Step 2 in the top panel.
- Show final completion state in the bottom panel.

If the habit has 3 steps:
- Show three numbered steps across the top panel.
- Show a calm or energetic final state in the bottom panel.

If the instruction contains time, show a stopwatch/timer with that exact time.
If the instruction contains repetitions, show that exact repetition count.
If no time is given, infer a tiny habit duration between 5 seconds and 2 minutes and show it as a simple timer.
Keep the habit feeling tiny, easy, and beginner-friendly.

CHARACTER / SUBJECT STYLE:
Use realistic, friendly, clean human visuals.
People should look healthy, calm, approachable, and natural.
Avoid overly dramatic fitness-model poses.
Facial expressions should be peaceful, positive, and encouraging.
For body-part habits, use clean close-up visuals like hands, eyes, shoulders, face, posture, feet, etc.
Use soft skin tones, natural lighting, and polished photo-realistic detail.

BACKGROUND COLOR:
Choose a color palette that matches the habit mood:
- Energy: soft golden yellow, orange glow, warm cream
- Eye / focus: sky blue, white, fresh teal
- Shoulder / movement: aqua, mint, light teal
- Breath / calm: blue, lavender, white clouds
- Gratitude / kindness: peach, coral, cream, soft gold
- Sleep / relaxation: lavender, night blue, soft white
- Water / hydration: aqua blue, fresh green
- Fitness / posture: teal, green, light gold

Use leafy corners and sparkles consistently.
Keep the same premium Daily Upgrade Club brand feel across all habit images.

COMPOSITION DETAILS:
Top logo badge should slightly overlap the top edge area.
Title should be large and centered.
Main panels should have rounded corners and white borders.
Use a clean grid layout.
Use enough spacing between elements.
Labels should float neatly inside or slightly overlapping the panels.
Use arrows, circular motion lines, glow rings, dotted circles, and simple icons to explain the action.
Make the image instantly understandable even without reading long text.

TEXT ACCURACY:
All visible text must be spelled correctly.
Only include these text elements:
1. "DAILY UPGRADE CLUB" on/near the logo badge
2. "${habitTitle}" as the title
3. Short step/action labels based on "${actionLine}"
4. Timer/repetition labels if needed

Do not add random extra words.
Do not add fake paragraphs.
Do not add unreadable text.
Do not misspell the brand name.

QUALITY:
Ultra clean, premium, detailed, soft lighting, elegant wellness aesthetic, polished social media infographic, high-end Canva-style poster, realistic human visuals, soft shadows, subtle glow, premium typography, balanced composition, readable text, beautiful natural leaves, calm sparkles, professional health challenge tutorial design.

NEGATIVE PROMPT:
Do not use "High Performance Club".
Do not write "HP" anywhere.
Do not make the image look cartoonish, childish, messy, dark, medical, scary, gym-heavy, or overly clinical.
Do not add too much text.
Do not use random symbols.
Do not create extra fingers, distorted hands, distorted eyes, broken anatomy, weird faces, duplicate limbs, blurry text, misspelled words, watermark, stock photo watermark, low resolution, cluttered layout, harsh shadows, or poor alignment.`;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://www.highperformanceclub.co",
        "X-Title": "Daily Upgrade Club",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[duc-habit-image] OpenRouter error:", res.status, err.slice(0, 300));
      return NextResponse.json({ error: `OpenRouter ${res.status}: ${err.slice(0, 100)}` }, { status: 500 });
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: "No content in OpenRouter response" }, { status: 500 });
    }

    // Extract base64 image — Gemini returns it as a data URL in an image_url content part
    let base64Data: string | null = null;
    let mimeType = "image/jpeg";

    if (Array.isArray(content)) {
      const imgPart = content.find((p: { type: string; image_url?: { url: string } }) =>
        p.type === "image_url" && p.image_url?.url?.startsWith("data:")
      );
      if (imgPart?.image_url?.url) {
        const [meta, b64] = imgPart.image_url.url.split(",");
        mimeType = meta.replace("data:", "").replace(";base64", "");
        base64Data = b64;
      }
    } else if (typeof content === "string") {
      const match = content.match(/data:(image\/\w+);base64,([A-Za-z0-9+/=\n]+)/);
      if (match) {
        mimeType = match[1];
        base64Data = match[2].replace(/\n/g, "");
      }
    }

    if (!base64Data) {
      console.error("[duc-habit-image] Could not extract image. Response:", JSON.stringify(data).slice(0, 500));
      return NextResponse.json({ error: "Could not extract image from response" }, { status: 500 });
    }

    const ext = mimeType.includes("png") ? "png" : "jpg";
    const slug = habitTitle.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const filename = `duc-habit-${slug}-${Date.now()}.${ext}`;
    const buffer = Buffer.from(base64Data, "base64");
    const imageUrl = await putFile(filename, buffer, mimeType);

    return NextResponse.json({ success: true, imageUrl });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[duc-habit-image]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
