/**
 * HowChallengeWorks — visual explainer section.
 *
 * Shows in one glance:
 *  1. The 4 life areas this challenge covers (not just health/fitness)
 *  2. The daily loop: morning habit → do it → evening check-in
 *  3. Day 7 transformation: significant shifts in all 4 areas
 *
 * Designed to be scannable in under 10 seconds.
 */

import { Sun, Moon, CheckCircle2, ArrowRight } from "lucide-react";

const areas = [
  {
    emoji: "⚡",
    label: "Energy",
    desc: "Wake up lighter. Stay energised till evening. No afternoon crash.",
    color: "bg-amber-50 border-amber-200",
    badgeColor: "bg-amber-400 text-white",
    textColor: "text-amber-600",
  },
  {
    emoji: "💚",
    label: "Health",
    desc: "Small daily actions that improve how your body feels — without gym or diet.",
    color: "bg-emerald-50 border-emerald-200",
    badgeColor: "bg-emerald-500 text-white",
    textColor: "text-emerald-600",
  },
  {
    emoji: "🎯",
    label: "Productivity",
    desc: "Get more done in less time. Cut distractions. Feel in control of your day.",
    color: "bg-blue-50 border-blue-200",
    badgeColor: "bg-blue-500 text-white",
    textColor: "text-blue-600",
  },
  {
    emoji: "🤝",
    label: "Relationships",
    desc: "Better connection with yourself and others. Calmer. More present. More you.",
    color: "bg-pink-50 border-pink-200",
    badgeColor: "bg-pink-500 text-white",
    textColor: "text-pink-600",
  },
];

const dailyLoop = [
  {
    icon: Sun,
    time: "6:00 AM",
    label: "Morning habit",
    desc: "One tiny high-performance habit lands in your WhatsApp.",
    color: "text-amber-500",
    bg: "bg-amber-50 border-amber-200",
  },
  {
    icon: CheckCircle2,
    time: "Anytime",
    label: "You do it",
    desc: "Takes max 5 minutes. Read it, do it, done.",
    color: "text-emerald-500",
    bg: "bg-emerald-50 border-emerald-200",
  },
  {
    icon: Moon,
    time: "8:00 PM",
    label: "Evening check-in",
    desc: "A quick reminder to reflect on your habit for the day.",
    color: "text-indigo-500",
    bg: "bg-indigo-50 border-indigo-200",
  },
];

export default function HowChallengeWorks() {
  return (
    <section id="how-it-works-journey" className="py-20 lg:py-28 relative bg-section-cream overflow-hidden">
      {/* Floating decorations */}
      <span className="emoji-deco float-1 top-20 right-8 text-4xl hidden lg:block" aria-hidden="true">✨</span>
      <span className="emoji-deco float-2 bottom-24 left-10 text-4xl hidden lg:block" aria-hidden="true">💫</span>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">
            Simple. Tiny. Powerful.
          </p>
          <h2 className="font-display text-section-title text-balance text-foreground mb-4">
            How this challenge works.
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto leading-relaxed">
            This is not a fitness challenge. This is not about diets or workouts.
            This challenge is designed to help you build tiny sustainable habits
            across <span className="font-semibold text-foreground">four key areas of your life</span> — all in 7 days.
          </p>
        </div>

        {/* ── PART 1: 4 Life Areas ── */}
        <div className="mb-14">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-foreground-subtle font-bold mb-6">
            The 4 areas you will improve
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {areas.map((a) => (
              <div
                key={a.label}
                className={`rounded-2xl border-2 ${a.color} p-5 text-center hover-glow`}
              >
                <div className="text-4xl mb-3">{a.emoji}</div>
                <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 ${a.badgeColor}`}>
                  {a.label}
                </span>
                <p className={`text-sm leading-relaxed ${a.textColor} font-medium`}>
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-4 mb-14">
          <div className="flex-1 h-px bg-border-subtle" />
          <p className="text-sm text-foreground-subtle font-medium whitespace-nowrap">
            Here is your daily routine
          </p>
          <div className="flex-1 h-px bg-border-subtle" />
        </div>

        {/* ── PART 2: Daily Loop ── */}
        <div className="mb-14">
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto relative">
            {/* Connector arrows between steps */}
            <div className="hidden sm:flex absolute top-1/2 left-[33%] -translate-y-1/2 items-center pointer-events-none z-10">
              <ArrowRight className="w-6 h-6 text-accent/40" />
            </div>
            <div className="hidden sm:flex absolute top-1/2 left-[66%] -translate-y-1/2 items-center pointer-events-none z-10">
              <ArrowRight className="w-6 h-6 text-accent/40" />
            </div>

            {dailyLoop.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className={`rounded-2xl border-2 ${step.bg} p-6 text-center relative`}>
                  <div className={`w-12 h-12 rounded-full bg-white border-2 flex items-center justify-center mx-auto mb-3 shadow-sm ${step.bg}`}>
                    <Icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                  <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${step.color}`}>
                    {step.time}
                  </p>
                  <h3 className="font-display font-bold text-foreground text-base mb-2">
                    {step.label}
                  </h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {step.desc}
                  </p>
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center shadow-sm">
                    {i + 1}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Repeat badge */}
          <div className="flex justify-center mt-5">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-border shadow-sm">
              <span className="text-base">🔁</span>
              <span className="text-sm font-semibold text-foreground-muted">
                Repeat for 7 days. That&apos;s the whole thing.
              </span>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-4 mb-14">
          <div className="flex-1 h-px bg-border-subtle" />
          <p className="text-sm text-foreground-subtle font-medium whitespace-nowrap">
            What happens on Day 7
          </p>
          <div className="flex-1 h-px bg-border-subtle" />
        </div>

        {/* ── PART 3: Day 7 Result ── */}
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl bg-gradient-to-br from-green-50 via-emerald-50 to-white border-2 border-green-300 p-8 lg:p-10">
            <div className="flex items-start gap-5">
              <span className="text-5xl flex-shrink-0">🏆</span>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-600 font-bold mb-2">
                  Day 7 · Your result
                </p>
                <h3 className="font-display text-2xl font-bold text-foreground mb-4 leading-snug">
                  Significant shifts in all 4 areas of your life.
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  {areas.map((a) => (
                    <div key={a.label} className="bg-white border border-green-200 rounded-xl p-3 text-center">
                      <div className="text-2xl mb-1">{a.emoji}</div>
                      <p className="text-xs font-bold text-foreground">{a.label}</p>
                      <p className="text-xs text-emerald-600 font-bold mt-0.5">↑ Improved</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  You will also receive a <span className="font-semibold text-foreground">personalized Day 7 report</span> showing
                  exactly what changed — and a <span className="font-semibold text-foreground">completion certificate</span> to celebrate finishing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Curiosity closer */}
        <div className="mt-14 text-center">
          <div className="inline-block bg-white border-2 border-accent/40 rounded-2xl px-8 py-6 shadow-md max-w-xl">
            <p className="text-xl font-bold text-foreground mb-2">
              What are the 7 habits? 🔒
            </p>
            <p className="text-base text-foreground-muted leading-relaxed">
              Deliberately kept secret. You unlock one each morning — delivered only in your WhatsApp.
              <span className="font-semibold text-foreground"> No spoilers here.</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
