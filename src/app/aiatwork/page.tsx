"use client";
import { useState, useEffect, useRef, createContext, useContext } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// AI at Work™ — free 14-day LIVE series for working professionals.
// Design language: WORK × AI (indigo/blue), NOT sci-fi robots.
// One goal on this page: get the registration.
// ═════════════════════════════════════════════════════════════════════════════

const SERIES = {
  name: "AI at Work™",
  daily: "15 minutes LIVE every day",
  days: "14 Days",
  price: "₹4,999", // struck-through on CTAs → FREE
};

// ─── Register modal context ─────────────────────────────────────────────────────
const RegisterCtx = createContext<() => void>(() => {});
function useRegister() { return useContext(RegisterCtx); }

// ─── Icons ────────────────────────────────────────────────────────────────────
function BoltIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2z" fill="#fff" />
    </svg>
  );
}
function ArrowIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Reveal-on-scroll wrapper ───────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.12 }
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

// ─── Price tag: struck-through → FREE ───────────────────────────────────────────
function PriceTag() {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span style={{ fontWeight: 700, color: "rgba(255,255,255,0.8)", textDecoration: "line-through", textDecorationColor: "#f87171", textDecorationThickness: 2 }}>{SERIES.price}</span>
      <span style={{ fontWeight: 900, letterSpacing: "0.02em" }}>FREE</span>
    </span>
  );
}

// ─── Primary CTA button ─────────────────────────────────────────────────────────
function CTA({ label = "Start Using AI At Work", sub, big = false }: { label?: string; sub?: string; big?: boolean }) {
  const register = useRegister();
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={register}
        className="btn-primary inline-flex items-center justify-center gap-3 rounded-full font-black text-white w-full sm:w-auto"
        style={{ fontSize: big ? 23 : 20, padding: big ? "24px 52px" : "20px 44px", border: "none", cursor: "pointer", lineHeight: 1.15, letterSpacing: "-0.01em" }}>
        <BoltIcon size={big ? 24 : 22} />
        <span>{label}</span>
        <ArrowIcon size={big ? 22 : 20} />
      </button>
      {sub && <p style={{ fontSize: 13.5, color: "#64748b", textAlign: "center" }}>{sub}</p>}
    </div>
  );
}

// ─── FAQ ────────────────────────────────────────────────────────────────────────
function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: "#e2e8f0", boxShadow: "0 2px 10px rgba(15,23,42,0.04)" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left font-bold bg-white hover:bg-slate-50 transition-colors" style={{ color: "#0f172a", fontSize: 16 }}>
        {q}
        <span className="shrink-0 text-2xl font-light" style={{ color: "#4f46e5", display: "inline-block", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
      </button>
      {open && <div className="px-5 pb-5 leading-relaxed bg-white" style={{ fontSize: 14, color: "#475569" }}>{a}</div>}
    </div>
  );
}

// ─── Register modal — capture the lead FIRST, then profile ──────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "13px 16px", borderRadius: 12, border: "1.5px solid #e2e8f0",
  fontSize: 16, color: "#0f172a", outline: "none", background: "#f8fafc",
};
const ROLES = ["Marketing", "Sales", "HR", "Finance", "Operations", "Management", "Founder / Business", "IT / Tech", "Other"];
const FOCUS = ["Productivity", "Communication", "Data / Excel", "Meetings / Presentations", "Career Growth", "Automation / Agents"];

function RegisterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [role, setRole] = useState("");
  const [focus, setFocus] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Reset to step 1 whenever the modal is (re)opened.
  useEffect(() => { if (open) { setStep(1); setStatus("idle"); } }, [open]);

  if (!open) return null;

  const post = async (extra: { role?: string; focus?: string } = {}) => {
    try {
      await fetch("/api/aiatwork-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), whatsapp: whatsapp.trim(), ...extra }),
      });
    } catch {
      /* saved best-effort; never block the user */
    }
  };

  // Step 1 — capture the lead, then advance to profiling.
  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.includes("@") || whatsapp.replace(/\D/g, "").length < 8) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    if (typeof window !== "undefined" && typeof window.fbq === "function")
      window.fbq("track", "CompleteRegistration", { content_name: "AI at Work 14-Day Series" });
    await post();            // lead captured here — never lost even if they skip step 2
    setStatus("idle");
    setStep(2);
  };

  // Step 2 — enrich profile (optional), then off to Thank-You.
  const finish = async () => {
    await post({ role, focus }); // upsert enriches the same row
    if (typeof window !== "undefined") window.location.href = "/aiatwork/thank-you";
  };

  return (
    <>
      <div className="fixed inset-0 z-[110]" style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)" }} onClick={onClose} />
      <div className="fixed inset-0 z-[111] flex items-center justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-md rounded-3xl overflow-hidden max-h-[92vh] overflow-y-auto" onClick={e => e.stopPropagation()} style={{ background: "#fff", boxShadow: "0 20px 60px rgba(15,23,42,0.28)", animation: "aiw-fadein 0.35s ease" }}>
          <div className="relative px-6 pt-7 pb-5 text-center" style={{ background: "linear-gradient(135deg,#4338ca,#6366f1)" }}>
            <button onClick={onClose} className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full cursor-pointer" style={{ background: "rgba(255,255,255,0.2)", border: "none" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>
            </button>
            <p className="text-3xl mb-2">{step === 1 ? "⚡" : "🎯"}</p>
            <h2 className="text-white font-black leading-snug" style={{ fontSize: 18 }}>
              {step === 1 ? "Join the 14-Day AI at Work™ Series" : "One quick thing…"}
            </h2>
            <p className="text-white" style={{ fontSize: 13, opacity: 0.92, marginTop: 4 }}>
              {step === 1
                ? <><span style={{ textDecoration: "line-through", opacity: 0.8 }}>{SERIES.price}</span> today <strong>FREE</strong></>
                : "Your seat is saved 🎉 — help us tailor it to you."}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={submitLead} className="px-6 py-5">
              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, marginBottom: 16, textAlign: "center", fontWeight: 500 }}>
                We&apos;ll send your session joining link and daily AI upgrades to the details below.
              </p>
              <div className="flex flex-col gap-3">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="First name" autoComplete="given-name" style={inputStyle} />
                <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="WhatsApp number" type="tel" inputMode="tel" autoComplete="tel" style={inputStyle} />
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" type="email" autoComplete="email" style={inputStyle} />
              </div>
              {status === "error" && (
                <p style={{ fontSize: 12.5, color: "#dc2626", marginTop: 10, textAlign: "center" }}>
                  Please add your first name, a valid email and WhatsApp number.
                </p>
              )}
              <button type="submit" disabled={status === "loading"} className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full font-black text-white btn-primary mt-4" style={{ fontSize: 17, border: "none", cursor: status === "loading" ? "wait" : "pointer", opacity: status === "loading" ? 0.7 : 1 }}>
                <BoltIcon size={18} />{status === "loading" ? "Saving…" : "Start Using AI At Work →"}
              </button>
              <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 10, textAlign: "center" }}>Free · No coding required · Join from anywhere</p>
            </form>
          ) : (
            <div className="px-6 py-5">
              <div className="mb-5">
                <p style={{ fontSize: 13.5, fontWeight: 800, color: "#0f172a", marginBottom: 10 }}>Which best describes your work?</p>
                <div className="flex flex-wrap gap-2">
                  {ROLES.map(r => (
                    <button key={r} type="button" onClick={() => setRole(r)} className="rounded-full px-3.5 py-2 transition-colors" style={{ fontSize: 13, fontWeight: 600, border: role === r ? "1.5px solid #4f46e5" : "1.5px solid #e2e8f0", background: role === r ? "#eef2ff" : "#fff", color: role === r ? "#4338ca" : "#334155", cursor: "pointer" }}>{r}</button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <p style={{ fontSize: 13.5, fontWeight: 800, color: "#0f172a", marginBottom: 10 }}>What would you most like AI to help you with?</p>
                <div className="flex flex-wrap gap-2">
                  {FOCUS.map(f => (
                    <button key={f} type="button" onClick={() => setFocus(f)} className="rounded-full px-3.5 py-2 transition-colors" style={{ fontSize: 13, fontWeight: 600, border: focus === f ? "1.5px solid #4f46e5" : "1.5px solid #e2e8f0", background: focus === f ? "#eef2ff" : "#fff", color: focus === f ? "#4338ca" : "#334155", cursor: "pointer" }}>{f}</button>
                  ))}
                </div>
              </div>
              <button onClick={finish} className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full font-black text-white btn-primary" style={{ fontSize: 17, border: "none", cursor: "pointer" }}>
                Take Me To My 14 Days →
              </button>
              <button onClick={finish} className="w-full text-center mt-3" style={{ fontSize: 12.5, color: "#94a3b8", background: "none", border: "none", cursor: "pointer" }}>Skip for now</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Sticky bottom CTA (mobile-visible throughout) ──────────────────────────────
function StickyBottomCTA() {
  const register = useRegister();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const f = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", f, { passive: true }); f();
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div className={`fixed bottom-4 inset-x-0 z-50 flex justify-center px-4 transition-all duration-300 ${visible ? "translate-y-0 opacity-100" : "translate-y-[130%] opacity-0 pointer-events-none"}`}>
      <button onClick={register} className="flex items-center justify-between gap-4 rounded-full pl-6 pr-3 py-3 w-full max-w-md" style={{ background: "linear-gradient(135deg,#4338ca,#6366f1)", boxShadow: "0 10px 30px rgba(79,70,229,0.5)", border: "none", cursor: "pointer" }}>
        <div className="text-left">
          <p className="text-white font-black leading-tight" style={{ fontSize: 15 }}>Join Free — 14 Days</p>
          <p className="mt-0.5" style={{ fontSize: 12, color: "rgba(255,255,255,0.9)" }}>15 min live daily · No coding required</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full px-4 py-2.5 shrink-0" style={{ background: "rgba(255,255,255,0.22)" }}><BoltIcon size={16} /><span className="text-white font-bold" style={{ fontSize: 14 }}>Join</span></div>
      </button>
    </div>
  );
}

// ─── Live registration toast (social proof) ─────────────────────────────────────
const NAMES = [
  { name: "Rahul", city: "Delhi", role: "Marketing" }, { name: "Priya", city: "Mumbai", role: "HR" }, { name: "Aditya", city: "Bengaluru", role: "IT" },
  { name: "Sneha", city: "Pune", role: "Sales" }, { name: "Vikram", city: "Hyderabad", role: "Finance" }, { name: "Anjali", city: "Chennai", role: "Ops" },
  { name: "Karan", city: "Jaipur", role: "Founder" }, { name: "Divya", city: "Ahmedabad", role: "Manager" }, { name: "Manish", city: "Kolkata", role: "Sales" },
  { name: "Meera", city: "Surat", role: "Marketing" }, { name: "Arjun", city: "Lucknow", role: "IT" }, { name: "Tanvi", city: "Nagpur", role: "HR" },
];
let _tid = 0;
const AGO = ["just now", "20 seconds ago", "40 seconds ago", "1 minute ago", "2 minutes ago", "3 minutes ago", "5 minutes ago"];
function tAgo() { return AGO[Math.floor(Math.random() * AGO.length)]; }

function LiveToast() {
  interface T { id: number; name: string; city: string; role: string; time: string }
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
      setToasts(prev => [{ id, name: p.name, city: p.city, role: p.role, time: tAgo() }, ...prev].slice(0, 3));
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
      timer.current = setTimeout(spawn, 8000 + Math.random() * 11000);
    };
    timer.current = setTimeout(spawn, 4000 + Math.random() * 3000);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [scrolled]);
  if (!scrolled || toasts.length === 0) return null;
  return (
    <div className="fixed left-4 z-40 flex flex-col gap-2 pointer-events-none bottom-4 md:bottom-5" aria-live="polite">
      {toasts.map((t, i) => (
        <div key={t.id} className="pointer-events-auto" style={{ opacity: i === 0 ? 1 : 0.65 - i * 0.15, transform: `scale(${1 - i * 0.03})`, transformOrigin: "bottom left", animation: "aiw-fadein 0.3s ease" }}>
          <div className="flex items-center gap-2.5 rounded-2xl px-3 py-2.5 w-[268px]" style={{ background: "#fff", border: "1px solid #e2e8f0", boxShadow: "0 6px 20px rgba(15,23,42,0.12)" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ background: `hsl(${(t.name.charCodeAt(0) * 37) % 360},55%,48%)` }}>{t.name[0]}</div>
            <div className="flex-1 min-w-0">
              <p className="font-bold leading-snug truncate" style={{ fontSize: 12, color: "#0f172a" }}>{t.name} · {t.role} · {t.city}</p>
              <p className="leading-snug mt-0.5" style={{ fontSize: 11, color: "#475569" }}>joined the 14-day series · {t.time}</p>
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
      try { if (localStorage.getItem("aiw_pop") === "1") return; } catch { /**/ }
      shown.current = true; setVisible(true);
    }, 22000);
    return () => clearTimeout(t);
  }, []);
  const dismiss = () => { setVisible(false); setDismissed(true); try { localStorage.setItem("aiw_pop", "1"); } catch { /**/ } };
  if (!visible || dismissed) return null;
  return (
    <>
      <div className="fixed inset-0 z-[100]" style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)" }} onClick={dismiss} />
      <div className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-sm rounded-3xl overflow-hidden" onClick={e => e.stopPropagation()} style={{ background: "#fff", boxShadow: "0 20px 60px rgba(15,23,42,0.28)", animation: "aiw-fadein 0.35s ease" }}>
          <div className="relative px-6 pt-7 pb-5 text-center" style={{ background: "linear-gradient(135deg,#4338ca,#6366f1)" }}>
            <button onClick={dismiss} className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full cursor-pointer" style={{ background: "rgba(255,255,255,0.2)", border: "none" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>
            </button>
            <p className="text-3xl mb-2">⚡</p>
            <h2 className="text-white font-black leading-snug" style={{ fontSize: 18 }}>Grab your free seat 🎉</h2>
          </div>
          <div className="px-6 py-5 text-center">
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, marginBottom: 12 }}>
              14 days. 14 work problems. <strong style={{ color: "#0f172a" }}>14 practical AI skills</strong> — 15 minutes live every day. Completely free.
            </p>
            <button onClick={() => { dismiss(); register(); }} className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full font-black text-white btn-primary" style={{ fontSize: 17, border: "none", cursor: "pointer" }}>
              <BoltIcon size={18} />Start Using AI At Work →
            </button>
            <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 8 }}>Free · No coding required</p>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Meta Pixel ViewContent ─────────────────────────────────────────────────────
function useMetaPixelViewContent() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "ViewContent", {
        content_name: "AI at Work 14-Day Series",
        content_category: "Series Registration",
      });
    }
  }, []);
}

