const cards = [
  { emoji: "⚡", title: "Tiny Is Fast", desc: "Start in minutes, not hours." },
  { emoji: "🛡️", title: "Tiny Feels Safe", desc: "No pressure. No fear of failure." },
  { emoji: "🌱", title: "Tiny Can Grow Big", desc: "Small actions create real momentum." },
  { emoji: "🧠", title: "Tiny Doesn't Need Motivation", desc: "Easy enough to do even on busy days." },
  { emoji: "🔁", title: "Tiny Is Sustainable", desc: "Built to last beyond the challenge." },
  { emoji: "🚀", title: "Tiny Builds Momentum", desc: "One small win makes the next one easier." },
];

export default function WhyTinyHabits() {
  return (
    <section className="py-24 lg:py-32 bg-section-cream relative">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-accent font-bold mb-5">
            Why Tiny Habits?
          </p>
          <h2 className="font-serif text-4xl sm:text-4xl lg:text-6xl font-medium leading-[1.1] text-foreground mb-6">
            Big changes fail.
            <br />
            <span className="italic font-light">Tiny changes stick.</span>
          </h2>
          <p className="text-base sm:text-xl text-foreground-muted leading-relaxed">
            This challenge is built around tiny actions that take less than 5 minutes. No willpower. No pressure. No perfection required.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-6 border border-border-subtle shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow text-center sm:text-left"
            >
              <span className="text-3xl">{card.emoji}</span>
              <p className="text-lg font-bold text-foreground leading-snug">{card.title}</p>
              <p className="text-base text-foreground-muted leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom line */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="w-12 h-px bg-border mx-auto mb-8" />
          <p className="text-xl sm:text-2xl font-semibold text-foreground mb-4">
            Don&apos;t try to change your life overnight.
          </p>
          <p className="text-xl sm:text-2xl font-serif italic text-accent leading-relaxed">
            Start tiny.
            <br />
            Stay consistent.
            <br />
            Let momentum do the work.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3">
          <a
            href="#signup-1"
            className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full text-lg sm:text-xl font-bold"
          >
            Start tiny today — join free →
          </a>
        </div>

      </div>
    </section>
  );
}
