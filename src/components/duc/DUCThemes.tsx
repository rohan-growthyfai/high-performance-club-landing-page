const themes = [
  { icon: "⚡", name: "Energy Reset", desc: "Build small habits to feel more active, fresh, and charged during the day.", color: "bg-amber-50 border-amber-200", iconBg: "bg-amber-100" },
  { icon: "💪", name: "Health Reset", desc: "Improve your daily health habits without strict diets or complicated routines.", color: "bg-green-50 border-green-200", iconBg: "bg-green-100" },
  { icon: "🎯", name: "Focus Reset", desc: "Create a calmer, clearer, more productive daily rhythm.", color: "bg-blue-50 border-blue-200", iconBg: "bg-blue-100" },
  { icon: "🧘", name: "Calmness Reset", desc: "Build small habits to reduce mental clutter and feel more balanced.", color: "bg-purple-50 border-purple-200", iconBg: "bg-purple-100" },
  { icon: "🔥", name: "Discipline Reset", desc: "Learn how to show up daily without depending on motivation.", color: "bg-red-50 border-red-200", iconBg: "bg-red-100" },
  { icon: "🌙", name: "Sleep Reset", desc: "Build a better night routine and improve your recovery habits.", color: "bg-indigo-50 border-indigo-200", iconBg: "bg-indigo-100" },
];

export default function DUCThemes() {
  return (
    <section className="py-20 lg:py-28 relative bg-section-cream overflow-hidden">
      <span className="emoji-deco float-2 bottom-20 left-8 text-4xl hidden lg:block" aria-hidden="true">🗓️</span>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">Monthly themes</p>
          <h2 className="font-display text-section-title text-foreground mb-4 text-balance">
            Every Month Has One Clear Focus
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto leading-relaxed">
            Instead of random daily tips, every month follows one focused theme.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {themes.map(theme => (
            <div key={theme.name} className={`rounded-2xl border-2 ${theme.color} p-6 hover:shadow-md transition-shadow`}>
              <div className={`w-12 h-12 rounded-xl ${theme.iconBg} flex items-center justify-center text-2xl mb-4`}>
                {theme.icon}
              </div>
              <p className="font-bold text-foreground text-lg mb-2">{theme.name}</p>
              <p className="text-sm text-foreground-muted leading-relaxed">{theme.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-block bg-white border-2 border-accent/30 rounded-2xl px-6 py-5 shadow-sm">
            <p className="text-base font-medium text-foreground">One month. One theme. Thirty tiny habits.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
