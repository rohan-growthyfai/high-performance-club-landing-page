const guides = [
  "📘 Energy Reset Habit Guide",
  "📘 Focus Reset Habit Guide",
  "📘 Health Reset Habit Guide",
  "📘 Calmness Reset Habit Guide",
  "📘 Sleep Reset Habit Guide",
];

export default function DUCVault() {
  return (
    <section className="py-20 lg:py-28 relative bg-section-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">Your habit library</p>
        <h2 className="font-display text-section-title text-foreground mb-6 text-balance">
          Build Your Personal Habit Library
        </h2>
        <p className="text-lg text-foreground-muted mb-4 max-w-xl mx-auto">
          Every month, you&apos;ll receive a clean PDF guide with all 30 habits from that month. Save it, revisit it, and reuse it anytime.
        </p>
        <p className="text-base text-foreground mb-10">
          You&apos;ll also get access to the <strong>Growing Habit Vault</strong>, where your guides, calendars, and resources are stored.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {guides.map(g => (
            <div key={g} className="flex items-center gap-3 p-4 bg-white border border-border-subtle rounded-xl hover:shadow-sm transition-shadow">
              <span className="text-xl flex-shrink-0">{g.split(" ")[0]}</span>
              <span className="text-sm font-medium text-foreground">{g.substring(g.indexOf(" ") + 1)}</span>
            </div>
          ))}
          <div className="flex items-center gap-3 p-4 bg-accent/5 border border-accent/20 rounded-xl">
            <span className="text-xl flex-shrink-0">📚</span>
            <span className="text-sm font-medium text-accent">+ More every month</span>
          </div>
        </div>
      </div>
    </section>
  );
}
