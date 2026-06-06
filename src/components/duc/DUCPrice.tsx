import { ArrowRight } from "lucide-react";

const included = [
  "30 tiny daily habits",
  "One monthly focus theme",
  "Daily DONE tracking",
  "Weekly progress scorecard",
  "High Performance Newsletter",
  "Monthly Habit PDF Guide",
  "Monthly Habit Calendar",
  "Growing Habit Vault access",
  "Private Accountability Group",
];

export default function DUCPrice() {
  return (
    <section id="duc-join" className="py-24 lg:py-32 bg-section-cream border-t border-border-subtle scroll-mt-8">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#25d366] mb-6">Pricing</p>
          <p style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 800, color: "#18181b" }}>
            Less than one cup of<br />
            <span style={{ color: "#71717a", fontStyle: "italic", fontWeight: 400 }}>coffee a month.</span>
          </p>
        </div>

        {/* Pricing card */}
        <div className="relative rounded-3xl overflow-hidden border border-green-200 bg-white shadow-lg">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: "linear-gradient(90deg, #25d366, #1da851)" }} />

          <div className="p-8 sm:p-10 pt-10">
            {/* Price */}
            <div className="flex items-end gap-3 mb-8">
              <p className="font-display font-black" style={{ fontSize: "6rem", lineHeight: 1, letterSpacing: "-0.04em", color: "#1da851" }}>₹99</p>
              <div className="mb-3">
                <p className="text-foreground text-lg font-semibold">/month</p>
                <p className="text-foreground-muted text-sm">Cancel anytime</p>
              </div>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {included.map(item => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.3)" }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#25d366]" />
                  </div>
                  <span className="text-[#52525b] text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="https://rzp.io/l/daily-upgrade-club"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl text-base font-bold text-black transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #25d366 0%, #1da851 100%)", boxShadow: "0 0 40px rgba(37,211,102,0.4), 0 4px 16px rgba(0,0,0,0.5)" }}
            >
              Start Daily Upgrade Club <ArrowRight className="w-5 h-5" />
            </a>

            <p className="text-center text-foreground-subtle text-xs mt-4">
              Cancel anytime · No app needed · Starts on WhatsApp
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
