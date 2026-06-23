import { ArrowRight } from "lucide-react";

const items = [
  {
    emoji: "⚡",
    title: "Daily Healthy Habits Delivered on WhatsApp",
    detail: "One tiny healthy habit every morning, straight to your WhatsApp. No app, no login.",
  },
  {
    emoji: "🔥",
    title: "Daily Accountability System with Check-Ins & Streak Tracking",
    detail: "A quick evening check-in every day to keep you on track and build your streak.",
  },
  {
    emoji: "📊",
    title: "Personalized Before → After Health Progress Report",
    detail: "You rate yourself on Day 0 and Day 7. See exactly what changed in black and white.",
  },
  {
    emoji: "🏆",
    title: "Official Challenge Completion Certificate",
    detail: "Complete 5 out of 7 days and earn your certificate. Something to be proud of.",
  },
  {
    emoji: "📚",
    title: "Lifetime Access to the Healthy Habits Playbook",
    detail: "All 7 habits plus tips, in one simple guide you keep forever.",
  },
  {
    emoji: "🚀",
    title: "Exclusive Healthy Habit Vault (100+ Proven Habits)",
    detail: "A bonus collection of 100+ simple healthy habits you can use long after the challenge ends.",
  },
  {
    emoji: "🤝",
    title: "Private Community of Like-Minded People Improving Together",
    detail: "Join others doing the challenge. Share progress, get motivated, stay accountable.",
  },
];

export default function ValueStack() {
  return (
    <section id="what-you-get" className="py-20 lg:py-28 relative bg-section-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">
            What you receive 🎁
          </p>
          <h2 className="font-display text-section-title text-balance text-foreground mb-4">
            Everything You Get for FREE
          </h2>
          <p className="text-lg text-foreground-muted max-w-xl mx-auto">
            When you join today, you&apos;ll receive everything at ₹0.
          </p>
        </div>

        {/* 2-column benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {items.map((item, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 p-5 rounded-2xl bg-white border border-border-subtle hover:shadow-sm transition-shadow${i === items.length - 1 && items.length % 2 !== 0 ? " sm:col-start-1 sm:col-span-2 sm:max-w-sm sm:mx-auto sm:w-full" : ""}`}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/8 border border-accent/15 flex items-center justify-center flex-shrink-0 text-2xl">
                {item.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-base mb-1 leading-snug">
                  {item.title}
                </p>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* You pay ₹0 + CTA */}
        <div className="premium-card rounded-2xl overflow-hidden border-glow">
          <div className="bg-gradient-to-br from-accent/15 via-accent/8 to-white px-6 py-8 flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-6 text-center sm:text-left">
            <div>
              <p className="text-sm uppercase tracking-[0.15em] text-accent font-bold mb-2">
                You pay
              </p>
              <p className="font-display font-black text-5xl sm:text-6xl gradient-text tabular-nums leading-none">
                ₹0
              </p>
              <p className="text-sm text-foreground-subtle mt-2 italic">
                100% FREE. No credit card.
              </p>
            </div>
            <a
              href="https://wa.me/918956146485?text=Hi%21+I+want+to+start+my+Healthy+Habits+Challenge" target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-4 sm:px-10 sm:py-5 rounded-full text-base sm:text-xl w-full sm:w-auto"
            >
              Join Completely FREE Today
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-foreground-subtle italic">
          Our goal is to help 1 million people live healthier, happier lives — one habit at a time.
        </p>

      </div>
    </section>
  );
}
