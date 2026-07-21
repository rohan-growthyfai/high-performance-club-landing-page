"use client";
import { useState, useEffect, useRef, createContext, useContext } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// EDIT THIS when the webinar date is set. Everything on the page reads from here.
// ═════════════════════════════════════════════════════════════════════════════
const WEBINAR = {
  title: "Stop Starting Over With Weight Loss",
  dateSet: false,                  // set true once you have a real date
  dateLabel: "This Sunday",        // e.g. "Sunday, 3 August"
  timeLabel: "7:00 PM IST",        // e.g. "7:00 PM IST"
  duration: "90 minutes",
  platformLabel: "Live on Zoom",
  seatsLine: "100% free · Limited seats",
};
const WHEN_LINE = WEBINAR.dateSet
  ? `${WEBINAR.dateLabel} · ${WEBINAR.timeLabel} · ${WEBINAR.duration}`
  : `Next session ${WEBINAR.dateLabel} · ${WEBINAR.timeLabel} · ${WEBINAR.duration}`;

// ─── Register modal context ─────────────────────────────────────────────────────
const RegisterCtx = createContext<() => void>(() => {});
function useRegister() { return useContext(RegisterCtx); }

// ─── Icons ────────────────────────────────────────────────────────────────────
function TicketIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="rgba(255,255,255,0.18)" />
      <path d="M7 9h10M7 12h6M7 15h8" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Star() {
  return <svg width="14" height="14" viewBox="0 0 20 20" fill="#f59e0b" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
}

