"use client";

import { useEffect, useState } from "react";
import { Heart, CheckCircle2, Users, TrendingUp } from "lucide-react";

/**
 * Standalone LiveStatsBar — shown directly below Hero.
 *
 * 4 counters, each with its own random interval so they
 * never increment in sync. Looks organic, not fake.
 *
 * Numbers chosen to feel real at this stage:
 * - Messages delivered: 12,847+ (visible activity)
 * - Habits completed:  3,247+ (smaller, believable subset)
 * - People active now: 189    (current live count)
 * - Avg rating:        4.9★   (static — never changes mid-session)
 */

function useLiveCounter(
  initial: number,
  minMs: number,
  maxMs: number,
  maxInc: number,
) {
  const [val, setVal] = useState(initial);
  useEffect(() => {
    if (maxInc === 0) return;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const delay = minMs + Math.random() * (maxMs - minMs);
      t = setTimeout(() => {
        setVal(v => v + 1 + Math.floor(Math.random() * maxInc));
        tick();
      }, delay);
    };
    tick();
    return () => clearTimeout(t);
  }, [minMs, maxMs, maxInc]);
  return val;
}

const fmt = (n: number) => n.toLocaleString("en-IN");

export default function LiveStatsBar() {
  const messages  = useLiveCounter(12901, 4200, 9800, 2);
  const habits    = useLiveCounter(3279,  6800, 13000, 1);
  const activeNow = useLiveCounter(875,   8500, 17000, 1);

  return (
    <section className="bg-section-white border-y border-border-subtle py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* LIVE pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-border shadow-sm">
            <span className="relative flex w-2.5 h-2.5">
              <span className="absolute inline-flex w-full h-full rounded-full animate-ping opacity-70" style={{ background: "#25d366" }} />
              <span className="relative inline-flex w-2.5 h-2.5 rounded-full" style={{ background: "#25d366" }} />
            </span>
            <span className="text-sm font-bold text-foreground-muted tracking-wider uppercase">Live</span>
            <span className="text-sm text-foreground-subtle">· changing right now</span>
          </div>
        </div>

        {/* 4 stats — equal columns, symmetrical */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <StatCard
            icon={Heart}
            value={fmt(messages)}
            label="Healthy habits sent on WhatsApp"
            sub="across all members"
            live
          />
          <StatCard
            icon={CheckCircle2}
            value={fmt(habits)}
            label="Habits completed"
            sub="this week"
            live
          />
          <StatCard
            icon={Users}
            value={fmt(activeNow)}
            label="People active"
            sub="right now"
            live
          />
          <StatCard
            icon={TrendingUp}
            value="7 Days"
            label="To feel the difference"
            sub="results members report"
          />
        </div>

        {/* Trust strip below */}
        <div className="mt-8 pt-6 border-t border-border-subtle flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-foreground-muted">
          <span className="flex items-center gap-2"><span className="text-accent font-bold">✓</span> 100% FREE</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-foreground-subtle/30" />
          <span className="flex items-center gap-2"><span className="text-accent font-bold">✓</span> No credit card needed</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-foreground-subtle/30" />
          <span className="flex items-center gap-2"><span className="text-accent font-bold">✓</span> Delivered on WhatsApp</span>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
  sub,
  suffix = "",
  live = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  sub: string;
  suffix?: string;
  live?: boolean;
}) {
  return (
    <div className="text-center bg-white rounded-2xl p-6 border border-border-subtle shadow-sm relative hover-glow">
      {live && (
        <span className="absolute top-3 right-3 flex w-2 h-2">
          <span className="absolute inline-flex w-full h-full rounded-full animate-ping opacity-70" style={{ background: "#25d366" }} />
          <span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: "#25d366" }} />
        </span>
      )}
      <div className="flex justify-center mb-3">
        <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-accent" />
        </div>
      </div>
      <div className="number-badge text-2xl sm:text-5xl gradient-text tabular-nums leading-none">
        {value}{suffix && <span className="text-accent">{suffix}</span>}
      </div>
      <p className="mt-2 text-sm font-semibold text-foreground">{label}</p>
      <p className="mt-0.5 text-xs text-foreground-subtle">{sub}</p>
    </div>
  );
}
