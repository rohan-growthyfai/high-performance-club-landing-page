import { NextResponse } from "next/server";

export const maxDuration = 120;

interface WeeklyReportPayload {
  whatsapp: string;
  firstName: string;
  trackName: string;
  trackEmoji: string;
  weekNumber: number;
  currentDay: number;
  streak: number;
  longestStreak?: number;
  checkinsInWeek?: number;   // real count from DB
  dayStart?: number;
  dayEnd?: number;
  answers: {
    q_improvement?: string;
    q_consistency?: string;
    q_motivation?: string;
  };
  onboardingAnswers?: Record<string, string>;  // from duc_members.flow_answers
  aiDetails?: Record<string, string>;           // from duc_ai_conversations.memory.personalDetails
}

function scoreAnswer(val: string): number {
  if (!val) return 2;
  const n = parseInt(val.split("_").pop() || "2");
  return isNaN(n) ? 2 : n;
}

function improvementLabel(score: number) {
  if (score === 1) return { text: "Building Foundation", color: "#f59e0b", emoji: "🌱" };
  if (score === 2) return { text: "Progressing",         color: "#3b82f6", emoji: "📈" };
  if (score === 3) return { text: "Improving",           color: "#10b981", emoji: "✅" };
  return                  { text: "Transforming!",       color: "#8b5cf6", emoji: "🚀" };
}

function consistencyLabel(score: number) {
  if (score === 1) return { text: "1–2 days",    color: "#ef4444" };
  if (score === 2) return { text: "3–4 days",    color: "#f59e0b" };
  if (score === 3) return { text: "5–6 days",    color: "#10b981" };
  return                  { text: "7/7 days 🔥", color: "#8b5cf6" };
}

function motivationNote(score: number): string {
  if (score === 1) return "Keep showing up — habits take time to feel natural. You're further along than you think.";
  if (score === 2) return "You're building real momentum. Each day you show up is a vote for who you're becoming.";
  if (score === 3) return "You're in the zone. This is when habits start to stick permanently.";
  return "You're on fire! This energy is exactly what transforms habits into identity.";
}

function focusForNextWeek(conScore: number, impScore: number): string {
  if (conScore >= 3 && impScore >= 3) return `You're showing up AND feeling the difference. This week, go a level deeper — try doing the habit at the same time each day to lock it into your body clock.`;
  if (conScore >= 3) return `You're already showing up consistently. This week, focus on the <strong>quality</strong> of each habit — go deeper, not just through the motion.`;
  if (impScore >= 3) return `You can feel the improvement even on days you struggled to show up. Imagine what consistent days will do. This week: <strong>don't break the chain.</strong>`;
  return `Your priority this week: <strong>don't break the chain.</strong> Even on your hardest day, do the habit once. One minute counts. Progress compounds.`;
}

function onboardingContext(onboarding: Record<string, string>, trackName: string): string {
  if (!onboarding || !Object.keys(onboarding).length) return "";
  const goalMap: Record<string, string> = {
    goal_1: "build lasting daily habits", goal_2: "improve your energy",
    goal_3: "reduce stress and anxiety", goal_4: "sleep better",
    goal_5: "improve focus and productivity",
  };
  const goal = goalMap[onboarding.q_goal] || "upgrade your daily habits";
  return `You joined to <strong>${goal}</strong> — and you're ${trackName} days into making that happen.`;
}

function personalContextNote(aiDetails: Record<string, string>): string {
  if (!aiDetails || !Object.keys(aiDetails).length) return "";
  const parts: string[] = [];
  if (aiDetails.job) parts.push(`as a ${aiDetails.job}`);
  if (aiDetails.city) parts.push(`based in ${aiDetails.city}`);
  if (aiDetails.sleep_issue) parts.push(`working through ${aiDetails.sleep_issue}`);
  if (aiDetails.kids) parts.push(`balancing life with ${aiDetails.kids}`);
  if (!parts.length) return "";
  return `Keeping in mind your life ${parts.join(", ")} — this consistency matters more than most people realise.`;
}

