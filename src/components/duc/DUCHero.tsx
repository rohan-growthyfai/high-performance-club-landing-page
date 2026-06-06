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
    <section className="relative overflow-hidden mesh-bg py-12 lg:py-16">

      {/* Glow spots */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #25d366 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-32 -right-20 w-[400px] h-[400px] rounded-full opacity-8" style={{ background: "radial-gradient(circle, #b8853a 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12 xl:gap-16">

          {/* LEFT — all copy */}
          <div className="flex-1 min-w-0">

            {/* Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#1da851] border border-[#25d366]/30 bg-[#25d366]/8 px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25d366] animate-pulse" />
                WhatsApp Habit Subscription
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display" style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 800, color: "#18181b" }}>
              One habit.<br />
              <span style={{ color: "#1da851" }}>Every day.</span><br />
              <span style={{ color: "#71717a", fontWeight: 400, fontStyle: "italic", fontSize: "0.82em" }}>On WhatsApp.</span>
            </h1>

            {/* Green divider */}
            <div className="mt-6 mb-6 h-1 w-14 rounded-full bg-[#25d366]" />

            {/* Body */}
            <p className="text-foreground-muted text-lg leading-relaxed max-w-lg">
              Daily Upgrade Club delivers <strong className="text-foreground">1 tiny habit</strong> every morning, tracks your progress automatically, and keeps you consistent — all inside WhatsApp.
            </p>
            <p className="text-foreground-subtle text-sm mt-2">
              No app. No login. No complicated routine.
            </p>

            {/* Trust bullets */}
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
              {["Cancel anytime", "No app needed", "Daily on WhatsApp", "Under 5 minutes/day"].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-foreground-muted">
                  <span className="text-[#1da851] font-bold">✓</span> {t}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="#duc-join"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold text-white overflow-hidden"
                style={{ background: "linear-gradient(135deg, #1da851 0%, #16a341 100%)", boxShadow: "0 4px 20px rgba(29,168,81,0.35)" }}
              >
                <span className="relative z-10">Start for ₹99/month</span>
                <span className="relative z-10 text-lg group-hover:translate-x-1 transition-transform">→</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(135deg, #25d366, #1da851)" }} />
              </a>
              <p className="text-foreground-subtle text-sm">Cancel anytime · No lock-in</p>
            </div>

            {/* Stats row */}
            <div className="mt-8 grid grid-cols-4 bg-white border border-border-subtle rounded-2xl overflow-hidden shadow-sm max-w-lg">
              {STATS.map((s, i) => (
                <div key={s.label} className={`text-center py-4 ${i < STATS.length - 1 ? "border-r border-border-subtle" : ""}`}>
                  <p className="font-display text-lg sm:text-xl font-black text-foreground tabular-nums" style={{ letterSpacing: "-0.02em" }}>{s.n}</p>
                  <p className="text-[10px] text-foreground-subtle mt-0.5 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT — iPhone, hidden on mobile, shown on lg+ */}
          <div className="hidden lg:flex flex-shrink-0 justify-center items-start relative mt-4" style={{ width: 300 }}>
            <div className="absolute inset-0 blur-3xl opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #25d366 0%, transparent 70%)" }} />
            <div className="relative z-10">
              <DUCPhone />
            </div>
            {/* DONE label */}
            <div className="absolute -left-16 top-1/3 z-20">
              <div className="bg-white border border-border-subtle rounded-xl px-3 py-2 shadow-lg">
                <p className="text-[#1da851] font-bold text-sm">DONE ✅</p>
                <p className="text-foreground-subtle text-xs mt-0.5">streak: 7 days 🔥</p>
              </div>
            </div>
            {/* Sticky note */}
            <div className="absolute -right-8 bottom-1/3 z-20 sticky-note px-3 py-2 rounded-lg tilt-right">
              <p className="font-serif italic text-amber-900 text-sm">₹99/month 📱</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
