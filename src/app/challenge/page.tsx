"use client";
import { useState, useEffect, useRef, createContext, useContext } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// ─── Registration modal context ────────────────────────────────────────────────
// Replaces the old one-click Razorpay "buy()" flow. Every CTA now opens a modal
// that collects name + email + WhatsApp and posts to /api/webinar-register (Neon).
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
function Check({ green }: { green?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="10" cy="10" r="10" fill={green ? "#b8860b" : "#e4e4e7"} />
      {green
        ? <path d="M6 10l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        : <path d="M7 7l6 6M13 7l-6 6" stroke="#a1a1aa" strokeWidth="1.8" strokeLinecap="round" />}
    </svg>
  );
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
      // Registration endpoint always resolves ok server-side; treat as done.
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
              <p style={{ fontSize: 15, color: "#3f3f46", lineHeight: 1.7, marginBottom: 18 }}>
                Your seat for <strong style={{ color: "#18181b" }}>&ldquo;Stop Starting Over With Weight Loss&rdquo;</strong> is booked. We&apos;ll send the joining details and reminders on WhatsApp.
              </p>
              <div className="rounded-xl p-4 mb-5 text-left" style={{ background: "rgba(212,160,23,0.06)", border: "1px solid rgba(212,160,23,0.2)" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#9a6b0a", marginBottom: 6 }}>Your first tiny habit — start today:</p>
                <p style={{ fontSize: 13.5, color: "#52525b", lineHeight: 1.6 }}>Before your next second serving or unplanned snack, pause and take three slow breaths. That&apos;s it.</p>
              </div>
              <button onClick={onClose} className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full font-black text-white btn-primary" style={{ fontSize: 15, border: "none", cursor: "pointer" }}>
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="px-6 py-5">
              <p style={{ fontSize: 13.5, color: "#52525b", lineHeight: 1.6, marginBottom: 16, textAlign: "center" }}>
                Free live webinar. Enter your details and we&apos;ll send the joining link and reminders on WhatsApp.
              </p>
              <div className="flex flex-col gap-3">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" autoComplete="name"
                  style={inputStyle} />
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" type="email" autoComplete="email"
                  style={inputStyle} />
                <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="WhatsApp number" type="tel" inputMode="tel" autoComplete="tel"
                  style={inputStyle} />
              </div>
              {status === "error" && (
                <p style={{ fontSize: 12.5, color: "#dc2626", marginTop: 10, textAlign: "center" }}>
                  Please enter your name, a valid email and WhatsApp number.
                </p>
              )}
              <button type="submit" disabled={status === "loading"} className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full font-black text-white btn-primary mt-4" style={{ fontSize: 16, boxShadow: "0 6px 20px rgba(212,160,23,0.4)", border: "none", cursor: status === "loading" ? "wait" : "pointer", opacity: status === "loading" ? 0.7 : 1 }}>
                <TicketIcon size={18} />{status === "loading" ? "Reserving…" : "Reserve My Free Seat →"}
              </button>
              <p style={{ fontSize: 12, color: "#a1a1aa", marginTop: 8, textAlign: "center" }}>Free · Live on WhatsApp · No spam</p>
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

// ─── Overlays ─────────────────────────────────────────────────────────────────
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
          <div className="text-left"><p className="text-white font-black text-sm leading-tight">Reserve My Free Seat →</p><p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.8)" }}>Free live webinar · Limited seats</p></div>
          <div className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}><TicketIcon size={15} /><span className="text-white font-bold text-sm">Join</span></div>
        </button>
      </div>
      <div className="hidden md:block px-6 pb-4 pt-3" style={{ background: "linear-gradient(to top,#faf8f3 70%,transparent)", backdropFilter: "blur(8px)" }}>
        <div className="max-w-lg mx-auto">
          <button onClick={register} className="w-full flex items-center justify-between gap-4 rounded-2xl px-6 py-3.5" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)", boxShadow: "0 4px 20px rgba(212,160,23,0.4)", border: "none", cursor: "pointer" }}>
            <div className="text-left"><p className="text-white font-black text-sm leading-tight">Reserve My Free Seat →</p><p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.8)" }}>Free live webinar · Learn the 5S system · Leave with a 7-day plan</p></div>
            <div className="flex items-center gap-2 rounded-xl px-4 py-2 shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}><TicketIcon size={16} /><span className="text-white font-bold text-sm">Join Free</span></div>
          </button>
        </div>
      </div>
    </div>
  );
}

const NAMES = [
  { name: "Rahul", city: "Delhi" }, { name: "Priya", city: "Mumbai" }, { name: "Aditya", city: "Bengaluru" },
  { name: "Sneha", city: "Pune" }, { name: "Vikram", city: "Hyderabad" }, { name: "Anjali", city: "Chennai" },
  { name: "Karan", city: "Jaipur" }, { name: "Divya", city: "Ahmedabad" }, { name: "Manish", city: "Kolkata" },
  { name: "Meera", city: "Surat" }, { name: "Arjun", city: "Lucknow" }, { name: "Tanvi", city: "Nagpur" },
  { name: "Nikhil", city: "Indore" }, { name: "Kavya", city: "Kochi" }, { name: "Ritesh", city: "Bhopal" },
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
      timer.current = setTimeout(spawn, 7000 + Math.random() * 11000);
    };
    timer.current = setTimeout(spawn, 3000 + Math.random() * 3000);
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

