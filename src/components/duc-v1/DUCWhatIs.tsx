export default function DUCWhatIs() {
  return (
    <section className="py-20 lg:py-28 relative bg-section-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">What is it?</p>
        <h2 className="font-display text-section-title text-foreground mb-8 text-balance">
          What is Daily Upgrade Club?
        </h2>

        <div className="text-left space-y-5 text-lg text-foreground leading-relaxed bg-white border border-border-subtle rounded-2xl p-8 shadow-sm mb-10">
          <p>Daily Upgrade Club is a <strong>monthly WhatsApp habit subscription</strong> designed to help you build better habits consistently.</p>
          <p>Every day, you receive one tiny habit on WhatsApp.</p>
          <p>Every week, you see your progress.</p>
          <p>Every month, you follow one clear theme like <strong>Energy, Health, Focus, Calmness, Sleep, or Discipline</strong>.</p>

          <div className="border-t border-border-subtle pt-5 space-y-1 text-foreground-muted">
            <p>No separate app.</p>
            <p>No dashboard login.</p>
            <p>No long lectures.</p>
          </div>

          <p className="text-foreground font-medium">Just one small habit a day — directly on WhatsApp.</p>
        </div>

        <a href="#duc-join" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dim transition-all text-white font-bold text-lg sm:text-xl px-10 py-5 rounded-full shadow-lg hover:-translate-y-0.5">
          Start for ₹99/month →
        </a>
      </div>
    </section>
  );
}
