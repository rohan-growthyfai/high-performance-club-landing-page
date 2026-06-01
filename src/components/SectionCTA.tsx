export default function SectionCTA({ text, sub }: { text: string; sub?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 pt-14 pb-2">
      {sub && (
        <p className="text-base text-foreground-muted text-center max-w-md">{sub}</p>
      )}
      <a
        href="#signup"
        className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dim transition-colors text-white font-bold text-lg sm:text-xl px-10 py-5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
      >
        {text} →
      </a>
    </div>
  );
}
