const benefits = [
  {
    emoji: "⚡",
    title: "More Energy",
    desc: "Start your mornings feeling lighter and more awake.",
  },
  {
    emoji: "🎯",
    title: "Better Focus",
    desc: "Less distraction. More control.",
  },
  {
    emoji: "😊",
    title: "More Confidence",
    desc: "Keep promises to yourself again.",
  },
  {
    emoji: "🌿",
    title: "Healthier Daily Habits",
    desc: "Small habits that support your wellbeing.",
  },
  {
    emoji: "🔁",
    title: "Consistency",
    desc: "Build habits you can actually sustain.",
  },
];

export default function SevenDayResults() {
  return (
    <section className="py-24 lg:py-32 bg-section-white relative">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-accent font-bold mb-5">
            What will happen in just 7 days
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-foreground">
            What You&apos;ll Actually Notice
          </h2>
        </div>

        {/* Benefit cards — centered row wrapping */}
        <div className="flex flex-wrap justify-center gap-5 mb-16">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="flex flex-col items-center text-center gap-3 bg-white border border-border-subtle rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow"
              style={{ width: "clamp(200px, 28%, 280px)", flexGrow: 0 }}
            >
              <span className="text-4xl">{b.emoji}</span>
              <p className="text-lg font-bold text-foreground leading-snug">{b.title}</p>
              <p className="text-base text-foreground-muted leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom line */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="w-12 h-px bg-border mx-auto mb-8" />
          <p className="text-xl sm:text-2xl text-foreground-muted leading-relaxed">
            Just 7 tiny upgrades that naturally fit into your daily routine.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3">
          <a
            href="#signup"
            className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dim transition-all text-white font-bold text-lg sm:text-xl px-10 py-5 rounded-full shadow-lg hover:-translate-y-0.5"
          >
            I want these results — join free →
          </a>
        </div>

      </div>
    </section>
  );
}
