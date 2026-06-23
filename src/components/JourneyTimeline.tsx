import { Lock } from "lucide-react";

/**
 * JourneyTimeline — curiosity-first.
 * Each day has a teaser title that hints at the habit without naming it.
 * The actual habit name is locked behind the challenge.
 * Builds anticipation for each consecutive day.
 */

const days = [
  {
    day: "1",
    time: "10 min",
    teaser: "The 10-minute trick that reveals how much your phone controls you",
    hook: "Most people are shocked by what they notice.",
    area: "Phone Control",
    color: "from-blue-50 to-blue-100/50",
    border: "border-blue-200",
    icon: "📵",
  },
  {
    day: "2",
    time: "60 sec",
    teaser: "The 60-second body shift that changes how people perceive you",
    hook: "Used by athletes and CEOs before high-stakes moments.",
    area: "Body Lightness",
    color: "from-purple-50 to-purple-100/50",
    border: "border-purple-200",
    icon: "🧍",
  },
  {
    day: "3",
    time: "20 sec",
    teaser: "The 20-second eye reset that ends your afternoon headache",
    hook: "Derived from NASA eye-fatigue research.",
    area: "Body Lightness",
    color: "from-sky-50 to-sky-100/50",
    border: "border-sky-200",
    icon: "👀",
  },
  {
    day: "4",
    time: "30 sec",
    teaser: "The Stanford-backed breathing trick that calms you faster than meditation",
    hook: "Works in 30 seconds. You'll use it for life.",
    area: "Mind Space",
    color: "from-green-50 to-green-100/50",
    border: "border-accent/30",
    icon: "🫁",
  },
  {
    day: "5",
    time: "7 min",
    teaser: "The 7-minute focus method that gets more done than a 2-hour morning",
    hook: "Your screen should not look like a railway station at peak hour.",
    area: "Daily Control",
    color: "from-orange-50 to-orange-100/50",
    border: "border-orange-200",
    icon: "🎯",
  },
  {
    day: "6",
    time: "60 sec",
    teaser: "The 1-sentence technique that turns mental chaos into clarity",
    hook: "Name what you feel. Watch the stress disappear in 60 seconds.",
    area: "Mind Space",
    color: "from-pink-50 to-pink-100/50",
    border: "border-pink-200",
    icon: "🧠",
  },
  {
    day: "7",
    time: "5 min",
    teaser: "The pre-sleep ritual that cuts your time to fall asleep by 14 minutes",
    hook: "Baylor University proved this in a 2018 sleep study.",
    area: "Mind Space",
    color: "from-amber-50 to-amber-100/50",
    border: "border-amber-200",
    icon: "🗒️",
  },
];

export default function JourneyTimeline() {
  return (
    <section id="how-it-works-journey" className="py-20 lg:py-28 relative bg-section-cream">
      <span className="emoji-deco float-1 top-32 left-8 text-4xl hidden lg:block" aria-hidden="true">🗺️</span>
      <span className="emoji-deco float-2 bottom-40 right-12 text-4xl hidden lg:block" aria-hidden="true">🔒</span>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-5">
            The 7-day adventure 🗺️
          </p>
          <h2 className="font-display text-section-title text-balance text-foreground mb-6">
            7 days.
            <br />
            7 tiny{" "}
            <span className="gradient-text">high performance habits</span>.
            <br />
            <span className="italic font-medium">A more energetic and active you.</span>
          </h2>
          <p className="text-xl text-foreground-muted leading-relaxed">
            Each day, one habit arrives in your WhatsApp.
            We keep them a surprise on purpose — that&apos;s what makes you actually do them.
          </p>
        </div>

        {/* Days — responsive grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {days.map((d, i) => (
            <DayCard key={d.day} day={d} index={i} />
          ))}

          {/* Final reward tile */}
          <div className="rounded-2xl p-7 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent border-2 border-dashed border-accent/40 flex flex-col justify-between hover-glow">
            <div>
              <div className="text-4xl mb-4">🏆</div>
              <p className="text-sm uppercase tracking-wider text-accent font-bold mb-2">
                Day 7 unlock
              </p>
              <h3 className="font-display text-xl text-foreground font-bold mb-3 leading-tight">
                Your personalized report + certificate
              </h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                See your before vs after scores across all 5 areas. Earn your High Performance Lifestyle Starter Certificate.
              </p>
            </div>
            <a
              href="https://wa.me/918956146485?text=Hi%21+I+want+to+start+my+Healthy+Habits+Challenge" target="_blank" rel="noopener noreferrer"
              className="mt-5 btn-primary inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full text-xl self-start"
            >
              Unlock Day 1 →
            </a>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-border shadow-sm text-sm text-foreground-muted">
            <Lock className="w-4 h-4 text-accent" />
            Each habit is revealed one day at a time — only in your WhatsApp. No spoilers here.
          </div>
        </div>
      </div>
    </section>
  );
}

function DayCard({ day: d, index }: { day: typeof days[number]; index: number }) {
  const tilt = index % 3 === 0 ? "" : index % 3 === 1 ? "tilt-left" : "tilt-right";
  return (
    <div className={`rounded-2xl p-6 border ${d.border} bg-gradient-to-br ${d.color} hover-glow flex flex-col gap-4 ${tilt}`}>
      {/* Day badge + icon */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-white border border-white/80 flex items-center justify-center font-display font-bold text-foreground text-base shadow-sm">
            {d.day}
          </div>
          <span className="text-3xl">{d.icon}</span>
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-foreground-subtle bg-white/60 px-2 py-1 rounded-full">
          {d.time}
        </span>
      </div>

      {/* Teaser — the mystery */}
      <div>
        <p className="font-display text-base font-bold text-foreground leading-snug mb-2">
          {d.teaser}
        </p>
        <p className="text-sm text-foreground-muted leading-relaxed italic">
          {d.hook}
        </p>
      </div>

      {/* Area tag */}
      <div className="mt-auto pt-3 border-t border-white/50">
        <span className="text-[11px] font-bold uppercase tracking-wider text-foreground-subtle">
          Boosts → {d.area}
        </span>
      </div>
    </div>
  );
}
