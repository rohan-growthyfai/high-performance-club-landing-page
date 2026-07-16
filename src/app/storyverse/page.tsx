"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import StoryVerseCheckout from "./components/StoryVerseCheckout";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    openSVCheckout?: () => void;
  }
}

// ─── Cover art from the real, generated StoryVerse library (no stock photos) ──
const COVERS = {
  lion: "https://www.highperformanceclub.co/api/file/sv-art-sv-w1-lion-roar-cover-1783778308994.png",
  mango: "https://www.highperformanceclub.co/api/file/sv-art-sv-w2-bodhi-share-cover-1783778447864.png",
  why: "https://www.highperformanceclub.co/api/file/sv-art-sv-w3-rumi-why-cover-1783778695195.png",
  shivaji: "https://www.highperformanceclub.co/api/file/sv-art-sv-w4-shivaji-cover-1783778636598.png",
  cloud: "https://www.highperformanceclub.co/api/file/sv-art-sv-w2-rain-friend-cover-1783778498733.png",
  fly: "https://www.highperformanceclub.co/api/file/sv-art-sv-w3-invention-cover-1783778586173.png",
};

function Star() {
  return <svg width="13" height="13" viewBox="0 0 20 20" fill="#f59e0b" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
}
function WAIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#25d366" />
      <path d="M22.94 9.06A9.75 9.75 0 0 0 16 6.25C10.89 6.25 6.75 10.39 6.75 15.5c0 1.63.43 3.21 1.24 4.62L6.6 25.4l5.42-1.42a9.75 9.75 0 0 0 4.97 1.37c5.11 0 9.25-4.14 9.25-9.25a9.2 9.2 0 0 0-3.3-7.04Zm-6.94 14.2a8.1 8.1 0 0 1-4.12-1.12l-.3-.17-3.06.8.82-2.98-.2-.31A8.1 8.1 0 0 1 7.9 15.5c0-4.47 3.63-8.1 8.1-8.1a8.1 8.1 0 0 1 8.1 8.1c0 4.47-3.63 8.1-8.1 8.1Zm4.44-6.07c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06a6.57 6.57 0 0 1-1.93-1.19 7.24 7.24 0 0 1-1.34-1.66c-.14-.24-.01-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" fill="#fff" />
    </svg>
  );
}

