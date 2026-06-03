import { NextResponse } from "next/server";
import { google } from "googleapis";

const DAY1_SHEET_ID = "1mhVBpvSSYVlYf_qu55Z7Vu_WBAT6-O9hGi3fYAMyDGs";
const DAY7_SHEET_ID = "1dOQPYuX5nyD_xjDrOMq4yarxasYoJLp2rW9n1mQ8LNg";

function normalisePhone(p: string) {
  return (p || "").replace(/\D/g, "").replace(/^91/, "").slice(-10);
}

function score(text: string): number {
  const t = (text || "").toLowerCase();
  if (t.includes("tired") || t.includes("distracted very") || t.includes("lot of improvement") || t.includes("stressed or disconnected") || t.includes("no much difference") || t.includes("not much has changed")) return 1;
  if (t.includes("okay") || t.includes("sometimes") || t.includes("struggle") || t.includes("would like") || t.includes("small improvement") || t.includes("see a clear") || t.includes("little more positive")) return 2;
  if (t.includes("most days") || t.includes("most of the time") || t.includes("positive most") || t.includes("follow healthy") || t.includes("more energetic than before") || t.includes("stay focused for longer") || t.includes("habits feel much better") || t.includes("noticeably happier") || t.includes("becoming more consistent")) return 3;
  if (t.includes("always") || t.includes("highly") || t.includes("consistently every day") || t.includes("happy, calm") || t.includes("throughout the day") || t.includes("much better than before") || t.includes("much better emotionally")) return 4;
  return 2;
}

function impLabel(b: number, a: number) {
  const d = a - b;
  if (d <= 0) return { text: "Maintained", color: "#f59e0b", emoji: "✨" };
  if (d === 1) return { text: "Improved",      color: "#10b981", emoji: "📈" };
  if (d === 2) return { text: "Strong Growth", color: "#6366f1", emoji: "🚀" };
  return            { text: "Transformed",    color: "#b8853a", emoji: "🏆" };
}

function insight(cat: string, d: number, firstName: string): string {
  const map: Record<string, string[]> = {
    energy: [
      `${firstName}, your energy is stable — a solid base to keep building on.`,
      `${firstName}, you've noticed a real shift in your energy. Those mornings are starting to feel different.`,
      `${firstName}, your energy transformation over 7 days is clear. What felt like a daily struggle now feels manageable.`,
      `${firstName}, you've gone from running on empty to running on momentum. That's what tiny habits do.`,
    ],
    focus: [
      `Your focus is developing — consistency will unlock the next level.`,
      `${firstName}, your focus improved this week. Distractions still come, but you're handling them better.`,
      `${firstName}, your focus has sharpened significantly. You're getting more done with less mental noise.`,
      `${firstName}, the clarity you've found this week is extraordinary. This is what a trained mind feels like.`,
    ],
    health: [
      `Your healthy habits are taking root — keep showing up and watch them compound.`,
      `${firstName}, you've started building consistency that most people never achieve.`,
      `${firstName}, your daily habits have shifted meaningfully. The gap between who you were and who you're becoming is real.`,
      `${firstName}, you've moved from struggling to consistent. In 7 days. That's not small — that's everything.`,
    ],
    relationship: [
      `Your relationship with yourself is growing stronger every day.`,
      `${firstName}, you're feeling more connected — to yourself and the people around you. That matters.`,
      `${firstName}, the way you feel about yourself has shifted noticeably. Calm and connected is the new normal.`,
      `${firstName}, the emotional growth this week is the kind that lasts. You've found your centre.`,
    ],
  };
  return map[cat][Math.min(Math.max(d, 0), 3)];
}

