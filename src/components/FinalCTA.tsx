import { ArrowRight, CheckCircle2 } from "lucide-react";

const points = [
  "📱 Confirmation message within 2 minutes",
  "⏱️ Less than 5 minutes/day",
  "📊 Day 1 → Day 7 progress check",
  "🏆 Completion certificate if you finish 5/7 days",
];

export default function FinalCTA() {
  return (
    <section className="py-28 lg:py-40 relative">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-background-elevated to-white p-10 sm:p-16 lg:p-24 border border-accent/30 border-glow">
          <div
            aria-hidden="true"
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-32 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative text-center">
            <p className="text-base uppercase tracking-[0.2em] text-accent font-bold mb-6">
              Time to go 🚀
            </p>
            <h2 className="font-serif text-[1.6rem] sm:text-5xl lg:text-7xl font-medium leading-[1.1] mb-8 text-balance text-foreground">
              Ready to try the Free 7-Day WhatsApp Challenge?
            </h2>

            <p className="text-foreground-muted text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              Sign up free and get a tiny starter habit right away. Your real Day 1 starts tomorrow morning.
            </p>

            <div className="max-w-md mx-auto mb-12">
              <ul className="space-y-3">
                {points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 text-left text-foreground-muted text-base sm:text-lg"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#signup-1"
              className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 sm:px-10 sm:py-5 rounded-full text-base sm:text-xl group w-full sm:w-auto"
            >
              Join Free on WhatsApp
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
