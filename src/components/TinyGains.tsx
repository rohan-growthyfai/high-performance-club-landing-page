"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";

/**
 * TinyGains — the "1% better every day" compounding visual, rebuilt on-brand
 * and animated. Shows two paths from a single "You are here" starting point:
 *   • 1% better every day  → 37× in a year (green, soaring) with a happy figure
 *   • no change            → flat (dashed grey)
 * A tired cartoon sits at the start; a happy, healthy cartoon sits at the top.
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
      setCount(37);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(1 + eased * (37 - 1));
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
            The power of tiny habits
          </p>
          <h2 className="font-display text-section-title text-balance text-foreground mb-4">
            Get just <span className="gradient-text">1% better</span> every day…
          </h2>
          <p className="text-base sm:text-lg text-foreground-muted max-w-2xl mx-auto leading-relaxed">
            A tiny habit feels like nothing on Day 1. But small wins add up over time.
            Keep going and the math is shocking — you can become a{" "}
            <span className="font-semibold text-foreground">37× better version of yourself</span> in just 1 year!
          </p>
        </div>

        {/* The one simple line */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-accent/10 border border-accent/30 text-center">
            <span className="text-base sm:text-xl font-bold text-foreground">
              1% better every day ={" "}
              <span className="text-accent">37× better version of yourself in just 1 year</span> 🚀
            </span>
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
              Better or Worse
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

            {/* 37x badge near the top of the green curve */}
            <g style={{ opacity: shown ? 1 : 0, transition: "opacity 0.5s 1.7s" }}>
              <rect x={XEND - 220} y={TOP + 4} width={120} height={46} rx={12} fill="#1da851" />
              <text x={XEND - 160} y={TOP + 33} textAnchor="middle" fontSize={24} fontWeight={900} fill="#fff" fontFamily="var(--font-sans)">
                {Math.round(count)}× 🚀
              </text>
            </g>

            {/* BEFORE cartoon at the starting point (tired figure) */}
            <g style={{ opacity: shown ? 1 : 0, transition: "opacity 0.6s 0.2s" }}>
              <image href="/value/before.png" x={X0 - 42} y={Y0 - 8} width={84} height={84} preserveAspectRatio="xMidYMid meet" />
            </g>

            {/* AFTER cartoon at the top of the curve (happy, healthy figure) */}
            <g style={{ opacity: shown ? 1 : 0, transition: "opacity 0.6s 1.9s" }}>
              <image href="/value/after.png" x={XEND - 30} y={TOP - 36} width={96} height={96} preserveAspectRatio="xMidYMid meet" />
            </g>
          </svg>

          {/* "You are here" callout label over the start figure */}
          <div
            className="absolute"
            style={{ left: `${(X0 / VW) * 100}%`, top: `${(Y0 / VH) * 100}%`, transform: "translate(-50%, 64px)" }}
          >
            <div
              className="whitespace-nowrap rounded-full bg-foreground text-background text-xs font-bold px-3 py-1.5 shadow-lg"
              style={{ opacity: shown ? 1 : 0, transform: shown ? "translateY(0)" : "translateY(6px)", transition: "all 0.5s 0.4s" }}
            >
              👉 You are here
            </div>
          </div>
        </div>

        {/* Closer + CTA — simple language */}
        <div className="text-center mt-12 lg:mt-14">
          <p className="text-lg sm:text-xl text-foreground font-semibold max-w-2xl mx-auto leading-relaxed mb-2">
            If you do nothing, nothing changes. In fact, things can slowly get worse.
          </p>
          <p className="text-base sm:text-lg text-foreground-muted max-w-2xl mx-auto leading-relaxed mb-8">
            This challenge gives you your 1% — one tiny habit a day, on WhatsApp. The small wins do the rest.
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
