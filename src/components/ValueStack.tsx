import { ArrowRight } from "lucide-react";

const items = [
  {
    emoji: "📱",
    title: "7 Daily WhatsApp Habit Messages",
    detail: "1 tiny science-backed habit delivered to your WhatsApp every morning for 7 days.",
  },
  {
    emoji: "⏱️",
    title: "Less Than 5 Minutes a Day",
    detail: "Simple habits designed for busy schedules.",
  },
  {
    emoji: "🌙",
    title: "Evening Check-ins",
    detail: "A short reminder to help you stay consistent.",
  },
  {
    emoji: "💬",
    title: "Private WhatsApp Community",
    detail: "Join others doing the same challenge. Share wins. Stay accountable.",
  },
  {
    emoji: "📊",
    title: "Personalized 7 Days Progress Report",
    detail: "Compare your Energy, Health, and Focus before and after the challenge.",
  },
  {
    emoji: "🏆",
    title: "Completion Certificate",
    detail: "Complete the challenge and receive your 7-Day Habits Starter Certificate.",
  },
  {
    emoji: "📄",
    title: "7-Habit Reference PDF",
    detail: "Keep all 7 habits with you even after the challenge ends.",
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
              href="#signup-1"
              className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-4 sm:px-10 sm:py-5 rounded-full text-base sm:text-xl w-full sm:w-auto"
            >
              Join Completely FREE Today
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-foreground-subtle italic">
          We are on a mission to help 1 million people live healthier, more energetic lives — one habit at a time.
        </p>

      </div>
    </section>
  );
}
