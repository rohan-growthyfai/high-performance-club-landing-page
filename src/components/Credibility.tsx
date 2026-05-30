import { MessageSquare, Smartphone, Eye, Calendar } from "lucide-react";

const pillars = [
  {
    icon: MessageSquare,
    title: "Delivered on WhatsApp",
    body:
      "Where you already spend your day. No new app to install. No portal to log into. No password to forget.",
  },
  {
    icon: Smartphone,
    title: "Tiny + specific",
    body:
      "Each habit is small enough to do without thinking, specific enough to actually try, and useful enough to feel.",
  },
  {
    icon: Eye,
    title: "Visible progress",
    body:
      "Day 0 and Day 7 score in 5 areas. Not vibes — actual numbers you can compare.",
  },
  {
    icon: Calendar,
    title: "7 days, not 90",
    body:
      "Long enough to notice a shift. Short enough that your brain doesn't panic and quit on Day 3.",
  },
];

export default function Credibility() {
  return (
    <section className="py-28 lg:py-40 relative bg-section-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-base uppercase tracking-[0.2em] text-accent font-bold mb-8">
            Why this works 🧠
          </p>
          <p className="font-serif text-3xl sm:text-4xl lg:text-6xl text-foreground leading-[1.15] max-w-4xl mx-auto text-balance">
            You don&apos;t need more info.
            <br />
            <span className="italic font-light gradient-text">You need a daily nudge,</span>
            <br />
            <span className="italic font-light">an easy action, and a visible win.</span>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="premium-card rounded-2xl p-7 flex items-start gap-5 hover-glow"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2 text-xl">
                    {p.title}
                  </h3>
                  <p className="text-base text-foreground-muted leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center mt-16 text-base text-foreground-subtle italic max-w-2xl mx-auto leading-relaxed">
          This is a lifestyle habit and self-awareness challenge — not medical advice,
          therapy, diagnosis, treatment, or financial counselling. If you need any of
          those, please consult a qualified professional.
        </p>
      </div>
    </section>
  );
}
