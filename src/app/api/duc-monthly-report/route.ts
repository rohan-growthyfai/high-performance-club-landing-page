import { NextResponse } from "next/server";

export const maxDuration = 120;

interface WeeklyAssessment {
  week_number: number;
  day_start: number;
  day_end: number;
  overall_score: number;
  imp_score: number;
  con_score: number;
  mot_score: number;
  q_improvement?: string;
  q_consistency?: string;
  q_motivation?: string;
  checkins_in_week: number;
}

interface MonthlyReportPayload {
  whatsapp: string;
  firstName: string;
  trackName: string;
  trackEmoji: string;
  totalDays: number;
  longestStreak: number;
  currentStreak?: number;
  totalCheckinsActual?: number;
  allCheckinDays?: number[];           // actual day numbers completed
  weeklyAssessments?: WeeklyAssessment[];
  answers: {
    q_overall?:      string;
    q_consistency?:  string;
    q_feeling?:      string;
    q_continue?:     string;
  };
  onboardingAnswers?: Record<string, string>;
  aiDetails?: Record<string, string>;
}

function scoreAnswer(val: string): number {
  if (!val) return 2;
  const n = parseInt(val.split("_").pop() || "2");
  return isNaN(n) ? 2 : n;
}

function overallLabel(score: number) {
  if (score === 1) return { text: "Foundation Built",    color: "#f59e0b", emoji: "🌱" };
  if (score === 2) return { text: "Real Progress Made",  color: "#3b82f6", emoji: "📈" };
  if (score === 3) return { text: "Significant Growth",  color: "#10b981", emoji: "✅" };
  return                  { text: "Transformed!",        color: "#8b5cf6", emoji: "🚀" };
}

function feelingMessage(score: number): string {
  if (score === 1) return "You laid the groundwork. Month 2 is where results compound — your body and mind are now primed.";
  if (score === 2) return "Real progress. You feel it. This is what 30 days of tiny actions actually does to a person.";
  if (score === 3) return "You can genuinely feel the difference. That's not motivation — that's a habit taking root.";
  return "You've crossed a threshold that most people never reach. The identity shift has begun.";
}

function continueMessage(score: number): string {
  if (score <= 2) return "Take a few days to rest and reflect. When you're ready, a new track is waiting — pick something that excites you.";
  return "Your next track is ready whenever you are. Pick a new area to upgrade and keep the momentum going!";
}

function getGoalFromOnboarding(onboarding: Record<string, string>): string {
  const goalMap: Record<string, string> = {
    goal_1: "build lasting daily habits", goal_2: "improve your energy",
    goal_3: "reduce stress and anxiety", goal_4: "sleep better",
    goal_5: "improve focus and productivity",
  };
  return goalMap[onboarding?.q_goal || ""] || "upgrade your daily habits";
}

function buildWeekProgressChart(weeks: WeeklyAssessment[]): string {
  if (!weeks.length) return `<p style="color:#9ca3af;font-style:italic;font-size:14px;">Weekly assessments will appear here in future months.</p>`;

  return weeks.map(w => {
    const pct = w.overall_score || 0;
    const barColor = pct >= 75 ? "#10b981" : pct >= 50 ? "#3b82f6" : "#f59e0b";
    const label = pct >= 75 ? "Strong" : pct >= 50 ? "Solid" : "Building";
    const checkins = w.checkins_in_week ?? "—";
    const daysInWeek = w.day_end - w.day_start + 1;
    return `
      <div style="margin-bottom:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <div>
            <span style="font-weight:700;font-size:15px;color:#1a1a2e;">Week ${w.week_number}</span>
            <span style="font-size:13px;color:#6b7280;margin-left:8px;">Days ${w.day_start}–${w.day_end}</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;">
            <span style="font-size:13px;color:#6b7280;">${checkins}/${daysInWeek} habits done</span>
            <span style="font-weight:800;font-size:18px;color:${barColor};">${pct}%</span>
          </div>
        </div>
        <div style="background:#e5e7eb;border-radius:100px;height:10px;overflow:hidden;">
          <div style="background:${barColor};height:10px;border-radius:100px;width:${pct}%;transition:width 0.3s;"></div>
        </div>
        <div style="display:flex;justify-content:flex-end;margin-top:4px;">
          <span style="font-size:12px;color:${barColor};font-weight:600;">${label}</span>
        </div>
      </div>`;
  }).join("");
}

