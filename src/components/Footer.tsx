/**
 * Footer with Indian trust signals — Warikoo + Coutinho pattern.
 * GSTIN, Razorpay, "Made in India" build trust even on free offers.
 *
 * REPLACE these placeholders with real values:
 * - GSTIN: real number from your registration
 * - Address: real business address
 * - Phone: real Indian phone number
 */

import { Shield, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-background-elevated/40 mt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        {/* Top — brand + contact */}
        <div className="grid sm:grid-cols-2 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                <img src="/hpc-logo.png" alt="High Performance Club" className="w-full h-full object-cover" />
              </div>
              <span className="font-serif text-lg font-medium tracking-tight text-foreground">
                High Performance Club
              </span>
              <span className="text-xs px-2 py-1 bg-accent/10 border border-accent/30 rounded-full text-accent font-bold uppercase tracking-wider">
                🇮🇳 Made in India
              </span>
            </div>
            <p className="text-base text-foreground-muted leading-relaxed max-w-sm mb-4">
              One tiny healthy habit each day. You can see your progress every week.
              Built in India, for Indians.
            </p>
            <p className="text-xs text-foreground-subtle mb-3">
              High Performance Club is owned and operated by GROWTHYFAI TECHNOLOGIES PRIVATE LIMITED.
            </p>
            <p className="font-serif italic text-base text-accent">
              Aadat banao. Zindagi badlo.
            </p>
          </div>
          <div className="sm:text-right">
            <p className="text-sm uppercase tracking-wider text-foreground-subtle mb-3 font-semibold">
              Get in touch
            </p>
            <a
              href="mailto:contact@highperformanceclub.co"
              className="text-foreground-muted hover:text-accent transition-colors text-base block mb-1"
            >
              Email: contact@highperformanceclub.co
            </a>
            <a
              href="https://www.highperformanceclub.co"
              className="text-foreground-muted hover:text-accent transition-colors text-base block mb-3"
            >
              Website: www.highperformanceclub.co
            </a>
            <a
              href="https://wa.me/918459429045"
              className="text-foreground-muted hover:text-accent transition-colors text-base block mb-3"
            >
              WhatsApp Support: +91 84594 29045
            </a>
            <p className="text-sm text-foreground-subtle flex items-center gap-2 sm:justify-end">
              <Phone className="w-4 h-4" />
              <span>Support: Mon-Sat, 10 AM – 6 PM IST</span>
            </p>
          </div>
        </div>

        <div className="divider-line mb-8" />

        {/* Indian trust block */}
        <div className="grid sm:grid-cols-3 gap-6 mb-10 p-6 bg-white/50 rounded-2xl border border-border-subtle">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-foreground mb-1">Verified Indian Business</p>
              <p className="text-xs text-foreground-subtle leading-relaxed">
                GSTIN: <span className="font-mono">27AAKCG6243L1Z6</span>
                <br />
                Registered in India
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-foreground mb-1">Registered Office</p>
              <p className="text-xs text-foreground-subtle leading-relaxed">
                GROWTHYFAI TECHNOLOGIES PRIVATE LIMITED
                <br />
                6th Floor, Office No 603, Global Business Hub,
                <br />
                Survey No 1/1A &amp; 1/2/A, Opposite EON IT Park,
                <br />
                Kharadi, Pune, Maharashtra 411014
                <br />
                India
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5 flex items-center gap-1.5">
              <span className="text-xs px-1.5 py-0.5 bg-blue-50 border border-blue-200 text-blue-700 rounded text-[10px] font-bold">
                UPI
              </span>
              <span className="text-xs px-1.5 py-0.5 bg-blue-50 border border-blue-200 text-blue-700 rounded text-[10px] font-bold">
                Razorpay
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-foreground mb-1">Secure Payments</p>
              <p className="text-xs text-foreground-subtle leading-relaxed">
                When you upgrade to paid programs, secure checkout via Razorpay & UPI
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-sm text-foreground-subtle leading-relaxed mb-7 max-w-3xl">
          <strong className="text-foreground-muted">Disclaimer:</strong> This
          challenge is designed for general lifestyle education, habit-building,
          and accountability. It is not medical advice, therapy, diet
          prescription, or treatment for any medical condition. If you have a
          medical condition, please consult a qualified healthcare professional
          before changing your lifestyle.
        </div>

        {/* Bottom row — links */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 text-sm text-foreground-subtle">
          <div className="flex flex-wrap gap-x-7 gap-y-2">
            <a href="/privacy-policy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-and-conditions" className="hover:text-foreground transition-colors">
              Terms &amp; Conditions
            </a>
            <a href="/about" className="hover:text-foreground transition-colors">
              About Us
            </a>
            <a href="/contact" className="hover:text-foreground transition-colors">
              Contact Us
            </a>
          </div>
          <div className="text-right">
            <p>© 2026 High Performance Club.</p>
            <p className="text-xs mt-1">Owned and operated by GROWTHYFAI TECHNOLOGIES PRIVATE LIMITED.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
