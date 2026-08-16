"use client";
import { useState, useEffect, useRef, createContext, useContext } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// AI Career Growth Masterclass — free live masterclass for working professionals.
// Angle: use AI + your current skills to grow in your career,
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

// ─── Countdown to the masterclass (PLACEHOLDER date — update CLASS_TS) ───────────
// TODO: set to the real masterclass date/time. 31 Aug 2026, 11:00 AM IST = 05:30 UTC.
const CLASS_TS = Date.UTC(2026, 7, 31, 5, 30, 0);
function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = now === null ? null : Math.max(0, CLASS_TS - now);
  if (diff === null) return null;
  const s = Math.floor(diff / 1000);
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 };
}
function StickyCountdown() {
  const t = useCountdown();
  const units = [{ v: t?.days, l: "Days" }, { v: t?.hours, l: "Hrs" }, { v: t?.minutes, l: "Min" }, { v: t?.seconds, l: "Sec" }];
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {units.map((u) => (
        <div key={u.l} style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 38, background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.28)", borderRadius: 9, padding: "5px 4px" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(15px,4vw,19px)", fontWeight: 800, lineHeight: 1, color: "#fff", fontVariantNumeric: "tabular-nums" }}>{String(u.v ?? 0).padStart(2, "0")}</span>
          <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "#dffaee", marginTop: 3 }}>{u.l}</span>
        </div>
      ))}
    </div>
  );
}

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
    <button onClick={register} className="btn-primary inline-flex items-center justify-center gap-2.5 rounded-full text-white w-full sm:w-auto"
      style={{ fontSize: big ? "clamp(17px,4.4vw,22px)" : "clamp(16px,4vw,19px)", fontWeight: 800, padding: big ? "clamp(16px,4vw,22px) clamp(28px,7vw,54px)" : "clamp(14px,3.5vw,19px) clamp(24px,6vw,48px)", border: "none", cursor: "pointer", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
      <BoltIcon size={big ? 21 : 19} />
      <span>{children ?? label}</span>
      <ArrowIcon size={big ? 20 : 18} />
    </button>
  );
}
function HeroPriceLabel() {
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", gap: 6, whiteSpace: "nowrap" }}>
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
    <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 95, transform: show ? "translateY(0)" : "translateY(130%)", transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)", background: "linear-gradient(120deg,#0c6a4d,#12a374)", padding: "10px 12px calc(10px + env(safe-area-inset-bottom))", boxShadow: "0 -12px 34px -16px rgba(14,124,90,0.6)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, flexShrink: 0 }}>
          <span style={{ fontSize: "clamp(9px,2.4vw,10.5px)", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: "#dffaee" }}>Starts In</span>
          <StickyCountdown />
        </div>
        <button onClick={register} className="inline-flex items-center justify-center gap-1.5" style={{ background: "#fff", color: "#0c6a4d", borderRadius: 999, padding: "13px clamp(14px,4vw,24px)", border: "none", cursor: "pointer", fontFamily: "var(--font-display)", fontSize: "clamp(14px,3.6vw,18px)", fontWeight: 900, letterSpacing: "-0.01em", whiteSpace: "nowrap", flexShrink: 1, minWidth: 0, boxShadow: "0 10px 26px -12px rgba(0,0,0,0.5)" }}>
          <BoltIcon size={18} color="#0e7c5a" /> Register Free
        </button>
      </div>
    </div>
  );
}

