"use client";
import { useState, useEffect, useRef, createContext, useContext } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// AI Agents Masterclass — free 90-min LIVE session.
// Angle: "Build your own AI CLONE that works for you 24/7 — even while you sleep."
// Clone = AI agents that do your repetitive work. No coding required.
// ═════════════════════════════════════════════════════════════════════════════

const CLASS = {
  name: "AI Agents Masterclass",
  date: "Sunday, 23 August 2026",
  time: "11:00 AM IST",
  duration: "60–90 minutes · Live Online",
  price: "₹1,999",
};

const RegisterCtx = createContext<() => void>(() => {});
function useRegister() { return useContext(RegisterCtx); }

// ─── Icons ────────────────────────────────────────────────────────────────────
function BoltIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2z" fill="#fff" />
    </svg>
  );
}
function ArrowIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CheckIcon({ size = 20, color = "#6366f1" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill={color} />
      <path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CrossIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#fca5a5" />
      <path d="M8 8l8 8M16 8l-8 8" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.004 3C9.383 3 4 8.383 4 15c0 2.13.558 4.126 1.535 5.86L4 29l8.34-1.5A11.9 11.9 0 0016.004 27C22.62 27 28 21.617 28 15S22.62 3 16.004 3zm0 21.6c-1.94 0-3.74-.52-5.29-1.42l-.38-.22-4.95.89.9-4.83-.25-.4A9.55 9.55 0 016.4 15c0-5.29 4.31-9.6 9.604-9.6 5.29 0 9.596 4.31 9.596 9.6 0 5.29-4.306 9.6-9.596 9.6zm5.27-7.16c-.29-.145-1.71-.844-1.976-.94-.264-.097-.457-.145-.65.145-.193.29-.746.94-.915 1.134-.168.193-.337.217-.626.072-.29-.145-1.223-.451-2.33-1.438-.86-.767-1.44-1.714-1.61-2.004-.168-.29-.018-.446.127-.59.13-.13.29-.338.434-.507.145-.169.193-.29.29-.483.096-.193.048-.362-.024-.507-.072-.145-.65-1.566-.89-2.145-.235-.563-.473-.487-.65-.496l-.554-.01c-.193 0-.507.072-.772.362-.265.29-1.012.99-1.012 2.41 0 1.42 1.036 2.793 1.18 2.986.145.193 2.04 3.114 4.943 4.365.69.298 1.229.476 1.648.61.692.22 1.322.19 1.82.115.555-.083 1.71-.699 1.95-1.374.241-.676.241-1.255.169-1.375-.072-.121-.265-.193-.554-.338z" />
    </svg>
  );
}

// ─── Reveal-on-scroll ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(22px)", transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}>{children}</div>;
}

// ─── Primary CTA ────────────────────────────────────────────────────────────────
function CTA({ label = "Reserve My Free Seat", big = false, dark = false }: { label?: string; big?: boolean; dark?: boolean }) {
  const register = useRegister();
  return (
    <button
      onClick={register}
      className="btn-primary inline-flex items-center justify-center gap-3 rounded-full font-black text-white w-full sm:w-auto"
      style={{ fontSize: big ? 21 : 18, padding: big ? "20px 46px" : "16px 40px", border: "none", cursor: "pointer", lineHeight: 1.15, letterSpacing: "-0.01em" }}>
      <BoltIcon size={big ? 22 : 20} />
      <span>{label}</span>
      <ArrowIcon size={big ? 20 : 18} />
    </button>
  );
}

// ─── Register modal ─────────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "13px 16px", borderRadius: 12, border: "1.5px solid #e2e8f0",
  fontSize: 17, color: "#0f172a", outline: "none", background: "#f8fafc",
};

function RegisterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.includes("@") || whatsapp.replace(/\D/g, "").length < 8) {
      setError("Please enter your name, a valid email and WhatsApp number.");
      return;
    }
    setSubmitting(true);
    try {
      await fetch("/api/ai-agents-register", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), whatsapp: whatsapp.trim() }),
      });
      try { window.fbq?.("track", "Lead", { content_name: "ai-agents-masterclass" }); } catch {}
    } catch {}
    window.location.href = "/ai-agents-masterclass/thank-you";
  }

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(15,23,42,0.62)", backdropFilter: "blur(4px)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: 20, overflowY: "auto" }}>
      <div onClick={(e) => e.stopPropagation()} className="w-full" style={{ maxWidth: 430, background: "#fff", borderRadius: 22, marginTop: "8vh", boxShadow: "0 30px 80px rgba(15,23,42,0.35)", overflow: "hidden" }}>
        <div style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", padding: "22px 24px 20px", color: "#fff", position: "relative" }}>
          <button onClick={onClose} aria-label="Close" style={{ position: "absolute", top: 14, right: 16, background: "rgba(255,255,255,0.18)", border: "none", borderRadius: 999, width: 32, height: 32, color: "#fff", fontSize: 20, cursor: "pointer", lineHeight: 1 }}>×</button>
          <div style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.92 }}>Free · {CLASS.date}</div>
          <div style={{ fontSize: 22, fontWeight: 900, marginTop: 6, lineHeight: 1.15 }}>Reserve your free seat</div>
          <div style={{ fontSize: 13.5, opacity: 0.92, marginTop: 4 }}>{CLASS.time} · {CLASS.duration}</div>
        </div>
        <form onSubmit={submit} style={{ padding: "22px 24px 26px" }} className="flex flex-col gap-3.5">
          <input style={inputStyle} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
          <input style={inputStyle} type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input style={inputStyle} type="tel" placeholder="WhatsApp number (with country code)" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
          {error && <div style={{ color: "#dc2626", fontSize: 14, fontWeight: 600 }}>{error}</div>}
          <button type="submit" disabled={submitting} className="btn-primary rounded-full font-black text-white w-full inline-flex items-center justify-center gap-2" style={{ padding: 16, fontSize: 18, border: "none", cursor: submitting ? "wait" : "pointer", opacity: submitting ? 0.75 : 1 }}>
            <BoltIcon size={20} /> {submitting ? "Reserving…" : "Reserve My Free Seat"}
          </button>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 13, color: "#64748b" }}>
            <WhatsAppIcon size={16} /> The joining link is sent on WhatsApp. No spam.
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Sticky mobile CTA ──────────────────────────────────────────────────────────
function StickyCTA() {
  const register = useRegister();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="sm:hidden" style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 90, padding: "12px 16px calc(12px + env(safe-area-inset-bottom))", background: "rgba(255,255,255,0.94)", backdropFilter: "blur(10px)", borderTop: "1px solid #eef2f7", transform: show ? "translateY(0)" : "translateY(120%)", transition: "transform 0.28s cubic-bezier(0.16,1,0.3,1)" }}>
      <button onClick={register} className="btn-primary rounded-full font-black text-white w-full inline-flex items-center justify-center gap-2" style={{ padding: "15px", fontSize: 18, border: "none" }}>
        <BoltIcon size={20} /> Reserve My Free Seat
      </button>
    </div>
  );
}

// ─── Shared bits ────────────────────────────────────────────────────────────────
function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: light ? "#a5b4fc" : "#4f46e5" }}>{children}</div>;
}
const H2: React.CSSProperties = { fontSize: "clamp(26px,4.6vw,44px)", fontWeight: 900, letterSpacing: "-0.025em", lineHeight: 1.1 };

