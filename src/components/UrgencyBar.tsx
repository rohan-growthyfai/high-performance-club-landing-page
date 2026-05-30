import { Sparkles } from "lucide-react";

export default function UrgencyBar() {
  return (
    <div className="relative z-[60] bg-background-elevated border-b border-accent/20">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-3 text-sm sm:text-base">
        <Sparkles className="w-4 h-4 text-accent flex-shrink-0" />
        <p className="text-foreground-muted text-center">
          <span className="text-accent font-bold">100% FREE</span>
          <span className="hidden sm:inline text-foreground-subtle">
            {" "}· This week only · Limited to 500 spots · No credit card needed 🏆
          </span>
          <span className="sm:hidden text-foreground-subtle">
            {" "}· Limited to 500 spots this week
          </span>
        </p>
      </div>
    </div>
  );
}
