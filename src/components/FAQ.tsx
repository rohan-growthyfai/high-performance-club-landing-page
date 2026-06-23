"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "I have zero time. Can I still do it?",
    a: "Yes! Most habits take under 2 minutes. The longest one is 5 minutes. If you can check WhatsApp, you have enough time for this. 🙌",
  },
  {
    q: "What if I miss a day?",
    a: "No problem. Just do the next day's habit and keep going. You don't need to restart. Missing one day doesn't ruin anything. 💛",
  },
  {
    q: "I've quit every challenge I've ever tried. Why is this different?",
    a: "Because the habits are so small, there is almost nothing to quit. It is one tiny action a day — not a whole routine. Much easier to stay consistent. 🎯",
  },
  {
    q: "Is it really free? What's the catch?",
    a: "It is 100% free. After Day 7, we may show you our paid programs. But you don't have to join anything. No pressure at all. 👋",
  },
  {
    q: "Will this give health or therapy advice?",
    a: "No. This is a simple lifestyle habit challenge, not medical or therapy advice. If you have a health condition, please check with your doctor first. 🩺",
  },
  {
    q: "Will you call me, spam me, or sell my number?",
    a: "Never. You only get WhatsApp messages for the 7 days of the challenge. We do not sell or share your number with anyone. 🤞",
  },
  {
    q: "What happens after Day 7?",
    a: "You get your personalised progress report and your completion certificate. After that, you can choose to continue with our paid program or just move on. Totally up to you. 🏆",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border-subtle last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full py-5 sm:py-7 flex items-start justify-between gap-4 sm:gap-6 text-left group"
        aria-expanded={open}
      >
        <span className="font-medium text-foreground text-xs sm:text-xl leading-snug group-hover:text-accent transition-colors">
          {q}
        </span>
        <span className="flex-shrink-0 w-10 h-10 rounded-full border border-border-subtle group-hover:border-accent/40 flex items-center justify-center transition-colors mt-0.5 bg-white">
          {open ? (
            <Minus className="w-5 h-5 text-accent" />
          ) : (
            <Plus className="w-5 h-5 text-foreground-muted group-hover:text-accent" />
          )}
        </span>
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
        }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 sm:pb-7 pr-8 sm:pr-14 text-foreground-muted leading-relaxed text-xs sm:text-lg">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="py-28 lg:py-40 relative bg-section-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-base uppercase tracking-[0.2em] text-accent font-bold mb-6">
            Quick Q&A 🙋
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-balance text-foreground">
            Got a question?
            <br />
            <span className="italic font-light">Probably answered below.</span>
          </h2>
        </div>

        <div className="premium-card rounded-2xl px-7 sm:px-12">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 pt-14 pb-2">
          <p className="text-base text-foreground-muted text-center max-w-md">Still have a question? Just join and ask us directly on WhatsApp.</p>
          <a href="https://wa.me/918956146485?text=Hi%21+I+want+to+start+my+Healthy+Habits+Challenge" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-10 sm:py-5 rounded-full text-base sm:text-xl font-bold">
            Join the Challenge — It&apos;s FREE
          </a>
        </div>
      </div>
    </section>
  );
}
