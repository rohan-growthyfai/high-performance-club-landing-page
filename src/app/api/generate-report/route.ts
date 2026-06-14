import { NextResponse } from "next/server";
import { google } from "googleapis";

const MEMBERS_SHEET_ID = "1mhVBpvSSYVlYf_qu55Z7Vu_WBAT6-O9hGi3fYAMyDGs";

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

// A full, motivating PARAGRAPH per category, chosen by how much that area moved
// (0 = held steady, 1 = improved, 2 = strong, 3 = transformed). Written to make
// the reader genuinely feel they did something real for themselves this week.
function insight(cat: string, d: number, firstName: string): string {
  const lvl = Math.min(Math.max(d, 0), 3);
  const map: Record<string, string[]> = {
    energy: [
      `${firstName}, even holding your energy steady through a full, busy week is a quiet win — most people feel themselves running emptier as the days pile up, and you didn't. You showed up, did the tiny movement habits, and gave your body a daily signal to wake up. That foundation is exactly what bigger energy gains get built on. Keep feeding it and it compounds.`,
      `${firstName}, you can feel it now — your energy has started to shift. Those sluggish, foggy moments that used to drag through your day are loosening their grip. And here's the beautiful part: you didn't overhaul your life to get here. A few seconds of intentional movement each day was enough to tell your body, "we're awake, we're alive." That's real, and it's only the beginning.`,
      `${firstName}, this is a clear, meaningful jump in your energy. What used to feel like pushing through treacle now feels noticeably lighter. Your body is responding to consistency — small daily nudges that add up to a genuinely different baseline. Most people chase this with expensive supplements and 5 AM routines; you found it with tiny habits that actually fit your life.`,
      `${firstName}, this is a genuine transformation in your energy — the kind people pay a lot of money chasing. You've gone from running on empty to running on momentum, and you did it without changing your diet, your sleep schedule, or anything dramatic. Just tiny, consistent wins. Imagine where this goes if you keep the signal switched on.`,
    ],
    health: [
      `${firstName}, taking care of your body every single day for a week — your eyes, your shoulders, your posture — is something most people never do even once. Holding steady here means you've built a daily relationship with your own physical wellbeing. That awareness alone is powerful, and it's the soil everything else grows from. Keep tending it.`,
      `${firstName}, your body is starting to thank you. The small aches from screens and sitting, the strain your eyes carry without you noticing — you've started actively relieving them, day by day. This is what real health looks like: not a dramatic detox, but tiny, kind acts of maintenance repeated until they become who you are. You're building that now.`,
      `${firstName}, there's been a real, felt shift in how your body carries you through the day. Looser shoulders, fresher eyes, a body that feels less tense and more at ease. You earned that — not with a gym membership or a strict regime, but with seconds-long habits done consistently. Your body notices consistency more than intensity, and you've given it exactly that.`,
      `${firstName}, this is a standout transformation in how your body feels. The tension, the strain, the low-grade discomfort that used to be your default — it's giving way to ease and lightness. In just 7 days, with nothing more than tiny daily care, you've changed your relationship with your own body. That's not small. That's the start of a genuinely healthier you.`,
    ],
    calmness: [
      `${firstName}, even staying steady in your calm through a hectic week is meaningful — modern life pulls most people into more stress, not less. You created small pockets of breathing room, of pause, of presence. That muscle of "coming back to calm" is now something you've practised. It's there for you whenever you need it, and it only gets stronger.`,
      `${firstName}, you're noticeably calmer and more in control than when you started — and that changes everything about how a day feels. The slow breaths, the moment of presence, the positive morning signal: each one taught your nervous system that it's safe to settle. You're not at the mercy of every busy moment anymore. You're learning to steer.`,
      `${firstName}, this is a real, grounding shift toward calm. The scattered, tense feeling that used to run the show now has competition — a steadier, more centred version of you that you've trained this week. And the magic is how simple it was: a few seconds of breath, a smile, a kind word. Calm isn't a personality you're born with; it's a practice, and you've started it.`,
      `${firstName}, the calm and sense of control you've built this week is the kind that genuinely changes lives. Where days used to feel reactive and overwhelming, you've found a centre — a place to return to no matter what's happening around you. You did this with tiny, gentle habits, no meditation retreats required. That inner steadiness is now yours to keep building.`,
    ],
  };
  return (map[cat] || map.energy)[lvl];
}

