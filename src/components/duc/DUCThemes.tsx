const themes = [
  { icon: "⚡", name: "Energy Reset", desc: "Tiny healthy habits that boost your energy. Feel more active and energized.", color: "#f59e0b", current: true },
  { icon: "💪", name: "Health Reset", desc: "Better health habits without gym routines or strict diets.", color: "#10b981" },
  { icon: "🎯", name: "Focus Reset", desc: "Live calmer, clearer, more productive days.", color: "#60a5fa" },
  { icon: "🧘", name: "Calmness Reset", desc: "Reduce mental clutter. Feel more balanced daily.", color: "#a78bfa" },
  { icon: "🔥", name: "Discipline Reset", desc: "Tiny healthy habits to stay consistent. No motivation required.", color: "#f87171" },
  { icon: "🌙", name: "Sleep Reset", desc: "Habits for better and deeper sleep. Better recovery. Better mornings.", color: "#818cf8" },
];

export default function DUCThemes() {
  return (
    <section className="py-20 lg:py-28 bg-section-cream border-t border-border-subtle">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#25d366] mb-6">Monthly themes</p>
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:justify-between">
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 800, color: "#18181b" }}>
              One month.<br />
              <span style={{ color: "#71717a", fontStyle: "italic", fontWeight: 400 }}>One focus.</span>
            </h2>
            <p className="text-foreground-muted text-sm max-w-xs leading-relaxed">No random tips. Every month follows one focused theme so your habits compound.</p>
          </div>
        </div>

        {/* First month highlight */}
        <div className="mb-8 flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4">
          <span className="text-2xl">⚡</span>
          <div>
            <p className="text-foreground font-bold text-base">Your first month starts with: Energy Reset ⚡</p>
            <p className="text-foreground-muted text-sm mt-0.5">30 tiny healthy habits designed to help you feel more active and energized every day.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map(theme => (
            <div key={theme.name} className={`bg-white border rounded-2xl p-6 hover:shadow-md transition-shadow group relative ${theme.current ? "border-amber-300 shadow-sm" : "border-border-subtle"}`}>
              {theme.current && (
                <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 border border-amber-200 rounded-full px-2 py-0.5">Month 1</span>
              )}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{theme.icon}</span>
                {!theme.current && <span className="text-[10px] font-semibold text-foreground-subtle uppercase tracking-wider">Coming next</span>}
              </div>
              <p className="font-bold text-foreground text-sm mb-1.5">{theme.name}</p>
              <p className="text-foreground-muted text-xs leading-relaxed">{theme.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-border-subtle">
            <span className="text-sm text-foreground-muted">One month. One theme. Thirty tiny healthy habits.</span>
          </div>
          <div className="block">
            <a href="#duc-join" className="btn-primary inline-flex items-center gap-2 px-10 py-5 rounded-full text-lg font-bold">
              Start with Energy Reset →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
