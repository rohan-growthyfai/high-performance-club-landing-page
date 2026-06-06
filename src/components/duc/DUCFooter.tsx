export default function DUCFooter() {
  return (
    <footer className="bg-section-cream border-t border-border-subtle">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-14">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-8 mb-10">
          <div>
            <p className="text-foreground font-bold text-base mb-1">Daily Upgrade Club</p>
            <p className="text-foreground-subtle text-sm">by High Performance Club</p>
            <p className="text-foreground-subtle text-xs mt-3 leading-relaxed max-w-xs">
              Owned and operated by Growthyfai Technologies Private Limited.<br />
              GSTIN: 27AAKCG6243L1Z6 · Pune, Maharashtra
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <a href="/privacy-policy" className="text-foreground-subtle hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="/terms-and-conditions" className="text-foreground-subtle hover:text-foreground transition-colors">Terms &amp; Conditions</a>
            <a href="/contact" className="text-foreground-subtle hover:text-foreground transition-colors">Contact</a>
            <a href="/" className="text-foreground-subtle hover:text-foreground transition-colors">7-Day Free Challenge →</a>
          </div>
        </div>

        <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row sm:justify-between gap-3">
          <p className="text-foreground-subtle text-xs">
            <strong className="text-foreground-subtle">Disclaimer:</strong> Daily Upgrade Club is for general habit-building only. Not medical advice, therapy, or a fitness/diet plan.
          </p>
          <p className="text-foreground-subtle text-xs whitespace-nowrap">© 2026 High Performance Club</p>
        </div>
      </div>
    </footer>
  );
}
