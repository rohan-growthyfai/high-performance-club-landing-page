/* eslint-disable @next/next/no-img-element */
import { Star, BadgeCheck } from "lucide-react";

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
  { type: "whatsapp", img: "/wall/Test1.png", result: "", name: "" },
  { type: "whatsapp", img: "/wall/Test2.png", result: "", name: "" },
  { type: "whatsapp", img: "/wall/Test3.png", result: "", name: "" },
  { type: "whatsapp", img: "/wall/Test4.png", result: "", name: "" },
  { type: "whatsapp", img: "/wall/Test5.png", result: "", name: "" },
  { type: "whatsapp", img: "/wall/Test6.png", result: "", name: "" },
];

function WhatsAppCard({ item }: { item: WaItem }) {
  return (
    <div className="break-inside-avoid mb-4 sm:mb-6 rounded-3xl overflow-hidden border border-border-subtle shadow-md bg-white">
      <img src={item.img} alt="WhatsApp testimonial" className="w-full block" loading="lazy" />
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
          <a href="https://wa.me/918956146485?text=Hi%21+I+want+to+start+my+Healthy+Habits+Challenge" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full text-lg sm:text-xl font-bold">
            Yes, I Want to Be Next
          </a>
        </div>
      </div>
    </section>
  );
}
