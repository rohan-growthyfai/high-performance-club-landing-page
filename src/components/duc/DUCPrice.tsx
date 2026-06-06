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
    <section id="duc-join" className="py-20 lg:py-28 relative bg-section-cream scroll-mt-20">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">Simple pricing</p>
          <h2 className="font-display text-section-title text-foreground mb-4 text-balance">
            All This for Just ₹99/month
          </h2>
          <p className="text-lg text-foreground-muted">
            For less than the cost of one café coffee, you get a complete daily habit system on WhatsApp.
          </p>
        </div>

        <div className="premium-card rounded-3xl overflow-hidden border-glow">
          <div className="bg-gradient-to-br from-accent/15 via-accent/5 to-white p-8">

            {/* Price */}
            <div className="text-center mb-8">
              <p className="font-display font-black text-7xl gradient-text tabular-nums leading-none">₹99</p>
              <p className="text-foreground-muted mt-2">per month • Cancel anytime</p>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {included.map(item => (
                <div key={item} className="flex items-center gap-3">
                  <span className="text-green-500 font-bold flex-shrink-0">✅</span>
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="https://rzp.io/l/daily-upgrade-club"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full text-xl font-bold"
            >
              Start Daily Upgrade Club <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-center text-sm text-foreground-subtle mt-4">
              Cancel anytime • No app needed • Delivered on WhatsApp
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
