import { NextResponse } from "next/server";

/**
 * Generates the "7 Simple Weight Loss Habits" reward PDF (same for everyone).
 * Cached: if it already exists in Supabase, returns the existing URL instead
 * of regenerating. Used as the 1-referral reward.
 */

const CACHED_FILENAME = "weight-loss-habits-guide.pdf";

function buildHTML(): string {
  const habits = [
    { n: "1", emoji: "💧", title: "Water before every meal", body: "Drink one full glass of water 10 minutes before you eat. It naturally reduces how much you eat — without any effort or counting calories." },
    { n: "2", emoji: "🍽️", title: "The smaller plate trick", body: "Use a smaller plate for your meals. Your brain feels satisfied with less, simply because the plate looks full." },
    { n: "3", emoji: "🚶", title: "10-minute post-meal walk", body: "Walk for just 10 minutes after your largest meal. It controls blood sugar spikes and helps your body burn instead of store." },
    { n: "4", emoji: "🥗", title: "Veggies first", body: "Start every meal with the vegetables or salad. You fill up on fibre first, so you naturally eat less of the heavy stuff." },
    { n: "5", emoji: "😴", title: "Protect your sleep", body: "Aim for 7 hours. Poor sleep raises hunger hormones the next day — most overeating starts with being tired, not truly hungry." },
    { n: "6", emoji: "🍵", title: "Swap one drink", body: "Replace one sugary drink or sweet chai a day with water, black coffee, or green tea. One swap = hundreds of hidden calories gone." },
    { n: "7", emoji: "🪑", title: "Stand up every hour", body: "Set a reminder to stand and stretch once an hour. Tiny movements through the day quietly burn more than one gym session." },
  ];

  const cards = habits.map(h => `
    <div class="card">
      <div class="num">${h.n}</div>
      <div class="body">
        <div class="title">${h.emoji} ${h.title}</div>
        <div class="text">${h.body}</div>
      </div>
    </div>`).join("");

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@1,500;0,700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:#faf8f3;color:#18181b;width:800px}
.cover{background:linear-gradient(135deg,#0a0a0a 0%,#0f2417 55%,#16341f 100%);padding:64px 56px 52px;position:relative;overflow:hidden}
.cover::before{content:'';position:absolute;top:-80px;right:-80px;width:320px;height:320px;border-radius:50%;background:rgba(37,211,102,0.18)}
.eyebrow{font-size:13px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#4ade80;margin-bottom:20px}
.cover-title{font-family:'Playfair Display',serif;font-size:46px;font-weight:700;color:#fff;line-height:1.1;margin-bottom:14px}
.cover-title em{font-style:italic;color:#4ade80}
.cover-sub{font-size:17px;color:rgba(255,255,255,0.6);line-height:1.6;max-width:560px}
.intro{padding:40px 56px 12px;background:#fff}
.intro p{font-size:16px;color:#4b5563;line-height:1.75}
.cards{padding:24px 56px 44px;background:#fff}
.card{display:flex;gap:20px;align-items:flex-start;padding:22px 0;border-bottom:1px solid #eee}
.card:last-child{border-bottom:none}
.num{flex-shrink:0;width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,#25d366,#1da851);color:#fff;font-weight:800;font-size:20px;display:flex;align-items:center;justify-content:center}
.title{font-size:18px;font-weight:800;color:#18181b;margin-bottom:6px}
.text{font-size:14.5px;color:#4b5563;line-height:1.65}
.cta{background:linear-gradient(135deg,#0a0a0a,#16341f);padding:46px 56px;text-align:center}
.cta-title{font-family:'Playfair Display',serif;font-size:28px;color:#fff;margin-bottom:12px}
.cta-title em{color:#4ade80;font-style:italic}
.cta-body{font-size:14px;color:rgba(255,255,255,0.6);max-width:440px;margin:0 auto;line-height:1.7}
.footer{background:#f3f0e8;padding:20px 56px;text-align:center;font-size:12px;color:#9ca3af}
</style></head><body>
<div class="cover">
  <div class="eyebrow">Your Free Reward 🎁</div>
  <div class="cover-title">7 Simple<br><em>Weight Loss Habits</em></div>
  <div class="cover-sub">No diets. No gym. No calorie counting. Just 7 tiny habits that quietly help your body do the work — exactly like the FREE 7-Day Challenge.</div>
</div>
<div class="intro"><p>Thank you for sharing the challenge with a friend. Here are 7 effortless habits you can start today. Pick one, do it for a week, then add the next.</p></div>
<div class="cards">${cards}</div>
<div class="cta">
  <div class="cta-title">One tiny habit a day<br><em>changes everything.</em></div>
  <div class="cta-body">Keep going with your FREE 7-Day WhatsApp Habits Challenge — one small habit at a time.</div>
</div>
<div class="footer">FREE 7-Day WhatsApp Habits Challenge · Your daily habit companion</div>
</body></html>`;
}

export async function POST() {
  try {
    // Generate fresh
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
    console.error("[weight-loss-pdf]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
