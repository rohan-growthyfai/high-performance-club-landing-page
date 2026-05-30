import { Check, X } from "lucide-react";

const personas = [
  "Working professionals",
  "Entrepreneurs",
  "Students",
  "Creators",
  "Homemakers",
  "Freelancers",
  "Busy parents",
  "Job seekers",
  "Remote workers",
  "People who keep starting & quitting",
];

const forYou = [
  "You feel your phone controls more of your day than it should",
  "You want better daily control without a complicated routine",
  "You want to feel lighter, clearer, more active",
  "You start self-improvement plans but rarely continue them",
  "You're busy — but still want to upgrade your life slowly",
  "You want habits that feel practical, not preachy",
];

const notForYou = [
  "You want instant transformation in 7 days",
  "You want medical, diet, therapy, or financial advice",
  "You only want to read messages but never act",
  "You're not willing to do even one tiny habit a day",
];

export default function WhoItsFor() {
  return (
    <section className="py-28 lg:py-40 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-base uppercase tracking-[0.2em] text-accent font-bold mb-6">
            Quick check ✋
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-medium leading-[1.1] text-balance text-foreground mb-8">
            Is this for you?
            <br />
            <span className="italic font-light">Let&apos;s find out.</span>
          </h2>
          <p className="text-2xl text-foreground-muted leading-relaxed max-w-2xl mx-auto">
            We&apos;re not trying to convince everyone. Just the right people. ✨
          </p>
        </div>

        <div className="mb-16 max-w-3xl mx-auto">
          <p className="text-center text-xl text-foreground-muted mb-6 font-medium">
            Built for whoever you are:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {personas.map((p, i) => (
              <span
                key={p}
                className={`px-5 py-2.5 rounded-full border border-accent/30 bg-white text-foreground text-base sm:text-lg font-medium shadow-sm ${
                  i % 3 === 0 ? "tilt-left" : i % 3 === 1 ? "" : "tilt-right"
                }`}
              >
                {p}
              </span>
            ))}
            <span className="px-5 py-2.5 rounded-full border border-border text-foreground-muted text-base sm:text-lg italic">
              + anyone tired of complicated programs
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          <div className="premium-card rounded-2xl p-8 lg:p-10 border-glow">
            <div className="flex items-center gap-4 mb-7">
              <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                <Check className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-foreground font-medium">
                This is for you if:
              </h3>
            </div>
            <ul className="space-y-4">
              {forYou.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-accent" />
                  </span>
                  <span className="text-foreground-muted leading-relaxed text-lg">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="premium-card rounded-2xl p-8 lg:p-10">
            <div className="flex items-center gap-4 mb-7">
              <div className="w-12 h-12 rounded-full bg-foreground-subtle/10 border border-border flex items-center justify-center">
                <X className="w-6 h-6 text-foreground-subtle" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-foreground-muted font-medium">
                This is NOT for you if:
              </h3>
            </div>
            <ul className="space-y-4">
              {notForYou.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-foreground-subtle/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-foreground-subtle" />
                  </span>
                  <span className="text-foreground-subtle leading-relaxed text-lg">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-base text-foreground-subtle italic mt-8 pt-6 border-t border-border-subtle">
              No hard feelings. This challenge is action-based — tiny action, but action.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
