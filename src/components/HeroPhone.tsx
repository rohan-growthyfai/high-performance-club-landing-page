"use client";

import { useEffect, useRef, useState } from "react";

/**
 * iPhone WhatsApp animation — 3 message exchanges, curiosity-first.
 *
 * MSG 1 (incoming): Curious teaser habit — no habit name revealed.
 * REPLY 1 (user): "Yes! Super excited 😀"
 * MSG 2 (incoming): "Join the challenge and you will receive all the details"
 * REPLY 2 (user): "Awesome, joining right now! 🚀"
 */

type TickState = "none" | "single" | "double" | "blue";

interface Phase {
  headerStatus: string;
  msg1Visible: boolean;
  reply1Visible: boolean;
  reply1Ticks: TickState;
  msg2Visible: boolean;
  reply2Visible: boolean;
  reply2Ticks: TickState;
}

const INIT: Phase = {
  headerStatus: "online · 247 members",
  msg1Visible: false,
  reply1Visible: false,
  reply1Ticks: "none",
  msg2Visible: false,
  reply2Visible: false,
  reply2Ticks: "none",
};

const FINAL: Phase = {
  headerStatus: "online · 247 members",
  msg1Visible: true,
  reply1Visible: true,
  reply1Ticks: "blue",
  msg2Visible: true,
  reply2Visible: true,
  reply2Ticks: "blue",
};

const SEQ: { delay: number; patch: Partial<Phase> }[] = [
  { delay: 900,  patch: { headerStatus: "typing…" } },
  { delay: 1500, patch: { headerStatus: "online · 247 members", msg1Visible: true } },
  { delay: 2800, patch: { reply1Visible: true, reply1Ticks: "single" } },
  { delay: 600,  patch: { reply1Ticks: "double" } },
  { delay: 700,  patch: { reply1Ticks: "blue" } },
  { delay: 1400, patch: { headerStatus: "typing…" } },
  { delay: 1300, patch: { headerStatus: "online · 247 members", msg2Visible: true } },
  { delay: 2500, patch: { reply2Visible: true, reply2Ticks: "single" } },
  { delay: 600,  patch: { reply2Ticks: "double" } },
  { delay: 700,  patch: { reply2Ticks: "blue" } },
];

function Tick({ state }: { state: TickState }) {
  if (state === "none") return null;
  const color = state === "blue" ? "#53bdeb" : "rgba(255,255,255,0.55)";
  return <span style={{ color, fontSize: "0.65rem", lineHeight: 1 }}>{state === "single" ? "✓" : "✓✓"}</span>;
}

