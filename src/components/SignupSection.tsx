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
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-medium leading-[1.1] text-balance text-foreground mb-8">
            Send me
            <br />
            <span className="gradient-text">Day 1</span> 🚀
          </h2>
          <p className="text-2xl sm:text-3xl text-foreground-muted leading-[1.5] mb-6">
            Your first WhatsApp message arrives in <span className="text-foreground font-bold">under 2 minutes.</span>
            <br className="hidden sm:block" />
            <span className="text-foreground-subtle text-xl sm:text-2xl">
              The real challenge starts tomorrow morning. 🌅
            </span>
          </p>

          {/* Hindi emotional anchor — Warikoo pattern */}
          <p className="font-serif italic text-2xl sm:text-3xl text-accent leading-tight">
            Aadat banao. Zindagi badlo.
          </p>
          <p className="text-base text-foreground-subtle mt-2">
            (Make the habit. Change your life.)
          </p>
        </div>

        <SignupForm testimonialVariant={1} />

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-accent text-xl font-bold">100%</span>
            <span className="text-base text-foreground-subtle">Free</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-accent text-xl font-bold">0</span>
            <span className="text-base text-foreground-subtle">Credit card needed</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-accent text-xl font-bold">1-tap</span>
            <span className="text-base text-foreground-subtle">Cancel anytime</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-accent text-xl font-bold">7 days</span>
            <span className="text-base text-foreground-subtle">Total commitment</span>
          </div>
        </div>
      </div>
    </section>
  );
}
