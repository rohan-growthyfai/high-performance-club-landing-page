"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "Is it really ₹99/month?", a: "Yes. Daily Upgrade Club is ₹99/month. No hidden charges." },
  { q: "Can I cancel anytime?", a: "Yes. You can cancel anytime. No questions asked." },
  { q: "Where will I receive the habits?", a: "You'll receive them on WhatsApp directly." },
  { q: "Do I need to install an app?", a: "No. Everything happens on WhatsApp. No downloads needed." },
  { q: "What happens after I reply DONE?", a: "Your habit completion gets counted and your progress is updated automatically." },
  { q: "Will I get too many messages?", a: "No. You'll receive daily habit messages, weekly progress updates, the newsletter, and accountability group messages. That's it." },
  { q: "Is this a fitness or diet program?", a: "No. This is a habit-building subscription focused on daily improvement across energy, focus, health, calmness, sleep, and discipline." },
  { q: "Is this medical advice?", a: "No. This is for general habit-building and self-improvement only. It is not medical, fitness, or mental-health advice." },
  { q: "What is the Private Accountability Group?", a: "It is a private WhatsApp group for daily check-ins, habit wins, reminders, and community support. No spam. No promotions." },
  { q: "What is the Habit Vault?", a: "It is a growing collection of monthly habit guides, habit calendars, and resources you unlock over time." },
  { q: "What happens after one month?", a: "You move into the next monthly theme and continue your habit journey. Your library of PDF guides keeps growing." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border-subtle last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full py-5 sm:py-6 flex items-start justify-between gap-4 text-left group"
        aria-expanded={open}
      >
        <span className="font-medium text-foreground text-sm sm:text-lg leading-snug group-hover:text-accent transition-colors">
          {q}
        </span>
        <span className="flex-shrink-0 w-9 h-9 rounded-full border border-border-subtle group-hover:border-accent/40 flex items-center justify-center transition-colors mt-0.5 bg-white">
          {open ? <Minus className="w-4 h-4 text-accent" /> : <Plus className="w-4 h-4 text-foreground-muted group-hover:text-accent" />}
        </span>
      </button>
      <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <p className="pb-5 pr-8 sm:pr-12 text-foreground-muted leading-relaxed text-sm sm:text-base">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function DUCFAQ() {
  return (
    <section className="py-20 lg:py-28 relative bg-section-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">Questions</p>
          <h2 className="font-display text-section-title text-foreground mb-4">Common Questions</h2>
        </div>
        <div className="bg-white border border-border-subtle rounded-2xl px-6 sm:px-8 divide-y divide-border-subtle">
          {faqs.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </div>
    </section>
  );
}
