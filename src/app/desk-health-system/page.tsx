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
  title: "From Desk Body to Strong Body",
  dateSet: false,                    // set true once you have a fixed date
  dateLabel: "This Sunday",          // e.g. "Sunday, 3 August"
  timeLabel: "11:00 AM IST",
  duration: "60–90 minutes",
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
      window.fbq("track", "CompleteRegistration", { content_name: "Desk Health System Webinar" });
    try {
      await fetch("/api/desk-health-register", {
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
                <p style={{ fontSize: 12.5, color: "#71717a", marginTop: 4 }}>We&apos;ll send the Zoom join link on WhatsApp.</p>
              </div>
              <div className="rounded-xl p-4 mb-5 text-left" style={{ background: "#fafafa", border: "1px solid #e4e4e7" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#18181b", marginBottom: 6 }}>🎁 Try this right now, at your desk:</p>
                <p style={{ fontSize: 13.5, color: "#52525b", lineHeight: 1.6 }}>Sit tall, drop your shoulders, and take 3 slow breaths. That&apos;s your first Desk Mission — done.</p>
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
                Add your details. We&apos;ll send the Zoom join link on WhatsApp.
              </p>
              <div className="flex flex-col gap-3">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" autoComplete="name" style={inputStyle} />
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" type="email" autoComplete="email" style={inputStyle} />
                <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="WhatsApp number" type="tel" inputMode="tel" autoComplete="tel" style={inputStyle} />
              </div>
              {status === "error" && (
                <p style={{ fontSize: 12.5, color: "#dc2626", marginTop: 10, textAlign: "center" }}>
                  Please add your full name, a valid email and WhatsApp number.
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
      try { if (localStorage.getItem("dhs_pop") === "1") return; } catch { /**/ }
      shown.current = true; setVisible(true);
    }, 20000);
    return () => clearTimeout(t);
  }, []);
  const dismiss = () => { setVisible(false); setDismissed(true); try { localStorage.setItem("dhs_pop", "1"); } catch { /**/ } };
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
              A free class that shows you how to <strong style={{ color: "#18181b" }}>reverse the hidden damage of desk work</strong> — without leaving your desk.
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
        content_name: "Desk Health System Webinar",
        content_category: "Webinar Registration",
      });
    }
  }, []);
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGE — one goal: webinar registrations. Simple words, big visuals.
// ═════════════════════════════════════════════════════════════════════════════
export default function DeskHealthSystemPage() {
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

      {/* ══ 1. HERO — one promise + when + what you leave with ══════════════ */}
      <section className="relative overflow-hidden mesh-bg" style={{ borderBottom: "1px solid #e2dfd6" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-12 pb-14 lg:pt-16 text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 accent-pill" style={{ fontSize: 13, fontWeight: 800 }}>
            <span className="w-2 h-2 rounded-full inline-block animate-pulse" style={{ background: "#d4a017" }} />
            A free class for people who sit 6+ hours a day
          </div>

          {/* Big simple headline */}
          <h1 className="duc-h1 mb-5">
            From Desk Body{" "}
            <span className="gradient-text">to Strong Body.</span>
          </h1>

          {/* One-line explainer */}
          <p style={{ fontSize: 19, lineHeight: 1.6, color: "#3f3f46", maxWidth: 680, margin: "0 auto 10px", fontWeight: 500 }}>
            In this <strong style={{ color: "#18181b" }}>free {WEBINAR.duration} class</strong>, learn how to <strong style={{ color: "#18181b" }}>reverse the hidden damage your desk job causes every day</strong> — neck pain, back pain, belly fat, low energy — <strong style={{ color: "#18181b" }}>without ever leaving your desk.</strong>
          </p>
          <p style={{ fontSize: 16, color: "#71717a", maxWidth: 600, margin: "0 auto 26px" }}>
            No gym. No diet. No extra time. You&apos;ll discover the <strong style={{ color: "#52525b" }}>Desk Health System™</strong> — tiny daily upgrades that fit inside the workday you already have.
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
            <p style={{ fontSize: 13, color: "#71717a" }}>Takes 30 seconds · Zoom link sent on WhatsApp</p>
          </div>

          {/* The 3 things you'll walk away with */}
          <p className="duc-label mb-4">🎁 You leave this class with 3 things</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: "🩺", big: "A quick self-check", small: "spot the hidden damage desk work is doing to you" },
              { icon: "🪄", big: "3 desk upgrades", small: "tiny fixes you can do at your desk today" },
              { icon: "🗺️", big: "A 7-day plan", small: "to start reversing the damage this week" },
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
              <img src="/avatars/men/man-1.jpg" alt="" className="w-8 h-8 rounded-full object-cover border-2 border-white" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/avatars/women/woman-1.jpg" alt="" className="w-8 h-8 rounded-full object-cover border-2 border-white" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/avatars/men/man-2.jpg" alt="" className="w-8 h-8 rounded-full object-cover border-2 border-white" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
            <div className="flex items-center gap-1">{[1,2,3,4,5].map(i=><Star key={i}/>)}</div>
            <p style={{ fontSize: 13, color: "#52525b" }}>Loved by desk professionals across India</p>
          </div>
        </div>
      </section>

      {/* ══ 2. "IS THIS YOU?" — the hidden damage, almost no words ══════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">By 6 PM, does this sound like you?</p>
            <h2 className="duc-h2 duc-section-title">Your desk is quietly wearing you down</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { emoji: "🦴", line: "Stiff neck & aching back by evening" },
              { emoji: "👀", line: "Tired, dry, strained eyes from screens" },
              { emoji: "🔋", line: "Energy crashes every afternoon" },
              { emoji: "🍩", line: "Belly fat creeping up from all the sitting" },
            ].map(({ emoji, line }) => (
              <div key={line} className="rounded-2xl p-5 flex flex-col items-center text-center" style={{ background: "#faf8f3", border: "1.5px solid #eee7d6" }}>
                <span style={{ fontSize: 40, marginBottom: 10 }}>{emoji}</span>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#3f3f46", lineHeight: 1.5 }}>{line}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8" style={{ fontSize: 18, fontWeight: 800, color: "#18181b", maxWidth: 640, margin: "2rem auto 0" }}>
            None of these come from one big mistake. <span style={{ color: "#a8790d" }}>They come from tiny habits you repeat 8 hours a day.</span> 👇
          </p>
        </div>
      </section>

      {/* ══ 3. THE BIG IDEA — make the desk the trigger, not the boundary ═══ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="duc-label mb-3">The core idea of this class</p>
            <h2 className="duc-h2 duc-section-title mb-3">Don&apos;t fight your workday. Use it.</h2>
            <p style={{ fontSize: 16, color: "#52525b", maxWidth: 560, margin: "0 auto" }}>
              Every workday already has hundreds of natural moments. We turn each one into a tiny health upgrade — so your desk becomes the <strong style={{ color: "#18181b" }}>trigger</strong>, not the problem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {[
              { n: "1", emoji: "🎯", title: "Make it TINY", plain: "Not \"work out for an hour\". Just \"stand up and stretch after every meeting.\" So small you can't say no.", color: "#b8860b" },
              { n: "2", emoji: "🖥️", title: "Anchor it to your desk", plain: "Do it right after something you already do — open your laptop, join a call, refill coffee. The desk reminds you.", color: "#f97316" },
              { n: "3", emoji: "📈", title: "1% better, every day", plain: "One tiny upgrade a day, repeated. You barely notice it — until your body feels completely different.", color: "#059669" },
            ].map(({ n, emoji, title, plain, color }) => (
              <div key={n} className="pop-card rounded-3xl p-7 flex flex-col items-center text-center relative" style={{ background: "#fff", border: "1.5px solid #e6d9b0", boxShadow: "0 8px 26px rgba(0,0,0,0.06)" }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center font-black text-white mb-3" style={{ fontSize: 19, background: color }}>{n}</div>
                <span style={{ fontSize: 52, marginBottom: 10 }}>{emoji}</span>
                <p style={{ fontSize: 20, fontWeight: 900, color: "#18181b", marginBottom: 8 }}>{title}</p>
                <p style={{ fontSize: 14.5, color: "#52525b", lineHeight: 1.6 }}>{plain}</p>
              </div>
            ))}
          </div>

          {/* Trigger examples — the desk-as-anchor mechanic */}
          <div className="rounded-3xl p-7 lg:p-8 mt-8" style={{ background: "#fff", border: "1.5px solid #e6d9b0" }}>
            <p className="text-center mb-6" style={{ fontSize: 15, fontWeight: 800, color: "#9a6b0a", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              What a “Desk Mission” looks like
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { cue: "After every meeting", act: "walk for 2 minutes" },
                { cue: "Every time you sit back down", act: "drink a sip of water" },
                { cue: "Before you open your inbox", act: "reset your posture" },
                { cue: "Before every video call", act: "roll your shoulders 3×" },
              ].map(({ cue, act }) => (
                <div key={cue} className="flex items-center gap-2 rounded-2xl px-4 py-3" style={{ background: "#faf8f3", border: "1px solid #eee7d6" }}>
                  <span className="rounded-lg px-2.5 py-1 shrink-0" style={{ background: "#18181b", color: "#e8a020", fontSize: 12.5, fontWeight: 800 }}>{cue}</span>
                  <span style={{ fontSize: 14, color: "#d4a017", fontWeight: 900 }}>→</span>
                  <span style={{ fontSize: 14.5, fontWeight: 700, color: "#18181b" }}>{act}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl px-6 py-6 text-center mt-8" style={{ background: "linear-gradient(135deg,#171412,#18181b)" }}>
            <p style={{ fontSize: "clamp(1.1rem,2.5vw,1.4rem)", fontWeight: 900, color: "#fff", lineHeight: 1.4 }}>
              Tiny upgrades are easy to keep. <span style={{ color: "#e8a020" }}>And easy upgrades, done daily, rebuild your body.</span>
            </p>
          </div>

          <div className="flex justify-center mt-10">
            <CTA label="Yes — Teach Me This (Free) →" sub={`${WHEN_LINE}`} />
          </div>
        </div>
      </section>

      {/* ══ 4. OLD WAY vs THE DESK-HEALTH WAY ═══════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">Old way vs new way</p>
            <h2 className="duc-h2 duc-section-title">See the difference</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Old way */}
            <div className="rounded-3xl overflow-hidden" style={{ border: "2px solid #fecaca", background: "#fff7f7" }}>
              <div className="px-6 py-4 flex items-center gap-2.5" style={{ background: "#fee2e2", borderBottom: "2px solid #fecaca" }}>
                <span style={{ fontSize: 24 }}>😫</span>
                <span style={{ fontSize: 16, fontWeight: 900, color: "#991b1b" }}>THE OLD WAY</span>
              </div>
              <div className="p-6 flex flex-col gap-2.5">
                {["Find an extra hour before or after work", "Drag yourself to the gym", "Follow a strict diet", "Change your whole lifestyle at once", "Quit in 2 weeks 😮‍💨"].map(t => (
                  <div key={t} className="flex items-center gap-2.5"><span style={{ color: "#dc2626", fontSize: 15, fontWeight: 900 }}>✕</span><span style={{ fontSize: 14.5, color: "#52525b" }}>{t}</span></div>
                ))}
              </div>
            </div>
            {/* New way */}
            <div className="rounded-3xl overflow-hidden" style={{ border: "2px solid #bbf7d0", background: "#f0fdf4", boxShadow: "0 12px 34px -14px rgba(5,150,105,0.35)" }}>
              <div className="px-6 py-4 flex items-center gap-2.5" style={{ background: "#dcfce7", borderBottom: "2px solid #bbf7d0" }}>
                <span style={{ fontSize: 24 }}>😄</span>
                <span style={{ fontSize: 16, fontWeight: 900, color: "#166534" }}>THE DESK-HEALTH WAY</span>
              </div>
              <div className="p-6 flex flex-col gap-2.5">
                {["No extra time — it fits inside work", "No gym, no equipment", "Eat normal food, just a bit smarter", "One tiny upgrade at a time", "Easy to keep going ✅"].map(t => (
                  <div key={t} className="flex items-center gap-2.5"><span style={{ color: "#059669", fontSize: 15, fontWeight: 900 }}>✓</span><span style={{ fontSize: 14.5, color: "#18181b", fontWeight: 600 }}>{t}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. THE 3 PHASES — Repair → Restore → Thrive ═════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-11">
            <p className="duc-label mb-3">The journey you&apos;ll see mapped out</p>
            <h2 className="duc-h2 duc-section-title mb-3">Repair → Restore → Thrive</h2>
            <p style={{ fontSize: 16, color: "#52525b", maxWidth: 560, margin: "0 auto" }}>
              A clear path from a tired desk body to a strong, energetic one — one tiny upgrade at a time.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: "🌱", tag: "Phase 1", title: "Repair", sub: "Stop the daily damage", plain: "Fix the hydration, sitting, posture and eye habits that are quietly hurting you right now.", color: "#059669" },
              { emoji: "💪", tag: "Phase 2", title: "Restore", sub: "Bring your body back", plain: "Rebuild the strength, mobility and neck/shoulder health that years of sitting have taken.", color: "#b8860b" },
              { emoji: "🚀", tag: "Phase 3", title: "Thrive", sub: "Best version of your workday", plain: "Now optimise — steady all-day energy, sharp focus, and a calmer, less-stressed workday.", color: "#f97316" },
            ].map(({ emoji, tag, title, sub, plain, color }) => (
              <div key={title} className="pop-card rounded-3xl p-7 text-center" style={{ background: "#fff", border: "1.5px solid #e6d9b0", boxShadow: "0 8px 26px rgba(0,0,0,0.06)" }}>
                <span style={{ fontSize: 48 }}>{emoji}</span>
                <p className="mt-2" style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color }}>{tag}</p>
                <p style={{ fontSize: 24, fontWeight: 900, color: "#18181b", marginTop: 2 }}>{title}</p>
                <p style={{ fontSize: 13.5, fontWeight: 700, color: "#a8790d", marginBottom: 8 }}>{sub}</p>
                <p style={{ fontSize: 14.5, color: "#52525b", lineHeight: 1.6 }}>{plain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. THE 7 PILLARS — what the system covers ═══════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">What the Desk Health System™ covers</p>
            <h2 className="duc-h2 duc-section-title">The 7 Pillars of Desk Health™</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { icon: "🪑", name: "Posture & Spine" },
              { icon: "👀", name: "Eye Care" },
              { icon: "💧", name: "Hydration" },
              { icon: "🚶", name: "Desk Mobility" },
              { icon: "⚡", name: "All-Day Energy" },
              { icon: "🎯", name: "Deep-Work Focus" },
              { icon: "😌", name: "Stress-Free Workday" },
              { icon: "🍎", name: "Desk Nutrition" },
            ].map(({ icon, name }) => (
              <div key={name} className="pop-card rounded-2xl p-5 flex flex-col items-center text-center" style={{ background: "#faf8f3", border: "1.5px solid #e6d9b0" }}>
                <span style={{ fontSize: 34, marginBottom: 8 }}>{icon}</span>
                <p style={{ fontSize: 14, fontWeight: 800, color: "#18181b", lineHeight: 1.3 }}>{name}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8" style={{ fontSize: 15, color: "#71717a", maxWidth: 560, margin: "1.5rem auto 0" }}>
            In the class, you&apos;ll see how these pillars fit together — and get your first upgrade from each of the ones that matter most for you.
          </p>
          <div className="flex justify-center mt-8">
            <CTA label="Save My Free Seat →" sub={`${WHEN_LINE} · Free`} />
          </div>
        </div>
      </section>

      {/* ══ 7. WHAT YOU'LL LEARN — big icon cards ═══════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">In the {WEBINAR.duration}</p>
            <h2 className="duc-h2 duc-section-title">What you&apos;ll learn</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { icon: "🩺", title: "The hidden cost of desk work", plain: "The tiny daily habits that cause neck pain, back pain, low energy — and how to spot yours." },
              { icon: "🖥️", title: "Turn your desk into a trigger", plain: "The simple mechanic that makes healthy actions automatic — no motivation needed." },
              { icon: "🧩", title: "The Desk Health System™", plain: "How 7 pillars and 3 phases (Repair → Restore → Thrive) rebuild your body during work." },
              { icon: "📈", title: "The 1%-better method", plain: "Why tiny upgrades beat big overhauls — and actually stick for life." },
              { icon: "🪄", title: "Build your first upgrades — live", plain: "We turn your worst desk habits into 3 tiny missions you can do at your desk today." },
              { icon: "🗺️", title: "Your 7-day desk plan", plain: "Leave knowing exactly what to do each day this week to start reversing the damage." },
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

      {/* ══ 8. BEFORE vs AFTER THE CLASS ════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">The change this class makes</p>
            <h2 className="duc-h2 duc-section-title">Before this class → After this class</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl overflow-hidden" style={{ border: "2px solid #fecaca", background: "#fff7f7" }}>
              <div className="px-6 py-4 flex items-center gap-2.5" style={{ background: "#fee2e2", borderBottom: "2px solid #fecaca" }}>
                <span style={{ fontSize: 24 }}>😔</span>
                <span style={{ fontSize: 16, fontWeight: 900, color: "#991b1b" }}>BEFORE the class</span>
              </div>
              <div className="p-6 flex flex-col gap-3">
                {[
                  "End the day stiff, drained and foggy",
                  "Think staying healthy needs a gym & free time",
                  "Try big changes, burn out, give up",
                  "Watch the aches and belly fat slowly grow",
                  "Feel your desk job is bad for you — but stuck",
                ].map(t => (
                  <div key={t} className="flex items-start gap-2.5"><span style={{ color: "#dc2626", fontSize: 16, fontWeight: 900, marginTop: -1 }}>✕</span><span style={{ fontSize: 14.5, color: "#52525b", lineHeight: 1.5 }}>{t}</span></div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden" style={{ border: "2px solid #bbf7d0", background: "#f0fdf4", boxShadow: "0 12px 34px -14px rgba(5,150,105,0.35)" }}>
              <div className="px-6 py-4 flex items-center gap-2.5" style={{ background: "#dcfce7", borderBottom: "2px solid #bbf7d0" }}>
                <span style={{ fontSize: 24 }}>😄</span>
                <span style={{ fontSize: 16, fontWeight: 900, color: "#166534" }}>AFTER the class</span>
              </div>
              <div className="p-6 flex flex-col gap-3">
                {[
                  "Know exactly what your desk is doing to you",
                  "See how to get healthy without extra time",
                  "One tiny upgrade at a time — no burnout",
                  "3 desk missions + a 7-day plan for your body",
                  "Feel your workday can make you stronger, not weaker",
                ].map(t => (
                  <div key={t} className="flex items-start gap-2.5"><span style={{ color: "#059669", fontSize: 16, fontWeight: 900, marginTop: -1 }}>✓</span><span style={{ fontSize: 14.5, color: "#18181b", fontWeight: 600, lineHeight: 1.5 }}>{t}</span></div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-center mt-8" style={{ fontSize: 17, fontWeight: 800, color: "#18181b", maxWidth: 580, margin: "2rem auto 0" }}>
            Same desk. Same busy job. <span style={{ color: "#a8790d" }}>A body that finally works with you, not against you.</span>
          </p>
          <div className="flex justify-center mt-8">
            <CTA label="I Want the AFTER →" sub={`${WHEN_LINE} · Free`} />
          </div>
        </div>
      </section>

      {/* ══ 9. WHO'S TEACHING — founder (Rohan) ═════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="rounded-3xl p-7 lg:p-9 flex flex-col sm:flex-row items-center gap-7 text-center sm:text-left" style={{ background: "#fff", border: "1.5px solid #e6d9b0", boxShadow: "0 8px 26px rgba(0,0,0,0.05)" }}>
            <div className="shrink-0">
              <div className="rounded-2xl overflow-hidden" style={{ width: 140, height: 140, border: "4px solid #fff", boxShadow: "0 12px 30px -8px rgba(0,0,0,0.25)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/rohan.png" alt="Rohan — your teacher" className="w-full h-full object-cover object-top" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
            </div>
            <div>
              <p className="duc-label mb-2">👋 Your teacher</p>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: "#18181b", marginBottom: 8 }}>Hi, I&apos;m Rohan</h2>
              <p style={{ fontSize: 15.5, color: "#52525b", lineHeight: 1.65 }}>
                I spent years at a desk racking up the exact aches, low energy and creeping weight you&apos;re feeling — and I kept failing at &ldquo;get to the gym&rdquo; fixes that never fit my day. So I built a different way: <strong style={{ color: "#18181b" }}>reverse the damage <em>inside</em> the workday</strong>, one tiny upgrade at a time. That&apos;s the Desk Health System™ — and I now teach it to desk professionals across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 10. WHO IT'S FOR ════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "linear-gradient(135deg,#171412 0%,#18181b 50%,#171412 100%)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-9">
            <p className="duc-label mb-3" style={{ color: "#a8790d" }}>Come if…</p>
            <h2 className="duc-h2" style={{ color: "#fff" }}>This class is for you if…</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
              "You sit 6+ hours a day for work",
              "Neck pain, back pain or eye strain by evening",
              "Low energy and belly fat creeping up",
              "No time or motivation for the gym",
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

      {/* ══ 11. FAQ ═════════════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-9">
            <p className="duc-label mb-3">Quick questions</p>
            <h2 className="duc-h2 duc-section-title">Good to know</h2>
          </div>
          <div className="flex flex-col gap-2.5">
            {[
              { q: "Is it really free?", a: "Yes — totally free. Just add your full name, email and WhatsApp number, and we'll send you the Zoom join link." },
              { q: "What is the Desk Health System™?", a: "It's a simple system that helps desk professionals reverse the hidden damage of desk work — through tiny daily upgrades that fit naturally inside the workday. No gym, no diet, no extra time. We walk you through the core idea in the class." },
              { q: "When is it and how long?", a: `${WHEN_LINE}. It's live on Zoom. We'll send the exact join link and reminders to your WhatsApp after you register.` },
              { q: "Do I need a gym or equipment?", a: "No. Everything happens at your desk during a normal workday — no gym, no equipment, no changing clothes." },
              { q: "Will you give me a diet?", a: "No diet plans. The system is about small, easy upgrades — you keep eating normal food, just a little smarter." },
              { q: "Is this for me if I'm not into fitness?", a: "Perfect fit. This isn't for fitness enthusiasts — it's for ordinary working professionals who just want to feel better and undo the aches and low energy of desk life." },
              { q: "Is there anything to buy?", a: "Not to attend. The class is genuinely useful on its own. Anything paid later is optional, and we'll explain it clearly." },
            ].map(({ q, a }) => <FAQ key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* ══ 12. FINAL CLOSE ═════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 lg:py-24" style={{ background: "#18181b" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(212,160,23,0.1),transparent 70%)" }} />
        <div className="max-w-xl mx-auto px-6 text-center relative">
          <p style={{ fontSize: 46 }} className="mb-4">🎟️</p>
          <p className="duc-label mb-3" style={{ color: "#a8790d" }}>Free online class</p>
          <h2 className="duc-h1 mb-4" style={{ color: "#fff" }}>
            From desk body,<br />
            <span style={{ color: "#a8790d" }}>to strong body.</span>
          </h2>
          <p style={{ fontSize: 17, color: "#a1a1aa", lineHeight: 1.6, marginBottom: 8 }}>
            Learn the Desk Health System™. Build your first 3 upgrades with us. Leave with a 7-day plan you keep.
          </p>
          <p style={{ fontSize: 15, fontWeight: 800, color: "#e8a020", marginBottom: 28 }}>🗓 {WHEN_LINE} · 🎁 Free</p>
          <CTA label="Save My Free Seat →" sub={WEBINAR.seatsLine} />
          <p className="mt-5" style={{ fontSize: 13, color: "#52525b" }}>
            Have a question?{" "}
            <a href="https://wa.me/918956146485?text=Hi%2C+I+have+a+question+about+the+free+Desk+Health+class" className="underline" style={{ color: "#a8790d" }}>Message Rohan on WhatsApp</a>
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
