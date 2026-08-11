"use client";
import { useState } from "react";

/**
 * TEMPORARY comparison page — four ways to add "people exercising" motion to the
 * 5-Minute Body landing page. View at /animation-preview, pick the winner, then
 * that one gets moved into /5minbodychallenge and this page is deleted.
 *
 *   Option 1 — Realistic looping video (one clip) in a hero-style card
 *   Option 2 — Animated LIVE Zoom grid (video tiles look like a live class)
 *   Option 3 — Lightweight CSS/SVG exercising figure (tiny, crisp, on-brand)
 *   Option 4 — Ken Burns / subtle motion on the existing real photos
 */

// The generated exercise clip lives here once ready. If missing, cards fall back
// to a poster image so the page never looks broken.
const CLIP = "/exercise-loop.mp4";
const POSTER = "/live-zoom.png";

function Label({ n, title, note }: { n: number; title: string; note: string }) {
  return (
    <div className="text-center mb-5">
      <span className="inline-block rounded-full px-3 py-1 mb-2" style={{ background: "#18181b", color: "#e8a020", fontSize: 12, fontWeight: 900, letterSpacing: "0.06em" }}>
        OPTION {n}
      </span>
      <h2 style={{ fontSize: "clamp(1.4rem,3.4vw,2rem)", fontWeight: 900, color: "#18181b", letterSpacing: "-0.02em" }}>{title}</h2>
      <p style={{ fontSize: 14.5, color: "#71717a", maxWidth: 520, margin: "6px auto 0", lineHeight: 1.5 }}>{note}</p>
    </div>
  );
}

function TimerChip({ time = "05:00", light = false }: { time?: string; light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-black tabular-nums"
      style={{ fontSize: 13, background: light ? "rgba(255,255,255,0.12)" : "#18181b", color: light ? "#fff" : "#e8a020" }}>
      <span style={{ fontSize: 11 }}>⏱</span>{time}
    </span>
  );
}

// ─── Option 3: CSS/SVG exercising figure — a jumping-jack loop ───────────────────
function ExerciseFigure() {
  return (
    <svg viewBox="0 0 120 140" width="150" height="175" aria-label="Animated figure exercising" role="img">
      {/* head */}
      <circle cx="60" cy="22" r="12" fill="#171412" />
      {/* body */}
      <rect x="55" y="34" width="10" height="40" rx="5" fill="#171412" />
      {/* arms — animate up/down like jumping jacks */}
      <g className="fmb-arm-l" style={{ transformOrigin: "58px 40px" }}>
        <rect x="30" y="38" width="30" height="8" rx="4" fill="#d4a017" />
      </g>
      <g className="fmb-arm-r" style={{ transformOrigin: "62px 40px" }}>
        <rect x="60" y="38" width="30" height="8" rx="4" fill="#d4a017" />
      </g>
      {/* legs — animate in/out */}
      <g className="fmb-leg-l" style={{ transformOrigin: "60px 74px" }}>
        <rect x="50" y="72" width="8" height="42" rx="4" fill="#171412" />
      </g>
      <g className="fmb-leg-r" style={{ transformOrigin: "60px 74px" }}>
        <rect x="62" y="72" width="8" height="42" rx="4" fill="#171412" />
      </g>
    </svg>
  );
}

