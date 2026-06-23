import { ArrowRight } from "lucide-react";

const steps = [
  { icon: "📩", time: "Every Morning", title: "Daily Prompt", desc: "You receive one tiny healthy habit every day on WhatsApp.", color: "bg-amber-50 border-amber-200", iconColor: "text-amber-500" },
  { icon: "✅", time: "5 Minutes", title: "Simple Action", desc: "You complete the habit in less than 5 minutes.", color: "bg-green-50 border-green-200", iconColor: "text-green-500" },
  { icon: "🔁", time: "Reply DONE", title: "DONE Tracking", desc: "You reply DONE and your progress gets tracked.", color: "bg-blue-50 border-blue-200", iconColor: "text-blue-500" },
  { icon: "📊", time: "Every Week", title: "Weekly Scorecard", desc: "You see your weekly consistency and monthly progress.", color: "bg-purple-50 border-purple-200", iconColor: "text-purple-500" },
];

export default function DUCHowWorks() {
  return (
    <section className="py-20 lg:py-28 relative bg-section-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">Simple system</p>
          <h2 className="font-display text-section-title text-foreground mb-4 text-balance">
            A simple system that keeps you consistent
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, i) => (
            <div key={step.title} className="relative">
              <div className={`rounded-2xl border-2 ${step.color} p-6 text-center h-full flex flex-col items-center`}>
                <div className="w-14 h-14 rounded-2xl bg-white border border-border-subtle flex items-center justify-center mb-4 text-2xl shadow-sm">
                  {step.icon}
                </div>
                <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${step.iconColor}`}>{step.time}</p>
                <p className="font-bold text-foreground text-base mb-2">{step.title}</p>
                <p className="text-sm text-foreground-muted leading-relaxed">{step.desc}</p>
                <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center shadow-sm">{i + 1}</div>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                  <ArrowRight className="w-5 h-5 text-accent/40" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-white border border-border-subtle rounded-2xl p-8 max-w-2xl mx-auto">
          <p className="text-lg text-foreground leading-relaxed">
            You don&apos;t need more motivation.<br />
            <strong>You need a simple system that shows up daily.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
