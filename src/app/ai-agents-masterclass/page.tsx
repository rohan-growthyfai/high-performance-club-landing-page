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
      `}</style>

      <main style={{ fontFamily: "'Inter',system-ui,-apple-system,'Segoe UI',sans-serif", color: "#0f172a", background: "#fff", overflowX: "hidden" }}>

        {/* ═══════════ SECTION 1 — HERO ═══════════ */}
        <section style={{ background: "radial-gradient(1100px 560px at 50% -10%, #1e1b4b 0%, #0f172a 58%, #020617 100%)", color: "#fff", padding: "clamp(52px,8vw,88px) 20px clamp(46px,6vw,70px)" }}>
          <div style={{ maxWidth: 840, margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,0.18)", border: "1px solid rgba(129,140,248,0.4)", borderRadius: 999, padding: "8px 16px", fontSize: 12.5, fontWeight: 800, letterSpacing: "0.06em", color: "#c7d2fe" }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: "#22c55e", animation: "agp-pulse 1.8s infinite" }} /> FREE LIVE AI AGENTS MASTERCLASS
            </div>
            <h1 style={{ fontSize: "clamp(34px,7vw,62px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.035em", margin: "20px 0 0" }}>
              Build Your Own <span className="clone-grad">AI Clone</span><br />
              <span style={{ fontSize: "clamp(24px,4.6vw,40px)", display: "inline-block", marginTop: 8 }}>That Works For You 24/7 — Even While You Sleep</span>
            </h1>
            <p style={{ fontSize: "clamp(16px,2.3vw,20px)", color: "#cbd5e1", maxWidth: 640, margin: "22px auto 0", lineHeight: 1.55 }}>
              Learn how to build <b style={{ color: "#fff" }}>AI Agents</b> that can <b style={{ color: "#fff" }}>do your repetitive work for you</b> and save you hours every week.
            </p>
            <p style={{ fontSize: "clamp(17px,2.6vw,21px)", fontWeight: 900, color: "#fff", marginTop: 20, letterSpacing: "-0.01em" }}>NO CODING REQUIRED.</p>
            <p style={{ fontSize: 15.5, color: "#94a3b8", maxWidth: 560, margin: "8px auto 0", lineHeight: 1.55 }}>
              Even if you have <b style={{ color: "#cbd5e1" }}>zero technical knowledge</b>, you&apos;ll learn how to build your own AI Agents using simple AI tools.
            </p>

            <div style={{ marginTop: 30 }}>
              <CTA big label="Reserve My Free Seat" />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px 22px", marginTop: 26, fontSize: 14.5, color: "#cbd5e1" }}>
              {["No Coding Required", "Beginner Friendly", "Build Practical AI Agents", "FREE Live Masterclass"].map((t) => (
                <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><CheckIcon size={17} color="#22c55e" /> {t}</span>
              ))}
            </div>

            <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 18px", marginTop: 26, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 20px", fontSize: 14.5, fontWeight: 700 }}>
              <span>📅 {CLASS.date}</span><span>🕚 {CLASS.time}</span><span style={{ color: "#cbd5e1", fontWeight: 500 }}>💻 LIVE Online</span>
            </div>
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
                <p style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1.3 }}>What if AI could do more of this work <span style={{ color: "#4f46e5" }}>for you?</span></p>
                <p style={{ fontSize: 17, color: "#64748b", marginTop: 14, lineHeight: 1.6 }}>Not just answer your questions. Not just write something when you ask. But actually help <b style={{ color: "#0f172a" }}>do the work.</b></p>
                <p style={{ fontSize: 15, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4f46e5", marginTop: 22 }}>And the best part?</p>
                <p style={{ fontSize: "clamp(21px,3.4vw,30px)", fontWeight: 900, letterSpacing: "-0.02em", marginTop: 6, lineHeight: 1.2 }}>You Don&apos;t Need To Know Coding To Build It.</p>
              </div>
              <div style={{ marginTop: 30 }}><CTA label="Show Me How" /></div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ SECTION 3 — CHATGPT → AI AGENTS ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#fff" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <h2 style={H2}>You&apos;ve Used AI To Get Answers.<br /><span style={{ color: "#4f46e5" }}>Now Use AI To Get Work Done.</span></h2>
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
              <div style={{ textAlign: "center", marginTop: 44, maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>
                <p style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 800, letterSpacing: "-0.01em" }}>And You DON&apos;T Need To Be A Developer.</p>
                <p style={{ fontSize: 16.5, color: "#64748b", marginTop: 12, lineHeight: 1.7 }}>You don&apos;t need to learn programming. You don&apos;t need to understand complicated code. You don&apos;t need a technical background.</p>
                <p style={{ fontSize: "clamp(18px,2.8vw,24px)", fontWeight: 900, color: "#4f46e5", marginTop: 18, letterSpacing: "-0.01em" }}>NO CODE. NO TECH BACKGROUND.</p>
                <p style={{ fontSize: 15.5, color: "#94a3b8", marginTop: 8 }}>Just practical AI tools that you&apos;ll learn step-by-step.</p>
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
              <div style={{ textAlign: "center", marginTop: 40 }}>
                <p style={{ fontSize: "clamp(22px,3.6vw,32px)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.2 }}>Your AI Agents Can Work For You <span className="clone-grad">24/7.</span></p>
                <p style={{ fontSize: 16.5, color: "#94a3b8", marginTop: 12, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>Handling repetitive tasks while you focus on other things. And you can build them without writing code.</p>
                <div style={{ marginTop: 28 }}><CTA label="I Want To Learn This" /></div>
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
              </div>
            </Reveal>
            <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", marginTop: 36 }}>
              {[
                { icon: "🔍", t: "Research", d: "Find and organize information for you." },
                { icon: "📧", t: "Emails", d: "Prepare emails and repetitive replies." },
                { icon: "🔄", t: "Follow-Ups", d: "Handle repetitive follow-up tasks." },
                { icon: "📊", t: "Reports", d: "Collect information and prepare reports." },
                { icon: "✍️", t: "Content", d: "Create drafts and recurring content." },
                { icon: "📋", t: "Data", d: "Organize and process information." },
                { icon: "⚙️", t: "Repetitive Tasks", d: "Handle work you currently do manually again and again." },
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
              <div style={{ textAlign: "center", marginTop: 40 }}>
                <p style={{ fontSize: "clamp(21px,3.4vw,30px)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.2 }}>You Tell AI What To Do. <span style={{ color: "#4f46e5" }}>AI Does The Work.</span></p>
                <p style={{ fontSize: 15.5, color: "#94a3b8", marginTop: 10, fontWeight: 700 }}>No coding required.</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ SECTION 6 — "BUT I'M NOT TECHNICAL" ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#f8fafc" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <Reveal>
              <h2 style={H2}>Think AI Agents Sound Too Technical?</h2>
              <p style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 900, color: "#4f46e5", marginTop: 8 }}>They&apos;re Not.</p>
              <p style={{ fontSize: 17, color: "#475569", marginTop: 18, fontWeight: 600 }}>You DON&apos;T need to be:</p>
            </Reveal>
            <Reveal delay={60}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 20 }}>
                {["A Programmer", "A Developer", "An AI Expert", "An Automation Expert", "A Tech Person"].map((t) => (
                  <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #fecaca", borderRadius: 999, padding: "9px 16px", fontSize: 14.5, fontWeight: 600, color: "#0f172a" }}><CrossIcon size={18} /> {t}</span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div style={{ marginTop: 36 }}>
                <p style={{ fontSize: 17, color: "#64748b" }}>If you can use ChatGPT...</p>
                <p style={{ fontSize: "clamp(22px,3.6vw,32px)", fontWeight: 900, letterSpacing: "-0.02em", marginTop: 6 }}>You Can Learn To Build AI Agents.</p>
                <p style={{ fontSize: 16, color: "#475569", marginTop: 14, lineHeight: 1.6, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>I&apos;ll show you the process <b>step-by-step</b>, using simple tools that don&apos;t require you to write code.</p>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 20px", marginTop: 18, fontSize: 14, fontWeight: 900, letterSpacing: "0.04em", color: "#4f46e5" }}>
                  <span>ZERO CODING.</span><span>BEGINNER FRIENDLY.</span><span>PRACTICAL.</span>
                </div>
                <div style={{ marginTop: 26 }}><CTA label="Reserve My Free Seat" /></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ SECTION 7 — WHAT YOU'LL LEARN ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#fff" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ ...H2, textAlign: "center" }}>What You&apos;ll Learn Inside The Masterclass</h2>
            </Reveal>
            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", marginTop: 40 }}>
              {[
                { n: "01", t: "What AI Agents Actually Are", d: "Understand how they're different from simply using ChatGPT." },
                { n: "02", t: "What Work You Can Give To AI", d: "Find repetitive tasks you currently do manually that AI can help handle." },
                { n: "03", t: "How To Build Your Own AI Agent", d: "See how to create an AI Agent from scratch." },
                { n: "04", t: "How To Make AI Do The Work", d: "Learn how Agents can perform multiple steps to complete a task for you." },
                { n: "05", t: "How To Make AI Work 24/7", d: "Learn how AI Agents can keep performing defined tasks even when you're not working." },
                { n: "06", t: "How To Do It WITHOUT CODING", d: "See how today's AI tools make it possible to build useful AI Agents without becoming a programmer." },
              ].map((c, i) => (
                <Reveal key={c.n} delay={(i % 3) * 70}>
                  <div style={{ background: "#f8fafc", border: "1px solid #eef2f7", borderRadius: 16, padding: "24px 22px", height: "100%" }}>
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
              <h2 style={H2}>Watch Me Build An AI Agent<br /><span className="clone-grad">LIVE — Without Writing Code</span></h2>
              <p style={{ fontSize: 16.5, color: "#cbd5e1", marginTop: 18, lineHeight: 1.6 }}>Not theory. Not complicated programming. You&apos;ll actually see how an AI Agent can be built and used to do real work.</p>
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

        {/* ═══════════ SECTION 9 — WHO IS THIS FOR ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#f8fafc" }}>
          <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
            <Reveal>
              <h2 style={H2}>If You Use A Computer For Work,<br /><span style={{ color: "#4f46e5" }}>This Is For You.</span></h2>
            </Reveal>
            <Reveal delay={60}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 30 }}>
                {["👨‍💼 Business Owners", "💼 Working Professionals", "📈 Marketers", "🚀 Entrepreneurs", "🎓 Coaches & Consultants", "🧑‍💻 Freelancers"].map((t) => (
                  <span key={t} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 999, padding: "11px 20px", fontSize: 15, fontWeight: 600, color: "#0f172a", boxShadow: "0 2px 8px rgba(15,23,42,0.04)" }}>{t}</span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p style={{ fontSize: 16.5, color: "#64748b", marginTop: 34, fontWeight: 600 }}>Especially if you think:</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
                {["“I spend too much time doing repetitive work.”", "“I'd love to use AI beyond just ChatGPT.”", "“AI Agents sound useful, but I'm not technical.”"].map((q) => (
                  <div key={q} style={{ background: "#fff", borderLeft: "4px solid #6366f1", borderRadius: 10, padding: "14px 18px", fontSize: 16, fontWeight: 700, color: "#0f172a", textAlign: "left", boxShadow: "0 2px 10px rgba(15,23,42,0.04)" }}>{q}</div>
                ))}
              </div>
              <p style={{ fontSize: 17, fontWeight: 700, marginTop: 26 }}>That&apos;s exactly what this masterclass is designed for.</p>
              <p style={{ fontSize: 15, fontWeight: 900, letterSpacing: "0.06em", color: "#4f46e5", marginTop: 8 }}>NO CODING REQUIRED.</p>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ SECTION 10 — THE SIMPLE PROMISE ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#fff" }}>
          <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
            <Reveal>
              <h2 style={H2}>You Don&apos;t Need To Work More.</h2>
              <p style={{ fontSize: "clamp(20px,3.2vw,28px)", fontWeight: 800, color: "#4f46e5", marginTop: 8, letterSpacing: "-0.01em" }}>Let AI Do More Of The Work.</p>
            </Reveal>
            <Reveal delay={80}>
              <div style={{ display: "inline-flex", flexDirection: "column", gap: 12, marginTop: 30, textAlign: "left" }}>
                {["Do repetitive work for you", "Save you hours of manual work", "Work for you 24/7", "Keep working even when you're sleeping"].map((t) => (
                  <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 12, fontSize: 16.5, fontWeight: 600, color: "#0f172a" }}><CheckIcon size={22} color="#22c55e" /> {t}</span>
                ))}
              </div>
              <p style={{ fontSize: 15.5, color: "#94a3b8", marginTop: 26, fontWeight: 700 }}>And you can build them without coding.</p>
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
              <h2 style={{ ...H2, marginTop: 20 }}>Build Your Own <span className="clone-grad">AI Clone</span></h2>
              <p style={{ fontSize: "clamp(17px,2.6vw,21px)", color: "#cbd5e1", marginTop: 12, fontWeight: 600, lineHeight: 1.4 }}>That Does Your Repetitive Work &amp; Works For You <b style={{ color: "#fff" }}>24/7 — Even While You Sleep</b></p>
              <p style={{ fontSize: 15.5, color: "#94a3b8", marginTop: 16 }}>And learn how to build it...</p>
              <p style={{ fontSize: "clamp(18px,2.8vw,24px)", fontWeight: 900, color: "#fff", marginTop: 6, letterSpacing: "-0.01em" }}>WITHOUT WRITING A SINGLE LINE OF CODE.</p>
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
