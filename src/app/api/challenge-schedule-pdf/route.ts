import { NextResponse } from "next/server";

/**
 * Generates the "FREE Challenge Schedule" bonus PDF — a beautiful roadmap of the
 * 7-day challenge with curiosity-driven daily hints, benefits, the science of
 * tiny habits, and a referral ask. Same for everyone → cached after first build.
 */

const CACHED_FILENAME = "free-challenge-schedule.pdf";

function buildHTML(): string {
  const days = [
    { d: "1", emoji: "💧", hint: "A 1-minute morning habit that instantly wakes up your body and energy — before any chai or coffee." },
    { d: "2", emoji: "🌅", hint: "A simple 2-minute habit that quietly fixes your afternoon energy crash before it even happens." },
    { d: "3", emoji: "📵", hint: "The 10-minute rule that decides your focus and mood for the entire day." },
    { d: "4", emoji: "🧘", hint: "A 60-second reset that calms your mind before any stressful moment." },
    { d: "5", emoji: "🎯", hint: "The 2-minute ritual every high performer secretly swears by." },
    { d: "6", emoji: "🚶", hint: "A 5-minute habit that instantly sharpens your focus when your brain feels foggy." },
    { d: "7", emoji: "🌙", hint: "A bedtime habit that gently retrains your brain for lasting calm and happiness." },
  ];
  const dayRows = days.map(x => `
    <div class="dayrow">
      <div class="dnum">Day ${x.d}</div>
      <div class="demoji">${x.emoji}</div>
      <div class="dhint">${x.hint}</div>
    </div>`).join("");

  const benefits = [
    { e: "⚡", t: "More natural energy", s: "Without caffeine crashes or 5 AM wake-ups." },
    { e: "🎯", t: "Sharper focus", s: "Get more done with less mental noise." },
    { e: "😌", t: "A calmer mind", s: "Less stress, more steadiness through the day." },
    { e: "🌙", t: "Better sleep", s: "Wake up actually feeling rested." },
    { e: "💪", t: "Real consistency", s: "Become the kind of person who shows up daily." },
  ];
  const benefitRows = benefits.map(b => `
    <div class="bcard"><div class="be">${b.e}</div><div><div class="bt">${b.t}</div><div class="bs">${b.s}</div></div></div>`).join("");

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,500&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:#faf8f3;color:#18181b;width:800px}
.section{padding:46px 56px}
/* COVER */
.cover{background:linear-gradient(150deg,#0a0a0a 0%,#0f2417 52%,#16341f 100%);padding:66px 56px 54px;position:relative;overflow:hidden}
.cover::before{content:'';position:absolute;top:-90px;right:-90px;width:340px;height:340px;border-radius:50%;background:rgba(37,211,102,0.18)}
.eyebrow{font-size:13px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#4ade80;margin-bottom:18px}
.cov-title{font-family:'Playfair Display',serif;font-size:50px;font-weight:700;color:#fff;line-height:1.08;margin-bottom:14px}
.cov-title em{font-style:italic;color:#4ade80}
.cov-sub{font-size:17px;color:rgba(255,255,255,0.62);line-height:1.65;max-width:560px}
.pill{display:inline-flex;gap:18px;margin-top:30px}
.pill span{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);border-radius:999px;padding:9px 20px;font-size:14px;color:#fff;font-weight:600}
/* INTRO */
.intro{background:#fff}
.h2{font-family:'Playfair Display',serif;font-size:30px;font-weight:700;color:#18181b;margin-bottom:8px}
.lead{font-size:16px;color:#4b5563;line-height:1.75;margin-bottom:6px}
/* ROADMAP */
.roadmap{background:#faf8f3}
.dayrow{display:flex;align-items:center;gap:20px;background:#fff;border:1px solid #e9e4d8;border-radius:18px;padding:20px 24px;margin-bottom:14px}
.dnum{flex-shrink:0;width:86px;font-weight:800;font-size:17px;color:#1da851}
.demoji{flex-shrink:0;font-size:34px}
.dhint{font-size:14.5px;color:#4b5563;line-height:1.6;font-style:italic}
.lock{margin-top:8px;text-align:center;font-size:13px;color:#9ca3af;font-style:italic}
/* BENEFITS */
.benefits{background:#fff}
.bcard{display:flex;gap:18px;align-items:flex-start;padding:16px 0;border-bottom:1px solid #eee}
.bcard:last-child{border-bottom:none}
.be{font-size:30px;width:48px;flex-shrink:0}
.bt{font-size:17px;font-weight:800;color:#18181b;margin-bottom:3px}
.bs{font-size:14px;color:#6b7280;line-height:1.5}
/* WHY TINY */
.why{background:#0f1f14;color:#fff}
.why .h2{color:#fff}
.why p{font-size:15.5px;color:rgba(255,255,255,0.72);line-height:1.8;margin-bottom:14px}
.why em{color:#4ade80;font-style:italic;font-family:'Playfair Display',serif}
.quote{border-left:3px solid #25d366;padding-left:22px;margin:20px 0;font-family:'Playfair Display',serif;font-style:italic;font-size:20px;color:#fff;line-height:1.5}
/* REFER */
.refer{background:linear-gradient(135deg,#16341f,#0a0a0a);text-align:center;padding:50px 56px}
.refer .h2{color:#fff;margin-bottom:12px}
.refer p{font-size:15px;color:rgba(255,255,255,0.62);max-width:480px;margin:0 auto 14px;line-height:1.7}
.reward{display:inline-block;background:rgba(37,211,102,0.12);border:1px solid rgba(37,211,102,0.4);border-radius:16px;padding:14px 26px;color:#4ade80;font-weight:700;font-size:15px;margin:6px}
.footer{background:#f3f0e8;padding:22px 56px;text-align:center;font-size:12px;color:#9ca3af}
</style></head>
<body>
<!-- COVER -->
<div class="cover">
  <div class="eyebrow">Your Challenge Roadmap 🗺️</div>
  <div class="cov-title">The FREE 7-Day<br><em>WhatsApp Habits Challenge</em></div>
  <div class="cov-sub">Everything you'll receive, what each day unlocks, and exactly how 7 tiny habits will change how you feel — one small step at a time.</div>
  <div class="pill"><span>📩 1 habit a day</span><span>⏱️ Under 5 min</span><span>📱 On WhatsApp</span></div>
</div>

<!-- INTRO -->
<div class="section intro">
  <div class="h2">How this works</div>
  <p class="lead">Every morning for 7 days, you'll get <strong>one tiny habit</strong> on WhatsApp. Tap to reveal it, do it in under 5 minutes, and tap DONE. That's the whole system.</p>
  <p class="lead">No apps. No long videos. No willpower battles. Just one small win, every single day.</p>
</div>

<!-- ROADMAP -->
<div class="section roadmap">
  <div class="h2">Your 7-day roadmap</div>
  <p class="lead" style="margin-bottom:22px">A sneak peek at what each day unlocks — the full habit is revealed only on that day. 👀</p>
  ${dayRows}
  <div class="lock">🔒 Each habit stays secret until its day — that's half the fun.</div>
</div>

<!-- BENEFITS -->
<div class="section benefits">
  <div class="h2">What you'll start to feel</div>
  <p class="lead" style="margin-bottom:18px">Small habits, real shifts. Here's what most people notice within the week:</p>
  ${benefitRows}
</div>

<!-- WHY TINY -->
<div class="section why">
  <div class="h2">Why only tiny habits?</div>
  <p>Most people fail at change because they try to do <em>too much, too fast</em>. Big routines collapse the moment life gets busy.</p>
  <p>Tiny habits are different. They're so small you can't say no — even on your worst day. And small wins, repeated daily, quietly rewire who you are.</p>
  <div class="quote">"You do not rise to the level of your goals. You fall to the level of your systems."</div>
  <p>This challenge is your system. One tiny habit a day. That's how lasting change actually happens.</p>
</div>

<!-- REFER -->
<div class="refer">
  <div class="h2">Better with friends 🚀</div>
  <p>Habits stick when you're not doing them alone. Invite a friend to join you — and unlock rewards while you're at it.</p>
  <div class="reward">📄 1 friend joins → FREE Weight Loss Habits guide</div>
  <div class="reward">🏆 20 friends → a FULL month of the challenge</div>
  <p style="margin-top:16px">Your personal invite link is waiting in your WhatsApp. Share it and grow together.</p>
</div>

<div class="footer">FREE 7-Day WhatsApp Habits Challenge · One tiny habit a day changes everything.</div>
</body></html>`;
}

export async function POST() {
  try {
    const html = buildHTML();
    const form = new FormData();
    form.append("files", new Blob([html], { type: "text/html" }), "index.html");
    form.append("paperWidth", "8.5");
    form.append("paperHeight", "11");
    form.append("marginTop", "0"); form.append("marginBottom", "0");
    form.append("marginLeft", "0"); form.append("marginRight", "0");
    form.append("printBackground", "true");

    const got = await fetch("https://demo.gotenberg.dev/forms/chromium/convert/html", { method: "POST", body: form });
    if (!got.ok) throw new Error(`Gotenberg failed: ${got.status}`);
    const pdfBuffer = Buffer.from(await got.arrayBuffer());

    const { putFile } = await import("@/lib/fileStore");
    const publicUrl = await putFile(CACHED_FILENAME, Buffer.from(pdfBuffer), "application/pdf");

    return NextResponse.json({ success: true, pdfUrl: publicUrl, cached: false });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[challenge-schedule-pdf]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
