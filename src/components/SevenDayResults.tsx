/* eslint-disable @next/next/no-img-element */

const benefits = [
  {
    // Person energetically stretching/waking up in morning sunlight
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&h=400&fit=crop&q=80",
    title: "More Energy",
    desc: "Start your mornings feeling lighter and more awake.",
  },
  {
    // Person focused and working deeply, no distractions
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&q=80",
    title: "Better Focus",
    desc: "Less distraction. More control.",
  },
  {
    // Person smiling confidently, proud expression
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&q=80",
    title: "More Confidence",
    desc: "Keep promises to yourself again.",
  },
  {
    // Person doing healthy activity — walking, eating well, outdoors
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&q=80",
    title: "Healthier Daily Habits",
    desc: "Small habits that support your wellbeing.",
  },
  {
    // Person in calm consistent routine — journaling or planning
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop&q=80",
    title: "Consistency",
    desc: "Build habits you can actually sustain.",
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
            What You&apos;ll Actually Notice
          </h2>
        </div>

        {/* Benefit cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
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
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                  className="group-hover:scale-105"
                />
              </div>

              {/* Text */}
              <div className="p-6">
                <p className="text-lg font-bold text-foreground mb-2 leading-snug">{b.title}</p>
                <p className="text-base text-foreground-muted leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom line */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="w-12 h-px bg-border mx-auto mb-8" />
          <p className="text-xl sm:text-2xl text-foreground-muted leading-relaxed">
            Just 7 tiny upgrades that naturally fit into your daily routine.
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
