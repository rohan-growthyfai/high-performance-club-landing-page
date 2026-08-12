"use client";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// EDIT THIS: paste your AI at Work™ WhatsApp COMMUNITY invite link here.
// (Create the group in WhatsApp → Invite via link → copy the chat.whatsapp.com URL.)
// ═══════════════════════════════════════════════════════════════════════════
const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/REPLACE_WITH_YOUR_GROUP_INVITE";
// Optional: a 2-minute welcome video link (YouTube/Vimeo/Loom). Leave "" to hide.
const WELCOME_VIDEO_LINK = "";

function CheckIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#4f46e5" />
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

// ─── One-time confetti burst ────────────────────────────────────────────────
function Confetti() {
  const [pieces, setPieces] = useState<Array<{ id: number; left: number; delay: number; dur: number; color: string; size: number; rot: number; drift: number }> | null>(null);
  useEffect(() => {
    const colors = ["#4f46e5", "#6366f1", "#818cf8", "#a5b4fc", "#22c55e", "#f97316", "#3b82f6", "#8b5cf6"];
    const arr = Array.from({ length: 110 }, (_, i) => ({
      id: i, left: Math.random() * 100, delay: Math.random() * 0.6, dur: 2.6 + Math.random() * 1.8,
      color: colors[i % colors.length], size: 7 + Math.random() * 8, rot: Math.random() * 360, drift: (Math.random() - 0.5) * 220,
    }));
    setPieces(arr);
    const t = setTimeout(() => setPieces([]), 5200);
    return () => clearTimeout(t);
  }, []);
  if (!pieces || pieces.length === 0) return null;
  return (
    <div aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 60 }}>
      {pieces.map((p) => (
        <span key={p.id} style={{
          position: "absolute", top: "-20px", left: `${p.left}%`, width: p.size, height: p.size * 0.6,
          background: p.color, borderRadius: p.id % 3 === 0 ? "50%" : "2px", opacity: 0.95, transform: `rotate(${p.rot}deg)`,
          animation: `aiwty-confetti ${p.dur}s cubic-bezier(0.2,0.6,0.4,1) ${p.delay}s forwards`, ["--drift" as string]: `${p.drift}px`,
        } as React.CSSProperties} />
      ))}
    </div>
  );
}

