"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * Road Map Journey — animated expressway with sinusoidal wave path.
 *
 * Road: dark expressway (asphalt colour), white dashes, wave shape (frequency curve).
 * Car: stops exactly ON each waypoint dot.
 * Popup: appears above the active dot, not below.
 * Animation: triggered by IntersectionObserver, car travels segment by segment.
 */

const waypoints = [
  {
    id: "start",
    label: "Day 0",
    sublabel: "Before",
    emoji: "📊",
    title: "Rate yourself today",
    desc: "You give yourself a score in 4 areas: Energy, Focus, Relationships, and Calmness. This tells us where you are right now.",
    color: "#b8853a",
    bg: "#fef9ec",
    border: "#b8853a",
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
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#16a34a",
    isCheckpoint: true,
  },
];

const N = waypoints.length; // 9

// ViewBox: 1100 wide, 260 tall
const VW = 1100;
const VH = 200;

// Sinusoidal wave — evenly spaced X, Y alternates peak/valley
const AMPLITUDE = 35;   // gentle wave — not too high, not too low
const MIDLINE   = VH / 2; // 130

function getWayPt(i: number): [number, number] {
  const margin = 60;
  const x = margin + (i / (N - 1)) * (VW - margin * 2);
  // i=0 starts at midline; odd indices go up (peak), even go down (valley)
  // pattern: mid → peak → valley → peak → valley ...
  let y: number;
  if (i === 0 || i === N - 1) {
    y = MIDLINE; // start and end on midline
  } else if (i % 2 === 1) {
    y = MIDLINE - AMPLITUDE; // peaks (above)
  } else {
    y = MIDLINE + AMPLITUDE; // valleys (below)
  }
  return [x, y];
}

const WAYPTS: [number, number][] = Array.from({ length: N }, (_, i) => getWayPt(i));

// Smooth cubic bezier path through all points
function buildPath(pts: [number, number][]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    // Control points: horizontal tension
    const cx1 = p0[0] + (p1[0] - p0[0]) * 0.45;
    const cy1 = p0[1];
    const cx2 = p0[0] + (p1[0] - p0[0]) * 0.55;
    const cy2 = p1[1];
    d += ` C ${cx1} ${cy1} ${cx2} ${cy2} ${p1[0]} ${p1[1]}`;
  }
  return d;
}

const ROAD_PATH_D = buildPath(WAYPTS);

const SEG_DURATION_MS = 2200; // slow, relaxed drive
const JUMP_DURATION_MS = 600;  // fast when user clicks a waypoint
const PAUSE_MS        = 5000; // 5 seconds at each stop so user can read

