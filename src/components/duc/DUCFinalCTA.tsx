import { ArrowRight } from "lucide-react";

export default function DUCFinalCTA() {
  return (
    <section className="py-20 lg:py-28 relative bg-section-cream overflow-hidden">
      <span className="emoji-deco float-1 top-10 left-8 text-4xl hidden lg:block" aria-hidden="true">🔥</span>
      <span className="emoji-deco float-2 bottom-10 right-8 text-4xl hidden lg:block" aria-hidden="true">⚡</span>

      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">Start today</p>
        <h2 className="font-display text-section-title text-foreground mb-6 text-balance">
          Start Building Better Habits for ₹99/month
        </h2>
        <p className="text-lg text-foreground-muted mb-6 max-w-xl mx-auto">
          You don&apos;t need another complicated app.
          You need one small habit daily, a simple way to track it, and a system that keeps you consistent.
        </p>

        <div className="bg-white border border-border-subtle rounded-2xl p-6 mb-8 text-left max-w-sm mx-auto">
          {["Daily habits.","DONE tracking.","Weekly scorecards.","Monthly themes.","Habit guides.","Private accountability.","All on WhatsApp."].map(line => (
            <p key={line} className="text-base font-medium text-foreground py-1.5 border-b border-border-subtle last:border-b-0">{line}</p>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="font-display font-black text-6xl gradient-text tabular-nums">₹99<span className="text-2xl font-sans font-medium text-foreground-muted">/month</span></p>
          <a
            href="https://rzp.io/l/daily-upgrade-club"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full text-xl font-bold mt-2 group"
          >
            Join Daily Upgrade Club
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-sm text-foreground-subtle">Cancel anytime • No app needed • Starts instantly</p>
        </div>
      </div>
    </section>
  );
}
