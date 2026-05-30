import { Check, Gift, MessageCircle, Moon, FileText, Award, Users, BookOpen } from "lucide-react";

const items = [
  {
    icon: MessageCircle,
    title: "7 daily habit messages",
    description: "One tiny upgrade per day, delivered on WhatsApp every morning.",
  },
  {
    icon: Moon,
    title: "7 evening check-ins",
    description: "A short nudge each night to lock in the day's habit.",
  },
  {
    icon: FileText,
    title: "Day 0 + Day 7 score system",
    description: "Rate yourself in 5 areas — and see exactly what changed.",
  },
  {
    icon: Award,
    title: "Completion certificate",
    description: "Earn the High Performance Lifestyle Starter Certificate (complete 5 of 7).",
  },
  {
    icon: Users,
    title: "Free challenge community",
    description: "Optional WhatsApp space with others doing the same challenge.",
  },
  {
    icon: BookOpen,
    title: "Day 7 habit recap",
    description: "All 7 habits documented in one short PDF you can keep.",
  },
];

export default function BonusStack() {
  return (
    <section className="py-28 lg:py-40 relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-base uppercase tracking-[0.2em] text-accent font-bold mb-6 inline-flex items-center gap-2">
            <Gift className="w-5 h-5" />
            Look what&apos;s in the box 🎁
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-medium leading-[1.1] text-balance text-foreground mb-8">
            Here&apos;s everything you get.
            <br />
            <span className="italic font-light">All free.</span>
          </h2>
          <p className="text-2xl sm:text-3xl text-foreground-muted max-w-2xl mx-auto leading-[1.5]">
            <span className="text-2xl sm:text-3xl text-foreground">
              The Free 7-Day High Performance Lifestyle Challenge.
            </span>
          </p>
        </div>

        <div className="premium-card rounded-2xl p-8 lg:p-12 border-glow">
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2 flex items-center gap-2 text-lg">
                      {item.title}
                      <Check className="w-5 h-5 text-accent" />
                    </p>
                    <p className="text-base text-foreground-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-border-subtle text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-foreground-subtle mb-3 font-semibold">
              Your investment
            </p>
            <p className="font-serif text-7xl sm:text-8xl gradient-text font-medium leading-none">
              ₹0
            </p>
            <p className="text-base text-foreground-subtle mt-4">
              Free. No credit card. No catch.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="#signup"
            className="btn-primary inline-flex items-center gap-2 px-10 py-5 rounded-full text-xl"
          >
            Get All of This Free →
          </a>
        </div>
      </div>
    </section>
  );
}
