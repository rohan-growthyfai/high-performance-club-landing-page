"use client";

import { useEffect, useState, useRef } from "react";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";

export default function DUCExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const shownRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const showPopup = () => {
      if (shownRef.current || dismissed) return;
      shownRef.current = true;
      setVisible(true);
    };

    // Show after 25s on page
    timerRef.current = setTimeout(() => showPopup(), 25000);

    // Exit intent — mouse leaves top
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) showPopup();
    };
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [dismissed]);

  const dismiss = () => { setVisible(false); setDismissed(true); };

  if (!visible || dismissed) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" onClick={dismiss} />
      <div className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none">
        <div
          className="pointer-events-auto w-full max-w-md bg-white rounded-3xl shadow-2xl border border-border-subtle overflow-hidden animate-fade-up"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative px-6 pt-8 pb-6 text-center" style={{ background: "linear-gradient(135deg, #1da851, #16a341)" }}>
            <button
              onClick={dismiss}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            <p className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-2">Wait — one second 👋</p>
            <h2 className="text-white text-2xl font-bold leading-snug">
              Build better habits for<br />less than a cup of chai
            </h2>
            <p className="text-white/80 text-sm mt-3 leading-relaxed">
              Daily Upgrade Club · ₹99/month · Cancel anytime
            </p>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <div className="space-y-3 mb-6">
              {[
                "1 tiny habit every morning on WhatsApp",
                "Weekly scorecard to track your progress",
                "Monthly PDF guide + Habit Vault",
                "Private accountability group",
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#1da851] flex-shrink-0" />
                  <p className="text-foreground-muted text-sm">{item}</p>
                </div>
              ))}
            </div>

            <a
              href="https://rzp.io/l/daily-upgrade-club"
              target="_blank"
              rel="noopener noreferrer"
              onClick={dismiss}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-base font-bold text-white transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #1da851, #16a341)", boxShadow: "0 4px 20px rgba(29,168,81,0.35)" }}
            >
              Start Daily Upgrade Club <ArrowRight className="w-5 h-5" />
            </a>

            <button onClick={dismiss} className="w-full mt-3 text-xs text-foreground-subtle hover:text-foreground transition-colors py-1">
              No thanks, I&apos;ll skip this
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
