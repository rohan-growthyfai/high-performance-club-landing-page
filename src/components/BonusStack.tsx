import { Check, Gift } from "lucide-react";

const items = [
  { emoji: "⚡", title: "Daily Healthy Habits Delivered on WhatsApp", description: "One tiny healthy habit every morning, straight to your WhatsApp. No app, no login." },
  { emoji: "🔥", title: "Daily Accountability System with Check-Ins & Streak Tracking", description: "A quick evening check-in every day to keep you on track and build your streak." },
  { emoji: "📊", title: "Personalized Before → After Health Progress Report", description: "You rate yourself on Day 0 and Day 7. See exactly what changed in black and white." },
  { emoji: "🏆", title: "Official Challenge Completion Certificate", description: "Complete 5 out of 7 days and earn your certificate. Something to be proud of." },
  { emoji: "📚", title: "Lifetime Access to the Healthy Habits Playbook", description: "All 7 habits plus tips, in one simple guide you keep forever." },
  { emoji: "🚀", title: "Exclusive Healthy Habit Vault (100+ Proven Habits)", description: "A bonus collection of 100+ simple healthy habits you can use long after the challenge ends." },
  { emoji: "🤝", title: "Private Community of Like-Minded People Improving Together", description: "Join others doing the challenge. Share progress, get motivated, stay accountable." },
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
            {items.map((item) => (
              <div key={item.title} className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0 text-2xl">
                  {item.emoji}
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2 flex items-center gap-2 text-lg">
                    {item.title}
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  </p>
                  <p className="text-base text-foreground-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
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
            href="https://wa.me/918956146485?text=Hi%21+I+want+to+start+my+Healthy+Habits+Challenge" target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 px-10 py-5 rounded-full text-xl"
          >
            Get All of This Free →
          </a>
        </div>
      </div>
    </section>
  );
}
