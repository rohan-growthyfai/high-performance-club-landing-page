const points = [
  {
    emoji: "⏰",
    title: "No matter how busy you are",
    body: "Each habit takes under 5 minutes. If you can send a WhatsApp, you have time for this.",
  },
  {
    emoji: "🧑‍🤝‍🧑",
    title: "No matter your age",
    body: "Whether you are 25 or 55, these habits are small and easy. Anyone can do them, no matter how out of shape or busy you feel.",
  },
  {
    emoji: "🚶",
    title: "No matter your fitness level",
    body: "No gym, no diet, no intense workouts. Just small daily actions anyone can do, starting from zero.",
  },
  {
    emoji: "🔄",
    title: "No matter how many times you've quit",
    body: "Failed 10 challenges before? Perfect. This one is built to be too easy to quit.",
  },
  {
    emoji: "💼",
    title: "No matter your profession",
    body: "Job, kids, college, or running a business — these habits take under 5 minutes and fit into any day, no matter how packed it is.",
  },
  {
    emoji: "🌱",
    title: "You'll still see real progress",
    body: "More energy, better health, better sleep — you will feel the difference in 7 days. Your before and after score will show it clearly.",
  },
];

export default function SystemAdapts() {
  return (
    <section className="py-16 lg:py-24 bg-section-cream">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">
            Built for everyone
          </p>
          <h2 className="font-display text-section-title text-balance text-foreground mb-4">
            Whoever you are, the tiny healthy habits challenge <span className="gradient-text">adapts to you</span>
          </h2>
          <p className="text-base sm:text-lg text-foreground-muted max-w-2xl mx-auto">
            This isn&apos;t a one-size-fits-all program you have to keep up with. It&apos;s a tiny daily system that meets you exactly where you are.
          </p>
        </div>

        {/* 6 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {points.map((p, i) => (
            <div
              key={i}
              className="bg-white border border-border-subtle rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center mb-5 text-2xl">
                {p.emoji}
              </div>
              <h3 className="font-bold text-foreground text-lg mb-2 leading-snug">
                {p.title}
              </h3>
              <p className="text-base text-foreground-muted leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* reassurance line */}
        <p className="text-center mt-12 text-lg sm:text-xl font-bold text-foreground text-balance max-w-2xl mx-auto leading-relaxed">
          Yes — this challenge was made for <span className="gradient-text">someone exactly like you.</span>
        </p>

      </div>
    </section>
  );
}
