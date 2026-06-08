"use client";

import { useEffect, useRef, useState } from "react";

/**
 * TinyGains — the James Clear "1% better every day" compounding visual,
 * rebuilt on-brand and animated. Shows three paths from a single "You are here"
 * starting point:
 *   • 1% better every day  → 37× in a year (green, soaring)
 *   • no change            → flat (dashed grey)
 *   • 1% worse every day   → near-zero (red, declining)
 *
 * The curves draw themselves when the section scrolls into view, and the
 * "37×" counter ticks up — to stick the picture in the visitor's mind.
 */

// SVG canvas
const VW = 720;
const VH = 460;
const X0 = 90;          // y-axis x
const Y0 = 360;         // x-axis y (baseline = value 1)
const XEND = 660;       // far right (1 year)
const TOP = 40;         // top of the soaring curve

// Compounding curve: starts at baseline (value 1) and soars to the top-right.
const BETTER_PATH = `M ${X0} ${Y0} C ${X0 + 240} ${Y0 - 8}, ${XEND - 140} ${Y0 - 70}, ${XEND} ${TOP}`;
// Worse curve: decays from baseline toward the x-axis.
const WORSE_PATH = `M ${X0} ${Y0} C ${X0 + 200} ${Y0 + 70}, ${XEND - 160} ${Y0 + 78}, ${XEND - 40} ${Y0 + 80}`;
// No-change: flat dashed line at the baseline.
const FLAT_Y = Y0;

