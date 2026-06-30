"use client";

import { useState } from "react";

const JOIN_URL = "https://rzp.io/l/daily-upgrade-club";

// ─── WAIcon ───────────────────────────────────────────────────────────────────
function WAIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.406A9.956 9.956 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.955 7.955 0 0 1-4.076-1.118l-.292-.174-3.024.854.854-3.024-.174-.292A7.955 7.955 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8zm4.406-5.845c-.241-.12-1.428-.704-1.65-.784-.22-.08-.381-.12-.541.12-.16.241-.621.784-.762.944-.14.16-.281.18-.522.06-.241-.12-1.018-.375-1.94-1.197-.717-.64-1.2-1.43-1.341-1.671-.14-.241-.015-.371.105-.491.108-.108.241-.281.361-.422.12-.14.16-.241.241-.401.08-.16.04-.301-.02-.422-.06-.12-.541-1.304-.741-1.786-.195-.468-.394-.404-.541-.412l-.461-.008c-.16 0-.421.06-.642.301-.22.241-.841.822-.841 2.005s.861 2.326.981 2.487c.12.16 1.696 2.59 4.11 3.632.575.248 1.023.396 1.372.507.576.183 1.1.157 1.514.095.462-.069 1.428-.583 1.63-1.146.2-.562.2-1.044.14-1.146-.06-.1-.22-.16-.461-.28z" />
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

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <a
        href={JOIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full max-w-sm px-6 py-4 rounded-full text-white font-bold text-base shadow-lg transition-transform hover:scale-105 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #25d366 0%, #1aad4e 100%)",
          boxShadow: "0 4px 24px rgba(37,211,102,0.35)",
        }}
      >
        <WAIcon size={20} />
        {label}
      </a>
      {sub && <p className="text-xs text-center" style={{ color: "#6b7280" }}>{sub}</p>}
    </div>
  );
}

// ─── WABubble ─────────────────────────────────────────────────────────────────
function WABubble({ from, text, time }: { from: "them" | "me"; text: string; time: string }) {
  const isMe = from === "me";
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className="relative max-w-[85%] px-3 py-2 text-sm leading-relaxed"
        style={{
          background: isMe ? "#dcf8c6" : "#ffffff",
          borderRadius: isMe ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
          color: "#111",
        }}
      >
        <p style={{ whiteSpace: "pre-line" }}>{text}</p>
        <p className="text-right mt-1" style={{ fontSize: "10px", color: "#888", lineHeight: 1 }}>{time}</p>
      </div>
    </div>
  );
}

// ─── PhoneDemo ────────────────────────────────────────────────────────────────
function PhoneDemo() {
  return (
    <div className="mx-auto rounded-[32px] overflow-hidden shadow-2xl" style={{ width: "290px", border: "10px solid #1a1a1a", background: "#1a1a1a" }}>
      <div className="px-3 py-3 flex items-center gap-3" style={{ background: "#075e54" }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ background: "#25d366" }}>DU</div>
        <div>
          <p className="text-white font-semibold text-sm leading-tight">Daily Upgrade Club</p>
          <p style={{ color: "#a8d5b5", fontSize: "11px" }}>online</p>
        </div>
      </div>
      <div className="px-3 py-4" style={{ background: "#e5ddd5", minHeight: "300px" }}>
        <WABubble
          from="them"
          text={"☀️ Day 3 — Energy Month\n\nToday's habit: 10 min of morning sunlight — no phone, no coffee yet.\n\nStep outside within 30 min of waking. Face the sun.\n\nWhy: morning light sets your cortisol rhythm. More awake in 20 min, better sleep tonight.\n\nTime needed: 10 min\n\nReply DONE when you're back."}
          time="7:01 AM"
        />
        <WABubble from="me" text="DONE" time="7:14 AM" />
        <WABubble from="them" text={"✅ Day 3 streak.\n\nYour cortisol rhythm is recalibrating. See you tomorrow at 7. 🌅"} time="7:14 AM" />
      </div>
    </div>
  );
}

// ─── BeliefsCard ──────────────────────────────────────────────────────────────
function BeliefsCard({ belief, reframe }: { belief: string; reframe: string }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm" style={{ border: "1px solid #e5e7eb" }}>
      <div className="px-5 py-4" style={{ background: "#fff1f2" }}>
        <p className="font-semibold text-xs uppercase tracking-widest mb-1" style={{ color: "#9f1239" }}>False belief</p>
        <p className="font-semibold text-sm" style={{ color: "#be123c" }}>&ldquo;{belief}&rdquo;</p>
      </div>
      <div className="px-5 py-4" style={{ background: "#ffffff" }}>
        <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>{reframe}</p>
      </div>
    </div>
  );
}

