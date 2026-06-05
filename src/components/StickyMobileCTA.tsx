"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      // Show after user scrolls past the hero (approx viewport height)
      setVisible(window.scrollY > window.innerHeight * 0.8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 inset-x-0 z-50 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white border-t border-border shadow-[0_-4px_24px_rgba(0,0,0,0.10)] px-4 pt-2.5 pb-4">
        <p className="text-center text-xs font-semibold text-foreground-subtle tracking-wide uppercase mb-2">
          Free 7-day challenge
        </p>
        <a
          href="#signup"
          className="btn-primary w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-base font-bold"
        >
          Join FREE on WhatsApp
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
