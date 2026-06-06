export default function DUCFooter() {
  return (
    <footer className="bg-[#080808] border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-14">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-8 mb-10">
          <div>
            <p className="text-white font-bold text-base mb-1">Daily Upgrade Club</p>
            <p className="text-[#444] text-sm">by High Performance Club</p>
            <p className="text-[#333] text-xs mt-3 leading-relaxed max-w-xs">
              Owned and operated by Growthyfai Technologies Private Limited.<br />
              GSTIN: 27AAKCG6243L1Z6 · Pune, Maharashtra
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <a href="/privacy-policy" className="text-[#444] hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms-and-conditions" className="text-[#444] hover:text-white transition-colors">Terms &amp; Conditions</a>
            <a href="/contact" className="text-[#444] hover:text-white transition-colors">Contact</a>
            <a href="/" className="text-[#444] hover:text-white transition-colors">7-Day Free Challenge →</a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row sm:justify-between gap-3">
          <p className="text-[#333] text-xs">
            <strong className="text-[#444]">Disclaimer:</strong> Daily Upgrade Club is for general habit-building only. Not medical advice, therapy, or a fitness/diet plan.
          </p>
          <p className="text-[#333] text-xs whitespace-nowrap">© 2026 High Performance Club</p>
        </div>
      </div>
    </footer>
  );
}
