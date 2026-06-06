export default function DUCFinalCTA() {
  return (
    <section className="py-24 lg:py-40 bg-section-cream border-t border-border-subtle relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #25d366 0%, transparent 70%)" }} />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">

        {/* Headline */}
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#25d366] mb-8">Start today</p>
        <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.02, letterSpacing: "-0.03em", fontWeight: 800, color: "#18181b" }}>
          One habit.<br />
          Every day.<br />
          <span style={{ color: "#25d366" }}>₹99/month.</span>
        </h2>

        <p className="text-[#71717a] text-lg leading-relaxed mt-8 max-w-xl mx-auto">
          You don&apos;t need another app. You need one small habit daily, a simple way to track it, and a system that shows up for you.
        </p>

        {/* Feature list — horizontal */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8">
          {["Daily habits", "DONE tracking", "Weekly scorecards", "Monthly themes", "PDF guides", "Private group"].map(f => (
            <span key={f} className="text-sm text-[#71717a] flex items-center gap-1.5">
              <span className="text-[#25d366]">·</span> {f}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <a
            href="https://rzp.io/l/daily-upgrade-club"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-full text-lg font-bold text-white transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #25d366 0%, #1da851 100%)", boxShadow: "0 0 48px rgba(37,211,102,0.45), 0 4px 24px rgba(0,0,0,0.5)" }}
          >
            Join Daily Upgrade Club
            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <p className="text-foreground-subtle text-sm">Cancel anytime · No app needed · Starts instantly</p>
        </div>
      </div>
    </section>
  );
}
