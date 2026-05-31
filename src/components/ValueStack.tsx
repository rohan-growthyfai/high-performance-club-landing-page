import { Check, ArrowRight } from "lucide-react";

/**
 * ValueStack — Hormozi "Grand Slam Offer" style.
 * Each item has a defended rupee value.
 * Total stacks to ₹1999. Offer price: FREE.
 */

const items = [
  {
    emoji: "📱",
    title: "7 Daily WhatsApp Habit Messages",
    detail: "One science-backed High Performance Habit delivered to your WhatsApp every morning for 7 days.",
    value: 599,
  },
  {
    emoji: "🌙",
    title: "7 Evening Check-in Messages",
    detail: "A short nudge every evening to lock in the day's habit and keep you on track.",
    value: 199,
  },
  {
    emoji: "📊",
    title: "Day 0 Self-Score Assessment",
    detail: "Rate yourself across Energy, Focus, Relationships, and Calmness before you begin. Your personal baseline.",
    value: 299,
  },
  {
    emoji: "📈",
    title: "Day 7 Progress Comparison Report",
    detail: "Take the same assessment on Day 7 and see exactly what changed. Numbers don't lie.",
    value: 399,
  },
  {
    emoji: "💬",
    title: "Private WhatsApp Community Access",
    detail: "Join others doing the same challenge. Share wins. Stay accountable. Stay motivated.",
    value: 199,
  },
  {
    emoji: "🏆",
    title: "High Performance Lifestyle Starter Certificate",
    detail: "Complete 5 of 7 days and earn your official certificate. Print it. Frame it. Own it.",
    value: 199,
  },
  {
    emoji: "📋",
    title: "7-Habit Reference PDF",
    detail: "All 7 habits documented in one clean PDF you can keep and revisit anytime you need a reset.",
    value: 105,
  },
];

const TOTAL = items.reduce((sum, i) => sum + i.value, 0); // = 1999

export default function ValueStack() {
  return (
    <section id="what-you-get" className="py-20 lg:py-28 relative bg-section-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">
            Everything you get 🎁
          </p>
          <h2 className="font-display text-section-title text-balance text-foreground mb-4">
            Here is everything you will get.
          </h2>
          <p className="text-lg text-foreground-muted max-w-xl mx-auto">
            Every single thing you receive — with its real value — when you join today.
          </p>
        </div>

        {/* Stack card */}
        <div className="premium-card rounded-2xl overflow-hidden border-glow">

          {/* Items */}
          <div className="divide-y divide-border-subtle">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 px-6 py-5 hover:bg-background-elevated/40 transition-colors"
              >
                {/* Check */}
                <div className="w-6 h-6 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-accent" />
                </div>

                {/* Emoji + text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl leading-none">{item.emoji}</span>
                    <p className="font-display font-bold text-foreground text-base leading-snug">
                      {item.title}
                    </p>
                  </div>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                {/* Value */}
                <div className="flex-shrink-0 text-right pl-4">
                  <p className="text-[10px] uppercase tracking-wider text-foreground-subtle font-semibold mb-0.5">Value</p>
                  <p className="font-display font-bold text-foreground text-base tabular-nums">
                    ₹{item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total row */}
          <div className="bg-background-elevated/60 px-6 py-5 flex items-center justify-between border-t-2 border-border">
            <p className="font-display font-bold text-foreground text-lg">
              Total Value
            </p>
            <p className="font-display font-bold text-foreground text-2xl tabular-nums line-through decoration-accent decoration-2">
              ₹{TOTAL}
            </p>
          </div>

          {/* Offer row */}
          <div className="bg-gradient-to-br from-accent/15 via-accent/8 to-white px-6 py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border-t-2 border-accent/30">
            <div>
              <p className="text-sm uppercase tracking-[0.15em] text-accent font-bold mb-1">
                Your price today
              </p>
              <div className="flex items-baseline gap-3">
                <p className="font-display font-bold text-foreground-subtle text-2xl line-through tabular-nums">
                  ₹{TOTAL}
                </p>
                <p className="font-display font-black text-5xl gradient-text tabular-nums leading-none">
                  ₹0
                </p>
              </div>
              <p className="text-sm text-foreground-subtle mt-1.5 italic">
                100% FREE. No credit card. No catch.
              </p>
            </div>

            <a
              href="#signup"
              className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full text-xl sm:text-lg whitespace-nowrap"
            >
              Join completely free today
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Footnote */}
        <p className="text-center mt-6 text-sm text-foreground-subtle italic">
          We offer this free because we&apos;re building something bigger — and this is how we earn your trust first.
        </p>
      </div>
    </section>
  );
}
