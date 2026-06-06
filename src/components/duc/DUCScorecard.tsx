export default function DUCScorecard() {
  return (
    <section className="py-24 lg:py-32 bg-section-white border-t border-border-subtle">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Scorecard visual */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 blur-2xl opacity-15" style={{ background: "radial-gradient(circle, #a78bfa, transparent 70%)" }} />
            <div className="relative bg-white border border-border rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <p className="text-foreground font-bold text-sm">Weekly Progress Report</p>
                <span className="text-lg">📊</span>
              </div>

              {/* Big number */}
              <div className="flex items-end gap-2 mb-6">
                <p className="font-display font-black text-7xl text-foreground tabular-nums" style={{ letterSpacing: "-0.04em", lineHeight: 1 }}>5</p>
                <p className="text-foreground-muted text-2xl mb-2 font-light">/7</p>
                <p className="text-foreground-muted text-sm mb-3 ml-1">habits this week</p>
              </div>

              {/* Week grid */}
              <div className="flex gap-1.5 mb-8">
                {["M","T","W","T","F","S","S"].map((d, i) => (
                  <div key={d + i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className={`w-full h-8 rounded-lg flex items-center justify-center text-xs font-bold ${i < 5 ? "text-white" : "bg-border-subtle text-foreground-subtle"}`} style={i < 5 ? { background: "linear-gradient(135deg, #25d366, #1da851)" } : {}}>{i < 5 ? "✓" : "—"}</div>
                    <p className="text-[#71717a] text-[9px] uppercase">{d}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-border-subtle pt-5">
                {[
                  { label: "Monthly progress", value: "18/30", sub: "60% complete" },
                  { label: "Current streak", value: "3 days", sub: "🔥 keep going" },
                  { label: "Level", value: "Strong Week", sub: "💪" },
                ].map(row => (
                  <div key={row.label} className="flex justify-between items-center">
                    <p className="text-[#71717a] text-xs">{row.label}</p>
                    <div className="text-right">
                      <p className="text-foreground text-xs font-bold">{row.value}</p>
                      <p className="text-foreground-subtle text-[10px]">{row.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right copy */}
          <div className="order-1 lg:order-2">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#25d366] mb-6">Weekly accountability</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 800, color: "#18181b" }}>
              What gets<br />
              <span style={{ color: "#a78bfa" }}>tracked</span><br />
              gets improved.
            </h2>
            <p className="text-[#71717a] text-lg leading-relaxed mt-6">
              Every week, you get a detailed personalized progress report on your WhatsApp. You see your progress, streaks and next goals.
            </p>
            <p className="text-foreground-subtle text-base mt-4 leading-relaxed italic">Simple. Very Effective.</p>
          </div>

        </div>
      </div>

      <div className="mt-12 text-center">
        <a href="#duc-join" className="btn-primary inline-flex items-center gap-2 px-10 py-5 rounded-full text-lg font-bold">
          Start for ₹99/month →
        </a>
      </div>
    </section>
  );
}
