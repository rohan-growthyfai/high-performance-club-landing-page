"use client";

import { useEffect, useRef, useState } from "react";

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

const INIT: Phase = { headerStatus: "online · 1,240 members", msg1Visible: false, reply1Visible: false, reply1Ticks: "none", msg2Visible: false, reply2Visible: false, reply2Ticks: "none" };
const FINAL: Phase = { headerStatus: "online · 1,240 members", msg1Visible: true, reply1Visible: true, reply1Ticks: "blue", msg2Visible: true, reply2Visible: true, reply2Ticks: "blue" };
const SEQ = [
  { delay: 900,  patch: { headerStatus: "typing…" } },
  { delay: 1500, patch: { headerStatus: "online · 1,240 members", msg1Visible: true } },
  { delay: 2800, patch: { reply1Visible: true, reply1Ticks: "single" as TickState } },
  { delay: 600,  patch: { reply1Ticks: "double" as TickState } },
  { delay: 700,  patch: { reply1Ticks: "blue" as TickState } },
  { delay: 1400, patch: { headerStatus: "typing…" } },
  { delay: 1300, patch: { headerStatus: "online · 1,240 members", msg2Visible: true } },
  { delay: 2500, patch: { reply2Visible: true, reply2Ticks: "single" as TickState } },
  { delay: 600,  patch: { reply2Ticks: "double" as TickState } },
  { delay: 700,  patch: { reply2Ticks: "blue" as TickState } },
];

function Tick({ state }: { state: TickState }) {
  if (state === "none") return null;
  return <span style={{ color: state === "blue" ? "#53bdeb" : "rgba(255,255,255,0.55)", fontSize: "0.65rem" }}>{state === "single" ? "✓" : "✓✓"}</span>;
}

