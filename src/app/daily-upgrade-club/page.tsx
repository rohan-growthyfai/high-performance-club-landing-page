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
function CTA({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <a href={JOIN_URL} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-3 w-full max-w-sm px-8 py-4 rounded-full font-bold text-white text-base"
        style={{ background: "linear-gradient(135deg,#1da851 0%,#25d366 100%)", boxShadow: "0 4px 24px rgba(37,211,102,0.35)" }}>
        <WAIcon size={20} />
        {label}
      </a>
      {sub && <p className="text-xs text-center" style={{ color: "#71717a" }}>{sub}</p>}
    </div>
  );
}

// ── WhatsApp mockup primitives ─────────────────────────────────────────────────
function WAMsg({ text, time = "7:01 AM" }: { text: string; time?: string }) {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs" style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
        <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#18181b" }}>{text}</p>
        <p className="text-right text-xs mt-1" style={{ color: "#a1a1aa" }}>{time} ✓✓</p>
      </div>
    </div>
  );
}

function WAReply({ text, time = "7:08 AM" }: { text: string; time?: string }) {
  return (
    <div className="flex justify-end">
      <div className="rounded-2xl rounded-tr-sm px-4 py-3 max-w-xs" style={{ background: "#dcf8c6" }}>
        <p className="text-sm" style={{ color: "#18181b" }}>{text}</p>
        <p className="text-right text-xs mt-1" style={{ color: "#71717a" }}>{time} ✓✓</p>
      </div>
    </div>
  );
}

