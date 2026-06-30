"use client";
import { useState, useEffect, useRef } from "react";
import IPhoneFrame from "@/components/IPhoneFrame";

const JOIN_URL = "https://rzp.io/l/daily-upgrade-club";

// ─── Shared icons ────────────────────────────────────────────────────────────
function WAIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#25d366" />
      <path d="M22.94 9.06A9.75 9.75 0 0 0 16 6.25C10.89 6.25 6.75 10.39 6.75 15.5c0 1.63.43 3.21 1.24 4.62L6.6 25.4l5.42-1.42a9.75 9.75 0 0 0 4.97 1.37c5.11 0 9.25-4.14 9.25-9.25a9.2 9.2 0 0 0-3.3-7.04Zm-6.94 14.2a8.1 8.1 0 0 1-4.12-1.12l-.3-.17-3.06.8.82-2.98-.2-.31A8.1 8.1 0 0 1 7.9 15.5c0-4.47 3.63-8.1 8.1-8.1a8.1 8.1 0 0 1 8.1 8.1c0 4.47-3.63 8.1-8.1 8.1Zm4.44-6.07c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06a6.57 6.57 0 0 1-1.93-1.19 7.24 7.24 0 0 1-1.34-1.66c-.14-.24-.01-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" fill="#fff" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="#f59e0b" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function CheckCircle() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0 mt-0.5">
      <circle cx="10" cy="10" r="10" fill="#1da851" />
      <path d="M6 10l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XCircle() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0 mt-0.5">
      <circle cx="10" cy="10" r="10" fill="#e4e4e7" />
      <path d="M7 7l6 6M13 7l-6 6" stroke="#a1a1aa" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// ─── Primary CTA button ──────────────────────────────────────────────────────
function CTA({ label, sub, size = "lg" }: { label: string; sub?: string; size?: "sm" | "lg" }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <a href={JOIN_URL} target="_blank" rel="noopener noreferrer"
        className={`btn-primary inline-flex items-center justify-center gap-2.5 rounded-full font-bold text-white transition-all ${size === "lg" ? "px-10 py-5 text-base sm:text-lg" : "px-7 py-4 text-sm sm:text-base"}`}
        style={{ boxShadow: "0 6px 28px rgba(37,211,102,0.40)" }}>
        <WAIcon size={18} />
        {label}
        <span className="ml-0.5">→</span>
      </a>
      {sub && <p className="text-xs text-center" style={{ color: "#71717a" }}>{sub}</p>}
    </div>
  );
}

// ─── Section eyebrow label ───────────────────────────────────────────────────
function Eyebrow({ text }: { text: string }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#25d366", letterSpacing: "0.18em" }}>
      {text}
    </p>
  );
}

// ─── WhatsApp chat bubbles (for IPhoneFrame children) ───────────────────────
function WAChatBg({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: "#efeae2",
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath fill='%23000000' fill-opacity='0.03' d='M0 0h20v20H0V0zm20 20h20v20H20V20z'/%3E%3C/svg%3E\")",
      padding: "10px 8px 8px",
      minHeight: 340,
    }}>
      {children}
    </div>
  );
}

