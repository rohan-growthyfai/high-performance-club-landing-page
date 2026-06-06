import { ArrowRight } from "lucide-react";

const items = [
  { emoji: "📩", title: "30 Tiny Daily Habits", detail: "Get 1 tiny habit every day for 30 days on WhatsApp. Each habit is practical, beginner-friendly, and takes less than 5 minutes." },
  { emoji: "🎯", title: "One Monthly Theme", detail: "Every month follows one focused theme: Energy, Health, Focus, Calmness, Sleep, or Discipline. No random tips. One clear monthly journey." },
  { emoji: "✅", title: "Daily Tracking for Accountability", detail: "After completing your habit, reply DONE. Your progress gets counted automatically so you can see how consistent you are becoming." },
  { emoji: "📊", title: "Weekly Progress Scorecard", detail: "Every week, receive a simple report showing habits completed, monthly progress, current streak, and next target." },
  { emoji: "📰", title: "High Performance Newsletter", detail: "One short weekly newsletter with one powerful idea, one practical action, and one reflection question. No boring theory. No 20-minute read." },
  { emoji: "📘", title: "Monthly Habit PDF Guide", detail: "At the end of every month, get all 30 habits in one clean PDF. Save it. Reuse it. Build your habit library." },
  { emoji: "🗓️", title: "Monthly Habit Calendar", detail: "See your full 30-day habit journey in a simple calendar format. You'll know exactly what you're building each week." },
  { emoji: "📚", title: "Growing Habit Vault", detail: "Access all monthly habit guides, calendars, and resources in one place. The longer you stay, the more your habit library grows." },
  { emoji: "👥", title: "Private Accountability Group", detail: "Join a private WhatsApp group for check-ins, wins, progress updates, and support. No spam. No random forwards. Just people building better habits." },
];

export default function DUCValueStack() {
  return (
    <section className="py-20 lg:py-28 relative bg-section-cream">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">Everything included 🎁</p>
          <h2 className="font-display text-section-title text-balance text-foreground mb-4">
            Everything Included in ₹99/month
          </h2>
          <p className="text-lg text-foreground-muted max-w-xl mx-auto">
            A complete WhatsApp habit system built for busy people.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {items.map((item, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 p-5 rounded-2xl bg-white border border-border-subtle hover:shadow-sm transition-shadow${i === items.length - 1 && items.length % 2 !== 0 ? " sm:col-span-2 sm:max-w-sm sm:mx-auto sm:w-full" : ""}`}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/8 border border-accent/15 flex items-center justify-center flex-shrink-0 text-2xl">
                {item.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-base mb-1 leading-snug">{item.title}</p>
                <p className="text-sm text-foreground-muted leading-relaxed">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Price CTA card */}
        <div className="premium-card rounded-2xl overflow-hidden border-glow">
          <div className="bg-gradient-to-br from-accent/15 via-accent/8 to-white px-6 py-8 flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-6 text-center sm:text-left">
            <div>
              <p className="text-sm uppercase tracking-[0.15em] text-accent font-bold mb-2">Monthly subscription</p>
              <p className="font-display font-black text-5xl sm:text-6xl gradient-text tabular-nums leading-none">₹99</p>
              <p className="text-sm text-foreground-subtle mt-2 italic">per month • Cancel anytime</p>
            </div>
            <a href="#duc-join" className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-4 sm:px-10 sm:py-5 rounded-full text-base sm:text-xl w-full sm:w-auto">
              Start Daily Upgrade Club <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
