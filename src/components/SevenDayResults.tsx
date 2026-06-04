/* eslint-disable @next/next/no-img-element */

const benefits = [
  {
    image: "/section-images/reasons-energetic.png",
    title: "Become More Energetic",
    points: [
      "Stop feeling tired and drained by afternoon",
      "Wake up feeling refreshed and ready to go",
      "Sustain your energy throughout the entire day",
    ],
  },
  {
    image: "/section-images/reasons-focused.png",
    title: "Boost Your Focus",
    points: [
      "Get more done without getting distracted",
      "Stay sharp during meetings and deep work",
      "Cut through mental noise and think clearly",
    ],
  },
  {
    image: "/section-images/reasons-confident.png",
    title: "Get More Confidence & Productivity",
    points: [
      "Keep promises to yourself and follow through",
      "Build daily habits that actually stick",
      "Feel calm, in control, and more productive",
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
            Reasons to Join the Challenge
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
              <div style={{ height: 200, overflow: "hidden" }}>
                <img
                  src={b.image}
                  alt={b.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                  className="group-hover:scale-105"
                />
              </div>

              {/* Text */}
              <div className="p-6">
                <p className="text-lg font-bold text-foreground mb-4 leading-snug">{b.title}</p>
                <ul className="space-y-2">
                  {b.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-accent/10 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-accent" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span className="text-sm text-foreground-muted leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
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
