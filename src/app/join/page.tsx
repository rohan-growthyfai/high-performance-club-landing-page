"use client";
import type { Metadata } from "next";

// ─── Razorpay CTA link ────────────────────────────────────────────────────────
const JOIN_URL = "https://rzp.io/l/daily-upgrade-club";

// ─── WhatsApp icon SVG ────────────────────────────────────────────────────────
function WAIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#25d366" />
      <path
        d="M22.94 9.06A9.75 9.75 0 0 0 16 6.25C10.89 6.25 6.75 10.39 6.75 15.5c0 1.63.43 3.21 1.24 4.62L6.6 25.4l5.42-1.42a9.75 9.75 0 0 0 4.97 1.37c5.11 0 9.25-4.14 9.25-9.25a9.2 9.2 0 0 0-3.3-7.04Zm-6.94 14.2a8.1 8.1 0 0 1-4.12-1.12l-.3-.17-3.06.8.82-2.98-.2-.31A8.1 8.1 0 0 1 7.9 15.5c0-4.47 3.63-8.1 8.1-8.1a8.1 8.1 0 0 1 8.1 8.1c0 4.47-3.63 8.1-8.1 8.1Zm4.44-6.07c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06a6.57 6.57 0 0 1-1.93-1.19 7.24 7.24 0 0 1-1.34-1.66c-.14-.24-.01-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"
        fill="#fff"
      />
    </svg>
  );
}

// ─── Star ─────────────────────────────────────────────────────────────────────
function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="#f59e0b" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function Stars() {
  return <span className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} />)}</span>;
}

// ─── CTA Button ───────────────────────────────────────────────────────────────
function CTAButton({ label = "Join Daily Upgrade Club — ₹99/month", sublabel }: { label?: string; sublabel?: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <a
        href={JOIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-full text-lg font-bold w-full max-w-md justify-center"
        style={{ fontSize: "1.05rem" }}
      >
        <WAIcon size={22} />
        {label}
      </a>
      {sublabel && (
        <p className="text-sm" style={{ color: "#71717a" }}>{sublabel}</p>
      )}
    </div>
  );
}

// ─── Section divider ──────────────────────────────────────────────────────────
function Divider() {
  return <div className="w-12 h-1 rounded-full mx-auto my-6" style={{ background: "#25d366" }} />;
}

// ─── Feature card ─────────────────────────────────────────────────────────────
function FeatureCard({ emoji, title, desc, value }: { emoji: string; title: string; desc: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 border flex flex-col gap-3" style={{ borderColor: "#e2dfd6", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{emoji}</span>
          <span className="font-bold text-[#18181b] leading-tight">{title}</span>
        </div>
        <span className="text-xs font-bold px-2 py-1 rounded-full flex-shrink-0" style={{ background: "rgba(37,211,102,0.1)", color: "#1da851" }}>₹{value}</span>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "#4a4a52" }}>{desc}</p>
    </div>
  );
}

// ─── False belief breaker ─────────────────────────────────────────────────────
function BeliefBreaker({ belief, truth }: { belief: string; truth: string }) {
  return (
    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#e2dfd6" }}>
      <div className="px-5 py-3 flex items-start gap-3" style={{ background: "#fdf3f3" }}>
        <span className="text-lg mt-0.5">❌</span>
        <p className="text-sm font-medium" style={{ color: "#7f1d1d" }}>&ldquo;{belief}&rdquo;</p>
      </div>
      <div className="px-5 py-3 flex items-start gap-3 bg-white">
        <span className="text-lg mt-0.5">✅</span>
        <p className="text-sm leading-relaxed" style={{ color: "#18181b" }}>{truth}</p>
      </div>
    </div>
  );
}

