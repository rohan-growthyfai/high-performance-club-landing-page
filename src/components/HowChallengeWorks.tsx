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
    desc: "Start your day with small actions that help you feel active and refreshed.",
    color: "bg-amber-50 border-amber-200",
    badgeColor: "bg-amber-400 text-white",
    textColor: "text-amber-600",
  },
  {
    emoji: "💚",
    label: "Health",
    desc: "Build simple habits that support your body without gym routines or strict diets.",
    color: "bg-emerald-50 border-emerald-200",
    badgeColor: "bg-emerald-500 text-white",
    textColor: "text-emerald-600",
  },
  {
    emoji: "🎯",
    label: "Focus",
    desc: "Create a calmer, clearer start so you can get more done without feeling scattered.",
    color: "bg-blue-50 border-blue-200",
    badgeColor: "bg-blue-500 text-white",
    textColor: "text-blue-600",
  },
];

const dailyLoop = [
  {
    icon: Sun,
    time: "6:00 AM — Morning Habit",
    label: "You receive one tiny habit on WhatsApp.",
    desc: "",
    color: "text-amber-500",
    bg: "bg-amber-50 border-amber-200",
  },
  {
    icon: CheckCircle2,
    time: "Anytime — You Do It",
    label: "Read it. Do it. Reply when done.",
    desc: "",
    color: "text-emerald-500",
    bg: "bg-emerald-50 border-emerald-200",
  },
  {
    icon: Moon,
    time: "8:00 PM — Evening Check-in",
    label: "A quick reminder to reflect and stay on track.",
    desc: "",
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
            For 7 days, you&apos;ll receive one tiny habit on WhatsApp every morning. Each habit is designed to help you feel more energetic, healthier, and more focused.
          </p>
        </div>

        {/* ── PART 1: 4 Life Areas ── */}
        <div className="mb-14">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-foreground-subtle font-bold mb-6">
            The key areas you will improve
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
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
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto relative overflow-hidden">
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
                <div key={step.time} className={`rounded-2xl border-2 ${step.bg} p-6 text-center relative`}>
                  <div className={`w-12 h-12 rounded-full bg-white border-2 flex items-center justify-center mx-auto mb-3 shadow-sm ${step.bg}`}>
                    <Icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                  <p className={`text-sm font-bold mb-2 ${step.color}`}>
                    {step.time}
                  </p>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {step.label}
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

        {/* Curiosity closer */}
        <div className="mt-14 text-center">
          <div className="inline-block bg-white border-2 border-accent/40 rounded-2xl px-5 py-5 sm:px-8 sm:py-6 shadow-md max-w-xl">
            <p className="text-base text-foreground-muted leading-relaxed">
              The habits are simple, practical, and revealed one day at a time on WhatsApp.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 pt-14 pb-2">
          <p className="text-base text-foreground-muted text-center max-w-md">Ready to experience it yourself?</p>
          <a href="#signup" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dim transition-all text-white font-bold text-lg sm:text-xl px-10 py-5 rounded-full shadow-lg hover:-translate-y-0.5">
            Yes!! Let&apos;s Get Started
          </a>
        </div>

      </div>
    </section>
  );
}
