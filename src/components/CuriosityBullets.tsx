"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * Your Journey — 7-day roadmap.
 *
 * Desktop: a horizontal timeline (same card layout as mobile, laid out left→right)
 *          with a left→right highlight animation cycling through each card.
 * Mobile:  the vertical timeline with a top→bottom highlight animation.
 *
 * Titles are short, curiosity-driven hooks; descriptions are kept tight so all
 * cards share the same height.
 */

const waypoints = [
  {
    id: "d1",
    label: "Day 1",
    sublabel: "Energy",
    emoji: "⚡",
    title: "Energy Hack",
    desc: "A 30-second morning habit that keeps you charged till night.",
    color: "#f97316",
    bg: "#fff7ed",
    border: "#f97316",
    isCheckpoint: false,
  },
  {
    id: "d2",
    label: "Day 2",
    sublabel: "Confidence",
    emoji: "💪",
    title: "60-Second Confidence",
    desc: "One tiny shift that makes you feel stronger before any moment.",
    color: "#a855f7",
    bg: "#faf5ff",
    border: "#a855f7",
    isCheckpoint: false,
  },
  {
    id: "d3",
    label: "Day 3",
    sublabel: "Body",
    emoji: "👁️",
    title: "Body Recharge",
    desc: "A simple hourly move that leaves your body lighter and awake.",
    color: "#0ea5e9",
    bg: "#f0f9ff",
    border: "#0ea5e9",
    isCheckpoint: false,
  },
  {
    id: "d4",
    label: "Day 4",
    sublabel: "Calm",
    emoji: "🧘",
    title: "Instant Calm",
    desc: "A breathing habit that beats stress faster than any app.",
    color: "#10b981",
    bg: "#ecfdf5",
    border: "#10b981",
    isCheckpoint: false,
  },
  {
    id: "d5",
    label: "Day 5",
    sublabel: "Focus",
    emoji: "🎯",
    title: "Laser Focus",
    desc: "The simplest focus habit — your screen will never look the same.",
    color: "#ef4444",
    bg: "#fff1f2",
    border: "#ef4444",
    isCheckpoint: false,
  },
  {
    id: "d6",
    label: "Day 6",
    sublabel: "Mind",
    emoji: "🧠",
    title: "Mental Reset",
    desc: "However messy your day — one minute and everything clears.",
    color: "#ec4899",
    bg: "#fdf2f8",
    border: "#ec4899",
    isCheckpoint: false,
  },
  {
    id: "d7",
    label: "Day 7",
    sublabel: "Sleep",
    emoji: "🌙",
    title: "Sleep Switch",
    desc: "A 5-minute evening habit for better sleep from night one.",
    color: "#6366f1",
    bg: "#eef2ff",
    border: "#6366f1",
    isCheckpoint: false,
  },
  {
    id: "end",
    label: "Day 7",
    sublabel: "After",
    emoji: "🏆",
    title: "Challenge Complete",
    desc: "Re-take the quiz. Every score is up — plus your certificate. 🎓",
    color: "#1ea84f",
    bg: "#f0fdf4",
    border: "#1ea84f",
    isCheckpoint: true,
  },
];

const N = waypoints.length;
const STEP_MS = 1400; // time each card stays highlighted

