/**
 * PainPoint — names the prospect's biggest pain + the "old way" that fails them,
 * then ties in HPC's unique benefit. Sits right below the live stats bar.
 */

export default function PainPoint() {
  return (
    <section className="py-16 lg:py-24 bg-section-cream border-t border-border-subtle">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">

        <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-4">
          Sound familiar?
        </p>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] text-foreground mb-6 text-balance">
          You don&apos;t need more{" "}
          <span className="text-foreground-muted">motivation</span>.<br className="hidden sm:block" />{" "}
          You need a habit that{" "}
          <span className="gradient-text">actually sticks</span>.
        </h2>

        <p className="text-base sm:text-lg text-foreground-muted leading-relaxed mb-5">
          You&apos;ve tried the 5 AM routines, the 30-day apps, the gym memberships. They
          ask for willpower you don&apos;t have on a busy day — so you start strong, then quit by Day 3.
          It&apos;s not you. It&apos;s the <span className="font-semibold text-foreground">all-or-nothing</span> approach.
        </p>

        <p className="text-base sm:text-lg text-foreground leading-relaxed font-medium mb-10">
          This is the opposite. <span className="text-emphasis-mint">One tiny habit a day</span>, delivered
          to your WhatsApp, that takes under 5 minutes — small enough that you can&apos;t fail,
          powerful enough that it compounds.
        </p>

        <div className="flex justify-center">
          <a
            href="#signup-1"
            className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full text-lg sm:text-xl font-bold"
          >
            Show Me How It Works →
          </a>
        </div>

      </div>
    </section>
  );
}
