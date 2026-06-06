const items = [
  { emoji: "📩", title: "30 Daily Habits", detail: "1 per day. Practical. Under 5 minutes. Delivered at 6 AM on WhatsApp.", highlight: true },
  { emoji: "🎯", title: "Monthly Theme", detail: "Energy. Focus. Health. Sleep. Calmness. Discipline. One clear focus every month." },
  { emoji: "✅", title: "DONE Tracking", detail: "Reply DONE. We count it. No app. No login. No habit tracker to download." },
  { emoji: "📊", title: "Weekly Scorecard", detail: "Every week: habits done, monthly progress, current streak, next target." },
  { emoji: "📰", title: "Weekly Newsletter", detail: "One powerful idea. One action. One reflection question. Short, sharp, useful." },
  { emoji: "📘", title: "Monthly PDF Guide", detail: "All 30 habits in one clean PDF at month end. Save it. Revisit it." },
  { emoji: "🗓️", title: "Habit Calendar", detail: "See your entire 30-day journey mapped out. Know what you're building." },
  { emoji: "📚", title: "Habit Vault", detail: "All your PDF guides and resources in one place. Grows every month." },
  { emoji: "👥", title: "Accountability Group", detail: "Private WhatsApp group. Check-ins, wins, support. No spam. No noise." },
];

export default function DUCValueStack() {
  return (
    <section className="py-24 lg:py-32 bg-section-cream border-t border-border-subtle">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        <div className="mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#25d366] mb-6">Everything included</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 800, color: "#18181b" }}>
              Nine things.<br />
              <span style={{ color: "#71717a", fontStyle: "italic", fontWeight: 400 }}>One price.</span>
            </h2>
            <div className="text-right">
              <p className="font-display font-black text-5xl" style={{ color: "#25d366", letterSpacing: "-0.03em" }}>₹99</p>
              <p className="text-[#71717a] text-sm mt-1">per month</p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.title}
              className={`relative p-6 rounded-2xl border hover:shadow-sm transition-shadow ${item.highlight ? "bg-white border-accent/20 shadow-sm" : "bg-white border-border-subtle"}`}
            >
              {item.highlight && <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: "linear-gradient(90deg, transparent, #1da851, transparent)" }} />}
              <span className="text-2xl mb-4 block">{item.emoji}</span>
              <p className="text-foreground font-bold text-sm mb-1.5">{item.title}</p>
              <p className="text-foreground-muted text-xs leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a href="#duc-join" className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-bold text-white" style={{ background: "linear-gradient(135deg, #25d366, #1da851)", boxShadow: "0 0 32px rgba(37,211,102,0.3)" }}>
            Get everything for ₹99/month →
          </a>
        </div>
      </div>
    </section>
  );
}
