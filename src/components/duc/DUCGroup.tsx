export default function DUCGroup() {
  const messages = [
    { name: "Priya M.", initial: "P", color: "#e67e22", msg: "Day 8 DONE! Energy Reset is working ⚡", time: "8:12 AM", sent: false },
    { name: "Rahul S.", initial: "R", color: "#9b59b6", msg: "5 day streak 🔥 never thought I'd make it past Day 3", time: "8:14 AM", sent: false },
    { name: "You", initial: "Y", color: "#1da851", msg: "Day 8 DONE ✅", time: "8:15 AM", sent: true },
    { name: "Anita K.", initial: "A", color: "#e74c3c", msg: "Same! This group keeps me honest 😊", time: "8:16 AM", sent: false },
    { name: "Karan D.", initial: "K", color: "#3498db", msg: "Week 2 complete 🏆", time: "8:18 AM", sent: false },
  ];

  return (
    <section className="py-20 lg:py-28 bg-section-cream border-t border-border-subtle">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left copy */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1da851] mb-4">Community</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 800, color: "#18181b" }}>
              Habits are easier<br />
              <span style={{ color: "#71717a", fontStyle: "italic", fontWeight: 400 }}>with people.</span>
            </h2>
            <p className="text-foreground-muted text-lg leading-relaxed mt-5">
              A private WhatsApp group where members check in daily, share wins, and hold each other accountable.
            </p>
            <div className="mt-7 space-y-3">
              {[
                { icon: "✅", text: "Daily DONE check-ins from members" },
                { icon: "🔥", text: "Streak celebrations and wins" },
                { icon: "🚫", text: "No spam. No promotions. No noise." },
                { icon: "👥", text: "Just people building better habits together" },
              ].map(r => (
                <div key={r.text} className="flex items-center gap-3">
                  <span className="text-base flex-shrink-0">{r.icon}</span>
                  <p className="text-foreground-muted text-sm">{r.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* iPhone group chat */}
          <div className="flex justify-center">
            <div className="relative mx-auto select-none" style={{ width: 270 }}>
              <div className="absolute inset-0 blur-3xl opacity-15 scale-75 pointer-events-none" style={{ background: "radial-gradient(circle, #25d366 0%, transparent 70%)" }} />
              <div className="relative" style={{ background: "linear-gradient(160deg, #2a2a2a 0%, #1a1a1a 40%, #111 100%)", borderRadius: 44, padding: "10px 8px", boxShadow: "0 0 0 1px #3a3a3a, 0 0 0 2px #111, 0 32px 64px -12px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)" }}>
                <div style={{ position: "absolute", left: -3, top: 88, width: 3, height: 34, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
                <div style={{ position: "absolute", left: -3, top: 132, width: 3, height: 58, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
                <div style={{ position: "absolute", left: -3, top: 198, width: 3, height: 58, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
                <div style={{ position: "absolute", right: -3, top: 148, width: 3, height: 72, background: "#2a2a2a", borderRadius: "0 2px 2px 0" }} />
                <div style={{ borderRadius: 36, overflow: "hidden", background: "#000" }}>
                  <div style={{ background: "#202c33", paddingTop: 12, display: "flex", justifyContent: "center" }}>
                    <div style={{ width: 120, height: 34, background: "#000", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#1a1a1a", border: "1px solid #333" }} />
                      <div style={{ width: 56, height: 16, borderRadius: 8, background: "#1a1a1a" }} />
                    </div>
                  </div>
                  <div style={{ background: "#202c33", padding: "8px 16px 6px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-sans)", fontWeight: 600 }}>
                    <span>9:41</span><span style={{ fontSize: 10, fontWeight: 700 }}>100%</span>
                  </div>
                  <div style={{ background: "#202c33", padding: "8px 12px 10px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #25d366, #1da851)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>👥</div>
                    <div>
                      <p style={{ margin: 0, color: "#fff", fontSize: 12, fontWeight: 600, fontFamily: "var(--font-sans)" }}>DUC Members Group</p>
                      <p style={{ margin: 0, color: "rgba(255,255,255,0.45)", fontSize: 10, fontFamily: "var(--font-sans)", marginTop: 1 }}>1,240 members</p>
                    </div>
                  </div>
                  <div style={{ background: "#0b141a", padding: "10px 8px 14px", minHeight: 400, display: "flex", flexDirection: "column", gap: 7 }}>
                    <div style={{ textAlign: "center", marginBottom: 2 }}>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", background: "rgba(31,44,52,0.8)", padding: "3px 10px", borderRadius: 20, fontFamily: "var(--font-sans)" }}>Today</span>
                    </div>
                    {messages.map((m, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: m.sent ? "flex-end" : "flex-start", alignItems: "flex-end", paddingLeft: m.sent ? 0 : 4, paddingRight: m.sent ? 4 : 0, gap: 5 }}>
                        {!m.sent && (
                          <div style={{ width: 22, height: 22, borderRadius: "50%", background: m.color, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#fff" }}>{m.initial}</div>
                        )}
                        <div style={{ background: m.sent ? "#005c4b" : "#202c33", borderRadius: m.sent ? "8px 8px 0 8px" : "8px 8px 8px 0", padding: "6px 10px", maxWidth: "78%", position: "relative" }}>
                          {m.sent && <div style={{ position: "absolute", bottom: 0, right: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #005c4b transparent" }} />}
                          {!m.sent && <div style={{ position: "absolute", bottom: 0, left: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #202c33 transparent" }} />}
                          {!m.sent && <p style={{ margin: "0 0 2px", color: m.color, fontSize: 10, fontWeight: 700, fontFamily: "var(--font-sans)" }}>{m.name}</p>}
                          <p style={{ margin: 0, color: "rgba(255,255,255,0.9)", fontSize: 11, fontFamily: "var(--font-sans)", lineHeight: 1.4 }}>{m.msg}</p>
                          <p style={{ margin: "2px 0 0", color: "rgba(255,255,255,0.35)", fontSize: 9, textAlign: "right", fontFamily: "var(--font-sans)" }}>{m.time}{m.sent ? " ✓✓" : ""}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "#0b141a", padding: "8px 0 12px", display: "flex", justifyContent: "center" }}>
                    <div style={{ width: 120, height: 5, background: "rgba(255,255,255,0.25)", borderRadius: 3 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
