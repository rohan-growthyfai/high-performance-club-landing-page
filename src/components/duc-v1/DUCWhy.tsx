const problems = [
  "They forget",
  "They try to do too much",
  "They lose momentum",
  "They don't track progress",
  "They have no accountability",
];

const solutions = [
  { icon: "📩", text: "One tiny healthy habit." },
  { icon: "⏰", text: "One daily reminder." },
  { icon: "✅", text: "One DONE reply." },
  { icon: "📊", text: "One weekly scorecard." },
];

export default function DUCWhy() {
  return (
    <section className="py-20 lg:py-28 relative bg-section-cream overflow-hidden">
      <span className="emoji-deco float-1 top-20 right-8 text-4xl hidden lg:block" aria-hidden="true">💡</span>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">The real problem</p>
          <h2 className="font-display text-section-title text-foreground mb-4 text-balance">
            Most people don&apos;t fail because they don&apos;t know what to do
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto leading-relaxed">
            Most people already know they should sleep better, move more, reduce distractions, drink more water, and stay consistent.
          </p>
          <p className="text-lg text-foreground font-medium mt-3">The real problem is not knowledge.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 mb-14">
          {/* Problems */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-7">
            <p className="font-bold text-foreground text-lg mb-5">The real problem is:</p>
            <ul className="space-y-3">
              {problems.map(p => (
                <li key={p} className="flex items-center gap-3 text-base text-foreground">
                  <span className="text-red-500 font-bold text-xl flex-shrink-0">❌</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className="bg-green-50 border border-green-100 rounded-2xl p-7">
            <p className="font-bold text-foreground text-lg mb-5">That&apos;s why Daily Upgrade Club keeps everything simple:</p>
            <ul className="space-y-4">
              {solutions.map(s => (
                <li key={s.text} className="flex items-center gap-3 text-base text-foreground font-medium">
                  <span className="text-2xl flex-shrink-0">{s.icon}</span>
                  {s.text}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-foreground-muted italic">No overthinking required.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
