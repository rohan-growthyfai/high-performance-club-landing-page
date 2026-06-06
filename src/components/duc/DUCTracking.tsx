export default function DUCTracking() {
  return (
    <section className="py-24 lg:py-32 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#25d366] mb-6">Zero apps</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 800, color: "#fafafa" }}>
              Track progress<br />
              with <span style={{ color: "#25d366" }}>one word.</span>
            </h2>
            <p className="text-[#666] text-lg leading-relaxed mt-6">
              No habit tracker app. No streak calendar to update. No dashboard to log into.
            </p>
            <p className="text-[#444] text-base mt-4 leading-relaxed">
              Complete your habit. Reply <span className="text-white font-bold">DONE</span>. We track everything automatically.
            </p>

            {/* DONE button visual */}
            <div className="mt-10">
              <div className="inline-flex items-center justify-center rounded-2xl font-display font-black text-5xl text-black px-12 py-6" style={{ background: "linear-gradient(135deg, #25d366, #1da851)", boxShadow: "0 0 48px rgba(37,211,102,0.4), 0 4px 16px rgba(0,0,0,0.5)", letterSpacing: "-0.03em" }}>
                DONE
              </div>
              <p className="text-[#444] text-xs mt-3 uppercase tracking-wider">That&apos;s all you need to type</p>
            </div>
          </div>

          {/* Right — reply preview */}
          <div className="relative">
            <div className="absolute inset-0 blur-2xl opacity-15" style={{ background: "radial-gradient(circle, #25d366, transparent 70%)" }} />
            <div className="relative bg-[#111] border border-white/8 rounded-3xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/6">
                <div className="w-2 h-2 rounded-full bg-[#25d366]" />
                <p className="text-[#888] text-xs">Automatic reply from Daily Upgrade Club</p>
              </div>
              <div className="p-5 bg-[#0b141a]">
                <div className="bg-[#202c33] rounded-xl rounded-tl-none p-5">
                  <p className="text-white text-sm font-medium mb-5">Done counted ✅</p>
                  <div className="space-y-3">
                    {[
                      { label: "This week", value: "4/7 habits", pct: 57, color: "#60a5fa" },
                      { label: "This month", value: "12/30 habits", pct: 40, color: "#25d366" },
                    ].map(item => (
                      <div key={item.label}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-white/50">{item.label}</span>
                          <span className="text-white/80 font-semibold">{item.value}</span>
                        </div>
                        <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${item.pct}%`, background: item.color }} />
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between text-xs pt-2 border-t border-white/8">
                      <span className="text-white/50">Current streak</span>
                      <span className="font-bold" style={{ color: "#25d366" }}>3 days 🔥</span>
                    </div>
                  </div>
                  <p className="text-[#25d366] text-xs mt-4 font-medium">Small wins are stacking up.</p>
                  <p className="text-white/30 text-[10px] text-right mt-3">6:04 AM</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
