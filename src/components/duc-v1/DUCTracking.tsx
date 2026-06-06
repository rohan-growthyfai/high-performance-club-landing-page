export default function DUCTracking() {
  return (
    <section className="py-20 lg:py-28 relative bg-section-cream">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">Zero apps needed</p>
        <h2 className="font-display text-section-title text-foreground mb-6 text-balance">
          Track Your Progress Without Any App
        </h2>
        <p className="text-lg text-foreground-muted mb-10 max-w-xl mx-auto">
          You don&apos;t need to download another habit tracker. Just complete your habit and reply:
        </p>

        {/* DONE bubble */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center justify-center bg-accent text-white font-display font-black text-5xl sm:text-6xl px-14 py-8 rounded-3xl shadow-xl">
            DONE
          </div>
        </div>

        <p className="text-base text-foreground-muted mb-10">We&apos;ll track your progress for you.</p>

        {/* Example reply card */}
        <div className="max-w-xs mx-auto">
          <div className="bg-[#202c33] rounded-2xl rounded-tl-none p-5 text-left shadow-xl">
            <p className="text-white text-sm font-medium mb-4">Done counted ✅</p>
            <div className="space-y-2 border-t border-white/10 pt-4">
              <p className="text-white/75 text-sm">This week: <strong className="text-white">4/7 habits completed</strong></p>
              <p className="text-white/75 text-sm">This month: <strong className="text-white">12/30 habits completed</strong></p>
              <p className="text-white/75 text-sm">Current streak: <strong className="text-white">3 days</strong></p>
            </div>
            <p className="text-[#25d366] text-sm mt-4 font-medium">Small wins are stacking up 🔥</p>
          </div>
        </div>

        <p className="mt-10 text-base font-medium text-foreground">This turns WhatsApp into your simple daily habit tracker.</p>
      </div>
    </section>
  );
}
