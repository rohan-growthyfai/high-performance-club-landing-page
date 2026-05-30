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
            <p className="text-base uppercase tracking-[0.2em] text-accent font-bold mb-6">
              👋 Hi, I&apos;m the guy who built this
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] mb-10 text-balance text-foreground">
              I made this because
              <br />
              <span className="italic font-light">I needed it first.</span>
            </h2>

            <div className="space-y-6 text-2xl text-foreground-muted leading-[1.6]">
              <p>
                For years, I was the guy who saved every productivity video on Instagram. 📲
              </p>
              <p>
                Tired by 11 AM. Crashing by 3 PM. Scrolling reels till midnight. Promising tomorrow would be different. (It wasn&apos;t.) 🫠
              </p>
              <p>
                I tried the 5 AM Club. Quit on Day 11.
                <br />
                Bought a meditation app. Opened it 3 times.
                <br />
                Started a fitness program. Still on Module 2. 😅
              </p>
              <p>The problem wasn&apos;t the advice. The advice was{" "}
                <span className="text-foreground font-medium">too big</span> for my actual life.
              </p>

              <p className="text-foreground text-2xl sm:text-3xl font-serif italic pl-6 border-l-4 border-accent leading-relaxed">
                So I made the smallest, simplest, most fun version I could.
              </p>

              <p>
                7 days. 5-10 minutes a day. Free. WhatsApp.
              </p>
              <p>
                The exact thing I wish someone had handed me 5 years ago.
              </p>
              <p className="text-foreground font-medium">
                Hope it helps. 🤝
              </p>
            </div>

            <div className="mt-12 flex items-center gap-4">
              <p className="font-serif italic text-3xl text-accent">— Rohan</p>
              <span className="w-12 h-px bg-border" />
              <p className="text-lg text-foreground-subtle">
                Builder, High Performance Club
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
