const steps = [
  { num: "01", title: "Habit lands at 6 AM", desc: "Every morning, one tiny habit arrives on your WhatsApp. Practical. Under 5 minutes.", color: "#25d366" },
  { num: "02", title: "You do it", desc: "Read it. Do it. Could be 30 seconds. Could be 5 minutes. Never more.", color: "#60a5fa" },
  { num: "03", title: "Reply DONE", desc: "One word. Your streak updates. Your monthly count goes up. No app needed.", color: "#f59e0b" },
  { num: "04", title: "Weekly scorecard", desc: "Every week, a simple report. How consistent were you? What's your streak?", color: "#a78bfa" },
];

export default function DUCHowWorks() {
  return (
    <section className="py-24 lg:py-32 bg-section-white border-t border-border-subtle">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        <div className="mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#25d366] mb-6">The loop</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 800, color: "#18181b" }}>
            Four steps.<br />
            <span style={{ color: "#a1a1aa", fontStyle: "italic", fontWeight: 400 }}>Repeat for 30 days.</span>
          </h2>
        </div>

        {/* Steps — horizontal scrolling timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 rounded-3xl overflow-hidden">
          {steps.map((step, i) => (
            <div key={step.num} className="bg-section-white p-8 relative group hover:bg-white transition-colors">
              {/* Step number — huge */}
              <p className="font-display font-black mb-6 select-none" style={{ fontSize: "4rem", lineHeight: 1, color: step.color, opacity: 0.15, letterSpacing: "-0.04em" }}>{step.num}</p>
              <div className="w-8 h-px mb-6" style={{ background: step.color }} />
              <p className="text-foreground font-bold text-base mb-3 leading-snug">{step.title}</p>
              <p className="text-[#71717a] text-sm leading-relaxed">{step.desc}</p>
              {/* Arrow */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-[#a1a1aa] text-xl">›</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-border">
            <span className="text-base">🔁</span>
            <span className="text-sm text-[#52525b]">Repeat every month with a new theme.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
