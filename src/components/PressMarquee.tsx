const tags = [
  "STANFORD BEHAVIOR DESIGN LAB",
  "HUBERMAN LAB",
  "ANDREW WEIL PROTOCOLS",
  "HARVARD LIFESTYLE MEDICINE",
  "BAYLOR SLEEP RESEARCH",
  "BJ FOGG TINY HABITS",
  "ATOMIC HABITS RESEARCH",
  "STANFORD NEUROSCIENCE",
];

export default function PressMarquee() {
  // Duplicate the list so the marquee loops seamlessly
  const doubled = [...tags, ...tags];

  return (
    <section className="py-10 border-y border-border-subtle bg-background overflow-hidden">
      <p className="text-center text-xs uppercase tracking-[0.2em] text-foreground-subtle mb-6">
        Every habit references research from
      </p>
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((tag, i) => (
            <div
              key={`${tag}-${i}`}
              className="flex items-center mx-8 text-foreground-muted/50 font-serif text-sm tracking-[0.15em] uppercase"
            >
              <span>{tag}</span>
              <span className="ml-16 w-1 h-1 rounded-full bg-foreground-subtle/30" />
            </div>
          ))}
        </div>
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}
