export default function WhySevenDays() {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
            The format
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-medium leading-tight text-balance">
            Why 7 days?
            <span className="text-foreground-subtle font-light"> Not 21. Not 30.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
          <div className="premium-card rounded-2xl p-8 text-center">
            <div className="font-serif text-5xl text-accent font-medium mb-3">7</div>
            <p className="font-medium text-foreground mb-2">Short enough</p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              30-day challenges have a quit problem. Most drop off by Day 11.
              7 days is short enough that you&apos;ll actually finish.
            </p>
          </div>

          <div className="premium-card rounded-2xl p-8 text-center">
            <div className="font-serif text-5xl text-accent font-medium mb-3">4</div>
            <p className="font-medium text-foreground mb-2">Long enough</p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              By Day 4, you&apos;ll notice something. Better energy at 3pm.
              Calmer before meetings. Easier sleep at 11pm.
            </p>
          </div>

          <div className="premium-card rounded-2xl p-8 text-center">
            <div className="font-serif text-5xl text-accent font-medium mb-3">1</div>
            <p className="font-medium text-foreground mb-2">Specific enough</p>
            <p className="text-sm text-foreground-muted leading-relaxed">
              By Day 7, you&apos;ll know exactly which of the 7 habits are
              worth keeping forever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
