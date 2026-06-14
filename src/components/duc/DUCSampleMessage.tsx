export default function DUCSampleMessage() {
  return (
    <section className="py-20 lg:py-28 bg-section-white border-t border-border-subtle">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        <div className="mb-14 text-center lg:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1da851] mb-3">What you receive</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 800, color: "#18181b" }}>
            This lands on your WhatsApp<br />
            <span style={{ color: "#71717a", fontStyle: "italic", fontWeight: 400 }}>every single morning.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* iPhone mockup */}
          <div className="flex justify-center">
            <div className="relative mx-auto select-none" style={{ width: 270 }}>
              <div className="absolute inset-0 blur-3xl opacity-20 scale-75 pointer-events-none" style={{ background: "radial-gradient(circle, #25d366 0%, transparent 70%)" }} />
              <div className="relative" style={{ background: "linear-gradient(160deg, #2a2a2a 0%, #1a1a1a 40%, #111 100%)", borderRadius: 44, padding: "10px 8px", boxShadow: "0 0 0 1px #3a3a3a, 0 0 0 2px #111, 0 32px 64px -12px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)" }}>
                <div style={{ position: "absolute", left: -3, top: 88, width: 3, height: 34, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
                <div style={{ position: "absolute", left: -3, top: 132, width: 3, height: 58, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
                <div style={{ position: "absolute", left: -3, top: 198, width: 3, height: 58, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
                <div style={{ position: "absolute", right: -3, top: 148, width: 3, height: 72, background: "#2a2a2a", borderRadius: "0 2px 2px 0" }} />
                <div style={{ borderRadius: 36, overflow: "hidden", background: "#000" }}>
                  <div style={{ background: "#1da851", paddingTop: 12, display: "flex", justifyContent: "center" }}>
                    <div style={{ width: 120, height: 34, background: "#000", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#1a1a1a", border: "1px solid #333" }} />
                      <div style={{ width: 56, height: 16, borderRadius: 8, background: "#1a1a1a" }} />
                    </div>
                  </div>
                  <div style={{ background: "#1da851", padding: "8px 16px 6px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 11, color: "#fff", fontFamily: "var(--font-sans)", fontWeight: 600 }}>
                    <span>9:41</span><span style={{ fontSize: 10, fontWeight: 700 }}>100%</span>
                  </div>
                  <div style={{ background: "#1da851", padding: "8px 12px 10px", display: "flex", alignItems: "center", gap: 10, borderBottom: "none" }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #25d366, #1da851)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "#fff" }}>D</div>
                    <div>
                      <p style={{ margin: 0, color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-sans)" }}>Daily Upgrade Club</p>
                      <p style={{ margin: 0, color: "#25d366", fontSize: 11, fontFamily: "var(--font-sans)", marginTop: 1 }}>online</p>
                    </div>
                  </div>
                  <div style={{ background: "#efeae2", padding: "12px 8px 16px", minHeight: 300, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ textAlign: "center", marginBottom: 4 }}>
                      <span style={{ fontSize: 10, color: "#667781", background: "rgba(255,255,255,0.85)", padding: "3px 10px", borderRadius: 20, fontFamily: "var(--font-sans)" }}>Today</span>
                    </div>
                    {/* Habit message */}
                    <div style={{ display: "flex", paddingLeft: 6 }}>
                      <div style={{ background: "#fff", borderRadius: "8px 8px 8px 0", padding: "10px 12px", maxWidth: "90%", position: "relative" }}>
                        <div style={{ position: "absolute", bottom: 0, left: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #fff transparent" }} />
                        <p style={{ margin: "0 0 6px", color: "#25d366", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-sans)" }}>🎯 Day 4 — Focus Start Habit</p>
                        <p style={{ margin: "0 0 8px", color: "#111b21", fontSize: 11.5, fontFamily: "var(--font-sans)", lineHeight: 1.55 }}>Before opening Instagram, YouTube, or WhatsApp today — write your ONE most important task first.</p>
                        <p style={{ margin: "0 0 8px", color: "#667781", fontSize: 10.5, fontFamily: "var(--font-sans)" }}>⏱ Time needed: <span style={{ color: "#111b21", fontWeight: 600 }}>30 seconds</span></p>
                        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 8, marginBottom: 8 }}>
                          <p style={{ margin: "0 0 3px", color: "#667781", fontSize: 9.5, fontFamily: "var(--font-sans)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Why this works</p>
                          <p style={{ margin: 0, color: "#52525b", fontSize: 11, fontFamily: "var(--font-sans)", lineHeight: 1.5 }}>Gives your brain one clear direction before distractions take over.</p>
                        </div>
                        <p style={{ margin: 0, color: "#111b21", fontSize: 11.5, fontFamily: "var(--font-sans)" }}>Reply <strong style={{ color: "#111b21" }}>DONE</strong> ✅ when done</p>
                        <p style={{ margin: "5px 0 0", color: "#667781", fontSize: 10, textAlign: "right", fontFamily: "var(--font-sans)" }}>6:00 AM</p>
                      </div>
                    </div>
                    {/* User reply */}
                    <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: 6 }}>
                      <div style={{ background: "#d9fdd3", borderRadius: "8px 8px 0 8px", padding: "8px 12px", maxWidth: "50%", position: "relative" }}>
                        <div style={{ position: "absolute", bottom: 0, right: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #d9fdd3 transparent" }} />
                        <p style={{ margin: 0, color: "#111b21", fontSize: 12, fontFamily: "var(--font-sans)" }}>DONE ✅</p>
                        <p style={{ margin: "3px 0 0", color: "#667781", fontSize: 10, textAlign: "right", fontFamily: "var(--font-sans)" }}>6:07 AM ✓✓</p>
                      </div>
                    </div>
                    {/* Tracking reply */}
                    <div style={{ display: "flex", paddingLeft: 6 }}>
                      <div style={{ background: "#fff", borderRadius: "8px 8px 8px 0", padding: "10px 12px", maxWidth: "85%", position: "relative" }}>
                        <div style={{ position: "absolute", bottom: 0, left: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #fff transparent" }} />
                        <p style={{ margin: "0 0 5px", color: "#111b21", fontSize: 12, fontFamily: "var(--font-sans)" }}>Done counted ✅</p>
                        <p style={{ margin: 0, color: "#111b21", fontSize: 11.5, fontFamily: "var(--font-sans)", lineHeight: 1.6 }}>Streak: <strong style={{ color: "#1da851" }}>4 days 🔥</strong><br />Month: <strong style={{ color: "#111b21" }}>12/30 habits</strong></p>
                        <p style={{ margin: "5px 0 0", color: "#667781", fontSize: 10, textAlign: "right", fontFamily: "var(--font-sans)" }}>6:07 AM</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: "#efeae2", padding: "8px 0 12px", display: "flex", justifyContent: "center" }}>
                    <div style={{ width: 120, height: 5, background: "rgba(0,0,0,0.15)", borderRadius: 3 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right copy */}
          <div className="space-y-8">
            {[
              { num: "01", label: "Simple enough to do.", sub: "You don't need extra time, energy, or willpower. Under 5 minutes every single day." },
              { num: "02", label: "Clear enough to follow.", sub: "Read it. Do it. Reply DONE. That's the whole system." },
              { num: "03", label: "Small enough to repeat.", sub: "That's exactly how habits form — through consistent repetition." },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-5">
                <div className="w-9 h-9 rounded-full border-2 border-[#25d366]/30 bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#1da851] text-xs font-bold">{item.num}</span>
                </div>
                <div>
                  <p className="text-foreground font-bold text-base">{item.label}</p>
                  <p className="text-foreground-muted text-sm mt-1 leading-relaxed">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a href="#duc-join" className="btn-primary inline-flex items-center gap-2 px-10 py-5 rounded-full text-lg font-bold">
            Start for ₹1 (7-day trial) →
          </a>
        </div>
      </div>
    </section>
  );
}