export default function HeroPhone() {
  const [phase, setPhase] = useState<Phase>(INIT);
  const [started, setStarted] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase(FINAL);
      return;
    }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) setStarted(true);
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };

    const run = () => {
      clear();
      setPhase(INIT);
      let cur: Phase = INIT;
      let acc = 0;
      SEQ.forEach(s => {
        acc += s.delay;
        const t = setTimeout(() => {
          cur = { ...cur, ...s.patch };
          setPhase({ ...cur });
        }, acc);
        timers.current.push(t);
      });
      const restart = setTimeout(() => {
        setPhase(INIT);
        const r = setTimeout(run, 400);
        timers.current.push(r);
      }, acc + 5000);
      timers.current.push(restart);
    };

    run();
    return clear;
  }, [started]);

  return (
    <div ref={ref} className="relative mx-auto select-none" style={{ width: 270 }}>
      {/* iPhone outer shell */}
      <div style={{
        background: "linear-gradient(160deg, #2a2a2a 0%, #1a1a1a 40%, #111 100%)",
        borderRadius: 44,
        padding: "10px 8px",
        boxShadow: [
          "0 0 0 1px #3a3a3a",
          "0 0 0 2px #111",
          "0 32px 64px -12px rgba(0,0,0,0.55)",
          "0 12px 32px -8px rgba(0,0,0,0.4)",
          "inset 0 1px 0 rgba(255,255,255,0.08)",
        ].join(", "),
        position: "relative",
      }}>
        {/* Side buttons */}
        <div style={{ position: "absolute", left: -3, top: 88, width: 3, height: 34, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -3, top: 132, width: 3, height: 58, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -3, top: 198, width: 3, height: 58, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", right: -3, top: 148, width: 3, height: 72, background: "#2a2a2a", borderRadius: "0 2px 2px 0" }} />

        {/* Screen */}
        <div style={{ borderRadius: 36, overflow: "hidden", background: "#000" }}>
          {/* Dynamic Island */}
          <div style={{
            position: "relative", background: "#25d366", paddingTop: 12,
            display: "flex", justifyContent: "center",
          }}>
            <div style={{
              width: 120, height: 34, background: "#000", borderRadius: 20,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#1a1a1a", border: "1px solid #333", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#2a2a2a" }} />
              </div>
              <div style={{ width: 56, height: 16, borderRadius: 8, background: "#1a1a1a" }} />
            </div>
          </div>

          {/* Status bar */}
          <div style={{
            background: "#25d366", padding: "8px 16px 6px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            fontSize: 11, color: "#fff", fontFamily: "var(--font-sans)", fontWeight: 600,
          }}>
            <span>9:41</span>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <span style={{ fontSize: 10, fontWeight: 700 }}>100%</span>
            </div>
          </div>

          {/* WhatsApp header */}
          <div style={{
            background: "#25d366", padding: "8px 12px 10px",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "1.5px solid rgba(255,255,255,0.3)" }}>
              <img src="/hpc-logo.png" alt="High Performance Club" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-sans)", letterSpacing: "-0.01em" }}>
                High Performance Club
              </p>
              <p style={{ margin: 0, color: phase.headerStatus === "typing…" ? "#e8f5e9" : "rgba(255,255,255,0.75)", fontSize: 11, fontFamily: "var(--font-sans)", marginTop: 2, transition: "color 0.3s" }}>
                {phase.headerStatus}
              </p>
            </div>
          </div>

          {/* Chat — WhatsApp light background */}
          <div style={{
            background: "#efeae2",
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath fill='%23000000' fill-opacity='0.03' d='M0 0h20v20H0V0zm20 20h20v20H20V20z'/%3E%3C/svg%3E\")",
            minHeight: 440,
            padding: "12px 8px 16px",
            display: "flex", flexDirection: "column", gap: 6,
          }}>
            {/* Date pill */}
            <div style={{ textAlign: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: "#667781", background: "rgba(255,255,255,0.85)", padding: "3px 10px", borderRadius: 20, fontFamily: "var(--font-sans)" }}>Today</span>
            </div>

            {/* MSG 1 — incoming curious teaser */}
            {phase.msg1Visible && (
              <div className="wa-anim-in-left" style={{ display: "flex", paddingLeft: 6 }}>
                <div style={{ background: "#fff", borderRadius: "8px 8px 8px 0", padding: "8px 10px", maxWidth: "85%", position: "relative", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                  <div style={{ position: "absolute", bottom: 0, left: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #fff transparent" }} />
                  <p style={{ margin: 0, color: "#111b21", fontSize: 12, fontWeight: 700, fontFamily: "var(--font-sans)", lineHeight: 1.4 }}>
                    ⚡ Your Day 1 habit is ready!
                  </p>
                  <p style={{ margin: "5px 0 0", color: "#111b21", fontSize: 11.5, fontFamily: "var(--font-sans)", lineHeight: 1.5 }}>
                    It takes just 2 minutes to do.
                  </p>
                  <p style={{ margin: "3px 0 0", color: "#111b21", fontSize: 11.5, fontFamily: "var(--font-sans)", lineHeight: 1.5 }}>
                    Most people feel an instant energy boost for the rest of the day — right after doing this. 🔥
                  </p>
                  <p style={{ margin: "4px 0 0", color: "#667781", fontSize: 10, fontFamily: "var(--font-sans)", textAlign: "right" }}>
                    6:00 AM
                  </p>
                </div>
              </div>
            )}

            {/* REPLY 1 — user excited */}
            {phase.reply1Visible && (
              <div className="wa-anim-in-right" style={{ display: "flex", justifyContent: "flex-end", paddingRight: 6 }}>
                <div style={{ background: "#d9fdd3", borderRadius: "8px 8px 0 8px", padding: "7px 10px", maxWidth: "65%", position: "relative", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                  <div style={{ position: "absolute", bottom: 0, right: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #d9fdd3 transparent" }} />
                  <p style={{ margin: 0, color: "#111b21", fontSize: 12, fontFamily: "var(--font-sans)" }}>Yes! Super excited 😀</p>
                  <p style={{ margin: "3px 0 0", color: "#667781", fontSize: 10, fontFamily: "var(--font-sans)", textAlign: "right", display: "flex", gap: 4, justifyContent: "flex-end", alignItems: "center" }}>
                    <span>6:01 AM</span>
                    <Tick state={phase.reply1Ticks} />
                  </p>
                </div>
              </div>
            )}

            {/* MSG 2 — incoming CTA */}
            {phase.msg2Visible && (
              <div className="wa-anim-in-left" style={{ display: "flex", paddingLeft: 6 }}>
                <div style={{ background: "#fff", borderRadius: "8px 8px 8px 0", padding: "8px 10px", maxWidth: "85%", position: "relative", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                  <div style={{ position: "absolute", bottom: 0, left: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #fff transparent" }} />
                  <p style={{ margin: 0, color: "#111b21", fontSize: 12, fontFamily: "var(--font-sans)", lineHeight: 1.5 }}>
                    Register for the FREE challenge and you will receive all the habits directly on this WhatsApp. 🎯
                  </p>
                  <p style={{ margin: "4px 0 0", color: "#667781", fontSize: 10, fontFamily: "var(--font-sans)", textAlign: "right" }}>
                    6:01 AM
                  </p>
                </div>
              </div>
            )}

            {/* REPLY 2 — user joining */}
            {phase.reply2Visible && (
              <div className="wa-anim-in-right" style={{ display: "flex", justifyContent: "flex-end", paddingRight: 6 }}>
                <div style={{ background: "#d9fdd3", borderRadius: "8px 8px 0 8px", padding: "7px 10px", maxWidth: "70%", position: "relative", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                  <div style={{ position: "absolute", bottom: 0, right: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #d9fdd3 transparent" }} />
                  <p style={{ margin: 0, color: "#111b21", fontSize: 12, fontFamily: "var(--font-sans)" }}>Awesome, joining right now! 🚀</p>
                  <p style={{ margin: "3px 0 0", color: "#667781", fontSize: 10, fontFamily: "var(--font-sans)", textAlign: "right", display: "flex", gap: 4, justifyContent: "flex-end", alignItems: "center" }}>
                    <span>6:02 AM</span>
                    <Tick state={phase.reply2Ticks} />
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Home bar */}
          <div style={{ background: "#efeae2", padding: "8px 0 12px", display: "flex", justifyContent: "center" }}>
            <div style={{ width: 120, height: 5, background: "rgba(0,0,0,0.15)", borderRadius: 3 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
