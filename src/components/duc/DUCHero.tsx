/* eslint-disable @next/next/no-img-element */
import DUCPhone from "./DUCPhone";

const STATS = [
  { n: "1", label: "habit a day" },
  { n: "5min", label: "to complete" },
  { n: "₹99", label: "per month" },
  { n: "30", label: "days / month" },
];

export default function DUCHero() {
  return (
    <section className="relative min-h-[calc(100vh-68px)] flex flex-col justify-center overflow-hidden mesh-bg">

      {/* Soft glow spots */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, #25d366 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #b8853a 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24 w-full">

        {/* Top badge */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#1da851] border border-[#25d366]/30 bg-[#25d366]/8 px-4 py-2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25d366] animate-pulse" />
            WhatsApp Habit Subscription
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <div className="lg:col-span-7">

            {/* Headline */}
            <h1 className="font-display" style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 800, color: "#18181b" }}>
              One habit.<br />
              <span style={{ color: "#1da851" }}>Every day.</span><br />
              <span style={{ color: "#71717a", fontWeight: 400, fontStyle: "italic", fontSize: "0.82em" }}>On WhatsApp.</span>
            </h1>

            {/* Divider */}
            <div className="mt-8 mb-8 h-1 w-16 rounded-full bg-[#25d366]" />

            {/* Subhead */}
            <p className="text-foreground-muted text-lg sm:text-xl leading-relaxed max-w-lg">
              Daily Upgrade Club delivers <strong className="text-foreground">1 tiny habit</strong> every morning, tracks your progress automatically, and keeps you consistent — all inside WhatsApp.
            </p>

            <p className="text-foreground-subtle text-base mt-3">
              No app. No login. No complicated routine.
            </p>

            {/* Trust bullets */}
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {["Cancel anytime", "No app needed", "Daily on WhatsApp", "Under 5 minutes/day"].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-foreground-muted">
                  <span className="text-[#1da851] font-bold">✓</span> {t}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="#duc-join"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold text-white overflow-hidden"
                style={{ background: "linear-gradient(135deg, #1da851 0%, #16a341 100%)", boxShadow: "0 4px 24px rgba(29, 168, 81, 0.35), 0 1px 3px rgba(0,0,0,0.1)" }}
              >
                <span className="relative z-10">Start for ₹99/month</span>
                <span className="relative z-10 text-lg group-hover:translate-x-1 transition-transform">→</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(135deg, #25d366 0%, #1da851 100%)" }} />
              </a>
              <p className="text-foreground-subtle text-sm">Cancel anytime · No lock-in</p>
            </div>

            {/* Stats row */}
            <div className="mt-10 grid grid-cols-4 gap-0 bg-white border border-border-subtle rounded-2xl overflow-hidden shadow-sm">
              {STATS.map((s, i) => (
                <div key={s.label} className={`text-center py-5 ${i < STATS.length - 1 ? "border-r border-border-subtle" : ""}`}>
                  <p className="font-display text-xl sm:text-2xl font-black text-foreground tabular-nums" style={{ letterSpacing: "-0.02em" }}>{s.n}</p>
                  <p className="text-[10px] sm:text-xs text-foreground-subtle mt-1 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT — iPhone */}
          <div className="lg:col-span-5 flex justify-center mt-8 lg:mt-0">
            <div className="relative">
              <div className="absolute inset-0 blur-3xl opacity-20 scale-75 pointer-events-none" style={{ background: "radial-gradient(circle, #25d366 0%, transparent 70%)" }} />
              <div className="relative z-10">
                <DUCPhone />
              </div>
              {/* Floating DONE label */}
              <div className="absolute -left-4 lg:-left-20 top-1/4 hidden lg:block z-20">
                <div className="bg-white border border-border-subtle rounded-2xl px-4 py-3 shadow-lg">
                  <p className="text-[#1da851] font-bold text-sm">DONE ✅</p>
                  <p className="text-foreground-subtle text-xs mt-0.5">streak: 7 days 🔥</p>
                </div>
              </div>
              {/* Sticky note */}
              <div className="absolute -right-2 lg:-right-10 bottom-1/4 hidden lg:block z-20 sticky-note px-4 py-3 rounded-lg tilt-right">
                <p className="font-serif italic text-amber-900 text-sm">₹99/month 📱</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
