export default function DUCScorecard() {
  return (
    <section className="py-24 lg:py-32 bg-[#0f0f0f] border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Scorecard visual */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 blur-2xl opacity-15" style={{ background: "radial-gradient(circle, #a78bfa, transparent 70%)" }} />
            <div className="relative bg-[#111] border border-white/8 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <p className="text-white font-bold text-sm">Weekly Progress Report</p>
                <span className="text-lg">📊</span>
              </div>

              {/* Big number */}
              <div className="flex items-end gap-2 mb-6">
                <p className="font-display font-black text-7xl text-white tabular-nums" style={{ letterSpacing: "-0.04em", lineHeight: 1 }}>5</p>
                <p className="text-[#555] text-2xl mb-2 font-light">/7</p>
                <p className="text-[#666] text-sm mb-3 ml-1">habits this week</p>
              </div>

              {/* Week grid */}
              <div className="flex gap-1.5 mb-8">
                {["M","T","W","T","F","S","S"].map((d, i) => (
                  <div key={d + i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className={`w-full h-8 rounded-lg flex items-center justify-center text-xs font-bold ${i < 5 ? "text-black" : "bg-white/5 text-[#444]"}`} style={i < 5 ? { background: "linear-gradient(135deg, #25d366, #1da851)" } : {}}>{i < 5 ? "✓" : "—"}</div>
                    <p className="text-[#555] text-[9px] uppercase">{d}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-white/6 pt-5">
                {[
                  { label: "Monthly progress", value: "18/30", sub: "60% complete" },
                  { label: "Current streak", value: "3 days", sub: "🔥 keep going" },
                  { label: "Level", value: "Strong Week", sub: "💪" },
                ].map(row => (
                  <div key={row.label} className="flex justify-between items-center">
                    <p className="text-[#555] text-xs">{row.label}</p>
                    <div className="text-right">
                      <p className="text-white text-xs font-bold">{row.value}</p>
                      <p className="text-[#444] text-[10px]">{row.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right copy */}
          <div className="order-1 lg:order-2">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#25d366] mb-6">Weekly accountability</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 800, color: "#fafafa" }}>
              What gets<br />
              <span style={{ color: "#a78bfa" }}>tracked</span><br />
              gets improved.
            </h2>
            <p className="text-[#666] text-lg leading-relaxed mt-6">
              Every week, a simple progress report arrives on WhatsApp. You see your consistency score, current streak, and next target.
            </p>
            <p className="text-[#444] text-base mt-4 leading-relaxed italic">Simple. Slightly annoying. Very effective.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
