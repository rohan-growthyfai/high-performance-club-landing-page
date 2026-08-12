"use client";
import { useState, useEffect, useRef, createContext, useContext } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// EDIT THIS to change sessions/timings. Everything on the page reads from here.
// ═════════════════════════════════════════════════════════════════════════════
const CHALLENGE = {
  name: "5-Minute Body Challenge",
  days: 14,
  minutes: 5,
  morning: "7:00 AM",
  evening: "7:00 PM",
  platformLabel: "LIVE online, from home",
  seatsLine: "100% free · No equipment · 5 min/day",
};
const WHEN_LINE = `${CHALLENGE.morning} or ${CHALLENGE.evening} · LIVE · Free`;

// Six short looping exercise clips (different people) for the hero LIVE grid.
const LIVE_CLIPS = [
  { who: "Priya (Coach)", clip: "/exercise-1.mp4" },
  { who: "Karan", clip: "/exercise-2.mp4" },
  { who: "Amit", clip: "/exercise-3.mp4" },
  { who: "Neha", clip: "/exercise-4.mp4" },
  { who: "Sushma", clip: "/exercise-5.mp4" },
  { who: "Ravi", clip: "/exercise-6.mp4" },
];

// ─── Register modal context ─────────────────────────────────────────────────────
const RegisterCtx = createContext<() => void>(() => {});
function useRegister() { return useContext(RegisterCtx); }

// ─── Icons ────────────────────────────────────────────────────────────────────
function FlameIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2c1 3 4 4.5 4 8a4 4 0 01-8 0c0-1 .4-1.8 1-2.5C8.5 8 8 9.5 8 11a5 5 0 1010 .5C18 6.5 14 4 12 2z" fill="rgba(255,255,255,0.9)" />
    </svg>
  );
}
function Star() {
  return <svg width="14" height="14" viewBox="0 0 20 20" fill="#f59e0b" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
}

// ─── Brand name — always bold, slightly larger, with trademark ───────────────────
// Use throughout the page so "5-Minute Body" reads as a product, not a phrase.
function Brand({ tm = true, gradient = false, light = false, gold = false }: { tm?: boolean; gradient?: boolean; light?: boolean; gold?: boolean }) {
  const cls = ["brand-name"];
  if (gradient) cls.push("gradient-text");
  else if (light) cls.push("brand-light");
  else if (gold) cls.push("brand-gold");
  return (
    <strong className={cls.join(" ")}>
      5-Minute Body{tm ? <sup style={{ fontSize: "0.6em", fontWeight: 900, top: "-0.5em", position: "relative" }}>™</sup> : null}
    </strong>
  );
}

// ─── CTA button ───────────────────────────────────────────────────────────────
function CTA({ label = "Start My 14-Day Challenge", sub }: { label?: string; sub?: string }) {
  const register = useRegister();
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={register}
        className="btn-primary inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-black"
        style={{ fontSize: 19, boxShadow: "0 10px 30px rgba(212,160,23,0.45)", letterSpacing: "-0.01em", border: "none", cursor: "pointer" }}>
        <FlameIcon size={20} />{label}
      </button>
      {sub && <p style={{ fontSize: 13, color: "#71717a", textAlign: "center" }}>{sub}</p>}
    </div>
  );
}

// ─── Timer chip (recurring 05:00 motif) ─────────────────────────────────────────
function TimerChip({ time = "05:00", light = false }: { time?: string; light?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-black tabular-nums"
      style={{
        fontSize: 13,
        fontVariantNumeric: "tabular-nums",
        background: light ? "rgba(255,255,255,0.12)" : "#18181b",
        color: light ? "#fff" : "#e8a020",
        letterSpacing: "0.02em",
      }}>
      <span style={{ fontSize: 11 }}>⏱</span>{time}
    </span>
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
      {open && <div className="px-5 pb-5 leading-relaxed bg-white" style={{ fontSize: 15.5, color: "#52525b" }}>{a}</div>}
    </div>
  );
}

// ─── Register modal ─────────────────────────────────────────────────────────────
function RegisterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [session, setSession] = useState<"morning" | "evening">("morning");
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
    if (!name.trim() || whatsapp.replace(/\D/g, "").length < 8) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    if (typeof window !== "undefined" && typeof window.fbq === "function")
      window.fbq("track", "CompleteRegistration", { content_name: "5-Minute Body Challenge" });
    try {
      await fetch("/api/5minbody-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), whatsapp: whatsapp.trim(), session }),
      });
      setStatus("done");
    } catch {
      setStatus("done");
    }
  };

  const sessionTime = session === "morning" ? CHALLENGE.morning : CHALLENGE.evening;

  return (
    <>
      <div className="fixed inset-0 z-[110]" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }} onClick={onClose} />
      <div className="fixed inset-0 z-[111] flex items-center justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-sm rounded-3xl overflow-hidden" onClick={e => e.stopPropagation()} style={{ background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.22)", animation: "duc-fadein 0.35s ease" }}>
          <div className="relative px-6 pt-7 pb-5 text-center" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)" }}>
            <button onClick={onClose} className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full cursor-pointer" style={{ background: "rgba(255,255,255,0.2)", border: "none" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>
            </button>
            <p className="text-3xl mb-2">🔥</p>
            <h2 className="text-white font-black leading-snug" style={{ fontSize: 18 }}>
              {status === "done" ? "You're in! See you at your 5 🎉" : "Start your 14-day challenge"}
            </h2>
          </div>

          {status === "done" ? (
            <div className="px-6 py-7 text-center">
              <p style={{ fontSize: 15, color: "#3f3f46", lineHeight: 1.7, marginBottom: 14 }}>
                Your spot is saved. 🎉
              </p>
              <div className="rounded-xl p-4 mb-4 text-center" style={{ background: "rgba(212,160,23,0.06)", border: "1px solid rgba(212,160,23,0.2)" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#9a6b0a", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>Your session</p>
                <p style={{ fontSize: 15, fontWeight: 800, color: "#18181b" }}>{session === "morning" ? "🌅" : "🌙"} {sessionTime} · LIVE</p>
                <p style={{ fontSize: 12.5, color: "#71717a", marginTop: 4 }}>We&apos;ll send the join link on WhatsApp. You can switch sessions any day.</p>
              </div>
              <div className="rounded-xl p-4 mb-5 text-left" style={{ background: "#fafafa", border: "1px solid #e4e4e7" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#18181b", marginBottom: 6 }}>🎁 Try this before Day 1:</p>
                <p style={{ fontSize: 15, color: "#52525b", lineHeight: 1.6 }}>Stand up and take 5 slow, deep breaths right now. That&apos;s how easy showing up will feel.</p>
              </div>
              <button onClick={onClose} className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full font-black btn-primary" style={{ fontSize: 15, border: "none", cursor: "pointer" }}>
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="px-6 py-5">
              <div className="rounded-lg px-3 py-2 mb-4 text-center" style={{ background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.2)" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#9a6b0a" }}>🔥 14 days · 5 min/day · Free · LIVE</span>
              </div>
              <p style={{ fontSize: 15, color: "#52525b", lineHeight: 1.6, marginBottom: 16, textAlign: "center" }}>
                Add your details and pick a session. We&apos;ll send the join link on WhatsApp.
              </p>
              <div className="flex flex-col gap-3">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" autoComplete="name" style={inputStyle} />
                <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="WhatsApp number" type="tel" inputMode="tel" autoComplete="tel" style={inputStyle} />
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#71717a", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Pick your usual time</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {([
                      { key: "morning" as const, icon: "🌅", label: "Morning", time: CHALLENGE.morning },
                      { key: "evening" as const, icon: "🌙", label: "Evening", time: CHALLENGE.evening },
                    ]).map(s => {
                      const active = session === s.key;
                      return (
                        <button type="button" key={s.key} onClick={() => setSession(s.key)}
                          className="rounded-xl px-3 py-3 text-center transition-all"
                          style={{
                            border: active ? "2px solid #d4a017" : "1.5px solid #e4e4e7",
                            background: active ? "rgba(212,160,23,0.08)" : "#fafafa",
                            cursor: "pointer",
                          }}>
                          <p style={{ fontSize: 20 }}>{s.icon}</p>
                          <p style={{ fontSize: 15, fontWeight: 800, color: "#18181b" }}>{s.label}</p>
                          <p style={{ fontSize: 12, color: "#71717a" }}>{s.time}</p>
                        </button>
                      );
                    })}
                  </div>
                  <p style={{ fontSize: 11.5, color: "#a1a1aa", marginTop: 6, textAlign: "center" }}>You can attend whichever fits that day.</p>
                </div>
              </div>
              {status === "error" && (
                <p style={{ fontSize: 12.5, color: "#dc2626", marginTop: 10, textAlign: "center" }}>
                  Please add your name and a valid WhatsApp number.
                </p>
              )}
              <button type="submit" disabled={status === "loading"} className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full font-black btn-primary mt-4" style={{ fontSize: 17.5, boxShadow: "0 6px 20px rgba(212,160,23,0.4)", border: "none", cursor: status === "loading" ? "wait" : "pointer", opacity: status === "loading" ? 0.7 : 1 }}>
                <FlameIcon size={18} />{status === "loading" ? "Saving…" : "Start My Challenge Free →"}
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
      <div className="px-4 pb-4 pt-2 md:hidden">
        <button onClick={register} className="w-full flex items-center justify-between gap-3 rounded-2xl px-5 py-3" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)", boxShadow: "0 8px 28px rgba(212,160,23,0.5)", border: "none", cursor: "pointer" }}>
          <div className="text-left"><p className="text-white font-black text-sm leading-tight">Start My Challenge →</p><p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.85)" }}>14 days · 5 min/day · Free</p></div>
          <div className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}><FlameIcon size={15} /><span className="text-white font-bold text-sm">Join</span></div>
        </button>
      </div>
      <div className="hidden md:block px-6 pb-5 pt-2">
        <div className="max-w-lg mx-auto">
          <button onClick={register} className="w-full flex items-center justify-between gap-4 rounded-2xl px-6 py-3.5" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)", boxShadow: "0 10px 32px rgba(212,160,23,0.5)", border: "none", cursor: "pointer" }}>
            <div className="text-left"><p className="text-white font-black text-sm leading-tight">Start My 14-Day Challenge →</p><p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.85)" }}>{WHEN_LINE}</p></div>
            <div className="flex items-center gap-2 rounded-xl px-4 py-2 shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}><FlameIcon size={16} /><span className="text-white font-bold text-sm">Join Free</span></div>
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
    <div className="fixed left-3 z-40 flex flex-col gap-2 pointer-events-none bottom-[92px] md:bottom-4" aria-live="polite">
      {toasts.map((t, i) => (
        <div key={t.id} className="pointer-events-auto" style={{ opacity: i === 0 ? 1 : 0.65 - i * 0.15, transform: `scale(${1 - i * 0.03})`, transformOrigin: "bottom left", animation: "duc-fadein 0.3s ease" }}>
          <div className="flex items-center gap-2 rounded-2xl px-3 py-2 w-[240px]" style={{ background: "#fff", border: "1px solid #e2dfd6", boxShadow: "0 4px 16px rgba(0,0,0,0.09)" }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ background: `hsl(${(t.name.charCodeAt(0) * 37) % 360},55%,48%)` }}>{t.name[0]}</div>
            <div className="flex-1 min-w-0">
              <p className="font-bold leading-snug truncate" style={{ fontSize: 11, color: "#18181b" }}>{t.name} from {t.city}</p>
              <p className="leading-snug mt-0.5" style={{ fontSize: 10, color: "#71717a" }}>joined the challenge · {t.time}</p>
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
      try { if (localStorage.getItem("5mb_pop") === "1") return; } catch { /**/ }
      shown.current = true; setVisible(true);
    }, 22000);
    return () => clearTimeout(t);
  }, []);
  const dismiss = () => { setVisible(false); setDismissed(true); try { localStorage.setItem("5mb_pop", "1"); } catch { /**/ } };
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
            <p className="text-3xl mb-2">🔥</p>
            <h2 className="text-white font-black leading-snug" style={{ fontSize: 18 }}>Give your body 5 minutes 🎉</h2>
          </div>
          <div className="px-6 py-5 text-center">
            <p style={{ fontSize: 15.5, color: "#3f3f46", lineHeight: 1.7, marginBottom: 12 }}>
              A free 14-day LIVE challenge. Just <strong style={{ color: "#18181b" }}>5 focused minutes a day</strong> — no gym, no equipment.
            </p>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#9a6b0a", marginBottom: 16 }}>🔥 {WHEN_LINE}</p>
            <button onClick={() => { dismiss(); register(); }} className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full font-black btn-primary" style={{ fontSize: 17.5, boxShadow: "0 6px 20px rgba(212,160,23,0.4)", border: "none", cursor: "pointer" }}>
              <FlameIcon size={18} />Start My Challenge Free →
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
        content_name: "5-Minute Body Challenge",
        content_category: "Challenge Registration",
      });
    }
  }, []);
}

