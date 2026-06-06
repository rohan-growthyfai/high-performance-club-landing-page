"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function DUCStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"} lg:hidden`}>
      <div className="bg-white border-t border-border-subtle px-4 py-3 flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <p className="font-bold text-foreground text-sm leading-none">Daily Upgrade Club</p>
          <p className="text-xs text-foreground-muted mt-0.5">₹99/month • Cancel anytime</p>
        </div>
        <a
          href="https://rzp.io/l/daily-upgrade-club"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-sm font-bold flex-shrink-0"
        >
          Join Now <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