function buildHTML(data: Record<string, string>): string {
  const firstName = data.name.split(" ")[0];
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  const cats = [
    { key: "energy",       label: "Energy",               emoji: "⚡", b: data.day1Energy,       a: data.day7Energy },
    { key: "focus",        label: "Focus & Concentration", emoji: "🎯", b: data.day1Focus,        a: data.day7Focus },
    { key: "health",       label: "Daily Habits",          emoji: "🌿", b: data.day1Health,       a: data.day7Health },
    { key: "relationship", label: "Self & Relationships",  emoji: "❤️", b: data.day1Relationship, a: data.day7Relationship },
  ].map(c => ({ ...c, bs: score(c.b), as: score(c.a) }));

  const totalB = cats.reduce((s, c) => s + c.bs, 0);
  const totalA = cats.reduce((s, c) => s + c.as, 0);
  const growthPct = totalB > 0 ? Math.round(((totalA - totalB) / totalB) * 100) : 0;
  const growthStr = growthPct >= 0 ? `+${growthPct}%` : `${growthPct}%`;

  const catHTML = cats.map(c => {
    const imp = impLabel(c.bs, c.as);
    const ins = insight(c.key, c.as - c.bs, firstName);
    const bp = Math.round((c.bs / 4) * 100);
    const ap = Math.round((c.as / 4) * 100);
    const cleanB = c.b.replace(/\p{Emoji}/gu, "").trim();
    const cleanA = c.a.replace(/\p{Emoji}/gu, "").trim();
    return `<div class="cat-card">
      <div class="cat-head"><span class="cat-emoji">${c.emoji}</span>
        <div><div class="cat-label">${c.label}</div>
        <span class="imp-badge" style="background:${imp.color}20;color:${imp.color}">${imp.emoji} ${imp.text}</span></div>
      </div>
      <div class="cmp-row">
        <div class="cmp-col"><div class="cmp-day">Day 1</div><div class="cmp-text">"${cleanB}"</div>
          <div class="bar-wrap"><div class="bar bar-b" style="width:${bp}%"></div></div></div>
        <div class="cmp-arrow">→</div>
        <div class="cmp-col"><div class="cmp-day">Day 7</div><div class="cmp-text">"${cleanA}"</div>
          <div class="bar-wrap"><div class="bar bar-a" style="width:${ap}%"></div></div></div>
      </div>
      <div class="ins">${ins}</div>
    </div>`;
  }).join("");

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:#faf8f3;color:#18181b;width:800px}
.cover{background:linear-gradient(135deg,#1a1008 0%,#3d2008 50%,#8a6428 100%);padding:60px 56px 48px;position:relative;overflow:hidden}
.cover::before{content:'';position:absolute;top:-60px;right:-60px;width:280px;height:280px;border-radius:50%;background:rgba(184,133,58,0.12)}
.cover-logo{font-size:12px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:44px}
.cover-badge{display:inline-block;background:rgba(184,133,58,0.25);border:1px solid rgba(245,215,142,0.4);color:#f5d78e;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;padding:5px 16px;border-radius:999px;margin-bottom:18px}
.cover-title{font-family:'Playfair Display',serif;font-size:44px;font-weight:700;color:#fff;line-height:1.12;margin-bottom:6px}
.cover-title em{font-style:italic;color:#f5d78e}
.cover-name{font-family:'Playfair Display',serif;font-size:26px;font-style:italic;color:rgba(255,255,255,0.7);margin-bottom:32px}
.cover-line{width:56px;height:2px;background:linear-gradient(90deg,#b8853a,transparent);margin-bottom:24px}
.cover-date{font-size:12px;color:rgba(255,255,255,0.4)}
.scores{background:#fff;padding:40px 56px;border-bottom:1px solid #ede9e0}
.s-eye{font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#b8853a;margin-bottom:8px}
.s-title{font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:#18181b;margin-bottom:28px}
.s-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px}
.s-card{background:#faf8f3;border:1px solid #e5e0d5;border-radius:16px;padding:22px;text-align:center}
.s-card.hl{background:linear-gradient(135deg,#fef9ec,#fff7ed);border-color:#f5d78e}
.s-num{font-size:38px;font-weight:800;color:#b8853a;line-height:1;margin-bottom:5px}
.s-lbl{font-size:11px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:0.08em}
.cats{padding:40px 56px;background:#faf8f3}
.c-eye{font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#b8853a;margin-bottom:8px}
.c-title{font-family:'Playfair Display',serif;font-size:24px;font-weight:700;color:#18181b;margin-bottom:24px}
.cat-card{background:#fff;border:1px solid #e5e0d5;border-radius:20px;padding:26px 30px;margin-bottom:18px}
.cat-head{display:flex;align-items:flex-start;gap:14px;margin-bottom:18px}
.cat-emoji{font-size:30px;line-height:1;flex-shrink:0}
.cat-label{font-size:16px;font-weight:800;color:#18181b;margin-bottom:5px}
.imp-badge{display:inline-block;font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px}
.cmp-row{display:grid;grid-template-columns:1fr auto 1fr;gap:14px;align-items:center;margin-bottom:14px}
.cmp-arrow{font-size:18px;color:#b8853a;font-weight:700;text-align:center}
.cmp-day{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#9ca3af;margin-bottom:5px}
.cmp-text{font-size:12px;color:#6b7280;font-style:italic;margin-bottom:8px;line-height:1.4}
.bar-wrap{background:#f3f0e8;border-radius:999px;height:7px;overflow:hidden}
.bar{height:100%;border-radius:999px}
.bar-b{background:#d1c5b0}
.bar-a{background:linear-gradient(90deg,#b8853a,#f5d78e)}
.ins{font-size:13px;color:#4b5563;line-height:1.7;padding:12px 16px;background:#fef9ec;border-left:3px solid #b8853a;border-radius:0 10px 10px 0}
.cta{background:linear-gradient(135deg,#1a1008 0%,#3d2008 100%);padding:52px 56px;text-align:center}
.cta-eye{font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.45);margin-bottom:14px}
.cta-title{font-family:'Playfair Display',serif;font-size:34px;font-weight:700;color:#fff;margin-bottom:14px;line-height:1.2}
.cta-title em{color:#f5d78e;font-style:italic}
.cta-body{font-size:14px;color:rgba(255,255,255,0.6);max-width:460px;margin:0 auto 28px;line-height:1.75}
.cta-btn{display:inline-block;background:linear-gradient(135deg,#b8853a,#8a6428);color:#fff;font-size:15px;font-weight:700;padding:14px 40px;border-radius:999px;text-decoration:none}
.cta-sub{margin-top:16px;font-size:12px;color:rgba(255,255,255,0.35)}
.footer{background:#f3f0e8;padding:22px 56px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid #e2dfd6}
.f-brand{font-size:13px;font-weight:700;color:#b8853a}
.f-meta{font-size:12px;color:#9ca3af}
</style></head><body>
<div class="cover">
  <div class="cover-logo">High Performance Club</div>
  <div class="cover-badge">7-Day Challenge Complete 🏆</div>
  <div class="cover-title">Your Personal<br><em>Progress Report</em></div>
  <div class="cover-name">${data.name}</div>
  <div class="cover-line"></div>
  <div class="cover-date">Generated on ${today} · For your eyes only</div>
</div>
<div class="scores">
  <div class="s-eye">Your Results</div>
  <div class="s-title">What changed in 7 days</div>
  <div class="s-grid">
    <div class="s-card"><div class="s-num">${totalB}/16</div><div class="s-lbl">Day 1 Score</div></div>
    <div class="s-card hl"><div class="s-num">${totalA}/16</div><div class="s-lbl">Day 7 Score</div></div>
    <div class="s-card"><div class="s-num" style="color:${growthPct>=0?"#10b981":"#ef4444"}">${growthStr}</div><div class="s-lbl">Overall Growth</div></div>
  </div>
</div>
<div class="cats">
  <div class="c-eye">Breakdown</div>
  <div class="c-title">Your journey across all 4 areas</div>
  ${catHTML}
</div>
<div class="cta">
  <div class="cta-eye">What happens next?</div>
  <div class="cta-title">7 days was just the<br><em>beginning.</em></div>
  <div class="cta-body">${firstName}, you've proven you can build habits. Imagine what 30 consistent days could do.<br><br>The <strong style="color:#f5d78e">Daily Upgrade Club</strong> delivers one new habit every day with evening check-ins to keep you accountable.</div>
  <a href="https://highperformanceclub.co" class="cta-btn">Join Daily Upgrade Club — ₹99/month →</a>
  <div class="cta-sub">Cancel anytime. No long-term commitment.</div>
</div>
<div class="footer">
  <div class="f-brand">High Performance Club</div>
  <div class="f-meta">highperformanceclub.co · Growthyfai Technologies Pvt. Ltd.</div>
</div>
</body></html>`;
}

export async function POST(request: Request) {
  try {
    const { whatsapp } = await request.json();
    if (!whatsapp) return NextResponse.json({ error: "whatsapp required" }, { status: 400 });

    // Get Google auth from env vars (service account JSON stored as env var)
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountKey) return NextResponse.json({ error: "GOOGLE_SERVICE_ACCOUNT_KEY not set" }, { status: 500 });

    // Try base64 decode first (preferred), fall back to direct JSON parse
    let keyJson: Record<string, unknown>;
    try {
      const decoded = Buffer.from(serviceAccountKey, "base64").toString("utf8");
      keyJson = JSON.parse(decoded);
    } catch {
      keyJson = JSON.parse(serviceAccountKey);
    }
    const auth = new google.auth.GoogleAuth({
      credentials: keyJson,
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets.readonly",
        "https://www.googleapis.com/auth/drive.file",
      ],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const drive = google.drive({ version: "v3", auth });
    const phone = normalisePhone(whatsapp);

    const [d1res, d7res] = await Promise.all([
      sheets.spreadsheets.values.get({ spreadsheetId: DAY1_SHEET_ID, range: "A:Z" }),
      sheets.spreadsheets.values.get({ spreadsheetId: DAY7_SHEET_ID, range: "A:Z" }),
    ]);

    const rows1 = (d1res.data.values || []).slice(1);
    const rows7 = (d7res.data.values || []).slice(1);
    const row1 = rows1.find((r: string[]) => normalisePhone(r[3]) === phone);
    const row7 = rows7.find((r: string[]) => normalisePhone(r[3]) === phone);

    if (!row1) return NextResponse.json({ error: `Day 1 not found for ${whatsapp}` }, { status: 404 });
    if (!row7) return NextResponse.json({ error: `Day 7 not found for ${whatsapp}` }, { status: 404 });

    const data = {
      name:             row1[1] || "Friend",
      whatsapp:         row1[3],
      day1Energy:       row1[4] || "",
      day1Focus:        row1[5] || "",
      day1Health:       row1[6] || "",
      day1Relationship: row1[7] || "",
      day7Energy:       row7[4] || "",
      day7Focus:        row7[5] || "",
      day7Relationship: row7[6] || "",
      day7Health:       row7[7] || "",
    };

    const html = buildHTML(data);

    // Generate real PDF using Gotenberg (free, no API key, no size limits)
    // Gotenberg is an open-source PDF service — demo.gotenberg.dev is the public instance
    const gotenbergForm = new FormData();
    gotenbergForm.append(
      "files",
      new Blob([html], { type: "text/html" }),
      "index.html"
    );
    // Paper size matching our 800px design
    gotenbergForm.append("paperWidth",  "8.5");
    gotenbergForm.append("paperHeight", "11");
    gotenbergForm.append("marginTop",   "0");
    gotenbergForm.append("marginBottom","0");
    gotenbergForm.append("marginLeft",  "0");
    gotenbergForm.append("marginRight", "0");
    gotenbergForm.append("printBackground", "true");

    const gotenbergRes = await fetch("https://demo.gotenberg.dev/forms/chromium/convert/html", {
      method: "POST",
      body: gotenbergForm,
    });

    if (!gotenbergRes.ok) {
      throw new Error(`Gotenberg failed: ${gotenbergRes.status}`);
    }

    const pdfBuffer = Buffer.from(await gotenbergRes.arrayBuffer());

    // Upload PDF to Cloudinary using SDK — handles signature automatically
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey    = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error("Cloudinary credentials not configured");
    }

    const { v2: cloudinary } = await import("cloudinary");
    cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });

    const slug      = `${data.name.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}`;
    const firstName = data.name.split(" ")[0];

    // Upload as "image" resource type with pdf format — always public on Cloudinary free tier
    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          public_id: `hpc-reports/${slug}`,
          format: "pdf",
          overwrite: true,
        },
        (error, result) => {
          if (error || !result) reject(error ?? new Error("No upload result"));
          else resolve(result as { secure_url: string });
        }
      );
      stream.end(Buffer.from(pdfBuffer));
    });

    const pdfUrl = uploadResult.secure_url;

    return NextResponse.json({
      success: true,
      name: data.name,
      firstName,
      whatsapp: data.whatsapp,
      pdfUrl,
      caption: `🏆 ${firstName}, your personalised 7-Day High Performance Report is here! See exactly how much you've grown.`,
      filename: `${firstName}-HPC-Progress-Report.pdf`,
    });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[generate-report]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
