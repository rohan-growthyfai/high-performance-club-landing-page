import { Users } from "lucide-react";
import SignupForm from "./SignupForm";

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
              <span className="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-75 animate-ping" />
              <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-green-500" />
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
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-balance text-foreground mb-6">
            Send me the first habit on WhatsApp 🚀
          </h2>
          <p className="text-lg sm:text-xl text-foreground-muted leading-relaxed">
            Your confirmation message arrives within 2 minutes. Your Day 1 habit starts immediately after it.
          </p>
        </div>

        <SignupForm formId="final" testimonialVariant={1} />

        <div className="mt-10 flex flex-col items-center gap-1.5 text-center">
          <span className="text-accent text-xl font-bold">100% Free</span>
          <span className="text-base text-foreground-subtle">No credit card. No spam.</span>
          <span className="text-base text-foreground-subtle">Stop anytime.</span>
        </div>
      </div>
    </section>
  );
}
