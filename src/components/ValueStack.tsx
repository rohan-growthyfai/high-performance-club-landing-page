import { ArrowRight } from "lucide-react";

const items = [
  {
    emoji: "📱",
    title: "7 Daily WhatsApp Habit Messages",
    detail: "1 tiny science-backed habit delivered to your WhatsApp every morning for 7 days.",
  },
  {
    emoji: "⏰",
    title: "Flexible Timings",
    detail: "All habits designed for busy schedules — takes <5 minutes to do.",
  },
  {
    emoji: "🌙",
    title: "Evening Check-in Messages",
    detail: "A short reminder every evening to keep you on track.",
  },
  {
    emoji: "💬",
    title: "Private WhatsApp Community",
    detail: "Join others doing the same challenge. Share wins. Stay accountable.",
  },
  {
    emoji: "📊",
    title: "Personalized 7 Days Progress Report",
    detail: "Get fully personalized report on how much you have improved on Day 7.",
  },
  {
    emoji: "🏆",
    title: "Completion Certificate",
    detail: "Complete the challenge and earn your official High Performance Lifestyle certificate.",
  },
  {
    emoji: "📈",
    title: "Day 7 Progress Report",
    detail: "See exactly what changed from Day 1 to Day 7. Numbers don't lie.",
  },
  {
    emoji: "📋",
    title: "7-Habit Reference PDF",
    detail: "All 7 habits in one clean PDF you can keep and revisit anytime.",
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
            Everything You Get In This Challenge
          </h2>
          <p className="text-lg text-foreground-muted max-w-xl mx-auto">
            Everything you receive when you join today — completely free.
          </p>
        </div>

        {/* 2-column benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-border-subtle hover:shadow-sm transition-shadow"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-accent/8 border border-accent/15 flex items-center justify-center flex-shrink-0 text-2xl">
                {item.emoji}
              </div>
              {/* Text */}
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
          <div className="bg-gradient-to-br from-accent/15 via-accent/8 to-white px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.15em] text-accent font-bold mb-2">
                You pay
              </p>
              <p className="font-display font-black text-5xl sm:text-6xl gradient-text tabular-nums leading-none">
                ₹0
              </p>
              <p className="text-sm text-foreground-subtle mt-2 italic">
                100% FREE. No credit card. No catch.
              </p>
            </div>
            <a
              href="#signup"
              className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-4 sm:px-10 sm:py-5 rounded-full text-base sm:text-xl w-full sm:w-auto"
            >
              Join Completely FREE Today
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-foreground-subtle italic">
          We offer this free because we&apos;re building something bigger — and this is how we earn your trust first.
        </p>

        <div className="flex flex-col items-center gap-3 pt-14 pb-2">
          <p className="text-base text-foreground-muted text-center max-w-md">Everything above is yours. For free. Right now.</p>
          <a href="#signup" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dim transition-all text-white font-bold text-lg sm:text-xl px-10 py-5 rounded-full shadow-lg hover:-translate-y-0.5">
            Claim everything — join for free →
          </a>
        </div>
      </div>
    </section>
  );
}