function WAWindow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
      <div className="flex items-center gap-3 px-4 py-3" style={{ background: "rgba(37,211,102,0.12)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white" style={{ background: "#1da851" }}>DU</div>
        <div>
          <p className="text-sm font-semibold" style={{ color: "#e4e4e7" }}>Daily Upgrade Club</p>
          <p className="text-xs" style={{ color: "#25d366" }}>{title}</p>
        </div>
      </div>
      <div className="p-4 space-y-3" style={{ background: "#e5ddd5" }}>
        {children}
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
        <span className="flex-shrink-0 text-xl font-light" style={{ color: "#25d366", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
      </button>
      {open && <div className="px-5 pb-4 text-sm leading-relaxed" style={{ background: "rgba(255,255,255,0.02)", color: "#a1a1aa" }}>{a}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function DailyUpgradeClubPage() {
  return (
    <div style={{ background: "#faf8f3", minHeight: "100vh", fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,sans-serif", color: "#18181b" }}>

      {/* ══════════════════════════════════════════════════════
          1. HOOK — sharp pain + curiosity gap
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(160deg,#f0fdf4 0%,#faf8f3 100%)", borderBottom: "1px solid #e2dfd6" }}>
        <div className="max-w-xl mx-auto px-5 pt-12 pb-14 text-center">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-8 text-xs font-bold uppercase tracking-widest"
            style={{ background: "rgba(37,211,102,0.1)", color: "#1da851", border: "1px solid rgba(37,211,102,0.2)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: "#25d366" }} />
            Daily Upgrade Club · WhatsApp
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.6rem)", lineHeight: 1.07, fontWeight: 900, letterSpacing: "-0.035em" }}>
            You already know<br />
            <span style={{ color: "#1da851" }}>what a healthy life</span><br />
            looks like.<br />
            <span style={{ fontStyle: "italic", fontWeight: 400, color: "#71717a", fontSize: "0.82em" }}>So why is it still not happening?</span>
          </h1>

          <div className="w-10 h-1 rounded-full mx-auto my-8" style={{ background: "#25d366" }} />

          <p className="text-lg leading-relaxed" style={{ color: "#4a4a52", maxWidth: "460px", margin: "0 auto 2.5rem" }}>
            The problem isn&apos;t knowledge. It&apos;s not willpower either.<br /><br />
            It&apos;s that <strong style={{ color: "#18181b" }}>every healthy habit you&apos;ve tried demanded too much</strong> — too much time, too much change, too much discipline from someone who already has a full life.<br /><br />
            What if you only had to do <strong style={{ color: "#18181b" }}>one tiny healthy habit a day</strong>? One. Under 5 minutes. Already waiting in your WhatsApp when you wake up.
          </p>

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
            {["No app to download","Arrives on WhatsApp","Under 5 min/day","Works for busy people"].map(t=>(
              <span key={t} className="text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5"
                style={{ background: "#fff", color: "#4a4a52", border: "1px solid #e2dfd6" }}>
                <CheckIcon />{t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. ATTRACTIVE CHARACTER — Rohan's story (Epiphany Bridge)
          Brunson: People connect with people, not brands.
          Cold Meta traffic has no reason to trust "Daily Upgrade Club."
          They need a person with a story they can see themselves in.
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-xl mx-auto px-5 py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>Why I Built This</p>
        <h2 className="text-center font-bold mb-8" style={{ fontSize: "clamp(1.5rem, 4vw, 2.4rem)", lineHeight: 1.12, letterSpacing: "-0.025em" }}>
          I was the person who knew<br />
          <span style={{ color: "#1da851" }}>everything about health</span><br />
          and did none of it.
        </h2>

        <div className="space-y-5 text-base leading-relaxed" style={{ color: "#4a4a52" }}>
          <p>
            I&apos;m Rohan. Two years ago, I had bookmarked 47 articles on sleep, had three fitness apps on my phone, and had started — and abandoned — more routines than I can count.
          </p>
          <p>
            I wasn&apos;t lazy. I was a professional. I cared about my health. But every time I tried to build a routine, life happened. A busy week. A late night. One missed day turned into three. Three turned into &ldquo;I&apos;ll restart next Monday.&rdquo;
          </p>
          <p>
            Then I stumbled on BJ Fogg&apos;s research from Stanford. He studied thousands of people trying to build habits and found one thing that separated those who succeeded from those who didn&apos;t: <strong style={{ color: "#18181b" }}>the successful ones made the habit so small it was impossible to fail.</strong>
          </p>
          <p>
            I tried it. I replaced my entire morning routine with one thing: drink one glass of water before touching my phone. That&apos;s all. By day 10, I was sleeping better. By day 20, I had added a second habit on my own — nobody told me to. By day 30, I had more energy than I&apos;d had in years. One tiny healthy habit had pulled everything forward.
          </p>
          <div className="rounded-2xl p-5" style={{ background: "rgba(37,211,102,0.07)", border: "1px solid rgba(37,211,102,0.18)" }}>
            <p className="text-base font-semibold" style={{ color: "#18181b" }}>
              I built the Daily Upgrade Club because I wanted to give everyone what I found — one tiny healthy habit, every morning, already waiting for you. No planning. No apps. Just WhatsApp.
            </p>
          </div>
          <p>
            Since then, 400+ members have done the same. And the results — better sleep, more energy, sharper focus, less stress — all started with one ridiculously small habit a day.
          </p>
        </div>

        {/* Rohan avatar block */}
        <div className="flex items-center gap-3 mt-8 p-4 rounded-2xl bg-white" style={{ border: "1px solid #e2dfd6" }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-white text-lg flex-shrink-0" style={{ background: "linear-gradient(135deg,#1da851,#25d366)" }}>R</div>
          <div>
            <p className="font-bold text-sm" style={{ color: "#18181b" }}>Rohan Mote</p>
            <p className="text-xs" style={{ color: "#71717a" }}>Founder, Daily Upgrade Club</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. THE BIG DOMINO — install the one belief
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#18181b" }} className="px-5 py-14">
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>This Is Not What You&apos;ve Tried Before</p>
          <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.5rem, 4vw, 2.4rem)", lineHeight: 1.12, letterSpacing: "-0.025em", color: "#fff" }}>
            The old way vs.<br />
            <span style={{ color: "#25d366" }}>the Daily Upgrade Club</span>
          </h2>

          <div className="grid grid-cols-2 gap-3 mb-12">
            <div className="rounded-2xl p-4" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
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
            <div className="rounded-2xl p-4" style={{ background: "rgba(37,211,102,0.06)", border: "1px solid rgba(37,211,102,0.2)" }}>
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

          {/* ── PRODUCT CLARITY: 3 sample habit messages across 3 themes ── */}
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-6" style={{ color: "#25d366" }}>What Actually Lands In Your WhatsApp Every Morning</p>

          <div className="space-y-6">
            {/* Sample 1 — Energy */}
            <div>
              <p className="text-xs font-bold mb-3 flex items-center gap-2" style={{ color: "#a1a1aa" }}>
                <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: "rgba(37,211,102,0.12)", color: "#25d366" }}>⚡ Energy Month — Day 3</span>
              </p>
              <WAWindow title="7:01 AM · Energy Month">
                <WAMsg text={"Good morning! ⚡ Today's tiny healthy habit:\n\n🌞 Step outside for 5 minutes of natural sunlight within 30 minutes of waking up.\n\nWhy it works: Morning light resets your cortisol rhythm — the hormone that controls your energy all day. No sunlight = sluggish all morning no matter how much coffee you drink.\n\n5 minutes. Go stand by your window or step outside.\n\nReply DONE when you're back 💪"} />
                <WAReply text="DONE ✅ Felt surprisingly good actually" />
                <WAMsg text="🔥 Day 3 streak! Your body is already recalibrating. See you tomorrow." time="7:14 AM" />
              </WAWindow>
            </div>

            {/* Sample 2 — Sleep */}
            <div>
              <p className="text-xs font-bold mb-3 flex items-center gap-2" style={{ color: "#a1a1aa" }}>
                <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: "rgba(37,211,102,0.12)", color: "#25d366" }}>😴 Sleep Month — Day 11</span>
              </p>
              <WAWindow title="7:01 AM · Sleep Month">
                <WAMsg text={"Good morning! 😴 Today's tiny healthy habit:\n\n📵 Tonight, put your phone face-down and charger outside the bedroom.\n\nWhy it works: Blue light from screens suppresses melatonin — the sleep hormone — for up to 2 hours. Just removing the phone from your room improves sleep quality without any other changes.\n\nSet a reminder to move it before 9:30 PM tonight.\n\nReply DONE once you've set the reminder 🌙"} />
                <WAReply text="DONE ✅ Will try it tonight" time="7:06 AM" />
                <WAMsg text="🔥 Day 11! Most members notice a difference in 3–5 nights. You're almost there." time="7:07 AM" />
              </WAWindow>
            </div>

            {/* Sample 3 — Gut Health */}
            <div>
              <p className="text-xs font-bold mb-3 flex items-center gap-2" style={{ color: "#a1a1aa" }}>
                <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: "rgba(37,211,102,0.12)", color: "#25d366" }}>🫀 Gut Health Month — Day 7</span>
              </p>
              <WAWindow title="7:01 AM · Gut Health Month">
                <WAMsg text={"Good morning! 🌱 Today's tiny healthy habit:\n\n🥄 Add one spoon of curd (plain, no sugar) to your lunch today.\n\nWhy it works: Live cultures in plain curd feed the good bacteria in your gut. Consistent daily curd — even just one spoon — reduces bloating and improves digestion within 2 weeks.\n\nJust one spoon with lunch. That's today's entire habit.\n\nReply DONE after lunch 🙌"} />
                <WAReply text="DONE ✅ Had it with dal rice" time="1:23 PM" />
                <WAMsg text="Perfect 🙌 Day 7 complete! Your gut bacteria are already shifting. See you tomorrow." time="1:24 PM" />
              </WAWindow>
            </div>
          </div>

          <p className="text-center text-xs mt-5" style={{ color: "#52525b" }}>This is what members get every morning. Specific. Doable. Explained.</p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. YOUR FIRST 7 DAYS — concrete day-by-day preview
          Removes the "what am I actually getting into" fear.
          Makes the trial feel concrete, not vague.
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
            { day: "Day 1", title: "Your first habit arrives at 7 AM", desc: "You wake up to one tiny healthy habit in your WhatsApp. You read it. You do it. It takes under 5 minutes. You reply DONE. That's the whole thing. You'll think: 'That's it?' Yes. That's it.", feel: "Surprised at how easy it is" },
            { day: "Day 2", title: "Second habit. Streak begins.", desc: "Day 2 arrives automatically. You do it. Streak = 2. The accountability group is live — you see others posting DONE. You realise you're not doing this alone.", feel: "A quiet sense of momentum" },
            { day: "Day 3–4", title: "The habit starts feeling automatic", desc: "You notice yourself expecting the morning message. The habit is no longer something you have to decide to do — it's part of how your morning starts. The streak counter is doing more work than willpower.", feel: "Habit starting to anchor to your morning" },
            { day: "Day 5", title: "First physical shift", desc: "Most members report something noticeable by Day 5 — more energy in the morning, sleeping more soundly, digestion feeling lighter, or a clearer head. It's small. But it's real. And you didn't change anything else.", feel: "Something actually shifted" },
            { day: "Day 6", title: "You get your Day 6 reminder", desc: "We remind you that your trial ends tomorrow. If you want to continue, no action needed. If not, cancel now. No pressure, no guilt.", feel: "Full control. No surprise charge." },
            { day: "Day 7", title: "You make a clear decision", desc: "After 7 mornings of tiny healthy habits — you know whether this works for you. Most members don't cancel. Not because they forget — because they don't want to stop.", feel: "You already have your answer" },
          ].map(({ day, title, desc, feel }) => (
            <div key={day} className="rounded-2xl p-5 bg-white flex gap-4" style={{ border: "1px solid #e2dfd6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-black text-white text-center leading-tight" style={{ background: "linear-gradient(135deg,#1da851,#25d366)" }}>
                  {day.replace("Day ", "D")}
                </div>
              </div>
              <div>
                <p className="font-bold text-sm mb-1" style={{ color: "#18181b" }}>{title}</p>
                <p className="text-sm leading-relaxed mb-2" style={{ color: "#71717a" }}>{desc}</p>
                <p className="text-xs font-semibold px-2 py-0.5 rounded-full inline-block" style={{ background: "rgba(37,211,102,0.1)", color: "#1da851" }}>
                  Feeling: {feel}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <CTA label="Start Day 1 Tomorrow — ₹1 →" sub="7 days for ₹1 · Then ₹99/month · Cancel anytime before Day 7" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. WHAT YOU GET — full offer with clarity
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#f0fdf4", borderTop: "1px solid #e2dfd6", borderBottom: "1px solid #e2dfd6" }} className="px-5 py-14">
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>Everything You Get</p>
          <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.5rem, 4vw, 2.4rem)", lineHeight: 1.12, letterSpacing: "-0.025em" }}>
            Your complete Daily Upgrade Club
          </h2>

          <div className="space-y-3">
            {[
              { emoji: "📲", title: "One tiny healthy habit — every morning on WhatsApp", desc: "At 7 AM, one habit arrives. Specific, science-backed, and takes under 5 minutes. No planning required. You just reply DONE.", value: "₹2,999" },
              { emoji: "🎯", title: "One focused monthly health theme", desc: "Each month goes deep on one area: Sleep, Energy, Focus, Gut Health, Stress, Fitness, or Hydration. You pick. 30 habits, one thread. Real change in 30 days.", value: "₹1,799" },
              { emoji: "📊", title: "Weekly health scorecard", desc: "Every Sunday: your streak, completion %, and how your chosen theme is shifting your health. Seeing progress is what keeps you going.", value: "₹999" },
              { emoji: "👥", title: "Private WhatsApp accountability group", desc: "Everyone in the group is doing the same habit as you, same month, same morning. When they post DONE — you will too.", value: "₹999" },
              { emoji: "🗓️", title: "Monthly 30-habit calendar + PDF guide", desc: "You get all 30 habits in advance so you see the full journey before Day 1. No surprises, just a clear 30-day path.", value: "₹499" },
              { emoji: "🏆", title: "Full habit vault (90+ tiny healthy habits)", desc: "Every habit from every month, permanently yours. Revisit, repeat, combine. Build on what already worked.", value: "₹999" },
              { emoji: "📩", title: "Weekly wellness newsletter", desc: "One practical insight per week on sleep, energy, food, or focus — backed by research, written in plain language. No fluff.", value: "₹199" },
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
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. BREAK 3 FALSE BELIEFS
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-xl mx-auto px-5 py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>The 3 Reasons You&apos;re Hesitating</p>
        <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.5rem, 4vw, 2.4rem)", lineHeight: 1.12, letterSpacing: "-0.025em" }}>
          And why none of them<br />
          <span style={{ color: "#1da851" }}>should stop you today</span>
        </h2>

        <div className="space-y-5">
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e2dfd6", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div className="px-5 py-4" style={{ background: "#fff7f7", borderBottom: "1px solid #fecaca" }}>
              <p className="text-sm font-bold" style={{ color: "#dc2626" }}>❌ &ldquo;One tiny habit a day can&apos;t actually change my health.&rdquo;</p>
            </div>
            <div className="px-5 py-4 bg-white">
              <p className="text-sm leading-relaxed" style={{ color: "#4a4a52" }}>
                <strong style={{ color: "#18181b" }}>Here&apos;s what actually happens:</strong> A single habit done for 30 consecutive days rewires the brain through neuroplasticity — confirmed by Stanford research. Members who started with just &ldquo;5 minutes of morning sunlight&rdquo; ended the month sleeping better, eating better, and exercising more — without being told to. One tiny healthy habit pulls the rest of your health forward like a thread.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e2dfd6", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div className="px-5 py-4" style={{ background: "#fff7f7", borderBottom: "1px solid #fecaca" }}>
              <p className="text-sm font-bold" style={{ color: "#dc2626" }}>❌ &ldquo;I&apos;ve tried this before. I always quit. I&apos;m just not a consistent person.&rdquo;</p>
            </div>
            <div className="px-5 py-4 bg-white">
              <p className="text-sm leading-relaxed" style={{ color: "#4a4a52" }}>
                <strong style={{ color: "#18181b" }}>You quit because the habit was too big, not because you&apos;re broken.</strong> When a habit takes under 5 minutes and shows up in your WhatsApp automatically — you don&apos;t have to rely on memory or motivation. You can&apos;t fail something this small. Members who called themselves &ldquo;the least consistent person alive&rdquo; averaged a 78% completion rate in their first month.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e2dfd6", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div className="px-5 py-4" style={{ background: "#fff7f7", borderBottom: "1px solid #fecaca" }}>
              <p className="text-sm font-bold" style={{ color: "#dc2626" }}>❌ &ldquo;₹99/month feels risky — what if I pay and don&apos;t use it?&rdquo;</p>
            </div>
            <div className="px-5 py-4 bg-white">
              <p className="text-sm leading-relaxed" style={{ color: "#4a4a52" }}>
                <strong style={{ color: "#18181b" }}>This is exactly why the trial costs ₹1.</strong> You don&apos;t decide whether this is for you based on a description. You decide after 7 mornings of actual habits landing in your WhatsApp. If by Day 7 you haven&apos;t felt a single shift — cancel. No questions. You risk ₹1. I risk my reputation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. "IF ALL THIS DID WAS" × 3 (Brunson stack close)
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#f0fdf4", borderTop: "1px solid #e2dfd6", borderBottom: "1px solid #e2dfd6" }} className="px-5 py-14">
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>Think About This Honestly</p>
          <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.5rem, 4vw, 2.4rem)", lineHeight: 1.12, letterSpacing: "-0.025em" }}>
            Any one of these alone<br />
            <span style={{ fontStyle: "italic", fontWeight: 400, color: "#71717a" }}>would be worth it.</span>
          </h2>

          <div className="space-y-4">
            {[
              { q: "If all this did was", bold: "give you the energy to get through your day without needing caffeine every 2 hours", suffix: "— would 7 days for ₹1 be worth finding out?" },
              { q: "If all this did was", bold: "make you the kind of person who actually follows through on their health — not just in January, but every single month", suffix: "— would ₹99/month be worth it?" },
              { q: "If all this did was", bold: "help you wake up 6 months from now and say 'I'm actually taking care of myself' — and genuinely mean it", suffix: "— what would that be worth to you?" },
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
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          8. THE STACK + PRICE CASCADE + REVEAL
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#18181b" }} className="px-5 py-14">
        <div className="max-w-md mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>The Real Value</p>
          <h2 className="text-center font-bold mb-8" style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", lineHeight: 1.15, letterSpacing: "-0.025em", color: "#fff" }}>
            Here&apos;s what it&apos;s worth.<br />
            <span style={{ color: "#25d366" }}>And what you pay.</span>
          </h2>

          <div className="rounded-2xl overflow-hidden mb-6" style={{ background: "#1c1c1e", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="divide-y divide-white/[0.07]">
              {[
                ["📲", "Daily tiny healthy habit on WhatsApp (30/month)", "₹2,999"],
                ["🎯", "Monthly health theme (Sleep / Energy / Focus…)", "₹1,799"],
                ["📊", "Weekly health scorecard", "₹999"],
                ["👥", "Private WhatsApp accountability group", "₹999"],
                ["🗓️", "30-habit monthly calendar + PDF guide", "₹499"],
                ["🏆", "Full habit vault (90+ habits)", "₹999"],
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
                <span style={{ color: "#fff" }}>Total value</span>
                <span style={{ color: "#25d366" }}>₹8,493/month</span>
              </div>
            </div>
          </div>

          <div className="text-center space-y-2 mb-8">
            <p className="text-base" style={{ color: "#a1a1aa" }}>We&apos;re not charging you <strong style={{ color: "#fff" }}>₹8,493.</strong></p>
            <p className="text-base" style={{ color: "#a1a1aa" }}>Not <strong style={{ color: "#fff" }}>₹4,999.</strong></p>
            <p className="text-base" style={{ color: "#a1a1aa" }}>Not even <strong style={{ color: "#fff" }}>₹299.</strong></p>
          </div>

          <div className="rounded-2xl px-5 py-4 mb-8 text-sm leading-relaxed text-center" style={{ background: "rgba(37,211,102,0.07)", border: "1px solid rgba(37,211,102,0.15)", color: "#a1a1aa" }}>
            This is affordable because health shouldn&apos;t require a ₹5,000 gym membership. One tiny healthy habit a day should be accessible to everyone.
          </div>

          <div className="rounded-2xl p-7 text-center" style={{ background: "linear-gradient(135deg,rgba(37,211,102,0.12) 0%,rgba(29,168,81,0.08) 100%)", border: "1px solid rgba(37,211,102,0.25)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#25d366" }}>Your Price</p>
            <span style={{ fontSize: "5.5rem", lineHeight: 1, fontWeight: 900, letterSpacing: "-0.04em", color: "#25d366" }}>₹1</span>
            <p className="text-base font-bold mt-1 mb-1" style={{ color: "#fff" }}>for your first 7 days</p>
            <p className="text-sm mb-6" style={{ color: "#71717a" }}>Then ₹99/month — ₹3 per day. Less than chai.</p>
            <CTA label="Start My 7-Day Trial → ₹1" sub="Cancel before Day 7. Pay nothing more." />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          9. SOCIAL PROOF — specific, measurable, believable
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-xl mx-auto px-5 py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>What Members Say</p>
        <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", lineHeight: 1.15, letterSpacing: "-0.025em" }}>
          Real people. Tiny habits.<br />
          <span style={{ color: "#1da851" }}>Specific results.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              name: "Karan M.", city: "Pune", joined: "Energy Month", date: "May 2025",
              text: "By Day 5, I stopped needing that 3 PM coffee hit. I haven't had one since. I didn't change my diet, sleep, or exercise. One morning habit literally changed my afternoon energy.",
              avatar: "/avatars/men/man-1.jpg"
            },
            {
              name: "Priya T.", city: "Bengaluru", joined: "Sleep Month", date: "April 2025",
              text: "I've tried sleep apps, podcasts, melatonin. The WhatsApp habit took 4 minutes and I'm sleeping 45 minutes more per night — tracked on my phone. Nothing else changed.",
              avatar: "/avatars/women/woman-1.jpg"
            },
            {
              name: "Sneha R.", city: "Mumbai", joined: "Focus Month", date: "March 2025",
              text: "I was deeply skeptical. Day 12 — I finished a project I'd been avoiding for a month. Day 20 — my manager asked what had changed. I said 'one WhatsApp message a morning.'",
              avatar: "/avatars/women/woman-3.avif"
            },
            {
              name: "Amit D.", city: "Delhi", joined: "Gut Health Month", date: "June 2025",
              text: "Lifelong bloating issues. The gut habits were embarrassingly simple — add curd, chew slower, morning water. 3 weeks in, zero bloating. My wife noticed before I did.",
              avatar: "/avatars/men/man-1.jpg"
            },
          ].map(({ name, city, joined, date, text, avatar }) => (
            <div key={name} className="rounded-2xl p-5 bg-white" style={{ border: "1px solid #e2dfd6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div className="flex gap-0.5 mb-1">{[1,2,3,4,5].map(i=><Star key={i}/>)}</div>
              <div className="flex gap-2 mb-3">
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(37,211,102,0.1)", color: "#1da851" }}>{joined}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#f4f4f5", color: "#71717a" }}>{date}</span>
              </div>
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
      </section>

      {/* ══════════════════════════════════════════════════════
          10. GUARANTEE + MONTHLY THEMES + FINAL CTA
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#18181b" }} className="px-5 py-14">
        <div className="max-w-xl mx-auto">
          {/* Guarantee */}
          <div className="rounded-2xl p-6 mb-8 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="text-5xl mb-4">🛡️</div>
            <h3 className="font-bold text-lg mb-3" style={{ color: "#fff" }}>7-Day Trial for ₹1. Zero Risk.</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#a1a1aa" }}>
              7 mornings of real tiny healthy habits on WhatsApp. Your streak. Your scorecard. The full community. All for ₹1.<br /><br />
              If by Day 7 you haven&apos;t noticed a single shift — cancel. Pay nothing more.<br /><br />
              <strong style={{ color: "#fff" }}>You risk ₹1. I risk my reputation.</strong>
            </p>
          </div>

          {/* Monthly themes */}
          <div className="rounded-2xl p-5 mb-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4 text-center" style={{ color: "#25d366" }}>Choose Your First Monthly Theme</p>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {[
                { emoji: "😴", label: "Sleep" },
                { emoji: "⚡", label: "Energy" },
                { emoji: "🧠", label: "Focus" },
                { emoji: "🫀", label: "Gut Health" },
                { emoji: "🧘", label: "Stress" },
                { emoji: "💪", label: "Fitness" },
                { emoji: "💧", label: "Hydration" },
                { emoji: "❤️", label: "Heart" },
              ].map(({ emoji, label }) => (
                <div key={label} className="rounded-xl p-2 text-center" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="text-xl mb-1">{emoji}</div>
                  <div className="text-xs" style={{ color: "#a1a1aa" }}>{label}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-center" style={{ color: "#52525b" }}>You pick when you join. Switch every month.</p>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <h2 className="font-bold mb-4" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", lineHeight: 1.15, letterSpacing: "-0.025em", color: "#fff" }}>
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
          <div className="space-y-3">
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
