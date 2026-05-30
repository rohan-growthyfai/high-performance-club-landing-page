export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between gap-6">

        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-accent-dim flex items-center justify-center">
            <span className="text-white font-sans font-bold text-base">H</span>
          </div>
          <span className="font-display text-base font-bold tracking-tight text-foreground hidden sm:block">
            High Performance Club
          </span>
        </a>

        {/* Nav links — hidden on mobile, visible md+ */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink href="#how-it-works-journey">How it works</NavLink>
          <NavLink href="#what-you-get">What you get</NavLink>
          <NavLink href="#testimonials">Testimonials</NavLink>
        </nav>

        {/* CTA */}
        <a
          href="#signup"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-accent hover:bg-accent-dim transition-colors px-4 py-2 rounded-full whitespace-nowrap"
        >
          Join free
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="px-3 py-1.5 text-sm font-medium text-foreground-muted hover:text-foreground hover:bg-background-elevated rounded-lg transition-all"
    >
      {children}
    </a>
  );
}
