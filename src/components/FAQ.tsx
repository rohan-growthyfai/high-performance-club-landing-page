"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "I have zero time. Can I still do it?",
    a: "Yes! Most habits take under 2 minutes. The longest one is 10 minutes. Honestly, if 2 minutes is too much, the problem isn't time — it's not having a simple plan. We give you that plan. 🙌",
  },
  {
    q: "What if I miss a day?",
    a: "No big deal. No guilt. No restart. Just pick up the next day and keep going. The goal isn't to be perfect. The goal is to keep showing up. 💛",
  },
  {
    q: "I've quit every challenge I've ever tried. Why is this different?",
    a: "Because this one isn't built on willpower or motivation. It's tiny experiments. No big promises. No fake big promises. Just one small thing a day, and a score you can see at the end. Way easier to stick with. 🎯",
  },
  {
    q: "Is it really free? What's the catch?",
    a: "Yes, really free. After Day 7, you'll see our paid programs — but you don't have to join anything. Many people finish and never hear from us again. That's totally fine. 👋",
  },
  {
    q: "Will this give health or therapy advice?",
    a: "Nope. This is a fun lifestyle habit challenge — not medical, therapy, diagnosis, treatment, or financial advice. If you need any of those, please see a real professional. 🩺",
  },
  {
    q: "Will you call me, spam me, or sell my number?",
    a: "Never. We send WhatsApp messages only for 7 days + an optional weekly newsletter (one tap to unsubscribe). We never sell or share your number. Promise. 🤞",
  },
  {
    q: "What happens after Day 7?",
    a: "You get a personalized report showing what changed + your certificate 🏆. Then you'll see an invite to our paid programs. Joining is 100% optional.",
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
          <a href="#signup-1" className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full text-lg sm:text-xl font-bold">
            Join the Challenge — It&apos;s FREE
          </a>
        </div>
      </div>
    </section>
  );
}
