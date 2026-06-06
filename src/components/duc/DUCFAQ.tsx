"use client";
import { useState } from "react";

const faqs = [
  { q: "Is it really ₹99/month?", a: "Yes. ₹99/month. No hidden charges, no upsells forced on you." },
  { q: "Can I cancel anytime?", a: "Yes. Cancel anytime. No questions asked, no lock-in period." },
  { q: "Where will I receive the habits?", a: "Directly on WhatsApp. That's the only place." },
  { q: "Do I need to install an app?", a: "No. Everything happens on WhatsApp. Nothing to download." },
  { q: "What happens after I reply DONE?", a: "Your progress updates automatically — streak, weekly count, monthly progress. You see it reflected in your next scorecard." },
  { q: "Will I get too many messages?", a: "No. One habit in the morning. One weekly scorecard. One weekly newsletter. Group messages when relevant. That's it." },
  { q: "Is this medical or fitness advice?", a: "No. This is general habit-building for self-improvement only. Not medical, not therapy, not a diet or fitness plan." },
  { q: "What is the Habit Vault?", a: "A growing collection of monthly PDF guides and habit calendars. One new guide added every month you're subscribed." },
  { q: "What happens after one month?", a: "You move into the next monthly theme. Your library of PDF guides keeps growing the longer you stay." },
  { q: "What if I miss a few days?", a: "Nothing bad happens. You pick up the next day. The habit still lands at 6 AM. Progress is cumulative, not binary." },
];

export default function DUCFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 lg:py-32 bg-section-white border-t border-border-subtle">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#25d366] mb-6">Questions</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 800, color: "#18181b" }}>
            Common questions.
          </h2>
        </div>

        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <div key={faq.q} className={`border-b border-border-subtle ${i === 0 ? "border-t" : ""}`}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-6 py-6 text-left group"
              >
                <span className={`text-sm sm:text-base font-medium transition-colors ${open === i ? "text-white" : "text-[#52525b] group-hover:text-white"}`}>
                  {faq.q}
                </span>
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <div className={`w-4 h-px bg-current transition-all duration-300 ${open === i ? "text-[#25d366]" : "text-foreground-subtle group-hover:text-[#71717a]"}`} />
                  <div className={`absolute w-px h-4 bg-current transition-all duration-300 ${open === i ? "opacity-0 text-[#25d366]" : "opacity-100 text-foreground-subtle group-hover:text-[#71717a]"}`} />
                </span>
              </button>
              <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}>
                <div className="overflow-hidden">
                  <p className="pb-6 pr-8 text-[#71717a] text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
