"use client";

import { ArrowRight } from "lucide-react";

/**
 * Your Journey — 7-day roadmap.
 *
 * Desktop: a horizontal timeline (same card layout as mobile, laid out left→right).
 * Mobile:  the original vertical timeline.
 * The previous zig-zag car/road animation has been removed in favour of a clean,
 * fully horizontal layout on desktop that mirrors the mobile vertical one.
 */

const waypoints = [
  {
    id: "start",
    label: "Day 0",
    sublabel: "Before",
    emoji: "📊",
    title: "Rate yourself today",
    desc: "You give yourself a score in 4 areas: Energy, Focus, Relationships, and Calmness. This tells us where you are right now.",
    color: "#25d366",
    bg: "#fef9ec",
    border: "#25d366",
    isCheckpoint: true,
  },
  {
    id: "d1",
    label: "Day 1",
    sublabel: "Energy",
    emoji: "⚡",
    title: "Feel more energy all day long",
    desc: "A 30-second habit that lifts your energy from the moment you wake up — and keeps it up till evening.",
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
    title: "Feel instantly more confident",
    desc: "One tiny 60-second change that makes you feel stronger and more in control — before any tough moment.",
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
    title: "Remove body tiredness without rest",
    desc: "Something simple you can do every hour that leaves your body feeling lighter and more awake.",
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
    title: "Go from stressed to calm in 30 seconds",
    desc: "A breathing habit that works faster than any app. Once you know it, you will use it for life.",
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
    title: "Get more done in 7 minutes than most do in 2 hours",
    desc: "The simplest focus habit there is. Your screen will never look the same again.",
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
    title: "Clear your mind completely in 1 minute",
    desc: "No matter how busy or messy your day was — one minute and everything becomes clear.",
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
    title: "Fall asleep faster and wake up fresh",
    desc: "A 5-minute evening habit that changes how well you sleep — starting the very first night.",
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
    title: "See how much you have changed",
    desc: "You take the same quiz again. Every single score goes up. Plus you earn your certificate. 🎓",
    color: "#1ea84f",
    bg: "#f0fdf4",
    border: "#1ea84f",
    isCheckpoint: true,
  },
];

const N = waypoints.length;

export default function CuriosityBullets() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden bg-section-white">
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

        {/* ── DESKTOP — horizontal timeline (same card layout as mobile, left→right) ── */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Horizontal road line behind the dots */}
            <div className="absolute left-0 right-0 top-[19px] h-5 rounded-full" style={{ background: "#2c3e50" }} />
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
              className="relative grid gap-4 items-start"
              style={{ gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))` }}
            >
              {waypoints.map((wp) => (
                <div key={wp.id} className="flex flex-col items-center">
                  {/* Dot on the road */}
                  <div
                    className="relative z-10 rounded-full border-2 border-white shadow flex items-center justify-center"
                    style={{ width: 44, height: 44, background: wp.color, fontSize: 18 }}
                  >
                    {wp.emoji}
                  </div>

                  {/* Card below the dot */}
                  <div
                    className="mt-4 w-full rounded-2xl p-4 border-2 shadow-sm"
                    style={{ background: wp.bg, borderColor: wp.border + "88" }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: wp.color }}>
                      {wp.label} · {wp.sublabel}
                    </p>
                    <h3 className="font-display text-sm font-bold text-foreground leading-snug mb-1.5">
                      {wp.title}
                    </h3>
                    <p className="text-xs text-foreground-muted leading-relaxed">{wp.desc}</p>
                    {!wp.isCheckpoint && (
                      <p className="text-[10px] mt-2 font-semibold text-accent">🔒 Revealed on WhatsApp</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── MOBILE — vertical timeline ───────────────────────── */}
        <div className="lg:hidden relative pl-12">
          <div className="absolute left-[20px] top-0 bottom-0 w-5 rounded-full" style={{ background: "#2c3e50" }} />
          {/* Yellow dashes */}
          <div className="absolute left-[27px] top-0 bottom-0 w-0.5 pointer-events-none" style={{
            backgroundImage: "repeating-linear-gradient(to bottom, #f5c842 0px, #f5c842 12px, transparent 12px, transparent 22px)",
            opacity: 0.6,
          }} />

          <div className="space-y-4">
            {waypoints.map((wp) => (
              <div key={wp.id} className="relative flex items-start gap-4 min-h-[64px]">
                <div className="absolute -left-[46px] top-3 flex items-center justify-center">
                  <div
                    className="rounded-full border-2 border-white shadow flex items-center justify-center"
                    style={{ width: 30, height: 30, background: wp.color, fontSize: 11 }}
                  >
                    {wp.emoji}
                  </div>
                </div>
                <div
                  className="flex-1 rounded-2xl p-4 border-2 shadow-sm"
                  style={{ background: wp.bg, borderColor: wp.border + "88" }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: wp.color }}>
                    {wp.label} · {wp.sublabel}
                  </p>
                  <h3 className="font-display text-sm font-bold text-foreground leading-snug mb-1">
                    {wp.title}
                  </h3>
                  <p className="text-xs text-foreground-muted leading-relaxed">{wp.desc}</p>
                  {!wp.isCheckpoint && (
                    <p className="text-[10px] mt-1.5 font-semibold text-accent">🔒 Revealed on WhatsApp</p>
                  )}
                </div>
              </div>
            ))}
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