export default function AnimationPreviewPage() {
  const [clipOk, setClipOk] = useState(true);

  return (
    <div id="fmb-preview" style={{ background: "#faf8f3", minHeight: "100vh", color: "#18181b" }}>
      <style>{`
        @keyframes fmb-pulse-ring{0%{transform:scale(0.9);opacity:0.7}70%{transform:scale(1.25);opacity:0}100%{opacity:0}}
        /* Option 3 figure motion */
        @keyframes fmb-jack-arm-l{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-140deg)}}
        @keyframes fmb-jack-arm-r{0%,100%{transform:rotate(0deg)}50%{transform:rotate(140deg)}}
        @keyframes fmb-jack-leg-l{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-22deg)}}
        @keyframes fmb-jack-leg-r{0%,100%{transform:rotate(0deg)}50%{transform:rotate(22deg)}}
        @keyframes fmb-hop{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        #fmb-preview .fmb-arm-l{animation:fmb-jack-arm-l 0.9s ease-in-out infinite}
        #fmb-preview .fmb-arm-r{animation:fmb-jack-arm-r 0.9s ease-in-out infinite}
        #fmb-preview .fmb-leg-l{animation:fmb-jack-leg-l 0.9s ease-in-out infinite}
        #fmb-preview .fmb-leg-r{animation:fmb-jack-leg-r 0.9s ease-in-out infinite}
        #fmb-preview .fmb-figure-wrap{animation:fmb-hop 0.9s ease-in-out infinite}
        /* Option 4 Ken Burns */
        @keyframes fmb-kenburns{0%{transform:scale(1) translate(0,0)}50%{transform:scale(1.12) translate(-2%,-2%)}100%{transform:scale(1) translate(0,0)}}
        #fmb-preview .fmb-kb{animation:fmb-kenburns 14s ease-in-out infinite}
        @media (prefers-reduced-motion: reduce){
          #fmb-preview .fmb-arm-l,#fmb-preview .fmb-arm-r,#fmb-preview .fmb-leg-l,#fmb-preview .fmb-leg-r,#fmb-preview .fmb-figure-wrap,#fmb-preview .fmb-kb{animation:none!important}
        }
      `}</style>

      {/* Header */}
      <div className="text-center px-6 pt-12 pb-8">
        <p style={{ fontSize: 13, fontWeight: 900, letterSpacing: "0.14em", color: "#a8790d" }}>INTERNAL PREVIEW · NOT PUBLIC</p>
        <h1 style={{ fontSize: "clamp(1.8rem,5vw,3rem)", fontWeight: 900, letterSpacing: "-0.03em", marginTop: 8 }}>
          &ldquo;People exercising&rdquo; animation — 4 options
        </h1>
        <p style={{ fontSize: 16, color: "#52525b", maxWidth: 620, margin: "12px auto 0", lineHeight: 1.6 }}>
          Compare all four below and tell me which one to keep. I&apos;ll move the winner into the live page and delete the other three.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-24 flex flex-col gap-16">

        {/* ── OPTION 1 — Realistic looping video ─────────────────────────────── */}
        <section>
          <Label n={1} title="Realistic looping video" note="One real person, actually moving. Highest realism — but adds a video file to the page." />
          <div className="rounded-3xl overflow-hidden relative" style={{ border: "1.5px solid #e6d9b0", boxShadow: "0 24px 55px -18px rgba(0,0,0,0.4)", background: "#171412" }}>
            {clipOk ? (
              <video src={CLIP} poster={POSTER} autoPlay muted loop playsInline
                onError={() => setClipOk(false)}
                style={{ width: "100%", height: "auto", display: "block" }} />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={POSTER} alt="Exercise clip placeholder" style={{ width: "100%", display: "block" }} />
            )}
            <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full px-3 py-1.5" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}>
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inline-flex w-full h-full rounded-full" style={{ background: "#ef4444", animation: "fmb-pulse-ring 1.6s ease-out infinite" }} />
                <span className="relative inline-flex w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
              </span>
              <span className="text-white font-black" style={{ fontSize: 12, letterSpacing: "0.08em" }}>LIVE</span>
            </div>
            <div className="absolute top-3 right-3"><TimerChip time="05:00" light /></div>
          </div>
        </section>

        {/* ── OPTION 2 — Animated LIVE Zoom grid ─────────────────────────────── */}
        <section>
          <Label n={2} title="Animated LIVE Zoom grid" note="The same clip tiled into a video-call grid — looks like a live class in motion. Reinforces 'together', but multiplies the video weight." />
          <div className="rounded-3xl overflow-hidden relative" style={{ border: "1.5px solid #e6d9b0", boxShadow: "0 24px 55px -18px rgba(0,0,0,0.4)", background: "#171412" }}>
            <div className="flex items-center justify-between px-4 py-2.5" style={{ background: "rgba(0,0,0,0.4)" }}>
              <div className="flex items-center gap-2">
                <span className="relative flex w-2.5 h-2.5">
                  <span className="absolute inline-flex w-full h-full rounded-full" style={{ background: "#ef4444", animation: "fmb-pulse-ring 1.6s ease-out infinite" }} />
                  <span className="relative inline-flex w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
                </span>
                <span className="text-white font-black" style={{ fontSize: 12, letterSpacing: "0.08em" }}>LIVE</span>
              </div>
              <TimerChip time="05:00" light />
            </div>
            <div className="grid grid-cols-3 gap-1.5 p-2.5">
              {["Rohan (Coach)", "Priya", "Aditya", "Meera", "Karan", "Sneha"].map((who, i) => (
                <div key={i} className="rounded-xl overflow-hidden relative" style={{ aspectRatio: "1", background: "rgba(255,255,255,0.05)", border: i === 0 ? "1.5px solid #d4a017" : "1px solid rgba(255,255,255,0.08)" }}>
                  {clipOk ? (
                    <video src={CLIP} autoPlay muted loop playsInline
                      onError={() => setClipOk(false)}
                      style={{ width: "100%", height: "100%", objectFit: "cover", filter: `hue-rotate(${i * 12}deg)` }} />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={POSTER} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  )}
                  <span className="absolute bottom-1 left-1 rounded px-1.5 py-0.5 text-white font-bold" style={{ fontSize: 9, background: "rgba(0,0,0,0.55)" }}>{who}</span>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 flex items-center justify-center gap-2" style={{ background: "rgba(0,0,0,0.4)" }}>
              <span style={{ fontSize: 14, color: "#fff", fontWeight: 900 }}>5 Minutes. Every Day.</span>
              <span style={{ fontSize: 14, color: "#e8a020", fontWeight: 900 }}>Together.</span>
            </div>
          </div>
        </section>

        {/* ── OPTION 3 — Lightweight CSS/SVG figure ──────────────────────────── */}
        <section>
          <Label n={3} title="Lightweight illustrated figure" note="A crisp, gold, looping figure — near-zero page weight, always sharp. Stylized, not photorealistic. Great inside the 'Inside the 5' timeline." />
          <div className="rounded-3xl p-10 flex flex-col items-center justify-center" style={{ background: "linear-gradient(135deg,#171412,#26211a)", border: "1.5px solid #e6d9b0", minHeight: 300 }}>
            <div className="fmb-figure-wrap"><ExerciseFigure /></div>
            <div className="mt-6 flex items-center gap-2">
              <TimerChip time="05:00" light />
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", fontWeight: 700 }}>Warm → Work → Reset → Work → Finish</span>
            </div>
          </div>
        </section>

        {/* ── OPTION 4 — Ken Burns on real photos ────────────────────────────── */}
        <section>
          <Label n={4} title="Subtle motion on real photos (Ken Burns)" note="Gentle slow zoom/pan on the real photos already on the page. Cheapest, adds life — but it's photo movement, not people exercising." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["/fmb-person-2.png", "/fmb-community.png"].map((src, i) => (
              <div key={src} className="rounded-3xl overflow-hidden" style={{ border: "1.5px solid #e6d9b0", boxShadow: "0 16px 40px -16px rgba(0,0,0,0.3)", height: 260 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="fmb-kb" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: i === 0 ? "center 20%" : "center", animationDelay: i === 0 ? "0s" : "-7s" }}
                  onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
            ))}
          </div>
        </section>

        <p className="text-center" style={{ fontSize: 14, color: "#a1a1aa" }}>
          Tell me the number you want kept — I&apos;ll wire it into the live page and remove this preview.
        </p>
      </div>
    </div>
  );
}
