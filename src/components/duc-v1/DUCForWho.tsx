const forYou = [
  "You want to build better habits but struggle with consistency",
  "You prefer simple WhatsApp reminders over complicated apps",
  "You want to improve Energy, Health, Focus, Calmness, and Discipline",
  "You like small daily actions instead of big routines",
  "You want accountability without pressure",
  "You want a structured monthly habit system",
];

const notForYou = [
  "You want overnight transformation",
  "You don't want WhatsApp messages",
  "You want 1-on-1 personal coaching for ₹99/month",
  "You want a strict gym or diet plan",
  "You don't want to do even one tiny healthy habit daily",
  "You are looking for long video courses",
];

export default function DUCForWho() {
  return (
    <section className="py-20 lg:py-28 relative bg-section-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-bold mb-3">Is this for you?</p>
          <h2 className="font-display text-section-title text-foreground text-balance">
            Who Is Daily Upgrade Club For?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {/* For you */}
          <div className="bg-green-50 border border-green-100 rounded-2xl p-7">
            <p className="font-bold text-foreground text-lg mb-6">This Is Perfect for You If…</p>
            <ul className="space-y-3">
              {forYou.map(i => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="text-green-500 font-bold text-lg flex-shrink-0 mt-0.5">✅</span>
                  {i}
                </li>
              ))}
            </ul>
          </div>

          {/* Not for you */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-7">
            <p className="font-bold text-foreground text-lg mb-6">This Is Not for You If…</p>
            <ul className="space-y-3">
              {notForYou.map(i => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="text-red-400 font-bold text-lg flex-shrink-0 mt-0.5">❌</span>
                  {i}
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-gray-200">
              <p className="text-sm text-foreground-muted italic">This is simple, but it still needs participation.</p>
              <p className="text-sm text-foreground-muted italic mt-2">We send the habit. You do the habit. That&apos;s where the momentum begins.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