// ─── FAQ accordion item ─────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "#fff", border: "1px solid #e4e7df", borderRadius: 16, overflow: "hidden", boxShadow: open ? "0 12px 30px -18px rgba(14,124,90,0.3)" : "0 1px 2px rgba(15,27,45,0.03)", transition: "box-shadow 0.2s" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "18px 20px", textAlign: "left", background: "transparent", border: "none", cursor: "pointer", fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "#12160f", letterSpacing: "-0.01em" }}>
        {q}
        <span style={{ flexShrink: 0, fontSize: 24, fontWeight: 400, color: "#0e7c5a", lineHeight: 1, transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
      </button>
      {open && <div style={{ padding: "0 20px 20px", fontSize: 15.5, color: "#4b5245", lineHeight: 1.65 }}>{a}</div>}
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
        @media (max-width: 800px) { .about-grid { grid-template-columns: 1fr !important; text-align: center; } .about-grid > div:first-child { max-width: 460px; margin: 0 auto; } .host-grid { grid-template-columns: 1fr !important; text-align: center; } .host-grid > div:first-child { max-width: 260px; margin: 0 auto; } }
        /* centered card grid: orphan last-row cards center instead of left-align */
        .cgrid { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; }
        .cgrid > * { flex: 1 1 300px; max-width: 340px; }
        @media (max-width: 680px) { .cgrid > * { flex-basis: 100%; max-width: 460px; } }
      `}</style>

      <main className="acm">

        {/* ═══════════ HERO ═══════════ */}
        <section style={{ position: "relative", background: "radial-gradient(1200px 620px at 50% -12%, #16283f 0%, #0f1b2d 55%, #0a1320 100%)", color: "#fff", padding: "clamp(30px,4vw,48px) 20px clamp(48px,6vw,70px)", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 18% 25%, rgba(18,163,116,0.2), transparent 42%), radial-gradient(circle at 84% 15%, rgba(18,163,116,0.14), transparent 40%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(18,163,116,0.16)", border: "1px solid rgba(94,224,176,0.4)", borderRadius: 999, padding: "8px 15px", fontSize: "clamp(10px,2.7vw,12.5px)", fontWeight: 800, letterSpacing: "0.08em", color: "#a7ecd0", whiteSpace: "nowrap", maxWidth: "94vw" }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: "#34d399", animation: "acm-pulse 1.8s infinite", flexShrink: 0 }} /> AI CAREER GROWTH MASTERCLASS · FREE · LIVE
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,7vw,64px)", fontWeight: 800, lineHeight: 1.14, letterSpacing: "-0.035em", margin: "24px 0 0" }}>
              Use AI To Grow <span className="grad-g">5X Faster</span><br />
              In Your Career.
            </h1>
            <p style={{ fontSize: "clamp(18px,2.6vw,23px)", fontWeight: 500, color: "#cfd8dd", maxWidth: 660, margin: "26px auto 0", lineHeight: 1.55 }}>
              A free live masterclass for <b style={{ color: "#fff", fontWeight: 700 }}>working professionals</b> — learn how to combine AI + your current skills to earn a <b style={{ color: "#5fe0b0", fontWeight: 700 }}>high paying salary</b> and get you promoted.
            </p>
            <p style={{ fontSize: "clamp(16px,2.2vw,19px)", fontWeight: 700, color: "#fff", marginTop: 22, letterSpacing: "-0.01em", fontFamily: "var(--font-display)" }}>Just 90 minutes. No 50+ random AI tools. Learn what actually helps your career grow.</p>

            <div style={{ marginTop: 34 }}><CTA big><HeroPriceLabel /></CTA></div>

            {/* social proof — avatars + count */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "10px 14px", marginTop: 28 }}>
              <div style={{ display: "flex", flexShrink: 0 }}>
                {["/avatars/men/man-2.jpg", "/avatars/women/woman-1.jpg", "/avatars/men/man-1.jpg", "/avatars/women/woman-4.jpg", "/avatars/men/man-4.jpg"].map((src, i) => (
                  <img key={i} src={src} alt="" loading="lazy" style={{ width: 36, height: 36, borderRadius: 999, objectFit: "cover", border: "2px solid #0f1b2d", marginLeft: i === 0 ? 0 : -10 }} onError={(e) => { (e.currentTarget.style.display = "none"); }} />
                ))}
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ display: "flex", gap: 2, color: "#fbbf24", fontSize: 15, lineHeight: 1 }}>★★★★★</div>
                <p style={{ fontSize: 13.5, color: "#cfd8dd", marginTop: 3, margin: 0 }}><strong style={{ color: "#fff", fontWeight: 700 }}>3,000+ professionals</strong> already growing with AI</p>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: 22 }}>
              <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 18px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "13px 22px", fontSize: 14.5, fontWeight: 700 }}>
                <span>📅 {CLASS.date}</span><span>🕚 {CLASS.time}</span><span style={{ color: "#cfd8dd", fontWeight: 500 }}>💻 {CLASS.duration}</span>
              </div>
            </div>

            <div style={{ maxWidth: 760, margin: "40px auto 0", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 40px 90px -40px rgba(0,0,0,0.8)", lineHeight: 0 }}>
              <img src="/ai-career/pros-group.png" alt="Indian working professionals learning to use AI to grow in their careers" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} onError={(e) => { const w = e.currentTarget.parentElement as HTMLElement; if (w) w.style.display = "none"; }} />
            </div>
          </div>
        </section>

        {/* ═══════════ STAT BAND ═══════════ */}
        <section style={{ padding: "clamp(28px,4vw,44px) 20px", background: "linear-gradient(120deg,#0e7c5a,#12a374)", color: "#fff" }}>
          <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 20, textAlign: "center" }}>
            {[
              { big: "56%", small: "higher salary for professionals with AI skills" },
              { big: "66%", small: "chances of layoffs in the next 6 months" },
              { big: "10+", small: "hours a week you can save by using AI at work" },
              { big: "3,000+", small: "professionals already growing with AI" },
            ].map((s) => (
              <div key={s.big}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px,5vw,42px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>{s.big}</div>
                <div style={{ fontSize: 13.5, color: "#dffaee", marginTop: 8, lineHeight: 1.4 }}>{s.small}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════ WHAT THIS IS ABOUT ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#fff" }}>
          <div style={{ maxWidth: 940, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(28px,5vw,52px)", alignItems: "center" }} className="about-grid">
              <Reveal>
                <div style={{ borderRadius: 22, overflow: "hidden", ...CARD, lineHeight: 0 }}>
                  <img src="/ai-career/worried-pro.png" alt="A worried professional anxious about their job as AI reshapes the workplace" style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", aspectRatio: "4 / 3" }} onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = "none"; }} />
                </div>
              </Reveal>
              <div>
                <Reveal>
                  <Eyebrow>What this masterclass is about</Eyebrow>
                  <h2 style={{ ...H2, marginTop: 16 }}>AI Is Not Coming For Your Job.<br /><span className="grad-green">It&apos;s Coming For Whoever Does Not Use It.</span></h2>
                  <p style={{ fontSize: "clamp(16px,2.2vw,18px)", color: "#4b5245", lineHeight: 1.65, marginTop: 18 }}>
                    Every week there is news of layoffs. But the same companies are paying <b style={{ color: "#0e7c5a" }}>up to 56% more</b> for people who know how to work with AI. This masterclass shows you exactly how to get there, using AI + your current skills.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ WHO IT'S FOR ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#f6f7f4" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <Reveal>
              <Eyebrow>Who it&apos;s for</Eyebrow>
              <h2 style={{ ...H2, marginTop: 16 }}>Made For Working Professionals Who Want Their Next Career Leap</h2>
              <p style={{ fontSize: 16.5, color: "#6b7266", marginTop: 12 }}>Whether you have 2 years of experience or 20 — this is for you if you want to stay ahead.</p>
            </Reveal>
            <Reveal delay={60}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 30 }}>
                {["💻 IT & Software Professionals", "📊 Analysts & Consultants", "📈 Marketing & Sales", "🧑‍💼 Managers & Team Leads", "🎯 Job Seekers", "🚀 Anyone who wants to use AI to grow, not get left behind"].map((t) => (
                  <span key={t} style={{ background: "#fff", border: "1px solid #e4e7df", borderRadius: 999, padding: "11px 20px", fontSize: 15, fontWeight: 600, color: "#1a1f16", boxShadow: "0 2px 8px rgba(15,27,45,0.04)" }}>{t}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ WHAT YOU'LL LEARN IN 90 MINUTES ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#fff" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <Eyebrow>Your 90 minutes</Eyebrow>
                <h2 style={{ ...H2, marginTop: 16 }}>What You Will Learn In <span className="grad-green">90 Minutes</span></h2>
              </div>
            </Reveal>
            <div className="cgrid" style={{ marginTop: 44 }}>
              {[
                { n: "01", t: "See How AI Is Changing Your Job", d: "See clearly which roles and tasks AI is replacing right now — and where the real AI opportunity is." },
                { n: "02", t: "The AI Skills That Pay 5X More", d: "The specific AI skills that get professionals hired, retained and promoted — with a real salary jump." },
                { n: "03", t: "Only Top AI Tools For Your Role", d: "Skip the 100+ tools launching every week. Learn only the handful that matter for your exact profession." },
                { n: "04", t: "AI + Your Current Skills Opportunity", d: "Combine AI with the skills and experience you already have — the real key to standing out." },
                { n: "05", t: "Your 90-Day Roadmap", d: "A clear, step-by-step way to become the AI-skilled professional your company can not replace." },
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
                Most AI sessions teach you random AI tools you will forget next week. This one is built around <b style={{ color: "#fff" }}>your career</b> — combining AI with your current skills, so <b style={{ color: "#5fe0b0" }}>you</b> become irreplaceable.
              </p>
              <div style={{ maxWidth: 860, margin: "34px auto 0", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 30px 70px -40px rgba(0,0,0,0.8)", lineHeight: 0 }}>
                <img src="/ai-career/table.png" alt="Before: too many AI tools and confusion. After: clarity, focus and career growth with the exact tools for your role." style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = "none"; }} />
              </div>
            </Reveal>
            <Reveal delay={70}>
              <div className="cgrid" style={{ marginTop: 36, textAlign: "left" }}>
                {[
                  "Focused only on your career — not random tools",
                  "AI matched to your exact profession",
                  "AI + your current skills, not AI alone",
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
          <div style={{ maxWidth: 980, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <Eyebrow>What you will walk away with</Eyebrow>
                <h2 style={{ ...H2, marginTop: 16 }}>By The End Of The Masterclass, You Will Know…</h2>
              </div>
            </Reveal>
            <div className="cgrid" style={{ marginTop: 40 }}>
              {[
                { big: "AI Career Score", d: "See exactly where you stand — and what's holding you back." },
                { big: "5 Career Skills", d: "Build the skills that make you irreplaceable." },
                { big: "Top 3 AI Tools", d: "Master the tools that help you grow in your career." },
                { big: "5+ AI Workflows", d: "Know where AI can fit into your working day." },
                { big: "90-Day Roadmap", d: "Your step-by-step plan to become an AI-powered professional." },
              ].map((c, i) => (
                <Reveal key={c.big} delay={(i % 3) * 70}>
                  <div className="card-hover" style={{ ...CARD, padding: "26px 22px", height: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <CheckIcon size={22} color="#12a374" />
                      <span style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800, letterSpacing: "-0.01em", color: "#0e7c5a" }}>{c.big}</span>
                    </div>
                    <p style={{ fontSize: 14.5, color: "#4b5245", lineHeight: 1.55, margin: 0 }}>{c.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <div style={{ textAlign: "center", marginTop: 40 }}><CTA label="Reserve My Free Seat" /></div>
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
              <div style={{ display: "grid", gridTemplateColumns: "minmax(0,320px) 1fr", gap: 40, alignItems: "center", marginTop: 40, ...CARD, background: "#f6f7f4", boxShadow: "none", padding: "clamp(24px,4vw,40px)" }} className="host-grid">
                <div style={{ borderRadius: 22, overflow: "hidden", border: "1px solid #e4e7df", lineHeight: 0, boxShadow: "0 24px 50px -22px rgba(14,124,90,0.45)" }}>
                  <img src="/ai-career/me.png" alt="Rohan Mote — AI Career Coach, High Performance Club" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = "none"; }} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(25px,3.8vw,34px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#12160f" }}>Rohan Mote</div>
                  <div style={{ fontSize: 15.5, fontWeight: 700, color: "#0e7c5a", marginTop: 4 }}>AI Career Coach · Founder, High Performance Club</div>
                  <p style={{ fontSize: 15.5, color: "#4b5245", lineHeight: 1.75, marginTop: 16 }}>
                    I have helped <b style={{ color: "#12160f" }}>10,000+ professionals</b> use AI in their day-to-day work — and I build AI systems for real businesses every single day. I have seen exactly what separates the people who get ahead in the AI era from the ones who get left behind.
                  </p>
                  <p style={{ fontSize: 15.5, color: "#4b5245", lineHeight: 1.75, marginTop: 14 }}>
                    In this masterclass I will show you that difference — for <b style={{ color: "#12160f" }}>your exact profession</b> — so you leave knowing exactly what to do next to grow massively in your career.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 20, textAlign: "center" }}>
                {[
                  { big: "10,000+", small: "Professionals trained on practical AI" },
                  { big: "56%", small: "The salary premium AI skills now earn" },
                  { big: "Daily", small: "Building real AI systems in business" },
                ].map((s) => (
                  <div key={s.big} style={{ ...CARD, background: "#f6f7f4", boxShadow: "none", padding: "22px 12px" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, color: "#0e7c5a", letterSpacing: "-0.02em" }}>{s.big}</div>
                    <div style={{ fontSize: 13, color: "#6b7266", marginTop: 6, lineHeight: 1.4 }}>{s.small}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ TESTIMONIALS ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#f6f7f4" }}>
          <div style={{ maxWidth: 1040, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <Eyebrow>Real results</Eyebrow>
                <h2 style={{ ...H2, marginTop: 16 }}>Professionals Already <span className="grad-green">Growing With AI</span></h2>
                <p style={{ fontSize: 16.5, color: "#6b7266", marginTop: 14, maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>Real, measurable outcomes from people who applied what they learned.</p>
              </div>
            </Reveal>
            <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", marginTop: 46 }}>
              {[
                { img: "/avatars/men/man-2.jpg", name: "Rohit Deshpande", role: "Business Analyst", quote: "I now save around 45 minutes preparing my weekly reports — AI does the first draft, I just review it." },
                { img: "/avatars/women/woman-1.jpg", name: "Ananya Krishnan", role: "Marketing Manager", quote: "I reduced my presentation prep from 3 hours to around 1 hour. That's the biggest time-saver I've found." },
                { img: "/avatars/men/man-1.jpg", name: "Arjun Verma", role: "Project Lead", quote: "I started using 4 AI workflows every week for status updates, meeting notes and follow-ups. My team noticed." },
                { img: "/avatars/women/woman-4.jpg", name: "Meera Nair", role: "Consultant", quote: "I used AI to prepare for 5 interview rounds — mock answers, research, positioning. I walked in far more confident." },
                { img: "/avatars/men/man-4.jpg", name: "Sahil Khanna", role: "Software Engineer", quote: "AI now handles the boilerplate parts of my work. I ship roughly 2x faster and spend my time on the harder problems." },
                { img: "/avatars/women/woman-6.webp", name: "Kavya Reddy", role: "HR Professional", quote: "I automated 3 repetitive tasks I did daily. That's easily 5+ hours back every single week." },
              ].map((t, i) => (
                <Reveal key={t.name} delay={(i % 3) * 90}>
                  <div style={{ ...CARD, padding: "26px 24px", height: "100%", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", gap: 3, color: "#fbbf24", fontSize: 16 }}>{"★★★★★"}</div>
                    <p style={{ fontSize: 15.5, color: "#2b3327", lineHeight: 1.65, marginTop: 14, flex: 1 }}>“{t.quote}”</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20, paddingTop: 18, borderTop: "1px solid #eceee9" }}>
                      <img src={t.img} alt={t.name} loading="lazy" style={{ width: 46, height: 46, borderRadius: 999, objectFit: "cover", flexShrink: 0, border: "1px solid #e4e7df" }} onError={(e) => { (e.currentTarget.style.display = "none"); }} />
                      <div>
                        <div style={{ fontFamily: "var(--font-display)", fontSize: 15.5, fontWeight: 700, color: "#12160f" }}>{t.name}</div>
                        <div style={{ fontSize: 13, color: "#6b7266" }}>{t.role}</div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ FAQ ═══════════ */}
        <section style={{ padding: "clamp(48px,7vw,80px) 20px", background: "#fff" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center" }}>
                <Eyebrow>Questions</Eyebrow>
                <h2 style={{ ...H2, marginTop: 16 }}>Frequently Asked <span className="grad-green">Questions</span></h2>
              </div>
            </Reveal>
            <Reveal delay={70}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 40 }}>
                {[
                  { q: "Do I need any AI experience?", a: "No. You can start even if you have used ChatGPT fewer than 5 times. This masterclass is built for working professionals, not AI experts." },
                  { q: "How long is the masterclass?", a: "90 minutes, live. That is it — no long, dragging session." },
                  { q: "How many tools will you cover?", a: "You will learn how to identify the 3–5 tools most relevant to your role — rather than chase dozens of apps you will forget next week." },
                  { q: "Will this help me get promoted?", a: "The masterclass cannot guarantee a promotion. What it does is show you how to build and demonstrate AI-enhanced skills that make you more valuable and better positioned for career opportunities." },
                  { q: "Is it really free?", a: "Yes — the 90-minute live masterclass is completely free. Just register and show up live." },
                  { q: "What if I cannot attend live?", a: "Register anyway. If you are registered, we will try to share access — but the live session is where you get the most value, so block the time if you can." },
                  { q: "How do I join after registering?", a: "Your joining link and reminders are sent on WhatsApp and email right after you register. Just click the link at the start time." },
                ].map((f) => <FAQItem key={f.q} q={f.q} a={f.a} />)}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div style={{ textAlign: "center", marginTop: 40 }}><CTA label="Reserve My Free Seat" /></div>
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
              <h2 style={{ ...H2, marginTop: 22 }}>Do Not Compete With AI.<br /><span className="grad-g">Grow With It.</span></h2>
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
