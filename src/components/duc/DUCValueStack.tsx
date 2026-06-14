const items = [
  { emoji: "📩", title: "30 Tiny Daily Habits", detail: "Receive 1 carefully selected habit every day for 30 days to improve your energy, health, focus, and wellbeing.", highlight: true },
  { emoji: "🎯", title: "One Monthly Theme", detail: "Go deeper into one area of your life each month and see significant changes." },
  { emoji: "✅", title: "Daily Tracking & Accountability", detail: "Stay consistent and build momentum with simple daily habit check-in messages." },
  { emoji: "📊", title: "Weekly Progress Scorecard", detail: "Measure your improvement every week and celebrate the small wins that add up." },
  { emoji: "📰", title: "High Performance Newsletter", detail: "Discover practical ideas, insights, and top habit strategies to help you perform at your best." },
  { emoji: "📘", title: "Monthly Habit PDF Guide", detail: "Get a complete guide to keep all your habits in one place so you can revisit them anytime." },
  { emoji: "🗓️", title: "Monthly Habit Calendar", detail: "Know exactly what to focus on each day without planning anything yourself." },
  { emoji: "📚", title: "Complete Habit Vault", detail: "Unlock a growing library of powerful habits you can revisit anytime." },
  { emoji: "👥", title: "Private WhatsApp Group", detail: "Learn, grow, and stay motivated alongside others building a healthier and more productive lifestyle." },
];

export default function DUCValueStack() {
  return (
    <section className="py-20 lg:py-28 bg-section-cream border-t border-border-subtle">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#25d366] mb-6">Everything included</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 800, color: "#18181b" }}>
              Nine benefits.<br />
              <span style={{ color: "#71717a", fontStyle: "italic", fontWeight: 400 }}>One price.</span>
            </h2>
            <div className="text-right">
              <p className="font-display font-black text-5xl" style={{ color: "#25d366", letterSpacing: "-0.03em" }}>₹1</p>
              <p className="text-foreground-subtle text-sm mt-1">7-day trial, then ₹99/month</p>
            </div>
          </div>
        </div>

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
          <a href="#duc-join" className="btn-primary inline-flex items-center gap-2 px-10 py-5 rounded-full text-lg font-bold">
            Start for ₹1 (7-day trial) →
          </a>
        </div>
      </div>
    </section>
  );
}