export default function AiAtWorkThankYouPage() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "CompleteRegistration", { content_name: "AI at Work 14-Day Series" });
    }
  }, []);

  return (
    <div id="aiwty-top" style={{ background: "#f8fafc", minHeight: "100vh", color: "#0f172a" }}>
      <Confetti />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@600;700;800;900&display=swap');
        @keyframes aiwty-pop{0%{transform:scale(0.6);opacity:0}60%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
        @keyframes aiwty-confetti{0%{transform:translate(0,0) rotate(0deg);opacity:1}100%{transform:translate(var(--drift),105vh) rotate(720deg);opacity:0.9}}
        #aiwty-top{font-family:'Plus Jakarta Sans',-apple-system,sans-serif;-webkit-font-smoothing:antialiased}
        #aiwty-top h1,#aiwty-top h2{font-family:'Poppins','Plus Jakarta Sans',sans-serif;letter-spacing:-0.02em}
        #aiwty-top .wa-btn{background:linear-gradient(135deg,#1fa855,#25D366);box-shadow:0 14px 34px rgba(37,211,102,0.45)}
        #aiwty-top .wa-btn:hover{background:linear-gradient(135deg,#189048,#1fbf5c);box-shadow:0 18px 42px rgba(37,211,102,0.55)}
        #aiwty-top .grad{background:linear-gradient(135deg,#4f46e5,#7c3aed);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}
      `}</style>

      <div style={{ background: "linear-gradient(90deg,#4338ca,#6366f1,#4338ca)", padding: "11px 16px" }}>
        <p className="text-center font-black text-white" style={{ fontSize: 15, letterSpacing: "0.005em" }}>
          ✅ You&apos;re registered for the 14-Day AI at Work™ Series!
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12 lg:py-16 text-center">
        <div className="inline-flex mb-5" style={{ animation: "aiwty-pop 0.5s ease both" }}>
          <div className="rounded-full flex items-center justify-center" style={{ width: 84, height: 84, background: "#eef2ff", border: "2px solid #c7d2fe" }}>
            <CheckIcon size={48} />
          </div>
        </div>

        <p style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.14em", color: "#4f46e5", marginBottom: 10 }}>Registration confirmed</p>
        <h1 style={{ fontSize: "clamp(2.2rem,5.5vw,3.2rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 14 }}>
          You&apos;re In! 🎉<br />
          <span className="grad">Welcome to AI at Work™.</span>
        </h1>
        <p style={{ fontSize: 17.5, color: "#475569", lineHeight: 1.65, fontWeight: 500, maxWidth: 540, margin: "0 auto 30px" }}>
          Your seat is saved. Here are your next 3 steps 👇
        </p>

        {/* 3 next steps */}
        <div className="grid gap-3 text-left mb-8">
          {[
            { n: "1", icon: "👥", t: "Join the WhatsApp Community", d: "Your daily joining links, reminders, streak tracking and bonuses drop only inside the group." },
            { n: "2", icon: "🎬", t: "Watch the 2-Minute Welcome Video", d: "A quick primer on how the Learn → Do → Apply method works so you hit the ground running." },
            { n: "3", icon: "🗓️", t: "Add the LIVE Session To Your Calendar", d: "Block 15 minutes each day so your first AI-at-Work streak starts strong." },
          ].map(({ n, icon, t, d }) => (
            <div key={n} className="rounded-2xl p-5 flex items-start gap-4" style={{ background: "#fff", border: "1.5px solid #e2e8f0", boxShadow: "0 2px 10px rgba(15,23,42,0.04)" }}>
              <span className="inline-flex items-center justify-center rounded-full shrink-0" style={{ width: 40, height: 40, background: "linear-gradient(135deg,#4338ca,#6366f1)", color: "#fff", fontSize: 16, fontWeight: 900, fontFamily: "'Poppins',sans-serif" }}>{n}</span>
              <div>
                <p style={{ fontSize: 16.5, fontWeight: 800, color: "#0f172a", fontFamily: "'Poppins',sans-serif" }}>{icon} {t}</p>
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.55, marginTop: 4 }}>{d}</p>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp community CTA */}
        <div className="rounded-3xl p-6 lg:p-8" style={{ background: "linear-gradient(135deg,#0b3d2e,#0f5138)", border: "1px solid rgba(37,211,102,0.3)" }}>
          <p style={{ fontSize: 34 }}>🎁</p>
          <h2 style={{ fontSize: "clamp(1.4rem,3.5vw,1.9rem)", fontWeight: 900, color: "#fff", lineHeight: 1.2, marginTop: 6, marginBottom: 10 }}>
            Join the AI at Work™<br />WhatsApp Community
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, fontWeight: 500, maxWidth: 440, margin: "0 auto 22px" }}>
            This is where the whole series happens — <strong style={{ color: "#fff" }}>daily joining links, reminders, bonuses and your community.</strong>
          </p>
          <a href={WHATSAPP_GROUP_LINK} target="_blank" rel="noopener noreferrer"
            className="wa-btn inline-flex items-center justify-center gap-3 rounded-full font-black text-white w-full sm:w-auto"
            style={{ fontSize: 20, padding: "20px 44px", border: "none", cursor: "pointer" }}>
            <WhatsAppIcon size={26} />Join the WhatsApp Community
          </a>
          {WELCOME_VIDEO_LINK && (
            <p className="mt-4">
              <a href={WELCOME_VIDEO_LINK} target="_blank" rel="noopener noreferrer" className="underline" style={{ fontSize: 14, color: "rgba(255,255,255,0.85)" }}>
                ▶️ Watch the 2-minute welcome video
              </a>
            </p>
          )}
        </div>

        <p className="mt-8" style={{ fontSize: 15.5, fontWeight: 700, color: "#0f172a" }}>Your first AI at Work session is ready. ⚡</p>
        <p className="mt-2" style={{ fontSize: 13, color: "#94a3b8" }}>
          Have a question?{" "}
          <a href="https://wa.me/918956146485?text=Hi%2C+I+just+registered+for+the+AI+at+Work+series" className="underline" style={{ color: "#4f46e5" }}>Message us on WhatsApp</a>
        </p>
      </div>

      <footer className="px-5 py-6 text-center" style={{ background: "#0a0a0a" }}>
        <p style={{ fontSize: 12, color: "#52525b" }}>
          © {new Date().getFullYear()} High Performance Club ·{" "}
          <a href="https://www.highperformanceclub.co" className="underline" style={{ color: "#64748b" }}>highperformanceclub.co</a>
        </p>
      </footer>
    </div>
  );
}
