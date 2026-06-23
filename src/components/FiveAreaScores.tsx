"use client";

import { useState } from "react";
import { Battery, Compass, Smartphone, Activity, Brain, RotateCcw, ArrowRight } from "lucide-react";

const areas = [
  {
    key: "energy",
    label: "Energy Battery",
    description: "How charged do you feel through the day?",
    icon: Battery,
    low: "Drained",
    high: "Wired up",
  },
  {
    key: "control",
    label: "Daily Control",
    description: "Are you running your day, or is it running you?",
    icon: Compass,
    low: "Drifting",
    high: "In command",
  },
  {
    key: "phone",
    label: "Phone Control",
    description: "Who reaches for whom first?",
    icon: Smartphone,
    low: "Phone wins",
    high: "I win",
  },
  {
    key: "body",
    label: "Body Lightness",
    description: "How does your body feel by 4pm?",
    icon: Activity,
    low: "Heavy",
    high: "Light",
  },
  {
    key: "mind",
    label: "Mind Space",
    description: "How much mental noise are you carrying?",
    icon: Brain,
    low: "Crowded",
    high: "Clear",
  },
];

type Scores = Record<string, number>;

const defaults: Scores = {
  energy: 4,
  control: 5,
  phone: 3,
  body: 4,
  mind: 4,
};

export default function FiveAreaScores() {
  const [scores, setScores] = useState<Scores>(defaults);

  const handleChange = (key: string, value: number) => {
    setScores({ ...scores, [key]: value });
  };

  const reset = () => setScores(defaults);
  const total = Object.values(scores).reduce((s, v) => s + v, 0);
  const avg = (total / 5).toFixed(1);

  return (
    <section className="py-28 lg:py-40 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <span className="emoji-deco float-2 -top-8 -right-8 text-5xl hidden lg:block" aria-hidden="true">🎚️</span>
          <p className="text-base uppercase tracking-[0.2em] text-accent font-bold mb-6">
            Quick game · 30 seconds ⏱️
          </p>
          <h2 className="font-display text-section-title text-balance text-foreground mb-8">
            How are you feeling
            <br />
            <span className="italic font-light">right now?</span>
          </h2>
          <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
            Drag the sliders. Get your starting score.
            <br />
            <span className="text-xl sm:text-2xl text-foreground-subtle">
              You&apos;ll take this exact quiz on Day 0 and Day 7 inside the challenge. 🎯
            </span>
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Sliders */}
          <div className="lg:col-span-7 space-y-5">
            {areas.map((area) => {
              const Icon = area.icon;
              const val = scores[area.key];
              const pct = ((val - 1) / 9) * 100;
              return (
                <div
                  key={area.key}
                  className="premium-card rounded-2xl p-6 sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-lg">{area.label}</p>
                        <p className="text-base text-foreground-muted mt-1">
                          {area.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="font-serif text-4xl gradient-text font-medium tabular-nums leading-none">
                        {val}
                      </span>
                      <span className="text-sm text-foreground-subtle">/10</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={val}
                    onChange={(e) =>
                      handleChange(area.key, parseInt(e.target.value, 10))
                    }
                    className="range-premium"
                    style={{ ["--range-pct" as string]: `${pct}%` } as React.CSSProperties}
                    aria-label={area.label}
                  />

                  <div className="flex justify-between text-xs uppercase tracking-wider text-foreground-subtle mt-3 font-medium">
                    <span>{area.low}</span>
                    <span>{area.high}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="premium-card rounded-2xl p-8 border-glow">
              <p className="text-sm uppercase tracking-[0.2em] text-accent font-semibold mb-4">
                Your Day 0 score
              </p>

              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-serif text-7xl gradient-text font-medium tabular-nums leading-none">
                  {avg}
                </span>
                <span className="text-3xl text-foreground-subtle font-light">/10</span>
              </div>

              <p className="text-lg text-foreground-muted leading-relaxed mb-6">
                {parseFloat(avg) < 4
                  ? "Plenty of room to improve. The good news: that means you'll notice changes faster than most."
                  : parseFloat(avg) < 6
                    ? "You're functional, but you know there's another level. That's exactly who this is built for."
                    : parseFloat(avg) < 8
                      ? "You're already taking care of yourself. The challenge can help you push from good to great."
                      : "You're already doing well. The challenge can help you sharpen what's already working."}
              </p>

              <div className="space-y-3 mb-7">
                {areas.map((a) => {
                  const v = scores[a.key];
                  const pct = (v / 10) * 100;
                  return (
                    <div key={a.key} className="flex items-center gap-3">
                      <span className="text-xs uppercase tracking-wider text-foreground-subtle w-24 flex-shrink-0 font-medium">
                        {a.label.split(" ")[0]}
                      </span>
                      <div className="flex-1 h-2.5 bg-background-elevated rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent to-accent-dim rounded-full transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-base text-foreground-muted tabular-nums w-6 text-right font-medium">
                        {v}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-border-subtle">
                <p className="text-base text-foreground-muted mb-5 italic">
                  Imagine these bars 2-3 points higher in 7 days.
                </p>
                <a
                  href="https://wa.me/918956146485?text=Hi%21+I+want+to+start+my+Healthy+Habits+Challenge" target="_blank" rel="noopener noreferrer"
                  className="btn-primary w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-base"
                >
                  Take the real challenge
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={reset}
                  className="w-full mt-3 inline-flex items-center justify-center gap-1.5 text-sm text-foreground-subtle hover:text-foreground transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset sliders
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
