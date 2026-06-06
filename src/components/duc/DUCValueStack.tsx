const items = [
  { emoji: "📩", title: "30 Daily Habits", detail: "1 per day. Practical. Under 5 minutes. Delivered at 6 AM on WhatsApp.", highlight: true },
  { emoji: "🎯", title: "Monthly Themes", detail: "Energy. Focus. Health. Sleep. Calmness. Discipline. One clear focus every month." },
  { emoji: "✅", title: "Complete Progress Tracking", detail: "Reply DONE. Your streak, weekly count and monthly progress all get tracked automatically." },
  { emoji: "📊", title: "Weekly Scorecards", detail: "Every week: habits completed, monthly progress, current streak, next target." },
  { emoji: "📰", title: "Weekly High Performance Newsletter", detail: "One powerful idea. One practical action. One reflection question. Short, sharp, useful." },
  { emoji: "📘", title: "Monthly Habit Guides", detail: "All 30 habits in one clean PDF at month end. Save it. Revisit it anytime." },
  { emoji: "🗓️", title: "30-Day Habit Calendar", detail: "See your full 30-day habit journey mapped out. Know exactly what you're building." },
  { emoji: "📚", title: "Growing Habit Vault", detail: "All your monthly guides and resources in one place. Grows the longer you stay." },
  { emoji: "👥", title: "Private Accountability Group", detail: "Private WhatsApp group. Daily check-ins, wins, support. No spam. No noise." },
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
              <p className="font-display font-black text-5xl" style={{ color: "#25d366", letterSpacing: "-0.03em" }}>₹99</p>
              <p className="text-foreground-subtle text-sm mt-1">per month</p>
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
            Get everything for ₹99/month →
          </a>
        </div>
      </div>
    </section>
  );
}
