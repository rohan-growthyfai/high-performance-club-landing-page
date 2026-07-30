"use client";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// EDIT THIS: paste your Masterclass WhatsApp GROUP invite link here.
// (Create the group in WhatsApp → Invite via link → copy the chat.whatsapp.com URL.)
// ═══════════════════════════════════════════════════════════════════════════
const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/REPLACE_WITH_YOUR_GROUP_INVITE";

const WEBINAR = {
  dayLabel: "Sunday",
  dateLabel: "2 August 2026",
  timeLabel: "11:00 AM IST",
  duration: "90 minutes",
};

function CheckIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#059669" />
      <path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.004 3C9.383 3 4 8.383 4 15c0 2.13.558 4.126 1.535 5.86L4 29l8.34-1.5A11.9 11.9 0 0016.004 27C22.62 27 28 21.617 28 15S22.62 3 16.004 3zm0 21.6c-1.94 0-3.74-.52-5.29-1.42l-.38-.22-4.95.89.9-4.83-.25-.4A9.55 9.55 0 016.4 15c0-5.29 4.31-9.6 9.604-9.6 5.29 0 9.596 4.31 9.596 9.6 0 5.29-4.306 9.6-9.596 9.6zm5.27-7.16c-.29-.145-1.71-.844-1.976-.94-.264-.097-.457-.145-.65.145-.193.29-.746.94-.915 1.134-.168.193-.337.217-.626.072-.29-.145-1.223-.451-2.33-1.438-.86-.767-1.44-1.714-1.61-2.004-.168-.29-.018-.446.127-.59.13-.13.29-.338.434-.507.145-.169.193-.29.29-.483.096-.193.048-.362-.024-.507-.072-.145-.65-1.566-.89-2.145-.235-.563-.473-.487-.65-.496l-.554-.01c-.193 0-.507.072-.772.362-.265.29-1.012.99-1.012 2.41 0 1.42 1.036 2.793 1.18 2.986.145.193 2.04 3.114 4.943 4.365.69.298 1.229.476 1.648.61.692.22 1.322.19 1.82.115.555-.083 1.71-.699 1.95-1.374.241-.676.241-1.255.169-1.375-.072-.121-.265-.193-.554-.338z" />
    </svg>
  );
}

