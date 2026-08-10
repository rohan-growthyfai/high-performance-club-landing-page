/**
 * Marriage Intelligence Platform — question sequencing
 * -------------------------------------------------------------
 * Produces the fixed order in which the 200 items are presented. Grounded in
 * the verified test-construction research (see
 * research/test-construction-research.json):
 *
 *  - OPEN SIMPLE, RAMP GRADUALLY. Start with easy, low-stakes self-descriptive
 *    items to build rapport/momentum; introduce richer choices and finally the
 *    heavier scenario-based & emotionally-sensitive questions only once the
 *    respondent is warmed up. (Satisficing/priming logic; "open with simple
 *    self-report, keep sensitive/scenario content later.")
 *  - INTERLEAVE DIMENSIONS, don't block by trait. The gold-standard BFI-2
 *    rotates through its domains rather than grouping them; interleaving cuts
 *    monotony, straight-lining and fatigue. So within each intensity band we
 *    round-robin across dimensions.
 *  - DON'T END ON THE HEAVIEST. Later items suffer the most fatigue/satisficing,
 *    so we close with a few gentler, reflective items rather than the most
 *    intense scenario.
 *  - FIXED, DETERMINISTIC ORDER. Both partners must get the same sequence for
 *    their answers to be comparable, so the order is stable (no per-user
 *    randomization).
 *
 * The transition is smooth (fine-grained intensity tiers) so scenarios phase
 * in gradually rather than appearing suddenly.
 */

import { Question, DimensionKey } from "./types";
import { DIMENSION_ORDER } from "./dimensions";

// Format weight: how cognitively/emotionally demanding the *format* is.
// A plain self-descriptive portrait is the gentlest; a full situation the heaviest.
const FORMAT_WEIGHT: Record<string, number> = {
  portrait: 0, // "Which describes you?" — gentlest
  choice: 1, // pick your position
  scenario: 2, // a full situation to react to — heaviest
  likert5: 0, // (legacy) treat as gentle
};

// Baseline emotional sensitivity of each dimension (0 = light/neutral,
// 3 = emotionally intimate / values-laden / exposing).
const DIMENSION_SENSITIVITY: Record<DimensionKey, number> = {
  lifestyle: 0,
  big5: 1,
  communication: 1,
  career: 1,
  lifevision: 1,
  values: 1,
  conflict: 2,
  children: 2,
  religion: 2,
  roles: 2,
  money: 2,
  family: 2,
  character: 3, // integrity / temptation — exposing
  attachment: 3, // fears of abandonment / closeness — intimate
  intimacy: 3, // affection, jealousy, vulnerability — most intimate
};

// Trait-level bumps: some constructs are heavier than their dimension average.
function traitSensitivityBump(trait: string): number {
  const t = trait.toLowerCase();
  if (/vulnerab|anxiety|avoidance|depress|despond/.test(t)) return 1;
  if (/jealous|affection|emotional_openness|intimacy/.test(t)) return 1;
  if (/money_status|money_worship|integrity|temptation/.test(t)) return 1;
  if (/inlaw_boundaries|parent_financial/.test(t)) return 1;
  return 0;
}

/** Continuous "ramp score": low = gentle opener, high = heavy/late. */
function rampScore(q: Question): number {
  const fmt = FORMAT_WEIGHT[q.type] ?? 1;
  const sens = (DIMENSION_SENSITIVITY[q.dimension] ?? 1) + traitSensitivityBump(q.scoring.trait);
  // Format matters a lot for the "gradually add scenarios" feel; sensitivity
  // shapes the emotional ramp. Weight them comparably.
  return fmt * 1.5 + sens;
}

/**
 * Order the bank with a GLOBAL greedy interleave that ramps and rotates at
 * once: keep one sorted queue per dimension (by ramp score, gentlest first);
 * at each step emit the lowest-ramp item among the dimensions NOT used in the
 * last few picks. This yields a smooth gentle→heavy gradient (BFI-2-style
 * interleaving) with no long single-dimension runs. Deterministic.
 */
const AVOID_RECENT = 3; // don't repeat a dimension seen in the last N picks

export function orderQuestions(bank: Question[]): Question[] {
  const dimRank = new Map<DimensionKey, number>(DIMENSION_ORDER.map((d, i) => [d, i]));
  // Per-dimension queues, sorted by ramp then id (stable/deterministic).
  const queues = new Map<DimensionKey, Question[]>();
  for (const q of bank) {
    const arr = queues.get(q.dimension) || [];
    arr.push(q);
    queues.set(q.dimension, arr);
  }
  for (const arr of queues.values()) {
    arr.sort((a, b) => rampScore(a) - rampScore(b) || a.id.localeCompare(b.id));
  }

  const ordered: Question[] = [];
  const recent: DimensionKey[] = [];
  let total = bank.length;

  while (total > 0) {
    // Candidate = each non-empty dimension's current head.
    const candidates = Array.from(queues.entries())
      .filter(([, arr]) => arr.length > 0)
      .map(([d, arr]) => ({ dim: d, q: arr[0], ramp: rampScore(arr[0]) }));

    // Prefer dimensions not used recently; fall back to all if forced.
    let pool = candidates.filter((c) => !recent.includes(c.dim));
    if (pool.length === 0) pool = candidates;

    // Among the allowed pool, take the gentlest (lowest ramp); ties broken by
    // canonical dimension order for determinism.
    pool.sort((a, b) => a.ramp - b.ramp || (dimRank.get(a.dim)! - dimRank.get(b.dim)!));
    const pick = pool[0];

    ordered.push(pick.q);
    queues.get(pick.dim)!.shift();
    total--;
    recent.push(pick.dim);
    if (recent.length > AVOID_RECENT) recent.shift();
  }

  // Gentle close: relocate a few of the lightest reflective (non-scenario)
  // items to the very end so the test doesn't finish on its heaviest, most
  // fatiguing questions (later items suffer the most satisficing).
  const CLOSERS = 3;
  const cutoff = Math.floor(ordered.length * 0.75);
  const candidates = ordered
    .map((q, idx) => ({ q, idx, s: rampScore(q) }))
    .filter((x) => x.idx < cutoff && x.q.type !== "scenario")
    .sort((a, b) => a.s - b.s)
    .slice(0, CLOSERS);
  const closerIdx = new Set(candidates.map((c) => c.idx));
  const body = ordered.filter((_, idx) => !closerIdx.has(idx));
  const gentleClosers = candidates.map((c) => c.q);
  return [...body, ...gentleClosers];
}

/** A friendly phase label for the respondent, based on position (0..1). */
export function phaseFor(fraction: number): string {
  if (fraction < 0.12) return "Warming up";
  if (fraction < 0.42) return "Getting to know you";
  if (fraction < 0.75) return "Going a little deeper";
  return "The things that matter most";
}