function buildHabitCalendar(allCheckinDays: number[], totalDays: number): string {
  const doneSet = new Set(allCheckinDays);
  const cells = Array.from({ length: totalDays }, (_, i) => {
    const day = i + 1;
    const done = doneSet.has(day);
    const bg    = done ? "#10b981" : "#e5e7eb";
    const color = done ? "#fff" : "#9ca3af";
    const fw    = done ? "700" : "400";
    return `<div style="width:36px;height:36px;border-radius:8px;background:${bg};display:flex;align-items:center;justify-content:center;font-size:12px;color:${color};font-weight:${fw};">${day}</div>`;
  }).join("");

  return `<div style="display:flex;flex-wrap:wrap;gap:6px;">${cells}</div>`;
}

function buildWeeklyInsight(weeks: WeeklyAssessment[]): string {
  if (weeks.length < 2) return "";
  const first = weeks[0].overall_score;
  const last  = weeks[weeks.length - 1].overall_score;
  const diff  = last - first;
  if (diff > 0) return `You improved your weekly score by <strong>+${diff}%</strong> from Week 1 to Week ${weeks.length}. That's real, measurable growth.`;
  if (diff === 0) return `You maintained a consistent performance across all ${weeks.length} weeks — steady momentum is what transforms a habit into identity.`;
  return `Even with some variance week to week, you showed up for <strong>${weeks.length} weeks straight</strong>. That consistency is the foundation everything else is built on.`;
}

