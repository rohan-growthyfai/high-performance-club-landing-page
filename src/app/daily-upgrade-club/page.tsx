"use client";
import { useState } from "react";

const JOIN_URL = "https://rzp.io/l/daily-upgrade-club";

// ── Primitives ─────────────────────────────────────────────────────────────
function WAIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#25d366" />
      <path d="M22.94 9.06A9.75 9.75 0 0 0 16 6.25C10.89 6.25 6.75 10.39 6.75 15.5c0 1.63.43 3.21 1.24 4.62L6.6 25.4l5.42-1.42a9.75 9.75 0 0 0 4.97 1.37c5.11 0 9.25-4.14 9.25-9.25a9.2 9.2 0 0 0-3.3-7.04Zm-6.94 14.2a8.1 8.1 0 0 1-4.12-1.12l-.3-.17-3.06.8.82-2.98-.2-.31A8.1 8.1 0 0 1 7.9 15.5c0-4.47 3.63-8.1 8.1-8.1a8.1 8.1 0 0 1 8.1 8.1c0 4.47-3.63 8.1-8.1 8.1Zm4.44-6.07c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06a6.57 6.57 0 0 1-1.93-1.19 7.24 7.24 0 0 1-1.34-1.66c-.14-.24-.01-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" fill="#fff" />
    </svg>
  );
}

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="#f59e0b" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function CTA({ label, sub, size = "md" }: { label: string; sub?: string; size?: "sm" | "md" | "lg" }) {
  const py = size === "lg" ? "py-5" : size === "sm" ? "py-3" : "py-4";
  const fontSize = size === "lg" ? "1.05rem" : "0.95rem";
  return (
    <div className="flex flex-col items-center gap-2">
      <a
        href={JOIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2.5 w-full max-w-sm px-7 ${py} rounded-full font-black text-white transition-transform active:scale-95`}
        style={{ background: "linear-gradient(135deg,#1aad4e 0%,#25d366 100%)", boxShadow: "0 6px 30px rgba(37,211,102,0.42)", fontSize }}
      >
        <WAIcon size={size === "lg" ? 22 : 18} />
        {label}
      </a>
      {sub && <p className="text-xs text-center" style={{ color: "#71717a" }}>{sub}</p>}
    </div>
  );
}

function WABubble({ from, text, time }: { from: "them" | "me"; text: string; time: string }) {
  const isMe = from === "me";
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className="rounded-2xl px-3.5 py-2.5 max-w-[82%]"
        style={{
          background: isMe ? "#dcf8c6" : "#fff",
          borderRadius: isMe ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <p className="text-sm leading-snug whitespace-pre-line" style={{ color: "#111" }}>{text}</p>
        <p className={`text-xs mt-1 ${isMe ? "text-right" : "text-right"}`} style={{ color: "#9ca3af" }}>{time} {isMe ? "✓✓" : "✓✓"}</p>
      </div>
    </div>
  );
}

function PhoneDemo({ theme, day, messages }: {
  theme: string;
  day: string;
  messages: { from: "them" | "me"; text: string; time: string }[];
}) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", maxWidth: 360, margin: "0 auto" }}>
      <div className="px-4 py-3 flex items-center gap-3" style={{ background: "#075e54" }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-white text-sm flex-shrink-0" style={{ background: "#1aad4e" }}>DU</div>
        <div>
          <p className="text-sm font-bold text-white leading-tight">Daily Upgrade Club</p>
          <p className="text-xs" style={{ color: "#a7f3d0" }}>{theme} · {day}</p>
        </div>
      </div>
      <div className="p-4 space-y-2.5" style={{ background: "#e5ddd5" }}>
        {messages.map((m, i) => <WABubble key={i} {...m} />)}
      </div>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold"
        style={{ background: "rgba(255,255,255,0.04)", color: "#e4e4e7" }}
      >
        <span>{q}</span>
        <span style={{ color: "#25d366", fontSize: "1.3rem", lineHeight: 1, flexShrink: 0, display: "inline-block", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.18s" }}>+</span>
      </button>
      {open && <div className="px-5 pb-5 pt-1 text-sm leading-relaxed" style={{ background: "rgba(255,255,255,0.02)", color: "#a1a1aa" }}>{a}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function DailyUpgradeClubPage() {
  return (
    <div style={{ fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,sans-serif", color: "#18181b", background: "#fff" }}>

      {/* ══════════════════════════════════════════════════════════════
          HERO — Specific, painful, relatable opening moment.
          Cold Meta traffic. They don't know this product.
          The hook must make them say "that's exactly me."
          Then immediately show them the product on their phone.
          CTA within first scroll on mobile.
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(170deg,#f0fdf4 0%,#fff 70%)", borderBottom: "1px solid #e4e4e7" }}>
        <div className="max-w-xl mx-auto px-5 pt-10 pb-12 text-center">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-bold uppercase tracking-widest"
            style={{ background: "rgba(37,211,102,0.1)", color: "#1aad4e", border: "1px solid rgba(37,211,102,0.22)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: "#25d366" }} />
            Daily Upgrade Club · WhatsApp
          </div>

          {/* Specific hook — a scene, not a question */}
          <h1 style={{ fontSize: "clamp(1.85rem, 6vw, 3.6rem)", lineHeight: 1.06, fontWeight: 900, letterSpacing: "-0.038em" }}>
            Every Sunday night you<br />
            plan to be healthier.<br />
            <span style={{ color: "#1aad4e" }}>Every Monday it doesn&apos;t happen.</span>
          </h1>

          <p className="text-base leading-relaxed mt-6 mb-2" style={{ color: "#52525b", maxWidth: 440, margin: "1.5rem auto 0.5rem" }}>
            Not because you don&apos;t care. Because every method you&apos;ve tried required more discipline, more time, and more willpower than a full life can reliably give it.
          </p>
          <p className="text-base leading-relaxed mb-7" style={{ color: "#52525b", maxWidth: 440, margin: "0.5rem auto 1.75rem" }}>
            <strong style={{ color: "#18181b" }}>Daily Upgrade Club sends you one tiny healthy habit every morning on WhatsApp.</strong> Under 5 minutes. You reply DONE. That&apos;s it. The system does the rest.
          </p>

          <div className="flex items-center justify-center gap-2 mb-7 flex-wrap">
            <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} />)}</div>
            <p className="text-sm" style={{ color: "#71717a" }}><strong style={{ color: "#18181b" }}>400+ members</strong> active across India · avg. 78% habit completion</p>
          </div>

          <CTA size="lg" label="Get My First Habit Tomorrow — ₹1 →" sub="7-day trial for ₹1 · Then ₹99/month (₹3/day) · Cancel anytime" />

          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {["No app to download", "Works on WhatsApp you have", "Under 5 min/day", "Cancel with one message"].map(t => (
              <span key={t} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                style={{ background: "#f4f4f5", color: "#52525b", border: "1px solid #e4e4e7" }}>
                ✓ {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PRODUCT DEMO — Show it before you explain it.
          Real WhatsApp message format. Short, like real messages.
          3 themes so they can see themselves in at least one.
          Followed immediately by a CTA.
      ══════════════════════════════════════════════════════════════ */}
      <section className="px-5 py-14" style={{ background: "#fafafa" }}>
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-2" style={{ color: "#25d366" }}>The Product — Live</p>
          <h2 className="text-center font-black mb-2" style={{ fontSize: "clamp(1.4rem, 4.5vw, 2.4rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            This lands in your WhatsApp<br />every morning at 7 AM
          </h2>
          <p className="text-center text-sm mb-10" style={{ color: "#71717a" }}>
            One habit. The science. Exactly what to do. Reply DONE. That&apos;s the whole product.
          </p>

          <div className="space-y-10">
            <PhoneDemo
              theme="Energy Month"
              day="Day 3"
              messages={[
                { from: "them", text: "Good morning! ⚡ Day 3 habit:\n\n🌞 Step outside for 5 min of sunlight within 30 min of waking.\n\nWhy: Resets cortisol rhythm — controls energy all day. No sunlight = sluggish even after coffee.\n\nGo now, or stand by a bright window.\n\nReply DONE when you're back 💪", time: "7:01 AM" },
                { from: "me", text: "DONE ✅ first time I've done this", time: "7:09 AM" },
                { from: "them", text: "🔥 Day 3 streak! Body is already recalibrating. See you tomorrow.", time: "7:09 AM" },
              ]}
            />

            <PhoneDemo
              theme="Sleep Month"
              day="Day 8"
              messages={[
                { from: "them", text: "Good morning! 😴 Day 8 habit:\n\n📵 Tonight — phone charger outside the bedroom.\n\nWhy: Blue light kills melatonin for 2 hours. Just removing the phone improves deep sleep in 3–5 nights.\n\nSet a reminder right now: move charger at 9:30 PM.\n\nReply DONE once reminder is set 🌙", time: "7:01 AM" },
                { from: "me", text: "DONE ✅ reminder set", time: "7:05 AM" },
                { from: "them", text: "🔥 Day 8! Most members feel it by Day 11. You're almost there.", time: "7:06 AM" },
              ]}
            />

            <PhoneDemo
              theme="Focus Month"
              day="Day 14"
              messages={[
                { from: "them", text: "Good morning! 🧠 Day 14 habit:\n\n⏱️ One 25-min block today — phone down, one task only, zero tabs.\n\nWhy: Every distraction costs 23 min of recovery. One protected block trains focus on demand.\n\nStart within 2 hours of reading this.\n\nReply DONE after your block 🎯", time: "7:01 AM" },
                { from: "me", text: "DONE ✅ finished something I've avoided for weeks", time: "9:41 AM" },
                { from: "them", text: "That's exactly what Day 14 feels like. 🔥 See you tomorrow.", time: "9:41 AM" },
              ]}
            />
          </div>

          <div className="mt-10">
            <p className="text-center text-sm mb-6 font-medium" style={{ color: "#52525b" }}>
              30 habits like these per month. You choose which health area to focus on.
            </p>
            <CTA label="Start Getting These Tomorrow — ₹1 →" sub="7-day trial · Cancel before Day 7, pay nothing more" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          HOW IT WORKS — Exactly what happens step by step.
          "What happens the moment I pay?" is the #1 reason
          cold traffic doesn't convert. Answer it completely.
      ══════════════════════════════════════════════════════════════ */}
      <section className="px-5 py-14" style={{ background: "#18181b" }}>
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-2" style={{ color: "#25d366" }}>How It Works</p>
          <h2 className="text-center font-black mb-12 text-white" style={{ fontSize: "clamp(1.4rem, 4.5vw, 2.4rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            3 steps. No surprises. No app.
          </h2>

          <div className="space-y-8">
            {[
              {
                n: "1",
                title: "Pay ₹1 via Razorpay",
                body: "UPI, debit card, credit card. Takes 30 seconds. You see a confirmation page immediately after.",
              },
              {
                n: "2",
                title: "Tap the WhatsApp link on your confirmation page",
                body: "One button opens WhatsApp with a pre-filled join message. You tap Send. That's it — you're added to the Daily Upgrade Club. No forms, no number sharing, no waiting.",
              },
              {
                n: "3",
                title: "Tomorrow at 7 AM, your first habit arrives",
                body: "One WhatsApp message. One tiny healthy habit. The science behind it. What to do. Reply DONE when you're back. Your streak starts. That's Day 1.",
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="flex gap-5">
                <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-black text-sm text-white" style={{ background: "#25d366" }}>
                  {n}
                </div>
                <div>
                  <p className="font-bold text-base text-white mb-1">{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#a1a1aa" }}>{body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl p-5 text-center" style={{ background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.18)" }}>
            <p className="text-sm font-semibold" style={{ color: "#25d366" }}>
              No app to download. No account to create. Just WhatsApp — which you already open every morning.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          WHO IS THIS FOR / NOT FOR — Qualify the visitor.
          Brunson: Disqualifying the wrong audience builds trust
          with the right one. "This isn't for everyone" increases
          desire in the people it IS for.
      ══════════════════════════════════════════════════════════════ */}
      <section className="px-5 py-14" style={{ background: "#fff" }}>
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-2" style={{ color: "#25d366" }}>Is This For You?</p>
          <h2 className="text-center font-black mb-10" style={{ fontSize: "clamp(1.4rem, 4.5vw, 2.4rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            This is built for one type of person.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="rounded-2xl p-5" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#15803d" }}>This IS for you if:</p>
              <div className="space-y-3">
                {[
                  "You're a working professional with a full life and zero time for big routines",
                  "You've started and quit health habits before — not from lack of care, but lack of a system",
                  "You want real results in one health area (sleep, energy, focus, gut health…)",
                  "You open WhatsApp every morning already",
                  "₹3/day feels worth it if the habits actually work",
                ].map(t => (
                  <div key={t} className="flex gap-2.5 items-start">
                    <span className="text-sm flex-shrink-0 mt-0.5" style={{ color: "#15803d" }}>✓</span>
                    <p className="text-sm leading-snug" style={{ color: "#166534" }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-5" style={{ background: "#fef2f2", border: "1px solid #fecaca" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#b91c1c" }}>This is NOT for you if:</p>
              <div className="space-y-3">
                {[
                  "You want a full fitness or diet programme",
                  "You're looking for instant dramatic transformation",
                  "You want hour-long coaching or video content",
                  "You already have a consistent daily health routine that's working",
                  "You won't open WhatsApp in the morning",
                ].map(t => (
                  <div key={t} className="flex gap-2.5 items-start">
                    <span className="text-sm flex-shrink-0 mt-0.5" style={{ color: "#b91c1c" }}>✕</span>
                    <p className="text-sm leading-snug" style={{ color: "#991b1b" }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FOUNDER — Epiphany Bridge + Attractive Character.
          Brunson: People don't buy from brands. They buy from
          people they believe went through the same thing they're
          going through. The story must recreate the belief shift.
          Credibility must be earned inside the story, not claimed.
      ══════════════════════════════════════════════════════════════ */}
      <section className="px-5 py-14" style={{ background: "#fafafa" }}>
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-2" style={{ color: "#25d366" }}>Why This Exists</p>
          <h2 className="text-center font-black mb-8" style={{ fontSize: "clamp(1.4rem, 4.5vw, 2.4rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            I was you two years ago.
          </h2>

          <div className="rounded-2xl bg-white p-6" style={{ border: "1px solid #e4e4e7", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center gap-4 mb-6 pb-5" style={{ borderBottom: "1px solid #f4f4f5" }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center font-black text-white text-xl flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#1aad4e,#25d366)" }}>R</div>
              <div>
                <p className="font-bold text-base" style={{ color: "#18181b" }}>Rohan Mote</p>
                <p className="text-sm" style={{ color: "#71717a" }}>Founder, Daily Upgrade Club</p>
                <p className="text-xs mt-0.5" style={{ color: "#a1a1aa" }}>Built and tested this with 400+ members before launch</p>
              </div>
            </div>

            <div className="space-y-4 text-base leading-relaxed" style={{ color: "#3f3f46" }}>
              <p>
                I had 3 fitness apps installed, a gym membership I used twice, and 47 health articles bookmarked &ldquo;to read this weekend.&rdquo; I genuinely wanted to be healthier. I just couldn&apos;t make anything stick longer than 2 weeks.
              </p>
              <p>
                Then I found BJ Fogg&apos;s research from Stanford — he spent a decade studying why habits fail. His finding was uncomfortable: <strong style={{ color: "#18181b" }}>we don&apos;t fail habits because we lack discipline. We fail them because we make them bigger than our worst day can handle.</strong>
              </p>
              <p>
                I ran one experiment. I replaced my entire morning routine with one thing: drink a glass of water before touching my phone. That&apos;s it. No gym. No journaling. No 5 AM wake-up.
              </p>
              <p>
                By Day 10, I was sleeping better. By Day 20, I started walking on my own — nobody told me to. The tiny habit had pulled everything forward. I hadn&apos;t changed my willpower. I had changed the size of the ask.
              </p>
              <div className="rounded-xl p-4 my-2" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                <p className="font-semibold text-base" style={{ color: "#15803d" }}>
                  I built Daily Upgrade Club to do this automatically — for anyone with a full life and no time for another complicated routine. I tested it with 40 people before I charged a single rupee. Then 200. Now 400+.
                </p>
              </div>
              <p>
                The habits work. Not because I designed them. Because the research already proved they work at this scale. I just put them in WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          YOUR FIRST 7 DAYS — concrete day-by-day journey.
          Visitors must be able to mentally experience the trial
          before they pay. If they can't picture Day 1 to Day 7,
          they don't click.
      ══════════════════════════════════════════════════════════════ */}
      <section className="px-5 py-14" style={{ background: "#fff" }}>
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-2" style={{ color: "#25d366" }}>Your 7-Day Trial</p>
          <h2 className="text-center font-black mb-3" style={{ fontSize: "clamp(1.4rem, 4.5vw, 2.4rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            Here&apos;s exactly what<br />happens each day
          </h2>
          <p className="text-center text-sm mb-10" style={{ color: "#71717a" }}>
            By Day 7 you&apos;ll have your answer. If it didn&apos;t work — cancel. Pay nothing more.
          </p>

          <div className="space-y-3">
            {[
              { day: "Day 1", title: "Your first habit arrives at 7 AM", body: "One WhatsApp message. One tiny healthy habit. Takes under 5 minutes. You reply DONE. You'll think: \"That's it?\" Yes. That's the whole thing. Streak starts.", feel: "Surprised how easy it is" },
              { day: "Day 2", title: "Second habit lands automatically", body: "You did nothing to prepare. It just arrived. Streak = 2. The accountability group is alive — you'll see others reply DONE before 8 AM. You realise you're not doing this alone.", feel: "Momentum without any effort" },
              { day: "Day 3–4", title: "The habit starts feeling expected", body: "You notice yourself checking WhatsApp at 7. The habit no longer feels like a decision — it's part of how your morning starts. That's the system working, not your willpower.", feel: "It's becoming automatic" },
              { day: "Day 5", title: "Something physically shifts", body: "Most members notice something by Day 5 — steadier energy, falling asleep faster, lighter digestion, less afternoon fog. It's not dramatic. But it's real. And nothing else changed.", feel: "Something is actually different" },
              { day: "Day 6", title: "You get an honest reminder", body: "We send you a direct message: \"Your trial ends tomorrow. To cancel, reply CANCEL now — no charge, no questions.\" You're never caught off guard.", feel: "Full control, zero pressure" },
              { day: "Day 7", title: "You make a clear-eyed decision", body: "After 7 mornings of real habits — you know whether this works for you. Most members don't cancel. Not because they forgot. Because ₹3/day for something that's actually working is an obvious yes.", feel: "The answer is already obvious" },
            ].map(({ day, title, body, feel }) => (
              <div key={day} className="rounded-2xl p-5 flex gap-4 bg-white" style={{ border: "1px solid #e4e4e7", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black text-white text-center"
                  style={{ background: "linear-gradient(135deg,#1aad4e,#25d366)" }}>
                  {day.split("–")[0].replace("Day ", "D")}
                </div>
                <div>
                  <p className="font-bold text-sm mb-1" style={{ color: "#18181b" }}>{title}</p>
                  <p className="text-sm leading-relaxed mb-2" style={{ color: "#71717a" }}>{body}</p>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(29,168,81,0.1)", color: "#1aad4e" }}>Feeling: {feel}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <CTA size="lg" label="Start Day 1 Tomorrow — ₹1 →" sub="7 days for ₹1 · Then ₹99/month · Cancel before Day 7" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          EVERYTHING YOU GET — Offer stack with honest framing.
          Each item's value anchored to what it replaces in real life
          (dietitian, coach, sleep clinic) not arbitrary numbers.
      ══════════════════════════════════════════════════════════════ */}
      <section className="px-5 py-14" style={{ background: "#f4fef7", borderTop: "1px solid #d1fae5" }}>
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-2" style={{ color: "#25d366" }}>Everything You Get</p>
          <h2 className="text-center font-black mb-10" style={{ fontSize: "clamp(1.4rem, 4.5vw, 2.4rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            The complete Daily Upgrade Club
          </h2>

          <div className="space-y-3">
            {[
              { emoji: "📲", title: "One science-backed tiny healthy habit — every morning on WhatsApp", desc: "At 7:01 AM, one habit arrives. The science behind why it works. Exactly what to do. Takes under 5 minutes. You reply DONE. 30 habits per month.", value: "₹2,999/mo", anchor: "A single session with a health coach costs ₹1,500–₹3,000" },
              { emoji: "🎯", title: "One monthly health theme you choose", desc: "Sleep · Energy · Focus · Gut Health · Stress · Fitness · Hydration · Heart Health. Pick the area you want to change. 30 habits, one thread, real depth over 30 days.", value: "₹1,799/mo", anchor: "A dietitian consultation for a specific goal: ₹1,200–₹2,500" },
              { emoji: "👥", title: "Private WhatsApp accountability group", desc: "Everyone in your group is on the same theme, same habit, same morning. When 30 people post DONE before 8 AM — you don't want to be the one who didn't.", value: "₹999/mo", anchor: "Accountability partner apps charge ₹500–₹1,000/month" },
              { emoji: "📊", title: "Weekly health scorecard — every Sunday", desc: "Your streak, completion rate, and what's shifting in your chosen theme. Tracking is what turns 20% completion into 78%.", value: "₹799/mo", anchor: "Health tracking app subscriptions: ₹400–₹800/month" },
              { emoji: "🗓️", title: "Full 30-habit calendar before Day 1", desc: "You see every habit before the month starts. No surprises. You know exactly what you're committing to.", value: "₹499", anchor: "" },
              { emoji: "🏆", title: "Permanent habit vault — 90+ tiny healthy habits", desc: "Every habit from every month stays with you. Revisit what worked. Build on it. Never lose access.", value: "₹999", anchor: "" },
              { emoji: "📩", title: "Weekly health insight — every Monday", desc: "One 3-minute read: research-backed insight on sleep, energy, gut health, or focus. Practical. No fluff.", value: "₹199/mo", anchor: "" },
            ].map(({ emoji, title, desc, value, anchor }) => (
              <div key={title} className="rounded-2xl p-5 bg-white" style={{ border: "1px solid #d1fae5", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0 mt-0.5">{emoji}</span>
                    <p className="font-bold text-sm leading-snug" style={{ color: "#18181b" }}>{title}</p>
                  </div>
                  <span className="text-xs font-bold flex-shrink-0 whitespace-nowrap px-2 py-1 rounded-full" style={{ background: "rgba(29,168,81,0.1)", color: "#1aad4e" }}>{value}</span>
                </div>
                <p className="text-sm leading-relaxed pl-8 mb-1" style={{ color: "#71717a" }}>{desc}</p>
                {anchor && <p className="text-xs pl-8 italic" style={{ color: "#a1a1aa" }}>Comparable: {anchor}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3 FALSE BELIEFS — Break each one with proof, not assertion.
          Vehicle: tiny habits can't really work
          Internal: I'm not a consistent person
          External: ₹99/month is risky
      ══════════════════════════════════════════════════════════════ */}
      <section className="px-5 py-14" style={{ background: "#fff" }}>
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-2" style={{ color: "#25d366" }}>The 3 Objections</p>
          <h2 className="text-center font-black mb-10" style={{ fontSize: "clamp(1.4rem, 4.5vw, 2.4rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            What&apos;s making you hesitate —<br />
            <span style={{ color: "#1aad4e" }}>and why it shouldn&apos;t</span>
          </h2>

          <div className="space-y-5">
            {[
              {
                belief: "\"One tiny habit can't really change my health. I need a real programme.\"",
                reframe: "BJ Fogg's Stanford research tracked 40,000+ people building habits. The consistent finding: people who start with tiny habits are more likely to still be at it 6 months later than people who start with big routines. Why? Because tiny habits survive bad weeks. Your big routine doesn't. Members who started with \"5 min morning sunlight\" ended the month also sleeping better, eating better, and moving more — without being told to. One habit pulls everything forward.",
              },
              {
                belief: "\"I've tried habits before. I always quit. I'm just not a consistent person.\"",
                reframe: "You quit because the habit was bigger than your worst day could handle. A habit that takes 5 minutes and arrives in your WhatsApp automatically doesn't ask for your motivation — the system provides the trigger. You just respond. The members who described themselves as \"chronically inconsistent\" averaged 78% completion in Month 1. Not because they changed. Because the system changed.",
              },
              {
                belief: "\"₹99/month sounds like something I'll pay for and never use.\"",
                reframe: "This is exactly why the trial is ₹1. You don't decide on this page. You decide after 7 mornings of real habits in your WhatsApp. If by Day 7 nothing shifted — message CANCEL. Nothing more owed. You risk ₹1. After the trial, if it works: ₹99/month is ₹3/day — less than one coffee, less than one gym visit, less than one supplement capsule. That math only looks bad before you've felt it working.",
              },
            ].map(({ belief, reframe }, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e4e4e7", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <div className="px-5 py-4" style={{ background: "#fef2f2", borderBottom: "1px solid #fecaca" }}>
                  <p className="text-sm font-bold" style={{ color: "#b91c1c" }}>❌ {belief}</p>
                </div>
                <div className="px-5 py-4 bg-white">
                  <p className="text-sm leading-relaxed" style={{ color: "#3f3f46" }}>
                    <strong style={{ color: "#15803d" }}>The truth: </strong>{reframe}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          IF ALL THIS DID WAS × 3 — Brunson's strongest close.
          Isolate each outcome. One outcome should be worth the price.
          All three together makes "no" feel irrational.
      ══════════════════════════════════════════════════════════════ */}
      <section className="px-5 py-14" style={{ background: "#18181b" }}>
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-2" style={{ color: "#25d366" }}>Think About This Honestly</p>
          <h2 className="text-center font-black mb-10 text-white" style={{ fontSize: "clamp(1.4rem, 4.5vw, 2.4rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            Any one of these alone<br />
            <span style={{ color: "#25d366", fontStyle: "italic", fontWeight: 400 }}>would be worth it.</span>
          </h2>

          <div className="space-y-4">
            {[
              { prefix: "If all this did was", bold: "give you steady energy from morning to evening — no 3 PM crash, no second coffee, no dragging yourself to 6 PM", suffix: "— would 7 days for ₹1 be worth finding out?" },
              { prefix: "If all this did was", bold: "make you the kind of person who actually follows through on their health — every month, not just January", suffix: "— is ₹3/day too much to pay for that?" },
              { prefix: "If all this did was", bold: "let you say six months from now, 'I'm actually taking care of myself' — and genuinely mean it, with proof", suffix: "— what would that be worth to you?" },
            ].map(({ prefix, bold, suffix }, i) => (
              <div key={i} className="rounded-2xl px-6 py-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <p className="text-base leading-relaxed" style={{ color: "#d4d4d8" }}>
                  <span style={{ color: "#71717a" }}>{prefix} </span>
                  <strong style={{ color: "#fff" }}>{bold}</strong>
                  <span style={{ color: "#71717a" }}> {suffix}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PRICE REVEAL — Stack the value. Drop to real price.
          Show ₹99 as ₹3/day. Compare to things they already spend.
          Make the ₹1 trial feel risk-free by framing it explicitly.
      ══════════════════════════════════════════════════════════════ */}
      <section className="px-5 py-14" style={{ background: "#0f0f0f" }}>
        <div className="max-w-md mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-2" style={{ color: "#25d366" }}>What It&apos;s Worth vs. What You Pay</p>
          <h2 className="text-center font-black mb-10 text-white" style={{ fontSize: "clamp(1.4rem, 4.5vw, 2.4rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            Here&apos;s the real math.
          </h2>

          <div className="rounded-2xl overflow-hidden mb-8" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)" }}>
            {[
              ["📲", "Daily habit on WhatsApp × 30", "₹2,999"],
              ["🎯", "Monthly health theme programme", "₹1,799"],
              ["👥", "Private accountability group", "₹999"],
              ["📊", "Weekly health scorecard", "₹799"],
              ["🗓️", "30-habit calendar + PDF guide", "₹499"],
              ["🏆", "Permanent habit vault (90+ habits)", "₹999"],
              ["📩", "Weekly health insight newsletter", "₹199"],
            ].map(([emoji, name, value], idx, arr) => (
              <div key={idx} className="flex items-center justify-between gap-3 px-5 py-3"
                style={{ borderBottom: idx < arr.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <div className="flex items-center gap-2.5">
                  <span className="text-base flex-shrink-0">{emoji}</span>
                  <span className="text-sm" style={{ color: "#a1a1aa" }}>{name}</span>
                </div>
                <span className="text-sm font-semibold flex-shrink-0" style={{ color: "#4b5563" }}>{value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between gap-3 px-5 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <span className="font-bold text-white">Total value</span>
              <span className="font-bold" style={{ color: "#25d366" }}>₹8,493/month</span>
            </div>
          </div>

          <div className="text-center space-y-1.5 mb-8">
            <p className="text-base" style={{ color: "#6b7280" }}>Not <span className="font-bold line-through" style={{ color: "#9ca3af" }}>₹8,493</span>.</p>
            <p className="text-base" style={{ color: "#6b7280" }}>Not <span className="font-bold line-through" style={{ color: "#9ca3af" }}>₹4,999</span>.</p>
            <p className="text-base" style={{ color: "#6b7280" }}>Not even <span className="font-bold line-through" style={{ color: "#9ca3af" }}>₹299</span>.</p>
          </div>

          <div className="rounded-2xl p-7 text-center" style={{ background: "linear-gradient(135deg,rgba(37,211,102,0.1),rgba(29,168,81,0.06))", border: "1px solid rgba(37,211,102,0.22)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#25d366" }}>Your price</p>
            <div className="flex items-end justify-center gap-2 mb-1">
              <span style={{ fontSize: "5.5rem", lineHeight: 1, fontWeight: 900, letterSpacing: "-0.04em", color: "#25d366" }}>₹1</span>
              <span className="text-lg font-bold text-white mb-3">for 7 days</span>
            </div>
            <p className="text-sm mb-1" style={{ color: "#9ca3af" }}>Then ₹99/month — which is <strong style={{ color: "#fff" }}>₹3/day</strong></p>

            <div className="flex flex-wrap justify-center gap-2 my-5">
              {[
                ["₹150", "one coffee"],
                ["₹500", "one gym visit"],
                ["₹600", "one health supplement"],
              ].map(([price, vs]) => (
                <div key={vs} className="text-xs px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)", color: "#9ca3af" }}>
                  ₹3 vs <span style={{ color: "#e5e7eb" }}>{price}</span> for {vs}
                </div>
              ))}
            </div>

            <CTA size="lg" label="Start My 7-Day Trial — ₹1 →" sub="Cancel before Day 7 — pay nothing more" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SOCIAL PROOF — Specific people, specific results.
          No vague positivity. Measurable outcomes only.
          Format: person → what they tried before → specific result → timeframe
      ══════════════════════════════════════════════════════════════ */}
      <section className="px-5 py-14" style={{ background: "#fff" }}>
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-2" style={{ color: "#25d366" }}>Member Results</p>
          <h2 className="text-center font-black mb-10" style={{ fontSize: "clamp(1.4rem, 4.5vw, 2.4rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            Specific people. Specific results.<br />
            <span style={{ color: "#1aad4e" }}>Nothing vague.</span>
          </h2>

          <div className="space-y-4">
            {[
              {
                name: "Karan M.", city: "Pune", job: "Software engineer, 10-hr days",
                theme: "Energy Month", period: "May 2026",
                result: "No 3 PM coffee hit since Day 6",
                quote: "By Day 5 I stopped needing my afternoon coffee. I'm a software engineer who works 10-hour days — the 3 PM crash was just how life worked. One 5-minute morning sunlight habit. Nothing else changed. I still haven't had a 3 PM coffee in 3 weeks. My evenings have energy I haven't had in years.",
              },
              {
                name: "Priya T.", city: "Bengaluru", job: "Product manager, 2 kids",
                theme: "Sleep Month", period: "April 2026",
                result: "Sleeping 47 minutes more — tracked on Samsung Health",
                quote: "I've tried sleep podcasts, melatonin, blue-light glasses — none of it worked past week 2. The WhatsApp habit took 4 minutes. By Day 9, I was sleeping 47 minutes more per night. I know because I track it. My husband asked what I was doing differently. I showed him a WhatsApp message.",
              },
              {
                name: "Sneha R.", city: "Mumbai", job: "Marketing consultant",
                theme: "Focus Month", period: "March 2026",
                result: "Cleared 6-week backlog in 14 days",
                quote: "I was deeply skeptical. Day 12 — I finished a project that had been sitting for 6 weeks. Day 17 — my manager pulled me into a meeting to ask what had changed in my output. I showed her the 7 AM message from that morning. She asked for the link.",
              },
              {
                name: "Vivek P.", city: "Hyderabad", job: "Finance professional",
                theme: "Gut Health Month", period: "February 2026",
                result: "Zero bloating after 18 days — gone for the first time in 4 years",
                quote: "Four years of bloating. Tried 2 elimination diets, a GI specialist, two different probiotics. The gut habits here were embarrassingly simple — plain curd with lunch, chew slower, one glass of water before food. 18 days. Bloating is gone. My wife keeps asking what I'm taking. I show her my phone.",
              },
            ].map(({ name, city, job, theme, period, result, quote }) => (
              <div key={name} className="rounded-2xl p-5 bg-white" style={{ border: "1px solid #e4e4e7", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <div className="flex gap-0.5 mb-2">{[1,2,3,4,5].map(i => <Star key={i} />)}</div>
                <p className="text-sm font-semibold mb-1" style={{ color: "#1aad4e" }}>📌 {result}</p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#3f3f46" }}>&ldquo;{quote}&rdquo;</p>
                <div className="pt-3 flex items-center justify-between gap-2 flex-wrap" style={{ borderTop: "1px solid #f4f4f5" }}>
                  <div>
                    <p className="text-xs font-bold" style={{ color: "#18181b" }}>{name} · {city}</p>
                    <p className="text-xs" style={{ color: "#a1a1aa" }}>{job}</p>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(29,168,81,0.1)", color: "#1aad4e" }}>{theme}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#f4f4f5", color: "#71717a" }}>{period}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 rounded-2xl text-center" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
            <p className="text-sm font-semibold" style={{ color: "#15803d" }}>
              400+ active members · Average 78% habit completion rate in Month 1
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          GUARANTEE + THEME PICKER + URGENCY
      ══════════════════════════════════════════════════════════════ */}
      <section className="px-5 py-14" style={{ background: "#18181b" }}>
        <div className="max-w-xl mx-auto">

          <div className="rounded-2xl p-7 mb-8 text-center" style={{ background: "rgba(37,211,102,0.06)", border: "1px solid rgba(37,211,102,0.2)" }}>
            <div className="text-5xl mb-4">🛡️</div>
            <h3 className="font-black text-xl mb-3 text-white">7 Days. ₹1. Zero risk.</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#a1a1aa" }}>
              Full access to everything — habits, group, scorecard, vault — for 7 mornings.<br /><br />
              If by Day 7 you haven&apos;t noticed a single shift in how you feel: reply CANCEL. You&apos;re out immediately. No charge. No questions.<br /><br />
              <strong style={{ color: "#fff" }}>You risk ₹1. I risk my reputation.</strong>
            </p>
          </div>

          <div className="rounded-2xl p-5 mb-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>Pick Your First Month&apos;s Theme</p>
            <div className="grid grid-cols-4 gap-2">
              {[
                { e: "😴", l: "Sleep" }, { e: "⚡", l: "Energy" }, { e: "🧠", l: "Focus" }, { e: "🫀", l: "Gut Health" },
                { e: "🧘", l: "Stress" }, { e: "💪", l: "Fitness" }, { e: "💧", l: "Hydration" }, { e: "❤️", l: "Heart" },
              ].map(({ e, l }) => (
                <div key={l} className="rounded-xl p-2.5 text-center" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="text-xl mb-1">{e}</div>
                  <div className="text-xs" style={{ color: "#9ca3af" }}>{l}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-center mt-4" style={{ color: "#4b5563" }}>You pick on joining. Switch every month.</p>
          </div>

          <div className="rounded-xl px-5 py-4 mb-8" style={{ background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.18)" }}>
            <p className="text-sm text-center font-semibold" style={{ color: "#fbbf24" }}>
              ⏰ July group opens July 1st — 23 spots remaining for the Energy theme launch
            </p>
          </div>

          <div className="text-center">
            <h2 className="font-black mb-3 text-white" style={{ fontSize: "clamp(1.4rem, 4vw, 2.2rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
              Your health doesn&apos;t need<br />a bigger routine.<br />
              <span style={{ color: "#25d366" }}>It needs a better system.</span>
            </h2>
            <p className="text-base mb-8" style={{ color: "#9ca3af" }}>One tiny healthy habit. Every morning. On WhatsApp.<br />Start for ₹1. Decide after you feel the difference.</p>
            <CTA size="lg" label="Get My First Habit Tomorrow — ₹1 →" sub="7 days for ₹1 · Then ₹99/month (₹3/day) · Cancel before Day 7" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FAQ — Conversion rescue. Every objection that makes
          someone stop and almost leave, answered completely.
      ══════════════════════════════════════════════════════════════ */}
      <section className="px-5 py-14" style={{ background: "#0a0a0a" }}>
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-2" style={{ color: "#25d366" }}>FAQ</p>
          <h2 className="text-center font-black mb-8 text-white" style={{ fontSize: "clamp(1.3rem, 4vw, 2rem)", lineHeight: 1.15 }}>
            Every question, answered.
          </h2>
          <div className="space-y-2">
            {[
              { q: "What exactly is a tiny healthy habit?", a: "One specific, science-backed action under 5 minutes — tied to your monthly theme. Examples: 5 min morning sunlight (Energy), one spoon plain curd with lunch (Gut Health), phone charger outside bedroom tonight (Sleep), one 25-min focus block (Focus). Every habit comes with the why — the specific mechanism behind why this action produces the result." },
              { q: "What happens the exact moment I pay?", a: "You pay ₹1 on Razorpay. Confirmation page appears immediately — with a WhatsApp join link. You tap it. WhatsApp opens with a pre-filled message. You hit Send. You're added to Daily Upgrade Club. Tomorrow at 7 AM, your first habit arrives. Total time from payment to joining: under 2 minutes." },
              { q: "Do I need to share my WhatsApp number anywhere?", a: "No. The WhatsApp join link opens WhatsApp directly on your phone. You send one pre-filled message. We receive it and add you. No number forms, no manual data entry — it works exactly like clicking a WhatsApp link from a friend." },
              { q: "What happens after 7 days? Will I be charged without warning?", a: "On Day 6 we send you a direct message: 'Your trial ends tomorrow. Reply CANCEL to stop — no charge.' If you don't cancel, ₹99 is charged on Day 8. You get a reminder before every charge, always. We don't trap people." },
              { q: "How do I cancel?", a: "Reply CANCEL on WhatsApp. Done immediately. No forms, no calls, no explaining yourself. If you cancel mid-month after paying ₹99, you stay in until the month ends — no partial refunds, but no being cut off mid-streak either." },
              { q: "What if I miss a day?", a: "Nothing bad happens. You get a gentle nudge if you haven't replied DONE by 8 PM. One missed day doesn't break your streak or your progress. We're building a long-term habit — not punishing you for being human." },
              { q: "Can I choose a different theme each month?", a: "Yes. At the start of each month, we ask which theme you want next. Some people cycle through all 8. Some repeat the same theme to go deeper. Some do Sleep twice in a row because it worked. No wrong answer." },
              { q: "Is this just generic health advice I could Google?", a: "No. Each habit is specific to your monthly theme, sequenced to build on the previous one over 30 days, and delivered at a time when you're most likely to do it — morning, before your phone owns you. You could find these habits by Googling. What you can't Google is a system that delivers them automatically, tracks your streak, and keeps you in a group of people doing the same thing." },
              { q: "Why is the trial ₹1 and not free?", a: "Free trials have near-zero perceived value — people sign up and never show up. ₹1 is a commitment. It tells you this is real, and it tells us you're serious. It also means we're betting that once you feel 7 days of this, ₹99/month is an obvious yes." },
            ].map(({ q, a }) => (
              <FAQ key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FINAL CLOSE — Two futures. Emotional urgency.
          The last thing they read before clicking must create
          the feeling that NOT clicking has a real cost.
          Brunson: Make the cost of inaction vivid.
      ══════════════════════════════════════════════════════════════ */}
      <section className="px-5 py-16" style={{ background: "linear-gradient(165deg,#f0fdf4 0%,#fff 70%)", borderTop: "1px solid #d1fae5" }}>
        <div className="max-w-lg mx-auto text-center">
          <p className="text-4xl mb-6">🌱</p>
          <h2 className="font-black mb-5" style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)", lineHeight: 1.05, letterSpacing: "-0.04em" }}>
            Six months from now,<br />you&apos;re going to be the same.<br />
            <span style={{ color: "#1aad4e" }}>Or you&apos;re going to be different.</span>
          </h2>

          <p className="text-base leading-relaxed mb-4" style={{ color: "#52525b", maxWidth: 420, margin: "0 auto 1rem" }}>
            The version of you that didn&apos;t click: still planning to start, still meaning to sleep better, still at the same energy level, still saying &ldquo;once things calm down.&rdquo;
          </p>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#52525b", maxWidth: 420, margin: "0 auto 2rem" }}>
            The version that did: 180 tiny healthy habits later. One theme changed. Maybe two. The kind of person who actually follows through — not because willpower improved, but because the system made it automatic.
          </p>
          <p className="text-lg font-bold mb-8" style={{ color: "#18181b" }}>
            ₹1. Tomorrow morning. 7 AM. One habit in your WhatsApp.<br />
            <span style={{ color: "#1aad4e" }}>That&apos;s the only difference.</span>
          </p>

          <CTA size="lg" label="Get My First Habit Tomorrow — ₹1 →" sub="7-day trial · Then ₹99/month (₹3/day) · Cancel before Day 7, pay nothing more" />

          <div className="mt-8 pt-6" style={{ borderTop: "1px solid #d1fae5" }}>
            <p className="text-sm" style={{ color: "#71717a" }}>
              Built by <strong style={{ color: "#18181b" }}>Rohan Mote</strong> · Questions?{" "}
              <a href="https://wa.me/918956146485?text=Hi+Rohan%2C+I+have+a+question+about+the+Daily+Upgrade+Club"
                className="underline font-medium" style={{ color: "#1aad4e" }}>
                Chat directly on WhatsApp →
              </a>
            </p>
          </div>
        </div>
      </section>

      <footer className="px-5 py-7 text-center" style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p className="text-xs" style={{ color: "#3f3f46" }}>
          © {new Date().getFullYear()} Daily Upgrade Club ·{" "}
          <a href="https://www.highperformanceclub.co" className="underline" style={{ color: "#3f3f46" }}>highperformanceclub.co</a>
        </p>
        <p className="text-xs mt-1" style={{ color: "#27272a" }}>
          7-day trial ₹1 · Then ₹99/month · Cancel anytime — reply CANCEL on WhatsApp
        </p>
      </footer>
    </div>
  );
}