// ─── Small reusable bits ────────────────────────────────────────────────────────
function Label({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <p className="aiw-label" style={dark ? { color: "#a5b4fc" } : undefined}>{children}</p>;
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGE
// ═════════════════════════════════════════════════════════════════════════════
export default function AiAtWorkPage() {
  useMetaPixelViewContent();
  const [modalOpen, setModalOpen] = useState(false);
  const openRegister = () => setModalOpen(true);

  // ── Section 3 workday cards ──
  const workday = [
    { icon: "📧", t: "Emails", d: "Writing, replying, following up" },
    { icon: "🔍", t: "Research", d: "Finding and understanding information" },
    { icon: "📄", t: "Documents", d: "Reading, summarizing, drafting" },
    { icon: "🤝", t: "Meetings", d: "Preparing, taking notes, following up" },
    { icon: "📊", t: "Excel & Data", d: "Analyzing numbers and creating insights" },
    { icon: "🎤", t: "Presentations", d: "Planning slides and communicating ideas" },
    { icon: "🧠", t: "Learning", d: "Understanding new topics quickly" },
    { icon: "🔁", t: "Repetitive Tasks", d: "Doing the same work again and again" },
  ];

  // ── Section 7: 14-day roadmap ──
  const roadmap = [
    { d: "01", tag: "PROMPTING", t: "Stop Talking To AI Like Google", d2: "A better framework for asking AI for useful work output." },
    { d: "02", tag: "EMAIL", t: "Write Better Emails, Faster", d2: "Use AI to draft, improve and adapt professional emails." },
    { d: "03", tag: "RESEARCH", t: "Research Without Opening 27 Tabs", d2: "Research topics, companies or ideas more efficiently." },
    { d: "04", tag: "DOCUMENTS", t: "Turn Long Documents Into What Matters", d2: "Summarize, question and extract actions from documents." },
    { d: "05", tag: "MEETINGS", t: "Turn Meetings Into Actions", d2: "AI for preparation, notes, summaries and follow-ups." },
    { d: "06", tag: "COMMUNICATION", t: "Sound Clearer & More Professional", d2: "Improve clarity, tone and structure at work." },
    { d: "07", tag: "CAREER", t: "Find The Skills You Should Be Building", d2: "Use AI to analyze roles, skills and potential gaps." },
    { d: "08", tag: "EXCEL & DATA", t: "Stop Staring At Spreadsheets", d2: "Understand formulas, analyze data, uncover insights." },
    { d: "09", tag: "PRESENTATIONS", t: "From Blank Slide To Clear Story", d2: "Structure presentations and sharpen your messaging." },
    { d: "10", tag: "LEARNING", t: "Understand Difficult Things Faster", d2: "Turn AI into a personal tutor for work learning." },
    { d: "11", tag: "THINKING", t: "Use AI As Your Thinking Partner", d2: "Brainstorm, challenge assumptions, improve decisions." },
    { d: "12", tag: "PRODUCTIVITY", t: "Take Repetitive Work Off Your Plate", d2: "Identify tasks AI can simplify or speed up." },
    { d: "13", tag: "AUTOMATION", t: "Make AI Work Without Repeating Yourself", d2: "How tasks move from prompting to workflows." },
    { d: "14", tag: "AI AGENTS", t: "From Using AI → Delegating To AI", d2: "What AI agents are + a simple agentic workflow." },
  ];

  // ── Section 8 outcomes ──
  const outcomes = [
    { icon: "✍️", t: "A Better Prompting Framework", d: "Communicate context, outcome and constraints to AI." },
    { icon: "📧", t: "AI Email Workflow", d: "Draft and improve professional communication faster." },
    { icon: "🔍", t: "AI Research Workflow", d: "Research topics and extract useful information efficiently." },
    { icon: "🤝", t: "AI Meeting Workflow", d: "Prepare, summarize and convert meetings into actions." },
    { icon: "📊", t: "AI Data Workflow", d: "Use AI to assist with spreadsheets and analysis." },
    { icon: "🎤", t: "AI Presentation Workflow", d: "Go from idea to presentation structure faster." },
    { icon: "🧠", t: "AI Learning Workflow", d: "Learn work-related topics with AI assistance." },
    { icon: "🔁", t: "Your First Automation Mindset", d: "Start spotting work that shouldn't be done manually." },
    { icon: "🤖", t: "Introduction To AI Agents", d: "Understand what comes after basic AI usage." },
  ];

  // ── Section 10 audiences ──
  const audiences = [
    { icon: "💼", t: "EMPLOYEES", d: "Use AI to become faster and more capable at everyday work." },
    { icon: "📊", t: "MANAGERS", d: "Use AI for planning, communication, analysis and decisions." },
    { icon: "📈", t: "MARKETERS", d: "Use AI across research, content, analysis and campaigns." },
    { icon: "🤝", t: "SALES PROFESSIONALS", d: "Use AI for research, communication and preparation." },
    { icon: "👥", t: "HR PROFESSIONALS", d: "Use AI for communication, research and repetitive workflows." },
    { icon: "📋", t: "OPERATIONS", d: "Simplify repetitive processes and information handling." },
    { icon: "🧑‍💼", t: "FOUNDERS / BUSINESS", d: "Reduce repetitive work and increase your leverage." },
  ];

  // ── Section 12 staircase ──
  const levels = [
    { n: "01", t: "ASK AI", q: "“Help me write this.”" },
    { n: "02", t: "WORK WITH AI", q: "“Help me research, analyze and create this.”" },
    { n: "03", t: "BUILD AI WORKFLOWS", q: "“Let's make this repeatable.”" },
    { n: "04", t: "AUTOMATE WORK", q: "“Run this workflow automatically.”" },
    { n: "05", t: "WORK WITH AI AGENTS", q: "“Give AI a goal and let it execute.”" },
  ];

  return (
    <RegisterCtx.Provider value={openRegister}>
    <div id="aiw-top" style={{ background: "#f8fafc", minHeight: "100vh", color: "#0f172a", fontSize: 16 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500&family=Poppins:wght@500;600;700;800;900&display=swap');
        @keyframes aiw-fadein{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes aiw-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes aiw-pulse-line{0%,100%{opacity:0.35}50%{opacity:1}}
        #aiw-top{font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
        #aiw-top h1,#aiw-top h2,#aiw-top .aiw-h1,#aiw-top .aiw-h2{font-family:'Poppins','Plus Jakarta Sans',sans-serif}
        #aiw-top p{letter-spacing:0.01em;line-height:1.7;font-weight:500}
        .aiw-h1{font-size:clamp(2.2rem,5.5vw,3.7rem);font-weight:800;line-height:1.08;letter-spacing:-0.03em}
        .aiw-h2{font-size:clamp(1.7rem,4vw,2.6rem);font-weight:800;line-height:1.16;letter-spacing:-0.025em;color:#0f172a}
        .aiw-label{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.14em;color:#4f46e5;font-family:'Poppins',sans-serif;line-height:1.4}
        #aiw-top .grad{background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 55%,#2563eb 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}
        #aiw-top .btn-primary{background:linear-gradient(135deg,#4338ca 0%,#6366f1 50%,#4f46e5 100%);color:#fff;font-weight:900;box-shadow:0 12px 34px rgba(79,70,229,0.45),inset 0 1px 0 rgba(255,255,255,0.25)}
        #aiw-top .btn-primary:hover{background:linear-gradient(135deg,#3730a3 0%,#4f46e5 50%,#4338ca 100%);box-shadow:0 16px 42px rgba(79,70,229,0.55)}
        #aiw-top .btn-primary:active{transform:translateY(1px)}
        #aiw-top .accent-pill{background:rgba(79,70,229,0.1);color:#4338ca;border:1px solid rgba(79,70,229,0.28)}
        #aiw-top .mesh{background:radial-gradient(60% 55% at 12% 8%,rgba(99,102,241,0.14) 0%,rgba(99,102,241,0) 60%),radial-gradient(55% 50% at 92% 12%,rgba(124,58,237,0.12) 0%,rgba(124,58,237,0) 60%),#f8fafc}
        .pop-card{transition:transform 0.2s,box-shadow 0.2s}
        .pop-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px -12px rgba(79,70,229,0.3)}
      `}</style>

      {/* ══ 0. ANNOUNCEMENT BAR ══════════════════════════════════════════════ */}
      <div style={{ background: "linear-gradient(90deg,#4338ca 0%,#6366f1 50%,#4338ca 100%)", padding: "12px 16px" }}>
        <p className="text-center font-black text-white flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5" style={{ fontSize: "clamp(14px,2vw,17px)", letterSpacing: "0.005em", lineHeight: 1.3 }}>
          <span>⚡ FREE 14-Day AI at Work™ LIVE Series</span>
          <span className="opacity-70 hidden sm:inline" aria-hidden="true">·</span>
          <span className="hidden sm:inline">15 min live daily · Completely FREE</span>
        </p>
      </div>

      {/* ══ 1. HERO ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden mesh flex flex-col lg:min-h-[calc(100svh-48px)]" style={{ borderBottom: "1px solid #e2e8f0" }}>
        <div className="flex-1 flex items-center">
        <div className="w-full max-w-6xl mx-auto px-6 lg:px-8 pt-8 pb-10 lg:py-8 grid lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-10 items-center">
          {/* Left: copy */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 accent-pill" style={{ fontSize: 12.5, fontWeight: 700 }}>
              <span className="w-2 h-2 rounded-full inline-block animate-pulse" style={{ background: "#4f46e5" }} />
              Free 14-Day Live AI Series for Working Professionals
            </div>
            <h1 className="mb-4" style={{ fontSize: "clamp(2rem,4vw,3.1rem)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", fontFamily: "'Poppins','Plus Jakarta Sans',sans-serif" }}>
              Stop Just Learning AI.<br />
              <span className="grad">Start Using It At Work.</span>
            </h1>
            <p style={{ fontSize: 16.5, color: "#475569", maxWidth: 560, margin: "0 auto 14px" }} className="lg:mx-0">
              Join the <strong style={{ color: "#0f172a" }}>14-Day AI at Work™ LIVE Series</strong> and discover one practical way to use AI in your everyday work — from emails and meetings to research, presentations, Excel, productivity and automation.
            </p>
            <p style={{ fontSize: 16.5, fontWeight: 800, color: "#4338ca", maxWidth: 560, margin: "0 auto 18px", fontFamily: "'Poppins',sans-serif" }} className="lg:mx-0">
              14 Days. 14 Work Problems. 14 Practical AI Skills.
            </p>

            {/* quick highlights */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
              {["⚡ 15 Min LIVE Daily", "💼 For Professionals", "🛠️ Learn + Do LIVE", "📲 Daily AI Upgrade", "🎁 Completely FREE"].map(h => (
                <span key={h} className="rounded-full px-3 py-1.5" style={{ background: "#fff", border: "1.5px solid #e2e8f0", fontSize: 13, fontWeight: 700, color: "#334155" }}>{h}</span>
              ))}
            </div>

            <div className="flex flex-col items-center lg:items-start gap-2.5">
              <button onClick={openRegister} className="btn-primary inline-flex items-center justify-center gap-3 rounded-full font-black text-white w-full sm:w-auto" style={{ fontSize: 21, padding: "22px 46px", border: "none", cursor: "pointer", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
                <BoltIcon size={24} /><span>Join The 14-Day Series — Free</span><ArrowIcon size={20} />
              </button>
              <p style={{ fontSize: 13.5, color: "#64748b" }}>No technical background required • Join from anywhere</p>
            </div>
          </div>

          {/* Right: WORK × AI visual — a professional's workday, AI wired into each task */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full" style={{ maxWidth: 480, animation: "aiw-float 5.5s ease-in-out infinite" }}>
              <div className="rounded-3xl p-6 lg:p-7" style={{ background: "#fff", border: "1px solid #e2e8f0", boxShadow: "0 24px 60px -18px rgba(79,70,229,0.35)" }}>
                {/* laptop bar */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-3 h-3 rounded-full" style={{ background: "#f87171" }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: "#fbbf24" }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: "#34d399" }} />
                  <span className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1" style={{ background: "#eef2ff", color: "#4338ca", fontSize: 11.5, fontWeight: 800 }}>
                    <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#4f46e5", animation: "aiw-pulse-line 1.6s infinite" }} />AI · LIVE
                  </span>
                </div>
                <p style={{ fontSize: 12, fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Your workday, upgraded</p>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { icon: "📧", t: "Email" }, { icon: "🤝", t: "Meetings" }, { icon: "🔍", t: "Research" },
                    { icon: "📊", t: "Excel" }, { icon: "🎤", t: "Slides" }, { icon: "🔁", t: "Tasks" },
                  ].map(({ icon, t }, i) => (
                    <div key={t} className="rounded-2xl flex flex-col items-center justify-center py-3.5" style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", animation: `aiw-fadein 0.5s ease ${i * 90}ms both` }}>
                      <span style={{ fontSize: 24 }}>{icon}</span>
                      <span style={{ fontSize: 11.5, fontWeight: 700, color: "#334155", marginTop: 4 }}>{t}</span>
                      <span className="mt-1.5 inline-flex items-center gap-1 rounded-full px-1.5 py-0.5" style={{ background: "#eef2ff", color: "#4f46e5", fontSize: 9, fontWeight: 800 }}>+ AI</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl px-4 py-3.5 text-center" style={{ background: "linear-gradient(135deg,#4338ca,#6366f1)" }}>
                  <p style={{ fontSize: 13.5, fontWeight: 800, color: "#fff", lineHeight: 1.4 }}>AI entering the work you already do — every single day.</p>
                </div>
              </div>
              {/* floating chips */}
              <span className="absolute -top-3 -left-3 rounded-full px-3 py-1.5 hidden sm:inline-flex items-center gap-1.5" style={{ background: "#fff", boxShadow: "0 8px 20px rgba(15,23,42,0.12)", fontSize: 12, fontWeight: 800, color: "#0f172a" }}>🎁 Free</span>
              <span className="absolute -bottom-3 -right-3 rounded-full px-3 py-1.5 hidden sm:inline-flex items-center gap-1.5" style={{ background: "#fff", boxShadow: "0 8px 20px rgba(15,23,42,0.12)", fontSize: 12, fontWeight: 800, color: "#0f172a" }}>⚡ 15 min/day</span>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ══ 2. BELIEF BREAKER ════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-10">
            <Label>The real AI problem</Label>
            <h2 className="aiw-h2 mt-3">You&apos;ve Probably Learned More AI<br className="hidden sm:block" /> Than You&apos;ve Actually <span className="grad">Used.</span></h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            <Reveal>
              <div className="rounded-3xl p-7 h-full" style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0" }}>
                <p style={{ fontSize: 12.5, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>What most people do</p>
                <div className="flex flex-col gap-2.5">
                  {["Save AI reels", "Collect prompts", "Bookmark new tools", "Watch tutorials", "Download AI ebooks", "Attend webinars"].map(t => (
                    <div key={t} className="flex items-center gap-2.5"><span style={{ color: "#94a3b8", fontWeight: 900 }}>•</span><span style={{ fontSize: 15.5, color: "#64748b", fontWeight: 600 }}>{t}</span></div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="rounded-3xl p-7 h-full flex flex-col justify-center text-center" style={{ background: "linear-gradient(135deg,#4338ca,#6366f1)" }}>
                <p style={{ fontSize: 12.5, fontWeight: 800, color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>What actually changes your work</p>
                <p style={{ fontSize: "clamp(2rem,6vw,3rem)", fontWeight: 900, color: "#fff", lineHeight: 1.05, fontFamily: "'Poppins',sans-serif" }}>USING AI.</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <div className="text-center mt-10 max-w-2xl mx-auto">
              <p style={{ fontSize: 18, color: "#0f172a", fontWeight: 700, lineHeight: 1.5 }}>
                You don&apos;t need another list of 100 AI tools.
              </p>
              <p style={{ fontSize: 18, color: "#475569", lineHeight: 1.5, marginTop: 6 }}>
                You need to know <strong style={{ color: "#0f172a" }}>where AI fits into the work you already do every day.</strong>
              </p>
              <p className="mt-7" style={{ fontSize: "clamp(1.35rem,3vw,1.9rem)", fontWeight: 900, lineHeight: 1.3, fontFamily: "'Poppins',sans-serif" }}>
                That&apos;s exactly what <span className="grad">AI at Work™</span> is built for.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 3. MAKE IT PERSONAL ══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "#f8fafc" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-10">
            <Label>Think about your workday</Label>
            <h2 className="aiw-h2 mt-3">How Much Of Your Day <span className="grad">Looks Like This?</span></h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {workday.map(({ icon, t, d }, i) => (
              <Reveal key={t} delay={i * 45}>
                <div className="pop-card rounded-2xl p-5 h-full" style={{ background: "#fff", border: "1.5px solid #e2e8f0" }}>
                  <span style={{ fontSize: 30 }}>{icon}</span>
                  <p style={{ fontSize: 15.5, fontWeight: 800, color: "#0f172a", marginTop: 8, fontFamily: "'Poppins',sans-serif" }}>{t}</p>
                  <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.45, marginTop: 4 }}>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <div className="text-center mt-10">
              <p style={{ fontSize: "clamp(1.3rem,3vw,1.8rem)", fontWeight: 800, color: "#0f172a", lineHeight: 1.3, fontFamily: "'Poppins',sans-serif" }}>
                AI can already help across almost all of these.
              </p>
              <p style={{ fontSize: 15.5, color: "#64748b", marginTop: 8 }}>The question is:</p>
              <p style={{ fontSize: "clamp(1.5rem,3.5vw,2.2rem)", fontWeight: 900, marginTop: 4, fontFamily: "'Poppins',sans-serif" }} className="grad">Do you know HOW to use it?</p>
              <div className="flex justify-center mt-7"><CTA label="Show Me How" sub="Free · No coding required" /></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 4. WHAT IS AI AT WORK? ═══════════════════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-4">
            <Label>Introducing</Label>
            <h2 className="mt-3" style={{ fontSize: "clamp(2.4rem,6vw,3.6rem)", fontWeight: 900, fontFamily: "'Poppins',sans-serif", letterSpacing: "-0.02em" }}><span className="grad">AI at Work™</span></h2>
            <p style={{ fontSize: 17, color: "#475569", marginTop: 10, fontWeight: 700 }}>A 14-Day LIVE AI Experience Built Specifically for Working Professionals.</p>
          </Reveal>
          <Reveal delay={60}>
            <p className="text-center" style={{ fontSize: 17, color: "#475569", maxWidth: 640, margin: "10px auto 40px", lineHeight: 1.65 }}>
              For 14 days, we meet LIVE every day for approximately <strong style={{ color: "#0f172a" }}>15 focused minutes</strong>. Every session focuses on <strong style={{ color: "#0f172a" }}>one real workplace problem.</strong>
            </p>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { k: "WHAT", d: "What AI can help you do.", icon: "💡" },
              { k: "HOW", d: "The tool, prompt or workflow to use.", icon: "🛠️" },
              { k: "DO", d: "You actually try it with us LIVE.", icon: "▶️" },
              { k: "APPLY", d: "You use it in your own work.", icon: "🎯" },
            ].map(({ k, d, icon }, i) => (
              <Reveal key={k} delay={i * 70}>
                <div className="rounded-2xl p-6 h-full text-center" style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0" }}>
                  <span style={{ fontSize: 28 }}>{icon}</span>
                  <p style={{ fontSize: 18, fontWeight: 900, color: "#4338ca", marginTop: 8, fontFamily: "'Poppins',sans-serif", letterSpacing: "0.02em" }}>{k}</p>
                  <p style={{ fontSize: 13.5, color: "#64748b", marginTop: 6, lineHeight: 1.45 }}>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <div className="rounded-2xl px-6 py-8 text-center mt-10" style={{ background: "#0f172a" }}>
              <p style={{ fontSize: "clamp(1.2rem,3vw,1.7rem)", fontWeight: 900, color: "#fff", lineHeight: 1.4, fontFamily: "'Poppins',sans-serif" }}>
                No endless theory. No tool overload.<br /><span style={{ color: "#a5b4fc" }}>AI you can actually use.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 5. SIGNATURE METHOD — LEARN → DO → APPLY ═════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "linear-gradient(135deg,#1e1b4b 0%,#111827 55%,#1e1b4b 100%)" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-12">
            <Label dark>Every session follows one simple system</Label>
            <h2 className="aiw-h2 mt-3" style={{ color: "#fff" }}>LEARN <span style={{ color: "#a5b4fc" }}>→</span> DO <span style={{ color: "#a5b4fc" }}>→</span> APPLY™</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 relative">
            {[
              { n: "01", t: "LEARN", min: "~3 Minutes", d: "Understand today's work problem and where AI can help." },
              { n: "02", t: "DO", min: "~7 Minutes", d: "Open the tool and perform the workflow with us LIVE." },
              { n: "03", t: "APPLY", min: "~5 Minutes", d: "Take the skill and apply it to something from your real work." },
            ].map(({ n, t, min, d }, i) => (
              <Reveal key={t} delay={i * 90}>
                <div className="rounded-3xl p-7 h-full" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(165,180,252,0.25)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center justify-center rounded-full" style={{ width: 42, height: 42, background: "linear-gradient(135deg,#4338ca,#6366f1)", color: "#fff", fontSize: 16, fontWeight: 900, fontFamily: "'Poppins',sans-serif" }}>{n}</span>
                    <div>
                      <p style={{ fontSize: 20, fontWeight: 900, color: "#fff", fontFamily: "'Poppins',sans-serif" }}>{t}</p>
                      <p style={{ fontSize: 12.5, fontWeight: 700, color: "#a5b4fc" }}>{min}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <p className="text-center mt-11" style={{ fontSize: "clamp(1.15rem,2.6vw,1.6rem)", fontWeight: 800, color: "#fff", lineHeight: 1.4, maxWidth: 720, margin: "2.75rem auto 0", fontFamily: "'Poppins',sans-serif" }}>
              15 minutes later, you leave with something <span style={{ color: "#a5b4fc" }}>done</span> — not just something learned.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ 6. CORE DIFFERENTIATOR ═══════════════════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "#0f172a" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-10">
            <h2 className="aiw-h2" style={{ color: "#fff" }}>This Isn&apos;t Another <span style={{ color: "#a5b4fc" }}>AI Course.</span></h2>
          </Reveal>
          <div className="rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(165,180,252,0.2)" }}>
            <div className="grid grid-cols-2" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(165,180,252,0.15)", borderRight: "1px solid rgba(165,180,252,0.15)" }}>
                <p style={{ fontSize: 12.5, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>Typical AI Learning</p>
              </div>
              <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(165,180,252,0.15)", background: "rgba(99,102,241,0.12)" }}>
                <p style={{ fontSize: 12.5, fontWeight: 800, color: "#a5b4fc", textTransform: "uppercase", letterSpacing: "0.08em" }}>AI at Work™</p>
              </div>
              {[
                ["Watch videos", "Do it LIVE"],
                ["Learn random tools", "Solve work problems"],
                ["Save prompts for later", "Use the prompt now"],
                ["Generic AI knowledge", "Practical workplace skills"],
                ["Learn alone", "Learn with a community"],
                ["“I'll try it someday”", "Apply it today"],
              ].map(([a, b], i) => (
                <Reveal key={a} delay={i * 40} className="contents">
                  <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(165,180,252,0.1)", borderRight: "1px solid rgba(165,180,252,0.1)" }}>
                    <p style={{ fontSize: 15, color: "#94a3b8", fontWeight: 500 }}>{a}</p>
                  </div>
                  <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(165,180,252,0.1)", background: "rgba(99,102,241,0.06)" }}>
                    <p style={{ fontSize: 15, color: "#fff", fontWeight: 800 }}>✓ {b}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={100}>
            <p className="text-center mt-10" style={{ fontSize: "clamp(1.15rem,2.6vw,1.55rem)", fontWeight: 800, color: "#fff", lineHeight: 1.45, maxWidth: 720, margin: "2.5rem auto 0", fontFamily: "'Poppins',sans-serif" }}>
              Because AI becomes valuable when it enters your <span style={{ color: "#a5b4fc" }}>WORK</span> — not your bookmarks folder.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ 7. THE 14-DAY ROADMAP ════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "#f8fafc" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-10">
            <Label>Your 14 days</Label>
            <h2 className="aiw-h2 mt-3">Discover 14 Ways AI Can <span className="grad">Upgrade Your Workday</span></h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roadmap.map(({ d, tag, t, d2 }, i) => (
              <Reveal key={d} delay={(i % 3) * 60}>
                <div className="pop-card rounded-2xl p-5 h-full flex flex-col" style={{ background: "#fff", border: "1.5px solid #e2e8f0" }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center justify-center rounded-lg" style={{ width: 46, height: 30, background: "linear-gradient(135deg,#4338ca,#6366f1)", color: "#fff", fontSize: 13, fontWeight: 900, fontFamily: "'Poppins',sans-serif" }}>{d}</span>
                    <span style={{ fontSize: 11, fontWeight: 800, color: "#4f46e5", textTransform: "uppercase", letterSpacing: "0.08em" }}>{tag}</span>
                  </div>
                  <p style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", lineHeight: 1.3, fontFamily: "'Poppins',sans-serif" }}>{t}</p>
                  <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.5, marginTop: 6 }}>{d2}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <div className="rounded-2xl px-6 py-7 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center" style={{ background: "#0f172a" }}>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>Day 1: <span style={{ color: "#fff" }}>&ldquo;I use AI sometimes.&rdquo;</span></p>
              <span style={{ color: "#a5b4fc", fontSize: 22, fontWeight: 900 }}>→</span>
              <p style={{ fontSize: 16, color: "#fff", fontWeight: 800 }}>Day 14: <span style={{ color: "#a5b4fc" }}>&ldquo;I know where AI fits into my work.&rdquo;</span></p>
            </div>
            <div className="flex justify-center mt-8"><CTA label="Start My 14 Days" sub="Free · 15 min live daily" /></div>
          </Reveal>
        </div>
      </section>

      {/* ══ 8. WHAT THEY WALK AWAY WITH ══════════════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-10">
            <Label>Not just knowledge</Label>
            <h2 className="aiw-h2 mt-3">14 Days Later, You&apos;ll Have A<br className="hidden sm:block" /> <span className="grad">Practical AI Toolkit For Work.</span></h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {outcomes.map(({ icon, t, d }, i) => (
              <Reveal key={t} delay={(i % 3) * 60}>
                <div className="pop-card rounded-2xl p-5 h-full" style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0" }}>
                  <span style={{ fontSize: 26 }}>{icon}</span>
                  <p style={{ fontSize: 15.5, fontWeight: 800, color: "#0f172a", marginTop: 8, fontFamily: "'Poppins',sans-serif", lineHeight: 1.3 }}>{t}</p>
                  <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.5, marginTop: 5 }}>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <div className="text-center mt-10 max-w-2xl mx-auto">
              <p style={{ fontSize: "clamp(1.3rem,3vw,1.85rem)", fontWeight: 900, color: "#0f172a", lineHeight: 1.3, fontFamily: "'Poppins',sans-serif" }}>
                You&apos;re Not Expected To Master AI In 14 Days.
              </p>
              <p style={{ fontSize: 17.5, color: "#4338ca", fontWeight: 800, marginTop: 8 }}>You&apos;re expected to start USING it differently.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 9. THE "YOUTUBE" OBJECTION ═══════════════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "linear-gradient(135deg,#1e1b4b 0%,#111827 55%,#1e1b4b 100%)" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-10">
            <Label dark>Yes, you can learn AI for free online</Label>
            <h2 className="aiw-h2 mt-3" style={{ color: "#fff" }}>So Why Join <span style={{ color: "#a5b4fc" }}>This?</span></h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.72)", maxWidth: 620, margin: "12px auto 0" }}>
              Because the internet doesn&apos;t have an information problem. It has an <strong style={{ color: "#fff" }}>implementation problem.</strong>
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <div className="rounded-3xl p-7 h-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>📺 YouTube</p>
                {["Search", "Watch", "Save", "Forget"].map(t => (
                  <div key={t} className="flex items-center gap-2.5 mb-2"><span style={{ color: "#64748b", fontWeight: 900 }}>•</span><span style={{ fontSize: 16, color: "#94a3b8", fontWeight: 600 }}>{t}</span></div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="rounded-3xl p-7 h-full" style={{ background: "rgba(99,102,241,0.14)", border: "1px solid rgba(165,180,252,0.4)" }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: "#a5b4fc", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>⚡ AI at Work™</p>
                {["Show Up", "Learn", "Do", "Apply"].map(t => (
                  <div key={t} className="flex items-center gap-2.5 mb-2"><span style={{ color: "#a5b4fc", fontWeight: 900 }}>✓</span><span style={{ fontSize: 16, color: "#fff", fontWeight: 800 }}>{t}</span></div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <div className="rounded-2xl px-6 py-6 mt-8" style={{ background: "rgba(255,255,255,0.04)", borderLeft: "4px solid #6366f1" }}>
              <p style={{ fontSize: 16.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}>
                You can find thousands of AI videos online. What you rarely get is someone saying: <strong style={{ color: "#fff" }}>&ldquo;Open your laptop. We&apos;re doing this together right now.&rdquo;</strong>
              </p>
            </div>
            <p className="text-center mt-9" style={{ fontSize: "clamp(1.3rem,3vw,1.9rem)", fontWeight: 900, color: "#fff", lineHeight: 1.3, fontFamily: "'Poppins',sans-serif" }}>
              Information Is Everywhere.<br /><span style={{ color: "#a5b4fc" }}>Implementation Is The Difference.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ 10. BUILT FOR WORKING PROFESSIONALS ══════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "#f8fafc" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-10">
            <Label>This isn&apos;t &ldquo;AI for everyone&rdquo;</Label>
            <h2 className="aiw-h2 mt-3">It&apos;s AI For People Who Actually<br className="hidden sm:block" /> Have <span className="grad">Work To Get Done.</span></h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {audiences.map(({ icon, t, d }, i) => (
              <Reveal key={t} delay={(i % 3) * 60}>
                <div className="pop-card rounded-2xl p-6 h-full" style={{ background: "#fff", border: "1.5px solid #e2e8f0" }}>
                  <span style={{ fontSize: 28 }}>{icon}</span>
                  <p style={{ fontSize: 15, fontWeight: 900, color: "#4338ca", marginTop: 8, fontFamily: "'Poppins',sans-serif", letterSpacing: "0.03em" }}>{t}</p>
                  <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.5, marginTop: 6 }}>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <p className="text-center mt-10" style={{ fontSize: "clamp(1.25rem,3vw,1.75rem)", fontWeight: 900, color: "#0f172a", lineHeight: 1.35, fontFamily: "'Poppins',sans-serif" }}>
              Different Jobs. Different Work.<br /><span className="grad">Same Question: How Can AI Help Me Do This Better?</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ 11. NO TECHNICAL BACKGROUND REQUIRED ═════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-10">
            <h2 className="aiw-h2">You Don&apos;t Need To Be <span className="grad">&ldquo;Technical.&rdquo;</span></h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <div className="rounded-3xl p-7 h-full" style={{ background: "#fff7f7", border: "1.5px solid #fee2e2" }}>
                <p style={{ fontSize: 12.5, fontWeight: 800, color: "#b91c1c", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>You do NOT need to know</p>
                {["Coding", "APIs", "Machine Learning", "Python", "AI Engineering"].map(t => (
                  <div key={t} className="flex items-center gap-2.5 mb-2.5"><span style={{ color: "#ef4444", fontWeight: 900 }}>✕</span><span style={{ fontSize: 16, color: "#64748b", fontWeight: 600 }}>{t}</span></div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="rounded-3xl p-7 h-full" style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}>
                <p style={{ fontSize: 12.5, fontWeight: 800, color: "#15803d", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>You just need</p>
                {["A laptop", "Internet", "Curiosity", "Real work you want to improve"].map(t => (
                  <div key={t} className="flex items-center gap-2.5 mb-2.5"><span style={{ color: "#16a34a", fontWeight: 900 }}>✓</span><span style={{ fontSize: 16, color: "#0f172a", fontWeight: 700 }}>{t}</span></div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <div className="text-center mt-9">
              <p style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>We start with practical AI usage.</p>
              <p style={{ fontSize: 16, color: "#64748b", marginTop: 4 }}>Automation and agents come later.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 12. THE PROGRESSION — staircase ══════════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "linear-gradient(135deg,#1e1b4b 0%,#111827 55%,#1e1b4b 100%)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-12">
            <Label dark>Where this can take you</Label>
            <h2 className="aiw-h2 mt-3" style={{ color: "#fff" }}>From AI User <span style={{ color: "#a5b4fc" }}>→</span> AI-Powered Professional</h2>
          </Reveal>
          <div className="flex flex-col gap-3">
            {levels.map(({ n, t, q }, i) => (
              <Reveal key={n} delay={i * 70}>
                <div className="rounded-2xl p-5 flex items-center gap-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(165,180,252,0.22)", marginLeft: `${i * 8}%` }}>
                  <span className="inline-flex items-center justify-center rounded-full shrink-0" style={{ width: 40, height: 40, background: "linear-gradient(135deg,#4338ca,#6366f1)", color: "#fff", fontSize: 14, fontWeight: 900, fontFamily: "'Poppins',sans-serif" }}>{n}</span>
                  <div>
                    <p style={{ fontSize: 15.5, fontWeight: 900, color: "#fff", fontFamily: "'Poppins',sans-serif", letterSpacing: "0.02em" }}>{t}</p>
                    <p style={{ fontSize: 13.5, color: "#a5b4fc", marginTop: 2 }}>{q}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <p className="text-center mt-11" style={{ fontSize: "clamp(1.15rem,2.6vw,1.5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.4, fontFamily: "'Poppins',sans-serif" }}>
              Your 14-Day AI at Work journey starts at <span style={{ color: "#a5b4fc" }}>Level 1</span> — and shows you what&apos;s possible next.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ 13. DAILY PRACTICE / GAMIFICATION ════════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-4">
            <Label>Don&apos;t just attend</Label>
            <h2 className="aiw-h2 mt-3">Build Your AI-at-Work Streak <span style={{ color: "#f97316" }}>🔥</span></h2>
          </Reveal>
          <Reveal className="mb-9">
            <p className="text-center" style={{ fontSize: 16.5, color: "#64748b", maxWidth: 560, margin: "0 auto" }}>
              After every session, one simple question: <strong style={{ color: "#0f172a" }}>Did you use today&apos;s skill?</strong>
            </p>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-4 mb-9">
            <span className="inline-flex items-center gap-2 rounded-full px-6 py-3" style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", fontSize: 16, fontWeight: 800, color: "#15803d" }}>✅ USED IT</span>
            <span className="inline-flex items-center gap-2 rounded-full px-6 py-3" style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", fontSize: 16, fontWeight: 800, color: "#64748b" }}>🔖 TRY LATER</span>
          </div>
          <Reveal delay={80}>
            <div className="rounded-3xl p-7" style={{ background: "linear-gradient(135deg,#1e1b4b,#111827)" }}>
              <p style={{ fontSize: 12, fontWeight: 800, color: "#a5b4fc", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16, textAlign: "center" }}>Your AI-at-Work Progress</p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { k: "Days Completed", v: "8/14" },
                  { k: "Skills Applied", v: "6" },
                  { k: "Current Streak", v: "🔥 4" },
                ].map(({ k, v }) => (
                  <div key={k} className="rounded-2xl py-5 text-center" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(165,180,252,0.2)" }}>
                    <p style={{ fontSize: 26, fontWeight: 900, color: "#fff", fontFamily: "'Poppins',sans-serif" }}>{v}</p>
                    <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 4, fontWeight: 600 }}>{k}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="text-center mt-9">
              <p style={{ fontSize: 17, color: "#64748b" }}>The goal isn&apos;t to watch 14 sessions.</p>
              <p style={{ fontSize: "clamp(1.3rem,3vw,1.75rem)", fontWeight: 900, marginTop: 6, fontFamily: "'Poppins',sans-serif" }} className="grad">The goal is to USE AI 14 different ways.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 14. COMMUNITY ════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "#f8fafc" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-10">
            <Label>You&apos;re not learning alone</Label>
            <h2 className="aiw-h2 mt-3">See How Other Professionals Are<br className="hidden sm:block" /> <span className="grad">Using AI At Work.</span></h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { q: "Used today's email workflow for a difficult client reply.", n: "Priya", r: "HR Manager" },
              { q: "Used AI to summarize a 30-page document.", n: "Aditya", r: "IT Lead" },
              { q: "Built my presentation outline during today's session.", n: "Sneha", r: "Marketing" },
              { q: "Tried the Excel workflow on my monthly report.", n: "Vikram", r: "Finance" },
            ].map(({ q, n, r }, i) => (
              <Reveal key={i} delay={(i % 2) * 60}>
                <div className="rounded-2xl p-5 h-full flex flex-col" style={{ background: "#fff", border: "1.5px solid #e2e8f0" }}>
                  <p style={{ fontSize: 15.5, color: "#0f172a", fontWeight: 600, lineHeight: 1.55, flex: 1 }}>&ldquo;{q}&rdquo;</p>
                  <div className="flex items-center gap-2.5 mt-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ background: `hsl(${(n.charCodeAt(0) * 37) % 360},55%,48%)` }}>{n[0]}</div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", lineHeight: 1.1 }}>{n}</p>
                      <p style={{ fontSize: 11.5, color: "#94a3b8", lineHeight: 1.1, marginTop: 1 }}>{r}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <div className="text-center mt-10">
              <p style={{ fontSize: "clamp(1.3rem,3vw,1.8rem)", fontWeight: 900, color: "#0f172a", fontFamily: "'Poppins',sans-serif" }}>One Skill. Hundreds Of Different Applications.</p>
              <p className="mt-4 inline-block rounded-full px-5 py-2.5" style={{ background: "#eef2ff", color: "#4338ca", fontSize: 15, fontWeight: 800 }}>The community question is always: How Did You Use AI Today?</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 15. SUNDAY DEEP-DIVE ═════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "#0f172a" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-10">
            <Label dark>And every Sunday…</Label>
            <h2 className="aiw-h2 mt-3" style={{ color: "#fff" }}>AI AT WORK <span style={{ color: "#a5b4fc" }}>DEEP DIVE™</span></h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.72)", maxWidth: 620, margin: "12px auto 0" }}>
              A longer <strong style={{ color: "#fff" }}>60-minute LIVE session</strong> where we explore one major workplace-AI topic in depth.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "How AI Is Changing The Way We Work",
              "How To Become AI-Ready Without Becoming Technical",
              "From AI User To AI Power User",
              "AI Agents: What They Actually Mean For Your Career",
              "What Should You Automate — And What Stays Human?",
            ].map((t, i) => (
              <Reveal key={t} delay={(i % 3) * 60}>
                <div className="rounded-2xl p-5 h-full flex items-center gap-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(165,180,252,0.22)" }}>
                  <span style={{ fontSize: 22 }}>🎓</span>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.35 }}>{t}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={120}>
              <div className="rounded-2xl p-5 h-full flex flex-col justify-center" style={{ background: "linear-gradient(135deg,#4338ca,#6366f1)" }}>
                <p style={{ fontSize: 14, fontWeight: 800, color: "#fff", lineHeight: 1.45 }}>Daily sessions teach you WHAT to use. Sunday sessions show WHERE it&apos;s all going.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 16. WHY NOW ══════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <Reveal>
            <Label>Why now</Label>
            <h2 className="aiw-h2 mt-3">AI Skills Are Quickly Becoming <span className="grad">Work Skills.</span></h2>
            <p style={{ fontSize: 17, color: "#475569", maxWidth: 620, margin: "16px auto 0", lineHeight: 1.65 }}>
              AI and automation are increasingly appearing among the fastest-growing workplace skill areas, including in India.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="rounded-2xl px-6 py-8 mt-9" style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0" }}>
              <p style={{ fontSize: 15.5, color: "#64748b", fontWeight: 600 }}>The question is moving from</p>
              <p style={{ fontSize: 18, color: "#94a3b8", fontWeight: 700, textDecoration: "line-through", margin: "6px 0 12px" }}>&ldquo;Should I learn AI?&rdquo;</p>
              <p style={{ fontSize: "clamp(1.2rem,3vw,1.65rem)", fontWeight: 900, lineHeight: 1.35, fontFamily: "'Poppins',sans-serif" }} className="grad">&ldquo;How do I use AI well in the work I already do?&rdquo;</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 17. WHAT YOU GET FREE ════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "#f8fafc" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-10">
            <Label>Everything included</Label>
            <h2 className="aiw-h2 mt-3">Your 14-Day <span className="grad">AI at Work™ Experience</span></h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "⚡", t: "14 Daily LIVE Sessions" },
              { icon: "💼", t: "14 Workplace AI Skills" },
              { icon: "🛠️", t: "Hands-On Learn → Do → Apply Method" },
              { icon: "📲", t: "Daily WhatsApp Updates" },
              { icon: "🔥", t: "AI-at-Work Streak Tracking" },
              { icon: "👥", t: "Professional Learning Community" },
              { icon: "🎯", t: "Practical Daily Application" },
              { icon: "🧠", t: "Sunday AI Deep-Dive Sessions" },
              { icon: "🤖", t: "Introduction To Automation & Agents" },
            ].map(({ icon, t }, i) => (
              <Reveal key={t} delay={(i % 3) * 55}>
                <div className="rounded-2xl p-5 h-full flex items-center gap-3" style={{ background: "#fff", border: "1.5px solid #e2e8f0" }}>
                  <span style={{ fontSize: 24 }}>{icon}</span>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", lineHeight: 1.35 }}>{t}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <div className="text-center mt-10">
              <p style={{ fontSize: 15, color: "#64748b", fontWeight: 600 }}>Real value <span style={{ textDecoration: "line-through" }}>{SERIES.price}</span> —</p>
              <p style={{ fontSize: "clamp(3rem,10vw,5rem)", fontWeight: 900, lineHeight: 1, fontFamily: "'Poppins',sans-serif", margin: "6px 0" }} className="grad">₹0</p>
              <p style={{ fontSize: 15, fontWeight: 800, color: "#4338ca", letterSpacing: "0.06em", textTransform: "uppercase" }}>Completely Free</p>
              <div className="flex justify-center mt-8"><CTA label="Start My 14 Days" sub="Free · No coding required" /></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 18. ABOUT THE CREATOR ════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "#fff" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-9">
            <Label>👋 From the creator</Label>
            <h2 className="aiw-h2 mt-3">Why I Built <span className="grad">AI at Work™</span></h2>
          </Reveal>
          <Reveal delay={60}>
            <div className="space-y-4" style={{ fontSize: 16.5, color: "#475569", lineHeight: 1.75 }}>
              <p>The problem isn&apos;t access to AI information anymore. There are thousands of videos, courses, newsletters and tools.</p>
              <p>The problem I kept seeing was different:</p>
              <div className="my-5 pl-5 py-2" style={{ borderLeft: "4px solid #6366f1" }}>
                <p style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", fontStyle: "italic", lineHeight: 1.6 }}>
                  People were learning ABOUT AI without making AI part of the way they actually worked.
                </p>
              </div>
              <p>That&apos;s why I built AI at Work™. Not another giant course library — a simple daily system where we:</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              {["Learn one useful thing.", "Do it together.", "Apply it to real work.", "Come back tomorrow."].map((t, i) => (
                <div key={t} className="rounded-2xl p-4 text-center" style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0" }}>
                  <p style={{ fontSize: 18, fontWeight: 900, color: "#4338ca", fontFamily: "'Poppins',sans-serif" }}>{i + 1}</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginTop: 4, lineHeight: 1.35 }}>{t}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 19. FAQ ══════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background: "#f8fafc" }}>
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-9">
            <Label>Questions &amp; answers</Label>
            <h2 className="aiw-h2 mt-3">Frequently asked questions</h2>
          </div>
          <div className="flex flex-col gap-2.5">
            {[
              { q: "Is this really free?", a: "Yes. The 14-Day AI at Work™ LIVE Series is free to join." },
              { q: "How long is each session?", a: "Approximately 15 minutes." },
              { q: "Do I need to attend every day?", a: "You'll get the most value by attending consistently, but the goal is practical application rather than perfect attendance." },
              { q: "Do I need AI experience?", a: "No. The series starts from practical everyday usage and gradually introduces more advanced concepts." },
              { q: "Do I need coding knowledge?", a: "No coding knowledge is required for the free 14-day series." },
              { q: "Which AI tools will you use?", a: "Different tools may be used depending on the day's workflow. The focus is on solving work problems rather than promoting one specific tool." },
              { q: "Is this another ChatGPT course?", a: "No. ChatGPT may be one of the tools used, but the series focuses on applying AI across real workplace tasks." },
              { q: "Will I learn AI agents?", a: "You'll be introduced to automation and AI agents toward the end of the series. Deeper agent-building is a separate advanced learning path." },
              { q: "Who should join?", a: "Working professionals who want to understand and practically use AI in their everyday work." },
            ].map(({ q, a }) => <FAQ key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* ══ 20. FINAL CTA ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 lg:py-24" style={{ background: "#0f172a" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(99,102,241,0.18),transparent 70%)" }} />
        <div className="max-w-xl mx-auto px-6 text-center relative">
          <p className="aiw-label mb-3" style={{ color: "#a5b4fc" }}>Your work is already changing</p>
          <h2 className="aiw-h1 mb-4" style={{ color: "#fff" }}>
            The Question Is Whether<br />
            <span style={{ color: "#a5b4fc" }}>You&apos;re Changing With It.</span>
          </h2>
          <p style={{ fontSize: 17, color: "#94a3b8", lineHeight: 1.6, marginBottom: 8 }}>
            Don&apos;t spend the next 14 days watching more AI reels.
          </p>
          <p style={{ fontSize: 19, color: "#fff", fontWeight: 800, marginBottom: 22 }}>
            Spend Them <span style={{ color: "#a5b4fc" }}>Using AI At Work.</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
            {["🗓 14 Days", "⚡ 15 Minutes LIVE", "🛠️ 14 Practical AI Skills", "🎁 100% FREE"].map(t => (
              <span key={t} className="rounded-full px-4 py-2" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(165,180,252,0.28)", fontSize: 14, fontWeight: 800, color: "#fff" }}>{t}</span>
            ))}
          </div>
          <CTA big label="Join AI at Work™ Free" sub="Built for Working Professionals • No Coding Required" />
        </div>
      </section>

      <footer className="px-5 py-6 text-center" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p style={{ fontSize: 13, color: "#64748b", marginBottom: 8, fontWeight: 600 }}>Stop Learning AI. Start Using It At Work.</p>
        <p style={{ fontSize: 12, color: "#52525b" }}>
          © {new Date().getFullYear()} High Performance Club ·{" "}
          <a href="https://www.highperformanceclub.co" className="underline" style={{ color: "#64748b" }}>highperformanceclub.co</a>
        </p>
        <p style={{ fontSize: 12, color: "#52525b", marginTop: 4 }}>Free live series · Practical AI education · Built for working professionals</p>
      </footer>

      <StickyBottomCTA />
      <LiveToast />
      <RegisterNudge />
      <RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
    </RegisterCtx.Provider>
  );
}
