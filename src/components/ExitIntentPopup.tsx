"use client";

import { useEffect, useState, useRef } from "react";
import { X, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import PhoneInput from "./PhoneInput";

type FormStatus = "idle" | "submitting" | "success" | "error";

const struggles = [
  "Energy Battery — I feel drained most days",
  "Daily Control — my day runs me, not the other way",
  "Phone Control — I reach for my phone too often",
  "Body Lightness — I feel heavy / stiff / low movement",
  "Mind Space — too much mental noise",
];

export default function ExitIntentPopup() {
  const [visible, setVisible]     = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isExitIntent, setIsExitIntent] = useState(false);
  const [status, setStatus]       = useState<FormStatus>("idle");
  const [error, setError]         = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shownRef = useRef(false);

  useEffect(() => {
    sessionStorage.removeItem("popup_dismissed");

    const showPopup = (exitIntent = false) => {
      if (shownRef.current && !exitIntent) return;
      if (exitIntent && dismissed) {
        // Already dismissed exit popup — allow tab to close
        return;
      }
      shownRef.current = true;
      setIsExitIntent(exitIntent);
      setStatus("idle");
      setError("");
      setVisible(true);
    };

    // 5-second timer on page load
    timerRef.current = setTimeout(() => showPopup(false), 5000);

    // Scroll also starts 5-second countdown
    const onScroll = () => {
      if (shownRef.current) return;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => showPopup(false), 5000);
    };
    window.addEventListener("scroll", onScroll, { passive: true, once: true });

    // Exit intent — mouse leaves top of page (desktop tab close gesture)
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) {
        showPopup(true);
      }
    };
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [dismissed]);

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
    shownRef.current = false; // allow exit-intent popup to show after timed one dismissed
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name:     formData.get("name"),
      whatsapp: formData.get("whatsapp"),
      email:    formData.get("email"),
      struggle: formData.get("struggle"),
      consent:  true,
    };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");

      // Meta Pixel events
      const firePixel = () => {
        if (typeof window !== "undefined" && (window as any).fbq) {
          (window as any).fbq("track", "Lead", {
            content_name: "FREE 7-Day WhatsApp Habits Challenge",
            content_category: "Popup Registration",
          });
          (window as any).fbq("track", "CompleteRegistration", {
            content_name: "FREE 7-Day WhatsApp Habits Challenge",
            status: "registered",
            currency: "INR",
            value: 0,
          });
        }
      };
      firePixel();
      setTimeout(firePixel, 500);

      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  if (!visible || dismissed) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
        onClick={dismiss}
      />

      {/* Popup */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none">
        <div
          className="pointer-events-auto w-full max-w-md bg-background rounded-2xl shadow-2xl border border-border overflow-hidden animate-fade-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-br from-accent to-accent-dim px-6 pt-8 pb-6 text-white text-center">
            <button
              onClick={dismiss}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <h2 className="text-2xl font-bold leading-snug">
              {isExitIntent ? "Wait! Before You Go 👋" : "Get More Energy, Focus & Calm in Just 7 Days"}
            </h2>
            <p className="text-sm opacity-90 mt-3 leading-relaxed">
              Join the FREE 7-Day WhatsApp Habits Challenge<br />
              &amp; Get 1 tiny good habit delivered in your WhatsApp daily.
            </p>
          </div>

          {/* Form / Success */}
          <div className="px-6 py-5">
            {status === "success" ? (
              <div className="text-center py-4">
                <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-3" />
                <h3 className="font-bold text-lg text-foreground mb-1">You&apos;re in! 🎉</h3>
                <p className="text-sm text-foreground-muted">
                  Check your WhatsApp in the next 2 minutes. Your Day 1 habit is on the way.
                </p>
                <button
                  onClick={dismiss}
                  className="mt-4 text-sm text-accent font-semibold hover:underline"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Your first name"
                    className="input-premium w-full px-4 py-3 rounded-xl text-foreground placeholder:text-foreground-subtle text-sm"
                  />
                </div>
                <PhoneInput name="whatsapp" required placeholder="WhatsApp Number" />
                <div>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Your email address"
                    className="input-premium w-full px-4 py-3 rounded-xl text-foreground placeholder:text-foreground-subtle text-sm"
                  />
                </div>
                <div>
                  <select
                    name="struggle"
                    required
                    className="input-premium w-full px-4 py-3 rounded-xl text-foreground text-sm appearance-none cursor-pointer"
                    style={{
                      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2371717a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "1rem",
                      paddingRight: "2.5rem",
                    }}
                  >
                    <option value="" disabled>What do you want to improve?</option>
                    {struggles.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                {error && (
                  <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-primary w-full inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full text-lg font-bold disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Joining…</>
                  ) : (
                    <>
                      Join Now for <span className="font-extrabold">FREE</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-foreground-subtle pt-1">
                  <span className="font-semibold text-foreground">2,400+ members</span> already joined
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
