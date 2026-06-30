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
    <svg width="14" height="14" viewBox="0 0 20 20" fill="#f59e0b" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function Check({ color = "#1da851" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="10" cy="10" r="10" fill={color} />
      <path d="M6 10l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── CTA button ────────────────────────────────────────────────────────────────
function CTA({ label, sub, size = "md" }: { label: string; sub?: string; size?: "sm" | "md" | "lg" }) {
  const py = size === "lg" ? "py-5" : size === "sm" ? "py-3" : "py-4";
  const text = size === "lg" ? "text-lg" : "text-base";
  return (
    <div className="flex flex-col items-center gap-2">
      <a
        href={JOIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-3 w-full max-w-sm px-8 ${py} rounded-full font-black text-white ${text} transition-transform active:scale-95`}
        style={{ background: "linear-gradient(135deg,#1aad4e 0%,#25d366 100%)", boxShadow: "0 6px 28px rgba(37,211,102,0.40)" }}
      >
        <WAIcon size={size === "lg" ? 22 : 18} />
        {label}
      </a>
      {sub && <p className="text-xs text-center" style={{ color: "#71717a" }}>{sub}</p>}
    </div>
  );
}

// ── WhatsApp UI primitives ────────────────────────────────────────────────────
function WAMsg({ text, time = "7:01 AM" }: { text: string; time?: string }) {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl rounded-tl-sm px-4 py-3 max-w-[88%]" style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.12)" }}>
        <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#111" }}>{text}</p>
        <p className="text-right text-xs mt-1.5" style={{ color: "#9ca3af" }}>{time} ✓✓</p>
      </div>
    </div>
  );
}

function WAReply({ text, time = "7:06 AM" }: { text: string; time?: string }) {
  return (
    <div className="flex justify-end">
      <div className="rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]" style={{ background: "#dcf8c6" }}>
        <p className="text-sm" style={{ color: "#111" }}>{text}</p>
        <p className="text-right text-xs mt-1" style={{ color: "#6b7280" }}>{time} ✓✓</p>
      </div>
    </div>
  );
}

function PhoneShell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden mx-auto" style={{ maxWidth: 360, border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}>
      <div className="flex items-center gap-3 px-4 py-3" style={{ background: "#075e54" }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm text-white flex-shrink-0" style={{ background: "#1aad4e" }}>DU</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white">Daily Upgrade Club</p>
          <p className="text-xs" style={{ color: "#a7f3d0" }}>{label}</p>
        </div>
      </div>
      <div className="p-4 space-y-3" style={{ background: "#e5ddd5", minHeight: 180 }}>
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
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-sm"
        style={{ background: "rgba(255,255,255,0.05)", color: "#e4e4e7" }}
      >
        <span>{q}</span>
        <span
          className="flex-shrink-0 text-xl font-light"
          style={{ color: "#25d366", display: "inline-block", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}
        >+</span>
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 text-sm leading-relaxed" style={{ background: "rgba(255,255,255,0.02)", color: "#a1a1aa" }}>
          {a}
        </div>
      )}
    </div>
  );
}

// ── Testimonial card ──────────────────────────────────────────────────────────
function Testimonial({ name, city, theme, result, quote }: { name: string; city: string; theme: string; result: string; quote: string }) {
  return (
    <div className="rounded-2xl p-5 bg-white" style={{ border: "1px solid #e4e4e7", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
      <div className="flex gap-0.5 mb-3">{[1,2,3,4,5].map(i => <Star key={i} />)}</div>
      <p className="text-sm leading-relaxed mb-4" style={{ color: "#27272a" }}>&ldquo;{quote}&rdquo;</p>
      <div className="pt-3" style={{ borderTop: "1px solid #f4f4f5" }}>
        <p className="text-xs font-bold" style={{ color: "#18181b" }}>{name} · {city}</p>
        <p className="text-xs mt-0.5" style={{ color: "#71717a" }}>{theme}</p>
        <p className="text-xs font-semibold mt-1.5 px-2 py-0.5 rounded-full inline-block" style={{ background: "rgba(29,168,81,0.1)", color: "#1da851" }}>{result}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function DailyUpgradeClubPage() {
  return (
    <div style={{ background: "#faf8f3", minHeight: "100vh", fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,sans-serif", color: "#18181b" }}>

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HOOK
          Speak to ONE person. The busy Indian professional who
          keeps meaning to get healthy but never does.
          Brunson: Hook must stop the scroll and make them say
          "this person gets me."
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(165deg,#edfff5 0%,#faf8f3 60%)", borderBottom: "1px solid #dde8dc" }}>
        <div className="max-w-xl mx-auto px-5 pt-10 pb-14 text-center">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 text-xs font-bold uppercase tracking-widest"
            style={{ background: "rgba(37,211,102,0.1)", color: "#1aad4e", border: "1px solid rgba(37,211,102,0.25)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: "#25d366" }} />
            Daily Upgrade Club · 400+ Members Active
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 6.5vw, 3.8rem)", lineHeight: 1.05, fontWeight: 900, letterSpacing: "-0.038em" }}>
            You know exactly what<br />
            <span style={{ color: "#1aad4e" }}>a healthy life looks like.</span><br />
            <span style={{ fontWeight: 400, fontStyle: "italic", color: "#71717a" }}>
              So why isn&apos;t it happening?
            </span>
          </h1>

          <p className="text-lg leading-relaxed mt-7 mb-2" style={{ color: "#3f3f46" }}>
            It&apos;s not laziness. It&apos;s not willpower. It&apos;s that <strong style={{ color: "#18181b" }}>every healthy habit you&apos;ve tried demanded more than your real life could give it.</strong>
          </p>
          <p className="text-lg leading-relaxed mb-8" style={{ color: "#3f3f46" }}>
            What if the entire thing — the habit, the science, the accountability — was already waiting in your WhatsApp at 7 AM? And it only took <strong style={{ color: "#18181b" }}>5 minutes?</strong>
          </p>

          {/* ─ Proof strip near top ─ */}
          <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
            <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} />)}</div>
            <p className="text-sm" style={{ color: "#52525b" }}>
              <strong style={{ color: "#18181b" }}>400+ members</strong> across India building daily
            </p>
          </div>

          <CTA size="lg" label="Get My First Habit Tomorrow — ₹1 →" sub="7-day trial for ₹1 · Then ₹99/month (₹3/day) · Cancel anytime" />

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {[
              "No app to download",
              "Works on WhatsApp you have",
              "Under 5 min a day",
              "Cancel anytime — no friction",
            ].map(t => (
              <span key={t} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                style={{ background: "#fff", color: "#52525b", border: "1px solid #e4e4e7" }}>
                <Check color="#1aad4e" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — WHAT EXACTLY IS THIS?
          The first question a cold visitor has.
          Answer it immediately. Don't make them scroll to find out.
          Show the actual product. Not bullet points — the product itself.
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-xl mx-auto px-5 py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-center mb-3" style={{ color: "#25d366" }}>The Product — Exactly</p>
        <h2 className="text-center font-bold mb-3" style={{ fontSize: "clamp(1.5rem, 4.5vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
          This is what lands in your<br />WhatsApp every morning
        </h2>
        <p className="text-center text-sm mb-10" style={{ color: "#71717a" }}>
          One tiny healthy habit. The science behind why it works. Reply DONE when you&apos;re back. That&apos;s the entire product.
        </p>

        <div className="space-y-8">
          {/* Sample 1 — Energy */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3 pl-1" style={{ color: "#a1a1aa" }}>⚡ Energy Month · Day 3 · 7:01 AM</p>
            <PhoneShell label="online">
              <WAMsg text={"Good morning! ⚡ Today's tiny healthy habit:\n\n🌞 Step outside for 5 minutes of natural sunlight within 30 minutes of waking.\n\nWhy it works: Morning sunlight resets your cortisol rhythm — the hormone that controls energy all day. No sunlight = sluggish even after coffee.\n\nJust 5 minutes. By your window or outside. That's it.\n\nReply DONE when you're back 💪"} />
              <WAReply text="DONE ✅ Felt surprisingly alert this morning" />
              <WAMsg text="🔥 Day 3 streak! Your body is already recalibrating. See you tomorrow at 7." time="7:09 AM" />
            </PhoneShell>
          </div>

          {/* Sample 2 — Sleep */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3 pl-1" style={{ color: "#a1a1aa" }}>😴 Sleep Month · Day 9 · 7:01 AM</p>
            <PhoneShell label="online">
              <WAMsg text={"Good morning! 😴 Today's tiny healthy habit:\n\n📵 Tonight — phone charger goes outside the bedroom.\n\nWhy it works: Blue light suppresses melatonin for up to 2 hours. Just moving the phone out (not avoiding it all day) improves deep sleep within 3–5 nights.\n\nSet a reminder now for 9:30 PM tonight to move it.\n\nReply DONE once you've set the reminder 🌙"} />
              <WAReply text="DONE ✅ Reminder set, will try tonight" time="7:04 AM" />
              <WAMsg text="🔥 Day 9! Most members notice the difference by Day 12. You're close." time="7:05 AM" />
            </PhoneShell>
          </div>

          {/* Sample 3 — Focus */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3 pl-1" style={{ color: "#a1a1aa" }}>🧠 Focus Month · Day 14 · 7:01 AM</p>
            <PhoneShell label="online">
              <WAMsg text={"Good morning! 🧠 Today's tiny healthy habit:\n\n⏱️ Work in one 25-minute block today — phone face-down, no tabs, one task only.\n\nWhy it works: Deep work requires 23 minutes of recovery after every distraction. One protected block a day trains the brain to focus on demand.\n\nStart within 2 hours of reading this.\n\nReply DONE after your block 🎯"} />
              <WAReply text="DONE ✅ Finished something I'd been avoiding for 3 days" time="9:38 AM" />
              <WAMsg text="That's exactly what Day 14 is supposed to feel like. 🔥 See you tomorrow." time="9:39 AM" />
            </PhoneShell>
          </div>
        </div>

        <p className="text-center text-sm mt-8 font-medium" style={{ color: "#71717a" }}>
          30 habits like these, every month, focused on one health area you choose.
        </p>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — HOW IT ACTUALLY WORKS (mechanics)
          The #1 anxiety killer. Cold visitors don't pay because
          they don't know what happens the moment they click.
          Remove that mystery completely.
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#18181b", borderTop: "1px solid #111" }} className="px-5 py-14">
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-3" style={{ color: "#25d366" }}>Exactly What Happens When You Join</p>
          <h2 className="text-center font-bold mb-12" style={{ fontSize: "clamp(1.5rem, 4.5vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "#fff" }}>
            3 steps. No surprises.
          </h2>

          <div className="space-y-6">
            {[
              {
                n: "1",
                title: "You pay ₹1 on this page",
                desc: "Secure payment via Razorpay. Debit card, UPI, credit card — takes 30 seconds. You immediately see a confirmation screen with a WhatsApp link.",
              },
              {
                n: "2",
                title: "You click the WhatsApp link and send one message",
                desc: "The confirmation page shows a button: \"Join Daily Upgrade Club on WhatsApp.\" You click it. It opens WhatsApp with a pre-filled message. You press send. Done — you're in. No number sharing, no forms.",
              },
              {
                n: "3",
                title: "Tomorrow at 7 AM, your first habit arrives",
                desc: "You wake up. Your phone has a WhatsApp message from Daily Upgrade Club — your first tiny healthy habit, with the science behind it and exactly what to do. You do it. You reply DONE. Your streak starts. That's Day 1.",
              },
            ].map(({ n, title, desc }) => (
              <div key={n} className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white" style={{ background: "#25d366" }}>
                  {n}
                </div>
                <div className="pt-1">
                  <p className="font-bold text-base mb-1.5" style={{ color: "#fff" }}>{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#a1a1aa" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 rounded-2xl" style={{ background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.18)" }}>
            <p className="text-sm font-semibold text-center" style={{ color: "#25d366" }}>
              No app. No account. No password. Just WhatsApp — which you already have.
            </p>
          </div>

          <div className="mt-8">
            <CTA label="Get My First Habit Tomorrow → ₹1" sub="7 days for ₹1 · Then ₹99/month · Cancel before Day 7, pay nothing more" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — EPIPHANY BRIDGE / ATTRACTIVE CHARACTER
          Brunson's #1 principle: People don't buy from brands.
          They buy from people whose story they see themselves in.
          The Epiphany Bridge recreates the belief-shift moment.
          Cold traffic needs a face. A person. A reason to trust.
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-xl mx-auto px-5 py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-center mb-3" style={{ color: "#25d366" }}>From the Founder</p>
        <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.5rem, 4.5vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
          I had 47 health articles bookmarked.<br />
          <span style={{ color: "#1aad4e" }}>I acted on zero of them.</span>
        </h2>

        <div className="rounded-2xl p-6 mb-8 bg-white" style={{ border: "1px solid #e4e4e7", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center gap-3 mb-6 pb-5" style={{ borderBottom: "1px solid #f4f4f5" }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center font-black text-xl text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#1aad4e,#25d366)" }}>R</div>
            <div>
              <p className="font-bold" style={{ color: "#18181b" }}>Rohan Mote</p>
              <p className="text-sm" style={{ color: "#71717a" }}>Founder, Daily Upgrade Club</p>
              <p className="text-xs mt-0.5" style={{ color: "#a1a1aa" }}>iamrohitmote@gmail.com</p>
            </div>
          </div>

          <div className="space-y-4 text-base leading-relaxed" style={{ color: "#3f3f46" }}>
            <p>
              Two years ago I was a professional who genuinely cared about my health. I had three fitness apps, a gym membership I barely used, and a mental list of things I was going to start &ldquo;once things calmed down.&rdquo;
            </p>
            <p>
              Things never calmed down. Life doesn&apos;t.
            </p>
            <p>
              I came across BJ Fogg&apos;s research from Stanford. He&apos;d spent years studying why habits fail. His answer was simple and brutal: <strong style={{ color: "#18181b" }}>we consistently make the habit too big relative to the motivation available on any given day.</strong> When motivation is low — a hard week, a bad night — the habit disappears.
            </p>
            <p>
              His solution: make the habit so small it&apos;s impossible to fail even on your worst day.
            </p>
            <p>
              I tested it. I replaced my entire morning routine with one thing: drink one glass of water before touching my phone. Just that. Nothing else changed. By Day 10, I was sleeping better. By Day 20, I&apos;d started walking on my own — nobody told me to. The tiny habit had pulled everything else forward.
            </p>
            <div className="rounded-xl p-4 mt-2" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
              <p className="font-semibold" style={{ color: "#15803d" }}>
                I built the Daily Upgrade Club to do this for you — automatically. One tiny healthy habit, every morning on WhatsApp. You just reply DONE. The system does everything else.
              </p>
            </div>
            <p>
              400+ members later, the pattern is the same: one small habit, one month, one theme. Real changes that started ridiculously small.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — NEW OPPORTUNITY (Big Domino)
          Brunson: Never position as improvement of old vehicle.
          Always position as a NEW vehicle.
          Old vehicle = apps, courses, gym routines
          New vehicle = WhatsApp-delivered daily system
          Install ONE belief: the system delivers it, not willpower
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#18181b" }} className="px-5 py-14">
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-3" style={{ color: "#25d366" }}>Why Everything Else Hasn&apos;t Worked</p>
          <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.5rem, 4.5vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "#fff" }}>
            The problem was never you.<br />
            <span style={{ color: "#25d366" }}>It was the delivery system.</span>
          </h2>

          <div className="grid grid-cols-2 gap-3 mb-10">
            <div className="rounded-2xl p-4" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#f87171" }}>The old way</p>
              <div className="space-y-3">
                {[
                  "Requires you to remember",
                  "Requires high motivation",
                  "Big routines → big fail chance",
                  "App you open, then forget",
                  "Generic advice for everyone",
                  "You plan, decide, execute alone",
                ].map(t => (
                  <div key={t} className="flex gap-2 items-start">
                    <span className="text-xs mt-0.5 flex-shrink-0" style={{ color: "#f87171" }}>✕</span>
                    <p className="text-xs leading-snug" style={{ color: "#9ca3af" }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-4" style={{ background: "rgba(37,211,102,0.05)", border: "1px solid rgba(37,211,102,0.2)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#25d366" }}>Daily Upgrade Club</p>
              <div className="space-y-3">
                {[
                  "Arrives in your WhatsApp — zero memory needed",
                  "Works even on zero-motivation days",
                  "5 min habit → nearly impossible to fail",
                  "WhatsApp you open every morning",
                  "One theme, 30 specific habits, your choice",
                  "Habit + science + accountability delivered",
                ].map(t => (
                  <div key={t} className="flex gap-2 items-start">
                    <span className="text-xs mt-0.5 flex-shrink-0" style={{ color: "#25d366" }}>✓</span>
                    <p className="text-xs leading-snug" style={{ color: "#e4e4e7" }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl p-6 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <p className="text-base font-semibold" style={{ color: "#fff" }}>
              Willpower is the fuel. <span style={{ color: "#25d366" }}>System is the engine.</span><br />
              Stop relying on fuel. Build the engine.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6 — YOUR FIRST 7 DAYS (Concrete Promise)
          Removes the "unknown" fear that kills cold traffic.
          Shows them the exact experience day by day.
          Makes the ₹1 trial feel like a guided journey, not a gamble.
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-xl mx-auto px-5 py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-center mb-3" style={{ color: "#25d366" }}>What Happens in 7 Days</p>
        <h2 className="text-center font-bold mb-4" style={{ fontSize: "clamp(1.5rem, 4.5vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
          Here&apos;s exactly what your<br />
          <span style={{ color: "#1aad4e" }}>first week looks like</span>
        </h2>
        <p className="text-center text-sm mb-10" style={{ color: "#71717a" }}>
          By Day 7, you&apos;ll know whether this changes anything for you.<br />If it doesn&apos;t — cancel. Pay nothing more.
        </p>

        <div className="space-y-3">
          {[
            {
              day: "Day 1",
              title: "Your first habit lands at 7 AM",
              body: "You wake up. WhatsApp has one message from Daily Upgrade Club. One habit. The why behind it. Exactly what to do. You do it — takes under 5 minutes. You reply DONE. You&apos;ll think: &ldquo;That&apos;s it?&rdquo; Yes. That&apos;s the whole product.",
              feel: "Surprised how easy this feels",
            },
            {
              day: "Day 2–3",
              title: "The streak begins",
              body: "Day 2 arrives automatically. You didn&apos;t have to plan anything. By Day 3, you notice you&apos;re expecting the message. You&apos;re no longer deciding whether to do a habit — it just appears. That&apos;s the system working.",
              feel: "Momentum without effort",
            },
            {
              day: "Day 4–5",
              title: "First physical shift",
              body: "Most members notice something by Day 5. More energy in the morning. Sleeping more soundly. A clearer head after lunch. Lighter digestion. It&apos;s not dramatic — but it&apos;s real. And nothing else changed.",
              feel: "Something actually shifted",
            },
            {
              day: "Day 6",
              title: "You get your honest reminder",
              body: "We message you: &ldquo;Your trial ends tomorrow. Cancel here if you want to stop — no guilt, no questions.&rdquo; You&apos;re never surprised by a charge. You&apos;re always in control.",
              feel: "Zero pressure. Full control.",
            },
            {
              day: "Day 7",
              title: "You make a clear decision",
              body: "After 7 mornings of real habits — you know. Most members don&apos;t cancel. Not because they forgot. Because they don&apos;t want to stop. At ₹99/month (₹3/day), the question answers itself.",
              feel: "You already have your answer",
            },
          ].map(({ day, title, body, feel }) => (
            <div key={day} className="rounded-2xl p-5 bg-white flex gap-4" style={{ border: "1px solid #e4e4e7", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xs font-black text-white text-center leading-tight"
                style={{ background: "linear-gradient(135deg,#1aad4e,#25d366)" }}>
                {day.split("–")[0].replace("Day ", "D")}
              </div>
              <div>
                <p className="font-bold text-sm mb-1.5" style={{ color: "#18181b" }}>{title}</p>
                <p className="text-sm leading-relaxed mb-2" style={{ color: "#71717a" }} dangerouslySetInnerHTML={{ __html: body.replace(/&apos;/g, "'").replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"') }} />
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full inline-block" style={{ background: "rgba(29,168,81,0.1)", color: "#1aad4e" }}>
                  Feeling: {feel}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <CTA size="lg" label="Start Day 1 Tomorrow → ₹1" sub="7 days for ₹1 · Then ₹99/month · Cancel before Day 7" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 7 — FULL OFFER (What You Get)
          Brunson's Stack: build perceived value item by item.
          Each item gets a standalone value so the stack total
          makes the real price feel absurd by comparison.
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#f4fef7", borderTop: "1px solid #d1fae5", borderBottom: "1px solid #d1fae5" }} className="px-5 py-14">
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-3" style={{ color: "#25d366" }}>Everything Included</p>
          <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.5rem, 4.5vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            The complete Daily Upgrade Club
          </h2>

          <div className="space-y-3">
            {[
              {
                emoji: "📲",
                title: "One tiny healthy habit — every morning on WhatsApp",
                desc: "At 7:01 AM every day, one habit arrives. Science behind it. Exactly what to do. Takes under 5 minutes. Reply DONE. That&apos;s it. 30 habits a month.",
                value: "₹2,999/mo",
              },
              {
                emoji: "🎯",
                title: "One dedicated monthly health theme you choose",
                desc: "Sleep · Energy · Focus · Gut Health · Stress · Fitness · Hydration · Heart Health. You pick the area you want to improve. 30 habits, one thread, real depth. Switch every month.",
                value: "₹1,799/mo",
              },
              {
                emoji: "👥",
                title: "Private WhatsApp accountability group",
                desc: "Every member in your group is doing the same habit, same theme, same morning. When you see 30 people post DONE before 8 AM — you will too.",
                value: "₹999/mo",
              },
              {
                emoji: "📊",
                title: "Weekly health scorecard (every Sunday)",
                desc: "Your streak, your completion %, what&apos;s shifting in your chosen theme. Seeing the numbers go up is what makes the next week easier.",
                value: "₹799/mo",
              },
              {
                emoji: "🗓️",
                title: "Full 30-habit calendar + PDF guide before Day 1",
                desc: "You get all 30 habits in advance — so you see exactly what you&apos;re signing up for. No surprises. Just a clear 30-day path.",
                value: "₹499/mo",
              },
              {
                emoji: "🏆",
                title: "Permanent access to the full habit vault (90+ habits)",
                desc: "Every habit from every month is yours to keep. Revisit a month that worked. Go deeper. Combine themes. Build on what already changed things for you.",
                value: "₹999",
              },
              {
                emoji: "📩",
                title: "Weekly health insights — every Monday",
                desc: "One practical insight on sleep, energy, gut health, or focus — backed by current research. Plain language. No fluff. 3-minute read.",
                value: "₹199/mo",
              },
            ].map(({ emoji, title, desc, value }) => (
              <div key={title} className="rounded-2xl p-5 bg-white" style={{ border: "1px solid #d1fae5", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{emoji}</span>
                    <p className="font-bold text-sm leading-snug pt-0.5" style={{ color: "#18181b" }}>{title}</p>
                  </div>
                  <span className="text-xs font-bold flex-shrink-0 whitespace-nowrap px-2 py-1 rounded-full mt-0.5" style={{ background: "rgba(29,168,81,0.1)", color: "#1aad4e" }}>{value}</span>
                </div>
                <p className="text-sm leading-relaxed pl-9" style={{ color: "#71717a" }} dangerouslySetInnerHTML={{ __html: desc.replace(/&apos;/g, "'") }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 8 — 3 FALSE BELIEFS BROKEN
          Brunson: Before anyone buys, they have 3 objections
          locked in their head. Break each one with a story,
          not a counter-argument. Make them feel understood first.
          Vehicle = "tiny habits can't really work"
          Internal = "I'm not a consistent person"
          External = "₹99/month is not worth it"
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-xl mx-auto px-5 py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-center mb-3" style={{ color: "#25d366" }}>The 3 Things Stopping You</p>
        <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.5rem, 4.5vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
          And why not one of them<br />
          <span style={{ color: "#1aad4e" }}>should stop you today</span>
        </h2>

        <div className="space-y-5">
          {[
            {
              belief: "\"One tiny habit a day can't actually change my health. I need a real routine.\"",
              truth: "The research says the opposite. BJ Fogg studied 40,000+ people building habits. The single most reliable predictor of long-term health change wasn't the size of the routine — it was consistency over time. One tiny healthy habit done for 30 days rewires the brain's reward circuit more reliably than a complex routine done 4 times. Members who started with just \"morning sunlight, 5 minutes\" ended the month sleeping better, eating better, and exercising more — with no instruction to do any of those things. One habit pulls the rest.",
            },
            {
              belief: "\"I've started and quit things before. I'm just not a consistent person.\"",
              truth: "You quit because the habits you tried required more consistency than was realistic. Nobody is consistently motivated. But a habit that takes under 5 minutes and arrives in your WhatsApp automatically doesn't need your motivation — the system provides the trigger. You just respond. Members who described themselves as \"the worst at follow-through\" in month 1 averaged 78% completion. The system does what willpower can't.",
            },
            {
              belief: "\"₹99/month sounds like one more thing I'll pay for and not use.\"",
              truth: "This is exactly why the trial is ₹1. You don't decide based on a sales page. You decide after 7 mornings of actual habits in your WhatsApp. If by Day 7 nothing shifted — cancel in one message. No forms, no calls, no guilt. You risk ₹1. I risk my reputation. And if it works? ₹99/month is ₹3/day — less than one chai. That's the bet I'm making on your behalf.",
            },
          ].map(({ belief, truth }, i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e4e4e7", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="px-5 py-4" style={{ background: "#fef2f2", borderBottom: "1px solid #fecaca" }}>
                <p className="text-sm font-bold" style={{ color: "#b91c1c" }}>❌ {belief}</p>
              </div>
              <div className="px-5 py-4 bg-white">
                <p className="text-sm leading-relaxed" style={{ color: "#3f3f46" }}>
                  <strong style={{ color: "#15803d" }}>The truth: </strong>{truth}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 9 — "IF ALL THIS DID WAS" × 3
          Brunson's most powerful close technique.
          Isolate each outcome. Show it would be worth the price alone.
          Creates a "I'd be crazy to say no" moment.
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#f4fef7", borderTop: "1px solid #d1fae5", borderBottom: "1px solid #d1fae5" }} className="px-5 py-14">
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-3" style={{ color: "#25d366" }}>Think About This Honestly</p>
          <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.5rem, 4.5vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            Any one of these would be<br />
            <span style={{ fontStyle: "italic", fontWeight: 400, color: "#71717a" }}>worth it on its own.</span>
          </h2>

          <div className="space-y-4">
            {[
              {
                prefix: "If all this did was",
                bold: "give you steady energy through the afternoon — no 3 PM crash, no second coffee, no dragging yourself to 6 PM",
                suffix: "— would 7 days for ₹1 be worth finding out?",
              },
              {
                prefix: "If all this did was",
                bold: "make you the person who actually follows through on their health — not just in January, but every single month of the year",
                suffix: "— is ₹3/day too much to pay for that identity?",
              },
              {
                prefix: "If all this did was",
                bold: "let you say, 6 months from now, 'I'm actually taking care of myself' — and genuinely mean it",
                suffix: "— what would that be worth to you?",
              },
            ].map(({ prefix, bold, suffix }, i) => (
              <div key={i} className="rounded-2xl px-6 py-5 bg-white" style={{ border: "1px solid #d1fae5", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <p className="text-base leading-relaxed" style={{ color: "#3f3f46" }}>
                  <span style={{ color: "#a1a1aa" }}>{prefix} </span>
                  <strong style={{ color: "#18181b" }}>{bold}</strong>
                  <span style={{ color: "#71717a" }}> {suffix}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 10 — THE STACK + PRICE CASCADE
          Show the full value. Drop the price dramatically.
          ₹8,493 → ₹4,999 → ₹299 → ₹99 → ₹1 for 7 days.
          Then reframe ₹99 against things they already spend.
          This is the price reveal Brunson calls "the big drop."
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#0f0f0f" }} className="px-5 py-14">
        <div className="max-w-md mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-3" style={{ color: "#25d366" }}>What It&apos;s Worth vs. What You Pay</p>
          <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.5rem, 4.5vw, 2.4rem)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "#fff" }}>
            Here&apos;s the math.
          </h2>

          <div className="rounded-2xl overflow-hidden mb-8" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              {[
                ["📲", "Daily tiny healthy habit × 30", "₹2,999"],
                ["🎯", "Monthly health theme programme", "₹1,799"],
                ["👥", "Private accountability group", "₹999"],
                ["📊", "Weekly health scorecard", "₹799"],
                ["🗓️", "30-habit calendar + PDF guide", "₹499"],
                ["🏆", "Full habit vault (90+ habits)", "₹999"],
                ["📩", "Weekly health insights", "₹199"],
              ].map(([emoji, name, value], idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base flex-shrink-0">{emoji}</span>
                    <span className="text-sm" style={{ color: "#a1a1aa" }}>{name}</span>
                  </div>
                  <span className="text-sm font-semibold flex-shrink-0" style={{ color: "#4a4a52" }}>{value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-3 px-5 py-4">
                <span className="font-bold" style={{ color: "#fff" }}>Total value</span>
                <span className="font-bold" style={{ color: "#25d366" }}>₹8,493/month</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-center mb-8">
            <p className="text-base" style={{ color: "#6b7280" }}>Not <strong style={{ color: "#fff", textDecoration: "line-through" }}>₹8,493.</strong></p>
            <p className="text-base" style={{ color: "#6b7280" }}>Not <strong style={{ color: "#fff", textDecoration: "line-through" }}>₹4,999.</strong></p>
            <p className="text-base" style={{ color: "#6b7280" }}>Not even <strong style={{ color: "#fff", textDecoration: "line-through" }}>₹299.</strong></p>
          </div>

          <div className="rounded-2xl p-7 text-center mb-8" style={{ background: "linear-gradient(135deg,rgba(37,211,102,0.12),rgba(29,168,81,0.06))", border: "1px solid rgba(37,211,102,0.25)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#25d366" }}>Your price</p>
            <div className="flex items-end justify-center gap-2 mb-1">
              <span style={{ fontSize: "5rem", lineHeight: 1, fontWeight: 900, letterSpacing: "-0.04em", color: "#25d366" }}>₹1</span>
              <span className="text-lg mb-3 font-bold" style={{ color: "#fff" }}>for 7 days</span>
            </div>
            <p className="text-sm mb-2" style={{ color: "#6b7280" }}>Then ₹99/month after your trial</p>

            <div className="flex flex-wrap justify-center gap-2 my-5">
              {[
                ["vs ₹150", "one coffee"],
                ["vs ₹500", "one gym visit"],
                ["vs ₹1,200", "one health app/yr"],
              ].map(([price, vs]) => (
                <div key={vs} className="text-xs px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)", color: "#9ca3af" }}>
                  <strong style={{ color: "#fff" }}>{price}</strong> for {vs}
                </div>
              ))}
            </div>

            <CTA label="Start My Trial for ₹1 →" sub="Cancel before Day 7 — pay nothing more" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 11 — SOCIAL PROOF
          Place proof AFTER the offer because by now they want it
          but need confirmation from people like them.
          Testimonials must be: specific person, specific result,
          specific timeframe, specific change. No vague positivity.
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-xl mx-auto px-5 py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-center mb-3" style={{ color: "#25d366" }}>What Members Say</p>
        <h2 className="text-center font-bold mb-10" style={{ fontSize: "clamp(1.5rem, 4.5vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
          Real people. Specific numbers.<br />
          <span style={{ color: "#1aad4e" }}>Nothing vague.</span>
        </h2>

        <div className="space-y-4">
          <Testimonial
            name="Karan M."
            city="Pune"
            theme="Energy Month · May 2026"
            result="No 3 PM coffee since Day 6"
            quote="By Day 5 I stopped needing my 3 PM coffee. I'm a software engineer who works 10-hour days — the afternoon crash was just 'how life was.' Nothing else changed. One morning sunlight habit. That's it. I haven't had a 3 PM coffee in 3 weeks."
          />
          <Testimonial
            name="Priya T."
            city="Bengaluru"
            theme="Sleep Month · April 2026"
            result="Sleeping 47 minutes more (tracked)"
            quote="I've tried sleep podcasts, melatonin, blue-light glasses. This WhatsApp habit took 4 minutes. By Day 8 I was sleeping 47 minutes more per night — I tracked it on my Samsung Health app. Nothing else changed. My husband noticed before I told him."
          />
          <Testimonial
            name="Sneha R."
            city="Mumbai"
            theme="Focus Month · March 2026"
            result="Finished 6-week backlog in 14 days"
            quote="I was skeptical. Deeply. Day 12 I finished a project I'd been avoiding for 6 weeks. Day 17 my manager asked what changed in my work. I showed her the WhatsApp message from that morning. She asked for the link."
          />
          <Testimonial
            name="Vivek P."
            city="Hyderabad"
            theme="Gut Health Month · February 2026"
            result="Zero bloating after 18 days"
            quote="I've had bloating issues for 4 years. Three doctors, two diets, one elimination protocol. The gut habits here were embarrassingly simple — add curd, chew slower, morning water before food. 18 days in, bloating is gone. My wife keeps asking what I'm taking. I show her my WhatsApp."
          />
        </div>

        <div className="mt-8 p-5 rounded-2xl text-center" style={{ background: "#f4fef7", border: "1px solid #d1fae5" }}>
          <p className="text-sm font-semibold" style={{ color: "#15803d" }}>
            400+ members active · Avg. 78% habit completion rate in Month 1
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 12 — GUARANTEE + THEMES + URGENCY CTA
          Brunson: Remove every remaining reason not to act.
          The guarantee shifts all risk to the seller.
          Scarcity adds the reason to act now vs tomorrow.
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#18181b" }} className="px-5 py-14">
        <div className="max-w-xl mx-auto">

          {/* Guarantee */}
          <div className="rounded-2xl p-7 mb-8 text-center" style={{ background: "rgba(37,211,102,0.06)", border: "1px solid rgba(37,211,102,0.2)" }}>
            <div className="text-5xl mb-4">🛡️</div>
            <h3 className="font-bold text-xl mb-3" style={{ color: "#fff" }}>7 Days for ₹1. Zero Risk.</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#a1a1aa" }}>
              Try the full Daily Upgrade Club for 7 mornings. Real habits. Live accountability group. Weekly scorecard. Everything.<br /><br />
              If by Day 7 you haven&apos;t noticed a single shift in how you feel — send me one message. Cancelled. Done. Pay nothing more.<br /><br />
              <strong style={{ color: "#fff" }}>You risk ₹1. I risk my reputation.</strong>
            </p>
          </div>

          {/* Theme picker */}
          <div className="rounded-2xl p-5 mb-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-xs font-bold uppercase tracking-widest text-center mb-5" style={{ color: "#25d366" }}>Pick Your First Month&apos;s Theme</p>
            <div className="grid grid-cols-4 gap-2">
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
                <div key={label} className="rounded-xl p-2.5 text-center" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="text-xl mb-1">{emoji}</div>
                  <div className="text-xs" style={{ color: "#9ca3af" }}>{label}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-center mt-4" style={{ color: "#4a4a52" }}>You choose when you join. Switch every month.</p>
          </div>

          {/* Urgency block */}
          <div className="rounded-2xl px-5 py-4 mb-8" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.15)" }}>
            <p className="text-sm text-center font-semibold" style={{ color: "#fbbf24" }}>
              ⏰ New member groups open monthly. The July group starts July 1st — 23 spots remaining.
            </p>
          </div>

          <div className="text-center">
            <h2 className="font-bold mb-4" style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "#fff" }}>
              Your health doesn&apos;t need<br />a bigger routine.<br />
              <span style={{ color: "#25d366" }}>It needs a better system.</span>
            </h2>
            <p className="text-base mb-8" style={{ color: "#9ca3af" }}>
              One tiny healthy habit. Every morning. On WhatsApp.<br />
              Start for ₹1. Decide after you feel the difference.
            </p>
            <CTA size="lg" label="Get My First Habit Tomorrow — ₹1 →" sub="7 days for ₹1 · Then ₹99/month (₹3/day) · Cancel anytime before Day 7" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 13 — FAQ
          Answer every objection that made someone stop scrolling
          and almost leave. These are conversion rescue questions.
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#0a0a0a" }} className="px-5 py-14">
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-center mb-3" style={{ color: "#25d366" }}>FAQ</p>
          <h2 className="text-center font-bold mb-8" style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)", lineHeight: 1.2, color: "#fff" }}>
            Every question, answered.
          </h2>
          <div className="space-y-2.5">
            {[
              {
                q: "What exactly is a tiny healthy habit?",
                a: "One specific, science-backed action tied to your monthly theme — under 5 minutes. Examples: 5 minutes of morning sunlight (Energy Month), one spoon of plain curd with lunch (Gut Health), phone out of bedroom before 10 PM (Sleep Month), one 25-min deep-work block (Focus Month). Every habit comes with the why — the science behind why this specific action creates the result.",
              },
              {
                q: "What happens the moment I pay?",
                a: "You pay ₹1 via Razorpay. You see a confirmation page with a WhatsApp link. You click it, WhatsApp opens with a pre-filled message. You send it. You're added to the Daily Upgrade Club group. Tomorrow at 7 AM, your first habit arrives. That's the entire process.",
              },
              {
                q: "Do I need to share my WhatsApp number?",
                a: "No. When you click the WhatsApp link on the confirmation page, WhatsApp opens directly on your phone. You send one pre-filled message. We receive it. You're added. No forms, no number sharing, no manual steps.",
              },
              {
                q: "What happens after 7 days? Will I be charged automatically?",
                a: "On Day 6, we send you a direct message reminding you that your trial ends tomorrow. If you want to cancel, you reply CANCEL — done immediately, no charge. If you want to continue, do nothing. ₹99 is charged on Day 8. You're always told before any charge. We don't trap people.",
              },
              {
                q: "What if I miss a day?",
                a: "Nothing bad happens. If you haven't replied DONE by 8 PM, you get a gentle nudge. One missed day doesn't break your streak or your progress. Life happens. The system is built for real people with real lives — not for a perfect version of you that doesn't exist.",
              },
              {
                q: "Can I change my theme each month?",
                a: "Yes. At the start of each new month, you choose your next theme. Some members cycle through all 8. Some go deeper in the same one. Some do Sleep twice. There's no wrong answer.",
              },
              {
                q: "How do I cancel if I want to?",
                a: "Send one WhatsApp message: CANCEL. That's it. No forms, no calls, no guilt. Cancelled immediately. If you're in the middle of a month, you stay in until the month ends. No partial refunds needed because you paid ₹99 for a full month.",
              },
              {
                q: "I've tried habits before and always quit. What's different here?",
                a: "The system delivers the trigger, not you. Every other habit method depends on you remembering, deciding, and acting — all at the same time, every day. This arrives in your WhatsApp automatically. The decision is already made. You just reply DONE. The people who 'always quit' averaged 78% completion in Month 1 here — not because they changed, but because the system did.",
              },
              {
                q: "Is ₹99/month really worth it?",
                a: "₹3/day. Less than one chai. Less than 2 minutes of a private trainer. Less than one health supplement capsule. The question is whether the result is worth it — and that's exactly why the trial is ₹1. You don't decide based on this page. You decide after 7 mornings of actual habits.",
              },
            ].map(({ q, a }) => (
              <FAQ key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 14 — FINAL CLOSE
          Brunson: The last thing they read before clicking.
          Paint the two futures. Make them feel the cost of inaction.
          Then make the action feel obvious and small.
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(165deg,#edfff5 0%,#faf8f3 100%)", borderTop: "1px solid #d1fae5" }} className="px-5 py-16">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-4xl mb-6">🌱</p>
          <h2 className="font-bold mb-6" style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.05, letterSpacing: "-0.035em" }}>
            30 days from now,<br />you could be the person<br />
            <span style={{ color: "#1aad4e" }}>who actually did it.</span>
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "#52525b", maxWidth: 400, margin: "0 auto 1.5rem" }}>
            Or you could keep planning to start next Monday.<br /><br />
            Every Monday that passes is another week of the same energy, the same sleep, the same &ldquo;I should really take care of my health.&rdquo;<br /><br />
            <strong style={{ color: "#18181b" }}>One tiny healthy habit. ₹1. Tomorrow morning at 7 AM.</strong>
          </p>
          <CTA size="lg" label="Get My First Habit Tomorrow — ₹1 →" sub="7-day trial · Then ₹99/month (₹3/day) · Cancel before Day 7, pay nothing more" />

          <div className="mt-8 pt-6" style={{ borderTop: "1px solid #dde8dc" }}>
            <p className="text-sm" style={{ color: "#71717a" }}>
              Built by <strong style={{ color: "#18181b" }}>Rohan Mote</strong> · Questions?{" "}
              <a
                href="https://wa.me/918956146485?text=Hi+Rohan%2C+I+have+a+question+about+the+Daily+Upgrade+Club"
                className="underline font-medium"
                style={{ color: "#1aad4e" }}
              >
                Chat directly on WhatsApp
              </a>
            </p>
          </div>
        </div>
      </section>

      <footer className="px-5 py-8 text-center" style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p className="text-xs" style={{ color: "#3f3f46" }}>
          © {new Date().getFullYear()} Daily Upgrade Club ·{" "}
          <a href="https://www.highperformanceclub.co" className="underline" style={{ color: "#3f3f46" }}>highperformanceclub.co</a>
        </p>
        <p className="text-xs mt-1" style={{ color: "#27272a" }}>
          7-day trial ₹1 · Then ₹99/month · Cancel anytime by messaging CANCEL on WhatsApp
        </p>
      </footer>

    </div>
  );
}
