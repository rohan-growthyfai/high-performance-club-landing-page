import { Gauge, Sparkles, GitCompare } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Gauge,
    title: "Take your Day 0 score",
    body: "Rate yourself in 4 areas: Energy, Focus, Relationships, and Calmness. This is your starting point.",
    detail: "Your starting baseline.",
  },
  {
    n: "02",
    icon: Sparkles,
    title: "Get one tiny high-performance habit daily",
    body: "Each morning, one habit lands in your WhatsApp. Read it, do it, reply ✅. Takes 5 minutes.",
    detail: "Reply ✅ when done.",
  },
  {
    n: "03",
    icon: GitCompare,
    title: "Compare Day 0 to Day 7",
    body: "On Day 7, rate yourself again on the same 4 areas. See exactly what shifted in just 7 days.",
    detail: "Visible progress.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 lg:py-40 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-semibold mb-6">
            How it works
          </p>
          <h2 className="font-display text-section-title text-balance text-foreground mb-8">
            3 easy steps.
            <br />
            <span className="italic font-medium">Nothing complicated.</span>
          </h2>
          <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
            No login. No app. No commitment. Just one habit, one day at a time.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.n}
                className="relative premium-card rounded-2xl p-8 group hover-glow"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-4 right-5 font-display text-7xl text-accent/10 leading-none select-none font-bold"
                >
                  {step.n}
                </span>

                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>

                  <h3 className="font-display text-xl text-foreground mb-4 leading-tight font-bold">
                    {step.title}
                  </h3>

                  <p className="text-foreground-muted leading-relaxed text-lg mb-5">
                    {step.body}
                  </p>

                  <p className="text-sm text-accent uppercase tracking-wider font-bold">
                    {step.detail}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-border-subtle flex items-center justify-between">
                  <span className="text-sm text-foreground-subtle">
                    Step {i + 1} of {steps.length}
                  </span>
                  <div className="flex gap-1">
                    {Array.from({ length: steps.length }).map((_, j) => (
                      <span
                        key={j}
                        className={`w-1.5 h-1.5 rounded-full ${j <= i ? "bg-accent" : "bg-border"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-foreground-muted italic max-w-xl mx-auto text-xl leading-relaxed">
            Total commitment per day:{" "}
            <span className="text-foreground not-italic font-bold">only 5 minutes</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
