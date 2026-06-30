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
    <svg width="16" height="16" viewBox="0 0 20 20" fill="#f59e0b" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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
        className="inline-flex items-center justify-center gap-3 w-full max-w-sm px-8 py-4 rounded-full font-bold text-white text-base"
        style={{ background: "linear-gradient(135deg,#1da851 0%,#25d366 100%)", boxShadow: "0 4px 24px rgba(37,211,102,0.35)" }}>
        <WAIcon size={20} />
        {label}
      </a>
      {sub && <p className="text-xs text-center" style={{ color: dark ? "#71717a" : "#71717a" }}>{sub}</p>}
    </div>
  );
}

// ── WhatsApp message mockup ───────────────────────────────────────────────────
function WAMessage({ text, time = "7:01 AM" }: { text: string; time?: string }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-xs rounded-2xl rounded-tl-sm px-4 py-3" style={{ background: "#ffffff", boxShadow: "0 1px 4px rgba(0,0,0,0.12)" }}>
        <p className="text-sm leading-relaxed" style={{ color: "#18181b" }}>{text}</p>
        <p className="text-right text-xs mt-1" style={{ color: "#a1a1aa" }}>{time} ✓✓</p>
      </div>
    </div>
  );
}

function WAReply({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-xs rounded-2xl rounded-tr-sm px-4 py-3" style={{ background: "#dcf8c6" }}>
        <p className="text-sm leading-relaxed" style={{ color: "#18181b" }}>{text}</p>
        <p className="text-right text-xs mt-1" style={{ color: "#71717a" }}>7:09 AM ✓✓</p>
      </div>
    </div>
  );
}

