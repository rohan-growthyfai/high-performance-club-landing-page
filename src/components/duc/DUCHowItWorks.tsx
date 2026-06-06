const steps = [
  { num: "01", title: "Join for ₹99/month", desc: "Complete your subscription. Get your 1st WhatsApp message in 2 minutes." },
  { num: "02", title: "Receive 1 habit daily", desc: "Every morning at 6 AM, get one tiny habit on WhatsApp." },
  { num: "03", title: "Reply DONE", desc: "Complete the habit. Reply with one word \"DONE\". Progress gets tracked automatically." },
  { num: "04", title: "Get weekly scorecards", desc: "Every week, get a detailed personalized report showing your progress." },
  { num: "05", title: "Complete the month", desc: "30 tiny habits. Detailed PDF guide. Move to the next theme." },
];

export default function DUCHowItWorks() {
  return (
    <section className="py-20 lg:py-28 bg-section-white border-t border-border-subtle">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#25d366] mb-6">Step by step</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 800, color: "#18181b" }}>How it works.</h2>
        </div>

        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border-subtle hidden sm:block" />
          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={step.num} className={`relative flex items-start gap-6 py-8 ${i < steps.length - 1 ? "border-b border-border-subtle" : ""}`}>
                <div className="relative z-10 w-10 h-10 rounded-full border bg-white flex items-center justify-center flex-shrink-0" style={{ borderColor: i === 0 ? "#25d366" : "#e2dfd6", boxShadow: i === 0 ? "0 0 16px rgba(37,211,102,0.2)" : "none" }}>
                  <span className="text-xs font-bold" style={{ color: i === 0 ? "#1da851" : "#a1a1aa" }}>{step.num}</span>
                </div>
                <div className="pt-1">
                  <p className="text-foreground font-bold text-base mb-1">{step.title}</p>
                  <p className="text-foreground-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a href="#duc-join" className="btn-primary inline-flex items-center gap-2 px-10 py-5 rounded-full text-lg font-bold">
            Start My Daily Upgrade →
          </a>
        </div>
      </div>
    </section>
  );
}