// ─── Page ───────────────────────────────────────────────────────────────────────
export default function AiAgentsMasterclassPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <RegisterCtx.Provider value={() => setModalOpen(true)}>
      <style>{`
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        .btn-primary { background: linear-gradient(135deg,#6366f1 0%,#4f46e5 100%); box-shadow: 0 12px 30px rgba(79,70,229,0.35); transition: transform 0.15s, box-shadow 0.15s; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(79,70,229,0.45); }
        .btn-primary:active { transform: translateY(0); }
        @keyframes agp-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        .clone-grad { background: linear-gradient(120deg,#a5b4fc,#818cf8); -webkit-background-clip: text; background-clip: text; color: transparent; }
        @media (max-width: 620px) { .host-grid { grid-template-columns: 1fr !important; text-align: center; } .host-grid > div:first-child { max-width: 220px; margin: 0 auto; } }
      `}</style>

      <main style={{ fontFamily: "'Inter',system-ui,-apple-system,'Segoe UI',sans-serif", color: "#0f172a", background: "#fff", overflowX: "hidden" }}>

        {/* ═══════════ SECTION 1 — HERO ═══════════ */}
        <section style={{ background: "radial-gradient(1100px 560px at 50% -10%, #1e1b4b 0%, #0f172a 58%, #020617 100%)", color: "#fff", padding: "clamp(52px,8vw,88px) 20px clamp(46px,6vw,70px)" }}>
          <div style={{ maxWidth: 840, margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,0.18)", border: "1px solid rgba(129,140,248,0.4)", borderRadius: 999, padding: "8px 16px", fontSize: 12.5, fontWeight: 800, letterSpacing: "0.06em", color: "#c7d2fe" }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: "#22c55e", animation: "agp-pulse 1.8s infinite" }} /> FREE LIVE AI AGENTS MASTERCLASS
            </div>
            <h1 style={{ fontSize: "clamp(38px,7.2vw,68px)", fontWeight: 900, lineHeight: 1.14, letterSpacing: "-0.035em", margin: "24px 0 0" }}>
              Stop Doing Everything Yourself.<br />
              <span style={{ fontSize: "clamp(26px,5vw,46px)", fontWeight: 900, display: "inline-block", marginTop: 18, lineHeight: 1.18 }}>Build AI Agents That <span className="clone-grad">Work For You 24/7 — Even While You Sleep.</span></span>
            </h1>
            <p style={{ fontSize: "clamp(18px,2.7vw,24px)", fontWeight: 700, color: "#e2e8f0", maxWidth: 680, margin: "28px auto 0", lineHeight: 1.65 }}>
              Learn to build your <b style={{ color: "#fff" }}>first AI Agent</b>, automate repetitive work and <b style={{ color: "#fff" }}>save hours of manual work every week.</b>
            </p>
            <p style={{ fontSize: "clamp(17px,2.6vw,22px)", fontWeight: 900, color: "#fff", marginTop: 26, letterSpacing: "-0.01em" }}>No Coding. No Technical Knowledge Required.</p>

            <div style={{ marginTop: 36 }}>
              <CTA big label="Reserve My Free Seat" />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px 22px", marginTop: 26, fontSize: 14.5, color: "#cbd5e1" }}>
              {["Beginner Friendly", "Practical Live Demo", "Build Your Own AI Agent"].map((t) => (
                <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><CheckIcon size={17} color="#22c55e" /> {t}</span>
              ))}
            </div>

            <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 18px", marginTop: 26, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 20px", fontSize: 14.5, fontWeight: 700 }}>
              <span>📅 {CLASS.date}</span><span>🕚 {CLASS.time}</span><span style={{ color: "#cbd5e1", fontWeight: 500 }}>💻 LIVE Online</span>
            </div>

            <div data-herowrap style={{ position: "relative", maxWidth: 720, margin: "38px auto 0" }}>
              <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 30px 70px -30px rgba(0,0,0,0.7)", lineHeight: 0 }}>
                <img src="/ai-agents/hero-clone.png" alt="On the left, a working professional; on the right, their AI Clone completing research, follow-ups, reports and content — working 24/7" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} onError={(e) => { const img = e.currentTarget as HTMLImageElement; if (!img.dataset.fallback) { img.dataset.fallback = "1"; img.src = "/aiatwork/hero-wide.jpg"; } else { const w = img.closest("[data-herowrap]") as HTMLElement | null; if (w) w.style.display = "none"; } }} />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 1B — WHO IS THIS WEBINAR FOR ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#fff" }}>
          <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
            <Reveal>
              <Eyebrow>Who is this webinar for?</Eyebrow>
              <h2 style={{ ...H2, marginTop: 12 }}>If You Use A Computer For Work,<br /><span style={{ color: "#4f46e5" }}>This Is For You.</span></h2>
            </Reveal>
            <Reveal delay={60}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 30 }}>
                {["👨‍💼 Business Owners", "💼 Working Professionals", "📈 Marketers", "🚀 Entrepreneurs", "🎓 Coaches & Consultants", "🧑‍💻 Freelancers"].map((t) => (
                  <span key={t} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 999, padding: "11px 20px", fontSize: 15, fontWeight: 600, color: "#0f172a", boxShadow: "0 2px 8px rgba(15,23,42,0.04)" }}>{t}</span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p style={{ fontSize: 16.5, color: "#64748b", marginTop: 34, fontWeight: 600 }}>Especially if you think:</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
                {["“I spend too much time doing repetitive work.”", "“I'd love to use AI beyond just ChatGPT.”", "“AI Agents sound useful, but I'm not technical.”"].map((q) => (
                  <div key={q} style={{ background: "#f8fafc", borderLeft: "4px solid #6366f1", borderRadius: 10, padding: "14px 18px", fontSize: 16, fontWeight: 700, color: "#0f172a", textAlign: "left", boxShadow: "0 2px 10px rgba(15,23,42,0.04)" }}>{q}</div>
                ))}
              </div>
              <p style={{ fontSize: 17, fontWeight: 700, marginTop: 26 }}>That&apos;s exactly what this masterclass is designed for.</p>
              <p style={{ fontSize: 15, fontWeight: 900, letterSpacing: "0.06em", color: "#4f46e5", marginTop: 8 }}>NO CODING REQUIRED.</p>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ SECTION 2 — THE PROBLEM ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#f8fafc" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <Reveal>
              <h2 style={H2}>Stop Doing The Same Work<br /><span style={{ color: "#4f46e5" }}>Again. And Again. And Again.</span></h2>
              <p style={{ fontSize: 18, color: "#475569", marginTop: 20, fontWeight: 600 }}>How much time do you spend every day on:</p>
            </Reveal>
            <Reveal delay={60}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 22 }}>
                {["Research", "Emails", "Follow-ups", "Reports", "Content", "Data entry", "Updating information", "Other repetitive tasks"].map((t) => (
                  <span key={t} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 999, padding: "10px 18px", fontSize: 15, fontWeight: 600, color: "#0f172a", boxShadow: "0 2px 8px rgba(15,23,42,0.04)" }}>{t}</span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div style={{ marginTop: 40, maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>
                <p style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.25 }}>What If You Could Give This Work To AI <span style={{ color: "#4f46e5" }}>Instead?</span></p>
                <p style={{ fontSize: 17, color: "#64748b", marginTop: 14, lineHeight: 1.7 }}>Not just ask AI questions. Not just generate content.</p>
                <p style={{ fontSize: "clamp(18px,2.8vw,23px)", fontWeight: 800, letterSpacing: "-0.01em", marginTop: 10, lineHeight: 1.3 }}>Give AI a task — and let it <span style={{ color: "#4f46e5" }}>do the work for you.</span></p>
                <p style={{ fontSize: 15.5, color: "#94a3b8", marginTop: 18, fontWeight: 700 }}>And you don&apos;t need coding to build it.</p>
              </div>
              <div style={{ marginTop: 28 }}><CTA label="Show Me How" /></div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ SECTION 3 — CHATGPT → AI AGENTS ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#fff" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <h2 style={H2}>Until Now, You&apos;ve Been <span style={{ color: "#4f46e5" }}>Talking To AI.</span><br />Now It&apos;s Time To Put AI <span style={{ color: "#4f46e5" }}>To Work.</span></h2>
              </div>
            </Reveal>
            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", marginTop: 40 }}>
              <Reveal>
                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 18, padding: "26px 24px", height: "100%" }}>
                  <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", color: "#94a3b8" }}>CHATGPT</div>
                  <div style={{ marginTop: 16, fontSize: 17, color: "#475569", lineHeight: 2 }}>You ask.<br />AI answers.<br /><b style={{ color: "#0f172a" }}>You do the work.</b></div>
                </div>
              </Reveal>
              <Reveal delay={90}>
                <div style={{ background: "linear-gradient(160deg,#4f46e5,#4338ca)", borderRadius: 18, padding: "26px 24px", height: "100%", color: "#fff", boxShadow: "0 18px 40px -18px rgba(79,70,229,0.6)" }}>
                  <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", color: "#c7d2fe" }}>AI AGENTS</div>
                  <div style={{ marginTop: 16, fontSize: 17, lineHeight: 2, color: "#e0e7ff" }}>You give it a task.<br />AI performs the steps.<br /><b style={{ color: "#fff" }}>AI does the work for you.</b></div>
                </div>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <div style={{ textAlign: "center", marginTop: 44, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
                <p style={{ fontSize: "clamp(19px,2.9vw,25px)", fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1.3 }}>And Yes — You Can Build This <span style={{ color: "#4f46e5" }}>Without Coding.</span></p>
                <p style={{ fontSize: 16, color: "#64748b", marginTop: 10, fontWeight: 600 }}>No programming. No technical background required.</p>
                <div style={{ marginTop: 26 }}><CTA label="Reserve My Free Seat" /></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ SECTION 4 — WORKS FOR YOU 24/7 ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#0f172a", color: "#fff" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <h2 style={{ ...H2 }}>What If Your Work Continued...<br /><span className="clone-grad">Even When You Stopped?</span></h2>
              </div>
            </Reveal>
            <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { time: "9:00 AM", you: "Working", agent: "Working", still: false },
                { time: "3:00 PM", you: "In a meeting", agent: "Working", still: false },
                { time: "8:00 PM", you: "Spending time with family", agent: "Working", still: false },
                { time: "2:00 AM", you: "Sleeping 😴", agent: "Still Working", still: true },
              ].map((r, i) => (
                <Reveal key={r.time} delay={i * 80}>
                  <div style={{ display: "grid", gridTemplateColumns: "84px 1fr 1fr", gap: 12, alignItems: "center", background: r.still ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.04)", border: `1px solid ${r.still ? "rgba(129,140,248,0.5)" : "rgba(255,255,255,0.08)"}`, borderRadius: 14, padding: "16px 18px" }}>
                    <div style={{ fontWeight: 900, fontSize: 15, color: r.still ? "#c7d2fe" : "#e2e8f0", fontVariantNumeric: "tabular-nums" }}>{r.time}</div>
                    <div style={{ fontSize: 14.5, color: "#cbd5e1" }}><span style={{ opacity: 0.7 }}>👤 YOU:</span> {r.you}</div>
                    <div style={{ fontSize: 14.5, fontWeight: r.still ? 900 : 600, color: r.still ? "#a5b4fc" : "#e2e8f0" }}><span style={{ opacity: 0.7, fontWeight: 400 }}>🤖 AI:</span> {r.agent}</div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={100}>
              <div style={{ textAlign: "center", marginTop: 44 }}>
                <p style={{ fontSize: "clamp(23px,3.8vw,34px)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.18 }}>Your Workday Ends.<br /><span className="clone-grad">Your AI Agents Don&apos;t Have To.</span></p>
                <p style={{ fontSize: 16.5, color: "#94a3b8", marginTop: 14, maxWidth: 480, marginLeft: "auto", marginRight: "auto", lineHeight: 1.55 }}>Set them up to handle repetitive work for you throughout the day — and even while you sleep.</p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 20, background: "rgba(34,197,94,0.14)", border: "1px solid rgba(34,197,94,0.4)", borderRadius: 999, padding: "8px 16px", fontSize: 12.5, fontWeight: 800, letterSpacing: "0.06em", color: "#86efac" }}>NO CODING REQUIRED</div>
                <div style={{ marginTop: 26 }}><CTA label="I Want To Learn This" /></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ SECTION 5 — AI WORKFORCE ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#fff" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <Eyebrow>What can AI do for you?</Eyebrow>
                <h2 style={{ ...H2, marginTop: 12 }}>Imagine Having Your Own <span style={{ color: "#4f46e5" }}>AI Workforce</span></h2>
                <p style={{ fontSize: 16.5, color: "#64748b", marginTop: 12 }}>AI Agents that can help you with:</p>
                <div style={{ maxWidth: 620, margin: "28px auto 0", borderRadius: 18, overflow: "hidden", border: "1px solid #eef2f7", boxShadow: "0 14px 40px -22px rgba(15,23,42,0.35)", lineHeight: 0 }}>
                  <img src="/aiatwork/method-live.jpg" alt="A professional at a laptop with an AI assistant doing real work tasks alongside them" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = "none"; }} />
                </div>
              </div>
            </Reveal>
            <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", marginTop: 36 }}>
              {[
                { icon: "🔍", t: "Research", d: "Research topics, competitors, products or information for you." },
                { icon: "📧", t: "Emails", d: "Draft, organize and handle repetitive email tasks." },
                { icon: "🔄", t: "Follow-Ups", d: "Follow up with leads, customers or your team automatically." },
                { icon: "📊", t: "Reports", d: "Collect data and prepare recurring reports for you." },
                { icon: "✍️", t: "Content", d: "Create drafts and recurring content in your style." },
                { icon: "📋", t: "Data", d: "Organize, clean and process your information." },
                { icon: "⚙️", t: "Repetitive Tasks", d: "Handle the work you currently do manually, again and again." },
              ].map((c, i) => (
                <Reveal key={c.t} delay={(i % 3) * 70}>
                  <div style={{ background: "#f8fafc", border: "1px solid #eef2f7", borderRadius: 16, padding: "22px 20px", height: "100%" }}>
                    <div style={{ fontSize: 28 }}>{c.icon}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, marginTop: 10, letterSpacing: "-0.01em" }}>{c.t}</div>
                    <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.5, marginTop: 6 }}>{c.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={100}>
              <div style={{ textAlign: "center", marginTop: 48, borderTop: "1px solid #eef2f7", paddingTop: 40 }}>
                <p style={{ fontSize: "clamp(26px,5vw,44px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.08 }}>YOU TELL AI WHAT TO DO.<br /><span style={{ color: "#4f46e5" }}>AI DOES THE WORK.</span></p>
                <p style={{ fontSize: 16, color: "#94a3b8", marginTop: 14, fontWeight: 700 }}>And you can build it without coding.</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ SECTION 5B — REAL AGENTS BY USE CASE ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#f8fafc" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <Eyebrow>Real agents you can build</Eyebrow>
                <h2 style={{ ...H2, marginTop: 12 }}>The Kind Of AI Agents <span style={{ color: "#4f46e5" }}>You&apos;ll Be Able To Build</span></h2>
                <p style={{ fontSize: 16.5, color: "#64748b", marginTop: 12, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>Practical examples of AI Agents and automations for everyday work — pick the ones that save you the most time.</p>
              </div>
            </Reveal>
            <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", marginTop: 40 }}>
              {[
                { icon: "✍️", name: "Content Creation Agent", tasks: ["Turn one idea into a week of posts", "Write emails, captions & scripts in your style", "Repurpose long content into short posts"] },
                { icon: "🔍", name: "Research Agent", tasks: ["Research a topic and summarise the key points", "Compare products, tools or competitors", "Pull the information you need into one place"] },
                { icon: "🔄", name: "Follow-Up Agent", tasks: ["Follow up with leads that didn't reply", "Nudge customers and your team automatically", "Never let a warm lead go cold again"] },
                { icon: "💬", name: "Lead-Reply Agent", tasks: ["Reply to new enquiries in seconds, 24/7", "Answer common questions like you would", "Qualify leads and book the call for you"] },
                { icon: "📊", name: "Reporting Agent", tasks: ["Collect data from your tools", "Build the same report every week", "Send you a clean summary on schedule"] },
                { icon: "🗂️", name: "Admin & Data Agent", tasks: ["Organise, clean and update information", "Handle repetitive data entry", "Keep your sheets and records tidy"] },
              ].map((a, i) => (
                <Reveal key={a.name} delay={(i % 3) * 80}>
                  <div style={{ background: "#fff", border: "1px solid #eef2f7", borderRadius: 18, padding: "24px 22px", height: "100%", boxShadow: "0 6px 22px rgba(15,23,42,0.05)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 46, height: 46, borderRadius: 12, background: "linear-gradient(135deg,#6366f1,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{a.icon}</div>
                      <div style={{ fontSize: 18.5, fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1.2 }}>{a.name}</div>
                    </div>
                    <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 9 }}>
                      {a.tasks.map((t) => (
                        <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 14.5, color: "#475569", lineHeight: 1.45 }}>
                          <span style={{ flexShrink: 0, marginTop: 2 }}><CheckIcon size={17} color="#22c55e" /></span>{t}
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={100}>
              <div style={{ textAlign: "center", marginTop: 36 }}>
                <p style={{ fontSize: 16, color: "#64748b", fontWeight: 600 }}>…and once you know how, you can build an agent for almost any repetitive task.</p>
                <div style={{ marginTop: 22 }}><CTA label="Reserve My Free Seat" /></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ SECTION 6 — "BUT I'M NOT TECHNICAL" ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#fff" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <Reveal>
              <h2 style={H2}>AI Agents Sound Technical.<br /><span style={{ color: "#4f46e5" }}>Building Them Doesn&apos;t Have To Be.</span></h2>
              <div style={{ maxWidth: 460, margin: "26px auto 0", borderRadius: 18, overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 14px 40px -22px rgba(15,23,42,0.35)", lineHeight: 0 }}>
                <img src="/aiatwork/no-code.jpg" alt="An everyday, non-technical person at a simple desk with a laptop, coffee and a notebook building AI agents" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = "none"; }} />
              </div>
              <p style={{ fontSize: 17, color: "#475569", marginTop: 24, fontWeight: 600 }}>You don&apos;t need to be a:</p>
            </Reveal>
            <Reveal delay={60}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 20 }}>
                {["Programmer", "Developer", "AI Expert", "Automation Expert"].map((t) => (
                  <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #fecaca", borderRadius: 999, padding: "9px 16px", fontSize: 14.5, fontWeight: 600, color: "#0f172a" }}><CrossIcon size={18} /> {t}</span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div style={{ marginTop: 38 }}>
                <p style={{ fontSize: 17, color: "#64748b" }}>If you can use ChatGPT,</p>
                <p style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 900, letterSpacing: "-0.025em", marginTop: 6, lineHeight: 1.1 }}>You Can Learn To <span style={{ color: "#4f46e5" }}>Build AI Agents.</span></p>
                <p style={{ fontSize: 16, color: "#475569", marginTop: 14 }}>I&apos;ll show you exactly how, step-by-step.</p>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 18px", marginTop: 18, fontSize: 13.5, fontWeight: 900, letterSpacing: "0.05em", color: "#4f46e5" }}>
                  <span>NO CODING</span><span style={{ color: "#c7d2fe" }}>•</span><span>BEGINNER FRIENDLY</span><span style={{ color: "#c7d2fe" }}>•</span><span>PRACTICAL</span>
                </div>
                <div style={{ marginTop: 26 }}><CTA label="Reserve My Free Seat" /></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ SECTION 7 — WHAT YOU'LL LEARN IN 90 MINUTES ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#f8fafc" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <Eyebrow>Your 90-minute agenda</Eyebrow>
                <h2 style={{ ...H2, textAlign: "center", marginTop: 12 }}>What You&apos;ll Learn In <span style={{ color: "#4f46e5" }}>90 Minutes</span></h2>
              </div>
            </Reveal>
            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", marginTop: 40 }}>
              {[
                { n: "01", t: "AI Agents Made Simple", d: "Understand what AI Agents are and why they're different from ChatGPT." },
                { n: "02", t: "Find What You Can Give To AI", d: "Identify the repetitive work you can stop doing manually." },
                { n: "03", t: "Build Your First AI Agent", d: "See how an AI Agent is created from scratch — without coding." },
                { n: "04", t: "Make AI Do The Work", d: "Learn how AI can perform multiple steps instead of waiting for your next prompt." },
                { n: "05", t: "Make AI Work 24/7", d: "See how Agents can keep handling tasks even when you're not working." },
                { n: "06", t: "Build Your Own AI Workforce", d: "Discover how different Agents can handle different types of work for you." },
              ].map((c, i) => (
                <Reveal key={c.n} delay={(i % 3) * 70}>
                  <div style={{ background: "#fff", border: "1px solid #eef2f7", borderRadius: 16, padding: "24px 22px", height: "100%", boxShadow: "0 4px 18px rgba(15,23,42,0.05)" }}>
                    <div style={{ fontSize: 15, fontWeight: 900, color: "#818cf8", fontFamily: "monospace", letterSpacing: "0.05em" }}>{c.n}</div>
                    <div style={{ fontSize: 19, fontWeight: 800, marginTop: 8, letterSpacing: "-0.01em", lineHeight: 1.25 }}>{c.t}</div>
                    <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.55, marginTop: 8 }}>{c.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 8 — SEE IT LIVE ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "radial-gradient(900px 480px at 50% -10%, #1e1b4b 0%, #0f172a 60%, #020617 100%)", color: "#fff" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <Reveal>
              <h2 style={H2}>Watch Me Build A <span className="clone-grad">Working AI Agent LIVE</span><br />From Scratch. Without Writing A Single Line Of Code.</h2>
              <p style={{ fontSize: 16.5, color: "#cbd5e1", marginTop: 18, lineHeight: 1.6 }}>You&apos;ll see exactly how an AI Agent goes from receiving a task to actually doing the work.</p>
              <div style={{ maxWidth: 620, margin: "30px auto 0", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 30px 70px -30px rgba(0,0,0,0.7)", lineHeight: 0 }}>
                <img src="/aiatwork/live-session.jpg" alt="A live online session showing an AI agent being built on screen, step by step" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = "none"; }} />
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginTop: 34 }}>
                {[
                  { t: "GIVE AI A TASK", done: false },
                  { t: "AI STARTS WORKING", done: false },
                  { t: "AI COMPLETES THE STEPS", done: false },
                  { t: "TASK GETS DONE ✓", done: true },
                ].map((s, i, arr) => (
                  <div key={s.t} style={{ width: "100%", maxWidth: 360 }}>
                    <div style={{ background: s.done ? "linear-gradient(135deg,#16a34a,#22c55e)" : "rgba(255,255,255,0.06)", border: `1px solid ${s.done ? "transparent" : "rgba(255,255,255,0.12)"}`, borderRadius: 12, padding: "14px 18px", fontWeight: 800, fontSize: 15.5, letterSpacing: "0.02em" }}>{s.t}</div>
                    {i < arr.length - 1 && <div style={{ color: "#818cf8", fontSize: 20, lineHeight: 1, margin: "2px 0" }}>↓</div>}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div style={{ marginTop: 40 }}>
                <p style={{ fontSize: "clamp(20px,3.2vw,28px)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.2 }}>No Coding. No Technical Background.<br />Just AI Working For You.</p>
                <div style={{ marginTop: 26 }}><CTA label="Save My Free Seat" /></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ SECTION 10 — TRUST / INSTRUCTOR ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#fff" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <Eyebrow>Meet your AI coach</Eyebrow>
                <h2 style={{ ...H2, marginTop: 12 }}>The Person Teaching You This</h2>
              </div>
            </Reveal>
            <Reveal delay={70}>
              <div style={{ display: "grid", gridTemplateColumns: "minmax(0,220px) 1fr", gap: 28, alignItems: "center", marginTop: 36, background: "#f8fafc", border: "1px solid #eef2f7", borderRadius: 24, padding: "clamp(20px,4vw,32px)" }} className="host-grid">
                <div style={{ borderRadius: 18, overflow: "hidden", border: "1px solid #e2e8f0", lineHeight: 0, boxShadow: "0 14px 40px -22px rgba(15,23,42,0.35)" }}>
                  <img src="/rohan.png" alt="Rohan Mote — AI Growth Coach, High Performance Club" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = "none"; }} />
                </div>
                <div>
                  <div style={{ fontSize: "clamp(22px,3.4vw,28px)", fontWeight: 900, letterSpacing: "-0.02em" }}>Rohan Mote</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#4f46e5", marginTop: 2 }}>AI Growth Coach · High Performance Club</div>
                  <p style={{ fontSize: 15.5, color: "#475569", lineHeight: 1.65, marginTop: 14 }}>
                    I build AI Agents and automations every day to run real businesses — lead systems, content, follow-ups and more. In this masterclass I&apos;ll show you exactly how it&apos;s done, in plain language, so you can start building your own AI Agents from day one — even if you&apos;ve never written a line of code.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginTop: 20, textAlign: "center" }}>
                {[
                  { big: "10,000+", small: "People trained on practical AI" },
                  { big: "50+", small: "AI workshops & sessions run" },
                  { big: "Daily", small: "Building real AI agents in business" },
                ].map((s) => (
                  <div key={s.big} style={{ background: "#f8fafc", border: "1px solid #eef2f7", borderRadius: 16, padding: "20px 12px" }}>
                    <div style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 900, color: "#4f46e5", letterSpacing: "-0.02em" }}>{s.big}</div>
                    <div style={{ fontSize: 13, color: "#64748b", marginTop: 6, lineHeight: 1.4 }}>{s.small}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", marginTop: 12 }}>Figures reflect High Performance Club&apos;s AI training to date.</p>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ SECTION 11 — FINAL REGISTRATION ═══════════ */}
        <section style={{ padding: "clamp(56px,9vw,100px) 20px", background: "radial-gradient(900px 480px at 50% 0%, #1e1b4b 0%, #0f172a 62%, #020617 100%)", color: "#fff", textAlign: "center" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <Reveal>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,0.18)", border: "1px solid rgba(129,140,248,0.4)", borderRadius: 999, padding: "8px 16px", fontSize: 12.5, fontWeight: 800, letterSpacing: "0.06em", color: "#c7d2fe" }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: "#22c55e", animation: "agp-pulse 1.8s infinite" }} /> FREE LIVE AI AGENTS MASTERCLASS
              </div>
              <h2 style={{ ...H2, marginTop: 20 }}>Stop Doing Everything Yourself.<br /><span className="clone-grad">Build AI Agents That Work For You 24/7.</span></h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 18, fontSize: "clamp(16px,2.3vw,19px)", color: "#cbd5e1", fontWeight: 600 }}>
                <span>Do your repetitive work.</span>
                <span>Save hours every week.</span>
                <span>Keep working even while you&apos;re sleeping.</span>
              </div>
              <p style={{ fontSize: "clamp(18px,2.8vw,24px)", fontWeight: 900, color: "#fff", marginTop: 16, letterSpacing: "-0.01em" }}>And Build It All Without Coding.</p>
            </Reveal>
            <Reveal delay={80}>
              <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 20px", marginTop: 26, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 22px", fontSize: 15.5, fontWeight: 700 }}>
                <span>📅 {CLASS.date}</span><span>⏰ {CLASS.time}</span><span style={{ color: "#cbd5e1", fontWeight: 500 }}>💻 LIVE Online</span>
              </div>
              <div style={{ marginTop: 28 }}><CTA big label="Reserve My Free Seat" /></div>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 20px", marginTop: 22, fontSize: 14.5, color: "#cbd5e1" }}>
                {["100% Beginner Friendly", "No Coding Required", "Practical Live Demonstration"].map((t) => (
                  <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><CheckIcon size={17} color="#22c55e" /> {t}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ FINAL STRIP ═══════════ */}
        <section style={{ padding: "clamp(40px,6vw,64px) 20px", background: "#4f46e5", color: "#fff", textAlign: "center" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <p style={{ fontSize: "clamp(22px,4vw,34px)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              LESS REPETITIVE WORK.<br />MORE TIME FOR YOU.<br /><span style={{ color: "#c7d2fe" }}>NO CODING REQUIRED.</span>
            </p>
          </div>
        </section>

        <div style={{ textAlign: "center", padding: "22px 20px", background: "#0a0a0a", color: "#52525b", fontSize: 12.5 }}>
          © {new Date().getFullYear()} High Performance Club · {CLASS.name}
        </div>

        <div style={{ height: 76 }} className="sm:hidden" />
      </main>

      <StickyCTA />
      <RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </RegisterCtx.Provider>
  );
}
