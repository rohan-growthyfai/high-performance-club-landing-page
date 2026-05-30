"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
};

const stats: Stat[] = [
  { value: 3247, suffix: "+", label: "Daily messages delivered" },
  { value: 89, suffix: "%", label: "Finish the full 7 days" },
  { value: 4.9, decimals: 1, label: "Average rating", suffix: "★" },
  { value: 5, label: "Minutes per habit", suffix: " min" },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.3 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function Counter({ stat }: { stat: Stat }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(stat.value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat.value]);

  const display = stat.decimals
    ? val.toFixed(stat.decimals)
    : Math.floor(val).toLocaleString("en-IN");

  return (
    <div ref={ref} className="text-center">
      <div className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium counter-text tabular-nums leading-none">
        {stat.prefix}
        {display}
        {stat.suffix}
      </div>
      <p className="mt-3 text-sm text-foreground-muted">{stat.label}</p>
    </div>
  );
}

export default function StatBar() {
  return (
    <section className="py-16 lg:py-20 border-y border-border-subtle bg-background-elevated/40">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <Counter key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
