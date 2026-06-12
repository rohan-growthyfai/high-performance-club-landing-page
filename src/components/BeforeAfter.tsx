import { X, Check } from "lucide-react";

/**
 * BeforeAfter — "Where you are now → where you'll be in 7 days".
 *
 * Two side-by-side cards (Day 0 today vs Day 7) giving the user crystal-clear
 * before/after picture of the transformation. Adapted to the 7-Day WhatsApp
 * Habits Challenge (energy / health / sleep). Placed right after SoundsLikeYou.
 */

const before = [
  "Drained and foggy by 3pm every day",
  "Sleep that leaves you tired in the morning",
  "Starting habits on Monday, quitting by Wednesday",
  "Trying to fix everything at once — and burning out",
  "No clear proof that anything is actually working",
  "Going it alone, with no one to keep you on track",
];

const after = [
  "Steady energy that lasts the whole day",
  "Falling asleep faster, waking up refreshed",
  "One tiny habit a day — that actually sticks",
  "A simple system that fits your real, busy life",
  "Your own before → after score, in black and white",
  "A daily nudge on WhatsApp keeping you consistent",
];

export default function BeforeAfter() {
  return (
    <section className="py-16 lg:py-24 bg-section-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-section-title text-balance text-foreground mb-4">
            Where you are now <span className="text-accent">→</span> where you&apos;ll be in 7 days
          </h2>
          <p className="text-base sm:text-lg text-foreground-muted max-w-xl mx-auto">
            Same you. Same busy life. A completely different feeling — in just one week.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

          {/* DAY 0 — TODAY */}
          <div className="rounded-3xl border border-border-subtle bg-zinc-50/70 p-6 sm:p-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-200/70 text-foreground-subtle text-xs sm:text-sm font-bold uppercase tracking-wide mb-6">
              Day 0 — Today
            </span>
            <ul className="flex flex-col gap-4">
              {before.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 text-zinc-500" strokeWidth={3} />
                  </span>
                  <span className="text-base text-foreground-muted leading-snug">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* DAY 7 — TRANSFORMED */}
          <div className="rounded-3xl border-2 border-accent/40 bg-accent/[0.06] p-6 sm:p-8 shadow-md relative overflow-hidden">
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
                  <span className="text-base text-foreground leading-snug font-medium">{a}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <a
            href="#signup-1"
            className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full text-lg sm:text-xl font-bold"
          >
            Yes — start my 7-day shift (FREE) →
          </a>
        </div>

      </div>
    </section>
  );
}
