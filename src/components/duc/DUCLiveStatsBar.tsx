"use client";

import { useEffect, useState } from "react";
import { MessageCircle, CheckCircle2, Users, Star } from "lucide-react";

function useLiveCounter(initial: number, minMs: number, maxMs: number, maxInc: number) {
  const [val, setVal] = useState(initial);
  useEffect(() => {
    if (maxInc === 0) return;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const delay = minMs + Math.random() * (maxMs - minMs);
      t = setTimeout(() => {
        setVal(v => v + Math.ceil(Math.random() * maxInc));
        tick();
      }, delay);
    };
    tick();
    return () => clearTimeout(t);
  }, [minMs, maxMs, maxInc]);
  return val;
}

export default function DUCLiveStatsBar() {
  const habits   = useLiveCounter(18432, 4000, 9000, 3);
  const members  = useLiveCounter(1240, 12000, 28000, 1);
  const active   = useLiveCounter(94, 6000, 14000, 1);

  const stats = [
    { icon: <CheckCircle2 className="w-4 h-4" />, value: habits.toLocaleString("en-IN") + "+", label: "habits completed", color: "text-[#1da851]" },
    { icon: <Users className="w-4 h-4" />, value: members.toLocaleString("en-IN") + "+", label: "members", color: "text-accent" },
    { icon: <MessageCircle className="w-4 h-4" />, value: active.toString(), label: "active now", color: "text-blue-500" },
    { icon: <Star className="w-4 h-4" />, value: "4.9★", label: "avg rating", color: "text-amber-500" },
  ];

  return (
    <div className="bg-white border-y border-border-subtle py-3">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 divide-x divide-border-subtle">
          {stats.map(s => (
            <div key={s.label} className="flex items-center justify-center gap-2 px-4 py-1">
              <span className={s.color}>{s.icon}</span>
              <span className={`font-bold text-sm tabular-nums ${s.color}`}>{s.value}</span>
              <span className="text-foreground-subtle text-xs hidden sm:inline">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
