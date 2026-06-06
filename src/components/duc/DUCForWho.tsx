const forYou = [
  "You want better habits but apps make it complicated",
  "You check WhatsApp more than any other app",
  "You want accountability without group pressure",
  "You prefer small daily actions over big lifestyle overhauls",
  "You want Energy, Focus, Health, Calmness, Sleep, Discipline — all in one system",
  "You want to spend ₹99 better than you spend it on chai",
];

const notForYou = [
  "You want overnight transformation",
  "You don't want WhatsApp messages",
  "You want 1-on-1 personal coaching",
  "You want a strict gym or diet plan",
  "You won't do even one tiny habit daily",
  "You're looking for long video courses",
];

export default function DUCForWho() {
  return (
    <section className="py-24 lg:py-32 bg-[#0f0f0f] border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#25d366] mb-6">Honest fit check</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 800, color: "#fafafa" }}>
            Is this for you?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-px bg-white/5 rounded-3xl overflow-hidden">
          {/* For you */}
          <div className="bg-[#0f0f0f] p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#25d366] mb-6">This is for you if…</p>
            <div className="space-y-4">
              {forYou.map(item => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.25)" }}>
                    <span className="text-[#25d366] text-[10px]">✓</span>
                  </div>
                  <p className="text-[#888] text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Not for you */}
          <div className="bg-[#0a0a0a] p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400 mb-6">This is not for you if…</p>
            <div className="space-y-4">
              {notForYou.map(item => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-red-500/10 border border-red-500/20">
                    <div className="w-2 h-0.5 bg-red-400 rounded-full" />
                  </div>
                  <p className="text-[#555] text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-[#444] text-xs italic leading-relaxed">This is simple, but it still needs participation. We send the habit. You do the habit. That&apos;s where the momentum begins.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
