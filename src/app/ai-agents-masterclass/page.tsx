"use client";
import { useState, useEffect, useRef, createContext, useContext } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// AI Agents Masterclass — free 90-min LIVE session. PREMIUM redesign.
// Angle: build AI Agents that do your repetitive work for you, 24/7. No code.
// Design: refined indigo/violet on warm off-white, layered soft shadows,
// hairline borders, generous rhythm, Plus Jakarta Sans display + Inter body.
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
function CheckIcon({ size = 20, color = "#6d5cf0" }: { size?: number; color?: string }) {
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
      <circle cx="12" cy="12" r="12" fill="#f7a6a6" />
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
  return <div ref={ref} style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(24px)", transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}>{children}</div>;
}

// ─── Primary CTA ────────────────────────────────────────────────────────────────
function CTA({ label = "Reserve My Free Seat", big = false, children }: { label?: string; big?: boolean; children?: React.ReactNode }) {
  const register = useRegister();
  return (
    <button
      onClick={register}
      className="btn-primary inline-flex items-center justify-center gap-3 rounded-full text-white w-full sm:w-auto"
      style={{ fontSize: big ? 23 : 19, fontWeight: 900, padding: big ? "24px 56px" : "19px 46px", border: "none", cursor: "pointer", lineHeight: 1.15, letterSpacing: "-0.01em" }}>
      <BoltIcon size={big ? 24 : 21} />
      <span>{children ?? label}</span>
      <ArrowIcon size={big ? 22 : 19} />
    </button>
  );
}

// Hero price CTA text: Register for ₹1,999 (struck-through) FREE
function HeroPriceLabel() {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      Register for <span style={{ textDecoration: "line-through", textDecorationColor: "#f7a6a6", textDecorationThickness: 2, opacity: 0.85 }}>{CLASS.price}</span> <b style={{ fontWeight: 900 }}>FREE</b>
    </span>
  );
}

// ─── Register modal ─────────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "14px 16px", borderRadius: 14, border: "1.5px solid #e7e3f5",
  fontSize: 17, color: "#141026", outline: "none", background: "#faf9ff",
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
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(16,12,34,0.62)", backdropFilter: "blur(6px)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: 20, overflowY: "auto" }}>
      <div onClick={(e) => e.stopPropagation()} className="w-full" style={{ maxWidth: 440, background: "#fff", borderRadius: 26, marginTop: "8vh", boxShadow: "0 40px 90px rgba(16,12,34,0.4)", overflow: "hidden" }}>
        <div style={{ background: "linear-gradient(135deg,#6d5cf0,#4b37cf)", padding: "24px 26px 22px", color: "#fff", position: "relative" }}>
          <button onClick={onClose} aria-label="Close" style={{ position: "absolute", top: 14, right: 16, background: "rgba(255,255,255,0.18)", border: "none", borderRadius: 999, width: 32, height: 32, color: "#fff", fontSize: 20, cursor: "pointer", lineHeight: 1 }}>×</button>
          <div style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.92 }}>Free · {CLASS.date}</div>
          <div style={{ fontSize: 23, fontWeight: 800, marginTop: 6, lineHeight: 1.15, fontFamily: "var(--font-display)" }}>Reserve your free seat</div>
          <div style={{ fontSize: 13.5, opacity: 0.92, marginTop: 4 }}>{CLASS.time} · {CLASS.duration}</div>
        </div>
        <form onSubmit={submit} style={{ padding: "24px 26px 28px" }} className="flex flex-col gap-3.5">
          <input style={inputStyle} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
          <input style={inputStyle} type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input style={inputStyle} type="tel" placeholder="WhatsApp number (with country code)" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
          {error && <div style={{ color: "#dc2626", fontSize: 14, fontWeight: 600 }}>{error}</div>}
          <button type="submit" disabled={submitting} className="btn-primary rounded-full text-white w-full inline-flex items-center justify-center gap-2" style={{ padding: 16, fontSize: 18, fontWeight: 800, border: "none", cursor: submitting ? "wait" : "pointer", opacity: submitting ? 0.75 : 1 }}>
            <BoltIcon size={20} /> {submitting ? "Reserving…" : "Reserve My Free Seat"}
          </button>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 13, color: "#6b6580" }}>
            <WhatsAppIcon size={16} /> The joining link is sent on WhatsApp. No spam.
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Sticky bottom CTA (all devices, appears on scroll) ──────────────────────────
function StickyCTA() {
  const register = useRegister();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 560);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 95, background: "linear-gradient(180deg, rgba(250,249,253,0.75), #faf9fd 40%)", backdropFilter: "blur(12px)", borderTop: "1px solid #e7e1f5", padding: "12px 16px calc(12px + env(safe-area-inset-bottom))", transform: show ? "translateY(0)" : "translateY(130%)", transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)", boxShadow: "0 -10px 30px -18px rgba(76,55,207,0.35)" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <button onClick={register} className="btn-primary rounded-full text-white w-full inline-flex items-center justify-center gap-2.5" style={{ padding: "18px", fontSize: 19, fontWeight: 900, border: "none", cursor: "pointer", letterSpacing: "-0.01em" }}>
          <BoltIcon size={22} /> Register for <span style={{ textDecoration: "line-through", textDecorationColor: "#fca5a5", textDecorationThickness: 2, opacity: 0.85 }}>{CLASS.price}</span> FREE
        </button>
      </div>
    </div>
  );
}

