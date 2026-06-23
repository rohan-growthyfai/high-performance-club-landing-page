"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-50 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      {/* Mobile */}
      <div className="md:hidden bg-white border-t border-border shadow-[0_-4px_24px_rgba(0,0,0,0.10)] px-4 pt-2 pb-3">
        <p className="text-center text-[10px] font-semibold text-foreground-subtle tracking-wide uppercase mb-1.5">
          Free 7-day challenge
        </p>
        <a
          href="https://wa.me/918956146485?text=Hi%21+I+want+to+start+my+Healthy+Habits+Challenge"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold"
        >
          Join FREE on WhatsApp
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Desktop */}
      <div className="hidden md:block bg-white border-t border-border shadow-[0_-4px_24px_rgba(0,0,0,0.10)] py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <p className="text-sm font-semibold text-foreground-subtle tracking-wide uppercase">
            Free 7-day healthy habits challenge
          </p>
          <a
            href="https://wa.me/918956146485?text=Hi%21+I+want+to+start+my+Healthy+Habits+Challenge"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-base font-bold whitespace-nowrap"
          >
            Join FREE on WhatsApp
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