// ─── Testimonial ──────────────────────────────────────────────────────────────
function Testimonial({ initials, name, city, job, theme, stat, quote }: {
  initials: string; name: string; city: string; job: string; theme: string; stat: string; quote: string;
}) {
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-3" style={{ background: "#ffffff", border: "1px solid #e5e7eb" }}>
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)" }}
        >
          {initials}
        </div>
        <div>
          <p className="font-semibold text-sm" style={{ color: "#111827" }}>{name}</p>
          <p className="text-xs" style={{ color: "#6b7280" }}>{city} · {job}</p>
          <p className="text-xs" style={{ color: "#25d366" }}>{theme}</p>
        </div>
      </div>
      <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} />)}</div>
      <div className="px-3 py-2 rounded-lg text-sm font-semibold" style={{ background: "#f0fdf4", color: "#15803d" }}>
        📌 {stat}
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>&ldquo;{quote}&rdquo;</p>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b cursor-pointer" style={{ borderColor: "#2d2d30" }} onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-between py-4">
        <p className="font-medium text-white pr-4 text-sm">{q}</p>
        <span className="text-xl font-light flex-shrink-0" style={{ color: "#25d366" }}>{open ? "−" : "+"}</span>
      </div>
      {open && <p className="pb-4 text-sm leading-relaxed" style={{ color: "#9ca3af" }}>{a}</p>}
    </div>
  );
}

