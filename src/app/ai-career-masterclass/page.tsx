"use client";
import { useState, useEffect, useRef, createContext, useContext } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// AI Career Growth Masterclass — free live masterclass for working professionals.
// Angle: use AI + the human skills AI can't replace to grow in your career,
// not get left behind. V1 registration page — clear, to the point, no program
// detail (that's webinar content). Design: navy ink + green (growth) accent.
// ═════════════════════════════════════════════════════════════════════════════

const CLASS = {
  name: "AI Career Growth Masterclass",
  // TODO: replace placeholder date/time/duration with the real ones.
  date: "Sunday, 31 August 2026",
  time: "11:00 AM IST",
  duration: "90 minutes · Live Online",
  price: "₹1,999",
};

const RegisterCtx = createContext<() => void>(() => {});
function useRegister() { return useContext(RegisterCtx); }

// ─── Icons ────────────────────────────────────────────────────────────────────
function BoltIcon({ size = 20, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2z" fill={color} />
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
function CheckIcon({ size = 20, color = "#12a374" }: { size?: number; color?: string }) {
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

// ─── Primary CTA ────────────────────────────────────────────────────────────────
function CTA({ label = "Reserve My Free Seat", big = false, children }: { label?: string; big?: boolean; children?: React.ReactNode }) {
  const register = useRegister();
  return (
    <button onClick={register} className="btn-primary inline-flex items-center justify-center gap-3 rounded-full text-white w-full sm:w-auto"
      style={{ fontSize: big ? 22 : 18, fontWeight: 900, padding: big ? "23px 52px" : "18px 44px", border: "none", cursor: "pointer", lineHeight: 1.15, letterSpacing: "-0.01em" }}>
      <BoltIcon size={big ? 23 : 20} />
      <span>{children ?? label}</span>
      <ArrowIcon size={big ? 21 : 19} />
    </button>
  );
}
function HeroPriceLabel() {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      Register for <span style={{ textDecoration: "line-through", textDecorationColor: "#fca5a5", textDecorationThickness: 2, opacity: 0.85 }}>{CLASS.price}</span> <b style={{ fontWeight: 900 }}>FREE</b>
    </span>
  );
}

// ─── Register modal ─────────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "16px 18px", borderRadius: 14, border: "1.5px solid #dfe3da",
  fontSize: 17, color: "#12160f", outline: "none", background: "#f7f8f5",
};
const DIAL_CODES = [
  { code: "+91", flag: "🇮🇳" }, { code: "+1", flag: "🇺🇸" }, { code: "+44", flag: "🇬🇧" }, { code: "+971", flag: "🇦🇪" },
  { code: "+61", flag: "🇦🇺" }, { code: "+65", flag: "🇸🇬" }, { code: "+966", flag: "🇸🇦" }, { code: "+974", flag: "🇶🇦" },
  { code: "+60", flag: "🇲🇾" }, { code: "+49", flag: "🇩🇪" }, { code: "+880", flag: "🇧🇩" }, { code: "+977", flag: "🇳🇵" },
];

function RegisterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dialCode, setDialCode] = useState("+91");
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
    const digits = whatsapp.replace(/\D/g, "");
    if (!name.trim() || !email.includes("@") || digits.length < 8) {
      setError("Please enter your full name, a valid email and WhatsApp number.");
      return;
    }
    setSubmitting(true);
    try {
      await fetch("/api/ai-career-register", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), whatsapp: `${dialCode}${digits}` }),
      });
      try { window.fbq?.("track", "Lead", { content_name: "ai-career-masterclass" }); } catch {}
    } catch {}
    window.location.href = "/ai-career-masterclass/thank-you";
  }

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(15,27,45,0.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: 20, overflowY: "auto" }}>
      <div onClick={(e) => e.stopPropagation()} className="w-full" style={{ maxWidth: 520, background: "#fff", borderRadius: 26, marginTop: "6vh", boxShadow: "0 40px 90px rgba(15,27,45,0.4)", overflow: "hidden", position: "relative" }}>
        <button type="button" onClick={onClose} aria-label="Close" style={{ position: "absolute", top: 16, right: 18, zIndex: 5, background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 999, width: 38, height: 38, color: "#fff", fontSize: 24, cursor: "pointer", lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>×</button>
        <div style={{ background: "linear-gradient(135deg,#0e7c5a,#0f1b2d)", padding: "28px 30px 26px", color: "#fff" }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.92 }}>Free · {CLASS.date}</div>
          <div style={{ fontSize: 26, fontWeight: 800, marginTop: 6, lineHeight: 1.15, fontFamily: "var(--font-display)" }}>Reserve your free seat</div>
          <div style={{ fontSize: 14, opacity: 0.92, marginTop: 5 }}>{CLASS.time} · {CLASS.duration}</div>
        </div>
        <form onSubmit={submit} style={{ padding: "28px 30px 30px" }} className="flex flex-col gap-4">
          <input style={inputStyle} placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
          <input style={inputStyle} type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <select value={dialCode} onChange={(e) => setDialCode(e.target.value)} aria-label="Country code" style={{ ...inputStyle, width: "auto", paddingRight: 42, fontWeight: 700, cursor: "pointer", appearance: "none", WebkitAppearance: "none", MozAppearance: "none" }}>
                {DIAL_CODES.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
              </select>
              <span aria-hidden style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", width: 22, height: 22, borderRadius: 7, background: "#e4f3ec", display: "flex", alignItems: "center", justifyContent: "center", color: "#0e7c5a", fontSize: 15, fontWeight: 900, lineHeight: 1 }}>▾</span>
            </div>
            <input style={{ ...inputStyle, flex: 1 }} type="tel" inputMode="numeric" placeholder="Enter 10-digit WhatsApp number only" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, "").slice(0, 12))} />
          </div>
          {error && <div style={{ color: "#dc2626", fontSize: 14, fontWeight: 600 }}>{error}</div>}
          <button type="submit" disabled={submitting} className="btn-primary rounded-full text-white w-full inline-flex items-center justify-center gap-2" style={{ padding: 18, fontSize: 19, fontWeight: 900, border: "none", cursor: submitting ? "wait" : "pointer", opacity: submitting ? 0.75 : 1, marginTop: 2 }}>
            <BoltIcon size={21} /> {submitting ? "Reserving…" : "Reserve My Free Seat"}
          </button>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, fontSize: 13.5, color: "#6b7266", textAlign: "center" }}>
            <WhatsAppIcon size={16} /> The joining link will be sent on WhatsApp and email.
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Sticky bottom CTA ──────────────────────────────────────────────────────────
function StickyCTA() {
  const register = useRegister();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 560);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 95, transform: show ? "translateY(0)" : "translateY(130%)", transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)" }}>
      <button onClick={register} className="btn-primary text-white w-full inline-flex items-center justify-center gap-2.5" style={{ padding: "18px 16px calc(18px + env(safe-area-inset-bottom))", fontSize: 19, fontWeight: 900, border: "none", borderRadius: 0, cursor: "pointer", letterSpacing: "-0.01em" }}>
        <BoltIcon size={22} /> Register for <span style={{ textDecoration: "line-through", textDecorationColor: "#a7f3cf", textDecorationThickness: 2, opacity: 0.85 }}>{CLASS.price}</span> FREE
      </button>
    </div>
  );
}