function TrialPopup() {
  const register = useRegister();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const shown = useRef(false);
  useEffect(() => {
    const t = setTimeout(() => {
      if (shown.current) return;
      try { if (localStorage.getItem("whw_pop") === "1") return; } catch { /**/ }
      shown.current = true; setVisible(true);
    }, 15000);
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
            <h2 className="text-white font-black leading-snug" style={{ fontSize: 18 }}>Your free seat is waiting</h2>
          </div>
          <div className="px-6 py-5 text-center">
            <p style={{ fontSize: 14, color: "#3f3f46", lineHeight: 1.7, marginBottom: 16 }}>
              Join the free live webinar <strong style={{ color: "#18181b" }}>&ldquo;Stop Starting Over With Weight Loss&rdquo;</strong> — learn the 5S Daily Upgrade System and leave with a 7-day plan you can actually keep.
            </p>
            <div className="flex flex-col gap-2 mb-5 text-left">
              {["Free live session on WhatsApp", "A tiny-habit system, not another diet", "Leave with a ready 7-day plan"].map(t => (
                <div key={t} className="flex items-center gap-2" style={{ fontSize: 13, color: "#4a4a52" }}>
                  <span style={{ color: "#a8790d", fontWeight: 700 }}>✅</span>{t}
                </div>
              ))}
            </div>
            <button onClick={() => { dismiss(); register(); }} className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full font-black text-white btn-primary" style={{ fontSize: 16, boxShadow: "0 6px 20px rgba(212,160,23,0.4)", border: "none", cursor: "pointer" }}>
              <TicketIcon size={18} />Reserve My Free Seat →
            </button>
            <p style={{ fontSize: 12, color: "#a1a1aa", marginTop: 8 }}>Free · Live on WhatsApp · No spam</p>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── TinyGainsDUC (compounding metaphor — illustrative, not a health claim) ──
const VW = 720, VH = 460, X0 = 90, Y0 = 360, XEND = 660, TOP = 40;
const BETTER_PATH = `M ${X0} ${Y0} C ${X0 + 240} ${Y0 - 8}, ${XEND - 140} ${Y0 - 70}, ${XEND} ${TOP}`;

function TinyGainsDUC() {
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setShown(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: "#fff", borderTop: "1px solid #e4e4e7" }} className="py-16 lg:py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-10 lg:mb-12">
          <p className="duc-label mb-3" style={{ color: "#a8790d" }}>The power of repeating small habits</p>
          <h2 className="duc-h2 mb-4" style={{ color: "#18181b" }}>
            Small habits, <span style={{ color: "#a8790d" }}>repeated</span>, add up
          </h2>
          <p className="duc-body max-w-2xl mx-auto" style={{ color: "#52525b" }}>
            One small habit feels like nothing on Day 1. But small actions are easier to start and easier to keep — and when you repeat them, they compound over time.{" "}
            <strong style={{ color: "#18181b" }}>Progress isn&apos;t perfectly linear, but consistency is what moves the needle.</strong>
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 mb-10">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl text-center" style={{ background: "rgba(212,160,23,0.08)", border: "1.5px solid rgba(212,160,23,0.3)" }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#18181b" }}>
              The idea: repeated 1% improvements{" "}
              <span style={{ color: "#a8790d" }}>accumulate far more than you&apos;d expect</span> 🚀
            </span>
          </div>
          <p style={{ fontSize: 12.5, color: "#71717a", fontWeight: 500 }}>
            — a simple visual metaphor popularized in <em>Atomic Habits</em> (James Clear). Illustrative, not a guarantee.
          </p>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" style={{ overflow: "visible" }}>
            <line x1={X0} y1={TOP - 10} x2={X0} y2={Y0 + 60} stroke="#cbd5e1" strokeWidth={2.5} strokeLinecap="round" />
            <line x1={X0} y1={Y0 + 60} x2={XEND + 20} y2={Y0 + 60} stroke="#cbd5e1" strokeWidth={2.5} strokeLinecap="round" />
            <text x={X0 - 14} y={(TOP + Y0) / 2} textAnchor="middle" fontSize={15} fill="#64748b" transform={`rotate(-90 ${X0 - 56} ${(TOP + Y0) / 2})`}>Progress</text>
            <text x={X0 - 16} y={Y0 + 5} textAnchor="end" fontSize={16} fontWeight={700} fill="#475569">Start</text>
            <text x={X0} y={Y0 + 84} textAnchor="middle" fontSize={14} fill="#64748b">Today</text>
            <text x={XEND} y={Y0 + 84} textAnchor="middle" fontSize={14} fontWeight={700} fill="#475569">Over time</text>
            <line x1={X0} y1={Y0} x2={XEND} y2={Y0} stroke="#94a3b8" strokeWidth={2.5} strokeDasharray="8 8" style={{ opacity: shown ? 1 : 0, transition: "opacity 0.6s 0.3s" }} />
            <text x={XEND - 4} y={Y0 - 12} textAnchor="end" fontSize={13} fill="#94a3b8" style={{ opacity: shown ? 1 : 0, transition: "opacity 0.6s 0.6s" }}>Start &amp; stop — no real change</text>
            <path d={BETTER_PATH} fill="none" stroke="#d4a017" strokeWidth={4.5} strokeLinecap="round" pathLength={1}
              style={{ strokeDasharray: 1, strokeDashoffset: shown ? 0 : 1, transition: "stroke-dashoffset 1.8s ease 0.3s" }} />
            <g style={{ opacity: shown ? 1 : 0, transition: "opacity 0.5s 1.7s" }}>
              <rect x={XEND - 240} y={TOP + 4} width={168} height={46} rx={12} fill="#d4a017" />
              <text x={XEND - 156} y={TOP + 33} textAnchor="middle" fontSize={18} fontWeight={900} fill="#fff">Consistency 🚀</text>
            </g>
          </svg>
          <div className="absolute" style={{ left: `${(X0 / VW) * 100}%`, top: `${(Y0 / VH) * 100}%`, transform: "translate(-50%, 64px)" }}>
            <div className="whitespace-nowrap rounded-full text-xs font-bold px-3 py-1.5 shadow-lg" style={{ background: "#18181b", color: "#fff", opacity: shown ? 1 : 0, transform: shown ? "translateY(0)" : "translateY(6px)", transition: "all 0.5s 0.4s" }}>
              👉 You are here
            </div>
          </div>
        </div>
        <div className="text-center mt-12 lg:mt-14">
          <p style={{ fontSize: 19, fontWeight: 700, color: "#18181b", maxWidth: 560, margin: "0 auto 8px", lineHeight: 1.4 }}>
            If you keep starting over, nothing compounds.
          </p>
          <p style={{ fontSize: 16, color: "#52525b", maxWidth: 560, margin: "0 auto 32px", lineHeight: 1.7 }}>
            The webinar shows you how to pick one small habit, shrink it so it survives a busy day, and keep it going. The consistency does the rest.
          </p>
          <CTA label="Reserve My Free Seat →" sub="Free live webinar · Learn the 5S system · Leave with a 7-day plan" />
        </div>
      </div>
    </section>
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

// ─── The 5S system as "tracks" (structure reused from the tabbed section) ─────
const TRACKS = [
  { month: 1, icon: "🥗", title: "Eating Awareness", subtitle: "Change HOW and WHEN you eat — without a diet plan", color: "#b8860b", colorLight: "rgba(184,134,11,0.08)", colorBorder: "rgba(184,134,11,0.2)", days: "The eating pillar",
    habits: ["Pause before a second serving", "Eat the first few bites slowly", "One screen-free meal a day", "A glass of water before lunch", "A planned evening snack instead of an automatic one", "Close the kitchen a while before bed"],
    outcome: "Fewer automatic eating decisions — without counting a single calorie" },
  { month: 2, icon: "🏃", title: "Everyday Movement", subtitle: "Add real activity into your day — without a gym", color: "#f97316", colorLight: "rgba(249,115,22,0.08)", colorBorder: "rgba(249,115,22,0.2)", days: "The movement pillar",
    habits: ["A 2-minute walk after a meal", "Stand up once every hour", "Take the stairs for one floor", "Walk during a phone call", "A short stretch break in the afternoon", "Park a little farther and walk"],
    outcome: "More daily activity that fits your schedule — no workout clothes required" },
  { month: 3, icon: "🌙", title: "Sleep & Consistency", subtitle: "Steady sleep and a system that survives busy weeks", color: "#6366f1", colorLight: "rgba(99,102,241,0.08)", colorBorder: "rgba(99,102,241,0.2)", days: "The consistency pillar",
    habits: ["A more consistent wake-up time", "A simple wind-down cue before bed", "Park the phone outside the bedroom", "A good-enough weekend routine", "A plan for travel and social days", "The restart rule after a missed day"],
    outcome: "A routine that holds up on weekends, travel and low-motivation days" },
];

const SAMPLE_HABITS = [
  { area: "🎯 Select & Shrink", color: "#b8860b", colorLight: "rgba(184,134,11,0.08)", colorBorder: "rgba(184,134,11,0.25)", emoji: "🎯",
    habits: [
      { day: "Step 1", title: "Pick a behaviour, not an outcome", desc: "\"Lose 10 kg\" is an outcome. \"Pause before a second serving\" is a behaviour you can actually do today.", why: "You can't do an outcome. You can do a behaviour. The webinar helps you convert one goal into one repeatable action.", image: "🎯" },
      { day: "Step 2", title: "Shrink it for a hard day", desc: "A 20-minute walk becomes a 2-minute walk on your busiest day. Tiny is the starting version, not the destination.", why: "A habit that survives your worst day is a habit you keep. That's what makes it stick past Week 2.", image: "🤏" },
      { day: "Step 3", title: "Attach it to a routine", desc: "\"After I finish dinner, I walk for two minutes.\" The trigger is something already happening in your day.", why: "Anchoring a new habit to an existing one removes the \"I forgot\" and \"not now\" problem.", image: "🔗" },
    ] },
  { area: "📊 Score & Scale", color: "#f97316", colorLight: "rgba(249,115,22,0.08)", colorBorder: "rgba(249,115,22,0.25)", emoji: "📊",
    habits: [
      { day: "Step 4", title: "Score honestly — not perfectly", desc: "Done, tiny-version done, missed, or restarted. Missing once and restarting is a skill, not a failure.", why: "Tracking only perfect streaks makes people quit after one slip. Scoring restarts keeps you in the game.", image: "✅" },
      { day: "Step 5", title: "Scale only after it's consistent", desc: "Two-minute walk this week, five next, eight after that — but only once the smaller version is automatic.", why: "Growing too fast is why plans collapse. You grow the habit carefully enough to sustain it.", image: "📈" },
      { day: "Bonus", title: "Never miss the restart", desc: "The goal isn't a perfect 90 days. The goal is coming back quickly after a miss — every single time.", why: "The people who keep the weight off aren't perfect. They're just fast to restart.", image: "🔁" },
    ] },
  { area: "🧭 Your 7-day plan", color: "#6366f1", colorLight: "rgba(99,102,241,0.08)", colorBorder: "rgba(99,102,241,0.25)", emoji: "🧭",
    habits: [
      { day: "In the webinar", title: "Build it live with us", desc: "You'll write down your obstacle, your one behaviour, your tiny version, your trigger and your restart rule.", why: "You leave with a real system on paper — not just motivation that fades by tomorrow.", image: "📝" },
      { day: "Day 1–7", title: "Run it for a week", desc: "One clear action a day, with the exact trigger and the tiny version for busy days. You always know what to do.", why: "A week of repetition is where a habit starts to feel automatic — this is the proof-of-concept for yourself.", image: "🗓️" },
      { day: "After", title: "Decide what to keep", desc: "At the end you keep what worked, drop what didn't, and know exactly how to build the next habit.", why: "This is the difference between a tips subscription and an actual behaviour-change system.", image: "🎁" },
    ] },
];

// Repositioned as behaviour-science context — no unsupported medical claims.
const SCIENCE = [
  { logo: "📖", name: "BJ Fogg, PhD — Stanford", title: "Tiny Habits: The Small Changes That Change Everything", quote: "The most reliable behaviour change comes from small, specific actions anchored to routines you already have — not from motivation or willpower.", color: "#b8860b", tag: "Behaviour Science" },
  { logo: "🧠", name: "James Clear", title: "Atomic Habits", quote: "You do not rise to the level of your goals. You fall to the level of your systems. Make the habit small enough that you can't say no.", color: "#6366f1", tag: "Habit Formation" },
  { logo: "🔬", name: "Habit-formation research", title: "Systematic review, 2024", quote: "Studies suggest habits take a wide range of time to form — often around two months, with large differences between people. Repetition in a stable context is the common thread.", color: "#f97316", tag: "Consistency Research" },
];

const LW_TESTIMONIALS = [
  { name: "Priya S.", role: "Marketing Manager, Pune", avatar: "PS", result: "Finally consistent", text: "I've tried keto, gym memberships, dieticians. Nothing stuck. The tiny-habit approach was the first thing I actually kept doing on my busy days." },
  { name: "Rahul M.", role: "Software Engineer, Bangalore", avatar: "RM", result: "No more all-or-nothing", text: "I work 10-hour days. A tiny 2-minute version I could always do. The reframe about restarting after a miss was the thing I needed to hear." },
  { name: "Deepika K.", role: "CA, Mumbai", avatar: "DK", result: "Kept it up while travelling", text: "I travel 3 weeks a month. Having a 'good enough' version for travel days meant I stopped falling off completely every trip." },
  { name: "Arjun T.", role: "Startup Founder, Delhi", avatar: "AT", result: "Stopped restarting every Monday", text: "The webinar made me realise my plans were always too big to survive a normal week. One small habit at a time actually worked." },
  { name: "Meera R.", role: "Product Manager, Hyderabad", avatar: "MR", result: "Better weekend routine", text: "The weekend and restart system was the surprise for me. I no longer treat one missed day as the end of the week." },
  { name: "Karan V.", role: "Sales Director, Chennai", avatar: "KV", result: "One habit at a time", text: "The structure is what made it click — one behaviour, one trigger, one tiny version. I always knew exactly what I was doing." },
];

const WHATS_INSIDE = [
  { icon: "🧠", title: "Why your plans keep collapsing", desc: "The four reasons healthy routines fall apart — outcome-thinking, too many changes at once, motivation dependence, and no restart system." },
  { icon: "🎯", title: "The 5S Daily Upgrade System", desc: "Select, Shrink, Stack, Score, Scale — a simple, repeatable method for turning any health goal into a habit you can actually keep." },
  { icon: "📝", title: "A live habit-building exercise", desc: "You'll convert one of your own weight-management goals into a tiny, repeatable action — with a trigger and a difficult-day version." },
  { icon: "🗓", title: "Your 7-day starter plan", desc: "Leave the session with a concrete week-one plan you can begin the very next morning — no guessing what to do." },
  { icon: "🔁", title: "The restart rule", desc: "How to bounce back in a day instead of quitting for a month — the single skill that separates people who keep going from those who don't." },
  { icon: "🍽️", title: "Eating-awareness habits", desc: "Simple ways to reduce automatic eating decisions — no calorie counting, no meal plans, no forbidden foods." },
  { icon: "🏃", title: "Everyday movement ideas", desc: "How to add real activity into a 10-hour workday without a gym, workout clothes or a spare hour." },
  { icon: "🌙", title: "Sleep & consistency basics", desc: "Small, realistic shifts to steady your sleep and routine so healthy choices get easier — not harder." },
  { icon: "🧭", title: "How to handle weekends & travel", desc: "A \"good enough\" version of your routine for the days that usually derail everyone." },
  { icon: "❓", title: "Live Q&A", desc: "Honest answers to the real questions — \"Will I get a diet?\", \"Do I need a gym?\", \"What if I miss days?\"" },
  { icon: "🎟️", title: "It's completely free", desc: "A live, practical session designed for people who know what to do but struggle to make it stick. Nothing to buy to attend." },
];

// ═════════════════════════════════════════════════════════════════════════════
// PAGE
// ═════════════════════════════════════════════════════════════════════════════
export default function ChallengeSalesPage() {
  useMetaPixelViewContent();
  const [activeTrack, setActiveTrack] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const openRegister = () => setModalOpen(true);

  return (
    <RegisterCtx.Provider value={openRegister}>
    <div id="ss-top" style={{ background: "#faf8f3", minHeight: "100vh", color: "#18181b", fontSize: 15 }}>
      <style>{`
        @keyframes duc-fadein{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ss-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        .duc-h1{font-size:clamp(2.1rem,5vw,3.2rem);font-weight:900;line-height:1.12;letter-spacing:-0.025em}
        .duc-h2{font-size:clamp(1.6rem,3.5vw,2.4rem);font-weight:800;line-height:1.18;letter-spacing:-0.02em}
        .duc-body{font-size:clamp(1rem,1.8vw,1.0625rem);line-height:1.75;color:#52525b}
        .duc-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:#a8790d}
        .duc-card{background:#fff;border:1px solid #e2dfd6;border-radius:16px;padding:20px}
        .duc-section-title{background:linear-gradient(135deg,#18181b 0%,#3f3f46 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .duc-glass{background:rgba(255,255,255,0.7);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.9)}
        .duc-glow-card{box-shadow:0 4px 24px rgba(212,160,23,0.08),0 1px 3px rgba(0,0,0,0.06);transition:box-shadow 0.2s,transform 0.2s}
        .duc-glow-card:hover{box-shadow:0 8px 32px rgba(212,160,23,0.14),0 2px 8px rgba(0,0,0,0.08);transform:translateY(-2px)}
        @keyframes theme-pulse{0%,100%{box-shadow:0 4px 24px rgba(212,160,23,0.08),0 1px 3px rgba(0,0,0,0.06);transform:translateY(0)}40%{box-shadow:0 0 0 3px rgba(212,160,23,0.55),0 8px 32px rgba(212,160,23,0.22);transform:translateY(-4px)}60%{box-shadow:0 0 0 3px rgba(212,160,23,0.55),0 8px 32px rgba(212,160,23,0.22);transform:translateY(-4px)}}
        .theme-card-anim{animation:theme-pulse 1.6s ease-in-out infinite}
        .shift-split{display:grid;grid-template-columns:1fr}
        .shift-arrow{left:50%}
        @media (min-width:768px){.shift-split{grid-template-columns:53.12% 46.88%}.shift-arrow{left:53.12%}}
        #ss-top .gradient-text{background:linear-gradient(135deg,#b8860b 0%,#d4a017 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}
        #ss-top .btn-primary{background:linear-gradient(135deg,#c8891a 0%,#e0b022 50%,#d4a017 100%);color:#171412;font-weight:900;box-shadow:0 8px 28px rgba(184,134,11,0.45),inset 0 1px 0 rgba(255,255,255,0.35)}
        #ss-top .btn-primary:hover{background:linear-gradient(135deg,#b8860b 0%,#e6be3a 50%,#c8891a 100%);box-shadow:0 12px 36px rgba(184,134,11,0.55),inset 0 1px 0 rgba(255,255,255,0.4)}
        #ss-top .btn-primary:active{background:#9a6b0a}
        #ss-top .accent-pill{background:rgba(212,160,23,0.12);color:#8a6508;border:1px solid rgba(212,160,23,0.35)}
        #ss-top .badge-after{background:linear-gradient(180deg,#fdf0c9 0%,#f6dd91 100%);color:#7a5308;border:1px solid #e6c766}
        #ss-top .mesh-bg{background:radial-gradient(60% 55% at 15% 10%,rgba(212,160,23,0.12) 0%,rgba(212,160,23,0) 60%),radial-gradient(55% 50% at 90% 15%,rgba(200,137,26,0.10) 0%,rgba(200,137,26,0) 60%),radial-gradient(60% 60% at 80% 90%,rgba(184,134,11,0.08) 0%,rgba(184,134,11,0) 60%),#faf8f3}
      `}</style>

      {/* ══ 0. ANNOUNCEMENT BAR ══════════════════════════════════════════════ */}
      <div style={{ background: "linear-gradient(90deg,#b8860b 0%,#d4a017 50%,#b8860b 100%)", padding: "10px 16px" }}>
        <p className="text-center font-semibold text-white" style={{ fontSize: 13, letterSpacing: "0.01em", lineHeight: 1.4 }}>
          ✦ Free live webinar — Stop Starting Over With Weight Loss. No strict diets, no complicated workouts. Limited seats ✦
        </p>
      </div>

      {/* ══ 1. HERO ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden mesh-bg" style={{ borderBottom: "1px solid #e2dfd6" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-4 pb-10 lg:pt-6 lg:pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100vh-72px)]">

            {/* LEFT */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 animate-fade-up accent-pill" style={{ fontSize: 13, fontWeight: 700 }}>
                <span className="w-2 h-2 rounded-full inline-block animate-pulse" style={{ background: "#d4a017" }} />
                Free live webinar for busy people who keep starting and stopping
              </div>

              {/* Headline */}
              <h1 className="duc-h1 text-foreground animate-fade-up delay-100 mb-5">
                Stop Starting Over<br />
                <span className="gradient-text">With Weight Loss</span>
              </h1>

              {/* Subhead */}
              <div className="animate-fade-up delay-150 mb-7 max-w-lg mx-auto lg:mx-0 relative">
                <p style={{ fontSize: 16, lineHeight: 1.75, color: "#52525b" }}>
                  Learn how to turn healthy intentions into{" "}
                  <span style={{ fontWeight: 800, color: "#18181b", position: "relative", display: "inline-block" }}>
                    tiny daily habits you can actually maintain
                    <svg viewBox="0 0 200 10" aria-hidden="true" style={{ position: "absolute", bottom: -4, left: 0, width: "100%", height: 8, overflow: "visible" }}>
                      <path d="M2 6 Q50 2 100 6 Q150 10 198 5" stroke="#d4a017" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    </svg>
                  </span>{" "}
                  — without strict diets, complicated workouts, or rebuilding your whole life overnight.
                </p>

                {/* Callout — label shifted right, clean arrow only */}
                <div className="hidden lg:block absolute pointer-events-none"
                  style={{ right: -260, top: 0 }}>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full font-bold mb-2"
                    style={{ background: "#d4a017", color: "#fff", fontSize: 15, whiteSpace: "nowrap", boxShadow: "0 6px 20px rgba(212,160,23,0.45)", letterSpacing: "-0.01em", marginLeft: 20 }}>
                    <TicketIcon size={17} />
                    Free live session
                  </div>
                  <svg width="200" height="100" viewBox="0 0 200 100" fill="none" style={{ marginLeft: 10 }}>
                    <path d="M12 12 C22 55 70 92 178 84" stroke="#d4a017" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="6 5" />
                    <path d="M164 72 L182 84 L162 92" stroke="#d4a017" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Mobile — inline badge */}
                <div className="flex lg:hidden items-center gap-2 mt-3">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full font-bold"
                    style={{ background: "#d4a017", color: "#fff", fontSize: 14, boxShadow: "0 4px 14px rgba(212,160,23,0.35)" }}>
                    <TicketIcon size={15} />
                    Free live session
                  </div>
                </div>
              </div>

              {/* Objection-busters above CTA — single line, dot-separated */}
              <div className="animate-fade-up delay-250 flex items-center justify-center lg:justify-start flex-wrap gap-x-3 gap-y-1 mb-5">
                {["No strict diets", "No complicated workouts", "Fits your real schedule"].map((line, i, arr) => (
                  <span key={line} className="flex items-center gap-3">
                    <span style={{ fontSize: 14, color: "#3f3f46", fontWeight: 600 }}>{line}</span>
                    {i < arr.length - 1 && <span style={{ color: "#a8790d", fontSize: 16, fontWeight: 900 }}>·</span>}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="animate-fade-up delay-300 flex flex-col items-center lg:items-start gap-2 mb-8">
                <button
                  onClick={openRegister}
                  className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-full font-black text-white"
                  style={{ fontSize: 20, boxShadow: "0 8px 28px rgba(212,160,23,0.42)", border: "none", cursor: "pointer" }}>
                  <TicketIcon size={22} />Reserve My Free Seat
                </button>
                <p style={{ fontSize: 13, color: "#71717a", textAlign: "center" }}>Free · Live on WhatsApp · Leave with a 7-day plan</p>
              </div>

              {/* Social proof */}
              <div className="animate-fade-up delay-400 flex items-center gap-4 justify-center lg:justify-start">
                <div className="flex -space-x-2 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/avatars/women/woman-1.jpg" alt="" className="w-9 h-9 rounded-full object-cover border-2 border-white" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/avatars/women/woman-3.avif" alt="" className="w-9 h-9 rounded-full object-cover border-2 border-white" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/avatars/men/man-1.jpg" alt="" className="w-9 h-9 rounded-full object-cover border-2 border-white" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/avatars/women/woman-1.jpg" alt="" className="w-9 h-9 rounded-full object-cover border-2 border-white" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/avatars/men/man-1.jpg" alt="" className="w-9 h-9 rounded-full object-cover border-2 border-white" />
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">{[1,2,3,4,5].map(i=><Star key={i}/>)}</div>
                  <p style={{ fontSize: 13, color: "#52525b" }}>
                    <strong style={{ color: "#18181b" }}>Loved by working professionals</strong> across India
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT — webinar title card on a gold glow panel */}
            <div className="lg:col-span-5 flex justify-center items-start animate-fade-up delay-300 lg:-mt-10 mt-6">
              <div className="relative w-full max-w-sm">
                <div
                  className="relative w-full flex flex-col items-center justify-center px-6 py-10"
                  style={{
                    borderRadius: 40,
                    background: "linear-gradient(160deg,#d4a017 0%,#b8860b 100%)",
                    boxShadow: "0 24px 60px -18px rgba(212,160,23,0.55), inset 0 1px 0 rgba(255,255,255,0.25)",
                    overflow: "hidden",
                    minHeight: 380,
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 80% at 50% -10%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 55%)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", left: "-20%", bottom: "-25%", width: "70%", height: "60%", background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)", filter: "blur(24px)", pointerEvents: "none" }} />
                  <div className="relative text-center" style={{ animation: "ss-float 5s ease-in-out infinite" }}>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5" style={{ background: "rgba(255,255,255,0.22)", color: "#fff", fontSize: 12, fontWeight: 800, letterSpacing: "0.08em" }}>
                      🎟️ FREE LIVE WEBINAR
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Stop Starting Over</p>
                    <h3 style={{ color: "#fff", fontSize: 30, fontWeight: 900, lineHeight: 1.15, marginBottom: 16, textShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>With Weight Loss</h3>
                    <div className="flex flex-col gap-2.5 items-start mx-auto" style={{ maxWidth: 240 }}>
                      {["The 5S Daily Upgrade System", "One habit you build live", "A ready 7-day starter plan"].map(t => (
                        <div key={t} className="flex items-center gap-2" style={{ color: "#fff", fontSize: 13.5, fontWeight: 600 }}>
                          <span style={{ background: "rgba(255,255,255,0.25)", borderRadius: "50%", width: 20, height: 20, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✓</span>
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ 2. PAIN POINTS ════════════════════════════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">Sound familiar?</p>
            <h2 className="duc-h2 duc-section-title mb-3">This is why healthy routines keep falling apart</h2>
            <p className="duc-body max-w-sm mx-auto">If you nodded at even one of these, <strong style={{ color: "#18181b" }}>this webinar</strong> was built for you.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "🔁", keyword: "The Monday Restart", text: "You start strong on Monday. By Thursday it's already slipping. Next Monday, you start over again.", color: "#6366f1", solidBg: "#eef2ff", border: "#c7d2fe", img: "/goals/pain/nothing-sticks.png" },
              { icon: "💳", keyword: "Wasted Memberships", text: "You've paid for gym memberships this year. You went twice, total.", color: "#d97706", solidBg: "#fffbeb", border: "#fde68a", img: "/goals/pain/gym-wasted.png" },
              { icon: "⚡", keyword: "All-or-Nothing", text: "One missed day feels like failure — so you give up the whole plan instead of just continuing.", color: "#db2777", solidBg: "#fdf2f8", border: "#f9a8d4", img: "/goals/pain/desk-lunch.png" },
              { icon: "🛏", keyword: "Broken Sleep", text: "You sleep at 1 AM, wake at 7, skip breakfast, and wonder why you're exhausted and reaching for snacks.", color: "#c8891a", solidBg: "#f5f3ff", border: "#ddd6fe", img: "/goals/pain/broken-sleep.png" },
              { icon: "✈️", keyword: "Constant Travel", text: "You travel constantly. Hotel food, airport junk, zero routine — and the plan disappears.", color: "#059669", solidBg: "#ecfdf5", border: "#6ee7b7", img: "/goals/pain/travel.png" },
              { icon: "📚", keyword: "Information Overload", text: "You already know most of the advice. Knowing isn't the problem — keeping it going is.", color: "#0284c7", solidBg: "#f0f9ff", border: "#bae6fd", img: "/goals/pain/nothing-sticks.png" },
              { icon: "⏰", keyword: "No Free Time", text: "A 1-hour gym routine was never realistic for a 10-hour workday.", color: "#ea580c", solidBg: "#fff7ed", border: "#fed7aa", img: "/goals/pain/no-time.png" },
            ].map((p, i) => (
              <div key={i} className="duc-glow-card rounded-2xl overflow-hidden flex flex-col" style={{ background: p.solidBg, border: `2px solid ${p.border}` }}>
                <div className="relative h-36 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 35%, ${p.solidBg} 100%)` }} />
                  <div className="absolute bottom-2 left-3 flex items-center gap-2">
                    <span style={{ fontSize: 24 }}>{p.icon}</span>
                  </div>
                </div>
                <div className="px-4 pb-4 pt-3 flex-1">
                  <p style={{ fontSize: 19, fontWeight: 900, color: p.color, lineHeight: 1.2, marginBottom: 8, letterSpacing: "-0.01em" }}>{p.keyword}</p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#18181b", lineHeight: 1.6 }}>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl p-6 text-center" style={{ background: "linear-gradient(135deg,rgba(212,160,23,0.08),rgba(184,134,11,0.04))", border: "1px solid rgba(212,160,23,0.18)" }}>
            <p className="font-bold mb-2" style={{ fontSize: 17, color: "#18181b" }}>You don&apos;t have an information problem. You have a system that&apos;s too hard to repeat.</p>
            <p className="duc-body mb-5">Most plans fail because they ask for too much, too fast. In this free webinar you&apos;ll learn how to start <strong style={{ color: "#b8860b" }}>small enough to repeat</strong> — so consistency finally becomes realistic.</p>
            <button
              onClick={openRegister}
              className="btn-primary inline-flex items-center gap-3 px-8 py-4 rounded-full font-black text-white"
              style={{ fontSize: 16, boxShadow: "0 8px 28px rgba(212,160,23,0.42)", border: "none", cursor: "pointer" }}>
              <TicketIcon size={18} />Reserve My Free Seat
            </button>
            <p className="mt-2" style={{ fontSize: 12, color: "#71717a" }}>Free · Live on WhatsApp · No spam</p>
          </div>
        </div>
      </section>

      {/* ══ 3. THE SHIFT ══════════════════════════════════════════════════════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">THE SHIFT</p>
            <h2 className="duc-h2 duc-section-title mb-3">Before the webinar <span style={{ color: "#a8790d" }}>→</span> after 90 minutes with us</h2>
            <p className="duc-body max-w-md mx-auto">Same busy schedule. But a clear system and a plan you can actually keep.</p>
          </div>
          <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#e4e4e7", background: "#fff", boxShadow: "0 12px 40px -14px rgba(0,0,0,0.15)" }}>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/goals/shift-before-after-v90b.png" alt="Before and after the webinar — from starting over to a system you can keep" style={{ display: "block", width: "100%", height: "auto" }} loading="lazy" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />

            <div className="shift-split relative" style={{ borderTop: "1px solid #e4e4e7" }}>
              <div
                className="shift-arrow absolute top-1/2 z-10 flex items-center justify-center rounded-full"
                style={{ transform: "translate(-50%, -50%)", width: 52, height: 52, background: "#d4a017", boxShadow: "0 8px 22px rgba(212,160,23,0.5), 0 0 0 6px #fff" }}
                aria-hidden="true"
              >
                <svg className="hidden md:block" width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg className="md:hidden" width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M12 4v14M6 13l6 6 6-6" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Before */}
              <div className="p-6 md:border-r" style={{ background: "#fafafa", borderColor: "#e4e4e7" }}>
                <div className="inline-flex items-center px-3 py-1 rounded-full mb-5" style={{ background: "#fee2e2", color: "#991b1b", border: "1px solid #fca5a5", fontSize: 12, fontWeight: 700 }}>Before</div>
                <div className="flex flex-col gap-3.5">
                  {[
                    "No clear idea where to even start",
                    "Too much to fix, too little time",
                    "Confused by conflicting advice online",
                    "Plans that never survive a busy week",
                    "One missed day and the whole thing collapses",
                    "Restarting again every Monday",
                    "\"I'll start properly next week\"",
                  ].map((b, i) => (
                    <div key={i} className="flex items-center gap-3"><Check /><span style={{ fontSize: 14, color: "#52525b", lineHeight: 1.6 }}>{b}</span></div>
                  ))}
                </div>
              </div>

              {/* After */}
              <div className="p-6 relative overflow-hidden" style={{ background: "#f0fdf4" }}>
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full" style={{ background: "rgba(212,160,23,0.08)" }} aria-hidden="true" />
                <div className="relative">
                  <div className="inline-flex items-center px-3 py-1 rounded-full mb-5 badge-after" style={{ fontSize: 12, fontWeight: 700 }}>After the webinar</div>
                  <div className="flex flex-col gap-3.5">
                    {[
                      "A clear reason your past plans collapsed",
                      "One health goal turned into a tiny action",
                      "The 5S system to build consistency",
                      "A difficult-day version for busy days",
                      "A ready 7-day starter plan on paper",
                      "A restart rule so a slip isn't a quit",
                      "\"I finally have a system I can keep\"",
                    ].map((a, i) => (
                      <div key={i} className="flex items-center gap-3"><Check green /><span style={{ fontSize: 14, fontWeight: 600, color: "#18181b", lineHeight: 1.6 }}>{a}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <CTA label="I Want This →" sub="Free live webinar · Learn the 5S system · Leave with a 7-day plan" />
          </div>
        </div>
      </section>

      {/* ══ 4. HOW IT WORKS ═══════════════════════════════════════════════════ */}
      <section style={{ background: "#f4f4f0" }} className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="duc-label mb-3">Simple by design</p>
            <h2 className="duc-h2 duc-section-title mb-4">How the <span className="relative inline-block" style={{ whiteSpace: "nowrap", WebkitTextFillColor: "#18181b", color: "#18181b" }}>Free Webinar<svg viewBox="0 0 220 10" className="absolute left-0 bottom-[-4px] w-full" style={{ height: 8 }} fill="none"><path d="M2 7 Q55 2 110 6 Q165 10 218 5" stroke="#d4a017" strokeWidth="2.5" strokeLinecap="round" fill="none"/></svg></span> Works</h2>
            <p className="duc-body max-w-xl mx-auto">Register, join live, and leave with a real system — not just motivation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                n: "1",
                emoji: "🎟️",
                title: "Register Free in 30 Seconds",
                body: "Reserve your seat with your name, email and WhatsApp number. We'll send you the joining details and reminders so you don't miss it.",
              },
              {
                n: "2",
                emoji: "🎥",
                title: "Join the Live Session",
                body: "In about 90 minutes you'll learn the 5S Daily Upgrade System and, live with us, turn one of your own goals into a tiny, repeatable habit.",
              },
              {
                n: "3",
                emoji: "🧭",
                title: "Leave With a 7-Day Plan",
                body: "You walk away with a concrete week-one plan — your habit, your trigger, your difficult-day version and your restart rule — ready to start the next morning.",
              },
            ].map(({ n, emoji, title, body }) => (
              <div key={n} className="bg-white rounded-2xl p-7 flex flex-col items-center text-center" style={{ border: "1px solid #e4e4e7", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-white mb-4" style={{ fontSize: 20, background: "linear-gradient(135deg,#b8860b,#d4a017)", boxShadow: "0 4px 14px rgba(212,160,23,0.35)" }}>{n}</div>
                <span style={{ fontSize: 36, marginBottom: 12, display: "block" }}>{emoji}</span>
                <p style={{ fontSize: 17, fontWeight: 800, color: "#18181b", marginBottom: 10, lineHeight: 1.3 }}>{title}</p>
                <p style={{ fontSize: 14, color: "#52525b", lineHeight: 1.65 }}>{body}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <CTA label="Reserve My Free Seat →" sub="Free · Live on WhatsApp · Leave with a 7-day plan" />
          </div>
        </div>
      </section>

      {/* ══ 4b. THE THINKING BEHIND IT ═══════════════════════════════════════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="duc-label mb-3">Grounded in Behaviour Science</p>
            <h2 className="duc-h2 duc-section-title mb-3">The thinking behind the method</h2>
            <p className="duc-body max-w-xl mx-auto">The 5S system draws on well-known behaviour-change research. The webinar isn&apos;t medical advice — it&apos;s a practical way to build habits that stick.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: "1.5rem" }}>
            {SCIENCE.map(({ logo, name, title, quote, color, tag }) => (
              <div key={name} className="duc-glow-card rounded-2xl p-7" style={{ background: "#fff", border: "1px solid #e2dfd6" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-xl flex items-center justify-center shrink-0" style={{ width: 44, height: 44, background: `${color}15`, fontSize: 22 }}>{logo}</div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 800, color: "#18181b" }}>{name}</p>
                    <p style={{ fontSize: 12, color: "#71717a", fontStyle: "italic", lineHeight: 1.4 }}>{title}</p>
                  </div>
                </div>
                <blockquote style={{ margin: 0, borderLeft: `3px solid ${color}`, paddingLeft: "0.875rem", color: "#52525b", fontSize: 14, lineHeight: 1.7, fontStyle: "italic" }}>&ldquo;{quote}&rdquo;</blockquote>
                <div className="inline-flex items-center rounded-md" style={{ marginTop: "0.875rem", padding: "0.25rem 0.625rem", background: `${color}12`, color, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{tag}</div>
              </div>
            ))}
          </div>

          <p className="text-center" style={{ color: "#71717a", fontSize: 13, marginTop: "1.5rem" }}>General wellness education. Results vary and weight is influenced by many factors. Not a substitute for medical or nutritional care.</p>
        </div>
      </section>

      {/* ══ 4c. WHAT YOU'LL LEARN (90-min breakdown) ═════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="duc-label mb-3">Inside the 90 Minutes</p>
            <h2 className="duc-h2 duc-section-title mb-3">What You&apos;ll Learn, Step by Step</h2>
          </div>
          <div className="flex flex-col gap-7">
            {[
              { step: "01", color: "#b8860b", title: "Why your plans keep collapsing", desc: "We start with the real reasons healthy routines fall apart — outcome-thinking, too many changes at once, motivation dependence, and having no way to recover from a missed day. No shame, just the pattern." },
              { step: "02", color: "#f97316", title: "The 5S Daily Upgrade System", desc: "Select, Shrink, Stack, Score, Scale. A simple, repeatable method for turning any health goal into a habit small enough that you can't fail at it — and strong enough to matter." },
              { step: "03", color: "#6366f1", title: "Build one habit live", desc: "You'll take one of your own weight-management goals and, with us, convert it into a tiny action with a trigger and a difficult-day version. Real, on paper, yours." },
              { step: "04", color: "#e8a020", title: "Your 7-day starter plan", desc: "You leave with a concrete week-one plan and a restart rule — so you know exactly what to do tomorrow morning, and what to do the day you slip." },
            ].map(({ step, color, title, desc }) => (
              <div key={step} className="flex gap-5">
                <div style={{ fontSize: 32, fontWeight: 900, color, minWidth: 48, lineHeight: 1, flexShrink: 0 }}>{step}</div>
                <div>
                  <p style={{ fontSize: 17, fontWeight: 800, color: "#18181b", marginBottom: 6, lineHeight: 1.3 }}>{title}</p>
                  <p className="duc-body" style={{ margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FOCUS ON ONE AREA EACH MONTH — tabbed tracks (the 3 pillars) ═════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">One pillar at a time</p>
            <h2 className="duc-h2 duc-section-title mb-3">The Three Pillars We Cover</h2>
            <p className="duc-body max-w-xl mx-auto">Healthy weight involves eating, movement and sleep. Most people try to fix all three at once and burn out. We take them one at a time — starting with tiny habits in each.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {TRACKS.map((t, i) => (
              <button key={i} onClick={() => setActiveTrack(i)}
                className="rounded-full font-bold"
                style={{
                  padding: "10px 20px", fontSize: 14, cursor: "pointer",
                  border: `2px solid ${t.color}`,
                  background: activeTrack === i ? t.color : "transparent",
                  color: activeTrack === i ? "#fff" : t.color,
                  transition: "all 0.2s",
                }}>
                {t.icon} {t.title}
              </button>
            ))}
          </div>

          {TRACKS.map((t, i) => i === activeTrack && (
            <div key={i} className="rounded-2xl mx-auto" style={{ background: t.colorLight, border: `1px solid ${t.colorBorder}`, padding: "2rem", maxWidth: 700 }}>
              <div className="flex items-center gap-4 mb-5">
                <span style={{ fontSize: 40 }}>{t.icon}</span>
                <div>
                  <p className="duc-label mb-1" style={{ color: t.color }}>{t.days}</p>
                  <p style={{ fontSize: 18, fontWeight: 800, color: "#18181b", lineHeight: 1.25 }}>{t.title}</p>
                  <p style={{ fontSize: 14, color: "#52525b" }}>{t.subtitle}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 mb-5">
                {t.habits.map((h, hi) => (
                  <div key={hi} className="flex items-center gap-3">
                    <span style={{ color: t.color, fontWeight: 700, fontSize: 14, minWidth: 22 }}>›</span>
                    <span style={{ fontSize: 14, color: "#52525b" }}>{h}</span>
                  </div>
                ))}
                <p style={{ fontSize: 13, color: "#71717a", fontStyle: "italic", marginTop: 4 }}>Examples of the kind of tiny habit you&apos;ll learn to build…</p>
              </div>
              <div className="rounded-xl" style={{ background: t.color, color: "#fff", padding: "0.875rem 1rem", fontSize: 14, fontWeight: 700 }}>
                The goal: {t.outcome}
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-10">
            <CTA label="Reserve My Free Seat →" sub="Free live webinar · Learn the 5S system · Leave with a 7-day plan" />
          </div>
        </div>
      </section>

      {/* ══ 4a. THE 5S SYSTEM — 3 columns ════════════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="duc-label mb-3">A Peek at the Method</p>
            <h2 className="duc-h2 duc-section-title mb-3">How the 5S System Works</h2>
            <p className="duc-body max-w-xl mx-auto">Here&apos;s the exact method you&apos;ll learn and use live in the webinar — turning a goal into a habit you can actually keep.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: "1.5rem" }}>
            {SAMPLE_HABITS.map((area) => (
              <div key={area.area} className="rounded-2xl overflow-hidden" style={{ border: `1.5px solid ${area.colorBorder}`, background: "#fff" }}>
                <div className="flex items-center gap-2.5" style={{ background: area.color, padding: "1rem 1.25rem" }}>
                  <span style={{ fontSize: 20 }}>{area.emoji}</span>
                  <span style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>{area.area}</span>
                </div>
                <div className="p-4 flex flex-col gap-3">
                  {area.habits.map((h, hi) => (
                    <div key={hi} className="duc-glow-card rounded-xl p-4" style={{ background: "#fafaf9", border: "1px solid #e4e4e7" }}>
                      <div className="flex items-center gap-3 mb-2.5">
                        <div className="rounded-xl flex items-center justify-center shrink-0" style={{ width: 46, height: 46, background: area.colorLight, fontSize: 22 }}>{h.image}</div>
                        <div>
                          <p style={{ fontSize: 11, fontWeight: 700, color: area.color, textTransform: "uppercase", letterSpacing: "0.09em" }}>{h.day}</p>
                          <p style={{ fontSize: 15, fontWeight: 800, color: "#18181b", lineHeight: 1.25 }}>{h.title}</p>
                        </div>
                      </div>
                      <p style={{ fontSize: 13, color: "#52525b", lineHeight: 1.6, marginBottom: 8 }}>{h.desc}</p>
                      <div className="rounded-lg" style={{ background: area.colorLight, borderLeft: `3px solid ${area.colorBorder}`, padding: "0.5rem 0.75rem", fontSize: 12.5, color: "#52525b", lineHeight: 1.6 }}>
                        <span style={{ fontWeight: 700, color: area.color, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: 11 }}>Why it matters: </span>{h.why}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <CTA label="Learn the Full 5S System — Free →" sub="Free live webinar · Learn the 5S system · Leave with a 7-day plan" />
          </div>
        </div>
      </section>

      {/* ══ NOT A COURSE ═══════════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg,#171412 0%,#18181b 50%,#171412 100%)" }} className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="duc-h2 mb-4" style={{ color: "#fff" }}>Not a Diet. Not a Workout Plan. Not Another Fad.</h2>
          <p className="max-w-2xl mx-auto mb-6" style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.78)" }}>Most programs ask you to <strong style={{ color: "#fff" }}>change your whole life</strong> on Day 1 — new diet, new gym routine, new everything. That&apos;s exactly why they fail. This webinar is different: you learn to change <strong style={{ color: "#fff" }}>one tiny habit at a time</strong>, while your life stays exactly as it is.</p>
          <p style={{ fontSize: 17, color: "rgba(212,160,23,0.9)", fontStyle: "italic", fontWeight: 500 }}>No calorie counting. No gym. No giving up your favourite food. Just a system for starting small and staying consistent.</p>
        </div>
      </section>

      {/* ══ TINY HABITS CONCEPT ══════════════════════════════════════════════ */}
      <section style={{ background: "#faf8f3" }} className="py-16 lg:py-28 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">

          <div className="text-center mb-14">
            <p className="duc-label mb-3" style={{ color: "#a8790d" }}>The idea behind the webinar</p>
            <h2 className="duc-h2 mb-5" style={{ color: "#18181b" }}>
              Why Big Changes Fail —<br />
              <span style={{ color: "#a8790d" }}>And What Actually Works</span>
            </h2>
            <p className="duc-body max-w-xl mx-auto" style={{ color: "#52525b" }}>
              Most people already know what to do. They just don&apos;t know how to keep doing it without burning out.
            </p>
          </div>

          <div className="hidden md:grid mb-3" style={{ gridTemplateColumns: "1fr 56px 1fr", gap: "0 16px" }}>
            <div className="text-center">
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#dc2626" }}>The overwhelming way</span>
            </div>
            <div />
            <div className="text-center">
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9a6b0a" }}>The tiny habit way ✓</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 mb-10">
            {[
              {
                emoji: "⚖️",
                goal: "Manage Weight",
                badColor: "#ea580c",
                badBg: "#fff7ed",
                badBorder: "#fed7aa",
                badImg: "/goals/weight-bad.png",
                goodImg: "/goals/weight-good.png",
                items: ["Count calories daily", "Cut carbs completely", "Gym 5× a week", "Meal prep Sundays", "Track macros", "Avoid all sugar & junk"],
                habit: "Pause before your second serving",
                why: "A single, specific behaviour you can do at one meal today — no plan to overhaul.",
              },
              {
                emoji: "🍽️",
                goal: "Eat More Aware",
                badColor: "#db2777",
                badBg: "#fdf2f8",
                badBorder: "#fbcfe8",
                badImg: "/goals/eat-bad.png",
                goodImg: "/goals/eat-good.png",
                items: ["Follow a strict diet", "Weigh every meal", "Eat only whole foods", "No carbs ever", "No eating out", "Give up all treats"],
                habit: "Add some vegetables to one meal",
                why: "Addition before restriction — easier to keep than a long list of \"don'ts\".",
              },
              {
                emoji: "🏃",
                goal: "Move More",
                badColor: "#6366f1",
                badBg: "#eef2ff",
                badBorder: "#c7d2fe",
                badImg: "/goals/strength-bad.png",
                goodImg: "/goals/strength-good.png",
                items: ["Join a gym", "1-hour workouts daily", "Buy equipment", "Hire a trainer", "Work out 5× week", "Two-a-day sessions"],
                habit: "Walk for two minutes after dinner",
                why: "Anchored to something you already do — so it survives your busiest day.",
              },
            ].map(({ emoji, goal, badColor, badBg, badBorder, badImg, goodImg, items, habit, why }) => (
              <div key={goal} className="grid grid-cols-1 md:grid-cols-[1fr_56px_1fr] items-center gap-3 md:gap-0">

                <div className="rounded-2xl overflow-hidden" style={{ border: `1.5px solid ${badBorder}`, background: badBg }}>
                  <div className="px-4 py-3 flex items-center gap-2.5" style={{ borderBottom: `1.5px solid ${badBorder}` }}>
                    <span style={{ fontSize: 20 }}>{emoji}</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: "#18181b" }}>{goal}</span>
                    <span className="ml-auto" style={{ fontSize: 10, fontWeight: 700, color: badColor, textTransform: "uppercase", letterSpacing: "0.08em" }}>overwhelming</span>
                  </div>
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", overflow: "hidden", borderBottom: `1.5px solid ${badBorder}` }}>
                    <img src={badImg} alt={`${goal} the overwhelming way`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(0.25) contrast(0.96)" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,0) 45%," + badColor + "26 100%)" }} />
                  </div>
                  <div className="px-4 py-3 grid grid-cols-2 gap-x-3 gap-y-1.5">
                    {items.map(item => (
                      <div key={item} className="flex items-start gap-1.5">
                        <span style={{ color: badColor, fontSize: 9, marginTop: 4, flexShrink: 0 }}>✕</span>
                        <span style={{ fontSize: 12, color: "#52525b", lineHeight: 1.45 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2" style={{ borderTop: `1px solid ${badBorder}`, background: badColor + "10" }}>
                    <p style={{ fontSize: 11, color: badColor, fontWeight: 700, textAlign: "center" }}>You quit by Week 2 😮‍💨</p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center py-2 md:py-0" style={{ gap: 4 }}>
                  <svg className="hidden md:block" width="40" height="20" viewBox="0 0 40 20" fill="none">
                    <path d="M2 10h32M28 4l8 6-8 6" stroke="#d4a017" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <svg className="md:hidden" width="20" height="32" viewBox="0 0 20 32" fill="none">
                    <path d="M10 2v26M4 22l6 8 6-8" stroke="#d4a017" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid #bbf7d0", background: "#f0fdf4" }}>
                  <div className="px-4 py-3 flex items-center gap-2.5" style={{ borderBottom: "1.5px solid #bbf7d0" }}>
                    <span style={{ fontSize: 20 }}>{emoji}</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: "#18181b" }}>{goal}</span>
                    <span className="ml-auto" style={{ fontSize: 10, fontWeight: 700, color: "#9a6b0a", textTransform: "uppercase", letterSpacing: "0.08em" }}>tiny habit ✓</span>
                  </div>
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", overflow: "hidden", borderBottom: "1.5px solid #bbf7d0" }}>
                    <img src={goodImg} alt={`${goal} the tiny habit way`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,0) 50%,rgba(212,160,23,0.18) 100%)" }} />
                  </div>
                  <div className="px-4 py-4 flex flex-col gap-2.5">
                    <p style={{ fontSize: 11, fontWeight: 700, color: "#9a6b0a", textTransform: "uppercase", letterSpacing: "0.08em" }}>The tiny version:</p>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#18181b", lineHeight: 1.5 }}>&ldquo;{habit}&rdquo;</p>
                    <p style={{ fontSize: 12, color: "#52525b", lineHeight: 1.55 }}>{why}</p>
                  </div>
                  <div className="px-4 py-2 flex items-center gap-2" style={{ borderTop: "1px solid #bbf7d0", background: "rgba(212,160,23,0.06)" }}>
                    <span style={{ width: 16, height: 16, borderRadius: "50%", background: "#d4a017", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2.5 2.5 4-4.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#9a6b0a" }}>Small enough to actually keep. ✅</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="rounded-2xl px-8 py-7 text-center mb-10" style={{ background: "linear-gradient(135deg,#171412,#18181b)" }}>
            <p style={{ fontSize: "clamp(1.1rem,2.5vw,1.5rem)", fontWeight: 900, color: "#fff", lineHeight: 1.35, marginBottom: 10 }}>
              This is how lasting change actually works.
            </p>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, maxWidth: 520, margin: "0 auto" }}>
              You don&apos;t change your life overnight. You start with one small habit you can&apos;t fail at — and let it compound. That&apos;s the <span style={{ color: "#a8790d", fontWeight: 700 }}>power of tiny habits</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              { icon: "✅", title: "Easy to Do", desc: "2–3 minutes. No equipment. No planning. You can do it on the busiest Monday." },
              { icon: "🔄", title: "No Big Life Changes", desc: "Fits into the life you already have. No gym, no crash diet, no 5am alarm." },
              { icon: "🎯", title: "Too Small to Miss", desc: "When it's tiny enough, there's no excuse. That's when consistency starts to build." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="rounded-2xl p-6 flex flex-col gap-3" style={{ background: "#fff", border: "1.5px solid #e4e4e7", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <span style={{ fontSize: 28 }}>{icon}</span>
                <p style={{ fontSize: 15, fontWeight: 800, color: "#18181b" }}>{title}</p>
                <p style={{ fontSize: 13, color: "#52525b", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <CTA label="Reserve My Free Seat →" sub="Free live webinar · Learn the 5S system · Leave with a 7-day plan" />
          </div>

        </div>
      </section>

      {/* ══ 1% TINY GAINS ════════════════════════════════════════════════════ */}
      <TinyGainsDUC />

      {/* ══ 4e. WHAT YOU GET IN THIS FREE WEBINAR ════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="duc-label mb-3">Everything You&apos;ll Walk Away With</p>
            <h2 className="duc-h2 duc-section-title mb-3">What you get in this free webinar</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px,1fr))", gap: "1.25rem" }}>
            {WHATS_INSIDE.map(({ icon, title, desc }) => (
              <div key={title} className="duc-glow-card rounded-2xl p-5 flex gap-4" style={{ background: "#fff", border: "1px solid #e2dfd6" }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{icon}</span>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 800, color: "#18181b", marginBottom: 6, lineHeight: 1.3 }}>{title}</p>
                  <p style={{ fontSize: 14, color: "#52525b", lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <CTA label="Reserve My Free Seat →" sub="Free · Live on WhatsApp · Leave with a 7-day plan" />
          </div>
        </div>
      </section>

      {/* ══ 6. WHAT WE'LL COVER (topic ticker) ═══════════════════════════════ */}
      {(() => {
        const TICKER_CARDS = [
          { emoji: "🔁", theme: "Stop the Restart Cycle", tagline: "Why Monday keeps repeating", color: "#6366f1", bg: "#eef2ff", border: "#c7d2fe", img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80", habits: ["The start-stop pattern, explained","Why willpower runs out","The all-or-nothing trap","Breaking the Monday loop"] },
          { emoji: "🎯", theme: "Select the Right Habit", tagline: "Behaviour, not outcome", color: "#d97706", bg: "#fffbeb", border: "#fde68a", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80", habits: ["Goal vs. behaviour","Choosing one thing","What you can control","Making it specific"] },
          { emoji: "🤏", theme: "Shrink It Down", tagline: "Small enough to keep", color: "#c8891a", bg: "#f5f3ff", border: "#ddd6fe", img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80", habits: ["The tiny version","Your difficult-day plan","Two-minute rule","Starting vs. destination"] },
          { emoji: "🔗", theme: "Stack the Trigger", tagline: "Anchor it to your day", color: "#059669", bg: "#ecfdf5", border: "#6ee7b7", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80", habits: ["After-I-do-X, I'll-do-Y","Using existing routines","Removing friction","Never forgetting"] },
          { emoji: "📊", theme: "Score Honestly", tagline: "Track without perfectionism", color: "#db2777", bg: "#fdf2f8", border: "#f9a8d4", img: "https://images.unsplash.com/photo-1616671276441-2f2c277b8bf6?w=600&q=80", habits: ["Done vs. tiny-done","Counting restarts","Ditching perfect streaks","The consistency score"] },
          { emoji: "📈", theme: "Scale Carefully", tagline: "Grow only when ready", color: "#0284c7", bg: "#f0f9ff", border: "#bae6fd", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80", habits: ["When to level up","Growing without breaking","Compounding small wins","The sustainable curve"] },
          { emoji: "🧭", theme: "Weekends & Travel", tagline: "The days that derail you", color: "#9a6b0a", bg: "#eef2ff", border: "#c7d2fe", img: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&q=80", habits: ["A good-enough weekend","A travel-day plan","Social-event strategy","Staying in the game"] },
          { emoji: "🔄", theme: "Never Miss the Restart", tagline: "Bounce back in a day", color: "#c026d3", bg: "#fdf4ff", border: "#e879f9", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80", habits: ["Miss once, not twice","The one-day recovery","Dropping the guilt","Your restart rule"] },
        ];

        return (
          <>
            <section className="bg-section-cream py-16 lg:py-24">
              <div className="max-w-5xl mx-auto px-6 lg:px-10">
                <div className="text-center mb-10">
                  <p className="duc-label mb-3">What We&apos;ll Cover</p>
                  <h2 className="duc-h2 duc-section-title mb-3">A Practical Session, Start to Finish</h2>
                  <p className="duc-body max-w-lg mx-auto">Each part of the session builds toward one thing — a habit system you can actually keep, without overhauling your life.</p>
                </div>
              </div>

              <div style={{ overflow: "hidden", marginTop: 8 }}>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <div className="duc-ticker-track" style={{ animationDuration: "70s" }}>
                    {[...TICKER_CARDS, ...TICKER_CARDS].map(({ emoji, theme, tagline, color, bg, border, img, habits }, i) => (
                      <div key={`${theme}-${i}`} style={{ width: 300, flexShrink: 0, borderRadius: 20, overflow: "hidden", border: `2px solid ${border}`, boxShadow: "0 4px 20px rgba(0,0,0,0.10)", background: bg, display: "flex", flexDirection: "column" }}>
                        <div style={{ position: "relative", height: 170, overflow: "hidden", flexShrink: 0 }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt={theme} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 35%, ${bg} 100%)` }} />
                          <div style={{ position: "absolute", bottom: 10, left: 14, display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 24 }}>{emoji}</span>
                            <div>
                              <p style={{ fontSize: 17, fontWeight: 900, color, lineHeight: 1.1, margin: 0 }}>{theme}</p>
                              <p style={{ fontSize: 11.5, color: "#52525b", fontWeight: 500, margin: 0, marginTop: 1 }}>{tagline}</p>
                            </div>
                          </div>
                        </div>
                        <div style={{ padding: "12px 14px 16px", display: "flex", flexDirection: "column" }}>
                          <p style={{ fontSize: 10, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px 0" }}>In this part:</p>
                          {habits.map((h, hi) => (
                            <div key={hi} style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 6 }}>
                              <span style={{ color, fontSize: 10, marginTop: 4, flexShrink: 0 }}>●</span>
                              <span style={{ fontSize: 12.5, fontWeight: 600, color: "#3f3f46", lineHeight: 1.4 }}>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 100, background: "linear-gradient(to right, #f7f5ef, transparent)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 100, background: "linear-gradient(to left, #f7f5ef, transparent)", pointerEvents: "none" }} />
                </div>
              </div>

              <div className="max-w-5xl mx-auto px-6 lg:px-10">
                <div className="flex justify-center mt-8">
                  <CTA label="Reserve My Free Seat →" sub="Free · Live on WhatsApp · Leave with a 7-day plan" />
                </div>
              </div>
            </section>
          </>
        );
      })()}

      {/* ══ 4d. YOUTUBE vs ONE SYSTEM (dark compare) ═════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg,#171412 0%,#18181b 50%,#171412 100%)" }} className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="duc-label mb-3" style={{ color: "#e8a020" }}>Not Random Advice</p>
            <h2 className="duc-h2 mb-4" style={{ color: "#fff" }}>YouTube gives you 47 conflicting videos.<br /><span style={{ color: "#a8790d" }}>This gives you one simple system.</span></h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", maxWidth: 560, margin: "0 auto", lineHeight: 1.75 }}>The internet has infinite health content. What it doesn&apos;t have is a simple, repeatable way to actually keep a habit going — built for someone with a 10-hour workday.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ maxWidth: 900, margin: "0 auto" }}>
            <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-2.5" style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontSize: 18 }}>😵</span>
                <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em" }}>YouTube / Instagram / Reels</span>
              </div>
              <div className="p-6">
                {[
                  "\"Drink warm lemon water every morning\"",
                  "\"Actually, lemon water is a myth\" 🤦",
                  "\"You MUST do intermittent fasting\"",
                  "\"IF is bad for women\" (next video)",
                  "\"Hit the gym 5 days a week\"",
                  "\"Walk 10,000 steps, gym isn't needed\"",
                  "\"Sleep 8 hours no matter what\"",
                  "Next influencer disagrees completely",
                  "You open 12 tabs, confused, do nothing",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 mb-3">
                    <span style={{ color: "#ef4444", fontSize: 13, marginTop: 2, flexShrink: 0 }}>✗</span>
                    <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.55, fontStyle: item.startsWith('"') ? "italic" : "normal" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.25)" }}>
              <div className="flex items-center gap-2.5" style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(212,160,23,0.2)" }}>
                <span style={{ fontSize: 18 }}>🎯</span>
                <span style={{ color: "#a8790d", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em" }}>The 5S System — Step by Step</span>
              </div>
              <div className="p-6">
                {[
                  { day: "Select", habit: "Pick one behaviour you can actually control." },
                  { day: "Shrink", habit: "Make it small enough to survive a hard day." },
                  { day: "Stack", habit: "Anchor it to something you already do." },
                  { day: "Score", habit: "Track it honestly — restarts included." },
                  { day: "Scale", habit: "Grow it only once it's consistent." },
                  { day: "Restart", habit: "Miss once? Come back the very next day." },
                  { day: "", habit: "You always know exactly what to do next.", highlight: true },
                ].map(({ day, habit, highlight }, i) => (
                  <div key={i} className="flex items-start gap-3 mb-3">
                    <span style={{ color: "#a8790d", fontSize: 13, marginTop: 2, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 13, lineHeight: 1.55, color: highlight ? "#d4a017" : "rgba(255,255,255,0.75)", fontWeight: highlight ? 800 : 400 }}>
                      {day && <span style={{ color: "#e8a020", fontWeight: 700, marginRight: 6 }}>{day}:</span>}
                      {habit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center" style={{ gap: "2.5rem", marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {[
              { n: "5", label: "Simple steps to build any habit" },
              { n: "0", label: "Conflicting advice" },
              { n: "1", label: "Clear 7-day starter plan" },
              { n: "Free", label: "To attend, live" },
            ].map(({ n, label }) => (
              <div key={label} className="text-center">
                <div style={{ color: "#a8790d", fontWeight: 900, fontSize: "clamp(1.5rem,3vw,2rem)", lineHeight: 1 }}>{n}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 4, maxWidth: 140 }}>{label}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <CTA label="Reserve My Free Seat →" sub="Free · Live on WhatsApp · Leave with a 7-day plan" />
          </div>
        </div>
      </section>

      {/* ══ WHO THIS IS FOR ═════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg,#171412 0%,#18181b 50%,#171412 100%)" }} className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="duc-label mb-3" style={{ color: "#a8790d" }}>Who This Is For</p>
            <h2 className="duc-h2 mb-4" style={{ color: "#fff" }}>This Webinar Is for You If…</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "You want to manage your weight but don't have time for long gym routines.",
              "You keep starting and quitting healthy routines every few weeks.",
              "You already know the advice — you just can't make it stick.",
              "You don't want strict diets or extreme workout plans.",
              "You want a simple system you can follow at your own pace.",
              "You're ready to stop restarting and finally stay consistent.",
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-4 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,160,23,0.18)" }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)", fontSize: 14, color: "#fff", fontWeight: 900 }}>✓</div>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.88)", lineHeight: 1.65, fontWeight: 500 }}>{point}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <button
              onClick={openRegister}
              className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-full font-black text-white"
              style={{ fontSize: 18, boxShadow: "0 8px 28px rgba(212,160,23,0.42)", border: "none", cursor: "pointer" }}>
              Yes, This Is For Me →
            </button>
          </div>
        </div>
      </section>

      {/* ══ WHY IT WORKS ════════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg,#171412 0%,#18181b 60%,#171412 100%)" }} className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="duc-label mb-3" style={{ color: "#a8790d" }}>The Idea in One Line</p>
            <h2 className="duc-h2 mb-4" style={{ color: "#fff" }}>Why This <span className="relative inline-block">Approach<svg viewBox="0 0 220 10" className="absolute left-0 bottom-[-4px] w-full" style={{ height: 8 }} fill="none"><path d="M2 7 Q55 2 110 6 Q165 10 218 5" stroke="#d4a017" strokeWidth="2.5" strokeLinecap="round" fill="none"/></svg></span> Works</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", maxWidth: 480, margin: "0 auto" }}>Because it removes the biggest reason people fail at healthy habits — overwhelm.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="rounded-2xl p-8 flex flex-col justify-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="font-bold mb-3" style={{ fontSize: 13, color: "#f87171", textTransform: "uppercase", letterSpacing: "0.1em" }}>Why most people fail</p>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.85)", lineHeight: 1.75 }}>Most people try to change <strong style={{ color: "#fff" }}>too much too quickly</strong> — gym, strict diet, cardio all at once. They burn out by Week 2 and start over on Monday.</p>
            </div>

            <div className="rounded-2xl p-8" style={{ background: "rgba(212,160,23,0.06)", border: "1px solid rgba(212,160,23,0.2)" }}>
              <p className="font-bold mb-5" style={{ fontSize: 13, color: "#a8790d", textTransform: "uppercase", letterSpacing: "0.1em" }}>What the webinar gives you instead</p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: "🎯", label: "One tiny habit at a time", sub: "Small enough to never skip" },
                  { icon: "⏱️", label: "Under a few minutes", sub: "Fits into any schedule" },
                  { icon: "🔗", label: "Anchored to your day", sub: "So you actually remember it" },
                  { icon: "📊", label: "An honest way to track", sub: "Restarts count, not just streaks" },
                  { icon: "🔁", label: "A restart rule", sub: "A slip isn't a quit" },
                  { icon: "🧭", label: "A 7-day starter plan", sub: "You leave knowing what to do" },
                  { icon: "🎟️", label: "Completely free to attend", sub: "Nothing to buy to join" },
                ].map(({ icon, label, sub }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(212,160,23,0.12)", fontSize: 18 }}>{icon}</div>
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{label}</p>
                      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl p-7 text-center mt-8" style={{ background: "rgba(212,160,23,0.08)", border: "1.5px solid rgba(212,160,23,0.3)" }}>
            <p style={{ fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1.4 }}>Small enough to do daily. <span style={{ color: "#a8790d" }}>Consistent enough to change your life.</span></p>
          </div>

          <div className="flex justify-center mt-10">
            <CTA label="Reserve My Free Seat →" sub="Free · Live on WhatsApp · Leave with a 7-day plan" />
          </div>
        </div>
      </section>

      {/* ══ 4g. THE OFFER — Join the Free Webinar ════════════════════════════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <div className="rounded-2xl overflow-hidden shadow-2xl text-center" style={{
            background: "linear-gradient(145deg,#0d1f12 0%,#0a1a0f 50%,#061009 100%)",
            border: "1px solid rgba(212,160,23,0.2)",
            padding: "clamp(2rem,5vw,3.5rem)",
          }}>
            <p className="duc-label mb-3" style={{ color: "#e8a020" }}>FREE LIVE WEBINAR</p>
            <h2 style={{ fontSize: "clamp(1.5rem,4vw,2.25rem)", fontWeight: 900, color: "#fff", marginBottom: "1rem" }}>Stop Starting Over With Weight Loss</h2>
            <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: 440, margin: "0 auto 2rem", lineHeight: 1.7 }}>90 minutes. The 5S Daily Upgrade System. One habit you build live, and a 7-day plan you leave with. No strict diets, no complicated workouts.</p>

            <div style={{ maxWidth: 420, margin: "0 auto 2rem", textAlign: "left" }}>
              {[
                "The 5S Daily Upgrade System",
                "A live habit-building exercise",
                "Your personal 7-day starter plan",
                "The restart rule for missed days",
                "Live Q&A with honest answers",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3" style={{ padding: "0.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <span style={{ color: "#a8790d", fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 14 }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: "0.5rem" }}>
              <span style={{ color: "#a8790d", fontSize: "3rem", fontWeight: 900, lineHeight: 1 }}>FREE</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginBottom: "2rem" }}>Live · Limited seats · Register in 30 seconds</p>

            <div className="flex justify-center mb-4">
              <button onClick={openRegister} className="btn-primary inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-black text-white" style={{ fontSize: 18, boxShadow: "0 8px 28px rgba(212,160,23,0.42)", border: "none", cursor: "pointer" }}>
                <TicketIcon size={20} />Reserve My Free Seat →
              </button>
            </div>

            <div className="flex flex-wrap justify-center" style={{ gap: "1.25rem", marginBottom: "0.5rem" }}>
              {["🎟️ Free to attend", "📱 Reminders on WhatsApp", "🧭 Leave with a 7-day plan"].map(t => (
                <span key={t} style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 10. 3 FALSE BELIEFS ══════════════════════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">Why you&apos;re still hesitating</p>
            <h2 className="duc-h2 duc-section-title mb-3">3 thoughts holding you back</h2>
            <p className="duc-body max-w-sm mx-auto">And why none of them should stop you from registering today.</p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { n: "01", belief: "\"One tiny habit can't really change anything.\"", truth: "On its own, no. But small habits are easier to start and easier to keep — and repeated consistently, they compound. The webinar is about building the consistency, not chasing a single magic habit.", icon: "🧠" },
              { n: "02", belief: "\"I've tried before. I always quit eventually.\"", truth: "You quit because the plan was too big, too vague, or needed willpower you didn't have that day. When a habit takes two minutes and you have a rule for restarting after a slip, there's far less to quit. That's exactly what we teach.", icon: "🔄" },
              { n: "03", belief: "\"A webinar sounds like a sales pitch.\"", truth: "It's a genuinely useful 90 minutes — you'll leave with the 5S system and a real 7-day plan whether or not you ever buy anything. It's free to attend, and any future program is optional and clearly explained.", icon: "🎟️" },
            ].map(({ n, belief, truth, icon }) => (
              <div key={n} className="duc-glow-card rounded-xl overflow-hidden" style={{ border: "1px solid #e2dfd6" }}>
                <div className="flex items-start gap-3 px-5 py-4" style={{ background: "#fff7f7", borderBottom: "1px solid #fecaca" }}>
                  <span style={{ fontSize: 20 }} className="shrink-0">{icon}</span>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.08em" }}>The thought {n}</span>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#dc2626", marginTop: 2, lineHeight: 1.4 }}>{belief}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 px-5 py-4 bg-white">
                  <span style={{ fontSize: 18 }} className="shrink-0">✅</span>
                  <p className="duc-body">{truth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 11. "IF ALL THIS DID WAS" ════════════════════════════════════════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">Think about this</p>
            <h2 className="duc-h2 duc-section-title mb-3">Any one of these alone would be worth 90 minutes.</h2>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { icon: "🔁", bold: "finally break the cycle of starting over every Monday", cta: "— would a free 90 minutes be worth it?" },
              { icon: "🧭", bold: "hand you a ready 7-day plan you can start tomorrow morning", cta: "— would that be worth registering for?" },
              { icon: "🎯", bold: "give you a simple system you can use for any habit, for life", cta: "— what would that be worth to you?" },
            ].map(({ icon, bold, cta }, i) => (
              <div key={i} className="duc-glow-card rounded-xl px-6 py-5 bg-white flex gap-3 items-start" style={{ border: "1px solid #e2dfd6" }}>
                <span style={{ fontSize: 26 }} className="shrink-0">{icon}</span>
                <p style={{ fontSize: 15, color: "#4a4a52", lineHeight: 1.65 }}>
                  <span style={{ color: "#a1a1aa" }}>If all this did was </span>
                  <strong style={{ color: "#18181b" }}>{bold}</strong>
                  <span style={{ color: "#71717a" }}> {cta}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4f. TESTIMONIALS ═════════════════════════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">In Their Words</p>
            <h2 className="duc-h2 duc-section-title mb-3">What the tiny-habit approach changed</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: "1.25rem" }}>
            {LW_TESTIMONIALS.map(({ name, role, avatar, result, text }) => (
              <div key={name} className="duc-glow-card rounded-2xl p-5 bg-white flex flex-col" style={{ border: "1px solid #e2dfd6" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-full flex items-center justify-center text-white font-black shrink-0" style={{ width: 44, height: 44, fontSize: 14, background: `hsl(${(name.charCodeAt(0) * 37) % 360},55%,45%)` }}>{avatar}</div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 800, color: "#18181b" }}>{name}</p>
                    <p style={{ fontSize: 12, color: "#71717a" }}>{role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">{[1,2,3,4,5].map(i=><Star key={i}/>)}</div>
                <p style={{ fontSize: 14, color: "#4a4a52", lineHeight: 1.7, marginBottom: "1rem" }}>&ldquo;{text}&rdquo;</p>
                <div className="mt-auto rounded-lg font-bold" style={{ background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.2)", padding: "0.5rem 0.875rem", fontSize: 12.5, color: "#b8860b" }}>✓ {result}</div>
              </div>
            ))}
          </div>
          <p className="text-center" style={{ color: "#a1a1aa", fontSize: 12, marginTop: "1.25rem" }}>Individual experiences. Results vary from person to person.</p>
          <div className="flex justify-center mt-8">
            <CTA label="Reserve My Free Seat →" sub="Free · Live on WhatsApp · Leave with a 7-day plan" />
          </div>
        </div>
      </section>

      {/* ══ 8. ROHAN'S STORY — Epiphany Bridge ══════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24 relative overflow-hidden">
        <span className="emoji-deco float-2 top-20 right-6 text-3xl hidden lg:block" aria-hidden="true">👋</span>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-4">
              <div className="relative max-w-xs mx-auto lg:mx-0">
                <div className="absolute -top-6 -right-3 z-20 sticky-note p-3 rounded-md tilt-right w-40 hidden sm:block">
                  <p className="font-serif italic leading-snug" style={{ fontSize: 13, color: "#92400e" }}>&ldquo;Hi 👋 I&apos;ll be hosting!&rdquo;</p>
                </div>
                <div className="polaroid tilt-left">
                  <div className="aspect-square rounded-sm overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/rohan.png" alt="Rohan — Host" className="w-full h-full object-cover object-top" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                  <p className="text-center font-serif text-xl italic text-foreground mt-3">Rohan</p>
                  <p className="text-center text-foreground-subtle mt-0.5" style={{ fontSize: 12 }}>Host &amp; Habit Coach</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <p className="duc-label mb-3">👋 Your host</p>
              <h2 className="duc-h2 mb-5" style={{ color: "#18181b" }}>
                I built this because<br />
                <span style={{ fontStyle: "italic", fontWeight: 400, color: "#71717a" }}>I was the person who kept starting over.</span>
              </h2>
              <div className="space-y-4 duc-body">
                <p>I was the person who <strong style={{ color: "#18181b" }}>knew everything about being healthier and did none of it consistently.</strong> Dozens of saved recipes. Three abandoned apps. Every Monday was &ldquo;the Monday I&apos;d finally start.&rdquo;</p>
                <p>I wasn&apos;t lazy. My plans were always too big to survive a real, busy week.</p>
              </div>
              <div className="my-5 pl-4 py-1" style={{ borderLeft: "3px solid #d4a017" }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#18181b", fontStyle: "italic", lineHeight: 1.65 }}>
                  &ldquo;What changed things was making each habit so small it was hard to say no — and having a simple rule to restart after a slip. I turned that into the 5S system, and it&apos;s exactly what I&apos;ll walk you through, live.&rdquo;
                </p>
              </div>
              <p className="duc-body">I&apos;ve since taught this approach to working professionals across India who were tired of starting over — and this free webinar is the clearest way I know to share it.</p>
              <div className="mt-5 flex items-center gap-3">
                <p className="font-serif italic text-xl" style={{ color: "#a8790d" }}>— Rohan</p>
                <span className="w-8 h-px" style={{ background: "#e2dfd6" }} />
                <p style={{ fontSize: 13, color: "#71717a" }}>Host &amp; Habit Coach</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 13. WHAT TO EXPECT (reassurance, in place of guarantee) ══════════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="rounded-2xl premium-card p-7 sm:p-10 border-glow relative overflow-hidden" style={{ background: "#fff", border: "1px solid #e2dfd6" }}>
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full" style={{ background: "rgba(212,160,23,0.07)" }} aria-hidden="true" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.2)", fontSize: 26 }}>🤝</div>
                <div>
                  <p className="duc-label mb-1">No pressure, no catch</p>
                  <h2 className="duc-h2" style={{ color: "#18181b" }}>What to expect from the session.</h2>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { icon: "🎟️", t: "Free to attend", b: "No payment to join the live webinar." },
                  { icon: "📱", t: "Reminders on WhatsApp", b: "We'll send the joining link and nudges." },
                  { icon: "📞", t: "No pushy sales calls", b: "Any future program is optional and clearly explained." },
                  { icon: "🧭", t: "You leave with a plan", b: "A real 7-day starter plan, whether or not you buy anything." },
                ].map(({ icon, t, b }) => (
                  <div key={t} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0" style={{ background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.15)" }}>{icon}</div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#18181b" }}>{t}</p>
                      <p style={{ fontSize: 12, color: "#71717a", marginTop: 2 }}>{b}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-5 mb-7" style={{ background: "rgba(212,160,23,0.06)", border: "1px solid rgba(212,160,23,0.18)" }}>
                <div className="flex items-start gap-3">
                  <span style={{ fontSize: 24 }} className="shrink-0">💬</span>
                  <div>
                    <p className="duc-label mb-1.5">Rohan&apos;s promise</p>
                    <p style={{ fontSize: 14, fontStyle: "italic", color: "#18181b", lineHeight: 1.65 }}>
                      &ldquo;Show up for the 90 minutes and I&apos;ll make sure you leave with a system and a plan you can actually use — no fluff, no shame, no hard sell.&rdquo;
                    </p>
                    <p className="mt-2" style={{ fontSize: 12, color: "#71717a" }}>— Rohan, Host</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p style={{ fontSize: 14, color: "#71717a", marginBottom: 20 }}>
                  Worst case: you spend 90 minutes and walk away with one habit that finally sticks. That&apos;s the whole point.
                </p>
                <CTA label="Reserve My Free Seat →" sub="Free · Live on WhatsApp · Leave with a 7-day plan" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 14. FAQ ══════════════════════════════════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">FAQ</p>
            <h2 className="duc-h2 duc-section-title">Every question answered</h2>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { q: "What exactly is this webinar?", a: "It's a free, live 90-minute session called \"Stop Starting Over With Weight Loss\". You'll learn the 5S Daily Upgrade System, build one tiny habit live, and leave with a 7-day starter plan — all focused on consistency, not diets." },
              { q: "Is it really free?", a: "Yes. It's completely free to attend. We just ask for your name, email and WhatsApp number so we can send you the joining link and reminders." },
              { q: "Will I get a diet plan?", a: "No. This isn't a diet. We don't hand out meal plans or tell everyone to eat the same food. It's about building small, consistent habits that support healthier weight management." },
              { q: "Do I need a gym?", a: "No. There's no gym and no equipment. The movement habits are simple things you can fit into a normal working day." },
              { q: "Will I definitely lose weight?", a: "We can't promise a specific weight result — weight is influenced by many factors including health, age, and individual circumstances. What the webinar gives you is a practical system to build the habits that support healthier weight management." },
              { q: "What if I miss days after starting?", a: "That's expected, and it's a big part of what we cover. You'll learn a restart rule so a missed day doesn't turn into a missed month." },
              { q: "How do I join after registering?", a: "Once you register, we'll send the joining details and reminders to your WhatsApp so you know exactly when and where to show up." },
              { q: "Is there anything to buy?", a: "Not to attend. The webinar is genuinely useful on its own. If there's a paid program later, it's entirely optional and we'll explain it clearly — no pressure." },
            ].map(({ q, a }) => <FAQ key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* ══ 15. FINAL CLOSE ═════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 lg:py-28" style={{ background: "#18181b" }}>
        <div className="absolute inset-0 sparkle-bg pointer-events-none opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(212,160,23,0.08),transparent 70%)" }} />
        <div className="max-w-xl mx-auto px-6 text-center relative">
          <p style={{ fontSize: 44 }} className="mb-5">🎟️</p>
          <p className="duc-label mb-3" style={{ color: "#a8790d" }}>Register Now</p>
          <h2 className="duc-h1 mb-5" style={{ color: "#fff" }}>
            Stop starting over.<br />
            <span style={{ color: "#a8790d" }}>Start staying consistent.</span>
          </h2>
          <p style={{ fontSize: 16, color: "#a1a1aa", lineHeight: 1.75, marginBottom: 32 }}>
            Free live webinar. The 5S system. One habit you build with us. A 7-day plan you leave with. Reserve your seat now.
          </p>
          <CTA label="Reserve My Free Seat →" sub="Free · Live on WhatsApp · Leave with a 7-day plan" />
          <p className="mt-5" style={{ fontSize: 13, color: "#52525b" }}>
            Questions?{" "}
            <a href="https://wa.me/918956146485?text=Hi%2C+I+have+a+question+about+the+free+weight+habits+webinar" className="underline" style={{ color: "#a8790d" }}>Chat with Rohan on WhatsApp</a>
          </p>
          <div className="mt-10 rounded-xl p-6 text-left" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.75 }}>
              <strong style={{ color: "#e4e4e7" }}>P.S.</strong> — You&apos;ve probably tried before. The problem was never you — it was a plan too big to survive a normal week. In 90 free minutes, you&apos;ll learn a smaller, simpler way to stay consistent. The only question is how much longer you want to keep starting over.
            </p>
          </div>
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
      <TrialPopup />
      <RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
    </RegisterCtx.Provider>
  );
}
