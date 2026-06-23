const steps = [
  { num: "01", title: "Join for ₹99/month", desc: "Complete your subscription and get instant WhatsApp access." },
  { num: "02", title: "Receive 1 habit daily", desc: "Every morning, you get one tiny healthy habit on WhatsApp." },
  { num: "03", title: "Reply DONE", desc: "Complete the habit and reply DONE to track your progress." },
  { num: "04", title: "Get weekly scorecards", desc: "Every week, receive a simple progress update." },
  { num: "05", title: "Complete the monthly theme", desc: "At the end of 30 days, get your PDF guide and continue to the next theme." },
];

export default function DUCHowItWorks() {
  return (
    <section className="py-20 lg:py-28 relative bg-section-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">Step by step</p>
          <h2 className="font-display text-section-title text-foreground mb-4 text-balance">How It Works</h2>
        </div>

        <div className="space-y-4 mb-12">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-start gap-5 p-6 bg-white border border-border-subtle rounded-2xl hover:shadow-sm transition-shadow">
              <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                <span className="font-display font-black text-accent text-sm">{step.num}</span>
              </div>
              <div>
                <p className="font-bold text-foreground text-base mb-1">{step.title}</p>
                <p className="text-sm text-foreground-muted leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#duc-join" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dim transition-all text-white font-bold text-lg sm:text-xl px-10 py-5 rounded-full shadow-lg hover:-translate-y-0.5">
            Start My Daily Upgrade →
          </a>
        </div>
      </div>
    </section>
  );
}