// ─── One-time confetti / party-popper burst ────────────────────────────────
function Confetti() {
  const [pieces, setPieces] = useState<Array<{ id: number; left: number; delay: number; dur: number; color: string; size: number; rot: number; drift: number }> | null>(null);
  useEffect(() => {
    const colors = ["#d4a017", "#e8a020", "#22c55e", "#3b82f6", "#8b5cf6", "#ef4444", "#f59e0b", "#10b981"];
    // Deterministic-ish spread (avoids SSR; runs only on client)
    const arr = Array.from({ length: 110 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      dur: 2.6 + Math.random() * 1.8,
      color: colors[i % colors.length],
      size: 7 + Math.random() * 8,
      rot: Math.random() * 360,
      drift: (Math.random() - 0.5) * 220,
    }));
    setPieces(arr);
    const t = setTimeout(() => setPieces([]), 5200); // remove after it finishes
    return () => clearTimeout(t);
  }, []);
  if (!pieces || pieces.length === 0) return null;
  return (
    <div aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 60 }}>
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            top: "-20px",
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.6,
            background: p.color,
            borderRadius: p.id % 3 === 0 ? "50%" : "2px",
            opacity: 0.95,
            transform: `rotate(${p.rot}deg)`,
            animation: `ty-confetti ${p.dur}s cubic-bezier(0.2,0.6,0.4,1) ${p.delay}s forwards`,
            ["--drift" as string]: `${p.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export default function DeskHealthThankYouPage() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "CompleteRegistration", { content_name: "Desk Fit Formula Masterclass" });
    }
  }, []);

  const DATE_LINE = `${WEBINAR.dayLabel}, ${WEBINAR.dateLabel} · ${WEBINAR.timeLabel}`;

  return (
    <div id="ty-top" style={{ background: "#faf8f3", minHeight: "100vh", color: "#18181b" }}>
      <Confetti />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@600;700;800;900&display=swap');
        @keyframes ty-pop{0%{transform:scale(0.6);opacity:0}60%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
        @keyframes ty-confetti{0%{transform:translate(0,0) rotate(0deg);opacity:1}100%{transform:translate(var(--drift),105vh) rotate(720deg);opacity:0.9}}
        #ty-top{font-family:'Plus Jakarta Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased}
        #ty-top h1,#ty-top h2{font-family:'Poppins','Plus Jakarta Sans',sans-serif;letter-spacing:-0.02em}
        #ty-top .wa-btn{background:linear-gradient(135deg,#1fa855,#25D366);box-shadow:0 14px 34px rgba(37,211,102,0.45)}
        #ty-top .wa-btn:hover{background:linear-gradient(135deg,#189048,#1fbf5c);box-shadow:0 18px 42px rgba(37,211,102,0.55)}
      `}</style>

      {/* top bar */}
      <div style={{ background: "linear-gradient(90deg,#b8860b,#d4a017,#b8860b)", padding: "11px 16px" }}>
        <p className="text-center font-black text-white" style={{ fontSize: 15, letterSpacing: "0.005em" }}>
          ✅ You&apos;re registered for the Desk Fit Formula Masterclass!
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12 lg:py-16 text-center">
        {/* success */}
        <div className="inline-flex mb-5" style={{ animation: "ty-pop 0.5s ease both" }}>
          <div className="rounded-full flex items-center justify-center" style={{ width: 84, height: 84, background: "#ecfdf3", border: "2px solid #a7f3cf" }}>
            <CheckIcon size={48} />
          </div>
        </div>

        <p style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.14em", color: "#a8790d", marginBottom: 10 }}>Registration confirmed</p>
        <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, lineHeight: 1.12, marginBottom: 14 }}>
          You&apos;re in! 🎉<br />
          <span style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>See you at the masterclass.</span>
        </h1>
        <p style={{ fontSize: 17.5, color: "#3f3f46", lineHeight: 1.65, fontWeight: 500, maxWidth: 540, margin: "0 auto 26px" }}>
          Your seat is confirmed. Please check your <strong style={{ color: "#18181b" }}>WhatsApp &amp; Email</strong> to find session joining details!
        </p>

        {/* when */}
        <div className="rounded-2xl px-6 py-5 mb-8 inline-block" style={{ background: "#18181b" }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#e8a020", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>🗓 Save the date</p>
          <p style={{ fontSize: 18, fontWeight: 800, color: "#fff", fontFamily: "'Poppins',sans-serif" }}>{DATE_LINE}</p>
          <p style={{ fontSize: 13.5, color: "#a1a1aa", marginTop: 2 }}>{WEBINAR.duration} · Live on Zoom</p>
        </div>

        {/* WhatsApp group CTA */}
        <div className="rounded-3xl p-6 lg:p-8" style={{ background: "linear-gradient(135deg,#0b3d2e,#0f5138)", border: "1px solid rgba(37,211,102,0.3)" }}>
          <p style={{ fontSize: 34 }}>🎁</p>
          <h2 style={{ fontSize: "clamp(1.4rem,3.5vw,1.9rem)", fontWeight: 900, color: "#fff", lineHeight: 1.2, marginTop: 6, marginBottom: 10 }}>
            Join the Masterclass<br />WhatsApp Group
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, fontWeight: 500, maxWidth: 440, margin: "0 auto 22px" }}>
            Don&apos;t miss the <strong style={{ color: "#fff" }}>exciting bonuses, gifts and surprises</strong> we&apos;ll be dropping only inside the group — plus your reminders and joining link.
          </p>
          <a href={WHATSAPP_GROUP_LINK} target="_blank" rel="noopener noreferrer"
            className="wa-btn inline-flex items-center justify-center gap-3 rounded-full font-black text-white w-full sm:w-auto"
            style={{ fontSize: 20, padding: "20px 44px", border: "none", cursor: "pointer" }}>
            <WhatsAppIcon size={26} />Join the WhatsApp Group
          </a>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 12 }}>Free · Takes 5 seconds · Leave anytime</p>
        </div>

        <p className="mt-8" style={{ fontSize: 13, color: "#71717a" }}>
          Have a question?{" "}
          <a href="https://wa.me/918956146485?text=Hi%2C+I+just+registered+for+the+Desk+Fit+Formula+masterclass" className="underline" style={{ color: "#a8790d" }}>Message us on WhatsApp</a>
        </p>
      </div>

      <footer className="px-5 py-6 text-center" style={{ background: "#0a0a0a" }}>
        <p style={{ fontSize: 12, color: "#52525b" }}>
          © {new Date().getFullYear()} High Performance Club ·{" "}
          <a href="https://www.highperformanceclub.co" className="underline" style={{ color: "#3f3f46" }}>highperformanceclub.co</a>
        </p>
      </footer>
    </div>
  );
}
