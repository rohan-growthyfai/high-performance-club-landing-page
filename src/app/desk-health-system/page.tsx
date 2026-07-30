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
  duration: "90 minutes",
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

// ─── CTA button — "Register for ₹1,999 FREE" ─────────────────────────────
function CTA({ label, sub, big = false }: { label?: string; sub?: string; big?: boolean }) {
  const register = useRegister();
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={register}
        className="btn-primary inline-flex items-center justify-center gap-2.5 rounded-full font-black text-white"
        style={{ fontSize: big ? 20 : 18, padding: big ? "20px 40px" : "17px 34px", boxShadow: "0 10px 30px rgba(212,160,23,0.45)", letterSpacing: "-0.01em", border: "none", cursor: "pointer", lineHeight: 1.15 }}>
        <TicketIcon size={big ? 22 : 20} />
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
      <div style={{ background: "linear-gradient(90deg,#b8860b 0%,#d4a017 50%,#b8860b 100%)", padding: "9px 16px" }}>
        <p className="text-center font-black text-white flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5" style={{ fontSize: 14.5, letterSpacing: "0.005em", lineHeight: 1.3 }}>
          <span>✨ FREE Live Masterclass</span>
          <span className="opacity-70" aria-hidden="true">·</span>
          <span>🗓 {DATE_LINE}</span>
          <span className="opacity-70 hidden sm:inline" aria-hidden="true">·</span>
          <span className="hidden sm:inline rounded-full px-2.5 py-0.5" style={{ background: "rgba(0,0,0,0.18)" }}>Limited seats</span>
        </p>
      </div>

      {/* ══ 1. HERO — the problem + the free-masterclass promise ════════════════ */}
      {/* Fills exactly one screen (minus the ~40px announcement bar); the next
          section starts right when you scroll past it. */}
      <section className="relative overflow-hidden mesh-bg flex flex-col lg:min-h-[calc(100svh-48px)]" style={{ borderBottom: "1px solid #e2dfd6" }}>
        <div className="flex-1 flex items-center">
        <div className="w-full max-w-6xl mx-auto px-6 lg:px-8 pt-7 pb-8 lg:py-6 grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">

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

            <p style={{ fontSize: 16.5, color: "#3f3f46", maxWidth: 560, margin: "0 auto 18px", lineHeight: 1.6 }} className="lg:mx-0">
              Discover the <strong style={{ color: "#18181b" }}>Desk Fit Formula</strong> — a practical system to help you build a <strong style={{ color: "#18181b" }}>healthier body while you work at your desk.</strong> No gym. No strict diets. No extra hours.
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

            {/* honest trust signals */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2">
              {[
                { icon: "✅", label: "100% Free" },
                { icon: "🔴", label: "Live on Zoom" },
                { icon: "💼", label: "Designed for Busy Professionals" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  <span style={{ fontSize: 13.5, fontWeight: 600, color: "#3f3f46" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: AI split before/after image — the image itself explains the product */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative" style={{ animation: "ss-float 5s ease-in-out infinite", maxWidth: 560, width: "100%" }}>
              <div className="rounded-3xl overflow-hidden" style={{ border: "6px solid #fff", boxShadow: "0 24px 60px -18px rgba(184,134,11,0.4)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/desk/hf/split-hero.jpg" alt="Desk Life vs Desk Fit — from neck pain, low energy and stress to better posture, energy and focus" className="w-full h-auto block" onError={e => { (e.target as HTMLImageElement).closest('div')?.style.setProperty('display','none'); }} />
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

      {/* ══ 3b. SITTING IS THE NEW SMOKING — facts ══════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "linear-gradient(135deg,#1a1206 0%,#14100a 50%,#1a1206 100%)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-11">
            <p className="duc-label mb-3" style={{ color: "#e8a020" }}>The uncomfortable truth</p>
            <h2 className="duc-h2" style={{ color: "#fff" }}>Sitting is the <span style={{ color: "#e8a020" }}>new smoking</span></h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.72)", maxWidth: 640, margin: "0.75rem auto 0", fontWeight: 500 }}>
              You might not be smoking. But sitting 8+ hours is quietly doing similar damage to your health — even if you feel fine right now.
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
                { stat: "🪑 Sitting", t: "Sitting 8+ hours a day is linked to a shorter lifespan — and no evening gym session fully cancels it out." },
                { stat: "📱 Screens", t: "Staring at a screen all day quietly wrecks your posture and eyesight — most people blink 60% less, drying out and straining the eyes." },
                { stat: "🍟 Snacking", t: "Stress + a desk full of quick snacks trains you to eat mindlessly — slowly adding belly fat without a single \"big\" meal." },
                { stat: "⏰ No routine", t: "Skipped meals, late lunches and running on coffee spike your energy crashes, cravings and stress — every single workday." },
              ].map(({ stat, t }, i) => (
                <Reveal key={stat} delay={i * 70}>
                  <div className="flex items-start gap-4 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,160,23,0.22)" }}>
                    <span className="shrink-0 inline-flex items-center justify-center rounded-xl whitespace-nowrap" style={{ padding: "8px 12px", background: "linear-gradient(135deg,#b8860b,#d4a017)", color: "#171412", fontSize: 14.5, fontWeight: 800, fontFamily: "'Poppins',sans-serif", lineHeight: 1 }}>{stat}</span>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.55, fontWeight: 500 }}>{t}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={100}>
            <p className="text-center mt-10" style={{ fontSize: 17.5, fontWeight: 700, color: "#fff", maxWidth: 620, margin: "2.5rem auto 0", lineHeight: 1.55 }}>
              The good news? <span style={{ color: "#e8a020" }}>You can undo most of it in seconds a day</span> — without a gym, a diet, or any extra time. That&apos;s exactly what the masterclass shows you.
            </p>
          </Reveal>
        </div>
      </section>

{/* ══ 3. DOES THIS SOUND LIKE YOU? — image left, checklist right ═══════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-11">
            <p className="duc-label mb-3">A quick gut-check</p>
            <h2 className="duc-h2 duc-section-title">Does your typical workday feel like this?</h2>
          </Reveal>
          {/* 60% image / 40% checklist */}
          <div className="grid lg:grid-cols-5 gap-9 lg:gap-12 items-start">
            {/* LEFT — larger image (60%) */}
            <Reveal className="lg:col-span-3 lg:sticky lg:top-8">
              <div className="rounded-3xl overflow-hidden" style={{ border: "6px solid #fff", boxShadow: "0 24px 56px -18px rgba(0,0,0,0.28)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/desk/hf/does.jpg" alt="A drained professional rubbing tired eyes at their desk, an unopened water bottle beside them" className="w-full h-auto block" onError={e => { (e.target as HTMLImageElement).closest('div')?.style.setProperty('display','none'); }} />
              </div>
            </Reveal>
            {/* RIGHT — one flat checklist (40%) */}
            <div className="lg:col-span-2 flex flex-col gap-2.5">
              {[
                "Neck or back pain after work",
                "Low energy after lunch",
                "Sitting for hours without breaks",
                "Eyes feel dry or strained",
                "Feeling stiff after sitting",
                "You rarely drink enough water",
                "Exhausted after work",
                "“I never find time to exercise.”",
              ].map((t, i) => (
                <Reveal key={t} delay={i * 45}>
                  <div className="pop-card flex items-center gap-3 rounded-2xl px-4 py-3.5" style={{ background: "#fff", border: "1.5px solid #e6d9b0" }}>
                    <span className="shrink-0 inline-flex items-center justify-center rounded-md" style={{ width: 24, height: 24, border: "2px solid #d4a017", color: "#a8790d", fontSize: 13, fontWeight: 900 }}>✓</span>
                    <span style={{ fontSize: 15.5, color: "#3f3f46", lineHeight: 1.4, fontWeight: 600 }}>{t}</span>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={100}>
                <div className="rounded-2xl p-5 mt-2" style={{ background: "#18181b" }}>
                  <p style={{ fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.9)", lineHeight: 1.6 }}>
                    If any of these feel familiar, the problem isn&apos;t a lack of motivation — <span style={{ color: "#e8a020", fontWeight: 800 }}>it&apos;s that your workday is working against you.</span> In this masterclass, you&apos;ll learn how to make it work <em>for</em> your health instead.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. INTRODUCING THE DESK HEALTH SYSTEM™ + 7 PILLARS ══════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-9">
            <h2 className="duc-h2 duc-section-title mb-3">Learn the Desk Fit Formula</h2>
            <p style={{ fontSize: 17, fontWeight: 700, color: "#a8790d", marginBottom: 14 }}>A smarter way to become healthier while you work.</p>
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

          {/* 7 Things Your Body Needs Every Day */}
          <div className="text-center mb-6">
            <p className="duc-label">7 Things Your Body Needs Every Day</p>
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
              <p style={{ fontSize: 12.5, fontWeight: 800, color: "#fff", lineHeight: 1.3 }}>Learn How Desk Fit Formula Makes Them Work Together</p>
            </div>
          </div>
          <p className="text-center mt-8" style={{ fontSize: 17, color: "#18181b", fontWeight: 600, maxWidth: 620, margin: "1.5rem auto 0", lineHeight: 1.6 }}>
            And… the <strong style={{ color: "#a8790d" }}>Desk Fit Formula</strong> helps you improve all 7 of these areas of your health — without gym, diets, or extra time.
          </p>
          <div className="flex justify-center mt-8">
            <CTA label="I Want to Learn the Desk Fit Formula →" sub={`Free · ${DATE_LINE}`} />
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
              <button onClick={openRegister} className="btn-primary inline-flex items-center gap-3 rounded-full font-black text-white" style={{ fontSize: 19, padding: "18px 40px", border: "none", cursor: "pointer" }}>
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
                <img src="/desk/DeskFit.jpg" alt="The Desk Fit Formula — healthier starts right at your desk" className="w-full h-auto block" onError={e => { (e.target as HTMLImageElement).closest('div')?.style.setProperty('display','none'); }} />
              </div>
              <div className="space-y-4" style={{ fontSize: 16.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, fontWeight: 500 }}>
                <p>This is <strong style={{ color: "#fff" }}>not</strong> another session telling you to exercise more or follow a strict diet. In just <strong style={{ color: "#fff" }}>90 minutes</strong>, you&apos;ll learn the <strong style={{ color: "#fff" }}>Desk Fit Formula</strong> — a simple framework that fits healthy habits into your workday <strong style={{ color: "#fff" }}>without changing your busy schedule.</strong></p>
                <p>No gym. No strict diets. No extra hours.</p>
                <p><strong style={{ color: "#e8a020" }}>This one session could completely change the way you look after your health.</strong></p>
              </div>
              <div className="mt-7">
                <button onClick={openRegister} className="btn-primary inline-flex items-center gap-3 rounded-full font-black text-white w-full sm:w-auto justify-center" style={{ fontSize: 19, padding: "18px 40px", border: "none", cursor: "pointer" }}>
                  <TicketIcon size={22} />
                  <span className="inline-flex flex-wrap items-baseline justify-center gap-1.5">Register for <PriceTag /></span>
                </button>
              </div>
            </Reveal>

            {/* RIGHT — 3 secret cards */}
            <div className="flex flex-col gap-5">
              {[
                { n: "Secret 1", title: "The Trigger Trick", body: "Learn how to attach tiny healthy actions to things you already do — like opening your laptop, joining a call or drinking coffee — so the habits become easier to remember and repeat." },
                { n: "Secret 2", title: "The 7-Pillar Framework", body: "Discover the 7 areas that shape how you feel at work — posture, eye health, hydration, movement, energy, focus and stress — and simple actions that can improve each one." },
                { n: "Secret 3", title: "The 1% Formula", body: "Learn why small actions are easier to maintain than big plans — and leave with a simple 7-day starter plan you can begin from your very next workday." },
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

      

      







      {/* ══ 5c. WHAT THIS IS / IS NOT ═══════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-10">
            <p className="duc-label mb-3">Before you decide…</p>
            <h2 className="duc-h2 duc-section-title">Here&apos;s exactly what you&apos;re <span className="gradient-text">(and aren&apos;t)</span> signing up for</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* IS NOT */}
            <Reveal>
              <div className="rounded-3xl overflow-hidden h-full" style={{ border: "2px solid #fecaca", background: "#fff7f7" }}>
                <div className="px-6 py-4 flex items-center gap-2.5" style={{ background: "#fee2e2", borderBottom: "2px solid #fecaca" }}>
                  <span style={{ fontSize: 22 }}>🚫</span>
                  <span style={{ fontSize: 16.5, fontWeight: 900, color: "#991b1b", fontFamily: "'Poppins',sans-serif" }}>It&apos;s NOT this</span>
                </div>
                <div className="p-6 flex flex-col gap-3">
                  {[
                    "Not a 6 AM bootcamp or sweaty workout",
                    "Not a strict diet you have to follow",
                    "Not one more thing to squeeze in after work",
                    "Not boring theory or complicated science",
                    "Not a gym or any equipment to buy",
                  ].map(t => (
                    <div key={t} className="flex items-start gap-2.5"><span style={{ color: "#dc2626", fontSize: 16, fontWeight: 900, marginTop: -1 }}>✕</span><span style={{ fontSize: 16, color: "#3f3f46", lineHeight: 1.5, fontWeight: 500 }}>{t}</span></div>
                  ))}
                </div>
              </div>
            </Reveal>
            {/* IS */}
            <Reveal delay={90}>
              <div className="rounded-3xl overflow-hidden h-full" style={{ border: "2px solid #bbf7d0", background: "#f0fdf4", boxShadow: "0 14px 36px -16px rgba(5,150,105,0.4)" }}>
                <div className="px-6 py-4 flex items-center gap-2.5" style={{ background: "#dcfce7", borderBottom: "2px solid #bbf7d0" }}>
                  <span style={{ fontSize: 22 }}>✅</span>
                  <span style={{ fontSize: 16.5, fontWeight: 900, color: "#166534", fontFamily: "'Poppins',sans-serif" }}>It IS this</span>
                </div>
                <div className="p-6 flex flex-col gap-3">
                  {[
                    "A simple framework you can use today",
                    "Tiny 30-second habits you do at your desk",
                    "Health that fits inside your normal workday",
                    "Zero extra time — no gym, no diet, no fuss",
                    "A 7-day plan you start the very next morning",
                  ].map(t => (
                    <div key={t} className="flex items-start gap-2.5"><span style={{ color: "#059669", fontSize: 16, fontWeight: 900, marginTop: -1 }}>✓</span><span style={{ fontSize: 16, color: "#18181b", fontWeight: 600, lineHeight: 1.5 }}>{t}</span></div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 5d. THE 4 PILLARS OF HEALTHY LIVING ═════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "linear-gradient(180deg,#faf8f3 0%,#fff 100%)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-4">
            <p className="duc-label mb-3">The foundation of a healthy body</p>
            <h2 className="duc-h2 duc-section-title">A healthy life stands on <span className="gradient-text">4 pillars</span></h2>
          </Reveal>
          <Reveal className="mb-8">
            <p className="text-center" style={{ fontSize: 17, color: "#3f3f46", maxWidth: 600, margin: "0 auto", fontWeight: 500, lineHeight: 1.6 }}>
              Get these four right, and your body simply <em>works</em> better — more energy, less pain, a calmer mind.
            </p>
          </Reveal>

          {/* AI 4-pillars infographic */}
          <Reveal className="mb-10">
            <div className="mx-auto rounded-3xl overflow-hidden" style={{ maxWidth: 720, border: "6px solid #fff", boxShadow: "0 20px 50px -18px rgba(0,0,0,0.18)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/desk/hf/pillars.jpg" alt="The 4 pillars of a healthy body for a desk worker — Energy, Movement, Nutrition & Hydration, Relaxed Mind" className="w-full h-auto block" onError={e => { (e.target as HTMLImageElement).closest('div')?.style.setProperty('display','none'); }} />
            </div>
          </Reveal>

          {/* the 4 pillars — visual cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {[
              { icon: "⚡", name: "Energy", sub: "Feel awake &amp; alert all day", tint: "#fff5e6", ring: "#f5d98a", bar: "#e0a020" },
              { icon: "🚶", name: "Movement", sub: "Keep your body loose &amp; strong", tint: "#eafaf0", ring: "#a7e5c1", bar: "#10b981" },
              { icon: "🥗", name: "Nutrition &amp; Hydration", sub: "Fuel &amp; water your body right", tint: "#eaf3ff", ring: "#b9d6fb", bar: "#3b82f6" },
              { icon: "🧘", name: "Relaxed Mind", sub: "Stay calm, focused &amp; clear", tint: "#f4ecff", ring: "#d8c4fb", bar: "#8b5cf6" },
            ].map(({ icon, name, sub, tint, ring, bar }, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="pop-card rounded-3xl overflow-hidden h-full text-center" style={{ background: "#fff", border: "1.5px solid #e6d9b0", boxShadow: "0 8px 26px -12px rgba(0,0,0,0.12)" }}>
                  <div style={{ height: 6, background: bar }} />
                  <div className="p-5 lg:p-6 flex flex-col items-center">
                    <span className="inline-flex items-center justify-center rounded-2xl mb-3" style={{ width: 64, height: 64, background: tint, border: `1.5px solid ${ring}`, fontSize: 32 }}>{icon}</span>
                    <p style={{ fontSize: 16.5, fontWeight: 800, color: "#18181b", lineHeight: 1.2, fontFamily: "'Poppins',sans-serif" }} dangerouslySetInnerHTML={{ __html: name }} />
                    <p style={{ fontSize: 13.5, color: "#71717a", marginTop: 5, lineHeight: 1.4 }} dangerouslySetInnerHTML={{ __html: sub }} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* the problem → the fix */}
          <div className="grid md:grid-cols-2 gap-5 mt-8">
            <Reveal>
              <div className="rounded-3xl p-6 lg:p-7 h-full" style={{ background: "#fff7f7", border: "2px solid #fecaca" }}>
                <p className="flex items-center gap-2 mb-2" style={{ fontSize: 16.5, fontWeight: 900, color: "#991b1b", fontFamily: "'Poppins',sans-serif" }}><span style={{ fontSize: 20 }}>😔</span> The problem</p>
                <p style={{ fontSize: 16, color: "#3f3f46", lineHeight: 1.6, fontWeight: 500 }}>Your busy workday quietly knocks out <strong style={{ color: "#18181b" }}>all four pillars</strong> — you sit still for hours, skip water, grab whatever&apos;s quick, and run on stress. No wonder you feel drained.</p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="rounded-3xl p-6 lg:p-7 h-full" style={{ background: "#f0fdf4", border: "2px solid #bbf7d0", boxShadow: "0 14px 36px -16px rgba(5,150,105,0.4)" }}>
                <p className="flex items-center gap-2 mb-2" style={{ fontSize: 16.5, fontWeight: 900, color: "#166534", fontFamily: "'Poppins',sans-serif" }}><span style={{ fontSize: 20 }}>✅</span> The Desk Fit Formula fix</p>
                <p style={{ fontSize: 16, color: "#18181b", lineHeight: 1.6, fontWeight: 600 }}>It weaves all four pillars <strong>directly into your workday</strong> — with tiny habits you barely notice. No finding extra time. Your work itself keeps you healthy.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 6. WHAT IF YOUR WORKDAY MADE YOU HEALTHIER — pillar missions ═════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-4">
            <p className="duc-label mb-3">Imagine this…</p>
            <h2 className="duc-h2 duc-section-title">What if your workday actually<br className="hidden sm:block" /> made you <span style={{ color: "#a8790d" }}>healthier?</span></h2>
          </Reveal>
          <Reveal className="mb-11">
            <p className="text-center" style={{ fontSize: 17, color: "#3f3f46", maxWidth: 620, margin: "0 auto", lineHeight: 1.6, fontWeight: 500 }}>
              Skip the big goals you never keep. For each pillar, just swap in <strong style={{ color: "#18181b" }}>one tiny habit</strong> that fits your workday 👇
            </p>
          </Reveal>

          {/* 4 pillars — Instead of this… (typical advice) ⬇️ Try this… (tiny habit) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { icon: "⚡", pillar: "Energy", bar: "#e0a020", tint: "#fff5e6", big: "Drink more coffee", tiny: "Every time you return to your desk, take a sip of water — hydration is your fastest energy switch." },
              { icon: "🚶", pillar: "Movement", bar: "#10b981", tint: "#eafaf0", big: "Walk 10,000 steps", tiny: "Walk for just 2 minutes after every meeting — that&apos;s enough to undo hours of sitting." },
              { icon: "🥗", pillar: "Nutrition & Hydration", bar: "#3b82f6", tint: "#eaf3ff", big: "Drink 3 litres of water", tiny: "Before your first coffee, drink one glass of water — a healthy start with zero effort." },
              { icon: "🧘", pillar: "Relaxed Mind", bar: "#8b5cf6", tint: "#f4ecff", big: "Meditate for 20 minutes", tiny: "Before every video call, take three slow deep breaths — instant calm, sharper focus." },
            ].map(({ icon, pillar, bar, tint, big, tiny }, i) => (
              <Reveal key={pillar} delay={i * 80}>
                <div className="pop-card rounded-3xl overflow-hidden h-full flex flex-col" style={{ background: "#fff", border: "1.5px solid #e6d9b0", boxShadow: "0 8px 26px -14px rgba(0,0,0,0.12)" }}>
                  <div className="flex items-center gap-3 px-5 py-4" style={{ background: tint, borderBottom: `1px solid ${bar}33` }}>
                    <span className="inline-flex items-center justify-center rounded-xl shrink-0" style={{ width: 44, height: 44, background: "#fff", fontSize: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>{icon}</span>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: bar }}>Pillar</p>
                      <p style={{ fontSize: 17, fontWeight: 800, color: "#18181b", lineHeight: 1.1, fontFamily: "'Poppins',sans-serif" }}>{pillar}</p>
                    </div>
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
                    <div className="rounded-xl px-4 py-3 mt-auto" style={{ background: `${bar}12`, border: `1px solid ${bar}44` }}>
                      <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: bar, marginBottom: 4 }}>✓ Try this…</p>
                      <p style={{ fontSize: 15.5, color: "#18181b", lineHeight: 1.5, fontWeight: 600 }} dangerouslySetInnerHTML={{ __html: tiny }} />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div className="rounded-2xl px-6 py-6 text-center mt-9" style={{ background: "linear-gradient(135deg,#171412,#18181b)" }}>
              <p style={{ fontSize: "clamp(1.05rem,2.4vw,1.35rem)", fontWeight: 900, color: "#fff", lineHeight: 1.5 }}>
                Four tiny habits. Zero extra time. — <span style={{ color: "#e8a020" }}>done daily, they quietly rebuild your health.</span>
              </p>
              <p style={{ fontSize: 13.5, color: "#a1a1aa", marginTop: 10 }}>That&apos;s the philosophy behind the Desk Fit Formula. (You&apos;ll get many more on the masterclass.)</p>
            </div>
          </Reveal>
        </div>
      </section>



{/* ══ 6b. FREE BONUSES ════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#fff 0%,#faf8f3 100%)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 relative">
          <Reveal className="text-center mb-3">
            <p className="duc-label mb-3">🎁 Attend live &amp; get these free</p>
            <h2 className="duc-h2 duc-section-title">Free bonuses worth <span className="gradient-text">₹4,500+</span></h2>
          </Reveal>
          <Reveal className="text-center mb-11">
            <p style={{ fontSize: 17, color: "#3f3f46", maxWidth: 560, margin: "0 auto", fontWeight: 500 }}>
              Show up live on the masterclass and you&apos;ll walk away with this complete Desk Fit starter kit — <strong style={{ color: "#18181b" }}>yours free.</strong>
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: "/desk/gem/bonus-guide.jpg", tag: "Bonus #1", title: "The Desk Fit Playbook", worth: "₹1,500", desc: "A simple guide with the exact tiny habits for all 7 pillars — so you know precisely what to do at your desk each day." },
              { img: "/desk/gem/bonus-tracker.jpg", tag: "Bonus #2", title: "7-Day Habit Tracker", worth: "₹1,000", desc: "A printable tracker to lock in your new desk habits in your first week — the fastest way to actually stay consistent." },
              { img: "/desk/gem/bonus-cards.jpg", tag: "Bonus #3", title: "Desk Reminder Cards", worth: "₹2,000", desc: "Quick posture, eye-care &amp; stretch cheat-cards you keep at your desk — gentle nudges that turn healthy actions into habit." },
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
                Total bonus value: <span style={{ textDecoration: "line-through", color: "#a1a1aa" }}>₹4,500</span>
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
            <h2 className="duc-h2 duc-section-title">The story behind the Desk Fit Formula</h2>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-9 lg:gap-12 items-start">
            {/* Big image */}
            <Reveal className="lg:col-span-5">
              <div className="relative mx-auto" style={{ maxWidth: 440 }}>
                <div className="rounded-3xl overflow-hidden" style={{ border: "8px solid #fff", boxShadow: "0 26px 60px -18px rgba(0,0,0,0.3)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/desk/DeskFit.jpg" alt="Rohan — creator of the Desk Fit Formula" className="w-full h-auto object-cover object-center" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
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
                <p>I organized everything I learned into a simple framework — <strong style={{ color: "#18181b" }}>the Desk Fit Formula</strong> — 7 pillars and a set of tiny daily &ldquo;desk missions&rdquo; that fit into any workday. It changed how I feel at my desk, and I built this masterclass to hand it to <strong style={{ color: "#18181b" }}>busy professionals like you</strong>.</p>
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

      

      {/* ══ 9c. STILL THINKING? — BENEFITS OF ATTENDING ═════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-11">
            <p style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.14em", color: "#e0592c", marginBottom: 8 }}>Still thinking?</p>
            <h2 className="duc-h2 duc-section-title">Benefits of attending this masterclass</h2>
          </Reveal>
          <div className="flex flex-col gap-7">
            {[
              { t: "Feel better by the end of the very first day.", d: "You'll learn the exact tiny habits that ease neck, back and eye strain — small resets you can do at your desk from tomorrow. Relief leads to momentum, and momentum keeps you going." },
              { t: "Get healthy without adding a single extra hour.", d: "No gym, no diets, no separate program to juggle. You'll discover how to fit health into the 6–8 hours you already spend working — so it actually sticks." },
              { t: "Beat the afternoon energy crash for good.", d: "You'll learn simple habits that keep your energy steady all day — so you stop reaching for a third coffee and stay sharp right through to evening." },
              { t: "Fix your posture and protect your body.", d: "Understand what long sitting is quietly doing to your spine, shoulders and eyes — and the effortless corrections that prevent it, without a physio or gadgets." },
              { t: "Turn healthy actions into automatic habits.", d: "You'll get the Trigger Method — a simple way to attach tiny healthy actions to things you already do, so they happen on autopilot without willpower." },
              { t: "Walk away with a done-for-you 7-day plan.", d: "No guesswork. You'll leave knowing exactly what to do each day for a week to start reversing the damage — plus how to restart if you slip." },
              { t: "Build a healthier lifestyle that lasts.", d: "This isn't a quick fix. It's a simple, repeatable system that keeps improving your health year after year — while you keep doing the work you love." },
            ].map(({ t, d }, i) => (
              <Reveal key={t} delay={i * 55}>
                <div className="flex items-start gap-4">
                  <span className="shrink-0 inline-flex items-center justify-center rounded-lg font-black" style={{ width: 30, height: 30, background: "rgba(212,160,23,0.14)", color: "#a8790d", fontSize: 15, fontFamily: "'Poppins',sans-serif" }}>{i + 1}</span>
                  <div>
                    <p style={{ fontSize: 18, fontWeight: 800, color: "#18181b", marginBottom: 4, fontFamily: "'Poppins',sans-serif" }}>{t}</p>
                    <p style={{ fontSize: 16, color: "#3f3f46", lineHeight: 1.65, fontWeight: 500 }}>{d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="flex justify-center mt-11">
            <CTA big sub={`${DATE_LINE} · ${WEBINAR.duration}`} />
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
              { q: "What is the Desk Fit Formula?", a: "It's a practical workplace wellness framework for people who work long hours at a desk. Instead of asking you to change your whole lifestyle, it improves your health through small daily actions that fit naturally into your workday — no gym, no diet, no complicated routines, no extra hours." },
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
