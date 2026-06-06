export default function WhatIsChallenge() {
  const areas = [
    {
      emoji: "⚡",
      label: "Energy",
      desc: "Start your day with small actions that help you feel active and refreshed.",
      color: "bg-amber-50 border-amber-200",
      badgeColor: "bg-amber-400 text-white",
      textColor: "text-amber-600",
    },
    {
      emoji: "💚",
      label: "Health",
      desc: "Build simple habits that support your body without gym routines or strict diets.",
      color: "bg-emerald-50 border-emerald-200",
      badgeColor: "bg-emerald-500 text-white",
      textColor: "text-emerald-600",
    },
    {
      emoji: "🎯",
      label: "Focus",
      desc: "Improve your focus and productivity with small daily actions to finish tasks faster.",
      color: "bg-blue-50 border-blue-200",
      badgeColor: "bg-blue-500 text-white",
      textColor: "text-blue-600",
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-section-cream border-t border-border-subtle">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            What exactly is this challenge?
          </h2>
          <p className="text-sm sm:text-lg text-foreground-muted leading-relaxed mb-6">
            The Free 7-Day Habits WhatsApp Challenge is a simple habit-building challenge where you receive one tiny habit every morning on WhatsApp.
          </p>
          <p className="text-base text-foreground-muted font-medium mb-6">
            Each habit is designed to help you improve:
          </p>
        </div>

        {/* 3 Area Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {areas.map((a) => (
            <div
              key={a.label}
              className={`rounded-2xl border-2 ${a.color} p-5 text-center`}
            >
              <div className="text-4xl mb-3">{a.emoji}</div>
              <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 ${a.badgeColor}`}>
                {a.label}
              </span>
              <p className={`text-sm leading-relaxed ${a.textColor} font-medium`}>
                {a.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer line */}
        <p className="text-center text-base text-foreground-muted leading-relaxed mb-8">
          No app. No course login. No long videos.<br />
          Just one small action per day for 7 days.
        </p>

        {/* CTA */}
        <div className="flex justify-center">
          <a
            href="#signup-1"
            className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dim transition-all text-white font-bold text-base sm:text-lg px-8 py-4 rounded-full shadow-lg hover:-translate-y-0.5 w-full sm:w-auto"
          >
            I Want to Join This Challenge →
          </a>
        </div>

      </div>
    </section>
  );
}
