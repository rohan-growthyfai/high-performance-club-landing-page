import { ArrowRight } from "lucide-react";

const WA_LINK = "https://wa.me/918956146485?text=Hi%21+I+want+to+start+my+Healthy+Habits+Challenge";

export default function InlineSignup({ id }: { id?: string }) {
  return (
    <section id={id} className="py-16 lg:py-20 relative bg-section-white border-y border-border-subtle scroll-mt-20">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">
          Join for free
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3 leading-tight">
          Start your 7-Day Healthy Habits Challenge.
          <br />
          <span className="gradient-text">First habit message in 2 minutes.</span>
        </h2>
        <p className="text-base text-foreground-muted mb-8">
          No app. No login. No credit card. Just open WhatsApp and tap send.
        </p>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full text-lg sm:text-xl font-bold group"
        >
          Join FREE on WhatsApp
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
        <p className="mt-4 text-sm text-foreground-subtle">
          🔒 100% free · no credit card · <span className="font-semibold text-foreground">2,400+ already joined</span>
        </p>
      </div>
    </section>
  );
}
