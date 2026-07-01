import { NextResponse } from "next/server";

export const maxDuration = 120;

interface MonthlyReportPayload {
  whatsapp: string;
  firstName: string;
  trackName: string;
  trackEmoji: string;
  totalDays: number;
  longestStreak: number;
  answers: {
    q_overall?:      string;
    q_consistency?:  string;
    q_feeling?:      string;
    q_continue?:     string;
  };
}

function scoreAnswer(val: string): number {
  if (!val) return 2;
  const n = parseInt(val.split("_").pop() || "2");
  return isNaN(n) ? 2 : n;
}

function overallLabel(score: number) {
  if (score === 1) return { text: "Foundation Built",      color: "#f59e0b", emoji: "🌱" };
  if (score === 2) return { text: "Real Progress Made",    color: "#3b82f6", emoji: "📈" };
  if (score === 3) return { text: "Significant Growth",    color: "#10b981", emoji: "✅" };
  return                  { text: "Transformed!",          color: "#8b5cf6", emoji: "🚀" };
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

function buildHTML(d: MonthlyReportPayload): string {
  const ovScore   = scoreAnswer(d.answers.q_overall     || "");
  const conScore  = scoreAnswer(d.answers.q_consistency || "");
  const feelScore = scoreAnswer(d.answers.q_feeling     || "");
  const ov        = overallLabel(ovScore);
  const feelMsg   = feelingMessage(feelScore);
  const contMsg   = continueMessage(scoreAnswer(d.answers.q_continue || ""));

  const daysLabel = conScore === 1 ? "< 15 days" : conScore === 2 ? "~15 days" : conScore === 3 ? "20+ days" : "25+ days 🔥";
  const overallPct = Math.round((ovScore + conScore + feelScore) / 3 * 25);

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
  .trophy { font-size:56px; text-align:center; margin-bottom:8px; }
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
  .next { background:linear-gradient(135deg,#ede9fe,#dbeafe); border-radius:12px; padding:20px 24px; font-size:15px; line-height:1.6; }
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

  <div class="score-section">
    <div class="trophy">🏆</div>
    <div class="score-big">${overallPct}%</div>
    <p style="color:#6b7280;font-size:15px;margin-top:8px;">Overall Monthly Score</p>
    <span class="badge" style="background:${ov.color};margin-top:16px;">${ov.emoji} ${ov.text}</span>
  </div>

  <div class="section">
    <div class="section-title">30-Day Summary</div>
    <div class="metric-row">
      <div class="metric">
        <div class="metric-value" style="color:#f59e0b;">${d.longestStreak}</div>
        <div class="metric-label">Best Streak 🔥</div>
      </div>
      <div class="metric">
        <div class="metric-value" style="color:#3b82f6;">30</div>
        <div class="metric-label">Total Days</div>
      </div>
      <div class="metric">
        <div class="metric-value" style="color:#10b981;">${daysLabel}</div>
        <div class="metric-label">Days Completed</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">How You Feel Now</div>
    <p style="font-size:15px;line-height:1.7;color:#374151;">
      ${feelMsg}
    </p>
    <div class="insight" style="margin-top:16px;">
      The fact that you completed a full 30-day track puts you in the top 5% of people who start a habit programme. Most people quit in the first week. You didn't.
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