// ─── DayCard ──────────────────────────────────────────────────────────────────
function DayCard({ day, title, body, feel }: { day: number | string; title: string; body: string; feel: string }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: "#ffffff", border: "1px solid #e5e7eb" }}>
      <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#25d366" }}>Day {day}</p>
      <p className="font-bold text-base mb-2" style={{ color: "#111827" }}>{title}</p>
      <p className="text-sm leading-relaxed mb-3" style={{ color: "#4b5563" }}>{body}</p>
      <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: "#f0fdf4", color: "#15803d" }}>
        you feel: {feel}
      </span>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function DailyUpgradeClubPage() {
  const themes = [
    { emoji: "😴", label: "Sleep" },
    { emoji: "⚡", label: "Energy" },
    { emoji: "🧠", label: "Focus" },
    { emoji: "🌿", label: "Gut Health" },
    { emoji: "🧘", label: "Stress" },
    { emoji: "💪", label: "Fitness" },
    { emoji: "💧", label: "Hydration" },
    { emoji: "❤️", label: "Heart Health" },
  ];

  return (
    <main style={{ fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,sans-serif", background: "#faf8f3", color: "#111827" }}>

      {/* ══ 1. HERO ══════════════════════════════════════════════════════════ */}
      <section className="px-5 py-14">
        <div className="max-w-xl mx-auto flex flex-col gap-6">

          <div className="flex justify-center">
            <span className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold" style={{ background: "#dcfce7", color: "#15803d" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: "#25d366" }} />
              Daily Upgrade Club · 400+ members · WhatsApp
            </span>
          </div>

          <h1 className="text-center font-extrabold leading-tight" style={{ fontSize: "clamp(1.8rem,5.5vw,3.2rem)", letterSpacing: "-0.03em", color: "#111827" }}>
            You&apos;ve been meaning to take care of your health for 6 months.
            Tonight you&apos;ll plan to start tomorrow.{" "}
            <span style={{ color: "#1aad4e" }}>Tomorrow you won&apos;t.</span>
          </h1>

          <p className="text-lg leading-relaxed text-center" style={{ color: "#374151" }}>
            Every morning at 7 AM, WhatsApp sends you one tiny healthy habit. Takes 5 minutes. Reply DONE. That&apos;s the whole product.
          </p>

          <div className="rounded-2xl p-5 flex flex-col gap-3" style={{ background: "#ffffff", border: "1px solid #e5e7eb" }}>
            <p className="font-semibold" style={{ color: "#111827" }}>📲 One habit. Every morning. WhatsApp.</p>
            <p className="font-semibold" style={{ color: "#111827" }}>⏱️ Under 5 minutes.</p>
            <p className="font-semibold" style={{ color: "#111827" }}>✅ Reply DONE. Done.</p>
          </div>

          <p className="text-sm text-center" style={{ color: "#6b7280" }}>
            400+ members · avg. 4 min 12 sec to complete · 78% completion rate month 1
          </p>

          <CTA
            label="Start My 7-Day Trial for ₹1 →"
            sub="7 days for ₹1 · Then ₹3/day (₹99/month) · Cancel anytime — reply CANCEL on WhatsApp"
          />

          <div className="flex flex-wrap justify-center gap-2">
            {["No app", "WhatsApp only", "Under 5 min/day", "Cancel instantly"].map(chip => (
              <span key={chip} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: "#f3f4f6", color: "#374151" }}>
                ✓ {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 2. WHAT IS THIS? ═════════════════════════════════════════════════ */}
      <section className="px-5 py-14" style={{ background: "#ffffff" }}>
        <div className="max-w-xl mx-auto flex flex-col gap-8">
          <h2 className="text-2xl font-extrabold text-center" style={{ color: "#111827" }}>
            Here&apos;s exactly what you get.
          </h2>
          <p className="text-center text-base" style={{ color: "#374151" }}>
            Every morning at 7 AM, this arrives in your WhatsApp:
          </p>

          <PhoneDemo />

          <p className="text-center font-semibold" style={{ color: "#374151" }}>
            That&apos;s it. One habit. The science behind it. What to do. Reply DONE.
          </p>
          <p className="text-center" style={{ color: "#6b7280" }}>
            30 habits like this per month. You pick the health area you want to improve.
          </p>

          <div className="grid grid-cols-4 gap-3">
            {themes.map(t => (
              <div key={t.label} className="flex flex-col items-center gap-1 rounded-xl p-3" style={{ background: "#faf8f3", border: "1px solid #e5e7eb" }}>
                <span className="text-2xl">{t.emoji}</span>
                <span className="text-xs text-center font-medium" style={{ color: "#374151" }}>{t.label}</span>
              </div>
            ))}
          </div>

          <CTA
            label="Start My 7-Day Trial for ₹1 →"
            sub="7 days for ₹1 · Then ₹3/day (₹99/month) · Cancel anytime"
          />
        </div>
      </section>

      {/* ══ 3. HOW TO JOIN ═══════════════════════════════════════════════════ */}
      <section className="px-5 py-14" style={{ background: "#faf8f3" }}>
        <div className="max-w-xl mx-auto flex flex-col gap-8">
          <h2 className="text-2xl font-extrabold text-center" style={{ color: "#111827" }}>
            How to start. Takes 2 minutes.
          </h2>

          <div className="flex flex-col gap-6">
            {[
              { num: "1", title: "Pay ₹1", body: "Razorpay — UPI, debit card, credit card, net banking. 30 seconds." },
              { num: "2", title: "Tap the WhatsApp link on your confirmation page", body: "One button. Tap it. WhatsApp opens with a pre-filled message already typed. Tap Send. You're in. No number forms. No manual entry. Done." },
              { num: "3", title: "Tomorrow at 7 AM, your first habit arrives", body: "One message. One habit. The science. What to do. Reply DONE. Day 1 streak starts." },
            ].map(step => (
              <div key={step.num} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 text-sm" style={{ background: "#25d366" }}>
                  {step.num}
                </div>
                <div>
                  <p className="font-bold text-base" style={{ color: "#111827" }}>{step.title}</p>
                  <p className="text-sm mt-1 leading-relaxed" style={{ color: "#6b7280" }}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-4 text-center" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
            <p className="text-sm font-medium" style={{ color: "#15803d" }}>
              No app to download. No account to create. Just WhatsApp — which you already open every morning.
            </p>
          </div>
        </div>
      </section>

      {/* ══ 4. WHO IS ROHAN ══════════════════════════════════════════════════ */}
      <section className="px-5 py-14" style={{ background: "#ffffff" }}>
        <div className="max-w-xl mx-auto flex flex-col gap-6">
          <div className="rounded-2xl p-6" style={{ background: "#faf8f3", border: "1px solid #e5e7eb" }}>
            <div className="flex items-center gap-4 mb-5 pb-5" style={{ borderBottom: "1px solid #e5e7eb" }}>
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #1aad4e 0%, #075e54 100%)" }}
              >
                <span className="text-white font-extrabold text-xl">R</span>
              </div>
              <div>
                <p className="font-bold text-lg" style={{ color: "#111827" }}>Rohan Mote</p>
                <p className="text-sm" style={{ color: "#6b7280" }}>Founder, Daily Upgrade Club</p>
                <p className="text-xs mt-0.5" style={{ color: "#25d366" }}>Tested with 40 people, then 200, now 400+ members</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-base leading-relaxed" style={{ color: "#374151" }}>
              <p>I&apos;m the person who had 3 fitness apps and used none of them.</p>
              <p>
                Then I found BJ Fogg&apos;s research from Stanford. He spent years studying why habits fail. His answer: <strong style={{ color: "#111827" }}>we make habits bigger than our worst day can handle.</strong> On our worst day — when we need them most — we skip. Then feel bad. Then quit.
              </p>
              <p>
                I tried one experiment. One thing only: drink water before touching my phone. By Day 10 I was sleeping better. By Day 20 I was walking without deciding to walk. The habit was just happening.
              </p>
              <p>
                I built this because I wanted to send that same trigger to people automatically. A 7 AM message. One habit. Done in 5 minutes.
              </p>
              <p>
                I tested it with 40 people before charging anyone. Then 200. The results were consistent. Not because I&apos;m extraordinary — because the system is small enough to actually work on real people with real lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. YOUR FIRST 7 DAYS ═════════════════════════════════════════════ */}
      <section className="px-5 py-14" style={{ background: "#faf8f3" }}>
        <div className="max-w-xl mx-auto flex flex-col gap-6">
          <h2 className="text-2xl font-extrabold text-center" style={{ color: "#111827" }}>
            Your first 7 days.
          </h2>
          <p className="text-center text-sm" style={{ color: "#6b7280" }}>
            By Day 7 you&apos;ll know. If nothing shifted — cancel. You risked ₹1.
          </p>

          <div className="flex flex-col gap-3">
            <DayCard day={1} title="The first 7 AM." body="One tiny habit. Under 5 minutes. The bar is so low it's almost funny — and that's exactly the point. You reply DONE. Streak starts." feel="curious" />
            <DayCard day={2} title="Building the reflex." body="Your phone lit up yesterday and you did something good with it. Today it happened again. You didn't have to remember. The system remembered." feel="oddly satisfied" />
            <DayCard day={3} title="The streak is real." body="Three mornings. Something is different. You don't know what yet. But something is. The habit is starting to feel like yours." feel="in motion" />
            <DayCard day={4} title="The habit is yours now." body="You did it before you thought about it. That's the sign. Moved from decision to reflex. The hard part is already behind you." feel="surprised" />
            <DayCard day={5} title="Something physical shifts." body="Most members notice it here. Not dramatic. One thing — less foggy, clearer afternoon, sleeping more easily. And nothing else changed." feel="convinced" />
            <DayCard day={6} title="Trial ends tomorrow. Cancel if you need to." body="We'll remind you inside the app. Reply CANCEL anytime. No charge if you do. But look at what happened across 6 mornings. You did that." feel="honest" />
            <DayCard day={7} title="₹3/day for something that's working. The math answers itself." body="You know if it's working. You don't need me to tell you. The price of one chai decides whether you keep it." feel="decided" />
          </div>

          <CTA label="Start My 7-Day Trial for ₹1 →" sub="7 days for ₹1 · Then ₹3/day (₹99/month) · Cancel anytime" />
        </div>
      </section>

      {/* ══ 6. 3 FALSE BELIEFS ═══════════════════════════════════════════════ */}
      <section className="px-5 py-14" style={{ background: "#ffffff" }}>
        <div className="max-w-xl mx-auto flex flex-col gap-6">
          <h2 className="text-2xl font-extrabold text-center" style={{ color: "#111827" }}>
            The 3 things holding you back.
          </h2>

          <BeliefsCard
            belief="One tiny habit can't really change my health."
            reframe="BJ Fogg's Stanford research tracked 40,000+ people. The finding: small habits done consistently beat large habits done intermittently — every time. The compound effect isn't motivation. It's repetition. Karan M. in Pune reported no 3 PM coffee crash since Day 6 of morning sunlight. One habit. Nothing else changed. That's what consistent tiny changes actually do."
          />
          <BeliefsCard
            belief="I always quit. I'm not a consistent person."
            reframe="You quit because the habit was bigger than your worst day could handle. When the trigger arrives in your WhatsApp automatically at 7 AM — you don't need to remember, decide, or feel motivated. The system provides the trigger. You respond. 78% of members complete their habit daily through Month 1. That's not willpower. That's what automatic delivery does."
          />
          <BeliefsCard
            belief="₹99/month is risky — what if I don't use it?"
            reframe="The ₹1 trial exists specifically because of this concern. You're not making a ₹99 decision on a sales page. You're making a ₹1 decision to try 7 mornings of real habits. If nothing shifts — reply CANCEL. Nothing owed. You decide after data, not before."
          />
        </div>
      </section>

      {/* ══ 7. PRICE ═════════════════════════════════════════════════════════ */}
      <section className="px-5 py-14" style={{ background: "#18181b" }}>
        <div className="max-w-xl mx-auto flex flex-col gap-6">
          <h2 className="text-2xl font-extrabold text-center" style={{ color: "#ffffff" }}>
            ₹1 for 7 days. Then ₹99/month.
          </h2>

          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            {[
              { label: "What you pay per day", value: "₹3" },
              { label: "vs one chai", value: "less" },
              { label: "vs 2 minutes of a personal trainer", value: "less" },
              { label: "vs one gym visit", value: "less" },
              { label: "vs one health supplement capsule", value: "less" },
            ].map((row, i, arr) => (
              <div
                key={row.label}
                className="flex justify-between items-center px-5 py-3.5"
                style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
              >
                <span className="text-sm" style={{ color: "#9ca3af" }}>{row.label}</span>
                <span className="font-bold text-sm" style={{ color: row.value === "₹3" ? "#25d366" : "#fff" }}>{row.value}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-base leading-relaxed" style={{ color: "#9ca3af" }}>
            If 7 mornings doesn&apos;t shift anything — cancel. One message. You risked ₹1.
          </p>

          <CTA label="Start My 7-Day Trial for ₹1 →" sub="7 days for ₹1 · Then ₹3/day (₹99/month) · Cancel anytime — reply CANCEL on WhatsApp" />
        </div>
      </section>

      {/* ══ 8. TESTIMONIALS ══════════════════════════════════════════════════ */}
      <section className="px-5 py-14" style={{ background: "#faf8f3" }}>
        <div className="max-w-xl mx-auto flex flex-col gap-6">
          <h2 className="text-2xl font-extrabold text-center" style={{ color: "#111827" }}>
            What members actually say.
          </h2>

          <div className="flex flex-col gap-4">
            <Testimonial
              initials="KM"
              name="Karan M."
              city="Pune"
              job="Software Engineer · 10-hr days"
              theme="Energy Month"
              stat="No 3 PM crash in 31 days"
              quote="No 3 PM coffee crash since Day 6. I work 10-hour days. One morning sunlight habit. Nothing else changed. My evenings have energy I haven't had in years."
            />
            <Testimonial
              initials="PT"
              name="Priya T."
              city="Bengaluru"
              job="Product Manager · 2 kids"
              theme="Sleep Month"
              stat="+47 minutes sleep per night (tracked)"
              quote="Sleeping 47 minutes more per night. Tracked it on Samsung Health. My husband noticed before I told him."
            />
            <Testimonial
              initials="SR"
              name="Sneha R."
              city="Mumbai"
              job="Marketing Consultant"
              theme="Focus Month"
              stat="6-week backlog cleared in 14 days"
              quote="Cleared a 6-week backlog in 14 days. My manager asked what changed. I showed her the 7 AM message."
            />
            <Testimonial
              initials="VP"
              name="Vivek P."
              city="Hyderabad"
              job="Finance Professional"
              theme="Gut Health Month"
              stat="4-year bloating resolved in 18 days"
              quote="4-year bloating problem — gone in 18 days. My wife keeps asking what I'm taking. I show her my phone."
            />
          </div>
        </div>
      </section>

      {/* ══ 9. GUARANTEE + FINAL CTA ═════════════════════════════════════════ */}
      <section className="px-5 py-14" style={{ background: "#ffffff" }}>
        <div className="max-w-xl mx-auto flex flex-col gap-6 text-center">
          <div className="text-5xl">🛡️</div>
          <h2 className="text-2xl font-extrabold" style={{ color: "#111827" }}>
            7 mornings. ₹1. If nothing shifts — reply CANCEL.
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "#374151" }}>
            You&apos;re out. No charge. No questions. No forms. One message and it&apos;s done.
          </p>
          <p className="text-base font-bold" style={{ color: "#111827" }}>
            You risk ₹1. I risk my reputation.
          </p>

          <div className="rounded-2xl p-5" style={{ background: "#faf8f3", border: "1px solid #e5e7eb" }}>
            <p className="text-base leading-relaxed" style={{ color: "#374151" }}>
              Six months from now, you&apos;re either the same or you&apos;re different.<br />
              <strong style={{ color: "#111827" }}>₹1 decides which path you try.</strong>
            </p>
          </div>

          <CTA label="Start My 7-Day Trial for ₹1 →" sub="7 days for ₹1 · Then ₹3/day (₹99/month) · Cancel before Day 7, pay nothing more" />

          <p className="text-sm" style={{ color: "#6b7280" }}>
            Built by <strong style={{ color: "#111827" }}>Rohan Mote</strong> · Questions?{" "}
            <a href="https://wa.me/918956146485?text=Hi+Rohan%2C+question+about+Daily+Upgrade+Club" className="underline font-medium" style={{ color: "#1aad4e" }}>
              Chat on WhatsApp →
            </a>
          </p>
        </div>
      </section>

      {/* ══ 10. FAQ ══════════════════════════════════════════════════════════ */}
      <section className="px-5 py-14" style={{ background: "#18181b" }}>
        <div className="max-w-xl mx-auto flex flex-col gap-2">
          <h2 className="text-2xl font-extrabold text-center mb-6" style={{ color: "#ffffff" }}>
            Questions.
          </h2>

          {[
            { q: "What exactly is a tiny healthy habit?", a: "One specific action — not a philosophy, not a routine. Something like: drink 500ml of water before your phone. Walk 10 minutes after lunch. Take 4 slow breaths before your first meeting. Each habit has the science behind it explained, so you understand why it works, not just what to do." },
            { q: "What happens the moment I pay?", a: "Confirmation page appears immediately. One button: 'Join on WhatsApp.' Tap it. WhatsApp opens with a pre-filled message ready to send. Tap Send. You're in. Tomorrow at 7 AM your first habit arrives." },
            { q: "Do I need to share my phone number anywhere?", a: "No. The WhatsApp link opens WhatsApp directly on your phone with a pre-typed message. You tap Send. We receive it and add you. No forms. No number entry." },
            { q: "How do I cancel?", a: "Reply CANCEL on WhatsApp. That's it. Immediate. No forms, no calls, no waiting. If you cancel before Day 7, you're not charged. If after, you won't be charged next cycle." },
            { q: "What if I miss a day?", a: "Nothing happens. Your next habit arrives at 7 AM as usual. No penalty, no shame message, no 'are you sure?' loops. Miss a day, come back the next." },
            { q: "Will I be charged automatically after 7 days?", a: "Yes — Razorpay auto-renews at ₹99/month after your trial. You get a reminder message on Day 6. Cancel anytime before Day 7 ends and you won't be charged. We don't trap people." },
            { q: "Can I change my theme each month?", a: "Yes. At the end of each month you choose your next theme. Sleep, Energy, Focus, Gut Health, Stress, Fitness, Hydration, Heart Health. Cycle through them all or go deep on one." },
            { q: "Is this just advice I could find on Google?", a: "The habits are backed by published research — yes, technically findable. But finding isn't the problem. You already know you should sleep more, move more, drink water. What you don't have is a trigger that arrives automatically every morning. That's what this is." },
            { q: "Why ₹1 and not free?", a: "₹1 means you made a real decision. Free things get ignored. Razorpay also needs a real transaction to set up the subscription. If 7 mornings deliver nothing, you lost ₹1. If they work — you already know what to do." },
          ].map(faq => <FAQ key={faq.q} q={faq.q} a={faq.a} />)}

          <div className="pt-8">
            <CTA label="Start My 7-Day Trial for ₹1 →" sub="7 days for ₹1 · Then ₹3/day (₹99/month) · Cancel anytime" />
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
      <footer className="px-5 py-8 text-center" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p className="text-xs" style={{ color: "#6b7280" }}>
          © {new Date().getFullYear()} Daily Upgrade Club ·{" "}
          <a href="https://www.highperformanceclub.co" className="underline" style={{ color: "#4b5563" }}>highperformanceclub.co</a>
        </p>
        <p className="text-xs mt-1" style={{ color: "#4b5563" }}>
          ₹1 for 7 days · ₹99/month · Cancel anytime — reply CANCEL on WhatsApp
        </p>
      </footer>
    </main>
  );
}
