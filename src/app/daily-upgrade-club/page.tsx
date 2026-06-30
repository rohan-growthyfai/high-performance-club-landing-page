"use client";
import { useState, useEffect, useRef } from "react";
import IPhoneFrame from "@/components/IPhoneFrame";

const JOIN_URL = "https://rzp.io/l/daily-upgrade-club";

// ─── Icons ───────────────────────────────────────────────────────────────────
function WAIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#25d366" />
      <path d="M22.94 9.06A9.75 9.75 0 0 0 16 6.25C10.89 6.25 6.75 10.39 6.75 15.5c0 1.63.43 3.21 1.24 4.62L6.6 25.4l5.42-1.42a9.75 9.75 0 0 0 4.97 1.37c5.11 0 9.25-4.14 9.25-9.25a9.2 9.2 0 0 0-3.3-7.04Zm-6.94 14.2a8.1 8.1 0 0 1-4.12-1.12l-.3-.17-3.06.8.82-2.98-.2-.31A8.1 8.1 0 0 1 7.9 15.5c0-4.47 3.63-8.1 8.1-8.1a8.1 8.1 0 0 1 8.1 8.1c0 4.47-3.63 8.1-8.1 8.1Zm4.44-6.07c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06a6.57 6.57 0 0 1-1.93-1.19 7.24 7.24 0 0 1-1.34-1.66c-.14-.24-.01-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" fill="#fff" />
    </svg>
  );
}
function Star() {
  return <svg width="13" height="13" viewBox="0 0 20 20" fill="#f59e0b" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
}
function Check({ green }: { green?: boolean }) {
  return <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0"><circle cx="10" cy="10" r="10" fill={green ? "#1da851" : "#e4e4e7"} />{green ? <path d="M6 10l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /> : <path d="M7 7l6 6M13 7l-6 6" stroke="#a1a1aa" strokeWidth="1.8" strokeLinecap="round" />}</svg>;
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
function CTA({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <a href={JOIN_URL} target="_blank" rel="noopener noreferrer"
        className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white text-sm sm:text-base"
        style={{ boxShadow: "0 6px 24px rgba(37,211,102,0.40)" }}>
        <WAIcon size={16} />{label}<span>→</span>
      </a>
      {sub && <p className="text-xs text-center" style={{ color: "#71717a" }}>{sub}</p>}
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────
function SH({ eyebrow, h, sub, center = true }: { eyebrow?: string; h: React.ReactNode; sub?: string; center?: boolean }) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      {eyebrow && <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#25d366", letterSpacing: "0.16em" }}>{eyebrow}</p>}
      <h2 className="font-bold text-balance leading-tight mb-3" style={{ fontSize: "clamp(1.5rem,3.5vw,2.25rem)", letterSpacing: "-0.02em", color: "#18181b" }}>{h}</h2>
      {sub && <p className="text-sm leading-relaxed max-w-xl mx-auto" style={{ color: "#71717a" }}>{sub}</p>}
    </div>
  );
}

// ─── WA chat primitives ───────────────────────────────────────────────────────
function WAChatBg({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#efeae2", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath fill='%23000000' fill-opacity='0.03' d='M0 0h20v20H0V0zm20 20h20v20H20V20z'/%3E%3C/svg%3E\")", padding: "10px 8px 8px", minHeight: 320 }}>
      {children}
    </div>
  );
}
function WAIn({ title, lines, time }: { title: string; lines: string[]; time: string }) {
  return (
    <div style={{ display: "flex", paddingLeft: 6, marginBottom: 8 }}>
      <div style={{ background: "#fff", borderRadius: "8px 8px 8px 0", padding: "8px 10px", maxWidth: "90%", position: "relative", boxShadow: "0 1px 2px rgba(0,0,0,0.08)" }}>
        <div style={{ position: "absolute", bottom: 0, left: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #fff transparent" }} />
        {title && <p style={{ margin: 0, color: "#111b21", fontSize: 11, fontWeight: 700, lineHeight: 1.4 }}>{title}</p>}
        {lines.map((l, i) => l ? <p key={i} style={{ margin: "3px 0 0", color: "#111b21", fontSize: 10.5, lineHeight: 1.5 }}>{l}</p> : <div key={i} style={{ height: 4 }} />)}
        <p style={{ margin: "4px 0 0", color: "#667781", fontSize: 9, textAlign: "right" }}>{time} ✓✓</p>
      </div>
    </div>
  );
}
function WAOut({ text, time }: { text: string; time: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: 6, marginBottom: 4 }}>
      <div style={{ background: "#d9fdd3", borderRadius: "8px 8px 0 8px", padding: "7px 10px", maxWidth: "60%", position: "relative" }}>
        <div style={{ position: "absolute", bottom: 0, right: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #d9fdd3 transparent" }} />
        <p style={{ margin: 0, color: "#111b21", fontSize: 10.5 }}>{text}</p>
        <p style={{ margin: "2px 0 0", color: "#667781", fontSize: 9, textAlign: "right" }}>{time} <span style={{ color: "#53bdeb" }}>✓✓</span></p>
      </div>
    </div>
  );
}
function WADateSep({ label }: { label: string }) {
  return (
    <div style={{ textAlign: "center", margin: "5px 0 7px" }}>
      <span style={{ fontSize: 9.5, color: "#667781", background: "rgba(255,255,255,0.85)", padding: "2px 8px", borderRadius: 20 }}>{label}</span>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: "#e2dfd6" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left font-semibold bg-white hover:bg-stone-50 transition-colors" style={{ color: "#18181b", fontSize: 13 }}>
        {q}
        <span className="shrink-0 text-lg font-light" style={{ color: "#25d366", display: "inline-block", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
      </button>
      {open && <div className="px-4 pb-4 text-xs leading-relaxed bg-white" style={{ color: "#71717a" }}>{a}</div>}
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
        <a href={JOIN_URL} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between gap-3 rounded-2xl px-5 py-3" style={{ background: "linear-gradient(135deg,#1da851,#25d366)", boxShadow: "0 4px 20px rgba(37,211,102,0.4)" }}>
          <div><p className="text-white font-black text-sm leading-tight">Start My Trial — ₹1 →</p><p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.8)" }}>Then ₹99/month · Cancel anytime</p></div>
          <div className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}><WAIcon size={15} /><span className="text-white font-bold text-sm">Join</span></div>
        </a>
      </div>
      <div className="hidden md:block px-6 pb-4 pt-3" style={{ background: "linear-gradient(to top,#faf8f3 70%,transparent)", backdropFilter: "blur(8px)" }}>
        <div className="max-w-lg mx-auto">
          <a href={JOIN_URL} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between gap-4 rounded-2xl px-6 py-3.5" style={{ background: "linear-gradient(135deg,#1da851,#25d366)", boxShadow: "0 4px 20px rgba(37,211,102,0.4)" }}>
            <div><p className="text-white font-black text-sm leading-tight">Start My 7-Day Trial — ₹1 →</p><p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.8)" }}>Then ₹99/month · Cancel anytime before Day 7</p></div>
            <div className="flex items-center gap-2 rounded-xl px-4 py-2 shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}><WAIcon size={16} /><span className="text-white font-bold text-sm">Join Now</span></div>
          </a>
        </div>
      </div>
    </div>
  );
}

function BackToTop() {
  const [v, setV] = useState(false);
  useEffect(() => { const f = () => setV(window.scrollY > 500); window.addEventListener("scroll", f, { passive: true }); f(); return () => window.removeEventListener("scroll", f); }, []);
  return (
    <button type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-20 right-3 z-50 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 cursor-pointer ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      style={{ background: "linear-gradient(135deg,#1da851,#25d366)", boxShadow: "0 4px 14px rgba(37,211,102,0.45)" }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 4l-8 8h5v8h6v-8h5z" /></svg>
    </button>
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
    <div className="fixed left-2 z-40 flex flex-col gap-2 pointer-events-none bottom-[76px] md:bottom-[68px]" aria-live="polite">
      {toasts.map((t, i) => (
        <div key={t.id} className="pointer-events-auto" style={{ opacity: i === 0 ? 1 : 0.65 - i * 0.15, transform: `scale(${1 - i * 0.03})`, transformOrigin: "bottom left", animation: "duc-fadein 0.3s ease" }}>
          <div className="flex items-center gap-2 rounded-2xl px-3 py-2 w-[240px]" style={{ background: "#fff", border: "1px solid #e2dfd6", boxShadow: "0 4px 16px rgba(0,0,0,0.09)" }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ background: `hsl(${(t.name.charCodeAt(0) * 37) % 360},55%,48%)` }}>{t.name[0]}</div>
            <div className="flex-1 min-w-0">
              <p className="font-bold leading-snug truncate" style={{ fontSize: 11, color: "#18181b" }}>{t.name} from {t.city}</p>
              <p className="leading-snug mt-0.5" style={{ fontSize: 10, color: "#71717a" }}>joined Daily Upgrade Club · {t.time}</p>
            </div>
            <span className="relative flex w-2 h-2 shrink-0"><span className="absolute inline-flex w-full h-full rounded-full animate-ping opacity-75" style={{ background: "#25d366" }} /><span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: "#25d366" }} /></span>
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
      try { if (localStorage.getItem("duc_pop") === "1") return; } catch { /**/ }
      shown.current = true; setVisible(true);
    }, 15000);
    return () => clearTimeout(t);
  }, []);
  const dismiss = () => { setVisible(false); setDismissed(true); try { localStorage.setItem("duc_pop", "1"); } catch { /**/ } };
  if (!visible || dismissed) return null;
  return (
    <>
      <div className="fixed inset-0 z-[100]" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }} onClick={dismiss} />
      <div className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-sm rounded-3xl overflow-hidden" onClick={e => e.stopPropagation()} style={{ background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.22)", animation: "duc-fadein 0.35s ease" }}>
          <div className="relative px-6 pt-7 pb-5 text-center" style={{ background: "linear-gradient(135deg,#1da851,#25d366)" }}>
            <button onClick={dismiss} className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full cursor-pointer" style={{ background: "rgba(255,255,255,0.2)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>
            </button>
            <p className="text-3xl mb-2">🌱</p>
            <h2 className="text-white font-black text-lg leading-snug">Still thinking about it?</h2>
            <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.9)" }}>7 days · 1 tiny healthy habit/day · WhatsApp · ₹1</p>
          </div>
          <div className="px-5 py-5 text-center">
            <div className="flex flex-col gap-1.5 mb-4 text-left">
              {["Under 5 min a day", "One WhatsApp message per morning", "Cancel before Day 7 — pay ₹0 more"].map(t => (
                <div key={t} className="flex items-center gap-2" style={{ fontSize: 12, color: "#4a4a52" }}><Check green />{t}</div>
              ))}
            </div>
            <a href={JOIN_URL} target="_blank" rel="noopener noreferrer" onClick={dismiss} className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-black text-white text-sm btn-primary">
              <WAIcon size={16} />Yes — Start My Trial for ₹1 →
            </a>
            <button onClick={dismiss} className="mt-2.5 text-xs cursor-pointer" style={{ color: "#a1a1aa" }}>No thanks</button>
          </div>
        </div>
      </div>
    </>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGE
