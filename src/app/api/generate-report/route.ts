import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const maxDuration = 120; // Vercel: allow up to 120s for PDF generation

function normalisePhone(p: string) {
  return (p || "").replace(/\D/g, "").replace(/^91/, "").slice(-10);
}

// Day 0 answers are absolute baseline — score 1 (low) to 3 (high).
// These exact strings come from flows/day0_assessment.json.
function scoreDay0(text: string): number {
  const t = (text || "").toLowerCase();
  // Energy
  if (t.includes("tired most days"))           return 1;
  if (t.includes("okay, but need more energy") || t.includes("fairly good") || t.includes("okay — mostly fine")) return 2;
  if (t.includes("energetic most days") || t.includes("excellent") || t.includes("feel refreshed")) return 3;
  // Fallback: partial matches
  if (t.includes("tired") || t.includes("poor") || t.includes("needs improvement")) return 1;
  if (t.includes("okay") || t.includes("fairly"))  return 2;
  if (t.includes("energetic") || t.includes("excellent") || t.includes("refreshed")) return 3;
  return 2;
}

// Day 7 answers are relative improvement — score 1 (no change) to 3 (clear improvement).
// These exact strings come from flows/day7_assessment.json.
function scoreDay7(text: string): number {
  const t = (text || "").toLowerCase();
  if (t.includes("not much change") || t.includes("not much has changed")) return 1;
  if (t.includes("can feel the difference") || t.includes("somewhat better") || t.includes("sleeping a little better")) return 2;
  if (t.includes("noticeably higher") || t.includes("noticeably better") || t.includes("sleeping noticeably better")) return 3;
  return 1;
}

// Badge shown per category — driven purely by Day 7 answer.
function impLabel(d7score: number) {
  if (d7score === 1) return { text: "Maintained",    color: "#f59e0b", emoji: "✨" };
  if (d7score === 2) return { text: "Improved",      color: "#10b981", emoji: "📈" };
  return                    { text: "Transformed",   color: "#b8853a", emoji: "🏆" };
}

// Bar widths: Day 0 bar = baseline (out of 3), Day 7 bar = improvement signal (out of 3).
// We show them on the same visual scale so higher = better in both columns.
function barPct(score: number, max: number): number {
  return Math.round((score / max) * 100);
}

// Rich insight paragraph per category, per Day 7 improvement level.
// lvl: 0 = no change, 1 = some improvement, 2 = clear/noticeable improvement.
function insight(cat: string, d7: number, d0: number, firstName: string): string {
  const lvl = d7 - 1; // 0, 1, or 2
  const map: Record<string, string[]> = {
    energy: [
      // lvl 0 — no change
      `${firstName}, here is the truth that most people miss — you came into this challenge already feeling energetic, and you KEPT that energy steady for an entire week. That is genuinely hard to do. Life throws stress, bad sleep, and busy days at you constantly. Most people end a week feeling more tired than when they started. You didn't. You protected your energy every single day by building a small, consistent movement habit. That habit is now a part of you. Keep it up and you will notice the difference compound week after week. 💛`,
      // lvl 1 — can feel the difference
      `${firstName}, you can feel it — and that feeling is real. Your energy has genuinely shifted this week. Those small daily habits you did every morning sent your body a clear message: "We are awake. We are moving. We are alive." And your body listened. You did not need to overhaul your diet, wake up at 5 AM, or follow a complicated routine. You just showed up for a few seconds every day — and that was enough to start the shift. This is only Day 7. Imagine what this feels like on Day 30. ⚡`,
      // lvl 2 — noticeably higher
      `${firstName}, this is a standout result. In just 7 days, your energy went from where it was to noticeably higher — and you can feel that difference clearly every day. That kind of shift doesn't come from a supplement or a strict routine. It comes from consistency. From showing up every single day and giving your body the signal it needed. You've cracked something real here: tiny daily movement, done without fail, genuinely changes how your body feels. You've got momentum now. Don't let it stop. 🚀`,
    ],
    health: [
      // lvl 0 — no change
      `${firstName}, you started this challenge with your health already in a great place — and you protected that all week. Every single day you gave your body a few seconds of intentional care: your eyes, your posture, your breath, your movement. Most people never do this even once. You did it 7 days in a row. That daily relationship with your own body is one of the most powerful habits you can build. The foundation is solid. Keep tending to it and you will start feeling even better than you already do. 💚`,
      // lvl 1 — somewhat better
      `${firstName}, your body is already feeling it. The small aches and stiffness, the heaviness that builds up from screens and sitting — you've been actively relieving that every single day this week. And now you can feel the difference. This is what real health looks like — not a dramatic detox or a gym transformation, but tiny daily acts of care that quietly add up. A looser shoulder. Fresher eyes. A body that carries you with a little more ease. You built this in 7 days. Keep going and watch it grow. 🌿`,
      // lvl 2 — noticeably better
      `${firstName}, this is a really meaningful shift in how your body feels. A week ago you felt one way. Today you feel noticeably better — and that is entirely because of the small things you did every single day. No expensive equipment. No strict routine. Just a few seconds of targeted daily care that told your body: "I see you, I am looking after you." Your body heard that message and responded. This is the power of consistency over intensity — and you've just lived it. Keep this up and the improvements will only compound. 🎉`,
    ],
    calmness: [
      // lvl 0 — no change
      `${firstName}, you came in already feeling calm — and you protected that all 7 days. A full week of stress, decisions, and distractions, and your calm didn't crack. Every day you created a small pocket of peace for yourself. That daily practice is a muscle, and you've been training it all week. It's yours now. 🧘`,
      // lvl 1 — somewhat better / sleeping a little better
      `${firstName}, you feel calmer and more in control than when you started — and that changes everything. When you're calm, you think more clearly, react less, and enjoy your day more. A few seconds of intentional peace, every day, added up into a real shift. You've started learning how to steer. Keep going. 😊`,
      // lvl 2 — noticeably better / sleeping noticeably better
      `${firstName}, the shift in your sense of calm is genuinely remarkable. Where days felt scattered or tense, you now have a quiet steadiness you can return to. No retreat. No major change. Just a few seconds of breath, repeated every single day for a week. That is real transformation — and it's yours to keep. ✨`,
    ],
  };
  const entries = map[cat] || map.energy;
  return entries[Math.min(Math.max(lvl, 0), entries.length - 1)];
}

