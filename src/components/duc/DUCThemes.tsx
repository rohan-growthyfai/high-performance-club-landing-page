const themes = [
  { icon: "⚡", name: "Energy Reset", desc: "Feel more active and charged. Small habits that fight fatigue.", color: "#f59e0b" },
  { icon: "💪", name: "Health Reset", desc: "Better health habits without gym routines or strict diets.", color: "#10b981" },
  { icon: "🎯", name: "Focus Reset", desc: "Calmer, clearer, more productive days.", color: "#60a5fa" },
  { icon: "🧘", name: "Calmness Reset", desc: "Reduce mental clutter. Feel more balanced daily.", color: "#a78bfa" },
  { icon: "🔥", name: "Discipline Reset", desc: "Show up daily. No motivation required.", color: "#f87171" },
  { icon: "🌙", name: "Sleep Reset", desc: "Better nights. Better recovery. Better mornings.", color: "#818cf8" },
];

export default function DUCThemes() {
  return (
    <section className="py-24 lg:py-32 bg-section-cream border-t border-border-subtle">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        <div className="mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#25d366] mb-6">Monthly themes</p>
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:justify-between">
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 800, color: "#18181b" }}>
              One month.<br />
              <span style={{ color: "#a1a1aa", fontStyle: "italic", fontWeight: 400 }}>One focus.</span>
            </h2>
            <p className="text-[#71717a] text-sm max-w-xs leading-relaxed">No random tips. Every month follows one focused theme so your habits compound.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 rounded-3xl overflow-hidden">
          {themes.map(theme => (
            <div key={theme.name} className="bg-section-cream p-7 hover:bg-white transition-colors group">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{theme.icon}</span>
                <div className="h-px flex-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: theme.color }} />
              </div>
              <p className="font-bold text-white text-sm mb-2">{theme.name}</p>
              <p className="text-[#71717a] text-xs leading-relaxed">{theme.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-border">
            <span className="text-sm text-[#52525b]">Thirty habits. One theme. One month.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
