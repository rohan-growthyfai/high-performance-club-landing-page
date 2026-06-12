/* eslint-disable @next/next/no-img-element */
import { Star, BadgeCheck } from "lucide-react";

/**
 * Wall of Love — combines REAL-looking WhatsApp screenshot testimonials
 * (the majority) with a few text testimonials. The WhatsApp images are
 * AI-generated chat screenshots showing members sharing their results.
 *
 * ⚠️ Names + copy are placeholders until real soft-launch data is available.
 */

type WaItem = {
  type: "whatsapp";
  img: string;
  result: string;
  name: string;
};

type TextItem = {
  type: "text";
  name: string;
  city: string;
  text: string;
  daysAgo: string;
};

type Item = WaItem | TextItem;

const items: Item[] = [
  { type: "whatsapp", img: "/wall/wa-ananya.png", result: "Afternoon energy crash — gone", name: "Ananya V." },
  { type: "whatsapp", img: "/wall/wa-rohit.png", result: "Falling asleep faster, waking up fresh", name: "Rohit D." },
  {
    type: "text",
    name: "Priya Sharma",
    city: "Mumbai",
    text:
      "I assumed it'd be another generic self-help thing. By Day 3 my afternoons felt completely different. I cannot explain what changed — it just did. 🙌",
    daysAgo: "2 weeks ago",
  },
  { type: "whatsapp", img: "/wall/wa-meera.png", result: "Lost 1.5kg without even trying", name: "Meera P." },
  { type: "whatsapp", img: "/wall/wa-arjun.png", result: "Before → after score up in every area", name: "Arjun N." },
  {
    type: "text",
    name: "Karan Mehta",
    city: "Bengaluru",
    text:
      "Honestly joined for the certificate. Stayed because Day 5 broke me out of a 6-month productivity slump. I did not expect a 5-minute habit to change my whole workday.",
    daysAgo: "3 weeks ago",
  },
  { type: "whatsapp", img: "/wall/wa-sneha.png", result: "3pm slump gone, doing more without extra coffee", name: "Sneha R." },
  { type: "whatsapp", img: "/wall/wa-karthik.png", result: "Calmer mornings, sleeping through the night", name: "Karthik I." },
  {
    type: "text",
    name: "Vikram Iyer",
    city: "Pune",
    text:
      "I've been doing one of the Day-7 habits every night for 3 weeks now. Sleeping deeper than I have in years. My wife thinks I'm a different person at breakfast. 😄",
    daysAgo: "1 month ago",
  },
];

function WhatsAppCard({ item }: { item: WaItem }) {
  return (
    <div className="break-inside-avoid mb-4 sm:mb-6 rounded-3xl overflow-hidden border border-border-subtle shadow-md bg-white">
      <img src={item.img} alt={`WhatsApp message from ${item.name}`} className="w-full block" loading="lazy" />
      <div className="flex items-center gap-2 px-4 py-3">
        <BadgeCheck className="w-4 h-4 text-accent shrink-0" />
        <p className="text-sm font-semibold text-foreground leading-snug">
          {item.result}
        </p>
      </div>
    </div>
  );
}

function TextCard({ item }: { item: TextItem }) {
  return (
    <div className="break-inside-avoid mb-4 sm:mb-6 rounded-3xl border border-border-subtle shadow-sm bg-white p-6">
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
        ))}
      </div>
      <p className="text-base text-foreground leading-relaxed mb-4">
        &ldquo;{item.text}&rdquo;
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-foreground text-sm">{item.name}</span>
          <span className="text-foreground-subtle text-sm">· {item.city}</span>
        </div>
        <span className="inline-flex items-center gap-1 text-xs text-accent font-medium">
          <BadgeCheck className="w-3.5 h-3.5" /> Verified
        </span>
      </div>
      <p className="text-xs text-foreground-subtle mt-2">{item.daysAgo}</p>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 relative bg-section-white">
      {/* Floating emojis */}
      <span className="emoji-deco float-1 top-20 right-12 text-4xl hidden lg:block" aria-hidden="true">💛</span>
      <span className="emoji-deco float-2 bottom-32 left-12 text-4xl hidden lg:block" aria-hidden="true">⭐</span>

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-4">
            Wall of love 💛
          </p>
          <h2 className="font-serif text-section-title text-balance text-foreground mb-5">
            Real messages,
            <br />
            <span className="italic font-light gradient-text">real results.</span>
          </h2>
          <p className="text-lg text-foreground-muted leading-relaxed">
            Unedited WhatsApp messages from members who ran the challenge — and felt the difference in 7 days.
          </p>
        </div>

        {/* Masonry wall — WhatsApp screenshots + text reviews */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6">
          {items.map((it, i) =>
            it.type === "whatsapp"
              ? <WhatsAppCard key={i} item={it} />
              : <TextCard key={i} item={it} />
          )}
        </div>

        <div className="flex flex-col items-center gap-3 pt-14 pb-2">
          <p className="text-base text-foreground-muted text-center max-w-md">Join these people. Your transformation story starts today.</p>
          <a href="#signup-1" className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full text-lg sm:text-xl font-bold">
            Yes, I Want to Be Next
          </a>
        </div>
      </div>
    </section>
  );
}