// Overall summary — counts how many areas showed improvement (Day 7 score > 1).
function overallSummary(areasImproved: number, firstName: string): { headline: string; body: string } {
  if (areasImproved === 0) {
    return {
      headline: "🏆 You did it, " + firstName + "!",
      body: `You showed up every single day for 7 days straight — and that in itself is the real win. Most people who start a challenge like this quit within the first 2 or 3 days. Not you. You stayed consistent for a full week. You came in already feeling good and you held that standard every single day. That daily discipline, that consistency, is the exact foundation that real, lasting results are built on. Keep going — the best is ahead of you. 🎉`,
    };
  }
  if (areasImproved === 3) {
    return {
      headline: "🏆 You did it, " + firstName + "!",
      body: `You showed up every single day for 7 days — and you improved in ALL 3 areas. Energy, health, and calmness. That is outstanding. Most people who start a challenge like this quit within the first 2 or 3 days. You didn't just finish — you genuinely grew. Your body feels it, your mind feels it, and the numbers show it. This is exactly what tiny, consistent habits do when you give them time. You've proven it to yourself this week. Now imagine what 30 days looks like. 🎉`,
    };
  }
  return {
    headline: "🏆 You did it, " + firstName + "!",
    body: `You showed up every single day for 7 days straight — and you can already feel a real difference. Most people who start a challenge like this quit within the first 2 or 3 days. Not you. You stayed consistent for a full week and your body and mind are responding. You've already proven you can show up. Keep going and watch what happens. 🎉`,
  };
}

