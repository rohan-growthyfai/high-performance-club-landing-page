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
      {open && <div className="px-5 pb-5 leading-relaxed bg-white" style={{ fontSize: 14, color: "#52525b" }}>{a}</div>}
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
              {status === "done" ? "You're in! See you at your Five 🎉" : "Start your 14-day challenge"}
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
                <p style={{ fontSize: 13.5, color: "#52525b", lineHeight: 1.6 }}>Stand up and take 5 slow, deep breaths right now. That&apos;s how easy showing up will feel.</p>
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
              <p style={{ fontSize: 13.5, color: "#52525b", lineHeight: 1.6, marginBottom: 16, textAlign: "center" }}>
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
                          <p style={{ fontSize: 13.5, fontWeight: 800, color: "#18181b" }}>{s.label}</p>
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
              <button type="submit" disabled={status === "loading"} className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full font-black btn-primary mt-4" style={{ fontSize: 16, boxShadow: "0 6px 20px rgba(212,160,23,0.4)", border: "none", cursor: status === "loading" ? "wait" : "pointer", opacity: status === "loading" ? 0.7 : 1 }}>
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
      <div className="px-4 pb-3 pt-2 md:hidden" style={{ background: "linear-gradient(to top,#faf8f3 70%,transparent)", backdropFilter: "blur(8px)" }}>
        <button onClick={register} className="w-full flex items-center justify-between gap-3 rounded-2xl px-5 py-3" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)", boxShadow: "0 4px 20px rgba(212,160,23,0.4)", border: "none", cursor: "pointer" }}>
          <div className="text-left"><p className="text-white font-black text-sm leading-tight">Start My Challenge →</p><p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.85)" }}>14 days · 5 min/day · Free</p></div>
          <div className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}><FlameIcon size={15} /><span className="text-white font-bold text-sm">Join</span></div>
        </button>
      </div>
      <div className="hidden md:block px-6 pb-4 pt-3" style={{ background: "linear-gradient(to top,#faf8f3 70%,transparent)", backdropFilter: "blur(8px)" }}>
        <div className="max-w-lg mx-auto">
          <button onClick={register} className="w-full flex items-center justify-between gap-4 rounded-2xl px-6 py-3.5" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)", boxShadow: "0 4px 20px rgba(212,160,23,0.4)", border: "none", cursor: "pointer" }}>
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
    <div className="fixed left-2 z-40 flex flex-col gap-2 pointer-events-none bottom-[100px] md:bottom-[90px]" aria-live="polite">
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
            <p style={{ fontSize: 14, color: "#3f3f46", lineHeight: 1.7, marginBottom: 12 }}>
              A free 14-day LIVE challenge. Just <strong style={{ color: "#18181b" }}>5 focused minutes a day</strong> — no gym, no equipment.
            </p>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#9a6b0a", marginBottom: 16 }}>🔥 {WHEN_LINE}</p>
            <button onClick={() => { dismiss(); register(); }} className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full font-black btn-primary" style={{ fontSize: 16, boxShadow: "0 6px 20px rgba(212,160,23,0.4)", border: "none", cursor: "pointer" }}>
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

