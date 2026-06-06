export default function SectionCTA({ text, sub }: { text: string; sub?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 pt-14 pb-2">
      {sub && (
        <p className="text-base text-foreground-muted text-center max-w-md">{sub}</p>
      )}
      <a
        href="#signup-1"
        className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full text-lg sm:text-xl font-bold"
      >
        {text} →
      </a>
    </div>
  );
}