// ─── Shared bits ────────────────────────────────────────────────────────────────
function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: light ? "#5fe0b0" : "#0e7c5a" }}>
      <span style={{ width: 22, height: 1.5, background: light ? "#3ecd9a" : "#0e7c5a" }} />{children}
    </div>
  );
}
const H2: React.CSSProperties = { fontFamily: "var(--font-display)", fontSize: "clamp(27px,4.6vw,44px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 };
const CARD: React.CSSProperties = { background: "#fff", border: "1px solid #e4e7df", borderRadius: 20, boxShadow: "0 1px 2px rgba(15,27,45,0.04), 0 16px 40px -30px rgba(14,124,90,0.3)" };

// ─── Page ───────────────────────────────────────────────────────────────────────
export default function AiCareerMasterclassPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <RegisterCtx.Provider value={() => setModalOpen(true)}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');
        :root { --font-display:'Plus Jakarta Sans','Inter',system-ui,sans-serif; --font-body:'Inter',system-ui,-apple-system,sans-serif; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        .acm { font-family: var(--font-body); color: #1a1f16; background: #f6f7f4; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        .btn-primary { background: linear-gradient(135deg,#12a374 0%,#0e7c5a 60%,#0c6a4d 100%); box-shadow: 0 14px 34px -10px rgba(14,124,90,0.55); transition: transform 0.18s, box-shadow 0.18s; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 22px 46px -12px rgba(14,124,90,0.65); }
        .btn-primary:active { transform: translateY(0); }
        @keyframes acm-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.45; } }
        .grad-g { background: linear-gradient(115deg,#12a374,#5fe0b0); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .grad-green { background: linear-gradient(115deg,#0e7c5a,#12a374); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .card-hover:hover { transform: translateY(-3px); box-shadow: 0 2px 4px rgba(15,27,45,0.05), 0 26px 54px -30px rgba(14,124,90,0.4); }
        .card-hover { transition: transform 0.2s, box-shadow 0.2s; }
      `}</style>

      <main className="acm">

        {/* ═══════════ HERO ═══════════ */}
        <section style={{ position: "relative", background: "radial-gradient(1200px 620px at 50% -12%, #16283f 0%, #0f1b2d 55%, #0a1320 100%)", color: "#fff", padding: "clamp(30px,4vw,48px) 20px clamp(48px,6vw,70px)", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 18% 25%, rgba(18,163,116,0.2), transparent 42%), radial-gradient(circle at 84% 15%, rgba(18,163,116,0.14), transparent 40%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(18,163,116,0.16)", border: "1px solid rgba(94,224,176,0.4)", borderRadius: 999, padding: "9px 18px", fontSize: 12.5, fontWeight: 800, letterSpacing: "0.1em", color: "#a7ecd0" }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: "#34d399", animation: "acm-pulse 1.8s infinite" }} /> AI CAREER GROWTH MASTERCLASS · FREE · LIVE
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,7vw,64px)", fontWeight: 800, lineHeight: 1.14, letterSpacing: "-0.035em", margin: "24px 0 0" }}>
              In The AI Era, You&apos;ll Either Be Replaced —<br />
              <span className="grad-g">Or Become Irreplaceable.</span>
            </h1>
            <p style={{ fontSize: "clamp(18px,2.6vw,23px)", fontWeight: 500, color: "#cfd8dd", maxWidth: 660, margin: "26px auto 0", lineHeight: 1.55 }}>
              A free live masterclass for <b style={{ color: "#fff", fontWeight: 700 }}>working professionals</b> — learn how to use AI to <b style={{ color: "#fff", fontWeight: 700 }}>grow in your career</b>, instead of getting left behind by it.
            </p>
            <p style={{ fontSize: "clamp(16px,2.2vw,19px)", fontWeight: 700, color: "#fff", marginTop: 22, letterSpacing: "-0.01em", fontFamily: "var(--font-display)" }}>Only 90 minutes. No fluff. Not for beginners chasing random AI tools.</p>

            <div style={{ marginTop: 34 }}><CTA big><HeroPriceLabel /></CTA></div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: 26 }}>
              <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 18px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "13px 22px", fontSize: 14.5, fontWeight: 700 }}>
                <span>📅 {CLASS.date}</span><span>🕚 {CLASS.time}</span><span style={{ color: "#cfd8dd", fontWeight: 500 }}>💻 {CLASS.duration}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ WHAT THIS IS ABOUT ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#fff" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <Reveal>
              <Eyebrow>What this masterclass is about</Eyebrow>
              <h2 style={{ ...H2, marginTop: 16 }}>AI Isn&apos;t Coming For Your Job.<br /><span className="grad-green">It&apos;s Coming For Whoever Doesn&apos;t Use It.</span></h2>
              <p style={{ fontSize: "clamp(16px,2.2vw,18.5px)", color: "#4b5245", lineHeight: 1.65, marginTop: 18 }}>
                Every week there&apos;s news of layoffs. But the same companies are <b style={{ color: "#1a1f16" }}>paying more</b> for people who know how to work with AI. This masterclass shows you which side to be on — and exactly how to get there, using AI plus the skills AI can&apos;t replace.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ WHO IT'S FOR ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#f6f7f4" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <Reveal>
              <Eyebrow>Who it&apos;s for</Eyebrow>
              <h2 style={{ ...H2, marginTop: 16 }}>Made For Working Professionals</h2>
              <p style={{ fontSize: 16.5, color: "#6b7266", marginTop: 12 }}>Whether you have 2 years of experience or 20 — this is for you if you want to stay ahead.</p>
            </Reveal>
            <Reveal delay={60}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 30 }}>
                {["💻 IT & Software Professionals", "📊 Analysts & Consultants", "📈 Marketing & Sales", "🧑‍💼 Managers & Team Leads", "🎯 Job Seekers", "🚀 Anyone who fears being left behind"].map((t) => (
                  <span key={t} style={{ background: "#fff", border: "1px solid #e4e7df", borderRadius: 999, padding: "11px 20px", fontSize: 15, fontWeight: 600, color: "#1a1f16", boxShadow: "0 2px 8px rgba(15,27,45,0.04)" }}>{t}</span>
                ))}
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#b0402e", marginTop: 26 }}>Not for you if you just want to collect random AI tools with no career goal.</p>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ WHAT YOU'LL LEARN IN 90 MINUTES ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#fff" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <Eyebrow>Your 90 minutes</Eyebrow>
                <h2 style={{ ...H2, marginTop: 16 }}>What You&apos;ll Learn In <span className="grad-green">90 Minutes</span></h2>
              </div>
            </Reveal>
            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", marginTop: 44 }}>
              {[
                { n: "01", t: "Where AI Is Actually Hitting Jobs", d: "See clearly which roles and tasks AI is replacing right now — and where the real opportunity is." },
                { n: "02", t: "The AI Skills Companies Pay More For", d: "The specific AI skills that get professionals hired, retained and promoted in 2026." },
                { n: "03", t: "AI For Your Exact Role", d: "How to use only the AI tools that matter for your profession — so you're not drowning in 100 new tools." },
                { n: "04", t: "AI + The Human Skills AI Can't Replace", d: "How to combine AI with communication, interviews and positioning — the real key to standing out." },
                { n: "05", t: "See AI Do Real Work, Live", d: "Watch AI handle real professional tasks on screen — so you know exactly what's possible for you." },
                { n: "06", t: "Your 90-Day Path Forward", d: "A clear, step-by-step way to become the AI-skilled professional your company can't replace." },
              ].map((c, i) => (
                <Reveal key={c.n} delay={(i % 3) * 70}>
                  <div className="card-hover" style={{ ...CARD, padding: "26px 24px", height: "100%" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, color: "#a7ddc7", letterSpacing: "-0.02em" }}>{c.n}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 700, marginTop: 6, letterSpacing: "-0.01em", lineHeight: 1.25, color: "#12160f" }}>{c.t}</div>
                    <p style={{ fontSize: 14.5, color: "#4b5245", lineHeight: 1.55, marginTop: 8 }}>{c.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={100}>
              <div style={{ textAlign: "center", marginTop: 40 }}><CTA label="Reserve My Free Seat" /></div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ HOW IT'S DIFFERENT ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#0f1b2d", color: "#fff" }}>
          <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
            <Reveal>
              <Eyebrow light>Why this is different</Eyebrow>
              <h2 style={{ ...H2, marginTop: 16 }}>Not Another &quot;Learn 50 AI Tools&quot; Session.</h2>
              <p style={{ fontSize: "clamp(16px,2.2vw,18.5px)", color: "#c9d3df", lineHeight: 1.65, marginTop: 18, maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
                Most AI sessions make you dependent on tools you&apos;ll forget next week. This one is built around <b style={{ color: "#fff" }}>your career</b> — combining AI with the human skills AI can&apos;t replace, so <b style={{ color: "#5fe0b0" }}>you</b> become irreplaceable.
              </p>
            </Reveal>
            <Reveal delay={70}>
              <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", marginTop: 36, textAlign: "left" }}>
                {[
                  "Focused only on your career — not random tools",
                  "AI matched to your exact profession",
                  "AI + soft skills, not AI alone",
                  "Practical and real — you see AI actually work",
                ].map((t) => (
                  <div key={t} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 14, padding: "16px 18px" }}>
                    <CheckIcon size={22} color="#12a374" /><span style={{ fontSize: 15, color: "#e6ebe1", lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ OUTCOMES ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#f6f7f4" }}>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <Eyebrow>What you&apos;ll walk away with</Eyebrow>
                <h2 style={{ ...H2, marginTop: 16 }}>By The End Of The Masterclass, You&apos;ll Know…</h2>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div style={{ display: "inline-flex", flexDirection: "column", gap: 14, marginTop: 34, textAlign: "left", background: "#fff", border: "1px solid #e4e7df", borderRadius: 18, padding: "clamp(22px,4vw,32px)", width: "100%" }}>
                {[
                  "Exactly how AI affects your job — and how to stay ahead of it",
                  "Which AI tools actually matter for your role (and which to ignore)",
                  "How to make yourself more valuable to your current company",
                  "How to combine AI with your communication and interview skills",
                  "A clear 90-day path to become an AI-skilled, promotion-ready professional",
                ].map((t) => (
                  <div key={t} style={{ display: "flex", gap: 14, alignItems: "flex-start", fontSize: 16.5, color: "#1a1f16", fontWeight: 500 }}>
                    <span style={{ flexShrink: 0, marginTop: 1 }}><CheckIcon size={22} color="#12a374" /></span>{t}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div style={{ textAlign: "center", marginTop: 36 }}><CTA label="Reserve My Free Seat" /></div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ HOST ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#fff" }}>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <Eyebrow>Your host</Eyebrow>
                <h2 style={{ ...H2, marginTop: 16 }}>Who&apos;s Teaching You</h2>
              </div>
            </Reveal>
            <Reveal delay={70}>
              <div style={{ display: "grid", gridTemplateColumns: "minmax(0,240px) 1fr", gap: 34, alignItems: "center", marginTop: 40, ...CARD, background: "#f6f7f4", boxShadow: "none", padding: "clamp(24px,4vw,38px)" }} className="host-grid">
                <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid #e4e7df", lineHeight: 0, boxShadow: "0 20px 44px -24px rgba(14,124,90,0.4)" }}>
                  <img src="/rohan.png" alt="Rohan Mote — AI Career Coach, High Performance Club" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = "none"; }} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px,3.6vw,32px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#12160f" }}>Rohan Mote</div>
                  <div style={{ fontSize: 15.5, fontWeight: 700, color: "#0e7c5a", marginTop: 4 }}>AI Career Coach · Founder, High Performance Club</div>
                  <p style={{ fontSize: 15.5, color: "#4b5245", lineHeight: 1.75, marginTop: 16 }}>
                    I help working professionals use AI to grow in their careers — not get replaced by it. In this masterclass I&apos;ll show you exactly how, in simple language, so you leave knowing your next move.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ FINAL CTA ═══════════ */}
        <section style={{ position: "relative", padding: "clamp(60px,9vw,104px) 20px", background: "radial-gradient(1000px 540px at 50% 0%, #16283f 0%, #0f1b2d 55%, #0a1320 100%)", color: "#fff", textAlign: "center", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 15% 25%, rgba(18,163,116,0.2), transparent 40%), radial-gradient(circle at 85% 20%, rgba(18,163,116,0.14), transparent 40%)" }} />
          <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
            <Reveal>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(18,163,116,0.16)", border: "1px solid rgba(94,224,176,0.4)", borderRadius: 999, padding: "11px 22px", fontSize: 15, fontWeight: 800, letterSpacing: "0.06em", color: "#a7ecd0" }}>
                <span style={{ width: 9, height: 9, borderRadius: 999, background: "#34d399", animation: "acm-pulse 1.8s infinite" }} /> FREE LIVE MASTERCLASS
              </div>
              <h2 style={{ ...H2, marginTop: 22 }}>Don&apos;t Compete With AI.<br /><span className="grad-g">Grow With It.</span></h2>
              <p style={{ fontSize: "clamp(16px,2.3vw,19px)", color: "#c9d3df", marginTop: 18, lineHeight: 1.55, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
                Join the free AI Career Growth Masterclass and leave with a clear plan to become the professional every company wants to keep.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 20px", marginTop: 26, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "15px 24px", fontSize: 15.5, fontWeight: 700 }}>
                <span>📅 {CLASS.date}</span><span>⏰ {CLASS.time}</span><span style={{ color: "#c9d3df", fontWeight: 500 }}>💻 {CLASS.duration}</span>
              </div>
              <div style={{ marginTop: 30 }}><CTA big><HeroPriceLabel /></CTA></div>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 20px", marginTop: 24, fontSize: 14.5, color: "#cfd8dd" }}>
                {["For Working Professionals", "90 Minutes", "100% Free"].map((t) => (
                  <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><CheckIcon size={17} color="#34d399" /> {t}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <div style={{ textAlign: "center", padding: "24px 20px", background: "#0a1320", color: "#5a6b57", fontSize: 12.5 }}>
          © {new Date().getFullYear()} High Performance Club · {CLASS.name}
        </div>

        <div style={{ height: 84 }} />
      </main>

      <StickyCTA />
      <RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </RegisterCtx.Provider>
  );
}
