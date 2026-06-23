/* eslint-disable @next/next/no-img-element */
export default function DUCFounder() {
  return (
    <section className="py-20 lg:py-28 relative bg-section-cream">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">From the founder</p>
          <h2 className="font-display text-section-title text-foreground mb-4 text-balance">
            Why I Built Daily Upgrade Club
          </h2>
        </div>

        <div className="bg-white border border-border-subtle rounded-2xl p-8 shadow-sm">
          <div className="space-y-4 text-base text-foreground leading-relaxed mb-6">
            <p>Most people don&apos;t fail because they lack information.</p>
            <p>They fail because they forget, overthink, or try to change everything at once.</p>
            <p>Daily Upgrade Club is built for real life.</p>
            <div className="bg-section-cream rounded-xl p-5 space-y-2 border border-border-subtle text-foreground-muted">
              <p>One tiny healthy habit.</p>
              <p>One daily reminder.</p>
              <p>One DONE reply.</p>
              <p>One weekly scorecard.</p>
              <p>All on WhatsApp.</p>
            </div>
            <p>No pressure. No perfection. Just daily momentum.</p>
          </div>

          <div className="flex items-center gap-4 pt-5 border-t border-border-subtle">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent/20 flex-shrink-0">
              <img src="/hpc-logo.png" alt="Rohan" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-bold text-foreground">— Rohan</p>
              <p className="text-sm text-foreground-muted">High Performance Club</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
