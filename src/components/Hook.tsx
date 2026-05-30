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
          <h2 className="font-serif text-section-title text-balance text-foreground">
            You don&apos;t need
            <br />
            <span className="italic font-light">another motivation video.</span>
          </h2>
        </div>

        {/* First paragraph with DROP CAP — editorial signature */}
        <div className="space-y-7 text-body-lg text-foreground-muted">
          <p className="drop-cap text-2xl sm:text-3xl leading-[1.55]">
            You already know what to do. Sleep more. Move more. Use your phone less.
            Stay calm. Be disciplined. 🥱 You&apos;ve heard it a million times.
          </p>

          <p className="text-2xl sm:text-3xl leading-[1.55]">You&apos;ve heard it a million times.</p>
          <p className="text-2xl sm:text-3xl leading-[1.55] text-foreground font-medium">
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
              className={`px-6 py-3 rounded-full bg-white border-2 border-border text-foreground text-xl sm:text-2xl font-semibold shadow-sm ${i % 2 === 0 ? "tilt-left" : "tilt-right"}`}
            >
              {d}
            </span>
          ))}
        </div>

        <div className="space-y-7 text-2xl sm:text-3xl leading-[1.55] text-foreground-muted">
          <p>
            And then somebody says,{" "}
            <span className="text-foreground-subtle italic">&ldquo;build a perfect morning routine&rdquo;</span>{" "}
            — and your brain just goes… 🫠
          </p>

          <p className="text-pain font-semibold">
            Nope. Not happening.
          </p>

          <div className="my-12 section-divider-fancy" />

          <p className="text-foreground text-4xl sm:text-5xl font-serif italic leading-[1.2]">
            So we did the <span className="text-emphasis-yellow not-italic font-semibold">opposite</span>.
          </p>

          <p>
            For 7 days, you don&apos;t change anything big.
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

        {/* Sticky note */}
        <div className="mt-20 max-w-md mx-auto">
          <div className="sticky-note p-7 rounded-md tilt-right">
            <p className="font-serif italic text-xl text-amber-900 leading-relaxed">
              &ldquo;If I had time for a perfect routine, I&apos;d already have one.&rdquo;
              <br />
              <span className="text-base">— Literally everyone who&apos;s tried this</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
