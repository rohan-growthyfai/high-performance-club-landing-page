"use client";
import { useEffect, useState } from "react";

export default function DUCStickyBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 lg:hidden ${visible ? "translate-y-0" : "translate-y-full"}`}>
      <div className="bg-[#faf8f3] border-t border-border px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-foreground font-bold text-sm leading-none">Daily Upgrade Club</p>
          <p className="text-[#71717a] text-xs mt-0.5">₹1 for 7 days, then ₹99/month</p>
        </div>
        <a
          href="https://rzp.io/l/daily-upgrade-club"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-sm font-bold text-black flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #25d366, #1da851)", boxShadow: "0 0 20px rgba(37,211,102,0.3)" }}
        >
          Join Now →
        </a>
      </div>
    </div>
  );
}