// ─── CTA button ───────────────────────────────────────────────────────────────
function CTA({ label = "Save My Free Seat", sub }: { label?: string; sub?: string }) {
  const register = useRegister();
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={register}
        className="btn-primary inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-black text-white"
        style={{ fontSize: 19, boxShadow: "0 10px 30px rgba(212,160,23,0.45)", letterSpacing: "-0.01em", border: "none", cursor: "pointer" }}>
        <TicketIcon size={20} />{label}
      </button>
      {sub && <p style={{ fontSize: 13, color: "#71717a", textAlign: "center" }}>{sub}</p>}
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: "#e2dfd6", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left font-bold bg-white hover:bg-stone-50 transition-colors" style={{ color: "#18181b", fontSize: 15 }}>
        {q}
        <span className="shrink-0 text-2xl font-light" style={{ color: "#a8790d", display: "inline-block", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
      </button>
      {open && <div className="px-5 pb-5 leading-relaxed bg-white" style={{ fontSize: 14, color: "#52525b" }}>{a}</div>}
    </div>
  );
}

// ─── Register modal ─────────────────────────────────────────────────────────────
function RegisterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.includes("@") || whatsapp.replace(/\D/g, "").length < 8) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    if (typeof window !== "undefined" && typeof window.fbq === "function")
      window.fbq("track", "CompleteRegistration", { content_name: "Weight Habits Webinar" });
    try {
      await fetch("/api/webinar-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), whatsapp: whatsapp.trim() }),
      });
      setStatus("done");
    } catch {
      setStatus("done");
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[110]" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }} onClick={onClose} />
      <div className="fixed inset-0 z-[111] flex items-center justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-sm rounded-3xl overflow-hidden" onClick={e => e.stopPropagation()} style={{ background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.22)", animation: "duc-fadein 0.35s ease" }}>
          <div className="relative px-6 pt-7 pb-5 text-center" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)" }}>
            <button onClick={onClose} className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full cursor-pointer" style={{ background: "rgba(255,255,255,0.2)", border: "none" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>
            </button>
            <p className="text-3xl mb-2">🎟️</p>
            <h2 className="text-white font-black leading-snug" style={{ fontSize: 18 }}>
              {status === "done" ? "You're in! See you live 🎉" : "Save your free seat"}
            </h2>
          </div>

          {status === "done" ? (
            <div className="px-6 py-7 text-center">
              <p style={{ fontSize: 15, color: "#3f3f46", lineHeight: 1.7, marginBottom: 14 }}>
                Your seat is saved. 🎉
              </p>
              <div className="rounded-xl p-4 mb-4 text-center" style={{ background: "rgba(212,160,23,0.06)", border: "1px solid rgba(212,160,23,0.2)" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#9a6b0a", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>When</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#18181b" }}>{WHEN_LINE}</p>
                <p style={{ fontSize: 12.5, color: "#71717a", marginTop: 4 }}>We&apos;ll send the join link on WhatsApp.</p>
              </div>
              <div className="rounded-xl p-4 mb-5 text-left" style={{ background: "#fafafa", border: "1px solid #e4e4e7" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#18181b", marginBottom: 6 }}>🎁 Try this today:</p>
                <p style={{ fontSize: 13.5, color: "#52525b", lineHeight: 1.6 }}>Before your next snack, stop and take 3 slow breaths. That&apos;s your first tiny habit.</p>
              </div>
              <button onClick={onClose} className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full font-black text-white btn-primary" style={{ fontSize: 15, border: "none", cursor: "pointer" }}>
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="px-6 py-5">
              <div className="rounded-lg px-3 py-2 mb-4 text-center" style={{ background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.2)" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#9a6b0a" }}>🗓 {WHEN_LINE}</span>
              </div>
              <p style={{ fontSize: 13.5, color: "#52525b", lineHeight: 1.6, marginBottom: 16, textAlign: "center" }}>
                Add your details. We&apos;ll send the join link on WhatsApp.
              </p>
              <div className="flex flex-col gap-3">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" autoComplete="name" style={inputStyle} />
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" type="email" autoComplete="email" style={inputStyle} />
                <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="WhatsApp number" type="tel" inputMode="tel" autoComplete="tel" style={inputStyle} />
              </div>
              {status === "error" && (
                <p style={{ fontSize: 12.5, color: "#dc2626", marginTop: 10, textAlign: "center" }}>
                  Please add your name, a valid email and WhatsApp number.
                </p>
              )}
              <button type="submit" disabled={status === "loading"} className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full font-black text-white btn-primary mt-4" style={{ fontSize: 16, boxShadow: "0 6px 20px rgba(212,160,23,0.4)", border: "none", cursor: status === "loading" ? "wait" : "pointer", opacity: status === "loading" ? 0.7 : 1 }}>
                <TicketIcon size={18} />{status === "loading" ? "Saving…" : "Save My Free Seat →"}
              </button>
              <p style={{ fontSize: 12, color: "#a1a1aa", marginTop: 8, textAlign: "center" }}>Free · No spam · Leave anytime</p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "13px 16px", borderRadius: 12, border: "1.5px solid #e4e4e7",
  fontSize: 15, color: "#18181b", outline: "none", background: "#fafafa",
};

// ─── Sticky bottom CTA ──────────────────────────────────────────────────────────
function StickyBottomCTA() {
  const register = useRegister();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const f = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", f, { passive: true }); f();
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div className={`fixed bottom-0 inset-x-0 z-50 transition-all duration-300 ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}>
      <div className="px-4 pb-3 pt-2 md:hidden" style={{ background: "linear-gradient(to top,#faf8f3 70%,transparent)", backdropFilter: "blur(8px)" }}>
        <button onClick={register} className="w-full flex items-center justify-between gap-3 rounded-2xl px-5 py-3" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)", boxShadow: "0 4px 20px rgba(212,160,23,0.4)", border: "none", cursor: "pointer" }}>
          <div className="text-left"><p className="text-white font-black text-sm leading-tight">Save My Free Seat →</p><p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.85)" }}>{WHEN_LINE}</p></div>
          <div className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}><TicketIcon size={15} /><span className="text-white font-bold text-sm">Join</span></div>
        </button>
      </div>
      <div className="hidden md:block px-6 pb-4 pt-3" style={{ background: "linear-gradient(to top,#faf8f3 70%,transparent)", backdropFilter: "blur(8px)" }}>
        <div className="max-w-lg mx-auto">
          <button onClick={register} className="w-full flex items-center justify-between gap-4 rounded-2xl px-6 py-3.5" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)", boxShadow: "0 4px 20px rgba(212,160,23,0.4)", border: "none", cursor: "pointer" }}>
            <div className="text-left"><p className="text-white font-black text-sm leading-tight">Save My Free Seat →</p><p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.85)" }}>{WHEN_LINE} · Free</p></div>
            <div className="flex items-center gap-2 rounded-xl px-4 py-2 shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}><TicketIcon size={16} /><span className="text-white font-bold text-sm">Join Free</span></div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Live registration toast (social proof) ──────────────────────────────────────
const NAMES = [
  { name: "Rahul", city: "Delhi" }, { name: "Priya", city: "Mumbai" }, { name: "Aditya", city: "Bengaluru" },
  { name: "Sneha", city: "Pune" }, { name: "Vikram", city: "Hyderabad" }, { name: "Anjali", city: "Chennai" },
  { name: "Karan", city: "Jaipur" }, { name: "Divya", city: "Ahmedabad" }, { name: "Manish", city: "Kolkata" },
  { name: "Meera", city: "Surat" }, { name: "Arjun", city: "Lucknow" }, { name: "Tanvi", city: "Nagpur" },
];
let _tid = 0;
function tAgo() { const r = Math.random(); return r < 0.3 ? `${Math.floor(r * 150 + 10)}s ago` : r < 0.6 ? "just now" : `${Math.floor(r * 5 + 1)} min ago`; }

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
      let idx: number; do { idx = Math.floor(Math.random() * NAMES.length); } while (used.current.has(idx));
      used.current.add(idx); if (used.current.size > 5) { const f = used.current.values().next().value as number; used.current.delete(f); }
      const p = NAMES[idx]; const id = ++_tid;
      setToasts(prev => [{ id, name: p.name, city: p.city, time: tAgo() }, ...prev].slice(0, 3));
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
      timer.current = setTimeout(spawn, 8000 + Math.random() * 11000);
    };
    timer.current = setTimeout(spawn, 4000 + Math.random() * 3000);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [scrolled]);
  if (!scrolled || toasts.length === 0) return null;
  return (
    <div className="fixed left-2 z-40 flex flex-col gap-2 pointer-events-none bottom-[100px] md:bottom-[90px]" aria-live="polite">
      {toasts.map((t, i) => (
        <div key={t.id} className="pointer-events-auto" style={{ opacity: i === 0 ? 1 : 0.65 - i * 0.15, transform: `scale(${1 - i * 0.03})`, transformOrigin: "bottom left", animation: "duc-fadein 0.3s ease" }}>
          <div className="flex items-center gap-2 rounded-2xl px-3 py-2 w-[240px]" style={{ background: "#fff", border: "1px solid #e2dfd6", boxShadow: "0 4px 16px rgba(0,0,0,0.09)" }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ background: `hsl(${(t.name.charCodeAt(0) * 37) % 360},55%,48%)` }}>{t.name[0]}</div>
            <div className="flex-1 min-w-0">
              <p className="font-bold leading-snug truncate" style={{ fontSize: 11, color: "#18181b" }}>{t.name} from {t.city}</p>
              <p className="leading-snug mt-0.5" style={{ fontSize: 10, color: "#71717a" }}>saved a seat · {t.time}</p>
            </div>
            <span className="relative flex w-2 h-2 shrink-0"><span className="absolute inline-flex w-full h-full rounded-full animate-ping opacity-75" style={{ background: "#d4a017" }} /><span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: "#d4a017" }} /></span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Delayed register nudge ──────────────────────────────────────────────────────
function RegisterNudge() {
  const register = useRegister();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const shown = useRef(false);
  useEffect(() => {
    const t = setTimeout(() => {
      if (shown.current) return;
      try { if (localStorage.getItem("whw_pop") === "1") return; } catch { /**/ }
      shown.current = true; setVisible(true);
    }, 20000);
    return () => clearTimeout(t);
  }, []);
  const dismiss = () => { setVisible(false); setDismissed(true); try { localStorage.setItem("whw_pop", "1"); } catch { /**/ } };
  if (!visible || dismissed) return null;
  return (
    <>
      <div className="fixed inset-0 z-[100]" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }} onClick={dismiss} />
      <div className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-sm rounded-3xl overflow-hidden" onClick={e => e.stopPropagation()} style={{ background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.22)", animation: "duc-fadein 0.35s ease" }}>
          <div className="relative px-6 pt-7 pb-5 text-center" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)" }}>
            <button onClick={dismiss} className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full cursor-pointer" style={{ background: "rgba(255,255,255,0.2)", border: "none" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>
            </button>
            <p className="text-3xl mb-2">🎟️</p>
            <h2 className="text-white font-black leading-snug" style={{ fontSize: 18 }}>Grab your free seat 🎉</h2>
          </div>
          <div className="px-6 py-5 text-center">
            <p style={{ fontSize: 14, color: "#3f3f46", lineHeight: 1.7, marginBottom: 12 }}>
              A free class that shows you how to build <strong style={{ color: "#18181b" }}>small healthy habits that stick</strong> — no diet, no gym.
            </p>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#9a6b0a", marginBottom: 16 }}>🗓 {WHEN_LINE}</p>
            <button onClick={() => { dismiss(); register(); }} className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full font-black text-white btn-primary" style={{ fontSize: 16, boxShadow: "0 6px 20px rgba(212,160,23,0.4)", border: "none", cursor: "pointer" }}>
              <TicketIcon size={18} />Save My Free Seat →
            </button>
            <p style={{ fontSize: 12, color: "#a1a1aa", marginTop: 8 }}>Free · No spam</p>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Meta Pixel ViewContent event ────────────────────────────────────────────
function useMetaPixelViewContent() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "ViewContent", {
        content_name: "Weight Habits Webinar",
        content_category: "Webinar Registration",
      });
    }
  }, []);
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGE — simple words, big visuals, understandable at a glance
// ═════════════════════════════════════════════════════════════════════════════
export default function WeightHabitsWebinarPage() {
  useMetaPixelViewContent();
  const [modalOpen, setModalOpen] = useState(false);
  const openRegister = () => setModalOpen(true);

  return (
    <RegisterCtx.Provider value={openRegister}>
    <div id="ss-top" style={{ background: "#faf8f3", minHeight: "100vh", color: "#18181b", fontSize: 15 }}>
      <style>{`
        @keyframes duc-fadein{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ss-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .duc-h1{font-size:clamp(2.2rem,5.5vw,3.6rem);font-weight:900;line-height:1.08;letter-spacing:-0.025em}
        .duc-h2{font-size:clamp(1.7rem,4vw,2.6rem);font-weight:900;line-height:1.15;letter-spacing:-0.02em}
        .duc-label{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:#a8790d}
        .duc-section-title{color:#18181b}
        #ss-top .gradient-text{background:linear-gradient(135deg,#b8860b 0%,#d4a017 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}
        #ss-top .btn-primary{background:linear-gradient(135deg,#c8891a 0%,#e0b022 50%,#d4a017 100%);color:#171412;font-weight:900;box-shadow:0 8px 28px rgba(184,134,11,0.45),inset 0 1px 0 rgba(255,255,255,0.35)}
        #ss-top .btn-primary:hover{background:linear-gradient(135deg,#b8860b 0%,#e6be3a 50%,#c8891a 100%);box-shadow:0 12px 36px rgba(184,134,11,0.55)}
        #ss-top .btn-primary:active{background:#9a6b0a}
        #ss-top .accent-pill{background:rgba(212,160,23,0.12);color:#8a6508;border:1px solid rgba(212,160,23,0.35)}
        #ss-top .mesh-bg{background:radial-gradient(60% 55% at 15% 10%,rgba(212,160,23,0.12) 0%,rgba(212,160,23,0) 60%),radial-gradient(55% 50% at 90% 15%,rgba(200,137,26,0.10) 0%,rgba(200,137,26,0) 60%),#faf8f3}
        .pop-card{transition:transform 0.2s, box-shadow 0.2s}
        .pop-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px -12px rgba(184,134,11,0.3)}
      `}</style>

      {/* ══ 0. ANNOUNCEMENT BAR ══════════════════════════════════════════════ */}
      <div style={{ background: "linear-gradient(90deg,#b8860b 0%,#d4a017 50%,#b8860b 100%)", padding: "10px 16px" }}>
        <p className="text-center font-bold text-white" style={{ fontSize: 13.5, letterSpacing: "0.01em", lineHeight: 1.4 }}>
          🎟️ FREE Online Class · {WHEN_LINE} · {WEBINAR.seatsLine}
        </p>
      </div>

      {/* ══ 1. HERO — one simple promise + when + 3 things you get ═══════════ */}
      <section className="relative overflow-hidden mesh-bg" style={{ borderBottom: "1px solid #e2dfd6" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-12 pb-14 lg:pt-16 text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 accent-pill" style={{ fontSize: 13, fontWeight: 800 }}>
            <span className="w-2 h-2 rounded-full inline-block animate-pulse" style={{ background: "#d4a017" }} />
            A free online class · No diet · No gym
          </div>

          {/* Big simple headline */}
          <h1 className="duc-h1 mb-5">
            Tired of trying to lose weight<br className="hidden sm:block" />{" "}
            and <span className="gradient-text">giving up every time?</span>
          </h1>

          {/* One-line, 5-year-old-simple explainer */}
          <p style={{ fontSize: 19, lineHeight: 1.6, color: "#3f3f46", maxWidth: 640, margin: "0 auto 10px", fontWeight: 500 }}>
            In this <strong style={{ color: "#18181b" }}>free 90-minute class</strong>, you&apos;ll learn a simple way to build{" "}
            <strong style={{ color: "#18181b" }}>tiny healthy habits</strong> — so small you never quit them.
          </p>
          <p style={{ fontSize: 16, color: "#71717a", maxWidth: 560, margin: "0 auto 26px" }}>
            No hard diets. No boring gym. Just one tiny habit a day that actually sticks.
          </p>

          {/* When / where — big clear badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {[
              { icon: "🗓", label: WEBINAR.dateLabel },
              { icon: "⏰", label: `${WEBINAR.timeLabel} · ${WEBINAR.duration}` },
              { icon: "💻", label: WEBINAR.platformLabel },
              { icon: "🎁", label: "100% Free" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 rounded-full px-4 py-2.5" style={{ background: "#fff", border: "1.5px solid #e6d9b0", boxShadow: "0 4px 14px rgba(0,0,0,0.05)" }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#18181b" }}>{label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-2 mb-9">
            <button onClick={openRegister} className="btn-primary inline-flex items-center gap-3 px-12 py-6 rounded-full font-black text-white" style={{ fontSize: 22, boxShadow: "0 12px 34px rgba(212,160,23,0.45)", border: "none", cursor: "pointer" }}>
              <TicketIcon size={24} />Save My Free Seat
            </button>
            <p style={{ fontSize: 13, color: "#71717a" }}>Takes 30 seconds · Join link sent on WhatsApp</p>
          </div>

          {/* The 3 things you'll walk away with — big icon cards */}
          <p className="duc-label mb-4">🎁 You leave this class with 3 things</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: "🪄", big: "A simple trick", small: "to build habits that stick" },
              { icon: "📝", big: "1 real habit", small: "we build together, live" },
              { icon: "🗺️", big: "A 7-day plan", small: "to start the very next morning" },
            ].map(({ icon, big, small }) => (
              <div key={big} className="pop-card rounded-2xl p-6 flex flex-col items-center text-center" style={{ background: "#fff", border: "1.5px solid #e6d9b0", boxShadow: "0 6px 22px rgba(184,134,11,0.12)" }}>
                <span style={{ fontSize: 42, marginBottom: 10 }}>{icon}</span>
                <p style={{ fontSize: 17, fontWeight: 900, color: "#18181b", lineHeight: 1.2 }}>{big}</p>
                <p style={{ fontSize: 13.5, color: "#71717a", marginTop: 4, lineHeight: 1.4 }}>{small}</p>
              </div>
            ))}
          </div>

          {/* tiny social proof */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="flex -space-x-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/avatars/women/woman-1.jpg" alt="" className="w-8 h-8 rounded-full object-cover border-2 border-white" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/avatars/men/man-1.jpg" alt="" className="w-8 h-8 rounded-full object-cover border-2 border-white" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/avatars/women/woman-3.avif" alt="" className="w-8 h-8 rounded-full object-cover border-2 border-white" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
            <div className="flex items-center gap-1">{[1,2,3,4,5].map(i=><Star key={i}/>)}</div>
            <p style={{ fontSize: 13, color: "#52525b" }}>Loved by busy people across India</p>
          </div>
        </div>
      </section>

      {/* ══ 2. "IS THIS YOU?" — visual pain, almost no words ═════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">Does this sound like you?</p>
            <h2 className="duc-h2 duc-section-title">You already know it&apos;s not your fault</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { emoji: "🔁", line: "You start every Monday… and quit by Thursday" },
              { emoji: "💸", line: "Gym membership you paid for but never use" },
              { emoji: "😩", line: "Miss one day → feel like a failure → give up" },
              { emoji: "⏰", line: "No time for a 1-hour workout after work" },
            ].map(({ emoji, line }) => (
              <div key={line} className="rounded-2xl p-5 flex flex-col items-center text-center" style={{ background: "#faf8f3", border: "1.5px solid #eee7d6" }}>
                <span style={{ fontSize: 40, marginBottom: 10 }}>{emoji}</span>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#3f3f46", lineHeight: 1.5 }}>{line}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8" style={{ fontSize: 18, fontWeight: 800, color: "#18181b", maxWidth: 620, margin: "2rem auto 0" }}>
            The problem was never you. <span style={{ color: "#a8790d" }}>Your plan was just too big.</span> 👇
          </p>
        </div>
      </section>

      {/* ══ 3. THE BIG IDEA — 3-step picture story (this IS the webinar) ═════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="duc-label mb-3">What this class is about</p>
            <h2 className="duc-h2 duc-section-title mb-3">The tiny-habit way — in 3 simple steps</h2>
            <p style={{ fontSize: 16, color: "#52525b", maxWidth: 520, margin: "0 auto" }}>This is exactly what you&apos;ll learn to do, live, in the class.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {[
              { n: "1", emoji: "🤏", title: "Make it TINY", plain: "Not \"walk 1 hour\". Just \"walk 2 minutes after dinner.\" So small you can't say no.", color: "#b8860b" },
              { n: "2", emoji: "🔗", title: "Stick it to your day", plain: "Do it right after something you already do — like \"after dinner\". So you never forget.", color: "#f97316" },
              { n: "3", emoji: "🔁", title: "Miss a day? Restart fast", plain: "Slipping is normal. You just come back the next day. No guilt. No quitting.", color: "#059669" },
            ].map(({ n, emoji, title, plain, color }) => (
              <div key={n} className="pop-card rounded-3xl p-7 flex flex-col items-center text-center relative" style={{ background: "#fff", border: "1.5px solid #e6d9b0", boxShadow: "0 8px 26px rgba(0,0,0,0.06)" }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center font-black text-white mb-3" style={{ fontSize: 19, background: color }}>{n}</div>
                <span style={{ fontSize: 52, marginBottom: 10 }}>{emoji}</span>
                <p style={{ fontSize: 20, fontWeight: 900, color: "#18181b", marginBottom: 8 }}>{title}</p>
                <p style={{ fontSize: 14.5, color: "#52525b", lineHeight: 1.6 }}>{plain}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl px-6 py-6 text-center mt-8" style={{ background: "linear-gradient(135deg,#171412,#18181b)" }}>
            <p style={{ fontSize: "clamp(1.1rem,2.5vw,1.4rem)", fontWeight: 900, color: "#fff", lineHeight: 1.4 }}>
              Tiny habits are easy to keep. <span style={{ color: "#e8a020" }}>And easy habits, done daily, change your body.</span>
            </p>
          </div>

          <div className="flex justify-center mt-10">
            <CTA label="Yes — Teach Me This (Free) →" sub={`${WHEN_LINE}`} />
          </div>
        </div>
      </section>

      {/* ══ 4. GOOD vs BAD — visual before/after with real images ═══════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">Old way vs new way</p>
            <h2 className="duc-h2 duc-section-title">See the difference</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Old way */}
            <div className="rounded-3xl overflow-hidden" style={{ border: "2px solid #fecaca", background: "#fff7f7" }}>
              <div className="relative" style={{ height: 190, overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/goals/weight-bad.png" alt="The hard old way" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(0.2)" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(220,38,38,0.15) 100%)" }} />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full" style={{ background: "#dc2626", color: "#fff", fontSize: 12, fontWeight: 800 }}>😫 THE OLD WAY</div>
              </div>
              <div className="p-6 flex flex-col gap-2.5">
                {["Strict diet — no tasty food", "1-hour gym, 5 days a week", "Count every calorie", "Change everything at once", "Quit by Week 2 😮‍💨"].map(t => (
                  <div key={t} className="flex items-center gap-2.5"><span style={{ color: "#dc2626", fontSize: 15, fontWeight: 900 }}>✕</span><span style={{ fontSize: 14.5, color: "#52525b" }}>{t}</span></div>
                ))}
              </div>
            </div>
            {/* New way */}
            <div className="rounded-3xl overflow-hidden" style={{ border: "2px solid #bbf7d0", background: "#f0fdf4" }}>
              <div className="relative" style={{ height: 190, overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/goals/weight-good.png" alt="The easy new way" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(212,160,23,0.16) 100%)" }} />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full" style={{ background: "#059669", color: "#fff", fontSize: 12, fontWeight: 800 }}>😄 THE TINY-HABIT WAY</div>
              </div>
              <div className="p-6 flex flex-col gap-2.5">
                {["Eat normal food, just a bit smarter", "2-minute walk after meals", "No counting, no apps", "One tiny habit at a time", "Easy to keep going ✅"].map(t => (
                  <div key={t} className="flex items-center gap-2.5"><span style={{ color: "#059669", fontSize: 15, fontWeight: 900 }}>✓</span><span style={{ fontSize: 14.5, color: "#18181b", fontWeight: 600 }}>{t}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. WHAT YOU'LL LEARN — big icon cards, few words ════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">In the 90 minutes</p>
            <h2 className="duc-h2 duc-section-title">What you&apos;ll learn</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { icon: "❓", title: "Why you keep quitting", plain: "The real reason plans fall apart — it's not willpower." },
              { icon: "🪄", title: "The simple habit trick", plain: "The easy 5-step way to make any habit stick." },
              { icon: "📝", title: "Build your own habit", plain: "We pick one goal of yours and turn it into a tiny action — live." },
              { icon: "🗺️", title: "Your 7-day plan", plain: "You leave knowing exactly what to do each day for a week." },
            ].map(({ icon, title, plain }) => (
              <div key={title} className="pop-card rounded-2xl p-6 flex items-start gap-4" style={{ background: "#fff", border: "1.5px solid #e6d9b0" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "rgba(212,160,23,0.1)", fontSize: 30 }}>{icon}</div>
                <div>
                  <p style={{ fontSize: 17, fontWeight: 900, color: "#18181b", marginBottom: 4 }}>{title}</p>
                  <p style={{ fontSize: 14.5, color: "#52525b", lineHeight: 1.55 }}>{plain}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <CTA label="Save My Free Seat →" sub={`${WHEN_LINE} · Free`} />
          </div>
        </div>
      </section>

      {/* ══ 6. WHO'S TEACHING — photo + 2 short lines ═══════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="rounded-3xl p-7 lg:p-9 flex flex-col sm:flex-row items-center gap-7 text-center sm:text-left" style={{ background: "#faf8f3", border: "1.5px solid #e6d9b0" }}>
            <div className="shrink-0">
              <div className="rounded-2xl overflow-hidden" style={{ width: 130, height: 130, border: "4px solid #fff", boxShadow: "0 12px 30px -8px rgba(0,0,0,0.25)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/rohan.png" alt="Rohan — your teacher" className="w-full h-full object-cover object-top" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
            </div>
            <div>
              <p className="duc-label mb-2">👋 Your teacher</p>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: "#18181b", marginBottom: 8 }}>Hi, I&apos;m Rohan</h2>
              <p style={{ fontSize: 15.5, color: "#52525b", lineHeight: 1.65 }}>
                I used to start over every Monday too. Big plans, big fails. Then I learned to make habits <strong style={{ color: "#18181b" }}>tiny</strong> — and everything changed. Now I teach this to busy people across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 7. WHO IT'S FOR — quick tick list ═══════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "linear-gradient(135deg,#171412 0%,#18181b 50%,#171412 100%)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-9">
            <p className="duc-label mb-3" style={{ color: "#a8790d" }}>Come if…</p>
            <h2 className="duc-h2" style={{ color: "#fff" }}>This class is for you if…</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
              "You want to lose weight but have no time for the gym",
              "You keep starting and quitting every few weeks",
              "You hate strict diets and boring workouts",
              "You want something simple you can actually keep",
            ].map((point, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,160,23,0.18)" }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)", fontSize: 13, color: "#fff", fontWeight: 900 }}>✓</div>
                <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.5, fontWeight: 500 }}>{point}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-9">
            <button onClick={openRegister} className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-full font-black text-white" style={{ fontSize: 18, border: "none", cursor: "pointer" }}>
              <TicketIcon size={20} />That&apos;s Me — Save My Seat →
            </button>
          </div>
        </div>
      </section>

      {/* ══ 8. FAQ — short answers ══════════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-9">
            <p className="duc-label mb-3">Quick questions</p>
            <h2 className="duc-h2 duc-section-title">Good to know</h2>
          </div>
          <div className="flex flex-col gap-2.5">
            {[
              { q: "Is it really free?", a: "Yes — totally free. Just add your name, email and WhatsApp number, and we'll send you the join link." },
              { q: "When is it and how long?", a: `${WHEN_LINE}. We'll send the exact join link and reminders to your WhatsApp after you sign up.` },
              { q: "Will you give me a diet?", a: "No diet plans. This is about small, easy habits — you keep eating normal food, just a little smarter." },
              { q: "Do I need a gym?", a: "No gym and no equipment. Everything fits into a normal, busy day." },
              { q: "What if I miss a day later?", a: "That's totally fine — we teach you a simple way to restart the next day instead of quitting." },
              { q: "Is there anything to buy?", a: "Not to attend. The class is genuinely useful on its own. Anything paid later is optional, and we'll explain it clearly." },
            ].map(({ q, a }) => <FAQ key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* ══ 9. FINAL CLOSE ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 lg:py-24" style={{ background: "#18181b" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(212,160,23,0.1),transparent 70%)" }} />
        <div className="max-w-xl mx-auto px-6 text-center relative">
          <p style={{ fontSize: 46 }} className="mb-4">🎟️</p>
          <p className="duc-label mb-3" style={{ color: "#a8790d" }}>Free online class</p>
          <h2 className="duc-h1 mb-4" style={{ color: "#fff" }}>
            Stop starting over.<br />
            <span style={{ color: "#a8790d" }}>Start something that lasts.</span>
          </h2>
          <p style={{ fontSize: 17, color: "#a1a1aa", lineHeight: 1.6, marginBottom: 8 }}>
            A simple trick. One habit built with you. A 7-day plan you keep.
          </p>
          <p style={{ fontSize: 15, fontWeight: 800, color: "#e8a020", marginBottom: 28 }}>🗓 {WHEN_LINE} · 🎁 Free</p>
          <CTA label="Save My Free Seat →" sub={WEBINAR.seatsLine} />
          <p className="mt-5" style={{ fontSize: 13, color: "#52525b" }}>
            Have a question?{" "}
            <a href="https://wa.me/918956146485?text=Hi%2C+I+have+a+question+about+the+free+weight+habits+class" className="underline" style={{ color: "#a8790d" }}>Message Rohan on WhatsApp</a>
          </p>
        </div>
      </section>

      <footer className="px-5 py-6 text-center" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p style={{ fontSize: 12, color: "#52525b" }}>
          © {new Date().getFullYear()} High Performance Club ·{" "}
          <a href="https://www.highperformanceclub.co" className="underline" style={{ color: "#3f3f46" }}>highperformanceclub.co</a>
        </p>
        <p style={{ fontSize: 12, color: "#3f3f46", marginTop: 4 }}>Free online class · General wellness education · Results vary · Not medical advice</p>
      </footer>

      <StickyBottomCTA />
      <LiveToast />
      <RegisterNudge />
      <RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
    </RegisterCtx.Provider>
  );
}
