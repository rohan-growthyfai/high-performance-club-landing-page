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
    desc: "Improve your focus and productivity with small daily actions to finish tasks faster.",
    color: "bg-blue-50 border-blue-200",
    badgeColor: "bg-blue-500 text-white",
    textColor: "text-blue-600",
  },
];

const dailyLoop = [
  {
    icon: Sun,
    time: "6:00 AM — Morning",
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

        {/* Two-column: 3 stacked cards LEFT, text RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-14">

          {/* LEFT — Daily Loop cards stacked vertically */}
          <div className="order-2 lg:order-1">
            <div className="flex flex-col gap-5 relative pt-3 pl-3">
              {/* Connector arrows between stacked steps */}
              <div className="hidden lg:flex absolute left-[7%] top-[28%] -translate-y-1/2 items-center pointer-events-none z-10">
                <ArrowRight className="w-6 h-6 text-accent/40 rotate-90" />
              </div>
              <div className="hidden lg:flex absolute left-[7%] top-[64%] -translate-y-1/2 items-center pointer-events-none z-10">
                <ArrowRight className="w-6 h-6 text-accent/40 rotate-90" />
              </div>

              {dailyLoop.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.time} className={`rounded-2xl border-2 ${step.bg} p-6 flex items-start gap-4 text-left relative`}>
                    <div className={`w-12 h-12 rounded-full bg-white border-2 flex items-center justify-center shrink-0 shadow-sm ${step.bg}`}>
                      <Icon className={`w-6 h-6 ${step.color}`} />
                    </div>
                    <div>
                      <p className={`text-sm font-bold mb-2 ${step.color}`}>
                        {step.time}
                      </p>
                      <p className="text-sm text-foreground-muted leading-relaxed">
                        {step.label}
                      </p>
                    </div>
                    {/* Step number */}
                    <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center shadow-sm">
                      {i + 1}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Repeat badge — center-aligned */}
            <div className="flex justify-center mt-5">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-border shadow-sm">
                <span className="text-base">🔁</span>
                <span className="text-sm font-semibold text-foreground-muted">
                  Repeat for 7 days. That&apos;s the whole thing.
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — copy (left-aligned) */}
          <div className="order-1 lg:order-2 text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">
              Simple. Tiny. Powerful.
            </p>
            <h2 className="font-display text-section-title text-balance text-foreground mb-4">
              How this challenge works.
            </h2>
            <p className="text-sm sm:text-lg text-foreground-muted leading-relaxed mb-6">
              For 7 days, you&apos;ll receive one tiny habit on WhatsApp every morning. Each habit is designed to help you feel more energetic, healthier, and more focused.
            </p>

            {/* Curiosity closer */}
            <div className="inline-block bg-white border-2 border-accent/40 rounded-2xl px-5 py-5 sm:px-6 sm:py-5 shadow-md">
              <p className="text-base text-foreground-muted leading-relaxed">
                The habits are simple, practical, and revealed one day at a time on WhatsApp.
              </p>
            </div>
          </div>

        </div>

        <div className="flex flex-col items-center gap-3 pt-4 pb-2">
          <p className="text-base text-foreground-muted text-center max-w-md">Ready to experience it yourself?</p>
          <a href="#signup-1" className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full text-lg sm:text-xl font-bold">
            Yes!! Let&apos;s Get Started
          </a>
        </div>

      </div>
    </section>
  );
}
