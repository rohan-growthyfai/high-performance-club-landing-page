const problems = ["They forget", "They try to do too much at once", "They lose momentum after 3 days", "They don't track so they don't see progress", "They have no one to stay accountable to"];

export default function DUCWhy() {
  return (
    <section className="py-24 lg:py-32 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* Large editorial headline */}
        <div className="mb-20">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#25d366] mb-6">The real problem</p>
          <p style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", lineHeight: 1.2, letterSpacing: "-0.02em", color: "#fafafa", fontWeight: 700, maxWidth: "36ch" }}>
            You already know what to do. You don&apos;t need more advice.{" "}
            <span style={{ color: "#444", fontStyle: "italic", fontWeight: 400 }}>You need a system that reminds you daily.</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Problem column */}
          <div className="bg-[#141414] border border-white/6 rounded-3xl p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400 mb-6">Without a system</p>
            <div className="space-y-4">
              {problems.map((p, i) => (
                <div key={p} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-0.5 bg-red-400 rounded-full" />
                  </div>
                  <p className="text-[#888] text-sm leading-relaxed">{p}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Solution column */}
          <div className="border border-[#25d366]/20 rounded-3xl p-8" style={{ background: "linear-gradient(135deg, rgba(37,211,102,0.04) 0%, transparent 100%)" }}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#25d366] mb-6">With Daily Upgrade Club</p>
            <div className="space-y-6">
              {[
                { icon: "📩", title: "One habit. Every morning.", sub: "Just one. Not five. Not a list. One." },
                { icon: "✅", title: "Reply DONE.", sub: "That's all you need to do to track it." },
                { icon: "📊", title: "Weekly scorecard.", sub: "You see progress. Progress creates momentum." },
                { icon: "👥", title: "Private group.", sub: "Others doing the same. Accountability built-in." },
              ].map(item => (
                <div key={item.title} className="flex items-start gap-4">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                    <p className="text-[#666] text-xs mt-0.5 leading-relaxed">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
