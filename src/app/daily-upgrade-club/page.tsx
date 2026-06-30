"use client";
import { useState } from "react";

const JOIN_URL = "https://rzp.io/l/daily-upgrade-club";

// ── Icons ─────────────────────────────────────────────────────────────────────
function WAIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#25d366" />
      <path d="M22.94 9.06A9.75 9.75 0 0 0 16 6.25C10.89 6.25 6.75 10.39 6.75 15.5c0 1.63.43 3.21 1.24 4.62L6.6 25.4l5.42-1.42a9.75 9.75 0 0 0 4.97 1.37c5.11 0 9.25-4.14 9.25-9.25a9.2 9.2 0 0 0-3.3-7.04Zm-6.94 14.2a8.1 8.1 0 0 1-4.12-1.12l-.3-.17-3.06.8.82-2.98-.2-.31A8.1 8.1 0 0 1 7.9 15.5c0-4.47 3.63-8.1 8.1-8.1a8.1 8.1 0 0 1 8.1 8.1c0 4.47-3.63 8.1-8.1 8.1Zm4.44-6.07c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06a6.57 6.57 0 0 1-1.93-1.19 7.24 7.24 0 0 1-1.34-1.66c-.14-.24-.01-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" fill="#fff"/>
    </svg>
  );
}

function Star() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="#f59e0b" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#1da851"/>
      <path d="M6 10l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function CTA({ label, sub, dark }: { label: string; sub?: string; dark?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <a href={JOIN_URL} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-3 w-full max-w-sm px-8 py-4 rounded-full font-black text-white text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        style={{ background: "linear-gradient(135deg,#1da851 0%,#25d366 100%)", boxShadow: "0 6px 28px rgba(37,211,102,0.40)" }}>
        <WAIcon size={20} />
        {label}
      </a>
      {sub && <p className="text-xs text-center" style={{ color: dark ? "#71717a" : "#71717a" }}>{sub}</p>}
    </div>
  );
}

// ── WhatsApp Phone Shell ──────────────────────────────────────────────────────
function WAMsg({ text, time = "7:01 AM" }: { text: string; time?: string }) {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]" style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
        <p className="text-xs leading-relaxed whitespace-pre-line" style={{ color: "#18181b" }}>{text}</p>
        <p className="text-right mt-1" style={{ fontSize: "10px", color: "#a1a1aa" }}>{time} ✓✓</p>
      </div>
    </div>
  );
}

function WAReply({ text, time = "7:08 AM" }: { text: string; time?: string }) {
  return (
    <div className="flex justify-end">
      <div className="rounded-2xl rounded-tr-sm px-4 py-3 max-w-[75%]" style={{ background: "#dcf8c6" }}>
        <p className="text-xs font-medium" style={{ color: "#18181b" }}>{text}</p>
        <p className="text-right mt-1" style={{ fontSize: "10px", color: "#71717a" }}>{time} ✓✓</p>
      </div>
    </div>
  );
}

