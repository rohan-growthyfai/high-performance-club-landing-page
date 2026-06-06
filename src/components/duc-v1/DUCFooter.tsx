import { Shield, MapPin } from "lucide-react";

export default function DUCFooter() {
  return (
    <footer className="border-t border-border-subtle bg-background-elevated/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 gap-10 mb-12">
          <div>
            <p className="font-serif text-lg font-medium text-foreground mb-3">Daily Upgrade Club</p>
            <p className="text-sm text-foreground-muted mb-2">by High Performance Club</p>
            <p className="text-xs text-foreground-subtle leading-relaxed max-w-sm">
              Owned and operated by Growthyfai Technologies Private Limited.
            </p>
          </div>
          <div className="sm:text-right">
            <p className="text-sm uppercase tracking-wider text-foreground-subtle mb-3 font-semibold">Get in touch</p>
            <a href="mailto:contact@highperformanceclub.co" className="text-foreground-muted hover:text-accent transition-colors text-sm block mb-1">
              contact@highperformanceclub.co
            </a>
            <a href="https://www.highperformanceclub.co" className="text-foreground-muted hover:text-accent transition-colors text-sm block">
              www.highperformanceclub.co
            </a>
          </div>
        </div>

        <div className="divider-line mb-8" />

        <div className="grid sm:grid-cols-2 gap-6 mb-10 p-6 bg-white/50 rounded-2xl border border-border-subtle">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-foreground mb-1">Verified Indian Business</p>
              <p className="text-xs text-foreground-subtle">GSTIN: <span className="font-mono">27AAKCG6243L1Z6</span><br />Registered in India</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-foreground mb-1">Registered Office</p>
              <p className="text-xs text-foreground-subtle">Growthyfai Technologies Private Limited<br />Office No. 603, Global Business Hub,<br />Kharadi, Pune, Maharashtra 411014</p>
            </div>
          </div>
        </div>

        <div className="text-sm text-foreground-subtle leading-relaxed mb-7 max-w-3xl">
          <strong className="text-foreground-muted">Disclaimer:</strong> Daily Upgrade Club is designed for general habit-building and lifestyle improvement. It is not medical advice, therapy, diet prescription, or treatment for any medical condition.
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 text-sm text-foreground-subtle">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="/terms-and-conditions" className="hover:text-foreground transition-colors">Terms &amp; Conditions</a>
            <a href="/contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <div className="text-right">
            <p>© 2026 High Performance Club.</p>
            <p className="text-xs mt-1">Owned by Growthyfai Technologies Private Limited.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
