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
          Tired of big plans that{" "}
          <span className="text-foreground-muted">never last</span>?{" "}
          <br className="hidden sm:block" />
          Try{" "}
          <span className="gradient-text">1 tiny habit a day</span>.
        </h2>

        <p className="text-base sm:text-lg text-foreground-muted leading-relaxed mb-5">
          You have tried other plans before. A fitness app. A new morning routine. A big diet.
          And each one asked you to <span className="font-semibold text-foreground">change everything at once</span> —
          wake up at 5 AM, eat new food, follow strict rules, give up things you love.
        </p>

        <p className="text-base sm:text-lg text-foreground-muted leading-relaxed mb-8">
          It feels good for two or three days. Then real life gets busy. It is too much, too fast.
          You miss one day, feel like you failed, and stop. <span className="font-semibold text-foreground">It is not your fault.</span>{" "}
          No one can change their whole life in one day.
        </p>

        {/* Old way vs Tiny way contrast */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-8">
          <div className="rounded-2xl border-2 border-red-200 bg-red-50/60 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2">❌ Other plans</p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              &quot;Change everything. Wake up early. New food. New rules.&quot;
              Too hard → you give up.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-accent/40 bg-accent/5 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-accent mb-2">✅ Tiny Habits</p>
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-semibold">Just 1 tiny change a day</span> — so small you barely
              notice it. Easy to do. Easy to win.
            </p>
          </div>
        </div>

        <p className="text-base sm:text-lg text-foreground leading-relaxed font-medium mb-10">
          That is the magic. You do not change your whole life. You change{" "}
          <span className="text-emphasis-mint">one tiny thing</span> — on WhatsApp, in under 5 minutes.
          You will barely feel it. But day after day, these tiny wins{" "}
          <span className="font-semibold text-foreground">add up</span> — until one day you look back
          and see a big change. <span className="italic">Maybe this time is different. Let us find out.</span>
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
