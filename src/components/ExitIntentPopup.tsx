"use client";

import { useEffect, useState, useRef } from "react";
import { X, ArrowRight } from "lucide-react";

const WA_LINK = "https://wa.me/918956146485?text=Hi%21+I+want+to+start+my+Healthy+Habits+Challenge";

export default function ExitIntentPopup() {
  const [visible, setVisible]     = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shownRef = useRef(false);

  useEffect(() => {
    const alreadyRegistered = () => {
      try { return localStorage.getItem("hpc_registered") === "yes"; } catch { return false; }
    };

    const showPopup = () => {
      if (shownRef.current) return;
      if (alreadyRegistered()) return;
      shownRef.current = true;
      setVisible(true);
    };

    timerRef.current = setTimeout(showPopup, 10000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const dismiss = () => { setVisible(false); setDismissed(true); };

  if (!visible || dismissed) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" onClick={dismiss} />
      <div className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none">
        <div
          className="pointer-events-auto w-full max-w-md bg-background rounded-2xl shadow-2xl border border-border overflow-hidden animate-fade-up"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-gradient-to-br from-accent to-accent-dim px-6 pt-8 pb-6 text-white text-center">
            <button
              onClick={dismiss}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <h2 className="text-2xl font-bold leading-snug">
              Feel More Energetic, Healthier &amp; Sleep Better in Just 7 Days
            </h2>
            <p className="text-sm opacity-90 mt-3 leading-relaxed">
              Join the FREE 7-Day Healthy Habits Challenge<br />
              &amp; get 1 tiny healthy habit delivered to your WhatsApp daily.
            </p>
          </div>

          <div className="px-6 py-6 text-center">
            <p className="text-sm text-foreground-muted mb-5">
              No forms. No app. Just tap the button below — your WhatsApp opens and the challenge starts instantly.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={dismiss}
              className="btn-primary w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-lg font-bold"
            >
              Join FREE on WhatsApp
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="mt-4 text-xs text-foreground-subtle">
              <span className="font-semibold text-foreground">2,400+ members</span> already joined · 100% free
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
