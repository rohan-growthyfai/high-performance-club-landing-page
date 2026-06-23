import { Award } from "lucide-react";

export default function CertificateReveal() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-section-white">
      {/* Floating confetti */}
      <span className="emoji-deco float-1 top-20 left-10 text-4xl hidden lg:block" aria-hidden="true">🎉</span>
      <span className="emoji-deco float-2 top-32 right-12 text-3xl hidden lg:block" aria-hidden="true">✨</span>
      <span className="emoji-deco float-1 bottom-28 left-16 text-4xl hidden lg:block" aria-hidden="true">🏆</span>
      <span className="emoji-deco float-2 bottom-20 right-20 text-3xl hidden lg:block" aria-hidden="true">⭐</span>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left — copy */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6">
              <Award className="w-5 h-5 text-accent" />
              <span className="text-base font-bold text-accent uppercase tracking-wider">
                Yes! There&apos;s a prize 🏆
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] text-foreground mb-6">
              Finish the challenge.
              <br />
              <span className="italic font-medium gradient-text">Get your certificate.</span>
            </h2>

            <p className="text-base sm:text-2xl text-foreground-muted leading-relaxed mb-6">
              Complete at least <span className="highlight-yellow font-bold text-foreground">5 out of 7 days</span> and receive your{" "}
              <span className="font-semibold text-foreground">7-Day Habits Starter Certificate</span>.
            </p>

            <p className="text-sm sm:text-lg text-foreground-muted leading-relaxed mb-10">
              Print it. Frame it. Put it on your desk.
              It shows that you did this for yourself. 🥹
            </p>

            <a
              href="https://wa.me/918956146485?text=Hi%21+I+want+to+start+my+Healthy+Habits+Challenge" target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 sm:px-10 sm:py-5 rounded-full text-lg sm:text-xl w-full sm:w-auto justify-center"
            >
              I Want My Certificate →
            </a>
          </div>

          {/* Right — premium certificate */}
          <div className="lg:col-span-7 relative flex justify-center">

            {/* Sticky note */}
            <div className="absolute -top-8 -left-2 lg:-left-6 z-20 sticky-note p-3 rounded-md tilt-left hidden sm:block" style={{ width: 148, height: 72 }}>
              <p className="font-serif italic text-xs text-amber-900 leading-snug">
                Finish at least 5 days &amp; this is yours!
              </p>
            </div>

            {/* Earned badge */}
            <div className="absolute -top-3 -right-3 lg:-right-5 z-20 rotate-12">
              <div className="bg-accent text-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-xl pulse-glow">
                <span className="text-2xl">🎉</span>
                <span className="text-[10px] font-bold uppercase">Yours</span>
              </div>
            </div>

            {/* THE CERTIFICATE */}
            <div
              className="rotate-[-1.5deg] hover:rotate-0 transition-transform duration-700 w-full max-w-[280px] sm:max-w-lg"
              style={{
                background: "linear-gradient(145deg, #fdfbf4 0%, #faf6e8 50%, #fdfbf4 100%)",
                border: "1px solid #d4b896",
                borderRadius: 4,
                boxShadow: [
                  "0 0 0 6px #f5efe0",
                  "0 0 0 7px #c9a96e",
                  "0 0 0 9px #f5efe0",
                  "0 0 0 10px #c9a96e44",
                  "0 32px 80px -16px rgba(180,130,60,0.35)",
                  "0 8px 24px rgba(0,0,0,0.15)",
                ].join(", "),
                padding: "clamp(12px, 3vw, 40px) clamp(12px, 3vw, 44px) clamp(10px, 3vw, 36px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Corner ornaments — top left */}
              <CornerOrnament position="top-left" />
              <CornerOrnament position="top-right" />
              <CornerOrnament position="bottom-left" />
              <CornerOrnament position="bottom-right" />

              {/* Watermark seal */}
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 200,
                height: 200,
                borderRadius: "50%",
                border: "2px solid rgba(184,133,58,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}>
                <div style={{
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  border: "1px solid rgba(184,133,58,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}>
                  <span style={{ fontSize: 48, opacity: 0.06 }}>🏆</span>
                </div>
              </div>

              {/* Top accent line */}
              <div style={{
                background: "linear-gradient(90deg, transparent 0%, #c9a96e 30%, #b8853a 50%, #c9a96e 70%, transparent 100%)",
                height: 2,
                marginBottom: 20,
              }} />

              {/* Organization name */}
              <p style={{
                textAlign: "center",
                fontSize: 9,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#b8853a",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                marginBottom: 6,
              }}>
                High Performance Club
              </p>

              {/* Certificate of Completion */}
              <p style={{
                textAlign: "center",
                fontSize: 22,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#1a1a1a",
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                marginBottom: 4,
              }}>
                Certificate
              </p>
              <p style={{
                textAlign: "center",
                fontSize: 11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#6b5a3e",
                fontFamily: "var(--font-sans)",
                marginBottom: 16,
              }}>
                of Completion
              </p>

              {/* Thin divider with diamonds */}
              <GoldDivider />

              {/* Awarded to */}
              <p style={{
                textAlign: "center",
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#8a7055",
                fontFamily: "var(--font-sans)",
                marginTop: 16,
                marginBottom: 8,
              }}>
                This certificate is proudly awarded to
              </p>

              {/* Recipient name */}
              <p style={{
                textAlign: "center",
                fontSize: 32,
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontStyle: "italic",
                color: "#1a1208",
                letterSpacing: "-0.01em",
                marginBottom: 14,
                lineHeight: 1.2,
              }}>
                [ Your Name ]
              </p>

              {/* Thin divider */}
              <div style={{
                width: 200,
                margin: "0 auto 14px",
                height: 1,
                background: "linear-gradient(90deg, transparent, #c9a96e, transparent)",
              }} />

              {/* Description */}
              <p style={{
                textAlign: "center",
                fontSize: 10.5,
                letterSpacing: "0.08em",
                color: "#6b5a3e",
                fontFamily: "var(--font-sans)",
                marginBottom: 6,
                lineHeight: 1.6,
              }}>
                for successfully completing the
              </p>

              <p style={{
                textAlign: "center",
                fontSize: 15,
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                color: "#1a1208",
                letterSpacing: "0.02em",
                marginBottom: 4,
                lineHeight: 1.4,
              }}>
                7 Day Habits
              </p>
              <p style={{
                textAlign: "center",
                fontSize: 15,
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                color: "#1a1208",
                letterSpacing: "0.02em",
                marginBottom: 6,
              }}>
                WhatsApp Challenge
              </p>

              <p style={{
                textAlign: "center",
                fontSize: 9.5,
                color: "#8a7055",
                fontFamily: "var(--font-sans)",
                letterSpacing: "0.1em",
                marginBottom: 18,
              }}>
                demonstrating exceptional commitment to personal growth
              </p>

              {/* Bottom divider with diamonds */}
              <GoldDivider />

              {/* Signature row */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginTop: 18,
              }}>
                {/* Seal */}
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, #fdf3d8 0%, #f5e4b0 100%)",
                  border: "2px solid #c9a96e",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(184,133,58,0.25), inset 0 1px 0 rgba(255,255,255,0.5)",
                }}>
                  <span style={{ fontSize: 22 }}>⭐</span>
                  <p style={{ fontSize: 6, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a6428", fontWeight: 700, fontFamily: "var(--font-sans)", marginTop: 1 }}>HPC</p>
                </div>

                {/* Date */}
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 100, height: 1, background: "#c9a96e88", marginBottom: 4 }} />
                  <p style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8a7055", fontFamily: "var(--font-sans)" }}>Date</p>
                </div>

                {/* Signature */}
                <div style={{ textAlign: "center" }}>
                  <p style={{
                    fontSize: 20,
                    fontFamily: "Georgia, serif",
                    fontStyle: "italic",
                    color: "#1a1208",
                    lineHeight: 1,
                    marginBottom: 3,
                  }}>
                    Rohan
                  </p>
                  <div style={{ width: 100, height: 1, background: "#c9a96e88", marginBottom: 4 }} />
                  <p style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8a7055", fontFamily: "var(--font-sans)" }}>Founder, HPC</p>
                </div>
              </div>

              {/* Bottom accent line */}
              <div style={{
                background: "linear-gradient(90deg, transparent 0%, #c9a96e 30%, #b8853a 50%, #c9a96e 70%, transparent 100%)",
                height: 2,
                marginTop: 18,
              }} />

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function GoldDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "0 auto", justifyContent: "center" }}>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #c9a96e)" }} />
      <span style={{ color: "#c9a96e", fontSize: 10 }}>✦</span>
      <span style={{ color: "#b8853a", fontSize: 14 }}>◆</span>
      <span style={{ color: "#c9a96e", fontSize: 10 }}>✦</span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #c9a96e, transparent)" }} />
    </div>
  );
}

function CornerOrnament({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const isTop = position.includes("top");
  const isLeft = position.includes("left");
  const style: React.CSSProperties = {
    position: "absolute",
    top: isTop ? 10 : undefined,
    bottom: !isTop ? 10 : undefined,
    left: isLeft ? 10 : undefined,
    right: !isLeft ? 10 : undefined,
    width: 36,
    height: 36,
    pointerEvents: "none",
    opacity: 0.7,
  };

  const borderStyle = {
    borderTop: isTop ? "2px solid #c9a96e" : undefined,
    borderBottom: !isTop ? "2px solid #c9a96e" : undefined,
    borderLeft: isLeft ? "2px solid #c9a96e" : undefined,
    borderRight: !isLeft ? "2px solid #c9a96e" : undefined,
  };

  return (
    <div style={{ ...style, ...borderStyle }} />
  );
}
