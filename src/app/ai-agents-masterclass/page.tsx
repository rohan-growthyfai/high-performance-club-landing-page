"use client";
import { useState, useEffect, useRef, createContext, useContext } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// AI Agents Masterclass — free 90-min LIVE session.
// Angle: "Clone yourself" → build AI agents & automations that do your daily
// work, so you get your time back. Concise, glance-clear registration page.
// ═════════════════════════════════════════════════════════════════════════════

const CLASS = {
  name: "AI Agents Masterclass",
  date: "Sunday, 23 August 2026",
  time: "11:00 AM IST",
  duration: "60–90 minutes · Live on Zoom",
  price: "₹1,999", // struck-through → FREE
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

// ─── FAQ item ─────────────────────────────────────────────────────────────────
function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: "#e2e8f0", boxShadow: "0 2px 10px rgba(15,23,42,0.04)" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left font-bold bg-white hover:bg-slate-50 transition-colors" style={{ color: "#0f172a", fontSize: 17 }}>
        {q}
        <span className="shrink-0 text-2xl font-light" style={{ color: "#4f46e5", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
      </button>
      {open && <div className="px-5 pb-5 leading-relaxed bg-white" style={{ fontSize: 15, color: "#475569" }}>{a}</div>}
    </div>
  );
}

// ─── Primary CTA ────────────────────────────────────────────────────────────────
function CTA({ label = "Reserve My Free Seat", big = false }: { label?: string; big?: boolean }) {
  const register = useRegister();
  return (
    <button
      onClick={register}
      className="btn-primary inline-flex items-center justify-center gap-3 rounded-full font-black text-white w-full sm:w-auto"
      style={{ fontSize: big ? 21 : 18, padding: big ? "20px 46px" : "16px 38px", border: "none", cursor: "pointer", lineHeight: 1.15, letterSpacing: "-0.01em" }}>
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
      `}</style>

      <main style={{ fontFamily: "'Inter',system-ui,-apple-system,'Segoe UI',sans-serif", color: "#0f172a", background: "#fff", overflowX: "hidden" }}>

        {/* ───────── HERO ───────── */}
        <section style={{ background: "radial-gradient(1100px 560px at 50% -10%, #1e1b4b 0%, #0f172a 58%, #020617 100%)", color: "#fff", padding: "clamp(52px,8vw,86px) 20px clamp(44px,6vw,68px)" }}>
          <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,0.18)", border: "1px solid rgba(129,140,248,0.4)", borderRadius: 999, padding: "8px 16px", fontSize: 13, fontWeight: 700, letterSpacing: "0.03em", color: "#c7d2fe" }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: "#22c55e", animation: "agp-pulse 1.8s infinite" }} /> FREE LIVE MASTERCLASS
            </div>
            <h1 style={{ fontSize: "clamp(32px,6vw,56px)", fontWeight: 900, lineHeight: 1.07, letterSpacing: "-0.03em", margin: "20px 0 0" }}>
              Clone yourself with <span style={{ background: "linear-gradient(120deg,#a5b4fc,#818cf8)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>AI Agents.</span><br />
              Let them do your daily work.
            </h1>
            <p style={{ fontSize: "clamp(16px,2.3vw,20px)", color: "#cbd5e1", maxWidth: 620, margin: "20px auto 0", lineHeight: 1.55 }}>
              In this free 90-minute masterclass, learn to build <b style={{ color: "#fff" }}>AI agents &amp; automations</b> that work like a copy of you — handling your repetitive daily tasks — so you can focus on the things that truly matter. <b style={{ color: "#fff" }}>No coding required.</b>
            </p>

            {/* date/time card */}
            <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "10px 22px", marginTop: 28, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "14px 22px", fontSize: 15 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 700 }}>📅 {CLASS.date}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 700 }}>🕚 {CLASS.time}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#cbd5e1" }}>⏱️ {CLASS.duration}</span>
            </div>

            <div style={{ marginTop: 30 }}>
              <CTA big />
              <p style={{ fontSize: 14, color: "#94a3b8", marginTop: 14 }}>
                <span style={{ textDecoration: "line-through", color: "#64748b" }}>{CLASS.price}</span> &nbsp;<b style={{ color: "#a7f3d0" }}>Today: FREE</b> · Limited live seats
              </p>
            </div>
          </div>
        </section>

        {/* ───────── WHAT THIS IS (the clone idea, made clear) ───────── */}
        <section style={{ padding: "clamp(44px,6vw,72px) 20px", background: "#f8fafc" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4f46e5" }}>What is this masterclass about?</div>
            <h2 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.15, marginTop: 12 }}>
              Think of it as building a working copy of yourself.
            </h2>
            <p style={{ fontSize: "clamp(16px,2.2vw,18.5px)", color: "#475569", lineHeight: 1.6, marginTop: 16 }}>
              You do the same repetitive tasks every day — replying to messages, following up, writing content, organising, researching. An <b>AI Agent</b> can learn how <i>you</i> do those tasks and do them for you, 24/7, with the same skill and even better consistency. Build a few of these and most of your daily grind simply runs on its own.
            </p>
            <p style={{ fontSize: 14.5, color: "#94a3b8", marginTop: 14 }}>
              (This is <b>not</b> about face or voice cloning tools like Synthesia — it&apos;s about cloning your <b>work</b> using AI agents &amp; automations.)
            </p>
          </div>
        </section>

        {/* ───────── WHY LEARN AI AGENTS NOW ───────── */}
        <section style={{ padding: "clamp(44px,6vw,72px) 20px", background: "#fff" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4f46e5" }}>Why learn this now</div>
                <h2 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.15, marginTop: 12 }}>
                  In 2023 it was ChatGPT. In 2026, it&apos;s AI Agents — and you&apos;re early.
                </h2>
                <p style={{ fontSize: "clamp(16px,2.2vw,18px)", color: "#475569", lineHeight: 1.6, marginTop: 16, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
                  Everyone can now <i>chat</i> with AI. But the people getting ahead have moved one step further — they build AI agents that <b>do the work for them.</b> This is the skill almost nobody has yet, and the window to be early is right now.
                </p>
              </div>
            </Reveal>
            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", marginTop: 40 }}>
              {[
                { big: "70%", small: "of your day is repetitive work an AI agent can quietly take over — replies, follow-ups, admin, research." },
                { big: "24/7", small: "your agents keep working when you don't — nights, weekends, holidays. They never get tired or forget." },
                { big: "₹0 code", small: "you build all of this by describing what you want in plain language. No programming, no tech background." },
              ].map((s, i) => (
                <Reveal key={s.big} delay={i * 90}>
                  <div style={{ background: "#f8fafc", borderRadius: 16, padding: "24px 22px", border: "1px solid #eef2f7", height: "100%" }}>
                    <div style={{ fontSize: 32, fontWeight: 900, color: "#4f46e5", letterSpacing: "-0.02em" }}>{s.big}</div>
                    <div style={{ fontSize: 15, color: "#475569", marginTop: 8, lineHeight: 1.5 }}>{s.small}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── WHAT YOU'LL LEARN ───────── */}
        <section style={{ padding: "clamp(44px,6vw,72px) 20px", background: "#f8fafc" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 900, letterSpacing: "-0.02em", textAlign: "center" }}>What you&apos;ll learn in 90 minutes</h2>
            <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", marginTop: 34 }}>
              {[
                { t: "The “clone yourself” framework", d: "The simple way to spot which of your daily tasks an AI agent can take over — starting today." },
                { t: "Build a real AI agent, live", d: "Watch a working AI agent get built on screen and reply to a real message — no code, step by step." },
                { t: "Automate your repetitive work", d: "How to connect agents into automations that run your follow-ups, content and admin on autopilot." },
                { t: "Your next 90 days", d: "A clear path to build a full team of AI agents that handle most of your work — and even earn from this skill." },
              ].map((c) => (
                <div key={c.t} style={{ background: "#fff", border: "1px solid #eef2f7", borderRadius: 16, padding: "22px 20px", boxShadow: "0 2px 12px rgba(15,23,42,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <CheckIcon size={22} />
                    <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.01em" }}>{c.t}</span>
                  </div>
                  <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.55, margin: 0 }}>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── WHO IT'S FOR ───────── */}
        <section style={{ padding: "clamp(44px,6vw,72px) 20px", background: "#0f172a", color: "#fff" }}>
          <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(23px,3.8vw,34px)", fontWeight: 900, letterSpacing: "-0.02em" }}>Who this is for</h2>
            <p style={{ fontSize: 16, color: "#94a3b8", marginTop: 10 }}>If you do repetitive work every day, this is for you. No tech background needed.</p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 26 }}>
              {["Working professionals", "Business owners", "Freelancers & solopreneurs", "Coaches & consultants", "Students & job-seekers", "Complete beginners"].map((t) => (
                <span key={t} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999, padding: "10px 18px", fontSize: 15, fontWeight: 600 }}>{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── FREE BONUSES ───────── */}
        <section style={{ padding: "clamp(44px,6vw,72px) 20px", background: "#fff" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 34 }}>
                <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4f46e5" }}>Register &amp; get these free</div>
                <h2 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 900, letterSpacing: "-0.02em", marginTop: 12 }}>
                  Free bonuses worth <span style={{ background: "linear-gradient(120deg,#b8860b,#d4a017)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>₹7,500+</span>
                </h2>
                <p style={{ fontSize: 16, color: "#64748b", marginTop: 10 }}>Given free to everyone who attends the masterclass live.</p>
              </div>
            </Reveal>
            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
              {[
                { tag: "Bonus #1", title: "The “Clone Yourself” AI Agent Starter Kit", worth: "₹2,500", desc: "Ready-to-use prompts and templates to spin up your first AI agents fast — copy, paste, done." },
                { tag: "Bonus #2", title: "The Top 10 Agents to Build First", worth: "₹2,000", desc: "A shortlist of the highest-impact AI agents for everyday work, so you never wonder where to start." },
                { tag: "Bonus #3", title: "No-Code AI Tools Cheat-Sheet", worth: "₹3,000", desc: "The exact free & low-cost tools we use to build agents and automations — no guesswork, no tech overwhelm." },
              ].map(({ tag, title, worth, desc }, i) => (
                <Reveal key={title} delay={i * 90}>
                  <div style={{ background: "#f8fafc", border: "1px solid #eef2f7", borderRadius: 18, padding: "24px 22px", height: "100%", position: "relative", boxShadow: "0 4px 18px rgba(15,23,42,0.05)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", color: "#4f46e5", textTransform: "uppercase" }}>{tag}</span>
                      <span style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)", color: "#fff", fontSize: 12.5, fontWeight: 800, borderRadius: 999, padding: "5px 12px" }}>Worth {worth}</span>
                    </div>
                    <div style={{ fontSize: 18.5, fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1.25 }}>{title}</div>
                    <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.5, marginTop: 8 }}>{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={80}>
              <div style={{ textAlign: "center", marginTop: 30 }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>
                  Total bonus value: <span style={{ textDecoration: "line-through", color: "#a1a1aa" }}>₹7,500</span>
                </p>
                <p style={{ fontSize: 20, fontWeight: 900, color: "#e8a020", fontFamily: "'Poppins',sans-serif", marginTop: 2 }}>Yours FREE today 🎉</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ───────── VALUE LADDER / WHAT YOU GET ───────── */}
        <section style={{ padding: "clamp(44px,6vw,72px) 20px", background: "#f8fafc" }}>
          <div style={{ maxWidth: 620, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(23px,3.8vw,34px)", fontWeight: 900, letterSpacing: "-0.02em", textAlign: "center", marginBottom: 26 }}>
                Here&apos;s everything you get — free
              </h2>
            </Reveal>
            <Reveal delay={60}>
              <div style={{ background: "#fff", border: "1px solid #eef2f7", borderRadius: 20, padding: "10px 24px", boxShadow: "0 8px 30px rgba(15,23,42,0.06)" }}>
                {[
                  { item: "90-min live AI Agents Masterclass", worth: "₹1,999" },
                  { item: "Live build of a real AI agent (watch it work)", worth: "₹2,000" },
                  { item: "“Clone Yourself” AI Agent Starter Kit", worth: "₹2,500" },
                  { item: "Top 10 Agents to Build First", worth: "₹2,000" },
                  { item: "No-Code AI Tools Cheat-Sheet", worth: "₹3,000" },
                  { item: "Live Q&A with the host", worth: "₹1,500" },
                ].map((r, i, arr) => (
                  <div key={r.item} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "15px 0", borderBottom: i < arr.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15.5, color: "#0f172a", fontWeight: 500 }}>
                      <CheckIcon size={20} color="#22c55e" /> {r.item}
                    </span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#64748b", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>{r.worth}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div style={{ textAlign: "center", marginTop: 26 }}>
                <p style={{ fontSize: 17, color: "#475569", fontWeight: 600 }}>Total value: <span style={{ textDecoration: "line-through", color: "#a1a1aa" }}>₹12,999</span></p>
                <p style={{ fontSize: "clamp(26px,5vw,38px)", fontWeight: 900, color: "#4f46e5", letterSpacing: "-0.02em", marginTop: 4, fontFamily: "'Poppins',sans-serif" }}>Today: FREE</p>
                <div style={{ marginTop: 22 }}><CTA label="Reserve My Free Seat" /></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ───────── HOST ───────── */}
        <section style={{ padding: "clamp(44px,6vw,72px) 20px", background: "#fff" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <Reveal>
              <div style={{ background: "#0f172a", borderRadius: 24, padding: "clamp(28px,5vw,44px)", color: "#fff", textAlign: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a5b4fc" }}>Your host</div>
                <h2 style={{ fontSize: "clamp(23px,3.8vw,32px)", fontWeight: 900, letterSpacing: "-0.02em", marginTop: 12, lineHeight: 1.2 }}>
                  Rohan Mote
                </h2>
                <p style={{ fontSize: 15, color: "#818cf8", fontWeight: 600, marginTop: 4 }}>Founder, High Performance Club</p>
                <p style={{ fontSize: "clamp(15px,2.2vw,17px)", color: "#cbd5e1", lineHeight: 1.65, marginTop: 18, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
                  I build AI agents and automations every single day to run real businesses — lead systems, content, follow-ups and more. In this masterclass I&apos;ll show you exactly how it&apos;s done, in plain language, so you can start building your own agents from day one — even if you&apos;ve never touched a line of code.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ───────── FAQ ───────── */}
        <section style={{ padding: "clamp(44px,6vw,72px) 20px", background: "#f8fafc" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <Reveal>
              <h2 style={{ fontSize: "clamp(24px,4vw,34px)", fontWeight: 900, letterSpacing: "-0.02em", textAlign: "center", marginBottom: 28 }}>Questions, answered</h2>
            </Reveal>
            <div className="flex flex-col gap-3">
              {[
                { q: "Do I need to know coding?", a: "No. Everything is built with no-code tools by describing what you want in plain language. If you can use WhatsApp and fill a form, you can follow along." },
                { q: "Is it really free?", a: "Yes — the 90-minute live masterclass and all the bonuses are completely free. Just show up live on 23 August 2026 at 11 AM." },
                { q: "Is this about cloning my face or voice?", a: "No. This is not about avatar tools like Synthesia. \"Cloning yourself\" here means building AI agents and automations that do your daily work — so your tasks run without you." },
                { q: "I'm a complete beginner — will I keep up?", a: "Absolutely. This masterclass is built beginner-first. We explain everything simply and show a real agent being built live, step by step." },
                { q: "What if I can't attend live?", a: "Register anyway. If you're registered, we'll try to share access — but the live session (and the bonuses) are for those who show up, so block the time if you can." },
                { q: "How do I join?", a: "After you register, your Zoom joining link and reminders are sent on WhatsApp and email. Just click the link at 11 AM on 23 August." },
              ].map((f) => (<FAQ key={f.q} q={f.q} a={f.a} />))}
            </div>
          </div>
        </section>

        {/* ───────── FINAL CTA ───────── */}
        <section style={{ padding: "clamp(52px,8vw,90px) 20px", background: "radial-gradient(900px 480px at 50% 0%, #1e1b4b 0%, #0f172a 62%, #020617 100%)", color: "#fff", textAlign: "center" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(26px,4.6vw,42px)", fontWeight: 900, letterSpacing: "-0.025em", lineHeight: 1.1 }}>
              Build your AI agents. Get your time back.
            </h2>
            <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 20px", marginTop: 22, fontSize: 15, color: "#cbd5e1" }}>
              <span style={{ fontWeight: 700, color: "#fff" }}>📅 {CLASS.date}</span>
              <span style={{ fontWeight: 700, color: "#fff" }}>🕚 {CLASS.time}</span>
              <span>⏱️ {CLASS.duration}</span>
            </div>
            <div style={{ marginTop: 30 }}>
              <CTA big label="Reserve My Free Seat" />
              <p style={{ fontSize: 14, color: "#94a3b8", marginTop: 14 }}>Free today · Limited live seats · No coding required</p>
            </div>
          </div>
          <div style={{ marginTop: 54, fontSize: 13, color: "#475569" }}>© High Performance Club · {CLASS.name}</div>
        </section>
      </main>

      <RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </RegisterCtx.Provider>
  );
}
