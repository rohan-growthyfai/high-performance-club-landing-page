"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const EBOOK_PDF_URL = "/ebook/slim-and-strong-90-day-habits.pdf";
const PABBLY_API_URL = "https://api.pabbly.com/v1/emailservice/message";
const PABBLY_TOKEN = "pem_c2325fb7d06237a9f2051080a215c716";

function ThankYouContent() {
  const params = useSearchParams();
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    // Fire Meta pixel purchase event
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Purchase", {
        value: 199, currency: "INR", content_name: "Slim & Strong Ebook",
      });
    }

    // Extract buyer email from Razorpay callback params
    const email = params.get("email") || params.get("razorpay_payment_link_reference_id") || null;
    const name = params.get("name") || "there";
    const paymentId = params.get("razorpay_payment_id") || params.get("payment_id") || "";

    if (email && email.includes("@")) {
      sendConfirmationEmail(email, name, paymentId);
    }
  }, [params]);

  async function sendConfirmationEmail(email: string, name: string, paymentId: string) {
    try {
      const res = await fetch("/api/send-ebook-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, paymentId }),
      });
      if (res.ok) setEmailSent(true);
      else setEmailError(true);
    } catch {
      setEmailError(true);
    }
  }

  return (
    <>
      <style>{`
        .ty-bg { min-height: 100vh; background: #0f1923; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem 1rem; }
        .ty-card { background: #fff; border-radius: 24px; padding: clamp(2rem,6vw,4rem); max-width: 560px; width: 100%; text-align: center; box-shadow: 0 32px 80px rgba(0,0,0,0.3); }
        .ty-check { width: 72px; height: 72px; border-radius: 9999px; background: linear-gradient(135deg, #1ea84f, #25d366); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem; }
        .ty-h1 { font-size: clamp(1.5rem,4vw,2rem); font-weight: 900; color: #18181b; margin-bottom: 0.75rem; line-height: 1.2; }
        .ty-body { color: #4a4a52; line-height: 1.7; margin-bottom: 1.5rem; font-size: 0.9625rem; }
        .ty-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
          background: #1ea84f; color: #fff; font-weight: 800; font-size: 1.0625rem;
          padding: 1rem 2.5rem; border-radius: 9999px; border: none; cursor: pointer;
          box-shadow: 0 4px 20px rgba(30,168,79,0.4); text-decoration: none;
          transition: background 0.15s, transform 0.15s;
          width: 100%;
        }
        .ty-btn:hover { background: #25d366; transform: translateY(-1px); }
        .ty-divider { height: 1px; background: #e2dfd6; margin: 1.5rem 0; }
        .ty-step { display: flex; align-items: flex-start; gap: 0.875rem; text-align: left; margin-bottom: 1rem; }
        .ty-step-num { width: 28px; height: 28px; border-radius: 9999px; background: rgba(30,168,79,0.1); color: #1ea84f; font-weight: 800; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 0.1rem; }
        .ty-email-note { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 0.875rem; font-size: 0.85rem; color: #166534; margin-top: 1rem; }
      `}</style>

      <div className="ty-bg">
        <div className="ty-card">
          <div className="ty-check">✓</div>
          <h1 className="ty-h1">Payment Successful!<br />Your Ebook is Ready 🎉</h1>
          <p className="ty-body">
            Welcome to your 90-day weight loss journey. Your copy of <strong>Slim &amp; Strong</strong> is ready to download right now — 90 habits across 3 tracks, starting with Day 1 tonight.
          </p>

          <a href={EBOOK_PDF_URL} download="Slim-and-Strong-90-Day-Habits.pdf" className="ty-btn">
            ⬇ Download Slim &amp; Strong (PDF)
          </a>

          {emailSent && (
            <div className="ty-email-note">
              ✉ A download link has also been sent to your email. Check your inbox (and spam folder just in case).
            </div>
          )}

          <div className="ty-divider" />

          <div style={{ textAlign: "left" }}>
            <div style={{ fontWeight: 700, marginBottom: "1rem", color: "#18181b" }}>How to get started:</div>
            {[
              "Download the PDF above — it's yours forever.",
              "Open Day 1 tonight — it takes 2 minutes to read.",
              "Do the first habit tomorrow morning. Takes under 5 minutes.",
              "Come back each day for the next habit. That's it.",
            ].map((step, i) => (
              <div key={i} className="ty-step">
                <div className="ty-step-num">{i + 1}</div>
                <div style={{ color: "#4a4a52", fontSize: "0.9rem", lineHeight: 1.65 }}>{step}</div>
              </div>
            ))}
          </div>

          <div className="ty-divider" />

          {/* Soft DUC upsell */}
          <div style={{ background: "#0f1923", borderRadius: "16px", padding: "1.5rem", textAlign: "center" }}>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>Want Daily Accountability?</div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: "1.0625rem", marginBottom: "0.5rem" }}>
              Get your habit delivered on WhatsApp every morning
            </div>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", marginBottom: "1.25rem", lineHeight: 1.6 }}>
              Join Daily Upgrade Club — 1 habit every morning on WhatsApp, streak tracking, and community. Try 7 days for ₹1.
            </p>
            <a
              href="https://wa.me/918956146485?text=Hi%2C+I+want+to+join+Daily+Upgrade+Club"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#25d366", color: "#fff", fontWeight: 700, padding: "0.75rem 1.75rem", borderRadius: "9999px", textDecoration: "none", fontSize: "0.9rem" }}
            >
              Try Daily Upgrade Club →
            </a>
          </div>

          <div style={{ marginTop: "1.5rem", color: "#71717a", fontSize: "0.8rem" }}>
            Questions? Email <a href="mailto:admin@growthyfai.com" style={{ color: "#1ea84f" }}>admin@growthyfai.com</a><br />
            We reply within 24 hours.
          </div>
        </div>
      </div>
    </>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0f1923", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
