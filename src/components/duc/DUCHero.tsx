/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import DUCPhone from "./DUCPhone";

const STATS = [
  { n: "1", label: "habit a day" },
  { n: "5min", label: "to complete" },
  { n: "₹99", label: "per month" },
  { n: "30", label: "days / month" },
];

export default function DUCHero() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0f0f0f]">

      {/* Grain overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundSize: "128px" }} />

      {/* Glow spots */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #25d366 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #b8853a 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-20 w-full">

        {/* Top label */}
        <div className={`mb-10 transition-all duration-700 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#25d366] border border-[#25d366]/30 bg-[#25d366]/8 px-4 py-2 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25d366] animate-pulse" />
            WhatsApp Habit Subscription
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <div className="lg:col-span-7">

            {/* Headline — editorial large */}
            <h1 className={`font-display transition-all duration-700 delay-100 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", lineHeight: 1.02, letterSpacing: "-0.03em", fontWeight: 800, color: "#fafafa" }}>
              One habit.<br />
              <span style={{ color: "#25d366" }}>Every day.</span><br />
              <span style={{ color: "#888", fontWeight: 400, fontStyle: "italic", fontSize: "0.82em" }}>On WhatsApp.</span>
            </h1>

            {/* Divider */}
            <div className={`my-8 h-px w-16 bg-[#25d366] transition-all duration-700 delay-200 ${show ? "opacity-100 w-16" : "opacity-0 w-0"}`} />

            {/* Sub */}
            <p className={`text-[#aaa] text-lg sm:text-xl leading-relaxed max-w-lg transition-all duration-700 delay-300 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              Daily Upgrade Club delivers <strong className="text-white">1 tiny habit</strong> every morning, tracks your progress automatically, and keeps you consistent — all inside WhatsApp.
            </p>

            <p className={`text-[#666] text-base mt-3 transition-all duration-700 delay-[350ms] ${show ? "opacity-100" : "opacity-0"}`}>
              No app. No login. No complicated routine.
            </p>

            {/* CTA */}
            <div className={`mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all duration-700 delay-500 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <a href="#duc-join"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold text-black overflow-hidden"
                style={{ background: "linear-gradient(135deg, #25d366 0%, #1da851 100%)", boxShadow: "0 0 32px rgba(37, 211, 102, 0.35)" }}>
                <span className="relative z-10">Start for ₹99/month</span>
                <span className="relative z-10 text-lg group-hover:translate-x-1 transition-transform">→</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(135deg, #2de070 0%, #25d366 100%)" }} />
              </a>
              <p className="text-[#555] text-sm">Cancel anytime · No lock-in</p>
            </div>

            {/* Stats row */}
            <div className={`mt-12 grid grid-cols-4 gap-0 transition-all duration-700 delay-700 ${show ? "opacity-100" : "opacity-0"}`}>
              {STATS.map((s, i) => (
                <div key={s.label} className={`text-center py-4 ${i < STATS.length - 1 ? "border-r border-white/8" : ""}`}>
                  <p className="font-display text-xl sm:text-2xl font-black text-white tabular-nums" style={{ letterSpacing: "-0.02em" }}>{s.n}</p>
                  <p className="text-[10px] sm:text-xs text-[#555] mt-1 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT — iPhone */}
          <div className={`lg:col-span-5 flex justify-center transition-all duration-700 delay-300 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="relative">
              {/* Glow behind phone */}
              <div className="absolute inset-0 blur-3xl opacity-30 scale-75" style={{ background: "radial-gradient(circle, #25d366 0%, transparent 70%)" }} />
              <div className="relative">
                <DUCPhone dark />
              </div>
              {/* Floating label */}
              <div className="absolute -left-4 lg:-left-16 top-1/4 hidden lg:block">
                <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl px-4 py-3 shadow-xl" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
                  <p className="text-[#25d366] font-bold text-sm">DONE ✅</p>
                  <p className="text-white/50 text-xs mt-0.5">streak: 7 days 🔥</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #0f0f0f)" }} />
    </section>
  );
}