function CTA({ label, sub, onClick }: { label: string; sub?: string; onClick: () => void }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => { window.fbq?.("track", "InitiateCheckout", { value: 99, currency: "INR", content_name: "StoryVerse" }); onClick(); }}
        className="btn-primary inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-black text-white"
        style={{ fontSize: 18, boxShadow: "0 8px 28px rgba(232,169,75,0.42)", letterSpacing: "-0.01em", border: "none", cursor: "pointer", background: "linear-gradient(135deg,#e8a94b,#f4b860)" }}>
        <WAIcon size={20} />{label}
      </button>
      {sub && <p style={{ fontSize: 13, color: "#71717a", textAlign: "center" }}>{sub}</p>}
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="duc-glow-card rounded-xl overflow-hidden border" style={{ borderColor: "#e9dcc5" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left font-semibold bg-white hover:bg-stone-50 transition-colors" style={{ color: "#3a2f4a", fontSize: 14 }}>
        {q}
        <span className="shrink-0 text-xl font-light" style={{ color: "#e8a94b", display: "inline-block", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
      </button>
      {open && <div className="px-5 pb-5 leading-relaxed bg-white" style={{ fontSize: 13, color: "#71717a" }}>{a}</div>}
    </div>
  );
}

// ─── Sticky bottom CTA ────────────────────────────────────────────────────────
function StickyBottomCTA({ onOpen }: { onOpen: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const f = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", f, { passive: true }); f();
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div className={`fixed bottom-0 inset-x-0 z-50 transition-all duration-300 ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}>
      <div className="px-4 pb-3 pt-2 md:hidden" style={{ background: "linear-gradient(to top,#fff7ec 70%,transparent)", backdropFilter: "blur(8px)" }}>
        <button onClick={onOpen} className="w-full flex items-center justify-between gap-3 rounded-2xl px-5 py-3" style={{ background: "linear-gradient(135deg,#e8a94b,#f4b860)", boxShadow: "0 4px 20px rgba(232,169,75,0.4)", border: "none", cursor: "pointer" }}>
          <div className="text-left"><p className="text-white font-black text-sm leading-tight">Start StoryVerse — ₹99/mo →</p><p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.85)" }}>1 story every night · Cancel anytime</p></div>
          <div className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}><WAIcon size={15} /><span className="text-white font-bold text-sm">Join</span></div>
        </button>
      </div>
      <div className="hidden md:block px-6 pb-4 pt-3" style={{ background: "linear-gradient(to top,#fff7ec 70%,transparent)", backdropFilter: "blur(8px)" }}>
        <div className="max-w-lg mx-auto">
          <button onClick={onOpen} className="w-full flex items-center justify-between gap-4 rounded-2xl px-6 py-3.5" style={{ background: "linear-gradient(135deg,#e8a94b,#f4b860)", boxShadow: "0 4px 20px rgba(232,169,75,0.4)", border: "none", cursor: "pointer" }}>
            <div className="text-left"><p className="text-white font-black text-sm leading-tight">Give Your Child StoryVerse — ₹99/month →</p><p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.85)" }}>1 personalized bedtime story every night · Cancel anytime</p></div>
            <div className="flex items-center gap-2 rounded-xl px-4 py-2 shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}><WAIcon size={16} /><span className="text-white font-bold text-sm">Join Now</span></div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Ambient join activity (generic, non-attributed — no fabricated reviews) ──
const CITIES = ["Delhi", "Mumbai", "Bengaluru", "Pune", "Hyderabad", "Chennai", "Jaipur", "Ahmedabad", "Kolkata", "Surat", "Lucknow", "Indore", "Kochi", "Bhopal", "Nagpur"];
let _tid = 0;
function tAgo() { const r = Math.random(); return r < 0.3 ? `${Math.floor(r * 150 + 10)}s ago` : r < 0.6 ? "just now" : `${Math.floor(r * 5 + 1)} min ago`; }
function LiveToast() {
  interface T { id: number; city: string; time: string }
  const [toasts, setToasts] = useState<T[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const used = useRef<Set<number>>(new Set());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => { const f = () => { if (window.scrollY > 300) setScrolled(true); }; window.addEventListener("scroll", f, { passive: true }); f(); return () => window.removeEventListener("scroll", f); }, []);
  useEffect(() => {
    if (!scrolled) return;
    const spawn = () => {
      let idx: number; do { idx = Math.floor(Math.random() * CITIES.length); } while (used.current.has(idx));
      used.current.add(idx); if (used.current.size > 5) { const f = used.current.values().next().value as number; used.current.delete(f); }
      const id = ++_tid;
      setToasts(prev => [{ id, city: CITIES[idx], time: tAgo() }, ...prev].slice(0, 3));
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
      timer.current = setTimeout(spawn, 8000 + Math.random() * 12000);
    };
    timer.current = setTimeout(spawn, 4000 + Math.random() * 3000);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [scrolled]);
  if (!scrolled || toasts.length === 0) return null;
  return (
    <div className="fixed left-2 z-40 flex flex-col gap-2 pointer-events-none bottom-[100px] md:bottom-[90px]" aria-live="polite">
      {toasts.map((t, i) => (
        <div key={t.id} className="pointer-events-auto" style={{ opacity: i === 0 ? 1 : 0.65 - i * 0.15, transform: `scale(${1 - i * 0.03})`, transformOrigin: "bottom left", animation: "sv-fadein 0.3s ease" }}>
          <div className="flex items-center gap-2 rounded-2xl px-3 py-2 w-[230px]" style={{ background: "#fff", border: "1px solid #e9dcc5", boxShadow: "0 4px 16px rgba(0,0,0,0.09)" }}>
            <span style={{ fontSize: 18 }}>🌙</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold leading-snug truncate" style={{ fontSize: 11, color: "#3a2f4a" }}>A parent in {t.city}</p>
              <p className="leading-snug mt-0.5" style={{ fontSize: 10, color: "#71717a" }}>started StoryVerse · {t.time}</p>
            </div>
            <span className="relative flex w-2 h-2 shrink-0"><span className="absolute inline-flex w-full h-full rounded-full animate-ping opacity-75" style={{ background: "#e8a94b" }} /><span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: "#e8a94b" }} /></span>
          </div>
        </div>
      ))}
    </div>
  );
}

function useMetaPixelViewContent() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "ViewContent", { content_name: "StoryVerse", content_category: "Kids WhatsApp Bedtime Stories", value: 99, currency: "INR" });
    }
  }, []);
}

const THEMES = [
  { emoji: "🦁", title: "Courage", desc: "Being brave, finding their voice" },
  { emoji: "💛", title: "Kindness", desc: "Sharing, empathy, helping others" },
  { emoji: "🔭", title: "Curiosity", desc: "Asking why, loving to learn" },
  { emoji: "⚔️", title: "Little Warriors", desc: "Real heroes like young Shivaji" },
  { emoji: "🎨", title: "Imagination", desc: "Creativity, inventing, dreaming big" },
  { emoji: "🌙", title: "Calm & Gratitude", desc: "Thankfulness, peace, wonder" },
];

const GAINS = [
  { icon: "💪", title: "More confident", body: "Every night your child is the one who is brave, who solves the problem, who saves the day. That feeling doesn't stay in the story — it comes with them into real life." },
  { icon: "🧭", title: "Stronger values", body: "Kindness, honesty, courage and fairness — shown through a story, not a lecture. Children absorb values through the heroes they admire, not through being told what's right." },
  { icon: "🧠", title: "More knowledgeable", body: "Real history, real heroes, real ideas — woven gently into age-appropriate adventures. Your child learns without ever feeling like they're being taught." },
  { icon: "🌟", title: "A better version of themselves", body: "Every story ends with one warm question for you to ask your child — turning a screen habit into a nightly conversation that builds who they're becoming." },
];

export default function StoryVersePage() {
  useMetaPixelViewContent();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const openCheckout = useCallback(() => setCheckoutOpen(true), []);
  const closeCheckout = useCallback(() => setCheckoutOpen(false), []);

  useEffect(() => {
    window.openSVCheckout = openCheckout;
    return () => { delete window.openSVCheckout; };
  }, [openCheckout]);

  return (
    <div style={{ background: "#fff7ec", minHeight: "100vh", color: "#3a2f4a", fontSize: 15 }}>
      <StoryVerseCheckout isOpen={checkoutOpen} onClose={closeCheckout} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800;900&family=Quicksand:wght@400;500;600;700&display=swap');
        @keyframes sv-fadein{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .sv-font{font-family:'Quicksand',sans-serif}
        .sv-h1{font-family:'Baloo 2',sans-serif;font-size:clamp(2.1rem,5vw,3.2rem);font-weight:900;line-height:1.12;letter-spacing:-0.02em}
        .sv-h2{font-family:'Baloo 2',sans-serif;font-size:clamp(1.6rem,3.5vw,2.4rem);font-weight:800;line-height:1.18;letter-spacing:-0.015em}
        .sv-body{font-size:clamp(1rem,1.8vw,1.0625rem);line-height:1.75;color:#5c5068}
        .sv-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:#e8a94b}
        .sv-glow-card{box-shadow:0 4px 24px rgba(232,169,75,0.1),0 1px 3px rgba(0,0,0,0.06);transition:box-shadow 0.2s,transform 0.2s}
        .sv-glow-card:hover{box-shadow:0 8px 32px rgba(232,169,75,0.16),0 2px 8px rgba(0,0,0,0.08);transform:translateY(-2px)}
        .sv-section-title{background:linear-gradient(135deg,#3a2f4a 0%,#6b5f78 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
      `}</style>

      {/* ══ ANNOUNCEMENT BAR ══════════════════════════════════════════════════ */}
      <div style={{ background: "linear-gradient(90deg,#e8a94b 0%,#f4b860 50%,#e8a94b 100%)", padding: "10px 16px" }}>
        <p className="text-center font-semibold text-white sv-font" style={{ fontSize: 13, letterSpacing: "0.01em", lineHeight: 1.4 }}>
          ✦ One magical bedtime story every night — where YOUR child is the hero — on WhatsApp ✦
        </p>
      </div>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ borderBottom: "1px solid #f0e4d0", background: "radial-gradient(1100px 500px at 85% -10%, rgba(255,207,135,.5), transparent 60%), radial-gradient(800px 550px at -10% 100%, rgba(205,180,240,.4), transparent 60%), linear-gradient(160deg,#fff8ef 0%,#fdf3ff 100%)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 sv-font" style={{ fontSize: 13, fontWeight: 700, background: "#fff", border: "1.5px solid #f0dcb8", color: "#92660f" }}>
                <span className="w-2 h-2 rounded-full inline-block animate-pulse" style={{ background: "#e8a94b" }} />
                For parents who want their child&apos;s screen time to actually mean something
              </div>

              <h1 className="sv-h1" style={{ color: "#3a2f4a" }}>
                What if your child&apos;s<br />
                phone time made them<br />
                <span style={{ color: "#e8a94b" }}>braver, kinder &amp; smarter?</span>
              </h1>

              <p className="sv-body mt-6 max-w-lg mx-auto lg:mx-0">
                Every night, <b style={{ color: "#3a2f4a", fontWeight: 800 }}>StoryVerse</b> sends your child a brand-new, beautifully illustrated bedtime story on WhatsApp — where <b style={{ color: "#3a2f4a" }}>they are the hero</b>. Each adventure quietly builds confidence, values, and knowledge, so instead of dreading their screen time, you&apos;ll finally feel good about it.
              </p>

              <div className="mt-8 flex flex-col items-center lg:items-start gap-3">
                <CTA label="Start Tonight — ₹99/month" sub="1 story every night · Cancel anytime · No hidden charges" onClick={openCheckout} />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative max-w-xs mx-auto">
                <div className="rounded-[32px] overflow-hidden border-8 border-white shadow-2xl" style={{ boxShadow: "0 30px 60px -12px rgba(58,47,74,0.35)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={COVERS.lion} alt="A real StoryVerse bedtime story — the child is the hero" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-5 -left-5 sm:-left-8 bg-white rounded-2xl px-4 py-3 shadow-xl" style={{ border: "1px solid #f0e4d0" }}>
                  <p className="sv-font font-black" style={{ fontSize: 13, color: "#3a2f4a" }}>🌙 Tonight&apos;s story for <span style={{ color: "#e8a94b" }}>Aarav</span></p>
                  <p className="sv-font" style={{ fontSize: 11, color: "#8a7d97" }}>Real StoryVerse illustration — not stock art</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ THE REFRAME ═══════════════════════════════════════════════════════ */}
      <section className="bg-section-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <p className="sv-label mb-3">Let&apos;s be honest</p>
          <h2 className="sv-h2 sv-section-title mb-6">You can&apos;t win the fight against the phone.</h2>
          <p className="sv-body max-w-2xl mx-auto mb-4">
            Kids today reach for a screen the moment they&apos;re bored — and taking it away every time just isn&apos;t realistic anymore. But what if, instead of fighting that habit, you made it work <i>for</i> your child?
          </p>
          <p className="sv-body max-w-2xl mx-auto font-semibold" style={{ color: "#3a2f4a" }}>
            StoryVerse turns 5 minutes of screen time into something you&apos;re actually proud of — a nightly story where your child learns to be brave, kind and curious, with themselves as the hero.
          </p>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══════════════════════════════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="sv-label mb-3">How it works</p>
            <h2 className="sv-h2 sv-section-title">Three simple things happen every night</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: "🌙", title: "A message arrives at bedtime", body: "Your WhatsApp gets tonight's story title and the secret lesson it teaches — no app to download, no searching required." },
              { emoji: "📖", title: "A personalized story magazine", body: "A beautifully illustrated PDF where your child's own name is woven into the adventure — they are the hero of every page." },
              { emoji: "💬", title: "One bedtime question", body: "Every story ends with a simple question for you to ask your child — turning a nightly habit into a real conversation." },
            ].map((s) => (
              <div key={s.title} className="sv-glow-card rounded-2xl p-7 bg-white text-center" style={{ border: "1px solid #f0e4d0" }}>
                <div style={{ fontSize: 40 }}>{s.emoji}</div>
                <p className="sv-font font-black mt-3 mb-2" style={{ fontSize: 19, color: "#3a2f4a" }}>{s.title}</p>
                <p style={{ fontSize: 14.5, color: "#6b5f78", lineHeight: 1.65 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SAMPLE STORIES SHOWCASE (real generated art) ═════════════════════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="sv-label mb-3">A peek inside</p>
            <h2 className="sv-h2 sv-section-title mb-3">Real stories from the StoryVerse library</h2>
            <p className="sv-body max-w-xl mx-auto">Every illustration below is real StoryVerse art — the same magical, consistent world your child will explore every night.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {[
              { img: COVERS.lion, title: "The Lion Who Forgot to Roar", theme: "🦁 Courage" },
              { img: COVERS.mango, title: "Bodhi's Last Mango", theme: "💛 Kindness" },
              { img: COVERS.why, title: "The Hundred Whys", theme: "🔭 Curiosity" },
              { img: COVERS.shivaji, title: "Meets the Brave Young Shivaji", theme: "⚔️ Little Warriors" },
              { img: COVERS.cloud, title: "The Lonely Little Cloud", theme: "💛 Kindness" },
              { img: COVERS.fly, title: "The Wobbly Flying Machine", theme: "🔭 Curiosity" },
            ].map((s) => (
              <div key={s.title} className="sv-glow-card rounded-2xl overflow-hidden bg-white" style={{ border: "1px solid #f0e4d0" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={s.title} className="w-full aspect-square object-cover" />
                <div className="p-3">
                  <p className="sv-font" style={{ fontSize: 10.5, fontWeight: 700, color: "#e8a94b", textTransform: "uppercase", letterSpacing: "0.04em" }}>{s.theme}</p>
                  <p className="sv-font font-bold mt-1" style={{ fontSize: 13, color: "#3a2f4a", lineHeight: 1.3 }}>&ldquo;[Your child] and {s.title}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHAT YOUR CHILD GAINS ═════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg,#2d2438 0%,#3a2f4a 50%,#2d2438 100%)" }} className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="sv-label mb-3">What actually changes</p>
            <h2 className="sv-h2" style={{ color: "#fff" }}>This isn&apos;t just a story. It&apos;s who they&apos;re becoming.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {GAINS.map((g) => (
              <div key={g.title} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(232,169,75,0.25)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(232,169,75,0.15)", fontSize: 20 }}>{g.icon}</div>
                  <p className="sv-font font-black" style={{ fontSize: 18, color: "#fff" }}>{g.title}</p>
                </div>
                <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>{g.body}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <CTA label="Give Your Child This — ₹99/month" sub="Cancel anytime · No hidden charges" onClick={openCheckout} />
          </div>
        </div>
      </section>

      {/* ══ THEMES ════════════════════════════════════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="sv-label mb-3">A whole universe of learning</p>
            <h2 className="sv-h2 sv-section-title mb-3">Every week has a gentle theme</h2>
            <p className="sv-body max-w-xl mx-auto">Your child grows through a rotating world of lessons — never repetitive, always building on the last.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {THEMES.map((t) => (
              <div key={t.title} className="sv-glow-card flex items-center gap-4 bg-white rounded-2xl p-5" style={{ border: "1px solid #f0e4d0" }}>
                <span style={{ fontSize: 32 }}>{t.emoji}</span>
                <div>
                  <p className="sv-font font-black" style={{ fontSize: 17, color: "#3a2f4a" }}>Week of {t.title}</p>
                  <p style={{ fontSize: 13.5, color: "#6b5f78" }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHO THIS IS FOR ═══════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg,#2d2438 0%,#3a2f4a 50%,#2d2438 100%)" }} className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="sv-label mb-3">Who this is for</p>
            <h2 className="sv-h2" style={{ color: "#fff" }}>This is built for you if…</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Your child already has access to a phone, tablet, or laptop.",
              "You feel guilty about how much time they spend scrolling.",
              "You want them to read, and old-fashioned books feel like a losing battle.",
              "You want them to be more confident, kind, and curious — not just entertained.",
              "You'd love a screen-time habit you don't have to feel bad about.",
              "You want a simple bedtime ritual that doesn't need you to do any extra work.",
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-4 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(232,169,75,0.2)" }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg,#e8a94b,#f4b860)", fontSize: 14, color: "#fff", fontWeight: 900 }}>✓</div>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.88)", lineHeight: 1.65, fontWeight: 500 }}>{point}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <CTA label="Yes, This Is For My Child →" sub="₹99/month · Cancel anytime" onClick={openCheckout} />
          </div>
        </div>
      </section>

      {/* ══ FOUNDER STORY ═════════════════════════════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-4">
              <div className="relative max-w-xs mx-auto lg:mx-0">
                <div className="polaroid tilt-left">
                  <div className="aspect-square rounded-sm overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/rohan.png" alt="Rohan — Founder" className="w-full h-full object-cover object-top" />
                  </div>
                  <p className="text-center font-serif text-xl italic mt-3" style={{ color: "#3a2f4a" }}>Rohan</p>
                  <p className="text-center mt-0.5" style={{ fontSize: 12, color: "#8a7d97" }}>Founder, StoryVerse</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <p className="sv-label mb-3">👋 The founder</p>
              <h2 className="sv-h2 mb-5" style={{ color: "#3a2f4a" }}>
                I&apos;m not against screens.<br />
                <span style={{ fontStyle: "italic", fontWeight: 400, color: "#8a7d97" }}>I just wanted them to mean something.</span>
              </h2>
              <div className="space-y-4 sv-body">
                <p>I kept trying to take the phone away, and it kept turning into a fight. The truth is — I was never going to win that fight. No parent really does, not for long.</p>
                <p>So I flipped the question. Instead of <i>&ldquo;how do I stop this?&rdquo;</i>, I asked <i>&ldquo;what if this time actually built something?&rdquo;</i></p>
              </div>
              <div className="my-5 pl-4 py-1" style={{ borderLeft: "3px solid #e8a94b" }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#3a2f4a", fontStyle: "italic", lineHeight: 1.65 }}>
                  &ldquo;Children don&apos;t learn values from being told what&apos;s right — they learn them from the heroes they fall in love with. So I built a world where the hero of every story is their own child.&rdquo;
                </p>
              </div>
              <p className="sv-body">That&apos;s StoryVerse — one personalized, illustrated bedtime story every night, where your child learns courage, kindness and curiosity by living it, not hearing a lecture about it.</p>
              <div className="mt-5 flex items-center gap-3">
                <p className="font-serif italic text-xl" style={{ color: "#e8a94b" }}>— Rohan</p>
                <span className="w-8 h-px" style={{ background: "#e2dfd6" }} />
                <p style={{ fontSize: 13, color: "#71717a" }}>Founder, StoryVerse</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ OBJECTIONS ════════════════════════════════════════════════════════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="sv-label mb-3">Why you might be hesitating</p>
            <h2 className="sv-h2 sv-section-title mb-3">3 thoughts worth answering honestly</h2>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { belief: "\"My child won't want to read a story.\"", truth: "They're not reading a textbook — they're the hero of an adventure with talking fireflies, a lioness who lost her roar, and a mango that has to be shared with the whole valley. It's built to be irresistible to a 3-8 year old, not virtuous homework.", icon: "📖" },
              { belief: "\"Isn't this just more screen time?\"", truth: "Your child is already going to reach for a screen tonight — that part isn't changing. What changes is what happens on it: 5 minutes of a values-driven, personalized story instead of an algorithm feeding them whatever keeps them scrolling longest.", icon: "📱" },
              { belief: "\"Will this actually teach anything, or just entertain?\"", truth: "Every single story is built around one theme — courage, kindness, curiosity — and ends with a real bedtime question for you to ask your child. The lesson is never lectured. It's lived through the story, then talked about with you.", icon: "🎯" },
            ].map(({ belief, truth, icon }) => (
              <div key={belief} className="sv-glow-card rounded-xl overflow-hidden" style={{ border: "1px solid #f0e4d0" }}>
                <div className="flex items-start gap-3 px-5 py-4" style={{ background: "#fff9f0", borderBottom: "1px solid #f0dcb8" }}>
                  <span style={{ fontSize: 20 }} className="shrink-0">{icon}</span>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#92660f", lineHeight: 1.4 }}>{belief}</p>
                </div>
                <div className="flex items-start gap-3 px-5 py-4 bg-white">
                  <span style={{ fontSize: 18 }} className="shrink-0">✅</span>
                  <p className="sv-body">{truth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING / VALUE ═══════════════════════════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: "linear-gradient(145deg,#2d2438 0%,#251d30 50%,#1c1624 100%)", border: "1px solid rgba(232,169,75,0.25)" }}>
            <div className="text-center px-6 pt-8 pb-4">
              <p className="sv-label mb-2">Everything included</p>
              <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", fontFamily: "'Baloo 2'" }}>One StoryVerse membership</h2>
            </div>
            <div className="px-5 sm:px-8">
              {[
                { emoji: "📖", name: "A brand-new illustrated story, every night" },
                { emoji: "🦸", name: "Your child is the hero — name in every adventure" },
                { emoji: "🎨", name: "Original, consistent, beautiful artwork" },
                { emoji: "🧭", name: "6 rotating themes: courage, kindness, curiosity & more" },
                { emoji: "⚔️", name: "Real hero stories — young Shivaji and more" },
                { emoji: "💬", name: "A bedtime question to ask your child, every night" },
                { emoji: "🏆", name: "A growing personal story collection for your child" },
                { emoji: "📲", name: "Delivered straight to WhatsApp — no new app" },
              ].map(it => (
                <div key={it.name} className="flex items-center gap-3 py-3.5" style={{ borderTop: "1px solid rgba(232,169,75,0.12)", borderLeft: "2px solid rgba(232,169,75,0.3)", paddingLeft: 10, marginBottom: 2 }}>
                  <span style={{ fontSize: 22 }} className="shrink-0">{it.emoji}</span>
                  <span style={{ fontSize: 14.5, fontWeight: 700, color: "#f6ead1" }}>{it.name}</span>
                </div>
              ))}
            </div>
            <div className="text-center px-5 sm:px-8 pt-7 pb-8">
              <p className="font-black leading-none mb-1" style={{ fontSize: "clamp(4rem,10vw,5.5rem)", color: "#fff", textShadow: "0 0 32px rgba(232,169,75,0.4)", fontFamily: "'Baloo 2'" }}>₹99</p>
              <p style={{ fontSize: 15, color: "#e4e4e7", fontWeight: 700 }} className="mb-1">per month — less than one edtech app subscription</p>
              <p style={{ fontSize: 13, color: "#9ca3af" }} className="mb-6">Cancel anytime · No hidden charges · No upfront fee</p>
              <CTA label="Start StoryVerse Tonight →" sub="₹99/month · Cancel anytime" onClick={openCheckout} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ GUARANTEE ═════════════════════════════════════════════════════════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="rounded-2xl premium-card p-7 sm:p-10 border-glow relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full" style={{ background: "rgba(232,169,75,0.08)" }} aria-hidden="true" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(232,169,75,0.12)", border: "1px solid rgba(232,169,75,0.25)", fontSize: 26 }}>🛡️</div>
                <div>
                  <p className="sv-label mb-1">Zero-risk promise</p>
                  <h2 className="sv-h2" style={{ color: "#3a2f4a" }}>You have nothing to lose.</h2>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { icon: "📵", t: "No spam ever", b: "One WhatsApp message each night. That's it." },
                  { icon: "📞", t: "No pressure calls", b: "No one will call to upsell you. Ever." },
                  { icon: "🔁", t: "Cancel anytime", b: "Stop the subscription whenever you want, no questions." },
                  { icon: "💳", t: "No hidden charges", b: "₹99/month, exactly what you see. Nothing added." },
                ].map(({ icon, t, b }) => (
                  <div key={t} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0" style={{ background: "rgba(232,169,75,0.1)", border: "1px solid rgba(232,169,75,0.15)" }}>{icon}</div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#3a2f4a" }}>{t}</p>
                      <p style={{ fontSize: 12, color: "#71717a", marginTop: 2 }}>{b}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-5 mb-7" style={{ background: "rgba(232,169,75,0.06)", border: "1px solid rgba(232,169,75,0.18)" }}>
                <div className="flex items-start gap-3">
                  <span style={{ fontSize: 24 }} className="shrink-0">🤝</span>
                  <div>
                    <p className="sv-label mb-1.5">Rohan&apos;s personal commitment</p>
                    <p style={{ fontSize: 14, fontStyle: "italic", color: "#3a2f4a", lineHeight: 1.65 }}>
                      &ldquo;Try the first 7 days. If your child doesn&apos;t light up over these stories, message me directly and I&apos;ll refund your first ₹99 in full — no questions asked.&rdquo;
                    </p>
                    <p className="mt-2" style={{ fontSize: 12, color: "#71717a" }}>— Rohan, Founder</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <CTA label="Yes — I Have Nothing to Lose →" sub="₹99/month · Cancel anytime · 7-day refund promise" onClick={openCheckout} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="sv-label mb-3">FAQ</p>
            <h2 className="sv-h2 sv-section-title">Every question answered</h2>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { q: "What age is StoryVerse for?", a: "StoryVerse is built for children roughly 3–8 years old. Stories use very simple, toddler-friendly language for younger kids, and the 'Little Warriors' real-hero stories (like young Shivaji) are written for the 5-8 range." },
              { q: "What happens after I pay?", a: "Within a minute of completing payment, your child's very first story arrives on your WhatsApp — the cover image, then the full illustrated PDF magazine. A new story arrives every night after that." },
              { q: "Do I need to download an app?", a: "No app, no download. Everything arrives on WhatsApp — the number you already have." },
              { q: "How much does it cost?", a: "₹99 per month, billed automatically via Razorpay for up to 12 months. There's no separate signup fee or upfront charge — you pay ₹99 and your subscription starts immediately." },
              { q: "Can I cancel anytime?", a: "Yes. Message us on WhatsApp anytime to cancel — your subscription stops and no further charges happen. There's no lock-in." },
              { q: "Will the stories repeat?", a: "The library keeps growing every month with new stories and new themes, so your child always has something fresh to look forward to." },
              { q: "Is my child's information safe?", a: "We only ever ask for your child's first name, age and gender — never any other personal information. Nothing is shared with anyone." },
              { q: "What if I have more than one child?", a: "You can add each child as a separate StoryVerse subscription so every child gets their own personalized stories, each night." },
            ].map(({ q, a }) => <FAQ key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* ══ FINAL CLOSE ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 lg:py-28" style={{ background: "#2d2438" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(232,169,75,0.1),transparent 70%)" }} />
        <div className="max-w-xl mx-auto px-6 text-center relative">
          <p style={{ fontSize: 44 }} className="mb-5">🌙</p>
          <h2 className="sv-h1 mb-5" style={{ color: "#fff" }}>
            Tonight, your child<br />could be the hero<br />
            <span style={{ color: "#e8a94b" }}>of their own story.</span>
          </h2>
          <p style={{ fontSize: 16, color: "#c9bfd4", lineHeight: 1.75, marginBottom: 32 }}>
            A year from now, they could have a shelf of stories where they were brave, kind, and curious — one every single night.<br /><br />
            Or the phone stays exactly what it is today.<br />
            <strong style={{ color: "#e4e4e7" }}>₹99 a month decides which one.</strong>
          </p>
          <CTA label="Start StoryVerse Tonight →" sub="₹99/month · Cancel anytime" onClick={openCheckout} />
          <p className="mt-5" style={{ fontSize: 13, color: "#8a7d97" }}>
            Questions?{" "}
            <a href="https://wa.me/918956146485?text=Hi%2C+I+have+a+question+about+StoryVerse" className="underline" style={{ color: "#e8a94b" }}>Chat with us on WhatsApp</a>
          </p>
        </div>
      </section>

      <footer className="px-5 py-6 text-center" style={{ background: "#1c1624", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p style={{ fontSize: 12, color: "#8a7d97" }}>
          © {new Date().getFullYear()} StoryVerse ·{" "}
          <a href="https://www.highperformanceclub.co" className="underline" style={{ color: "#6b5f78" }}>highperformanceclub.co</a>
        </p>
        <p style={{ fontSize: 12, color: "#6b5f78", marginTop: 4 }}>₹99/month · Cancel anytime · One magical story every night</p>
      </footer>

      <StickyBottomCTA onOpen={openCheckout} />
      <LiveToast />
    </div>
  );
}