// ═════════════════════════════════════════════════════════════════════════════
export default function DailyUpgradeClubPage() {
  return (
    <div id="duc-top" style={{ background: "#faf8f3", minHeight: "100vh", fontFamily: "var(--font-sans),-apple-system,BlinkMacSystemFont,sans-serif", color: "#18181b", fontSize: 14 }}>
      <style>{`
        @keyframes duc-fadein{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .duc-h1{font-size:clamp(1.9rem,4.5vw,3rem);font-weight:900;line-height:1.1;letter-spacing:-0.025em}
        .duc-h2{font-size:clamp(1.4rem,3vw,2rem);font-weight:800;line-height:1.15;letter-spacing:-0.02em}
        .duc-body{font-size:clamp(0.82rem,1.5vw,0.95rem);line-height:1.65;color:#4a4a52}
      `}</style>

      {/* ══ 1. HERO ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden mesh-bg" style={{ borderBottom: "1px solid #e2dfd6" }}>
        <span className="emoji-deco float-1 top-14 left-5 text-2xl hidden lg:block" aria-hidden="true">✨</span>
        <span className="emoji-deco float-2 top-8 right-8 text-2xl hidden lg:block" aria-hidden="true">🌿</span>

        <div className="max-w-6xl mx-auto px-5 lg:px-10 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* LEFT */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-bold uppercase tracking-widest accent-pill animate-fade-up">
                <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ background: "#25d366" }} />
                Daily Upgrade Club · WhatsApp
              </div>

              {/* HOOK — Brunson: interrupt the pattern first */}
              <h1 className="duc-h1 text-foreground animate-fade-up delay-100 mb-4">
                You already know<br />
                <span className="gradient-text">what a healthy life looks like.</span><br />
                <span style={{ fontStyle: "italic", fontWeight: 400, color: "#71717a", fontSize: "0.7em" }}>So why is it still not happening?</span>
              </h1>

              <p className="duc-body animate-fade-up delay-200 mb-6 max-w-lg mx-auto lg:mx-0">
                Every morning at <strong style={{ color: "#18181b" }}>7 AM</strong>, one tiny healthy habit lands in your WhatsApp.
                You do it in under 5 minutes. You reply <strong style={{ color: "#18181b" }}>DONE</strong>. That&apos;s your health done for the day.
              </p>

              {/* Visual: 3 trust chips */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6 animate-fade-up delay-200">
                {["📲 No app needed", "⏱️ Under 5 min/day", "🎯 One monthly theme", "💰 Starts at ₹1"].map(t => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ background: "#fff", color: "#18181b", border: "1px solid #e2dfd6", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>{t}</span>
                ))}
              </div>

              <div className="animate-fade-up delay-300 flex flex-col items-center lg:items-start gap-1.5 mb-8">
                <a href={JOIN_URL} target="_blank" rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-black text-white text-sm sm:text-base"
                  style={{ boxShadow: "0 8px 28px rgba(37,211,102,0.42)" }}>
                  <WAIcon size={18} />Start My 7-Day Trial — ₹1<span>→</span>
                </a>
                <p className="text-xs" style={{ color: "#71717a" }}>7 days for ₹1 · Then ₹99/month · Cancel anytime before Day 7</p>
              </div>

              {/* 3 micro-testimonials */}
              <div className="animate-fade-up delay-400 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x" style={{ borderColor: "#e2dfd6" }}>
                {[
                  { name: "Karan M., Pune", text: "No 3 PM energy crash by Day 5." },
                  { name: "Priya T., Bengaluru", text: "Sleeping 45 min more. Tracked it." },
                  { name: "Amit D., Delhi", text: "Zero bloating after 3 weeks." },
                ].map(r => (
                  <div key={r.name} className="flex flex-col gap-1 px-0 sm:px-4 py-2.5 sm:py-2 first:sm:pl-0 last:sm:pr-0 text-center lg:text-left">
                    <div className="flex gap-0.5 justify-center lg:justify-start">{[1,2,3,4,5].map(i=><Star key={i}/>)}</div>
                    <p className="text-xs leading-relaxed" style={{ color: "#4a4a52" }}>&ldquo;{r.text}&rdquo;</p>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "#18181b" }}>{r.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — iPhone */}
            <div className="lg:col-span-5 flex flex-col items-center gap-4 animate-fade-up delay-200">
              <div className="relative">
                <div className="absolute -top-3 -right-3 z-10 rounded-xl px-2.5 py-2 text-center" style={{ background: "#fff", border: "1px solid #e2dfd6", boxShadow: "0 6px 20px rgba(0,0,0,0.1)" }}>
                  <div className="flex gap-0.5 justify-center mb-0.5">{[1,2,3,4,5].map(i=><Star key={i}/>)}</div>
                  <p style={{ fontSize: 11, fontWeight: 800, color: "#18181b" }}>400+ members</p>
                </div>
                <IPhoneFrame contactName="Daily Upgrade Club" contactStatus="online" width={256}>
                  <WAChatBg>
                    <WADateSep label="⚡ Energy Month · Day 3" />
                    <WAIn title="⚡ Day 3 — Morning Sunlight" lines={["Good morning! Step outside for 5 min of natural sunlight within 30 min of waking.", "Why: Resets your cortisol rhythm. Controls energy all day.", "Reply DONE when you're back 💪"]} time="7:01 AM" />
                    <WAOut text="✅ DONE — felt great!" time="7:09 AM" />
                    <WAIn title="" lines={["🔥 Day 3 streak! See you tomorrow."]} time="7:10 AM" />
                  </WAChatBg>
                </IPhoneFrame>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. STATS BAR ═══════════════════════════════════════════════════════ */}
      <section style={{ background: "#18181b", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-4xl mx-auto px-5 py-4 grid grid-cols-2 sm:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
          {[["400+","Active Members"],["78%","Completion Rate"],["₹3/day","After Trial"],["5 min","Per Day Max"]].map(([v,l]) => (
            <div key={l} className="text-center py-3 px-2" style={{ background: "#18181b" }}>
              <p className="font-black text-xl sm:text-2xl" style={{ color: "#25d366" }}>{v}</p>
              <p style={{ fontSize: 11, color: "#71717a" }}>{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 3. WHAT IS DUC — visual-first ═══════════════════════════════════════ */}
      <section className="bg-section-white py-14 lg:py-20">
        <div className="max-w-5xl mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            <div className="lg:col-span-6">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#25d366" }}>What exactly is this?</p>
              <h2 className="duc-h2 mb-4" style={{ color: "#18181b" }}>
                A WhatsApp subscription that<br />
                <span className="gradient-text">does the habit for you.</span>
              </h2>
              <p className="duc-body mb-6">
                Not a course. Not an app. Not a challenge.<br />
                A system that <strong style={{ color: "#18181b" }}>shows up every morning</strong> so you don&apos;t have to rely on memory or motivation.
              </p>

              {/* Visual 3-step flow */}
              <div className="flex flex-col gap-3">
                {[
                  { n: "1", icon: "🌅", bold: "7 AM", text: "One tiny healthy habit lands on WhatsApp" },
                  { n: "2", icon: "✅", bold: "You do it", text: "Under 5 minutes. Any time of day." },
                  { n: "3", icon: "💬", bold: "Reply DONE", text: "Streak updated. Tomorrow queued. Done." },
                ].map(s => (
                  <div key={s.n} className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: "#f8f8f6", border: "1px solid #e2dfd6" }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0" style={{ background: "linear-gradient(135deg,#1da851,#25d366)" }}>{s.n}</div>
                    <span className="text-xl">{s.icon}</span>
                    <p style={{ fontSize: 13, color: "#18181b" }}><strong>{s.bold}</strong> — {s.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-center lg:justify-start">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border text-xs font-semibold" style={{ borderColor: "#e2dfd6", color: "#71717a" }}>🔁 Repeat 30 days. That&apos;s the whole system.</span>
              </div>
            </div>

            {/* At-a-glance card */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border p-5 sm:p-6" style={{ background: "#f0fdf4", borderColor: "rgba(37,211,102,0.22)", boxShadow: "0 6px 24px rgba(37,211,102,0.07)" }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#1da851" }}>At a glance</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "📲", label: "Delivery", val: "WhatsApp only" },
                    { icon: "⏰", label: "Timing", val: "7 AM every day" },
                    { icon: "⏱️", label: "Time needed", val: "Under 5 min" },
                    { icon: "📅", label: "Cadence", val: "1 habit/day" },
                    { icon: "🎯", label: "Focus", val: "1 theme/month" },
                    { icon: "👥", label: "Community", val: "Private WA group" },
                    { icon: "📊", label: "Tracking", val: "Weekly scorecard" },
                    { icon: "💰", label: "Price", val: "₹1 → ₹99/month" },
                  ].map(({ icon, label, val }) => (
                    <div key={label} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5" style={{ background: "#fff", border: "1px solid rgba(37,211,102,0.12)" }}>
                      <span className="text-base">{icon}</span>
                      <div>
                        <p style={{ fontSize: 10, color: "#71717a", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
                        <p style={{ fontSize: 12, fontWeight: 700, color: "#18181b" }}>{val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4. PAIN POINTS — Brunson "Does this sound like you?" ════════════════ */}
      <section className="bg-section-cream py-14 lg:py-20">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#25d366" }}>Be honest with yourself</p>
            <h2 className="duc-h2 mb-2" style={{ color: "#18181b" }}>Does this sound like you?</h2>
            <p className="duc-body max-w-sm mx-auto">If you nodded at even two of these, this was built for you.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: "😮‍💨", text: "You know what's healthy — but can't make it stick when life gets busy." },
              { icon: "🔄", text: "You start motivated, drop it by Day 4, and restart \"next Monday\"." },
              { icon: "😵", text: "You try fixing diet, gym, and sleep all at once — and end up doing none." },
              { icon: "🤷", text: "No accountability. The moment motivation dips, the habit disappears." },
              { icon: "⏰", text: "A 1-hour wellness routine isn't realistic. But doing nothing feels wrong." },
              { icon: "📱", text: "You've downloaded the apps, bought the courses, bookmarked the articles." },
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-3 bg-white border rounded-xl px-4 py-3.5 shadow-sm" style={{ borderColor: "#e2dfd6" }}>
                <span className="text-xl shrink-0">{p.icon}</span>
                <p className="duc-body">{p.text}</p>
              </div>
            ))}
          </div>
          {/* Brunson reframe — "It's not your fault, it's the vehicle" */}
          <div className="mt-8 rounded-2xl p-5 text-center" style={{ background: "linear-gradient(135deg,rgba(37,211,102,0.08),rgba(29,168,81,0.04))", border: "1px solid rgba(37,211,102,0.18)" }}>
            <p className="font-bold" style={{ fontSize: 15, color: "#18181b" }}>This isn&apos;t a discipline problem.</p>
            <p className="duc-body mt-1">It&apos;s a <strong style={{ color: "#1da851" }}>system problem</strong>. The right system makes discipline irrelevant.</p>
          </div>
        </div>
      </section>

      {/* ══ 5. BEFORE → AFTER ═════════════════════════════════════════════════ */}
      <section className="bg-section-white py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#25d366" }}>The shift</p>
            <h2 className="duc-h2 mb-2" style={{ color: "#18181b" }}>Today <span style={{ color: "#25d366" }}>→</span> After 30 Days</h2>
            <p className="duc-body max-w-sm mx-auto">Same you. Same life. A completely different baseline.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Before */}
            <div className="rounded-2xl border p-5" style={{ background: "#fafafa", borderColor: "#e4e4e7" }}>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: "#fee2e2", color: "#991b1b", border: "1px solid #fca5a5" }}>Day 0 — Today</div>
              <div className="flex flex-col gap-2.5">
                {["Low energy by 2 PM every day","Can't fall asleep — mind still racing","Bloating and gut issues that linger","Good intentions. Zero follow-through.","Stressed and reactive all morning","\"I'll start properly on Monday\""].map((b, i) => (
                  <div key={i} className="flex items-center gap-2.5"><Check /><span className="duc-body">{b}</span></div>
                ))}
              </div>
            </div>
            {/* After */}
            <div className="rounded-2xl border-2 p-5 relative overflow-hidden" style={{ background: "#f0fdf4", borderColor: "rgba(37,211,102,0.35)" }}>
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full" style={{ background: "rgba(37,211,102,0.08)" }} aria-hidden="true" />
              <div className="relative">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-4 badge-after">After 30 Days</div>
                <div className="flex flex-col gap-2.5">
                  {["Steady energy through the whole day","Falling asleep faster. Waking up rested.","Lighter digestion. No bloating.","One habit done daily — automatically.","Calmer, in control of your mornings.","You already started. And you kept going."].map((a, i) => (
                    <div key={i} className="flex items-center gap-2.5"><Check green /><span className="duc-body" style={{ color: "#18181b", fontWeight: 500 }}>{a}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <CTA label="Start My 7-Day Trial — ₹1" sub="7 days for ₹1 · Then ₹99/month · Cancel anytime" />
          </div>
        </div>
      </section>

      {/* ══ 6. THE 8 MONTHLY THEMES — visual grid ════════════════════════════ */}
      <section className="bg-section-cream py-14 lg:py-20">
        <div className="max-w-5xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#25d366" }}>8 Monthly Themes</p>
            <h2 className="duc-h2 mb-2" style={{ color: "#18181b" }}>You pick the area. We send the habits.</h2>
            <p className="duc-body max-w-md mx-auto">One theme per month. 30 habits. Go deep — not wide.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { emoji: "😴", theme: "Sleep", color: "#6366f1", bg: "#eef2ff", border: "#c7d2fe", tagline: "Fall asleep faster", habits: ["Phone outside bedroom","Wind-down breathing","Cold room trigger","No caffeine after 2"] },
              { emoji: "⚡", theme: "Energy", color: "#d97706", bg: "#fffbeb", border: "#fde68a", tagline: "No 3 PM crash", habits: ["Morning sunlight 5 min","Cold water face splash","Protein-first breakfast","Stair walk after lunch"] },
              { emoji: "🧠", theme: "Focus", color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", tagline: "Sharper, deeper work", habits: ["1 priority each morning","Phone face-down at work","2-min task intention","Post-lunch walk"] },
              { emoji: "🌿", theme: "Gut Health", color: "#059669", bg: "#ecfdf5", border: "#6ee7b7", tagline: "Less bloating", habits: ["1 spoon curd at lunch","Chew 20 times","Warm water on waking","No screen while eating"] },
              { emoji: "🧘", theme: "Stress", color: "#db2777", bg: "#fdf2f8", border: "#f9a8d4", tagline: "Calmer, less reactive", habits: ["Box breathing at desk","2-min gratitude note","No phone first 10 min","10-min outdoor walk"] },
              { emoji: "💪", theme: "Fitness", color: "#ea580c", bg: "#fff7ed", border: "#fdba74", tagline: "Active without the gym", habits: ["10 pushups on waking","Stand every 45 min","Evening walk 20 min","1-min wall sit"] },
              { emoji: "💧", theme: "Hydration", color: "#0284c7", bg: "#f0f9ff", border: "#bae6fd", tagline: "More water, better all", habits: ["Water before coffee","Glass after toilet","3 PM hydration alarm","Track 8 glasses"] },
              { emoji: "❤️", theme: "Heart", color: "#dc2626", bg: "#fff1f2", border: "#fecaca", tagline: "Long-term strength", habits: ["5-min brisk walk","Handful of nuts daily","Deep breathing 3×/day","Sit less, stand more"] },
            ].map(({ emoji, theme, color, bg, border, tagline, habits }) => (
              <div key={theme} className="rounded-xl border-2 p-3.5 flex flex-col gap-2.5 hover:shadow-sm transition-shadow" style={{ background: bg, borderColor: border }}>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{emoji}</span>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 800, color }}>{theme}</p>
                    <p style={{ fontSize: 10, color: "#71717a" }}>{tagline}</p>
                  </div>
                </div>
                <div className="h-px" style={{ background: border }} />
                <div className="flex flex-col gap-1">
                  {habits.map(h => (
                    <div key={h} className="flex items-start gap-1">
                      <span style={{ fontSize: 9, color, flexShrink: 0, marginTop: 2 }}>→</span>
                      <p style={{ fontSize: 10, color: "#52525b", lineHeight: 1.4 }}>{h}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 text-center">
            <p className="text-xs" style={{ color: "#71717a" }}>📅 Pick your theme when you join. Switch every month — or stay on the same one. Your call.</p>
          </div>
        </div>
      </section>

      {/* ══ 7. REAL IPHONES — 3 themes ════════════════════════════════════════ */}
      <section className="bg-section-white py-14 lg:py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#25d366" }}>What lands in your WhatsApp</p>
            <h2 className="duc-h2 mb-2" style={{ color: "#18181b" }}>Real messages. Real days.</h2>
            <p className="duc-body max-w-sm mx-auto">Specific. Science-backed. Doable in under 5 minutes.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
            <div className="flex justify-center tilt-left">
              <IPhoneFrame contactName="Daily Upgrade Club" contactStatus="online" width={256}>
                <WAChatBg>
                  <WADateSep label="⚡ Energy · Day 3" />
                  <WAIn title="⚡ Day 3 habit:" lines={["🌞 Step outside for 5 min of natural sunlight within 30 min of waking.","Why: Resets cortisol rhythm. Controls energy all day.","Reply DONE 💪"]} time="7:01 AM" />
                  <WAOut text="✅ DONE — felt great!" time="7:08 AM" />
                  <WAIn title="" lines={["🔥 Day 3 streak! See you tomorrow."]} time="7:09 AM" />
                </WAChatBg>
              </IPhoneFrame>
            </div>
            <div className="flex justify-center">
              <IPhoneFrame contactName="Daily Upgrade Club" contactStatus="online" width={256}>
                <WAChatBg>
                  <WADateSep label="😴 Sleep · Day 11" />
                  <WAIn title="😴 Day 11 habit:" lines={["📵 Tonight — phone charger outside the bedroom.","Why: Blue light suppresses melatonin for 2 hours. Just removing the phone improves sleep quality.","Set a reminder for 9:30 PM. Reply DONE 🌙"]} time="7:01 AM" />
                  <WAOut text="✅ DONE — set the reminder" time="7:05 AM" />
                  <WAIn title="" lines={["🔥 Day 11! Most notice a difference in 3–5 nights."]} time="7:06 AM" />
                </WAChatBg>
              </IPhoneFrame>
            </div>
            <div className="flex justify-center tilt-right">
              <IPhoneFrame contactName="Daily Upgrade Club" contactStatus="online" width={256}>
                <WAChatBg>
                  <WADateSep label="🌿 Gut Health · Day 7" />
                  <WAIn title="🌿 Day 7 habit:" lines={["🥄 Add one spoon of plain curd (no sugar) to your lunch.","Why: Live cultures reduce bloating & improve digestion within 2 weeks.","Just one spoon. Reply DONE 🙌"]} time="7:01 AM" />
                  <WAOut text="✅ DONE — with dal rice" time="1:22 PM" />
                  <WAIn title="" lines={["Perfect 🙌 Day 7 complete! See you tomorrow."]} time="1:23 PM" />
                </WAChatBg>
              </IPhoneFrame>
            </div>
          </div>

          <p className="text-center mt-8 text-xs" style={{ color: "#71717a" }}>
            3 of 30 habits/month shown. Every habit: specific, explained, under 5 minutes.
          </p>
        </div>
      </section>

      {/* ══ 8. YOUR FIRST 7 DAYS ═══════════════════════════════════════════════ */}
      <section style={{ background: "#18181b" }} className="py-14 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 sparkle-bg pointer-events-none opacity-20" />
        <div className="max-w-4xl mx-auto px-5 lg:px-10 relative">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#25d366" }}>Your first 7 days</p>
            <h2 className="duc-h2 mb-2" style={{ color: "#fff" }}>Day by day — what actually happens</h2>
            <p style={{ fontSize: 13, color: "#a1a1aa" }}>Feel the difference by Day 7 or cancel — pay nothing more.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { day: "Day 1", emoji: "👋", title: "First habit arrives at 7 AM", feel: "\"That's it? That was easy.\"" },
              { day: "Day 2", emoji: "🔥", title: "Streak begins. You see others post DONE.", feel: "\"I&apos;m not doing this alone.\"" },
              { day: "Days 3–4", emoji: "⚡", title: "The habit starts feeling automatic", feel: "\"I'm already expecting it.\"" },
              { day: "Day 5", emoji: "✨", title: "First physical shift noticed", feel: "\"Something actually changed.\"" },
              { day: "Day 6", emoji: "🔔", title: "Trial reminder — cancel if you want", feel: "\"Full control. Zero pressure.\"" },
              { day: "Day 7", emoji: "🎯", title: "You make your decision", feel: "\"Most people don&apos;t cancel.\"" },
            ].map(({ day, emoji, title, feel }) => (
              <div key={day} className="rounded-xl p-4 flex gap-3 items-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-base shrink-0" style={{ background: "linear-gradient(135deg,#1da851,#25d366)", boxShadow: "0 3px 10px rgba(37,211,102,0.3)" }}>{emoji}</div>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, color: "#25d366", textTransform: "uppercase", letterSpacing: "0.08em" }}>{day}</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginTop: 1 }}>{title}</p>
                  <p style={{ fontSize: 11, color: "#71717a", marginTop: 2, fontStyle: "italic" }}>{feel}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <CTA label="Start Day 1 Tomorrow — ₹1" sub="Cancel before Day 7 · Pay nothing more" />
          </div>
        </div>
      </section>

      {/* ══ 9. ROHAN'S STORY — Brunson Attractive Character / Epiphany Bridge ═ */}
      <section className="bg-section-white py-16 lg:py-24 relative overflow-hidden">
        <span className="emoji-deco float-1 top-20 right-6 text-2xl hidden lg:block" aria-hidden="true">👋</span>
        <div className="max-w-5xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* Photo */}
            <div className="lg:col-span-4">
              <div className="relative max-w-xs mx-auto lg:mx-0">
                <div className="absolute -top-6 -right-3 z-20 sticky-note p-2.5 rounded-md tilt-right w-36 hidden sm:block">
                  <p className="font-serif italic text-xs leading-snug" style={{ color: "#92400e" }}>&ldquo;Hi 👋 I built this!&rdquo;</p>
                </div>
                <div className="polaroid tilt-left">
                  <div className="aspect-square rounded-sm overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/rohan.png" alt="Rohan — Founder, Daily Upgrade Club" className="w-full h-full object-cover object-top" />
                  </div>
                  <p className="text-center font-serif text-lg italic text-foreground mt-3">Rohan</p>
                  <p className="text-center text-xs text-foreground-subtle mt-0.5">Founder, Daily Upgrade Club</p>
                </div>
              </div>
            </div>

            {/* Epiphany Bridge copy — short, punchy, Brunson-style */}
            <div className="lg:col-span-8">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#25d366" }}>👋 The founder</p>
              <h2 className="duc-h2 mb-5" style={{ color: "#18181b" }}>
                I built this because<br />
                <span style={{ fontStyle: "italic", fontWeight: 400, color: "#71717a" }}>I needed it first.</span>
              </h2>

              {/* Brunson "False Belief #1" setup — their old story */}
              <div className="space-y-3 duc-body">
                <p>I was the person who <strong style={{ color: "#18181b" }}>knew everything about health and did none of it.</strong></p>
                <p>47 bookmarked articles. Three abandoned apps. Every Monday was "the Monday I'd finally start."</p>
                <p>I wasn&apos;t lazy. I was someone whose routines were always too big for real life.</p>
              </div>

              {/* Epiphany — the aha moment */}
              <div className="my-5 pl-4 py-1" style={{ borderLeft: "3px solid #25d366" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#18181b", fontStyle: "italic", lineHeight: 1.6 }}>
                  &ldquo;BJ Fogg&apos;s Stanford research changed how I saw this: the people who built lasting habits made each one <em>so small it was impossible to fail.</em>&rdquo;
                </p>
              </div>

              <div className="duc-body space-y-3">
                <p>I tested it on myself. One habit. Under 5 minutes. Sent to my WhatsApp at 7 AM. By Day 30, I was sleeping better, more energetic, and hadn&apos;t broken the streak once.</p>
                <p>I built Daily Upgrade Club to hand this system to you. <strong style={{ color: "#18181b" }}>400+ members</strong> have since done the same.</p>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <p className="font-serif italic text-lg" style={{ color: "#25d366" }}>— Rohan</p>
                <span className="w-8 h-px" style={{ background: "#e2dfd6" }} />
                <p className="text-xs" style={{ color: "#71717a" }}>Founder, Daily Upgrade Club</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 10. VALUE STACK — Brunson "The Stack" ══════════════════════════════ */}
      <section className="bg-section-cream py-14 lg:py-20">
        <div className="max-w-lg mx-auto px-5 lg:px-10">
          <div className="rounded-2xl border-2 bg-white overflow-hidden shadow-md" style={{ borderColor: "rgba(37,211,102,0.25)" }}>
            <div className="text-center px-6 pt-7 pb-4">
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#25d366" }}>Everything you get</p>
              <h2 className="duc-h2" style={{ color: "#18181b" }}>Your full membership</h2>
            </div>
            <div className="px-5 sm:px-8">
              {[
                { emoji: "📲", name: "Daily habit on WhatsApp (30/month)", value: "₹2,999" },
                { emoji: "🎯", name: "Monthly theme + 30-day habit calendar", value: "₹1,799" },
                { emoji: "📊", name: "Weekly health scorecard", value: "₹999" },
                { emoji: "👥", name: "Private WhatsApp accountability group", value: "₹999" },
                { emoji: "🗓️", name: "Monthly PDF guide — all 30 habits", value: "₹499" },
                { emoji: "🏆", name: "Full habit vault — 90+ habits forever", value: "₹999" },
                { emoji: "📩", name: "Weekly wellness newsletter", value: "₹199" },
              ].map(it => (
                <div key={it.name} className="flex items-center justify-between gap-3 py-3" style={{ borderTop: "1px solid #efece4" }}>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base shrink-0">{it.emoji}</span>
                    <span style={{ fontSize: 12, color: "#18181b" }}>{it.name}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#71717a", flexShrink: 0 }}>{it.value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-3 py-4 -mx-5 sm:-mx-8 px-5 sm:px-8 mt-2" style={{ borderTop: "2px solid #e2dfd6", background: "#fafafa" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.06em" }}>Total Value</span>
                <span className="font-black line-through" style={{ fontSize: 16, color: "#71717a" }}>₹8,493/month</span>
              </div>
            </div>

            {/* Brunson price cascade */}
            <div className="text-center px-5 sm:px-8 pt-5 pb-7">
              <div className="flex flex-col gap-1 mb-4">
                {["Not ₹8,493","Not ₹4,999","Not ₹299"].map(s => (
                  <p key={s} style={{ fontSize: 13, color: "#a1a1aa", textDecoration: "line-through" }}>{s}</p>
                ))}
              </div>
              <p className="font-black leading-none mb-1" style={{ fontSize: "clamp(4rem,10vw,6rem)", color: "#25d366", textShadow: "0 0 32px rgba(37,211,102,0.2)" }}>₹1</p>
              <p style={{ fontSize: 12, color: "#71717a" }} className="mb-5">for your first 7 days · then ₹99/month</p>
              <CTA label="Yes — Start My Trial for ₹1 →" sub="Cancel before Day 7 · Pay nothing more" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 11. 3 FALSE BELIEFS — Brunson core framework ═══════════════════════ */}
      <section className="bg-section-white py-14 lg:py-20">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#25d366" }}>Why you&apos;re still hesitating</p>
            <h2 className="duc-h2 mb-2" style={{ color: "#18181b" }}>3 beliefs that are holding you back</h2>
            <p className="duc-body max-w-sm mx-auto">And exactly why none of them should stop you today.</p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { n: "01", belief: "\"One tiny habit can't actually change my health.\"", truth: "A Stanford study found that habits done for 30 days straight rewire the brain. Members who started with just \"5 min of morning sunlight\" ended the month sleeping better and moving more — without being told to.", icon: "🧠" },
              { n: "02", belief: "\"I've tried this before. I always quit.\"", truth: "You quit because the habit was too big, not because you're broken. When it takes under 5 minutes and arrives automatically — you don't need motivation. Our members average 78% completion. First month.", icon: "🔄" },
              { n: "03", belief: "\"₹99/month feels risky if I don't use it.\"", truth: "That's why the trial is ₹1. You don't decide based on a description. You decide after 7 mornings of real habits. If nothing shifts — cancel. Pay nothing more. You risk ₹1. I risk my reputation.", icon: "💰" },
            ].map(({ n, belief, truth, icon }) => (
              <div key={n} className="rounded-xl overflow-hidden" style={{ border: "1px solid #e2dfd6" }}>
                <div className="flex items-start gap-3 px-4 py-3.5" style={{ background: "#fff7f7", borderBottom: "1px solid #fecaca" }}>
                  <span className="text-base shrink-0">{icon}</span>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.08em" }}>False Belief {n}</span>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", marginTop: 2 }}>{belief}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 px-4 py-3.5 bg-white">
                  <span className="text-base shrink-0">✅</span>
                  <p className="duc-body">{truth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 12. "IF ALL THIS DID WAS" — Brunson close ══════════════════════════ */}
      <section className="bg-section-cream py-14 lg:py-20">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#25d366" }}>Think about this</p>
            <h2 className="duc-h2 mb-2" style={{ color: "#18181b" }}>Any one of these alone would be worth it.</h2>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { icon: "⚡", bold: "give you steady energy to get through your day without needing caffeine every 2 hours", cta: "— would ₹1 to find out be worth it?" },
              { icon: "🔄", bold: "make you the person who actually follows through on their health — every month, not just January", cta: "— would ₹99/month be worth it?" },
              { icon: "🌱", bold: "help you wake up 6 months from now and say \"I'm genuinely taking care of myself\" — and mean it", cta: "— what would that be worth?" },
            ].map(({ icon, bold, cta }, i) => (
              <div key={i} className="rounded-xl px-5 py-4 bg-white flex gap-3 items-start shadow-sm" style={{ border: "1px solid #e2dfd6" }}>
                <span className="text-2xl shrink-0">{icon}</span>
                <p style={{ fontSize: 13, color: "#4a4a52", lineHeight: 1.6 }}>
                  <span style={{ color: "#a1a1aa" }}>If all this did was </span>
                  <strong style={{ color: "#18181b" }}>{bold}</strong>
                  <span style={{ color: "#71717a" }}> {cta}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 13. TESTIMONIALS ════════════════════════════════════════════════════ */}
      <section className="bg-section-white py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#25d366" }}>Wall of love 💛</p>
            <h2 className="duc-h2 mb-2" style={{ color: "#18181b" }}>Real people. Specific results.</h2>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {[
              { name: "Karan M.", city: "Pune", theme: "Energy Month", result: "No 3 PM crash · Day 5", text: "By Day 5, I stopped needing that 3 PM coffee hit. One morning habit literally changed my afternoon energy." },
              { name: "Priya T.", city: "Bengaluru", theme: "Sleep Month", result: "+45 min sleep · tracked", text: "I'm sleeping 45 minutes more per night — tracked on my phone. Nothing else changed." },
              { name: "Sneha R.", city: "Mumbai", theme: "Focus Month", result: "Cleared backlog · Day 12", text: "Day 12 — I finished a project I'd been avoiding for a month. My manager asked what changed." },
              { name: "Amit D.", city: "Delhi", theme: "Gut Health", result: "Zero bloating · 3 weeks", text: "Lifelong bloating. 3 weeks in, zero. My wife noticed before I did." },
              { name: "Ravi S.", city: "Hyderabad", theme: "Stress Month", result: "Calmer mornings · Day 8", text: "2-minute box breathing before meetings changed everything. I start controlled now, not stressed." },
              { name: "Meera K.", city: "Chennai", theme: "Energy Month", result: "Back to gym · Day 19", text: "The morning sunlight habit made me feel like a healthy person again. By Day 19 I was back at the gym." },
            ].map(({ name, city, theme, result, text }) => (
              <div key={name} className="break-inside-avoid mb-4 rounded-xl p-4 bg-white flex flex-col gap-2.5" style={{ border: "1px solid #e2dfd6", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                <div className="flex gap-0.5">{[1,2,3,4,5].map(i=><Star key={i}/>)}</div>
                <div className="px-2.5 py-1.5 rounded-lg text-xs font-bold" style={{ background: "rgba(37,211,102,0.1)", color: "#1da851" }}>📌 {result}</div>
                <p style={{ fontSize: 12.5, color: "#4a4a52", lineHeight: 1.6 }}>&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-2 pt-1.5" style={{ borderTop: "1px solid #f4f4f5" }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white shrink-0" style={{ fontSize: 10, background: `hsl(${(name.charCodeAt(0) * 37) % 360},55%,48%)` }}>{name[0]}</div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "#18181b" }}>{name} · {city}</p>
                    <p style={{ fontSize: 10, color: "#71717a" }}>{theme}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 14. GUARANTEE — Brunson risk reversal ══════════════════════════════ */}
      <section className="bg-section-cream py-14 lg:py-20">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <div className="rounded-2xl premium-card p-7 sm:p-10 border-glow relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full" style={{ background: "rgba(37,211,102,0.07)" }} aria-hidden="true" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0" style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.2)" }}>🛡️</div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#25d366" }}>Zero-risk promise</p>
                  <h2 className="duc-h2 mt-0.5" style={{ color: "#18181b" }}>You have nothing to lose.</h2>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: "🔒", t: "No hidden charges", b: "₹1 trial. ₹99/month. Nothing else." },
                  { icon: "📵", t: "No spam", b: "One WA message/morning. That's it." },
                  { icon: "📞", t: "No pressure calls", b: "No one will call to upsell you." },
                  { icon: "🚪", t: "One-tap cancel", b: "Reply STOP or cancel in Razorpay." },
                ].map(({ icon, t, b }) => (
                  <div key={t} className="flex items-start gap-2.5">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0" style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.15)" }}>{icon}</div>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "#18181b" }}>{t}</p>
                      <p style={{ fontSize: 11, color: "#71717a", marginTop: 1 }}>{b}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Personal commitment */}
              <div className="rounded-xl p-4 mb-6" style={{ background: "rgba(37,211,102,0.06)", border: "1px solid rgba(37,211,102,0.18)" }}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">🤝</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#25d366" }}>Rohan&apos;s personal commitment</p>
                    <p style={{ fontSize: 13, fontStyle: "italic", color: "#18181b", lineHeight: 1.6 }}>
                      &ldquo;Do all 7 days. If you don&apos;t feel a single shift — message me directly. I&apos;ll refund your ₹1 and spend 20 minutes with you personally figuring out why.&rdquo;
                    </p>
                    <p className="mt-1.5 text-xs" style={{ color: "#71717a" }}>— Rohan, Founder</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p style={{ fontSize: 13, color: "#71717a", marginBottom: 16 }}>
                  Worst case: 35 minutes over 7 days, 1–2 habits that stick for life, and you never hear from us again.
                </p>
                <CTA label="Yes — Start My 7-Day Trial for ₹1" sub="Cancel anytime before Day 7 · Pay nothing more" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 15. FAQ ═════════════════════════════════════════════════════════════ */}
      <section className="bg-section-white py-14 lg:py-20">
        <div className="max-w-2xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#25d366" }}>FAQ</p>
            <h2 className="duc-h2" style={{ color: "#18181b" }}>Every question answered</h2>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { q: "What exactly is a 'tiny healthy habit'?", a: "One specific, science-backed action under 5 minutes, tied to your monthly theme. E.g. 5 min morning sunlight (Energy), one spoon curd at lunch (Gut Health), phone outside bedroom (Sleep), box breathing before a meeting (Stress). Specific. Explained. Doable today." },
              { q: "What happens on Day 1?", a: "The morning after you join, at 7 AM, your first habit lands on WhatsApp. Read it, do it, reply DONE. Your streak starts. That's it." },
              { q: "How do I choose my monthly theme?", a: "After joining, you pick Sleep, Energy, Focus, Gut Health, Stress, Fitness, Hydration, or Heart Health. All 30 habits that month focus on that area. Switch next month or repeat." },
              { q: "What if I miss a day?", a: "Nothing bad happens. One missed day doesn't end your streak or subscription. You get a gentle evening nudge if you haven't replied by 8 PM." },
              { q: "What happens after 7 days?", a: "If you don't cancel before Day 7, ₹99/month begins. You'll get a Day 6 reminder so there's no surprise. Cancel anytime from Razorpay — one tap, no questions." },
              { q: "Do I need to download anything?", a: "No. Everything is on WhatsApp. Save our number, habits arrive every morning." },
              { q: "What does ₹99/month actually get me?", a: "30 daily WA habits, your chosen monthly theme + PDF guide, weekly health scorecard, private accountability group, full 90+ habit vault, and weekly wellness newsletter. Everything. Every month." },
              { q: "I've failed at habits before. Why will this be different?", a: "The habit arrives automatically — you don't have to remember or plan. And it's small enough that even on your worst day, 5 minutes is always possible. The system does the heavy lifting. You just reply DONE." },
            ].map(({ q, a }) => <FAQ key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* ══ 16. FINAL CLOSE — Brunson urgency + P.S. ═══════════════════════════ */}
      <section className="relative overflow-hidden py-16 lg:py-24" style={{ background: "#18181b" }}>
        <div className="absolute inset-0 sparkle-bg pointer-events-none opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(37,211,102,0.08),transparent 70%)" }} />
        <div className="max-w-xl mx-auto px-5 text-center relative">
          <p className="text-4xl mb-5">🌱</p>
          <h2 className="duc-h1 mb-4" style={{ color: "#fff" }}>
            One tiny healthy habit.<br />Tomorrow morning.<br />
            <span style={{ color: "#25d366" }}>On your WhatsApp.</span>
          </h2>
          <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.7, marginBottom: 28 }}>
            30 days from now, you could be the person who says<br />
            <em style={{ color: "#e4e4e7" }}>&ldquo;I&apos;m actually taking care of myself.&rdquo;</em><br /><br />
            Or you could keep planning to start next Monday.<br />
            <strong style={{ color: "#e4e4e7" }}>₹1 decides which one.</strong>
          </p>
          <CTA label="Yes — Start My Trial for ₹1 →" sub="7 days for ₹1 · Then ₹99/month · Cancel before Day 7" />
          <p className="text-xs mt-4" style={{ color: "#52525b" }}>
            Questions?{" "}
            <a href="https://wa.me/918956146485?text=Hi%2C+I+have+a+question+about+the+Daily+Upgrade+Club" className="underline" style={{ color: "#25d366" }}>Chat with Rohan on WhatsApp</a>
          </p>

          {/* Brunson P.S. */}
          <div className="mt-10 rounded-xl p-5 text-left" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p style={{ fontSize: 12.5, color: "#a1a1aa", lineHeight: 1.7 }}>
              <strong style={{ color: "#e4e4e7" }}>P.S.</strong> — The cost of doing nothing is not ₹0. Every month you spend feeling low energy, sleeping poorly, or saying &ldquo;I&apos;ll start next week&rdquo; has a real cost in how you feel and what you&apos;re capable of. The trial costs ₹1. The real question isn&apos;t whether ₹1 is worth it. It&apos;s: how long do you want to keep waiting?
            </p>
          </div>
        </div>
      </section>

      <footer className="px-5 py-6 text-center" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p style={{ fontSize: 11, color: "#52525b" }}>
          © {new Date().getFullYear()} Daily Upgrade Club ·{" "}
          <a href="https://www.highperformanceclub.co" className="underline" style={{ color: "#3f3f46" }}>highperformanceclub.co</a>
        </p>
        <p style={{ fontSize: 11, color: "#3f3f46", marginTop: 4 }}>₹1 for 7 days · Then ₹99/month · Cancel anytime</p>
      </footer>

      <StickyBottomCTA />
      <BackToTop />
      <LiveToast />
      <TrialPopup />
    </div>
  );
}