// ─── Small helpers ───────────────────────────────────────────────────────────
function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <p className="duc-label mb-3" style={dark ? { color: "#a8790d" } : undefined}>{children}</p>;
}

// ─── Ken Burns image — a real photo with a slow, gentle zoom/pan loop ────────────
// `delay` staggers multiple images so they don't move in lockstep.
function KenBurns({ src, alt, objectPosition = "center", delay = 0, className = "" }:
  { src: string; alt: string; objectPosition?: string; delay?: number; className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`} style={{ width: "100%", height: "100%" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="fmb-kb"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition, display: "block", animationDelay: `${delay}s` }}
        onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
    </div>
  );
}

// ─── CountUp — animates a number up to `target` when scrolled into view ──────────
function CountUp({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(() => (prefersReducedMotion() ? target : 0));
  useEffect(() => {
    if (val === target) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some(e => e.isIntersecting)) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1600;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(target * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return <span ref={ref}>{val.toLocaleString("en-IN")}</span>;
}

// ─── Institution badge — a colored monogram emblem for research sources ──────────
// A styled crest (not the institutions' actual trademarked logos) in each
// institution's signature colour, so the science cards read as credible sources.
function InstitutionBadge({ label, bg, fg }: { label: string; bg: string; fg: string }) {
  return (
    <div
      className="flex items-center justify-center rounded-2xl shrink-0"
      style={{ width: 64, height: 64, background: bg, boxShadow: "0 6px 16px -6px rgba(0,0,0,0.35)", border: "2px solid rgba(255,255,255,0.15)" }}
      aria-label={label}>
      <span style={{ color: fg, fontWeight: 900, fontSize: label.length > 5 ? 10 : 15, letterSpacing: "0.04em", textAlign: "center", lineHeight: 1 }}>
        {label}
      </span>
    </div>
  );
}

// ─── Animated 14-day streak strip ───────────────────────────────────────────────
// The black circles stay constant. When scrolled into view, gold "completed"
// circles fill in one-by-one from day 1 to day 14; once the sweep reaches the
// last cell, the trophy pops big and celebrates. Respects prefers-reduced-motion.
function prefersReducedMotion() {
  return typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}
function StreakStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(prefersReducedMotion);
  useEffect(() => {
    if (lit) return; // already lit (reduced motion) — nothing to observe
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some(e => e.isIntersecting)) { setLit(true); io.disconnect(); }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [lit]);

  // Each day's gold fill lands STEP seconds after the previous — a clear,
  // sequential fill from day 1 → day 14. The trophy fires after the last fill.
  const STEP = 0.3;
  const trophyDelay = 13 * STEP;
  return (
    <div ref={ref} className="rounded-2xl mt-8 px-4 py-6 overflow-x-auto" style={{ background: "#18181b" }}>
      <div className="flex items-center justify-start md:justify-center gap-1.5 min-w-max" style={{ paddingRight: 16, paddingLeft: 6 }}>
        {Array.from({ length: 14 }, (_, i) => i + 1).map(d => {
          const isTrophy = d === 14;
          const fillDelay = (d - 1) * STEP;
          return (
            <div key={d} className="flex flex-col items-center gap-1" style={{ minWidth: 34, position: "relative" }}>
              {/* constant black base circle — always present, shows the day number */}
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-black" style={{ position: "relative", fontSize: 12, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
                <span>{isTrophy ? "" : d}</span>
                {/* gold "completed" overlay that fills in, in sequence, on top of the black base */}
                {lit && (
                  <div
                    className={isTrophy ? "fmb-trophy-fill" : "fmb-fill"}
                    style={{
                      position: "absolute", inset: 0, borderRadius: "9999px",
                      background: "linear-gradient(135deg,#b8860b,#d4a017)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#171412", fontWeight: 900, fontSize: 12,
                      border: isTrophy ? "1.5px solid #e8a020" : "none",
                      opacity: 0,
                      animationDelay: isTrophy ? `${trophyDelay}s` : `${fillDelay}s`,
                      zIndex: isTrophy ? 3 : 1,
                    }}>
                    {isTrophy ? "🏆" : "🔥"}
                  </div>
                )}
              </div>
              {/* sparkle burst on the trophy when the sweep arrives */}
              {isTrophy && lit && (
                <span className="fmb-trophy-spark" style={{ animationDelay: `${trophyDelay + 0.15}s` }} aria-hidden="true" />
              )}
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>{d}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGE — simple words, big visuals, understandable at a glance
// ═════════════════════════════════════════════════════════════════════════════
export default function FiveMinuteBodyChallengePage() {
  useMetaPixelViewContent();
  const [modalOpen, setModalOpen] = useState(false);
  const openRegister = () => setModalOpen(true);

  return (
    <RegisterCtx.Provider value={openRegister}>
    <div id="fmb-top" style={{ background: "#faf8f3", minHeight: "100vh", color: "#18181b", fontSize: 17 }}>
      <style>{`
        @keyframes duc-fadein{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fmb-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes fmb-pulse-ring{0%{transform:scale(0.9);opacity:0.7}70%{transform:scale(1.25);opacity:0}100%{opacity:0}}
        /* streak strip: each gold "completed" circle fills in over its black base */
        @keyframes fmb-fill{0%{opacity:0;transform:scale(0.25)}60%{opacity:1;transform:scale(1.18);box-shadow:0 0 0 5px rgba(232,160,32,0.28),0 0 16px 4px rgba(232,160,32,0.5)}100%{opacity:1;transform:scale(1);box-shadow:0 0 0 0 rgba(232,160,32,0)}}
        /* trophy: pops BIG when the sweep reaches it, then celebrates */
        @keyframes fmb-trophy-pop{0%{opacity:0;transform:scale(0.35)}45%{opacity:1;transform:scale(1.85)}64%{transform:scale(1.5)}82%{transform:scale(1.75)}100%{opacity:1;transform:scale(1.6)}}
        @keyframes fmb-trophy-ring{0%,100%{box-shadow:0 0 0 0 rgba(232,160,32,0.6)}50%{box-shadow:0 0 0 10px rgba(232,160,32,0)}}
        @keyframes fmb-spark{0%{opacity:0;transform:scale(0.2)}30%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.9)}}
        #fmb-top .fmb-fill{animation:fmb-fill 0.6s cubic-bezier(0.22,1,0.36,1) both}
        /* the trophy grows and stays big + gold-glow celebrating ring */
        #fmb-top .fmb-trophy-fill{animation:fmb-trophy-pop 0.9s cubic-bezier(0.34,1.56,0.64,1) both,fmb-trophy-ring 1.8s ease-in-out infinite 1.1s;transform-origin:center}
        #fmb-top .fmb-trophy-spark{position:absolute;top:16px;left:50%;width:56px;height:56px;margin-left:-28px;border-radius:50%;pointer-events:none;
          background:radial-gradient(circle,rgba(232,160,32,0.55) 0%,rgba(232,160,32,0) 62%);
          animation:fmb-spark 0.9s ease-out both}
        /* Ken Burns — slow gentle zoom/pan on real photos */
        @keyframes fmb-kenburns{0%{transform:scale(1) translate(0,0)}50%{transform:scale(1.12) translate(-1.5%,-1.5%)}100%{transform:scale(1) translate(0,0)}}
        #fmb-top .fmb-kb{animation:fmb-kenburns 16s ease-in-out infinite;will-change:transform}
        @media (prefers-reduced-motion: reduce){
          #fmb-top .fmb-fill,#fmb-top .fmb-trophy-fill,#fmb-top .fmb-trophy-spark,#fmb-top .fmb-kb{animation:none!important;opacity:1!important;transform:none!important}
          #fmb-top .fmb-trophy-spark{display:none}
        }
        .duc-h1{font-size:clamp(2.2rem,5.5vw,3.7rem);font-weight:900;line-height:1.05;letter-spacing:-0.03em}
        .duc-h2{font-size:clamp(1.7rem,4vw,2.6rem);font-weight:900;line-height:1.12;letter-spacing:-0.02em}
        .duc-label{font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:#a8790d}
        .duc-section-title{color:#18181b}
        #fmb-top .brand-name{font-weight:900;font-size:1.09em;letter-spacing:-0.01em;color:#18181b;white-space:nowrap}
        #fmb-top .brand-name.gradient-text{color:transparent}
        #fmb-top .brand-name.brand-light{color:#fff}
        #fmb-top .brand-name.brand-gold{color:#e8a020}
        #fmb-top .gradient-text{background:linear-gradient(135deg,#b8860b 0%,#d4a017 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}
        #fmb-top .btn-primary{background:linear-gradient(135deg,#c8891a 0%,#e0b022 50%,#d4a017 100%);color:#171412;font-weight:900;box-shadow:0 8px 28px rgba(184,134,11,0.45),inset 0 1px 0 rgba(255,255,255,0.35)}
        #fmb-top .btn-primary:hover{background:linear-gradient(135deg,#b8860b 0%,#e6be3a 50%,#c8891a 100%);box-shadow:0 12px 36px rgba(184,134,11,0.55)}
        #fmb-top .btn-primary:active{background:#9a6b0a}
        #fmb-top .accent-pill{background:rgba(212,160,23,0.12);color:#8a6508;border:1px solid rgba(212,160,23,0.35)}
        #fmb-top .mesh-bg{background:radial-gradient(60% 55% at 15% 10%,rgba(212,160,23,0.12) 0%,rgba(212,160,23,0) 60%),radial-gradient(55% 50% at 90% 15%,rgba(200,137,26,0.10) 0%,rgba(200,137,26,0) 60%),#faf8f3}
        .pop-card{transition:transform 0.2s, box-shadow 0.2s}
        .pop-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px -12px rgba(184,134,11,0.3)}
      `}</style>

      {/* ══ 0. ANNOUNCEMENT BAR ══════════════════════════════════════════════ */}
      <div style={{ background: "linear-gradient(90deg,#b8860b 0%,#d4a017 50%,#b8860b 100%)", padding: "13px 16px" }}>
        <p className="text-center font-black text-white" style={{ fontSize: "clamp(15px,2.6vw,19px)", letterSpacing: "0.01em", lineHeight: 1.35 }}>
          🔥 FREE 14-Day LIVE Challenge · {CHALLENGE.minutes} min/day · {CHALLENGE.morning} or {CHALLENGE.evening}
        </p>
      </div>

      {/* ══ 1. HERO ═════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden mesh-bg" style={{ borderBottom: "1px solid #e2dfd6" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-12 pb-14 lg:pt-16 text-center">

          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-6 accent-pill" style={{ fontSize: "clamp(15.5px,2.4vw,19px)", fontWeight: 900, letterSpacing: "0.03em" }}>
            🇮🇳 INDIA&apos;S FIRST DAILY FITNESS HABIT PROGRAM
          </div>

          <h1 className="duc-h1 mb-5">
            Give Your Body Just<br className="hidden sm:block" />{" "}
            <span className="gradient-text">5 Minutes A Day.</span>
          </h1>

          <p style={{ fontSize: 20, lineHeight: 1.55, color: "#3f3f46", maxWidth: 680, margin: "0 auto 10px", fontWeight: 500 }}>
            Join the FREE 14-Day <Brand /> Challenge and build the habit of moving your body every day — with just <strong style={{ color: "#18181b" }}>5 focused minutes of LIVE exercise</strong>. <strong style={{ color: "#18181b" }}>No equipment needed.</strong>
          </p>

          {/* When / where — big clear badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-7 mb-8">
            {[
              { icon: "🎁", label: "100% FREE" },
              { icon: "🔴", label: "LIVE Daily" },
              { icon: "👥", label: "Do with Community" },
              { icon: "🏠", label: "Join from Anywhere" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 rounded-full px-4 py-2.5" style={{ background: "#fff", border: "1.5px solid #e6d9b0", boxShadow: "0 4px 14px rgba(0,0,0,0.05)" }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <span style={{ fontSize: 15.5, fontWeight: 800, color: "#18181b" }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Hero visual — animated LIVE session grid (6 different people) */}
          <div className="max-w-2xl mx-auto mb-9">
            <div className="rounded-3xl overflow-hidden relative" style={{ border: "1.5px solid #e6d9b0", boxShadow: "0 24px 55px -18px rgba(0,0,0,0.45)", background: "#171412" }}>
              {/* Header bar: LIVE + timer */}
              <div className="flex items-center justify-between px-4 py-2.5" style={{ background: "rgba(0,0,0,0.4)" }}>
                <div className="flex items-center gap-2">
                  <span className="relative flex w-2.5 h-2.5">
                    <span className="absolute inline-flex w-full h-full rounded-full" style={{ background: "#ef4444", animation: "fmb-pulse-ring 1.6s ease-out infinite" }} />
                    <span className="relative inline-flex w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
                  </span>
                  <span className="text-white font-black" style={{ fontSize: 12, letterSpacing: "0.08em" }}>LIVE</span>
                </div>
                <TimerChip time="05:00" light />
              </div>
              {/* Video-call grid — a different person exercising in each tile */}
              <div className="grid grid-cols-3 gap-1.5 p-2.5">
                {LIVE_CLIPS.map(({ who, clip }, i) => (
                  <div key={i} className="rounded-xl overflow-hidden relative" style={{ aspectRatio: "1", background: "rgba(255,255,255,0.05)", border: i === 0 ? "1.5px solid #d4a017" : "1px solid rgba(255,255,255,0.08)" }}>
                    <video
                      src={clip}
                      autoPlay muted loop playsInline
                      preload={i < 3 ? "auto" : "none"}
                      poster="/live-zoom.png"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <span className="absolute bottom-1 left-1 rounded px-1.5 py-0.5 text-white font-bold" style={{ fontSize: 9, background: "rgba(0,0,0,0.55)" }}>{who}</span>
                  </div>
                ))}
              </div>
              {/* Caption bar */}
              <div className="px-4 py-3 flex items-center justify-center gap-2" style={{ background: "rgba(0,0,0,0.4)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ fontSize: 15, color: "#fff", fontWeight: 900, letterSpacing: "0.02em" }}>5 Minutes.</span>
                <span style={{ fontSize: 15, color: "#fff", fontWeight: 900, letterSpacing: "0.02em" }}>Every Day.</span>
                <span style={{ fontSize: 15, color: "#e8a020", fontWeight: 900, letterSpacing: "0.02em" }}>Together.</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-2 mb-9">
            <button onClick={openRegister} className="btn-primary inline-flex items-center gap-3 px-12 py-6 rounded-full font-black" style={{ fontSize: 22, boxShadow: "0 12px 34px rgba(212,160,23,0.45)", border: "none", cursor: "pointer" }}>
              <FlameIcon size={24} />Start My 14-Day Challenge
            </button>
            <p style={{ fontSize: 13, color: "#71717a" }}>FREE · LIVE · 5 MIN/DAY · NO EQUIPMENT</p>
          </div>

          {/* tiny social proof */}
          <div className="flex items-center justify-center gap-3 mt-2">
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

      {/* ══ 1b. "WAIT… JUST 5 MINUTES?" — the science (moved below hero) ═════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-9">
            <SectionLabel>Backed by the science</SectionLabel>
            <h2 className="duc-h1 duc-section-title mb-6">&ldquo;Wait… <span className="gradient-text">just 5 minutes?</span>&rdquo;</h2>
            <div className="rounded-2xl px-6 py-6 text-center" style={{ background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.28)", maxWidth: 700, margin: "0 auto" }}>
              <p style={{ fontSize: "clamp(1.15rem,2.6vw,1.5rem)", fontWeight: 900, color: "#18181b", lineHeight: 1.45 }}>
                Because <span className="gradient-text">5 focused minutes of exercise, done daily,</span>{" "}is enough to keep your body healthy and fit — and it&apos;s a habit you can actually keep for a lifetime.
              </p>
            </div>
          </div>

          {/* Research callouts — trusted institutions, staying-healthy framing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                badge: <InstitutionBadge label="HARVARD" bg="#a51c30" fg="#fff" />,
                head: "Harvard Health",
                body: "Just a few focused minutes of daily exercise supports a healthier heart and helps you stay fit over time — consistency matters far more than duration.",
              },
              {
                badge: <InstitutionBadge label="MAYO" bg="#0a4d8c" fg="#fff" />,
                head: "Mayo Clinic",
                body: "A short daily dose of movement keeps your body strong, your energy up and your health on track — small amounts, done every day, add up.",
              },
              {
                badge: <InstitutionBadge label="WHO" bg="#0093d5" fg="#fff" />,
                head: "World Health Organization",
                body: "Being active every day protects your long-term health. 5 focused minutes a day is a genuine, doable way to keep yourself fit and healthy.",
              },
            ].map(({ badge, head, body }) => (
              <div key={head} className="pop-card rounded-2xl p-6 flex flex-col items-center text-center" style={{ background: "#faf8f3", border: "1.5px solid #e6d9b0" }}>
                {badge}
                <p style={{ fontSize: 16, fontWeight: 900, color: "#18181b", margin: "12px 0 6px", lineHeight: 1.3 }}>{head}</p>
                <p style={{ fontSize: 15, color: "#52525b", lineHeight: 1.55 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 1c. COMMUNITY + MOVEMENT (moved below the science section) ═══════ */}
      <section className="relative overflow-hidden py-16 lg:py-24" style={{ background: "linear-gradient(135deg,#171412 0%,#18181b 50%,#171412 100%)" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative">
          <SectionLabel dark>You&apos;re not doing this alone</SectionLabel>
          <h2 className="duc-h2 mb-4" style={{ color: "#fff" }}>5 Minutes. Every Day.<br /> <span style={{ color: "#e8a020" }}>Together.</span></h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.75)", maxWidth: 560, margin: "0 auto 2rem", lineHeight: 1.6 }}>
            Every morning and evening, people from across the community show up and do their 5 together. We&apos;re building a community of people who believe fitness doesn&apos;t have to start with an hour. <strong style={{ color: "#fff" }}>It can start with 5.</strong>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-9">
            {[
              { icon: "🌅", label: `${CHALLENGE.morning} — Morning 5` },
              { icon: "🌙", label: `${CHALLENGE.evening} — Evening 5` },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 rounded-full px-5 py-3" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(212,160,23,0.3)" }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <span style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Real people — different homes, same 5 (Ken Burns) */}
          <div className="rounded-3xl overflow-hidden mb-10 relative" style={{ border: "1.5px solid rgba(212,160,23,0.3)", boxShadow: "0 24px 55px -20px rgba(0,0,0,0.6)", maxWidth: 760, margin: "0 auto 2.5rem", aspectRatio: "16 / 9" }}>
            <KenBurns src="/fmb-community.png" alt="Real people across India doing their 5 minutes at home — different ages, different homes, same challenge" />
            <div className="absolute inset-x-0 bottom-0 px-4 py-3 flex items-center justify-center gap-2 z-10" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.75),transparent)" }}>
              <span style={{ fontSize: 14, color: "#fff", fontWeight: 800 }}>Different homes. Different ages.</span>
              <span style={{ fontSize: 14, color: "#e8a020", fontWeight: 900 }}>Same 5.</span>
            </div>
          </div>

          {/* Mission + live counter */}
          <div className="rounded-3xl px-6 py-8" style={{ background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.25)", maxWidth: 620, margin: "0 auto" }}>
            <p style={{ fontSize: 13, fontWeight: 900, color: "#a8790d", letterSpacing: "0.14em", marginBottom: 8 }}>OUR MISSION</p>
            <p style={{ fontSize: "clamp(1.4rem,3.4vw,2rem)", fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 18 }}>
              Get 1 Million People<br /><span style={{ color: "#e8a020" }}>Moving Every Day.</span>
            </p>
            <div className="inline-flex items-center gap-2.5 rounded-full px-5 py-2.5" style={{ background: "#18181b", border: "1px solid rgba(212,160,23,0.35)" }}>
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inline-flex w-full h-full rounded-full" style={{ background: "#e8a020", animation: "fmb-pulse-ring 1.6s ease-out infinite" }} />
                <span className="relative inline-flex w-2.5 h-2.5 rounded-full" style={{ background: "#e8a020" }} />
              </span>
              <span style={{ fontSize: 16, fontWeight: 900, color: "#e8a020", letterSpacing: "0.02em" }}>🔥 <CountUp target={184729} /> 5s Completed</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. THE CORE PROBLEM ═════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <SectionLabel>The real problem</SectionLabel>
            <h2 className="duc-h2 duc-section-title">You know you should exercise.<br className="hidden sm:block" /> <span className="gradient-text">But finding the time is the problem.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { emoji: "⏰", title: "NO TIME", line: "A 45–60 minute workout never seems to fit into your day." },
              { emoji: "😴", title: "NO ENERGY", line: "By the time you finally get free, exercising is the last thing you feel like." },
              { emoji: "🔄", title: "NO CONSISTENCY", line: "You start… miss a few days… and eventually stop altogether." },
            ].map(({ emoji, title, line }) => (
              <div key={title} className="rounded-2xl p-6 flex flex-col items-center text-center" style={{ background: "#faf8f3", border: "1.5px solid #eee7d6" }}>
                <span style={{ fontSize: 44, marginBottom: 10 }}>{emoji}</span>
                <p style={{ fontSize: 15.5, fontWeight: 900, color: "#18181b", letterSpacing: "0.04em", marginBottom: 6 }}>{title}</p>
                <p style={{ fontSize: 15.5, color: "#52525b", lineHeight: 1.5 }}>{line}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-9" style={{ fontSize: 21, fontWeight: 800, color: "#18181b", maxWidth: 680, margin: "2.2rem auto 0", lineHeight: 1.4 }}>
            So instead of asking you to find another extra hour…<br />
            <span style={{ color: "#a8790d" }}>what if we started with just FIVE minutes?</span> 👇
          </p>
        </div>
      </section>

      {/* ══ 2b. NOT ANOTHER FITNESS CHALLENGE ═══════════════════════════════ */}
      <section className="relative overflow-hidden py-16 lg:py-24" style={{ background: "linear-gradient(135deg,#171412 0%,#18181b 50%,#171412 100%)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(212,160,23,0.12),transparent 70%)" }} />
        <div className="max-w-4xl mx-auto px-6 lg:px-10 relative">
          <div className="text-center mb-11">
            <SectionLabel dark>More than a workout challenge</SectionLabel>
            <h2 className="duc-h2" style={{ color: "#fff" }}>We&apos;re building a <span style={{ color: "#e8a020" }}>daily fitness habit.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Typical approach */}
            <div className="rounded-3xl overflow-hidden" style={{ border: "1.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}>
              <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <p style={{ fontSize: 14, fontWeight: 900, color: "rgba(255,255,255,0.55)", letterSpacing: "0.05em" }}>TYPICAL FITNESS APPROACH</p>
              </div>
              <div className="p-6 flex flex-col gap-3.5">
                {["Start with long workouts", "Depend on motivation", "Miss a few days", "Eventually stop"].map(t => (
                  <div key={t} className="flex items-center gap-3"><span style={{ fontSize: 16 }}>❌</span><span style={{ fontSize: 16, color: "rgba(255,255,255,0.7)" }}>{t}</span></div>
                ))}
              </div>
            </div>
            {/* 5-Minute Body */}
            <div className="rounded-3xl overflow-hidden" style={{ border: "1.5px solid #d4a017", background: "rgba(212,160,23,0.07)", boxShadow: "0 14px 40px -16px rgba(212,160,23,0.5)" }}>
              <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(212,160,23,0.25)" }}>
                <p style={{ fontSize: 14, fontWeight: 900, letterSpacing: "0.05em" }}><Brand gold /></p>
              </div>
              <div className="p-6 flex flex-col gap-3.5">
                {["Start with just 5 minutes", "Show up every day", "Track your consistency", "Build the habit"].map(t => (
                  <div key={t} className="flex items-center gap-3"><span style={{ fontSize: 16 }}>🔥</span><span style={{ fontSize: 16, color: "#fff", fontWeight: 600 }}>{t}</span></div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center" style={{ fontSize: "clamp(1.8rem,4.5vw,2.6rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", margin: "2.5rem auto 0" }}>
            Don&apos;t start big.<br /><span style={{ color: "#e8a020" }}>Start consistent.</span>
          </p>
        </div>
      </section>

      {/* ══ 3. THE BIG IDEA ═════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-16 lg:py-24" style={{ background: "#faf8f3" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(212,160,23,0.1),transparent 70%)" }} />
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative">
          <h2 style={{ fontSize: "clamp(2.4rem,7vw,4.4rem)", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-0.035em", color: "#18181b" }}>
            5 MINUTES.<br />14 DAYS.<br /><span className="gradient-text">ONE SIMPLE CHALLENGE.</span>
          </h2>
          <p style={{ fontSize: 18, color: "#52525b", maxWidth: 560, margin: "1.6rem auto 0", lineHeight: 1.6 }}>
            Show up for your body for just 5 focused minutes every day.
          </p>

          <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto mt-10">
            {[
              { day: "DAY 1", line: "Start where you are" },
              { day: "DAY 7", line: "Start noticing changes in your body" },
              { day: "DAY 14", line: "A more healthier & better version of yourself" },
            ].map(({ day, line }, i) => (
              <div key={day} className="rounded-2xl px-3 py-5 text-center" style={{ background: "#fff", border: i === 2 ? "1.5px solid #d4a017" : "1.5px solid #e6d9b0", boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
                <p style={{ fontSize: 13, fontWeight: 900, color: "#a8790d", marginBottom: 6 }}>{day}</p>
                <p style={{ fontSize: 13, color: "#52525b", lineHeight: 1.4 }}>{line}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl px-6 py-6 mt-10" style={{ background: "linear-gradient(135deg,#171412,#26211a)", maxWidth: 620, margin: "2.5rem auto 0" }}>
            <p style={{ fontSize: "clamp(1.05rem,2.5vw,1.35rem)", fontWeight: 800, color: "#fff", lineHeight: 1.45 }}>
              We&apos;re not asking you to become a fitness freak overnight.<br />
              <span style={{ color: "#e8a020" }}>We&apos;re helping you prove that exercise can fit into your life.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ══ 4. HOW IT WORKS ═════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <SectionLabel>Zero confusion</SectionLabel>
            <h2 className="duc-h2 duc-section-title">Here&apos;s exactly how the<br className="hidden sm:block" /> <Brand gradient /> <span className="gradient-text">Challenge works</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { n: "01", emoji: "✍️", title: "Register free", line: <>Join the 14-Day Challenge in seconds.</> },
              { n: "02", emoji: "🕑", title: "Choose your session", line: <><strong style={{ color: "#18181b" }}>{CHALLENGE.morning} (Morning) or {CHALLENGE.evening} (Evening)</strong> — attend whichever works that day.</> },
              { n: "03", emoji: "🔥", title: "Do your 5", line: <>Exercise together LIVE with community for 5 focused minutes.</> },
              { n: "04", emoji: "✅", title: "Mark it DONE", line: <>Tap DONE on WhatsApp and build your 14-day streak.</> },
            ].map(({ n, emoji, title, line }) => (
              <div key={n} className="pop-card rounded-2xl p-6 flex flex-col items-center text-center relative" style={{ background: "#fff", border: "1.5px solid #e6d9b0" }}>
                <span className="absolute top-3 right-4 font-black" style={{ fontSize: 26, color: "rgba(212,160,23,0.22)" }}>{n}</span>
                <span style={{ fontSize: 40, marginBottom: 10 }}>{emoji}</span>
                <p style={{ fontSize: 17.5, fontWeight: 900, color: "#18181b", marginBottom: 6 }}>{title}</p>
                <p style={{ fontSize: 15, color: "#52525b", lineHeight: 1.5 }}>{line}</p>
              </div>
            ))}
          </div>

          {/* Streak strip — animated ignite on scroll-in */}
          <StreakStrip />
          <div className="flex justify-center mt-10">
            <CTA label="Start My Challenge Free →" sub={WHEN_LINE} />
          </div>
        </div>
      </section>

      {/* ══ 5. WHAT HAPPENS INSIDE THE FIVE ═════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-11">
            <SectionLabel>The actual method</SectionLabel>
            <h2 className="duc-h2 duc-section-title">What happens inside your <Brand gradient tm={false} /> <span className="gradient-text">Challenge?</span></h2>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { t: "1", icon: "🔥", head: "WARM", body: "A guided warm-up to prepare your body for today's movements.", c: "#d4a017" },
              { t: "2", icon: "⚡", head: "WORK", body: "Focused movement. Choose the variation like Easy, Moderate or Intense that fits you.", c: "#f97316" },
              { t: "3", icon: "💨", head: "RESET", body: "A short recovery. Catch your breath. Get ready again.", c: "#0ea5e9" },
              { t: "4", icon: "⚡", head: "WORK", body: "Let's go again — one more focused round.", c: "#f97316" },
              { t: "5", icon: "🔥", head: "FINISH", body: "Finish today's 5 together.", c: "#d4a017" },
            ].map(({ t, icon, head, body, c }, i) => (
              <div key={i} className="flex items-stretch gap-3">
                <div className="flex flex-col items-center shrink-0" style={{ width: 52 }}>
                  <div className="rounded-full flex items-center justify-center font-black shrink-0" style={{ width: 44, height: 44, fontSize: 20, background: "#18181b", color: "#e8a020" }}>{t}</div>
                  {i < 4 && <div style={{ flex: 1, width: 2, background: "linear-gradient(#e6d9b0,#e6d9b0)", marginTop: 4 }} />}
                </div>
                <div className="flex-1 rounded-2xl p-4 flex items-center gap-4 mb-1" style={{ background: "#faf8f3", border: "1.5px solid #e6d9b0" }}>
                  <span style={{ fontSize: 30 }}>{icon}</span>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 900, color: c, letterSpacing: "0.04em" }}>{head}</p>
                    <p style={{ fontSize: 15.5, color: "#52525b", lineHeight: 1.5 }}>{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl px-6 py-6 text-center mt-8" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)" }}>
            <p style={{ fontSize: "clamp(1.3rem,3vw,1.7rem)", fontWeight: 900, color: "#fff" }}>That&apos;s it. 5 minutes. Done. ✓</p>
          </div>
        </div>
      </section>

      {/* ══ 6. YOUR LEVEL — EASY / MODERATE / INTENSE ═══════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-11">
            <SectionLabel>Every body is welcome</SectionLabel>
            <h2 className="duc-h2 duc-section-title mb-3">Choose your intensity.</h2>
            <p style={{ fontSize: 17.5, color: "#52525b", maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
              Every exercise comes with different variations. Whether you&apos;re getting started or already active, <strong style={{ color: "#18181b" }}>choose the intensity that challenges your body</strong>.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { tag: "🟢 EASY", ex: "Wall Push-up", sub: "Go at Your Comfort", clip: "/pushup-easy.mp4", c: "#059669", bg: "#f0fdf4", bd: "#bbf7d0" },
              { tag: "🟡 MODERATE", ex: "Incline Push-up", sub: "Challenge Yourself", clip: "/pushup-moderate.mp4", c: "#b8860b", bg: "#fffbeb", bd: "#fde68a" },
              { tag: "🔥 INTENSE", ex: "Full Push-up", sub: "Push Further", clip: "/pushup-intense.mp4", c: "#dc2626", bg: "#fff7f7", bd: "#fecaca" },
            ].map(({ tag, ex, sub, clip, c, bg, bd }) => (
              <div key={tag} className="pop-card rounded-3xl overflow-hidden flex flex-col" style={{ background: bg, border: `2px solid ${bd}` }}>
                {/* Video: the same exercise (push-up) shown at this intensity */}
                <div className="relative" style={{ aspectRatio: "16 / 10", background: "#171412" }}>
                  <video
                    src={clip}
                    autoPlay muted loop playsInline
                    preload="none"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <span className="absolute top-2.5 left-2.5 rounded-full px-2.5 py-1 font-black" style={{ fontSize: 12, background: "rgba(255,255,255,0.92)", color: c, letterSpacing: "0.03em" }}>{tag}</span>
                </div>
                <div className="p-6 text-center">
                  <p style={{ fontSize: 21, fontWeight: 900, color: "#18181b", marginBottom: 5, letterSpacing: "-0.01em" }}>{ex}</p>
                  <p style={{ fontSize: 15.5, fontWeight: 700, color: c }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-9" style={{ fontSize: "clamp(1.4rem,3.4vw,2rem)", fontWeight: 900, color: "#18181b", maxWidth: 560, margin: "2.2rem auto 0", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
            Same 5 minutes.<br />
            <span className="gradient-text">Your intensity. Your pace.</span>
          </p>
        </div>
      </section>

      {/* ══ 7. 14-DAY JOURNEY ═══════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-11">
            <SectionLabel>What you&apos;re signing up for</SectionLabel>
            <h2 className="duc-h2 duc-section-title">Your 14-Day <Brand gradient /> <span className="gradient-text">Journey</span></h2>
          </div>

          {[
            { week: "WEEK 1 — BUILD YOUR BASE", days: [
              { d: "1", icon: "🔥", t: "Starting 5" }, { d: "2", icon: "🦵", t: "Lower Body" }, { d: "3", icon: "💪", t: "Upper Body" },
              { d: "4", icon: "⚡", t: "Cardio" }, { d: "5", icon: "🎯", t: "Core" }, { d: "6", icon: "🤸", t: "Mobility" }, { d: "7", icon: "🏆", t: "Halfway 5" },
            ] },
            { week: "WEEK 2 — BUILD YOUR CAPACITY", days: [
              { d: "8", icon: "🦵", t: "Lower Body 2.0" }, { d: "9", icon: "💪", t: "Upper Body 2.0" }, { d: "10", icon: "⚡", t: "Cardio 2.0" },
              { d: "11", icon: "🎯", t: "Core 2.0" }, { d: "12", icon: "⚖️", t: "Balance + Control" }, { d: "13", icon: "🔥", t: "Full Body" }, { d: "14", icon: "🏆", t: "Final 5" },
            ] },
          ].map(({ week, days }) => (
            <div key={week} className="mb-6">
              <p className="mb-3" style={{ fontSize: 13, fontWeight: 900, color: "#9a6b0a", letterSpacing: "0.05em" }}>{week}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                {days.map(({ d, icon, t }) => {
                  const finale = t.includes("Halfway") || t.includes("Final");
                  return (
                    <div key={d} className="rounded-xl p-3 text-center" style={{ background: finale ? "linear-gradient(135deg,#171412,#26211a)" : "#faf8f3", border: finale ? "1.5px solid #d4a017" : "1.5px solid #e6d9b0" }}>
                      <p style={{ fontSize: 10, fontWeight: 800, color: finale ? "#e8a020" : "#a8790d", letterSpacing: "0.06em" }}>DAY {d}</p>
                      <p style={{ fontSize: 24, margin: "4px 0" }}>{icon}</p>
                      <p style={{ fontSize: 11.5, fontWeight: 700, color: finale ? "#fff" : "#18181b", lineHeight: 1.25 }}>{t}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          <p className="text-center mt-4" style={{ fontSize: 15, color: "#a1a1aa", maxWidth: 560, margin: "1.5rem auto 0" }}>
            Sample plan — the exact daily programming is designed to keep every level moving safely.
          </p>
        </div>
      </section>

      {/* ══ 12. STREAK / GAMIFICATION ═══════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <SectionLabel>Build your streak</SectionLabel>
            <h2 className="duc-h2 duc-section-title">Can you make it <span className="gradient-text">14/14? 🔥</span></h2>
          </div>
          <div className="rounded-3xl p-6 lg:p-8" style={{ background: "#faf8f3", border: "1.5px solid #e6d9b0" }}>
            <div className="grid grid-cols-7 gap-2 mb-6">
              {Array.from({ length: 14 }, (_, i) => i + 1).map(d => {
                const done = d <= 5;
                return (
                  <div key={d} className="rounded-xl flex flex-col items-center justify-center py-2" style={{ background: done ? "linear-gradient(135deg,#b8860b,#d4a017)" : "#fff", border: done ? "none" : "1.5px solid #e6d9b0", aspectRatio: "1" }}>
                    <span style={{ fontSize: 16 }}>{done ? "🔥" : d === 14 ? "🏆" : "○"}</span>
                    <span style={{ fontSize: 9.5, fontWeight: 700, color: done ? "#fff" : "#a1a1aa", marginTop: 1 }}>{d}</span>
                  </div>
                );
              })}
            </div>
            <p style={{ fontSize: 17.5, color: "#52525b", lineHeight: 1.6, textAlign: "center" }}>
              After completing your daily 5, simply tap <strong style={{ color: "#18181b" }}>DONE</strong> on WhatsApp. We&apos;ll keep track of your progress.
            </p>
          </div>
          <p className="text-center mt-8" style={{ fontSize: 17, fontWeight: 800, color: "#18181b", maxWidth: 500, margin: "2rem auto 0", lineHeight: 1.45 }}>
            Your goal isn&apos;t perfection. <span style={{ color: "#a8790d" }}>Your goal is to keep showing up.</span>
          </p>
        </div>
      </section>

      {/* ══ 12b. UNLOCK YOUR CERTIFICATE ════════════════════════════════════ */}
      <section className="relative overflow-hidden py-16 lg:py-24" style={{ background: "linear-gradient(135deg,#171412 0%,#18181b 50%,#171412 100%)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(212,160,23,0.14),transparent 70%)" }} />
        <div className="max-w-4xl mx-auto px-6 lg:px-10 relative">
          <div className="text-center mb-11">
            <SectionLabel dark>Finish all 14 days</SectionLabel>
            <h2 className="duc-h2" style={{ color: "#fff" }}>Complete the challenge,<br className="hidden sm:block" /> <span style={{ color: "#e8a020" }}>unlock your certificate 🏆</span></h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.72)", maxWidth: 560, margin: "1rem auto 0", lineHeight: 1.6 }}>
              Tick off all 14 daily 5s and you earn your official <Brand light /> Completion Certificate — proof that you showed up for your body, every single day.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
            {/* Certificate mockup */}
            <div className="shrink-0" style={{ perspective: "1000px" }}>
              <div className="rounded-2xl overflow-hidden" style={{ width: 340, maxWidth: "88vw", background: "#fffdf7", border: "3px solid #d4a017", boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)", transform: "rotate(-2deg)" }}>
                <div className="text-center px-6 py-7" style={{ border: "2px solid #e8d59a", margin: 10, borderRadius: 12 }}>
                  <p style={{ fontSize: 30, marginBottom: 4 }}>🏆</p>
                  <p style={{ fontSize: 11, fontWeight: 800, color: "#a8790d", letterSpacing: "0.18em", textTransform: "uppercase" }}>Certificate of Completion</p>
                  <div style={{ height: 1, background: "#e8d59a", margin: "12px auto", width: 80 }} />
                  <p style={{ fontSize: 12, color: "#71717a", marginBottom: 2 }}>This certifies that</p>
                  <p style={{ fontSize: 20, fontWeight: 900, color: "#18181b", fontStyle: "italic", marginBottom: 6 }}>Your Name</p>
                  <p style={{ fontSize: 12.5, color: "#52525b", lineHeight: 1.5, maxWidth: 240, margin: "0 auto" }}>
                    completed all <strong style={{ color: "#18181b" }}>14 days</strong> of the<br />
                    <span style={{ fontWeight: 900, color: "#a8790d" }}>5-Minute Body Challenge™</span>
                  </p>
                  <div className="flex items-center justify-center gap-1.5 mt-4">
                    {Array.from({ length: 14 }).map((_, i) => <span key={i} style={{ fontSize: 9 }}>🔥</span>)}
                  </div>
                  <p style={{ fontSize: 10.5, color: "#a1a1aa", marginTop: 10 }}>Coach Rohan · High Performance Club</p>
                </div>
              </div>
            </div>

            {/* What it stands for */}
            <div className="flex flex-col gap-3 max-w-xs">
              {[
                { icon: "✅", t: "14/14 days completed", s: "You showed up for every single 5." },
                { icon: "📜", t: "Personalised with your name", s: "Yours to keep, download and share." },
                { icon: "🔥", t: "Proof you can stay consistent", s: "The one thing that actually changes bodies." },
              ].map(({ icon, t, s }) => (
                <div key={t} className="flex items-start gap-3 rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,160,23,0.2)" }}>
                  <span style={{ fontSize: 24 }}>{icon}</span>
                  <div>
                    <p style={{ fontSize: 15.5, fontWeight: 900, color: "#fff" }}>{t}</p>
                    <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>{s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center" style={{ fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.9)", maxWidth: 520, margin: "2.2rem auto 0", lineHeight: 1.5 }}>
            14 days from now, you could be holding proof that you did it. <span style={{ color: "#e8a020" }}>All it takes is 5 minutes a day.</span>
          </p>
          <div className="flex justify-center mt-8">
            <button onClick={openRegister} className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-full font-black" style={{ fontSize: 18, border: "none", cursor: "pointer" }}>
              <FlameIcon size={20} />Start & Earn My Certificate →
            </button>
          </div>
        </div>
      </section>

      {/* ══ 12c. WHAT YOU'RE BUILDING ═══════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-11">
            <SectionLabel>This challenge is about more than 14 days</SectionLabel>
            <h2 className="duc-h2 duc-section-title">You&apos;re building a habit<br className="hidden sm:block" /> <span className="gradient-text">that can outlast the challenge.</span></h2>
          </div>
          <div className="flex flex-col items-center gap-0 max-w-md mx-auto">
            {[
              { day: "DAY 1", quote: "“I should exercise.”" },
              { day: "DAY 7", quote: "“I'm actually doing this.”" },
              { day: "DAY 14", quote: "“5 minutes fits my life.”" },
              { day: "DAY 15+", quote: "“This is just something I do.”", final: true },
            ].map(({ day, quote, final }, i) => (
              <div key={day} className="w-full flex flex-col items-center">
                <div className="w-full rounded-2xl px-6 py-4 flex items-center justify-between gap-4" style={{ background: final ? "linear-gradient(135deg,#b8860b,#d4a017)" : "#faf8f3", border: final ? "none" : "1.5px solid #e6d9b0" }}>
                  <span style={{ fontSize: 13, fontWeight: 900, color: final ? "rgba(255,255,255,0.9)" : "#a8790d", letterSpacing: "0.04em", minWidth: 62 }}>{day}</span>
                  <span style={{ fontSize: 17, fontWeight: 800, color: final ? "#fff" : "#18181b", textAlign: "right", lineHeight: 1.3 }}>{quote}</span>
                </div>
                {i < 3 && <span style={{ fontSize: 22, color: "#d4a017", lineHeight: 1, padding: "6px 0" }}>↓</span>}
              </div>
            ))}
          </div>
          <p className="text-center mt-10" style={{ fontSize: 18, fontWeight: 800, color: "#18181b", maxWidth: 500, margin: "2.5rem auto 0", lineHeight: 1.45 }}>
            That&apos;s what we mean by a <span style={{ color: "#a8790d" }}>Daily Fitness Habit.</span>
          </p>
        </div>
      </section>

      {/* ══ 13. WHAT COULD CHANGE ═══════════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-11">
            <SectionLabel>Honest expectations</SectionLabel>
            <h2 className="duc-h2 duc-section-title">What could change in 14 days?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "💪", t: "Movement confidence", p: "Start feeling more comfortable performing basic exercises." },
              { icon: "⚡", t: "Exercise capacity", p: "Movements that first challenged you start to feel more manageable." },
              { icon: "🔥", t: "Consistency", p: "Real proof that you can actually show up, day after day." },
              { icon: "🧠", t: "Mindset", p: "Stop thinking exercise always has to mean a full hour." },
              { icon: "🏃", t: "Momentum", p: "Use five minutes as your launchpad to becoming more active." },
              { icon: "🤝", t: "Belonging", p: "Do it alongside people just like you — never alone." },
            ].map(({ icon, t, p }) => (
              <div key={t} className="pop-card rounded-2xl p-6 flex items-start gap-4" style={{ background: "#fff", border: "1.5px solid #e6d9b0" }}>
                <div className="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "rgba(212,160,23,0.1)", fontSize: 26, width: 52, height: 52 }}>{icon}</div>
                <div>
                  <p style={{ fontSize: 17.5, fontWeight: 900, color: "#18181b", marginBottom: 4 }}>{t}</p>
                  <p style={{ fontSize: 15.5, color: "#52525b", lineHeight: 1.55 }}>{p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 15. WHO IT'S FOR ════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "linear-gradient(135deg,#171412 0%,#18181b 50%,#171412 100%)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-9">
            <SectionLabel dark>This is for you if…</SectionLabel>
            <h2 className="duc-h2" style={{ color: "#fff" }}><Brand light /> is for you if…</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
            {/* Real person image (Ken Burns) */}
            <div className="md:col-span-2">
              <div className="rounded-3xl overflow-hidden" style={{ border: "1.5px solid rgba(212,160,23,0.3)", boxShadow: "0 24px 55px -20px rgba(0,0,0,0.6)", aspectRatio: "3 / 4" }}>
                <KenBurns src="/fmb-person-2.png" alt="A real person starting their day with a few minutes of gentle movement at home" objectPosition="center 20%" delay={-6} />
              </div>
            </div>
            {/* Checklist */}
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                "You want to exercise but struggle to find time",
                "You keep starting workouts but can't stay consistent",
                "Long workout routines feel overwhelming",
                "You've been inactive and want a gentle way to start again",
                "You prefer exercising with people, not alone",
                "You want something you can do from home",
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,160,23,0.18)" }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)", fontSize: 13, color: "#fff", fontWeight: 900 }}>✓</div>
                  <p style={{ fontSize: 16, color: "rgba(255,255,255,0.9)", lineHeight: 1.4, fontWeight: 500 }}>{point}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center" style={{ fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.9)", maxWidth: 540, margin: "2.5rem auto 0", lineHeight: 1.5 }}>
            You don&apos;t need to already be fit. <span style={{ color: "#e8a020" }}>You just need to be willing to give yourself 5 minutes.</span>
          </p>
          <div className="flex justify-center mt-9">
            <button onClick={openRegister} className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-full font-black" style={{ fontSize: 18, border: "none", cursor: "pointer" }}>
              <FlameIcon size={20} />That&apos;s Me — Start Free →
            </button>
          </div>
        </div>
      </section>

      {/* ══ 15b. WHAT YOU GET — value-stack card (layout ref: pricing card) ══ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          {/* One dark rounded card holding the whole value stack */}
          <div className="rounded-3xl overflow-hidden" style={{ background: "linear-gradient(180deg,#1a1611,#171412)", border: "1.5px solid rgba(212,160,23,0.25)", boxShadow: "0 30px 70px -28px rgba(0,0,0,0.6)" }}>
            <div className="px-6 lg:px-9 pt-9 pb-6 text-center">
              <p className="duc-label mb-3" style={{ color: "#a8790d" }}>Everything you get</p>
              <h2 style={{ fontSize: "clamp(1.9rem,5vw,2.8rem)", fontWeight: 900, color: "#fff", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
                Your FREE 14-Day<br /><span style={{ color: "#e8a020" }}>5-Minute Body experience</span>
              </h2>
            </div>

            {/* Value rows — icon + label left, value tag right */}
            <div className="px-4 lg:px-6">
              {[
                { icon: "🔥", t: "14 Daily 5-Minute Workouts", v: "₹2,999" },
                { icon: "👥", t: "LIVE Guided Sessions", v: "₹1,999" },
                { icon: "🌅", t: "7 AM + 7 PM Session Options", v: "₹999" },
                { icon: "🎚️", t: "Easy / Moderate / Intense Variations", v: "₹1,499" },
                { icon: "📲", t: "Daily WhatsApp Reminders", v: "₹799" },
                { icon: "📊", t: "14-Day Streak Tracking", v: "₹999" },
                { icon: "⚡", t: "Today's Upgrade™", v: "₹499" },
                { icon: "🏆", t: "Completion Certificate", v: "₹999" },
                { icon: "❤️", t: "Sunday Health Reset™", v: "₹199" },
              ].map(({ icon, t, v }, i) => (
                <div key={t} className="flex items-center gap-3 py-3.5" style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.07)" }}>
                  <span style={{ fontSize: 20, width: 26, textAlign: "center", flexShrink: 0 }}>{icon}</span>
                  <span className="flex-1" style={{ fontSize: 15.5, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{t}</span>
                  <span style={{ fontSize: 14.5, fontWeight: 900, color: "#e8a020", flexShrink: 0 }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Total value row */}
            <div className="px-4 lg:px-6 mt-2">
              <div className="flex items-center justify-between py-4" style={{ borderTop: "1.5px solid rgba(212,160,23,0.3)" }}>
                <span style={{ fontSize: 13, fontWeight: 900, color: "#a8790d", letterSpacing: "0.12em" }}>TOTAL VALUE</span>
                <span style={{ fontSize: 18, fontWeight: 900, color: "#71717a", textDecoration: "line-through" }}>₹10,991</span>
              </div>
            </div>

            {/* Free reveal */}
            <div className="px-6 lg:px-9 pb-9 pt-3 text-center">
              <div className="flex flex-col items-center gap-0.5 mb-3" style={{ color: "#52525b" }}>
                <span style={{ fontSize: 15, textDecoration: "line-through" }}>Not ₹10,991</span>
                <span style={{ fontSize: 14, textDecoration: "line-through" }}>Not ₹4,999</span>
                <span style={{ fontSize: 13, textDecoration: "line-through" }}>Not ₹999</span>
              </div>
              <p style={{ fontSize: "clamp(3.6rem,13vw,5.5rem)", fontWeight: 900, color: "#e8a020", lineHeight: 1, letterSpacing: "-0.02em", textShadow: "0 0 40px rgba(232,160,32,0.35)" }}>
                FREE
              </p>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", margin: "14px auto 4px", maxWidth: 400, lineHeight: 1.5 }}>
                for the full 14 days — <strong style={{ color: "#fff" }}>no card, no catch, no auto-charges.</strong>
              </p>
              <p style={{ fontSize: 13, color: "#71717a", marginBottom: 24 }}>Just 5 focused minutes a day · Cancel anytime</p>
              <div className="flex justify-center">
                <button onClick={openRegister} className="btn-primary inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-black" style={{ fontSize: 19, boxShadow: "0 12px 34px rgba(212,160,23,0.5)", border: "none", cursor: "pointer" }}>
                  <FlameIcon size={22} />Start My Challenge Free →
                </button>
              </div>
              <p style={{ fontSize: 12.5, color: "#52525b", marginTop: 14 }}>🇮🇳 India&apos;s first daily fitness habit program · One 5-minute habit every day for 14 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 16. YOUR COACH / FOUNDER ════════════════════════════════════════ */}
      <section className="py-16 lg:py-24" style={{ background: "#faf8f3" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <SectionLabel>Meet your coach</SectionLabel>
            <h2 className="duc-h2 duc-section-title">The person behind your 5.</h2>
          </div>
          <div className="rounded-3xl overflow-hidden flex flex-col md:flex-row items-stretch" style={{ background: "#fff", border: "1.5px solid #e6d9b0", boxShadow: "0 20px 50px -22px rgba(0,0,0,0.28)" }}>
            <div className="shrink-0 md:w-2/5 overflow-hidden" style={{ minHeight: 320, maxHeight: 480 }}>
              <KenBurns src="/rohan.png" alt="Rohan — founder and coach of the 5-Minute Body Challenge" objectPosition="center top" delay={-11} />
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center md:w-3/5">
              <p className="duc-label mb-2">👋 Founder &amp; Coach</p>
              <h3 style={{ fontSize: 30, fontWeight: 900, color: "#18181b", marginBottom: 14, letterSpacing: "-0.02em" }}>Hi, I&apos;m Rohan.</h3>
              <div className="flex flex-col gap-4" style={{ fontSize: 17, color: "#52525b", lineHeight: 1.7 }}>
                <p>
                  For years I did what most of us do — buy the gym membership in January, quit by February, and feel guilty the rest of the year. The plans were never the problem. <strong style={{ color: "#18181b" }}>They were just too big to keep.</strong>
                </p>
                <p>
                  So I flipped the question: what&apos;s the smallest amount of exercise I&apos;d never skip? The answer was 5 minutes. I started showing up for just 5 focused minutes a day — and for the first time, it stuck.
                </p>
                <p>
                  That&apos;s why I built <Brand /> — to make <strong style={{ color: "#18181b" }}>daily fitness feel achievable even when life gets busy</strong>. Not another challenge you burn out on. A daily habit you can actually keep.
                </p>
              </div>
              <p style={{ fontSize: 15, fontWeight: 800, color: "#a8790d", marginTop: 18 }}>— Rohan · Founder, High Performance Club</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 17. FAQ ═════════════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-9">
            <SectionLabel>Quick questions</SectionLabel>
            <h2 className="duc-h2 duc-section-title">Good to know</h2>
          </div>
          <div className="flex flex-col gap-2.5">
            {[
              { q: "What exactly is a Daily Fitness Habit Program?", a: "It's a fitness program built around consistency instead of intensity. Rather than long, occasional workouts that are hard to keep up, you do one tiny 5-minute session every single day — so exercise becomes a daily habit you can actually sustain, not a burst you burn out on." },
              { q: "Is the challenge really free?", a: "Yes — 100% free. Just add your name and WhatsApp number and pick a session." },
              { q: "Is the workout really only 5 minutes?", a: "Yes. The focused exercise block is 5 minutes. The complete guided LIVE experience is around 15 minutes — welcome, learn why, choose your level, do your 5, cool down." },
              { q: "Do I need any equipment?", a: "No. Every movement is equipment-free and can be done from home." },
              { q: "What if I'm completely unfit?", a: "You're welcome exactly as you are. Every exercise has an Easy / Moderate / Intense variation — you simply pick the one that's right for your body." },
              { q: "What if I'm already fit?", a: "Use the higher Intense variation of each movement to keep it challenging." },
              { q: "Do I need to attend both 7 AM and 7 PM?", a: "No — you only attend one session a day. Pick whichever time works for you." },
              { q: "Can I switch between morning and evening?", a: "Yes. Attend whichever session fits your day — you're never locked in." },
              { q: "What happens if I miss a day?", a: "Nothing bad. Just come back the next day and continue. A missed day is never a failed challenge." },
              { q: "What is Today's Upgrade™?", a: "At the end of selected sessions, you'll get one tiny, optional health action to carry into your day — like taking the stairs or a short walk. It's a small extra beyond your 5 minutes, never a requirement." },
              { q: "What happens after the 14-day challenge ends?", a: "The goal is that daily movement has become a habit that fits your life. You'll be able to keep going on your own, and we'll share simple ways to continue your streak beyond the 14 days." },
              { q: "How do you track my progress?", a: "After each 5, you tap DONE on WhatsApp and we keep your 14-day streak for you." },
              { q: "Can I join from my phone?", a: "Yes — you can join the LIVE session right from your phone." },
              { q: "Do I need a gym?", a: "No gym needed. Everything is done from home." },
              { q: "Can people with medical conditions participate?", a: "If you have a medical condition, injury, are pregnant/postpartum, or have any exercise limitation, please check with a qualified health professional before joining, and always work at a level that feels safe for you." },
            ].map(({ q, a }) => <FAQ key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* ══ 18. FINAL CLOSE ═════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 lg:py-24" style={{ background: "#18181b" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(212,160,23,0.1),transparent 70%)" }} />
        <div className="max-w-xl mx-auto px-6 text-center relative">
          <p style={{ fontSize: 46 }} className="mb-4">🔥</p>
          <p className="duc-label mb-4" style={{ color: "#a8790d" }}>🇮🇳 India&apos;s First Daily Fitness Habit Program</p>
          <h2 className="duc-h1 mb-4" style={{ color: "#fff" }}>
            14 Days.<br />5 Minutes A Day.<br />
            <span style={{ color: "#a8790d" }}>Start Today.</span>
          </h2>
          <p style={{ fontSize: 18, fontWeight: 900, color: "#fff", marginBottom: 6, letterSpacing: "0.01em" }}>
            5 Minutes. Every Day. <span style={{ color: "#e8a020" }}>Together.</span>
          </p>
          <p style={{ fontSize: 17, color: "#a1a1aa", lineHeight: 1.6, maxWidth: 460, margin: "0 auto 8px" }}>
            You don&apos;t need another complicated fitness plan. You need somewhere simple to start.
          </p>
          <p style={{ fontSize: 15, fontWeight: 800, color: "#e8a020", marginBottom: 28 }}>🌅 {CHALLENGE.morning} · 🌙 {CHALLENGE.evening} · 🎁 Free</p>
          <CTA label="🔥 Start My Challenge Free →" sub={CHALLENGE.seatsLine} />
          <p className="mt-5" style={{ fontSize: 13, color: "#52525b" }}>
            Have a question?{" "}
            <a href="https://wa.me/918956146485?text=Hi%2C+I+have+a+question+about+the+free+5-Minute+Body+Challenge" className="underline" style={{ color: "#a8790d" }}>Message Rohan on WhatsApp</a>
          </p>
        </div>
      </section>

      <footer className="px-5 py-6 text-center" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p style={{ fontSize: 12, color: "#52525b" }}>
          © {new Date().getFullYear()} High Performance Club ·{" "}
          <a href="https://www.highperformanceclub.co" className="underline" style={{ color: "#3f3f46" }}>highperformanceclub.co</a>
        </p>
        <p style={{ fontSize: 12, color: "#3f3f46", marginTop: 4 }}>Free live challenge · General wellness education · Results vary · Not medical advice · Consult a professional if you have any health condition</p>
      </footer>

      <StickyBottomCTA />
      <LiveToast />
      <RegisterNudge />
      <RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
    </RegisterCtx.Provider>
  );
}
