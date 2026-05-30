export default function BrandLine() {
  return (
    <section className="py-16 lg:py-20 relative overflow-hidden mesh-bg bg-section-warm border-y border-border-subtle">
      {/* Floating emojis */}
      <span className="emoji-deco float-1 top-16 left-12 text-5xl hidden lg:block" aria-hidden="true">🎯</span>
      <span className="emoji-deco float-2 bottom-20 right-16 text-5xl hidden lg:block" aria-hidden="true">⚡</span>

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-10">
            <span className="text-base font-bold text-accent uppercase tracking-wider">
              Our 1 rule for every High Performance Habit
            </span>
          </div>

          <div className="space-y-7 sm:space-y-8">
            <div className="group flex items-center justify-center gap-4">
              <span className="text-3xl flex-shrink-0">🎯</span>
              <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                Small enough to <span className="italic font-medium gradient-text">do.</span>
              </p>
            </div>

            <div className="w-16 h-0.5 bg-accent/40 mx-auto rounded-full" />

            <div className="group flex items-center justify-center gap-4">
              <span className="text-3xl flex-shrink-0">✨</span>
              <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                Useful enough to <span className="italic font-medium gradient-text">feel.</span>
              </p>
            </div>

            <div className="w-16 h-0.5 bg-accent/40 mx-auto rounded-full" />

            <div className="group flex items-center justify-center gap-4">
              <span className="text-3xl flex-shrink-0">🔁</span>
              <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                Simple enough to <span className="italic font-medium gradient-text">repeat.</span>
              </p>
            </div>
          </div>

          <p className="mt-20 text-foreground text-2xl sm:text-3xl max-w-2xl mx-auto leading-[1.55] font-serif italic">
            If a high performance habit fails any of these, it doesn&apos;t make it in. 🚪
          </p>

          <p className="mt-6 text-foreground-muted text-xl sm:text-2xl max-w-xl mx-auto">
            That&apos;s the whole filter. No exceptions.
          </p>
        </div>
      </div>
    </section>
  );
}