// A short, words-not-numbers summary of where someone stands overall (replaces
// "X out of 12"). Buckets by total improvement across the three areas.
function overallSummary(totalImprovement: number, areasImproved: number, firstName: string): { headline: string; body: string } {
  if (areasImproved === 0) {
    return {
      headline: "You showed up for 7 straight days",
      body: `${firstName}, the scores held steady — but don't miss the real headline: you finished. Most people who start something like this quit in the first 2–3 days. You built the habit of showing up, and that consistency is the exact foundation visible results are built on. This is a beginning worth being proud of.`,
    };
  }
  if (areasImproved === 3) {
    return {
      headline: "Real improvement across all 3 areas",
      body: `${firstName}, this is remarkable — your energy, your health, and your calmness all moved in the right direction in just 7 days. And you did it without overhauling your life. That's living proof of how powerful tiny, consistent habits truly are.`,
    };
  }
  return {
    headline: `Clear progress in ${areasImproved} of 3 areas`,
    body: `${firstName}, you felt a genuine difference this week — progress most people never get, because most never even finish. The area${areasImproved === 1 ? "" : "s"} still catching up just need${areasImproved === 1 ? "s" : ""} a little more time, and you've already proven you can show up for yourself. Keep the momentum and watch the rest follow.`,
  };
}

