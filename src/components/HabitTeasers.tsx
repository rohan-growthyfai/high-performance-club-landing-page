const habits = [
  {
    emoji: "📵",
    day: "Day 1",
    title: "Phone Parking",
    teaser:
      "Put your phone in another room. Do one task without it nearby. Watch how often your hand reaches for nothing. 😅",
    area: "Phone Control",
  },
  {
    emoji: "🧍",
    day: "Day 2",
    title: "Posture Switch",
    teaser:
      "Stand or sit like a confident version of you. Just 60 seconds. Your brain literally responds to your body — try it.",
    area: "Body Lightness",
  },
  {
    emoji: "👀",
    day: "Day 3",
    title: "Eye Vacation",
    teaser:
      "Look away from your screen. Stare at something far away for 20 seconds. Your eyes will say thank you. ✨",
    area: "Body Lightness",
  },
  {
    emoji: "🫁",
    day: "Day 4",
    title: "The Double Breath",
    teaser:
      "A weird breathing trick that calms you down faster than meditation. 30 seconds. You&apos;ll use it forever after.",
    area: "Mind Space",
  },
  {
    emoji: "🎯",
    day: "Day 5",
    title: "One-Tab Start",
    teaser:
      "Close every tab. Open just one. Work on one thing for 7 minutes. Your laptop should not look like a Mumbai local at peak hour. 🚉",
    area: "Daily Control",
  },
  {
    emoji: "🧠",
    day: "Day 6",
    title: "Name the Noise",
    teaser:
      "Write one sentence: &quot;I feel ___ because ___&quot;. That&apos;s it. Mental chaos becomes one clear line.",
    area: "Mind Space",
  },
  {
    emoji: "🗒️",
    day: "Day 7",
    title: "Brain Dump",
    teaser:
      "5 minutes before bed. Paper, not phone. Empty your head. Sleep better tonight. Magic. 🪄",
    area: "Mind Space",
  },
];

export default function HabitTeasers() {
  return (
    <section className="py-28 lg:py-40 relative bg-section-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-base uppercase tracking-[0.2em] text-accent font-bold mb-6">
            What you&apos;ll actually try 🧪
          </p>
          <h2 className="font-display text-section-title text-balance text-foreground mb-8">
            7 tiny <span className="gradient-text">high performance habits</span>.
            <br />
            <span className="italic font-light">Each under 5 minutes.</span>
          </h2>
          <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
            These aren&apos;t big life changes. They&apos;re tiny switches.
            <br />
            And sometimes one switch is all you need to feel different. 🔌
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {habits.map((habit, i) => {
            const span =
              i === 0
                ? "lg:row-span-2"
                : i === 3
                  ? "lg:col-span-2"
                  : "";
            const tilt = i % 3 === 0 ? "" : i % 3 === 1 ? "tilt-left" : "tilt-right";
            return (
              <div
                key={habit.title}
                className={`premium-card rounded-2xl p-8 hover-glow flex flex-col ${span} ${tilt}`}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-6xl">{habit.emoji}</span>
                  <span className="level-badge">
                    {habit.day}
                  </span>
                </div>
                <h3 className="font-serif text-3xl text-foreground mb-4 leading-tight font-medium">
                  {habit.title}
                </h3>
                <p className="text-foreground-muted leading-[1.55] text-xl flex-1">
                  {habit.teaser}
                </p>
                <p className="text-sm text-accent mt-5 pt-5 border-t border-border-subtle uppercase tracking-wider font-bold">
                  ⚡ Boosts: {habit.area}
                </p>
              </div>
            );
          })}

          {/* CTA tile */}
          <div className="rounded-2xl p-8 flex flex-col justify-between bg-gradient-to-br from-accent/15 via-accent/8 to-transparent border-2 border-dashed border-accent/40 hover-glow lg:col-span-2">
            <div>
              <p className="text-base uppercase tracking-[0.15em] text-accent mb-5 font-bold">
                🚀 Let&apos;s gooo
              </p>
              <h3 className="font-serif text-3xl text-foreground mb-4 leading-tight font-medium">
                All 7 high performance habits, free.
                <br />
                Day 1 lands in your WhatsApp tonight.
              </h3>
              <p className="text-foreground-muted text-xl leading-relaxed">
                Takes 30 seconds to sign up. First message in 2 mins.
              </p>
            </div>
            <a
              href="https://wa.me/918956146485?text=Hi%21+I+want+to+start+my+Healthy+Habits+Challenge" target="_blank" rel="noopener noreferrer"
              className="mt-8 btn-primary inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full text-xl self-start"
            >
              Join for <span className="font-extrabold">FREE</span> →
            </a>
          </div>
        </div>

        {/* Why these work */}
        <div className="max-w-3xl mx-auto mt-24 text-center relative">
          <span className="emoji-deco float-1 -top-12 -left-8 text-5xl hidden lg:block" aria-hidden="true">💡</span>

          <p className="text-base uppercase tracking-[0.2em] text-accent font-bold mb-6">
            The secret 🤫
          </p>
          <p className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-[1.25]">
            Big habits = scary.
            <br />
            Tiny high performance habits = <span className="italic gradient-text">actually done.</span>
          </p>
          <p className="text-foreground-muted mt-8 text-2xl leading-[1.5]">
            That&apos;s the whole idea. Each one is so small that you&apos;ll
            think &ldquo;wait, that&apos;s it?&rdquo; — and then do it. 🎯
          </p>
        </div>
      </div>
    </section>
  );
}
