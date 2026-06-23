import { X, Check } from "lucide-react";

const before = [
  { emoji: "⚡", text: "Low energy even after sleeping" },
  { emoji: "⚡", text: "Tired every afternoon, every day" },
  { emoji: "💚", text: "Small health issues that keep coming back" },
  { emoji: "💚", text: "Starting things but never finishing" },
  { emoji: "🌙", text: "Taking too long to fall asleep" },
  { emoji: "🌙", text: "Waking up and not feeling rested" },
];

const after = [
  { emoji: "⚡", text: "More energy from the moment you wake up" },
  { emoji: "⚡", text: "Alert and focused through the whole day" },
  { emoji: "💚", text: "Feeling lighter and healthier from inside" },
  { emoji: "💚", text: "One small habit done daily — without missing" },
  { emoji: "🌙", text: "Falling asleep more easily and naturally" },
  { emoji: "🌙", text: "Waking up feeling fresh and ready to go" },
];

export default function BeforeAfter() {
  return (
    <section className="py-16 lg:py-24 bg-section-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-section-title text-balance text-foreground mb-4">
            Where you are now <span className="text-accent">→</span> where you&apos;ll be in 7 days
          </h2>
          <p className="text-base sm:text-lg text-foreground-muted max-w-xl mx-auto">
            Same you. Same busy life. A completely different feeling — in just one week.
          </p>
        </div>

        {/* Cards + arrow */}
        <div className="flex flex-col md:flex-row items-stretch gap-0">

          {/* DAY 0 — TODAY */}
          <div className="flex-1 rounded-3xl border border-border-subtle bg-zinc-50/70 p-6 sm:p-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-200/70 text-foreground-subtle text-xs sm:text-sm font-bold uppercase tracking-wide mb-6">
              Day 0 — Today
            </span>
            <ul className="flex flex-col gap-4">
              {before.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 text-zinc-500" strokeWidth={3} />
                  </span>
                  <span className="text-base text-foreground-muted leading-snug">
                    <span className="mr-1.5">{b.emoji}</span>{b.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Arrow — horizontal on desktop, vertical on mobile */}
          <div className="flex items-center justify-center md:flex-col py-4 md:py-0 md:px-4">
            <div className="hidden md:flex flex-col items-center gap-2">
              <div className="w-px flex-1 bg-accent/30" />
              <span className="text-3xl font-black text-accent leading-none">→</span>
              <div className="w-px flex-1 bg-accent/30" />
            </div>
            <span className="md:hidden text-3xl font-black text-accent leading-none">↓</span>
          </div>

          {/* DAY 7 — TRANSFORMED */}
          <div className="flex-1 rounded-3xl border-2 border-accent/40 bg-accent/[0.06] p-6 sm:p-8 shadow-md relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-accent/10" aria-hidden="true" />
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-white text-xs sm:text-sm font-bold uppercase tracking-wide mb-6 relative">
              Day 7 — Transformed
            </span>
            <ul className="flex flex-col gap-4 relative">
              {after.map((a, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-base text-foreground leading-snug font-medium">
                    <span className="mr-1.5">{a.emoji}</span>{a.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <a
            href="https://wa.me/918956146485?text=Hi%21+I+want+to+start+my+Healthy+Habits+Challenge" target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full text-lg sm:text-xl font-bold"
          >
            Yes — start my 7-day shift (FREE) →
          </a>
        </div>

      </div>
    </section>
  );
}