export default function TinyGains() {
  const [shown, setShown] = useState(false);
  const [count, setCount] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setShown(true);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Tick the 37× counter up once the section is visible.
  useEffect(() => {
    if (!shown) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(37.78);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(1 + eased * (37.78 - 1));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown]);

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-section-white border-t border-border-subtle overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 lg:mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">
            The power of tiny gains
          </p>
          <h2 className="font-display text-section-title text-balance text-foreground mb-4">
            Get just <span className="gradient-text">1% better</span> every day…
          </h2>
          <p className="text-base sm:text-lg text-foreground-muted max-w-2xl mx-auto leading-relaxed">
            A tiny habit feels like nothing on Day 1. But improvements{" "}
            <span className="font-semibold text-foreground">compound</span>. Keep going for a year and the
            math is staggering — you become a <span className="font-semibold text-foreground">37× better</span> version of yourself.
          </p>
        </div>

        {/* The two equations */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 mb-10">
          <div className="flex items-center gap-3 text-lg sm:text-xl font-semibold text-foreground">
            <span>1% better every day</span>
            <span className="font-mono text-foreground-muted">1.01<sup>365</sup> =</span>
            <span className="px-3 py-1 rounded-lg bg-accent/15 text-accent font-bold tabular-nums">37.78</span>
          </div>
          <div className="flex items-center gap-3 text-lg sm:text-xl font-semibold text-foreground-muted">
            <span>1% worse every day</span>
            <span className="font-mono">0.99<sup>365</sup> =</span>
            <span className="px-3 py-1 rounded-lg bg-red-100 text-red-500 font-bold tabular-nums">0.03</span>
          </div>
        </div>

        {/* The chart */}
        <div className="relative max-w-3xl mx-auto">
          <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" style={{ overflow: "visible" }}>
            {/* Axes */}
            <line x1={X0} y1={TOP - 10} x2={X0} y2={Y0 + 60} stroke="#cbd5e1" strokeWidth={2.5} strokeLinecap="round" />
            <line x1={X0} y1={Y0 + 60} x2={XEND + 20} y2={Y0 + 60} stroke="#cbd5e1" strokeWidth={2.5} strokeLinecap="round" />

            {/* Y-axis label */}
            <text x={X0 - 14} y={(TOP + Y0) / 2} textAnchor="middle" fontSize={15} fill="#64748b" fontFamily="var(--font-sans)" transform={`rotate(-90 ${X0 - 56} ${(TOP + Y0) / 2})`}>
              Improvement or Decline
            </text>
            {/* baseline "1" marker */}
            <text x={X0 - 16} y={Y0 + 5} textAnchor="end" fontSize={16} fontWeight={700} fill="#475569" fontFamily="var(--font-sans)">1</text>
            {/* x-axis labels */}
            <text x={X0} y={Y0 + 84} textAnchor="middle" fontSize={14} fill="#64748b" fontFamily="var(--font-sans)">Today</text>
            <text x={XEND} y={Y0 + 84} textAnchor="middle" fontSize={14} fontWeight={700} fill="#475569" fontFamily="var(--font-sans)">1 Year</text>

            {/* No-change dashed flat line */}
            <line
              x1={X0} y1={FLAT_Y} x2={XEND} y2={FLAT_Y}
              stroke="#94a3b8" strokeWidth={2.5} strokeDasharray="8 8"
              style={{ opacity: shown ? 1 : 0, transition: "opacity 0.6s 0.3s" }}
            />
            <text x={XEND - 4} y={FLAT_Y - 12} textAnchor="end" fontSize={13} fill="#94a3b8" fontFamily="var(--font-sans)"
              style={{ opacity: shown ? 1 : 0, transition: "opacity 0.6s 0.6s" }}>
              No change — stay the same
            </text>

            {/* Worse curve (red) */}
            <path
              d={WORSE_PATH} fill="none" stroke="#ef4444" strokeWidth={3.5} strokeLinecap="round"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: shown ? 0 : 1,
                transition: "stroke-dashoffset 1.6s ease 0.2s",
              }}
            />
            <text x={X0 + 150} y={Y0 + 70} textAnchor="middle" fontSize={13} fontWeight={700} fill="#ef4444" fontFamily="var(--font-sans)"
              style={{ opacity: shown ? 1 : 0, transition: "opacity 0.6s 1.4s" }}>
              ↓ 1% worse → 0.03×
            </text>

            {/* Better curve (green, soaring) */}
            <path
              d={BETTER_PATH} fill="none" stroke="#1da851" strokeWidth={4.5} strokeLinecap="round"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: shown ? 0 : 1,
                transition: "stroke-dashoffset 1.8s ease 0.3s",
              }}
            />
            {/* arrowhead on the better curve */}
            <g style={{ opacity: shown ? 1 : 0, transition: "opacity 0.4s 1.9s" }}>
              <path d={`M ${XEND - 14} ${TOP + 16} L ${XEND} ${TOP} L ${XEND - 18} ${TOP - 2}`} fill="none" stroke="#1da851" strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* "You are here" start marker */}
            <g style={{ opacity: shown ? 1 : 0, transition: "opacity 0.5s 0.1s" }}>
              <circle cx={X0} cy={Y0} r={9} fill="#18181b" stroke="#fff" strokeWidth={3} />
              <circle cx={X0} cy={Y0} r={9} fill="none" stroke="#18181b" strokeWidth={2}>
                <animate attributeName="r" values="9;18;9" dur="1.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0;0.6" dur="1.6s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* 37x badge to the LEFT of the soaring arrow tip */}
            <g style={{ opacity: shown ? 1 : 0, transition: "opacity 0.5s 1.7s" }}>
              <rect x={XEND - 168} y={TOP + 6} width={128} height={48} rx={12} fill="#1da851" />
              <text x={XEND - 104} y={TOP + 37} textAnchor="middle" fontSize={25} fontWeight={900} fill="#fff" fontFamily="var(--font-sans)">
                {count.toFixed(1)}× 🚀
              </text>
            </g>
          </svg>

          {/* "You are here" callout label (HTML, positioned over the start dot) */}
          <div
            className="absolute"
            style={{ left: `${(X0 / VW) * 100}%`, top: `${(Y0 / VH) * 100}%`, transform: "translate(-50%, 18px)" }}
          >
            <div
              className="whitespace-nowrap rounded-full bg-foreground text-background text-xs font-bold px-3 py-1.5 shadow-lg"
              style={{ opacity: shown ? 1 : 0, transform: shown ? "translateY(0)" : "translateY(6px)", transition: "all 0.5s 0.4s" }}
            >
              👉 You are here
            </div>
          </div>
        </div>

        {/* Closer + CTA */}
        <div className="text-center mt-12 lg:mt-14">
          <p className="text-lg sm:text-xl text-foreground font-semibold max-w-2xl mx-auto leading-relaxed mb-2">
            Standing still isn&apos;t neutral — without tiny wins, habits quietly slide backwards.
          </p>
          <p className="text-base sm:text-lg text-foreground-muted max-w-2xl mx-auto leading-relaxed mb-8">
            This challenge starts your 1% — one tiny habit a day, on WhatsApp. The compounding does the rest.
          </p>
          <a
            href="#signup-1"
            className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full text-lg sm:text-xl font-bold"
          >
            Start My 1% Today — Free →
          </a>
        </div>

      </div>
    </section>
  );
}