export default function CuriosityBullets() {
  const [activeIdx, setActiveIdx] = useState(-1);
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Start the highlight loop only when the section scrolls into view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStarted(true);
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Advance the highlight left→right (desktop) / top→bottom (mobile), then loop.
  useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveIdx(N - 1);
      return;
    }
    setActiveIdx(0);
    const t = setInterval(() => {
      setActiveIdx((i) => (i + 1) % N);
    }, STEP_MS);
    return () => clearInterval(t);
  }, [started]);

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 relative overflow-hidden bg-section-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">
            Your journey 🗺️
          </p>
          <h2 className="font-display text-section-title text-balance text-foreground mb-4">
            Here is how your{" "}
            <span className="gradient-text">7 days</span> will look.
          </h2>
          <p className="text-lg text-foreground-muted max-w-xl mx-auto">
            1 new habit every day on WhatsApp. Takes less than 5 minutes. Complete it anytime that day.
          </p>
        </div>

        {/* ── DESKTOP — horizontal timeline with left→right highlight ── */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Horizontal road line behind the dots */}
            <div className="absolute left-0 right-0 top-[19px] h-5 rounded-full" style={{ background: "#2c3e50" }} />
            {/* Travelled glow up to the active dot */}
            <div
              className="absolute left-0 top-[19px] h-5 rounded-full transition-all duration-500"
              style={{
                background: "linear-gradient(to right, #25d366, #1ea84f)",
                width: activeIdx < 0 ? "0%" : `${(activeIdx / (N - 1)) * 100}%`,
                opacity: 0.5,
              }}
            />
            {/* Yellow centre dashes */}
            <div
              className="absolute left-0 right-0 top-[27px] h-0.5 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, #f5c842 0px, #f5c842 14px, transparent 14px, transparent 26px)",
                opacity: 0.6,
              }}
            />

            {/* Cards laid out in an even horizontal row */}
            <div
              className="relative grid gap-4 items-stretch"
              style={{ gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))` }}
            >
              {waypoints.map((wp, i) => {
                const isAct = i === activeIdx;
                return (
                  <div key={wp.id} className="flex flex-col items-center">
                    {/* Dot on the road */}
                    <div
                      className="relative z-10 rounded-full border-2 border-white shadow flex items-center justify-center transition-transform duration-300"
                      style={{
                        width: 44,
                        height: 44,
                        background: wp.color,
                        fontSize: 18,
                        transform: isAct ? "scale(1.18)" : "scale(1)",
                      }}
                    >
                      {wp.emoji}
                      {isAct && (
                        <span
                          className="absolute inset-0 rounded-full animate-ping"
                          style={{ background: wp.color, opacity: 0.35 }}
                        />
                      )}
                    </div>

                    {/* Card below the dot — equal height via flex-1 */}
                    <div
                      className="mt-4 w-full flex-1 rounded-2xl p-4 border-2 transition-all duration-300"
                      style={{
                        background: wp.bg,
                        borderColor: isAct ? wp.color : wp.border + "88",
                        boxShadow: isAct ? `0 10px 30px ${wp.color}40` : "0 1px 2px rgba(0,0,0,0.05)",
                        transform: isAct ? "translateY(-6px)" : "translateY(0)",
                        opacity: activeIdx < 0 || isAct ? 1 : 0.72,
                      }}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wider mb-1 text-center" style={{ color: wp.color }}>
                        {wp.label} · {wp.sublabel}
                      </p>
                      <h3 className="font-display text-sm font-bold text-foreground leading-snug mb-1.5 text-center">
                        {wp.title}
                      </h3>
                      <p className="text-xs text-foreground-muted leading-relaxed text-left">{wp.desc}</p>
                      {!wp.isCheckpoint && (
                        <p className="text-[10px] mt-2 font-semibold text-accent text-left">🔒 Revealed on WhatsApp</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── MOBILE — vertical timeline with top→bottom highlight ── */}
        <div className="lg:hidden relative pl-12">
          <div className="absolute left-[20px] top-0 bottom-0 w-5 rounded-full" style={{ background: "#2c3e50" }} />
          {/* Travelled glow */}
          <div
            className="absolute left-[20px] top-0 w-5 rounded-full transition-all duration-500"
            style={{
              background: "linear-gradient(to bottom, #25d366, #1ea84f)",
              height: activeIdx < 0 ? "0%" : `${(activeIdx / (N - 1)) * 100}%`,
              opacity: 0.5,
            }}
          />
          {/* Yellow dashes */}
          <div className="absolute left-[27px] top-0 bottom-0 w-0.5 pointer-events-none" style={{
            backgroundImage: "repeating-linear-gradient(to bottom, #f5c842 0px, #f5c842 12px, transparent 12px, transparent 22px)",
            opacity: 0.6,
          }} />

          <div className="space-y-4">
            {waypoints.map((wp, i) => {
              const isAct = i === activeIdx;
              return (
                <div key={wp.id} className="relative flex items-stretch gap-4 min-h-[64px]">
                  <div className="absolute -left-[46px] top-3 flex items-center justify-center">
                    <div
                      className="rounded-full border-2 border-white shadow flex items-center justify-center transition-transform duration-300"
                      style={{
                        width: 30,
                        height: 30,
                        background: wp.color,
                        fontSize: 11,
                        transform: isAct ? "scale(1.15)" : "scale(1)",
                      }}
                    >
                      {wp.emoji}
                    </div>
                    {isAct && (
                      <div className="absolute inset-0 rounded-full animate-ping" style={{ background: wp.color, opacity: 0.3 }} />
                    )}
                  </div>
                  <div
                    className="flex-1 rounded-2xl p-4 border-2 transition-all duration-300"
                    style={{
                      background: wp.bg,
                      borderColor: isAct ? wp.color : wp.border + "88",
                      boxShadow: isAct ? `0 8px 24px ${wp.color}40` : "0 1px 2px rgba(0,0,0,0.05)",
                      opacity: activeIdx < 0 || isAct ? 1 : 0.72,
                    }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1 text-center" style={{ color: wp.color }}>
                      {wp.label} · {wp.sublabel}
                    </p>
                    <h3 className="font-display text-sm font-bold text-foreground leading-snug mb-1 text-center">
                      {wp.title}
                    </h3>
                    <p className="text-xs text-foreground-muted leading-relaxed text-left">{wp.desc}</p>
                    {!wp.isCheckpoint && (
                      <p className="text-[10px] mt-1.5 font-semibold text-accent text-left">🔒 Revealed on WhatsApp</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a href="#signup-1" className="btn-primary inline-flex items-center gap-2 px-14 py-5 rounded-full text-xl">
            Join for <span className="font-extrabold">FREE</span> →
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