function buildHTML(d: MonthlyReportPayload): string {
  const ovScore    = scoreAnswer(d.answers.q_overall     || "");
  const conScore   = scoreAnswer(d.answers.q_consistency || "");
  const feelScore  = scoreAnswer(d.answers.q_feeling     || "");
  const contScore  = scoreAnswer(d.answers.q_continue    || "");
  const ov         = overallLabel(ovScore);
  const feelMsg    = feelingMessage(feelScore);
  const contMsg    = continueMessage(contScore);

  const overallPct = Math.round((ovScore + conScore + feelScore) / 3 * 25);

  const totalCheckins     = d.totalCheckinsActual ?? 0;
  const allCheckinDays    = d.allCheckinDays ?? [];
  const weeklyAssessments = d.weeklyAssessments ?? [];
  const onboarding        = d.onboardingAnswers ?? {};
  const aiDetails         = d.aiDetails ?? {};

  const completionRate = Math.round((totalCheckins / 30) * 100);
  const daysLabel = conScore === 1 ? "< 15 days" : conScore === 2 ? "~15 days" : conScore === 3 ? "20+ days" : "25+ days 🔥";

  const goal = getGoalFromOnboarding(onboarding);

  const weeklyInsight = buildWeeklyInsight(weeklyAssessments);
  const weekChart     = buildWeekProgressChart(weeklyAssessments);
  const calendar      = buildHabitCalendar(allCheckinDays, 30);

  // Personal context sentence
  const aiParts: string[] = [];
  if (aiDetails.job)         aiParts.push(`as a ${aiDetails.job}`);
  if (aiDetails.city)        aiParts.push(`in ${aiDetails.city}`);
  if (aiDetails.kids)        aiParts.push(`with ${aiDetails.kids} to care for`);
  const personalLine = aiParts.length
    ? `Building these habits ${aiParts.join(", ")} makes what you've accomplished here even more meaningful.`
    : "";

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; background:#f8f9fa; color:#1a1a2e; width:800px; }
  .page { padding:48px; }
  .header { background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%); color:white; padding:40px 48px; border-radius:16px; margin-bottom:32px; }
  .brand { font-size:13px; letter-spacing:2px; text-transform:uppercase; opacity:0.7; margin-bottom:8px; }
  .report-title { font-size:30px; font-weight:800; line-height:1.2; }
  .track-pill { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.1); border-radius:100px; padding:8px 20px; margin-top:16px; font-size:15px; }
  .score-section { text-align:center; background:white; border-radius:16px; padding:32px; margin-bottom:24px; box-shadow:0 2px 8px rgba(0,0,0,0.06); }
  .score-big { font-size:64px; font-weight:800; background:linear-gradient(135deg,#8b5cf6,#3b82f6); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
  .section { background:white; border-radius:16px; padding:28px; margin-bottom:20px; box-shadow:0 2px 8px rgba(0,0,0,0.06); }
  .section-title { font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; color:#6b7280; margin-bottom:20px; }
  .metric-row { display:flex; gap:16px; }
  .metric { flex:1; background:#f8f9fa; border-radius:12px; padding:20px; text-align:center; }
  .metric-value { font-size:24px; font-weight:800; margin-bottom:4px; }
  .metric-label { font-size:12px; color:#6b7280; }
  .badge { display:inline-flex; align-items:center; gap:8px; border-radius:100px; padding:8px 20px; font-size:14px; font-weight:700; color:white; }
  .insight { background:#f0fdf4; border-left:4px solid #10b981; border-radius:0 12px 12px 0; padding:20px 24px; margin-top:16px; font-size:15px; line-height:1.6; }
  .personal-note { background:#fefce8; border-left:4px solid #f59e0b; border-radius:0 12px 12px 0; padding:16px 20px; margin-top:12px; font-size:14px; line-height:1.6; color:#374151; font-style:italic; }
  .next { background:linear-gradient(135deg,#ede9fe,#dbeafe); border-radius:12px; padding:20px 24px; font-size:15px; line-height:1.6; }
  .goal-callout { background:#f0f9ff; border:1px solid #bae6fd; border-radius:12px; padding:18px 22px; margin-bottom:20px; font-size:15px; color:#0369a1; }
  .footer { text-align:center; padding:24px 0 0; color:#9ca3af; font-size:12px; }
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <div class="brand">Daily Upgrade Club · 30-Day Report</div>
    <div class="report-title">${d.firstName}'s Monthly<br/>Progress Report</div>
    <div class="track-pill">${d.trackEmoji} ${d.trackName}</div>
  </div>

  ${goal ? `<div class="goal-callout">🎯 You joined to <strong>${goal}</strong>. Here's exactly how far you've come.</div>` : ""}

  <div class="score-section">
    <div style="font-size:56px;margin-bottom:8px;">🏆</div>
    <div class="score-big">${overallPct}%</div>
    <p style="color:#6b7280;font-size:15px;margin-top:8px;">Overall Monthly Score</p>
    <span class="badge" style="background:${ov.color};margin-top:16px;">${ov.emoji} ${ov.text}</span>
    ${weeklyInsight ? `<p style="color:#374151;font-size:14px;margin-top:16px;line-height:1.6;">${weeklyInsight}</p>` : ""}
  </div>

  <div class="section">
    <div class="section-title">30-Day Summary</div>
    <div class="metric-row">
      <div class="metric">
        <div class="metric-value" style="color:#f59e0b;">${d.longestStreak}</div>
        <div class="metric-label">Best Streak 🔥</div>
      </div>
      <div class="metric">
        <div class="metric-value" style="color:#10b981;">${totalCheckins}</div>
        <div class="metric-label">Habits Completed ✅</div>
      </div>
      <div class="metric">
        <div class="metric-value" style="color:#3b82f6;">${completionRate}%</div>
        <div class="metric-label">Completion Rate</div>
      </div>
      <div class="metric">
        <div class="metric-value" style="color:#8b5cf6;font-size:16px;">${daysLabel}</div>
        <div class="metric-label">Self-Rated Days</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Habit Calendar — Your 30 Days</div>
    <p style="font-size:13px;color:#6b7280;margin-bottom:16px;">Green = habit completed · Grey = missed or pending</p>
    ${calendar}
  </div>

  ${weeklyAssessments.length > 0 ? `
  <div class="section">
    <div class="section-title">Week-by-Week Progress</div>
    ${weekChart}
  </div>` : ""}

  <div class="section">
    <div class="section-title">How You Feel After 30 Days</div>
    <p style="font-size:15px;line-height:1.7;color:#374151;">${feelMsg}</p>
    ${personalLine ? `<div class="personal-note">${personalLine}</div>` : ""}
    <div class="insight" style="margin-top:16px;">
      Completing a full 30-day habit track puts ${d.firstName} in the top 5% of people who start a programme. Most quit in week one. You didn't.
    </div>
  </div>

  <div class="section">
    <div class="section-title">What's Next</div>
    <div class="next">${contMsg}</div>
  </div>

  <div class="footer">
    ${d.firstName}'s Daily Upgrade Club · ${d.trackEmoji} ${d.trackName} · 30-Day Complete
  </div>
</div>
</body>
</html>`;
}

export async function POST(req: Request) {
  try {
    const payload: MonthlyReportPayload = await req.json();
    const { whatsapp, firstName, trackName } = payload;
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
    const slug      = `duc-monthly-${whatsapp.replace(/\D/g,"")}-${Date.now()}`;
    const filename  = `${slug}.pdf`;

    const { putFile } = await import("@/lib/fileStore");
    const pdfUrl = await putFile(filename, pdfBuffer, "application/pdf");

    return NextResponse.json({ success: true, pdfUrl, firstName, trackName });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[duc-monthly-report]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
