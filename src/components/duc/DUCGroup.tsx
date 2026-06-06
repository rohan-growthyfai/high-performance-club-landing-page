export default function DUCGroup() {
  const included = ["weekly check-ins", "habit wins from members", "progress reminders", "simple accountability", "positive community support"];
  const rules = ["No spam.", "No promotions.", "No random forwards.", "No unnecessary noise."];

  return (
    <section className="py-20 lg:py-28 relative bg-section-cream">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">Community</p>
          <h2 className="font-display text-section-title text-foreground mb-4 text-balance">
            Stay Consistent With a Private Accountability Group
          </h2>
          <p className="text-lg text-foreground-muted max-w-xl mx-auto">
            Habits become easier when you&apos;re not doing them alone.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-white border border-border-subtle rounded-2xl p-7">
            <p className="font-bold text-foreground text-base mb-5">Inside the private WhatsApp group:</p>
            <ul className="space-y-3">
              {included.map(i => (
                <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="text-green-500 font-bold text-lg flex-shrink-0">✅</span>
                  {i}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-border-subtle rounded-2xl p-7">
            <p className="font-bold text-foreground text-base mb-5">Group rules:</p>
            <ul className="space-y-3">
              {rules.map(r => (
                <li key={r} className="flex items-center gap-3 text-sm text-foreground-muted">
                  <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-foreground-muted italic border-t border-border-subtle pt-4">
              Just people trying to become 1% better every day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
