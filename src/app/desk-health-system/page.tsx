"use client";
import { useState, useEffect, useRef, createContext, useContext } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// EDIT THIS when the next masterclass date is set. Everything reads from here.
// When you give me the next date, update dateLabel/dayLabel + startISO below.
// startISO drives the countdown timer (IST = +05:30).
// ═════════════════════════════════════════════════════════════════════════════
const WEBINAR = {
  title: "Get Healthy While You Work",
  dayLabel: "Sunday",
  dateLabel: "2 August 2026",        // shown clearly in the hero
  timeLabel: "11:00 AM IST",
  duration: "60 minutes",
  platformLabel: "Live on Zoom",
  seatsLine: "100% free · Limited seats",
  price: "₹1,999",                   // struck-through on CTAs → FREE
  startISO: "2026-08-02T11:00:00+05:30", // countdown target (IST)
};
const WHEN_LINE = `${WEBINAR.dayLabel}, ${WEBINAR.dateLabel} · ${WEBINAR.timeLabel} · ${WEBINAR.duration}`;
const DATE_LINE = `${WEBINAR.dayLabel}, ${WEBINAR.dateLabel} · ${WEBINAR.timeLabel}`;

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

// ─── Reveal-on-scroll wrapper (gentle fade+rise for engagement) ─────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(22px)", transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}>
      {children}
    </div>
  );
}


// ─── Price tag: struck-through ₹1,999 → FREE ───────────────────────────────────
function PriceTag({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span style={{ position: "relative", fontWeight: 700, color: dark ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.85)", textDecoration: "line-through", textDecorationColor: "#ef4444", textDecorationThickness: 2 }}>{WEBINAR.price}</span>
      <span style={{ fontWeight: 900, letterSpacing: "0.02em" }}>FREE</span>
    </span>
  );
}

// ─── CTA button — "Reserve My Seat for ₹1,999 FREE" ─────────────────────────────
function CTA({ label, sub, big = false }: { label?: string; sub?: string; big?: boolean }) {
  const register = useRegister();
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={register}
        className="btn-primary inline-flex items-center justify-center gap-2.5 rounded-full font-black text-white"
        style={{ fontSize: big ? 20 : 18, padding: big ? "20px 40px" : "17px 34px", boxShadow: "0 10px 30px rgba(212,160,23,0.45)", letterSpacing: "-0.01em", border: "none", cursor: "pointer", lineHeight: 1.15 }}>
        <TicketIcon size={big ? 22 : 20} />
        {label ? <span>{label}</span> : <span className="inline-flex flex-wrap items-baseline justify-center gap-1.5">Reserve My Seat for <PriceTag /></span>}
      </button>
      {sub && <p style={{ fontSize: 13.5, color: "#3f3f46", textAlign: "center" }}>{sub}</p>}
    </div>
  );
}

// ─── Countdown timer to the masterclass ────────────────────────────────────────
function useCountdown(targetISO: string) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const target = new Date(targetISO).getTime();
  if (now === null) return null; // avoid SSR/client mismatch until mounted
  let diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000); diff -= days * 86400000;
  const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
  const minutes = Math.floor(diff / 60000); diff -= minutes * 60000;
  const seconds = Math.floor(diff / 1000);
  return { days, hours, minutes, seconds, done: target - now <= 0 };
}

