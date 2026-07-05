"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import HabitChatbot from "./components/HabitChatbot";
import DUCCheckout from "./components/DUCCheckout";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    openDUCCheckout?: () => void;
  }
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function WAIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#25d366" />
      <path d="M22.94 9.06A9.75 9.75 0 0 0 16 6.25C10.89 6.25 6.75 10.39 6.75 15.5c0 1.63.43 3.21 1.24 4.62L6.6 25.4l5.42-1.42a9.75 9.75 0 0 0 4.97 1.37c5.11 0 9.25-4.14 9.25-9.25a9.2 9.2 0 0 0-3.3-7.04Zm-6.94 14.2a8.1 8.1 0 0 1-4.12-1.12l-.3-.17-3.06.8.82-2.98-.2-.31A8.1 8.1 0 0 1 7.9 15.5c0-4.47 3.63-8.1 8.1-8.1a8.1 8.1 0 0 1 8.1 8.1c0 4.47-3.63 8.1-8.1 8.1Zm4.44-6.07c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06a6.57 6.57 0 0 1-1.93-1.19 7.24 7.24 0 0 1-1.34-1.66c-.14-.24-.01-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" fill="#fff" />
    </svg>
  );
}
function Star() {
  return <svg width="13" height="13" viewBox="0 0 20 20" fill="#f59e0b" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
}
function Check({ green }: { green?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="10" cy="10" r="10" fill={green ? "#1da851" : "#e4e4e7"} />
      {green
        ? <path d="M6 10l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        : <path d="M7 7l6 6M13 7l-6 6" stroke="#a1a1aa" strokeWidth="1.8" strokeLinecap="round" />}
    </svg>
  );
}

// ─── CTA button ───────────────────────────────────────────────────────────────
function CTA({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => window.openDUCCheckout?.()}
        className="btn-primary inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-black text-white"
        style={{ fontSize: 18, boxShadow: "0 8px 28px rgba(37,211,102,0.42)", letterSpacing: "-0.01em" }}>
        <WAIcon size={20} />{label}
      </button>
      {sub && <p style={{ fontSize: 13, color: "#71717a", textAlign: "center" }}>{sub}</p>}
    </div>
  );
}

