/**
 * SoundsLikeYou — "Does this sound like you?" pain-point section.
 *
 * Lists the most common frustrations people have with past attempts at
 * routines/challenges. If they nod at even two, they're exactly who this was
 * built for. Adapted to the 7-Day WhatsApp Habits Challenge context.
 * Placed right after the live-numbers (LiveStatsBar) section.
 */

const pains = [
  "You start a new routine full of motivation… then quietly drop it within a week.",
  "You've made real changes before — but never managed to make them stick for long.",
  "You try to fix everything at once (diet, gym, sleep) and end up overwhelmed and burnt out.",
  "You have no simple way to track your progress, so you never actually see if it's working.",
  "You have no one to keep you accountable — so the moment life gets busy, the habit disappears.",
];

export default function SoundsLikeYou() {
  return (
    <section className="py-16 lg:py-24 bg-section-cream">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="font-display text-section-title text-balance text-foreground mb-4">
            Does this sound like you?
          </h2>
          <p className="text-base sm:text-lg text-foreground-muted max-w-xl mx-auto">
            If you nodded at even two of these, you&apos;re exactly who this challenge was built for:
          </p>
        </div>

        {/* Pain cards */}
        <div className="flex flex-col gap-4">
          {pains.map((p, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-white border border-border-subtle rounded-2xl px-5 py-4 sm:px-7 sm:py-5 shadow-sm"
            >
              <span className="text-2xl shrink-0 leading-none mt-0.5" aria-hidden="true">😮‍💨</span>
              <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
                {p}
              </p>
            </div>
          ))}
        </div>

        {/* Reframe */}
        <p className="text-center mt-10 lg:mt-12 text-lg sm:text-xl font-bold text-foreground text-balance max-w-2xl mx-auto leading-relaxed">
          None of this means you lack discipline. It means no one ever gave you a{" "}
          <span className="gradient-text">simple system</span> that fits real life. That changes today.
        </p>

      </div>
    </section>
  );
}