function buildHTML(d: WeeklyReportPayload): string {
  const impScore    = scoreAnswer(d.answers.q_improvement || "");
  const conScore    = scoreAnswer(d.answers.q_consistency || "");
  const motScore    = scoreAnswer(d.answers.q_motivation  || "");
  const imp         = improvementLabel(impScore);
  const con         = consistencyLabel(conScore);
  const motNote     = motivationNote(motScore);
  const overallScore = Math.round((impScore + conScore + motScore) / 3 * 25);
  const focusNote   = focusForNextWeek(conScore, impScore);

  const realCheckins   = d.checkinsInWeek ?? null;
  const daysInWeek     = d.dayEnd && d.dayStart ? (d.dayEnd - d.dayStart + 1) : 7;
  const selfConsistency = con.text;
  const realCheckinLine = realCheckins !== null
    ? `<div class="metric"><div class="metric-value" style="color:#10b981;">${realCheckins}/${daysInWeek}</div><div class="metric-label">Habits Done ✅</div></div>`
    : "";

  const onboardingLine = onboardingContext(d.onboardingAnswers || {}, d.trackName);
  const personalLine   = personalContextNote(d.aiDetails || {});

  const streakDots = Array.from({ length: 7 }, (_, i) =>
    `<div class="streak-dot ${i < (d.streak || 0) ? 'done' : ''}">${i < (d.streak || 0) ? '✓' : ''}</div>`
  ).join("");

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; background:#f8f9fa; color:#1a1a2e; width:800px; }
  .page { padding:48px; }
  .header { background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%); color:white; padding:40px 48px; border-radius:16px; margin-bottom:32px; }
  .header-top { display:flex; justify-content:space-between; align-items:flex-start; }
  .brand { font-size:13px; letter-spacing:2px; text-transform:uppercase; opacity:0.7; margin-bottom:8px; }
  .report-title { font-size:28px; font-weight:800; line-height:1.2; }
  .week-badge { background:rgba(255,255,255,0.15); border-radius:12px; padding:12px 20px; text-align:center; }
  .week-num { font-size:32px; font-weight:800; }
  .week-label { font-size:11px; opacity:0.7; text-transform:uppercase; letter-spacing:1px; }
  .track-pill { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.1); border-radius:100px; padding:8px 20px; margin-top:16px; font-size:15px; }
  .score-ring { text-align:center; margin-bottom:32px; }
  .ring-outer { width:140px; height:140px; border-radius:50%; background:linear-gradient(135deg,#8b5cf6,#3b82f6); display:flex; align-items:center; justify-content:center; margin:0 auto 12px; }
  .ring-inner { width:112px; height:112px; border-radius:50%; background:#f8f9fa; display:flex; flex-direction:column; align-items:center; justify-content:center; }
  .ring-score { font-size:36px; font-weight:800; color:#1a1a2e; }
  .ring-label { font-size:11px; color:#6b7280; text-transform:uppercase; letter-spacing:1px; }
  .section { background:white; border-radius:16px; padding:28px; margin-bottom:20px; box-shadow:0 2px 8px rgba(0,0,0,0.06); }
  .section-title { font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; color:#6b7280; margin-bottom:20px; }
  .metric-row { display:flex; gap:16px; margin-bottom:0; }
  .metric { flex:1; background:#f8f9fa; border-radius:12px; padding:20px; text-align:center; }
  .metric-value { font-size:26px; font-weight:800; margin-bottom:4px; }
  .metric-label { font-size:12px; color:#6b7280; }
  .badge { display:inline-flex; align-items:center; gap:8px; border-radius:100px; padding:8px 20px; font-size:14px; font-weight:700; color:white; }
  .insight { background:#f0fdf4; border-left:4px solid #10b981; border-radius:0 12px 12px 0; padding:20px 24px; margin-top:16px; font-size:15px; line-height:1.6; color:#1a1a2e; }
  .personal-note { background:#fefce8; border-left:4px solid #f59e0b; border-radius:0 12px 12px 0; padding:16px 20px; margin-top:12px; font-size:14px; line-height:1.6; color:#374151; font-style:italic; }
  .streak-bar { display:flex; gap:6px; margin-top:12px; }
  .streak-dot { width:28px; height:28px; border-radius:50%; background:#e5e7eb; display:flex; align-items:center; justify-content:center; font-size:11px; color:#9ca3af; }
  .streak-dot.done { background:#10b981; color:white; font-weight:700; }
  .focus-box { background:linear-gradient(135deg,#ede9fe,#dbeafe); border-radius:12px; padding:20px 24px; font-size:15px; line-height:1.7; color:#374151; }
  .footer { text-align:center; padding:24px 0 0; color:#9ca3af; font-size:12px; }
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <div class="header-top">
      <div>
        <div class="brand">Daily Upgrade Club</div>
        <div class="report-title">Week ${d.weekNumber}<br/>Progress Report</div>
        <div class="track-pill">${d.trackEmoji} ${d.trackName}</div>
      </div>
      <div class="week-badge">
        <div class="week-num">Day ${d.currentDay}</div>
        <div class="week-label">of 30</div>
      </div>
    </div>
  </div>

  <div class="score-ring">
    <div class="ring-outer">
      <div class="ring-inner">
        <div class="ring-score">${overallScore}%</div>
        <div class="ring-label">Week ${d.weekNumber}</div>
      </div>
    </div>
    <p style="color:#6b7280;font-size:14px;">Your Week ${d.weekNumber} Performance Score · Days ${d.dayStart || ""}–${d.dayEnd || ""}</p>
  </div>

  <div class="section">
    <div class="section-title">This Week's Numbers</div>
    <div class="metric-row">
      <div class="metric">
        <div class="metric-value" style="color:#f59e0b;">${d.streak}</div>
        <div class="metric-label">Day Streak 🔥</div>
      </div>
      ${realCheckinLine}
      <div class="metric">
        <div class="metric-value" style="color:#3b82f6;">Week ${d.weekNumber}</div>
        <div class="metric-label">of 4 Weeks</div>
      </div>
      <div class="metric">
        <div class="metric-value" style="color:#10b981;font-size:18px;">${selfConsistency}</div>
        <div class="metric-label">Self-Rated</div>
      </div>
    </div>
    <div class="streak-bar">${streakDots}</div>
  </div>

  <div class="section">
    <div class="section-title">Progress on ${d.trackName}</div>
    <span class="badge" style="background:${imp.color}">${imp.emoji} ${imp.text}</span>
    <div class="insight">${motNote}</div>
    ${onboardingLine ? `<div class="personal-note">${onboardingLine}</div>` : ""}
    ${personalLine   ? `<div class="personal-note">${personalLine}</div>`   : ""}
  </div>

  <div class="section">
    <div class="section-title">Focus for Week ${d.weekNumber + 1}</div>
    <div class="focus-box">${focusNote}</div>
  </div>

  <div class="footer">
    ${d.firstName}'s Daily Upgrade Club · ${d.trackEmoji} ${d.trackName} · Week ${d.weekNumber} of 4
  </div>
</div>
</body>
</html>`;
}

export async function POST(req: Request) {
  try {
    const payload: WeeklyReportPayload = await req.json();
    const { whatsapp, firstName, trackName, weekNumber } = payload;
    if (!whatsapp) return NextResponse.json({ error: "whatsapp required" }, { status: 400 });

    const html = buildHTML(payload);

    const form = new FormData();
    form.append("files", new Blob([html], { type: "text/html" }), "index.html");
    form.append("paperWidth",       "8.5");
    form.append("paperHeight",      "11");
    form.append("marginTop",        "0");
    form.append("marginBottom",     "0");
    form.append("marginLeft",       "0");
    form.append("marginRight",      "0");
    form.append("printBackground",  "true");

    const abort = new AbortController();
    const timer = setTimeout(() => abort.abort(), 90000);
    const gRes = await fetch("https://demo.gotenberg.dev/forms/chromium/convert/html", {
      method: "POST", body: form, signal: abort.signal,
    });
    clearTimeout(timer);
    if (!gRes.ok) throw new Error(`Gotenberg ${gRes.status}`);

    const pdfBuffer = Buffer.from(await gRes.arrayBuffer());
    const slug      = `duc-week${weekNumber}-${whatsapp.replace(/\D/g,"")}-${Date.now()}`;
    const filename  = `${slug}.pdf`;

    const { putFile } = await import("@/lib/fileStore");
    const pdfUrl = await putFile(filename, pdfBuffer, "application/pdf");

    return NextResponse.json({ success: true, pdfUrl, firstName, weekNumber });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[duc-weekly-report]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