// ─── Stack row ────────────────────────────────────────────────────────────────
function StackRow({ emoji, name, value, highlight }: { emoji: string; name: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-3 py-3 border-b last:border-0 ${highlight ? "font-bold" : ""}`} style={{ borderColor: "#e2dfd6" }}>
      <div className="flex items-center gap-2">
        <span>{emoji}</span>
        <span className="text-sm" style={{ color: highlight ? "#18181b" : "#4a4a52" }}>{name}</span>
      </div>
      <span className="text-sm font-bold flex-shrink-0" style={{ color: highlight ? "#1da851" : "#71717a" }}>₹{value}</span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function JoinPage() {
  return (
    <div style={{ background: "#faf8f3", minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* ── SECTION 1: HOOK ─────────────────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(180deg, #f0fdf4 0%, #faf8f3 100%)", borderBottom: "1px solid #e2dfd6" }}>
        <div className="max-w-2xl mx-auto px-5 py-14 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(37,211,102,0.12)", color: "#1da851", border: "1px solid rgba(37,211,102,0.25)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#25d366] animate-pulse inline-block" />
            Daily Upgrade Club
          </div>

          {/* HOOK HEADLINE — pattern interrupt for cold traffic */}
          <h1 style={{ fontSize: "clamp(2.2rem, 6vw, 3.8rem)", lineHeight: 1.08, fontWeight: 800, letterSpacing: "-0.03em", color: "#18181b" }}>
            What if getting<br />
            <span style={{ color: "#1da851" }}>healthier, focused &<br />more energetic</span><br />
            took just 5 minutes<br />
            <span style={{ fontStyle: "italic", fontWeight: 400, color: "#71717a" }}>a day on WhatsApp?</span>
          </h1>

          <Divider />

          {/* Sub-hook — the new opportunity frame */}
          <p className="text-lg leading-relaxed mb-8" style={{ color: "#4a4a52", maxWidth: "520px", margin: "0 auto 2rem" }}>
            Not another fitness app. Not a complicated routine. Just <strong>one tiny habit every morning</strong> — delivered directly to your WhatsApp — focused on one area of your life each month.
          </p>

          {/* Social proof bar */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex -space-x-2">
              {["/avatars/men/man-1.jpg","/avatars/women/woman-1.jpg","/avatars/women/woman-3.avif"].map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={src} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-white" />
              ))}
            </div>
            <div className="text-left">
              <Stars />
              <p className="text-xs" style={{ color: "#71717a" }}>Loved by members across India</p>
            </div>
          </div>

          <CTAButton
            label="Yes, I Want to Upgrade My Life →"
            sublabel="₹99/month · Cancel anytime · Starts on WhatsApp"
          />

          {/* Trust pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {["No app needed", "Delivered on WhatsApp", "Under 5 min/day", "Cancel anytime"].map(t => (
              <span key={t} className="text-xs px-3 py-1 rounded-full" style={{ background: "white", color: "#71717a", border: "1px solid #e2dfd6" }}>
                ✓ {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: THE BIG DOMINO (install the one belief) ──────────────── */}
      <section className="max-w-2xl mx-auto px-5 py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-center mb-4" style={{ color: "#25d366" }}>The Truth Nobody Tells You</p>
        <h2 className="text-center font-bold mb-6" style={{ fontSize: "clamp(1.7rem, 4vw, 2.6rem)", lineHeight: 1.15, letterSpacing: "-0.025em", color: "#18181b" }}>
          You don&apos;t need more<br />
          <span style={{ color: "#1da851" }}>motivation.</span><br />
          You need a <span style={{ fontStyle: "italic", fontWeight: 400 }}>better system.</span>
        </h2>
        <Divider />
        <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4a4a52" }}>
          <p>Here&apos;s what most people do: they start a big routine, stay consistent for 10 days, then life happens — and they quit. Not because they&apos;re lazy. Because the habit was too big, too complicated, and required too much of a perfect morning.</p>
          <p>The research is clear: <strong style={{ color: "#18181b" }}>small habits, done consistently, create more lasting change than big habits done occasionally.</strong> A 1% improvement every day compounds to 37x growth in one year.</p>
          <p>The problem was never you. The problem was the vehicle. You were trying to change too much, too fast, without the right daily structure.</p>
          <div className="rounded-2xl p-5 text-center font-bold text-lg" style={{ background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.2)", color: "#18181b" }}>
            &ldquo;The Daily Upgrade Club gives you that structure — one tiny habit, every day, on the app you already use.&rdquo;
          </div>
        </div>
      </section>

      {/* ── SECTION 3: THE NEW OPPORTUNITY (not improvement, a new vehicle) ─── */}
      <section style={{ background: "#18181b" }} className="px-5 py-14">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#25d366" }}>A New Approach</p>
          <h2 className="font-bold mb-6" style={{ fontSize: "clamp(1.7rem, 4vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-0.025em", color: "#ffffff" }}>
            This is not a fitness program.<br />
            This is not a productivity course.<br />
            <span style={{ color: "#25d366" }}>This is your daily upgrade system.</span>
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#a1a1aa" }}>
            Every month, the Daily Upgrade Club focuses on <strong style={{ color: "#ffffff" }}>one category</strong> — Health, Energy, Focus, Sleep, Fitness, Productivity, or Career. You go deep on one thing, measure your progress, and see real results before moving to the next.
          </p>

          {/* Monthly themes grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
            {[
              { emoji: "⚡", label: "Energy" },
              { emoji: "🧠", label: "Focus" },
              { emoji: "😴", label: "Sleep" },
              { emoji: "💪", label: "Fitness" },
              { emoji: "❤️", label: "Health" },
              { emoji: "🚀", label: "Productivity" },
              { emoji: "🧘", label: "Calm" },
              { emoji: "💼", label: "Career" },
            ].map(({ emoji, label }) => (
              <div key={label} className="rounded-xl py-3 px-2 text-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="text-2xl mb-1">{emoji}</div>
                <div className="text-xs font-semibold" style={{ color: "#e4e4e7" }}>{label}</div>
              </div>
            ))}
          </div>

          <p className="text-sm" style={{ color: "#71717a" }}>
            You choose the category. We deliver the daily habits, tracking, and support directly on WhatsApp.
          </p>
        </div>
      </section>

      {/* ── SECTION 4: BREAK 3 FALSE BELIEFS ────────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-5 py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-center mb-4" style={{ color: "#25d366" }}>Common Doubts, Answered</p>
        <h2 className="text-center font-bold mb-8" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", lineHeight: 1.2, letterSpacing: "-0.025em", color: "#18181b" }}>
          The things holding you back<br />
          <span style={{ fontStyle: "italic", fontWeight: 400, color: "#71717a" }}>— and the truth about each one</span>
        </h2>
        <div className="space-y-4">
          <BeliefBreaker
            belief="I've tried habit apps before and they never worked for me."
            truth="Apps require you to go open them. WhatsApp messages show up whether you remember or not. The habit arrives in your pocket every morning — you can't ignore it the way you ignore an app."
          />
          <BeliefBreaker
            belief="I'm too busy. I can't add anything else to my day."
            truth="Each habit takes under 5 minutes. We're not adding to your day — we're replacing the scroll you do anyway. One tiny action, done first thing, changes the entire quality of your morning."
          />
          <BeliefBreaker
            belief="₹99/month feels like a subscription I won't use."
            truth="You already get 30 habits, daily accountability, weekly scorecards, a private community, and your monthly guide — all delivered without you having to open any app. People cancel gym memberships. They don't stop reading their WhatsApp."
          />
        </div>
      </section>

      {/* ── SECTION 5: WHAT'S INSIDE (feature stack, no prices here) ────────── */}
      <section style={{ background: "#f0fdf4", borderTop: "1px solid #e2dfd6", borderBottom: "1px solid #e2dfd6" }} className="px-5 py-14">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-4" style={{ color: "#25d366" }}>Everything Inside</p>
          <h2 className="text-center font-bold mb-2" style={{ fontSize: "clamp(1.7rem, 4vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-0.025em", color: "#18181b" }}>
            Your complete daily<br />upgrade system
          </h2>
          <p className="text-center text-base mb-10" style={{ color: "#71717a" }}>Everything you need. Nothing you don&apos;t.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureCard
              emoji="🌱"
              title="30 Tiny Daily Habits"
              desc="One carefully chosen habit every morning to improve your health, energy, and wellbeing — without overwhelming you."
              value="2,999"
            />
            <FeatureCard
              emoji="🎯"
              title="One Monthly Theme"
              desc="Go deep on one area — Health, Energy, Focus, Sleep, Fitness, or Productivity. One month, one transformation, measurable results."
              value="1,799"
            />
            <FeatureCard
              emoji="📲"
              title="Daily Accountability"
              desc="Simple daily check-ins on WhatsApp. Tap DONE to log your habit. No guilt if you miss — just gentle nudges to keep your streak alive."
              value="1,199"
            />
            <FeatureCard
              emoji="📊"
              title="Weekly Progress Scorecard"
              desc="Every week, see exactly how consistent you've been. Watch your energy, focus, and habits improve week by week with real data."
              value="999"
            />
            <FeatureCard
              emoji="🏆"
              title="Complete Habit Vault"
              desc="A growing library of powerful habits across every category. Over 90+ habits you can revisit and implement any time."
              value="999"
            />
            <FeatureCard
              emoji="👥"
              title="Private WhatsApp Group"
              desc="Build habits alongside others on the same journey. Share wins, stay accountable, and never feel like you're doing this alone."
              value="999"
            />
            <FeatureCard
              emoji="🗓️"
              title="Monthly Habit Calendar + PDF Guide"
              desc="Know exactly what's coming each day. Download your monthly guide and revisit every habit whenever you need it."
              value="499"
            />
            <FeatureCard
              emoji="📩"
              title="High Performance Newsletter"
              desc="Practical ideas, habit science, and weekly insights on health, focus, and wellbeing — curated and delivered to you."
              value="199"
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 6: "IF ALL THIS DID WAS" × 3 ────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-5 py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-center mb-4" style={{ color: "#25d366" }}>Think About This</p>
        <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", lineHeight: 1.2, letterSpacing: "-0.025em", color: "#18181b" }}>
          Just one of these would be<br />
          <span style={{ fontStyle: "italic", fontWeight: 400, color: "#71717a" }}>worth it on its own.</span>
        </h2>

        <div className="space-y-4">
          {[
            { q: "If all this did was", bold: "give you the energy to wake up every morning feeling actually alive", suffix: "— would it be worth ₹99 a month?" },
            { q: "If all this did was", bold: "help you stay consistent for 30 days — building habits that actually stick this time", suffix: "— would that be worth it?" },
            { q: "If all this did was", bold: "give you the focus, the calm, and the health to show up fully for the people and work that matter most", suffix: "— would ₹99 feel like a fair trade?" },
          ].map(({ q, bold, suffix }, i) => (
            <div key={i} className="rounded-2xl px-6 py-5" style={{ background: "white", border: "1px solid #e2dfd6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <p className="text-base leading-relaxed" style={{ color: "#4a4a52" }}>
                <span style={{ color: "#71717a" }}>{q} </span>
                <strong style={{ color: "#18181b" }}>{bold}</strong>
                <span style={{ color: "#71717a" }}> {suffix}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 7: THE VALUE STACK + PRICE REVEAL ────────────────────────── */}
      <section style={{ background: "#18181b" }} className="px-5 py-14">
        <div className="max-w-md mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-4" style={{ color: "#25d366" }}>The Real Value</p>
          <h2 className="text-center font-bold mb-8" style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", lineHeight: 1.15, letterSpacing: "-0.025em", color: "#ffffff" }}>
            Here&apos;s everything you get<br />
            <span style={{ color: "#25d366" }}>and what it&apos;s worth.</span>
          </h2>

          <div className="rounded-2xl overflow-hidden mb-6" style={{ background: "#1c1c1e", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="px-6 py-5 divide-y divide-white/[0.08]">
              {[
                { emoji: "🌱", name: "30 Tiny Daily Habits", value: "2,999" },
                { emoji: "🎯", name: "One Monthly Theme", value: "1,799" },
                { emoji: "📲", name: "Daily Tracking & Accountability", value: "1,199" },
                { emoji: "📊", name: "Weekly Progress Scorecard", value: "999" },
                { emoji: "🏆", name: "Complete Habit Vault", value: "999" },
                { emoji: "👥", name: "Private WhatsApp Group", value: "999" },
                { emoji: "🗓️", name: "Monthly Calendar + PDF Guide", value: "499" },
                { emoji: "📩", name: "High Performance Newsletter", value: "199" },
              ].map(({ emoji, name, value }) => (
                <div key={name} className="flex items-center justify-between gap-3 py-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-2">
                    <span>{emoji}</span>
                    <span className="text-sm" style={{ color: "#a1a1aa" }}>{name}</span>
                  </div>
                  <span className="text-sm font-bold flex-shrink-0" style={{ color: "#71717a" }}>₹{value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-3 py-3 font-bold">
                <span style={{ color: "#ffffff" }}>Total value</span>
                <span style={{ color: "#25d366" }}>₹9,991/month</span>
              </div>
            </div>
          </div>

          {/* Cascade — no strikethrough, plain text */}
          <div className="text-center space-y-2 mb-8">
            <p className="text-base" style={{ color: "#a1a1aa" }}>Obviously, we&apos;re not going to charge you <strong style={{ color: "#ffffff" }}>₹9,991.</strong></p>
            <p className="text-base" style={{ color: "#a1a1aa" }}>We&apos;re not going to charge you <strong style={{ color: "#ffffff" }}>₹4,999.</strong></p>
            <p className="text-base" style={{ color: "#a1a1aa" }}>We&apos;re not even going to charge you <strong style={{ color: "#ffffff" }}>₹999.</strong></p>
          </div>

          {/* Reason why */}
          <div className="rounded-2xl px-5 py-4 mb-8 text-sm leading-relaxed" style={{ background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.2)", color: "#a1a1aa" }}>
            We built the Daily Upgrade Club to make high performance accessible to <em>everyone</em> — not just people who can afford expensive coaches, retreats, or programmes. The price reflects that mission.
          </div>

          {/* PRICE REVEAL */}
          <div className="rounded-2xl p-6 text-center" style={{ background: "linear-gradient(135deg, rgba(37,211,102,0.15) 0%, rgba(29,168,81,0.1) 100%)", border: "1px solid rgba(37,211,102,0.3)" }}>
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "#25d366" }}>Your Price Today</p>
            <div className="flex items-baseline justify-center gap-2 mb-1">
              <span style={{ fontSize: "5rem", lineHeight: 1, fontWeight: 900, letterSpacing: "-0.04em", color: "#25d366" }}>₹99</span>
              <span className="text-xl" style={{ color: "#a1a1aa" }}>/month</span>
            </div>
            <p className="text-sm mb-6" style={{ color: "#71717a" }}>That&apos;s ₹3 per day. Less than one cup of chai.</p>
            <CTAButton label="Join Daily Upgrade Club → ₹99/month" />
            <p className="text-xs mt-3" style={{ color: "#52525b" }}>Cancel anytime. No questions asked.</p>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: HOW IT WORKS (simple steps) ───────────────────────────── */}
      <section className="max-w-2xl mx-auto px-5 py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-center mb-4" style={{ color: "#25d366" }}>How It Works</p>
        <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", lineHeight: 1.2, letterSpacing: "-0.025em", color: "#18181b" }}>
          Up and running in<br />
          <span style={{ color: "#1da851" }}>under 3 minutes.</span>
        </h2>
        <div className="space-y-4">
          {[
            { step: "1", title: "Choose your first monthly theme", desc: "Pick the category you want to focus on — Energy, Focus, Sleep, Health, Fitness, Productivity, or Calm." },
            { step: "2", title: "Subscribe & share your WhatsApp number", desc: "Complete your ₹99 payment. We'll add you to the Daily Upgrade Club and set everything up on WhatsApp." },
            { step: "3", title: "Receive one habit every morning at 7 AM", desc: "Wake up to your daily habit on WhatsApp. Take 5 minutes. Tap DONE. Watch your streak grow." },
            { step: "4", title: "Track your progress every week", desc: "Every week you get a scorecard showing your consistency and improvement. Every month, choose your next theme." },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-4 rounded-2xl p-5 bg-white" style={{ border: "1px solid #e2dfd6", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
              <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center font-black text-base" style={{ background: "#1da851", color: "#ffffff" }}>
                {step}
              </div>
              <div>
                <p className="font-bold mb-1" style={{ color: "#18181b" }}>{title}</p>
                <p className="text-sm leading-relaxed" style={{ color: "#71717a" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 9: SOCIAL PROOF ───────────────────────────────────────────── */}
      <section style={{ background: "#f0fdf4", borderTop: "1px solid #e2dfd6", borderBottom: "1px solid #e2dfd6" }} className="px-5 py-14">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-4" style={{ color: "#25d366" }}>Real Members, Real Results</p>
          <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", lineHeight: 1.2, letterSpacing: "-0.025em", color: "#18181b" }}>
            What members are saying
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "Karan M.", city: "Pune", text: "Finally a habit system that actually fits into real life. No app, no hassle. My energy levels in the morning have completely changed.", avatar: "/avatars/men/man-1.jpg" },
              { name: "Priya T.", city: "Bengaluru", text: "Best ₹99 I've spent. I've been consistent for 4 weeks straight — something I've never managed before with any other programme.", avatar: "/avatars/women/woman-1.jpg" },
              { name: "Sneha R.", city: "Mumbai", text: "The DONE tracking keeps me accountable every single day. I actually look forward to 7 AM now.", avatar: "/avatars/women/woman-3.avif" },
              { name: "Amit D.", city: "Delhi", text: "The monthly theme idea is brilliant. I focused on Sleep this month and I'm sleeping 45 minutes more on average. Measurable change.", avatar: "/avatars/men/man-1.jpg" },
            ].map(({ name, city, text, avatar }) => (
              <div key={name} className="rounded-2xl p-5 bg-white" style={{ border: "1px solid #e2dfd6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <Stars />
                <p className="text-sm leading-relaxed mt-3 mb-4" style={{ color: "#4a4a52" }}>&ldquo;{text}&rdquo;</p>
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

      {/* ── SECTION 10: GUARANTEE + URGENCY ─────────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-5 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {/* Guarantee */}
          <div className="rounded-2xl p-6 text-center" style={{ background: "white", border: "1px solid #e2dfd6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div className="text-4xl mb-3">🛡️</div>
            <p className="font-bold mb-2" style={{ color: "#18181b" }}>30-Day Guarantee</p>
            <p className="text-sm leading-relaxed" style={{ color: "#71717a" }}>If you don&apos;t feel a real difference in your energy, focus, or consistency in the first 30 days — message us. We&apos;ll refund every rupee. Zero risk.</p>
          </div>
          {/* Reason to act now */}
          <div className="rounded-2xl p-6 text-center" style={{ background: "rgba(37,211,102,0.06)", border: "1px solid rgba(37,211,102,0.2)" }}>
            <div className="text-4xl mb-3">⏰</div>
            <p className="font-bold mb-2" style={{ color: "#18181b" }}>Start This Month</p>
            <p className="text-sm leading-relaxed" style={{ color: "#71717a" }}>Each month begins with a new theme. Join now and you&apos;ll start your first theme with fresh daily habits from Day 1 — not mid-month. Don&apos;t wait for the &ldquo;right time.&rdquo; This is it.</p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h2 className="font-bold mb-4" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", lineHeight: 1.2, letterSpacing: "-0.025em", color: "#18181b" }}>
            Ready to upgrade your life<br />
            <span style={{ color: "#1da851" }}>one tiny habit at a time?</span>
          </h2>
          <p className="text-base mb-8" style={{ color: "#71717a" }}>
            Join hundreds of members already building better habits every day on WhatsApp.
          </p>
          <CTAButton
            label="Join Daily Upgrade Club → ₹99/month"
            sublabel="30-day money-back guarantee · Cancel anytime"
          />
        </div>
      </section>

      {/* ── SECTION 11: FAQ ───────────────────────────────────────────────────── */}
      <section style={{ background: "#18181b" }} className="px-5 py-14">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-4" style={{ color: "#25d366" }}>FAQ</p>
          <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.1rem)", lineHeight: 1.2, color: "#ffffff" }}>
            Quick answers
          </h2>
          <div className="space-y-3">
            {[
              { q: "Do I need to download any app?", a: "No. Everything is delivered directly on WhatsApp. If you have WhatsApp, you're ready." },
              { q: "How does the monthly theme work?", a: "Each month focuses on one category — Energy, Sleep, Focus, Health, Fitness, Productivity, or Calm. You choose your theme when you join, and we deliver 30 habits tailored to that category." },
              { q: "Can I change my theme each month?", a: "Yes. At the start of every new month, you can choose a new theme or continue the previous one. It's completely flexible." },
              { q: "What does daily accountability look like?", a: "Every morning you receive your habit. After you complete it, you reply DONE on WhatsApp. We track your streak and send you a weekly scorecard every Sunday." },
              { q: "What if I miss a day?", a: "No pressure. The habit will still be there. We send a gentle evening reminder to help you complete it. One missed day never breaks the momentum." },
              { q: "Can I cancel anytime?", a: "Yes. You can cancel your subscription at any time with no questions asked. Your access continues until the end of your billing period." },
              { q: "What is the 30-day guarantee?", a: "If you don't feel a meaningful difference in your energy, focus, or consistency within your first 30 days, message us and we'll refund your payment in full." },
            ].map(({ q, a }) => (
              <details key={q} className="group rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer font-semibold text-sm" style={{ color: "#e4e4e7" }}>
                  {q}
                  <span className="flex-shrink-0 text-lg text-[#25d366] group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "#a1a1aa" }}>{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 12: FINAL CTA ─────────────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #faf8f3 100%)", borderTop: "1px solid #e2dfd6" }} className="px-5 py-16">
        <div className="max-w-xl mx-auto text-center">
          <div className="text-5xl mb-6">🚀</div>
          <h2 className="font-bold mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "#18181b" }}>
            Your daily upgrade<br />
            <span style={{ color: "#1da851" }}>starts today.</span>
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#71717a" }}>
            One habit. Every day. Directly on WhatsApp.<br />
            In 30 days, you&apos;ll be a different person than the one reading this right now.
          </p>
          <CTAButton
            label="Yes, I'm Ready — Join Now →"
            sublabel="₹99/month · 30-day guarantee · Cancel anytime"
          />
          <p className="text-xs mt-6" style={{ color: "#a1a1aa" }}>
            Have a question?{" "}
            <a href="https://wa.me/918956146485?text=Hi%2C+I+have+a+question+about+the+Daily+Upgrade+Club" className="underline" style={{ color: "#25d366" }}>
              Chat with us on WhatsApp
            </a>
          </p>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────────── */}
      <footer className="px-5 py-8 text-center" style={{ background: "#111111", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="text-xs" style={{ color: "#52525b" }}>
          © {new Date().getFullYear()} High Performance Club · Daily Upgrade Club ·{" "}
          <a href="https://www.highperformanceclub.co" className="underline" style={{ color: "#71717a" }}>highperformanceclub.co</a>
        </p>
        <p className="text-xs mt-2" style={{ color: "#3f3f46" }}>
          All prices in INR · Subscription renews monthly · Cancel anytime
        </p>
      </footer>

    </div>
  );
}