// ── FAQ accordion ─────────────────────────────────────────────────────────────
function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-sm"
        style={{ background: "rgba(255,255,255,0.04)", color: "#e4e4e7" }}>
        {q}
        <span className="flex-shrink-0 text-xl font-light" style={{ color: "#25d366", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
      </button>
      {open && <div className="px-5 pb-4 text-sm leading-relaxed" style={{ background: "rgba(255,255,255,0.02)", color: "#a1a1aa" }}>{a}</div>}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DailyUpgradeClubPage() {
  return (
    <div style={{ background: "#faf8f3", minHeight: "100vh", fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,sans-serif", color: "#18181b" }}>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 1 — HOOK
          Pattern interrupt for cold traffic. One sharp pain statement.
          Brunson: Hook must stop the scroll, create curiosity, promise a shift.
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(160deg,#f0fdf4 0%,#faf8f3 100%)", borderBottom: "1px solid #e2dfd6" }}>
        <div className="max-w-xl mx-auto px-5 pt-12 pb-14 text-center">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-8 text-xs font-bold uppercase tracking-widest"
            style={{ background: "rgba(37,211,102,0.1)", color: "#1da851", border: "1px solid rgba(37,211,102,0.2)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: "#25d366" }} />
            Daily Upgrade Club · WhatsApp
          </div>

          {/* THE HOOK — specific, painful, curiosity-gap */}
          <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.6rem)", lineHeight: 1.07, fontWeight: 900, letterSpacing: "-0.035em", color: "#18181b" }}>
            You already know<br />
            <span style={{ color: "#1da851" }}>what a healthy life</span><br />
            looks like.<br />
            <span style={{ fontStyle: "italic", fontWeight: 400, color: "#71717a", fontSize: "0.82em" }}>So why is it still not happening?</span>
          </h1>

          <div className="w-10 h-1 rounded-full mx-auto my-8" style={{ background: "#25d366" }} />

          {/* SUB-HOOK — the new opportunity teased */}
          <p className="text-lg leading-relaxed mb-10" style={{ color: "#4a4a52", maxWidth: "460px", margin: "0 auto 2.5rem" }}>
            The problem isn&apos;t knowledge. It&apos;s not willpower either.<br /><br />
            It&apos;s that <strong style={{ color: "#18181b" }}>every healthy habit you&apos;ve tried demands too much</strong> — too much time, too much change, too much from a person who already has a full life.<br /><br />
            What if you only had to do <strong style={{ color: "#18181b" }}>one tiny healthy habit today</strong>? One. Under 5 minutes. And it was already waiting for you when you woke up?
          </p>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex -space-x-2">
              {["/avatars/men/man-1.jpg","/avatars/women/woman-1.jpg","/avatars/women/woman-3.avif"].map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={src} alt="" className="w-8 h-8 rounded-full object-cover" style={{ border: "2px solid #fff" }} />
              ))}
            </div>
            <div className="text-left">
              <div className="flex gap-0.5 mb-0.5">{[1,2,3,4,5].map(i=><Star key={i}/>)}</div>
              <p className="text-xs" style={{ color: "#71717a" }}>400+ members building daily</p>
            </div>
          </div>

          <CTA label="Start My 7-Day Trial — ₹1 →" sub="7 days for ₹1 · Then ₹99/month · Cancel anytime" />

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {["No app to download","Arrives on WhatsApp","Takes under 5 min","Works for busy people"].map(t=>(
              <span key={t} className="text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5" style={{ background: "#fff", color: "#4a4a52", border: "1px solid #e2dfd6" }}>
                <CheckIcon />{t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 2 — THE BIG DOMINO
          Brunson: Install ONE belief that makes all other objections irrelevant.
          Belief: The old vehicle (discipline, big routines, apps) is broken.
          The new vehicle: one tiny healthy habit, delivered daily on WhatsApp.
      ════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-xl mx-auto px-5 py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>Why Everything Else Has Failed You</p>
        <h2 className="text-center font-bold mb-8" style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", lineHeight: 1.12, letterSpacing: "-0.025em" }}>
          The routine wasn&apos;t the problem.<br />
          <span style={{ color: "#1da851" }}>The size of it was.</span>
        </h2>

        <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4a4a52" }}>
          <p>Think about the last time you committed to a healthy routine. Maybe you planned to wake up earlier, drink more water, exercise, meditate, eat better — all at once.</p>
          <p>It worked for a few days. Then one busy morning hit. You missed it. And because you missed one day, you quietly gave up the whole thing.</p>
          <p>This is not a willpower problem. <strong style={{ color: "#18181b" }}>It is a design problem.</strong></p>

          {/* The epiphany callout */}
          <div className="rounded-2xl p-5 my-6" style={{ background: "rgba(37,211,102,0.07)", border: "1px solid rgba(37,211,102,0.18)" }}>
            <p className="text-base font-semibold leading-relaxed" style={{ color: "#18181b" }}>
              Research from BJ Fogg (Stanford Behavior Lab) shows that <em>tiny habits</em> — actions small enough to take even on your worst day — create more lasting change than big habits attempted occasionally.
            </p>
            <p className="text-sm mt-2" style={{ color: "#71717a" }}>A 1% improvement, compounded daily, makes you 37× better in one year.</p>
          </div>

          <p>The Daily Upgrade Club is built on this. <strong style={{ color: "#18181b" }}>One tiny healthy habit. Every morning. Directly on WhatsApp.</strong> Small enough to do in 5 minutes. Specific enough to create real, measurable change in 30 days.</p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 3 — NEW OPPORTUNITY (not improvement, a new vehicle)
          Brunson: Don't improve the old thing. Show them a NEW opportunity.
          Old: apps, courses, routines, gyms, willpower.
          New: One tiny healthy habit on WhatsApp every morning.
          Make them feel the contrast.
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#18181b" }} className="px-5 py-14">
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>This Is Not What You&apos;ve Tried Before</p>
          <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", lineHeight: 1.12, letterSpacing: "-0.025em", color: "#fff" }}>
            The old way vs.<br />
            <span style={{ color: "#25d366" }}>the Daily Upgrade Club</span>
          </h2>

          <div className="grid grid-cols-2 gap-3 mb-10">
            {/* Old way */}
            <div className="rounded-2xl p-5" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#f87171" }}>The Old Way</p>
              <div className="space-y-3">
                {[
                  "Download an app, forget it exists",
                  "Buy a course, watch 2 videos",
                  "Start a 5AM routine, quit by Thursday",
                  "Gym membership collecting dust",
                  "Motivation peaks, then crashes",
                  "Doing too many things, mastering nothing",
                ].map(t => (
                  <div key={t} className="flex items-start gap-2">
                    <span className="text-sm flex-shrink-0 mt-0.5" style={{ color: "#f87171" }}>✕</span>
                    <p className="text-xs leading-relaxed" style={{ color: "#a1a1aa" }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* New way */}
            <div className="rounded-2xl p-5" style={{ background: "rgba(37,211,102,0.06)", border: "1px solid rgba(37,211,102,0.2)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#25d366" }}>Daily Upgrade Club</p>
              <div className="space-y-3">
                {[
                  "Habit arrives on WhatsApp at 7 AM",
                  "Takes under 5 minutes",
                  "One theme. One month. Measurable results.",
                  "Works even on your busiest day",
                  "System replaces willpower",
                  "Go deep on one area, then the next",
                ].map(t => (
                  <div key={t} className="flex items-start gap-2">
                    <span className="text-sm flex-shrink-0 mt-0.5" style={{ color: "#25d366" }}>✓</span>
                    <p className="text-xs leading-relaxed" style={{ color: "#e4e4e7" }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Show what the product actually IS — live WhatsApp demo */}
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>What Actually Happens Every Morning</p>
          <div className="rounded-2xl p-5 mb-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs" style={{ background: "#1da851", color: "#fff" }}>DU</div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#e4e4e7" }}>Daily Upgrade Club</p>
                <p className="text-xs" style={{ color: "#71717a" }}>WhatsApp · 7:01 AM</p>
              </div>
            </div>
            <div className="space-y-3">
              <WAMessage text="🌅 Good morning, Rahul! Today's tiny healthy habit:

💧 Drink one full glass of water RIGHT NOW — before your phone, before chai, before anything.

Why it matters: Your body just went 7+ hours without water. This one act boosts focus, digestion, and energy in under 30 seconds.

That's it. One glass. You're done for today.

Reply DONE when you've had it 💪" />
              <WAReply text="DONE ✅" />
              <WAMessage text="🔥 Day 4 streak! You're building something real. See you tomorrow." time="7:10 AM" />
            </div>
          </div>
          <p className="text-center text-xs" style={{ color: "#52525b" }}>This is what shows up in your WhatsApp every single morning.</p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 4 — WHAT'S INSIDE (the full offer, clearly explained)
          Product clarity — what do members actually get?
          Brunson: Make the offer so clear the customer can explain it to a friend.
      ════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-xl mx-auto px-5 py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>What You Get</p>
        <h2 className="text-center font-bold mb-3" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", lineHeight: 1.12, letterSpacing: "-0.025em" }}>
          Everything in your Daily Upgrade Club
        </h2>
        <p className="text-center text-base mb-10" style={{ color: "#71717a" }}>One month focused on one healthy area of your life.</p>

        <div className="space-y-3">
          {[
            {
              emoji: "📲",
              title: "One tiny healthy habit every morning — on WhatsApp",
              desc: "At 7 AM, you get one habit. Scientifically designed to take under 5 minutes. No planning. No apps to open. It just arrives. You do it. You reply DONE. That's it.",
              value: "₹2,999"
            },
            {
              emoji: "🎯",
              title: "One focused monthly theme",
              desc: "Each month goes deep on one area — Sleep, Energy, Focus, Gut Health, Stress, Fitness, or Hydration. You choose. You're not spreading yourself thin across 10 goals. You're mastering one.",
              value: "₹1,799"
            },
            {
              emoji: "📊",
              title: "Weekly health scorecard",
              desc: "Every Sunday, you get your streak, consistency percentage, and how this month's theme is shifting your health numbers. You see progress. That makes you keep going.",
              value: "₹999"
            },
            {
              emoji: "👥",
              title: "Private WhatsApp accountability group",
              desc: "A community of people doing the same tiny healthy habit as you — at the same time. When you see others posting DONE, you post DONE. Accountability without pressure.",
              value: "₹999"
            },
            {
              emoji: "🗓️",
              title: "Monthly 30-habit calendar + PDF guide",
              desc: "At the start of each month, you get all 30 habits in advance. You see the journey. You know exactly what's coming. No surprises, just a clear path.",
              value: "₹499"
            },
            {
              emoji: "🏆",
              title: "Full healthy habit vault (90+ habits)",
              desc: "Every habit from every month — yours forever. Revisit habits from your Sleep month during your Energy month. Build on what already worked.",
              value: "₹999"
            },
            {
              emoji: "📩",
              title: "Weekly wellness newsletter",
              desc: "Every week, one simple, practical insight on sleep, food, energy, or focus — backed by research, written in plain language. No fluff.",
              value: "₹199"
            },
          ].map(({ emoji, title, desc, value }) => (
            <div key={title} className="rounded-2xl p-5 bg-white" style={{ border: "1px solid #e2dfd6", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{emoji}</span>
                  <p className="font-bold text-sm leading-snug" style={{ color: "#18181b" }}>{title}</p>
                </div>
                <span className="text-xs font-bold flex-shrink-0 px-2 py-1 rounded-full" style={{ background: "rgba(37,211,102,0.1)", color: "#1da851" }}>{value}</span>
              </div>
              <p className="text-sm leading-relaxed pl-9" style={{ color: "#71717a" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 5 — BREAK 3 FALSE BELIEFS
          Brunson Perfect Webinar: destroy vehicle, internal, external beliefs.
          Vehicle: "WhatsApp habits won't create real health change"
          Internal: "I've tried before, I'm not consistent enough"
          External: "I'm too busy, I don't have time"
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#f0fdf4", borderTop: "1px solid #e2dfd6", borderBottom: "1px solid #e2dfd6" }} className="px-5 py-14">
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>The 3 Reasons You&apos;re Hesitating</p>
          <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", lineHeight: 1.12, letterSpacing: "-0.025em" }}>
            And why none of them<br />
            <span style={{ color: "#1da851" }}>should stop you today</span>
          </h2>

          <div className="space-y-5">

            {/* Belief 1 — Vehicle */}
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e2dfd6", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="px-5 py-4" style={{ background: "#fff7f7", borderBottom: "1px solid #fecaca" }}>
                <p className="text-sm font-bold" style={{ color: "#dc2626" }}>❌ &ldquo;One tiny habit a day can&apos;t actually change my health.&rdquo;</p>
              </div>
              <div className="px-5 py-4 bg-white">
                <p className="text-sm leading-relaxed" style={{ color: "#4a4a52" }}>
                  <strong style={{ color: "#18181b" }}>Here&apos;s the truth:</strong> A single habit done for 30 consecutive days rewires your brain through neuroplasticity. Members who started with just &ldquo;drink one glass of water at 7 AM&rdquo; ended the month sleeping better, craving healthier food, and exercising more — without being told to. One habit pulls the rest of your health forward like a thread.
                </p>
              </div>
            </div>

            {/* Belief 2 — Internal */}
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e2dfd6", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="px-5 py-4" style={{ background: "#fff7f7", borderBottom: "1px solid #fecaca" }}>
                <p className="text-sm font-bold" style={{ color: "#dc2626" }}>❌ &ldquo;I&apos;ve tried this before. I always quit. I&apos;m just not consistent.&rdquo;</p>
              </div>
              <div className="px-5 py-4 bg-white">
                <p className="text-sm leading-relaxed" style={{ color: "#4a4a52" }}>
                  <strong style={{ color: "#18181b" }}>You quit because the habit was too big, not because you&apos;re broken.</strong> When a habit takes 5 minutes and shows up in your WhatsApp without you having to remember it — consistency becomes effortless. You can&apos;t fail something this small. Our members average a 78% completion rate in month one. That&apos;s people who called themselves &ldquo;not consistent&rdquo; before joining.
                </p>
              </div>
            </div>

            {/* Belief 3 — External */}
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e2dfd6", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="px-5 py-4" style={{ background: "#fff7f7", borderBottom: "1px solid #fecaca" }}>
                <p className="text-sm font-bold" style={{ color: "#dc2626" }}>❌ &ldquo;₹99/month feels risky — what if I pay and don&apos;t use it?&rdquo;</p>
              </div>
              <div className="px-5 py-4 bg-white">
                <p className="text-sm leading-relaxed" style={{ color: "#4a4a52" }}>
                  <strong style={{ color: "#18181b" }}>This is exactly why we give you 7 full days for ₹1.</strong> You don&apos;t pay ₹99 until you&apos;ve experienced 7 mornings of daily healthy habits delivered to your WhatsApp. If after 7 days it hasn&apos;t changed your morning — cancel. No questions asked. You risk ₹1. We risk everything.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 6 — "IF ALL THIS DID WAS" × 3 (Brunson Stack Close)
          Used before the price reveal to anchor the value.
          Each one answers a different motivation: energy, consistency, identity.
      ════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-xl mx-auto px-5 py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>Think About This Honestly</p>
        <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", lineHeight: 1.12, letterSpacing: "-0.025em" }}>
          Any one of these alone<br />
          <span style={{ fontStyle: "italic", fontWeight: 400, color: "#71717a" }}>would be worth it.</span>
        </h2>

        <div className="space-y-4">
          {[
            {
              q: "If all this did was",
              bold: "give you the energy to get through your day without needing caffeine every 2 hours",
              suffix: "— would 7 days for ₹1 be worth finding out?"
            },
            {
              q: "If all this did was",
              bold: "make you the kind of person who actually follows through on their health — not just in January, but every month",
              suffix: "— would ₹99/month be worth it?"
            },
            {
              q: "If all this did was",
              bold: "help you wake up in 6 months and say 'I'm actually taking care of myself' — and mean it",
              suffix: "— what would that be worth to you?"
            },
          ].map(({ q, bold, suffix }, i) => (
            <div key={i} className="rounded-2xl px-6 py-5 bg-white" style={{ border: "1px solid #e2dfd6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <p className="text-base leading-relaxed" style={{ color: "#4a4a52" }}>
                <span style={{ color: "#a1a1aa" }}>{q} </span>
                <strong style={{ color: "#18181b" }}>{bold}</strong>
                <span style={{ color: "#71717a" }}> {suffix}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 7 — THE STACK + PRICE REVEAL
          Brunson: Show total value, then cascade down to the real price.
          "Not ₹9,991 → not ₹4,999 → not ₹999 → ₹1 for 7 days"
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#18181b" }} className="px-5 py-14">
        <div className="max-w-md mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>Everything You Get</p>
          <h2 className="text-center font-bold mb-8" style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", lineHeight: 1.15, letterSpacing: "-0.025em", color: "#fff" }}>
            Here&apos;s what it&apos;s all worth.<br />
            <span style={{ color: "#25d366" }}>And what you actually pay.</span>
          </h2>

          {/* Stack */}
          <div className="rounded-2xl overflow-hidden mb-6" style={{ background: "#1c1c1e", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="divide-y divide-white/[0.07]">
              {[
                ["📲", "Daily healthy habit on WhatsApp (30/month)", "₹2,999"],
                ["🎯", "Monthly theme (Sleep / Energy / Focus / Gut…)", "₹1,799"],
                ["📊", "Weekly health scorecard", "₹999"],
                ["👥", "Private WhatsApp accountability group", "₹999"],
                ["🗓️", "Monthly 30-habit calendar + PDF guide", "₹499"],
                ["🏆", "Full habit vault (90+ healthy habits)", "₹999"],
                ["📩", "Weekly wellness newsletter", "₹199"],
              ].map(([emoji, name, value]) => (
                <div key={name as string} className="flex items-center justify-between gap-3 px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{emoji}</span>
                    <span className="text-sm" style={{ color: "#a1a1aa" }}>{name}</span>
                  </div>
                  <span className="text-sm font-semibold flex-shrink-0" style={{ color: "#52525b" }}>{value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-3 px-5 py-4 font-bold">
                <span style={{ color: "#fff" }}>Total value per month</span>
                <span style={{ color: "#25d366" }}>₹8,493</span>
              </div>
            </div>
          </div>

          {/* Cascade */}
          <div className="text-center space-y-2 mb-8">
            <p className="text-base" style={{ color: "#a1a1aa" }}>We&apos;re not going to charge you <strong style={{ color: "#fff" }}>₹8,493.</strong></p>
            <p className="text-base" style={{ color: "#a1a1aa" }}>We&apos;re not going to charge you <strong style={{ color: "#fff" }}>₹4,999.</strong></p>
            <p className="text-base" style={{ color: "#a1a1aa" }}>We&apos;re not going to charge you <strong style={{ color: "#fff" }}>₹999.</strong></p>
            <p className="text-base" style={{ color: "#a1a1aa" }}>We&apos;re not even going to charge you <strong style={{ color: "#fff" }}>₹299.</strong></p>
          </div>

          {/* Mission note */}
          <div className="rounded-2xl px-5 py-4 mb-8 text-sm leading-relaxed text-center" style={{ background: "rgba(37,211,102,0.07)", border: "1px solid rgba(37,211,102,0.15)", color: "#a1a1aa" }}>
            We made this affordable because the people who need this most are the ones who can&apos;t justify spending ₹5,000 on a gym they won&apos;t use. <em>This works. And it should be for everyone.</em>
          </div>

          {/* PRICE REVEAL */}
          <div className="rounded-2xl p-7 text-center" style={{ background: "linear-gradient(135deg,rgba(37,211,102,0.12) 0%,rgba(29,168,81,0.08) 100%)", border: "1px solid rgba(37,211,102,0.25)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#25d366" }}>Your Investment</p>

            {/* Trial price */}
            <div className="mb-1">
              <span style={{ fontSize: "5.5rem", lineHeight: 1, fontWeight: 900, letterSpacing: "-0.04em", color: "#25d366" }}>₹1</span>
            </div>
            <p className="text-base font-bold mb-1" style={{ color: "#fff" }}>for your first 7 days</p>
            <p className="text-sm mb-6" style={{ color: "#71717a" }}>Then ₹99/month — ₹3 per day. Less than chai.</p>

            <CTA label="Start My 7-Day Trial → ₹1" sub="Cancel before day 7. Pay nothing more." dark />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 8 — HOW IT WORKS (concrete, specific steps)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-xl mx-auto px-5 py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>How It Works</p>
        <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", lineHeight: 1.12, letterSpacing: "-0.025em" }}>
          From payment to your first<br />
          <span style={{ color: "#1da851" }}>habit in under 3 minutes.</span>
        </h2>
        <div className="space-y-4">
          {[
            { step: "1", title: "Choose your monthly health theme", desc: "Sleep · Energy · Focus · Gut Health · Stress · Fitness · Hydration. Pick the one area of your health that matters most right now." },
            { step: "2", title: "Pay ₹1 to start your 7-day trial", desc: "That's it. Once you pay, you're added to the Daily Upgrade Club WhatsApp community within minutes." },
            { step: "3", title: "Wake up to your habit at 7 AM tomorrow", desc: "One tiny healthy habit arrives in your WhatsApp. You read it. You do it in under 5 minutes. You reply DONE. Your streak starts." },
            { step: "4", title: "See your results in 7 days", desc: "After 7 mornings, check how you feel. More energy? Better sleep? Sharper focus? If yes — continue at ₹99/month. If not — cancel before day 7, pay nothing." },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-4 rounded-2xl p-5 bg-white" style={{ border: "1px solid #e2dfd6", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
              <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center font-black text-sm text-white" style={{ background: "#1da851" }}>
                {step}
              </div>
              <div>
                <p className="font-bold mb-1 text-sm" style={{ color: "#18181b" }}>{title}</p>
                <p className="text-sm leading-relaxed" style={{ color: "#71717a" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 9 — SOCIAL PROOF (specific, believable, measurable)
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#f0fdf4", borderTop: "1px solid #e2dfd6", borderBottom: "1px solid #e2dfd6" }} className="px-5 py-14">
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>What Members Say</p>
          <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", lineHeight: 1.15, letterSpacing: "-0.025em" }}>
            Real people. Tiny habits.<br />
            <span style={{ color: "#1da851" }}>Measurable results.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "Karan M.", city: "Pune", theme: "Energy month", text: "By Day 5, I stopped needing that 3 PM coffee. I haven't had one in 3 weeks. One tiny habit literally changed my afternoon energy.", avatar: "/avatars/men/man-1.jpg" },
              { name: "Priya T.", city: "Bengaluru", theme: "Sleep month", text: "I've tried sleep hygiene apps, podcasts, everything. The WhatsApp habit took 4 minutes and I'm sleeping 45 minutes more per night. I didn't change anything else.", avatar: "/avatars/women/woman-1.jpg" },
              { name: "Sneha R.", city: "Mumbai", theme: "Focus month", text: "I was skeptical about something this small. Day 12 and I've already finished work I'd been avoiding for a month. The focus habit bled into everything.", avatar: "/avatars/women/woman-3.avif" },
              { name: "Amit D.", city: "Delhi", theme: "Gut Health month", text: "My digestion was a mess. The daily gut health habits were embarrassingly simple. But 3 weeks in — no bloating. My wife noticed before I did.", avatar: "/avatars/men/man-1.jpg" },
            ].map(({ name, city, theme, text, avatar }) => (
              <div key={name} className="rounded-2xl p-5 bg-white" style={{ border: "1px solid #e2dfd6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div className="flex gap-0.5 mb-1">{[1,2,3,4,5].map(i=><Star key={i}/>)}</div>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium inline-block mb-3" style={{ background: "rgba(37,211,102,0.1)", color: "#1da851" }}>{theme}</span>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#4a4a52" }}>&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={avatar} alt={name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-bold" style={{ color: "#18181b" }}>{name}</p>
                    <p className="text-xs" style={{ color: "#71717a" }}>{city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 10 — GUARANTEE + URGENCY + FINAL CTA
          Brunson: Remove all risk. Create reason to act now.
      ════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-xl mx-auto px-5 py-14">
        {/* Guarantee */}
        <div className="rounded-2xl p-6 mb-8 text-center" style={{ background: "#fff", border: "2px solid #e2dfd6", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <div className="text-5xl mb-4">🛡️</div>
          <h3 className="font-bold text-lg mb-3" style={{ color: "#18181b" }}>7-Day Trial for ₹1. Zero Risk.</h3>
          <p className="text-sm leading-relaxed" style={{ color: "#71717a" }}>
            You get 7 full days — 7 tiny healthy habits delivered to your WhatsApp, a weekly scorecard, and access to the full community. If after 7 mornings you don&apos;t feel a difference, cancel before Day 7 and you will never be charged again.<br /><br />
            <strong style={{ color: "#18181b" }}>You risk ₹1. We risk our entire reputation.</strong>
          </p>
        </div>

        {/* Monthly themes — what to choose */}
        <div className="rounded-2xl p-5 mb-8" style={{ background: "#18181b" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#25d366" }}>Choose Your First Monthly Theme</p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { emoji: "😴", label: "Sleep" },
              { emoji: "⚡", label: "Energy" },
              { emoji: "🧠", label: "Focus" },
              { emoji: "🫀", label: "Gut Health" },
              { emoji: "🧘", label: "Stress" },
              { emoji: "💪", label: "Fitness" },
              { emoji: "💧", label: "Hydration" },
              { emoji: "❤️", label: "Heart Health" },
            ].map(({ emoji, label }) => (
              <div key={label} className="rounded-xl p-2 text-center" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="text-xl mb-1">{emoji}</div>
                <div className="text-xs" style={{ color: "#a1a1aa" }}>{label}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-center mt-3" style={{ color: "#52525b" }}>You pick when you join. Switch every month.</p>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h2 className="font-bold mb-4" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", lineHeight: 1.15, letterSpacing: "-0.025em" }}>
            Your health doesn&apos;t need<br />
            a bigger routine.<br />
            <span style={{ color: "#1da851" }}>It needs a better habit.</span>
          </h2>
          <p className="text-base mb-8" style={{ color: "#71717a" }}>One tiny healthy habit. Every morning. On WhatsApp.<br />Start for ₹1 and decide after you feel the difference.</p>
          <CTA label="Yes, Start My Trial for ₹1 →" sub="7 days for ₹1 · Then ₹99/month · Cancel before Day 7" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 11 — FAQ
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#18181b" }} className="px-5 py-14">
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>FAQ</p>
          <h2 className="text-center font-bold mb-8" style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", lineHeight: 1.2, color: "#fff" }}>
            Quick answers
          </h2>
          <div className="space-y-3">
            {[
              { q: "What exactly is a 'tiny healthy habit'?", a: "It's one specific, science-backed health action that takes under 5 minutes. Examples: drink one glass of water before your phone, do 10 slow breaths before a meal, write one thing you're grateful for, take a 5-minute walk after lunch. Small, specific, and tied to your monthly health theme." },
              { q: "What happens after 7 days?", a: "If you don't cancel before Day 7, your subscription continues at ₹99/month automatically. You get a reminder on Day 6 so you're never caught off-guard." },
              { q: "Do I need to download anything?", a: "No. Everything arrives on WhatsApp. You already have it. Nothing to install, no apps to open, no passwords to remember." },
              { q: "What if I miss a day?", a: "Nothing bad happens. You get a gentle evening nudge if you haven't replied DONE. One missed day doesn't reset your streak. We're building a long-term relationship with your health, not punishing you for being human." },
              { q: "Can I change my monthly theme?", a: "Yes. At the start of each new month, you can pick a completely different theme. Some people cycle through all 8. Some do Sleep twice. It's yours to design." },
              { q: "What if ₹99/month doesn't feel worth it after my trial?", a: "Cancel before Day 7 and pay nothing more. Cancel after Day 7 and your access continues until the end of the month you paid for. No arguments, no hassle." },
              { q: "I've tried habits before and always quit. Why will this be different?", a: "Because this time, the habit is small enough that you can't fail it. And it shows up in your WhatsApp — you don't have to remember to do it. The system does the work. You just reply DONE." },
            ].map(({ q, a }) => (
              <FAQ key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 12 — FINAL CLOSE
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(160deg,#f0fdf4 0%,#faf8f3 100%)", borderTop: "1px solid #e2dfd6" }} className="px-5 py-16">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-4xl mb-6">🌱</p>
          <h2 className="font-bold mb-4" style={{ fontSize: "clamp(1.7rem, 4.5vw, 2.8rem)", lineHeight: 1.08, letterSpacing: "-0.03em" }}>
            One tiny healthy habit.<br />
            Tomorrow morning.<br />
            <span style={{ color: "#1da851" }}>On your WhatsApp.</span>
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: "#71717a", maxWidth: "380px", margin: "0 auto 2.5rem" }}>
            30 days from now, you could be the person who says<br />
            <em>&ldquo;I&apos;m actually healthy now.&rdquo;</em><br /><br />
            Or you could keep planning to start.<br /><br />
            <strong style={{ color: "#18181b" }}>₹1 decides which one.</strong>
          </p>
          <CTA label="Start My 7-Day Trial — ₹1 →" sub="7 days for ₹1 · Then ₹99/month · Cancel anytime before Day 7" />
          <p className="text-xs mt-6" style={{ color: "#a1a1aa" }}>
            Questions?{" "}
            <a href="https://wa.me/918956146485?text=Hi%2C+I+have+a+question+about+the+Daily+Upgrade+Club" className="underline" style={{ color: "#25d366" }}>
              Chat with us on WhatsApp
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-5 py-8 text-center" style={{ background: "#111", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p className="text-xs" style={{ color: "#52525b" }}>
          © {new Date().getFullYear()} Daily Upgrade Club ·{" "}
          <a href="https://www.highperformanceclub.co" className="underline" style={{ color: "#3f3f46" }}>highperformanceclub.co</a>
        </p>
        <p className="text-xs mt-1" style={{ color: "#3f3f46" }}>7-day trial ₹1 · Then ₹99/month · Cancel anytime</p>
      </footer>

    </div>
  );
}
