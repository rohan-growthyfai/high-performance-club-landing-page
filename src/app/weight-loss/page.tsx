"use client";
import { useState, useEffect, useRef } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// ─── Buy action ───────────────────────────────────────────────────────────────
const PAYMENT_LINK = "https://rzp.io/rzp/2fsOU9dz";
function buy() {
  if (typeof window !== "undefined" && typeof window.fbq === "function")
    window.fbq("track", "InitiateCheckout", { value: 199, currency: "INR", content_name: "Slim & Strong Ebook" });
  if (typeof window !== "undefined") window.open(PAYMENT_LINK, "_blank");
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function DownloadIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="rgba(255,255,255,0.18)" />
      <path d="M12 6v8m0 0 3.2-3.2M12 14l-3.2-3.2M7 17h10" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={buy}
        className="btn-primary inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-black text-white"
        style={{ fontSize: 18, boxShadow: "0 8px 28px rgba(212,160,23,0.42)", letterSpacing: "-0.01em", border: "none", cursor: "pointer" }}>
        <DownloadIcon size={20} />{label}
      </button>
      {sub && <p style={{ fontSize: 13, color: "#71717a", textAlign: "center" }}>{sub}</p>}
    </div>
  );
}

// ─── Themed glow wrapper (reused for the inside-page previews) ─────────────────
function PhoneGlow({ children, from, to, accent }: {
  children: React.ReactNode;
  from: string;
  to: string;
  accent: string;
}) {
  return (
    <div
      className="relative w-full flex justify-center px-5 pt-9 pb-7"
      style={{
        borderRadius: 40,
        background: `linear-gradient(160deg, ${from} 0%, ${to} 100%)`,
        boxShadow: `0 24px 60px -18px ${accent}, inset 0 1px 0 rgba(255,255,255,0.25)`,
        overflow: "hidden",
      }}
    >
      {/* Soft radial glow highlights for a premium, dimensional feel */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 80% at 50% -10%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 55%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: "-20%", bottom: "-25%", width: "70%", height: "60%", background: `radial-gradient(circle, ${accent} 0%, rgba(255,255,255,0) 70%)`, filter: "blur(24px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: "-15%", top: "-10%", width: "55%", height: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 70%)", filter: "blur(20px)", pointerEvents: "none" }} />
      <div className="relative">{children}</div>
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

// ─── Overlays ─────────────────────────────────────────────────────────────────
function StickyBottomCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const f = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", f, { passive: true }); f();
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div className={`fixed bottom-0 inset-x-0 z-50 transition-all duration-300 ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}>
      <div className="px-4 pb-3 pt-2 md:hidden" style={{ background: "linear-gradient(to top,#faf8f3 70%,transparent)", backdropFilter: "blur(8px)" }}>
        <button onClick={buy} className="w-full flex items-center justify-between gap-3 rounded-2xl px-5 py-3" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)", boxShadow: "0 4px 20px rgba(212,160,23,0.4)", border: "none", cursor: "pointer" }}>
          <div className="text-left"><p className="text-white font-black text-sm leading-tight">Get the Guide — ₹199 →</p><p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.8)" }}>One-time · Instant E-Book · 7-day guarantee</p></div>
          <div className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}><DownloadIcon size={15} /><span className="text-white font-bold text-sm">Get It</span></div>
        </button>
      </div>
      <div className="hidden md:block px-6 pb-4 pt-3" style={{ background: "linear-gradient(to top,#faf8f3 70%,transparent)", backdropFilter: "blur(8px)" }}>
        <div className="max-w-lg mx-auto">
          <button onClick={buy} className="w-full flex items-center justify-between gap-4 rounded-2xl px-6 py-3.5" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)", boxShadow: "0 4px 20px rgba(212,160,23,0.4)", border: "none", cursor: "pointer" }}>
            <div className="text-left"><p className="text-white font-black text-sm leading-tight">Get Instant Access — ₹199 →</p><p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.8)" }}>One-time ₹199 · Instant E-Book download · 7-day money-back guarantee</p></div>
            <div className="flex items-center gap-2 rounded-xl px-4 py-2 shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}><DownloadIcon size={16} /><span className="text-white font-bold text-sm">Get It</span></div>
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
              <p className="leading-snug mt-0.5" style={{ fontSize: 10, color: "#71717a" }}>bought Slim &amp; Strong · {t.time}</p>
            </div>
            <span className="relative flex w-2 h-2 shrink-0"><span className="absolute inline-flex w-full h-full rounded-full animate-ping opacity-75" style={{ background: "#d4a017" }} /><span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: "#d4a017" }} /></span>
          </div>
        </div>
      ))}
    </div>
  );
}

function TrialPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const shown = useRef(false);
  useEffect(() => {
    const t = setTimeout(() => {
      if (shown.current) return;
      try { if (localStorage.getItem("ss_pop") === "1") return; } catch { /**/ }
      shown.current = true; setVisible(true);
    }, 15000);
    return () => clearTimeout(t);
  }, []);
  const dismiss = () => { setVisible(false); setDismissed(true); try { localStorage.setItem("ss_pop", "1"); } catch { /**/ } };
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
            <p className="text-3xl mb-2">📗</p>
            <h2 className="text-white font-black leading-snug" style={{ fontSize: 18 }}>Your weight-loss guide is waiting</h2>
          </div>
          <div className="px-6 py-5 text-center">
            <p style={{ fontSize: 14, color: "#3f3f46", lineHeight: 1.7, marginBottom: 16 }}>
              Get <strong style={{ color: "#18181b" }}>Slim &amp; Strong</strong> — the complete 90-Day Weight Loss Guide — for a one-time <strong style={{ color: "#18181b" }}>₹199</strong>. All 90 habits, meal plans and no-gym workouts inside. Download the E-Book instantly.
            </p>
            <div className="flex flex-col gap-2 mb-5 text-left">
              {["Instant E-Book download", "Lifetime access — read anytime", "7-day money-back guarantee"].map(t => (
                <div key={t} className="flex items-center gap-2" style={{ fontSize: 13, color: "#4a4a52" }}>
                  <span style={{ color: "#a8790d", fontWeight: 700 }}>✅</span>{t}
                </div>
              ))}
            </div>
            <button onClick={() => { buy(); dismiss(); }} className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full font-black text-white btn-primary" style={{ fontSize: 16, boxShadow: "0 6px 20px rgba(212,160,23,0.4)", border: "none", cursor: "pointer" }}>
              <DownloadIcon size={18} />Get the Guide — ₹199 →
            </button>
            <p style={{ fontSize: 12, color: "#a1a1aa", marginTop: 8 }}>One-time ₹199 · Instant E-Book · 7-day money-back guarantee</p>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── TinyGainsDUC (fat-loss compounding) ─────────────────────────────────────
const VW = 720, VH = 460, X0 = 90, Y0 = 360, XEND = 660, TOP = 40;
const BETTER_PATH = `M ${X0} ${Y0} C ${X0 + 240} ${Y0 - 8}, ${XEND - 140} ${Y0 - 70}, ${XEND} ${TOP}`;

function TinyGainsDUC() {
  const [shown, setShown] = useState(false);
  const [count, setCount] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setShown(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!shown) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setCount(37); return; }
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setCount(1 + (1 - Math.pow(1 - p, 3)) * 36);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown]);

  return (
    <section ref={ref} style={{ background: "#fff", borderTop: "1px solid #e4e4e7" }} className="py-16 lg:py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-10 lg:mb-12">
          <p className="duc-label mb-3" style={{ color: "#a8790d" }}>The power of tiny fat-loss habits</p>
          <h2 className="duc-h2 mb-4" style={{ color: "#18181b" }}>
            Lose just <span style={{ color: "#a8790d" }}>1% more</span> fat every week…
          </h2>
          <p className="duc-body max-w-2xl mx-auto" style={{ color: "#52525b" }}>
            One small fat-loss habit feels like nothing on Day 1. But small wins compound. Follow the 90-day plan and the math is shocking — you can become a{" "}
            <strong style={{ color: "#18181b" }}>37× fitter version of yourself</strong> in just 1 year!
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 mb-10">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl text-center" style={{ background: "rgba(212,160,23,0.08)", border: "1.5px solid rgba(212,160,23,0.3)" }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#18181b" }}>
              Research shows: 1% better every day ={" "}
              <span style={{ color: "#a8790d" }}>37× fitter version of yourself in just 1 year</span> 🚀
            </span>
          </div>
          <p style={{ fontSize: 12.5, color: "#71717a", fontWeight: 500 }}>
            — popularized in <em>Atomic Habits</em> (James Clear) &amp; backed by Stanford&apos;s BJ Fogg Behavior Lab
          </p>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" style={{ overflow: "visible" }}>
            <line x1={X0} y1={TOP - 10} x2={X0} y2={Y0 + 60} stroke="#cbd5e1" strokeWidth={2.5} strokeLinecap="round" />
            <line x1={X0} y1={Y0 + 60} x2={XEND + 20} y2={Y0 + 60} stroke="#cbd5e1" strokeWidth={2.5} strokeLinecap="round" />
            <text x={X0 - 14} y={(TOP + Y0) / 2} textAnchor="middle" fontSize={15} fill="#64748b" transform={`rotate(-90 ${X0 - 56} ${(TOP + Y0) / 2})`}>Results</text>
            <text x={X0 - 16} y={Y0 + 5} textAnchor="end" fontSize={16} fontWeight={700} fill="#475569">1</text>
            <text x={X0} y={Y0 + 84} textAnchor="middle" fontSize={14} fill="#64748b">Today</text>
            <text x={XEND} y={Y0 + 84} textAnchor="middle" fontSize={14} fontWeight={700} fill="#475569">1 Year</text>
            <line x1={X0} y1={Y0} x2={XEND} y2={Y0} stroke="#94a3b8" strokeWidth={2.5} strokeDasharray="8 8" style={{ opacity: shown ? 1 : 0, transition: "opacity 0.6s 0.3s" }} />
            <text x={XEND - 4} y={Y0 - 12} textAnchor="end" fontSize={13} fill="#94a3b8" style={{ opacity: shown ? 1 : 0, transition: "opacity 0.6s 0.6s" }}>No change — stay the same</text>
            <path d={BETTER_PATH} fill="none" stroke="#d4a017" strokeWidth={4.5} strokeLinecap="round" pathLength={1}
              style={{ strokeDasharray: 1, strokeDashoffset: shown ? 0 : 1, transition: "stroke-dashoffset 1.8s ease 0.3s" }} />
            <g style={{ opacity: shown ? 1 : 0, transition: "opacity 0.5s 1.7s" }}>
              <rect x={XEND - 220} y={TOP + 4} width={120} height={46} rx={12} fill="#d4a017" />
              <text x={XEND - 160} y={TOP + 33} textAnchor="middle" fontSize={24} fontWeight={900} fill="#fff">{Math.round(count)}× 🚀</text>
            </g>
            <g style={{ opacity: shown ? 1 : 0, transition: "opacity 0.6s 0.2s" }}>
              <image href="/value/before.png" x={X0 - 42} y={Y0 - 8} width={84} height={84} preserveAspectRatio="xMidYMid meet" />
            </g>
            <g style={{ opacity: shown ? 1 : 0, transition: "opacity 0.6s 1.9s" }}>
              <image href="/value/after.png" x={XEND - 30} y={TOP - 36} width={96} height={96} preserveAspectRatio="xMidYMid meet" />
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
            If you do nothing, nothing changes.
          </p>
          <p style={{ fontSize: 16, color: "#52525b", maxWidth: 560, margin: "0 auto 32px", lineHeight: 1.7 }}>
            Slim &amp; Strong gives you your 1% — 90 tiny fat-loss habits, meal plans and no-gym workouts, all in one guide. The small wins do the rest.
          </p>
          <CTA label="Get the Guide — ₹199 →" sub="One-time ₹199 · Instant E-Book download · 7-day money-back guarantee" />
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
        content_name: "Slim & Strong Ebook",
        content_category: "Weight Loss Ebook",
        value: 199,
        currency: "INR",
      });
    }
  }, []);
}

// ─── Merged content data (re-skinned from /lose-weight) ──────────────────────
const TRACKS = [
  { month: 1, icon: "🥗", title: "Eating Habits", subtitle: "Transform HOW and WHEN you eat — without a diet", color: "#b8860b", colorLight: "rgba(184,134,11,0.08)", colorBorder: "rgba(184,134,11,0.2)", days: "Days 1–30",
    habits: ["Drink 500ml water before checking your phone", "Eat protein before touching rice or roti", "One screen-free meal per day", "Pre-meal water 15 min before lunch", "Replace 3 PM chai with green tea", "Kitchen curfew 90 min before sleep"],
    outcome: "Better blood sugar, fewer cravings, automatic portion control" },
  { month: 2, icon: "🏃", title: "Movement & Activity", subtitle: "Add real calorie burn — without a gym membership", color: "#f97316", colorLight: "rgba(249,115,22,0.08)", colorBorder: "rgba(249,115,22,0.2)", days: "Days 31–60",
    habits: ["Stand up for 60 seconds every hour", "Take the stairs for one floor daily", "2-minute walk after every meal", "Walk during every phone call", "10 desk squats before each meeting", "Park one lane farther every time"],
    outcome: "300–500 extra calories burned daily through NEAT — no gym needed" },
  { month: 3, icon: "🌙", title: "Sleep & Recovery", subtitle: "Fix your sleep, fix your hunger hormones", color: "#6366f1", colorLight: "rgba(99,102,241,0.08)", colorBorder: "rgba(99,102,241,0.2)", days: "Days 61–90",
    habits: ["Screens off 30 minutes before sleep", "Consistent sleep and wake time daily", "5-minute pre-sleep breathing ritual", "Morning sunlight within 10 min of waking", "Coffee only after 9:30 AM", "Cold water face wash on waking"],
    outcome: "Lower cortisol, balanced hunger hormones, faster fat burn overnight" },
];

const SAMPLE_HABITS = [
  { area: "🥗 Healthy Eating", color: "#b8860b", colorLight: "rgba(184,134,11,0.08)", colorBorder: "rgba(184,134,11,0.25)", emoji: "🍽️",
    habits: [
      { day: "Day 1", title: "The 500ml Morning Reset", desc: "Keep a 500ml bottle on your bedside. Before you check your phone — drink it. Takes 90 seconds.", why: "Dehydration causes false hunger. 500ml before your phone gives 45 min of real appetite clarity.", image: "🚰" },
      { day: "Day 5", title: "Protein-First Plate Rule", desc: "Eat your protein — dal, paneer, chicken, curd — before touching rice or roti. Every meal.", why: "Reduces post-meal glucose spikes by 29% and insulin spikes by 37%. Same meal, better outcome.", image: "🥚" },
      { day: "Day 12", title: "Kitchen Curfew", desc: "Stop eating 90 minutes before sleep. Brush your teeth as the signal. Non-negotiable.", why: "Late eating elevates cortisol and insulin during sleep — both actively block fat burning overnight.", image: "🌙" },
    ] },
  { area: "🏃 Movement", color: "#f97316", colorLight: "rgba(249,115,22,0.08)", colorBorder: "rgba(249,115,22,0.25)", emoji: "⚡",
    habits: [
      { day: "Day 31", title: "The Hourly 60-Second Stand", desc: "Set an alarm every 60 minutes. When it fires — stand, walk to the window, come back. Done.", why: "Sitting 60+ min drops fat-burning enzyme LPL by 90%. Standing briefly reactivates it all day.", image: "🪑" },
      { day: "Day 35", title: "2-Minute Post-Meal Walk", desc: "The moment you finish eating — stand up and walk slowly for 2 minutes. Anywhere.", why: "Activates GLUT4 in muscles, reducing blood glucose spikes by up to 30% with zero insulin needed.", image: "🚶" },
      { day: "Day 42", title: "Walking Phone Calls", desc: "Any call over 3 minutes — take it standing or walking. Put a sticky note on your monitor.", why: "Adds 500–1500 steps daily to NEAT without any 'workout' — burns an extra 50–100 kcal/day passively.", image: "📱" },
    ] },
  { area: "🌙 Sleep", color: "#6366f1", colorLight: "rgba(99,102,241,0.08)", colorBorder: "rgba(99,102,241,0.25)", emoji: "😴",
    habits: [
      { day: "Day 61", title: "The Screen-Off Ritual", desc: "Set a phone reminder 30 minutes before your target sleep time. When it fires — screens off.", why: "Blue light suppresses melatonin. Poor sleep raises ghrelin by 24%, adding 300+ extra calories next day.", image: "📵" },
      { day: "Day 65", title: "Morning Light Anchor", desc: "Within 10 minutes of waking — step outside or stand by a window for 2 minutes of natural light.", why: "Sets your circadian clock, peaks cortisol at the right time, and improves melatonin production that night.", image: "☀️" },
      { day: "Day 70", title: "Coffee After 9:30 AM", desc: "Hold your first coffee until 90 minutes after waking. Water or chai first, coffee second.", why: "Cortisol is naturally highest in the first 90 min after waking — caffeine on top spikes anxiety and crashes energy.", image: "☕" },
    ] },
];

const SCIENCE = [
  { logo: "📖", name: "BJ Fogg, PhD — Stanford", title: "Tiny Habits: The Small Changes That Change Everything", quote: "The most effective behaviour change happens through small, specific actions anchored to existing routines — not through motivation or willpower.", color: "#b8860b", tag: "Behaviour Science" },
  { logo: "🏛️", name: "Harvard Medical School", title: "Journal of Clinical Endocrinology", quote: "Short bouts of movement after meals significantly improve insulin sensitivity and reduce post-meal glucose levels — effects comparable to longer exercise sessions.", color: "#6366f1", tag: "Metabolic Research" },
  { logo: "🧬", name: "University of Chicago Sleep Lab", title: "Annals of Internal Medicine", quote: "Sleep-deprived subjects lost 55% less fat and 60% more muscle than well-rested subjects on the same calorie-restricted diet — sleep is non-negotiable for fat loss.", color: "#f97316", tag: "Sleep & Weight Research" },
];

const LW_TESTIMONIALS = [
  { name: "Priya S.", role: "Marketing Manager, Pune", avatar: "PS", result: "−4 kg in 6 weeks", text: "I've tried keto, gym memberships, dieticians. Nothing stuck. These 5-minute habits were the first thing I actually did consistently. Lost 4 kg in 6 weeks." },
  { name: "Rahul M.", role: "Software Engineer, Bangalore", avatar: "RM", result: "No more midnight cravings", text: "I work 10-hour days. Zero time for fitness. But 5 minutes? I could do that. By Week 3 my energy was noticeably higher and I stopped craving junk at midnight." },
  { name: "Deepika K.", role: "CA, Mumbai", avatar: "DK", result: "Consistent even while travelling", text: "Travelling 3 weeks a month for work. This guide is the only fitness thing that actually travels with me. No excuses possible when the habit takes 5 minutes." },
  { name: "Arjun T.", role: "Startup Founder, Delhi", avatar: "AT", result: "−6 kg in 8 weeks", text: "Bought this on a whim for ₹199. Best ₹199 I've spent this year. The science explanations helped me understand WHY I was gaining weight. Game changer." },
  { name: "Meera R.", role: "Product Manager, Hyderabad", avatar: "MR", result: "−3 kg, better sleep", text: "Month 3 (the sleep habits) was the real surprise. I didn't expect sleep changes to affect my weight but I dropped 3 more kg in Month 3 without changing anything else." },
  { name: "Karan V.", role: "Sales Director, Chennai", avatar: "KV", result: "Lost 8 kg in 3 months", text: "The structure is what made it click. One area per month, one habit per day — I always knew what I was doing. Finished all 90 days and lost 8 kg. Still going." },
];

const WHATS_INSIDE = [
  { icon: "🥗", title: "30 Eating Habits (Days 1–30)", desc: "Every habit focused on what and how you eat — food order, timing, screen-free meals, hydration, snack swaps, restaurant strategies, and more." },
  { icon: "🏃", title: "30 Movement Habits (Days 31–60)", desc: "30 NEAT-based movement habits for desk workers — stair sprints, post-meal walks, desk squats, walking calls, hourly stands, and more. No gym." },
  { icon: "🌙", title: "30 Sleep Habits (Days 61–90)", desc: "30 sleep and recovery habits that balance your hunger hormones, lower cortisol, and unlock overnight fat burning." },
  { icon: "🔬", title: "Science Explanation for Every Habit", desc: "Each of the 90 habits includes the exact biological mechanism behind why it works — in plain language. GLUT4, LPL, cortisol, ghrelin, GLP-1, NEAT." },
  { icon: "🗓", title: "Best Timing for Each Habit", desc: "Every habit includes the exact moment in a working professional's day to use it — before a meeting, during a commute, after lunch, before sleep." },
  { icon: "💡", title: "90 Pro Tips", desc: "One practical shortcut or enhancement for each habit — so you get even better results with the same effort." },
  { icon: "📊", title: "Weekly Progress Tracker (Printable)", desc: "A clean one-page weekly habit tracker you can print or use digitally — designed for the 90-day journey with all 3 areas mapped out." },
  { icon: "🍽️", title: "Restaurant & Travel Cheat Sheet", desc: "A one-page guide for eating out, ordering at airports, and maintaining your eating habits even when you have zero control over your food environment." },
  { icon: "⚡", title: "Quick-Start Checklist (Day 0 Guide)", desc: "A 10-minute setup ritual for the night before Day 1 — everything you need to have in place so tomorrow morning you can start without friction." },
  { icon: "🏆", title: "90-Day Challenge Certificate", desc: "A printable completion certificate for finishing all 90 days. Small motivation — but finishing something worth celebrating." },
  { icon: "🔁", title: "Post-90 Maintenance Blueprint", desc: "A short guide on exactly which habits to keep, which to drop, and how to design your permanent daily routine once the 90 days are done." },
];

// ═════════════════════════════════════════════════════════════════════════════
// PAGE
// ═════════════════════════════════════════════════════════════════════════════
export default function WeightLossPage() {
  useMetaPixelViewContent();
  const [activeTrack, setActiveTrack] = useState(0);

  return (
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
        /* SHIFT pointers grid: split at the SAME point as the image's before/after divider (53.12%) */
        .shift-split{display:grid;grid-template-columns:1fr}
        .shift-arrow{left:50%}
        @media (min-width:768px){.shift-split{grid-template-columns:53.12% 46.88%}.shift-arrow{left:53.12%}}
        /* ── Premium gold + charcoal palette — page-scoped overrides of the shared (WhatsApp-green) global classes ── */
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
          ✦ Not another diet or workout plan — just 1 tiny 5-minute habit a day. No big life changes. One-time ₹199. Instant E-Book download ✦
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
                For busy working professional who want to get fit without the gym pressure or crash diets
              </div>

              {/* Headline */}
              <h1 className="duc-h1 text-foreground animate-fade-up delay-100 mb-5">
                What if losing weight &amp;<br />
                getting strong needed only<br />
                <span className="gradient-text">5 minutes a day?</span>
              </h1>

              {/* Subhead */}
              <div className="animate-fade-up delay-150 mb-7 max-w-lg mx-auto lg:mx-0 relative">
                <p style={{ fontSize: 16, lineHeight: 1.75, color: "#52525b" }}>
                  <span style={{ fontWeight: 800, color: "#18181b", position: "relative", display: "inline-block" }}>
                    Slim &amp; Strong
                    {/* hand-drawn underline */}
                    <svg viewBox="0 0 200 10" aria-hidden="true" style={{ position: "absolute", bottom: -4, left: 0, width: "100%", height: 8, overflow: "visible" }}>
                      <path d="M2 6 Q50 2 100 6 Q150 10 198 5" stroke="#d4a017" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    </svg>
                  </span>{" "}
                  is the complete 90-Day structured Weight Loss Guide — Get 90 secret &amp; research-backed tiny fat-loss habits you can follow anywhere. Each habit takes less than 5 mins.
                </p>

                {/* Callout — label shifted right, clean arrow only */}
                <div className="hidden lg:block absolute pointer-events-none"
                  style={{ right: -260, top: 0 }}>
                  {/* Label */}
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full font-bold mb-2"
                    style={{ background: "#d4a017", color: "#fff", fontSize: 15, whiteSpace: "nowrap", boxShadow: "0 6px 20px rgba(212,160,23,0.45)", letterSpacing: "-0.01em", marginLeft: 20 }}>
                    <DownloadIcon size={17} />
                    Instant E-Book download
                  </div>
                  {/* Clean dashed arrow — smooth curve with aligned arrowhead */}
                  <svg width="200" height="100" viewBox="0 0 200 100" fill="none" style={{ marginLeft: 10 }}>
                    <path d="M12 12 C22 55 70 92 178 84" stroke="#d4a017" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="6 5" />
                    <path d="M164 72 L182 84 L162 92" stroke="#d4a017" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Mobile — inline badge */}
                <div className="flex lg:hidden items-center gap-2 mt-3">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full font-bold"
                    style={{ background: "#d4a017", color: "#fff", fontSize: 14, boxShadow: "0 4px 14px rgba(212,160,23,0.35)" }}>
                    <DownloadIcon size={15} />
                    Instant E-Book — no app needed
                  </div>
                </div>
              </div>

              {/* Objection-busters above CTA — single line, dot-separated */}
              <div className="animate-fade-up delay-250 flex items-center justify-center lg:justify-start flex-wrap gap-x-3 gap-y-1 mb-5">
                {["No gym required", "No crash diets", "Fits perfectly into your schedule"].map((line, i, arr) => (
                  <span key={line} className="flex items-center gap-3">
                    <span style={{ fontSize: 14, color: "#3f3f46", fontWeight: 600 }}>{line}</span>
                    {i < arr.length - 1 && <span style={{ color: "#a8790d", fontSize: 16, fontWeight: 900 }}>·</span>}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="animate-fade-up delay-300 flex flex-col items-center lg:items-start gap-2 mb-8">
                <button
                  onClick={buy}
                  className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-full font-black text-white"
                  style={{ fontSize: 20, boxShadow: "0 8px 28px rgba(212,160,23,0.42)", border: "none", cursor: "pointer" }}>
                  <DownloadIcon size={22} />Get the Guide — ₹199
                </button>
                <p style={{ fontSize: 13, color: "#71717a", textAlign: "center" }}>One-time ₹199 · Instant E-Book download · 7-day money-back guarantee</p>
              </div>

              {/* Social proof */}
              <div className="animate-fade-up delay-400 flex items-center gap-4 justify-center lg:justify-start">
                {/* Stacked avatars */}
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
                    <strong style={{ color: "#18181b" }}>Loved by 2,800+ working professionals</strong> across India
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT — 3D ebook cover on a green glow panel */}
            <div className="lg:col-span-5 flex justify-center items-start animate-fade-up delay-300 lg:-mt-10 mt-6">
              <div className="relative w-full max-w-sm">
                <div
                  className="relative w-full flex justify-center px-6 pt-10 pb-8"
                  style={{
                    borderRadius: 40,
                    background: "linear-gradient(160deg,#d4a017 0%,#b8860b 100%)",
                    boxShadow: "0 24px 60px -18px rgba(212,160,23,0.55), inset 0 1px 0 rgba(255,255,255,0.25)",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 80% at 50% -10%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 55%)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", left: "-20%", bottom: "-25%", width: "70%", height: "60%", background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)", filter: "blur(24px)", pointerEvents: "none" }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/ebook/cover-3d-nobg.png"
                    alt="Slim & Strong — The 90-Day Weight Loss Guide"
                    className="relative w-full h-auto"
                    style={{ filter: "drop-shadow(0 26px 40px rgba(0,0,0,0.35))", animation: "ss-float 5s ease-in-out infinite" }}
                  />
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
            <h2 className="duc-h2 duc-section-title mb-3">This is why busy professionals struggle to stay fit</h2>
            <p className="duc-body max-w-sm mx-auto">If you nodded at one of these, <strong style={{ color: "#18181b" }}>Slim &amp; Strong</strong> was built for you!</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "😮‍💨", keyword: "Late-Night Eating", text: "You order food at 11 PM because dinner got cancelled for a client call — again.", color: "#6366f1", solidBg: "#eef2ff", border: "#c7d2fe", img: "/goals/pain/late-night.png" },
              { icon: "💳", keyword: "Wasted Memberships", text: "You've paid for gym memberships this year. You went twice, total.", color: "#d97706", solidBg: "#fffbeb", border: "#fde68a", img: "/goals/pain/gym-wasted.png" },
              { icon: "🍱", keyword: "Desk Lunches", text: "You eat lunch at your desk while on a Zoom, barely tasting anything.", color: "#db2777", solidBg: "#fdf2f8", border: "#f9a8d4", img: "/goals/pain/desk-lunch.png" },
              { icon: "🛏", keyword: "Broken Sleep", text: "You sleep at 1 AM, wake at 7, skip breakfast, and wonder why you're exhausted.", color: "#c8891a", solidBg: "#f5f3ff", border: "#ddd6fe", img: "/goals/pain/broken-sleep.png" },
              { icon: "✈️", keyword: "Constant Travel", text: "You travel constantly. Hotel food, airport junk, zero routine.", color: "#059669", solidBg: "#ecfdf5", border: "#6ee7b7", img: "/goals/pain/travel.png" },
              { icon: "😞", keyword: "Nothing Sticks", text: "You've tried keto, IF, calorie counting. Nothing stuck past Week 2.", color: "#0284c7", solidBg: "#f0f9ff", border: "#bae6fd", img: "/goals/pain/nothing-sticks.png" },
              { icon: "⏰", keyword: "No Free Time", text: "A 1-hour gym routine was never realistic for a 10-hour workday.", color: "#ea580c", solidBg: "#fff7ed", border: "#fed7aa", img: "/goals/pain/no-time.png" },
            ].map((p, i) => (
              <div key={i} className="duc-glow-card rounded-2xl overflow-hidden flex flex-col" style={{ background: p.solidBg, border: `2px solid ${p.border}` }}>
                {/* Image fading into card bg — same pattern as theme cards */}
                <div className="relative h-36 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 35%, ${p.solidBg} 100%)` }} />
                  <div className="absolute bottom-2 left-3 flex items-center gap-2">
                    <span style={{ fontSize: 24 }}>{p.icon}</span>
                  </div>
                </div>
                {/* Keyword headline + text below image, inside card bg */}
                <div className="px-4 pb-4 pt-3 flex-1">
                  <p style={{ fontSize: 19, fontWeight: 900, color: p.color, lineHeight: 1.2, marginBottom: 8, letterSpacing: "-0.01em" }}>{p.keyword}</p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#18181b", lineHeight: 1.6 }}>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl p-6 text-center" style={{ background: "linear-gradient(135deg,rgba(212,160,23,0.08),rgba(184,134,11,0.04))", border: "1px solid rgba(212,160,23,0.18)" }}>
            <p className="font-bold mb-2" style={{ fontSize: 17, color: "#18181b" }}>You don&apos;t need more discipline. You need a smaller step.</p>
            <p className="duc-body mb-5">Every crash diet fails because it asks for too much, too fast. <strong style={{ color: "#b8860b" }}>Slim &amp; Strong</strong> asks for just <strong style={{ color: "#b8860b" }}>one tiny habit a day</strong> — so small you can&apos;t fail, so easy you never have to change your whole routine.</p>
            <button
              onClick={buy}
              className="btn-primary inline-flex items-center gap-3 px-8 py-4 rounded-full font-black text-white"
              style={{ fontSize: 16, boxShadow: "0 8px 28px rgba(212,160,23,0.42)", border: "none", cursor: "pointer" }}>
              <DownloadIcon size={18} />Get the Guide — ₹199
            </button>
            <p className="mt-2" style={{ fontSize: 12, color: "#71717a" }}>One-time ₹199 · Instant E-Book download · 7-day money-back guarantee</p>
          </div>
        </div>
      </section>

      {/* ══ 3. THE SHIFT ══════════════════════════════════════════════════════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">THE SHIFT</p>
            <h2 className="duc-h2 duc-section-title mb-3">Where you are now <span style={{ color: "#a8790d" }}>→</span> where you&apos;ll be in 90 days</h2>
            <p className="duc-body max-w-md mx-auto">Same busy schedule. But a lighter, stronger, more confident version of yourself.</p>
          </div>
          {/* Unified SHIFT card — image on top, before/after pointers at the bottom */}
          <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#e4e4e7", background: "#fff", boxShadow: "0 12px 40px -14px rgba(0,0,0,0.15)" }}>

            {/* Visual — 3 life areas (energy, sleep, health) in one image with baked-in labels */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/goals/shift-before-after-v90b.png" alt="Your 90-day journey — before and after across energy, sleep and health for working professionals" style={{ display: "block", width: "100%", height: "auto" }} loading="lazy" />

            {/* Before / After pointers at the bottom of the image */}
            <div className="shift-split relative" style={{ borderTop: "1px solid #e4e4e7" }}>
              {/* Arrow between the two columns — aligned to the image divider (53.12%) */}
              <div
                className="shift-arrow absolute top-1/2 z-10 flex items-center justify-center rounded-full"
                style={{
                  transform: "translate(-50%, -50%)",
                  width: 52,
                  height: 52,
                  background: "#d4a017",
                  boxShadow: "0 8px 22px rgba(212,160,23,0.5), 0 0 0 6px #fff",
                }}
                aria-hidden="true"
              >
                {/* Desktop: right arrow */}
                <svg className="hidden md:block" width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* Mobile: down arrow */}
                <svg className="md:hidden" width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M12 4v14M6 13l6 6 6-6" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Day 0 — Today */}
              <div className="p-6 md:border-r" style={{ background: "#fafafa", borderColor: "#e4e4e7" }}>
                <div className="inline-flex items-center px-3 py-1 rounded-full mb-5" style={{ background: "#fee2e2", color: "#991b1b", border: "1px solid #fca5a5", fontSize: 12, fontWeight: 700 }}>Day 0 — Today</div>
                <div className="flex flex-col gap-3.5">
                  {[
                    "No plan on where to even start losing weight",
                    "Too much to fix, too little time",
                    "Confused by conflicting diet advice online",
                    "Diet apps collecting dust on your phone",
                    "Good intentions that never survive a busy week",
                    "Low energy, sluggish, uncomfortable in your clothes",
                    "\"I'll start my diet properly next week\"",
                  ].map((b, i) => (
                    <div key={i} className="flex items-center gap-3"><Check /><span style={{ fontSize: 14, color: "#52525b", lineHeight: 1.6 }}>{b}</span></div>
                  ))}
                </div>
              </div>

              {/* After 90 Days */}
              <div className="p-6 relative overflow-hidden" style={{ background: "#f0fdf4" }}>
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full" style={{ background: "rgba(212,160,23,0.08)" }} aria-hidden="true" />
                <div className="relative">
                  <div className="inline-flex items-center px-3 py-1 rounded-full mb-5 badge-after" style={{ fontSize: 12, fontWeight: 700 }}>After 90 Days</div>
                  <div className="flex flex-col gap-3.5">
                    {[
                      "A clear day-by-day plan — one habit, one meal plan, every day",
                      "Under 5 minutes of effort a day — nothing more",
                      "Done-for-you meals so you never guess what to eat",
                      "Results you see in the mirror and on the scale",
                      "No-gym workouts you can do at home",
                      "More energy, lighter body, clothes fitting better",
                      "\"I've lost the weight and I feel amazing\"",
                    ].map((a, i) => (
                      <div key={i} className="flex items-center gap-3"><Check green /><span style={{ fontSize: 14, fontWeight: 600, color: "#18181b", lineHeight: 1.6 }}>{a}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <CTA label="I Want This Version of Myself →" sub="One-time ₹199 · Instant E-Book download · 7-day money-back guarantee" />
          </div>
        </div>
      </section>

      {/* ══ 4. HOW IT WORKS ═══════════════════════════════════════════════════ */}
      <section style={{ background: "#f4f4f0" }} className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="duc-label mb-3">Simple by design</p>
            <h2 className="duc-h2 duc-section-title mb-4">How <span className="relative inline-block" style={{ whiteSpace: "nowrap", WebkitTextFillColor: "#18181b", color: "#18181b" }}>Slim &amp; Strong<svg viewBox="0 0 220 10" className="absolute left-0 bottom-[-4px] w-full" style={{ height: 8 }} fill="none"><path d="M2 7 Q55 2 110 6 Q165 10 218 5" stroke="#d4a017" strokeWidth="2.5" strokeLinecap="round" fill="none"/></svg></span> Works</h2>
            <p className="duc-body max-w-xl mx-auto">No app. No long routines. Just download the guide and follow one simple step a day.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                n: "1",
                emoji: "💳",
                title: "Buy Once & Download Instantly",
                body: "Pay a one-time ₹199 and get instant access to the Slim & Strong E-Book. Download it to your phone or laptop and open it anytime — lifetime access, no subscription.",
              },
              {
                n: "2",
                emoji: "📖",
                title: "Follow One Simple Step a Day",
                body: "The guide lays out 90 days of fat-loss habits, done-for-you meal plans and no-gym workouts. Each day takes under 5 minutes to act on — no guessing what to do.",
              },
              {
                n: "3",
                emoji: "🔥",
                title: "Track Your Progress & See Results",
                body: "Use the built-in 90-day tracker to tick off each habit, watch your streak grow, and see the weight come off week after week.",
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
            <CTA label="Get Instant Access — ₹199 →" sub="One-time ₹199 · Instant E-Book download · 7-day money-back guarantee" />
          </div>
        </div>
      </section>

      {/* ══ 4b. SCIENCE — every habit is proven ══════════════════════════════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="duc-label mb-3">Research-Backed. No Guesswork.</p>
            <h2 className="duc-h2 duc-section-title mb-3">Every habit is proven to work</h2>
            <p className="duc-body max-w-xl mx-auto">None of these are opinions or wellness trends. Each habit comes from peer-reviewed research — so you can trust what you&apos;re doing, and know it will work.</p>
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

          <p className="text-center" style={{ color: "#71717a", fontSize: 13, marginTop: "1.5rem" }}>All 90 habits draw from established peer-reviewed research. Sources cited inside the E-Book.</p>
        </div>
      </section>

      {/* ══ 4c. HOW THE 90-DAY SYSTEM WORKS ══════════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="duc-label mb-3">Simple by Design</p>
            <h2 className="duc-h2 duc-section-title mb-3">How the 90-Day System Works</h2>
          </div>
          <div className="flex flex-col gap-7">
            {[
              { step: "01", color: "#b8860b", title: "Month 1 — Fix Your Eating", desc: "30 habits focused entirely on HOW and WHEN you eat. No diet plan. No food restrictions. Just tiny shifts in food order, timing, and mindfulness that change your metabolism from the inside." },
              { step: "02", color: "#f97316", title: "Month 2 — Add Movement", desc: "With your eating habits now running on autopilot, you add 30 movement habits. Still no gym required. NEAT-based habits that burn 300–500 extra calories daily through stair sprints, desk squats, walking calls, and post-meal walks." },
              { step: "03", color: "#6366f1", title: "Month 3 — Optimise Sleep", desc: "Now you add 30 sleep habits. Better sleep lowers cortisol, balances hunger hormones, and unlocks overnight fat burning. This is when the compound results from all 3 areas hit simultaneously." },
              { step: "04", color: "#e8a020", title: "Day 90 — Your Personal System", desc: "By Day 90 you have 90 habits to choose from. The last habit in the guide asks you to write down the 5–7 that worked best. That's your permanent system — no app, no subscription, no renewal." },
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

      {/* ══ FOCUS ON ONE AREA EACH MONTH — tabbed tracks ═════════════════════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">One month at a time</p>
            <h2 className="duc-h2 duc-section-title mb-3">Focus On Just One Area Each Month</h2>
            <p className="duc-body max-w-xl mx-auto">Weight loss requires fixing eating, movement, AND sleep. Most people try to fix all 3 at once and fail. We fix them one by one — a full month each.</p>
          </div>

          {/* Area tabs */}
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

          {/* Active track detail */}
          {TRACKS.map((t, i) => i === activeTrack && (
            <div key={i} className="rounded-2xl mx-auto" style={{ background: t.colorLight, border: `1px solid ${t.colorBorder}`, padding: "2rem", maxWidth: 700 }}>
              <div className="flex items-center gap-4 mb-5">
                <span style={{ fontSize: 40 }}>{t.icon}</span>
                <div>
                  <p className="duc-label mb-1" style={{ color: t.color }}>{t.days}</p>
                  <p style={{ fontSize: 18, fontWeight: 800, color: "#18181b", lineHeight: 1.25 }}>Month {t.month}: {t.title}</p>
                  <p style={{ fontSize: 14, color: "#52525b" }}>{t.subtitle}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 mb-5">
                {t.habits.map((h, hi) => (
                  <div key={hi} className="flex items-center gap-3">
                    <span style={{ color: t.color, fontWeight: 700, fontSize: 12, minWidth: 30 }}>D{(t.month - 1) * 30 + hi + 1}</span>
                    <span style={{ fontSize: 14, color: "#52525b" }}>{h}</span>
                  </div>
                ))}
                <p style={{ fontSize: 13, color: "#71717a", fontStyle: "italic", marginTop: 4 }}>+ 24 more habits inside the ebook...</p>
              </div>
              <div className="rounded-xl" style={{ background: t.color, color: "#fff", padding: "0.875rem 1rem", fontSize: 14, fontWeight: 700 }}>
                Month {t.month} Result: {t.outcome}
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-10">
            <CTA label="Get My 90-Day Plan — ₹199 →" sub="One-time ₹199 · Instant E-Book download · 7-day money-back guarantee" />
          </div>
        </div>
      </section>

      {/* ══ 4a. SAMPLE HABITS — 3 columns ════════════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="duc-label mb-3">Sample Habits From Inside</p>
            <h2 className="duc-h2 duc-section-title mb-3">See How Your Habit Will Look Like</h2>
            <p className="duc-body max-w-xl mx-auto">Every habit comes with what to do, the science behind why it works, and the best moment to use it in your day.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: "1.5rem" }}>
            {SAMPLE_HABITS.map((area) => (
              <div key={area.area} className="rounded-2xl overflow-hidden" style={{ border: `1.5px solid ${area.colorBorder}`, background: "#fff" }}>
                {/* Column header */}
                <div className="flex items-center gap-2.5" style={{ background: area.color, padding: "1rem 1.25rem" }}>
                  <span style={{ fontSize: 20 }}>{area.emoji}</span>
                  <span style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>{area.area}</span>
                </div>
                {/* Habits */}
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
                        <span style={{ fontWeight: 700, color: area.color, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: 11 }}>Why it works: </span>{h.why}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <CTA label="Get All 90 Habits — ₹199 →" sub="One-time ₹199 · Instant E-Book download · 7-day money-back guarantee" />
          </div>
        </div>
      </section>

      {/* ══ NOT A COURSE ═══════════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg,#171412 0%,#18181b 50%,#171412 100%)" }} className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="duc-h2 mb-4" style={{ color: "#fff" }}>Not a Diet. Not a Workout Plan. Not Another Fad.</h2>
          <p className="max-w-2xl mx-auto mb-6" style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.78)" }}>Every other guide asks you to <strong style={{ color: "#fff" }}>change your whole life</strong> on Day 1 — new diet, new gym routine, new everything. That&apos;s exactly why they fail. <strong style={{ color: "#fff" }}>Slim &amp; Strong</strong> is different: you change <strong style={{ color: "#fff" }}>one tiny habit a day</strong> — under 5 minutes — while your life stays exactly as it is.</p>
          <p style={{ fontSize: 17, color: "rgba(212,160,23,0.9)", fontStyle: "italic", fontWeight: 500 }}>No calorie counting. No gym. No giving up your favourite food. Just 1 small habit each day — small enough you&apos;ll never skip it.</p>
        </div>
      </section>

      {/* ══ TINY HABITS CONCEPT ══════════════════════════════════════════════ */}
      <section style={{ background: "#faf8f3" }} className="py-16 lg:py-28 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">

          {/* Headline */}
          <div className="text-center mb-14">
            <p className="duc-label mb-3" style={{ color: "#a8790d" }}>The science behind the guide</p>
            <h2 className="duc-h2 mb-5" style={{ color: "#18181b" }}>
              Why Big Changes Fail —<br />
              <span style={{ color: "#a8790d" }}>And What Actually Works</span>
            </h2>
            <p className="duc-body max-w-xl mx-auto" style={{ color: "#52525b" }}>
              Most people know they want to get fitter. They just don&apos;t know how to get there without burning out.
            </p>
          </div>

          {/* Row labels */}
          <div className="hidden md:grid mb-3" style={{ gridTemplateColumns: "1fr 56px 1fr", gap: "0 16px" }}>
            <div className="text-center">
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#dc2626" }}>The overwhelming way</span>
            </div>
            <div />
            <div className="text-center">
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9a6b0a" }}>The tiny habit way ✓</span>
            </div>
          </div>

          {/* 3 rows — one per goal */}
          <div className="flex flex-col gap-4 mb-10">
            {[
              {
                emoji: "⚖️",
                goal: "Lose Weight",
                badColor: "#ea580c",
                badBg: "#fff7ed",
                badBorder: "#fed7aa",
                badImg: "/goals/weight-bad.png",
                goodImg: "/goals/weight-good.png",
                items: ["Count calories daily", "Cut carbs completely", "Gym 5× a week", "Meal prep Sundays", "Track macros", "Avoid all sugar & junk"],
                habit: "Drink one glass of warm water before your first meal",
                why: "Reduces appetite, boosts metabolism — takes 10 seconds.",
              },
              {
                emoji: "🍽️",
                goal: "Eat Better",
                badColor: "#db2777",
                badBg: "#fdf2f8",
                badBorder: "#fbcfe8",
                badImg: "/goals/eat-bad.png",
                goodImg: "/goals/eat-good.png",
                items: ["Follow a strict diet", "Weigh every meal", "Eat only whole foods", "No carbs ever", "No eating out", "Give up all treats"],
                habit: "Fill half your plate with vegetables at every meal",
                why: "Cuts calories automatically while keeping you full and satisfied.",
              },
              {
                emoji: "💪",
                goal: "Get Stronger",
                badColor: "#6366f1",
                badBg: "#eef2ff",
                badBorder: "#c7d2fe",
                badImg: "/goals/strength-bad.png",
                goodImg: "/goals/strength-good.png",
                items: ["Join a gym", "1-hour workouts daily", "Buy equipment", "Hire a trainer", "Lift heavy 5× week", "Two-a-day sessions"],
                habit: "Do a 5-minute no-gym bodyweight circuit at home",
                why: "Builds lean muscle that burns fat even while you rest.",
              },
            ].map(({ emoji, goal, badColor, badBg, badBorder, badImg, goodImg, items, habit, why }) => (
              <div key={goal} className="grid grid-cols-1 md:grid-cols-[1fr_56px_1fr] items-center gap-3 md:gap-0">

                {/* LEFT — overwhelming list */}
                <div className="rounded-2xl overflow-hidden" style={{ border: `1.5px solid ${badBorder}`, background: badBg }}>
                  <div className="px-4 py-3 flex items-center gap-2.5" style={{ borderBottom: `1.5px solid ${badBorder}` }}>
                    <span style={{ fontSize: 20 }}>{emoji}</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: "#18181b" }}>{goal}</span>
                    <span className="ml-auto" style={{ fontSize: 10, fontWeight: 700, color: badColor, textTransform: "uppercase", letterSpacing: "0.08em" }}>overwhelming</span>
                  </div>
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", overflow: "hidden", borderBottom: `1.5px solid ${badBorder}` }}>
                    <img src={badImg} alt={`${goal} the overwhelming way`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(0.25) contrast(0.96)" }} />
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

                {/* MIDDLE — arrow */}
                <div className="flex flex-col items-center justify-center py-2 md:py-0" style={{ gap: 4 }}>
                  {/* Mobile: down arrow; Desktop: right arrow */}
                  <svg className="hidden md:block" width="40" height="20" viewBox="0 0 40 20" fill="none">
                    <path d="M2 10h32M28 4l8 6-8 6" stroke="#d4a017" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <svg className="md:hidden" width="20" height="32" viewBox="0 0 20 32" fill="none">
                    <path d="M10 2v26M4 22l6 8 6-8" stroke="#d4a017" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* RIGHT — tiny habit */}
                <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid #bbf7d0", background: "#f0fdf4" }}>
                  <div className="px-4 py-3 flex items-center gap-2.5" style={{ borderBottom: "1.5px solid #bbf7d0" }}>
                    <span style={{ fontSize: 20 }}>{emoji}</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: "#18181b" }}>{goal}</span>
                    <span className="ml-auto" style={{ fontSize: 10, fontWeight: 700, color: "#9a6b0a", textTransform: "uppercase", letterSpacing: "0.08em" }}>tiny habit ✓</span>
                  </div>
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", overflow: "hidden", borderBottom: "1.5px solid #bbf7d0" }}>
                    <img src={goodImg} alt={`${goal} the tiny habit way`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,0) 50%,rgba(212,160,23,0.18) 100%)" }} />
                  </div>
                  <div className="px-4 py-4 flex flex-col gap-2.5">
                    <p style={{ fontSize: 11, fontWeight: 700, color: "#9a6b0a", textTransform: "uppercase", letterSpacing: "0.08em" }}>Inside the guide:</p>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#18181b", lineHeight: 1.5 }}>&ldquo;{habit}&rdquo;</p>
                    <p style={{ fontSize: 12, color: "#52525b", lineHeight: 1.55 }}>{why}</p>
                  </div>
                  <div className="px-4 py-2 flex items-center gap-2" style={{ borderTop: "1px solid #bbf7d0", background: "rgba(212,160,23,0.06)" }}>
                    <span style={{ width: 16, height: 16, borderRadius: "50%", background: "#d4a017", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2.5 2.5 4-4.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#9a6b0a" }}>Done in 2 minutes. Every single day. ✅</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Bridge — the reframe */}
          <div className="rounded-2xl px-8 py-7 text-center mb-10" style={{ background: "linear-gradient(135deg,#171412,#18181b)" }}>
            <p style={{ fontSize: "clamp(1.1rem,2.5vw,1.5rem)", fontWeight: 900, color: "#fff", lineHeight: 1.35, marginBottom: 10 }}>
              This is how lasting fat loss works.
            </p>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, maxWidth: 520, margin: "0 auto" }}>
              You don&apos;t change your life overnight. You start with one small habit you can&apos;t fail at — and let it compound. That&apos;s the <span style={{ color: "#a8790d", fontWeight: 700 }}>power of tiny habits</span>.
            </p>
          </div>

          {/* The 3 pillars of tiny habits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              { icon: "✅", title: "Easy to Do", desc: "2–3 minutes. No equipment. No planning. You can do it on the busiest Monday." },
              { icon: "🔄", title: "No Big Life Changes", desc: "Fits into the life you already have. No gym, no crash diet, no 5am alarm." },
              { icon: "🎯", title: "Too Small to Miss", desc: "When it's tiny enough, there's no excuse. That's when the results start to show." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="rounded-2xl p-6 flex flex-col gap-3" style={{ background: "#fff", border: "1.5px solid #e4e4e7", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <span style={{ fontSize: 28 }}>{icon}</span>
                <p style={{ fontSize: 15, fontWeight: 800, color: "#18181b" }}>{title}</p>
                <p style={{ fontSize: 13, color: "#52525b", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <CTA label="Start My Fat-Loss Journey →" sub="One-time ₹199 · Instant E-Book download · 7-day money-back guarantee" />
          </div>

        </div>
      </section>

      {/* ══ 1% TINY GAINS ════════════════════════════════════════════════════ */}
      <TinyGainsDUC />

      {/* ══ 4e. WHAT YOU GET FOR ₹199 (11-item grid) ═════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="duc-label mb-3">Everything Inside</p>
            <h2 className="duc-h2 duc-section-title mb-3">What you get for ₹199</h2>
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
            <CTA label="Get Instant Access — ₹199 →" sub="One-time ₹199 · Instant E-Book download · 7-day money-back guarantee" />
          </div>
        </div>
      </section>

      {/* ══ 6. WHAT'S INSIDE THE GUIDE (chapters) ════════════════════════════ */}
      {(() => {
        const TICKER_CARDS = [
          { emoji: "🚀", theme: "Kickstart Week", tagline: "Set up for guaranteed wins", color: "#6366f1", bg: "#eef2ff", border: "#c7d2fe", img: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&q=80", habits: ["The Warm-Water Metabolism Trigger","Your Starting Measurements Setup","The 3-Bite Slow-Down Rule","Pantry Clean-Out Checklist"] },
          { emoji: "🥗", theme: "Meal Plans", tagline: "Eat well, drop fat", color: "#d97706", bg: "#fffbeb", border: "#fde68a", img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80", habits: ["The Half-Plate Veg Method","Protein-First Plate Rule","7-Day Indian Meal Template","The Smart Snack Swap List"] },
          { emoji: "💪", theme: "No-Gym Workouts", tagline: "Burn fat at home", color: "#c8891a", bg: "#f5f3ff", border: "#ddd6fe", img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80", habits: ["The 5-Minute Wake-Up Circuit","Bodyweight Fat-Burner Routine","The One-Flight Stairs Rule","Post-Meal 10-Minute Walk"] },
          { emoji: "🌿", theme: "Gut & Digestion", tagline: "Less bloating, flatter belly", color: "#059669", bg: "#ecfdf5", border: "#6ee7b7", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80", habits: ["The Dahi Lunch Protocol","The 20-Chew Digestion Rule","Morning Warm Water Activation","The Screen-Free Meal Method"] },
          { emoji: "😴", theme: "Sleep for Fat Loss", tagline: "Rest so your body burns fat", color: "#db2777", bg: "#fdf2f8", border: "#f9a8d4", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80", habits: ["The 90-Second Wind-Down","Phone-Free Sleep Protocol","Bedroom Temperature Reset","The Consistent Wake-Up Rule"] },
          { emoji: "💧", theme: "Hydration", tagline: "More water, fewer cravings", color: "#0284c7", bg: "#f0f9ff", border: "#bae6fd", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80", habits: ["Pre-Meal Water Protocol","The 3 PM Water Alarm","Swap One Drink for Water","The 8-Glass Track Method"] },
          { emoji: "🧠", theme: "Craving Control", tagline: "Beat late-night snacking", color: "#9a6b0a", bg: "#eef2ff", border: "#c7d2fe", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80", habits: ["The Night Snacking Pause","The Hunger Check Method","Sugar Craving 10-Minute Rule","The Smaller Plate Habit"] },
          { emoji: "📊", theme: "Tracking & Habits", tagline: "See the weight come off", color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc", img: "https://images.unsplash.com/photo-1616671276441-2f2c277b8bf6?w=600&q=80", habits: ["The Daily Tick-Box Habit","Weekly Weigh-In Ritual","Progress-Photo Method","The Streak-Protection Rule"] },
          { emoji: "🎯", theme: "Staying Consistent", tagline: "Make it stick for life", color: "#c026d3", bg: "#fdf4ff", border: "#e879f9", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80", habits: ["The Never-Miss-Twice Rule","Bounce-Back-in-a-Day Method","The Weekend Anchor Habit","Your Maintenance Blueprint"] },
        ];

        return (
          <>
            <section className="bg-section-cream py-16 lg:py-24">
              <div className="max-w-5xl mx-auto px-6 lg:px-10">
                <div className="text-center mb-10">
                  <p className="duc-label mb-3">What&apos;s Inside the Guide</p>
                  <h2 className="duc-h2 duc-section-title mb-3">8 Chapters That Take You From Day 1 to Slim &amp; Strong</h2>
                  <p className="duc-body max-w-lg mx-auto">Every chapter tackles one part of fat loss — food, movement, sleep, cravings and consistency — without overwhelming your schedule.</p>
                </div>
              </div>

              {/* ── Ticker train (always visible) ── */}
              <div style={{ overflow: "hidden", marginTop: 8 }}>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <div className="duc-ticker-track" style={{ animationDuration: "70s" }}>
                    {[...TICKER_CARDS, ...TICKER_CARDS].map(({ emoji, theme, tagline, color, bg, border, img, habits }, i) => (
                      <div key={`${theme}-${i}`} style={{
                        width: 300,
                        flexShrink: 0,
                        borderRadius: 20,
                        overflow: "hidden",
                        border: `2px solid ${border}`,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
                        background: bg,
                        display: "flex",
                        flexDirection: "column",
                      }}>
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
                          <p style={{ fontSize: 10, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px 0" }}>Inside this chapter:</p>
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
                  <CTA label="Get the Full Guide — ₹199" sub="One-time ₹199 · Instant E-Book download · 7-day money-back guarantee" />
                </div>
              </div>
            </section>
          </>
        );
      })()}

      {/* ══ 7. A PEEK INSIDE THE GUIDE — 3 page previews ══════════════════════ */}
      <section className="bg-section-white py-16 lg:py-24 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="duc-label mb-3">A peek inside the guide</p>
            <h2 className="duc-h2 duc-section-title mb-3">See Exactly What You&apos;re Getting</h2>
            <p className="duc-body max-w-sm mx-auto">Clean, simple, and easy to follow — here are real pages from inside the E-Book.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Tiny Habits That Make You Fit */}
            <div className="flex flex-col items-center gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold" style={{ background: "#fffbeb", border: "2px solid #fde68a", color: "#d97706", fontSize: 13 }}>
                ⚡ Tiny Habits That Make You Fit
              </div>
              <PhoneGlow from="#fbbf24" to="#f97316" accent="rgba(251,191,36,0.55)">
                <div style={{ width: 270, borderRadius: 20, overflow: "hidden", boxShadow: "0 18px 40px -12px rgba(0,0,0,0.4)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/ebook/page-tiny-habit.png" alt="Daily tiny habit page from the Slim & Strong guide" style={{ display: "block", width: "100%", height: 420, objectFit: "cover" }} loading="lazy" />
                </div>
              </PhoneGlow>
            </div>

            {/* 90-Day Tracker */}
            <div className="flex flex-col items-center gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold" style={{ background: "#eef2ff", border: "2px solid #c7d2fe", color: "#6366f1", fontSize: 13 }}>
                📊 90-Day Tracker
              </div>
              <PhoneGlow from="#818cf8" to="#9a6b0a" accent="rgba(99,102,241,0.55)">
                <div style={{ width: 270, borderRadius: 20, overflow: "hidden", boxShadow: "0 18px 40px -12px rgba(0,0,0,0.4)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/ebook/page-tracker.png" alt="90-day tracker page from the Slim & Strong guide" style={{ display: "block", width: "100%", height: 420, objectFit: "cover" }} loading="lazy" />
                </div>
              </PhoneGlow>
            </div>

            {/* The Science Behind It */}
            <div className="flex flex-col items-center gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold" style={{ background: "#f5f3ff", border: "2px solid #ddd6fe", color: "#c8891a", fontSize: 13 }}>
                🔬 The Science Behind It
              </div>
              <PhoneGlow from="#a78bfa" to="#c8891a" accent="rgba(139,92,246,0.55)">
                <div style={{ width: 270, borderRadius: 20, overflow: "hidden", boxShadow: "0 18px 40px -12px rgba(0,0,0,0.4)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/ebook/page-science.png" alt="Science-behind-each-habit page from the Slim & Strong guide" style={{ display: "block", width: "100%", height: 420, objectFit: "cover" }} loading="lazy" />
                </div>
              </PhoneGlow>
            </div>
          </div>

          <p className="text-center mt-8" style={{ fontSize: 13, color: "#71717a" }}>3 of 90+ pages shown. Every page: clear, practical and easy to follow.</p>

          <div className="flex justify-center mt-8">
            <CTA label="Download My Copy — ₹199 →" sub="One-time ₹199 · Instant E-Book download · 7-day money-back guarantee" />
          </div>
        </div>
      </section>

      {/* ══ 4d. YOUTUBE vs ONE PLAN (dark compare) ═══════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg,#171412 0%,#18181b 50%,#171412 100%)" }} className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="duc-label mb-3" style={{ color: "#e8a020" }}>Not Random Advice</p>
            <h2 className="duc-h2 mb-4" style={{ color: "#fff" }}>YouTube gives you 47 conflicting videos.<br /><span style={{ color: "#a8790d" }}>This gives you one clear plan.</span></h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", maxWidth: 560, margin: "0 auto", lineHeight: 1.75 }}>The internet has infinite fitness content. What it doesn&apos;t have is a structured system that tells you exactly what to do today, tomorrow, and on Day 90 — built for someone with a 10-hour workday.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ maxWidth: 900, margin: "0 auto" }}>
            {/* Left — Chaos */}
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

            {/* Right — Structured */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.25)" }}>
              <div className="flex items-center gap-2.5" style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(212,160,23,0.2)" }}>
                <span style={{ fontSize: 18 }}>📗</span>
                <span style={{ color: "#a8790d", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em" }}>Slim &amp; Strong — Day by Day</span>
              </div>
              <div className="p-6">
                {[
                  { day: "Day 1", habit: "500ml water before your phone. 90 seconds." },
                  { day: "Day 2", habit: "Eat protein before rice or roti. Every meal." },
                  { day: "Day 7", habit: "One screen-free meal today." },
                  { day: "Day 31", habit: "Stand for 60 sec every hour." },
                  { day: "Day 35", habit: "2-min walk after every meal." },
                  { day: "Day 61", habit: "Screens off 30 min before sleep." },
                  { day: "Day 65", habit: "Morning sunlight within 10 min of waking." },
                  { day: "Day 90", habit: "You now have 90 habits. Pick your top 7." },
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

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center" style={{ gap: "2.5rem", marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {[
              { n: "90", label: "Habits with exact instructions" },
              { n: "0", label: "Conflicting advice" },
              { n: "1", label: "Clear plan from Day 1 to Day 90" },
              { n: "5 min", label: "Maximum time per day" },
            ].map(({ n, label }) => (
              <div key={label} className="text-center">
                <div style={{ color: "#a8790d", fontWeight: 900, fontSize: "clamp(1.5rem,3vw,2rem)", lineHeight: 1 }}>{n}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 4, maxWidth: 140 }}>{label}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <CTA label="Get My 90-Day Plan — ₹199 →" sub="One-time ₹199 · Instant E-Book download · 7-day money-back guarantee" />
          </div>
        </div>
      </section>

      {/* ══ WHO THIS IS FOR ═════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg,#171412 0%,#18181b 50%,#171412 100%)" }} className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="duc-label mb-3" style={{ color: "#a8790d" }}>Who This Is For</p>
            <h2 className="duc-h2 mb-4" style={{ color: "#fff" }}>This Is Built for You If…</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "You want to lose weight but don't have time for long gym routines.",
              "You keep starting and quitting diets every few weeks.",
              "You want a clear plan — food, movement and habits in one place.",
              "You don't want gym pressure or extreme crash diets.",
              "You prefer a simple guide you can follow at your own pace.",
              "You want a proven system, not more scattered advice online.",
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-4 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,160,23,0.18)" }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)", fontSize: 14, color: "#fff", fontWeight: 900 }}>✓</div>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.88)", lineHeight: 1.65, fontWeight: 500 }}>{point}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <button
              onClick={buy}
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
            <p className="duc-label mb-3" style={{ color: "#a8790d" }}>The Science of Simplicity</p>
            <h2 className="duc-h2 mb-4" style={{ color: "#fff" }}>Why <span className="relative inline-block">Slim &amp; Strong<svg viewBox="0 0 220 10" className="absolute left-0 bottom-[-4px] w-full" style={{ height: 8 }} fill="none"><path d="M2 7 Q55 2 110 6 Q165 10 218 5" stroke="#d4a017" strokeWidth="2.5" strokeLinecap="round" fill="none"/></svg></span> Works</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", maxWidth: 480, margin: "0 auto" }}>Because it removes the biggest reason people fail at weight loss — overwhelm.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left — the problem */}
            <div className="rounded-2xl p-8 flex flex-col justify-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="font-bold mb-3" style={{ fontSize: 13, color: "#f87171", textTransform: "uppercase", letterSpacing: "0.1em" }}>Why most people fail</p>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.85)", lineHeight: 1.75 }}>Most people try to change <strong style={{ color: "#fff" }}>too much too quickly</strong> — gym, strict diet, cardio all at once. They burn out by Week 2. The weight comes right back.</p>
            </div>

            {/* Right — the system */}
            <div className="rounded-2xl p-8" style={{ background: "rgba(212,160,23,0.06)", border: "1px solid rgba(212,160,23,0.2)" }}>
              <p className="font-bold mb-5" style={{ fontSize: 13, color: "#a8790d", textTransform: "uppercase", letterSpacing: "0.1em" }}>The Slim &amp; Strong System</p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: "🌱", label: "1 tiny habit a day", sub: "Small enough to never skip" },
                  { icon: "⏱️", label: "Less than 5 minutes", sub: "Fits into any schedule" },
                  { icon: "🥗", label: "Done-for-you meal plans", sub: "No calorie counting or guessing" },
                  { icon: "💪", label: "No-gym home workouts", sub: "Zero equipment needed" },
                  { icon: "📊", label: "90-day progress tracker", sub: "Momentum builds itself" },
                  { icon: "📖", label: "Everything in one E-Book", sub: "No app, no subscription" },
                  { icon: "♾️", label: "Lifetime access", sub: "Re-read and restart anytime" },
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

          {/* Closing punchline */}
          <div className="rounded-2xl p-7 text-center mt-8" style={{ background: "rgba(212,160,23,0.08)", border: "1.5px solid rgba(212,160,23,0.3)" }}>
            <p style={{ fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1.4 }}>Small enough to do daily. <span style={{ color: "#a8790d" }}>Powerful enough to change your body.</span></p>
          </div>

          <div className="flex justify-center mt-10">
            <CTA label="Get the Guide — ₹199 →" sub="One-time ₹199 · Instant E-Book download · 7-day money-back guarantee" />
          </div>
        </div>
      </section>

      {/* ══ 4g. PRICING — Get Slim & Strong Starting Today ═══════════════════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <div className="rounded-2xl overflow-hidden shadow-2xl text-center" style={{
            background: "linear-gradient(145deg,#0d1f12 0%,#0a1a0f 50%,#061009 100%)",
            border: "1px solid rgba(212,160,23,0.2)",
            padding: "clamp(2rem,5vw,3.5rem)",
          }}>
            <p className="duc-label mb-3" style={{ color: "#e8a020" }}>ONE-TIME OFFER</p>
            <h2 style={{ fontSize: "clamp(1.5rem,4vw,2.25rem)", fontWeight: 900, color: "#fff", marginBottom: "1rem" }}>Get Slim &amp; Strong Starting Today</h2>
            <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: 440, margin: "0 auto 2rem", lineHeight: 1.7 }}>90 habits across 3 areas of your life. Under 5 minutes each. Structured by month so you always know exactly what you&apos;re working on. Forever.</p>

            {/* Value rows */}
            <div style={{ maxWidth: 420, margin: "0 auto 2rem", textAlign: "left" }}>
              {[
                ["30 Eating Habits (Month 1)", "₹299"],
                ["30 Movement Habits (Month 2)", "₹299"],
                ["30 Sleep & Recovery Habits (Month 3)", "₹299"],
                ["Science Breakdown for All 90 Habits", "₹99"],
                ["Best-Time Guidance for Working Professionals", "₹3"],
              ].map(([item, val]) => (
                <div key={item} className="flex items-center justify-between" style={{ padding: "0.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>{item}</span>
                  <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, textDecoration: "line-through" }}>{val}</span>
                </div>
              ))}
              <div className="flex items-center justify-between" style={{ paddingTop: "1rem" }}>
                <span style={{ color: "#fff", fontWeight: 800 }}>Total Value</span>
                <span style={{ color: "rgba(255,255,255,0.35)", textDecoration: "line-through" }}>₹999</span>
              </div>
            </div>

            <div style={{ marginBottom: "0.5rem" }}>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "1.1rem", textDecoration: "line-through" }}>₹999</span>
              <span style={{ color: "#a8790d", fontSize: "3.5rem", fontWeight: 900, lineHeight: 1, margin: "0 0.5rem" }}>₹199</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginBottom: "2rem" }}>One-time · Instant E-Book download · Lifetime access</p>

            <div className="flex justify-center mb-4">
              <button onClick={buy} className="btn-primary inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-black text-white" style={{ fontSize: 18, boxShadow: "0 8px 28px rgba(212,160,23,0.42)", border: "none", cursor: "pointer" }}>
                <DownloadIcon size={20} />Get Instant Access — ₹199 →
              </button>
            </div>

            <div className="flex flex-wrap justify-center" style={{ gap: "1.25rem", marginBottom: "2rem" }}>
              {["🔒 Secure Razorpay", "📱 UPI / Cards / NetBanking", "↩ 7-Day Money-Back"].map(t => (
                <span key={t} style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{t}</span>
              ))}
            </div>

            <div style={{ textAlign: "left", maxWidth: 400, margin: "0 auto" }}>
              {["90 daily habits across 3 areas of your life", "Healthy Eating · Movement · Sleep — 30 habits per area", "Science explanation for every single habit", "Exact timing guide for working professionals", "Pro tip for each of the 90 habits", "5 powerful bonuses included", "Instant E-Book download + email copy", "Lifetime access — no expiry, no subscription"].map(item => (
                <div key={item} className="flex gap-3" style={{ marginBottom: "0.75rem" }}>
                  <span style={{ color: "#a8790d", fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>{item}</span>
                </div>
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
            <h2 className="duc-h2 duc-section-title mb-3">3 beliefs holding you back</h2>
            <p className="duc-body max-w-sm mx-auto">And exactly why none of them should stop you from starting today.</p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { n: "01", belief: "\"One tiny habit can't actually help me lose weight.\"", truth: "A Stanford study found that habits done for 30 consecutive days rewire neural pathways — permanently. Readers who started with just a glass of warm water before meals ended the month eating less, moving more, and dropping fat. None of those were the goal. The habit built the momentum.", icon: "🧠" },
              { n: "02", belief: "\"I've tried diets before. I always quit eventually.\"", truth: "You quit because the plan was too big, too vague, or required willpower you didn't have that day. When a habit takes under 5 minutes and every meal is already planned for you — there's nothing to quit. That's exactly how Slim & Strong is built.", icon: "🔄" },
              { n: "03", belief: "\"₹199 feels risky if the guide doesn't work for me.\"", truth: "That's exactly why there's a 7-day money-back guarantee. Read the guide, try the plan, and if it's not for you, message me within 7 days for a full refund. You risk nothing. I risk my reputation.", icon: "💰" },
            ].map(({ n, belief, truth, icon }) => (
              <div key={n} className="duc-glow-card rounded-xl overflow-hidden" style={{ border: "1px solid #e2dfd6" }}>
                <div className="flex items-start gap-3 px-5 py-4" style={{ background: "#fff7f7", borderBottom: "1px solid #fecaca" }}>
                  <span style={{ fontSize: 20 }} className="shrink-0">{icon}</span>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.08em" }}>False Belief {n}</span>
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
            <h2 className="duc-h2 duc-section-title mb-3">Any one of these alone would be worth it.</h2>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { icon: "⚖️", bold: "help you drop the first few kilos and finally see the scale move again", cta: "— would ₹199 to find out be worth it?" },
              { icon: "🥗", bold: "hand you a done-for-you meal plan so you never have to think about what to eat", cta: "— would ₹199 be worth it?" },
              { icon: "💪", bold: "help you wake up 90 days from now genuinely proud of your body — and mean it", cta: "— what would that moment be worth to you?" },
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

      {/* ══ 4f. TESTIMONIALS — Working professionals who made it work ════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">Real Results</p>
            <h2 className="duc-h2 duc-section-title mb-3">Working professionals who made it work</h2>
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
          <div className="flex justify-center mt-10">
            <CTA label="I Want Results Like These →" sub="One-time ₹199 · Instant E-Book download · 7-day money-back guarantee" />
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
                  <p className="font-serif italic leading-snug" style={{ fontSize: 13, color: "#92400e" }}>&ldquo;Hi 👋 I wrote this!&rdquo;</p>
                </div>
                <div className="polaroid tilt-left">
                  <div className="aspect-square rounded-sm overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/rohan.png" alt="Rohan — Author" className="w-full h-full object-cover object-top" />
                  </div>
                  <p className="text-center font-serif text-xl italic text-foreground mt-3">Rohan</p>
                  <p className="text-center text-foreground-subtle mt-0.5" style={{ fontSize: 12 }}>Author, Slim &amp; Strong</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <p className="duc-label mb-3">👋 The author</p>
              <h2 className="duc-h2 mb-5" style={{ color: "#18181b" }}>
                I wrote this because<br />
                <span style={{ fontStyle: "italic", fontWeight: 400, color: "#71717a" }}>I was the problem I was trying to solve.</span>
              </h2>
              <div className="space-y-4 duc-body">
                <p>I was the person who <strong style={{ color: "#18181b" }}>knew everything about losing weight and did none of it.</strong> 47 saved recipes. Three abandoned diet apps. Every Monday was &ldquo;the Monday I&apos;d finally start.&rdquo;</p>
                <p>I wasn&apos;t lazy. My plans were always too big to survive real life.</p>
              </div>
              <div className="my-5 pl-4 py-1" style={{ borderLeft: "3px solid #d4a017" }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#18181b", fontStyle: "italic", lineHeight: 1.65 }}>
                  &ldquo;BJ Fogg&apos;s Stanford research changed everything: the people who lost weight and kept it off made each habit so small it was <em>impossible to fail</em>. I tested it on myself — one tiny fat-loss habit a day, under 5 minutes. Ninety days later the weight was gone, and it stayed gone.&rdquo;
                </p>
              </div>
              <p className="duc-body">I put that exact 90-day system into <strong style={{ color: "#18181b" }}>Slim &amp; Strong</strong>. <strong style={{ color: "#18181b" }}>2,800+ readers</strong> have followed it since — and reported changes they couldn&apos;t believe.</p>
              <div className="mt-5 flex items-center gap-3">
                <p className="font-serif italic text-xl" style={{ color: "#a8790d" }}>— Rohan</p>
                <span className="w-8 h-px" style={{ background: "#e2dfd6" }} />
                <p style={{ fontSize: 13, color: "#71717a" }}>Author, Slim &amp; Strong</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 13. GUARANTEE ════════════════════════════════════════════════════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="rounded-2xl premium-card p-7 sm:p-10 border-glow relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full" style={{ background: "rgba(212,160,23,0.07)" }} aria-hidden="true" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.2)", fontSize: 26 }}>🛡️</div>
                <div>
                  <p className="duc-label mb-1">7-day money-back guarantee promise</p>
                  <h2 className="duc-h2" style={{ color: "#18181b" }}>You have nothing to lose.</h2>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { icon: "🔒", t: "One-time payment", b: "₹199 once. No subscription, no hidden charges." },
                  { icon: "⚡", t: "Instant delivery", b: "Download the E-Book the moment you pay." },
                  { icon: "📞", t: "No pressure calls", b: "No one will call to upsell you. Ever." },
                  { icon: "↩️", t: "7-day refund", b: "Not for you? Message me for a full refund." },
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
                  <span style={{ fontSize: 24 }} className="shrink-0">🤝</span>
                  <div>
                    <p className="duc-label mb-1.5">Rohan&apos;s personal commitment</p>
                    <p style={{ fontSize: 14, fontStyle: "italic", color: "#18181b", lineHeight: 1.65 }}>
                      &ldquo;Read the guide and give the plan a real try. If you don&apos;t feel it&apos;s worth every rupee within 7 days — message me directly. I&apos;ll refund your ₹199, no questions asked.&rdquo;
                    </p>
                    <p className="mt-2" style={{ fontSize: 12, color: "#71717a" }}>— Rohan, Author</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p style={{ fontSize: 14, color: "#71717a", marginBottom: 20 }}>
                  Worst case: you spend an evening reading, pick up 1–2 habits that stick for life, and get your ₹199 back.
                </p>
                <CTA label="Yes — I Have Nothing to Lose →" sub="One-time ₹199 · Instant E-Book download · 7-day money-back guarantee" />
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
              { q: "What exactly is Slim & Strong?", a: "It's a complete 90-Day Weight Loss Guide delivered as a E-Book. Inside you get 90 daily fat-loss habits, done-for-you Indian meal plans, no-gym home workouts, and a printable 90-day progress tracker — everything you need to lose weight, all in one place." },
              { q: "How do I get the guide after paying?", a: "The moment your ₹199 payment goes through, you get instant access to download the E-Book. Save it to your phone or laptop and open it anytime — no app, no login, lifetime access." },
              { q: "Is this a subscription? Will I be charged again?", a: "No. It's a one-time payment of ₹199. There's no monthly fee, no auto-renewal, and nothing else to pay. You buy it once and it's yours forever." },
              { q: "Do I need a gym or any equipment?", a: "No. The workouts inside are all no-gym, bodyweight routines you can do at home with zero equipment. The meal plans use everyday Indian food — no special ingredients." },
              { q: "How much weight can I lose?", a: "Results vary from person to person, but readers who follow the 90-day plan consistently typically see steady, sustainable fat loss week after week. The plan is built around habits that compound — small daily wins that add up." },
              { q: "Is the guide suitable for beginners?", a: "Absolutely. It's designed for busy people who are just getting started. Every habit takes under 5 minutes, every meal is planned for you, and the workouts are beginner-friendly with clear steps." },
              { q: "Is it veg or non-veg?", a: "Both. The meal plans include vegetarian and non-vegetarian options with easy swaps, so you can follow the plan whatever your diet." },
              { q: "What if it's not for me?", a: "You're covered by a 7-day money-back guarantee. Read the guide, try the plan, and if it's not right for you, message within 7 days for a full refund. You risk nothing." },
            ].map(({ q, a }) => <FAQ key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* ══ 15. FINAL CLOSE ═════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 lg:py-28" style={{ background: "#18181b" }}>
        <div className="absolute inset-0 sparkle-bg pointer-events-none opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(212,160,23,0.08),transparent 70%)" }} />
        <div className="max-w-xl mx-auto px-6 text-center relative">
          <p style={{ fontSize: 44 }} className="mb-5">📗</p>
          <p className="duc-label mb-3" style={{ color: "#a8790d" }}>Start Tonight</p>
          <h2 className="duc-h1 mb-5" style={{ color: "#fff" }}>
            90 days from now, you&apos;ll wish<br />
            <span style={{ color: "#a8790d" }}>you started today.</span>
          </h2>
          <p style={{ fontSize: 16, color: "#a1a1aa", lineHeight: 1.75, marginBottom: 32 }}>
            ₹199. One time. 90 habits. 3 areas of your life. Instant E-Book download. Start Day 1 tonight.
          </p>
          <CTA label="Get Slim & Strong — ₹199 →" sub="Secure payment · Instant download · 7-day money-back guarantee" />
          <p className="mt-5" style={{ fontSize: 13, color: "#52525b" }}>
            Questions?{" "}
            <a href="https://wa.me/918956146485?text=Hi%2C+I+have+a+question+about+the+Slim+%26+Strong+guide" className="underline" style={{ color: "#a8790d" }}>Chat with Rohan on WhatsApp</a>
          </p>
          <div className="mt-10 rounded-xl p-6 text-left" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.75 }}>
              <strong style={{ color: "#e4e4e7" }}>P.S.</strong> — The cost of doing nothing is not ₹0. Every month you spend feeling heavy, low on energy, or saying &ldquo;I&apos;ll start next week&rdquo; has a real cost — in how you feel, how you look, and how you live. The guide costs ₹199, once. The real question isn&apos;t whether ₹199 is worth it. It&apos;s: how long do you want to keep waiting?
            </p>
          </div>
        </div>
      </section>

      <footer className="px-5 py-6 text-center" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p style={{ fontSize: 12, color: "#52525b" }}>
          © {new Date().getFullYear()} Slim &amp; Strong ·{" "}
          <a href="https://www.highperformanceclub.co" className="underline" style={{ color: "#3f3f46" }}>highperformanceclub.co</a>
        </p>
        <p style={{ fontSize: 12, color: "#3f3f46", marginTop: 4 }}>One-time ₹199 · Instant E-Book download · 7-day money-back guarantee</p>
      </footer>

      <StickyBottomCTA />
      <LiveToast />
      <TrialPopup />
    </div>
  );
}
