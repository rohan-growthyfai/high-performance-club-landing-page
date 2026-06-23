import { Check } from "lucide-react";

/**
 * ValueLadder — "Everything you're getting today" row-by-row value stack.
 *
 * Lists the challenge deliverables with individual ₹ values that sum to the
 * total, struck through, then revealed as FREE (₹0). Mirrors the classic
 * value-ladder layout, adapted for the FREE 7-Day WhatsApp Habits Challenge.
 */

const items = [
  { name: "7 Daily Tiny-Habit Messages (on WhatsApp)", value: "₹2,999" },
  { name: "Personalized Before → After Progress Score", value: "₹1,999" },
  { name: "Day-7 Completion Certificate", value: "₹1,499" },
  { name: "7-Habit Reference PDF (keep forever)", value: "₹1,499" },
  { name: "Evening Check-ins & Streak Tracker", value: "₹999" },
  { name: "Private WhatsApp Community", value: "₹999" },
];

export default function ValueLadder() {
  return (
    <section className="py-16 lg:py-24 bg-section-cream">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">

        <div className="rounded-3xl border-2 border-accent/30 bg-white shadow-lg overflow-hidden">

          {/* Header */}
          <div className="text-center px-6 sm:px-10 pt-9 pb-6">
            <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-2">
              Here&apos;s the math
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-balance">
              Everything you&apos;re getting today
            </h2>
          </div>

          {/* Rows */}
          <div className="px-6 sm:px-10">
            {items.map((it, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 py-4 border-t border-border-subtle"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-accent" strokeWidth={3} />
                  </span>
                  <span className="text-base text-foreground leading-snug">{it.name}</span>
                </div>
                <span className="text-base font-semibold text-foreground-subtle tabular-nums shrink-0">
                  {it.value}
                </span>
              </div>
            ))}

            {/* Total */}
            <div className="flex items-center justify-between gap-4 py-5 mt-2 border-t-2 border-border bg-zinc-50 -mx-6 sm:-mx-10 px-6 sm:px-10">
              <span className="text-sm uppercase tracking-wide font-bold text-foreground-subtle">
                Total Value
              </span>
              <span className="text-xl font-black text-foreground-subtle line-through tabular-nums">
                ₹9,994
              </span>
            </div>
          </div>

          {/* Price reveal */}
          <div className="text-center px-6 sm:px-10 pt-8 pb-9">
            <p className="text-base text-foreground-muted mb-2">
              When you join today, you pay
            </p>
            <p className="font-display font-black text-6xl sm:text-7xl gradient-text leading-none mb-2">
              ₹0
            </p>
            <p className="text-base text-foreground-muted mb-7">
              100% FREE · no credit card · no hidden charges
            </p>
            <a
              href="https://wa.me/918956146485?text=Hi%21+I+want+to+start+my+Healthy+Habits+Challenge" target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full text-lg sm:text-xl font-bold w-full sm:w-auto"
            >
              Yes — start the challenge for FREE →
            </a>
            <p className="text-sm text-foreground-subtle mt-5 italic">
              Our goal: help 1 million people live healthier, happier lives — one tiny healthy habit at a time.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
