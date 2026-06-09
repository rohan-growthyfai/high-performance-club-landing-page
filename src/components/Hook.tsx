const distractions = [
  "Work",
  "Family",
  "Phone",
  "Messages",
  "Deadlines",
  "Bills",
  "Notifications",
  "Mental noise",
];

export default function Hook() {
  return (
    <section className="py-28 lg:py-40 relative overflow-hidden bg-section-cream">
      <span className="emoji-deco float-1 top-20 right-12 text-4xl hidden lg:block" aria-hidden="true">😮‍💨</span>

      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="eyebrow-line text-base uppercase tracking-[0.2em] text-accent font-bold mb-6">
            Real talk 👇
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-medium text-balance text-foreground">
            You don&apos;t need
            <br />
            <span className="italic font-light">another motivation video.</span>
          </h2>
        </div>

        {/* First paragraph with DROP CAP — editorial signature */}
        <div className="space-y-7 text-body-lg text-foreground-muted">
          <p className="drop-cap text-base sm:text-2xl leading-relaxed">
            You already know what to do. Sleep more. Move more. Use your phone less.
            Stay calm. Be disciplined. 🥱 You&apos;ve heard it a million times.
          </p>

          <p className="text-base sm:text-2xl leading-relaxed text-foreground font-medium">
            But the real problem is something else.
          </p>
        </div>

        {/* MEGA pull quote */}
        <div className="my-24 text-center relative">
          <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[700px] h-[700px] bg-accent/10 rounded-full blur-3xl opacity-70" />
          </div>
          <p className="relative font-serif text-mega-xl gradient-text">
            Your day is already
            <br />
            <span className="italic font-light">too full.</span>
          </p>
        </div>

        {/* Distraction chips — bolder, varied tilts */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-20">
          {distractions.map((d, i) => (
            <span
              key={d}
              className={`px-4 py-2 rounded-full bg-white border-2 border-border text-foreground text-sm sm:text-xl font-semibold shadow-sm ${i % 2 === 0 ? "tilt-left" : "tilt-right"}`}
            >
              {d}
            </span>
          ))}
        </div>

        <div className="space-y-5 text-base sm:text-2xl leading-relaxed text-foreground-muted">
          <p>
            And then somebody says,{" "}
            <span className="text-foreground-subtle italic">&ldquo;build a perfect morning routine&rdquo;</span>{" "}
            — and your brain just goes… 🫠
          </p>

          <p className="text-pain font-semibold text-base sm:text-2xl">
            Nope. Not happening.
          </p>

          <div className="my-12 section-divider-fancy" />

          <p className="text-foreground text-2xl sm:text-4xl font-serif italic leading-[1.2]">
            So we did the <span className="text-emphasis-yellow not-italic font-semibold">opposite</span>.
          </p>

          <p>
            For next 7 days, you don&apos;t change anything big.
          </p>
          <p className="text-foreground">
            You just{" "}
            <span className="text-emphasis-yellow font-semibold">test one tiny habit per day.</span>
          </p>

          <p>
            Most take less than <span className="text-success font-bold">2 minutes</span>.
          </p>
          <p>
            The longest is just <span className="text-success font-bold">10 minutes</span>.
          </p>
          <p className="text-foreground font-semibold">
            That&apos;s really it. 🤝
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 pt-14 pb-2">
          <a href="#signup-1" className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full text-lg sm:text-xl font-bold">
            Start the free 7-day challenge →
          </a>
        </div>
      </div>
    </section>
  );
}
