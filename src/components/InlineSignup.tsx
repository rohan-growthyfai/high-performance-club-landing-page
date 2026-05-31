import SignupForm from "./SignupForm";

/**
 * InlineSignup — compact form placement used at multiple points on the page.
 * No full "Final Step" header — just a short heading + the form itself.
 */
export default function InlineSignup({ id }: { id?: string }) {
  return (
    <section id={id} className="py-16 lg:py-20 relative bg-section-white border-y border-border-subtle">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">
            Join for free
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3 leading-tight">
            Start your 7-day High Performance
            <br />
            Lifestyle journey.
            <br />
            <span className="gradient-text">First message in 2 minutes.</span>
          </h2>
          <p className="text-base text-foreground-muted">
            No app. No login. Just 30 seconds to join.
          </p>
        </div>
        <SignupForm formId="inline" />
      </div>
    </section>
  );
}
