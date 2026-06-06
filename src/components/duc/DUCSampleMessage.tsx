export default function DUCSampleMessage() {
  return (
    <section className="py-24 lg:py-32 bg-[#0f0f0f] border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        <div className="mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#25d366] mb-6">What you receive</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 800, color: "#fafafa" }}>
            This lands on your<br />
            <span style={{ color: "#444", fontStyle: "italic", fontWeight: 400 }}>WhatsApp every morning.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Message mockup */}
          <div className="relative">
            <div className="absolute inset-0 blur-2xl opacity-20 scale-90" style={{ background: "radial-gradient(circle, #25d366 0%, transparent 70%)" }} />
            <div className="relative bg-[#111] border border-white/8 rounded-3xl overflow-hidden">
              {/* WA header bar */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/6">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #25d366, #1da851)" }}>D</div>
                <div>
                  <p className="text-white text-xs font-semibold">Daily Upgrade Club</p>
                  <p className="text-[#25d366] text-[10px]">online</p>
                </div>
              </div>
              {/* Message */}
              <div className="p-5 bg-[#0b141a]">
                <div className="bg-[#202c33] rounded-xl rounded-tl-none p-5 max-w-sm">
                  <p className="text-[#25d366] text-xs font-bold mb-3">🎯 Day 4 — Focus Start Habit</p>
                  <p className="text-white/90 text-sm leading-relaxed mb-4">
                    Before opening Instagram, YouTube, or WhatsApp today, write down your first important task.
                  </p>
                  <div className="flex gap-2 items-start mb-4">
                    <span className="text-[#555] text-xs font-mono mt-0.5">⏱</span>
                    <p className="text-white/60 text-xs">Time needed: <span className="text-white/80 font-semibold">30 seconds</span></p>
                  </div>
                  <div className="border-t border-white/8 pt-4">
                    <p className="text-[#555] text-[10px] uppercase tracking-wider font-semibold mb-1.5">Why this works</p>
                    <p className="text-white/70 text-xs leading-relaxed">It gives your brain one clear direction before distractions take over.</p>
                  </div>
                  <p className="text-white/80 text-sm mt-4">Reply <strong className="text-white">DONE</strong> ✅ when done</p>
                  <p className="text-white/30 text-[10px] text-right mt-3">6:00 AM ✓✓</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — 3 lines */}
          <div className="space-y-8">
            {[
              { label: "Simple enough to do.", sub: "You don't need extra time, energy, or willpower." },
              { label: "Clear enough to follow.", sub: "No interpretation needed. Just read and do." },
              { label: "Small enough to repeat.", sub: "That's how habits form. Not through heroics." },
            ].map((item, i) => (
              <div key={item.label} className="flex items-start gap-5">
                <div className="w-8 h-8 rounded-full border border-[#25d366]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#25d366] text-xs font-bold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-base">{item.label}</p>
                  <p className="text-[#555] text-sm mt-1 leading-relaxed">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
