"use client";

import { useState } from "react";
import { ArrowRight, Lock, CheckCircle2, Loader2 } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

const struggles = [
  "Energy Battery — I feel drained most days",
  "Daily Control — my day runs me, not the other way",
  "Phone Control — I reach for my phone too often",
  "Body Lightness — I feel heavy / stiff / low movement",
  "Mind Space — too much mental noise",
];

const testimonials = [
  {
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Priya S.",
    city: "Mumbai",
    quote: "I kept telling myself I had no time. Turns out I only needed 5 minutes. Day 3 changed everything.",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    name: "Karan M.",
    city: "Bengaluru",
    quote: "I have quit every habit app I ever downloaded. This one came to me on WhatsApp. I did not have to remember anything. Finished all 7 days.",
  },
];

export default function SignupForm({ testimonialVariant = 0, formId = "form" }: { testimonialVariant?: number; formId?: string }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      whatsapp: formData.get("whatsapp"),
      email: formData.get("email"),
      struggle: formData.get("struggle"),
      consent: formData.get("consent") === "on",
    };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setError(
        "Something went wrong. Please try again or message us on WhatsApp."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="premium-card rounded-2xl p-10 lg:p-14 text-center border-glow">
        <div className="w-20 h-20 mx-auto rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-8">
          <CheckCircle2 className="w-10 h-10 text-accent" />
        </div>
        <h3 className="font-serif text-4xl mb-4 text-foreground">You&apos;re in. 🎉</h3>
        <p className="text-foreground-muted leading-relaxed mb-8 text-lg">
          Check your WhatsApp in the next 2 minutes. Your Day 1 habit is on the way.
        </p>
        <p className="text-base text-foreground-subtle">
          Didn&apos;t receive anything? Make sure your WhatsApp number is correct,
          or contact us at contact@highperformanceclub.com
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="premium-card rounded-2xl p-8 lg:p-12 border-glow"
    >
      <div className="space-y-6">
        <div>
          <label
            htmlFor={`${formId}-name`}
            className="block text-base font-medium text-foreground mb-2"
          >
            First name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            required
            placeholder="Rohan"
            className="input-premium w-full px-5 py-4 rounded-xl text-foreground placeholder:text-foreground-subtle text-lg"
          />
        </div>

        <div>
          <label
            htmlFor={`${formId}-whatsapp`}
            className="block text-base font-medium text-foreground mb-2"
          >
            WhatsApp number{" "}
            <span className="text-foreground-subtle font-normal">
              (with country code)
            </span>
          </label>
          <input
            id={`${formId}-whatsapp`}
            name="whatsapp"
            type="tel"
            required
            placeholder="+91 98765 43210"
            pattern="^\+?[0-9\s]{10,15}$"
            className="input-premium w-full px-5 py-4 rounded-xl text-foreground placeholder:text-foreground-subtle text-lg"
          />
        </div>

        <div>
          <label
            htmlFor={`${formId}-email`}
            className="block text-base font-medium text-foreground mb-2"
          >
            Email
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            placeholder="rohan@example.com"
            className="input-premium w-full px-5 py-4 rounded-xl text-foreground placeholder:text-foreground-subtle text-lg"
          />
        </div>

        <div>
          <label
            htmlFor={`${formId}-struggle`}
            className="block text-base font-medium text-foreground mb-2"
          >
            Which area do you want to upgrade most?
          </label>
          <select
            id={`${formId}-struggle`}
            name="struggle"
            required
            className="input-premium w-full px-5 py-4 rounded-xl text-foreground appearance-none cursor-pointer text-lg"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2371717a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 1.25rem center",
              backgroundSize: "1.25rem",
              paddingRight: "3rem",
            }}
          >
            <option value="" disabled defaultValue="">
              Choose one…
            </option>
            {struggles.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-start gap-3 pt-2">
          <input
            id={`${formId}-consent`}
            name="consent"
            type="checkbox"
            required
            className="mt-1.5 w-5 h-5 rounded border-border bg-white text-accent focus:ring-accent focus:ring-offset-0 cursor-pointer accent-accent"
          />
          <label
            htmlFor={`${formId}-consent`}
            className="text-base text-foreground-muted leading-relaxed cursor-pointer"
          >
            I agree to receive daily WhatsApp messages for 7 days. I can stop
            anytime by replying STOP.
          </label>
        </div>

        {error && (
          <p className="text-base text-red-600 bg-red-50 border border-red-200 rounded-lg p-4">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary w-full inline-flex items-center justify-center gap-2 px-8 py-6 rounded-full text-xl mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Joining…
            </>
          ) : (
            <>
              Join for <span className="line-through opacity-70 mx-1">₹1999</span> <span className="font-extrabold">FREE</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 pt-2 text-sm text-foreground-subtle">
          <Lock className="w-4 h-4" />
          <span>We never share your number. No spam. No phone calls.</span>
        </div>

        {/* Testimonial — directly below form, minimal gap */}
        <div className="mt-5 pt-5 border-t border-border-subtle flex items-start gap-3">
          <img
            src={testimonials[testimonialVariant % testimonials.length].avatar}
            alt={testimonials[testimonialVariant % testimonials.length].name}
            className="w-9 h-9 rounded-full object-cover flex-shrink-0 mt-0.5"
          />
          <div>
            <p className="text-sm text-foreground leading-snug">
              &ldquo;{testimonials[testimonialVariant % testimonials.length].quote}&rdquo;
            </p>
            <p className="text-xs text-foreground-subtle mt-1.5 font-medium">
              {testimonials[testimonialVariant % testimonials.length].name} &nbsp;·&nbsp; {testimonials[testimonialVariant % testimonials.length].city} &nbsp;·&nbsp;
              <span className="text-accent">★★★★★</span>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
