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
  dayLabel: "Wednesday",
  dateLabel: "5 August 2026",        // shown clearly in the hero
  timeLabel: "7:00 PM IST",
  duration: "90 minutes",
  platformLabel: "Live on Zoom",
  seatsLine: "100% free · Limited seats",
  price: "₹1,999",                   // struck-through on CTAs → FREE
  startISO: "2026-08-05T19:00:00+05:30", // countdown target (IST)
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

// ─── CTA button — "Register for ₹1,999 FREE" ─────────────────────────────
function CTA({ label, sub, big = false }: { label?: string; sub?: string; big?: boolean }) {
  const register = useRegister();
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={register}
        className="btn-primary inline-flex items-center justify-center gap-3 rounded-full font-black text-white w-full sm:w-auto"
        style={{ fontSize: big ? 24 : 22, padding: big ? "26px 56px" : "22px 48px", boxShadow: "0 14px 38px rgba(212,160,23,0.5)", letterSpacing: "-0.01em", border: "none", cursor: "pointer", lineHeight: 1.15 }}>
        <TicketIcon size={big ? 26 : 24} />
        {label ? <span>{label}</span> : <span className="inline-flex flex-wrap items-baseline justify-center gap-1.5">Register for <PriceTag /></span>}
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
    <div className="inline-flex items-center gap-2.5 sm:gap-3.5" aria-label="Time left until the masterclass" suppressHydrationWarning>
      {cells.map(([lbl, val], i) => (
        <div key={lbl} className="flex items-center gap-2.5 sm:gap-3.5">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center rounded-2xl tabular-nums" style={{ minWidth: 68, padding: "11px 14px", background: dark ? "rgba(255,255,255,0.08)" : "#18181b", border: dark ? "1px solid rgba(212,160,23,0.3)" : "none", fontSize: 34, fontWeight: 900, color: dark ? "#fff" : "#e8a020", fontFamily: "'Poppins',sans-serif", lineHeight: 1 }}>
              {String(val).padStart(2, "0")}
            </div>
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.6)" : "#a8790d", marginTop: 6 }}>{lbl}</span>
          </div>
          {i < cells.length - 1 && <span style={{ fontSize: 30, fontWeight: 900, color: dark ? "rgba(255,255,255,0.35)" : "#d4a017", marginBottom: 18 }}>:</span>}
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
    } catch {
      /* saved best-effort; never block the user */
    }
    // Send them to the Thank-You page (confirmation + WhatsApp group).
    if (typeof window !== "undefined") window.location.href = "/desk-health-system/thank-you";
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
              {status === "done" ? "You're in! See you live 🎉" : "Register your FREE seat"}
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
              <p style={{ fontSize: 14, color: "#3f3f46", lineHeight: 1.6, marginBottom: 16, textAlign: "center", fontWeight: 500 }}>
                We&apos;ll send your Zoom joining link along with some exciting bonuses to the details below.
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
                <TicketIcon size={18} />{status === "loading" ? "Saving…" : "Register My Free Seat →"}
              </button>
              <p style={{ fontSize: 12.5, color: "#71717a", marginTop: 10, textAlign: "center", lineHeight: 1.5 }}>Can&apos;t attend live? <strong style={{ color: "#3f3f46" }}>Register anyway</strong> — we&apos;ll send you the recording.</p>
              <p style={{ fontSize: 12, color: "#a1a1aa", marginTop: 4, textAlign: "center" }}>Free · No spam · Leave anytime</p>
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
          <p className="text-white font-black leading-tight" style={{ fontSize: 15 }}>Register My Seat <span style={{ textDecoration: "line-through", textDecorationColor: "#fca5a5", opacity: 0.85 }}>{WEBINAR.price}</span> FREE</p>
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
              <TicketIcon size={18} />Register My Free Seat →
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
      <div style={{ background: "linear-gradient(90deg,#b8860b 0%,#d4a017 50%,#b8860b 100%)", padding: "12px 16px" }}>
        <p className="text-center font-black text-white flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5" style={{ fontSize: "clamp(15px,2vw,18px)", fontWeight: 900, letterSpacing: "0.005em", lineHeight: 1.3 }}>
          <span>✨ FREE Desk Fit Masterclass</span>
          <span className="opacity-70" aria-hidden="true">·</span>
          <span>🗓 {DATE_LINE}</span>
          <span className="opacity-70 hidden sm:inline" aria-hidden="true">·</span>
          <span className="hidden sm:inline rounded-full px-2.5 py-0.5" style={{ background: "rgba(0,0,0,0.18)" }}>Limited seats</span>
        </p>
      </div>
      {/* one-line promise banner under the announcement bar */}
      <div style={{ background: "#18181b", padding: "10px 16px" }}>
        <p className="text-center" style={{ fontSize: "clamp(14px,2vw,17px)", fontWeight: 800, color: "#fff", lineHeight: 1.35, fontFamily: "'Poppins',sans-serif" }}>
          Finally! A Simplest Way to <span style={{ color: "#e8a020" }}>Stay Healthy &amp; Fit</span> — Without Finding Extra Time.
        </p>
      </div>

      {/* ══ 1. HERO — the problem + the free-masterclass promise ════════════════ */}
      {/* Fills exactly one screen (minus the ~40px announcement bar); the next
          section starts right when you scroll past it. */}
      <section className="relative overflow-hidden mesh-bg flex flex-col lg:min-h-[calc(100svh-48px)]" style={{ borderBottom: "1px solid #e2dfd6" }}>
        <div className="flex-1 flex items-center">
        <div className="w-full max-w-6xl mx-auto px-6 lg:px-8 pt-7 pb-8 lg:py-6 grid lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-8 items-center">

          {/* Left: copy */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 accent-pill" style={{ fontSize: 12.5, fontWeight: 700 }}>
              <span className="w-2 h-2 rounded-full inline-block animate-pulse" style={{ background: "#d4a017" }} />
              Built for Busy Working Professionals Who Spend Most of Their Day at a Desk
            </div>

            <h1 className="mb-4" style={{ fontSize: "clamp(1.75rem,3.3vw,2.7rem)", fontWeight: 800, lineHeight: 1.14, letterSpacing: "-0.03em", fontFamily: "'Poppins','Plus Jakarta Sans',sans-serif" }}>
              Want to build a healthier lifestyle…{" "}
              <span className="gradient-text">but can&apos;t find time because of work?</span>
            </h1>

            <p style={{ fontSize: 16.5, color: "#3f3f46", maxWidth: 560, margin: "0 auto 10px", lineHeight: 1.6 }} className="lg:mx-0">
              Join this free 90-minute masterclass and learn the <strong style={{ color: "#18181b" }}>Desk Fit Formula™</strong> — a practical system to help you build a <strong style={{ color: "#18181b" }}>healthier body while you work at your desk.</strong>
            </p>
            <p style={{ fontSize: 15, color: "#a8790d", fontWeight: 700, maxWidth: 560, margin: "0 auto 18px" }} className="lg:mx-0">
              No gym membership. No strict diet. No separate 60-minute routine.
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
                <span className="inline-flex flex-wrap items-baseline justify-center gap-1.5">Register for <PriceTag /></span>
              </button>
              <p style={{ fontSize: 13, color: "#3f3f46" }}>Takes 30 seconds · Zoom link sent on WhatsApp</p>
            </div>

            {/* social proof — avatars + loved-by count */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="flex items-center">
                {["avatar-1", "avatar-2", "avatar-3", "avatar-4"].map((a, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={a} src={`/desk/gem/${a}.jpg`} alt="Happy professional" className="rounded-full object-cover" style={{ width: 40, height: 40, border: "2.5px solid #fff", marginLeft: i === 0 ? 0 : -12, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1" style={{ color: "#e8a020", fontSize: 13, lineHeight: 1 }}>★★★★★</div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#18181b", marginTop: 3, lineHeight: 1.2 }}>Loved by <span style={{ color: "#a8790d" }}>2,000+ professionals</span> across India</p>
              </div>
            </div>
          </div>

          {/* Right: AI split before/after image — the image itself explains the product */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative" style={{ animation: "ss-float 5s ease-in-out infinite", maxWidth: 720, width: "100%" }}>
              <div className="rounded-3xl overflow-hidden" style={{ border: "6px solid #fff", boxShadow: "0 24px 60px -18px rgba(184,134,11,0.4)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/desk/hf/final_desk.jpg" alt="No time for health vs health built into work — the Desk Fit approach woven into your workday" className="w-full h-auto block" onError={e => { (e.target as HTMLImageElement).closest('div')?.style.setProperty('display','none'); }} />
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Countdown timer bar — pinned to the very bottom of the hero screen */}
        <div className="border-t shrink-0" style={{ borderColor: "#e6d9b0", background: "rgba(255,255,255,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-7">
            <p className="text-center sm:text-right" style={{ fontSize: 16.5, fontWeight: 800, color: "#18181b" }}>
              ⏳ Masterclass starts in
            </p>
            <Countdown />
          </div>
        </div>
      </section>

      {/* ══ 2. WORK vs HEALTH BALANCE — the modern struggle ═════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-3">
            <p className="duc-label mb-3">Sound familiar? ⭐</p>
            <h2 className="duc-h2 duc-section-title">If You&apos;ve Been Struggling To Balance Health &amp; Work…<br className="hidden sm:block" /> <span className="gradient-text">You&apos;re Not Alone.</span></h2>
          </Reveal>
          <Reveal className="mb-11">
            <p className="text-center" style={{ fontSize: 17, color: "#3f3f46", maxWidth: 640, margin: "0 auto", lineHeight: 1.6, fontWeight: 500 }}>
              Millions of working professionals face the same challenge every day. Work keeps demanding more of your time, while your health slowly moves further down your priority list.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-9 lg:gap-12 items-center">
            {/* image */}
            <Reveal>
              <div className="rounded-3xl overflow-hidden" style={{ border: "6px solid #faf8f3", boxShadow: "0 20px 50px -18px rgba(0,0,0,0.22)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/desk/gem/frustrated.jpg" alt="A working professional feeling frustrated and burnt out at their desk" className="w-full h-auto block" onError={e => { (e.target as HTMLImageElement).closest('div')?.style.setProperty('display','none'); }} />
              </div>
            </Reveal>

            {/* skimmable reality cards */}
            <div className="flex flex-col gap-3.5">
              {[
                { icon: "⏳", t: "“I’ll start next Monday.”" },
                { icon: "🏋️", t: "Gym membership… rarely used." },
                { icon: "💻", t: "Work drains your energy." },
                { icon: "🌙", t: "Too tired to exercise after work." },
                { icon: "🔁", t: "The same cycle repeats every week." },
              ].map(({ icon, t }, i) => (
                <Reveal key={i} delay={i * 70}>
                  <div className="flex items-center gap-3.5 rounded-2xl px-5 py-4" style={{ background: "#faf8f3", border: "1.5px solid #e6d9b0" }}>
                    <span className="shrink-0" style={{ fontSize: 24 }}>{icon}</span>
                    <span style={{ fontSize: 17, color: "#18181b", lineHeight: 1.35, fontWeight: 700, fontFamily: "'Poppins',sans-serif" }}>{t}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* pivot line */}
          <Reveal delay={120}>
            <div className="rounded-2xl px-6 py-7 text-center mt-10" style={{ background: "linear-gradient(135deg,#171412,#18181b)" }}>
              <p style={{ fontSize: "clamp(1.1rem,2.5vw,1.45rem)", fontWeight: 900, color: "#fff", lineHeight: 1.5 }}>
                What if you <strong style={{ fontWeight: 900 }}>NEVER</strong> had to <span style={{ color: "#e8a020" }}>choose between work and your health?</span>
              </p>
              <p style={{ fontSize: 16.5, color: "rgba(255,255,255,0.85)", marginTop: 12, maxWidth: 620, marginLeft: "auto", marginRight: "auto", lineHeight: 1.65, fontWeight: 500 }}>
                The <strong style={{ color: "#fff" }}>Desk Fit Formula™</strong> doesn&apos;t ask you to find extra time. It helps you build <strong style={{ color: "#fff" }}>HEALTHY QUICK HABITS</strong> into the workday you&apos;re already living.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 3b. SITTING IS THE NEW SMOKING — facts ══════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "linear-gradient(135deg,#1a1206 0%,#14100a 50%,#1a1206 100%)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-11">
            <p className="duc-label mb-3" style={{ color: "#e8a020" }}>The uncomfortable truth</p>
            <h2 className="duc-h2" style={{ color: "#fff" }}>Sitting is the <span style={{ color: "#e8a020" }}>new smoking!</span></h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.72)", maxWidth: 640, margin: "0.75rem auto 0", fontWeight: 500 }}>
              You might not be smoking. <strong style={{ color: "#fff" }}>But sitting 6+ hours is quietly doing similar damage to your health</strong> — even if you feel fine right now.
            </p>
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-9 lg:gap-12 items-center">
            {/* image */}
            <Reveal>
              <div className="rounded-3xl overflow-hidden" style={{ border: "5px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 50px -18px rgba(0,0,0,0.6)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/desk/hf/sitting.jpg" alt="A professional hunched at a desk after long hours of sitting, showing the hidden toll of prolonged sitting" className="w-full h-auto block" onError={e => { (e.target as HTMLImageElement).closest('div')?.style.setProperty('display','none'); }} />
              </div>
            </Reveal>
            {/* facts */}
            <div className="flex flex-col gap-4">
              {[
                { icon: "🪑", label: "Long Sitting", t: "Sitting 6+ hours daily is slowly <strong style=\"color:#fff\">weakening</strong> your body, building long-term health risks." },
                { icon: "🖥️", label: "Too Much Screen Time", t: "Staring at screens all day is making your eyes <strong style=\"color:#fff\">dry &amp; irritated.</strong>" },
                { icon: "🍟", label: "Stress Eating", t: "Daily stress snacking is quietly increasing your <strong style=\"color:#fff\">weight and body fat.</strong>" },
                { icon: "⏰", label: "Poor Meal Routine", t: "Skipping meals and relying on coffee is causing <strong style=\"color:#fff\">energy crashes.</strong>" },
              ].map(({ icon, label, t }, i) => (
                <Reveal key={label} delay={i * 70}>
                  <div className="flex items-start gap-4 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,160,23,0.22)" }}>
                    <span className="shrink-0 inline-flex items-center gap-1.5 rounded-xl" style={{ width: 150, minHeight: 46, padding: "8px 12px", background: "linear-gradient(135deg,#b8860b,#d4a017)", color: "#171412", fontSize: 14.5, fontWeight: 800, fontFamily: "'Poppins',sans-serif", lineHeight: 1.2 }}>
                      <span className="shrink-0" style={{ fontSize: 16 }}>{icon}</span>
                      <span>{label}</span>
                    </span>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.55, fontWeight: 500 }} dangerouslySetInnerHTML={{ __html: t }} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={100}>
            <p className="text-center mt-10" style={{ fontSize: 17.5, fontWeight: 700, color: "#fff", maxWidth: 620, margin: "2.5rem auto 0", lineHeight: 1.55 }}>
              The good news? <span style={{ color: "#e8a020" }}>You can UNDO all of it in minutes a day</span> — without a gym, a diet, or any extra time. That&apos;s exactly what the masterclass shows you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ 3a. THE MISSING WORKDAY — before/during/after ═══════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-4">
            <p className="duc-label mb-3">The problem with most health plans</p>
            <h2 className="duc-h2 duc-section-title">Almost Every Health Plan Focuses on <span className="gradient-text">Before Work or After Work.</span></h2>
          </Reveal>
          <Reveal className="mb-8">
            <p className="text-center" style={{ fontSize: 17, color: "#3f3f46", maxWidth: 660, margin: "0 auto", lineHeight: 1.6, fontWeight: 500 }}>
              Every health plan you&apos;ve tried expects you to find <strong style={{ color: "#b91c1c", fontWeight: 900 }}>EXTRA TIME.</strong>
            </p>
          </Reveal>

          {/* build-up line */}
          <Reveal delay={100}>
            <p className="text-center" style={{ fontSize: 17.5, color: "#18181b", fontWeight: 700, maxWidth: 660, margin: "0 auto", lineHeight: 1.55 }}>
              But almost none of them teach you how to use the <span style={{ color: "#a8790d" }}>6–8 hours you&apos;re already working</span> to improve your health.
            </p>
          </Reveal>

          {/* the answer — black section */}
          <Reveal delay={120}>
            <div className="rounded-2xl px-6 py-8 text-center mt-9" style={{ background: "linear-gradient(135deg,#171412,#18181b)" }}>
              <p style={{ fontSize: "clamp(1.2rem,2.8vw,1.65rem)", fontWeight: 900, color: "#fff", lineHeight: 1.45 }}>
                That&apos;s Exactly Why We Created the <span style={{ color: "#e8a020" }}>Desk Fit Formula™.</span>
              </p>
              <p style={{ fontSize: 16.5, color: "rgba(255,255,255,0.85)", marginTop: 14, maxWidth: 660, marginLeft: "auto", marginRight: "auto", lineHeight: 1.65, fontWeight: 500 }}>
                Instead of asking you to find more time, it helps you turn the hours you&apos;re already spending at your desk into <strong style={{ color: "#fff" }}>opportunities to build healthier habits</strong> — without interrupting your work.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      

      



      {/* ══ 5. INTRODUCING THE DESK HEALTH SYSTEM™ + 7 PILLARS ══════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-9">
            <h2 className="duc-h2 duc-section-title mb-3" style={{ fontSize: "clamp(2.1rem,5vw,3.4rem)" }}>Learn the Desk Fit Formula™</h2>
            <p style={{ fontSize: 17, fontWeight: 700, color: "#a8790d", marginBottom: 14 }}>A smarter way to become healthier while you work.</p>
            <p style={{ fontSize: 17, color: "#3f3f46", maxWidth: 640, margin: "0 auto", lineHeight: 1.65 }}>
              A practical workplace wellness framework designed for people who spend long hours at a desk. Instead of changing your whole lifestyle, it integrates <strong style={{ color: "#18181b" }}>healthier quick habits that fit naturally into your daily work schedule.</strong>
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

          {/* 7 Things Your Body Needs Every Day */}
          <div className="text-center mb-6">
            <p style={{ fontSize: "clamp(1.25rem,2.6vw,1.65rem)", fontWeight: 800, color: "#18181b", fontFamily: "'Poppins',sans-serif", letterSpacing: "-0.01em" }}>Desk Fit Formula™ Helps to Improve All 7 Things Your Body Needs Every Day</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { icon: "🪑", name: "Better Posture", tint: "#eaf3ff", ring: "#cfe2fb" },
              { icon: "👀", name: "Healthier Eyes", tint: "#f0ecff", ring: "#ddd4fb" },
              { icon: "💧", name: "Better Hydration", tint: "#e8f7fb", ring: "#c7ebf3" },
              { icon: "🚶", name: "More Movement", tint: "#eafaf0", ring: "#c9eed7" },
              { icon: "⚡", name: "All-Day Energy", tint: "#fff5e6", ring: "#f5e2bd" },
              { icon: "🧠", name: "Better Focus", tint: "#fdeef0", ring: "#f7d4da" },
              { icon: "😌", name: "Less Stress", tint: "#eefaf3", ring: "#c9edd9" },
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
              <span style={{ fontSize: 24, marginBottom: 4 }}>🎓</span>
              <p style={{ fontSize: 12.5, fontWeight: 800, color: "#fff", lineHeight: 1.3 }}>Learn How Desk Fit Formula™ Makes Them Work Together</p>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <CTA label="I Want to Learn the Desk Fit Formula™ →" sub={`Free · ${DATE_LINE}`} />
          </div>
        </div>
      </section>

      {/* ══ 6. WHAT IF YOUR WORKDAY MADE YOU HEALTHIER — pillar missions ═════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-4">
            <p className="duc-label mb-3">Imagine this…</p>
            <h2 className="duc-h2 duc-section-title">The Desk Fit Formula™ Teaches You to<br className="hidden sm:block" /> Swap Big Goals with <span style={{ color: "#a8790d" }}>Quick Healthy Habits</span></h2>
          </Reveal>
          <Reveal className="mb-11">
            <p className="text-center" style={{ fontSize: 17, color: "#3f3f46", maxWidth: 620, margin: "0 auto", lineHeight: 1.6, fontWeight: 500 }}>
              Skip the big goals hard to keep up with. Just swap each one in <strong style={{ color: "#18181b" }}>one quick habit</strong> that fits your workday 👇
            </p>
          </Reveal>

          {/* 4 pillars — image-topped cards: Instead of this… ⬇️ Try this… + tiny pointers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "⚡", pillar: "Energy", bar: "#e0a020", tint: "#fff5e6", img: "/desk/gem/swap-energy.jpg", big: "Drink more coffee", tiny: "Every time you return to your desk, take a sip of water — hydration is your fastest energy switch.", points: ["Feel less tired in the afternoon", "Stay awake during long meetings"] },
              { icon: "🚶", pillar: "Movement", bar: "#10b981", tint: "#eafaf0", img: "/desk/gem/swap-movement.jpg", big: "Walk 10,000 steps", tiny: "Walk for just 2 minutes after every meeting — that&apos;s enough to undo hours of sitting.", points: ["Less neck and back pain", "No gym needed — do it between tasks"] },
              { icon: "🥗", pillar: "Nutrition & Hydration", bar: "#3b82f6", tint: "#eaf3ff", img: "/desk/gem/swap-nutrition.jpg", big: "Drink 3 litres of water", tiny: "Before your first coffee, drink one glass of water — a healthy start with zero effort.", points: ["Snack less through the morning", "Just one glass — takes a few seconds"] },
              { icon: "🧘", pillar: "Relaxed Mind", bar: "#8b5cf6", tint: "#f4ecff", img: "/desk/gem/swap-mind.jpg", big: "Meditate for 20 minutes", tiny: "Before every video call, take three slow deep breaths — instant calm, sharper focus.", points: ["Feel calmer in a few seconds", "Focus better on your work"] },
            ].map(({ icon, pillar, bar, tint, img, big, tiny, points }, i) => (
              <Reveal key={pillar} delay={i * 80}>
                <div className="pop-card rounded-3xl overflow-hidden h-full flex flex-col" style={{ background: "#fff", border: "1.5px solid #e6d9b0", boxShadow: "0 10px 30px -14px rgba(0,0,0,0.16)" }}>
                  {/* photo */}
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={pillar} className="w-full h-44 object-cover block" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5" style={{ background: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.18)" }}>
                      <span style={{ fontSize: 15 }}>{icon}</span>
                      <span style={{ fontSize: 13.5, fontWeight: 800, color: "#18181b", fontFamily: "'Poppins',sans-serif" }}>{pillar}</span>
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    {/* Instead of this… */}
                    <div className="rounded-xl px-4 py-3" style={{ background: "#fff7f7", border: "1px solid #fde0e0" }}>
                      <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#b91c1c", marginBottom: 3 }}>Instead of this…</p>
                      <p style={{ fontSize: 15.5, fontWeight: 700, color: "#9ca3af", textDecoration: "line-through", textDecorationColor: "#f5a3a3" }}>{big}</p>
                    </div>
                    {/* arrow */}
                    <div className="flex justify-center" style={{ margin: "6px 0" }}>
                      <span className="inline-flex items-center justify-center rounded-full" style={{ width: 28, height: 28, background: bar, color: "#fff", fontSize: 15, fontWeight: 900 }}>↓</span>
                    </div>
                    {/* Try this… */}
                    <div className="rounded-xl px-4 py-3" style={{ background: `${bar}12`, border: `1px solid ${bar}44` }}>
                      <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: bar, marginBottom: 4 }}>✓ Try this…</p>
                      <p style={{ fontSize: 15.5, color: "#18181b", lineHeight: 1.5, fontWeight: 600 }} dangerouslySetInnerHTML={{ __html: tiny }} />
                    </div>
                    {/* tiny pointers */}
                    <div className="flex flex-col gap-2 mt-4 pt-4" style={{ borderTop: "1px dashed #e6d9b0" }}>
                      {points.map(pt => (
                        <div key={pt} className="flex items-start gap-2">
                          <span className="shrink-0" style={{ color: bar, fontSize: 14, fontWeight: 900, lineHeight: 1.5 }}>✓</span>
                          <span style={{ fontSize: 14, color: "#3f3f46", lineHeight: 1.5, fontWeight: 500 }}>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div className="rounded-2xl px-6 py-6 text-center mt-9" style={{ background: "linear-gradient(135deg,#171412,#18181b)" }}>
              <p style={{ fontSize: "clamp(1.05rem,2.4vw,1.35rem)", fontWeight: 900, color: "#fff", lineHeight: 1.5 }}>
                Quick healthy habits. Zero extra time. — <span style={{ color: "#e8a020" }}>done daily, starts rebuilding your health.</span>
              </p>
              <p style={{ fontSize: 13.5, color: "#a1a1aa", marginTop: 10 }}>That&apos;s the philosophy behind the <strong style={{ color: "#e8e8e8" }}>Desk Fit Formula™</strong>. (You&apos;ll get many more on the masterclass.)</p>
            </div>
          </Reveal>
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
          {/* 3 huge instant-recognition statements ("that's me" in 2-3s) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: "💻", line: "I sit most of the day.", desc: "6+ hours at a desk — and my neck, back and posture are paying for it." },
              { icon: "⏰", line: "I don't have time for the gym.", desc: "Between work and life, a separate workout just never fits my schedule." },
              { icon: "😩", line: "I feel exhausted after work.", desc: "Low energy, afternoon crashes and stress leave me drained by evening." },
            ].map(({ icon, line, desc }, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="rounded-3xl px-6 py-9 h-full flex flex-col items-center text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,160,23,0.2)" }}>
                  <span style={{ fontSize: 52, marginBottom: 16, lineHeight: 1 }}>{icon}</span>
                  <p style={{ fontSize: "clamp(1.3rem,2.5vw,1.6rem)", fontWeight: 800, color: "#fff", lineHeight: 1.25, fontFamily: "'Poppins',sans-serif", marginBottom: 12 }}>{line}</p>
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.55, fontWeight: 500 }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* if you said yes to even one */}
          <Reveal delay={120}>
            <p className="text-center mt-10" style={{ fontSize: "clamp(1.15rem,2.4vw,1.5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.4, maxWidth: 620, margin: "2.5rem auto 0", fontFamily: "'Poppins',sans-serif" }}>
              If you said &ldquo;Yes&rdquo; to even one… <span style={{ color: "#e8a020" }}>you&apos;re exactly who this masterclass was built for.</span>
            </p>
          </Reveal>

          {/* job roles chips */}
          <Reveal delay={100}>
            <p className="text-center mt-11 mb-4" style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Perfect if you&apos;re a…</p>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {["Software Engineer", "IT Professional", "Corporate Employee", "Designer", "HR Professional", "Manager", "Founder", "Finance / Accounts", "🏠 Work From Professional", "Remote Worker", "Student"].map(r => (
                <span key={r} className="rounded-full px-3.5 py-2" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,160,23,0.2)", fontSize: 13.5, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{r}</span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <p className="text-center mt-9" style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", maxWidth: 560, margin: "2rem auto 0", lineHeight: 1.6 }}>
              Or if you&apos;re someone who spends long hours on a work desk… <strong style={{ color: "#e8a020" }}>then this masterclass was made just for you.</strong>
            </p>
            <div className="flex justify-center mt-8">
              <button onClick={openRegister} className="btn-primary inline-flex items-center gap-3 rounded-full font-black text-white w-full sm:w-auto justify-center" style={{ fontSize: 22, padding: "22px 48px", border: "none", cursor: "pointer" }}>
                <TicketIcon size={22} />
                <span className="inline-flex flex-wrap items-baseline gap-1.5">Register for <PriceTag /></span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      

      



{/* ══ 5b. 3 SECRETS OF THE DESK FIT FORMULA ═══════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "linear-gradient(135deg,#141b2e 0%,#0f1626 50%,#141b2e 100%)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-11">
            <h2 className="duc-h2" style={{ color: "#fff" }}>What you&apos;ll learn in <span style={{ color: "#e8a020" }}>{WEBINAR.duration}</span></h2>
            <p style={{ fontSize: 16.5, color: "rgba(255,255,255,0.72)", maxWidth: 620, margin: "0.75rem auto 0", fontWeight: 500 }}>
              The <strong style={{ color: "#fff" }}>3 secrets</strong> of the Desk Fit Framework — the simple system busy professionals use to get healthier <em>while they work.</em>
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-9 lg:gap-12 items-start">
            {/* LEFT — Desk Fit branded image + script + CTA */}
            <Reveal>
              <div className="relative rounded-3xl overflow-hidden mb-6" style={{ border: "5px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 50px -18px rgba(0,0,0,0.6)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/desk/professional.jpg" alt="The Desk Fit Formula — healthier starts right at your desk" className="w-full h-auto block" onError={e => { (e.target as HTMLImageElement).closest('div')?.style.setProperty('display','none'); }} />
              </div>
              <div className="space-y-4" style={{ fontSize: 16.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, fontWeight: 500 }}>
                <p>This is <strong style={{ color: "#fff" }}>not</strong> another session telling you to exercise more or follow a strict diet. In just <strong style={{ color: "#fff" }}>90 minutes</strong>, you&apos;ll learn the <strong style={{ color: "#fff" }}>Desk Fit Formula™</strong> — a simple framework that fits healthy habits into your workday <strong style={{ color: "#fff" }}>without changing your busy schedule.</strong></p>
                <p>No gym. No strict diets. No extra hours.</p>
                <p><strong style={{ color: "#e8a020" }}>This one session could completely change the way you look after your health.</strong></p>
              </div>
              <div className="mt-7">
                <button onClick={openRegister} className="btn-primary inline-flex items-center gap-3 rounded-full font-black text-white w-full sm:w-auto justify-center" style={{ fontSize: 22, padding: "22px 48px", border: "none", cursor: "pointer" }}>
                  <TicketIcon size={22} />
                  <span className="inline-flex flex-wrap items-baseline justify-center gap-1.5">Register for <PriceTag /></span>
                </button>
              </div>
            </Reveal>

            {/* RIGHT — 3 secret cards */}
            <div className="flex flex-col gap-5">
              {[
                { n: "Secret 1", title: "The Trigger Trick", body: "Learn how to attach quick healthy actions to things you already do — like opening your laptop, joining a call or drinking coffee — so the habits become easier to remember and repeat." },
                { n: "Secret 2", title: "The Repair, Rebuild and Sustain Framework", body: "Discover how Desk Fit gradually improves your daily movement, mobility, strength, nutrition, energy and consistency — without overwhelming you." },
                { n: "Secret 3", title: "Build Your Seven-Day Desk Fit Starter Plan", body: "Choose the first simple actions you can integrate into your own workday immediately." },
              ].map(({ n, title, body }, i) => (
                <Reveal key={n} delay={i * 90}>
                  <div className="rounded-3xl p-6 lg:p-7 flex items-start gap-4" style={{ background: "#fff", boxShadow: "0 12px 34px -14px rgba(0,0,0,0.4)" }}>
                    <span className="shrink-0 inline-flex items-center justify-center rounded-full" style={{ width: 40, height: 40, border: "3px solid #e0592c" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4 4L19 7.5" stroke="#e0592c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <div>
                      <p style={{ fontSize: 18.5, fontWeight: 900, color: "#e0592c", marginBottom: 6, fontFamily: "'Poppins',sans-serif" }}>{n}: {title}</p>
                      <p style={{ fontSize: 16, color: "#1f2937", lineHeight: 1.6, fontWeight: 600 }}>{body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ══ 6b. FREE BONUSES ════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#fff 0%,#faf8f3 100%)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 relative">
          <Reveal className="text-center mb-3">
            <p className="duc-label mb-3">🎁 Attend live &amp; get these free</p>
            <h2 className="duc-h2 duc-section-title">Free bonuses worth <span className="gradient-text">₹9,000+</span></h2>
          </Reveal>
          <Reveal className="text-center mb-11">
            <p style={{ fontSize: 17, color: "#3f3f46", maxWidth: 580, margin: "0 auto", fontWeight: 500 }}>
              Show up live and walk away with this complete Desk Fit toolkit — the exact resources to start transforming your health from day one, <strong style={{ color: "#18181b" }}>yours 100% free.</strong>
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: "/desk/gem/bonus-guide.jpg", tag: "Bonus #1", title: "Personalized Desk Fit Health Score", worth: "₹2,500", desc: "A quick self-assessment that reveals exactly where your posture, energy and habits stand today — and the #1 thing to fix first." },
              { img: "/desk/gem/bonus-tracker.jpg", tag: "Bonus #2", title: "The 7-Day Desk Fit Challenge", worth: "₹3,000", desc: "A guided day-by-day plan with simple daily missions and reminders — so your first week of results happens on autopilot." },
              { img: "/desk/gem/bonus-cards.jpg", tag: "Bonus #3", title: "Eat-Smart Desk Snack Cheat-Sheet", worth: "₹3,500", desc: "Exactly what to eat and drink at your desk for steady all-day energy — no crashes, no cravings, no diet required." },
            ].map(({ img, tag, title, worth, desc }, i) => (
              <Reveal key={title} delay={i * 90}>
                <div className="pop-card rounded-3xl overflow-hidden h-full flex flex-col" style={{ background: "#fff", border: "1.5px solid #e6d9b0", boxShadow: "0 10px 30px -12px rgba(184,134,11,0.25)" }}>
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={title} className="w-full h-48 object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    <span className="absolute top-3 left-3 rounded-full px-3 py-1.5" style={{ background: "#18181b", color: "#e8a020", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em" }}>{tag}</span>
                    <span className="absolute top-3 right-3 rounded-full px-3 py-1.5" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)", color: "#fff", fontSize: 12.5, fontWeight: 800 }}>Worth {worth}</span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 style={{ fontSize: 19, fontWeight: 800, color: "#18181b", marginBottom: 8, fontFamily: "'Poppins',sans-serif" }}>{title}</h3>
                    <p style={{ fontSize: 15.5, color: "#3f3f46", lineHeight: 1.6, fontWeight: 500 }} dangerouslySetInnerHTML={{ __html: desc }} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* value bar */}
          <Reveal delay={100}>
            <div className="rounded-2xl mt-9 px-6 py-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center" style={{ background: "linear-gradient(135deg,#171412,#18181b)" }}>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>
                Total bonus value: <span style={{ textDecoration: "line-through", color: "#a1a1aa" }}>₹9,000</span>
              </p>
              <span className="hidden sm:inline" style={{ color: "#3f3f46" }}>|</span>
              <p style={{ fontSize: 20, fontWeight: 900, color: "#e8a020", fontFamily: "'Poppins',sans-serif" }}>Yours FREE today 🎉</p>
            </div>
            <div className="flex justify-center mt-8">
              <CTA sub="Bonuses delivered on WhatsApp after the masterclass" />
            </div>
          </Reveal>
        </div>
      </section>

      

      

      







      

      

      









      

      



      

      

      

      

      

      

      

      

      

      {/* ══ 9. WHO'S TEACHING — founder story (Rohan) ═══════════════════════ */}
      <section className="py-16 lg:py-24" style={{ background: "linear-gradient(180deg,#faf8f3 0%,#fff 100%)" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-11">
            <p className="duc-label mb-3">👋 Meet your host</p>
            <h2 className="duc-h2 duc-section-title">The story behind the Desk Fit System</h2>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-9 lg:gap-12 items-start">
            {/* Big image */}
            <Reveal className="lg:col-span-6">
              <div className="relative mx-auto" style={{ maxWidth: 520 }}>
                <div className="rounded-3xl overflow-hidden" style={{ border: "8px solid #fff", boxShadow: "0 26px 60px -18px rgba(0,0,0,0.3)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/desk/professional.jpg" alt="Rohan Mote — Healthy Lifestyle Coach, creator of the Desk Fit Formula" className="w-full h-auto object-cover object-center" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-2xl px-6 py-3 text-center whitespace-nowrap" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)", boxShadow: "0 12px 28px -8px rgba(184,134,11,0.6)" }}>
                  <p style={{ fontSize: 18, fontWeight: 900, color: "#fff", lineHeight: 1.1, fontFamily: "'Poppins',sans-serif" }}>Rohan Mote</p>
                  <p style={{ fontSize: 12.5, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>Healthy Lifestyle Coach</p>
                </div>
              </div>
              {/* certifications — credibility */}
              <div className="mt-8">
                <p className="text-center" style={{ fontSize: 11.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#a8790d", marginBottom: 10 }}>Certified &amp; Trained In</p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {[
                    "Certified Nutrition & Lifestyle Coach",
                    "Certified Corporate Wellness Specialist",
                    "Ergonomics & Posture Practitioner",
                    "Movement & Mobility Specialist",
                    "Mindfulness & Stress-Management Coach",
                  ].map(c => (
                    <span key={c} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5" style={{ background: "#fff", border: "1.5px solid #e6d9b0", fontSize: 12.5, fontWeight: 600, color: "#3f3f46" }}>
                      <span style={{ color: "#d4a017" }}>🏅</span>{c}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Story */}
            <Reveal delay={80} className="lg:col-span-6">
              <div className="space-y-4" style={{ fontSize: 16.5, color: "#3f3f46", lineHeight: 1.75 }}>
                <p>A few years ago, I was living your exact life — <strong style={{ color: "#18181b" }}>6 to 7 hours a day glued to a desk.</strong> Aching neck, stiff back, tired eyes, energy gone by evening. I tried the gym, diets, waking up early — and every one failed within weeks, because none of them fit into my actual workday.</p>
                <div className="my-5 pl-5 py-2" style={{ borderLeft: "4px solid #d4a017" }}>
                  <p style={{ fontSize: 18, fontWeight: 600, color: "#18181b", fontStyle: "italic", lineHeight: 1.6 }}>
                    Then it hit me: I was trying to fix my health <em>outside</em> the one place I spent most of my life — my desk.
                  </p>
                </div>
                <p>So I flipped it — I started building quick healthy habits <strong style={{ color: "#18181b" }}>inside</strong> my workday, triggered by things I already did. No gym. No diet. No extra time. And slowly everything changed — my posture, energy, focus and mood. I organized it all into a simple framework: <strong style={{ color: "#18181b" }}>the Desk Fit Formula™.</strong></p>
                <p style={{ fontWeight: 700, color: "#18181b" }}>In this free masterclass, I&apos;ll hand you the exact same system — so your workday starts working <em>for</em> your health, instead of against it. 🙌</p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <p style={{ fontSize: 22, color: "#a8790d", fontWeight: 900, fontFamily: "'Poppins',sans-serif" }}>— Rohan Mote</p>
                <span className="w-8 h-px" style={{ background: "#e2dfd6" }} />
                <p style={{ fontSize: 14, color: "#3f3f46" }}>Healthy Lifestyle Coach</p>
              </div>
              <div className="mt-7">
                <CTA sub={`${DATE_LINE} · ${WEBINAR.duration}`} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      

      

      {/* ══ 10. FAQ ═════════════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-9">
            <p className="duc-label mb-3">Questions &amp; answers</p>
            <h2 className="duc-h2 duc-section-title">Frequently asked questions</h2>
          </div>
          <div className="flex flex-col gap-2.5">
            {[
              { q: "Is it really free?", a: "Yes — the masterclass is 100% free. Just add your full name, email and WhatsApp number, and we'll send you the Zoom join link." },
              { q: "What is the Desk Fit Formula™?", a: "It's a practical workplace wellness framework for people who work long hours at a desk. Instead of asking you to change your whole lifestyle, it improves your health through small daily actions that fit naturally into your workday — no gym, no diet, no complicated routines, no extra hours." },
              { q: "Do I need a special desk or any equipment?", a: "Not at all. It works with the normal desk and laptop or computer you already use for work. Nothing to buy, install or set up." },
              { q: "Is this about losing weight?", a: "No. This is about becoming healthier and more energetic — better posture, less stiffness, less eye strain, more energy and less stress. Feeling and looking better follows naturally, but weight loss is not the goal." },
              { q: "When is it and how long?", a: `${WHEN_LINE}. It's live on Zoom. We'll send the exact join link and reminders to your WhatsApp after you register.` },
              { q: "Who is it for?", a: "Anyone who spends 6+ hours a day working at a screen — software and IT professionals, corporate employees, designers, HR, managers, founders, finance and accounts folks, remote workers and students. If your workday revolves around a laptop, it's for you." },
              { q: "What if I can't attend live?", a: "Register anyway. If you can't make it live, we'll send you the recording — so you don't miss the system. But attending live is best, because that's where you build your habits with us and get your questions answered." },
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
