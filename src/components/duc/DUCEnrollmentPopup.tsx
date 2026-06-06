"use client";

import { useEffect, useState, useRef } from "react";

const names = [
  { name: "Rahul", city: "Delhi" },
  { name: "Priya", city: "Mumbai" },
  { name: "Aditya", city: "Bengaluru" },
  { name: "Sneha", city: "Pune" },
  { name: "Vikram", city: "Hyderabad" },
  { name: "Anjali", city: "Chennai" },
  { name: "Rohan", city: "Jaipur" },
  { name: "Divya", city: "Ahmedabad" },
  { name: "Karan", city: "Kolkata" },
  { name: "Meera", city: "Surat" },
  { name: "Arjun", city: "Lucknow" },
  { name: "Tanvi", city: "Nagpur" },
  { name: "Saurabh", city: "Chandigarh" },
  { name: "Pooja", city: "Noida" },
  { name: "Nikhil", city: "Indore" },
  { name: "Kavya", city: "Kochi" },
];

export default function DUCEnrollmentPopup() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const show = (idx: number) => {
    setCurrent(idx);
    setVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(false), 4000);
  };

  useEffect(() => {
    // First popup after 6s, then every 18-28s
    const first = setTimeout(() => {
      show(Math.floor(Math.random() * names.length));
      intervalRef.current = setInterval(() => {
        show(Math.floor(Math.random() * names.length));
      }, 18000 + Math.random() * 10000);
    }, 6000);

    return () => {
      clearTimeout(first);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const person = names[current];

  return (
    <div className={`fixed bottom-6 left-4 z-50 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
      <div className="bg-white border border-border-subtle rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 max-w-[260px]">
        <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm" style={{ background: "linear-gradient(135deg, #1da851, #16a341)" }}>
          {person?.name[0]}
        </div>
        <div className="min-w-0">
          <p className="text-foreground font-semibold text-xs leading-snug truncate">
            {person?.name} from {person?.city}
          </p>
          <p className="text-foreground-muted text-xs mt-0.5">just joined Daily Upgrade Club 🎉</p>
        </div>
      </div>
    </div>
  );
}
