export default function FounderStory() {
  return (
    <section className="py-28 lg:py-40 relative">
      {/* Floating emoji */}
      <span className="emoji-deco float-1 top-32 right-8 text-4xl hidden lg:block" aria-hidden="true">👋</span>

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          {/* Photo as polaroid */}
          <div className="lg:col-span-5">
            <div className="relative max-w-sm mx-auto lg:mx-0">
              {/* Sticky note */}
              <div className="absolute -top-8 -right-4 z-20 sticky-note p-3 rounded-md tilt-right w-44 hidden sm:block">
                <p className="font-serif italic text-sm text-amber-900 leading-snug">
                  &ldquo;Hi 👋 I built this!&rdquo;
                </p>
              </div>

              <div className="polaroid tilt-left">
                <div className="aspect-square rounded-sm overflow-hidden">
                  <img
                    src="/rohan.png"
                    alt="Rohan — Founder, High Performance Club"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <p className="text-center font-serif text-2xl italic text-foreground mt-4">
                  Rohan
                </p>
                <p className="text-center text-sm text-foreground-subtle mt-1">
                  Founder, High Performance Club
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-base uppercase tracking-[0.2em] text-accent font-bold mb-6 text-center lg:text-left">
              👋 Hi, I&apos;m the guy who built this
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] mb-10 text-balance text-foreground text-center lg:text-left">
              I made this because
              <br />
              <span className="italic font-light">I needed it first.</span>
            </h2>

            <div className="space-y-5 text-base sm:text-lg text-foreground-muted leading-relaxed">
              <p>
                For years, I kept saving productivity videos and promising myself I&apos;d start tomorrow.
              </p>
              <p>
                I tried big routines.<br />
                I tried 5 AM plans.<br />
                I tried apps, videos, trackers, and complicated systems.
              </p>
              <p>
                Most of them failed because they were too big for my actual life.
              </p>
              <p>
                So I built the smallest, simplest and the most fun version I could:
              </p>
              <p className="text-foreground font-medium">
                7 days.<br />
                1 tiny habit daily.<br />
                Delivered on WhatsApp.<br />
                Free.
              </p>
              <p>
                That&apos;s it.
              </p>
              <p className="text-foreground font-medium">
                Hope it helps. 🤝
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <p className="font-serif italic text-2xl text-accent">— Rohan</p>
              <span className="w-10 h-px bg-border" />
              <p className="text-base text-foreground-subtle">
                Builder, High Performance Club
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 pt-14 pb-2">
          <p className="text-base text-foreground-muted text-center">This challenge exists because it worked for me first. Now it&apos;s your turn.</p>
          <a href="#signup" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dim transition-all text-white font-bold text-base sm:text-xl px-8 py-4 sm:px-10 sm:py-5 rounded-full shadow-lg hover:-translate-y-0.5 w-full sm:w-auto text-center">
            Join the Challenge — Completely FREE →
          </a>
        </div>
      </div>
    </section>
  );
}