function buildHTML(data: Record<string, string>): string {
  const firstName = data.name.split(" ")[0];
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  // Day 0 = absolute baseline (1–3). Day 7 = relative improvement (1–3, where 1=no change).
  const cats = [
    { key: "energy",   label: "Energy",   emoji: "⚡", b: data.day1Energy, a: data.day7Energy },
    { key: "health",   label: "Health",   emoji: "🌿", b: data.day1Focus,  a: data.day7Focus  },
    { key: "calmness", label: "Calmness", emoji: "🧘", b: data.day1Health, a: data.day7Health },
  ].map(c => ({ ...c, d0: scoreDay0(c.b), d7: scoreDay7(c.a) }));

  const areasImproved = cats.filter(c => c.d7 > 1).length;
  const summary = overallSummary(areasImproved, firstName);

  const catHTML = cats.map(c => {
    const imp = impLabel(c.d7);
    const ins = insight(c.key, c.d7, c.d0, firstName);
    const bp = barPct(c.d0, 3);
    const ap = barPct(c.d7, 3);
    const cleanB = c.b.replace(/\p{Emoji}/gu, "").trim();
    const cleanA = c.a.replace(/\p{Emoji}/gu, "").trim();
    return `<div class="cat-card">
      <div class="cat-head"><span class="cat-emoji">${c.emoji}</span>
        <div><div class="cat-label">${c.label}</div>
        <span class="imp-badge" style="background:${imp.color}20;color:${imp.color}">${imp.emoji} ${imp.text}</span></div>
      </div>
      <div class="cmp-row">
        <div class="cmp-col"><div class="cmp-day">Day 0 — Before</div><div class="cmp-text">"${cleanB}"</div>
          <div class="bar-wrap"><div class="bar bar-b" style="width:${bp}%"></div></div></div>
        <div class="cmp-arrow">→</div>
        <div class="cmp-col"><div class="cmp-day">Day 7 — After</div><div class="cmp-text">"${cleanA}"</div>
          <div class="bar-wrap"><div class="bar bar-a" style="width:${ap}%"></div></div></div>
      </div>
      <div class="ins">${ins}</div>
    </div>`;
  }).join("");

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
/* System fonts — no external fetch, renders instantly */
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;background:#f0faf4;color:#18181b;width:800px}

/* ══════════════════════════════════════════
   PAGE 1: COVER + RESULT SUMMARY + CHALLENGE OVERVIEW
   ══════════════════════════════════════════ */
.page1{background:#fff;page-break-after:always}

/* Cover */
.cover{background:linear-gradient(135deg,#075e3a 0%,#128c5e 55%,#25d366 100%);padding:56px 56px 48px;position:relative;overflow:hidden}
.cover::before{content:'';position:absolute;top:-80px;right:-80px;width:320px;height:320px;border-radius:50%;background:rgba(255,255,255,0.06)}
.cover::after{content:'';position:absolute;bottom:-60px;left:-60px;width:240px;height:240px;border-radius:50%;background:rgba(0,0,0,0.08)}
.cover-logo{font-size:12px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.6);margin-bottom:40px;position:relative}
.cover-badge{display:inline-block;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.35);color:#fff;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;padding:6px 18px;border-radius:999px;margin-bottom:18px;position:relative}
.cover-title{font-family:Georgia,'Times New Roman',serif;font-size:44px;font-weight:700;color:#fff;line-height:1.1;margin-bottom:8px;position:relative}
.cover-title em{font-style:italic;color:#b7f5d0}
.cover-name{font-family:Georgia,'Times New Roman',serif;font-size:24px;font-style:italic;color:rgba(255,255,255,0.8);margin-bottom:28px;position:relative}
.cover-line{width:56px;height:2px;background:rgba(255,255,255,0.4);margin-bottom:18px;position:relative}
.cover-date{font-size:12px;color:rgba(255,255,255,0.45);position:relative}

/* Overall result */
.scores{background:#fff;padding:32px 56px;border-bottom:2px solid #e6f7ee}
.s-eye{font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#128c5e;margin-bottom:8px}
.s-title{font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;color:#18181b;margin-bottom:12px}
.s-summary{font-size:14px;color:#374151;line-height:1.85}

/* Challenge overview grid */
.overview{background:#f0faf4;padding:28px 56px 32px}
.ov-eye{font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#128c5e;margin-bottom:8px}
.ov-title{font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:700;color:#18181b;margin-bottom:18px}
.ov-habits{background:#fff;border:1px solid #c9edd9;border-radius:16px;padding:16px 24px}
.ov-habits-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#128c5e;margin-bottom:10px}
.habit-row{display:grid;grid-template-columns:28px 1fr;gap:0;align-items:baseline;padding:6px 0;border-bottom:1px solid #f0faf4}
.habit-row:last-child{border-bottom:none}
.habit-day{font-size:10px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;padding-right:0;white-space:nowrap;grid-column:1}
.habit-content{grid-column:2;display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
.habit-name{font-size:13px;font-weight:700;color:#18181b;white-space:nowrap}
.habit-sep{color:#c9edd9;font-size:12px}
.habit-desc{font-size:12px;color:#6b7280;line-height:1.4}

/* ══════════════════════════════════════════
   PAGE 2: PROGRESS BREAKDOWN
   ══════════════════════════════════════════ */
.page2{background:#f0faf4;page-break-after:always}
.cats{padding:28px 56px 28px}
.c-eye{font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#128c5e;margin-bottom:8px}
.c-title{font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;color:#18181b;margin-bottom:16px}
.cat-card{background:#fff;border:1px solid #c9edd9;border-radius:16px;padding:18px 24px;margin-bottom:12px}
.cat-head{display:flex;align-items:flex-start;gap:12px;margin-bottom:12px}
.cat-emoji{font-size:26px;line-height:1;flex-shrink:0}
.cat-label{font-size:16px;font-weight:800;color:#18181b;margin-bottom:5px}
.imp-badge{display:inline-block;font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px}
.cmp-row{display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:center;margin-bottom:10px}
.cmp-arrow{font-size:18px;color:#128c5e;font-weight:700;text-align:center}
.cmp-day{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#9ca3af;margin-bottom:5px}
.cmp-text{font-size:12px;color:#6b7280;font-style:italic;margin-bottom:8px;line-height:1.4}
.bar-wrap{background:#e6f7ee;border-radius:999px;height:7px;overflow:hidden}
.bar{height:100%;border-radius:999px}
.bar-b{background:#a8d5bc}
.bar-a{background:linear-gradient(90deg,#128c5e,#25d366)}
.ins{font-size:12.5px;color:#374151;line-height:1.7;padding:11px 16px;background:#f0faf4;border-left:3px solid #25d366;border-radius:0 10px 10px 0}

/* ══════════════════════════════════════════
   PAGE 3: WHAT'S NEXT + VALUE STACK
   ══════════════════════════════════════════ */
.page3{background:#fff;page-break-after:always}

/* What's next intro */
.duc-intro{padding:36px 56px 30px;text-align:center;border-bottom:2px solid #e6f7ee}
.duc-intro-eye{font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#128c5e;margin-bottom:10px}
.duc-intro-title{font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:700;color:#18181b;margin-bottom:16px;line-height:1.2}
.duc-intro-title em{font-style:italic;color:#128c5e}
.duc-intro-body{font-size:14px;color:#374151;line-height:1.85;max-width:580px;margin:0 auto}

/* Value stack on page 3 — light background version */
.vstack-wrap{padding:28px 56px 36px}
.vstack{background:#fff;border:2px solid #c9edd9;border-radius:20px;overflow:hidden}
.vstack-head{padding:16px 28px 14px;background:linear-gradient(135deg,#075e3a,#128c5e);border-bottom:1px solid rgba(183,245,208,0.3)}
.vstack-head-label{font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.6);margin-bottom:3px}
.vstack-head-title{font-size:15px;font-weight:800;color:#fff}
.vstack-row{display:flex;justify-content:space-between;align-items:flex-start;gap:18px;padding:11px 28px;border-bottom:1px solid #e6f7ee;background:#fff}
.vstack-left{flex:1;min-width:0;text-align:left}
.vstack-name{font-size:13.5px;color:#18181b;font-weight:700;line-height:1.35}
.vstack-desc{font-size:11.5px;color:#6b7280;margin-top:2px;line-height:1.4}
.vstack-val{font-size:14px;font-weight:800;color:#128c5e;white-space:nowrap;flex-shrink:0;padding-top:1px}
.vstack-total{display:flex;justify-content:space-between;align-items:center;padding:14px 28px;background:#f0faf4;border-top:2px solid #c9edd9}
.vstack-total-label{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#128c5e}
.vstack-total-val{font-size:20px;font-weight:900;color:#18181b;text-decoration:line-through;opacity:0.5}
/* Simple list rows (no price) — page 3 */
.vstack-row-simple{display:block;padding:9px 28px;border-bottom:1px solid #e6f7ee;background:#fff}
.vstack-row-last{border-bottom:none}
.vsimple-name{display:block;font-size:13px;color:#18181b;font-weight:700;line-height:1.4}
.vsimple-desc{display:block;font-size:11.5px;color:#6b7280;margin-top:2px;line-height:1.4}

/* ══════════════════════════════════════════
   PAGE 4: BRUNSON OFFER REVEAL + CTA
   ══════════════════════════════════════════ */
.page4{background:linear-gradient(160deg,#042e1c 0%,#064e30 45%,#0d7a4e 100%);position:relative;overflow:hidden}
.page4::before{content:'';position:absolute;top:-120px;right:-120px;width:400px;height:400px;border-radius:50%;background:rgba(255,255,255,0.03)}

.cta-inner{padding:48px 60px 56px;text-align:center;position:relative}

/* Permission opener — small eyebrow */
.p4-eye{font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:rgba(183,245,208,0.6);margin-bottom:12px}

/* Brunson-style headline — big, bold, serif, left-aligned feel but centered */
.p4-headline{font-family:Georgia,'Times New Roman',serif;font-size:34px;font-weight:700;color:#fff;line-height:1.2;margin-bottom:6px}
.p4-headline em{color:#b7f5d0;font-style:italic}
.p4-subline{font-size:15px;color:#c9f0db;margin-bottom:32px;line-height:1.7;font-style:italic}

/* "If all this did was" — the 3 emotional close questions */
.ifall-wrap{max-width:560px;margin:0 auto 28px;text-align:left}
.ifall-q{font-size:16px;color:#e2fced;line-height:1.75;margin-bottom:14px;padding-left:20px;border-left:3px solid #25d366}
.ifall-q strong{color:#fff;font-size:17px}
.ifall-footer{font-size:14px;color:rgba(183,245,208,0.75);font-style:italic;text-align:center;margin-bottom:28px}

/* Stack recap mini-box */
.recap-box{max-width:560px;margin:0 auto 24px;background:rgba(255,255,255,0.07);border:1px solid rgba(183,245,208,0.25);border-radius:16px;padding:18px 24px;text-align:left}
.recap-title{font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:rgba(183,245,208,0.6);margin-bottom:12px}
.recap-row{display:flex;justify-content:space-between;align-items:center;font-size:13px;color:#d4f5e4;padding:5px 0;border-bottom:1px solid rgba(255,255,255,0.06)}
.recap-row:last-child{border-bottom:none}
.recap-row-name{font-weight:600}
.recap-row-val{font-weight:800;color:#b7f5d0;white-space:nowrap;padding-left:12px}
.recap-total{display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding-top:12px;border-top:2px solid rgba(183,245,208,0.3)}
.recap-total-label{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.55)}
.recap-total-val{font-size:22px;font-weight:900;color:#fff;text-decoration:line-through;opacity:0.5}

/* Price cascade — the Brunson drop */
.cascade-wrap{max-width:560px;margin:0 auto 20px;text-align:center}
.cascade-not{font-size:16px;color:rgba(255,255,255,0.55);text-decoration:line-through;margin-bottom:6px;display:block}
.cascade-plain{font-size:16px;color:#d4f5e4;margin-bottom:8px;display:block}
.cascade-not strong{color:rgba(255,255,255,0.7)}

/* Reason why box */
.reason-box{max-width:560px;margin:0 auto 22px;background:rgba(255,255,255,0.06);border-left:4px solid #25d366;border-radius:0 12px 12px 0;padding:14px 20px;text-align:left}
.reason-box p{font-size:14px;color:#d4f5e4;line-height:1.75}

/* The price reveal block */
.reveal-price-block{max-width:560px;margin:0 auto 10px;background:rgba(37,211,102,0.16);border:2px solid #25d366;border-radius:18px;padding:26px 32px;text-align:center}
.reveal-discount-tag{display:inline-block;background:#25d366;color:#fff;font-size:13px;font-weight:900;letter-spacing:0.1em;text-transform:uppercase;padding:6px 20px;border-radius:999px;margin-bottom:14px}
.reveal-headline{font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;color:#fff;line-height:1.3;margin-bottom:8px}
.reveal-headline span{color:#b7f5d0}
.reveal-sub{font-size:14px;color:#d4f5e4;line-height:1.75}

/* Urgency + Guarantee row */
.urg-guar{max-width:560px;margin:10px auto 22px;display:grid;grid-template-columns:1fr 1fr;gap:12px}
.urg-box,.guar-box{background:rgba(255,255,255,0.06);border:1px solid rgba(183,245,208,0.2);border-radius:12px;padding:14px 16px;text-align:left}
.ug-icon{font-size:22px;margin-bottom:6px}
.ug-title{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:#b7f5d0;margin-bottom:4px}
.ug-body{font-size:12px;color:#c9f0db;line-height:1.6}

/* Scarcity note */
.reveal-nb{font-size:12px;color:rgba(255,255,255,0.5);margin-bottom:22px;font-style:italic;text-align:center}

/* CTA buttons */
.btn-primary{display:inline-flex;align-items:center;justify-content:center;gap:14px;background:linear-gradient(135deg,#25d366,#1aab55);color:#fff;font-size:20px;font-weight:800;padding:22px 52px;border-radius:999px;text-decoration:none;box-shadow:0 10px 40px rgba(37,211,102,0.6);position:relative;letter-spacing:0.01em}
.btn-wa-icon{width:32px;height:32px;flex-shrink:0;display:inline-block}
.btn-cancel{margin-top:12px;font-size:12px;color:rgba(255,255,255,0.5);position:relative}
.btn-chat-wrap{margin-top:20px;position:relative}
.btn-chat{display:inline-block;background:transparent;border:2px solid rgba(183,245,208,0.45);color:#b7f5d0;font-size:14px;font-weight:700;padding:13px 36px;border-radius:999px;text-decoration:none}
.btn-chat-sub{margin-top:10px;font-size:12px;color:rgba(255,255,255,0.45);max-width:440px;margin-left:auto;margin-right:auto;line-height:1.6;position:relative}
</style></head><body>

<!-- ═══════════════ PAGE 1 ═══════════════ -->
<div class="page1">

  <div class="cover">
    <div class="cover-logo">High Performance Club — 7-Day WhatsApp Challenge</div>
    <div class="cover-badge">7-Day Challenge Complete 🏆</div>
    <div class="cover-title">Your Personal<br><em>Progress Report</em></div>
    <div class="cover-name">${data.name}</div>
    <div class="cover-line"></div>
    <div class="cover-date">Generated on ${today}</div>
  </div>

  <div class="scores">
    <div class="s-eye">Your Result</div>
    <div class="s-title">${summary.headline}</div>
    <div class="s-summary">${summary.body}</div>
  </div>

  <div class="overview">
    <div class="ov-eye">Your 7-Day Journey</div>
    <div class="ov-title">Here is what you accomplished this week</div>
    <div class="ov-habits">
      <div class="ov-habits-title">Habits you built this week</div>
      <div class="habit-row">
        <span class="habit-day">D1</span>
        <span class="habit-content"><span class="habit-name">⚡ Energy Shake</span><span class="habit-sep">—</span><span class="habit-desc">A 10-second trick to wake up your body and instantly boost your energy level.</span></span>
      </div>
      <div class="habit-row">
        <span class="habit-day">D2</span>
        <span class="habit-content"><span class="habit-name">👀 Eye Refresh</span><span class="habit-sep">—</span><span class="habit-desc">A tiny daily ritual to leave your eyes feeling refreshed, relaxed, and recharged.</span></span>
      </div>
      <div class="habit-row">
        <span class="habit-day">D3</span>
        <span class="habit-content"><span class="habit-name">💆 Shoulder Unlock</span><span class="habit-sep">—</span><span class="habit-desc">A quick body reset to make you feel lighter, more comfortable, and improve your posture.</span></span>
      </div>
      <div class="habit-row">
        <span class="habit-day">D4</span>
        <span class="habit-content"><span class="habit-name">🌬️ 3 Breath Calm</span><span class="habit-sep">—</span><span class="habit-desc">A simple breathing technique to create a surprising sense of calm in under a minute.</span></span>
      </div>
      <div class="habit-row">
        <span class="habit-day">D5</span>
        <span class="habit-content"><span class="habit-name">🙏 Two-Word Magic</span><span class="habit-sep">—</span><span class="habit-desc">A tiny habit to strengthen relationships and instantly make people feel more connected to you.</span></span>
      </div>
      <div class="habit-row">
        <span class="habit-day">D6</span>
        <span class="habit-content"><span class="habit-name">😊 Smile Start Switch</span><span class="habit-sep">—</span><span class="habit-desc">A morning habit to start your day feeling more positive, confident, and energised.</span></span>
      </div>
      <div class="habit-row">
        <span class="habit-day">D7</span>
        <span class="habit-content"><span class="habit-name">🌟 Finish the Challenge</span><span class="habit-sep">—</span><span class="habit-desc">You saw what 7 days of tiny habits can actually do — and the results surprised you.</span></span>
      </div>
    </div>
  </div>

</div>

<!-- ═══════════════ PAGE 2 ═══════════════ -->
<div class="page2">
  <div class="cats">
    <div class="c-eye">Your Progress</div>
    <div class="c-title">Here is how you changed in 7 days 👇</div>
    ${catHTML}
  </div>
</div>

<!-- ═══════════════ PAGE 3 ═══════════════ -->
<div class="page3">

  <div class="duc-intro">
    <div class="duc-intro-eye">What's Next For You</div>
    <div class="duc-intro-title">${firstName}, meet your next step —<br><em>The Daily Upgrade Club.</em></div>
    <div class="duc-intro-body">You just proved that tiny habits work. In 7 days, without a complicated routine, you felt a real difference. Now imagine taking that same simple system and running it for <strong>30 days</strong>. One tiny habit a day, continued — and watch what happens to your energy, your health, and your sense of calm. That is exactly what the Daily Upgrade Club is built for.</div>
  </div>

  <div class="vstack-wrap">
    <div class="vstack">
      <div class="vstack-head">
        <div class="vstack-head-label">What's included every month</div>
        <div class="vstack-head-title">🚀 Daily Upgrade Club — Monthly Membership</div>
      </div>
      <div class="vstack-row-simple">
        <span class="vsimple-name">📩 30 Tiny Daily Habits on WhatsApp</span>
        <span class="vsimple-desc">1 carefully selected habit every day — energy, health, focus & wellbeing. Straight to your phone.</span>
      </div>
      <div class="vstack-row-simple">
        <span class="vsimple-name">🎯 One Monthly Theme</span>
        <span class="vsimple-desc">Go deeper into one area of your life each month and see real, focused change.</span>
      </div>
      <div class="vstack-row-simple">
        <span class="vsimple-name">✅ Daily Tracking & Accountability</span>
        <span class="vsimple-desc">Simple daily check-in messages that keep you consistent and build a streak you won't want to break.</span>
      </div>
      <div class="vstack-row-simple">
        <span class="vsimple-name">📊 Weekly Progress Scorecard</span>
        <span class="vsimple-desc">A personalised score every week so you can see — in numbers — exactly how much you're improving.</span>
      </div>
      <div class="vstack-row-simple">
        <span class="vsimple-name">📚 Complete Habit Vault</span>
        <span class="vsimple-desc">A growing library of 100+ powerful tiny habits across energy, health, sleep, focus & calm.</span>
      </div>
      <div class="vstack-row-simple">
        <span class="vsimple-name">👥 Private WhatsApp Group</span>
        <span class="vsimple-desc">Grow alongside others building a healthier, more productive life. Celebrate wins. Stay motivated.</span>
      </div>
      <div class="vstack-row-simple">
        <span class="vsimple-name">📘 Monthly Habit PDF Guide</span>
        <span class="vsimple-desc">All 30 habits in one beautiful guide every month — save it, revisit it, build your habit library.</span>
      </div>
      <div class="vstack-row-simple">
        <span class="vsimple-name">🗓️ Monthly Habit Calendar</span>
        <span class="vsimple-desc">Know exactly what to focus on each day — no planning, no guesswork, your month mapped out.</span>
      </div>
      <div class="vstack-row-simple vstack-row-last">
        <span class="vsimple-name">📰 High Performance Newsletter</span>
        <span class="vsimple-desc">One powerful idea + one practical action every week from the world's top performers.</span>
      </div>
    </div>
  </div>

</div>

<!-- ═══════════════ PAGE 4 ═══════════════ -->
<div class="page4">
  <div class="cta-inner">

    <div class="p4-eye">A Special Offer — For Challenge Completers Only</div>
    <div class="p4-headline">${firstName}, is it okay if we spend<br>just 2 minutes showing you<br><em>exactly what you're getting?</em></div>
    <div class="p4-subline">Because what we've built for you here is something we've never offered at this price before — and we want to make sure you understand every piece of it.</div>

    <!-- THE 3 EMOTIONAL CLOSES -->
    <div class="ifall-wrap">
      <div class="ifall-q"><strong>If all this did was</strong> give you the energy to wake up every morning feeling actually alive — would it be worth it?</div>
      <div class="ifall-q"><strong>If all this did was</strong> help you stay consistent every single month — without willpower, without a complicated routine — for months and years to come — would it be worth it?</div>
      <div class="ifall-q"><strong>If all this did was</strong> give you the calm, the focus, and the health to show up fully for the people who matter most to you — would it be worth it?</div>
    </div>
    <div class="ifall-footer">Of course it would. You already know it would — because you felt it this week.</div>

    <!-- STACK RECAP -->
    <div class="recap-box">
      <div class="recap-title">Here's a recap of exactly what you're getting</div>
      <div class="recap-row"><span class="recap-row-name">📩 30 Tiny Daily Habits on WhatsApp</span><span class="recap-row-val">₹2,999</span></div>
      <div class="recap-row"><span class="recap-row-name">🎯 One Monthly Theme</span><span class="recap-row-val">₹1,799</span></div>
      <div class="recap-row"><span class="recap-row-name">✅ Daily Tracking & Accountability</span><span class="recap-row-val">₹1,199</span></div>
      <div class="recap-row"><span class="recap-row-name">📊 Weekly Progress Scorecard</span><span class="recap-row-val">₹999</span></div>
      <div class="recap-row"><span class="recap-row-name">📚 Complete Habit Vault</span><span class="recap-row-val">₹999</span></div>
      <div class="recap-row"><span class="recap-row-name">👥 Private WhatsApp Group</span><span class="recap-row-val">₹999</span></div>
      <div class="recap-row"><span class="recap-row-name">📘 Monthly Habit PDF Guide</span><span class="recap-row-val">₹499</span></div>
      <div class="recap-row"><span class="recap-row-name">🗓️ Monthly Habit Calendar</span><span class="recap-row-val">₹299</span></div>
      <div class="recap-row"><span class="recap-row-name">📰 High Performance Newsletter</span><span class="recap-row-val">₹199</span></div>
      <div class="recap-total">
        <span class="recap-total-label">💰 Total Real Value</span>
        <span class="recap-total-val">₹9,991/month</span>
      </div>
    </div>

    <!-- PRICE CASCADE + REASON + REVEAL — never break across pages -->
    <div style="page-break-inside:avoid">
    <!-- PRICE CASCADE -->
    <div class="cascade-wrap">
      <span class="cascade-plain">Obviously, we're not going to charge you <strong>₹9,991.</strong></span>
      <span class="cascade-plain">We're not going to charge you <strong>₹4,999.</strong></span>
      <span class="cascade-plain">We're not even going to charge you <strong>₹999.</strong></span>
    </div>

    <!-- REASON WHY -->
    <div class="reason-box">
      <p>Here's the truth: the Daily Upgrade Club makes its real impact when people stay — when they build the habit of the habit, month after month. We don't want price to be the reason someone who already proved they can show up doesn't continue. So we're making this available to 7-Day Challenge completers only, at a price that removes every excuse.</p>
    </div>

    <!-- PRICE REVEAL -->
    <div class="reveal-price-block">
      <div class="reveal-discount-tag">🔥 Challenge Completer Price — Today Only</div>
      <div class="reveal-headline">Start your Daily Upgrade Club journey<br>for just <span>₹99/month.</span></div>
      <div class="reveal-sub">Less than ₹4 a day. Less than one cup of chai.<br>For a system that has already started changing your life.</div>
    </div>
    </div><!-- end page-break-inside:avoid -->

    <!-- URGENCY + GUARANTEE -->
    <div class="urg-guar">
      <div class="urg-box">
        <div class="ug-icon">⏰</div>
        <div class="ug-title">Only For You</div>
        <div class="ug-body">This price is not available publicly. It is exclusive to members who completed the 7-Day Challenge. Once you leave this report, it may not appear again.</div>
      </div>
      <div class="guar-box">
        <div class="ug-icon">🛡️</div>
        <div class="ug-title">Zero Risk</div>
        <div class="ug-body">Join and try it for 7 days. If you feel it's not worth every rupee, message us and we'll refund you completely. No questions asked.</div>
      </div>
    </div>

    <div class="reveal-nb">* This special price is only available to members who completed the 7-Day Challenge.</div>

    <a href="https://www.highperformanceclub.co/daily-upgrade-club" class="btn-primary">
      <svg class="btn-wa-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#25D366"/>
        <path d="M22.5 9.5C20.9 7.9 18.8 7 16.5 7C11.8 7 8 10.8 8 15.5C8 17.1 8.4 18.6 9.2 19.9L8 24L12.2 22.8C13.5 23.5 14.9 23.9 16.5 23.9C21.2 23.9 25 20.1 25 15.4C25 13.1 24.1 11 22.5 9.5ZM16.5 22.4C15.1 22.4 13.7 22 12.6 21.3L12.3 21.1L9.8 21.8L10.5 19.4L10.3 19.1C9.5 17.9 9.1 16.7 9.1 15.5C9.1 11.5 12.4 8.2 16.5 8.2C18.4 8.2 20.3 9 21.6 10.4C23 11.7 23.7 13.5 23.7 15.4C23.8 19.4 20.5 22.4 16.5 22.4ZM20.5 17.3C20.3 17.2 19.2 16.7 19 16.6C18.8 16.5 18.7 16.5 18.5 16.7C18.4 16.9 17.9 17.4 17.8 17.5C17.7 17.7 17.6 17.7 17.4 17.6C17.2 17.5 16.5 17.3 15.7 16.6C15.1 16 14.7 15.3 14.6 15.1C14.5 14.9 14.6 14.8 14.7 14.7L15 14.4C15.1 14.3 15.1 14.2 15.2 14.1C15.3 14 15.3 13.9 15.2 13.8C15.1 13.7 14.7 12.6 14.5 12.2C14.3 11.8 14.1 11.8 13.9 11.8H13.5C13.3 11.8 13.1 11.9 12.9 12.1C12.7 12.3 12.2 12.8 12.2 13.9C12.2 15 12.9 16.1 13 16.2C13.1 16.4 14.7 18.7 17 19.7C17.5 19.9 17.9 20.1 18.2 20.2C18.7 20.4 19.2 20.4 19.6 20.3C20 20.2 21 19.7 21.2 19.2C21.4 18.7 21.4 18.3 21.3 18.2C21.2 18 20.7 17.4 20.5 17.3Z" fill="white"/>
      </svg>
      Yes! Join Daily Upgrade Club — ₹99/month
    </a>
    <div class="btn-cancel">Cancel anytime. No pressure, no questions asked. 🙌</div>
    <div class="btn-chat-wrap">
      <a href="https://wa.me/918956146485?text=Hi%2C+I+have+a+question+about+the+Daily+Upgrade+Club" class="btn-chat">💬 Have a Question? Chat With Us</a>
      <div class="btn-chat-sub">Any doubts about the Daily Upgrade Club? Our team on WhatsApp will personally help you get started on your journey.</div>
    </div>

  </div>
</div>

</body></html>`;

}

export async function POST(request: Request) {
  try {
    const { whatsapp } = await request.json();
    if (!whatsapp) return NextResponse.json({ error: "whatsapp required" }, { status: 400 });

    // Read from Neon Postgres — the same DB the WhatsApp engine writes to.
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) return NextResponse.json({ error: "DATABASE_URL not configured" }, { status: 500 });
    const db = neon(dbUrl);
    const phone = normalisePhone(whatsapp);

    const rows = await db`
      SELECT full_name, first_name, whatsapp,
             day0_energy, day0_health, day0_sleep,
             day7_energy, day7_health, day7_sleep
      FROM members
      WHERE whatsapp LIKE ${"%" + phone}
      ORDER BY id DESC LIMIT 1
    `;
    if (!rows.length) return NextResponse.json({ error: `Member not found for ${whatsapp}` }, { status: 404 });
    const r = rows[0];

    const data = {
      name:             r.full_name || r.first_name || "Friend",
      whatsapp:         r.whatsapp,
      day1Energy:       r.day0_energy  || "",
      day1Focus:        r.day0_health  || "",
      day1Health:       r.day0_sleep   || "",
      day1Relationship: "",
      day7Energy:       r.day7_energy  || "",
      day7Focus:        r.day7_health  || "",
      day7Health:       r.day7_sleep   || "",
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

    const gotenbergAbort = new AbortController();
    const gotenbergTimer = setTimeout(() => gotenbergAbort.abort(), 90000);
    const gotenbergRes = await fetch("https://demo.gotenberg.dev/forms/chromium/convert/html", {
      method: "POST",
      body: gotenbergForm,
      signal: gotenbergAbort.signal,
    });
    clearTimeout(gotenbergTimer);

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
