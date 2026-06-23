const points = [
  {
    emoji: "⏰",
    title: "No matter how busy you are",
    body: "Under 5 minutes a day. If you can check WhatsApp, you have time.",
  },
  {
    emoji: "🧑‍🤝‍🧑",
    title: "No matter your age",
    body: "Works for 25 or 55. Small, easy habits anyone can start today.",
  },
  {
    emoji: "🚶",
    title: "No matter your fitness level",
    body: "No gym. No diet. Just tiny daily actions — starting from zero.",
  },
  {
    emoji: "🔄",
    title: "No matter how many times you've quit",
    body: "Quit 10 challenges before? Good. This one is too easy to quit.",
  },
  {
    emoji: "💼",
    title: "No matter your profession",
    body: "Job, kids, college, business — these habits fit any schedule.",
  },
  {
    emoji: "🌱",
    title: "You'll still see real progress",
    body: "More energy, better health, better sleep — in just 7 days.",
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
            No big changes needed. Just one tiny habit a day that fits your life exactly as it is right now.
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
