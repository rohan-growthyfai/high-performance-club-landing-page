import { ArrowRight, CheckCircle2 } from "lucide-react";

const points = [
  "📱 First WhatsApp message in 2 minutes",
  "⏱️ 5-10 minutes a day, for 7 days",
  "📈 See your Day 0 → Day 7 progress",
  "🏆 Win your certificate if you finish 5/7",
  "💸 Free forever. Takes 30 seconds to join.",
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
            <h2 className="font-serif text-5xl sm:text-6xl lg:text-8xl font-medium leading-[1.05] mb-10 text-balance text-foreground">
              Ready to try
              <br />
              7 tiny habits?
            </h2>

            <p className="text-foreground-muted text-2xl sm:text-3xl max-w-2xl mx-auto mb-12 leading-[1.5]">
              Join the FREE 7-Day Challenge.
              <br />
              Your first habit lands in your WhatsApp in 2 minutes. ⚡
            </p>

            <div className="max-w-md mx-auto mb-12">
              <ul className="space-y-4">
                {points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 text-left text-foreground-muted text-xl"
                  >
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#signup"
              className="btn-primary inline-flex items-center gap-2 px-10 py-5 rounded-full text-xl group"
            >
              Join for <span className="font-extrabold">FREE</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>

            <p className="mt-7 text-base text-foreground-subtle">
              No credit card · No phone calls · Stop anytime with one reply
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
