import { ArrowRight } from "lucide-react";

export default function PostScript() {
  return (
    <section className="py-28 lg:py-40 relative bg-section-white">
      <span className="emoji-deco float-1 top-20 right-8 text-4xl hidden lg:block" aria-hidden="true">💌</span>

      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="relative">
          <p className="absolute -top-12 -left-4 lg:-left-12 font-serif text-9xl text-accent/20 leading-none select-none">
            &ldquo;
          </p>

          <p className="text-base uppercase tracking-[0.2em] text-accent font-bold mb-8">
            One last thing 💛
          </p>

          <div className="space-y-5 text-base sm:text-lg text-foreground-muted leading-relaxed">
            <p>
              You&apos;ve probably watched the videos.<br />
              Saved the posts.<br />
              Planned the routines.
            </p>
            <p>
              But the gap between knowing and doing is where most people get stuck.
            </p>
            <p>
              That&apos;s why this challenge is simple:
            </p>
            <p className="text-foreground font-medium">
              7 days.<br />
              Less than 5 minutes a day.<br />
              Free.<br />
              Delivered on WhatsApp.
            </p>
            <p className="text-foreground font-serif italic text-lg sm:text-2xl leading-relaxed my-4">
              Worst case: you spend 35 minutes (7 days X 5 mins 🫠) and learn a few simple habits.
              <br />
              Best case: you find one habit that stays with you for life.
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-5">
            <a
              href="https://wa.me/918956146485?text=Hi%21+I+want+to+start+my+Healthy+Habits+Challenge" target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 sm:px-10 sm:py-5 rounded-full text-base sm:text-xl w-full sm:w-auto"
            >
              Join for Free
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-base sm:text-lg text-foreground-subtle italic text-center sm:text-left">
              See you in your WhatsApp in 2 minutes. 👋
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
