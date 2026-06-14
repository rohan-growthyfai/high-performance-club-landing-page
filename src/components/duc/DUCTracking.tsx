export default function DUCTracking() {
  return (
    <section className="py-20 lg:py-28 bg-section-cream border-t border-border-subtle">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left copy */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#25d366] mb-6">Zero apps</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 800, color: "#18181b" }}>
              Track progress<br />
              with <span style={{ color: "#1da851" }}>one word.</span>
            </h2>
            {/* Updated subheading */}
            <p className="text-foreground-muted text-lg leading-relaxed mt-6">
              No separate habit tracker app. No separate login. Your WhatsApp becomes your habit tracker.
            </p>
            <p className="text-foreground-muted text-base mt-3 leading-relaxed">
              Just complete your habit anytime throughout the day. Reply <span className="text-foreground font-bold">&ldquo;DONE&rdquo;</span>. We track everything automatically.
            </p>

            {/* DONE button visual */}
            <div className="mt-10">
              <div className="inline-flex items-center justify-center rounded-2xl font-display font-black text-5xl text-white px-12 py-6" style={{ background: "#1da851", boxShadow: "0 4px 24px rgba(29,168,81,0.35)", letterSpacing: "-0.03em" }}>
                DONE
              </div>
              <p className="text-foreground-subtle text-xs mt-3 uppercase tracking-wider">That&apos;s all you need to type</p>
            </div>
          </div>

          {/* Right — iPhone mockup showing DONE sent + tracking reply */}
          <div className="flex justify-center">
            <div className="relative mx-auto select-none" style={{ width: 260 }}>
              <div className="absolute inset-0 blur-3xl opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, #25d366 0%, transparent 70%)" }} />
              <div className="relative" style={{ background: "linear-gradient(160deg, #2a2a2a 0%, #1a1a1a 40%, #111 100%)", borderRadius: 44, padding: "10px 8px", boxShadow: "0 0 0 1px #3a3a3a, 0 0 0 2px #111, 0 32px 64px -12px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)" }}>
                <div style={{ position: "absolute", left: -3, top: 88, width: 3, height: 34, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
                <div style={{ position: "absolute", left: -3, top: 132, width: 3, height: 58, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
                <div style={{ position: "absolute", right: -3, top: 148, width: 3, height: 72, background: "#2a2a2a", borderRadius: "0 2px 2px 0" }} />
                <div style={{ borderRadius: 36, overflow: "hidden", background: "#000" }}>
                  {/* Dynamic island */}
                  <div style={{ background: "#1da851", paddingTop: 12, display: "flex", justifyContent: "center" }}>
                    <div style={{ width: 120, height: 34, background: "#000", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#1a1a1a", border: "1px solid #333" }} />
                      <div style={{ width: 56, height: 16, borderRadius: 8, background: "#1a1a1a" }} />
                    </div>
                  </div>
                  {/* Status + WA header */}
                  <div style={{ background: "#1da851", padding: "6px 16px 4px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 11, color: "#fff", fontFamily: "var(--font-sans)", fontWeight: 600 }}>
                    <span>9:41</span><span style={{ fontSize: 10 }}>100%</span>
                  </div>
                  <div style={{ background: "#1da851", padding: "6px 12px 8px", display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #25d366, #1da851)", border: "1.5px solid rgba(255,255,255,0.3)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff" }}>D</div>
                    <div>
                      <p style={{ margin: 0, color: "#fff", fontSize: 12, fontWeight: 600, fontFamily: "var(--font-sans)" }}>Daily Upgrade Club</p>
                      <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: 10, fontFamily: "var(--font-sans)" }}>online</p>
                    </div>
                  </div>
                  {/* Chat */}
                  <div style={{ background: "#efeae2", padding: "10px 8px 14px", minHeight: 280, display: "flex", flexDirection: "column", gap: 7 }}>
                    <div style={{ textAlign: "center", marginBottom: 2 }}>
                      <span style={{ fontSize: 10, color: "#667781", background: "rgba(255,255,255,0.85)", padding: "2px 10px", borderRadius: 20, fontFamily: "var(--font-sans)" }}>Today</span>
                    </div>
                    {/* User sends DONE */}
                    <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: 6 }}>
                      <div style={{ background: "#d9fdd3", borderRadius: "8px 8px 0 8px", padding: "8px 12px", maxWidth: "50%", position: "relative" }}>
                        <div style={{ position: "absolute", bottom: 0, right: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #d9fdd3 transparent" }} />
                        <p style={{ margin: 0, color: "#111b21", fontSize: 13, fontWeight: 700, fontFamily: "var(--font-sans)" }}>DONE ✅</p>
                        <p style={{ margin: "3px 0 0", color: "#667781", fontSize: 10, textAlign: "right", fontFamily: "var(--font-sans)" }}>6:07 AM ✓✓</p>
                      </div>
                    </div>
                    {/* Auto tracking reply */}
                    <div style={{ display: "flex", paddingLeft: 6 }}>
                      <div style={{ background: "#fff", borderRadius: "8px 8px 8px 0", padding: "10px 12px", maxWidth: "90%", position: "relative" }}>
                        <div style={{ position: "absolute", bottom: 0, left: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #fff transparent" }} />
                        <p style={{ margin: "0 0 8px", color: "#111b21", fontSize: 12, fontWeight: 600, fontFamily: "var(--font-sans)" }}>Done counted ✅</p>
                        <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                          <p style={{ margin: 0, color: "#52525b", fontSize: 11, fontFamily: "var(--font-sans)" }}>This week: <strong style={{ color: "#111b21" }}>4/7 habits</strong></p>
                          <p style={{ margin: 0, color: "#52525b", fontSize: 11, fontFamily: "var(--font-sans)" }}>This month: <strong style={{ color: "#111b21" }}>12/30 habits</strong></p>
                          <p style={{ margin: 0, color: "#52525b", fontSize: 11, fontFamily: "var(--font-sans)" }}>Current streak: <strong style={{ color: "#1da851" }}>3 days 🔥</strong></p>
                        </div>
                        <p style={{ margin: "8px 0 0", color: "#1da851", fontSize: 11, fontFamily: "var(--font-sans)", fontWeight: 600 }}>Small wins are stacking up.</p>
                        <p style={{ margin: "4px 0 0", color: "#667781", fontSize: 10, textAlign: "right", fontFamily: "var(--font-sans)" }}>6:07 AM</p>
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
