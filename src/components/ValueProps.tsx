/**
 * ValueProps — 3 big benefit blocks in an alternating zig-zag layout
 * (visual ⇄ text), each with a "Dream Outcome" eyebrow, a value-prop headline,
 * a short WIIFM line, and a CTA. Mirrors the classic sales-page zig-zag.
 */

const props = [
  {
    eyebrow: "More Energy, All Day",
    title: "Wake up clear — and stay sharp till night",
    body: "Each morning you get one science-backed habit that lifts your energy without caffeine crashes or 5 AM alarms. Small input, all-day output.",
    emoji: "⚡",
    tint: "from-amber-50 to-amber-100/40",
  },
  {
    eyebrow: "Deep Focus On Demand",
    title: "Get more done in 7 minutes than most do in 2 hours",
    body: "Tiny focus rituals retrain your attention so distractions lose their grip. You finish what matters — and actually log off on time.",
    emoji: "🎯",
    tint: "from-blue-50 to-blue-100/40",
  },
  {
    eyebrow: "Calm Nights, Better Sleep",
    title: "Switch off stress and fall asleep faster",
    body: "End-of-day habits that quiet a racing mind in under a minute — so you rest deeper and wake up genuinely refreshed.",
    emoji: "🌙",
    tint: "from-indigo-50 to-indigo-100/40",
  },
];

export default function ValueProps() {
  return (
    <section className="py-16 lg:py-24 bg-section-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14 lg:mb-20">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">
            What you actually get
          </p>
          <h2 className="font-display text-section-title text-balance text-foreground">
            Three shifts in <span className="gradient-text">7 days</span>.
          </h2>
        </div>

        <div className="flex flex-col gap-16 lg:gap-24">
          {props.map((p, i) => {
            const imgFirst = i % 2 === 0; // alternate sides on desktop
            return (
              <div
                key={p.title}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              >
                {/* VISUAL */}
                <div className={`${imgFirst ? "lg:order-1" : "lg:order-2"}`}>
                  <div className={`relative rounded-3xl overflow-hidden border border-border-subtle shadow-sm aspect-[4/3] bg-gradient-to-br ${p.tint} flex items-center justify-center`}>
                    <span className="text-7xl lg:text-8xl opacity-90" aria-hidden="true">{p.emoji}</span>
                  </div>
                </div>

                {/* TEXT */}
                <div className={`${imgFirst ? "lg:order-2" : "lg:order-1"} text-center lg:text-left`}>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-accent font-bold mb-3">
                    {p.eyebrow}
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.2] text-foreground mb-4 text-balance">
                    {p.title}
                  </h3>
                  <p className="text-base sm:text-lg text-foreground-muted leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0">
                    {p.body}
                  </p>
                  <div className="flex justify-center lg:justify-start">
                    <a
                      href="#signup-1"
                      className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base sm:text-lg font-bold"
                    >
                      Start Free on WhatsApp →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
