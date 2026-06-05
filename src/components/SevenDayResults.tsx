/* eslint-disable @next/next/no-img-element */

const benefits = [
  {
    image: "/section-images/reasons-energetic.png",
    title: "Feel More Energetic",
    points: [
      "Small morning habits to help you start your day with more energy.",
    ],
  },
  {
    image: "/section-images/reasons-healthy.png",
    title: "Build Healthier Habits",
    points: [
      "Simple actions that fit into normal daily life — no strict diet, no gym pressure.",
    ],
  },
  {
    image: "/section-images/reasons-focused.png",
    title: "Feel More Focused",
    points: [
      "Reduce scattered starts and create a calmer beginning to your day.",
    ],
  },
];

export default function SevenDayResults() {
  return (
    <section className="py-24 lg:py-32 bg-section-white relative">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-accent font-bold mb-5">
            What will happen in just 7 days
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-foreground">
            What you&apos;ll feel after 7 days
          </h2>
        </div>

        {/* 3 Benefit cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="bg-white border border-border-subtle rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              {/* Photo */}
              <div style={{ height: "clamp(140px, 25vw, 200px)", overflow: "hidden" }}>
                <img
                  src={b.image}
                  alt={b.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                  className="group-hover:scale-105"
                />
              </div>

              {/* Text */}
              <div className="p-6">
                <p className="text-lg font-bold text-foreground mb-3 leading-snug">{b.title}</p>
                <p className="text-sm text-foreground-muted leading-relaxed">{b.points[0]}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom line */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="w-12 h-px bg-border mx-auto mb-8" />
          <p className="text-xl sm:text-2xl text-foreground-muted leading-relaxed">
            Just 7 tiny habits that naturally fit into your daily routine.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3">
          <a
            href="#signup"
            className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dim transition-all text-white font-bold text-lg sm:text-xl px-10 py-5 rounded-full shadow-lg hover:-translate-y-0.5"
          >
            I want these results — join free →
          </a>
        </div>

      </div>
    </section>
  );
}
