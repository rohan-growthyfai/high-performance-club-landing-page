export default function DUCScorecard() {
  return (
    <section className="py-20 lg:py-28 relative bg-section-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">Weekly accountability</p>
        <h2 className="font-display text-section-title text-foreground mb-6 text-balance">
          Your Weekly Scorecard Keeps You Accountable
        </h2>
        <p className="text-lg text-foreground-muted mb-10 max-w-xl mx-auto">
          Every week, you&apos;ll receive a simple progress report so you know exactly how consistent you were.
        </p>

        {/* Scorecard mockup */}
        <div className="max-w-sm mx-auto mb-10">
          <div className="bg-white border-2 border-accent/20 rounded-2xl p-6 shadow-lg text-left">
            <p className="text-accent font-bold text-base mb-5 flex items-center gap-2">
              <span>📊</span> Your Weekly Progress Report
            </p>
            <div className="space-y-3">
              {[
                { label: "This week", value: "5/7 habits completed", bar: 71 },
                { label: "Monthly progress", value: "18/30 habits", bar: 60 },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground-muted">{item.label}</span>
                    <span className="font-bold text-foreground">{item.value}</span>
                  </div>
                  <div className="h-2 bg-border-subtle rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${item.bar}%` }} />
                  </div>
                </div>
              ))}
              <div className="flex justify-between text-sm pt-1">
                <span className="text-foreground-muted">Current streak</span>
                <span className="font-bold text-foreground">3 days 🔥</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground-muted">Level</span>
                <span className="font-bold text-accent">Strong Week 💪</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground-muted">Next target</span>
                <span className="font-bold text-foreground">6/7 habits next week</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-base font-semibold text-foreground mb-2">What gets tracked gets improved.</p>
        <p className="text-sm text-foreground-muted italic">Simple. Slightly annoying. Very effective.</p>
      </div>
    </section>
  );
}
