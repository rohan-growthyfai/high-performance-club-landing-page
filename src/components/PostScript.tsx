import { ArrowRight } from "lucide-react";

/**
 * Brunson rule: every sales page ends with P.S. + P.P.S.
 * - P.S. restates the OFFER (one sentence)
 * - P.P.S. restates URGENCY or RISK REVERSAL (one sentence)
 *
 * Eye-tracking studies show readers who skim often jump to P.S. lines.
 * These are some of the most-read elements on a long page.
 */

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

          <div className="space-y-7 text-2xl sm:text-3xl text-foreground-muted leading-[1.55]">
            <p>
              If you&apos;ve read this far, you probably need this more than you think. 🫂
            </p>
            <p>
              You&apos;ve watched the videos. You&apos;ve saved the posts.
              You know what you should do. You&apos;ve also quit a hundred things.
            </p>
            <p>
              The gap between knowing and doing? That&apos;s the whole reason this challenge exists.
            </p>
            <p>
              7 days. 5-10 minutes a day. Zero risk. Free. Plus a certificate. 🏆
            </p>
            <p className="text-foreground font-serif italic text-3xl sm:text-4xl leading-[1.3] my-10">
              Worst case: you waste 35 minutes.
              <br />
              Best case: you find 1 habit you keep for life.
            </p>
            <p>
              Either way, it beats closing this tab and going back to scrolling. 😉
            </p>
          </div>

          <div className="mt-14 flex flex-col sm:flex-row sm:items-center gap-5">
            <a
              href="#signup"
              className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full text-xl"
            >
              Join for <span className="font-extrabold">FREE</span> →
            </a>
            <p className="text-lg text-foreground-subtle italic">
              See you in your WhatsApp in 2 minutes. 👋
            </p>
          </div>

          {/* P.S. + P.P.S. — Brunson signature close */}
          <div className="mt-20 pt-12 border-t border-border-subtle space-y-8">
            <div>
              <p className="font-serif text-2xl text-foreground leading-[1.55]">
                <span className="text-accent font-bold">P.S.</span>{" "}
                If you commit to just{" "}
                <span className="font-bold">5 minutes a day for 7 days</span>,
                you&apos;ll get 7 unusual high-performance habits delivered on
                WhatsApp, your Day 7 personalized report, a private member
                community, and your{" "}
                <span className="highlight-yellow font-bold">
                  High Performance Lifestyle Starter Certificate
                </span>{" "}
                — all 100% free.
              </p>
            </div>

            <div>
              <p className="font-serif text-2xl text-foreground leading-[1.55]">
                <span className="text-accent font-bold">P.P.S.</span>{" "}
                Remember — if you finish all 7 days and don&apos;t feel
                meaningfully more in control,{" "}
                <span className="italic">Rohan will personally hop on a free 30-minute call with you</span>{" "}
                to figure out what went wrong. You have nothing to lose, and a
                potentially life-changing habit to gain. The only question is —
                will today be the day you finally start? 🌅
              </p>
            </div>

            <div className="pt-6">
              <a
                href="#signup"
                className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full text-xl"
              >
                Join for <span className="font-extrabold">FREE</span> →
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
