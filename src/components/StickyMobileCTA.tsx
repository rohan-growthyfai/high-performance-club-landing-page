"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 inset-x-0 z-50 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="bg-white/95 backdrop-blur-xl border-t border-border shadow-2xl px-4 py-3.5">
        <a
          href="#signup"
          className="btn-primary w-full inline-flex items-center justify-center gap-2 px-6 py-5 rounded-full text-lg"
        >
          Join for <span className="font-extrabold">FREE</span>
          <ArrowRight className="w-4 h-4" />
        </a>
        <p className="text-center text-xs text-foreground-subtle mt-2">
          Free · WhatsApp delivery · Stop anytime
        </p>
      </div>
    </div>
  );
}
