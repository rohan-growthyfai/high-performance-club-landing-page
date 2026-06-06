export default function DUCVault() {
  const guides = ["Energy Reset", "Focus Reset", "Health Reset", "Calmness Reset", "Sleep Reset", "Discipline Reset"];
  return (
    <section className="py-24 lg:py-32 bg-[#0f0f0f] border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#25d366] mb-6">Habit library</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 800, color: "#fafafa" }}>
              Your habits<br />
              <span style={{ color: "#444", fontStyle: "italic", fontWeight: 400 }}>compound over time.</span>
            </h2>
            <p className="text-[#666] text-lg leading-relaxed mt-6">
              Every month you get a clean PDF of all 30 habits. Save it. Revisit it. Build your personal habit library.
            </p>
            <p className="text-[#444] text-sm mt-4">The Habit Vault grows the longer you stay.</p>
          </div>

          {/* Vault visual */}
          <div className="space-y-2">
            {guides.map((g, i) => (
              <div key={g} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${i === 0 ? "border-[#25d366]/30 bg-[#25d366]/5" : "border-white/5 bg-[#111] hover:bg-[#141414]"}`}>
                <div className={`w-8 h-10 rounded-md flex items-center justify-center text-sm flex-shrink-0 ${i === 0 ? "bg-[#25d366]" : "bg-white/5"}`}>
                  📘
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${i === 0 ? "text-white" : "text-[#888]"}`}>{g} Habit Guide</p>
                  <p className="text-[#444] text-xs mt-0.5">30 habits · PDF · Month {i + 1}</p>
                </div>
                {i === 0 && <span className="text-[#25d366] text-xs font-bold border border-[#25d366]/30 rounded-full px-2 py-0.5">Current</span>}
                {i > 0 && <div className="w-4 h-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-[#444]" /></div>}
              </div>
            ))}
            <div className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-white/8">
              <div className="w-8 h-10 rounded-md bg-white/3 flex items-center justify-center text-sm">+</div>
              <p className="text-[#444] text-sm">More themes added every month</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
