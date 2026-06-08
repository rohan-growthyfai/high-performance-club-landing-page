export default function WhatIsChallenge() {
  const areas = [
    {
      emoji: "⚡",
      label: "Energy",
      desc: "Start your day with small steps that help you feel awake and fresh.",
      color: "bg-amber-50 border-amber-200",
      badgeColor: "bg-amber-400 text-white",
      textColor: "text-amber-600",
    },
    {
      emoji: "💚",
      label: "Health",
      desc: "Build simple habits that help your body — no gym and no hard diets.",
      color: "bg-emerald-50 border-emerald-200",
      badgeColor: "bg-emerald-500 text-white",
      textColor: "text-emerald-600",
    },
    {
      emoji: "🎯",
      label: "Focus",
      desc: "Get more done with small daily steps, so you finish your work faster.",
      color: "bg-blue-50 border-blue-200",
      badgeColor: "bg-blue-500 text-white",
      textColor: "text-blue-600",
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-section-cream border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Two-column: text LEFT, 3 stacked cards RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT — copy + CTA (left-aligned) */}
          <div className="text-left">
            <h2 className="font-display text-section-title text-foreground mb-5">
              What exactly is this challenge?
            </h2>
            <p className="text-sm sm:text-lg text-foreground-muted leading-relaxed mb-5">
              It is a free 7-day challenge. Every morning, we send you one tiny habit on WhatsApp.
            </p>
            <p className="text-base text-foreground-muted font-medium mb-5">
              Each habit helps you get better at:
            </p>
            <p className="text-base text-foreground-muted leading-relaxed mb-8">
              No app. No course login. No long videos.<br className="hidden sm:block" />
              Just one small action per day for 7 days.
            </p>
            <div className="flex justify-start">
              <a
                href="#signup-1"
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base sm:text-lg font-bold w-full sm:w-auto"
              >
                I Want to Join This Challenge →
              </a>
            </div>
          </div>

          {/* RIGHT — 3 Area Cards stacked vertically */}
          <div className="flex flex-col gap-5">
            {areas.map((a) => (
              <div
                key={a.label}
                className={`rounded-2xl border-2 ${a.color} p-5 flex items-start gap-4 text-left`}
              >
                <div className="text-4xl shrink-0 leading-none">{a.emoji}</div>
                <div>
                  <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 ${a.badgeColor}`}>
                    {a.label}
                  </span>
                  <p className={`text-sm leading-relaxed ${a.textColor} font-medium`}>
                    {a.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
