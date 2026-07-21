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
  // Leave dateSet=false until you have a confirmed date — the page shows a
  // "next live session" style line instead of a hard (possibly wrong) date.
  dateSet: false,
  dateLabel: "This Sunday",        // e.g. "Sunday, 3 August"
  timeLabel: "7:00 PM IST",        // e.g. "7:00 PM IST"
  duration: "90 minutes",
  platformLabel: "Live on Zoom + WhatsApp reminders",
  seatsLine: "Limited seats — free to attend",
};
// Convenience string used in the hero pill / reminders.
const WHEN_LINE = WEBINAR.dateSet
  ? `${WEBINAR.dateLabel} · ${WEBINAR.timeLabel} · ${WEBINAR.duration}`
  : `Next live session ${WEBINAR.dateLabel} · ${WEBINAR.timeLabel} · ${WEBINAR.duration}`;

// ─── Registration modal context ────────────────────────────────────────────────
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
  return <svg width="13" height="13" viewBox="0 0 20 20" fill="#f59e0b" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
}

// ─── CTA button ───────────────────────────────────────────────────────────────
function CTA({ label, sub }: { label: string; sub?: string }) {
  const register = useRegister();
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={register}
        className="btn-primary inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-black text-white"
        style={{ fontSize: 18, boxShadow: "0 8px 28px rgba(212,160,23,0.42)", letterSpacing: "-0.01em", border: "none", cursor: "pointer" }}>
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
    <div className="duc-glow-card rounded-xl overflow-hidden border" style={{ borderColor: "#e2dfd6" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left font-semibold bg-white hover:bg-stone-50 transition-colors" style={{ color: "#18181b", fontSize: 14 }}>
        {q}
        <span className="shrink-0 text-xl font-light" style={{ color: "#a8790d", display: "inline-block", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
      </button>
      {open && <div className="px-5 pb-5 leading-relaxed bg-white" style={{ fontSize: 13, color: "#71717a" }}>{a}</div>}
    </div>
  );
}

// ─── Registration modal ─────────────────────────────────────────────────────────
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
              {status === "done" ? "You're registered! 🎉" : "Reserve your free seat"}
            </h2>
          </div>

          {status === "done" ? (
            <div className="px-6 py-7 text-center">
              <p style={{ fontSize: 15, color: "#3f3f46", lineHeight: 1.7, marginBottom: 14 }}>
                Your seat for <strong style={{ color: "#18181b" }}>&ldquo;{WEBINAR.title}&rdquo;</strong> is booked.
              </p>
              <div className="rounded-xl p-4 mb-4 text-center" style={{ background: "rgba(212,160,23,0.06)", border: "1px solid rgba(212,160,23,0.2)" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#9a6b0a", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>When</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#18181b" }}>{WHEN_LINE}</p>
                <p style={{ fontSize: 12.5, color: "#71717a", marginTop: 4 }}>We&apos;ll send the joining link and reminders to your WhatsApp.</p>
              </div>
              <div className="rounded-xl p-4 mb-5 text-left" style={{ background: "#fafafa", border: "1px solid #e4e4e7" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#18181b", marginBottom: 6 }}>Your first tiny habit — start today:</p>
                <p style={{ fontSize: 13.5, color: "#52525b", lineHeight: 1.6 }}>Before your next second serving or unplanned snack, pause and take three slow breaths. That&apos;s it.</p>
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
                Enter your details and we&apos;ll send the joining link and reminders on WhatsApp.
              </p>
              <div className="flex flex-col gap-3">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" autoComplete="name" style={inputStyle} />
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" type="email" autoComplete="email" style={inputStyle} />
                <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="WhatsApp number" type="tel" inputMode="tel" autoComplete="tel" style={inputStyle} />
              </div>
              {status === "error" && (
                <p style={{ fontSize: 12.5, color: "#dc2626", marginTop: 10, textAlign: "center" }}>
                  Please enter your name, a valid email and WhatsApp number.
                </p>
              )}
              <button type="submit" disabled={status === "loading"} className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full font-black text-white btn-primary mt-4" style={{ fontSize: 16, boxShadow: "0 6px 20px rgba(212,160,23,0.4)", border: "none", cursor: status === "loading" ? "wait" : "pointer", opacity: status === "loading" ? 0.7 : 1 }}>
                <TicketIcon size={18} />{status === "loading" ? "Reserving…" : "Reserve My Free Seat →"}
              </button>
              <p style={{ fontSize: 12, color: "#a1a1aa", marginTop: 8, textAlign: "center" }}>Free · No spam · Unsubscribe anytime</p>
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
          <div className="text-left"><p className="text-white font-black text-sm leading-tight">Reserve My Free Seat →</p><p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.85)" }}>{WHEN_LINE}</p></div>
          <div className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}><TicketIcon size={15} /><span className="text-white font-bold text-sm">Join</span></div>
        </button>
      </div>
      <div className="hidden md:block px-6 pb-4 pt-3" style={{ background: "linear-gradient(to top,#faf8f3 70%,transparent)", backdropFilter: "blur(8px)" }}>
        <div className="max-w-lg mx-auto">
          <button onClick={register} className="w-full flex items-center justify-between gap-4 rounded-2xl px-6 py-3.5" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)", boxShadow: "0 4px 20px rgba(212,160,23,0.4)", border: "none", cursor: "pointer" }}>
            <div className="text-left"><p className="text-white font-black text-sm leading-tight">Reserve My Free Seat →</p><p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.85)" }}>{WHEN_LINE} · Free</p></div>
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
              <p className="leading-snug mt-0.5" style={{ fontSize: 10, color: "#71717a" }}>registered · {t.time}</p>
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
    }, 18000);
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
            <h2 className="text-white font-black leading-snug" style={{ fontSize: 18 }}>Grab your free seat before you go</h2>
          </div>
          <div className="px-6 py-5 text-center">
            <p style={{ fontSize: 14, color: "#3f3f46", lineHeight: 1.7, marginBottom: 12 }}>
              The free webinar <strong style={{ color: "#18181b" }}>&ldquo;{WEBINAR.title}&rdquo;</strong> — learn the 5S system and leave with a 7-day plan you can actually keep.
            </p>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#9a6b0a", marginBottom: 16 }}>🗓 {WHEN_LINE}</p>
            <button onClick={() => { dismiss(); register(); }} className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full font-black text-white btn-primary" style={{ fontSize: 16, boxShadow: "0 6px 20px rgba(212,160,23,0.4)", border: "none", cursor: "pointer" }}>
              <TicketIcon size={18} />Reserve My Free Seat →
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
// PAGE — lean, conversion-focused webinar registration (7 sections)
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
        @keyframes ss-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        .duc-h1{font-size:clamp(2.1rem,5vw,3.4rem);font-weight:900;line-height:1.1;letter-spacing:-0.025em}
        .duc-h2{font-size:clamp(1.6rem,3.5vw,2.4rem);font-weight:800;line-height:1.18;letter-spacing:-0.02em}
        .duc-body{font-size:clamp(1rem,1.8vw,1.0625rem);line-height:1.75;color:#52525b}
        .duc-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:#a8790d}
        .duc-section-title{background:linear-gradient(135deg,#18181b 0%,#3f3f46 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .duc-glow-card{box-shadow:0 4px 24px rgba(212,160,23,0.08),0 1px 3px rgba(0,0,0,0.06);transition:box-shadow 0.2s,transform 0.2s}
        .duc-glow-card:hover{box-shadow:0 8px 32px rgba(212,160,23,0.14),0 2px 8px rgba(0,0,0,0.08);transform:translateY(-2px)}
        #ss-top .gradient-text{background:linear-gradient(135deg,#b8860b 0%,#d4a017 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}
        #ss-top .btn-primary{background:linear-gradient(135deg,#c8891a 0%,#e0b022 50%,#d4a017 100%);color:#171412;font-weight:900;box-shadow:0 8px 28px rgba(184,134,11,0.45),inset 0 1px 0 rgba(255,255,255,0.35)}
        #ss-top .btn-primary:hover{background:linear-gradient(135deg,#b8860b 0%,#e6be3a 50%,#c8891a 100%);box-shadow:0 12px 36px rgba(184,134,11,0.55),inset 0 1px 0 rgba(255,255,255,0.4)}
        #ss-top .btn-primary:active{background:#9a6b0a}
        #ss-top .accent-pill{background:rgba(212,160,23,0.12);color:#8a6508;border:1px solid rgba(212,160,23,0.35)}
        #ss-top .mesh-bg{background:radial-gradient(60% 55% at 15% 10%,rgba(212,160,23,0.12) 0%,rgba(212,160,23,0) 60%),radial-gradient(55% 50% at 90% 15%,rgba(200,137,26,0.10) 0%,rgba(200,137,26,0) 60%),radial-gradient(60% 60% at 80% 90%,rgba(184,134,11,0.08) 0%,rgba(184,134,11,0) 60%),#faf8f3}
      `}</style>

      {/* ══ 0. ANNOUNCEMENT BAR ══════════════════════════════════════════════ */}
      <div style={{ background: "linear-gradient(90deg,#b8860b 0%,#d4a017 50%,#b8860b 100%)", padding: "10px 16px" }}>
        <p className="text-center font-semibold text-white" style={{ fontSize: 13, letterSpacing: "0.01em", lineHeight: 1.4 }}>
          ✦ FREE Live Webinar · {WHEN_LINE} · {WEBINAR.seatsLine} ✦
        </p>
      </div>

      {/* ══ 1. HERO — the whole pitch, above the fold ════════════════════════ */}
      <section className="relative overflow-hidden mesh-bg" style={{ borderBottom: "1px solid #e2dfd6" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* LEFT — promise + when + CTA */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 accent-pill" style={{ fontSize: 13, fontWeight: 700 }}>
                <span className="w-2 h-2 rounded-full inline-block animate-pulse" style={{ background: "#d4a017" }} />
                Free live webinar · For people who keep starting over
              </div>

              <h1 className="duc-h1 text-foreground mb-4">
                Stop Starting Over<br />
                <span className="gradient-text">With Weight Loss</span>
              </h1>

              <p style={{ fontSize: 17, lineHeight: 1.7, color: "#52525b", marginBottom: 22, maxWidth: 520 }} className="mx-auto lg:mx-0">
                A free 90-minute live session that shows you how to turn healthy intentions into{" "}
                <strong style={{ color: "#18181b" }}>tiny daily habits you can actually keep</strong> — without strict diets, complicated workouts, or rebuilding your whole life.
              </p>

              {/* When / where — the essential webinar facts */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 mb-6">
                <div className="flex items-center gap-2" style={{ fontSize: 14, fontWeight: 700, color: "#18181b" }}>
                  <span style={{ fontSize: 16 }}>🗓</span>{WEBINAR.dateLabel}
                </div>
                <div className="flex items-center gap-2" style={{ fontSize: 14, fontWeight: 700, color: "#18181b" }}>
                  <span style={{ fontSize: 16 }}>⏰</span>{WEBINAR.timeLabel} · {WEBINAR.duration}
                </div>
                <div className="flex items-center gap-2" style={{ fontSize: 14, fontWeight: 700, color: "#18181b" }}>
                  <span style={{ fontSize: 16 }}>📍</span>{WEBINAR.platformLabel}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col items-center lg:items-start gap-2 mb-7">
                <button
                  onClick={openRegister}
                  className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-full font-black text-white"
                  style={{ fontSize: 20, boxShadow: "0 8px 28px rgba(212,160,23,0.42)", border: "none", cursor: "pointer" }}>
                  <TicketIcon size={22} />Reserve My Free Seat
                </button>
                <p style={{ fontSize: 13, color: "#71717a" }}>Free to attend · Reminders on WhatsApp · No spam</p>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="flex -space-x-2 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/avatars/women/woman-1.jpg" alt="" className="w-9 h-9 rounded-full object-cover border-2 border-white" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/avatars/women/woman-3.avif" alt="" className="w-9 h-9 rounded-full object-cover border-2 border-white" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/avatars/men/man-1.jpg" alt="" className="w-9 h-9 rounded-full object-cover border-2 border-white" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">{[1,2,3,4,5].map(i=><Star key={i}/>)}</div>
                  <p style={{ fontSize: 13, color: "#52525b" }}><strong style={{ color: "#18181b" }}>Working professionals</strong> across India have joined</p>
                </div>
              </div>
            </div>

            {/* RIGHT — "what you'll walk away with" card (the outcome, up front) */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="rounded-3xl p-7 lg:p-8" style={{ background: "#fff", border: "1px solid #e2dfd6", boxShadow: "0 24px 60px -20px rgba(184,134,11,0.35)" }}>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5" style={{ background: "rgba(212,160,23,0.1)", color: "#9a6b0a", fontSize: 12, fontWeight: 800, letterSpacing: "0.06em" }}>
                    🎁 WHAT YOU&apos;LL WALK AWAY WITH
                  </div>
                  <div className="flex flex-col gap-4">
                    {[
                      { icon: "🎯", t: "The 5S Daily Upgrade System", s: "A simple, repeatable method for building any habit that sticks." },
                      { icon: "📝", t: "One habit built live, with you", s: "Turn a real goal of yours into a tiny action you can start tomorrow." },
                      { icon: "🧭", t: "A ready 7-day starter plan", s: "You leave knowing exactly what to do — including the days you slip." },
                      { icon: "🔁", t: "The restart rule", s: "How to bounce back in a day instead of quitting for a month." },
                    ].map(({ icon, t, s }) => (
                      <div key={t} className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(212,160,23,0.1)", fontSize: 19 }}>{icon}</div>
                        <div>
                          <p style={{ fontSize: 15, fontWeight: 800, color: "#18181b", lineHeight: 1.3 }}>{t}</p>
                          <p style={{ fontSize: 13, color: "#71717a", lineHeight: 1.5, marginTop: 2 }}>{s}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-5 text-center" style={{ borderTop: "1px solid #eee" }}>
                    <button onClick={openRegister} className="btn-primary w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-black text-white" style={{ fontSize: 16, border: "none", cursor: "pointer" }}>
                      <TicketIcon size={18} />Reserve My Free Seat →
                    </button>
                    <p style={{ fontSize: 12, color: "#a1a1aa", marginTop: 8 }}>{WEBINAR.seatsLine}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ 2. WHY THIS IS DIFFERENT (3 points) ══════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">Why this is different</p>
            <h2 className="duc-h2 duc-section-title mb-3">Not another diet. Not another workout plan.</h2>
            <p className="duc-body max-w-xl mx-auto">You already know most of the advice. The problem was never information — it was a plan too big to survive a normal, busy week. This fixes that.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: "🔁", title: "Built to stop the restart cycle", body: "Most plans ask you to change everything on Day 1, so you burn out by Week 2 and start over on Monday. We do the opposite — one tiny habit at a time." },
              { icon: "🧭", title: "You leave with a system, not a lecture", body: "This isn't 90 minutes of tips you'll forget. You build a real habit live and walk away with a 7-day plan you can actually follow." },
              { icon: "🎯", title: "Small enough that you can't fail", body: "Every habit is shrunk to a version that survives your worst, busiest day — with a rule for restarting the moment you slip." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="duc-glow-card rounded-2xl p-6 flex flex-col gap-3" style={{ background: "#fafafa", border: "1px solid #e4e4e7" }}>
                <span style={{ fontSize: 30 }}>{icon}</span>
                <p style={{ fontSize: 16, fontWeight: 800, color: "#18181b", lineHeight: 1.3 }}>{title}</p>
                <p style={{ fontSize: 14, color: "#52525b", lineHeight: 1.65 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. WHAT WE'LL COVER (agenda) ═════════════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">Inside the 90 minutes</p>
            <h2 className="duc-h2 duc-section-title mb-3">What we&apos;ll cover, step by step</h2>
          </div>
          <div className="flex flex-col gap-5">
            {[
              { step: "01", color: "#b8860b", title: "Why your plans keep collapsing", desc: "The four real reasons healthy routines fall apart — and why it's never been about willpower or discipline." },
              { step: "02", color: "#f97316", title: "The 5S Daily Upgrade System", desc: "Select, Shrink, Stack, Score, Scale — the exact method for turning any health goal into a habit that sticks." },
              { step: "03", color: "#6366f1", title: "Build your habit — live", desc: "Together, we turn one of your own goals into a tiny action, with a trigger and a difficult-day version." },
              { step: "04", color: "#e8a020", title: "Your 7-day plan + the restart rule", desc: "You leave with a concrete week-one plan and a clear rule for bouncing back the day you slip." },
              { step: "05", color: "#059669", title: "Live Q&A", desc: "Honest answers to the real questions — \"Will I get a diet?\", \"Do I need a gym?\", \"What if I miss days?\"" },
            ].map(({ step, color, title, desc }) => (
              <div key={step} className="flex gap-5 rounded-2xl p-5" style={{ background: "#fff", border: "1px solid #e4e4e7" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color, minWidth: 42, lineHeight: 1, flexShrink: 0 }}>{step}</div>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 800, color: "#18181b", marginBottom: 4, lineHeight: 1.3 }}>{title}</p>
                  <p style={{ fontSize: 14, color: "#52525b", lineHeight: 1.6, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <CTA label="Reserve My Free Seat →" sub={`${WHEN_LINE} · Free`} />
          </div>
        </div>
      </section>

      {/* ══ 4. WHO'S HOSTING (authority) ═════════════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative max-w-[220px]">
                <div className="rounded-2xl overflow-hidden" style={{ border: "4px solid #fff", boxShadow: "0 16px 40px -12px rgba(0,0,0,0.25)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/rohan.png" alt="Rohan — Host" className="w-full h-full object-cover object-top" style={{ aspectRatio: "1/1" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              </div>
            </div>
            <div className="lg:col-span-8 text-center lg:text-left">
              <p className="duc-label mb-3">Your host</p>
              <h2 className="duc-h2 mb-4" style={{ color: "#18181b" }}>Hi, I&apos;m Rohan 👋</h2>
              <div className="space-y-4 duc-body">
                <p>For years I was the person who <strong style={{ color: "#18181b" }}>knew everything about being healthier and did none of it consistently.</strong> Every Monday was &ldquo;the Monday I&apos;d finally start&rdquo; — and every Thursday it fell apart.</p>
                <p>I wasn&apos;t lazy. My plans were just always too big to survive a real, busy week. What finally changed things was making each habit so small it was hard to say no — and having a simple rule to restart after a slip. I turned that into the <strong style={{ color: "#18181b" }}>5S system</strong>, and I&apos;ve since shared it with working professionals across India who were tired of starting over.</p>
                <p style={{ fontStyle: "italic", color: "#71717a" }}>This free webinar is the clearest way I know to hand it to you — with a plan you leave holding, not just notes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. WHO THIS IS FOR ═══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "linear-gradient(135deg,#171412 0%,#18181b 50%,#171412 100%)" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3" style={{ color: "#a8790d" }}>Who this is for</p>
            <h2 className="duc-h2 mb-3" style={{ color: "#fff" }}>This webinar is for you if…</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "You want to manage your weight but have no time for long gym routines.",
              "You keep starting and quitting healthy routines every few weeks.",
              "You already know the advice — you just can't make it stick.",
              "You don't want strict diets or extreme workout plans.",
              "You want a simple system you can follow at your own pace.",
              "You're ready to stop restarting and finally stay consistent.",
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-4 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,160,23,0.18)" }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)", fontSize: 14, color: "#fff", fontWeight: 900 }}>✓</div>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.88)", lineHeight: 1.6, fontWeight: 500 }}>{point}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <button onClick={openRegister} className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-full font-black text-white" style={{ fontSize: 18, boxShadow: "0 8px 28px rgba(212,160,23,0.42)", border: "none", cursor: "pointer" }}>
              <TicketIcon size={20} />Yes — Reserve My Free Seat →
            </button>
          </div>
        </div>
      </section>

      {/* ══ 6. FAQ ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">FAQ</p>
            <h2 className="duc-h2 duc-section-title">Quick questions, answered</h2>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { q: "Is it really free?", a: "Yes — completely free to attend. We just ask for your name, email and WhatsApp number so we can send you the joining link and reminders." },
              { q: "When is it and how long?", a: `${WHEN_LINE}. Once you register we'll send the exact joining details and reminders to your WhatsApp.` },
              { q: "Will I get a diet plan?", a: "No. This isn't a diet — we don't hand out meal plans or tell everyone to eat the same food. It's about building small, consistent habits that support healthier weight management." },
              { q: "Do I need a gym?", a: "No gym, no equipment. The movement habits are simple things that fit into a normal working day." },
              { q: "Will I definitely lose weight?", a: "We can't promise a specific result — weight is influenced by many factors. What you get is a practical system to build the habits that support healthier weight management." },
              { q: "What if I miss the live session?", a: "Register anyway — we'll let registrants know the options. Showing up live is best because you build your habit and plan with us in real time." },
              { q: "Is there anything to buy?", a: "Not to attend. The webinar is genuinely useful on its own. If there's a paid program later, it's entirely optional and we'll explain it clearly — no pressure." },
            ].map(({ q, a }) => <FAQ key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* ══ 7. FINAL CLOSE ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 lg:py-24" style={{ background: "#18181b" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(212,160,23,0.1),transparent 70%)" }} />
        <div className="max-w-xl mx-auto px-6 text-center relative">
          <p style={{ fontSize: 44 }} className="mb-4">🎟️</p>
          <p className="duc-label mb-3" style={{ color: "#a8790d" }}>Free live webinar</p>
          <h2 className="duc-h1 mb-4" style={{ color: "#fff" }}>
            Stop starting over.<br />
            <span style={{ color: "#a8790d" }}>Start staying consistent.</span>
          </h2>
          <p style={{ fontSize: 16, color: "#a1a1aa", lineHeight: 1.7, marginBottom: 10 }}>
            The 5S system. One habit you build with us. A 7-day plan you leave with.
          </p>
          <p style={{ fontSize: 15, fontWeight: 700, color: "#e8a020", marginBottom: 28 }}>🗓 {WHEN_LINE}</p>
          <CTA label="Reserve My Free Seat →" sub={`${WEBINAR.seatsLine}`} />
          <p className="mt-5" style={{ fontSize: 13, color: "#52525b" }}>
            Questions?{" "}
            <a href="https://wa.me/918956146485?text=Hi%2C+I+have+a+question+about+the+free+weight+habits+webinar" className="underline" style={{ color: "#a8790d" }}>Chat with Rohan on WhatsApp</a>
          </p>
        </div>
      </section>

      <footer className="px-5 py-6 text-center" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p style={{ fontSize: 12, color: "#52525b" }}>
          © {new Date().getFullYear()} High Performance Club ·{" "}
          <a href="https://www.highperformanceclub.co" className="underline" style={{ color: "#3f3f46" }}>highperformanceclub.co</a>
        </p>
        <p style={{ fontSize: 12, color: "#3f3f46", marginTop: 4 }}>Free live webinar · General wellness education · Results vary · Not medical advice</p>
      </footer>

      <StickyBottomCTA />
      <LiveToast />
      <RegisterNudge />
      <RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
    </RegisterCtx.Provider>
  );
}