function PhoneShell({ label, tag, children }: { label: string; tag: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3 pl-1">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(37,211,102,0.15)", color: "#25d366", border: "1px solid rgba(37,211,102,0.25)" }}>{tag}</span>
      </div>
      <div className="rounded-3xl overflow-hidden mx-auto" style={{ maxWidth: 320, border: "8px solid #1a1a1a", boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)" }}>
        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-1.5" style={{ background: "#1a1a1a" }}>
          <span style={{ fontSize: "10px", color: "#fff", fontWeight: 600 }}>9:41</span>
          <div className="flex items-center gap-1">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="#fff"><rect x="0" y="3" width="2" height="5" rx="0.5"/><rect x="3" y="2" width="2" height="6" rx="0.5"/><rect x="6" y="1" width="2" height="7" rx="0.5"/><rect x="9" y="0" width="2" height="8" rx="0.5"/></svg>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><rect x="0.5" y="0.5" width="10" height="7" rx="1" stroke="#fff" strokeWidth="1"/><rect x="11" y="2.5" width="1" height="3" rx="0.5" fill="#fff"/><rect x="1.5" y="1.5" width="7" height="5" rx="0.5" fill="#fff"/></svg>
          </div>
        </div>
        {/* WA header */}
        <div className="flex items-center gap-3 px-3 py-2.5" style={{ background: "#075e54" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="#fff"/></svg>
          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0" style={{ background: "#1da851" }}>DU</div>
          <div className="flex-1">
            <p className="text-white font-semibold leading-tight" style={{ fontSize: "13px" }}>Daily Upgrade Club</p>
            <p style={{ color: "#a7f3d0", fontSize: "10px" }}>{label}</p>
          </div>
          <div className="flex gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" opacity="0.8"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          </div>
        </div>
        {/* Chat area */}
        <div className="px-3 py-3 space-y-2.5" style={{ background: "#e5ddd5", minHeight: 240 }}>
          {children}
        </div>
        {/* Input bar */}
        <div className="flex items-center gap-2 px-3 py-2" style={{ background: "#f0f0f0" }}>
          <div className="flex-1 rounded-full px-3 py-1.5 text-xs" style={{ background: "#fff", color: "#a1a1aa" }}>Message</div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#25d366" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-sm"
        style={{ background: "rgba(255,255,255,0.04)", color: "#e4e4e7" }}>
        {q}
        <span className="flex-shrink-0 text-xl font-light" style={{ color: "#25d366", display: "inline-block", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
      </button>
      {open && <div className="px-5 pb-4 text-sm leading-relaxed" style={{ background: "rgba(255,255,255,0.02)", color: "#a1a1aa" }}>{a}</div>}
    </div>
  );
}

// ── Stat bubble ───────────────────────────────────────────────────────────────
function StatBubble({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 px-5 py-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <span className="font-black text-xl" style={{ color: "#25d366" }}>{value}</span>
      <span className="text-xs text-center" style={{ color: "#9ca3af" }}>{label}</span>
    </div>
  );
}

// ── Avatar initials ───────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  "linear-gradient(135deg,#6366f1,#8b5cf6)",
  "linear-gradient(135deg,#ec4899,#f43f5e)",
  "linear-gradient(135deg,#f59e0b,#ef4444)",
  "linear-gradient(135deg,#0ea5e9,#6366f1)",
];

function Avatar({ name, idx }: { name: string; idx: number }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0"
      style={{ background: AVATAR_COLORS[idx % AVATAR_COLORS.length], boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
      {initials}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function DailyUpgradeClubPage() {
  return (
    <div style={{ background: "#faf8f3", minHeight: "100vh", fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,sans-serif", color: "#18181b" }}>

      {/* ══════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(160deg,#f0fdf4 0%,#faf8f3 100%)", borderBottom: "1px solid #e2dfd6", position: "relative", overflow: "hidden" }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,211,102,0.12) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle,rgba(29,168,81,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />

        <div className="max-w-xl mx-auto px-5 pt-12 pb-14 text-center" style={{ position: "relative" }}>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 text-xs font-bold uppercase tracking-widest"
            style={{ background: "rgba(37,211,102,0.12)", color: "#1da851", border: "1px solid rgba(37,211,102,0.25)", backdropFilter: "blur(8px)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: "#25d366" }} />
            Daily Upgrade Club · WhatsApp
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.6rem)", lineHeight: 1.07, fontWeight: 900, letterSpacing: "-0.035em" }}>
            You already know<br />
            <span style={{ color: "#1da851", position: "relative" }}>what a healthy life</span><br />
            looks like.<br />
            <span style={{ fontStyle: "italic", fontWeight: 400, color: "#71717a", fontSize: "0.82em" }}>So why is it still not happening?</span>
          </h1>

          {/* Gradient divider */}
          <div className="flex items-center justify-center gap-3 my-8">
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,transparent,#d1fae5)" }} />
            <WAIcon size={28} />
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,#d1fae5,transparent)" }} />
          </div>

          <p className="text-lg leading-relaxed" style={{ color: "#4a4a52", maxWidth: "460px", margin: "0 auto 2.5rem" }}>
            The problem isn&apos;t knowledge. It&apos;s not willpower either.<br /><br />
            It&apos;s that <strong style={{ color: "#18181b" }}>every healthy habit you&apos;ve tried demanded too much</strong> — too much time, too much change, too much discipline from someone who already has a full life.<br /><br />
            What if you only had to do <strong style={{ color: "#18181b" }}>one tiny healthy habit a day</strong>? One. Under 5 minutes. Already waiting in your WhatsApp when you wake up.
          </p>

          {/* Social proof row */}
          <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
            <div className="flex -space-x-2">
              {["KM","PT","SR","AD"].map((init, i) => (
                <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                  style={{ background: AVATAR_COLORS[i], border: "2px solid #fff" }}>{init}</div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex gap-0.5 mb-0.5">{[1,2,3,4,5].map(i=><Star key={i}/>)}</div>
              <p className="text-xs" style={{ color: "#71717a" }}>400+ members building daily</p>
            </div>
          </div>

          <CTA label="Start My 7-Day Trial — ₹1 →" sub="7 days for ₹1 · Then ₹99/month · Cancel anytime" />

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {["No app to download","Arrives on WhatsApp","Under 5 min/day","Works for busy people"].map(t=>(
              <span key={t} className="text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5"
                style={{ background: "#fff", color: "#4a4a52", border: "1px solid #e2dfd6", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                <CheckIcon />{t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════════ */}
      <div style={{ background: "#18181b", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-xl mx-auto px-5 py-6 grid grid-cols-3 gap-3">
          <StatBubble value="400+" label="Active members" />
          <StatBubble value="78%" label="Completion rate" />
          <StatBubble value="₹3/day" label="After trial" />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          2. ROHAN'S STORY
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-xl mx-auto px-5 py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>Why I Built This</p>
        <h2 className="text-center font-bold mb-8" style={{ fontSize: "clamp(1.5rem, 4vw, 2.4rem)", lineHeight: 1.12, letterSpacing: "-0.025em" }}>
          I was the person who knew<br />
          <span style={{ color: "#1da851" }}>everything about health</span><br />
          and did none of it.
        </h2>

        <div className="space-y-5 text-base leading-relaxed" style={{ color: "#4a4a52" }}>
          <p>I&apos;m Rohan. Two years ago, I had bookmarked 47 articles on sleep, had three fitness apps on my phone, and had started — and abandoned — more routines than I can count.</p>
          <p>I wasn&apos;t lazy. I was a professional. I cared about my health. But every time I tried to build a routine, life happened. A busy week. A late night. One missed day turned into three. Three turned into &ldquo;I&apos;ll restart next Monday.&rdquo;</p>
          <p>Then I stumbled on BJ Fogg&apos;s research from Stanford. He studied thousands of people trying to build habits and found one thing that separated those who succeeded from those who didn&apos;t: <strong style={{ color: "#18181b" }}>the successful ones made the habit so small it was impossible to fail.</strong></p>

          {/* Pull quote */}
          <div className="rounded-2xl p-5 my-4" style={{ background: "linear-gradient(135deg,rgba(37,211,102,0.08),rgba(29,168,81,0.04))", border: "1px solid rgba(37,211,102,0.2)" }}>
            <p className="text-base font-semibold" style={{ color: "#18181b" }}>
              &ldquo;I replaced my entire morning routine with one thing: drink one glass of water before touching my phone. By Day 10, I was sleeping better. By Day 30, I had more energy than I&apos;d had in years.&rdquo;
            </p>
          </div>

          <p>I built the Daily Upgrade Club because I wanted to give everyone what I found — one tiny healthy habit, every morning, already waiting for you. No planning. No apps. Just WhatsApp.</p>
          <p>Since then, 400+ members have done the same. And the results — better sleep, more energy, sharper focus, less stress — all started with one ridiculously small habit a day.</p>
        </div>

        {/* Rohan card */}
        <div className="flex items-center gap-4 mt-8 p-5 rounded-2xl" style={{ background: "#fff", border: "1px solid #e2dfd6", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center font-black text-white text-xl flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#1da851,#25d366)", boxShadow: "0 4px 16px rgba(37,211,102,0.35)" }}>R</div>
          <div>
            <p className="font-bold" style={{ color: "#18181b" }}>Rohan Mote</p>
            <p className="text-sm" style={{ color: "#71717a" }}>Founder, Daily Upgrade Club</p>
            <p className="text-xs mt-1" style={{ color: "#25d366" }}>Tested with 40 people → 200 → 400+ members</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. OLD WAY vs DUC + PHONE DEMOS
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#18181b", position: "relative", overflow: "hidden" }} className="px-5 py-14">
        {/* Glow */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(37,211,102,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />

        <div className="max-w-xl mx-auto" style={{ position: "relative" }}>
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>This Is Not What You&apos;ve Tried Before</p>
          <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.5rem, 4vw, 2.4rem)", lineHeight: 1.12, letterSpacing: "-0.025em", color: "#fff" }}>
            The old way vs.<br />
            <span style={{ color: "#25d366" }}>the Daily Upgrade Club</span>
          </h2>

          <div className="grid grid-cols-2 gap-3 mb-14">
            <div className="rounded-2xl p-4" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#f87171" }}>The Old Way</p>
              <div className="space-y-3">
                {["Download an app, forget it exists","Buy a course, watch 2 videos","5AM routine, quit by Thursday","Gym membership collecting dust","Motivation peaks, then crashes","10 goals, master none"].map(t=>(
                  <div key={t} className="flex items-start gap-2">
                    <span className="text-xs flex-shrink-0 mt-0.5" style={{ color: "#f87171" }}>✕</span>
                    <p className="text-xs leading-relaxed" style={{ color: "#a1a1aa" }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-4" style={{ background: "rgba(37,211,102,0.06)", border: "1px solid rgba(37,211,102,0.22)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#25d366" }}>Daily Upgrade Club</p>
              <div className="space-y-3">
                {["Habit arrives on WhatsApp at 7 AM","Takes under 5 minutes","One theme. 30 days. Real results.","Works even on your worst day","System replaces willpower","Go deep on one area, then next"].map(t=>(
                  <div key={t} className="flex items-start gap-2">
                    <span className="text-xs flex-shrink-0 mt-0.5" style={{ color: "#25d366" }}>✓</span>
                    <p className="text-xs leading-relaxed" style={{ color: "#e4e4e7" }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section label */}
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-8" style={{ color: "#25d366" }}>What Actually Lands In Your WhatsApp Every Morning</p>

          {/* Phone demos */}
          <div className="space-y-10">
            <PhoneShell label="Energy Month · Day 3 · online" tag="⚡ Energy Month — Day 3">
              <WAMsg text={"Good morning! ⚡ Day 3 habit:\n\n🌞 Step outside for 5 min of natural sunlight within 30 min of waking.\n\nWhy: Resets your cortisol rhythm — controls energy all day. No sunlight = sluggish even after coffee.\n\nJust 5 minutes. Go outside or by a bright window.\n\nReply DONE when you're back 💪"} />
              <WAReply text="DONE ✅ Felt surprisingly good actually" />
              <WAMsg text="🔥 Day 3 streak! Body is already recalibrating. See you tomorrow." time="7:14 AM" />
            </PhoneShell>

            <PhoneShell label="Sleep Month · Day 11 · online" tag="😴 Sleep Month — Day 11">
              <WAMsg text={"Good morning! 😴 Day 11 habit:\n\n📵 Tonight — phone charger outside the bedroom.\n\nWhy: Blue light suppresses melatonin for up to 2 hours. Just removing the phone improves sleep quality — no other changes needed.\n\nSet a reminder now for 9:30 PM.\n\nReply DONE once set 🌙"} />
              <WAReply text="DONE ✅ Will try it tonight" time="7:06 AM" />
              <WAMsg text="🔥 Day 11! Most members notice a difference in 3–5 nights. You're almost there." time="7:07 AM" />
            </PhoneShell>

            <PhoneShell label="Gut Health Month · Day 7 · online" tag="🌿 Gut Health Month — Day 7">
              <WAMsg text={"Good morning! 🌱 Day 7 habit:\n\n🥄 Add one spoon of plain curd (no sugar) to your lunch.\n\nWhy: Live cultures feed good gut bacteria. Daily curd — even just one spoon — reduces bloating and improves digestion within 2 weeks.\n\nJust one spoon with lunch. That's it.\n\nReply DONE after lunch 🙌"} />
              <WAReply text="DONE ✅ Had it with dal rice" time="1:23 PM" />
              <WAMsg text="Perfect 🙌 Day 7 complete! Gut bacteria are already shifting. See you tomorrow." time="1:24 PM" />
            </PhoneShell>
          </div>

          <p className="text-center text-xs mt-8" style={{ color: "#52525b" }}>This is what members get every morning. Specific. Doable. Explained.</p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. YOUR FIRST 7 DAYS
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-xl mx-auto px-5 py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>Your First 7 Days</p>
        <h2 className="text-center font-bold mb-4" style={{ fontSize: "clamp(1.5rem, 4vw, 2.4rem)", lineHeight: 1.12, letterSpacing: "-0.025em" }}>
          Here&apos;s exactly what<br />
          <span style={{ color: "#1da851" }}>will happen this week</span>
        </h2>
        <p className="text-center text-sm mb-10" style={{ color: "#71717a" }}>
          By Day 7, you&apos;ll feel the difference. If you don&apos;t — cancel. Pay nothing more.
        </p>

        <div className="space-y-3">
          {[
            { day: "Day 1", emoji: "👋", title: "Your first habit arrives at 7 AM", desc: "You wake up to one tiny healthy habit in your WhatsApp. You read it. You do it. Under 5 minutes. You reply DONE. You'll think: 'That's it?' Yes. That's it.", feel: "Surprised at how easy it is" },
            { day: "Day 2", emoji: "🔥", title: "Second habit. Streak begins.", desc: "Day 2 arrives automatically. Streak = 2. The accountability group is live — you see others posting DONE. You realise you're not doing this alone.", feel: "A quiet sense of momentum" },
            { day: "Day 3–4", emoji: "⚡", title: "The habit starts feeling automatic", desc: "You notice yourself expecting the morning message. It's no longer something you decide to do — it's part of how your morning starts. The streak is doing more work than willpower.", feel: "Habit anchoring to your morning" },
            { day: "Day 5", emoji: "✨", title: "First physical shift", desc: "Most members notice something by Day 5 — more energy, better sleep, lighter digestion, clearer head. Small. But real. And nothing else changed.", feel: "Something actually shifted" },
            { day: "Day 6", emoji: "🔔", title: "You get your Day 6 reminder", desc: "We remind you: trial ends tomorrow. Cancel now if you want — no pressure, no guilt. You're always in control.", feel: "Full control. No surprise charge." },
            { day: "Day 7", emoji: "🎯", title: "You make a clear decision", desc: "After 7 mornings of real habits — you know. Most members don't cancel. Not because they forget — because they don't want to stop.", feel: "You already have your answer" },
          ].map(({ day, emoji, title, desc, feel }) => (
            <div key={day} className="rounded-2xl p-5 bg-white flex gap-4" style={{ border: "1px solid #e2dfd6", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-black" style={{ background: "linear-gradient(135deg,#1da851,#25d366)", boxShadow: "0 3px 12px rgba(37,211,102,0.3)" }}>
                  {emoji}
                </div>
                <p className="text-xs font-bold" style={{ color: "#1da851" }}>{day.split("–")[0].replace("Day ","D")}</p>
              </div>
              <div>
                <p className="font-bold text-sm mb-1" style={{ color: "#18181b" }}>{title}</p>
                <p className="text-sm leading-relaxed mb-2.5" style={{ color: "#71717a" }}>{desc}</p>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full inline-block" style={{ background: "rgba(37,211,102,0.1)", color: "#1da851", border: "1px solid rgba(37,211,102,0.15)" }}>
                  💬 {feel}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <CTA label="Start Day 1 Tomorrow — ₹1 →" sub="7 days for ₹1 · Then ₹99/month · Cancel anytime before Day 7" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. WHAT YOU GET
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(160deg,#f0fdf4 0%,#faf8f3 100%)", borderTop: "1px solid #e2dfd6", borderBottom: "1px solid #e2dfd6" }} className="px-5 py-14">
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>Everything You Get</p>
          <h2 className="text-center font-bold mb-2" style={{ fontSize: "clamp(1.5rem, 4vw, 2.4rem)", lineHeight: 1.12, letterSpacing: "-0.025em" }}>
            Your complete Daily Upgrade Club
          </h2>
          <p className="text-center text-sm mb-10" style={{ color: "#71717a" }}>Every item is active from Day 1 of your ₹1 trial.</p>

          <div className="space-y-3">
            {[
              { emoji: "📲", title: "One tiny healthy habit — every morning on WhatsApp", desc: "At 7 AM, one habit arrives. Specific, science-backed, under 5 minutes. No planning. Just reply DONE.", value: "₹2,999" },
              { emoji: "🎯", title: "One focused monthly health theme", desc: "Sleep, Energy, Focus, Gut Health, Stress, Fitness, Hydration. You pick. 30 habits, one thread, real change.", value: "₹1,799" },
              { emoji: "📊", title: "Weekly health scorecard", desc: "Every Sunday: streak, completion %, and how your theme is shifting. Seeing progress is what keeps you going.", value: "₹999" },
              { emoji: "👥", title: "Private WhatsApp accountability group", desc: "Same habit. Same morning. When others post DONE — you will too.", value: "₹999" },
              { emoji: "🗓️", title: "Monthly 30-habit calendar + PDF guide", desc: "All 30 habits in advance. No surprises. A clear 30-day path.", value: "₹499" },
              { emoji: "🏆", title: "Full habit vault (90+ tiny healthy habits)", desc: "Every habit permanently yours. Revisit, repeat, combine.", value: "₹999" },
              { emoji: "📩", title: "Weekly wellness newsletter", desc: "One practical insight per week — research-backed, plain language. No fluff.", value: "₹199" },
            ].map(({ emoji, title, desc, value }) => (
              <div key={title} className="rounded-2xl p-5 bg-white flex items-start gap-4" style={{ border: "1px solid #e2dfd6", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.15)" }}>
                  {emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-bold text-sm leading-snug" style={{ color: "#18181b" }}>{title}</p>
                    <span className="text-xs font-bold flex-shrink-0 px-2 py-0.5 rounded-full" style={{ background: "rgba(37,211,102,0.1)", color: "#1da851" }}>{value}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#71717a" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. 3 FALSE BELIEFS
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-xl mx-auto px-5 py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>The 3 Reasons You&apos;re Hesitating</p>
        <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.5rem, 4vw, 2.4rem)", lineHeight: 1.12, letterSpacing: "-0.025em" }}>
          And why none of them<br />
          <span style={{ color: "#1da851" }}>should stop you today</span>
        </h2>

        <div className="space-y-5">
          {[
            {
              belief: "\"One tiny habit a day can't actually change my health.\"",
              truth: "A single habit done for 30 consecutive days rewires the brain through neuroplasticity — confirmed by Stanford research. Members who started with just \"5 minutes of morning sunlight\" ended the month sleeping better, eating better, and exercising more — without being told to. One tiny healthy habit pulls the rest of your health forward like a thread."
            },
            {
              belief: "\"I've tried this before. I always quit. I'm just not a consistent person.\"",
              truth: "You quit because the habit was too big, not because you're broken. When a habit takes under 5 minutes and shows up in your WhatsApp automatically — you don't have to rely on memory or motivation. Members who called themselves \"the least consistent person alive\" averaged a 78% completion rate in their first month."
            },
            {
              belief: "\"₹99/month feels risky — what if I pay and don't use it?\"",
              truth: "This is exactly why the trial costs ₹1. You don't decide whether this is for you based on a description. You decide after 7 mornings of actual habits landing in your WhatsApp. If by Day 7 you haven't felt a single shift — cancel. No questions. You risk ₹1. I risk my reputation."
            },
          ].map(({ belief, truth }, i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e2dfd6", boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }}>
              <div className="px-5 py-4 flex items-start gap-3" style={{ background: "#fff7f7", borderBottom: "1px solid #fecaca" }}>
                <span className="text-lg flex-shrink-0">❌</span>
                <p className="text-sm font-bold" style={{ color: "#dc2626" }}>{belief}</p>
              </div>
              <div className="px-5 py-4 bg-white flex items-start gap-3">
                <span className="text-lg flex-shrink-0">✅</span>
                <p className="text-sm leading-relaxed" style={{ color: "#4a4a52" }}>{truth}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. IF ALL THIS DID WAS × 3
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(160deg,#f0fdf4 0%,#faf8f3 100%)", borderTop: "1px solid #e2dfd6", borderBottom: "1px solid #e2dfd6" }} className="px-5 py-14">
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>Think About This Honestly</p>
          <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.5rem, 4vw, 2.4rem)", lineHeight: 1.12, letterSpacing: "-0.025em" }}>
            Any one of these alone<br />
            <span style={{ fontStyle: "italic", fontWeight: 400, color: "#71717a" }}>would be worth it.</span>
          </h2>

          <div className="space-y-4">
            {[
              { icon: "⚡", q: "If all this did was", bold: "give you the energy to get through your day without needing caffeine every 2 hours", suffix: "— would 7 days for ₹1 be worth finding out?" },
              { icon: "🔄", q: "If all this did was", bold: "make you the kind of person who actually follows through on their health — not just in January, but every single month", suffix: "— would ₹99/month be worth it?" },
              { icon: "🌱", q: "If all this did was", bold: "help you wake up 6 months from now and say 'I'm actually taking care of myself' — and genuinely mean it", suffix: "— what would that be worth to you?" },
            ].map(({ icon, q, bold, suffix }, i) => (
              <div key={i} className="rounded-2xl px-6 py-5 bg-white flex gap-4 items-start" style={{ border: "1px solid #e2dfd6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <span className="text-2xl flex-shrink-0">{icon}</span>
                <p className="text-base leading-relaxed" style={{ color: "#4a4a52" }}>
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
          8. PRICE REVEAL
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#18181b", position: "relative", overflow: "hidden" }} className="px-5 py-14">
        <div style={{ position: "absolute", top: "30%", right: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,211,102,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />

        <div className="max-w-md mx-auto" style={{ position: "relative" }}>
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>The Real Value</p>
          <h2 className="text-center font-bold mb-8" style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", lineHeight: 1.15, letterSpacing: "-0.025em", color: "#fff" }}>
            Here&apos;s what it&apos;s worth.<br />
            <span style={{ color: "#25d366" }}>And what you pay.</span>
          </h2>

          <div className="rounded-2xl overflow-hidden mb-6" style={{ background: "#1c1c1e", border: "1px solid rgba(255,255,255,0.08)" }}>
            {[
              ["📲", "Daily tiny healthy habit on WhatsApp (30/month)", "₹2,999"],
              ["🎯", "Monthly health theme (Sleep / Energy / Focus…)", "₹1,799"],
              ["📊", "Weekly health scorecard", "₹999"],
              ["👥", "Private WhatsApp accountability group", "₹999"],
              ["🗓️", "30-habit monthly calendar + PDF guide", "₹499"],
              ["🏆", "Full habit vault (90+ habits)", "₹999"],
              ["📩", "Weekly wellness newsletter", "₹199"],
            ].map(([emoji, name, value], idx, arr) => (
              <div key={name as string} className="flex items-center justify-between gap-3 px-5 py-3"
                style={{ borderBottom: idx < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{emoji}</span>
                  <span className="text-xs" style={{ color: "#a1a1aa" }}>{name}</span>
                </div>
                <span className="text-xs font-semibold flex-shrink-0" style={{ color: "#4a4a52" }}>{value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between gap-3 px-5 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "rgba(37,211,102,0.05)" }}>
              <span className="font-bold text-sm" style={{ color: "#fff" }}>Total value</span>
              <span className="font-bold" style={{ color: "#25d366" }}>₹8,493/month</span>
            </div>
          </div>

          <div className="text-center space-y-1.5 mb-8">
            <p className="text-base" style={{ color: "#a1a1aa" }}>We&apos;re not charging you <strong className="line-through" style={{ color: "#6b7280" }}>₹8,493</strong>.</p>
            <p className="text-base" style={{ color: "#a1a1aa" }}>Not <strong className="line-through" style={{ color: "#6b7280" }}>₹4,999</strong>.</p>
            <p className="text-base" style={{ color: "#a1a1aa" }}>Not even <strong className="line-through" style={{ color: "#6b7280" }}>₹299</strong>.</p>
          </div>

          <div className="rounded-2xl p-7 text-center" style={{ background: "linear-gradient(135deg,rgba(37,211,102,0.14) 0%,rgba(29,168,81,0.08) 100%)", border: "1px solid rgba(37,211,102,0.28)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#25d366" }}>Your Price</p>
            <div className="flex items-end justify-center gap-2 mb-1">
              <span style={{ fontSize: "6rem", lineHeight: 1, fontWeight: 900, letterSpacing: "-0.04em", color: "#25d366", textShadow: "0 0 40px rgba(37,211,102,0.4)" }}>₹1</span>
            </div>
            <p className="text-base font-bold mb-1" style={{ color: "#fff" }}>for your first 7 days</p>
            <p className="text-sm mb-6" style={{ color: "#71717a" }}>Then ₹99/month — just ₹3 per day. Less than chai.</p>
            <CTA label="Start My 7-Day Trial → ₹1" sub="Cancel before Day 7. Pay nothing more." />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          9. TESTIMONIALS
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-xl mx-auto px-5 py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>What Members Say</p>
        <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", lineHeight: 1.15, letterSpacing: "-0.025em" }}>
          Real people. Tiny habits.<br />
          <span style={{ color: "#1da851" }}>Specific results.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: "Karan M.", city: "Pune", joined: "Energy Month", date: "May 2025", result: "No 3 PM crash · Day 5", text: "By Day 5, I stopped needing that 3 PM coffee hit. I haven't had one since. I didn't change my diet, sleep, or exercise. One morning habit literally changed my afternoon energy.", idx: 0 },
            { name: "Priya T.", city: "Bengaluru", joined: "Sleep Month", date: "April 2025", result: "+45 min sleep · tracked", text: "I've tried sleep apps, podcasts, melatonin. The WhatsApp habit took 4 minutes and I'm sleeping 45 minutes more per night — tracked on my phone. Nothing else changed.", idx: 1 },
            { name: "Sneha R.", city: "Mumbai", joined: "Focus Month", date: "March 2025", result: "Cleared backlog · Day 12", text: "I was deeply skeptical. Day 12 — I finished a project I'd been avoiding for a month. Day 20 — my manager asked what had changed. I said 'one WhatsApp message a morning.'", idx: 2 },
            { name: "Amit D.", city: "Delhi", joined: "Gut Health", date: "June 2025", result: "Zero bloating · 3 weeks", text: "Lifelong bloating issues. The gut habits were embarrassingly simple — add curd, chew slower, morning water. 3 weeks in, zero bloating. My wife noticed before I did.", idx: 3 },
          ].map(({ name, city, joined, date, result, text, idx }) => (
            <div key={name} className="rounded-2xl p-5 bg-white flex flex-col gap-3" style={{ border: "1px solid #e2dfd6", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
              <div className="flex gap-0.5">{[1,2,3,4,5].map(i=><Star key={i}/>)}</div>
              {/* Pinned result */}
              <div className="px-3 py-2 rounded-xl text-xs font-bold" style={{ background: "rgba(37,211,102,0.1)", color: "#1da851", border: "1px solid rgba(37,211,102,0.15)" }}>
                📌 {result}
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(37,211,102,0.1)", color: "#1da851" }}>{joined}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#f4f4f5", color: "#71717a" }}>{date}</span>
              </div>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "#4a4a52" }}>&ldquo;{text}&rdquo;</p>
              <div className="flex items-center gap-2.5 pt-2" style={{ borderTop: "1px solid #f4f4f5" }}>
                <Avatar name={name} idx={idx} />
                <div>
                  <p className="text-xs font-bold" style={{ color: "#18181b" }}>{name}</p>
                  <p className="text-xs" style={{ color: "#71717a" }}>{city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          10. GUARANTEE + THEMES + CTA
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#18181b", position: "relative", overflow: "hidden" }} className="px-5 py-14">
        <div style={{ position: "absolute", bottom: -100, left: "50%", transform: "translateX(-50%)", width: 500, height: 300, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(37,211,102,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />

        <div className="max-w-xl mx-auto" style={{ position: "relative" }}>
          {/* Guarantee */}
          <div className="rounded-2xl p-7 mb-8 text-center" style={{ background: "rgba(37,211,102,0.06)", border: "1px solid rgba(37,211,102,0.2)" }}>
            <div className="text-5xl mb-4">🛡️</div>
            <h3 className="font-black text-xl mb-3" style={{ color: "#fff" }}>7-Day Trial for ₹1. Zero Risk.</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#a1a1aa" }}>
              7 mornings of real tiny healthy habits on WhatsApp. Your streak. Your scorecard. The full community. All for ₹1.<br /><br />
              If by Day 7 you haven&apos;t noticed a single shift — cancel. Pay nothing more.<br /><br />
              <strong style={{ color: "#fff" }}>You risk ₹1. I risk my reputation.</strong>
            </p>
          </div>

          {/* Monthly themes */}
          <div className="rounded-2xl p-6 mb-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-5 text-center" style={{ color: "#25d366" }}>Choose Your First Monthly Theme</p>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[
                { emoji: "😴", label: "Sleep" },
                { emoji: "⚡", label: "Energy" },
                { emoji: "🧠", label: "Focus" },
                { emoji: "🌿", label: "Gut Health" },
                { emoji: "🧘", label: "Stress" },
                { emoji: "💪", label: "Fitness" },
                { emoji: "💧", label: "Hydration" },
                { emoji: "❤️", label: "Heart" },
              ].map(({ emoji, label }) => (
                <div key={label} className="rounded-xl p-2.5 text-center transition-all hover:scale-105" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", cursor: "default" }}>
                  <div className="text-xl mb-1">{emoji}</div>
                  <div className="text-xs" style={{ color: "#a1a1aa" }}>{label}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-center" style={{ color: "#4a4a52" }}>You pick when you join. Switch every month.</p>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <h2 className="font-black mb-4" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", lineHeight: 1.15, letterSpacing: "-0.025em", color: "#fff" }}>
              Your health doesn&apos;t need<br />
              a bigger routine.<br />
              <span style={{ color: "#25d366" }}>It needs a better habit.</span>
            </h2>
            <p className="text-base mb-8" style={{ color: "#a1a1aa" }}>One tiny healthy habit. Every morning. On WhatsApp.<br />Start for ₹1. Decide after you feel the difference.</p>
            <CTA label="Yes, Start My Trial for ₹1 →" sub="7 days for ₹1 · Then ₹99/month · Cancel before Day 7" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          11. FAQ
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#111" }} className="px-5 py-14">
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>FAQ</p>
          <h2 className="text-center font-bold mb-8" style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", lineHeight: 1.2, color: "#fff" }}>
            Every question answered
          </h2>
          <div className="space-y-2">
            {[
              { q: "What exactly is a 'tiny healthy habit'?", a: "One specific, science-backed action that takes under 5 minutes and is tied to your monthly health theme. Examples: 5 minutes of morning sunlight (Energy), one spoon of plain curd at lunch (Gut Health), phone face-down 1 hour before bed (Sleep), 10 slow breaths before a meal (Stress). Small. Specific. Explained every morning." },
              { q: "What happens on Day 1 exactly?", a: "The morning after you pay, at 7 AM, you get your first tiny healthy habit in your WhatsApp. It has the habit, the reason it works, and instructions. You do it. You reply DONE. That's it. Your streak starts." },
              { q: "What happens after 7 days?", a: "If you don't cancel before Day 7, your subscription continues at ₹99/month. You get a reminder on Day 6 so you're never caught off guard. Cancel any time, no explanation needed." },
              { q: "Do I need to download anything?", a: "No. Everything is on WhatsApp. You already have it. Nothing to install, no passwords, no extra apps." },
              { q: "What if I miss a day?", a: "Nothing bad happens. One missed day doesn't break the habit or the streak logic. You get a gentle evening nudge if you haven't replied DONE by 8 PM. We're building something long-term — not punishing you for being human." },
              { q: "Can I change my theme each month?", a: "Yes. At the start of each month, you choose the next theme. Some people cycle through all 8. Some repeat the same one. It's yours to design." },
              { q: "I've failed at habits before. Why is this different?", a: "Because the habit arrives in your WhatsApp automatically — you don't have to remember. And it's small enough that even on your worst, most exhausted day, you can still do it. The system does the work. You just reply DONE." },
              { q: "Who is this for?", a: "Anyone who wants to be healthier but has a full life. Working professionals, parents, students — people who genuinely want to take care of their health but can't commit to big routines. If 5 minutes a day is something you can spare, this is for you." },
            ].map(({ q, a }) => (
              <FAQ key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          12. FINAL CLOSE
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(160deg,#f0fdf4 0%,#faf8f3 100%)", borderTop: "1px solid #e2dfd6", position: "relative", overflow: "hidden" }} className="px-5 py-16">
        <div style={{ position: "absolute", top: -80, right: -60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,211,102,0.1) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(29,168,81,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />

        <div className="max-w-xl mx-auto text-center" style={{ position: "relative" }}>
          <p className="text-5xl mb-6">🌱</p>
          <h2 className="font-black mb-4" style={{ fontSize: "clamp(1.7rem, 4.5vw, 2.8rem)", lineHeight: 1.08, letterSpacing: "-0.03em" }}>
            One tiny healthy habit.<br />
            Tomorrow morning.<br />
            <span style={{ color: "#1da851" }}>On your WhatsApp.</span>
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: "#71717a", maxWidth: "380px", margin: "0 auto 2.5rem" }}>
            30 days from now, you could be the person who says<br />
            <em>&ldquo;I&apos;m actually taking care of myself.&rdquo;</em><br /><br />
            Or you could keep planning to start next Monday.<br /><br />
            <strong style={{ color: "#18181b" }}>₹1 decides which one.</strong>
          </p>
          <CTA label="Start My 7-Day Trial — ₹1 →" sub="7 days for ₹1 · Then ₹99/month · Cancel anytime before Day 7" />
          <p className="text-xs mt-6" style={{ color: "#a1a1aa" }}>
            Questions?{" "}
            <a href="https://wa.me/918956146485?text=Hi%2C+I+have+a+question+about+the+Daily+Upgrade+Club" className="underline" style={{ color: "#25d366" }}>
              Chat with Rohan on WhatsApp
            </a>
          </p>
        </div>
      </section>

      <footer className="px-5 py-8 text-center" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p className="text-xs" style={{ color: "#52525b" }}>
          © {new Date().getFullYear()} Daily Upgrade Club ·{" "}
          <a href="https://www.highperformanceclub.co" className="underline" style={{ color: "#3f3f46" }}>highperformanceclub.co</a>
        </p>
        <p className="text-xs mt-1" style={{ color: "#3f3f46" }}>7-day trial ₹1 · Then ₹99/month · Cancel anytime</p>
      </footer>
    </div>
  );
}
