/* eslint-disable @next/next/no-img-element */

/**
 * ValueProps — 3 big benefit blocks in an alternating zig-zag layout
 * (image ⇄ text), each with a simple eyebrow, a plain-language headline,
 * a short line, and a CTA. Mirrors the classic sales-page zig-zag.
 * Language is kept dead-simple on purpose.
 */

const props = [
  {
    eyebrow: "More Energy",
    title: "Wake up and feel awake",
    body: "Each morning you get one tiny habit. It helps you feel fresh and full of energy — all day long. No early alarms. No tired feeling after coffee.",
    img: "/value/energy.png",
    tint: "from-amber-50 to-amber-100/40",
  },
  {
    eyebrow: "Better Focus",
    title: "Get your work done faster",
    body: "Small habits help you stop getting distracted. You finish what matters — and you stop wasting time. It feels easy, not hard.",
    img: "/value/focus.png",
    tint: "from-blue-50 to-blue-100/40",
  },
  {
    eyebrow: "Calm & Sleep",
    title: "Relax and sleep better",
    body: "A few simple habits at night calm your busy mind in under a minute. You fall asleep faster and wake up happy.",
    img: "/value/sleep.png",
    tint: "from-indigo-50 to-indigo-100/40",
  },
];

export default function ValueProps() {
  return (
    <section className="py-16 lg:py-24 bg-section-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14 lg:mb-20">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">
            What you get
          </p>
          <h2 className="font-display text-section-title text-balance text-foreground">
            Three changes in <span className="gradient-text">7 days</span>.
          </h2>
        </div>

        <div className="flex flex-col gap-16 lg:gap-24">
          {props.map((p, i) => {
            const imgFirst = i % 2 === 0; // alternate sides on desktop
            return (
              <div
                key={p.title}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              >
                {/* IMAGE */}
                <div className={`${imgFirst ? "lg:order-1" : "lg:order-2"}`}>
                  <div className={`relative rounded-3xl overflow-hidden border border-border-subtle shadow-md aspect-[4/3] bg-gradient-to-br ${p.tint}`}>
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* TEXT */}
                <div className={`${imgFirst ? "lg:order-2" : "lg:order-1"} text-center lg:text-left`}>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-accent font-bold mb-3">
                    {p.eyebrow}
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.2] text-foreground mb-4 text-balance">
                    {p.title}
                  </h3>
                  <p className="text-base sm:text-lg text-foreground-muted leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0">
                    {p.body}
                  </p>
                  <div className="flex justify-center lg:justify-start">
                    <a
                      href="#signup-1"
                      className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base sm:text-lg font-bold"
                    >
                      Join Free on WhatsApp →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
