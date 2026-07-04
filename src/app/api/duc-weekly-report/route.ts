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
  const overallScore = Math.round((impScore + conScore + motScore) / 3 * 25);
  const focusNote   = focusForNextWeek(conScore, impScore);

  const daysInWeek  = d.dayEnd && d.dayStart ? (d.dayEnd - d.dayStart + 1) : 7;
  const realDone    = d.checkinsInWeek ?? 0;
  const realMissed  = Math.max(0, daysInWeek - realDone);
  const completionPct = Math.round((realDone / daysInWeek) * 100);

  const onboardingLine = onboardingContext(d.onboardingAnswers || {}, d.trackName);
  const personalLine   = personalContextNote(d.aiDetails || {});

  // Habit calendar for the week — green = done, grey = missed
  const habitDots = Array.from({ length: daysInWeek }, (_, i) => {
    const dayNum = (d.dayStart || 1) + i;
    const done = i < realDone;
    return `<div style="width:48px;height:48px;border-radius:12px;background:${done ? "#10b981" : "#e5e7eb"};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;">
      <div style="font-size:11px;font-weight:700;color:${done ? "#fff" : "#9ca3af"};">Day</div>
      <div style="font-size:16px;font-weight:800;color:${done ? "#fff" : "#9ca3af"};">${dayNum}</div>
      ${done ? `<div style="font-size:10px;color:rgba(255,255,255,0.8);">✓</div>` : ""}
    </div>`;
  }).join("");

  // Motivating opener based on completion
  const openerEmoji = completionPct >= 86 ? "🔥" : completionPct >= 57 ? "💪" : "🌱";
  const openerTitle = completionPct >= 86
    ? `Incredible week, ${d.firstName}!`
    : completionPct >= 57
    ? `Great effort this week, ${d.firstName}!`
    : `You showed up, ${d.firstName}!`;
  const openerSub = completionPct >= 86
    ? `You completed ${realDone} out of ${daysInWeek} habits this week. That's exceptional — most people never even start.`
    : completionPct >= 57
    ? `You completed ${realDone} out of ${daysInWeek} habits. More than half the week, you chose yourself. That matters.`
    : `You completed ${realDone} out of ${daysInWeek} habits. Every single day you showed up counts — the habit is forming.`;

  // Missed days message — always encouraging, never shaming
  const missedMsg = realMissed === 0
    ? `You didn't miss a single day this week. That's rare — and worth celebrating. 🎉`
    : realMissed === 1
    ? `You missed just 1 day out of ${daysInWeek}. That's not a failure — that's being human. What matters is you came back.`
    : realMissed <= 3
    ? `${realMissed} days were tough this week. Life gets in the way sometimes. The fact you're still here, reading this report, tells us everything about your commitment.`
    : `This was a challenging week. But here's the truth — the fact that you're still in the programme, still tracking, still showing up? That puts you ahead of people who quit on Day 1.`;

  // Progress note
  const progressNote = motivationNote(motScore);

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; background:#f0fdf4; color:#1a1a2e; width:800px; }
  .page { padding:48px; }
  .header { background:linear-gradient(135deg,#064e3b 0%,#065f46 100%); color:white; padding:44px 48px; border-radius:20px; margin-bottom:28px; position:relative; overflow:hidden; }
  .header::after { content:''; position:absolute; top:-60px; right:-60px; width:220px; height:220px; border-radius:50%; background:rgba(255,255,255,0.05); }
  .brand { font-size:12px; letter-spacing:2.5px; text-transform:uppercase; opacity:0.65; margin-bottom:10px; }
  .report-title { font-size:30px; font-weight:800; line-height:1.2; margin-bottom:6px; }
  .report-sub { font-size:15px; opacity:0.75; }
  .track-pill { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.12); border-radius:100px; padding:8px 20px; margin-top:18px; font-size:14px; border:1px solid rgba(255,255,255,0.2); }
  .day-badge { position:absolute; top:44px; right:48px; background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.25); border-radius:14px; padding:14px 20px; text-align:center; }
  .day-num { font-size:34px; font-weight:800; line-height:1; }
  .day-lbl { font-size:11px; opacity:0.65; text-transform:uppercase; letter-spacing:1px; margin-top:4px; }

  .opener { background:white; border-radius:20px; padding:32px 36px; margin-bottom:24px; box-shadow:0 2px 12px rgba(0,0,0,0.06); border-left:5px solid #10b981; }
  .opener-emoji { font-size:48px; margin-bottom:12px; }
  .opener-title { font-size:24px; font-weight:800; color:#064e3b; margin-bottom:10px; }
  .opener-body { font-size:16px; line-height:1.7; color:#374151; }

  .stats-row { display:flex; gap:16px; margin-bottom:24px; }
  .stat { flex:1; background:white; border-radius:16px; padding:24px 20px; text-align:center; box-shadow:0 2px 8px rgba(0,0,0,0.05); }
  .stat-value { font-size:36px; font-weight:900; margin-bottom:6px; }
  .stat-label { font-size:13px; color:#6b7280; font-weight:600; }

  .section { background:white; border-radius:16px; padding:28px 32px; margin-bottom:20px; box-shadow:0 2px 8px rgba(0,0,0,0.05); }
  .section-title { font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:2px; color:#6b7280; margin-bottom:18px; }

  .habit-dots { display:flex; gap:8px; flex-wrap:wrap; }
  .score-bar-wrap { margin-bottom:12px; }
  .score-bar-label { display:flex; justify-content:space-between; font-size:14px; color:#374151; margin-bottom:6px; }
  .score-bar-track { background:#e5e7eb; border-radius:100px; height:12px; overflow:hidden; }
  .score-bar-fill { height:12px; border-radius:100px; }

  .badge { display:inline-flex; align-items:center; gap:8px; border-radius:100px; padding:8px 20px; font-size:14px; font-weight:700; color:white; margin-bottom:14px; }
  .callout { border-radius:14px; padding:20px 24px; font-size:15px; line-height:1.7; }
  .callout-green { background:#f0fdf4; border-left:4px solid #10b981; color:#1a1a2e; }
  .callout-yellow { background:#fefce8; border-left:4px solid #f59e0b; color:#374151; font-style:italic; }
  .callout-blue { background:#eff6ff; border-left:4px solid #3b82f6; color:#1e3a5f; }
  .callout-purple { background:linear-gradient(135deg,#ede9fe,#dbeafe); color:#374151; }
  .missed-note { background:#fff7ed; border-left:4px solid #f97316; border-radius:0 14px 14px 0; padding:18px 22px; font-size:14px; line-height:1.7; color:#7c2d12; margin-top:14px; }

  .footer { text-align:center; padding:28px 0 0; color:#9ca3af; font-size:12px; }
</style>
</head>
<body>
<div class="page">

  <!-- Header -->
  <div class="header">
    <div class="day-badge">
      <div class="day-num">Day ${d.currentDay}</div>
      <div class="day-lbl">of 30</div>
    </div>
    <div class="brand">Daily Upgrade Club</div>
    <div class="report-title">Week ${d.weekNumber} Progress Report</div>
    <div class="report-sub">Days ${d.dayStart || 1}–${d.dayEnd || 7} · Your personal summary</div>
    <div class="track-pill">${d.trackEmoji} ${d.trackName}</div>
  </div>

  <!-- Motivating opener -->
  <div class="opener">
    <div class="opener-emoji">${openerEmoji}</div>
    <div class="opener-title">${openerTitle}</div>
    <div class="opener-body">${openerSub}</div>
    ${onboardingLine ? `<div style="margin-top:12px;font-size:14px;color:#6b7280;font-style:italic;">${onboardingLine}</div>` : ""}
  </div>

  <!-- Stats row -->
  <div class="stats-row">
    <div class="stat">
      <div class="stat-value" style="color:#10b981;">${realDone}</div>
      <div class="stat-label">Habits Done ✅</div>
    </div>
    <div class="stat">
      <div class="stat-value" style="color:${realMissed === 0 ? "#10b981" : "#f97316"};">${realMissed}</div>
      <div class="stat-label">Days Missed</div>
    </div>
    <div class="stat">
      <div class="stat-value" style="color:#8b5cf6;">${completionPct}%</div>
      <div class="stat-label">Completion Rate</div>
    </div>
    <div class="stat">
      <div class="stat-value" style="color:#f59e0b;">${d.streak || 0}🔥</div>
      <div class="stat-label">Current Streak</div>
    </div>
  </div>

  <!-- Week calendar -->
  <div class="section">
    <div class="section-title">Your Week at a Glance</div>
    <div class="habit-dots">${habitDots}</div>
    ${realMissed > 0 ? `<div class="missed-note">💛 ${missedMsg}</div>` : `<div class="callout callout-green" style="margin-top:14px;">🎯 ${missedMsg}</div>`}
  </div>

  <!-- Score bars -->
  <div class="section">
    <div class="section-title">How You Rated Your Week</div>
    <div class="score-bar-wrap">
      <div class="score-bar-label"><span>Improvement noticed</span><span style="font-weight:700;color:#10b981;">${imp.emoji} ${imp.text}</span></div>
      <div class="score-bar-track"><div class="score-bar-fill" style="background:#10b981;width:${impScore * 25}%;"></div></div>
    </div>
    <div class="score-bar-wrap" style="margin-top:14px;">
      <div class="score-bar-label"><span>Self-rated consistency</span><span style="font-weight:700;color:#3b82f6;">${conScore * 25}%</span></div>
      <div class="score-bar-track"><div class="score-bar-fill" style="background:#3b82f6;width:${conScore * 25}%;"></div></div>
    </div>
    <div class="score-bar-wrap" style="margin-top:14px;">
      <div class="score-bar-label"><span>Motivation level</span><span style="font-weight:700;color:#8b5cf6;">${motScore * 25}%</span></div>
      <div class="score-bar-track"><div class="score-bar-fill" style="background:#8b5cf6;width:${motScore * 25}%;"></div></div>
    </div>
    <div style="margin-top:20px;background:#f8fafc;border-radius:12px;padding:16px 20px;display:flex;align-items:center;justify-content:center;gap:12px;">
      <div style="font-size:13px;color:#6b7280;">Overall Week Score</div>
      <div style="font-size:28px;font-weight:900;color:#064e3b;">${overallScore}%</div>
      <span class="badge" style="background:${imp.color};margin:0;">${imp.emoji} ${imp.text}</span>
    </div>
  </div>

  <!-- Progress note -->
  <div class="section">
    <div class="section-title">What This Week Tells Us</div>
    <div class="callout callout-green">${progressNote}</div>
    ${personalLine ? `<div class="callout callout-yellow" style="margin-top:12px;">${personalLine}</div>` : ""}
  </div>

  <!-- Focus next week -->
  <div class="section">
    <div class="section-title">Your Focus for Week ${d.weekNumber + 1}</div>
    <div class="callout callout-purple" style="border-radius:14px;padding:22px 26px;">${focusNote}</div>
  </div>

  <div class="footer">
    Made with care for ${d.firstName} · Daily Upgrade Club · ${d.trackEmoji} ${d.trackName} · Week ${d.weekNumber} of 4
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