export default function CuriosityBullets() {
  const [activeIdx, setActiveIdx]   = useState(-1);
  const [carPos, setCarPos]         = useState({ x: WAYPTS[0][0], y: WAYPTS[0][1], angle: 0 });
  const [started, setStarted]       = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef    = useRef<SVGPathElement>(null);
  const timers     = useRef<ReturnType<typeof setTimeout>[]>([]);
  const animateSegRef = useRef<((idx: number, duration?: number) => void) | null>(null);;

  // Start when visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveIdx(N - 1);
      setCarPos({ x: WAYPTS[N - 1][0], y: WAYPTS[N - 1][1], angle: 0 });
      return;
    }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) setStarted(true);
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  // Animate car segment by segment
  useEffect(() => {
    if (!started) return;
    const svgPath = pathRef.current;
    if (!svgPath) return;

    const clearAll = () => timers.current.forEach(clearTimeout);

    const totalLen   = svgPath.getTotalLength();
    const segLen     = totalLen / (N - 1);

    // Place car at start immediately
    const pt0 = svgPath.getPointAtLength(0);
    setCarPos({ x: pt0.x, y: pt0.y, angle: 0 });
    setActiveIdx(0);

    const animateSeg = (segIdx: number, duration = SEG_DURATION_MS) => {
      if (segIdx >= N) return;
      // If jumping backwards (user clicked earlier waypoint), handle direction
      const currentLen = activeIdx >= 0 ? activeIdx * segLen : 0;
      const targetLen  = segIdx * segLen;
      const startLen   = currentLen < targetLen ? (segIdx - 1) * segLen : currentLen;
      const endLen     = targetLen;
      const t0 = performance.now();

      const frame = (now: number) => {
        const raw = Math.min((now - t0) / duration, 1);
        // Ease in-out cubic
        const p = raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;
        const len = startLen + (endLen - startLen) * p;

        const pt  = svgPath.getPointAtLength(len);
        const pt2 = svgPath.getPointAtLength(Math.min(len + 1, totalLen));
        const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * (180 / Math.PI);
        setCarPos({ x: pt.x, y: pt.y, angle });

        if (raw < 1) {
          requestAnimationFrame(frame);
        } else {
          // Snap car exactly to waypoint
          const wpt = WAYPTS[segIdx];
          const wpt2 = WAYPTS[Math.min(segIdx + 1, N - 1)];
          const a = Math.atan2(wpt2[1] - wpt[1], wpt2[0] - wpt[0]) * (180 / Math.PI);
          setCarPos({ x: wpt[0], y: wpt[1], angle: a });
          setActiveIdx(segIdx);

          if (segIdx < N - 1) {
            const t = setTimeout(() => animateSegRef.current?.(segIdx + 1), PAUSE_MS);
            timers.current.push(t);
          } else {
            // Reached finish — pause then loop
            const t = setTimeout(() => {
              setActiveIdx(0);
              const pt0 = svgPath.getPointAtLength(0);
              setCarPos({ x: pt0.x, y: pt0.y, angle: 0 });
              const t2 = setTimeout(() => animateSegRef.current?.(1), 400);
              timers.current.push(t2);
            }, PAUSE_MS);
            timers.current.push(t);
          }
        }
      };
      requestAnimationFrame(frame);
    };

    // Store ref so click handler can call it after clearing timers
    animateSegRef.current = animateSeg;

    // Expose jump function for waypoint clicks
    (window as unknown as Record<string, unknown>).__hpcJumpTo = (targetIdx: number) => {
      // Clear all pending timers so current animation stops
      timers.current.forEach(clearTimeout);
      timers.current = [];

      const svgP = pathRef.current;
      if (!svgP) return;
      const tLen = svgP.getTotalLength();
      const sLen = tLen / (N - 1);

      // Animate directly from current car position to target waypoint
      const carCurrentLen = activeIdx >= 0 ? activeIdx * sLen : 0;
      const targetLen = targetIdx * sLen;
      const t0p = performance.now();

      const jump = (now: number) => {
        const raw = Math.min((now - t0p) / JUMP_DURATION_MS, 1);
        const p = raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;
        const len = carCurrentLen + (targetLen - carCurrentLen) * p;
        const cpt = svgP.getPointAtLength(Math.max(0, Math.min(len, tLen)));
        const cpt2 = svgP.getPointAtLength(Math.max(0, Math.min(len + 1, tLen)));
        const angle = Math.atan2(cpt2.y - cpt.y, cpt2.x - cpt.x) * (180 / Math.PI);
        setCarPos({ x: cpt.x, y: cpt.y, angle });
        if (raw < 1) {
          requestAnimationFrame(jump);
        } else {
          const wp = WAYPTS[targetIdx];
          const wp2 = WAYPTS[Math.min(targetIdx + 1, N - 1)];
          const a = Math.atan2(wp2[1] - wp[1], wp2[0] - wp[0]) * (180 / Math.PI);
          setCarPos({ x: wp[0], y: wp[1], angle: a });
          setActiveIdx(targetIdx);
          // Resume normal animation from this point
          if (targetIdx < N - 1) {
            const t = setTimeout(() => animateSegRef.current?.(targetIdx + 1), PAUSE_MS);
            timers.current.push(t);
          }
        }
      };
      requestAnimationFrame(jump);
    };

    const t = setTimeout(() => animateSeg(1), 500);
    timers.current.push(t);

    return clearAll;
  }, [started]);

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 relative overflow-hidden bg-section-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-4">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">
            Your journey 🗺️
          </p>
          <h2 className="font-display text-section-title text-balance text-foreground mb-4">
            Here is how your{" "}
            <span className="gradient-text">7 days</span> will look.
          </h2>
          <p className="text-lg text-foreground-muted max-w-xl mx-auto">
            Watch the car travel your journey. Each stop = one tiny habit. One new level.
          </p>
        </div>

        {/* ── DESKTOP MAP ─────────────────────────────────────── */}
        <div className="hidden lg:block">
          {/* Padding = max card height (280) + connector line (14) + safety margin (20) */}
          <div className="relative w-full" style={{ padding: "320px 0 320px" }}>

            <svg
              viewBox={`0 0 ${VW} ${VH}`}
              className="w-full relative z-10"
              style={{ overflow: "visible" }}
            >
              {/* Invisible path for JS measurement (exact same d as visible roads) */}
              <path ref={pathRef} d={ROAD_PATH_D} fill="none" stroke="none" />

              {/* Road layers — expressway dark asphalt */}
              {/* 1. Outer gutter / kerb */}
              <path d={ROAD_PATH_D} fill="none" stroke="#1a2332" strokeWidth={42} strokeLinecap="round" strokeLinejoin="round" />
              {/* 2. Road surface — dark asphalt */}
              <path d={ROAD_PATH_D} fill="none" stroke="#2c3e50" strokeWidth={36} strokeLinecap="round" strokeLinejoin="round" />
              {/* 3. Road edge lines — white */}
              <path d={ROAD_PATH_D} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={1.5} strokeLinecap="round" strokeDashoffset={18} />
              {/* 4. Centre dashes — yellow expressway marking */}
              <path d={ROAD_PATH_D} fill="none" stroke="#f5c842" strokeWidth={1.5} strokeLinecap="round" strokeDasharray="20 16" opacity={0.7} />
              {/* 5. Travelled glow — gold highlight */}
              {activeIdx > 0 && (
                <path
                  d={ROAD_PATH_D}
                  fill="none"
                  stroke="#b8853a"
                  strokeWidth={5}
                  strokeLinecap="round"
                  strokeDasharray={`${(pathRef.current?.getTotalLength() ?? 0) * (activeIdx / (N - 1))} 9999`}
                  opacity={0.5}
                />
              )}

              {/* Waypoint dots + popup callouts */}
              {WAYPTS.map((pt, i) => {
                const wp   = waypoints[i];
                const isAct  = i === activeIdx;
                const isPast = i < activeIdx;
                const show   = isPast || isAct;
                const isCP   = wp.isCheckpoint;
                const r      = isCP ? 16 : 13;

                // Popup sits above if waypoint is on a peak or midline; below if valley
                const isValley = pt[1] > MIDLINE + 20;
                const popupY   = isValley
                  ? pt[1] + r + 8           // below for valleys
                  : pt[1] - r - 8 - 90;     // above for peaks & midline

                return (
                  <g
                    key={wp.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (window as any).__hpcJumpTo?.(i);
                    }}
                  >
                    {/* Invisible large hit area for easy clicking */}
                    <circle cx={pt[0]} cy={pt[1]} r={r + 14} fill="transparent" />

                    {/* Pulse ring on active */}
                    {isAct && (
                      <circle cx={pt[0]} cy={pt[1]} r={r + 4} fill={wp.color} opacity={0.2}>
                        <animate attributeName="r" values={`${r + 2};${r + 12};${r + 2}`} dur="1s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.25;0.05;0.25" dur="1s" repeatCount="indefinite" />
                      </circle>
                    )}

                    {/* Dot */}
                    <circle
                      cx={pt[0]} cy={pt[1]} r={r}
                      fill={show ? wp.color : "#374151"}
                      stroke={show ? "#fff" : "#4b5563"}
                      strokeWidth={2.5}
                      style={{ transition: "fill 0.35s, stroke 0.35s" }}
                    />

                    {/* Emoji or lock */}
                    <text x={pt[0]} y={pt[1] + 0.5} textAnchor="middle" dominantBaseline="middle" fontSize={isCP ? 14 : 12}>
                      {show ? wp.emoji : "🔒"}
                    </text>

                    {/* Popup — foreignObject with full card layout matching the screenshot */}
                    {isAct && (() => {
                      const CARD_W = 270;
                      const CARD_H = wp.isCheckpoint ? 280 : 240;
                      const cardX = Math.min(Math.max(pt[0] - CARD_W / 2, 6), VW - CARD_W - 6);
                      const cardY = isValley ? pt[1] + r + 12 : pt[1] - r - 14 - CARD_H;
                      const lineY1 = isValley ? pt[1] + r + 2 : pt[1] - r - 2;
                      const lineY2 = isValley ? cardY : cardY + CARD_H;

                      return (
                        <g>
                          {/* Dashed connector */}
                          <line
                            x1={pt[0]} y1={lineY1}
                            x2={pt[0]} y2={lineY2}
                            stroke={wp.color} strokeWidth={2} strokeDasharray="5 4" opacity={0.5}
                          />

                          {/* Full card via foreignObject */}
                          <foreignObject x={cardX} y={cardY} width={CARD_W} height={CARD_H + 20} style={{ overflow: "visible" }}>
                            <div style={{
                              background: wp.bg,
                              border: `2px solid ${wp.color}`,
                              borderRadius: 16,
                              padding: "14px 16px",
                              boxShadow: "0 8px 30px rgba(0,0,0,0.14)",
                              fontFamily: "var(--font-sans)",
                              width: CARD_W,
                              boxSizing: "border-box",
                            }}>

                              {/* Top row: emoji (large) + day badge */}
                              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                                <span style={{ fontSize: 36, lineHeight: 1 }}>{wp.emoji}</span>
                                <span style={{
                                  background: wp.color,
                                  color: "#fff",
                                  fontSize: 10,
                                  fontWeight: 700,
                                  padding: "3px 10px",
                                  borderRadius: 999,
                                  letterSpacing: "0.05em",
                                  textTransform: "uppercase",
                                  marginTop: 4,
                                }}>
                                  {wp.label}
                                </span>
                              </div>

                              {/* Area label (small caps, grey) */}
                              <p style={{ margin: "0 0 6px", fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                                {wp.sublabel}
                              </p>

                              {/* Title — big and bold */}
                              <p style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 800, color: "#111827", lineHeight: 1.3, letterSpacing: "-0.02em" }}>
                                {wp.title}
                              </p>

                              {/* Description — full text */}
                              <p style={{ margin: "0 0 10px", fontSize: 12, color: "#6b7280", lineHeight: 1.55 }}>
                                {wp.desc}
                              </p>

                              {/* Score grid — checkpoint cards (Day 0 + Day 7 result) */}
                              {wp.isCheckpoint && (
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, marginBottom: 10 }}>
                                  {(["Energy", "Focus", "Relationships", "Calmness"] as const).map((area) => (
                                    <div key={area} style={{
                                      background: "white",
                                      border: `1px solid ${wp.color}44`,
                                      borderRadius: 8,
                                      padding: "5px 10px",
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}>
                                      <span style={{ fontSize: 10, fontWeight: 600, color: "#374151" }}>{area}</span>
                                      <span style={{
                                        fontSize: 11,
                                        fontWeight: 800,
                                        color: wp.id === "end" ? "#16a34a" : wp.color,
                                      }}>
                                        {wp.id === "end" ? "↑ Up" : "?"}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Footer */}
                              <div style={{
                                borderTop: `1px solid ${wp.color}33`,
                                paddingTop: 8,
                                display: "flex",
                                alignItems: "center",
                                gap: 5,
                              }}>
                                <span style={{ fontSize: 11 }}>
                                  {wp.isCheckpoint ? (wp.id === "start" ? "📍" : "🎓") : "🔒"}
                                </span>
                                <span style={{
                                  fontSize: 10,
                                  fontWeight: 700,
                                  color: wp.isCheckpoint ? (wp.id === "start" ? "#b8853a" : "#16a34a") : "#b8853a",
                                }}>
                                  {wp.isCheckpoint
                                    ? (wp.id === "start"
                                      ? "This is where you start. Be honest."
                                      : "Complete 5 of 7 days and earn your certificate.")
                                    : "Full habit revealed in your WhatsApp"}
                                </span>
                              </div>

                            </div>
                          </foreignObject>
                        </g>
                      );
                    })()}

                    {/* Day label + tap hint below dot (not active) */}
                    {!isAct && (
                      <>
                        <text
                          x={pt[0]}
                          y={pt[1] + r + 11}
                          textAnchor="middle"
                          dominantBaseline="hanging"
                          fontSize={12}
                          fontWeight={isPast ? "700" : "500"}
                          fill={isPast ? wp.color : "#6b7280"}
                          fontFamily="var(--font-sans)"
                          style={{ transition: "fill 0.3s" }}
                        >
                          {i === 0 ? "Start" : i === N - 1 ? "Finish" : `Day ${i}`}
                        </text>
                        {!isPast && (
                          <text
                            x={pt[0]}
                            y={pt[1] + r + 25}
                            textAnchor="middle"
                            dominantBaseline="hanging"
                            fontSize={9}
                            fill="#9ca3af"
                            fontFamily="var(--font-sans)"
                          >
                            tap
                          </text>
                        )}
                      </>
                    )}
                  </g>
                );
              })}

              {/* 🚗 Car — faces right (scaleX(-1) mirrors the emoji which naturally faces left) */}
              <g transform={`translate(${carPos.x}, ${carPos.y}) rotate(${carPos.angle})`}>
                <g transform="scale(-1, 1)">
                  <text textAnchor="middle" dominantBaseline="middle" fontSize={22} y={0.5}>🚗</text>
                </g>
              </g>

              {/* Drop shadow filter */}
              <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx={0} dy={2} stdDeviation={4} floodColor="#00000022" />
                </filter>
              </defs>
            </svg>
          </div>
          {/* Click hint */}
          <p className="text-center mt-3 text-xs text-foreground-subtle italic">
            👆 Tap any dot on the road to jump the car there instantly
          </p>
        </div>

        {/* ── MOBILE — vertical road ───────────────────────────── */}
        <div className="lg:hidden relative pl-12">
          <div className="absolute left-[20px] top-0 bottom-0 w-5 rounded-full" style={{ background: "#2c3e50" }} />
          <div
            className="absolute left-[20px] top-0 w-5 rounded-full transition-all duration-500"
            style={{
              background: "linear-gradient(to bottom, #b8853a, #16a34a)",
              height: activeIdx < 0 ? 0 : `${(activeIdx / (N - 1)) * 100}%`,
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
              const isAct  = i === activeIdx;
              const isPast = i < activeIdx;
              const show   = isPast || isAct;

              return (
                <div key={wp.id} className="relative flex items-start gap-4 min-h-[64px]">
                  <div className="absolute -left-[46px] top-3 flex items-center justify-center">
                    <div
                      className="rounded-full border-2 border-white shadow flex items-center justify-center transition-all duration-300"
                      style={{ width: 30, height: 30, background: show ? wp.color : "#374151", fontSize: 11 }}
                    >
                      {show ? wp.emoji : "🔒"}
                    </div>
                    {isAct && (
                      <div className="absolute inset-0 rounded-full animate-ping" style={{ background: wp.color, opacity: 0.3 }} />
                    )}
                  </div>
                  <div
                    className={`flex-1 rounded-2xl p-4 border-2 transition-all duration-300 ${isAct ? "shadow-md" : "shadow-sm opacity-60"}`}
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
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4 text-center">
          <a href="#signup" className="btn-primary inline-flex items-center gap-2 px-10 py-5 rounded-full text-xl">
            Join for <span className="font-extrabold">FREE</span> →
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="mt-3 text-sm text-foreground-subtle">
            Each habit revealed one per day — only in your WhatsApp.
          </p>
        </div>
      </div>
    </section>
  );
}
