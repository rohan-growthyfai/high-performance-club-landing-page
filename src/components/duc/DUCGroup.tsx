export default function DUCGroup() {
  return (
    <section className="py-24 lg:py-32 bg-section-cream border-t border-border-subtle">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#25d366] mb-6">Community</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 800, color: "#18181b" }}>
              Habits are easier<br />
              <span style={{ color: "#71717a", fontStyle: "italic", fontWeight: 400 }}>with people.</span>
            </h2>
            <p className="text-[#71717a] text-lg leading-relaxed mt-6">
              A private WhatsApp group where members check in, share wins, and hold each other accountable.
            </p>
            <div className="mt-8 space-y-3">
              {["No spam", "No promotions", "No random forwards", "Just people building better habits"].map(r => (
                <div key={r} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#25d366]" />
                  <p className="text-[#71717a] text-sm">{r}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Group chat preview */}
          <div className="bg-white border border-border rounded-3xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border-subtle">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #25d366, #1da851)" }}>
                <span className="text-foreground">👥</span>
              </div>
              <div>
                <p className="text-foreground text-sm font-semibold">DUC Members Group</p>
                <p className="text-[#25d366] text-xs">1,240 members</p>
              </div>
            </div>
            <div className="p-4 bg-section-cream space-y-3">
              {[
                { name: "Priya M.", msg: "Day 8 DONE! Energy Reset is working ⚡", time: "8:12 AM", sent: false },
                { name: "Rahul S.", msg: "5 day streak today 🔥 never thought I'd make it", time: "8:14 AM", sent: false },
                { name: "You", msg: "Day 8 DONE ✅", time: "8:15 AM", sent: true },
                { name: "Anita K.", msg: "Same! This group keeps me honest 😊", time: "8:16 AM", sent: false },
              ].map((m, i) => (
                <div key={i} className={`flex ${m.sent ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] rounded-xl px-4 py-2.5 ${m.sent ? "rounded-br-none" : "rounded-bl-none"}`} style={{ background: m.sent ? "#005c4b" : "#202c33" }}>
                    {!m.sent && <p className="text-[#25d366] text-[10px] font-bold mb-1">{m.name}</p>}
                    <p className="text-white/90 text-xs leading-relaxed">{m.msg}</p>
                    <p className="text-white/30 text-[9px] text-right mt-1">{m.time}</p>
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