export default function DUCPhone() {
  const [phase, setPhase] = useState<Phase>(INIT);
  const [started, setStarted] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setPhase(FINAL); return; }
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
    const run = () => {
      clear(); setPhase(INIT);
      let cur: Phase = INIT; let acc = 0;
      SEQ.forEach(s => {
        acc += s.delay;
        const t = setTimeout(() => { cur = { ...cur, ...s.patch }; setPhase({ ...cur }); }, acc);
        timers.current.push(t);
      });
      const restart = setTimeout(() => { setPhase(INIT); const r = setTimeout(run, 400); timers.current.push(r); }, acc + 5000);
      timers.current.push(restart);
    };
    run();
    return clear;
  }, [started]);

  return (
    <div ref={ref} className="relative mx-auto select-none" style={{ width: 270 }}>
      {/* iPhone shell */}
      <div style={{ background: "linear-gradient(160deg, #2a2a2a 0%, #1a1a1a 40%, #111 100%)", borderRadius: 44, padding: "10px 8px", boxShadow: "0 0 0 1px #3a3a3a, 0 0 0 2px #111, 0 32px 64px -12px rgba(0,0,0,0.55), 0 12px 32px -8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)", position: "relative" }}>
        {/* Side buttons */}
        <div style={{ position: "absolute", left: -3, top: 88,  width: 3, height: 34, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -3, top: 132, width: 3, height: 58, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -3, top: 198, width: 3, height: 58, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", right: -3, top: 148, width: 3, height: 72, background: "#2a2a2a", borderRadius: "0 2px 2px 0" }} />

        {/* Screen */}
        <div style={{ borderRadius: 36, overflow: "hidden", background: "#000" }}>
          {/* Dynamic island */}
          <div style={{ position: "relative", background: "#202c33", paddingTop: 12, display: "flex", justifyContent: "center" }}>
            <div style={{ width: 120, height: 34, background: "#000", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#1a1a1a", border: "1px solid #333", display: "flex", alignItems: "center", justifyContent: "center" }} />
              <div style={{ width: 56, height: 16, borderRadius: 8, background: "#1a1a1a" }} />
            </div>
          </div>
          {/* Status bar */}
          <div style={{ background: "#202c33", padding: "8px 16px 6px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-sans)", fontWeight: 600 }}>
            <span>9:41</span>
            <span style={{ fontSize: 10, fontWeight: 700 }}>100%</span>
          </div>
          {/* WA header */}
          <div style={{ background: "#202c33", padding: "8px 12px 10px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #25d366, #1da851)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#fff" }}>D</div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-sans)" }}>Daily Upgrade Club</p>
              <p style={{ margin: 0, color: phase.headerStatus === "typing…" ? "#53bdeb" : "rgba(255,255,255,0.45)", fontSize: 11, fontFamily: "var(--font-sans)", marginTop: 2, transition: "color 0.3s" }}>{phase.headerStatus}</p>
            </div>
          </div>
          {/* Chat */}
          <div style={{ background: "#0b141a", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath fill='%23ffffff' fill-opacity='0.02' d='M0 0h20v20H0V0zm20 20h20v20H20V20z'/%3E%3C/svg%3E\")", minHeight: 440, padding: "12px 8px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ textAlign: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", background: "rgba(31,44,52,0.8)", padding: "3px 10px", borderRadius: 20, fontFamily: "var(--font-sans)" }}>Today</span>
            </div>

            {/* Incoming habit message */}
            {phase.msg1Visible && (
              <div className="wa-anim-in-left" style={{ display: "flex", paddingLeft: 6 }}>
                <div style={{ background: "#202c33", borderRadius: "8px 8px 8px 0", padding: "8px 10px", maxWidth: "88%", position: "relative" }}>
                  <div style={{ position: "absolute", bottom: 0, left: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #202c33 transparent" }} />
                  <p style={{ margin: 0, color: "#25d366", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-sans)" }}>🎯 Day 12 — Focus Start Habit</p>
                  <p style={{ margin: "5px 0 0", color: "rgba(255,255,255,0.9)", fontSize: 11.5, fontFamily: "var(--font-sans)", lineHeight: 1.5 }}>Before opening any app today, write your ONE most important task first.</p>
                  <p style={{ margin: "3px 0 0", color: "rgba(255,255,255,0.6)", fontSize: 11, fontFamily: "var(--font-sans)" }}>⏱ Time: <strong style={{ color: "rgba(255,255,255,0.85)" }}>30 seconds</strong></p>
                  <p style={{ margin: "5px 0 0", color: "rgba(255,255,255,0.85)", fontSize: 11.5, fontFamily: "var(--font-sans)" }}>Reply <strong style={{ color: "#fff" }}>DONE</strong> ✅ when done</p>
                  <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.35)", fontSize: 10, textAlign: "right", fontFamily: "var(--font-sans)" }}>6:00 AM</p>
                </div>
              </div>
            )}

            {/* User reply */}
            {phase.reply1Visible && (
              <div className="wa-anim-in-right" style={{ display: "flex", justifyContent: "flex-end", paddingRight: 6 }}>
                <div style={{ background: "#005c4b", borderRadius: "8px 8px 0 8px", padding: "7px 10px", maxWidth: "50%", position: "relative" }}>
                  <div style={{ position: "absolute", bottom: 0, right: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #005c4b transparent" }} />
                  <p style={{ margin: 0, color: "#fff", fontSize: 12, fontFamily: "var(--font-sans)" }}>DONE ✅</p>
                  <p style={{ margin: "3px 0 0", color: "rgba(255,255,255,0.5)", fontSize: 10, textAlign: "right", display: "flex", gap: 4, justifyContent: "flex-end", alignItems: "center", fontFamily: "var(--font-sans)" }}>
                    <span>6:07 AM</span><Tick state={phase.reply1Ticks} />
                  </p>
                </div>
              </div>
            )}

            {/* Tracking reply */}
            {phase.msg2Visible && (
              <div className="wa-anim-in-left" style={{ display: "flex", paddingLeft: 6 }}>
                <div style={{ background: "#202c33", borderRadius: "8px 8px 8px 0", padding: "8px 10px", maxWidth: "88%", position: "relative" }}>
                  <div style={{ position: "absolute", bottom: 0, left: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #202c33 transparent" }} />
                  <p style={{ margin: 0, color: "#fff", fontSize: 12, fontFamily: "var(--font-sans)", marginBottom: 4 }}>Done counted ✅</p>
                  <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: 11.5, fontFamily: "var(--font-sans)", lineHeight: 1.6 }}>
                    This week: <strong style={{ color: "#fff" }}>5/7</strong> ✅<br />
                    Month: <strong style={{ color: "#fff" }}>18/30</strong><br />
                    Streak: <strong style={{ color: "#25d366" }}>12 days 🔥</strong>
                  </p>
                  <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.35)", fontSize: 10, textAlign: "right", fontFamily: "var(--font-sans)" }}>6:07 AM</p>
                </div>
              </div>
            )}

            {/* User reply 2 */}
            {phase.reply2Visible && (
              <div className="wa-anim-in-right" style={{ display: "flex", justifyContent: "flex-end", paddingRight: 6 }}>
                <div style={{ background: "#005c4b", borderRadius: "8px 8px 0 8px", padding: "7px 10px", maxWidth: "65%", position: "relative" }}>
                  <div style={{ position: "absolute", bottom: 0, right: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #005c4b transparent" }} />
                  <p style={{ margin: 0, color: "#fff", fontSize: 12, fontFamily: "var(--font-sans)" }}>12 day streak 🔥 let&apos;s go!</p>
                  <p style={{ margin: "3px 0 0", color: "rgba(255,255,255,0.5)", fontSize: 10, textAlign: "right", display: "flex", gap: 4, justifyContent: "flex-end", alignItems: "center", fontFamily: "var(--font-sans)" }}>
                    <span>6:07 AM</span><Tick state={phase.reply2Ticks} />
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* Home bar */}
          <div style={{ background: "#0b141a", padding: "8px 0 12px", display: "flex", justifyContent: "center" }}>
            <div style={{ width: 120, height: 5, background: "rgba(255,255,255,0.25)", borderRadius: 3 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