function WAIn({ title, lines, time }: { title: string; lines: string[]; time: string }) {
  return (
    <div style={{ display: "flex", paddingLeft: 6, marginBottom: 8 }}>
      <div style={{ background: "#fff", borderRadius: "8px 8px 8px 0", padding: "9px 11px", maxWidth: "90%", position: "relative", boxShadow: "0 1px 2px rgba(0,0,0,0.08)" }}>
        <div style={{ position: "absolute", bottom: 0, left: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #fff transparent" }} />
        <p style={{ margin: 0, color: "#111b21", fontSize: 11.5, fontWeight: 700, lineHeight: 1.4 }}>{title}</p>
        {lines.map((l, i) => <p key={i} style={{ margin: "4px 0 0", color: "#111b21", fontSize: 11, lineHeight: 1.55 }}>{l}</p>)}
        <p style={{ margin: "5px 0 0", color: "#667781", fontSize: 9.5, textAlign: "right" }}>{time} ✓✓</p>
      </div>
    </div>
  );
}

function WAOut({ text, time }: { text: string; time: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: 6, marginBottom: 4 }}>
      <div style={{ background: "#d9fdd3", borderRadius: "8px 8px 0 8px", padding: "8px 11px", maxWidth: "60%", position: "relative" }}>
        <div style={{ position: "absolute", bottom: 0, right: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #d9fdd3 transparent" }} />
        <p style={{ margin: 0, color: "#111b21", fontSize: 11.5 }}>{text}</p>
        <p style={{ margin: "3px 0 0", color: "#667781", fontSize: 9.5, textAlign: "right" }}>
          {time} <span style={{ color: "#53bdeb" }}>✓✓</span>
        </p>
      </div>
    </div>
  );
}

function WADateSep({ label }: { label: string }) {
  return (
    <div style={{ textAlign: "center", margin: "6px 0 8px" }}>
      <span style={{ fontSize: 10, color: "#667781", background: "rgba(255,255,255,0.85)", padding: "2px 10px", borderRadius: 20 }}>{label}</span>
    </div>
  );
}

// ─── FAQ accordion ───────────────────────────────────────────────────────────
function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#e2dfd6" }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-sm bg-white hover:bg-stone-50 transition-colors"
        style={{ color: "#18181b" }}>
        {q}
        <span className="shrink-0 text-xl font-light" style={{ color: "#25d366", display: "inline-block", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
      </button>
      {open && <div className="px-5 pb-4 text-sm leading-relaxed bg-white" style={{ color: "#71717a" }}>{a}</div>}
    </div>
  );
}

// ─── Overlay: Sticky CTA ─────────────────────────────────────────────────────
function StickyBottomCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={`fixed bottom-0 inset-x-0 z-50 transition-all duration-300 ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}>
      <div className="md:hidden px-4 pb-3 pt-2" style={{ background: "linear-gradient(to top,#faf8f3 70%,transparent)", backdropFilter: "blur(8px)" }}>
        <a href={JOIN_URL} target="_blank" rel="noopener noreferrer"
          className="w-full flex items-center justify-between gap-3 rounded-2xl px-5 py-3.5"
          style={{ background: "linear-gradient(135deg,#1da851 0%,#25d366 100%)", boxShadow: "0 4px 24px rgba(37,211,102,0.40)" }}>
          <div className="text-left">
            <p className="text-white font-black text-sm leading-tight">Start My 7-Day Trial — ₹1 →</p>
            <p className="text-xs leading-tight mt-0.5" style={{ color: "rgba(255,255,255,0.8)" }}>Daily Upgrade Club · Then ₹99/month</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}>
            <WAIcon size={16} /><span className="text-white font-bold text-sm">Join</span>
          </div>
        </a>
      </div>
      <div className="hidden md:block px-6 pb-4 pt-3" style={{ background: "linear-gradient(to top,#faf8f3 70%,transparent)", backdropFilter: "blur(8px)" }}>
        <div className="max-w-xl mx-auto">
          <a href={JOIN_URL} target="_blank" rel="noopener noreferrer"
            className="w-full flex items-center justify-between gap-4 rounded-2xl px-6 py-4"
            style={{ background: "linear-gradient(135deg,#1da851 0%,#25d366 100%)", boxShadow: "0 4px 24px rgba(37,211,102,0.40)" }}>
            <div className="text-left">
              <p className="text-white font-black text-base leading-tight">Start My 7-Day Trial — ₹1 →</p>
              <p className="text-sm leading-tight mt-0.5" style={{ color: "rgba(255,255,255,0.8)" }}>Daily Upgrade Club · Then just ₹99/month · Cancel anytime</p>
            </div>
            <div className="flex items-center gap-2 rounded-xl px-4 py-2 shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}>
              <WAIcon size={18} /><span className="text-white font-bold text-sm">Join Now</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Overlay: Back to top ─────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button type="button" aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-20 right-3 z-50 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 cursor-pointer ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      style={{ background: "linear-gradient(135deg,#1da851,#25d366)", boxShadow: "0 4px 16px rgba(37,211,102,0.45)" }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 4l-8 8h5v8h6v-8h5z" /></svg>
    </button>
  );
}

// ─── Overlay: Live enrollment toast ──────────────────────────────────────────
const NAMES = [
  { name: "Rahul", city: "Delhi" }, { name: "Priya", city: "Mumbai" },
  { name: "Aditya", city: "Bengaluru" }, { name: "Sneha", city: "Pune" },
  { name: "Vikram", city: "Hyderabad" }, { name: "Anjali", city: "Chennai" },
  { name: "Karan", city: "Jaipur" }, { name: "Divya", city: "Ahmedabad" },
  { name: "Manish", city: "Kolkata" }, { name: "Meera", city: "Surat" },
  { name: "Arjun", city: "Lucknow" }, { name: "Tanvi", city: "Nagpur" },
  { name: "Nikhil", city: "Indore" }, { name: "Kavya", city: "Kochi" },
  { name: "Ritesh", city: "Bhopal" }, { name: "Simran", city: "Amritsar" },
  { name: "Devansh", city: "Gurgaon" }, { name: "Ruchika", city: "Jodhpur" },
];
let _toastId = 0;
function timeAgoStr() {
  const r = Math.random();
  if (r < 0.3) return `${Math.floor(Math.random() * 50 + 5)} seconds ago`;
  if (r < 0.55) return "just now";
  if (r < 0.75) return `${Math.floor(Math.random() * 3 + 1)} min ago`;
  return `${Math.floor(Math.random() * 7 + 2)} minutes ago`;
}
function LiveEnrollmentToast() {
  interface Toast { id: number; name: string; city: string; time: string }
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const usedIdx = useRef<Set<number>>(new Set());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 300) setScrolled(true); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!scrolled) return;
    const spawn = () => {
      let idx: number;
      do { idx = Math.floor(Math.random() * NAMES.length); } while (usedIdx.current.has(idx));
      usedIdx.current.add(idx);
      if (usedIdx.current.size > 6) { const f = usedIdx.current.values().next().value as number; usedIdx.current.delete(f); }
      const person = NAMES[idx];
      const id = ++_toastId;
      setToasts(prev => [{ id, name: person.name, city: person.city, time: timeAgoStr() }, ...prev].slice(0, 3));
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
      timerRef.current = setTimeout(spawn, 7000 + Math.random() * 11000);
    };
    timerRef.current = setTimeout(spawn, 3000 + Math.random() * 3000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [scrolled]);
  if (!scrolled || toasts.length === 0) return null;
  return (
    <div className="fixed left-2 z-40 flex flex-col gap-2 pointer-events-none bottom-[80px] md:bottom-[68px]" aria-live="polite">
      {toasts.map((toast, i) => (
        <div key={toast.id} className="pointer-events-auto"
          style={{ opacity: i === 0 ? 1 : 0.7 - i * 0.2, transform: `scale(${1 - i * 0.03})`, transformOrigin: "bottom left", animation: "duc-fadein 0.35s ease" }}>
          <div className="flex items-center gap-2.5 rounded-2xl px-3 py-2.5 w-[255px] sm:w-[295px]"
            style={{ background: "#fff", border: "1px solid #e2dfd6", boxShadow: "0 4px 20px rgba(0,0,0,0.10)" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
              style={{ background: `hsl(${(toast.name.charCodeAt(0) * 37) % 360},55%,48%)` }}>
              {toast.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold leading-snug truncate" style={{ color: "#18181b" }}>{toast.name} from {toast.city}</p>
              <p className="text-xs leading-snug mt-0.5" style={{ color: "#71717a" }}>joined Daily Upgrade Club · {toast.time}</p>
            </div>
            <span className="relative flex w-2 h-2 shrink-0">
              <span className="absolute inline-flex w-full h-full rounded-full animate-ping opacity-75" style={{ background: "#25d366" }} />
              <span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: "#25d366" }} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Overlay: 15-second popup ─────────────────────────────────────────────────
function TrialPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const shownRef = useRef(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (shownRef.current) return;
      try { if (localStorage.getItem("duc_trial_popup") === "shown") return; } catch { /* */ }
      shownRef.current = true;
      setVisible(true);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);
  const dismiss = () => {
    setVisible(false); setDismissed(true);
    try { localStorage.setItem("duc_trial_popup", "shown"); } catch { /* */ }
  };
  if (!visible || dismissed) return null;
  return (
    <>
      <div className="fixed inset-0 z-[100]" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} onClick={dismiss} />
      <div className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-sm rounded-3xl overflow-hidden" onClick={e => e.stopPropagation()}
          style={{ background: "#fff", boxShadow: "0 24px 64px rgba(0,0,0,0.25)", animation: "duc-fadein 0.4s ease" }}>
          <div className="relative px-6 pt-8 pb-6 text-center" style={{ background: "linear-gradient(135deg,#1da851 0%,#25d366 100%)" }}>
            <button onClick={dismiss} aria-label="Close"
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
              style={{ background: "rgba(255,255,255,0.2)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>
            </button>
            <p className="text-4xl mb-3">🌱</p>
            <h2 className="text-white font-black text-xl leading-snug">Still thinking about it?</h2>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: "rgba(255,255,255,0.9)" }}>
              7 days. 1 tiny healthy habit a day. Lands on your WhatsApp every morning. Starts for just ₹1.
            </p>
          </div>
          <div className="px-6 py-6 text-center">
            <div className="flex flex-col gap-2 mb-5 text-left">
              {["Under 5 minutes a day", "One habit. One WhatsApp message.", "Cancel before Day 7 — pay ₹0 more"].map(t => (
                <div key={t} className="flex items-center gap-2 text-sm" style={{ color: "#4a4a52" }}>
                  <CheckCircle />{t}
                </div>
              ))}
            </div>
            <a href={JOIN_URL} target="_blank" rel="noopener noreferrer" onClick={dismiss}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-black text-white text-base btn-primary">
              <WAIcon size={18} />Yes — Start My Trial for ₹1 →
            </a>
            <button onClick={dismiss} className="mt-3 text-xs cursor-pointer" style={{ color: "#a1a1aa" }}>
              No thanks, I&apos;ll skip this
            </button>
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
    <div id="duc-top" style={{ background: "#faf8f3", minHeight: "100vh", fontFamily: "var(--font-sans),-apple-system,BlinkMacSystemFont,sans-serif", color: "#18181b" }}>
      <style>{`@keyframes duc-fadein{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* ══════════════════════════════════════════════════════
          1. HERO — two-column
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden mesh-bg" style={{ borderBottom: "1px solid #e2dfd6" }}>
        <span className="emoji-deco float-1 top-16 left-6 text-3xl hidden lg:block" aria-hidden="true">✨</span>
        <span className="emoji-deco float-2 top-10 right-8 text-3xl hidden lg:block" aria-hidden="true">🌿</span>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* LEFT — copy */}
            <div className="lg:col-span-7 text-center lg:text-left">

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 text-xs font-bold uppercase tracking-widest accent-pill animate-fade-up">
                <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ background: "#25d366" }} />
                Daily Upgrade Club · WhatsApp
              </div>

              <h1 className="text-mega font-bold leading-none tracking-tight text-foreground animate-fade-up delay-100 mb-5">
                One tiny healthy habit.<br />
                Every morning.<br />
                <span className="gradient-text">On WhatsApp.</span>
              </h1>

              <p className="text-body-xl text-foreground-muted leading-relaxed animate-fade-up delay-200 mb-3 max-w-xl lg:max-w-none">
                Feel more energetic, sleep better & actually stay consistent —
                in{" "}
                <span className="text-emphasis-yellow">under 5 minutes a day.</span>
              </p>
              <p className="text-body-lg text-foreground-muted leading-relaxed animate-fade-up delay-300 mb-8 max-w-xl lg:max-w-none">
                No gym. No meal plans. No 5 AM alarms. Just one science-backed habit waiting in your WhatsApp every morning —
                and you reply <strong className="text-foreground">DONE</strong> when you&apos;re finished.
              </p>

              <div className="animate-fade-up delay-400 flex flex-col items-center lg:items-start gap-2 mb-10">
                <a href={JOIN_URL} target="_blank" rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-white text-lg"
                  style={{ boxShadow: "0 8px 32px rgba(37,211,102,0.40)" }}>
                  <WAIcon size={22} />
                  Start My 7-Day Trial — ₹1 →
                </a>
                <p className="text-sm text-center lg:text-left" style={{ color: "#71717a" }}>
                  7 days for ₹1 · Then ₹99/month · Cancel anytime before Day 7
                </p>
              </div>

              {/* 3 micro-testimonials */}
              <div className="animate-fade-up delay-500 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x" style={{ borderColor: "#e2dfd6" }}>
                {[
                  { name: "Karan M.", city: "Pune", text: "No 3 PM energy crash by Day 5. Nothing else changed." },
                  { name: "Priya T.", city: "Bengaluru", text: "Sleeping 45 min more per night. Tracked it." },
                  { name: "Amit D.", city: "Delhi", text: "Zero bloating after 3 weeks. My wife noticed first." },
                ].map((r) => (
                  <div key={r.name} className="flex flex-col gap-1.5 px-0 sm:px-4 py-3 sm:py-2 first:sm:pl-0 last:sm:pr-0 text-center lg:text-left">
                    <div className="flex gap-0.5 justify-center lg:justify-start">{[1,2,3,4,5].map(i=><StarIcon key={i}/>)}</div>
                    <p className="text-sm leading-relaxed" style={{ color: "#4a4a52" }}>&ldquo;{r.text}&rdquo;</p>
                    <p className="text-xs font-bold" style={{ color: "#18181b" }}>{r.name} · <span className="font-normal" style={{ color: "#71717a" }}>{r.city}</span></p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — iPhone */}
            <div className="lg:col-span-5 flex flex-col items-center gap-5 animate-fade-up delay-300">
              <div className="relative">
                {/* Floating stat badge */}
                <div className="absolute -top-4 -right-4 z-10 rounded-2xl px-3 py-2.5 text-center" style={{ background: "#fff", border: "1px solid #e2dfd6", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
                  <div className="flex gap-0.5 justify-center mb-0.5">{[1,2,3,4,5].map(i=><StarIcon key={i}/>)}</div>
                  <p className="text-xs font-black" style={{ color: "#18181b" }}>400+ members</p>
                </div>
                <IPhoneFrame contactName="Daily Upgrade Club" contactStatus="online" width={270}>
                  <WAChatBg>
                    <WADateSep label="Energy Month · Day 3" />
                    <WAIn
                      title="⚡ Day 3 — Morning Sunlight"
                      lines={[
                        "Good morning! Step outside for 5 minutes of natural sunlight within 30 min of waking.",
                        "Why: Resets your cortisol rhythm. Controls energy all day.",
                        "No sunlight = sluggish even after coffee.",
                        "Reply DONE when you're back 💪",
                      ]}
                      time="7:01 AM"
                    />
                    <WAOut text="✅ DONE — felt great actually!" time="7:09 AM" />
                    <WAIn title="" lines={["🔥 Day 3 streak! Body is already recalibrating. See you tomorrow."]} time="7:10 AM" />
                  </WAChatBg>
                </IPhoneFrame>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {["No app to download", "WhatsApp only", "Under 5 min/day", "Cancel anytime"].map(t => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: "#fff", color: "#4a4a52", border: "1px solid #e2dfd6" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. STATS STRIP
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#18181b", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-4xl mx-auto px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
          {[
            { value: "400+", label: "Active Members" },
            { value: "78%", label: "Daily Completion Rate" },
            { value: "₹3/day", label: "Cost After Trial" },
            { value: "5 min", label: "Max Time Per Day" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center py-4 px-3" style={{ background: "#18181b" }}>
              <p className="font-black text-2xl sm:text-3xl" style={{ color: "#25d366" }}>{value}</p>
              <p className="text-xs mt-0.5" style={{ color: "#71717a" }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. WHAT EXACTLY IS DAILY UPGRADE CLUB?
      ══════════════════════════════════════════════════════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

            {/* LEFT — the clear explanation */}
            <div className="lg:col-span-7">
              <Eyebrow text="What exactly is this?" />
              <h2 className="text-section-title font-bold leading-tight mb-6">
                The Daily Upgrade Club is a{" "}
                <span className="gradient-text">WhatsApp-delivered healthy habit subscription</span>{" "}
                that takes under 5 minutes a day.
              </h2>
              <div className="space-y-4 text-body-lg text-foreground-muted leading-relaxed">
                <p>
                  Every morning at <strong className="text-foreground">7 AM</strong>, one tiny healthy habit lands in your WhatsApp.
                  Not a video to watch. Not a course to complete. A single, specific action — with a 3-line explanation of why it works — that you can do right now.
                </p>
                <p>
                  You do it. You reply <strong className="text-foreground">DONE</strong>. That&apos;s your day&apos;s health done.
                </p>
                <p>
                  Each month has a <strong className="text-foreground">single health theme</strong> — Sleep, Energy, Focus, Gut Health, Stress, Fitness, Hydration, or Heart Health. You pick the theme that matters most to you. All 30 habits that month work on that one area. By Day 30, something has actually shifted.
                </p>
                <p>
                  This is not a challenge. It&apos;s not a course. It&apos;s a <strong className="text-foreground">system that shows up for you every morning</strong> — so you don&apos;t have to rely on motivation, memory, or willpower.
                </p>
              </div>
            </div>

            {/* RIGHT — quick-glance fact box */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border p-6 sm:p-8 space-y-5" style={{ background: "#f0fdf4", borderColor: "rgba(37,211,102,0.25)", boxShadow: "0 8px 32px rgba(37,211,102,0.08)" }}>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#1da851" }}>At a glance</p>
                {[
                  { icon: "📲", label: "Delivery", val: "WhatsApp — no app needed" },
                  { icon: "⏰", label: "Arrives", val: "Every morning at 7 AM" },
                  { icon: "⏱️", label: "Time", val: "Under 5 minutes per habit" },
                  { icon: "📅", label: "Cadence", val: "1 habit/day · 30 habits/month" },
                  { icon: "🎯", label: "Focus", val: "One monthly health theme" },
                  { icon: "💬", label: "Engagement", val: "Reply DONE — streak tracked" },
                  { icon: "👥", label: "Community", val: "Private WhatsApp group" },
                  { icon: "💰", label: "Price", val: "₹1 for 7 days → ₹99/month" },
                ].map(({ icon, label, val }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="text-xl shrink-0">{icon}</span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "#71717a" }}>{label}</p>
                      <p className="text-sm font-semibold" style={{ color: "#18181b" }}>{val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. DOES THIS SOUND LIKE YOU? (Pain points)
      ══════════════════════════════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <Eyebrow text="Be honest with yourself" />
            <h2 className="text-section-title font-bold mb-4">Does this sound like you?</h2>
            <p className="text-body-lg text-foreground-muted max-w-xl mx-auto">
              If you&apos;ve nodded at even two of these, you&apos;re exactly who Daily Upgrade Club was built for.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              "You know what's healthy — you just can't make it stick when life gets busy.",
              "You start a routine full of motivation… then quietly drop it by Day 4.",
              "You try to fix diet, gym, sleep, and stress all at once — and end up doing none of it.",
              "You have no one keeping you accountable, so the moment motivation dips, the habit disappears.",
              "A 1-hour wellness routine isn't realistic for your life. But doing nothing doesn't feel right either.",
              "You've downloaded apps, bought courses, bookmarked articles — and still feel like you haven't started.",
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-4 bg-white border rounded-2xl px-5 py-4 sm:px-7 sm:py-5 shadow-sm" style={{ borderColor: "#e2dfd6" }}>
                <span className="text-2xl shrink-0 leading-none mt-0.5" aria-hidden="true">😮‍💨</span>
                <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-10 text-lg sm:text-xl font-bold text-foreground text-balance max-w-2xl mx-auto leading-relaxed">
            This isn&apos;t a discipline problem. It&apos;s a{" "}
            <span className="gradient-text">system problem.</span>
            {" "}One tiny healthy habit a day — delivered automatically — fixes it.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. BEFORE → AFTER
      ══════════════════════════════════════════════════════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <Eyebrow text="The shift you can expect" />
            <h2 className="text-section-title font-bold mb-4">
              Where you are now <span style={{ color: "#25d366" }}>→</span> where you&apos;ll be
            </h2>
            <p className="text-body-lg text-foreground-muted max-w-xl mx-auto">
              Same you. Same busy life. A completely different baseline — built one tiny habit at a time.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-stretch gap-0">
            {/* Before */}
            <div className="flex-1 rounded-3xl border p-6 sm:p-8" style={{ background: "#fafafa", borderColor: "#e4e4e7" }}>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-6" style={{ background: "#fee2e2", color: "#991b1b", border: "1px solid #fca5a5" }}>
                Day 0 — Today
              </span>
              <ul className="flex flex-col gap-4">
                {[
                  "Low energy by 2 PM every single day",
                  "Trouble falling asleep — mind still racing",
                  "Gut issues, bloating that won't go away",
                  "Good intentions, zero follow-through",
                  "Stressed and reactive all morning",
                  "\"I'll start properly on Monday\"",
                ].map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle />
                    <span className="text-base text-foreground-muted leading-snug">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Arrow */}
            <div className="flex items-center justify-center py-4 md:py-0 md:px-5">
              <span className="text-3xl font-black rotate-90 md:rotate-0" style={{ color: "#25d366" }}>→</span>
            </div>
            {/* After */}
            <div className="flex-1 rounded-3xl border-2 p-6 sm:p-8 relative overflow-hidden" style={{ background: "#f0fdf4", borderColor: "rgba(37,211,102,0.4)" }}>
              <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full" style={{ background: "rgba(37,211,102,0.1)" }} aria-hidden="true" />
              <span className="relative inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-6 badge-after">
                After 30 Days
              </span>
              <ul className="flex flex-col gap-4 relative">
                {[
                  "Steady energy through the whole day",
                  "Falling asleep faster, waking up rested",
                  "Lighter digestion, bloating gone",
                  "One small habit done daily — without missing",
                  "Calmer and more in control of your mornings",
                  "You already started. And you kept going.",
                ].map((a, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle />
                    <span className="text-base text-foreground font-medium leading-snug">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-center mt-12">
            <CTA label="Start My 7-Day Trial — ₹1" sub="7 days for ₹1 · Then ₹99/month · Cancel anytime" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. HOW IT WORKS — 3-step daily loop
      ══════════════════════════════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* LEFT — step cards */}
            <div className="order-2 lg:order-1">
              <div className="flex flex-col gap-5 relative pl-3 pt-3">
                {[
                  { n: "1", icon: "🌅", time: "7 AM — Every Morning", label: "Your tiny healthy habit arrives on WhatsApp.", desc: "One habit. Specific, science-backed, explained in 3 lines. You know exactly what to do and why it works.", color: "#f59e0b", bg: "#fffbeb", border: "#fde68a" },
                  { n: "2", icon: "✅", time: "Anytime — You Do It", label: "Takes under 5 minutes. That's the whole point.", desc: "No equipment, no commute, no schedule change. Do it at home, at your desk, before a meal — whenever works.", color: "#25d366", bg: "#f0fdf4", border: "rgba(37,211,102,0.3)" },
                  { n: "3", icon: "🔔", time: "Reply DONE — Streak Updated", label: "One word reply. Your streak grows automatically.", desc: "The accountability group sees your DONE. Others post theirs. You're not doing this alone — and that matters.", color: "#6366f1", bg: "#eef2ff", border: "#c7d2fe" },
                ].map((s) => (
                  <div key={s.n} className="rounded-2xl border-2 flex items-start gap-4 p-6 relative" style={{ background: s.bg, borderColor: s.border }}>
                    <div className="w-11 h-11 rounded-full bg-white border-2 flex items-center justify-center shrink-0 text-xl" style={{ borderColor: s.border }}>{s.icon}</div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: s.color }}>{s.time}</p>
                      <p className="font-bold text-sm sm:text-base text-foreground mb-1">{s.label}</p>
                      <p className="text-sm text-foreground-muted leading-relaxed">{s.desc}</p>
                    </div>
                    <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black" style={{ background: "#1da851" }}>{s.n}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-5">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border shadow-sm" style={{ borderColor: "#e2dfd6" }}>
                  <span className="text-base">🔁</span>
                  <span className="text-sm font-semibold text-foreground-muted">Repeat for 30 days. That&apos;s the whole system.</span>
                </div>
              </div>
            </div>

            {/* RIGHT — copy */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <Eyebrow text="How it works" />
              <h2 className="text-section-title font-bold mb-5">
                Simpler than any routine<br />
                <span className="italic font-medium text-foreground-muted" style={{ fontSize: "0.82em" }}>you&apos;ve ever tried.</span>
              </h2>
              <p className="text-body-lg text-foreground-muted leading-relaxed mb-6">
                There&apos;s no curriculum to follow. No lesson to watch. No check-in call to schedule.
                One message. One action. One reply. That&apos;s the entire daily commitment.
              </p>
              <p className="text-body-lg text-foreground-muted leading-relaxed">
                The system does the work. You just show up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. THE 8 MONTHLY THEMES — full breakdown
      ══════════════════════════════════════════════════════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <Eyebrow text="The 8 Monthly Themes" />
            <h2 className="text-section-title font-bold mb-4">
              Every month, one health area.<br />
              <span className="italic font-medium text-foreground-muted" style={{ fontSize: "0.82em" }}>30 habits. Real results.</span>
            </h2>
            <p className="text-body-lg text-foreground-muted max-w-2xl mx-auto">
              When you join, you pick your first theme. Each month you can stay on the same theme or switch.
              You go deep — not wide — so one area actually changes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { emoji: "😴", theme: "Sleep", color: "#6366f1", bg: "#eef2ff", border: "#c7d2fe", tagline: "Fall asleep faster. Wake up rested.", habits: ["Phone outside bedroom before bed", "Wind-down breathing routine", "Cold room sleep trigger", "Morning light exposure", "No caffeine after 2 PM"] },
              { emoji: "⚡", theme: "Energy", color: "#f59e0b", bg: "#fffbeb", border: "#fde68a", tagline: "Steady energy. No 3 PM crash.", habits: ["5-min morning sunlight", "Cold water face splash", "Stair walk after lunch", "Hydration alarm", "Protein-first breakfast"] },
              { emoji: "🧠", theme: "Focus", color: "#8b5cf6", bg: "#f5f3ff", border: "#ddd6fe", tagline: "Sharper mind. Deeper work.", habits: ["2-min pre-task intention", "Phone face-down during work", "1 priority written each morning", "Post-lunch 5-min walk", "Weekly brain dump"] },
              { emoji: "🌿", theme: "Gut Health", color: "#10b981", bg: "#ecfdf5", border: "#6ee7b7", tagline: "Better digestion. Less bloating.", habits: ["One spoon curd at lunch", "Chew slower — 20 chews", "Warm water on waking", "Fermented food daily", "No screen while eating"] },
              { emoji: "🧘", theme: "Stress", color: "#ec4899", bg: "#fdf2f8", border: "#f9a8d4", tagline: "Calmer. Less reactive.", habits: ["Box breathing before meetings", "2-min gratitude note", "No phone first 10 min", "One 10-min walk outside", "End-of-day shutdown ritual"] },
              { emoji: "💪", theme: "Fitness", color: "#f97316", bg: "#fff7ed", border: "#fdba74", tagline: "Active body. No gym needed.", habits: ["10 pushups on waking", "Standing every 45 min", "Evening walk 20 min", "1-min wall sit", "Stretch routine before bed"] },
              { emoji: "💧", theme: "Hydration", color: "#0ea5e9", bg: "#f0f9ff", border: "#bae6fd", tagline: "More water. Better everything.", habits: ["Water before coffee", "Glass of water after toilet", "Hydration alarm at 3 PM", "Electrolyte drink daily", "Track 8 glasses with marks"] },
              { emoji: "❤️", theme: "Heart Health", color: "#ef4444", bg: "#fff1f2", border: "#fecaca", tagline: "Long-term energy. Strong heart.", habits: ["5-min brisk walk morning", "One handful nuts daily", "No salt at dinner table", "Deep breathing 3x/day", "Stand more — sit less"] },
            ].map(({ emoji, theme, color, bg, border, tagline, habits }) => (
              <div key={theme} className="rounded-2xl border-2 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow" style={{ background: bg, borderColor: border }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{emoji}</span>
                  <div>
                    <p className="font-black text-sm" style={{ color }}>{theme} Month</p>
                    <p className="text-xs text-foreground-muted leading-snug">{tagline}</p>
                  </div>
                </div>
                <div className="h-px" style={{ background: border }} />
                <div className="flex flex-col gap-1.5">
                  <p className="text-xs font-bold uppercase tracking-wide" style={{ color }}>Sample habits:</p>
                  {habits.map(h => (
                    <div key={h} className="flex items-start gap-1.5">
                      <span className="text-xs shrink-0 mt-0.5" style={{ color }}>→</span>
                      <p className="text-xs text-foreground-muted leading-snug">{h}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border p-5 sm:p-6 text-center" style={{ background: "#f0fdf4", borderColor: "rgba(37,211,102,0.2)" }}>
            <p className="text-sm font-semibold" style={{ color: "#1da851" }}>
              📅 You pick your theme when you join. Switch every month, or repeat the same one — your choice.
              Most members cycle through 2–3 themes in their first 6 months.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          8. PHONE DEMOS — 3 iPhones showing real habits
      ══════════════════════════════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow text="What actually lands in your WhatsApp" />
            <h2 className="text-section-title font-bold mb-4">
              Real messages.<br />
              <span className="italic font-medium text-foreground-muted" style={{ fontSize: "0.82em" }}>From real days.</span>
            </h2>
            <p className="text-body-lg text-foreground-muted">
              No motivational fluff. No generic advice. Each habit is specific, explained, and doable in under 5 minutes.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10 lg:gap-8 max-w-5xl mx-auto">
            {/* Phone 1 */}
            <div className="flex justify-center tilt-left">
              <IPhoneFrame contactName="Daily Upgrade Club" contactStatus="online" width={270}>
                <WAChatBg>
                  <WADateSep label="⚡ Energy Month · Day 3" />
                  <WAIn
                    title="Good morning! ⚡ Day 3 habit:"
                    lines={[
                      "🌞 Step outside for 5 min of natural sunlight within 30 min of waking.",
                      "",
                      "Why: Resets your cortisol rhythm — controls energy all day. No sunlight = sluggish even after coffee.",
                      "",
                      "Just 5 minutes. Reply DONE when you're back 💪",
                    ]}
                    time="7:01 AM"
                  />
                  <WAOut text="✅ DONE — felt surprisingly good!" time="7:08 AM" />
                  <WAIn title="" lines={["🔥 Day 3 streak! See you tomorrow."]} time="7:09 AM" />
                </WAChatBg>
              </IPhoneFrame>
            </div>

            {/* Phone 2 */}
            <div className="flex justify-center">
              <IPhoneFrame contactName="Daily Upgrade Club" contactStatus="online" width={270}>
                <WAChatBg>
                  <WADateSep label="😴 Sleep Month · Day 11" />
                  <WAIn
                    title="Good morning! 😴 Day 11 habit:"
                    lines={[
                      "📵 Tonight — phone charger outside the bedroom.",
                      "",
                      "Why: Blue light suppresses melatonin for 2 hours. Removing the phone improves sleep quality without any other change.",
                      "",
                      "Set a reminder now for 9:30 PM. Reply DONE 🌙",
                    ]}
                    time="7:01 AM"
                  />
                  <WAOut text="✅ DONE — set the reminder" time="7:06 AM" />
                  <WAIn title="" lines={["🔥 Day 11! Most members notice a difference in 3–5 nights."]} time="7:07 AM" />
                </WAChatBg>
              </IPhoneFrame>
            </div>

            {/* Phone 3 */}
            <div className="flex justify-center tilt-right">
              <IPhoneFrame contactName="Daily Upgrade Club" contactStatus="online" width={270}>
                <WAChatBg>
                  <WADateSep label="🌿 Gut Health Month · Day 7" />
                  <WAIn
                    title="Good morning! 🌿 Day 7 habit:"
                    lines={[
                      "🥄 Add one spoon of plain curd (no sugar) to your lunch.",
                      "",
                      "Why: Live cultures feed good gut bacteria. Even one spoon daily reduces bloating and improves digestion within 2 weeks.",
                      "",
                      "Just one spoon with lunch. Reply DONE after 🙌",
                    ]}
                    time="7:01 AM"
                  />
                  <WAOut text="✅ DONE — had it with dal rice" time="1:23 PM" />
                  <WAIn title="" lines={["Perfect 🙌 Day 7 complete! Gut bacteria are already shifting."]} time="1:24 PM" />
                </WAChatBg>
              </IPhoneFrame>
            </div>
          </div>

          <p className="text-center mt-10 text-sm text-foreground-subtle max-w-xl mx-auto">
            These are 3 examples. You get 30 habits per month — one every morning — across your chosen theme.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          9. YOUR FIRST 7 DAYS — timeline
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#18181b" }} className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 sparkle-bg pointer-events-none opacity-30" />
        <div className="max-w-5xl mx-auto px-6 lg:px-10 relative">
          <div className="text-center mb-12">
            <Eyebrow text="Your first 7 days" />
            <h2 className="text-section-title font-bold mb-4" style={{ color: "#fff" }}>
              Here&apos;s exactly what will happen
            </h2>
            <p className="text-body-lg max-w-xl mx-auto" style={{ color: "#a1a1aa" }}>
              By Day 7, you&apos;ll feel the difference. If you don&apos;t — cancel and pay nothing more.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { day: "Day 1", emoji: "👋", title: "Your first habit arrives at 7 AM", desc: "You wake up to one tiny healthy habit in your WhatsApp. You read it. You do it — under 5 minutes. You reply DONE. You think: 'That's it?' Yes. That's it.", feel: "Surprised at how easy it is" },
              { day: "Day 2", emoji: "🔥", title: "Streak begins. Momentum starts.", desc: "Day 2 arrives automatically. Your streak is 2. The accountability group is live — you see others posting DONE. You're not doing this alone.", feel: "A quiet sense of momentum" },
              { day: "Day 3–4", emoji: "⚡", title: "The habit starts feeling automatic", desc: "You notice yourself expecting the morning message. It's no longer a decision — it's just part of your morning. The streak is doing more work than your willpower.", feel: "Habit anchoring to your routine" },
              { day: "Day 5", emoji: "✨", title: "First physical shift", desc: "Most members notice something by Day 5 — more energy, better sleep, lighter digestion, clearer head. Small. But real. Nothing else changed.", feel: "Something actually shifted" },
              { day: "Day 6", emoji: "🔔", title: "You get your trial reminder", desc: "We remind you: trial ends tomorrow. Cancel now if you want — no pressure, no guilt. You are always in control. No surprise charges.", feel: "Full control. Zero pressure." },
              { day: "Day 7", emoji: "🎯", title: "You make a clear decision", desc: "After 7 mornings of real habits, you know. Most members don't cancel. Not because they forgot — because they don't want to stop.", feel: "You already have your answer" },
            ].map(({ day, emoji, title, desc, feel }) => (
              <div key={day} className="rounded-2xl p-5 flex gap-4 items-start" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-black" style={{ background: "linear-gradient(135deg,#1da851,#25d366)", boxShadow: "0 3px 12px rgba(37,211,102,0.3)" }}>
                    {emoji}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-0.5" style={{ color: "#25d366" }}>{day}</p>
                  <p className="font-bold text-sm mb-1.5" style={{ color: "#fff" }}>{title}</p>
                  <p className="text-sm leading-relaxed mb-2.5" style={{ color: "#a1a1aa" }}>{desc}</p>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full inline-block" style={{ background: "rgba(37,211,102,0.1)", color: "#25d366", border: "1px solid rgba(37,211,102,0.2)" }}>
                    💬 {feel}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <CTA label="Start Day 1 Tomorrow — ₹1" sub="Cancel before Day 7 · Pay nothing more" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          10. ROHAN'S STORY — two-column, real photo
      ══════════════════════════════════════════════════════ */}
      <section className="bg-section-white py-20 lg:py-32 relative overflow-hidden">
        <span className="emoji-deco float-1 top-32 right-8 text-4xl hidden lg:block" aria-hidden="true">👋</span>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 items-center">

            {/* Photo */}
            <div className="lg:col-span-5">
              <div className="relative max-w-sm mx-auto lg:mx-0">
                <div className="absolute -top-8 -right-4 z-20 sticky-note p-3 rounded-md tilt-right w-44 hidden sm:block">
                  <p className="font-serif italic text-sm leading-snug" style={{ color: "#92400e" }}>
                    &ldquo;Hi 👋 I built this!&rdquo;
                  </p>
                </div>
                <div className="polaroid tilt-left">
                  <div className="aspect-square rounded-sm overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/rohan.png" alt="Rohan — Founder, Daily Upgrade Club" className="w-full h-full object-cover object-top" />
                  </div>
                  <p className="text-center font-serif text-2xl italic text-foreground mt-4">Rohan</p>
                  <p className="text-center text-sm text-foreground-subtle mt-1">Founder, Daily Upgrade Club</p>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="lg:col-span-7">
              <Eyebrow text="👋 Hi, I'm the guy who built this" />
              <h2 className="text-section-title font-bold mb-8 text-balance">
                I built this because<br />
                <span className="italic font-medium text-foreground-muted" style={{ fontSize: "0.82em" }}>I needed it first.</span>
              </h2>
              <div className="space-y-4 text-body-lg text-foreground-muted leading-relaxed">
                <p>For years, I had bookmarked 47 articles on sleep, had three fitness apps on my phone, and had started — and abandoned — more health routines than I can count.</p>
                <p>I wasn&apos;t lazy. I was a busy professional who cared. But every time I tried to build a routine, life happened. One missed day turned into three. Three turned into &ldquo;I&apos;ll restart next Monday.&rdquo;</p>
                <p>Then I found BJ Fogg&apos;s research from Stanford. He studied thousands of people building habits and found one thing that separated success from failure:</p>
                <div className="pull-quote-bar my-6">
                  <p className="text-foreground font-semibold leading-relaxed">
                    &ldquo;The successful ones made the habit so small it was impossible to fail.&rdquo;
                  </p>
                  <p className="text-sm text-foreground-subtle mt-2">— BJ Fogg, Behaviour Scientist, Stanford</p>
                </div>
                <p>I tested it on myself. One tiny habit a day. Under 5 minutes. Already on my WhatsApp at 7 AM. By Day 30, I was sleeping better, had more energy, and hadn&apos;t broken the streak once.</p>
                <p>I built the Daily Upgrade Club to give this to everyone. Since then, 400+ members have done the same.</p>
                <p className="font-semibold text-foreground">Hope it helps. 🤝</p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <p className="font-serif italic text-2xl" style={{ color: "#25d366" }}>— Rohan</p>
                <span className="w-10 h-px" style={{ background: "#e2dfd6" }} />
                <p className="text-sm text-foreground-subtle">Founder, Daily Upgrade Club</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          11. EVERYTHING YOU GET — value stack
      ══════════════════════════════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <div className="rounded-3xl border-2 bg-white shadow-lg overflow-hidden" style={{ borderColor: "rgba(37,211,102,0.3)" }}>
            <div className="text-center px-6 sm:px-10 pt-9 pb-6">
              <Eyebrow text="Here's the full value" />
              <h2 className="text-section-title font-bold">Everything you&apos;re getting</h2>
            </div>
            <div className="px-6 sm:px-10">
              {[
                { emoji: "📲", name: "Daily tiny healthy habit on WhatsApp (30/month)", value: "₹2,999" },
                { emoji: "🎯", name: "Monthly health theme + 30-day habit calendar", value: "₹1,799" },
                { emoji: "📊", name: "Weekly health scorecard (streak + completion %)", value: "₹999" },
                { emoji: "👥", name: "Private WhatsApp accountability group", value: "₹999" },
                { emoji: "🗓️", name: "Monthly PDF guide — all 30 habits in advance", value: "₹499" },
                { emoji: "🏆", name: "Full habit vault — 90+ tiny healthy habits forever", value: "₹999" },
                { emoji: "📩", name: "Weekly wellness newsletter (research-backed, plain language)", value: "₹199" },
              ].map((it, i, arr) => (
                <div key={it.name} className="flex items-center justify-between gap-4 py-4" style={{ borderTop: "1px solid #efece4" }}>
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-lg shrink-0">{it.emoji}</span>
                    <span className="text-sm text-foreground leading-snug">{it.name}</span>
                  </div>
                  <span className="text-sm font-semibold shrink-0 tabular-nums" style={{ color: "#71717a" }}>{it.value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-4 py-5 mt-2 -mx-6 sm:-mx-10 px-6 sm:px-10" style={{ borderTop: "2px solid #e2dfd6", background: "#fafafa" }}>
                <span className="text-xs uppercase tracking-wide font-bold text-foreground-subtle">Total Value</span>
                <span className="text-xl font-black text-foreground-subtle line-through tabular-nums">₹8,493/month</span>
              </div>
            </div>
            <div className="text-center px-6 sm:px-10 pt-6 pb-8">
              <p className="text-sm text-foreground-muted mb-1">Not ₹8,493. Not ₹4,999. Not ₹299.</p>
              <p className="font-black mb-1" style={{ fontSize: "clamp(5rem,12vw,7rem)", lineHeight: 1, color: "#25d366", textShadow: "0 0 40px rgba(37,211,102,0.25)" }}>₹1</p>
              <p className="text-sm text-foreground-muted mb-6">for your first 7 days · then ₹99/month (less than chai)</p>
              <CTA label="Yes — Start My Trial for ₹1 →" sub="Cancel before Day 7 · Pay nothing more" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          12. 3 FALSE BELIEFS
      ══════════════════════════════════════════════════════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <Eyebrow text="The 3 reasons you're hesitating" />
            <h2 className="text-section-title font-bold mb-4">
              And why none of them<br />
              <span className="gradient-text">should stop you today</span>
            </h2>
          </div>
          <div className="space-y-5">
            {[
              {
                belief: "\"One tiny habit a day can't actually change my health.\"",
                truth: "A single habit done for 30 consecutive days rewires the brain through neuroplasticity — confirmed by Stanford research. Members who started with just \"5 minutes of morning sunlight\" ended the month sleeping better, eating better, and moving more — without being told to. One tiny healthy habit pulls the rest of your health forward like a thread.",
              },
              {
                belief: "\"I've tried this before. I always quit. I'm just not a consistent person.\"",
                truth: "You quit because the habit was too big, not because you're broken. When a habit takes under 5 minutes and shows up in your WhatsApp automatically — you don't have to rely on memory or motivation. Members who called themselves \"the least consistent person alive\" averaged a 78% completion rate in their first month.",
              },
              {
                belief: "\"₹99/month feels risky — what if I pay and don't use it?\"",
                truth: "This is exactly why the trial costs ₹1. You don't decide whether this is for you based on a description — you decide after 7 mornings of real habits landing in your WhatsApp. If by Day 7 you haven't felt a single shift — cancel. Pay nothing more. You risk ₹1. I risk my reputation.",
              },
            ].map(({ belief, truth }, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-sm" style={{ border: "1px solid #e2dfd6" }}>
                <div className="px-5 py-4 flex items-start gap-3" style={{ background: "#fff7f7", borderBottom: "1px solid #fecaca" }}>
                  <span className="text-lg shrink-0">❌</span>
                  <p className="text-sm font-bold" style={{ color: "#dc2626" }}>{belief}</p>
                </div>
                <div className="px-5 py-4 bg-white flex items-start gap-3">
                  <span className="text-lg shrink-0">✅</span>
                  <p className="text-sm leading-relaxed" style={{ color: "#4a4a52" }}>{truth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          13. IF ALL THIS DID WAS × 3
      ══════════════════════════════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <Eyebrow text="Think about this honestly" />
            <h2 className="text-section-title font-bold mb-4">
              Any one of these alone<br />
              <span className="italic font-medium text-foreground-muted" style={{ fontSize: "0.82em" }}>would be worth it.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {[
              { icon: "⚡", q: "If all this did was", bold: "give you the energy to get through your day without needing caffeine every 2 hours", suffix: "— would 7 days for ₹1 be worth finding out?" },
              { icon: "🔄", q: "If all this did was", bold: "make you the kind of person who actually follows through on their health — not just in January, but every single month", suffix: "— would ₹99/month be worth it?" },
              { icon: "🌱", q: "If all this did was", bold: "help you wake up 6 months from now and say 'I'm actually taking care of myself' — and genuinely mean it", suffix: "— what would that be worth to you?" },
            ].map(({ icon, q, bold, suffix }, i) => (
              <div key={i} className="rounded-2xl px-6 py-6 bg-white flex gap-3 items-start shadow-sm" style={{ border: "1px solid #e2dfd6" }}>
                <span className="text-2xl shrink-0">{icon}</span>
                <p className="text-sm leading-relaxed" style={{ color: "#4a4a52" }}>
                  <span style={{ color: "#a1a1aa" }}>{q} </span>
                  <strong style={{ color: "#18181b" }}>{bold}</strong>
                  <span style={{ color: "#71717a" }}> {suffix}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          14. TESTIMONIALS
      ══════════════════════════════════════════════════════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <Eyebrow text="Wall of love 💛" />
            <h2 className="text-section-title font-bold mb-4">
              Real people. Tiny habits.<br />
              <span className="gradient-text">Specific results.</span>
            </h2>
          </div>
          <div className="columns-1 sm:columns-2 gap-5">
            {[
              { name: "Karan M.", city: "Pune", joined: "Energy Month", result: "No 3 PM crash · Day 5", text: "By Day 5, I stopped needing that 3 PM coffee hit. I haven't had one since. I didn't change my diet, sleep, or exercise. One morning habit literally changed my afternoon energy." },
              { name: "Priya T.", city: "Bengaluru", joined: "Sleep Month", result: "+45 min sleep · tracked", text: "I've tried sleep apps, podcasts, melatonin. The WhatsApp habit took 4 minutes and I'm sleeping 45 minutes more per night — tracked on my phone. Nothing else changed." },
              { name: "Sneha R.", city: "Mumbai", joined: "Focus Month", result: "Cleared backlog · Day 12", text: "I was deeply skeptical. Day 12 — I finished a project I'd been avoiding for a month. Day 20 — my manager asked what had changed. I said 'one WhatsApp message every morning.'" },
              { name: "Amit D.", city: "Delhi", joined: "Gut Health", result: "Zero bloating · 3 weeks", text: "Lifelong bloating issues. The gut habits were embarrassingly simple. 3 weeks in, zero bloating. My wife noticed before I did." },
              { name: "Ravi S.", city: "Hyderabad", joined: "Stress Month", result: "Calmer mornings · Day 8", text: "The 2-minute box breathing before my morning meetings changed everything. I used to start stressed. Now I start controlled. Sounds small. Doesn't feel small." },
              { name: "Meera K.", city: "Chennai", joined: "Energy Month", result: "Gym return · Day 19", text: "I hadn't been to the gym in 8 months. The morning sunlight habit was so easy it made me feel like a healthy person again. By Day 19 I was back at the gym — not because they told me to, but because I wanted to." },
            ].map(({ name, city, joined, result, text }, idx) => (
              <div key={name} className="break-inside-avoid mb-5 rounded-2xl p-5 bg-white flex flex-col gap-3" style={{ border: "1px solid #e2dfd6", boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }}>
                <div className="flex gap-0.5">{[1,2,3,4,5].map(i=><StarIcon key={i}/>)}</div>
                <div className="px-3 py-2 rounded-xl text-xs font-bold" style={{ background: "rgba(37,211,102,0.1)", color: "#1da851", border: "1px solid rgba(37,211,102,0.15)" }}>📌 {result}</div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "#4a4a52" }}>&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-2.5 pt-2" style={{ borderTop: "1px solid #f4f4f5" }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-xs shrink-0"
                    style={{ background: `hsl(${(name.charCodeAt(0) * 37) % 360},55%,48%)` }}>
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: "#18181b" }}>{name}</p>
                    <p className="text-xs" style={{ color: "#71717a" }}>{city} · {joined}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          15. ZERO RISK GUARANTEE
      ══════════════════════════════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-3xl premium-card p-8 sm:p-10 lg:p-14 border-glow">
            <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full pointer-events-none" style={{ background: "rgba(37,211,102,0.08)" }} aria-hidden="true" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl" style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.25)" }}>🛡️</div>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#25d366", letterSpacing: "0.18em" }}>Our zero-risk promise</p>
              </div>
              <h2 className="text-section-title font-bold mb-6 text-balance">
                You have<br />
                <span className="italic font-medium text-foreground-muted" style={{ fontSize: "0.82em" }}>nothing to lose.</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-5 mb-10">
                {[
                  { icon: "🔒", title: "No hidden charges", body: "₹1 is the trial. ₹99/month is the subscription. Nothing else, ever." },
                  { icon: "📵", title: "No spam, no upsells", body: "One WhatsApp message every morning. That's all we ever send. We never sell your number." },
                  { icon: "📞", title: "No pressure calls", body: "No sales calls. No coach calling to upsell you. It's just WhatsApp messages — and you're in charge." },
                  { icon: "🚪", title: "One-tap cancel", body: "Cancel from Razorpay anytime. Or reply STOP to any message. Done. We won't message you again." },
                ].map(({ icon, title, body }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.2)" }}>{icon}</div>
                    <div>
                      <p className="font-bold text-foreground mb-1">{title}</p>
                      <p className="text-sm text-foreground-muted leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl p-6 sm:p-8" style={{ background: "rgba(37,211,102,0.06)", border: "2px solid rgba(37,211,102,0.2)" }}>
                <div className="flex items-start gap-4">
                  <span className="text-3xl shrink-0">🤝</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#25d366" }}>Rohan&apos;s personal commitment</p>
                    <p className="font-serif text-lg sm:text-xl text-foreground italic leading-snug mb-3">
                      &ldquo;Do all 7 days. If you don&apos;t feel a single shift — message me directly. I&apos;ll refund your ₹1 and spend 20 minutes with you personally figuring out why.&rdquo;
                    </p>
                    <p className="text-sm text-foreground-subtle">— Rohan, Founder · Daily Upgrade Club</p>
                  </div>
                </div>
              </div>
              <div className="mt-10 text-center">
                <p className="font-serif text-xl sm:text-2xl italic text-foreground mb-3">Worst case scenario:</p>
                <p className="text-foreground-muted leading-relaxed max-w-xl mx-auto mb-8">
                  You spend 35 minutes over 7 days, pick up 1 or 2 habits that stay with you for life, and never hear from us again. That&apos;s the worst that can happen.
                </p>
                <CTA label="Yes — Start My 7-Day Trial for ₹1" sub="Cancel anytime before Day 7 · Pay nothing more" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          16. FAQ
      ══════════════════════════════════════════════════════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <Eyebrow text="FAQ" />
            <h2 className="text-section-title font-bold">Every question answered</h2>
          </div>
          <div className="space-y-2">
            {[
              { q: "What exactly is a 'tiny healthy habit'?", a: "One specific, science-backed action that takes under 5 minutes and is tied to your monthly health theme. Examples: 5 minutes of morning sunlight (Energy), one spoon of plain curd at lunch (Gut Health), phone face-down 30 min before bed (Sleep), 10 slow breaths before a meeting (Stress). Small. Specific. Explained in 3 lines every morning." },
              { q: "What happens on Day 1 exactly?", a: "The morning after you pay, at 7 AM, you get your first tiny healthy habit in your WhatsApp. It has the habit, the reason it works, and exactly how to do it. You do it. You reply DONE. Your streak starts. That's it." },
              { q: "How do I choose my monthly theme?", a: "When you join, you'll be asked which health area matters most to you right now — Sleep, Energy, Focus, Gut Health, Stress, Fitness, Hydration, or Heart Health. You pick one. All 30 habits that month work on that area. At the end of the month, you can switch or repeat." },
              { q: "What if I miss a day?", a: "Nothing bad happens. One missed day doesn't break the habit or your subscription. You get a gentle evening nudge if you haven't replied DONE by 8 PM. We're building something long-term — not punishing you for being human." },
              { q: "What happens after 7 days?", a: "If you don't cancel before Day 7, your subscription continues at ₹99/month. You get a reminder on Day 6 so you're never caught off guard. Cancel any time from Razorpay — no explanation needed, no hard feelings." },
              { q: "Do I need to download anything?", a: "No. Everything is on WhatsApp. You already have it. No app, no passwords, no login. Just save our number and habits arrive every morning." },
              { q: "Can I switch themes each month?", a: "Yes. At the start of each month, you choose your next theme. Some members cycle through all 8. Some repeat the same one for 3 months until they've truly built the habits. It's yours to design." },
              { q: "I've failed at habits before. Why is this different?", a: "Because the habit arrives in your WhatsApp automatically — you don't have to remember or plan. And it's small enough that even on your worst, most exhausted day, you can still do it in under 5 minutes. The system does the work. You just reply DONE." },
              { q: "What is the ₹99/month for exactly?", a: "It pays for: 30 daily WhatsApp habits, your monthly theme + PDF guide, the weekly health scorecard, access to the private accountability group, the full habit vault (90+ habits), and the weekly wellness newsletter. Everything, every month, for less than the cost of one coffee a week." },
            ].map(({ q, a }) => <FAQ key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          17. FINAL CLOSE
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 lg:py-32" style={{ background: "#18181b" }}>
        <div className="absolute inset-0 sparkle-bg pointer-events-none opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(37,211,102,0.08) 0%,transparent 70%)" }} />
        <div className="max-w-2xl mx-auto px-6 lg:px-10 text-center relative">
          <p className="text-5xl mb-6">🌱</p>
          <h2 className="text-mega font-bold mb-6" style={{ color: "#fff" }}>
            One tiny healthy habit.<br />Tomorrow morning.<br />
            <span style={{ color: "#25d366" }}>On your WhatsApp.</span>
          </h2>
          <p className="text-body-xl mb-4 leading-relaxed" style={{ color: "#a1a1aa" }}>
            30 days from now, you could be the person who says<br />
            <em style={{ color: "#e4e4e7" }}>&ldquo;I&apos;m actually taking care of myself.&rdquo;</em>
          </p>
          <p className="text-body-lg mb-10 leading-relaxed" style={{ color: "#71717a" }}>
            Or you could keep planning to start next Monday.<br /><br />
            <strong style={{ color: "#e4e4e7" }}>₹1 decides which one.</strong>
          </p>
          <CTA label="Yes — Start My Trial for ₹1 →" sub="7 days for ₹1 · Then ₹99/month · Cancel anytime before Day 7" />
          <p className="text-xs mt-6" style={{ color: "#52525b" }}>
            Questions?{" "}
            <a href="https://wa.me/918956146485?text=Hi%2C+I+have+a+question+about+the+Daily+Upgrade+Club" className="underline" style={{ color: "#25d366" }}>
              Chat with Rohan on WhatsApp
            </a>
          </p>

          {/* P.S. — Brunson post-script close */}
          <div className="mt-14 rounded-2xl p-6 text-left" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-sm leading-relaxed" style={{ color: "#a1a1aa" }}>
              <strong style={{ color: "#e4e4e7" }}>P.S.</strong> — The cost of doing nothing is not ₹0. Every month you spend feeling low energy, sleeping poorly, or saying &ldquo;I&apos;ll start properly next week&rdquo; has a real cost — in how you feel, how you perform, and what you&apos;re capable of. The trial costs ₹1. The real question isn&apos;t whether ₹1 is worth it. The question is: how long do you want to wait?
            </p>
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 text-center" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p className="text-xs" style={{ color: "#52525b" }}>
          © {new Date().getFullYear()} Daily Upgrade Club ·{" "}
          <a href="https://www.highperformanceclub.co" className="underline" style={{ color: "#3f3f46" }}>highperformanceclub.co</a>
        </p>
        <p className="text-xs mt-1" style={{ color: "#3f3f46" }}>7-day trial ₹1 · Then ₹99/month · Cancel anytime</p>
      </footer>

      {/* ── Overlays ── */}
      <StickyBottomCTA />
      <BackToTop />
      <LiveEnrollmentToast />
      <TrialPopup />
    </div>
  );
}
