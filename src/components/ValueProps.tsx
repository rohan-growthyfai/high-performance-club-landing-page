/* eslint-disable @next/next/no-img-element */
import { Check } from "lucide-react";

/**
 * ValueProps — "Three Shifts in 7 days" in a COMPACT zig-zag.
 *
 * Redesigned to be much shorter than the old version: smaller image, tight
 * eyebrow + headline + a 3-point benefit checklist per shift, alternating
 * sides. Far less scrolling; users grasp all three shifts quickly.
 */

const props = [
  {
    eyebrow: "Shift 1 · More Energy",
    title: "Wake up and actually feel awake",
    points: [
      "Steady energy that lasts all day",
      "No more 3pm crash or coffee dependence",
      "One tiny morning habit — under 5 minutes",
    ],
    img: "/value/energy.png",
  },
  {
    eyebrow: "Shift 2 · Better Health",
    title: "Feel lighter and healthier",
    points: [
      "Small daily habits that are kind to your body",
      "No hard diets, no gym, no overwhelm",
      "Easy steps that fit your real, busy life",
    ],
    img: "/value/health.png",
  },
  {
    eyebrow: "Shift 3 · Calm & Sleep",
    title: "Relax and sleep deeper",
    points: [
      "Calm your busy mind in under a minute",
      "Fall asleep faster, wake up refreshed",
      "Simple night habits — no screens, no stress",
    ],
    img: "/value/sleep.png",
  },
];

export default function ValueProps() {
  return (
    <section className="py-14 lg:py-20 bg-section-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 lg:mb-14">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">
            What you get
          </p>
          <h2 className="font-display text-section-title text-balance text-foreground">
            Three Shifts in <span className="gradient-text">7 days</span>.
          </h2>
        </div>

        <div className="flex flex-col gap-8 lg:gap-10">
          {props.map((p, i) => {
            const imgFirst = i % 2 === 0;
            return (
              <div
                key={p.title}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-center rounded-3xl border border-border-subtle bg-white shadow-sm p-5 sm:p-6 lg:p-7"
              >
                {/* IMAGE — sits inside a premium green gradient frame (photo
                    floats on the gradient with padding, like a polished card) */}
                <div className={`${imgFirst ? "md:order-1" : "md:order-2"}`}>
                  <div
                    className="relative rounded-3xl overflow-hidden aspect-[16/11] p-4 sm:p-5 shadow-xl"
                    style={{
                      background:
                        "radial-gradient(130% 130% at 25% 15%, #25d366 0%, #1aa84f 40%, #0e5b2c 100%)",
                    }}
                  >
                    {/* soft glow accents for a premium feel */}
                    <span className="pointer-events-none absolute -top-12 -right-12 w-44 h-44 rounded-full bg-white/15 blur-2xl" aria-hidden="true" />
                    <span className="pointer-events-none absolute -bottom-14 -left-10 w-48 h-48 rounded-full bg-emerald-200/20 blur-3xl" aria-hidden="true" />
                    <div className="relative w-full h-full rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-2xl">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                {/* TEXT — tight */}
                <div className={`${imgFirst ? "md:order-2" : "md:order-1"} text-center md:text-left`}>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.16em] text-accent font-bold mb-2">
                    {p.eyebrow}
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-foreground mb-4 text-balance">
                    {p.title}
                  </h3>
                  <ul className="flex flex-col gap-2.5 max-w-md mx-auto md:mx-0">
                    {p.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-left">
                        <span className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-accent" strokeWidth={3} />
                        </span>
                        <span className="text-base text-foreground-muted leading-snug">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* single CTA below all three */}
        <div className="flex justify-center mt-10">
          <a
            href="https://wa.me/918956146485?text=Hi%21+I+want+to+start+my+Healthy+Habits+Challenge" target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full text-base sm:text-lg font-bold"
          >
            Join Free on WhatsApp →
          </a>
        </div>

      </div>
    </section>
  );
}
