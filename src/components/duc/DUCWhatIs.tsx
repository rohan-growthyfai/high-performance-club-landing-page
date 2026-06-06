const lines = [
  { icon: "📩", bold: "Every day", rest: " — one tiny habit lands in your WhatsApp." },
  { icon: "📊", bold: "Every week", rest: " — a simple scorecard shows your progress." },
  { icon: "🗓️", bold: "Every month", rest: " — one clear theme: Energy, Focus, Sleep, Calmness, Discipline, or Health." },
];

export default function DUCWhatIs() {
  return (
    <section className="py-20 lg:py-28 bg-section-white border-t border-border-subtle">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#25d366] mb-6">What is it</p>
            <h2 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", lineHeight: 1.08, letterSpacing: "-0.025em", fontWeight: 800, color: "#18181b" }}>
              A monthly habit<br />
              <span style={{ color: "#71717a", fontStyle: "italic", fontWeight: 400 }}>subscription</span><br />
              on WhatsApp.
            </h2>
            <div className="mt-8 h-px bg-border-subtle" />
            {/* Updated subheadline — 2 rows */}
            <div className="mt-8 space-y-2 text-foreground-muted text-lg leading-relaxed">
              <p>No separate app. No dashboard. No long video courses.</p>
              <p>Daily Upgrade Club is the simplest possible habit system — delivered through WhatsApp, the app you already use every day.</p>
            </div>
          </div>

          {/* Right — 3 lines */}
          <div className="space-y-0">
            {lines.map((l, i) => (
              <div key={l.bold} className={`flex items-start gap-5 py-7 ${i < lines.length - 1 ? "border-b border-border-subtle" : ""}`}>
                <div className="w-12 h-12 rounded-2xl bg-border-subtle border border-border flex items-center justify-center text-xl flex-shrink-0">
                  {l.icon}
                </div>
                <div>
                  <p className="text-base text-foreground-muted leading-relaxed">
                    <strong className="text-foreground text-lg">{l.bold}</strong>{l.rest}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row — updated labels, no "dashboard" */}
        <div className="mt-16 grid grid-cols-3 gap-4">
          {[
            { label: "No separate app", icon: "🚫" },
            { label: "No login needed", icon: "🔓" },
            { label: "No long lectures", icon: "🎬" },
          ].map(item => (
            <div key={item.label} className="bg-white border border-border-subtle rounded-2xl flex flex-col items-center justify-center gap-3 py-8 px-4">
              <span className="text-2xl">{item.icon}</span>
              <p className="text-sm text-foreground-muted font-medium text-center">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#duc-join" className="btn-primary inline-flex items-center gap-2 px-10 py-5 rounded-full text-lg font-bold">
            Start for ₹99/month →
          </a>
        </div>
      </div>
    </section>
  );
}
