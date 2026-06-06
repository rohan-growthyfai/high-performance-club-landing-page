const steps = [
  { step: "01", title: "Join for ₹99/month", desc: "Complete your subscription. Get instant WhatsApp access." },
  { step: "02", title: "Receive 1 habit daily", desc: "Every morning at 6 AM, one tiny habit on WhatsApp." },
  { step: "03", title: "Reply DONE", desc: "Complete the habit. One word. Progress tracked automatically." },
  { step: "04", title: "Get weekly scorecards", desc: "Every week, a simple report shows your consistency." },
  { step: "05", title: "Complete the month", desc: "30 habits. PDF guide. Move to the next theme." },
];

export default function DUCHowItWorks() {
  return (
    <section className="py-24 lg:py-32 bg-section-white border-t border-border-subtle">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#25d366] mb-6">Step by step</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 800, color: "#18181b" }}>
            How it works.
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/6 hidden sm:block" />

          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={step.step} className={`relative flex items-start gap-6 py-8 ${i < steps.length - 1 ? "border-b border-border-subtle" : ""}`}>
                {/* Number circle */}
                <div className="relative z-10 w-10 h-10 rounded-full border border-[#25d366]/30 bg-section-white flex items-center justify-center flex-shrink-0" style={{ boxShadow: i === 0 ? "0 0 16px rgba(37,211,102,0.2)" : "none" }}>
                  <span className="text-xs font-bold" style={{ color: i === 0 ? "#1da851" : "#a1a1aa" }}>{step.step}</span>
                </div>
                <div className="pt-1">
                  <p className="text-foreground font-bold text-base mb-1">{step.title}</p>
                  <p className="text-[#71717a] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a href="#duc-join" className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-bold text-white" style={{ background: "linear-gradient(135deg, #25d366, #1da851)", boxShadow: "0 0 24px rgba(37,211,102,0.25)" }}>
            Start My Daily Upgrade →
          </a>
        </div>
      </div>
    </section>
  );
}
