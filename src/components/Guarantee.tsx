import { Shield, Lock, X, Phone } from "lucide-react";

const promises = [
  {
    icon: Lock,
    title: "No hidden charges",
    body: "Everything you see is what you get. Nothing is locked behind a paywall. No surprises.",
  },
  {
    icon: X,
    title: "No spam, no resells",
    body: "We send WhatsApp messages for 7 days + one optional weekly newsletter. That's it. We never sell or share your number.",
  },
  {
    icon: Phone,
    title: "No phone calls",
    body: "No 'discovery calls'. No sales pressure. No coach calling to qualify you. It's a WhatsApp drip — and you control it.",
  },
  {
    icon: Shield,
    title: "One-tap exit",
    body: "Hate it? Reply STOP to any message. Done. You're out. We won't message you again.",
  },
];

export default function Guarantee() {
  return (
    <section className="py-28 lg:py-40 relative bg-section-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl premium-card p-10 sm:p-12 lg:p-16 border-glow">
          <div
            aria-hidden="true"
            className="absolute -top-10 -right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
          />

          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <p className="text-base uppercase tracking-[0.2em] text-accent font-bold">
                Our zero-risk promise 🛡️
              </p>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-balance text-foreground mb-8">
              You literally have
              <br />
              <span className="italic font-light">nothing to lose.</span>
            </h2>

            <p className="text-base sm:text-2xl text-foreground-muted leading-relaxed mb-12 max-w-2xl">
              Here is exactly what we promise you:
            </p>

            <div className="grid sm:grid-cols-2 gap-7">
              {promises.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-2 text-lg">
                        {p.title}
                      </p>
                      <p className="text-base text-foreground-muted leading-relaxed">
                        {p.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Hormozi God-Mode commitment guarantee */}
            <div className="mt-14 pt-10 border-t border-border-subtle">
              <div className="bg-accent/8 border-2 border-accent/30 rounded-2xl p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="text-4xl flex-shrink-0">🤝</span>
                  <div>
                    <p className="text-base uppercase tracking-[0.15em] text-accent font-bold mb-3">
                      Plus — our personal commitment
                    </p>
                    <p className="font-serif text-xl sm:text-2xl text-foreground italic leading-snug mb-4">
                      &ldquo;Do all 7 days. If you don&apos;t feel any different — reply CALL on WhatsApp. I&apos;ll get on a free 30-minute call with you and we will fix it together.&rdquo;
                    </p>
                    <p className="text-base text-foreground-muted">
                      — Rohan, Founder of High Performance Club
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 text-center">
              <p className="font-serif text-2xl sm:text-3xl italic text-foreground mb-3">
                Worst case scenario:
              </p>
              <p className="text-foreground-muted leading-relaxed max-w-xl mx-auto text-xl">
                You spend 35 minutes over 7 days, pick up 1 or 2 habits
                that stay with you for life, and never hear from us again.
                That&apos;s the worst that can happen.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 pt-14 pb-2">
          <p className="text-base text-foreground-muted text-center max-w-md">Nothing to lose. Everything to gain. Join in 30 seconds.</p>
          <a href="#signup-1" className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full text-lg sm:text-xl font-bold">
            YES, I AM IN!!
          </a>
        </div>
      </div>
    </section>
  );
}