function Countdown({ dark = false }: { dark?: boolean }) {
  const t = useCountdown(WEBINAR.startISO);
  const cells: Array<[string, number]> = t
    ? [["Days", t.days], ["Hours", t.hours], ["Mins", t.minutes], ["Secs", t.seconds]]
    : [["Days", 0], ["Hours", 0], ["Mins", 0], ["Secs", 0]];
  return (
    <div className="inline-flex items-center gap-2 sm:gap-3" aria-label="Time left until the masterclass" suppressHydrationWarning>
      {cells.map(([lbl, val], i) => (
        <div key={lbl} className="flex items-center gap-2 sm:gap-3">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center rounded-xl tabular-nums" style={{ minWidth: 52, padding: "8px 10px", background: dark ? "rgba(255,255,255,0.08)" : "#18181b", border: dark ? "1px solid rgba(212,160,23,0.3)" : "none", fontSize: 24, fontWeight: 900, color: dark ? "#fff" : "#e8a020", fontFamily: "'Poppins',sans-serif", lineHeight: 1 }}>
              {String(val).padStart(2, "0")}
            </div>
            <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.6)" : "#a8790d", marginTop: 5 }}>{lbl}</span>
          </div>
          {i < cells.length - 1 && <span style={{ fontSize: 22, fontWeight: 900, color: dark ? "rgba(255,255,255,0.35)" : "#d4a017", marginBottom: 14 }}>:</span>}
        </div>
      ))}
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: "#e2dfd6", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left font-bold bg-white hover:bg-stone-50 transition-colors" style={{ color: "#18181b", fontSize: 16 }}>
        {q}
        <span className="shrink-0 text-2xl font-light" style={{ color: "#a8790d", display: "inline-block", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
      </button>
      {open && <div className="px-5 pb-5 leading-relaxed bg-white" style={{ fontSize: 14, color: "#3f3f46" }}>{a}</div>}
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
      window.fbq("track", "CompleteRegistration", { content_name: "Desk Fit Formula Masterclass" });
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
        <div className="pointer-events-auto w-full max-w-md rounded-3xl overflow-hidden max-h-[92vh] overflow-y-auto" onClick={e => e.stopPropagation()} style={{ background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.22)", animation: "duc-fadein 0.35s ease" }}>
          <div className="relative px-6 pt-7 pb-5 text-center" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)" }}>
            <button onClick={onClose} className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full cursor-pointer" style={{ background: "rgba(255,255,255,0.2)", border: "none" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>
            </button>
            <p className="text-3xl mb-2">🎟️</p>
            <h2 className="text-white font-black leading-snug" style={{ fontSize: 18 }}>
              {status === "done" ? "You're in! See you live 🎉" : "Reserve your FREE seat"}
            </h2>
            {status !== "done" && (
              <p className="text-white" style={{ fontSize: 13, opacity: 0.9, marginTop: 4 }}>
                <span style={{ textDecoration: "line-through", opacity: 0.8 }}>{WEBINAR.price}</span> today <strong>FREE</strong>
              </p>
            )}
          </div>

          {status === "done" ? (
            <div className="px-6 py-7 text-center">
              <p style={{ fontSize: 16, color: "#3f3f46", lineHeight: 1.7, marginBottom: 14 }}>
                Your seat is saved. 🎉
              </p>
              <div className="rounded-xl p-4 mb-4 text-center" style={{ background: "rgba(212,160,23,0.06)", border: "1px solid rgba(212,160,23,0.2)" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#9a6b0a", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>When</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#18181b" }}>{WHEN_LINE}</p>
                <p style={{ fontSize: 12.5, color: "#3f3f46", marginTop: 4 }}>We&apos;ll send the Zoom join link on WhatsApp.</p>
              </div>
              <div className="rounded-xl p-4 mb-5 text-left" style={{ background: "#fafafa", border: "1px solid #e4e4e7" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#18181b", marginBottom: 6 }}>🎁 Try this right now, at your work desk:</p>
                <p style={{ fontSize: 13.5, color: "#3f3f46", lineHeight: 1.6 }}>Sit tall, drop your shoulders, and take 3 slow breaths. That&apos;s a healthy desk habit — done in 10 seconds.</p>
              </div>
              <button onClick={onClose} className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full font-black text-white btn-primary" style={{ fontSize: 16, border: "none", cursor: "pointer" }}>
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="px-6 py-5">
              {/* 3-point summary */}
              <div className="rounded-2xl p-4 mb-5" style={{ background: "#faf8f3", border: "1.5px solid #e6d9b0" }}>
                <div className="flex items-start gap-3 mb-3">
                  <span style={{ fontSize: 18 }} className="shrink-0">🎓</span>
                  <div>
                    <p style={{ fontSize: 11.5, fontWeight: 800, color: "#9a6b0a", textTransform: "uppercase", letterSpacing: "0.06em" }}>What you&apos;ll learn</p>
                    <p style={{ fontSize: 13.5, color: "#3f3f46", lineHeight: 1.5 }}>How to improve your health while you work — better posture, energy, focus & less stress — with tiny daily desk habits.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <span style={{ fontSize: 18 }} className="shrink-0">📅</span>
                  <div>
                    <p style={{ fontSize: 11.5, fontWeight: 800, color: "#9a6b0a", textTransform: "uppercase", letterSpacing: "0.06em" }}>When</p>
                    <p style={{ fontSize: 13.5, color: "#18181b", fontWeight: 700, lineHeight: 1.5 }}>{DATE_LINE} · {WEBINAR.duration} · Live on Zoom</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span style={{ fontSize: 18 }} className="shrink-0">🎟️</span>
                  <div>
                    <p style={{ fontSize: 11.5, fontWeight: 800, color: "#9a6b0a", textTransform: "uppercase", letterSpacing: "0.06em" }}>Your seat</p>
                    <p style={{ fontSize: 13.5, color: "#18181b", lineHeight: 1.5 }}><span style={{ textDecoration: "line-through", color: "#dc2626" }}>{WEBINAR.price}</span> <strong>100% FREE</strong> — limited seats</p>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 13.5, color: "#3f3f46", lineHeight: 1.6, marginBottom: 14, textAlign: "center" }}>
                Add your details — we&apos;ll send the Zoom join link on WhatsApp.
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
              <button type="submit" disabled={status === "loading"} className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full font-black text-white btn-primary mt-4" style={{ fontSize: 17, boxShadow: "0 6px 20px rgba(212,160,23,0.4)", border: "none", cursor: status === "loading" ? "wait" : "pointer", opacity: status === "loading" ? 0.7 : 1 }}>
                <TicketIcon size={18} />{status === "loading" ? "Saving…" : "Reserve My Free Seat →"}
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
  fontSize: 16, color: "#18181b", outline: "none", background: "#fafafa",
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
  // Floating CTA pill only — no full-width block/panel behind it, so the
  // bottom-left "just registered" popup sits freely alongside it.
  return (
    <div className={`fixed bottom-4 inset-x-0 z-50 flex justify-center px-4 transition-all duration-300 ${visible ? "translate-y-0 opacity-100" : "translate-y-[130%] opacity-0 pointer-events-none"}`}>
      <button onClick={register} className="flex items-center justify-between gap-4 rounded-full pl-6 pr-3 py-3 w-full max-w-md" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)", boxShadow: "0 10px 30px rgba(212,160,23,0.5)", border: "none", cursor: "pointer" }}>
        <div className="text-left">
          <p className="text-white font-black leading-tight" style={{ fontSize: 15 }}>Reserve My Seat <span style={{ textDecoration: "line-through", textDecorationColor: "#fca5a5", opacity: 0.85 }}>{WEBINAR.price}</span> FREE</p>
          <p className="mt-0.5" style={{ fontSize: 12, color: "rgba(255,255,255,0.9)" }}>{DATE_LINE} · {WEBINAR.duration}</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full px-4 py-2.5 shrink-0" style={{ background: "rgba(255,255,255,0.22)" }}><TicketIcon size={16} /><span className="text-white font-bold" style={{ fontSize: 14 }}>Join</span></div>
      </button>
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
const AGO_OPTIONS = ["just now", "20 seconds ago", "30 seconds ago", "45 seconds ago", "1 minute ago", "2 minutes ago", "3 minutes ago", "5 minutes ago"];
function tAgo() { return AGO_OPTIONS[Math.floor(Math.random() * AGO_OPTIONS.length)]; }

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
    // Original bottom-left corner. The sticky CTA is a centered floating pill
    // (not a full-width block), so the toast sits freely at the very bottom-left.
    <div className="fixed left-4 z-40 flex flex-col gap-2 pointer-events-none bottom-4 md:bottom-5" aria-live="polite">
      {toasts.map((t, i) => (
        <div key={t.id} className="pointer-events-auto" style={{ opacity: i === 0 ? 1 : 0.65 - i * 0.15, transform: `scale(${1 - i * 0.03})`, transformOrigin: "bottom left", animation: "duc-fadein 0.3s ease" }}>
          <div className="flex items-center gap-2.5 rounded-2xl px-3 py-2.5 w-[262px]" style={{ background: "#fff", border: "1px solid #e2dfd6", boxShadow: "0 6px 20px rgba(0,0,0,0.12)" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ background: `hsl(${(t.name.charCodeAt(0) * 37) % 360},55%,48%)` }}>{t.name[0]}</div>
            <div className="flex-1 min-w-0">
              <p className="font-bold leading-snug truncate" style={{ fontSize: 12, color: "#18181b" }}>{t.name} from {t.city}</p>
              <p className="leading-snug mt-0.5" style={{ fontSize: 11, color: "#3f3f46" }}>registered for the masterclass · {t.time}</p>
            </div>
            <span className="relative flex w-2 h-2 shrink-0"><span className="absolute inline-flex w-full h-full rounded-full animate-ping opacity-75" style={{ background: "#22c55e" }} /><span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: "#22c55e" }} /></span>
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
              A free live masterclass on how to <strong style={{ color: "#18181b" }}>get healthier and more energetic while you work</strong> — no gym, no diet, no extra time.
            </p>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#9a6b0a", marginBottom: 16 }}>🗓 {WHEN_LINE}</p>
            <button onClick={() => { dismiss(); register(); }} className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full font-black text-white btn-primary" style={{ fontSize: 17, boxShadow: "0 6px 20px rgba(212,160,23,0.4)", border: "none", cursor: "pointer" }}>
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
        content_name: "Desk Fit Formula Masterclass",
        content_category: "Masterclass Registration",
      });
    }
  }, []);
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGE — one goal: masterclass registrations. Simple words, big visuals.
// ═════════════════════════════════════════════════════════════════════════════
export default function DeskHealthSystemPage() {
  useMetaPixelViewContent();
  const [modalOpen, setModalOpen] = useState(false);
  const openRegister = () => setModalOpen(true);

  return (
    <RegisterCtx.Provider value={openRegister}>
    <div id="ss-top" style={{ background: "#faf8f3", minHeight: "100vh", color: "#18181b", fontSize: 16 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500&family=Poppins:wght@500;600;700;800;900&display=swap');
        @keyframes duc-fadein{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ss-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes dhs-rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        #ss-top{font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
        #ss-top h1,#ss-top h2,#ss-top .duc-h1,#ss-top .duc-h2{font-family:'Poppins','Plus Jakarta Sans',sans-serif}
        /* comfortable, readable body copy: more breathing room + a little bolder */
        #ss-top p{letter-spacing:0.012em;word-spacing:0.05em;line-height:1.7;font-weight:500}
        #ss-top .duc-label{word-spacing:normal;line-height:1.4;font-weight:700}
        .duc-h1{font-size:clamp(2.2rem,5.5vw,3.6rem);font-weight:800;line-height:1.1;letter-spacing:-0.03em}
        .duc-h2{font-size:clamp(1.7rem,4vw,2.55rem);font-weight:800;line-height:1.18;letter-spacing:-0.025em}
        .duc-label{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:#a8790d;font-family:'Poppins',sans-serif}
        .duc-section-title{color:#18181b}
        #ss-top .reveal{animation:dhs-rise 0.6s cubic-bezier(0.16,1,0.3,1) both}
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
          🎟️ FREE Live Masterclass · {DATE_LINE} · {WEBINAR.duration}
        </p>
      </div>

      {/* ══ 1. HERO — the problem + the free-masterclass promise ════════════════ */}
      {/* Fills exactly one screen (minus the ~40px announcement bar); the next
          section starts right when you scroll past it. */}
      <section className="relative overflow-hidden mesh-bg flex flex-col lg:min-h-[calc(100svh-40px)]" style={{ borderBottom: "1px solid #e2dfd6" }}>
        <div className="flex-1 flex items-center">
        <div className="w-full max-w-6xl mx-auto px-6 lg:px-8 pt-7 pb-8 lg:py-6 grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">

          {/* Left: copy */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 accent-pill" style={{ fontSize: 13, fontWeight: 700 }}>
              <span className="w-2 h-2 rounded-full inline-block animate-pulse" style={{ background: "#d4a017" }} />
              For busy professionals who sit 6+ hours a day
            </div>

            <h1 className="mb-4" style={{ fontSize: "clamp(1.75rem,3.3vw,2.7rem)", fontWeight: 800, lineHeight: 1.14, letterSpacing: "-0.03em", fontFamily: "'Poppins','Plus Jakarta Sans',sans-serif" }}>
              Want to build a healthier lifestyle…{" "}
              <span className="gradient-text">but can&apos;t find time because of work?</span>
            </h1>

            <p style={{ fontSize: 16.5, color: "#3f3f46", maxWidth: 560, margin: "0 auto 18px", lineHeight: 1.6 }} className="lg:mx-0">
              Discover how the <strong style={{ color: "#18181b" }}>Desk Fit Formula</strong> helps busy professionals like you become healthier <strong style={{ color: "#18181b" }}>while you work</strong> — without leaving your work desk. No gym, no diets, no extra hours.
            </p>

            {/* Date — compact box that fits its content */}
            <div className="inline-flex items-center gap-3 rounded-2xl px-5 py-3 mb-3" style={{ background: "#18181b", boxShadow: "0 10px 26px -10px rgba(0,0,0,0.4)" }}>
              <span style={{ fontSize: 24 }}>📅</span>
              <div className="text-left">
                <p style={{ fontSize: 16.5, fontWeight: 800, color: "#fff", lineHeight: 1.15, fontFamily: "'Poppins',sans-serif" }}>{WEBINAR.dayLabel}, {WEBINAR.dateLabel}</p>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#e8a020" }}>{WEBINAR.timeLabel} · {WEBINAR.duration} · Live on Zoom</p>
              </div>
              <span className="inline-block rounded-full px-3 py-1.5 ml-1" style={{ background: "rgba(212,160,23,0.22)", color: "#e8a020", fontSize: 12, fontWeight: 800 }}>FREE</span>
            </div>

            {/* CTA — bigger, bolder */}
            <div className="flex flex-col items-center lg:items-start gap-2 mb-4">
              <button onClick={openRegister} className="btn-primary inline-flex items-center justify-center gap-3 rounded-2xl font-black text-white w-full sm:w-auto" style={{ fontSize: 22, padding: "22px 44px", boxShadow: "0 16px 40px rgba(212,160,23,0.5)", border: "none", cursor: "pointer", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
                <TicketIcon size={26} />
                <span className="inline-flex flex-wrap items-baseline justify-center gap-1.5">Reserve My Seat for <PriceTag /></span>
              </button>
              <p style={{ fontSize: 13, color: "#3f3f46" }}>Takes 30 seconds · Zoom link sent on WhatsApp</p>
            </div>

            {/* tiny social proof — real professional faces */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="flex -space-x-2.5">
                {["/desk/gem/woman-1.jpg", "/desk/gem/man-1.jpg", "/desk/gem/woman-2.jpg", "/desk/gem/man-2.jpg"].map((src) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={src} src={src} alt="" className="w-9 h-9 rounded-full object-cover border-2 border-white" style={{ objectPosition: "center top", boxShadow: "0 2px 6px rgba(0,0,0,0.12)" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">{[1,2,3,4,5].map(i=><Star key={i}/>)}</div>
                <p style={{ fontSize: 13, color: "#3f3f46", marginTop: 2 }}>Loved by desk professionals across India</p>
              </div>
            </div>
          </div>

          {/* Right: relatable photo — professional wishing they had time to be healthy */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative" style={{ animation: "ss-float 5s ease-in-out infinite", maxWidth: 440, width: "100%" }}>
              <div className="rounded-3xl overflow-hidden" style={{ border: "6px solid #fff", boxShadow: "0 24px 60px -18px rgba(184,134,11,0.4)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/desk/gem/hero-tense2.jpg" alt="A busy professional wishing they had time to stay healthy at work" className="w-full h-auto block" onError={e => { (e.target as HTMLImageElement).closest('div')?.style.setProperty('display','none'); }} />
              </div>
              {/* floating callout chips */}
              <div className="absolute -left-3 top-8 rounded-2xl px-3 py-2 flex items-center gap-1.5" style={{ background: "#fff", boxShadow: "0 8px 22px rgba(0,0,0,0.12)", border: "1px solid #eee7d6" }}>
                <span style={{ fontSize: 18 }}>⏰</span><span style={{ fontSize: 12.5, fontWeight: 700, color: "#18181b" }}>No time for gym</span>
              </div>
              <div className="absolute -right-2 bottom-10 rounded-2xl px-3 py-2 flex items-center gap-1.5" style={{ background: "#fff", boxShadow: "0 8px 22px rgba(0,0,0,0.12)", border: "1px solid #eee7d6" }}>
                <span style={{ fontSize: 18 }}>💪</span><span style={{ fontSize: 12.5, fontWeight: 700, color: "#18181b" }}>Healthy at work</span>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Countdown timer bar — pinned to the very bottom of the hero screen */}
        <div className="border-t shrink-0" style={{ borderColor: "#e6d9b0", background: "rgba(255,255,255,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <p className="text-center sm:text-right" style={{ fontSize: 15, fontWeight: 700, color: "#18181b" }}>
              ⏳ Masterclass starts in
            </p>
            <Countdown />
          </div>
        </div>
      </section>

      {/* ══ 1b. WHO IS THIS MASTERCLASS FOR? ════════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "linear-gradient(135deg,#141b2e 0%,#0f1626 50%,#141b2e 100%)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-3">
            <h2 className="duc-h2" style={{ color: "#fff" }}>Who is this masterclass for?</h2>
          </Reveal>
          <Reveal className="flex justify-center mb-11">
            <span style={{ display: "block", width: 54, height: 4, borderRadius: 4, background: "#d4a017" }} />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: "💻", text: <>You <strong style={{ color: "#fff" }}>sit 6+ hours a day</strong> at a desk — coding, meetings, emails — and by evening your neck, back and eyes are paying the price.</> },
              { icon: "⏰", text: <>You <strong style={{ color: "#fff" }}>want to be healthy</strong> but genuinely have no time for the gym or diets. Every plan you start dies within a couple of weeks.</> },
              { icon: "🔋", text: <>You&apos;re tired of the <strong style={{ color: "#fff" }}>afternoon crashes, stiffness and low energy</strong> — and you want a simple way to feel better <em>without</em> leaving your work.</> },
            ].map(({ icon, text }, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="rounded-3xl p-7 h-full text-center md:text-left" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,160,23,0.2)" }}>
                  <div className="inline-flex items-center justify-center rounded-full mb-5" style={{ width: 64, height: 64, background: "#fff", fontSize: 30 }}>{icon}</div>
                  <p style={{ fontSize: 17, color: "rgba(255,255,255,0.86)", lineHeight: 1.65, fontWeight: 500 }}>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p className="text-center mt-9" style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", maxWidth: 560, margin: "2rem auto 0", lineHeight: 1.6 }}>
              If you nodded to even one of these… <strong style={{ color: "#e8a020" }}>this masterclass was made for you.</strong>
            </p>
            <div className="flex justify-center mt-8">
              <button onClick={openRegister} className="btn-primary inline-flex items-center gap-3 rounded-full font-black text-white" style={{ fontSize: 19, padding: "18px 40px", border: "none", cursor: "pointer" }}>
                <TicketIcon size={22} />
                <span className="inline-flex flex-wrap items-baseline gap-1.5">Reserve My Seat for <PriceTag /></span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 2. WHAT YOU'LL LEARN ════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-10">
            <p className="duc-label mb-3">🎓 On the free masterclass</p>
            <h2 className="duc-h2 duc-section-title">In just {WEBINAR.duration},<br className="hidden sm:block" /> you&apos;ll discover…</h2>
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            {/* relatable image */}
            <Reveal className="order-2 lg:order-1">
              <div className="rounded-3xl overflow-hidden" style={{ border: "6px solid #faf8f3", boxShadow: "0 20px 50px -18px rgba(184,134,11,0.35)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/desk/gem/hero-v3.jpg" alt="A professional staying healthy with a quick stretch at their work desk" className="w-full h-auto block" onError={e => { (e.target as HTMLImageElement).closest('div')?.style.setProperty('display','none'); }} />
              </div>
            </Reveal>
            {/* checklist */}
            <div className="order-1 lg:order-2 flex flex-col gap-3.5">
              {[
                "Why sitting for long hours at your desk is silently damaging your health — even if you're young.",
                "The hidden daily habits that are making you tired, stiff and less productive.",
                "Why traditional health advice doesn't work for busy professionals.",
                "A simple system to improve your health while you're already working.",
                "The 7 pillars that can help you build healthier workdays.",
              ].map((t, i) => (
                <Reveal key={t} delay={i * 70}>
                  <div className="pop-card flex items-center gap-4 rounded-2xl px-5 py-4" style={{ background: "#faf8f3", border: "1.5px solid #e6d9b0" }}>
                    <span className="shrink-0 inline-flex items-center justify-center rounded-full text-white" style={{ width: 32, height: 32, background: "linear-gradient(135deg,#059669,#10b981)", fontSize: 17, fontWeight: 900 }}>✓</span>
                    <p style={{ fontSize: 16.5, color: "#18181b", lineHeight: 1.5, fontWeight: 600 }}>{t}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          {/* No … strip */}
          <Reveal delay={120}>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              {["No workouts", "No diets", "No major lifestyle changes"].map(t => (
                <span key={t} className="inline-flex items-center gap-2 rounded-full px-4 py-2.5" style={{ background: "#fff7f7", border: "1.5px solid #fecaca", fontSize: 15.5, fontWeight: 700, color: "#991b1b" }}>
                  <span style={{ color: "#dc2626", fontWeight: 900 }}>✕</span>{t}
                </span>
              ))}
            </div>
          </Reveal>
          <div className="flex justify-center mt-10">
            <CTA sub={`${DATE_LINE} · ${WEBINAR.duration}`} />
          </div>
        </div>
      </section>

      {/* ══ 3. DOES THIS SOUND LIKE YOU? — 9-symptom checklist ══════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-8">
            <p className="duc-label mb-3">A quick gut-check</p>
            <h2 className="duc-h2 duc-section-title">Does this sound like you?</h2>
          </Reveal>
          <Reveal className="mb-9">
            <div className="mx-auto rounded-3xl overflow-hidden" style={{ maxWidth: 560, border: "6px solid #fff", boxShadow: "0 18px 44px -18px rgba(0,0,0,0.22)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/desk/gem/damage-eyes.jpg" alt="A tired professional straining at their desk by the end of the day" className="w-full h-auto block" onError={e => { (e.target as HTMLImageElement).closest('div')?.style.setProperty('display','none'); }} />
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {[
              { icon: "🦴", t: "Neck or back pain by evening" },
              { icon: "👀", t: "Dry or tired eyes" },
              { icon: "🥱", t: "Feeling exhausted after work" },
              { icon: "💧", t: "Forgetting to drink enough water" },
              { icon: "🪑", t: "Sitting for hours without moving" },
              { icon: "🔋", t: "Low energy after lunch" },
              { icon: "⏰", t: "No time for exercise" },
              { icon: "😣", t: "Constant stiffness" },
              { icon: "📉", t: "Work is slowly affecting your health" },
            ].map(({ icon, t }, i) => (
              <Reveal key={t} delay={i * 45}>
                <div className="pop-card flex items-center gap-3 rounded-2xl px-4 py-4 h-full" style={{ background: "#fff", border: "1.5px solid #e6d9b0" }}>
                  <span className="shrink-0 inline-flex items-center justify-center rounded-xl" style={{ width: 42, height: 42, background: "rgba(212,160,23,0.1)", fontSize: 22 }}>{icon}</span>
                  <span style={{ fontSize: 15.5, color: "#3f3f46", lineHeight: 1.4, fontWeight: 600 }}>{t}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p className="text-center mt-9" style={{ fontSize: 17, fontWeight: 700, color: "#18181b", maxWidth: 520, margin: "2.25rem auto 0" }}>
              Relate to even a few of these? <span style={{ color: "#a8790d" }}>This masterclass is for you.</span>
            </p>
          </Reveal>
        </div>
      </section>

{/* ══ 5. INTRODUCING THE DESK HEALTH SYSTEM™ + 7 PILLARS ══════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-9">
            <p className="duc-label mb-3">Introducing</p>
            <h2 className="duc-h2 duc-section-title mb-3">The Desk Fit Formula</h2>
            <p style={{ fontSize: 17, fontWeight: 700, color: "#a8790d", marginBottom: 14 }}>A smarter way to stay healthy while you work.</p>
            <p style={{ fontSize: 17, color: "#3f3f46", maxWidth: 640, margin: "0 auto", lineHeight: 1.65 }}>
              A practical workplace wellness framework designed for people who spend long hours at a desk. Instead of changing your whole lifestyle, it improves your health through <strong style={{ color: "#18181b" }}>small daily actions that fit naturally into your workday.</strong>
            </p>
          </Reveal>

          {/* The four "no"s */}
          <Reveal delay={60}>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-11">
              {["No gym", "No strict diets", "No complicated routines", "No extra hours"].map(t => (
                <span key={t} className="inline-flex items-center gap-2 rounded-full px-4 py-2.5" style={{ background: "#fff", border: "1.5px solid #e6d9b0", fontSize: 15.5, fontWeight: 700, color: "#18181b" }}>
                  <span style={{ color: "#dc2626", fontWeight: 900 }}>✕</span>{t}
                </span>
              ))}
            </div>
          </Reveal>

          {/* 7 Pillars */}
          <div className="text-center mb-6">
            <p className="duc-label">Built around 7 essential pillars</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { icon: "🪑", name: "Posture & Spine", tint: "#eaf3ff", ring: "#cfe2fb" },
              { icon: "👀", name: "Eye Care", tint: "#f0ecff", ring: "#ddd4fb" },
              { icon: "💧", name: "Hydration", tint: "#e8f7fb", ring: "#c7ebf3" },
              { icon: "🚶", name: "Desk Mobility", tint: "#eafaf0", ring: "#c9eed7" },
              { icon: "⚡", name: "Energy", tint: "#fff5e6", ring: "#f5e2bd" },
              { icon: "🧠", name: "Focus", tint: "#fdeef0", ring: "#f7d4da" },
              { icon: "😌", name: "Stress Management", tint: "#eefaf3", ring: "#c9edd9" },
            ].map(({ icon, name, tint, ring }, i) => (
              <Reveal key={name} delay={i * 55}>
                <div className="pop-card rounded-2xl p-5 flex flex-col items-center text-center h-full" style={{ background: "#fff", border: "1.5px solid #e6d9b0" }}>
                  <span className="inline-flex items-center justify-center rounded-2xl mb-2.5" style={{ width: 54, height: 54, background: tint, border: `1.5px solid ${ring}`, fontSize: 28 }}>{icon}</span>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#18181b", lineHeight: 1.3 }}>{name}</p>
                </div>
              </Reveal>
            ))}
            {/* filler CTA tile to complete the grid */}
            <div className="rounded-2xl p-5 flex flex-col items-center justify-center text-center" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)" }}>
              <span style={{ fontSize: 26, marginBottom: 4 }}>🎓</span>
              <p style={{ fontSize: 13, fontWeight: 800, color: "#fff", lineHeight: 1.3 }}>All 7 explained on the masterclass</p>
            </div>
          </div>
          <p className="text-center mt-8" style={{ fontSize: 16, color: "#3f3f46", maxWidth: 580, margin: "1.5rem auto 0" }}>
            Together, these seven pillars address the most common health challenges faced by desk professionals.
          </p>
          <div className="flex justify-center mt-8">
            <CTA sub={`${DATE_LINE} · ${WEBINAR.duration}`} />
          </div>
        </div>
      </section>

{/* ══ 8b. BEFORE vs AFTER THE MASTERCLASS ═════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-10">
            <p className="duc-label mb-3">The transformation</p>
            <h2 className="duc-h2 duc-section-title">Before vs after this masterclass</h2>
            <p style={{ fontSize: 17, color: "#3f3f46", maxWidth: 560, margin: "0.75rem auto 0", lineHeight: 1.6 }}>
              Same desk. Same job. Same 8 hours. Here&apos;s how your workday feels once you apply the Desk Fit Formula.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* BEFORE */}
            <Reveal>
              <div className="rounded-3xl overflow-hidden h-full flex flex-col" style={{ border: "2px solid #fecaca", background: "#fff7f7" }}>
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/desk/gem/before.jpg" alt="A tired, low-energy professional before the masterclass" className="w-full h-56 object-cover object-top" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full flex items-center gap-1.5" style={{ background: "#dc2626", color: "#fff", fontSize: 12.5, fontWeight: 800 }}>😔 BEFORE</div>
                </div>
                <div className="p-6 flex flex-col gap-2.5 flex-1">
                  {[
                    "Stiff neck & aching back by evening",
                    "Tired, strained eyes from screens",
                    "Energy crashes every afternoon",
                    "Feeling your health slowly slipping",
                    "No idea how to fix it without extra time",
                  ].map(t => (
                    <div key={t} className="flex items-start gap-2.5"><span style={{ color: "#dc2626", fontSize: 16, fontWeight: 900, marginTop: -1 }}>✕</span><span style={{ fontSize: 15.5, color: "#3f3f46", lineHeight: 1.5 }}>{t}</span></div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* AFTER */}
            <Reveal delay={90}>
              <div className="rounded-3xl overflow-hidden h-full flex flex-col" style={{ border: "2px solid #bbf7d0", background: "#f0fdf4", boxShadow: "0 14px 36px -16px rgba(5,150,105,0.4)" }}>
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/desk/gem/after.jpg" alt="An energetic, healthy professional after the masterclass" className="w-full h-56 object-cover object-top" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full flex items-center gap-1.5" style={{ background: "#059669", color: "#fff", fontSize: 12.5, fontWeight: 800 }}>😄 AFTER</div>
                </div>
                <div className="p-6 flex flex-col gap-2.5 flex-1">
                  {[
                    "Better posture — less neck & back pain",
                    "Fresher eyes and clearer focus",
                    "Steady energy right through the day",
                    "Calmer, less stressed at work",
                    "Simple daily habits that fit your workday",
                  ].map(t => (
                    <div key={t} className="flex items-start gap-2.5"><span style={{ color: "#059669", fontSize: 16, fontWeight: 900, marginTop: -1 }}>✓</span><span style={{ fontSize: 15.5, color: "#18181b", fontWeight: 600, lineHeight: 1.5 }}>{t}</span></div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* What you'll be able to do */}
          <Reveal delay={80}>
            <div className="rounded-3xl p-6 lg:p-8 mt-8" style={{ background: "#faf8f3", border: "1.5px solid #e6d9b0" }}>
              <p className="text-center duc-label mb-6">✨ After the masterclass, you&apos;ll be able to…</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: "🪑", t: "Fix your posture & sitting", d: "Simple resets that protect your neck, back and spine all day." },
                  { icon: "⚡", t: "Keep energy up all day", d: "Beat the afternoon slump without more coffee." },
                  { icon: "🧩", t: "Run the Desk Fit Formula", d: "Know the 7 pillars and a 7-day plan to start this week." },
                ].map(({ icon, t, d }) => (
                  <div key={t} className="rounded-2xl p-5 text-center h-full" style={{ background: "#fff", border: "1.5px solid #e6d9b0" }}>
                    <span style={{ fontSize: 32 }}>{icon}</span>
                    <p style={{ fontSize: 16, fontWeight: 800, color: "#18181b", margin: "8px 0 4px" }}>{t}</p>
                    <p style={{ fontSize: 14, color: "#3f3f46", lineHeight: 1.5 }}>{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="flex justify-center mt-10">
            <CTA sub={`${DATE_LINE} · ${WEBINAR.duration}`} />
          </div>
        </div>
      </section>

      {/* ══ 4. WHY THIS HAPPENS ═════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <Reveal className="mb-9">
            <div className="mx-auto rounded-3xl overflow-hidden" style={{ maxWidth: 300, border: "5px solid #faf8f3", boxShadow: "0 18px 44px -16px rgba(0,0,0,0.2)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/desk/gem/damage-neck.jpg" alt="A tired professional with a stiff neck at their desk" className="w-full h-auto block" onError={e => { (e.target as HTMLImageElement).closest('div')?.style.setProperty('display','none'); }} />
            </div>
          </Reveal>
          <Reveal>
            <p className="duc-label mb-3">Why this happens</p>
            <h2 className="duc-h2 duc-section-title mb-7">
              It&apos;s not your job.<br />
              <span style={{ color: "#a8790d" }}>It&apos;s the tiny habits your job creates.</span>
            </h2>
          </Reveal>
          {/* visual chain */}
          <Reveal delay={80}>
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
              {[
                { icon: "📅", t: "Every meeting" },
                { icon: "📧", t: "Every email" },
                { icon: "✅", t: "Every task" },
                { icon: "🪑", t: "Every hour at your desk" },
              ].map(({ icon, t }, i, arr) => (
                <div key={t} className="flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-2 rounded-full px-4 py-2.5" style={{ background: "#faf8f3", border: "1.5px solid #e6d9b0", fontSize: 14, fontWeight: 700, color: "#3f3f46" }}>
                    <span style={{ fontSize: 17 }}>{icon}</span>{t}
                  </span>
                  {i < arr.length - 1 && <span className="hidden sm:inline" style={{ color: "#d4a017", fontWeight: 900 }}>→</span>}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={140}>
            <p style={{ fontSize: 17.5, color: "#3f3f46", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 18px" }}>
              Tiny unhealthy habits slowly become your daily routine. The problem isn&apos;t working long hours.
            </p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#18181b", maxWidth: 560, margin: "0 auto" }}>
              The problem is working <span style={{ color: "#a8790d" }}>without healthy habits.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ 4b. A NEW WAY TO THINK ABOUT HEALTH — before / after / DURING ═══ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-10">
            <p className="duc-label mb-3">A new way to think about health</p>
            <h2 className="duc-h2 duc-section-title">Most people try to get healthy at<br className="hidden sm:block" /> the wrong time of day.</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            {[
              { when: "Before work", emoji: "🌅", note: "Wake up early to exercise… then snooze it.", dim: true },
              { when: "After work", emoji: "🌙", note: "Hit the gym later… but you're drained.", dim: true },
              { when: "During work", emoji: "💡", note: "Almost nobody does this — and that's the missing piece.", dim: false },
            ].map(({ when, emoji, note, dim }) => (
              <Reveal key={when} className="h-full">
                <div className="rounded-3xl p-6 h-full flex flex-col items-center text-center" style={dim
                  ? { background: "#fff", border: "1.5px solid #eee7d6", opacity: 0.85 }
                  : { background: "linear-gradient(135deg,#171412,#18181b)", border: "1.5px solid #b8860b", boxShadow: "0 14px 40px -12px rgba(184,134,11,0.5)" }}>
                  <span style={{ fontSize: 40, marginBottom: 8 }}>{emoji}</span>
                  <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: dim ? "#a1a1aa" : "#e8a020", marginBottom: 6 }}>{when}</p>
                  <p style={{ fontSize: 16, fontWeight: 600, color: dim ? "#71717a" : "#fff", lineHeight: 1.5 }}>{note}</p>
                  {!dim && <span className="mt-4 inline-block rounded-full px-3 py-1" style={{ background: "rgba(212,160,23,0.2)", color: "#e8a020", fontSize: 12, fontWeight: 800 }}>✨ The missing piece</span>}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <div className="grid sm:grid-cols-2 gap-6 items-center mt-11 rounded-3xl p-5 sm:p-6" style={{ background: "#fff", border: "1.5px solid #e6d9b0" }}>
              <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 14px 36px -14px rgba(184,134,11,0.35)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/desk/gem/working.jpg" alt="A professional improving their health during the workday" className="w-full h-auto block" onError={e => { (e.target as HTMLImageElement).closest('div')?.style.setProperty('display','none'); }} />
              </div>
              <div className="text-center sm:text-left">
                <span className="inline-block rounded-full px-3 py-1 mb-3" style={{ background: "rgba(212,160,23,0.14)", color: "#a8790d", fontSize: 12, fontWeight: 800 }}>✨ The missing piece</span>
                <p style={{ fontSize: 19, fontWeight: 700, color: "#18181b", lineHeight: 1.45 }}>
                  Your workday is where you spend most of your waking life. <span style={{ color: "#a8790d" }}>So that&apos;s where your health should improve.</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      

      {/* ══ 6. IMAGINE THIS… — the philosophy ═══════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-4">
            <p className="duc-label mb-3">Imagine this…</p>
            <h2 className="duc-h2 duc-section-title">What if your workday actually<br className="hidden sm:block" /> made you <span style={{ color: "#a8790d" }}>healthier?</span></h2>
          </Reveal>
          <Reveal className="mb-9">
            <p className="text-center" style={{ fontSize: 17, color: "#3f3f46", maxWidth: 620, margin: "0 auto", lineHeight: 1.6 }}>
              You don&apos;t need big goals you never keep. Just swap them for <strong style={{ color: "#18181b" }}>tiny actions that fit inside your workday</strong> 👇
            </p>
          </Reveal>

          {/* Instead of X → do Y swap cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-9">
            {[
              { icon: "🚶", big: "Walk 10 minutes", tiny: "After every meeting, walk for just 2 minutes." },
              { icon: "💧", big: "Drink 3 litres of water", tiny: "Every time you return to your desk, drink a sip of water." },
              { icon: "🧘", big: "Stretch daily", tiny: "Do one quick stretch before you open Outlook or Slack." },
              { icon: "😮‍💨", big: "Meditate every day", tiny: "Take three deep breaths before every meeting." },
            ].map(({ icon, big, tiny }, i) => (
              <Reveal key={big} delay={i * 70}>
                <div className="pop-card rounded-2xl p-5 h-full flex flex-col" style={{ background: "#fff", border: "1.5px solid #e6d9b0" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center justify-center rounded-xl shrink-0" style={{ width: 40, height: 40, background: "rgba(212,160,23,0.1)", fontSize: 22 }}>{icon}</span>
                    <span className="rounded-full px-2.5 py-1" style={{ background: "#fff1f1", color: "#b91c1c", fontSize: 11.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em" }}>Instead of</span>
                    <span style={{ fontSize: 14.5, fontWeight: 700, color: "#9ca3af", textDecoration: "line-through", textDecorationColor: "#fca5a5" }}>{big}</span>
                  </div>
                  <div className="flex items-start gap-2.5 rounded-xl p-3 mt-auto" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                    <span style={{ color: "#059669", fontSize: 16, fontWeight: 900, marginTop: 1 }}>✓</span>
                    <p style={{ fontSize: 16, fontWeight: 600, color: "#18181b", lineHeight: 1.5 }}>{tiny}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="rounded-2xl px-6 py-6 text-center" style={{ background: "linear-gradient(135deg,#171412,#18181b)" }}>
            <p style={{ fontSize: "clamp(1.05rem,2.4vw,1.35rem)", fontWeight: 900, color: "#fff", lineHeight: 1.5 }}>
              These changes are so small you can&apos;t say no — <span style={{ color: "#e8a020" }}>yet done daily, they quietly rebuild your health.</span>
            </p>
            <p style={{ fontSize: 13.5, color: "#a1a1aa", marginTop: 10 }}>That&apos;s the philosophy behind the Desk Fit Formula.</p>
          </div>
        </div>
      </section>

      {/* ══ 7. WHO SHOULD ATTEND ════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "linear-gradient(135deg,#171412 0%,#18181b 50%,#171412 100%)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-8">
            <p className="duc-label mb-3" style={{ color: "#a8790d" }}>Who should attend?</p>
            <h2 className="duc-h2" style={{ color: "#fff" }}>For anyone who spends<br className="hidden sm:block" /> 6+ hours a day at a desk</h2>
          </Reveal>
          {/* professional faces strip */}
          <Reveal className="flex justify-center mb-9">
            <div className="flex -space-x-3">
              {["/desk/gem/man-1.jpg", "/desk/gem/woman-1.jpg", "/desk/gem/man-2.jpg", "/desk/gem/woman-2.jpg"].map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt="" className="w-14 h-14 rounded-full object-cover" style={{ objectPosition: "center top", border: "3px solid #18181b", boxShadow: "0 4px 12px rgba(0,0,0,0.4)" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
              ))}
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)", border: "3px solid #18181b", fontSize: 12, fontWeight: 800, color: "#fff" }}>+2k</div>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { icon: "💻", t: "Software Engineers" },
              { icon: "🖥️", t: "IT Professionals" },
              { icon: "🏢", t: "Corporate Employees" },
              { icon: "🎨", t: "Designers" },
              { icon: "🧑‍💼", t: "HR Professionals" },
              { icon: "📊", t: "Managers" },
              { icon: "🚀", t: "Founders" },
              { icon: "🏠", t: "Remote Workers" },
              { icon: "🎓", t: "Students" },
            ].map(({ icon, t }, i) => (
              <Reveal key={t} delay={i * 40}>
                <div className="flex items-center gap-2.5 rounded-2xl p-3.5 h-full" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,160,23,0.18)" }}>
                  <span className="shrink-0" style={{ fontSize: 20 }}>{icon}</span>
                  <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.92)", lineHeight: 1.4, fontWeight: 600 }}>{t}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p className="text-center mt-8" style={{ fontSize: 17, color: "rgba(255,255,255,0.85)", maxWidth: 520, margin: "2rem auto 0", lineHeight: 1.6 }}>
              If your workday revolves around a laptop or computer… <strong style={{ color: "#e8a020" }}>this masterclass is for you.</strong>
            </p>
            <div className="flex justify-center mt-8">
              <button onClick={openRegister} className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-full font-black text-white" style={{ fontSize: 18, border: "none", cursor: "pointer" }}>
                <TicketIcon size={20} />That&apos;s Me — Reserve My Seat <span style={{ textDecoration: "line-through", textDecorationColor: "#fca5a5", opacity: 0.85, marginLeft: 4 }}>{WEBINAR.price}</span> FREE
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      

      {/* ══ 9. WHO'S TEACHING — founder story (Rohan) ═══════════════════════ */}
      <section className="py-16 lg:py-24" style={{ background: "linear-gradient(180deg,#faf8f3 0%,#fff 100%)" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-11">
            <p className="duc-label mb-3">👋 Meet your host</p>
            <h2 className="duc-h2 duc-section-title">The story behind the Desk Fit Formula</h2>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-9 lg:gap-12 items-start">
            {/* Big image */}
            <Reveal className="lg:col-span-5">
              <div className="relative mx-auto" style={{ maxWidth: 380 }}>
                <div className="rounded-3xl overflow-hidden" style={{ border: "8px solid #fff", boxShadow: "0 26px 60px -18px rgba(0,0,0,0.3)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/rohan.png" alt="Rohan — creator of the Desk Fit Formula" className="w-full h-auto object-cover object-top" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-2xl px-5 py-2.5 text-center whitespace-nowrap" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)", boxShadow: "0 12px 28px -8px rgba(184,134,11,0.6)" }}>
                  <p style={{ fontSize: 16, fontWeight: 900, color: "#fff", lineHeight: 1.1, fontFamily: "'Poppins',sans-serif" }}>Rohan</p>
                  <p style={{ fontSize: 11.5, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>Creator, Desk Fit Formula</p>
                </div>
              </div>
            </Reveal>

            {/* Story */}
            <Reveal delay={80} className="lg:col-span-7">
              <div className="space-y-4" style={{ fontSize: 16.5, color: "#3f3f46", lineHeight: 1.75 }}>
                <p>A few years ago, I was living the exact life you are — <strong style={{ color: "#18181b" }}>8 to 10 hours a day glued to a desk.</strong> Back-to-back meetings, endless emails, one deadline after another.</p>
                <p>On paper I was doing great. But my body was quietly falling apart. My neck ached every evening. My back was stiff. My eyes burned by 4 PM. My energy crashed after lunch, and by night I was too drained to do anything.</p>
                <p>So I did what everyone tells you to do — <em>&ldquo;just go to the gym,&rdquo; &ldquo;follow a diet,&rdquo; &ldquo;wake up early and exercise.&rdquo;</em> I tried them all. And every single one failed within weeks, because none of them fit into my actual workday. I simply didn&apos;t have the time or energy left over.</p>
                <div className="my-5 pl-5 py-2" style={{ borderLeft: "4px solid #d4a017" }}>
                  <p style={{ fontSize: 18, fontWeight: 600, color: "#18181b", fontStyle: "italic", lineHeight: 1.6 }}>
                    Then it hit me: the problem wasn&apos;t that I lacked discipline. The problem was that I was trying to fix my health <em>outside</em> the one place I spent most of my life — my desk.
                  </p>
                </div>
                <p>So I flipped it. Instead of adding health <em>on top of</em> work, I started hiding tiny healthy habits <strong style={{ color: "#18181b" }}>inside</strong> my workday — triggered by things I already did. A posture reset before every email. Water after every meeting. A 20-second eye break between tasks. A quick stretch before each call.</p>
                <p>No gym. No diet. No extra time. And slowly, everything changed — my posture, my energy, my focus, my mood. I felt <strong style={{ color: "#18181b" }}>years younger at the same desk.</strong></p>
                <p>I organized everything I learned into a simple framework — <strong style={{ color: "#18181b" }}>the Desk Fit Formula</strong> — 7 pillars and a set of tiny daily &ldquo;desk missions.&rdquo; Since then I&apos;ve taught it to <strong style={{ color: "#18181b" }}>thousands of desk professionals across India</strong>, and the results speak for themselves.</p>
                <p style={{ fontWeight: 700, color: "#18181b" }}>In this free masterclass, I&apos;ll hand you the exact same system — so your workday starts working <em>for</em> your health, instead of against it. 🙌</p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <p style={{ fontSize: 22, color: "#a8790d", fontWeight: 900, fontFamily: "'Poppins',sans-serif" }}>— Rohan</p>
                <span className="w-8 h-px" style={{ background: "#e2dfd6" }} />
                <p style={{ fontSize: 14, color: "#3f3f46" }}>Creator, Desk Fit Formula</p>
              </div>
              <div className="mt-7">
                <CTA sub={`${DATE_LINE} · ${WEBINAR.duration}`} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 9b. TESTIMONIALS ════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-3">
            <p className="duc-label mb-3">Real desk professionals</p>
            <h2 className="duc-h2 duc-section-title">What people are saying</h2>
          </Reveal>
          <Reveal className="flex justify-center mb-11">
            <span style={{ display: "block", width: 54, height: 4, borderRadius: 4, background: "#d4a017" }} />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: "/desk/gem/man-1.jpg", name: "Rahul Verma", role: "Software Engineer, Bengaluru", stars: 5, quote: "By 5 PM my neck and back used to be killing me. Two weeks of these tiny desk habits and the pain is basically gone. I didn't change my job or join a gym — I just changed how I work." },
              { img: "/desk/gem/woman-1.jpg", name: "Ananya Iyer", role: "Product Manager, Pune", stars: 5, quote: "I always thought I had no time to be healthy. This masterclass showed me I don't need extra time — my afternoon energy crashes are gone and I actually feel fresh in meetings now." },
              { img: "/desk/gem/man-2.jpg", name: "Karan Mehta", role: "Consultant, Mumbai", stars: 5, quote: "Simple, practical, zero fluff. The 'do it before you open Slack' trick alone fixed my posture. Best free session I've attended — and everything fits into a normal workday." },
            ].map(({ img, name, role, stars, quote }, i) => (
              <Reveal key={name} delay={i * 90}>
                <div className="rounded-3xl p-6 h-full flex flex-col" style={{ background: "#faf8f3", border: "1.5px solid #e6d9b0", boxShadow: "0 8px 26px rgba(0,0,0,0.05)" }}>
                  <div className="flex items-center gap-1 mb-3">{Array.from({ length: stars }).map((_, s) => <Star key={s} />)}</div>
                  <p style={{ fontSize: 16, color: "#3f3f46", lineHeight: 1.65, fontWeight: 500, flex: 1 }}>&ldquo;{quote}&rdquo;</p>
                  <div className="flex items-center gap-3 mt-5 pt-4" style={{ borderTop: "1px solid #e6d9b0" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={name} className="w-11 h-11 rounded-full object-cover" style={{ objectPosition: "center top", border: "2px solid #fff", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 800, color: "#18181b" }}>{name}</p>
                      <p style={{ fontSize: 12.5, color: "#71717a" }}>{role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p className="text-center mt-9" style={{ fontSize: 14, color: "#71717a" }}>
              ⭐ Loved by <strong style={{ color: "#18181b" }}>2,000+ desk professionals</strong> across India
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ 10. FAQ ═════════════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-9">
            <p className="duc-label mb-3">Quick questions</p>
            <h2 className="duc-h2 duc-section-title">Good to know</h2>
          </div>
          <div className="flex flex-col gap-2.5">
            {[
              { q: "Is it really free?", a: "Yes — the masterclass is 100% free. Just add your full name, email and WhatsApp number, and we'll send you the Zoom join link." },
              { q: "What is the Desk Fit Formula?", a: "It's a practical workplace wellness framework for people who work long hours at a desk. Instead of asking you to change your whole lifestyle, it improves your health through small daily actions that fit naturally into your workday — no gym, no diet, no complicated routines, no extra hours." },
              { q: "Do I need a special desk or any equipment?", a: "Not at all. It works with the normal desk and laptop or computer you already use for work. Nothing to buy, install or set up." },
              { q: "Is this about losing weight?", a: "No. This is about becoming healthier and more energetic — better posture, less stiffness, less eye strain, more energy and less stress. Feeling and looking better follows naturally, but weight loss is not the goal." },
              { q: "When is it and how long?", a: `${WHEN_LINE}. It's live on Zoom. We'll send the exact join link and reminders to your WhatsApp after you register.` },
              { q: "Who is it for?", a: "Anyone who spends 6+ hours a day working at a desk — IT and software professionals, corporate employees, designers, managers, founders, remote workers and students." },
              { q: "Is there anything to buy?", a: "Not to attend. The masterclass is genuinely useful on its own. Anything paid later is optional, and we'll explain it clearly." },
            ].map(({ q, a }) => <FAQ key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* ══ 11. FINAL CTA ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 lg:py-24" style={{ background: "#18181b" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(212,160,23,0.1),transparent 70%)" }} />
        <div className="max-w-xl mx-auto px-6 text-center relative">
          <div className="mx-auto mb-7 rounded-3xl overflow-hidden" style={{ maxWidth: 340, border: "5px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 50px -18px rgba(0,0,0,0.6)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/desk/gem/learning.jpg" alt="A professional attending the free Desk Fit Formula masterclass" className="w-full h-auto block" onError={e => { (e.target as HTMLImageElement).closest('div')?.style.setProperty('display','none'); }} />
          </div>
          <p className="duc-label mb-3" style={{ color: "#a8790d" }}>Free live masterclass</p>
          <h2 className="duc-h1 mb-4" style={{ color: "#fff" }}>
            Your job pays your bills.<br />
            <span style={{ color: "#a8790d" }}>It shouldn&apos;t cost you your health.</span>
          </h2>
          <p style={{ fontSize: 17, color: "#a1a1aa", lineHeight: 1.6, marginBottom: 22 }}>
            Spend one hour with us and discover a smarter, more practical way to stay healthy while working.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
            {[`🗓 ${WEBINAR.dateLabel}`, `⏱️ ${WEBINAR.duration}`, "🎟️ 100% FREE"].map(t => (
              <span key={t} className="rounded-full px-4 py-2" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(212,160,23,0.25)", fontSize: 14, fontWeight: 800, color: "#fff" }}>{t}</span>
            ))}
          </div>
          <CTA big sub={WEBINAR.seatsLine} />
          <p className="mt-5" style={{ fontSize: 13, color: "#3f3f46" }}>
            Have a question?{" "}
            <a href="https://wa.me/918956146485?text=Hi%2C+I+have+a+question+about+the+free+Desk+Fit+Formula+masterclass" className="underline" style={{ color: "#a8790d" }}>Message us on WhatsApp</a>
          </p>
        </div>
      </section>

      <footer className="px-5 py-6 text-center" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p style={{ fontSize: 13, color: "#3f3f46", marginBottom: 8, fontWeight: 600 }}>Because a healthier workday leads to a healthier life.</p>
        <p style={{ fontSize: 12, color: "#3f3f46" }}>
          © {new Date().getFullYear()} High Performance Club ·{" "}
          <a href="https://www.highperformanceclub.co" className="underline" style={{ color: "#3f3f46" }}>highperformanceclub.co</a>
        </p>
        <p style={{ fontSize: 12, color: "#3f3f46", marginTop: 4 }}>Free live masterclass · General wellness education · Results vary · Not medical advice</p>
      </footer>

      <StickyBottomCTA />
      <LiveToast />
      <RegisterNudge />
      <RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
    </RegisterCtx.Provider>
  );
}