// ─── Live social-proof toast (bottom-left) ───────────────────────────────────────
const REG_NAMES = [
  { name: "Rahul", city: "Delhi" }, { name: "Priya", city: "Mumbai" }, { name: "Aditya", city: "Bengaluru" },
  { name: "Sneha", city: "Pune" }, { name: "Vikram", city: "Hyderabad" }, { name: "Anjali", city: "Chennai" },
  { name: "Karan", city: "Jaipur" }, { name: "Divya", city: "Ahmedabad" }, { name: "Manish", city: "Kolkata" },
  { name: "Meera", city: "Surat" }, { name: "Arjun", city: "Lucknow" }, { name: "Tanvi", city: "Nagpur" },
  { name: "Nikhil", city: "Indore" }, { name: "Kavya", city: "Kochi" }, { name: "Ritesh", city: "Bhopal" },
];
let _regId = 0;
function regAgo() { const r = Math.random(); return r < 0.3 ? `${Math.floor(r * 150 + 10)}s ago` : r < 0.6 ? "just now" : `${Math.floor(r * 5 + 1)} min ago`; }

function LiveToast() {
  interface T { id: number; name: string; city: string; time: string }
  const [toasts, setToasts] = useState<T[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const used = useRef<Set<number>>(new Set());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => { const f = () => { if (window.scrollY > 300) setScrolled(true); }; window.addEventListener("scroll", f, { passive: true }); f(); return () => window.removeEventListener("scroll", f); }, []);
  useEffect(() => {
    if (!scrolled) return;
    const spawn = () => {
      let idx: number; do { idx = Math.floor(Math.random() * REG_NAMES.length); } while (used.current.has(idx));
      used.current.add(idx); if (used.current.size > 5) { const first = used.current.values().next().value as number; used.current.delete(first); }
      const p = REG_NAMES[idx]; const id = ++_regId;
      setToasts(prev => [{ id, name: p.name, city: p.city, time: regAgo() }, ...prev].slice(0, 2));
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
      timer.current = setTimeout(spawn, 8000 + Math.random() * 11000);
    };
    timer.current = setTimeout(spawn, 3500 + Math.random() * 3000);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [scrolled]);
  if (!scrolled || toasts.length === 0) return null;
  return (
    <div style={{ position: "fixed", left: 10, bottom: 92, zIndex: 92, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none" }} aria-live="polite">
      {toasts.map((t, i) => (
        <div key={t.id} style={{ opacity: i === 0 ? 1 : 0.6, transform: `scale(${1 - i * 0.03})`, transformOrigin: "bottom left", animation: "reg-fadein 0.3s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, borderRadius: 16, padding: "9px 12px", width: 248, background: "#fff", border: "1px solid #ece8f7", boxShadow: "0 8px 24px -8px rgba(76,55,207,0.28)" }}>
            <div style={{ width: 30, height: 30, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 12.5, flexShrink: 0, background: `hsl(${(t.name.charCodeAt(0) * 37) % 360},52%,52%)` }}>{t.name[0]}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: 700, lineHeight: 1.3, fontSize: 12, color: "#1a1530", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.name} from {t.city}</p>
              <p style={{ lineHeight: 1.3, marginTop: 2, fontSize: 10.5, color: "#8a84a0", margin: 0 }}>registered · {t.time}</p>
            </div>
            <span style={{ position: "relative", display: "flex", width: 8, height: 8, flexShrink: 0 }}><span style={{ position: "absolute", display: "inline-flex", width: "100%", height: "100%", borderRadius: 999, background: "#34d399", opacity: 0.75, animation: "reg-ping 1.4s cubic-bezier(0,0,0.2,1) infinite" }} /><span style={{ position: "relative", display: "inline-flex", width: 8, height: 8, borderRadius: 999, background: "#34d399" }} /></span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Shared bits ────────────────────────────────────────────────────────────────
function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 12, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: light ? "#b9aef7" : "#6d5cf0" }}>
      <span style={{ width: 22, height: 1.5, background: light ? "#8a7bf0" : "#c9c0f7" }} />{children}
    </div>
  );
}
const H2: React.CSSProperties = { fontFamily: "var(--font-display)", fontSize: "clamp(28px,4.8vw,46px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.08 };
const CARD: React.CSSProperties = { background: "#fff", border: "1px solid #ece8f7", borderRadius: 22, boxShadow: "0 1px 2px rgba(16,12,34,0.04), 0 18px 44px -30px rgba(76,55,207,0.28)" };

// ─── Page ───────────────────────────────────────────────────────────────────────
export default function AiAgentsMasterclassPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <RegisterCtx.Provider value={() => setModalOpen(true)}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');
        :root { --font-display:'Plus Jakarta Sans','Inter',system-ui,sans-serif; --font-body:'Inter',system-ui,-apple-system,sans-serif; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        .aam { font-family: var(--font-body); color: #211c35; background: #faf9fd; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        .btn-primary { background: linear-gradient(135deg,#7c6cf5 0%,#5a44e0 55%,#4b37cf 100%); box-shadow: 0 14px 34px -10px rgba(90,68,224,0.6); transition: transform 0.18s, box-shadow 0.18s; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 22px 46px -12px rgba(90,68,224,0.7); }
        .btn-primary:active { transform: translateY(0); }
        @keyframes agp-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.45; } }
        @keyframes reg-fadein { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes reg-ping { 75%,100% { transform: scale(2); opacity: 0; } }
        @keyframes aam-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { animation: aam-marquee 46s linear infinite; }
        .marquee:hover .marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .marquee-track { animation: none; } }
        @keyframes agp-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        .grad-ink { background: linear-gradient(115deg,#8b7cf7,#b9aef7); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .grad-vio { background: linear-gradient(115deg,#6d5cf0,#9b59f0); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .who-card:hover { transform: translateY(-4px); box-shadow: 0 2px 4px rgba(16,12,34,0.05), 0 30px 60px -28px rgba(76,55,207,0.45); }
        .who-card { transition: transform 0.22s cubic-bezier(0.16,1,0.3,1), box-shadow 0.22s; }
        .use-card:hover { border-color: #d9d1f7; box-shadow: 0 2px 4px rgba(16,12,34,0.05), 0 26px 54px -30px rgba(76,55,207,0.4); }
        .use-card { transition: border-color 0.2s, box-shadow 0.2s; }
        @media (max-width: 620px) { .host-grid { grid-template-columns: 1fr !important; text-align: center; } .host-grid > div:first-child { max-width: 230px; margin: 0 auto; } }
      `}</style>

      <main className="aam">

        {/* ═══════════ SECTION 1 — HERO ═══════════ */}
        <section style={{ position: "relative", background: "radial-gradient(1200px 620px at 50% -12%, #2a2168 0%, #141033 52%, #0a0720 100%)", color: "#fff", padding: "clamp(28px,4vw,44px) 20px clamp(48px,6vw,68px)", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 18% 30%, rgba(124,108,245,0.22), transparent 42%), radial-gradient(circle at 84% 18%, rgba(155,89,240,0.18), transparent 40%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(124,108,245,0.16)", border: "1px solid rgba(155,140,247,0.42)", borderRadius: 999, padding: "9px 18px", fontSize: 12.5, fontWeight: 800, letterSpacing: "0.12em", color: "#cfc7fb" }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: "#34d399", animation: "agp-pulse 1.8s infinite" }} /> FREE LIVE AI AGENTS MASTERCLASS
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(38px,7.2vw,68px)", fontWeight: 800, lineHeight: 1.16, letterSpacing: "-0.005em", margin: "24px 0 0" }}>
              Stop Doing Everything Yourself.<br />
              <span style={{ fontSize: "clamp(26px,5vw,46px)", fontWeight: 800, display: "inline-block", marginTop: 20, lineHeight: 1.24 }}>Build AI Agents That <span className="grad-ink">Work For You 24/7 — Even While You Sleep.</span></span>
            </h1>
            <p style={{ fontSize: "clamp(18px,2.7vw,24px)", fontWeight: 500, color: "#d8d3ee", maxWidth: 680, margin: "28px auto 0", lineHeight: 1.65, letterSpacing: "0.005em" }}>
              Learn to build your <b style={{ color: "#fff", fontWeight: 700 }}>first AI Agent</b>, automate repetitive work and <b style={{ color: "#fff", fontWeight: 700 }}>save hours of manual work every week.</b>
            </p>
            <p style={{ fontSize: "clamp(17px,2.6vw,22px)", fontWeight: 800, color: "#fff", marginTop: 26, letterSpacing: "-0.01em", fontFamily: "var(--font-display)" }}>No Coding. No Technical Knowledge Required.</p>

            <div style={{ marginTop: 36 }}>
              <CTA big><HeroPriceLabel /></CTA>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px 22px", marginTop: 26, fontSize: 14.5, color: "#cbc6e6" }}>
              {["Beginner Friendly", "Practical Live Demo", "Build Your Own AI Agent"].map((t) => (
                <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><CheckIcon size={17} color="#34d399" /> {t}</span>
              ))}
            </div>

            <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 18px", marginTop: 26, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "13px 22px", fontSize: 14.5, fontWeight: 700 }}>
              <span>📅 {CLASS.date}</span><span>🕚 {CLASS.time}</span><span style={{ color: "#cbc6e6", fontWeight: 500 }}>💻 LIVE Online</span>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 1B — WHO IS THIS FOR (premium image cards) ═══════════ */}
        <section style={{ padding: "clamp(56px,8vw,96px) 20px", background: "#faf9fd" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <Eyebrow>Who it&apos;s for</Eyebrow>
                <h2 style={{ ...H2, marginTop: 16 }}>Who Is This Masterclass For?</h2>
                <p style={{ fontSize: 17, color: "#6b6580", marginTop: 14, maxWidth: 520, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>Stop doing repetitive work. Let AI do it for you.</p>
              </div>
            </Reveal>
            <div style={{ display: "grid", gap: 22, gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", marginTop: 46 }}>
              {[
                { img: "/avatars/women/woman-1.jpg", who: "Marketers & Content Creators", line: "Creating content & staying consistent takes hours." },
                { img: "/avatars/men/man-2.jpg", who: "Working Professionals", line: "Emails, PPTs, research & reports eat up your day." },
                { img: "/avatars/women/woman-6.webp", who: "Business Owners & Entrepreneurs", line: "Follow-ups, customers & daily tasks keep you constantly busy." },
                { img: "/avatars/women/woman-4.jpg", who: "Freelancers & Consultants", line: "Finding clients, proposals & client work take up your time." },
                { img: "/avatars/men/man-1.jpg", who: "Job Seekers & Career Professionals", line: "Finding jobs, applying & researching companies takes hours." },
                { img: "/avatars/men/man-4.jpg", who: "Students", line: "Research, presentations & projects consume hours of your time." },
              ].map((c, i) => (
                <Reveal key={c.who} delay={(i % 3) * 90}>
                  <div className="who-card" style={{ ...CARD, overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
                    <div style={{ position: "relative", aspectRatio: "16 / 11", overflow: "hidden", background: "linear-gradient(135deg,#efeafe,#e6e0fb)" }}>
                      <img src={c.img} alt={c.who} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.currentTarget.style.display = "none"); }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,16,40,0.16), transparent 55%)" }} />
                    </div>
                    <div style={{ padding: "22px 22px 24px", display: "flex", flexDirection: "column", gap: 7 }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.25, color: "#1a1530" }}>{c.who}</div>
                      <div style={{ fontSize: 15, color: "#6b6580", lineHeight: 1.5 }}>{c.line}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={100}>
              <div style={{ textAlign: "center", marginTop: 48 }}>
                <p style={{ fontSize: "clamp(18px,2.6vw,22px)", color: "#4a4460", fontWeight: 500 }}>If you want AI to automate all of this, then…</p>
                <p style={{ ...H2, fontSize: "clamp(24px,4vw,38px)", marginTop: 10 }}>This Masterclass Is <span className="grad-vio">Made For You.</span></p>
                <p style={{ fontSize: 13.5, fontWeight: 800, letterSpacing: "0.1em", color: "#6d5cf0", marginTop: 16 }}>NO CODING · NO TECHNICAL KNOWLEDGE REQUIRED</p>
                <div style={{ marginTop: 28 }}><CTA label="Reserve My Free Seat" /></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ SECTION 1C — WHAT YOU'LL LEARN IN 90 MINUTES (confidence) ═══════════ */}
        <section style={{ padding: "clamp(56px,8vw,90px) 20px", background: "#fff", borderTop: "1px solid #f0edf9" }}>
          <div style={{ maxWidth: 1040, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <Eyebrow>Your 90 minutes</Eyebrow>
                <h2 style={{ ...H2, marginTop: 16 }}>What You&apos;ll Learn In <span className="grad-vio">90 Minutes</span></h2>
                <p style={{ fontSize: 17, color: "#6b6580", marginTop: 14, maxWidth: 560, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>No jargon. No coding. Just watch, follow along, and build your first AI Agent with me — live.</p>
              </div>
            </Reveal>
            <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", marginTop: 46 }}>
              {[
                { step: "Part 1", emoji: "🧠", title: "The “Aha” Moment", head: "Finally understand what an AI Agent really is", body: "In plain English — no tech words. You'll see how an AI Agent is different from ChatGPT, and why it can actually do your work for you.", tag: "Zero background needed" },
                { step: "Part 2", emoji: "🛠️", title: "Build It With Me, Live", head: "Create your very first AI Agent — step by step", body: "You watch my screen and copy along. If you can fill a form and type a message, you can do this. No code, no setup headache.", tag: "100% beginner-friendly" },
                { step: "Part 3", emoji: "🚀", title: "Put It To Work", head: "Make your Agent run your daily tasks 24/7", body: "Learn how to point your Agent at real work — emails, follow-ups, research — so it keeps working even when you're not.", tag: "Walk away able to do it yourself" },
              ].map((c, i) => (
                <Reveal key={c.step} delay={i * 90}>
                  <div className="use-card" style={{ ...CARD, padding: "28px 26px", height: "100%", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg,#7c6cf5,#9b59f0)" }} />
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                      <div style={{ width: 52, height: 52, borderRadius: 15, background: "linear-gradient(135deg,#efeafe,#e0d8fb)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 27 }}>{c.emoji}</div>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 800, letterSpacing: "0.08em", color: "#b0a7ea", textTransform: "uppercase" }}>{c.step}</span>
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800, marginTop: 18, letterSpacing: "-0.01em", color: "#6d5cf0" }}>{c.title}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, marginTop: 6, letterSpacing: "-0.01em", lineHeight: 1.3, color: "#1a1530" }}>{c.head}</div>
                    <p style={{ fontSize: 14.5, color: "#6b6580", lineHeight: 1.6, marginTop: 10, flex: 1 }}>{c.body}</p>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 18, background: "#f1fbf6", border: "1px solid #c6f0da", borderRadius: 999, padding: "8px 14px", fontSize: 13, fontWeight: 700, color: "#128a5a", alignSelf: "flex-start" }}>
                      <CheckIcon size={16} color="#10b981" /> {c.tag}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={100}>
              <div style={{ textAlign: "center", marginTop: 44 }}>
                <p style={{ fontSize: "clamp(17px,2.4vw,20px)", fontWeight: 700, color: "#1a1530" }}>By the end, you won&apos;t just <i>understand</i> AI Agents — you&apos;ll have <span className="grad-vio">built one yourself.</span></p>
                <div style={{ marginTop: 24 }}><CTA label="Reserve My Free Seat" /></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ SECTION 1D — NOT TECHNICAL ═══════════ */}
        <section style={{ padding: "clamp(56px,8vw,90px) 20px", background: "#faf9fd" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <Reveal>
              <Eyebrow>No tech needed</Eyebrow>
              <h2 style={{ ...H2, marginTop: 16 }}>Worried It&apos;s Too Technical?<br /><span className="grad-vio">It&apos;s Not.</span></h2>
              <div style={{ maxWidth: 470, margin: "28px auto 0", borderRadius: 22, overflow: "hidden", ...CARD, lineHeight: 0 }}>
                <img src="/aiatwork/no-code.jpg" alt="An everyday, non-technical person at a simple desk building AI agents" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = "none"; }} />
              </div>
              <p style={{ fontSize: 17, color: "#4a4460", marginTop: 26, fontWeight: 500 }}>You don&apos;t need to be a:</p>
            </Reveal>
            <Reveal delay={60}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 20 }}>
                {["Programmer", "Developer", "AI Expert", "Automation Expert"].map((t) => (
                  <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fdf2f2", border: "1px solid #f7d3d3", borderRadius: 999, padding: "10px 18px", fontSize: 14.5, fontWeight: 600, color: "#2b2545" }}><CrossIcon size={18} /> {t}</span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div style={{ marginTop: 40 }}>
                <p style={{ fontSize: 17, color: "#6b6580" }}>If you can use ChatGPT,</p>
                <p style={{ ...H2, fontSize: "clamp(24px,4vw,36px)", marginTop: 8 }}>You Can Learn To <span className="grad-vio">Build AI Agents.</span></p>
                <p style={{ fontSize: 16, color: "#4a4460", marginTop: 14 }}>I&apos;ll show you exactly how, step-by-step.</p>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 16px", marginTop: 20, fontSize: 13, fontWeight: 800, letterSpacing: "0.06em", color: "#6d5cf0" }}>
                  <span>NO CODING</span><span style={{ color: "#d0c9f2" }}>•</span><span>BEGINNER FRIENDLY</span><span style={{ color: "#d0c9f2" }}>•</span><span>PRACTICAL</span>
                </div>
                <div style={{ marginTop: 28 }}><CTA label="Reserve My Free Seat" /></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ SECTION 3 — CHATGPT → AI AGENTS ═══════════ */}
        <section style={{ padding: "clamp(56px,8vw,90px) 20px", background: "#fff" }}>
          <div style={{ maxWidth: 920, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <Eyebrow>The difference</Eyebrow>
                <h2 style={{ ...H2, marginTop: 16 }}>ChatGPT Gives You Answers.<br /><span className="grad-vio">AI Agents Do The Work.</span></h2>
              </div>
            </Reveal>
            <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", marginTop: 46 }}>
              <Reveal>
                <div style={{ ...CARD, background: "#faf9fd", boxShadow: "none", padding: "30px 28px", height: "100%" }}>
                  <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.16em", color: "#a49ec0" }}>CHATGPT</div>
                  <div style={{ marginTop: 18, fontSize: 17.5, color: "#4a4460", lineHeight: 2 }}>You ask.<br />AI answers.<br /><b style={{ color: "#1a1530" }}>You do the work.</b></div>
                </div>
              </Reveal>
              <Reveal delay={90}>
                <div style={{ borderRadius: 22, background: "linear-gradient(160deg,#5a44e0,#4b37cf)", padding: "30px 28px", height: "100%", color: "#fff", boxShadow: "0 26px 54px -22px rgba(76,55,207,0.7)" }}>
                  <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.16em", color: "#c9c0fb" }}>AI AGENTS</div>
                  <div style={{ marginTop: 18, fontSize: 17.5, lineHeight: 2, color: "#e6e1fb" }}>You give it a task.<br />AI does all the steps.<br /><b style={{ color: "#fff" }}>The work gets done for you.</b></div>
                </div>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <div style={{ textAlign: "center", marginTop: 48, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
                <p style={{ ...H2, fontSize: "clamp(20px,2.9vw,26px)" }}>And yes — you can build this <span className="grad-vio">without coding.</span></p>
                <p style={{ fontSize: 16, color: "#6b6580", marginTop: 12, fontWeight: 500 }}>No programming. No technical background required.</p>
                <div style={{ marginTop: 28 }}><CTA label="Reserve My Free Seat" /></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ SECTION 4 — WORKS FOR YOU 24/7 ═══════════ */}
        <section style={{ position: "relative", padding: "clamp(56px,8vw,90px) 20px", background: "radial-gradient(1000px 520px at 50% -20%, #241c5a 0%, #130f30 55%, #0a0720 100%)", color: "#fff", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 80% 20%, rgba(124,108,245,0.18), transparent 45%)" }} />
          <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <Eyebrow light>Works 24/7</Eyebrow>
                <h2 style={{ ...H2, marginTop: 16 }}>Your AI Agents Keep Working<br /><span className="grad-ink">Even When You Stop.</span></h2>
              </div>
            </Reveal>
            <div style={{ marginTop: 46, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { time: "9:00 AM", you: "Working", agent: "Working", still: false },
                { time: "3:00 PM", you: "In a meeting", agent: "Working", still: false },
                { time: "8:00 PM", you: "Time with family", agent: "Working", still: false },
                { time: "2:00 AM", you: "Sleeping 😴", agent: "Still Working", still: true },
              ].map((r, i) => (
                <Reveal key={r.time} delay={i * 80}>
                  <div style={{ display: "grid", gridTemplateColumns: "82px 1fr 1fr", gap: 12, alignItems: "center", background: r.still ? "rgba(124,108,245,0.18)" : "rgba(255,255,255,0.045)", border: `1px solid ${r.still ? "rgba(155,140,247,0.55)" : "rgba(255,255,255,0.09)"}`, borderRadius: 16, padding: "17px 20px" }}>
                    <div style={{ fontWeight: 800, fontSize: 15, color: r.still ? "#cfc7fb" : "#e2ddf2", fontVariantNumeric: "tabular-nums" }}>{r.time}</div>
                    <div style={{ fontSize: 14.5, color: "#cbc6e6" }}><span style={{ opacity: 0.65 }}>👤 You:</span> {r.you}</div>
                    <div style={{ fontSize: 14.5, fontWeight: r.still ? 800 : 600, color: r.still ? "#b9aef7" : "#e2ddf2" }}><span style={{ opacity: 0.65, fontWeight: 400 }}>🤖 AI:</span> {r.agent}</div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={100}>
              <div style={{ textAlign: "center", marginTop: 46 }}>
                <p style={{ ...H2, fontSize: "clamp(23px,3.6vw,34px)" }}>Set It Up Once.<br /><span className="grad-ink">It Works For You 24/7.</span></p>
                <p style={{ fontSize: 16.5, color: "#b3adca", marginTop: 16, maxWidth: 480, marginLeft: "auto", marginRight: "auto", lineHeight: 1.55 }}>Your AI Agents do your repetitive work all day — and even while you sleep.</p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 22, background: "rgba(52,211,153,0.14)", border: "1px solid rgba(52,211,153,0.42)", borderRadius: 999, padding: "9px 18px", fontSize: 12.5, fontWeight: 800, letterSpacing: "0.08em", color: "#6ee7b7" }}>NO CODING REQUIRED</div>
                <div style={{ marginTop: 28 }}><CTA label="I Want To Learn This" /></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ SECTION 5 — WHAT AI CAN DO (marquee train) ═══════════ */}
        <section style={{ padding: "clamp(56px,8vw,90px) 0", background: "#fff", overflow: "hidden" }}>
          <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 20px" }}>
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <Eyebrow>What AI can do</Eyebrow>
                <h2 style={{ ...H2, marginTop: 16 }}>The Work AI Agents Can <span className="grad-vio">Do For You</span></h2>
                <p style={{ fontSize: 16.5, color: "#6b6580", marginTop: 12 }}>AI Agents can help you with:</p>
              </div>
            </Reveal>
          </div>

          {/* right-to-left scrolling train */}
          <div className="marquee" style={{ marginTop: 46, position: "relative" }}>
            <div className="marquee-track" style={{ display: "flex", gap: 20, width: "max-content" }}>
              {(() => {
                const items = [
                  { img: "/aiatwork/method-live.jpg", icon: "🔍", t: "Research", d: "Research topics, competitors, products or information for you." },
                  { img: "/aiatwork/bookmarks.jpg", icon: "📧", t: "Emails", d: "Draft, organise and handle repetitive email tasks." },
                  { img: "/aiatwork/community.jpg", icon: "🔄", t: "Follow-Ups", d: "Follow up with leads, customers or your team automatically." },
                  { img: "/aiatwork/achieve.jpg", icon: "📊", t: "Reports", d: "Collect data and prepare recurring reports for you." },
                  { img: "/aiatwork/no-code.jpg", icon: "✍️", t: "Content", d: "Create drafts and recurring content in your style." },
                  { img: "/aiatwork/audiences.jpg", icon: "📋", t: "Data", d: "Organise, clean and process your information." },
                  { img: "/aiatwork/live-session.jpg", icon: "📅", t: "Scheduling", d: "Book calls, set reminders and manage your calendar." },
                  { img: "/aiatwork/hero.jpg", icon: "⚙️", t: "Repetitive Tasks", d: "Handle the work you currently do manually, again and again." },
                ];
                return [...items, ...items].map((c, i) => (
                  <div key={i} style={{ ...CARD, width: 300, flexShrink: 0, overflow: "hidden" }} aria-hidden={i >= items.length}>
                    <div style={{ position: "relative", aspectRatio: "3 / 2", overflow: "hidden", background: "linear-gradient(135deg,#efeafe,#e6e0fb)" }}>
                      <img src={c.img} alt={c.t} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { (e.currentTarget.style.display = "none"); }} />
                      <div style={{ position: "absolute", top: 12, left: 12, width: 42, height: 42, borderRadius: 12, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: "0 6px 16px -6px rgba(76,55,207,0.4)" }}>{c.icon}</div>
                    </div>
                    <div style={{ padding: "20px 22px 24px" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 800, letterSpacing: "-0.01em", color: "#1a1530" }}>{c.t}</div>
                      <p style={{ fontSize: 14.5, color: "#6b6580", lineHeight: 1.55, marginTop: 7 }}>{c.d}</p>
                    </div>
                  </div>
                ));
              })()}
            </div>
            <div aria-hidden style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 60, background: "linear-gradient(90deg,#fff,transparent)", pointerEvents: "none" }} />
            <div aria-hidden style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 60, background: "linear-gradient(270deg,#fff,transparent)", pointerEvents: "none" }} />
          </div>

          <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 20px" }}>
            <Reveal delay={100}>
              <div style={{ textAlign: "center", marginTop: 50, borderTop: "1px solid #f0edf9", paddingTop: 44 }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,5vw,44px)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.08, color: "#1a1530" }}>You Tell AI What To Do.<br /><span className="grad-vio">AI Does The Work.</span></p>
                <p style={{ fontSize: 16, color: "#8a84a0", marginTop: 14, fontWeight: 600 }}>And you can build it without coding.</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ SECTION 5B — REAL AGENTS BY USE CASE ═══════════ */}
        <section style={{ padding: "clamp(56px,8vw,90px) 20px", background: "#faf9fd" }}>
          <div style={{ maxWidth: 1040, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <Eyebrow>What you can build</Eyebrow>
                <h2 style={{ ...H2, marginTop: 16 }}>AI Agents You Can <span className="grad-vio">Build</span></h2>
                <p style={{ fontSize: 16.5, color: "#6b6580", marginTop: 14, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>Simple examples of AI Agents you can build for everyday work. Pick the ones that save you the most time.</p>
              </div>
            </Reveal>
            <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", marginTop: 46 }}>
              {[
                { icon: "✍️", name: "Content Agent", tasks: ["Turn one idea into a week of posts", "Write emails, captions and scripts for you", "Make short posts from long content"] },
                { icon: "🔍", name: "Research Agent", tasks: ["Research any topic and give you the key points", "Compare products, tools or competitors", "Put all the information in one place"] },
                { icon: "🔄", name: "Follow-Up Agent", tasks: ["Follow up with leads who didn't reply", "Remind customers and your team", "So no lead is ever forgotten"] },
                { icon: "💬", name: "Reply Agent", tasks: ["Reply to new messages in seconds, 24/7", "Answer common questions for you", "Book the call for you"] },
                { icon: "📊", name: "Report Agent", tasks: ["Collect data from your tools", "Make the same report every week", "Send you a short summary on time"] },
                { icon: "🗂️", name: "Admin Agent", tasks: ["Organise and update your information", "Do repetitive data entry", "Keep your sheets and records tidy"] },
              ].map((a, i) => (
                <Reveal key={a.name} delay={(i % 3) * 80}>
                  <div className="use-card" style={{ ...CARD, padding: "26px 24px", height: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 13, background: "linear-gradient(135deg,#7c6cf5,#5a44e0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 23, flexShrink: 0 }}>{a.icon}</div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 700, letterSpacing: "-0.01em", color: "#1a1530" }}>{a.name}</div>
                    </div>
                    <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                      {a.tasks.map((t) => (
                        <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14.5, color: "#544e6c", lineHeight: 1.45 }}>
                          <span style={{ flexShrink: 0, marginTop: 2 }}><CheckIcon size={17} color="#34d399" /></span>{t}
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={100}>
              <div style={{ textAlign: "center", marginTop: 44 }}>
                <p style={{ fontSize: 16, color: "#6b6580", fontWeight: 500 }}>Once you learn how, you can build an agent for almost any repetitive task.</p>
                <div style={{ marginTop: 24 }}><CTA label="Reserve My Free Seat" /></div>
              </div>
            </Reveal>
          </div>
        </section>


        {/* ═══════════ SECTION 8 — SEE IT LIVE ═══════════ */}
        <section style={{ position: "relative", padding: "clamp(56px,8vw,90px) 20px", background: "radial-gradient(1000px 520px at 50% -18%, #241c5a 0%, #130f30 55%, #0a0720 100%)", color: "#fff", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 25%, rgba(124,108,245,0.16), transparent 42%)" }} />
          <div style={{ position: "relative", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <Reveal>
              <Eyebrow light>Live demo</Eyebrow>
              <h2 style={{ ...H2, marginTop: 16 }}>Watch Me Build An <span className="grad-ink">AI Agent Live</span><br />With No Coding.</h2>
              <p style={{ fontSize: 16.5, color: "#b3adca", marginTop: 18, lineHeight: 1.6 }}>You&apos;ll see exactly how an AI Agent takes a task and does the work — step by step.</p>
              <div style={{ maxWidth: 640, margin: "32px auto 0", borderRadius: 22, overflow: "hidden", border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 40px 90px -40px rgba(0,0,0,0.8)", lineHeight: 0 }}>
                <img src="/aiatwork/live-session.jpg" alt="A live online session showing an AI agent being built on screen, step by step" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = "none"; }} />
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginTop: 36 }}>
                {[
                  { t: "GIVE AI A TASK", done: false },
                  { t: "AI STARTS WORKING", done: false },
                  { t: "AI COMPLETES THE STEPS", done: false },
                  { t: "TASK GETS DONE ✓", done: true },
                ].map((s, i, arr) => (
                  <div key={s.t} style={{ width: "100%", maxWidth: 360 }}>
                    <div style={{ background: s.done ? "linear-gradient(135deg,#10b981,#34d399)" : "rgba(255,255,255,0.06)", border: `1px solid ${s.done ? "transparent" : "rgba(255,255,255,0.12)"}`, borderRadius: 13, padding: "14px 18px", fontWeight: 800, fontSize: 15, letterSpacing: "0.02em" }}>{s.t}</div>
                    {i < arr.length - 1 && <div style={{ color: "#9b8cf7", fontSize: 20, lineHeight: 1, margin: "2px 0" }}>↓</div>}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div style={{ marginTop: 42 }}>
                <p style={{ ...H2, fontSize: "clamp(20px,3.2vw,28px)" }}>No Coding. No Technical Background.<br />Just AI Working For You.</p>
                <div style={{ marginTop: 28 }}><CTA label="Save My Free Seat" /></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ SECTION 10 — TRUST / INSTRUCTOR ═══════════ */}
        <section style={{ padding: "clamp(56px,8vw,90px) 20px", background: "#fff" }}>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <Eyebrow>Your host</Eyebrow>
                <h2 style={{ ...H2, marginTop: 16 }}>Who&apos;s Teaching You</h2>
              </div>
            </Reveal>
            <Reveal delay={70}>
              <div style={{ display: "grid", gridTemplateColumns: "minmax(0,230px) 1fr", gap: 30, alignItems: "center", marginTop: 40, ...CARD, background: "#faf9fd", boxShadow: "none", padding: "clamp(22px,4vw,34px)" }} className="host-grid">
                <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid #ece8f7", lineHeight: 0, boxShadow: "0 20px 44px -24px rgba(76,55,207,0.4)" }}>
                  <img src="/rohan.png" alt="Rohan Mote — AI Growth Coach, High Performance Club" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = "none"; }} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(23px,3.4vw,30px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#1a1530" }}>Rohan Mote</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#6d5cf0", marginTop: 3 }}>AI Growth Coach · High Performance Club</div>
                  <p style={{ fontSize: 15.5, color: "#544e6c", lineHeight: 1.7, marginTop: 16 }}>
                    I build AI Agents every day to run real businesses. In this masterclass I&apos;ll show you exactly how, in simple language — so you can start building your own AI Agents from day one, even if you&apos;ve never written a line of code.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 22, textAlign: "center" }}>
                {[
                  { big: "10,000+", small: "People trained on practical AI" },
                  { big: "50+", small: "AI workshops & sessions run" },
                  { big: "Daily", small: "Building real AI agents in business" },
                ].map((s) => (
                  <div key={s.big} style={{ ...CARD, background: "#faf9fd", boxShadow: "none", padding: "22px 12px" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, color: "#6d5cf0", letterSpacing: "-0.02em" }}>{s.big}</div>
                    <div style={{ fontSize: 13, color: "#6b6580", marginTop: 6, lineHeight: 1.4 }}>{s.small}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 12, color: "#a49ec0", textAlign: "center", marginTop: 14 }}>Figures reflect High Performance Club&apos;s AI training to date.</p>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ SECTION 11 — FINAL REGISTRATION ═══════════ */}
        <section style={{ position: "relative", padding: "clamp(64px,9vw,110px) 20px", background: "radial-gradient(1000px 540px at 50% 0%, #2a2168 0%, #150f38 55%, #0a0720 100%)", color: "#fff", textAlign: "center", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 15% 25%, rgba(124,108,245,0.2), transparent 40%), radial-gradient(circle at 85% 20%, rgba(155,89,240,0.16), transparent 40%)" }} />
          <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
            <Reveal>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(124,108,245,0.16)", border: "1px solid rgba(155,140,247,0.42)", borderRadius: 999, padding: "11px 22px", fontSize: 15, fontWeight: 800, letterSpacing: "0.08em", color: "#cfc7fb" }}>
                <span style={{ width: 9, height: 9, borderRadius: 999, background: "#34d399", animation: "agp-pulse 1.8s infinite" }} /> FREE LIVE AI AGENTS MASTERCLASS
              </div>
              <h2 style={{ ...H2, marginTop: 22 }}>Stop Doing Everything Yourself.<br /><span className="grad-ink">Build AI Agents That Work For You 24/7.</span></h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 20, fontSize: "clamp(16px,2.3vw,19px)", color: "#c6c1de", fontWeight: 500 }}>
                <span>Do your repetitive work.</span>
                <span>Save hours every week.</span>
                <span>Keep working even while you&apos;re sleeping.</span>
              </div>
              <p style={{ fontSize: "clamp(18px,2.8vw,24px)", fontWeight: 800, color: "#fff", marginTop: 18, letterSpacing: "-0.01em", fontFamily: "var(--font-display)" }}>And Build It All Without Coding.</p>
            </Reveal>
            <Reveal delay={80}>
              <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 20px", marginTop: 28, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "15px 24px", fontSize: 15.5, fontWeight: 700 }}>
                <span>📅 {CLASS.date}</span><span>⏰ {CLASS.time}</span><span style={{ color: "#c6c1de", fontWeight: 500 }}>💻 LIVE Online</span>
              </div>
              <div style={{ marginTop: 30 }}><CTA big label="Reserve My Free Seat" /></div>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 20px", marginTop: 24, fontSize: 14.5, color: "#cbc6e6" }}>
                {["Beginner Friendly", "No Coding Required", "Live Demo"].map((t) => (
                  <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><CheckIcon size={17} color="#34d399" /> {t}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ FINAL STRIP ═══════════ */}
        <section style={{ padding: "clamp(44px,6vw,68px) 20px", background: "linear-gradient(120deg,#5a44e0,#7c6cf5)", color: "#fff", textAlign: "center" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,4vw,34px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
              Less Repetitive Work.<br />More Time For You.<br /><span style={{ color: "#d8d2fb" }}>No Coding Required.</span>
            </p>
          </div>
        </section>

        <div style={{ textAlign: "center", padding: "24px 20px", background: "#0a0720", color: "#57506e", fontSize: 12.5 }}>
          © {new Date().getFullYear()} High Performance Club · {CLASS.name}
        </div>

        {/* spacer so the fixed sticky CTA never covers the footer */}
        <div style={{ height: 84 }} />
      </main>

      <StickyCTA />
      <LiveToast />
      <RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </RegisterCtx.Provider>
  );
}