// ─── WA chat primitives ───────────────────────────────────────────────────────
function WAChatBg({ children, height }: { children: React.ReactNode; height?: number }) {
  return (
    <div style={{
      background: "#efeae2",
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath fill='%23000000' fill-opacity='0.03' d='M0 0h20v20H0V0zm20 20h20v20H20V20z'/%3E%3C/svg%3E\")",
      padding: "10px 8px 8px",
      height: height ?? undefined,
      maxHeight: 480,
      overflow: "hidden",
    }}>
      {children}
    </div>
  );
}
function WAIn({ title, lines, time }: { title: string; lines: string[]; time: string }) {
  return (
    <div style={{ display: "flex", paddingLeft: 6, marginBottom: 8 }}>
      <div style={{ background: "#fff", borderRadius: "8px 8px 8px 0", padding: "8px 10px", maxWidth: "90%", position: "relative", boxShadow: "0 1px 2px rgba(0,0,0,0.08)" }}>
        <div style={{ position: "absolute", bottom: 0, left: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #fff transparent" }} />
        {title && <p style={{ margin: 0, color: "#111b21", fontSize: 11, fontWeight: 700, lineHeight: 1.4 }}>{title}</p>}
        {lines.map((l, i) => l
          ? <p key={i} style={{ margin: "3px 0 0", color: "#111b21", fontSize: 11, lineHeight: 1.5 }}>{l}</p>
          : <div key={i} style={{ height: 4 }} />)}
        <p style={{ margin: "4px 0 0", color: "#667781", fontSize: 9.5, textAlign: "right" }}>{time} ✓✓</p>
      </div>
    </div>
  );
}
function WAOut({ text, time }: { text: string; time: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: 6, marginBottom: 4 }}>
      <div style={{ background: "#d9fdd3", borderRadius: "8px 8px 0 8px", padding: "7px 10px", maxWidth: "65%", position: "relative" }}>
        <div style={{ position: "absolute", bottom: 0, right: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #d9fdd3 transparent" }} />
        <p style={{ margin: 0, color: "#111b21", fontSize: 11 }}>{text}</p>
        <p style={{ margin: "2px 0 0", color: "#667781", fontSize: 9.5, textAlign: "right" }}>{time} <span style={{ color: "#53bdeb" }}>✓✓</span></p>
      </div>
    </div>
  );
}
function WADateSep({ label }: { label: string }) {
  return (
    <div style={{ textAlign: "center", margin: "5px 0 8px" }}>
      <span style={{ fontSize: 9.5, color: "#667781", background: "rgba(255,255,255,0.85)", padding: "3px 10px", borderRadius: 20 }}>{label}</span>
    </div>
  );
}

// ─── Full iPhone shell (same as HeroPhone.tsx, adapted for DUC) ───────────────
type TickState = "none" | "single" | "double" | "blue";
interface PhaseState {
  headerStatus: string;
  msg1Visible: boolean;
  reply1Visible: boolean;
  reply1Ticks: TickState;
  msg2Visible: boolean;
  reply2Visible: boolean;
  reply2Ticks: TickState;
}
const INIT: PhaseState = { headerStatus: "online · 400+ members", msg1Visible: false, reply1Visible: false, reply1Ticks: "none", msg2Visible: false, reply2Visible: false, reply2Ticks: "none" };
const FINAL: PhaseState = { headerStatus: "online · 400+ members", msg1Visible: true, reply1Visible: true, reply1Ticks: "blue", msg2Visible: true, reply2Visible: true, reply2Ticks: "blue" };
const SEQ: { delay: number; patch: Partial<PhaseState> }[] = [
  { delay: 800, patch: { headerStatus: "typing…" } },
  { delay: 1400, patch: { headerStatus: "online · 400+ members", msg1Visible: true } },
  { delay: 2600, patch: { reply1Visible: true, reply1Ticks: "single" } },
  { delay: 600, patch: { reply1Ticks: "double" } },
  { delay: 600, patch: { reply1Ticks: "blue" } },
  { delay: 1200, patch: { headerStatus: "typing…" } },
  { delay: 1200, patch: { headerStatus: "online · 400+ members", msg2Visible: true } },
  { delay: 2400, patch: { reply2Visible: true, reply2Ticks: "single" } },
  { delay: 600, patch: { reply2Ticks: "double" } },
  { delay: 600, patch: { reply2Ticks: "blue" } },
];
function Tick({ state }: { state: TickState }) {
  if (state === "none") return null;
  const color = state === "blue" ? "#53bdeb" : "rgba(255,255,255,0.55)";
  return <span style={{ color, fontSize: "0.65rem", lineHeight: 1 }}>{state === "single" ? "✓" : "✓✓"}</span>;
}

function DUCPhone() {
  const [phase, setPhase] = useState<PhaseState>(INIT);
  const [started, setStarted] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase(FINAL); return;
    }
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
    const run = () => {
      clear(); setPhase(INIT);
      let cur: PhaseState = INIT; let acc = 0;
      SEQ.forEach(s => {
        acc += s.delay;
        const t = setTimeout(() => { cur = { ...cur, ...s.patch }; setPhase({ ...cur }); }, acc);
        timers.current.push(t);
      });
      const restart = setTimeout(() => { setPhase(INIT); const r = setTimeout(run, 400); timers.current.push(r); }, acc + 5000);
      timers.current.push(restart);
    };
    run(); return clear;
  }, [started]);

  return (
    <div ref={ref} className="relative mx-auto select-none" style={{ width: 270 }}>
      <div style={{
        background: "linear-gradient(160deg,#2a2a2a 0%,#1a1a1a 40%,#111 100%)",
        borderRadius: 44, padding: "10px 8px",
        boxShadow: ["0 0 0 1px #3a3a3a","0 0 0 2px #111","0 32px 64px -12px rgba(0,0,0,0.55)","0 12px 32px -8px rgba(0,0,0,0.4)","inset 0 1px 0 rgba(255,255,255,0.08)"].join(", "),
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
          <div style={{ position: "relative", background: "#1da851", paddingTop: 12, display: "flex", justifyContent: "center" }}>
            <div style={{ width: 120, height: 34, background: "#000", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#1a1a1a", border: "1px solid #333", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#2a2a2a" }} />
              </div>
              <div style={{ width: 56, height: 16, borderRadius: 8, background: "#1a1a1a" }} />
            </div>
          </div>
          {/* Status bar */}
          <div style={{ background: "#1da851", padding: "8px 16px 6px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 11, color: "#fff", fontWeight: 600 }}>
            <span>9:41</span>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <span style={{ fontSize: 10, fontWeight: 700 }}>100%</span>
            </div>
          </div>
          {/* WA header */}
          <div style={{ background: "#1da851", padding: "8px 12px 10px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", flexShrink: 0, border: "1.5px solid rgba(255,255,255,0.3)", background: "#0a4d1f", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 16 }}>🌱</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, color: "#fff", fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em", display: "flex", alignItems: "center", gap: 4 }}>
                Daily Upgrade Club
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="12" fill="#4fc3f7" />
                  <path d="M6.5 12.5l3.5 3.5 7-7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </p>
              <p style={{ margin: 0, color: phase.headerStatus === "typing…" ? "#e8f5e9" : "rgba(255,255,255,0.75)", fontSize: 11, marginTop: 2, transition: "color 0.3s" }}>
                {phase.headerStatus}
              </p>
            </div>
          </div>
          {/* Chat */}
          <div style={{ background: "#efeae2", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath fill='%23000000' fill-opacity='0.03' d='M0 0h20v20H0V0zm20 20h20v20H20V20z'/%3E%3C/svg%3E\")", minHeight: 440, padding: "12px 8px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ textAlign: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: "#667781", background: "rgba(255,255,255,0.85)", padding: "3px 10px", borderRadius: 20 }}>Today · ⚡ Energy Month</span>
            </div>
            {phase.msg1Visible && (
              <div className="wa-anim-in-left" style={{ display: "flex", paddingLeft: 6 }}>
                <div style={{ background: "#fff", borderRadius: "8px 8px 8px 0", padding: "8px 10px", maxWidth: "85%", position: "relative", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                  <div style={{ position: "absolute", bottom: 0, left: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #fff transparent" }} />
                  <p style={{ margin: 0, color: "#111b21", fontSize: 12, fontWeight: 700, lineHeight: 1.4 }}>⚡ Day 3 habit is here!</p>
                  <p style={{ margin: "5px 0 0", color: "#111b21", fontSize: 11.5, lineHeight: 1.5 }}>Step outside for 5 min of natural sunlight — within 30 min of waking up.</p>
                  <p style={{ margin: "4px 0 0", color: "#111b21", fontSize: 11.5, lineHeight: 1.5 }}>Why: Resets your cortisol clock. Controls your energy for the entire day. 🌞</p>
                  <p style={{ margin: "4px 0 0", color: "#667781", fontSize: 10, textAlign: "right" }}>7:00 AM</p>
                </div>
              </div>
            )}
            {phase.reply1Visible && (
              <div className="wa-anim-in-right" style={{ display: "flex", justifyContent: "flex-end", paddingRight: 6 }}>
                <div style={{ background: "#d9fdd3", borderRadius: "8px 8px 0 8px", padding: "7px 10px", maxWidth: "65%", position: "relative", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                  <div style={{ position: "absolute", bottom: 0, right: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #d9fdd3 transparent" }} />
                  <p style={{ margin: 0, color: "#111b21", fontSize: 12 }}>✅ DONE — felt amazing!</p>
                  <p style={{ margin: "3px 0 0", color: "#667781", fontSize: 10, textAlign: "right", display: "flex", gap: 4, justifyContent: "flex-end", alignItems: "center" }}>
                    <span>7:08 AM</span><Tick state={phase.reply1Ticks} />
                  </p>
                </div>
              </div>
            )}
            {phase.msg2Visible && (
              <div className="wa-anim-in-left" style={{ display: "flex", paddingLeft: 6 }}>
                <div style={{ background: "#fff", borderRadius: "8px 8px 8px 0", padding: "8px 10px", maxWidth: "85%", position: "relative", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                  <div style={{ position: "absolute", bottom: 0, left: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #fff transparent" }} />
                  <p style={{ margin: 0, color: "#111b21", fontSize: 12, lineHeight: 1.5 }}>🔥 Day 3 streak! The energy shift starts tomorrow. See you at 7 AM.</p>
                  <p style={{ margin: "4px 0 0", color: "#667781", fontSize: 10, textAlign: "right" }}>7:09 AM</p>
                </div>
              </div>
            )}
            {phase.reply2Visible && (
              <div className="wa-anim-in-right" style={{ display: "flex", justifyContent: "flex-end", paddingRight: 6 }}>
                <div style={{ background: "#d9fdd3", borderRadius: "8px 8px 0 8px", padding: "7px 10px", maxWidth: "70%", position: "relative", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                  <div style={{ position: "absolute", bottom: 0, right: -7, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: "transparent transparent #d9fdd3 transparent" }} />
                  <p style={{ margin: 0, color: "#111b21", fontSize: 12 }}>Can&apos;t wait for tomorrow 🚀</p>
                  <p style={{ margin: "3px 0 0", color: "#667781", fontSize: 10, textAlign: "right", display: "flex", gap: 4, justifyContent: "flex-end", alignItems: "center" }}>
                    <span>7:10 AM</span><Tick state={phase.reply2Ticks} />
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

// ─── Static iPhone shell for 3-demo section ───────────────────────────────────
function PhoneGlow({ children, from, to, accent }: {
  children: React.ReactNode;
  from: string;
  to: string;
  accent: string;
}) {
  return (
    <div
      className="relative w-full flex justify-center px-5 pt-9 pb-7"
      style={{
        borderRadius: 40,
        background: `linear-gradient(160deg, ${from} 0%, ${to} 100%)`,
        boxShadow: `0 24px 60px -18px ${accent}, inset 0 1px 0 rgba(255,255,255,0.25)`,
        overflow: "hidden",
      }}
    >
      {/* Soft radial glow highlights for a premium, dimensional feel */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 80% at 50% -10%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 55%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: "-20%", bottom: "-25%", width: "70%", height: "60%", background: `radial-gradient(circle, ${accent} 0%, rgba(255,255,255,0) 70%)`, filter: "blur(24px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: "-15%", top: "-10%", width: "55%", height: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 70%)", filter: "blur(20px)", pointerEvents: "none" }} />
      <div className="relative">{children}</div>
    </div>
  );
}

function StaticPhone({ children, contact = "Daily Upgrade Club", status = "online" }: {
  children: React.ReactNode;
  contact?: string;
  status?: string;
}) {
  return (
    <div className="relative mx-auto select-none" style={{ width: 270 }}>
      <div style={{
        background: "linear-gradient(160deg,#2a2a2a 0%,#1a1a1a 40%,#111 100%)",
        borderRadius: 44, padding: "10px 8px",
        boxShadow: ["0 0 0 1px #3a3a3a","0 0 0 2px #111","0 28px 56px -12px rgba(0,0,0,0.5)","0 10px 28px -8px rgba(0,0,0,0.35)","inset 0 1px 0 rgba(255,255,255,0.08)"].join(", "),
        position: "relative",
      }}>
        <div style={{ position: "absolute", left: -3, top: 88, width: 3, height: 34, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -3, top: 132, width: 3, height: 58, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -3, top: 198, width: 3, height: 58, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", right: -3, top: 148, width: 3, height: 72, background: "#2a2a2a", borderRadius: "0 2px 2px 0" }} />
        <div style={{ borderRadius: 36, overflow: "hidden", background: "#000" }}>
          {/* Dynamic Island */}
          <div style={{ background: "#1da851", paddingTop: 12, display: "flex", justifyContent: "center" }}>
            <div style={{ width: 120, height: 34, background: "#000", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#1a1a1a", border: "1px solid #333", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#2a2a2a" }} />
              </div>
              <div style={{ width: 56, height: 16, borderRadius: 8, background: "#1a1a1a" }} />
            </div>
          </div>
          {/* Status bar */}
          <div style={{ background: "#1da851", padding: "8px 16px 6px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: "#fff", fontWeight: 600 }}>
            <span>9:41</span><span style={{ fontSize: 10, fontWeight: 700 }}>100%</span>
          </div>
          {/* WA header */}
          <div style={{ background: "#1da851", padding: "8px 12px 10px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", flexShrink: 0, border: "1.5px solid rgba(255,255,255,0.3)", background: "#0a4d1f", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 16 }}>🌱</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, color: "#fff", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                {contact}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#4fc3f7" /><path d="M6.5 12.5l3.5 3.5 7-7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </p>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: 11, marginTop: 2 }}>{status}</p>
            </div>
          </div>
          {/* Chat content */}
          {children}
          {/* Home bar */}
          <div style={{ background: "#efeae2", padding: "8px 0 12px", display: "flex", justifyContent: "center" }}>
            <div style={{ width: 120, height: 5, background: "rgba(0,0,0,0.15)", borderRadius: 3 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="duc-glow-card rounded-xl overflow-hidden border" style={{ borderColor: "#e2dfd6" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left font-semibold bg-white hover:bg-stone-50 transition-colors" style={{ color: "#18181b", fontSize: 14 }}>
        {q}
        <span className="shrink-0 text-xl font-light" style={{ color: "#25d366", display: "inline-block", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
      </button>
      {open && <div className="px-5 pb-5 leading-relaxed bg-white" style={{ fontSize: 13, color: "#71717a" }}>{a}</div>}
    </div>
  );
}

// ─── Overlays ─────────────────────────────────────────────────────────────────
function StickyBottomCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const f = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", f, { passive: true }); f();
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div className={`fixed bottom-0 inset-x-0 z-50 transition-all duration-300 ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}>
      <div className="px-4 pb-3 pt-2 md:hidden" style={{ background: "linear-gradient(to top,#faf8f3 70%,transparent)", backdropFilter: "blur(8px)" }}>
        <button onClick={() => window.openDUCCheckout?.()} className="w-full flex items-center justify-between gap-3 rounded-2xl px-5 py-3" style={{ background: "linear-gradient(135deg,#1da851,#25d366)", boxShadow: "0 4px 20px rgba(37,211,102,0.4)" }}>
          <div><p className="text-white font-black text-sm leading-tight">Start My ₹1 Trial →</p><p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.8)" }}>7 days · ₹1 · Cancel anytime</p></div>
          <div className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}><WAIcon size={15} /><span className="text-white font-bold text-sm">Join</span></div>
        </button>
      </div>
      <div className="hidden md:block px-6 pb-4 pt-3" style={{ background: "linear-gradient(to top,#faf8f3 70%,transparent)", backdropFilter: "blur(8px)" }}>
        <div className="max-w-lg mx-auto">
          <button onClick={() => window.openDUCCheckout?.()} className="w-full flex items-center justify-between gap-4 rounded-2xl px-6 py-3.5" style={{ background: "linear-gradient(135deg,#1da851,#25d366)", boxShadow: "0 4px 20px rgba(37,211,102,0.4)" }}>
            <div><p className="text-white font-black text-sm leading-tight">Start My 7-Day Trial — ₹1 →</p><p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.8)" }}>Then ₹99/month · Cancel anytime before Day 7</p></div>
            <div className="flex items-center gap-2 rounded-xl px-4 py-2 shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}><WAIcon size={16} /><span className="text-white font-bold text-sm">Join Now</span></div>
          </button>
        </div>
      </div>
    </div>
  );
}


const NAMES = [
  { name: "Rahul", city: "Delhi" }, { name: "Priya", city: "Mumbai" }, { name: "Aditya", city: "Bengaluru" },
  { name: "Sneha", city: "Pune" }, { name: "Vikram", city: "Hyderabad" }, { name: "Anjali", city: "Chennai" },
  { name: "Karan", city: "Jaipur" }, { name: "Divya", city: "Ahmedabad" }, { name: "Manish", city: "Kolkata" },
  { name: "Meera", city: "Surat" }, { name: "Arjun", city: "Lucknow" }, { name: "Tanvi", city: "Nagpur" },
  { name: "Nikhil", city: "Indore" }, { name: "Kavya", city: "Kochi" }, { name: "Ritesh", city: "Bhopal" },
];
let _tid = 0;
function tAgo() { const r = Math.random(); return r < 0.3 ? `${Math.floor(r * 150 + 10)}s ago` : r < 0.6 ? "just now" : `${Math.floor(r * 5 + 1)} min ago`; }

function LiveToast() {
  interface T { id: number; name: string; city: string; time: string }
  const [toasts, setToasts] = useState<T[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const used = useRef<Set<number>>(new Set());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => { const f = () => { if (window.scrollY > 300) setScrolled(true); }; window.addEventListener("scroll", f, { passive: true }); f(); return () => window.removeEventListener("scroll", f); }, []);
  useEffect(() => {
    if (!scrolled) return;
    const spawn = () => {
      let idx: number; do { idx = Math.floor(Math.random() * NAMES.length); } while (used.current.has(idx));
      used.current.add(idx); if (used.current.size > 5) { const f = used.current.values().next().value as number; used.current.delete(f); }
      const p = NAMES[idx]; const id = ++_tid;
      setToasts(prev => [{ id, name: p.name, city: p.city, time: tAgo() }, ...prev].slice(0, 3));
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
      timer.current = setTimeout(spawn, 7000 + Math.random() * 11000);
    };
    timer.current = setTimeout(spawn, 3000 + Math.random() * 3000);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [scrolled]);
  if (!scrolled || toasts.length === 0) return null;
  return (
    <div className="fixed left-2 z-40 flex flex-col gap-2 pointer-events-none bottom-[100px] md:bottom-[90px]" aria-live="polite">
      {toasts.map((t, i) => (
        <div key={t.id} className="pointer-events-auto" style={{ opacity: i === 0 ? 1 : 0.65 - i * 0.15, transform: `scale(${1 - i * 0.03})`, transformOrigin: "bottom left", animation: "duc-fadein 0.3s ease" }}>
          <div className="flex items-center gap-2 rounded-2xl px-3 py-2 w-[240px]" style={{ background: "#fff", border: "1px solid #e2dfd6", boxShadow: "0 4px 16px rgba(0,0,0,0.09)" }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ background: `hsl(${(t.name.charCodeAt(0) * 37) % 360},55%,48%)` }}>{t.name[0]}</div>
            <div className="flex-1 min-w-0">
              <p className="font-bold leading-snug truncate" style={{ fontSize: 11, color: "#18181b" }}>{t.name} from {t.city}</p>
              <p className="leading-snug mt-0.5" style={{ fontSize: 10, color: "#71717a" }}>joined Daily Upgrade Club · {t.time}</p>
            </div>
            <span className="relative flex w-2 h-2 shrink-0"><span className="absolute inline-flex w-full h-full rounded-full animate-ping opacity-75" style={{ background: "#25d366" }} /><span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: "#25d366" }} /></span>
          </div>
        </div>
      ))}
    </div>
  );
}

function TrialPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const shown = useRef(false);
  useEffect(() => {
    const t = setTimeout(() => {
      if (shown.current) return;
      try { if (localStorage.getItem("duc_pop") === "1") return; } catch { /**/ }
      shown.current = true; setVisible(true);
    }, 15000);
    return () => clearTimeout(t);
  }, []);
  const dismiss = () => { setVisible(false); setDismissed(true); try { localStorage.setItem("duc_pop", "1"); } catch { /**/ } };
  if (!visible || dismissed) return null;
  return (
    <>
      <div className="fixed inset-0 z-[100]" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }} onClick={dismiss} />
      <div className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-sm rounded-3xl overflow-hidden" onClick={e => e.stopPropagation()} style={{ background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.22)", animation: "duc-fadein 0.35s ease" }}>
          <div className="relative px-6 pt-7 pb-5 text-center" style={{ background: "linear-gradient(135deg,#1da851,#25d366)" }}>
            <button onClick={dismiss} className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full cursor-pointer" style={{ background: "rgba(255,255,255,0.2)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>
            </button>
            <p className="text-3xl mb-2">🌱</p>
            <h2 className="text-white font-black leading-snug" style={{ fontSize: 18 }}>Your first healthy habit is waiting</h2>
          </div>
          <div className="px-6 py-5 text-center">
            <p style={{ fontSize: 14, color: "#3f3f46", lineHeight: 1.7, marginBottom: 16 }}>
              Join Daily Upgrade Club for just <strong style={{ color: "#18181b" }}>₹1 today</strong> and get 1 science-backed tiny healthy habit every morning on WhatsApp — with accountability, streaks and guidance to keep you consistent.
            </p>
            <div className="flex flex-col gap-2 mb-5 text-left">
              {["No complicated routines", "Under 5 minutes a day", "Cancel anytime"].map(t => (
                <div key={t} className="flex items-center gap-2" style={{ fontSize: 13, color: "#4a4a52" }}>
                  <span style={{ color: "#25d366", fontWeight: 700 }}>✅</span>{t}
                </div>
              ))}
            </div>
            <button onClick={() => { dismiss(); window.openDUCCheckout?.(); }} className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full font-black text-white btn-primary" style={{ fontSize: 16, boxShadow: "0 6px 20px rgba(37,211,102,0.4)" }}>
              <WAIcon size={18} />Start My ₹1 Trial →
            </button>
            <p style={{ fontSize: 12, color: "#a1a1aa", marginTop: 8 }}>Then ₹99/month · Cancel anytime</p>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── TinyGainsDUC ────────────────────────────────────────────────────────────
// "The power of tiny healthy habits — Get just 1% better every day"
// Ported from src/components/TinyGains.tsx, re-skinned for DUC palette.
const VW = 720, VH = 460, X0 = 90, Y0 = 360, XEND = 660, TOP = 40;
const BETTER_PATH = `M ${X0} ${Y0} C ${X0 + 240} ${Y0 - 8}, ${XEND - 140} ${Y0 - 70}, ${XEND} ${TOP}`;

function TinyGainsDUC() {
  const [shown, setShown] = useState(false);
  const [count, setCount] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setShown(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!shown) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setCount(37); return; }
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setCount(1 + (1 - Math.pow(1 - p, 3)) * 36);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown]);

  return (
    <section ref={ref} style={{ background: "#fff", borderTop: "1px solid #e4e4e7" }} className="py-16 lg:py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-10 lg:mb-12">
          <p className="duc-label mb-3" style={{ color: "#25d366" }}>The power of tiny healthy habits</p>
          <h2 className="duc-h2 mb-4" style={{ color: "#18181b" }}>
            Get just <span style={{ color: "#25d366" }}>1% better</span> every day…
          </h2>
          <p className="duc-body max-w-2xl mx-auto" style={{ color: "#52525b" }}>
            A tiny healthy habit feels like nothing on Day 1. But small wins add up. Keep going and the math is shocking — you can become a{" "}
            <strong style={{ color: "#18181b" }}>37× better version of yourself</strong> in just 1 year!
          </p>
        </div>
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl text-center" style={{ background: "rgba(37,211,102,0.08)", border: "1.5px solid rgba(37,211,102,0.3)" }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#18181b" }}>
              1% better every day ={" "}
              <span style={{ color: "#25d366" }}>37× better version of yourself in just 1 year</span> 🚀
            </span>
          </div>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" style={{ overflow: "visible" }}>
            <line x1={X0} y1={TOP - 10} x2={X0} y2={Y0 + 60} stroke="#cbd5e1" strokeWidth={2.5} strokeLinecap="round" />
            <line x1={X0} y1={Y0 + 60} x2={XEND + 20} y2={Y0 + 60} stroke="#cbd5e1" strokeWidth={2.5} strokeLinecap="round" />
            <text x={X0 - 14} y={(TOP + Y0) / 2} textAnchor="middle" fontSize={15} fill="#64748b" transform={`rotate(-90 ${X0 - 56} ${(TOP + Y0) / 2})`}>Growth</text>
            <text x={X0 - 16} y={Y0 + 5} textAnchor="end" fontSize={16} fontWeight={700} fill="#475569">1</text>
            <text x={X0} y={Y0 + 84} textAnchor="middle" fontSize={14} fill="#64748b">Today</text>
            <text x={XEND} y={Y0 + 84} textAnchor="middle" fontSize={14} fontWeight={700} fill="#475569">1 Year</text>
            <line x1={X0} y1={Y0} x2={XEND} y2={Y0} stroke="#94a3b8" strokeWidth={2.5} strokeDasharray="8 8" style={{ opacity: shown ? 1 : 0, transition: "opacity 0.6s 0.3s" }} />
            <text x={XEND - 4} y={Y0 - 12} textAnchor="end" fontSize={13} fill="#94a3b8" style={{ opacity: shown ? 1 : 0, transition: "opacity 0.6s 0.6s" }}>No change — stay the same</text>
            <path d={BETTER_PATH} fill="none" stroke="#25d366" strokeWidth={4.5} strokeLinecap="round" pathLength={1}
              style={{ strokeDasharray: 1, strokeDashoffset: shown ? 0 : 1, transition: "stroke-dashoffset 1.8s ease 0.3s" }} />
            <g style={{ opacity: shown ? 1 : 0, transition: "opacity 0.5s 1.7s" }}>
              <rect x={XEND - 220} y={TOP + 4} width={120} height={46} rx={12} fill="#25d366" />
              <text x={XEND - 160} y={TOP + 33} textAnchor="middle" fontSize={24} fontWeight={900} fill="#fff">{Math.round(count)}× 🚀</text>
            </g>
            <g style={{ opacity: shown ? 1 : 0, transition: "opacity 0.6s 0.2s" }}>
              <image href="/value/before.png" x={X0 - 42} y={Y0 - 8} width={84} height={84} preserveAspectRatio="xMidYMid meet" />
            </g>
            <g style={{ opacity: shown ? 1 : 0, transition: "opacity 0.6s 1.9s" }}>
              <image href="/value/after.png" x={XEND - 30} y={TOP - 36} width={96} height={96} preserveAspectRatio="xMidYMid meet" />
            </g>
          </svg>
          <div className="absolute" style={{ left: `${(X0 / VW) * 100}%`, top: `${(Y0 / VH) * 100}%`, transform: "translate(-50%, 64px)" }}>
            <div className="whitespace-nowrap rounded-full text-xs font-bold px-3 py-1.5 shadow-lg" style={{ background: "#18181b", color: "#fff", opacity: shown ? 1 : 0, transform: shown ? "translateY(0)" : "translateY(6px)", transition: "all 0.5s 0.4s" }}>
              👉 You are here
            </div>
          </div>
        </div>
        <div className="text-center mt-12 lg:mt-14">
          <p style={{ fontSize: 19, fontWeight: 700, color: "#18181b", maxWidth: 560, margin: "0 auto 8px", lineHeight: 1.4 }}>
            If you do nothing, nothing changes.
          </p>
          <p style={{ fontSize: 16, color: "#52525b", maxWidth: 560, margin: "0 auto 32px", lineHeight: 1.7 }}>
            Daily Upgrade Club gives you your 1% — one tiny healthy habit a day, on WhatsApp. The small wins do the rest.
          </p>
          <CTA label="Start My 1% Today →" sub="7-day trial for ₹1 · Then ₹99/month" />
        </div>
      </div>
    </section>
  );
}

// ─── Meta Pixel ViewContent event ────────────────────────────────────────────
function useMetaPixelViewContent() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "ViewContent", {
        content_name: "Daily Upgrade Club",
        content_category: "WhatsApp Habit Club",
        value: 1,
        currency: "INR",
      });
    }
  }, []);
}

// ═════════════════════════════════════════════════════════════════════════════
// PAGE
// ═════════════════════════════════════════════════════════════════════════════
export default function DailyUpgradeClubPage() {
  useMetaPixelViewContent();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const openCheckout = useCallback(() => setCheckoutOpen(true), []);
  const closeCheckout = useCallback(() => setCheckoutOpen(false), []);

  // Expose globally so inline <a> tags and other components can open it
  useEffect(() => {
    window.openDUCCheckout = openCheckout;
    return () => { delete window.openDUCCheckout; };
  }, [openCheckout]);

  return (
    <div id="duc-top" style={{ background: "#faf8f3", minHeight: "100vh", color: "#18181b", fontSize: 15 }}>
      <DUCCheckout isOpen={checkoutOpen} onClose={closeCheckout} />
      <style>{`
        @keyframes duc-fadein{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .duc-h1{font-size:clamp(2.1rem,5vw,3.2rem);font-weight:900;line-height:1.12;letter-spacing:-0.025em}
        .duc-h2{font-size:clamp(1.6rem,3.5vw,2.4rem);font-weight:800;line-height:1.18;letter-spacing:-0.02em}
        .duc-body{font-size:clamp(1rem,1.8vw,1.0625rem);line-height:1.75;color:#52525b}
        .duc-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:#25d366}
        .duc-card{background:#fff;border:1px solid #e2dfd6;border-radius:16px;padding:20px}
        .duc-section-title{background:linear-gradient(135deg,#18181b 0%,#3f3f46 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .duc-glass{background:rgba(255,255,255,0.7);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.9)}
        .duc-glow-card{box-shadow:0 4px 24px rgba(37,211,102,0.08),0 1px 3px rgba(0,0,0,0.06);transition:box-shadow 0.2s,transform 0.2s}
        .duc-glow-card:hover{box-shadow:0 8px 32px rgba(37,211,102,0.14),0 2px 8px rgba(0,0,0,0.08);transform:translateY(-2px)}
        @keyframes theme-pulse{0%,100%{box-shadow:0 4px 24px rgba(37,211,102,0.08),0 1px 3px rgba(0,0,0,0.06);transform:translateY(0)}40%{box-shadow:0 0 0 3px rgba(37,211,102,0.55),0 8px 32px rgba(37,211,102,0.22);transform:translateY(-4px)}60%{box-shadow:0 0 0 3px rgba(37,211,102,0.55),0 8px 32px rgba(37,211,102,0.22);transform:translateY(-4px)}}
        .theme-card-anim{animation:theme-pulse 1.6s ease-in-out infinite}
        /* SHIFT pointers grid: split at the SAME point as the image's before/after divider (53.12%) */
        .shift-split{display:grid;grid-template-columns:1fr}
        .shift-arrow{left:50%}
        @media (min-width:768px){.shift-split{grid-template-columns:53.12% 46.88%}.shift-arrow{left:53.12%}}
      `}</style>

      {/* ══ 0. ANNOUNCEMENT BAR ══════════════════════════════════════════════ */}
      <div style={{ background: "linear-gradient(90deg,#1da851 0%,#25d366 50%,#1da851 100%)", padding: "10px 16px" }}>
        <p className="text-center font-semibold text-white" style={{ fontSize: 13, letterSpacing: "0.01em", lineHeight: 1.4 }}>
          ✦ The proven 5-minute daily habit system thousands have used to become fitter, healthier, more energetic — on WhatsApp ✦
        </p>
      </div>

      {/* ══ 1. HERO ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden mesh-bg" style={{ borderBottom: "1px solid #e2dfd6" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-4 pb-10 lg:pt-6 lg:pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100vh-72px)]">

            {/* LEFT */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 animate-fade-up accent-pill" style={{ fontSize: 13, fontWeight: 700 }}>
                <span className="w-2 h-2 rounded-full inline-block animate-pulse" style={{ background: "#25d366" }} />
                For busy people who want better health without complicated routines
              </div>

              {/* Headline */}
              <h1 className="duc-h1 text-foreground animate-fade-up delay-100 mb-5">
                What if staying fit, healthy &amp;<br />
                energetic needed only<br />
                <span className="gradient-text">5 minutes a day?</span>
              </h1>

              {/* Subhead — with DUC bold+underline + WhatsApp visual callout */}
              <div className="animate-fade-up delay-150 mb-7 max-w-lg mx-auto lg:mx-0 relative">
                <p style={{ fontSize: 16, lineHeight: 1.75, color: "#52525b" }}>
                  <span style={{ fontWeight: 800, color: "#18181b", position: "relative", display: "inline-block" }}>
                    Daily Upgrade Club
                    {/* hand-drawn underline */}
                    <svg viewBox="0 0 200 10" aria-hidden="true" style={{ position: "absolute", bottom: -4, left: 0, width: "100%", height: 8, overflow: "visible" }}>
                      <path d="M2 6 Q50 2 100 6 Q150 10 198 5" stroke="#25d366" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    </svg>
                  </span>{" "}
                  gives you 1 science-backed healthy habit every morning — plus personal accountability, streak tracking, monthly habit themes, and community access designed to help you become healthier every day.
                </p>

                {/* WhatsApp callout — label shifted right, clean arrow only */}
                <div className="hidden lg:block absolute pointer-events-none"
                  style={{ right: -260, top: 0 }}>
                  {/* Label */}
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full font-bold mb-2"
                    style={{ background: "#25d366", color: "#fff", fontSize: 15, whiteSpace: "nowrap", boxShadow: "0 6px 20px rgba(37,211,102,0.45)", letterSpacing: "-0.01em", marginLeft: 20 }}>
                    <WAIcon size={17} />
                    All on WhatsApp
                  </div>
                  {/* Clean dashed arrow — smooth curve with aligned arrowhead */}
                  <svg width="200" height="100" viewBox="0 0 200 100" fill="none" style={{ marginLeft: 10 }}>
                    <path d="M12 12 C22 55 70 92 178 84" stroke="#25d366" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="6 5" />
                    <path d="M164 72 L182 84 L162 92" stroke="#25d366" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Mobile — inline badge */}
                <div className="flex lg:hidden items-center gap-2 mt-3">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full font-bold"
                    style={{ background: "#25d366", color: "#fff", fontSize: 14, boxShadow: "0 4px 14px rgba(37,211,102,0.35)" }}>
                    <WAIcon size={15} />
                    All on WhatsApp — no extra apps needed
                  </div>
                </div>
              </div>

              {/* Objection-busters above CTA — single line, dot-separated */}
              <div className="animate-fade-up delay-250 flex items-center justify-center lg:justify-start flex-wrap gap-x-3 gap-y-1 mb-5">
                {["No 5 AM wake-up pressure", "No complicated routines", "Fits perfectly into your schedule"].map((line, i, arr) => (
                  <span key={line} className="flex items-center gap-3">
                    <span style={{ fontSize: 14, color: "#3f3f46", fontWeight: 600 }}>{line}</span>
                    {i < arr.length - 1 && <span style={{ color: "#25d366", fontSize: 16, fontWeight: 900 }}>·</span>}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="animate-fade-up delay-300 flex flex-col items-center lg:items-start gap-2 mb-8">
                <button
                  onClick={() => window.openDUCCheckout?.()}
                  className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-full font-black text-white"
                  style={{ fontSize: 20, boxShadow: "0 8px 28px rgba(37,211,102,0.42)" }}>
                  <WAIcon size={22} />Start 7-Day Trial for ₹1
                </button>
                <p style={{ fontSize: 13, color: "#71717a", textAlign: "center" }}>Then ₹99/month · Cancel anytime</p>
              </div>

              {/* Social proof — supercareer style */}
              <div className="animate-fade-up delay-400 flex items-center gap-4 justify-center lg:justify-start">
                {/* Stacked avatars */}
                <div className="flex -space-x-2 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/avatars/women/woman-1.jpg" alt="" className="w-9 h-9 rounded-full object-cover border-2 border-white" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/avatars/women/woman-3.avif" alt="" className="w-9 h-9 rounded-full object-cover border-2 border-white" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/avatars/men/man-1.jpg" alt="" className="w-9 h-9 rounded-full object-cover border-2 border-white" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/avatars/women/woman-1.jpg" alt="" className="w-9 h-9 rounded-full object-cover border-2 border-white" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/avatars/men/man-1.jpg" alt="" className="w-9 h-9 rounded-full object-cover border-2 border-white" />
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">{[1,2,3,4,5].map(i=><Star key={i}/>)}</div>
                  <p style={{ fontSize: 13, color: "#52525b" }}>
                    <strong style={{ color: "#18181b" }}>Loved by 2,800+ members</strong> across India
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT — full iPhone with animation */}
            <div className="lg:col-span-5 flex justify-center items-start animate-fade-up delay-300 lg:-mt-10 mt-6">
              <div className="relative">
                <DUCPhone />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ 2. PAIN POINTS ════════════════════════════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">Be honest with yourself</p>
            <h2 className="duc-h2 duc-section-title mb-3">Does this sound like you?</h2>
            <p className="duc-body max-w-sm mx-auto">If you nodded at one of these, <strong style={{ color: "#18181b" }}>Daily Upgrade Club</strong> was built for you!</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: "😮‍💨", text: "You know what's healthy — but can't make it stick when life gets busy.", color: "#6366f1", solidBg: "#eef2ff", border: "#c7d2fe", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80" },
              { icon: "🔄", text: "You start motivated every Monday, drop it by Thursday, restart next week.", color: "#d97706", solidBg: "#fffbeb", border: "#fde68a", img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&q=80" },
              { icon: "😵", text: "You try fixing everything at once — diet, gym, sleep — and end up doing none of them.", color: "#db2777", solidBg: "#fdf2f8", border: "#f9a8d4", img: "https://images.unsplash.com/photo-1541199249251-f713e6145474?w=400&q=80" },
              { icon: "🤷", text: "Without accountability, the moment motivation dips the habit disappears.", color: "#7c3aed", solidBg: "#f5f3ff", border: "#ddd6fe", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80" },
              { icon: "⏰", text: "A 1-hour wellness routine isn't realistic — but doing nothing feels wrong.", color: "#059669", solidBg: "#ecfdf5", border: "#6ee7b7", img: "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=400&q=80" },
              { icon: "📱", text: "5 apps downloaded. 3 courses bought. 40 articles bookmarked. Nothing stuck.", color: "#0284c7", solidBg: "#f0f9ff", border: "#bae6fd", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80" },
            ].map((p, i) => (
              <div key={i} className="duc-glow-card rounded-2xl overflow-hidden flex flex-col" style={{ background: p.solidBg, border: `2px solid ${p.border}` }}>
                {/* Image fading into card bg — same pattern as theme cards */}
                <div className="relative h-36 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 35%, ${p.solidBg} 100%)` }} />
                  <div className="absolute bottom-2 left-3 flex items-center gap-2">
                    <span style={{ fontSize: 24 }}>{p.icon}</span>
                  </div>
                </div>
                {/* Text below image, inside card bg */}
                <div className="px-4 pb-4 pt-2 flex-1">
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#18181b", lineHeight: 1.6 }}>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl p-6 text-center" style={{ background: "linear-gradient(135deg,rgba(37,211,102,0.08),rgba(29,168,81,0.04))", border: "1px solid rgba(37,211,102,0.18)" }}>
            <p className="font-bold mb-2" style={{ fontSize: 17, color: "#18181b" }}>This isn&apos;t a discipline problem.</p>
            <p className="duc-body mb-5">It&apos;s a <strong style={{ color: "#1da851" }}>system problem.</strong> Get the exact proven system to actually build healthier habits and stay consistent for lifetime</p>
            <button
              onClick={() => window.openDUCCheckout?.()}
              className="btn-primary inline-flex items-center gap-3 px-8 py-4 rounded-full font-black text-white"
              style={{ fontSize: 16, boxShadow: "0 8px 28px rgba(37,211,102,0.42)" }}>
              <WAIcon size={18} />Start 7-Day Trial for ₹1
            </button>
            <p className="mt-2" style={{ fontSize: 12, color: "#71717a" }}>Then ₹99/month · Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* ══ 3. THE SHIFT ══════════════════════════════════════════════════════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">THE SHIFT</p>
            <h2 className="duc-h2 duc-section-title mb-3">Where you are now <span style={{ color: "#25d366" }}>→</span> where you&apos;ll be in 30 days</h2>
            <p className="duc-body max-w-md mx-auto">Same busy schedule. But a completely different version of yourself.</p>
          </div>
          {/* Unified SHIFT card — image on top, before/after pointers at the bottom */}
          <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#e4e4e7", background: "#fff", boxShadow: "0 12px 40px -14px rgba(0,0,0,0.15)" }}>

            {/* Visual — 3 life areas (energy, sleep, health) in one image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/goals/shift-before-after-v2.png" alt="Before and after across energy, sleep and health after 30 days" style={{ display: "block", width: "100%", height: "auto" }} loading="lazy" />

            {/* Life-area legend */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-3" style={{ borderTop: "1px solid #e4e4e7", background: "#fafafa" }}>
              {[["⚡", "Energy"], ["😴", "Sleep"], ["❤️", "Health"]].map(([icon, label]) => (
                <span key={label} className="inline-flex items-center gap-1.5" style={{ fontSize: 13, fontWeight: 700, color: "#3f3f46" }}>
                  <span style={{ fontSize: 15 }}>{icon}</span>{label}
                </span>
              ))}
            </div>

            {/* Before / After pointers at the bottom of the image */}
            <div className="shift-split relative" style={{ borderTop: "1px solid #e4e4e7" }}>
              {/* Arrow between the two columns — aligned to the image divider (53.12%) */}
              <div
                className="shift-arrow absolute top-1/2 z-10 flex items-center justify-center rounded-full"
                style={{
                  transform: "translate(-50%, -50%)",
                  width: 52,
                  height: 52,
                  background: "#25d366",
                  boxShadow: "0 8px 22px rgba(37,211,102,0.5), 0 0 0 6px #fff",
                }}
                aria-hidden="true"
              >
                {/* Desktop: right arrow */}
                <svg className="hidden md:block" width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* Mobile: down arrow */}
                <svg className="md:hidden" width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M12 4v14M6 13l6 6 6-6" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Day 0 — Today */}
              <div className="p-6 md:border-r" style={{ background: "#fafafa", borderColor: "#e4e4e7" }}>
                <div className="inline-flex items-center px-3 py-1 rounded-full mb-5" style={{ background: "#fee2e2", color: "#991b1b", border: "1px solid #fca5a5", fontSize: 12, fontWeight: 700 }}>Day 0 — Today</div>
                <div className="flex flex-col gap-3.5">
                  {[
                    "No direction on where to even start",
                    "Too much to fix, too little time",
                    "Zero accountability — habits disappear with motivation",
                    "Wellness apps collecting dust on your phone",
                    "Good intentions that never survive a busy week",
                    "Low energy, less focus, poor sleep",
                    "\"I'll start properly next week\"",
                  ].map((b, i) => (
                    <div key={i} className="flex items-center gap-3"><Check /><span style={{ fontSize: 14, color: "#52525b", lineHeight: 1.6 }}>{b}</span></div>
                  ))}
                </div>
              </div>

              {/* After 30 Days */}
              <div className="p-6 relative overflow-hidden" style={{ background: "#f0fdf4" }}>
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full" style={{ background: "rgba(37,211,102,0.08)" }} aria-hidden="true" />
                <div className="relative">
                  <div className="inline-flex items-center px-3 py-1 rounded-full mb-5 badge-after" style={{ fontSize: 12, fontWeight: 700 }}>After 30 Days</div>
                  <div className="flex flex-col gap-3.5">
                    {[
                      "A clear direction — one habit, one theme, every day",
                      "Under 5 minutes of your day — nothing more",
                      "Built-in accountability that doesn't pressure you",
                      "Results you feel, not just track on a dashboard",
                      "A streak you actually want to protect",
                      "More energy, sharper focus, better sleep",
                      "\"I've been consistent for a whole month\"",
                    ].map((a, i) => (
                      <div key={i} className="flex items-center gap-3"><Check green /><span style={{ fontSize: 14, fontWeight: 600, color: "#18181b", lineHeight: 1.6 }}>{a}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <CTA label="I Want This Version of Myself →" sub="Start 7 days trial for ₹1 · Then ₹99/month" />
          </div>
        </div>
      </section>

      {/* ══ NOT A COURSE ═══════════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg,#0f1f13 0%,#18181b 50%,#0f1f13 100%)" }} className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="duc-h2 mb-4" style={{ color: "#fff" }}>Not a Course. Not an App. Not Another Challenge.</h2>
          <p className="max-w-2xl mx-auto mb-6" style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.78)" }}><strong style={{ color: "#fff" }}>Daily Upgrade Club</strong> is a simple WhatsApp-based habit system that helps you build healthier daily routines through tiny actions, daily check-ins, streaks and accountability.</p>
          <p style={{ fontSize: 17, color: "rgba(37,211,102,0.9)", fontStyle: "italic", fontWeight: 500 }}>No videos to watch. No app to download. No heavy routine to follow. Just one tiny habit every morning.</p>
        </div>
      </section>

      {/* ══ TINY HABITS CONCEPT ══════════════════════════════════════════════ */}
      <section style={{ background: "#faf8f3" }} className="py-16 lg:py-28 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">

          {/* Headline */}
          <div className="text-center mb-14">
            <p className="duc-label mb-3" style={{ color: "#25d366" }}>The science behind DUC</p>
            <h2 className="duc-h2 mb-5" style={{ color: "#18181b" }}>
              Why Big Goals Fail —<br />
              <span style={{ color: "#25d366" }}>And What Actually Works</span>
            </h2>
            <p className="duc-body max-w-xl mx-auto" style={{ color: "#52525b" }}>
              Most people know what they want. They just don't know how to get there without burning out.
            </p>
          </div>

          {/* Row labels */}
          <div className="hidden md:grid mb-3" style={{ gridTemplateColumns: "1fr 56px 1fr", gap: "0 16px" }}>
            <div className="text-center">
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#dc2626" }}>The overwhelming way</span>
            </div>
            <div />
            <div className="text-center">
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#15803d" }}>The tiny habit way ✓</span>
            </div>
          </div>

          {/* 3 rows — one per goal */}
          <div className="flex flex-col gap-4 mb-10">
            {[
              {
                emoji: "⚖️",
                goal: "Lose Weight",
                badColor: "#ea580c",
                badBg: "#fff7ed",
                badBorder: "#fed7aa",
                badImg: "/goals/weight-bad.png",
                goodImg: "/goals/weight-good.png",
                items: ["Count calories daily", "Cut carbs completely", "Gym 5× a week", "Meal prep Sundays", "Track macros", "Avoid all sugar & junk"],
                habit: "Drink one glass of warm water before your first meal",
                why: "Reduces appetite, boosts metabolism — takes 10 seconds.",
              },
              {
                emoji: "❤️",
                goal: "Build Better Health",
                badColor: "#db2777",
                badBg: "#fdf2f8",
                badBorder: "#fbcfe8",
                badImg: "/goals/health-bad.png",
                goodImg: "/goals/health-good.png",
                items: ["Exercise every morning", "Meditate 30 min", "Eat only whole foods", "10,000 steps daily", "No screens after 9pm", "Cold showers daily"],
                habit: "Do 5 deep breaths the moment you wake up",
                why: "Activates your calm nervous system and sets the tone for the day.",
              },
              {
                emoji: "😴",
                goal: "Sleep Better",
                badColor: "#6366f1",
                badBg: "#eef2ff",
                badBorder: "#c7d2fe",
                badImg: "/goals/sleep-bad.png",
                goodImg: "/goals/sleep-good.png",
                items: ["Fix your sleep schedule", "No phone in bed", "Blackout curtains + earplugs", "Magnesium + melatonin", "10pm bedtime sharp", "Wind-down routine nightly"],
                habit: "Put your phone face-down 10 minutes before bed",
                why: "Cuts blue light, signals your brain to enter sleep mode.",
              },
            ].map(({ emoji, goal, badColor, badBg, badBorder, badImg, goodImg, items, habit, why }) => (
              <div key={goal} className="grid grid-cols-1 md:grid-cols-[1fr_56px_1fr] items-center gap-3 md:gap-0">

                {/* LEFT — overwhelming list */}
                <div className="rounded-2xl overflow-hidden" style={{ border: `1.5px solid ${badBorder}`, background: badBg }}>
                  <div className="px-4 py-3 flex items-center gap-2.5" style={{ borderBottom: `1.5px solid ${badBorder}` }}>
                    <span style={{ fontSize: 20 }}>{emoji}</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: "#18181b" }}>{goal}</span>
                    <span className="ml-auto" style={{ fontSize: 10, fontWeight: 700, color: badColor, textTransform: "uppercase", letterSpacing: "0.08em" }}>overwhelming</span>
                  </div>
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", overflow: "hidden", borderBottom: `1.5px solid ${badBorder}` }}>
                    <img src={badImg} alt={`${goal} the overwhelming way`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(0.25) contrast(0.96)" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,0) 45%," + badColor + "26 100%)" }} />
                  </div>
                  <div className="px-4 py-3 grid grid-cols-2 gap-x-3 gap-y-1.5">
                    {items.map(item => (
                      <div key={item} className="flex items-start gap-1.5">
                        <span style={{ color: badColor, fontSize: 9, marginTop: 4, flexShrink: 0 }}>✕</span>
                        <span style={{ fontSize: 12, color: "#52525b", lineHeight: 1.45 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2" style={{ borderTop: `1px solid ${badBorder}`, background: badColor + "10" }}>
                    <p style={{ fontSize: 11, color: badColor, fontWeight: 700, textAlign: "center" }}>You quit by Week 2 😮‍💨</p>
                  </div>
                </div>

                {/* MIDDLE — arrow */}
                <div className="flex flex-col items-center justify-center py-2 md:py-0" style={{ gap: 4 }}>
                  {/* Mobile: down arrow; Desktop: right arrow */}
                  <svg className="hidden md:block" width="40" height="20" viewBox="0 0 40 20" fill="none">
                    <path d="M2 10h32M28 4l8 6-8 6" stroke="#25d366" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <svg className="md:hidden" width="20" height="32" viewBox="0 0 20 32" fill="none">
                    <path d="M10 2v26M4 22l6 8 6-8" stroke="#25d366" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* RIGHT — tiny habit */}
                <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid #bbf7d0", background: "#f0fdf4" }}>
                  <div className="px-4 py-3 flex items-center gap-2.5" style={{ borderBottom: "1.5px solid #bbf7d0" }}>
                    <span style={{ fontSize: 20 }}>{emoji}</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: "#18181b" }}>{goal}</span>
                    <span className="ml-auto" style={{ fontSize: 10, fontWeight: 700, color: "#15803d", textTransform: "uppercase", letterSpacing: "0.08em" }}>tiny habit ✓</span>
                  </div>
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", overflow: "hidden", borderBottom: "1.5px solid #bbf7d0" }}>
                    <img src={goodImg} alt={`${goal} the tiny habit way`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,0) 50%,rgba(37,211,102,0.18) 100%)" }} />
                  </div>
                  <div className="px-4 py-4 flex flex-col gap-2.5">
                    <p style={{ fontSize: 11, fontWeight: 700, color: "#15803d", textTransform: "uppercase", letterSpacing: "0.08em" }}>Today's habit:</p>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#18181b", lineHeight: 1.5 }}>"{habit}"</p>
                    <p style={{ fontSize: 12, color: "#52525b", lineHeight: 1.55 }}>{why}</p>
                  </div>
                  <div className="px-4 py-2 flex items-center gap-2" style={{ borderTop: "1px solid #bbf7d0", background: "rgba(37,211,102,0.06)" }}>
                    <span style={{ width: 16, height: 16, borderRadius: "50%", background: "#25d366", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2.5 2.5 4-4.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#15803d" }}>Done in 2 minutes. Every single day. ✅</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Bridge — the reframe */}
          <div className="rounded-2xl px-8 py-7 text-center mb-10" style={{ background: "linear-gradient(135deg,#0f1f13,#18181b)" }}>
            <p style={{ fontSize: "clamp(1.1rem,2.5vw,1.5rem)", fontWeight: 900, color: "#fff", lineHeight: 1.35, marginBottom: 10 }}>
              This is how tiny habits work.
            </p>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, maxWidth: 520, margin: "0 auto" }}>
              You don't overhaul your life. You start with one small step you can't fail at — and let it compound. That's the <span style={{ color: "#25d366", fontWeight: 700 }}>power of tiny habits</span>.
            </p>
          </div>

          {/* The 3 pillars of tiny habits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              { icon: "✅", title: "Easy to Do", desc: "2–3 minutes. No equipment. No planning. You can do it on the busiest Monday." },
              { icon: "🔄", title: "No Lifestyle Overhaul", desc: "Fits into the life you already have. No gym, no diet change, no 5am alarm." },
              { icon: "🎯", title: "Too Small to Miss", desc: "When it's tiny enough, there's no excuse. That's when the streak starts to matter." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="rounded-2xl p-6 flex flex-col gap-3" style={{ background: "#fff", border: "1.5px solid #e4e4e7", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <span style={{ fontSize: 28 }}>{icon}</span>
                <p style={{ fontSize: 15, fontWeight: 800, color: "#18181b" }}>{title}</p>
                <p style={{ fontSize: 13, color: "#52525b", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <CTA label="Start My Tiny Habit Journey →" sub="7-day trial for ₹1 · Then ₹99/month" />
          </div>

        </div>
      </section>

      {/* ══ 1% TINY GAINS ════════════════════════════════════════════════════ */}
      <TinyGainsDUC />

      {/* ══ 4. HOW DUC WORKS ══════════════════════════════════════════════════ */}
      <section style={{ background: "#f4f4f0" }} className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="duc-label mb-3">Simple by design</p>
            <h2 className="duc-h2 duc-section-title mb-4">How <span className="relative inline-block" style={{ whiteSpace: "nowrap", WebkitTextFillColor: "#18181b", color: "#18181b" }}>Daily Upgrade Club<svg viewBox="0 0 220 10" className="absolute left-0 bottom-[-4px] w-full" style={{ height: 8 }} fill="none"><path d="M2 7 Q55 2 110 6 Q165 10 218 5" stroke="#25d366" strokeWidth="2.5" strokeLinecap="round" fill="none"/></svg></span> Works</h2>
            <p className="duc-body max-w-xl mx-auto">No app. No long routines. Just one tiny healthy habit every morning on WhatsApp.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                n: "1",
                emoji: "📲",
                title: "Join & Choose Your Monthly Track",
                body: "Sign up for ₹1 and choose your first habit track — like Health, Energy, Sleep, Focus or Consistency. You'll be added to your WhatsApp habit system instantly.",
              },
              {
                n: "2",
                emoji: "🌅",
                title: "Get 1 Tiny Habit Every Morning",
                body: "Every morning, you'll receive one science-backed healthy habit that takes under 5 minutes — with simple steps, why it works, and how to complete it.",
              },
              {
                n: "3",
                emoji: "🔥",
                title: "Reply DONE & Track Your Progress",
                body: "Complete the habit, reply DONE, build your streak and get weekly progress scorecards to see how your health, energy and consistency are improving.",
              },
            ].map(({ n, emoji, title, body }) => (
              <div key={n} className="bg-white rounded-2xl p-7 flex flex-col items-center text-center" style={{ border: "1px solid #e4e4e7", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-white mb-4" style={{ fontSize: 20, background: "linear-gradient(135deg,#1da851,#25d366)", boxShadow: "0 4px 14px rgba(37,211,102,0.35)" }}>{n}</div>
                <span style={{ fontSize: 36, marginBottom: 12, display: "block" }}>{emoji}</span>
                <p style={{ fontSize: 17, fontWeight: 800, color: "#18181b", marginBottom: 10, lineHeight: 1.3 }}>{title}</p>
                <p style={{ fontSize: 14, color: "#52525b", lineHeight: 1.65 }}>{body}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <CTA label="Start 7-Day Trial for ₹1" sub="Then ₹99/month · Cancel anytime" />
          </div>
        </div>
      </section>

      {/* ══ WHAT YOU GET INSIDE ═══════════════════════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="duc-label mb-3">What You Get Inside</p>
            <h2 className="duc-h2 duc-section-title mb-4">Everything You Need to Stay Consistent</h2>
            <p className="duc-body max-w-xl mx-auto"><strong style={{ color: "#18181b" }}>Daily Upgrade Club</strong> is designed to make healthy habits simple, trackable and easy to repeat every day.</p>
          </div>

          {/* Zigzag rows */}
          <div className="flex flex-col gap-6">
            {[
              {
                num: "#1", label: "THE CORE HABIT",
                icon: "🎯", title: "Monthly Habit Tracks",
                value: "₹999 value",
                desc: "Each month focuses on one health area — Energy, Sleep, Focus, Calmness or Digestion. You follow a curated track of 30 daily habits built around that theme.",
                bullets: ["Pick the area you want to improve this month", "Get powerful habits around chosen area daily", "All habits designed to fit into your busy schedules"],
                color: "#059669", solidBg: "#ecfdf5", border: "#d1fae5", accentBg: "#059669",
                img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
              },
              {
                num: "#2", label: "YOUR DAILY DELIVERY",
                icon: "🌅", title: "1 Tiny Healthy Habit Every Morning",
                value: "₹799 value",
                desc: "Every morning at 7 AM, one powerful habit lands in your WhatsApp. No app. No notifications to ignore. Just one thing to do today.",
                bullets: ["Delivered at 7 AM on WhatsApp", "Under 5 minutes to complete", "Clear why-it-works explanation with each habit"],
                color: "#d97706", solidBg: "#fffbeb", border: "#fde68a", accentBg: "#d97706",
                img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80",
              },
              {
                num: "#3", label: "STAY ACCOUNTABLE",
                icon: "✅", title: "Daily Check-Ins & Streak Tracking",
                value: "₹499 value",
                desc: "Reply DONE when you complete your habit. Your streak updates instantly. Miss a day? You get a gentle nudge — not a lecture.",
                bullets: ["One-tap DONE check-in on WhatsApp", "Live streak counter updated daily", "Consistency score at the end of each week"],
                color: "#25d366", solidBg: "#f0fdf4", border: "#bbf7d0", accentBg: "#16a34a",
                img: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80",
              },
              {
                num: "#4", label: "SEE YOUR PROGRESS",
                icon: "📊", title: "Weekly Progress Scorecards",
                value: "₹399 value",
                desc: "Every Sunday you get a personal scorecard showing exactly how consistent you were, which habits you nailed and where to improve next week.",
                bullets: ["Weekly score to track your progress", "Habit-by-habit breakdown", "Personalized tip for the week ahead"],
                color: "#6366f1", solidBg: "#eef2ff", border: "#c7d2fe", accentBg: "#6366f1",
                img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
              },
              {
                num: "#5", label: "NEVER FEEL ALONE",
                icon: "👥", title: "Community Access + Practical Guides",
                value: "₹599 value",
                desc: "A private WhatsApp community of members doing exactly what you are. Share wins, ask questions, and stay motivated when it gets hard.",
                bullets: ["Members-only community group", "Monthly habit guides and reference cards", "Weekly accountability challenges"],
                color: "#db2777", solidBg: "#fdf2f8", border: "#fbcfe8", accentBg: "#db2777",
                img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
              },
            ].map(({ num, label, icon, title, value, desc, bullets, color, solidBg, border, accentBg, img }, idx) => {
              const imgLeft = idx % 2 === 0;
              return (
                <div key={title} className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: `1.5px solid ${border}`, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                  <div className={`flex flex-col ${imgLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                    {/* Image panel */}
                    <div className="relative lg:w-2/5 h-56 lg:h-auto overflow-hidden shrink-0" style={{ minHeight: 240 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={title} className="w-full h-full object-cover" style={{ minHeight: 240 }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      <div className="absolute inset-0" style={{ background: imgLeft ? `linear-gradient(to right, transparent 60%, #fff 100%)` : `linear-gradient(to left, transparent 60%, #fff 100%)` }} />
                      {/* Mobile fade */}
                      <div className="lg:hidden absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, #fff 100%)" }} />
                    </div>

                    {/* Content panel */}
                    <div className="flex-1 p-7 lg:p-9 flex flex-col justify-center">
                      <div className="flex items-center justify-between mb-3">
                        <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.13em", color: accentBg }}>{num} · {label}</p>
                        <span className="px-3 py-1 rounded-full font-bold" style={{ fontSize: 12, background: solidBg, color: accentBg, border: `1px solid ${border}` }}>{value}</span>
                      </div>
                      <h3 style={{ fontSize: "clamp(1.2rem,2.2vw,1.5rem)", fontWeight: 800, color: "#18181b", lineHeight: 1.2, marginBottom: 10 }}>
                        <span style={{ marginRight: 8 }}>{icon}</span>{title}
                      </h3>
                      <p style={{ fontSize: 15, color: "#52525b", lineHeight: 1.75, marginBottom: 16 }}>{desc}</p>
                      <div className="flex flex-col gap-2">
                        {bullets.map(b => (
                          <div key={b} className="flex items-start gap-2">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: 2, flexShrink: 0 }}><circle cx="8" cy="8" r="8" fill={accentBg} opacity="0.12"/><path d="M4.5 8.5l2.5 2L11 6" stroke={accentBg} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            <p style={{ fontSize: 14, color: "#3f3f46", lineHeight: 1.6 }}>{b}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-12">
            <CTA label="Start 7-Day Trial for ₹1" sub="Then ₹99/month · Cancel anytime" />
          </div>
        </div>
      </section>

      {/* ══ 5. WHAT IS DUC — DELETED ══════════════════════════════════════════ */}
      {false && <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-6">
              <p className="duc-label mb-3">What exactly is this?</p>
              <h2 className="duc-h2 duc-section-title mb-4">
                India&apos;s only healthy habit subscription<br />
                <span className="gradient-text">that works on WhatsApp.</span>
              </h2>
              <p className="duc-body mb-6">
                Not a course. Not an app. Not a challenge with a fancy PDF you never open.
                A <strong style={{ color: "#18181b" }}>subscription that shows up for you every single morning</strong> — so you never have to rely on memory, motivation, or mood.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { n: "1", icon: "🌅", bold: "7 AM every morning", text: "One tiny healthy habit arrives in your WhatsApp" },
                  { n: "2", icon: "✅", bold: "Do it anytime", text: "Under 5 minutes. Before breakfast, during lunch, whenever." },
                  { n: "3", icon: "💬", bold: "Reply DONE", text: "Your streak updates. Tomorrow's habit is already queued." },
                ].map(s => (
                  <div key={s.n} className="flex items-center gap-3 rounded-xl px-4 py-3.5" style={{ background: "#f8f8f6", border: "1px solid #e2dfd6" }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-white shrink-0" style={{ fontSize: 15, background: "linear-gradient(135deg,#1da851,#25d366)" }}>{s.n}</div>
                    <span className="text-xl">{s.icon}</span>
                    <p style={{ fontSize: 14, color: "#18181b" }}><strong>{s.bold}</strong> — {s.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex justify-center lg:justify-start">
                <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border text-sm font-semibold" style={{ borderColor: "#e2dfd6", color: "#52525b" }}>🔁 Repeat 30 days. Watch your health transform.</span>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-2xl border p-5 sm:p-6" style={{ background: "#f0fdf4", borderColor: "rgba(37,211,102,0.22)", boxShadow: "0 6px 24px rgba(37,211,102,0.07)" }}>
                <p className="duc-label mb-4">At a glance</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "📲", label: "Delivery", val: "WhatsApp only" },
                    { icon: "⏰", label: "Timing", val: "7 AM every day" },
                    { icon: "⏱️", label: "Time needed", val: "Under 5 min" },
                    { icon: "📅", label: "Cadence", val: "1 habit/day" },
                    { icon: "🎯", label: "Focus", val: "1 theme/month" },
                    { icon: "👥", label: "Community", val: "Private WA group" },
                    { icon: "📊", label: "Tracking", val: "Weekly scorecard" },
                    { icon: "💰", label: "Price", val: "₹1 → ₹99/month" },
                  ].map(({ icon, label, val }) => (
                    <div key={label} className="duc-glow-card flex items-center gap-2.5 rounded-xl px-3 py-2.5" style={{ background: "#fff", border: "1px solid rgba(37,211,102,0.12)" }}>
                      <span style={{ fontSize: 18 }}>{icon}</span>
                      <div>
                        <p style={{ fontSize: 10, color: "#71717a", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
                        <p style={{ fontSize: 13, fontWeight: 700, color: "#18181b" }}>{val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 flex justify-center lg:justify-start">
                <CTA label="Show Me My First Habit →" sub="₹1 for 7 days · Cancel anytime" />
              </div>
            </div>
          </div>
        </div>
      </section>}

      {/* ══ 6. MONTHLY THEMES ═══════════════════════════════════════════════ */}
      {(() => {
        const [tickerOpen, setTickerOpen] = useState(false);

        const TICKER_CARDS = [
          { emoji: "😴", theme: "Sleep", tagline: "Wake up actually rested", color: "#6366f1", bg: "#eef2ff", border: "#c7d2fe", img: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&q=80", habits: ["The 90-Second Wind-Down Trigger","Bedroom Temperature Reset","The Phone-Free Sleep Protocol","4-7-8 Navy Breathing Method"] },
          { emoji: "⚡", theme: "Energy", tagline: "No 3 PM crash, ever", color: "#d97706", bg: "#fffbeb", border: "#fde68a", img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80", habits: ["The Cortisol Sunlight Reset","Protein-First Plate Method","60-Second Cold Water Flush","The Staircase Energy Spike"] },
          { emoji: "🧠", theme: "Focus", tagline: "Sharper, deeper work daily", color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80", habits: ["The One Priority Rule","Posture-Oxygen Protocol","Phone Face-Down Focus Lock","The 2-Minute Intention Ritual"] },
          { emoji: "🌿", theme: "Gut Health", tagline: "Less bloating, more energy", color: "#059669", bg: "#ecfdf5", border: "#6ee7b7", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80", habits: ["The Dahi Lunch Protocol","The 20-Chew Digestion Rule","Morning Warm Water Activation","The Screen-Free Meal Method"] },
          { emoji: "🧘", theme: "Stress", tagline: "Calm without meditating for an hour", color: "#db2777", bg: "#fdf2f8", border: "#f9a8d4", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80", habits: ["Box Breathing at Your Desk","The Phone-Free First 10 Minutes","2-Minute Gratitude Anchor","The Post-Dinner Reset Walk"] },
          { emoji: "💪", theme: "Fitness", tagline: "Active without the gym", color: "#ea580c", bg: "#fff7ed", border: "#fdba74", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80", habits: ["The Wake-Up Push Protocol","One-Flight Rule","45-Minute Stand Reset","The 60-Second Wall Sit"] },
          { emoji: "⚖️", theme: "Weight Reset", tagline: "Feel lighter, build better food habits", color: "#16a34a", bg: "#f0fdf4", border: "#86efac", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80", habits: ["The 10-Minute Post-Meal Walk","The Half-Plate Veg Rule","The Slow First 5 Bites Method","The Night Snacking Pause"] },
          { emoji: "🛡️", theme: "Immunity", tagline: "Daily habits to make your immunity stronger", color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc", img: "https://images.unsplash.com/photo-1616671276441-2f2c277b8bf6?w=600&q=80", habits: ["The Morning Sunlight Habit","The Colorful Plate Rule","The Sleep Consistency Reset","The Hygiene Before Meals Rule"] },
          { emoji: "✨", theme: "Skin & Glow", tagline: "Healthier habits for a younger skin", color: "#c026d3", bg: "#fdf4ff", border: "#e879f9", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80", habits: ["The Hydration Glow Rule","The Sleep-for-Skin Wind-Down","The Sugar Pause Method","The Face-Touch Awareness Habit"] },
          { emoji: "💧", theme: "Hydration", tagline: "More water, better everything", color: "#0284c7", bg: "#f0f9ff", border: "#bae6fd", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80", habits: ["Pre-Coffee Water Protocol","Post-Toilet Hydration Habit","The 3 PM Water Alarm","The 8-Glass Track Method"] },
          { emoji: "🌬️", theme: "Breathwork", tagline: "Calm your body in minutes", color: "#0369a1", bg: "#f0f9ff", border: "#7dd3fc", img: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=600&q=80", habits: ["The 3-Breath Reset","The Box Breathing Method","The Long Exhale Protocol","The Pre-Meeting Calm Breath"] },
          { emoji: "🥗", theme: "Mindful Eating", tagline: "Eat better without dieting", color: "#65a30d", bg: "#f7fee7", border: "#bef264", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80", habits: ["The 20-Chew Rule","The No-Phone Meal Method","The Hunger Check Pause","The Smaller Plate Habit"] },
          { emoji: "❤️", theme: "Heart Health", tagline: "Strong heart, long life", color: "#dc2626", bg: "#fff1f2", border: "#fecaca", img: "https://images.unsplash.com/photo-1506126279646-a697353d3166?w=600&q=80", habits: ["The 5-Minute Brisk Walk","Walnut Heart Ritual","Deep Breath Blood Pressure Reset","The Anti-Sitting Protocol"] },
          { emoji: "🌸", theme: "Women's Wellness", tagline: "Energy, movement and self-care", color: "#be185d", bg: "#fdf2f8", border: "#fbcfe8", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80", habits: ["The 5-Minute Self-Care Pause","The Cycle-Aware Energy Check","The Gentle Movement Reset","The Evening Calm Ritual"] },
          { emoji: "💙", theme: "Men's Health", tagline: "Energy, strength and better routine", color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80", habits: ["The Calm Reset Walk","The Protein-First Meal Rule","The Posture Confidence Check","The No-Late-Snack Rule"] },
          { emoji: "🤸", theme: "Mobility", tagline: "Move freely, feel less stiff", color: "#7c3aed", bg: "#faf5ff", border: "#d8b4fe", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80", habits: ["The Morning Joint Wake-Up","The Hip Unlock Routine","The Ankle Circle Reset","The 60-Second Stretch Break"] },
        ];

        // First 12 cards shown in grid (in specified order)
        const GRID_CARDS = TICKER_CARDS.slice(0, 12);

        return (
          <>
            <section className="bg-section-cream py-16 lg:py-24">
              <div className="max-w-5xl mx-auto px-6 lg:px-10">
                <div className="text-center mb-10">
                  <p className="duc-label mb-3">Your Monthly Themes</p>
                  <h2 className="duc-h2 duc-section-title mb-3">Choose What You Want to Upgrade Every Month</h2>
                  <p className="duc-body max-w-lg mx-auto">Each month, you follow a focused habit track designed to improve one area of your life without overwhelming your schedule.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {GRID_CARDS.map(({ emoji, theme, tagline, color, bg, border, img, habits }, idx) => (
                    <div key={theme}
                      className="theme-card-anim rounded-2xl overflow-hidden flex flex-col"
                      style={{
                        background: bg,
                        border: `2px solid ${border}`,
                        animationDelay: `${idx * 0.2}s`,
                        animationDuration: `${8 * 0.2 + 1.6}s`,
                      }}>
                      <div className="relative h-36 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt={theme} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, ${bg} 100%)` }} />
                        <div className="absolute bottom-2 left-3 flex items-center gap-2">
                          <span style={{ fontSize: 24 }}>{emoji}</span>
                          <div>
                            <p style={{ fontSize: 18, fontWeight: 900, color, lineHeight: 1.1 }}>{theme}</p>
                            <p style={{ fontSize: 12, color: "#52525b", fontWeight: 500 }}>{tagline}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3.5 flex flex-col gap-1.5 flex-1">
                        <p style={{ fontSize: 10, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Sample habits:</p>
                        {habits.map((h, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span style={{ color, fontSize: 10, marginTop: 3, flexShrink: 0 }}>●</span>
                            <span style={{ fontSize: 12, fontWeight: 600, color: "#3f3f46", lineHeight: 1.4 }}>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* See All Habit Tracks button */}
                {!tickerOpen && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => setTickerOpen(true)}
                      className="flex items-center gap-2 px-7 py-3 rounded-full font-bold transition-all"
                      style={{ background: "#18181b", color: "#fff", fontSize: 15, boxShadow: "0 4px 18px rgba(0,0,0,0.18)", border: "none", cursor: "pointer" }}
                    >
                      See All Habit Tracks
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                    </button>
                  </div>
                )}
              </div>

              {/* ── Ticker (hidden until button clicked, lives inside the cream section) ── */}
              <div
                style={{
                  overflow: "hidden",
                  maxHeight: tickerOpen ? "600px" : "0px",
                  opacity: tickerOpen ? 1 : 0,
                  marginTop: tickerOpen ? "32px" : "0px",
                  transition: "max-height 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease, margin 0.5s ease",
                }}
              >
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <div className="duc-ticker-track" style={{ animationDuration: "70s" }}>
                    {[...TICKER_CARDS, ...TICKER_CARDS].map(({ emoji, theme, tagline, color, bg, border, img, habits }, i) => (
                      <div key={`${theme}-${i}`} style={{
                        width: 300,
                        flexShrink: 0,
                        borderRadius: 20,
                        overflow: "hidden",
                        border: `2px solid ${border}`,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
                        background: bg,
                        display: "flex",
                        flexDirection: "column",
                      }}>
                        <div style={{ position: "relative", height: 170, overflow: "hidden", flexShrink: 0 }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt={theme} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 35%, ${bg} 100%)` }} />
                          <div style={{ position: "absolute", bottom: 10, left: 14, display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 24 }}>{emoji}</span>
                            <div>
                              <p style={{ fontSize: 17, fontWeight: 900, color, lineHeight: 1.1, margin: 0 }}>{theme}</p>
                              <p style={{ fontSize: 11.5, color: "#52525b", fontWeight: 500, margin: 0, marginTop: 1 }}>{tagline}</p>
                            </div>
                          </div>
                        </div>
                        <div style={{ padding: "12px 14px 16px", display: "flex", flexDirection: "column" }}>
                          <p style={{ fontSize: 10, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px 0" }}>Sample habits:</p>
                          {habits.map((h, hi) => (
                            <div key={hi} style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 6 }}>
                              <span style={{ color, fontSize: 10, marginTop: 4, flexShrink: 0 }}>●</span>
                              <span style={{ fontSize: 12.5, fontWeight: 600, color: "#3f3f46", lineHeight: 1.4 }}>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 100, background: "linear-gradient(to right, #f7f5ef, transparent)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 100, background: "linear-gradient(to left, #f7f5ef, transparent)", pointerEvents: "none" }} />
                </div>
              </div>

              <div className="max-w-5xl mx-auto px-6 lg:px-10">
                <div className="flex justify-center mt-8">
                  <CTA label="I Want to Pick My First Theme" sub="₹1 for 7 days · Then ₹99/month" />
                </div>
              </div>
            </section>
          </>
        );
      })()}

      {/* ══ 7. REAL WA MESSAGES — 3 iPhones ════════════════════════════════════ */}
      <section className="bg-section-white py-16 lg:py-24 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="duc-label mb-3">What lands in your WhatsApp</p>
            <h2 className="duc-h2 duc-section-title mb-3">Here&apos;s What a Daily Habit Looks Like</h2>
            <p className="duc-body max-w-sm mx-auto">Every habit is simple, practical and designed to fit into your real day.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Energy Month Habits */}
            <div className="flex flex-col items-center gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold" style={{ background: "#fffbeb", border: "2px solid #fde68a", color: "#d97706", fontSize: 13 }}>
                ⚡ Energy Month Habits
              </div>
              <PhoneGlow from="#fbbf24" to="#f97316" accent="rgba(251,191,36,0.55)">
                <StaticPhone>
                  <WAChatBg height={360}>
                    <WADateSep label="⚡ Energy Track · Day 3" />
                    <WAIn title="⚡ Day 3 habit:" lines={["🌞 Step outside for 5 min of natural sunlight — within 30 min of waking.","","Why: Morning sunlight resets your cortisol clock and controls your energy rhythm for the entire day.","","Reply DONE when you're back 💪"]} time="7:01 AM" />
                    <WAOut text="✅ DONE — felt amazing!" time="7:08 AM" />
                    <WAIn title="" lines={["🔥 Day 3 streak! Energy starts shifting by Day 5."]} time="7:09 AM" />
                  </WAChatBg>
                </StaticPhone>
              </PhoneGlow>
            </div>

            {/* Sleep Month Habits */}
            <div className="flex flex-col items-center gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold" style={{ background: "#eef2ff", border: "2px solid #c7d2fe", color: "#6366f1", fontSize: 13 }}>
                😴 Sleep Month Habits
              </div>
              <PhoneGlow from="#818cf8" to="#4338ca" accent="rgba(99,102,241,0.55)">
                <StaticPhone>
                  <WAChatBg height={360}>
                    <WADateSep label="😴 Sleep Track · Day 11" />
                    <WAIn title="😴 Day 11 habit:" lines={["📵 Tonight — plug your phone charger outside the bedroom.","","Why: Blue light suppresses melatonin for up to 2 hours. Removing the device removes the problem.","","Set a 9:30 PM reminder now. Reply DONE 🌙"]} time="7:01 AM" />
                    <WAOut text="✅ Done — reminder is set!" time="7:05 AM" />
                    <WAIn title="" lines={["🔥 Day 11! Most members sleep better within 3 nights."]} time="7:06 AM" />
                  </WAChatBg>
                </StaticPhone>
              </PhoneGlow>
            </div>

            {/* Focus Month Habits */}
            <div className="flex flex-col items-center gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold" style={{ background: "#f5f3ff", border: "2px solid #ddd6fe", color: "#7c3aed", fontSize: 13 }}>
                🧠 Focus Month Habits
              </div>
              <PhoneGlow from="#a78bfa" to="#7c3aed" accent="rgba(139,92,246,0.55)">
                <StaticPhone>
                  <WAChatBg height={360}>
                    <WADateSep label="🧠 Focus Track · Day 7" />
                    <WAIn title="🧠 Day 7 habit:" lines={["📵 For the first 30 minutes after waking — no phone, no scrolling.","","Why: Your prefrontal cortex is most active right after waking. Protecting this window improves deep work output by up to 40%.","","Reply DONE when you've completed it 🎯"]} time="7:01 AM" />
                    <WAOut text="✅ Done — read a book instead!" time="7:28 AM" />
                    <WAIn title="" lines={["🔥 Day 7! Focus sharpens noticeably by Week 2."]} time="7:29 AM" />
                  </WAChatBg>
                </StaticPhone>
              </PhoneGlow>
            </div>
          </div>

          <p className="text-center mt-8" style={{ fontSize: 13, color: "#71717a" }}>3 of 30 habits shown. Every habit: specific, science-explained, under 5 minutes to do.</p>

          <div className="flex justify-center mt-8">
            <CTA label="Send My First Habit Now" sub="7 days trial for ₹1 · Then ₹99/month" />
          </div>
        </div>
      </section>

      {/* ══ WHO THIS IS FOR ═════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg,#0f1f13 0%,#18181b 50%,#0f1f13 100%)" }} className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="duc-label mb-3" style={{ color: "#25d366" }}>Who This Is For</p>
            <h2 className="duc-h2 mb-4" style={{ color: "#fff" }}>This Is Built for You If…</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "You want to stay healthy but don't have time for long routines.",
              "You keep starting and stopping every few days.",
              "You want better energy, sleep, focus and discipline.",
              "You don't want gym pressure or strict dieting.",
              "You prefer simple WhatsApp reminders over complicated apps.",
              "You want accountability to stay consistent every day.",
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-4 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(37,211,102,0.18)" }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg,#1da851,#25d366)", fontSize: 14, color: "#fff", fontWeight: 900 }}>✓</div>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.88)", lineHeight: 1.65, fontWeight: 500 }}>{point}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <button
              onClick={() => window.openDUCCheckout?.()}
              className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-full font-black text-white"
              style={{ fontSize: 18, boxShadow: "0 8px 28px rgba(37,211,102,0.42)" }}>
              Yes, This Is For Me →
            </button>
          </div>
        </div>
      </section>

      {/* ══ WHY IT WORKS ════════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg,#0f1f13 0%,#18181b 60%,#0f1f13 100%)" }} className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="duc-label mb-3" style={{ color: "#25d366" }}>The Science of Simplicity</p>
            <h2 className="duc-h2 mb-4" style={{ color: "#fff" }}>Why <span className="relative inline-block">Daily Upgrade Club<svg viewBox="0 0 220 10" className="absolute left-0 bottom-[-4px] w-full" style={{ height: 8 }} fill="none"><path d="M2 7 Q55 2 110 6 Q165 10 218 5" stroke="#25d366" strokeWidth="2.5" strokeLinecap="round" fill="none"/></svg></span> Works</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", maxWidth: 480, margin: "0 auto" }}>Because it removes the biggest reason people fail — overwhelm.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left — the problem */}
            <div className="rounded-2xl p-8 flex flex-col justify-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="font-bold mb-3" style={{ fontSize: 13, color: "#f87171", textTransform: "uppercase", letterSpacing: "0.1em" }}>Why most people fail</p>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.85)", lineHeight: 1.75 }}>Most people try to change <strong style={{ color: "#fff" }}>too much too quickly</strong> — gym, diet, sleep, meditation all at once. They burn out by Week 2. The habits never stick.</p>
            </div>

            {/* Right — the DUC system */}
            <div className="rounded-2xl p-8" style={{ background: "rgba(37,211,102,0.06)", border: "1px solid rgba(37,211,102,0.2)" }}>
              <p className="font-bold mb-5" style={{ fontSize: 13, color: "#25d366", textTransform: "uppercase", letterSpacing: "0.1em" }}>The Daily Upgrade Club System</p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: "🌱", label: "1 tiny habit", sub: "Small enough to never skip" },
                  { icon: "⏱️", label: "Less than 5 minutes", sub: "Fits into any schedule" },
                  { icon: "📲", label: "Delivered on WhatsApp daily", sub: "No new app to remember" },
                  { icon: "✅", label: "DONE check-in", sub: "Instant accountability" },
                  { icon: "🔥", label: "Streak tracking", sub: "Momentum builds itself" },
                  { icon: "📊", label: "Weekly progress scorecard", sub: "See how far you've come" },
                  { icon: "👥", label: "Community accountability", sub: "You're never doing this alone" },
                ].map(({ icon, label, sub }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(37,211,102,0.12)", fontSize: 18 }}>{icon}</div>
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{label}</p>
                      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Closing punchline */}
          <div className="rounded-2xl p-7 text-center mt-8" style={{ background: "rgba(37,211,102,0.08)", border: "1.5px solid rgba(37,211,102,0.3)" }}>
            <p style={{ fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1.4 }}>Small enough to do daily. <span style={{ color: "#25d366" }}>Powerful enough to change your routine.</span></p>
          </div>

          <div className="flex justify-center mt-10">
            <CTA label="Start 7-Day Trial for ₹1" sub="Then ₹99/month · Cancel anytime" />
          </div>
        </div>
      </section>

      {/* ══ 9. VALUE STACK — premium dark card ═══════════════════════════════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <div className="rounded-2xl overflow-hidden shadow-2xl" style={{
            background: "linear-gradient(145deg,#0d1f12 0%,#0a1a0f 50%,#061009 100%)",
            border: "1px solid rgba(37,211,102,0.2)",
          }}>
            <div className="text-center px-6 pt-8 pb-4">
              <p className="duc-label mb-2">Everything you get</p>
              <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>Your full membership</h2>
            </div>
            <div className="px-5 sm:px-8">
              {[
                { emoji: "📲", name: "Daily healthy habits on WhatsApp", value: "₹2,999" },
                { emoji: "✔️", name: "Personalised tracking and accountability", value: "₹1,499" },
                { emoji: "🎯", name: "Monthly themes + personal habit calendar", value: "₹1,799" },
                { emoji: "📊", name: "Weekly progress scorecard", value: "₹999" },
                { emoji: "👥", name: "Private WhatsApp accountability group", value: "₹999" },
                { emoji: "🗓️", name: "Monthly habit guides", value: "₹499" },
                { emoji: "🏆", name: "Full habit vault — 100+ powerful habits, forever", value: "₹999" },
                { emoji: "📩", name: "Weekly wellness newsletter", value: "₹199" },
              ].map(it => (
                <div key={it.name} className="duc-glow-card flex items-center justify-between gap-3 py-3.5" style={{ borderTop: "1px solid rgba(37,211,102,0.12)", borderLeft: "2px solid rgba(37,211,102,0.3)", paddingLeft: 10, marginBottom: 2 }}>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span style={{ fontSize: 22 }} className="shrink-0">{it.emoji}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#d4f7e0" }}>{it.name}</span>
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#4ade80", flexShrink: 0 }}>{it.value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-3 py-4 -mx-5 sm:-mx-8 px-5 sm:px-8 mt-2" style={{ borderTop: "2px solid rgba(37,211,102,0.2)", background: "rgba(0,0,0,0.3)" }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#6ee7b7", textTransform: "uppercase", letterSpacing: "0.06em" }}>Total Value</span>
                <span className="font-black line-through" style={{ fontSize: 17, color: "#d97706" }}>₹9,992/month</span>
              </div>
            </div>
            <div className="text-center px-5 sm:px-8 pt-5 pb-8">
              <div className="flex flex-col gap-1 mb-4">
                {["Not ₹8,493","Not ₹4,999","Not ₹299"].map(s => (
                  <p key={s} style={{ fontSize: 18, color: "#6b7280", textDecoration: "line-through" }}>{s}</p>
                ))}
              </div>
              <p className="font-black leading-none mb-1" style={{ fontSize: "clamp(5rem,12vw,7rem)", color: "#fff", textShadow: "0 0 32px rgba(37,211,102,0.4)" }}>₹1</p>
              <p style={{ fontSize: 13, color: "#9ca3af" }} className="mb-6">for your first 7 days · then ₹99/month</p>
              <CTA label="Get Everything — Start for ₹1 →" sub="Cancel anytime" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 10. 3 FALSE BELIEFS ══════════════════════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">Why you&apos;re still hesitating</p>
            <h2 className="duc-h2 duc-section-title mb-3">3 beliefs holding you back</h2>
            <p className="duc-body max-w-sm mx-auto">And exactly why none of them should stop you from starting today.</p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { n: "01", belief: "\"One tiny habit can't actually change my health.\"", truth: "A Stanford study found that habits done for 30 consecutive days rewire neural pathways — permanently. Members who started with just morning sunlight ended the month sleeping better, eating better, and moving more. None of those were the habit. The habit built the momentum.", icon: "🧠" },
              { n: "02", belief: "\"I've tried this before. I always quit eventually.\"", truth: "You quit because the habit was too big, too vague, or required willpower you didn't have that day. When a habit takes under 5 minutes, arrives automatically, and you only need to reply DONE — there's nothing to quit. Our members average 78% completion in month one.", icon: "🔄" },
              { n: "03", belief: "\"₹99/month feels risky if I don't stay consistent.\"", truth: "That's exactly why the trial is ₹1. You're not committing to ₹99 based on a description. You're committing ₹1 to experience 7 real mornings. If nothing shifts — cancel. Pay nothing more. You risk a single rupee. I risk my reputation.", icon: "💰" },
            ].map(({ n, belief, truth, icon }) => (
              <div key={n} className="duc-glow-card rounded-xl overflow-hidden" style={{ border: "1px solid #e2dfd6" }}>
                <div className="flex items-start gap-3 px-5 py-4" style={{ background: "#fff7f7", borderBottom: "1px solid #fecaca" }}>
                  <span style={{ fontSize: 20 }} className="shrink-0">{icon}</span>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.08em" }}>False Belief {n}</span>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#dc2626", marginTop: 2, lineHeight: 1.4 }}>{belief}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 px-5 py-4 bg-white">
                  <span style={{ fontSize: 18 }} className="shrink-0">✅</span>
                  <p className="duc-body">{truth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 11. "IF ALL THIS DID WAS" ════════════════════════════════════════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">Think about this</p>
            <h2 className="duc-h2 duc-section-title mb-3">Any one of these alone would be worth it.</h2>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { icon: "⚡", bold: "give you steady energy from 7 AM to 6 PM — without needing caffeine every 2 hours", cta: "— would ₹1 to find out be worth it?" },
              { icon: "🔄", bold: "make you the person who actually follows through on their health, every month — not just January", cta: "— would ₹99/month be worth it?" },
              { icon: "🌱", bold: "help you wake up 6 months from now and genuinely say \"I take care of myself\" — and mean it", cta: "— what would that moment be worth to you?" },
            ].map(({ icon, bold, cta }, i) => (
              <div key={i} className="duc-glow-card rounded-xl px-6 py-5 bg-white flex gap-3 items-start" style={{ border: "1px solid #e2dfd6" }}>
                <span style={{ fontSize: 26 }} className="shrink-0">{icon}</span>
                <p style={{ fontSize: 15, color: "#4a4a52", lineHeight: 1.65 }}>
                  <span style={{ color: "#a1a1aa" }}>If all this did was </span>
                  <strong style={{ color: "#18181b" }}>{bold}</strong>
                  <span style={{ color: "#71717a" }}> {cta}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 12. TESTIMONIALS ════════════════════════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">Wall of love 💛</p>
            <h2 className="duc-h2 duc-section-title mb-3">Real people. Specific results.</h2>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {[
              { name: "Karan M.", city: "Pune", theme: "Energy Month", result: "No 3 PM crash · Day 5", text: "By Day 5, I stopped needing that 3 PM coffee hit. One morning habit literally changed my afternoon energy." },
              { name: "Priya T.", city: "Bengaluru", theme: "Sleep Month", result: "+45 min sleep · tracked", text: "I'm sleeping 45 minutes more per night — tracked on my phone. Nothing else changed." },
              { name: "Sneha R.", city: "Mumbai", theme: "Focus Month", result: "Cleared backlog · Day 12", text: "Day 12 — I finished a project I'd been avoiding for a month. My manager asked what changed." },
              { name: "Amit D.", city: "Delhi", theme: "Gut Health", result: "Zero bloating · 3 weeks", text: "Lifelong bloating. 3 weeks in, zero. My wife noticed before I did." },
              { name: "Ravi S.", city: "Hyderabad", theme: "Stress Month", result: "Calmer mornings · Day 8", text: "2-minute box breathing before meetings changed everything. I start controlled now, not stressed." },
              { name: "Meera K.", city: "Chennai", theme: "Energy Month", result: "Back to gym · Day 19", text: "The morning sunlight habit made me feel like a healthy person again. By Day 19 I was back at the gym." },
            ].map(({ name, city, theme, result, text }) => (
              <div key={name} className="duc-glow-card break-inside-avoid mb-4 rounded-xl p-5 bg-white flex flex-col gap-3" style={{ border: "1px solid #e2dfd6" }}>
                <div className="flex gap-0.5">{[1,2,3,4,5].map(i=><Star key={i}/>)}</div>
                <div className="px-3 py-1.5 rounded-lg font-bold" style={{ background: "rgba(37,211,102,0.1)", color: "#1da851", fontSize: 12 }}>📌 {result}</div>
                <p style={{ fontSize: 14, color: "#4a4a52", lineHeight: 1.65 }}>&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-2 pt-2" style={{ borderTop: "1px solid #f4f4f5" }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shrink-0" style={{ fontSize: 11, background: `hsl(${(name.charCodeAt(0) * 37) % 360},55%,48%)` }}>{name[0]}</div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#18181b" }}>{name} · {city}</p>
                    <p style={{ fontSize: 11, color: "#71717a" }}>{theme}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <CTA label="I Want Results Like These →" sub="₹1 for 7 days · Then ₹99/month · Cancel anytime" />
          </div>
        </div>
      </section>

      {/* ══ 8. ROHAN'S STORY — Epiphany Bridge ══════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24 relative overflow-hidden">
        <span className="emoji-deco float-2 top-20 right-6 text-3xl hidden lg:block" aria-hidden="true">👋</span>
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-4">
              <div className="relative max-w-xs mx-auto lg:mx-0">
                <div className="absolute -top-6 -right-3 z-20 sticky-note p-3 rounded-md tilt-right w-40 hidden sm:block">
                  <p className="font-serif italic leading-snug" style={{ fontSize: 13, color: "#92400e" }}>&ldquo;Hi 👋 I built this!&rdquo;</p>
                </div>
                <div className="polaroid tilt-left">
                  <div className="aspect-square rounded-sm overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/rohan.png" alt="Rohan — Founder" className="w-full h-full object-cover object-top" />
                  </div>
                  <p className="text-center font-serif text-xl italic text-foreground mt-3">Rohan</p>
                  <p className="text-center text-foreground-subtle mt-0.5" style={{ fontSize: 12 }}>Founder, Daily Upgrade Club</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <p className="duc-label mb-3">👋 The founder</p>
              <h2 className="duc-h2 mb-5" style={{ color: "#18181b" }}>
                I built this because<br />
                <span style={{ fontStyle: "italic", fontWeight: 400, color: "#71717a" }}>I was the problem I was trying to solve.</span>
              </h2>
              <div className="space-y-4 duc-body">
                <p>I was the person who <strong style={{ color: "#18181b" }}>knew everything about health and did none of it.</strong> 47 bookmarked articles. Three abandoned apps. Every Monday was "the Monday I'd finally start."</p>
                <p>I wasn&apos;t lazy. I was someone whose routines were always too big to survive real life.</p>
              </div>
              <div className="my-5 pl-4 py-1" style={{ borderLeft: "3px solid #25d366" }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#18181b", fontStyle: "italic", lineHeight: 1.65 }}>
                  &ldquo;BJ Fogg&apos;s Stanford research changed everything: the people who built lasting habits made each one so small it was <em>impossible to fail</em>. I tested this on myself — one habit, under 5 minutes, delivered to my phone at 7 AM. By Day 30 I hadn&apos;t broken the streak once.&rdquo;
                </p>
              </div>
              <p className="duc-body">I built <strong style={{ color: "#18181b" }}>Daily Upgrade Club</strong> to hand this exact system to you. <strong style={{ color: "#18181b" }}>400+ members</strong> have since done the same thing — and reported changes they couldn&apos;t explain to their doctors.</p>
              <div className="mt-5 flex items-center gap-3">
                <p className="font-serif italic text-xl" style={{ color: "#25d366" }}>— Rohan</p>
                <span className="w-8 h-px" style={{ background: "#e2dfd6" }} />
                <p style={{ fontSize: 13, color: "#71717a" }}>Founder, Daily Upgrade Club</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 13. GUARANTEE ════════════════════════════════════════════════════ */}
      <section className="bg-section-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="rounded-2xl premium-card p-7 sm:p-10 border-glow relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full" style={{ background: "rgba(37,211,102,0.07)" }} aria-hidden="true" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.2)", fontSize: 26 }}>🛡️</div>
                <div>
                  <p className="duc-label mb-1">Zero-risk promise</p>
                  <h2 className="duc-h2" style={{ color: "#18181b" }}>You have nothing to lose.</h2>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { icon: "🔒", t: "No hidden charges", b: "₹1 trial. ₹99/month. Nothing else." },
                  { icon: "📵", t: "No spam ever", b: "One WA message each morning. That's it." },
                  { icon: "📞", t: "No pressure calls", b: "No one will call to upsell you. Ever." },
                  { icon: "🚪", t: "One-tap cancel", b: "Reply STOP or cancel in Razorpay instantly." },
                ].map(({ icon, t, b }) => (
                  <div key={t} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0" style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.15)" }}>{icon}</div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#18181b" }}>{t}</p>
                      <p style={{ fontSize: 12, color: "#71717a", marginTop: 2 }}>{b}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-5 mb-7" style={{ background: "rgba(37,211,102,0.06)", border: "1px solid rgba(37,211,102,0.18)" }}>
                <div className="flex items-start gap-3">
                  <span style={{ fontSize: 24 }} className="shrink-0">🤝</span>
                  <div>
                    <p className="duc-label mb-1.5">Rohan&apos;s personal commitment</p>
                    <p style={{ fontSize: 14, fontStyle: "italic", color: "#18181b", lineHeight: 1.65 }}>
                      &ldquo;Do all 7 days. If you don&apos;t feel a single shift — message me directly. I&apos;ll refund your ₹1 and spend 20 minutes with you personally figuring out what happened.&rdquo;
                    </p>
                    <p className="mt-2" style={{ fontSize: 12, color: "#71717a" }}>— Rohan, Founder</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p style={{ fontSize: 14, color: "#71717a", marginBottom: 20 }}>
                  Worst case: 35 minutes over 7 days, 1–2 habits that stick for life, and you never hear from us again.
                </p>
                <CTA label="Yes — I Have Nothing to Lose →" sub="₹1 for 7 days · Cancel before Day 7 · Pay nothing more" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 14. FAQ ══════════════════════════════════════════════════════════ */}
      <section className="bg-section-cream py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="duc-label mb-3">FAQ</p>
            <h2 className="duc-h2 duc-section-title">Every question answered</h2>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { q: "What exactly is a 'tiny healthy habit'?", a: "One specific, science-backed action under 5 minutes, tied to your monthly theme. For example: 5 min of morning sunlight (Energy Month), one spoon of plain curd at lunch (Gut Health Month), phone charger outside the bedroom (Sleep Month), box breathing before a meeting (Stress Month). Every habit is specific, explained, and doable today." },
              { q: "What happens on Day 1?", a: "The morning after you join, at 7 AM, your first habit lands on WhatsApp. You read it, do it, reply DONE. Your streak begins. That's the entire Day 1." },
              { q: "How do I choose my monthly theme?", a: "After joining, you pick from 8 themes: Sleep, Energy, Focus, Gut Health, Stress, Fitness, Hydration, or Heart Health. All 30 habits that month focus on that one area. You can switch next month or repeat the same theme." },
              { q: "What if I miss a day?", a: "Nothing bad happens. One missed day doesn't end your streak or subscription. You get a gentle evening nudge if you haven't replied by 8 PM. Missing a day occasionally is normal — the system is designed for real life." },
              { q: "What happens after 7 days?", a: "If you don't cancel before Day 7, ₹99/month begins. You'll get a Day 6 reminder so there's zero surprise. Cancel anytime from Razorpay — one tap, no questions asked, no calls." },
              { q: "Do I need to download anything?", a: "No app. No download. Everything is on WhatsApp. Save the number when you join, and habits arrive every morning." },
              { q: "Is this a 7-day or 30-day programme?", a: "It's a monthly healthy habit subscription — 30 habits per month, one per day, on your chosen theme. The 7-day trial is just so you can experience it before committing. After Day 7, your subscription continues as long as you want it to." },
              { q: "I've failed at habits before. Why will this be different?", a: "The habit arrives automatically so you never have to remember or plan. It takes under 5 minutes so even on your worst day it's possible. You reply DONE so there's a completion signal. And the habit is so specific you never wonder what to do. That's why 78% of members complete their monthly habit — the system does the work, not willpower." },
            ].map(({ q, a }) => <FAQ key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* ══ 15. FINAL CLOSE ═════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 lg:py-28" style={{ background: "#18181b" }}>
        <div className="absolute inset-0 sparkle-bg pointer-events-none opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(37,211,102,0.08),transparent 70%)" }} />
        <div className="max-w-xl mx-auto px-6 text-center relative">
          <p style={{ fontSize: 44 }} className="mb-5">🌱</p>
          <h2 className="duc-h1 mb-5" style={{ color: "#fff" }}>
            One tiny healthy habit.<br />Tomorrow morning.<br />
            <span style={{ color: "#25d366" }}>On your WhatsApp.</span>
          </h2>
          <p style={{ fontSize: 16, color: "#a1a1aa", lineHeight: 1.75, marginBottom: 32 }}>
            30 days from now, you could be the person who says<br />
            <em style={{ color: "#e4e4e7" }}>&ldquo;I&apos;m actually taking care of myself.&rdquo;</em>
            <br /><br />
            Or you could keep planning to start next Monday.<br />
            <strong style={{ color: "#e4e4e7" }}>₹1 decides which one.</strong>
          </p>
          <CTA label="Yes — Start My Trial for ₹1 →" sub="7 days for ₹1 · Then ₹99/month · Cancel before Day 7" />
          <p className="mt-5" style={{ fontSize: 13, color: "#52525b" }}>
            Questions?{" "}
            <a href="https://wa.me/918956146485?text=Hi%2C+I+have+a+question+about+the+Daily+Upgrade+Club" className="underline" style={{ color: "#25d366" }}>Chat with Rohan on WhatsApp</a>
          </p>
          <div className="mt-10 rounded-xl p-6 text-left" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.75 }}>
              <strong style={{ color: "#e4e4e7" }}>P.S.</strong> — The cost of doing nothing is not ₹0. Every month you spend feeling low energy, sleeping poorly, or saying &ldquo;I&apos;ll start next week&rdquo; has a real cost — in how you feel, what you achieve, and who you become. The trial costs ₹1. The real question isn&apos;t whether ₹1 is worth it. It&apos;s: how long do you want to keep waiting?
            </p>
          </div>
        </div>
      </section>

      <footer className="px-5 py-6 text-center" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p style={{ fontSize: 12, color: "#52525b" }}>
          © {new Date().getFullYear()} Daily Upgrade Club ·{" "}
          <a href="https://www.highperformanceclub.co" className="underline" style={{ color: "#3f3f46" }}>highperformanceclub.co</a>
        </p>
        <p style={{ fontSize: 12, color: "#3f3f46", marginTop: 4 }}>₹1 for 7 days · Then ₹99/month · Cancel anytime</p>
      </footer>

      <StickyBottomCTA />
      <LiveToast />
      <TrialPopup />
      <HabitChatbot />
    </div>
  );
}
