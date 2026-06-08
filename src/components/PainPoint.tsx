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
          Be honest — you&apos;ve tried the programs before. The 60-day plan. The fitness app.
          The new morning routine. And every one of them asked you to{" "}
          <span className="font-semibold text-foreground">overhaul your entire life at once</span> —
          wake up at 5 AM, change what you eat, follow a strict schedule, give up the things you enjoy.
        </p>

        <p className="text-base sm:text-lg text-foreground-muted leading-relaxed mb-8">
          It feels exciting for two or three days… then real life hits. It&apos;s too much, too fast.
          You miss a day, feel like you&apos;ve failed, and quietly quit. <span className="font-semibold text-foreground">It&apos;s not your fault.</span>{" "}
          No one can flip their whole life overnight and keep it up.
        </p>

        {/* Old way vs Tiny way contrast */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-8">
          <div className="rounded-2xl border-2 border-red-200 bg-red-50/60 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2">❌ Other programs</p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              &quot;Change everything. Wake up early, new diet, new routine, more discipline.&quot;
              Overwhelming → you burn out and quit.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-accent/40 bg-accent/5 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-accent mb-2">✅ Tiny Habits</p>
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-semibold">One tiny change a day</span> — so small you barely
              notice you made it. Effortless to keep. Easy to win.
            </p>
          </div>
        </div>

        <p className="text-base sm:text-lg text-foreground leading-relaxed font-medium mb-10">
          That&apos;s the magic. You don&apos;t change your life — you change{" "}
          <span className="text-emphasis-mint">one tiny thing</span>, on WhatsApp, in under 5 minutes.
          You won&apos;t even feel it. But day after day, those tiny wins{" "}
          <span className="font-semibold text-foreground">compound</span> — until one day you look
          back and see a real, visible difference. <span className="italic">Maybe this time is different. Let&apos;s find out.</span>
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
