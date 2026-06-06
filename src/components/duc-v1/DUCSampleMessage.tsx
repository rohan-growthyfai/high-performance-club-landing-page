export default function DUCSampleMessage() {
  return (
    <section className="py-20 lg:py-28 relative bg-section-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">Sample message</p>
          <h2 className="font-display text-section-title text-foreground mb-4 text-balance">
            What Your Daily Habit Message Looks Like
          </h2>
        </div>

        {/* WhatsApp mockup */}
        <div className="max-w-sm mx-auto mb-10">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-border-subtle bg-[#0b141a]">
            {/* Header */}
            <div className="bg-[#202c33] px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-sm font-bold text-accent flex-shrink-0">DU</div>
              <div>
                <p className="text-white text-sm font-semibold">Daily Upgrade Club</p>
                <p className="text-white/50 text-xs">online</p>
              </div>
            </div>
            {/* Chat */}
            <div className="p-4 bg-[#0b141a] min-h-[200px]">
              <div className="flex">
                <div className="bg-[#202c33] rounded-lg rounded-tl-none p-4 max-w-[90%] shadow">
                  <p className="text-[#25d366] text-xs font-bold mb-2">🎯 Day 4 — Focus Start Habit</p>
                  <p className="text-white/90 text-sm leading-relaxed mb-3">
                    Before opening Instagram, YouTube, or WhatsApp today, write down your first important task.
                  </p>
                  <p className="text-white/70 text-xs mb-2">Time needed: <strong className="text-white/90">30 seconds.</strong></p>
                  <div className="border-t border-white/10 pt-3 mt-2">
                    <p className="text-white/60 text-xs font-semibold mb-1">Why this helps:</p>
                    <p className="text-white/80 text-xs leading-relaxed">It gives your brain one clear direction before distractions take over.</p>
                  </div>
                  <p className="text-white/80 text-sm mt-3">Once done, reply <strong className="text-white">DONE</strong> ✅</p>
                  <p className="text-white/40 text-[10px] text-right mt-2">6:00 AM ✓✓</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-base text-foreground-muted">Simple enough to do.</p>
          <p className="text-base text-foreground-muted">Clear enough to follow.</p>
          <p className="text-base font-semibold text-foreground">Small enough to repeat.</p>
        </div>
      </div>
    </section>
  );
}
