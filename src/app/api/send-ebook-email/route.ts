import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EBOOK_URL = "https://highperformanceclub.co/ebook/slim-and-strong-90-day-habits.pdf";

export async function POST(req: NextRequest) {
  try {
    const { email, name, paymentId } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Pabbly Email SMTP credentials
    const transporter = nodemailer.createTransport({
      host: "smtp.pabbly.com",
      port: 465,
      secure: true,
      auth: {
        user: "admin@growthyfai.com",
        pass: process.env.PABBLY_EMAIL_TOKEN || "pem_c2325fb7d06237a9f2051080a215c716",
      },
    });

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr><td style="background:#0f1923;padding:32px 40px;text-align:center;">
          <div style="color:#e8a020;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;margin-bottom:8px;">HIGH PERFORMANCE CLUB</div>
          <div style="color:#fff;font-size:24px;font-weight:900;line-height:1.2;">Slim &amp; Strong</div>
          <div style="color:rgba(255,255,255,0.55);font-size:13px;margin-top:4px;">Your ebook is ready to download</div>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:40px;">
          <p style="color:#18181b;font-size:17px;font-weight:700;margin:0 0 12px;">Hi ${name || "there"} 👋</p>
          <p style="color:#4a4a52;line-height:1.7;margin:0 0 24px;">Your payment was successful and your copy of <strong>Slim &amp; Strong: 30 Tiny 5-Minute Habits to Lose Weight</strong> is ready. Click the button below to download it now.</p>

          <div style="text-align:center;margin:32px 0;">
            <a href="${EBOOK_URL}" style="display:inline-block;background:#1ea84f;color:#fff;font-weight:800;font-size:16px;padding:16px 40px;border-radius:9999px;text-decoration:none;">⬇ Download Your Ebook</a>
          </div>

          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:16px;margin-bottom:24px;">
            <div style="font-weight:700;color:#166534;margin-bottom:8px;">How to get started:</div>
            <div style="color:#166534;font-size:14px;line-height:1.8;">
              1. Download the PDF (the link above) — it's yours forever.<br>
              2. Open Day 1 tonight — takes 2 minutes to read.<br>
              3. Do the first habit tomorrow morning. Under 5 minutes.<br>
              4. One new habit each day for 90 days (across 3 areas of your life). That's the whole system.
            </div>
          </div>

          <p style="color:#4a4a52;font-size:14px;line-height:1.7;margin:0 0 24px;">The download link is permanent — bookmark it or save this email. You can access it anytime.</p>

          <div style="border-top:1px solid #e2dfd6;padding-top:24px;margin-top:24px;">
            <div style="background:#0f1923;border-radius:12px;padding:20px;text-align:center;">
              <div style="color:rgba(255,255,255,0.5);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:8px;">Want Daily Accountability?</div>
              <div style="color:#fff;font-weight:800;font-size:15px;margin-bottom:8px;">Get your habit on WhatsApp every morning</div>
              <p style="color:rgba(255,255,255,0.55);font-size:13px;margin:0 0 16px;line-height:1.6;">Daily Upgrade Club delivers 1 science-backed habit to your WhatsApp daily — with streak tracking and community. Try 7 days for ₹1.</p>
              <a href="https://wa.me/918956146485?text=Hi%2C+I+want+to+join+Daily+Upgrade+Club" style="display:inline-block;background:#25d366;color:#fff;font-weight:700;font-size:14px;padding:12px 28px;border-radius:9999px;text-decoration:none;">Try Daily Upgrade Club →</a>
            </div>
          </div>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:24px 40px;background:#f9f9f9;text-align:center;color:#71717a;font-size:12px;line-height:1.6;">
          High Performance Club · highperformanceclub.co<br>
          Questions? Reply to this email or write to admin@growthyfai.com<br>
          ${paymentId ? `Payment ID: ${paymentId}` : ""}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    await transporter.sendMail({
      from: '"High Performance Club" <admin@growthyfai.com>',
      to: email,
      subject: "Your Slim & Strong Ebook is Ready to Download 📥",
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Pabbly email error:", err?.message);
    return NextResponse.json({ error: "Email send failed" }, { status: 500 });
  }
}
