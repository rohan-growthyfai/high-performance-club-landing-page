"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import PhoneInput from "./PhoneInput";

type FormStatus = "idle" | "submitting" | "success" | "error";

const struggles = [
  "Energy — I feel tired most days",
  "Health — I want to be more healthy",
  "Sleep — I want to sleep better and feel rested",
];

const testimonials = [
  {
    avatar: "/avatars/women/woman-7.avif",
    name: "Priya S.",
    city: "Mumbai",
    quote: "I kept telling myself I had no time. Turns out I only needed 5 minutes. Day 3 changed everything.",
  },
  {
    avatar: "/avatars/men/man-5.avif",
    name: "Karan M.",
    city: "Bengaluru",
    quote: "I have quit every habit app I ever downloaded. This one came to me on WhatsApp. I did not have to remember anything. Finished all 7 days.",
  },
];

export default function SignupForm({ testimonialVariant = 0, formId = "form" }: { testimonialVariant?: number; formId?: string }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string>("");

  // Capture ?ref= referral code from the URL on load, persist it.
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get("ref");
      if (ref) localStorage.setItem("hpc_ref", ref.slice(0, 40));
    } catch { /* ignore */ }
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    let referredBy = "";
    try { referredBy = localStorage.getItem("hpc_ref") || ""; } catch { /* ignore */ }

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      whatsapp: formData.get("whatsapp"), // already includes country code from PhoneInput hidden field
      email: formData.get("email"),
      struggle: formData.get("struggle"),
      referredBy,
      consent: true,
    };

    // Optimistic UX: confirm to the user IMMEDIATELY on click. The engine now
    // accepts the registration instantly and runs onboarding in the background,
    // so there's no reason to make the user watch a spinner.
    try { localStorage.setItem("hpc_registered", "yes"); } catch { /* ignore */ }

    const firePixelEvents = () => {
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead", {
          content_name: "FREE 7-Day WhatsApp Habits Challenge",
          content_category: "Challenge Registration",
          status: "submitted",
        });
        (window as any).fbq("track", "CompleteRegistration", {
          content_name: "FREE 7-Day WhatsApp Habits Challenge",
          status: "registered",
          currency: "INR",
          value: 0,
        });
      }
    };
    firePixelEvents();
    setTimeout(firePixelEvents, 500);

    setStatus("success");

    // Fire the registration in the background — we already showed success.
    fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      keepalive: true, // survive navigation/tab close
    }).catch(() => { /* backend retries/logs server-side; user already confirmed */ });
  }

  if (status === "success") {
    return (
      <div className="premium-card rounded-2xl p-8 lg:p-10 text-center border-glow">
        <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-accent" />
        </div>
        <h3 className="font-serif text-3xl mb-3 text-foreground">You&apos;re in. 🎉</h3>
        <p className="text-foreground-muted leading-relaxed mb-6 text-base">
          Check your WhatsApp in the next 2 minutes. Your Day 1 habit is on the way.
        </p>
        <p className="text-sm text-foreground-subtle">
          Didn&apos;t receive anything? Contact us at contact@highperformanceclub.co
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="premium-card rounded-2xl p-6 lg:p-8 border-glow"
    >
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor={`${formId}-name`} className="block text-sm font-medium text-foreground mb-1.5">
            First name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            required
            placeholder="Rohan"
            className="input-premium w-full px-4 py-3 rounded-xl text-foreground placeholder:text-foreground-subtle text-base"
          />
        </div>

        {/* WhatsApp with country code selector */}
        <div>
          <label htmlFor={`${formId}-whatsapp`} className="block text-sm font-medium text-foreground mb-1.5">
            WhatsApp number
          </label>
          <PhoneInput id={`${formId}-whatsapp`} name="whatsapp" required placeholder="WhatsApp Number" />
        </div>

        {/* Email */}
        <div>
          <label htmlFor={`${formId}-email`} className="block text-sm font-medium text-foreground mb-1.5">
            Email
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            placeholder="rohan@example.com"
            className="input-premium w-full px-4 py-3 rounded-xl text-foreground placeholder:text-foreground-subtle text-base"
          />
        </div>

        {/* Struggle */}
        <div>
          <label htmlFor={`${formId}-struggle`} className="block text-sm font-medium text-foreground mb-1.5">
            What do you want to improve?
          </label>
          <select
            id={`${formId}-struggle`}
            name="struggle"
            required
            className="input-premium w-full px-4 py-3 rounded-xl text-foreground appearance-none cursor-pointer text-base"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2371717a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 1rem center",
              backgroundSize: "1rem",
              paddingRight: "2.5rem",
            }}
          >
            <option value="" disabled defaultValue="">Choose one…</option>
            {struggles.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
            {error}
          </p>
        )}

        {/* CTA Button */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary w-full inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full text-lg font-bold mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? (
            <><Loader2 className="w-5 h-5 animate-spin" />Joining…</>
          ) : (
            <>Join Now for <span className="font-extrabold">FREE</span><ArrowRight className="w-5 h-5" /></>
          )}
        </button>

        {/* Social proof below button */}
        <p className="text-center text-xs text-foreground-subtle">
          <span className="font-semibold text-foreground">2,400+ members</span> already joined
        </p>

        {/* Testimonial */}
        <div className="pt-4 border-t border-border-subtle flex items-start gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={testimonials[testimonialVariant % testimonials.length].avatar}
            alt={testimonials[testimonialVariant % testimonials.length].name}
            className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5"
          />
          <div>
            <p className="text-sm text-foreground leading-snug">
              &ldquo;{testimonials[testimonialVariant % testimonials.length].quote}&rdquo;
            </p>
            <p className="text-xs text-foreground-subtle mt-1 font-medium">
              {testimonials[testimonialVariant % testimonials.length].name} &nbsp;·&nbsp; {testimonials[testimonialVariant % testimonials.length].city} &nbsp;·&nbsp;
              <span className="text-accent">★★★★★</span>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
