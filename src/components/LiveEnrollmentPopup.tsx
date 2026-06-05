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
  { name: "Manish", city: "Bhopal" },
  { name: "Ritesh", city: "Varanasi" },
  { name: "Simran", city: "Amritsar" },
  { name: "Devansh", city: "Gurgaon" },
  { name: "Ruchika", city: "Jodhpur" },
  { name: "Varun", city: "Ludhiana" },
  { name: "Ishita", city: "Patna" },
  { name: "Abhishek", city: "Kanpur" },
];

function getSecondsAgo() {
  // Returns a believable "X seconds/minutes ago" string
  const r = Math.random();
  if (r < 0.3) return `${Math.floor(Math.random() * 50 + 5)} seconds ago`;
  if (r < 0.6) return `just now`;
  if (r < 0.8) return `${Math.floor(Math.random() * 3 + 1)} minute${Math.random() > 0.5 ? "s" : ""} ago`;
  return `${Math.floor(Math.random() * 8 + 2)} minutes ago`;
}

interface Toast {
  id: number;
  name: string;
  city: string;
  time: string;
}

let toastId = 0;

export default function LiveEnrollmentPopup() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [visible, setVisible] = useState(false);
  const usedIndices = useRef<Set<number>>(new Set());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Show after user scrolls a bit
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 300) setVisible(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Spawn toasts on a jittered interval
  useEffect(() => {
    if (!visible) return;

    const spawn = () => {
      // Pick a name/city not recently used
      let idx: number;
      do {
        idx = Math.floor(Math.random() * names.length);
      } while (usedIndices.current.has(idx));

      usedIndices.current.add(idx);
      if (usedIndices.current.size > 6) {
        // Forget oldest so we don't exhaust the pool
        const first = usedIndices.current.values().next().value as number;
        usedIndices.current.delete(first);
      }

      const person = names[idx];
      const id = ++toastId;
      const toast: Toast = {
        id,
        name: person.name,
        city: person.city,
        time: getSecondsAgo(),
      };

      setToasts(prev => [toast, ...prev].slice(0, 3));

      // Auto-remove after 5 seconds
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 5000);

      // Schedule next — jittered between 6 and 18 seconds
      const nextDelay = 6000 + Math.random() * 12000;
      timerRef.current = setTimeout(spawn, nextDelay);
    };

    // First toast after 3-6 seconds
    timerRef.current = setTimeout(spawn, 3000 + Math.random() * 3000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible]);

  if (!visible || toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 left-2 z-50 flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((toast, i) => (
        <div
          key={toast.id}
          className="pointer-events-auto animate-fade-up"
          style={{
            opacity: i === 0 ? 1 : 0.7 - i * 0.2,
            transform: `scale(${1 - i * 0.03})`,
            transformOrigin: "bottom left",
          }}
        >
          <div
            className="flex items-center gap-2 bg-white border border-border-subtle rounded-2xl px-3 py-2.5 shadow-lg w-[260px] sm:w-[310px]"
            style={{
              boxShadow: "0 4px 20px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            {/* Avatar circle with initial */}
            <div
              className="w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0"
              style={{
                background: `hsl(${(toast.name.charCodeAt(0) * 37) % 360}, 55%, 52%)`,
              }}
            >
              {toast.name[0]}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-foreground leading-snug truncate">
                {toast.name} from {toast.city}
              </p>
              <p className="text-[10px] sm:text-xs text-foreground-muted leading-snug mt-0.5">
                joined the challenge · {toast.time}
              </p>
            </div>

            {/* Live dot */}
            <span className="relative flex w-2 h-2 flex-shrink-0">
              <span className="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500" />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
