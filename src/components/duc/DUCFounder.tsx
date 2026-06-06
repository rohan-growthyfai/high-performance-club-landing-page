/* eslint-disable @next/next/no-img-element */
export default function DUCFounder() {
  return (
    <section className="py-24 lg:py-32 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        {/* Pull quote style */}
        <div className="relative">
          <div className="absolute -left-4 lg:-left-12 top-0 bottom-0 w-px bg-[#25d366]/30" />

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#25d366] mb-8">From the founder</p>

          <div className="space-y-5 text-[#888] text-lg leading-relaxed">
            <p>Most people don&apos;t fail because they lack information.</p>
            <p>They fail because they <span className="text-white">forget, overthink</span>, or try to change everything at once.</p>
            <p className="text-white font-medium">Daily Upgrade Club is built for real life.</p>
          </div>

          {/* 5 lines */}
          <div className="mt-10 grid grid-cols-1 gap-0">
            {[
              "One tiny habit.",
              "One daily reminder.",
              "One DONE reply.",
              "One weekly scorecard.",
              "All on WhatsApp.",
            ].map((line, i) => (
              <div key={line} className={`py-4 border-b border-white/5 flex items-center gap-4 ${i === 4 ? "border-b-0" : ""}`}>
                <span className="text-[#25d366] font-bold font-display text-sm tabular-nums" style={{ letterSpacing: "-0.02em" }}>0{i + 1}</span>
                <p className="text-white font-medium text-base">{line}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-white/5">
            <p className="text-[#555] text-base italic mb-6">No pressure. No perfection. Just daily momentum.</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                <img src="/hpc-logo.png" alt="Rohan" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Rohan</p>
                <p className="text-[#555] text-xs">Founder, High Performance Club</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
