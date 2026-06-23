import { Users } from "lucide-react";

export default function SignupSection() {
  return (
    <section id="signup" className="py-28 lg:py-40 relative">
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-accent/8 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 relative">
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-border shadow-sm">
            <span className="relative flex w-2.5 h-2.5">
              <span className="absolute inline-flex w-full h-full rounded-full animate-ping opacity-75" style={{ background: "#25d366" }} />
              <span className="relative inline-flex w-2.5 h-2.5 rounded-full" style={{ background: "#25d366" }} />
            </span>
            <Users className="w-4 h-4 text-foreground-muted" />
            <span className="text-sm text-foreground-muted">
              <span className="text-foreground font-bold">247</span> people
              joined this week
            </span>
          </div>
        </div>

        <div className="text-center mb-10">
          <p className="text-base uppercase tracking-[0.2em] text-accent font-bold mb-6">
            Final step ✨
          </p>
          <h2 className="font-display text-section-title text-balance text-foreground mb-6">
            Send me the first habit on WhatsApp 🚀
          </h2>
          <p className="text-base sm:text-lg text-foreground-muted leading-relaxed text-center">
            Sign up free and get a tiny starter habit right away.<br />
            Your real Day 1 starts tomorrow morning.
          </p>
        </div>

        <div className="flex justify-center">
          <a
            href="https://wa.me/918956146485?text=Hi%21+I+want+to+start+my+Healthy+Habits+Challenge"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full text-lg sm:text-xl font-bold"
          >
            Join FREE on WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}
