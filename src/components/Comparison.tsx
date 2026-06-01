import { Check, X } from "lucide-react";

const rows = [
  { feature: "Time per day", us: "Max 5 minutes", them: "2+ hours" },
  { feature: "Where it lives", us: "Your WhatsApp", them: "Yet another app to install" },
  { feature: "What it costs you", us: "₹0", them: "₹2,000 – ₹50,000" },
  { feature: "Setup", us: "30 seconds", them: "Onboarding calls + intake forms" },
  { feature: "Habits per day", us: "One small habit", them: "Diet + workout + meditation + journal + ..." },
  { feature: "Progress tracking", us: "5-area score, Day 0 vs Day 7", them: "Vague vibes" },
  { feature: "What you do tonight", us: "Read one short message", them: "Watch 47-min onboarding video" },
  { feature: "If you miss a day", us: "No drama. Continue tomorrow.", them: "Guilt. Restart. Quit by Day 11." },
];

export default function Comparison() {
  return (
    <section className="py-28 lg:py-40 relative bg-section-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-base uppercase tracking-[0.2em] text-accent font-bold mb-6">
            Built different 🚀
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-medium leading-[1.1] text-balance text-foreground mb-8">
            Why This Is Different.
            <br />
          </h2>
          <p className="text-2xl sm:text-3xl text-foreground-muted leading-[1.5]">
            Most challenges fail not because the advice is bad.
            <br />
            They fail because the format is too hard to keep up. So we rebuilt the format. ✨
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block premium-card rounded-2xl overflow-hidden">
          <div className="grid grid-cols-3 gap-px bg-border-subtle">
            <div className="bg-background-elevated p-6 text-sm uppercase tracking-[0.2em] text-foreground-subtle font-semibold">
              The format
            </div>
            <div className="bg-background-elevated p-6 text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold">
                This challenge
              </p>
            </div>
            <div className="bg-background-elevated p-6 text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-foreground-subtle font-semibold">
                Traditional coaching
              </p>
            </div>

            {rows.map((row) => (
              <ContentRow key={row.feature} {...row} />
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-4">
          {rows.map((row) => (
            <div key={row.feature} className="premium-card rounded-xl p-6">
              <p className="text-sm uppercase tracking-[0.15em] text-foreground-subtle mb-4 font-semibold">
                {row.feature}
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm text-accent font-bold uppercase tracking-wider">
                      This:
                    </span>
                    <span className="ml-2 text-foreground text-lg">{row.us}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-foreground-subtle flex-shrink-0 mt-0.5 opacity-50" />
                  <div>
                    <span className="text-sm text-foreground-subtle font-bold uppercase tracking-wider">
                      Traditional:
                    </span>
                    <span className="ml-2 text-foreground-muted text-lg">{row.them}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 pt-14 pb-2">
          <p className="text-base text-foreground-muted text-center max-w-md">Now you know the difference. Choose the one that actually works.</p>
          <a href="#signup" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dim transition-all text-white font-bold text-lg sm:text-xl px-10 py-5 rounded-full shadow-lg hover:-translate-y-0.5">
            I want this — join for free →
          </a>
        </div>
      </div>
    </section>
  );
}

function ContentRow({ feature, us, them }: { feature: string; us: string; them: string }) {
  return (
    <>
      <div className="bg-background-card p-6 text-base font-medium text-foreground-muted">
        {feature}
      </div>
      <div className="bg-background-card p-6 text-center flex items-center justify-center gap-2">
        <Check className="w-5 h-5 text-accent flex-shrink-0" />
        <span className="text-foreground font-medium text-base">{us}</span>
      </div>
      <div className="bg-background-card p-6 text-center flex items-center justify-center gap-2">
        <X className="w-5 h-5 text-foreground-subtle/50 flex-shrink-0" />
        <span className="text-foreground-subtle text-base">{them}</span>
      </div>
    </>
  );
}