// ═════════════════════════════════════════════════════════════════════════════
// PAGE — simple words, big visuals, understandable at a glance
// ═════════════════════════════════════════════════════════════════════════════
export default function FiveMinuteBodyChallengePage() {
  useMetaPixelViewContent();
  const [modalOpen, setModalOpen] = useState(false);
  const openRegister = () => setModalOpen(true);

  return (
    <RegisterCtx.Provider value={openRegister}>
    <div id="fmb-top" style={{ background: "#faf8f3", minHeight: "100vh", color: "#18181b", fontSize: 15 }}>
      <style>{`
        @keyframes duc-fadein{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fmb-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes fmb-pulse-ring{0%{transform:scale(0.9);opacity:0.7}70%{transform:scale(1.25);opacity:0}100%{opacity:0}}
        .duc-h1{font-size:clamp(2.2rem,5.5vw,3.7rem);font-weight:900;line-height:1.05;letter-spacing:-0.03em}
        .duc-h2{font-size:clamp(1.7rem,4vw,2.6rem);font-weight:900;line-height:1.12;letter-spacing:-0.02em}
        .duc-label{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:#a8790d}
        .duc-section-title{color:#18181b}
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
      <div style={{ background: "linear-gradient(90deg,#b8860b 0%,#d4a017 50%,#b8860b 100%)", padding: "10px 16px" }}>
        <p className="text-center font-bold text-white" style={{ fontSize: 13.5, letterSpacing: "0.01em", lineHeight: 1.4 }}>
          🔥 FREE 14-Day LIVE Challenge · {CHALLENGE.minutes} min/day · {CHALLENGE.morning} or {CHALLENGE.evening}
        </p>
      </div>

      {/* ══ 1. HERO ═════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden mesh-bg" style={{ borderBottom: "1px solid #e2dfd6" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-12 pb-14 lg:pt-16 text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 accent-pill" style={{ fontSize: 13, fontWeight: 800 }}>
            <span className="w-2 h-2 rounded-full inline-block animate-pulse" style={{ background: "#d4a017" }} />
            FREE · LIVE · 5 min/day · No equipment
          </div>

          <h1 className="duc-h1 mb-5">
            Give Your Body Just<br className="hidden sm:block" />{" "}
            <span className="gradient-text">5 Minutes A Day.</span>
          </h1>

          <p style={{ fontSize: 19, lineHeight: 1.55, color: "#3f3f46", maxWidth: 640, margin: "0 auto 10px", fontWeight: 500 }}>
            Join the <strong style={{ color: "#18181b" }}>5-Minute Body Challenge™</strong> and exercise <strong style={{ color: "#18181b" }}>LIVE with us</strong> for just 5 focused minutes every day — for the next 14 days.
          </p>

          {/* When / where — big clear badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-7 mb-8">
            {[
              { icon: "🌅", label: `${CHALLENGE.morning} Morning` },
              { icon: "🌙", label: `${CHALLENGE.evening} Evening` },
              { icon: "🏠", label: "Join from home" },
              { icon: "🎁", label: "100% Free" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 rounded-full px-4 py-2.5" style={{ background: "#fff", border: "1.5px solid #e6d9b0", boxShadow: "0 4px 14px rgba(0,0,0,0.05)" }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#18181b" }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Hero visual — LIVE session grid with 05:00 timer */}
          <div className="max-w-2xl mx-auto mb-9">
            <div className="rounded-3xl overflow-hidden relative" style={{ background: "linear-gradient(135deg,#171412,#26211a)", border: "1.5px solid #e6d9b0", boxShadow: "0 20px 50px -18px rgba(0,0,0,0.45)" }}>
              <div className="flex items-center justify-between px-4 py-2.5" style={{ background: "rgba(0,0,0,0.35)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-2">
                  <span className="relative flex w-2.5 h-2.5">
                    <span className="absolute inline-flex w-full h-full rounded-full" style={{ background: "#ef4444", animation: "fmb-pulse-ring 1.6s ease-out infinite" }} />
                    <span className="relative inline-flex w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
                  </span>
                  <span className="text-white font-black" style={{ fontSize: 12, letterSpacing: "0.08em" }}>LIVE</span>
                </div>
                <TimerChip time="05:00" light />
              </div>
              <div className="grid grid-cols-3 gap-1.5 p-2.5">
                {[
                  { who: "Coach Rohan", tag: "🔥 leading", big: true },
                  { who: "Priya", tag: "MOVE 🟢" },
                  { who: "Aditya", tag: "BUILD 🟡" },
                  { who: "Meera", tag: "PUSH 🔥" },
                  { who: "Karan", tag: "MOVE 🟢" },
                  { who: "Sneha", tag: "BUILD 🟡" },
                ].map((p, i) => (
                  <div key={i} className={`rounded-xl relative overflow-hidden flex flex-col items-center justify-center ${p.big ? "col-span-1 row-span-1" : ""}`}
                    style={{ aspectRatio: "1", background: p.big ? "linear-gradient(135deg,#3a2f1a,#4a3a1e)" : "rgba(255,255,255,0.05)", border: p.big ? "1.5px solid #d4a017" : "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black mb-1" style={{ fontSize: 15, background: `hsl(${(p.who.charCodeAt(0) * 47) % 360},45%,42%)` }}>{p.who[0]}</div>
                    <p className="text-white font-bold leading-tight text-center px-1" style={{ fontSize: 10 }}>{p.who}</p>
                    <p style={{ fontSize: 9.5, color: "rgba(255,255,255,0.65)", marginTop: 1 }}>{p.tag}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 flex items-center justify-center gap-2" style={{ background: "rgba(0,0,0,0.35)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Different homes. Different levels.</span>
                <span style={{ fontSize: 12, color: "#e8a020", fontWeight: 800 }}>Same Five.</span>
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

      {/* ══ 2. THE CORE PROBLEM ═════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
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
                <p style={{ fontSize: 14, fontWeight: 900, color: "#18181b", letterSpacing: "0.04em", marginBottom: 6 }}>{title}</p>
                <p style={{ fontSize: 14, color: "#52525b", lineHeight: 1.5 }}>{line}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-9" style={{ fontSize: 18, fontWeight: 800, color: "#18181b", maxWidth: 640, margin: "2.2rem auto 0", lineHeight: 1.4 }}>
            So instead of asking you to find another hour…<br />
            <span style={{ color: "#a8790d" }}>what if we started with just FIVE minutes?</span> 👇
          </p>
        </div>
      </section>

      {/* ══ 3. THE BIG IDEA ═════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-16 lg:py-24" style={{ background: "linear-gradient(135deg,#171412 0%,#18181b 50%,#171412 100%)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(212,160,23,0.12),transparent 70%)" }} />
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative">
          <h2 style={{ fontSize: "clamp(2.4rem,7vw,4.4rem)", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-0.035em", color: "#fff" }}>
            5 MINUTES.<br />14 DAYS.<br /><span style={{ color: "#e8a020" }}>ONE SIMPLE CHALLENGE.</span>
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.75)", maxWidth: 560, margin: "1.6rem auto 0", lineHeight: 1.6 }}>
            Show up for your body for just five focused minutes every day.
          </p>

          <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto mt-10">
            {[
              { day: "DAY 1", line: "Start where you are" },
              { day: "DAY 7", line: "Notice what's getting easier" },
              { day: "DAY 14", line: "See how far you've come" },
            ].map(({ day, line }, i) => (
              <div key={day} className="rounded-2xl px-3 py-5 text-center" style={{ background: "rgba(255,255,255,0.05)", border: i === 2 ? "1.5px solid #d4a017" : "1px solid rgba(212,160,23,0.18)" }}>
                <p style={{ fontSize: 13, fontWeight: 900, color: "#e8a020", marginBottom: 6 }}>{day}</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>{line}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl px-6 py-6 mt-10" style={{ background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.25)", maxWidth: 620, margin: "2.5rem auto 0" }}>
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
            <h2 className="duc-h2 duc-section-title">Here&apos;s exactly how the<br className="hidden sm:block" /> <span className="gradient-text">5-Minute Body Challenge works</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { n: "01", emoji: "✍️", title: "Register free", line: "Join the 14-Day Challenge in 30 seconds." },
              { n: "02", emoji: "🕑", title: "Choose your session", line: `${CHALLENGE.morning} or ${CHALLENGE.evening} — attend whichever works that day.` },
              { n: "03", emoji: "🔥", title: "Do your Five", line: "Exercise together LIVE for 5 focused minutes." },
              { n: "04", emoji: "✅", title: "Mark it DONE", line: "Tap DONE on WhatsApp and build your 14-day streak." },
            ].map(({ n, emoji, title, line }) => (
              <div key={n} className="pop-card rounded-2xl p-6 flex flex-col items-center text-center relative" style={{ background: "#fff", border: "1.5px solid #e6d9b0" }}>
                <span className="absolute top-3 right-4 font-black" style={{ fontSize: 26, color: "rgba(212,160,23,0.22)" }}>{n}</span>
                <span style={{ fontSize: 40, marginBottom: 10 }}>{emoji}</span>
                <p style={{ fontSize: 16, fontWeight: 900, color: "#18181b", marginBottom: 6 }}>{title}</p>
                <p style={{ fontSize: 13.5, color: "#52525b", lineHeight: 1.5 }}>{line}</p>
              </div>
            ))}
          </div>

          {/* Streak strip */}
          <div className="rounded-2xl mt-8 px-4 py-5 overflow-x-auto" style={{ background: "#18181b" }}>
            <div className="flex items-center justify-start md:justify-center gap-1.5 min-w-max">
              {Array.from({ length: 14 }, (_, i) => i + 1).map(d => (
                <div key={d} className="flex flex-col items-center gap-1" style={{ minWidth: 34 }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-black" style={{ fontSize: 12, background: d < 6 ? "linear-gradient(135deg,#b8860b,#d4a017)" : "rgba(255,255,255,0.08)", color: d < 6 ? "#171412" : "rgba(255,255,255,0.55)", border: d === 14 ? "1.5px solid #e8a020" : "none" }}>
                    {d < 6 ? "🔥" : d === 14 ? "🏆" : d}
                  </div>
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>{d}</span>
                </div>
              ))}
            </div>
          </div>
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
            <h2 className="duc-h2 duc-section-title">What happens inside your <span className="gradient-text">5-Minute Body?</span></h2>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { t: "0:00–1:00", icon: "🔥", head: "WARM", body: "1-minute guided warm-up to prepare your body for today's movements.", c: "#d4a017" },
              { t: "1:00–2:30", icon: "⚡", head: "WORK", body: "90 seconds of focused movement. Choose the variation that fits you.", c: "#f97316" },
              { t: "2:30–3:00", icon: "💨", head: "RESET", body: "30-second recovery. Catch your breath. Get ready again.", c: "#0ea5e9" },
              { t: "3:00–4:30", icon: "⚡", head: "WORK", body: "90 seconds. Let's go again.", c: "#f97316" },
              { t: "4:30–5:00", icon: "🔥", head: "FINISH", body: "Finish today's Five together.", c: "#d4a017" },
            ].map(({ t, icon, head, body, c }, i) => (
              <div key={i} className="flex items-stretch gap-3">
                <div className="flex flex-col items-center shrink-0" style={{ width: 66 }}>
                  <div className="rounded-lg px-2 py-1 font-black tabular-nums text-center w-full" style={{ fontSize: 11, background: "#18181b", color: "#e8a020" }}>{t}</div>
                  {i < 4 && <div style={{ flex: 1, width: 2, background: "linear-gradient(#e6d9b0,#e6d9b0)", marginTop: 4 }} />}
                </div>
                <div className="flex-1 rounded-2xl p-4 flex items-center gap-4 mb-1" style={{ background: "#faf8f3", border: "1.5px solid #e6d9b0" }}>
                  <span style={{ fontSize: 30 }}>{icon}</span>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 900, color: c, letterSpacing: "0.04em" }}>{head}</p>
                    <p style={{ fontSize: 14, color: "#52525b", lineHeight: 1.5 }}>{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl px-6 py-6 text-center mt-8" style={{ background: "linear-gradient(135deg,#b8860b,#d4a017)" }}>
            <p style={{ fontSize: "clamp(1.3rem,3vw,1.7rem)", fontWeight: 900, color: "#fff" }}>That&apos;s it. Five minutes. Done. ✓</p>
          </div>
        </div>
      </section>

      {/* ══ 6. YOUR LEVEL — MOVE / BUILD / PUSH ═════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-11">
            <SectionLabel>Haven&apos;t exercised in years?</SectionLabel>
            <h2 className="duc-h2 duc-section-title mb-3">You&apos;re still welcome.</h2>
            <p style={{ fontSize: 16, color: "#52525b", maxWidth: 560, margin: "0 auto", lineHeight: 1.6 }}>
              Every exercise comes with different variations. Choose the one that challenges <strong style={{ color: "#18181b" }}>your</strong> body — not anyone else&apos;s.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { tag: "🟢 MOVE", title: "Start comfortable", ex: "e.g. Wall push-up", c: "#059669", bg: "#f0fdf4", bd: "#bbf7d0" },
              { tag: "🟡 BUILD", title: "Challenge yourself", ex: "e.g. Incline push-up", c: "#b8860b", bg: "#fffbeb", bd: "#fde68a" },
              { tag: "🔥 PUSH", title: "Push further", ex: "e.g. Full push-up", c: "#dc2626", bg: "#fff7f7", bd: "#fecaca" },
            ].map(({ tag, title, ex, c, bg, bd }) => (
              <div key={tag} className="pop-card rounded-3xl p-6 text-center" style={{ background: bg, border: `2px solid ${bd}` }}>
                <p style={{ fontSize: 15, fontWeight: 900, color: c, marginBottom: 10, letterSpacing: "0.04em" }}>{tag}</p>
                <p style={{ fontSize: 19, fontWeight: 900, color: "#18181b", marginBottom: 6 }}>{title}</p>
                <p style={{ fontSize: 14, color: "#52525b" }}>{ex}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-9" style={{ fontSize: 17, fontWeight: 800, color: "#18181b", maxWidth: 560, margin: "2.2rem auto 0", lineHeight: 1.45 }}>
            You don&apos;t need to keep up with anyone else.<br />
            <span style={{ color: "#a8790d" }}>You only need to work at the level that&apos;s right for you.</span>
          </p>
        </div>
      </section>

      {/* ══ 7. 14-DAY JOURNEY ═══════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-11">
            <SectionLabel>What you&apos;re signing up for</SectionLabel>
            <h2 className="duc-h2 duc-section-title">Your 14-Day <span className="gradient-text">5-Minute Body Journey</span></h2>
          </div>

          {[
            { week: "WEEK 1 — BUILD YOUR BASE", days: [
              { d: "1", icon: "🔥", t: "Starting Five" }, { d: "2", icon: "🦵", t: "Lower Body" }, { d: "3", icon: "💪", t: "Upper Body" },
              { d: "4", icon: "⚡", t: "Cardio" }, { d: "5", icon: "🎯", t: "Core" }, { d: "6", icon: "🤸", t: "Mobility" }, { d: "7", icon: "🏆", t: "Halfway Five" },
            ] },
            { week: "WEEK 2 — BUILD YOUR CAPACITY", days: [
              { d: "8", icon: "🦵", t: "Lower Body 2.0" }, { d: "9", icon: "💪", t: "Upper Body 2.0" }, { d: "10", icon: "⚡", t: "Cardio 2.0" },
              { d: "11", icon: "🎯", t: "Core 2.0" }, { d: "12", icon: "⚖️", t: "Balance + Control" }, { d: "13", icon: "🔥", t: "Full Body" }, { d: "14", icon: "🏆", t: "Final Five" },
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
          <p className="text-center mt-4" style={{ fontSize: 13.5, color: "#a1a1aa", maxWidth: 560, margin: "1.5rem auto 0" }}>
            Sample plan — the exact daily programming is designed to keep every level moving safely.
          </p>
        </div>
      </section>

      {/* ══ 8. DAY 1 vs DAY 14 ══════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-11">
            <SectionLabel>The curiosity test</SectionLabel>
            <h2 className="duc-h2 duc-section-title">What will YOUR body be able to do<br className="hidden sm:block" /> <span className="gradient-text">14 days from now?</span></h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 mb-8">
            {[
              { tag: "DAY 1", line: "Discover your starting point. Record simple benchmarks." },
              { tag: "TRAIN 14 DAYS", line: "Show up. Do your Five. Stay consistent." },
              { tag: "DAY 14", line: "Repeat the same benchmarks. See your progress." },
            ].map(({ tag, line }, i) => (
              <div key={tag} className="flex-1 rounded-2xl p-5 text-center" style={{ background: i === 2 ? "linear-gradient(135deg,#b8860b,#d4a017)" : "#fff", border: i === 2 ? "none" : "1.5px solid #e6d9b0" }}>
                <p style={{ fontSize: 12, fontWeight: 900, color: i === 2 ? "rgba(255,255,255,0.9)" : "#a8790d", letterSpacing: "0.05em", marginBottom: 6 }}>{tag}</p>
                <p style={{ fontSize: 14, color: i === 2 ? "#fff" : "#52525b", lineHeight: 1.5, fontWeight: i === 2 ? 700 : 400 }}>{line}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl overflow-hidden" style={{ border: "1.5px solid #e6d9b0", background: "#fff" }}>
            <div className="grid grid-cols-3 px-5 py-3" style={{ background: "#18181b" }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.6)" }}></span>
              <span className="text-center" style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.6)" }}>DAY 1</span>
              <span className="text-center" style={{ fontSize: 12, fontWeight: 900, color: "#e8a020" }}>DAY 14</span>
            </div>
            {["PUSH", "SQUAT", "MOVE", "STABILITY"].map((row, i) => (
              <div key={row} className="grid grid-cols-3 px-5 py-3.5 items-center" style={{ borderTop: i === 0 ? "none" : "1px solid #f0ece0" }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#18181b" }}>{row}</span>
                <span className="text-center" style={{ fontSize: 13, color: "#a1a1aa", fontWeight: 700 }}>Your start</span>
                <span className="text-center" style={{ fontSize: 13, color: "#a8790d", fontWeight: 900 }}>Your finish</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-6" style={{ fontSize: 15, fontWeight: 700, color: "#18181b" }}>
            Your start → <span style={{ color: "#a8790d" }}>your finish.</span> The only comparison that matters is you.
          </p>
        </div>
      </section>

      {/* ══ 9. TODAY'S UPGRADE™ ═════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <SectionLabel>A little extra</SectionLabel>
            <h2 className="duc-h2 duc-section-title">Your Five ends in 5 minutes.<br className="hidden sm:block" /> <span className="gradient-text">Your upgrade continues through the day.</span></h2>
            <p style={{ fontSize: 16, color: "#52525b", maxWidth: 560, margin: "1rem auto 0", lineHeight: 1.6 }}>
              At the end of selected sessions, you&apos;ll also receive one tiny, optional health action — your <strong style={{ color: "#18181b" }}>Today&apos;s Upgrade™</strong>.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            <div className="rounded-3xl p-6 text-center" style={{ background: "#faf8f3", border: "1.5px solid #e6d9b0" }}>
              <span style={{ fontSize: 40 }}>🦵</span>
              <p style={{ fontSize: 13, fontWeight: 800, color: "#a8790d", margin: "8px 0 4px", letterSpacing: "0.05em" }}>TODAY&apos;S FIVE</p>
              <p style={{ fontSize: 16, fontWeight: 900, color: "#18181b", marginBottom: 4 }}>Lower Body</p>
              <p style={{ fontSize: 13.5, color: "#52525b" }}>✓ Complete your 5-minute session.</p>
            </div>
            <div className="rounded-3xl p-6 text-center" style={{ background: "linear-gradient(135deg,#171412,#26211a)", border: "1.5px solid #d4a017" }}>
              <span style={{ fontSize: 40 }}>⚡</span>
              <p style={{ fontSize: 13, fontWeight: 800, color: "#e8a020", margin: "8px 0 4px", letterSpacing: "0.05em" }}>TODAY&apos;S UPGRADE™</p>
              <p style={{ fontSize: 16, fontWeight: 900, color: "#fff", marginBottom: 4 }}>One extra move</p>
              <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)" }}>Take one extra movement opportunity during your day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 10. THE FULL 15-MIN LIVE EXPERIENCE ═════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#faf8f3" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-11">
            <SectionLabel>Total transparency</SectionLabel>
            <h2 className="duc-h2 duc-section-title">The workout is 5 minutes.<br className="hidden sm:block" /> <span className="gradient-text">The LIVE experience is about 15.</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              { icon: "👋", t: "Welcome" },
              { icon: "💡", t: "Learn why" },
              { icon: "🎚️", t: "Choose your level" },
              { icon: "🔥", t: "5-Minute Body", hot: true },
              { icon: "🧘", t: "Cool down" },
              { icon: "⚡", t: "Today's Upgrade™" },
            ].map(({ icon, t, hot }) => (
              <div key={t} className="rounded-2xl p-4 text-center flex flex-col items-center gap-1.5" style={{ background: hot ? "linear-gradient(135deg,#b8860b,#d4a017)" : "#fff", border: hot ? "none" : "1.5px solid #e6d9b0" }}>
                <span style={{ fontSize: 28 }}>{icon}</span>
                <p style={{ fontSize: 13.5, fontWeight: 800, color: hot ? "#fff" : "#18181b" }}>{t}</p>
                {hot && <span style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.85)" }}>the 5 min that matter</span>}
              </div>
            ))}
          </div>
          <p className="text-center mt-8" style={{ fontSize: 15, color: "#52525b", lineHeight: 1.6, maxWidth: 560, margin: "2rem auto 0" }}>
            You&apos;ll spend only <strong style={{ color: "#18181b" }}>5 focused minutes exercising</strong>. The rest of the LIVE time helps you understand the movement, choose the right variation, recover, and stay connected with the community.
          </p>
        </div>
      </section>

      {/* ══ 11. COMMUNITY ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-16 lg:py-24" style={{ background: "linear-gradient(135deg,#171412 0%,#18181b 50%,#171412 100%)" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative">
          <SectionLabel dark>You&apos;re not doing this alone</SectionLabel>
          <h2 className="duc-h2 mb-4" style={{ color: "#fff" }}>Different homes. Different levels.<br /> <span style={{ color: "#e8a020" }}>Same Five.</span></h2>
          <p style={{ fontSize: 16.5, color: "rgba(255,255,255,0.75)", maxWidth: 540, margin: "0 auto 2rem", lineHeight: 1.6 }}>
            Every morning and evening, people from across the community show up and do their Five together.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: "🌅", label: `${CHALLENGE.morning} — Morning Five` },
              { icon: "🌙", label: `${CHALLENGE.evening} — Evening Five` },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 rounded-full px-5 py-3" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(212,160,23,0.3)" }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <span style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>{label}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 16 }}>Miss the morning? Join the evening. It&apos;s that flexible.</p>
        </div>
      </section>

      {/* ══ 12. STREAK / GAMIFICATION ═══════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
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
            <p style={{ fontSize: 14.5, color: "#52525b", lineHeight: 1.6, textAlign: "center" }}>
              After completing your daily Five, simply tap <strong style={{ color: "#18181b" }}>DONE</strong> on WhatsApp. We&apos;ll keep track of your progress.
            </p>
          </div>
          <p className="text-center mt-8" style={{ fontSize: 17, fontWeight: 800, color: "#18181b", maxWidth: 500, margin: "2rem auto 0", lineHeight: 1.45 }}>
            Your goal isn&apos;t perfection. <span style={{ color: "#a8790d" }}>Your goal is to keep showing up.</span>
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
                  <p style={{ fontSize: 16, fontWeight: 900, color: "#18181b", marginBottom: 4 }}>{t}</p>
                  <p style={{ fontSize: 14, color: "#52525b", lineHeight: 1.55 }}>{p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 14. WHY ONLY FIVE? ══════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <SectionLabel>The obvious question</SectionLabel>
          <h2 className="duc-h2 duc-section-title mb-6">&ldquo;Wait… just 5 minutes?&rdquo;</h2>
          <p style={{ fontSize: 16.5, color: "#52525b", lineHeight: 1.7, maxWidth: 620, margin: "0 auto 24px" }}>
            5-Minute Body isn&apos;t claiming five minutes is all the physical activity your body ever needs. It&apos;s designed to give you an extremely manageable <strong style={{ color: "#18181b" }}>starting point</strong> — especially if long workouts keep stopping you from exercising consistently.
          </p>
          <div className="rounded-3xl px-6 py-8" style={{ background: "linear-gradient(135deg,#171412,#26211a)" }}>
            <p style={{ fontSize: "clamp(1.5rem,4vw,2.1rem)", fontWeight: 900, color: "#fff", lineHeight: 1.2 }}>
              5 minutes is your minimum.<br /><span style={{ color: "#e8a020" }}>Not your maximum.</span>
            </p>
          </div>
          <p style={{ fontSize: 15.5, color: "#52525b", lineHeight: 1.7, maxWidth: 580, margin: "24px auto 0" }}>
            Want to walk, play a sport, hit the gym or exercise longer? Great. Your Five is simply the small daily commitment that&apos;s <strong style={{ color: "#18181b" }}>difficult to make excuses for</strong>.
          </p>
        </div>
      </section>

      {/* ══ 15. WHO IT'S FOR ════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "linear-gradient(135deg,#171412 0%,#18181b 50%,#171412 100%)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-9">
            <SectionLabel dark>This is for you if…</SectionLabel>
            <h2 className="duc-h2" style={{ color: "#fff" }}>5-Minute Body is for you if…</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.45, fontWeight: 500 }}>{point}</p>
              </div>
            ))}
          </div>
          <p className="text-center" style={{ fontSize: 16.5, fontWeight: 700, color: "rgba(255,255,255,0.9)", maxWidth: 540, margin: "2rem auto 0", lineHeight: 1.5 }}>
            You don&apos;t need to already be fit. <span style={{ color: "#e8a020" }}>You just need to be willing to give yourself five minutes.</span>
          </p>
          <div className="flex justify-center mt-9">
            <button onClick={openRegister} className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-full font-black" style={{ fontSize: 18, border: "none", cursor: "pointer" }}>
              <FlameIcon size={20} />That&apos;s Me — Start Free →
            </button>
          </div>
        </div>
      </section>

      {/* ══ 16. YOUR COACH ══════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="rounded-3xl p-7 lg:p-9 flex flex-col sm:flex-row items-center gap-7 text-center sm:text-left" style={{ background: "#faf8f3", border: "1.5px solid #e6d9b0" }}>
            <div className="shrink-0">
              <div className="rounded-2xl overflow-hidden" style={{ width: 130, height: 130, border: "4px solid #fff", boxShadow: "0 12px 30px -8px rgba(0,0,0,0.25)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/rohan.png" alt="Rohan — your coach" className="w-full h-full object-cover object-top" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
            </div>
            <div>
              <p className="duc-label mb-2">👋 Your coach</p>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: "#18181b", marginBottom: 8 }}>Hi, I&apos;m Rohan.</h2>
              <p style={{ fontSize: 15.5, color: "#52525b", lineHeight: 1.65 }}>
                I kept seeing the same problem: people know exercise matters, but long routines don&apos;t fit their real lives. 5-Minute Body was built around a simpler question — <strong style={{ color: "#18181b" }}>what if starting required only five focused minutes?</strong> Now I lead these sessions LIVE for busy people across India.
              </p>
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
              { q: "Is the challenge really free?", a: "Yes — 100% free. Just add your name and WhatsApp number and pick a session." },
              { q: "Is the workout really only five minutes?", a: "Yes. The focused exercise block is five minutes. The complete guided LIVE experience is around 15 minutes — welcome, learn why, choose your level, do your Five, cool down." },
              { q: "Do I need any equipment?", a: "No. Every movement is equipment-free and can be done from home." },
              { q: "What if I'm completely unfit?", a: "You're welcome exactly as you are. Every exercise has a MOVE / BUILD / PUSH variation — you simply pick the one that's right for your body." },
              { q: "What if I'm already fit?", a: "Use the higher PUSH variation of each movement to keep it challenging." },
              { q: "Do I need to attend both 7 AM and 7 PM?", a: "No — you only attend one session a day. Pick whichever time works for you." },
              { q: "Can I switch between morning and evening?", a: "Yes. Attend whichever session fits your day — you're never locked in." },
              { q: "What happens if I miss a day?", a: "Nothing bad. Just come back the next day and continue. A missed day is never a failed challenge." },
              { q: "How do you track my progress?", a: "After each Five, you tap DONE on WhatsApp and we keep your 14-day streak for you." },
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
          <p className="duc-label mb-3" style={{ color: "#a8790d" }}>Free 14-day live challenge</p>
          <h2 className="duc-h1 mb-4" style={{ color: "#fff" }}>
            14 days. 5 minutes a day.<br />
            <span style={{ color: "#a8790d" }}>Start today.</span>
          </h2>
          <p style={{ fontSize: 17, color: "#a1a1aa", lineHeight: 1.6, marginBottom: 8, maxWidth: 460, margin: "0 auto 8px" }}>
            You don&apos;t need another complicated fitness plan. You need somewhere simple to start.
          </p>
          <p style={{ fontSize: 15, fontWeight: 800, color: "#e8a020", marginBottom: 28 }}>🌅 {CHALLENGE.morning} · 🌙 {CHALLENGE.evening} · 🎁 Free</p>
          <CTA label="Start My Challenge Free →" sub={CHALLENGE.seatsLine} />
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