function buildHTML(data: Record<string, string>): string {
  const firstName = data.name.split(" ")[0];
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  // Three categories: Energy (Q1), Health (Q2 — how their daily habits feel),
  // Calmness (Q3 — feeling calm / in control). Day-0 answers are the "before".
  const cats = [
    { key: "energy",   label: "Energy",   emoji: "⚡", b: data.day1Energy, a: data.day7Energy },
    { key: "health",   label: "Health",   emoji: "🌿", b: data.day1Focus,  a: data.day7Focus  },
    { key: "calmness", label: "Calmness", emoji: "🧘", b: data.day1Health, a: data.day7Health },
  ].map(c => ({ ...c, bs: score(c.b), as: score(c.a) }));

  const areasImproved = cats.filter(c => c.as > c.bs).length;
  const totalImprovement = cats.reduce((s, c) => s + (c.as - c.bs), 0);
  const summary = overallSummary(totalImprovement, areasImproved, firstName);

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
.s-title{font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:#18181b;margin-bottom:16px}
.s-summary{font-size:14px;color:#4b5563;line-height:1.8}
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
.cta-body{font-size:14px;color:rgba(255,255,255,0.72);max-width:520px;margin:0 auto 18px;line-height:1.8;text-align:left}
.club-box{background:rgba(255,255,255,0.05);border:1px solid rgba(245,215,142,0.3);border-radius:18px;padding:28px 30px;max-width:520px;margin:28px auto 30px;text-align:left}
.club-title{font-size:19px;font-weight:800;color:#f5d78e;margin-bottom:6px}
.club-sub{font-size:13px;color:rgba(255,255,255,0.6);margin-bottom:18px;line-height:1.6}
.club-grid{display:flex;flex-direction:column;gap:10px}
.club-item{font-size:13.5px;color:rgba(255,255,255,0.85);line-height:1.5}
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
  <div class="s-title">${summary.headline}</div>
  <div class="s-summary">${summary.body}</div>
</div>
<div class="cats">
  <div class="c-eye">Breakdown</div>
  <div class="c-title">Your 7 days habits journey</div>
  ${catHTML}
</div>
<div class="cta">
  <div class="cta-eye">What happens next?</div>
  <div class="cta-title">Imagine 30 days of<br><em>this.</em></div>
  <div class="cta-body">${firstName}, look at what just happened. In only 7 days — <strong style="color:#f5d78e">without changing your diet, your routine, or your lifestyle, and without a single complicated step</strong> — you felt a real difference in your energy, your health, and your calmness.</div>
  <div class="cta-body">That's the power of a simple system done consistently. And here's the honest truth: 7 days is just where it begins. The members who see life-changing results are the ones who keep going for <strong style="color:#f5d78e">30 days and beyond</strong>, because that's when tiny habits stop being something you do and start becoming <em>who you are</em>.</div>
  <div class="cta-body">If a week gave you this much, 30 days of the <strong style="color:#f5d78e">same gentle system</strong> can compound into a genuinely different you — steadier energy that lasts the whole day, a body that feels lighter and better cared for, a calmer and more in-control mind, and noticeably better sleep.</div>
  <div class="club-box">
    <div class="club-title">🚚 The Daily Upgrade Club</div>
    <div class="club-sub">The exact same system you just experienced — continued, for the next 30 days.</div>
    <div class="club-grid">
      <div class="club-item">✅ One tiny habit delivered daily on WhatsApp</div>
      <div class="club-item">✅ Gentle evening check-ins to keep you on track</div>
      <div class="club-item">✅ Weekly progress check-ins</div>
      <div class="club-item">✅ Monthly habit badge as you level up</div>
      <div class="club-item">✅ A private community of people growing with you</div>
      <div class="club-item">✅ No diets. No complicated routines. No pressure.</div>
    </div>
  </div>
  <a href="https://www.highperformanceclub.co/daily-upgrade-club" class="cta-btn">Join Daily Upgrade Club — ₹99/month →</a>
  <div class="cta-sub">Cancel anytime. No long-term commitment. Just your next tiny win, every day.</div>
</div>
<div class="footer">
  <div class="f-brand">High Performance Club</div>
  <div class="f-meta">highperformanceclub.co · GROWTHYFAI TECHNOLOGIES PRIVATE LIMITED</div>
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
    const phone = normalisePhone(whatsapp);

    // Read assessment answers directly from the Members tab (single source of truth).
    // Columns: A=registered_at B=full_name C=first_name D=last_name E=whatsapp F=email
    // G=start_date H=current_day I=morning_sent J=evening_sent K=struggle
    // L=day1_energy M=day1_focus N=day1_health O=day7_energy P=day7_focus Q=day7_health
    const memberRes = await sheets.spreadsheets.values.get({
      spreadsheetId: MEMBERS_SHEET_ID,
      range: "Members!A:T",
    });
    const memberRows = (memberRes.data.values || []).slice(1);
    // whatsapp is column E (index 4)
    const row = memberRows.find((r: string[]) => normalisePhone(r[4]) === phone);

    if (!row) return NextResponse.json({ error: `Member not found for ${whatsapp}` }, { status: 404 });

    const data = {
      name:             row[1] || row[2] || "Friend", // full_name, fallback first_name
      whatsapp:         row[4],
      day1Energy:       row[11] || "", // L
      day1Focus:        row[12] || "", // M
      day1Health:       row[13] || "", // N
      day1Relationship: "",
      day7Energy:       row[14] || "", // O
      day7Focus:        row[15] || "", // P
      day7Health:       row[16] || "", // Q
      day7Relationship: "",
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

    const slug      = `${data.name.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}`;
    const firstName = data.name.split(" ")[0];
    const filename  = `${slug}.pdf`;

    // Store PDF in Neon — permanent public /api/file URL, WhatsApp-compatible.
    const { putFile } = await import("@/lib/fileStore");
    const pdfUrl = await putFile(filename, Buffer.from(pdfBuffer), "application/pdf");

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
