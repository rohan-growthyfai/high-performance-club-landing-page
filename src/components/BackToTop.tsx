"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Back to top"
      className={`
        fixed bottom-24 right-5 z-50
        w-12 h-12 rounded-full
        bg-accent text-white shadow-lg
        flex items-center justify-center
        transition-all duration-300
        hover:bg-accent-dim hover:-translate-y-1 hover:shadow-xl
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
