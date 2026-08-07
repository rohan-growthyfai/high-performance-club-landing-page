/**
 * Marriage Intelligence Platform — psychometric scoring engine
 * -------------------------------------------------------------
 * Converts raw answers into per-person trait profiles and a two-person
 * alignment analysis, following the VERIFIED research rules:
 *
 *  - Personality / attachment / horsemen  -> kind="trait_level":
 *      score the individual's DESIRABLE level (research: low neuroticism,
 *      high agreeableness/conscientiousness/extraversion, secure attachment
 *      predict a partner's satisfaction). NOT item-by-item similarity.
 *
 *  - Values / attitudes / expectations    -> kind="alignment":
 *      partner CONGRUENCE matters (similarity predicts satisfaction more for
 *      values than for personality). Scored on A-vs-B distance, so two
 *      matched-traditional partners score as aligned (no progressive bias).
 *
 *  - Love languages / conflict styles     -> kind="descriptive":
 *      reported, never folded into a compatibility score (matching efficacy
 *      is unproven; TKI modes are styles, not good/bad levels).
 *
 * All scoring is deterministic. The LLM narrator later only describes these
 * numbers — it never computes or invents them.
 */

import {
  Question, AnswerMap, DimensionKey, ScoringKind,
  PersonProfile, DimensionScore, TraitScore,
  PairAnalysis, DimensionAlignment, AlignmentLevel,
} from "./types";
import { DIMENSION_ORDER } from "./dimensions";

// Which traits are "desirable when high/low" for trait_level scoring.
// value = direction: +1 means higher normalized is healthier, -1 means lower is healthier.
const TRAIT_DIRECTION: Record<string, 1 | -1> = {
  // Big Five (openness intentionally omitted → treated neutral/descriptive)
  neuroticism: -1,
  extraversion: 1,
  conscientiousness: 1,
  agreeableness: 1,
  // attachment: security = low anxiety + low avoidance
  anxiety: -1,
  avoidance: -1,
  // communication / EQ
  emotional_regulation: 1,
  empathy: 1,
  // Gottman negative markers
  four_horsemen: -1,
};

const LIKERT_MIN = 1;
const LIKERT_MAX = 5;

/** Normalize a raw mean on the item scale (1..5) to 0..100, honoring reverse. */
function normalize(raw: number, reverse: boolean): number {
  const span = LIKERT_MAX - LIKERT_MIN;
  let pct = ((raw - LIKERT_MIN) / span) * 100;
  if (reverse) pct = 100 - pct;
  return Math.max(0, Math.min(100, Math.round(pct)));
}

interface TraitAccumulator {
  sum: number;
  count: number;
  reverse: boolean;
  kind: ScoringKind;
  dimension: DimensionKey;
  weight: number;
}

/** Build a single person's profile from their answers + the question bank. */
export function scorePerson(name: string, answers: AnswerMap, bank: Question[]): PersonProfile {
  const byTrait = new Map<string, TraitAccumulator>();
  const dimAnswered = new Map<DimensionKey, { answered: number; total: number }>();

  for (const q of bank) {
    const d = dimAnswered.get(q.dimension) || { answered: 0, total: 0 };
    d.total += 1;
    const val = answers[q.id];
    if (val !== undefined && val !== null) {
      d.answered += 1;
      const acc = byTrait.get(q.scoring.trait) || {
        sum: 0, count: 0, reverse: q.scoring.reverse, kind: q.scoring.kind,
        dimension: q.dimension, weight: q.scoring.weight ?? 1,
      };
      // Each item's raw contribution is its chosen value on 1..5.
      // Reverse-keying is applied per-item at normalize time, but since a
      // trait can mix keyed directions, we fold reverse into the value here.
      const contributed = q.scoring.reverse ? (LIKERT_MIN + LIKERT_MAX - val) : val;
      acc.sum += contributed;
      acc.count += 1;
      // trait-level reverse now already folded in → store as non-reverse
      acc.reverse = false;
      byTrait.set(q.scoring.trait, acc);
    }
    dimAnswered.set(q.dimension, d);
  }

  const traits: Record<string, number> = {};
  const traitScoresByDim = new Map<DimensionKey, Record<string, TraitScore>>();

  for (const [trait, acc] of byTrait) {
    if (acc.count === 0) continue;
    const raw = acc.sum / acc.count;
    const normalized = normalize(raw, false); // reverse already folded
    traits[trait] = normalized;
    const map = traitScoresByDim.get(acc.dimension) || {};
    map[trait] = { trait, raw: Number(raw.toFixed(2)), normalized, itemCount: acc.count };
    traitScoresByDim.set(acc.dimension, map);
  }

  const dimensions = {} as Record<DimensionKey, DimensionScore>;
  for (const dim of DIMENSION_ORDER) {
    const tmap = traitScoresByDim.get(dim) || {};
    const counts = dimAnswered.get(dim) || { answered: 0, total: 0 };
    // dimension summary: for trait_level dims, average the health-adjusted
    // normalized scores; otherwise just the mean normalized (used for display).
    const traitVals = Object.values(tmap);
    let summary = 0;
    if (traitVals.length) {
      const adj = traitVals.map((t) => {
        const dir = TRAIT_DIRECTION[t.trait];
        // health-adjust so "higher summary = healthier" for trait_level dims
        return dir === -1 ? 100 - t.normalized : t.normalized;
      });
      summary = Math.round(adj.reduce((s, v) => s + v, 0) / adj.length);
    }
    dimensions[dim] = { dimension: dim, traits: tmap, summary, answered: counts.answered, total: counts.total };
  }

  return { name, dimensions, traits };
}

// ---- Pair alignment ----

function levelFromScore(score: number, kind: ScoringKind): AlignmentLevel {
  if (kind === "trait_level") {
    // both partners healthy → strong; here score is the pair health (0..100)
    if (score >= 80) return "very_strong";
    if (score >= 65) return "strong";
    if (score >= 50) return "moderate";
    if (score >= 35) return "needs_discussion";
    return "potential_conflict";
  }
  // alignment: score is congruence (0..100)
  if (score >= 85) return "very_strong";
  if (score >= 70) return "strong";
  if (score >= 55) return "moderate";
  if (score >= 40) return "complementary";
  if (score >= 25) return "needs_discussion";
  return "potential_conflict";
}

/**
 * Compute the two-person analysis.
 * For each dimension we gather its traits and compute a dimension health/
 * congruence score depending on the dominant scoring kind.
 */
export function analyzePair(a: PersonProfile, b: PersonProfile, bank: Question[]): PairAnalysis {
  // map trait -> its scoring kind (from the bank)
  const traitKind = new Map<string, ScoringKind>();
  const traitDim = new Map<string, DimensionKey>();
  for (const q of bank) {
    traitKind.set(q.scoring.trait, q.scoring.kind);
    traitDim.set(q.scoring.trait, q.dimension);
  }

  const alignments = {} as Record<DimensionKey, DimensionAlignment>;

  for (const dim of DIMENSION_ORDER) {
    const aDim = a.dimensions[dim];
    const bDim = b.dimensions[dim];
    const traits = new Set<string>([
      ...Object.keys(aDim?.traits || {}),
      ...Object.keys(bDim?.traits || {}),
    ]);

    const comparisons: DimensionAlignment["comparisons"] = [];
    const healthParts: number[] = [];
    const congruenceParts: number[] = [];
    let scoredKind: ScoringKind = "alignment";

    for (const trait of traits) {
      const kind = traitKind.get(trait) || "alignment";
      const av = a.traits[trait];
      const bv = b.traits[trait];
      if (av === undefined || bv === undefined) continue;

      comparisons.push({ trait, a: av, b: bv, kind });

      if (kind === "descriptive") continue; // reported only

      if (kind === "trait_level") {
        scoredKind = "trait_level";
        const dir = TRAIT_DIRECTION[trait] ?? 1;
        const aHealth = dir === -1 ? 100 - av : av;
        const bHealth = dir === -1 ? 100 - bv : bv;
        // pair health = mean of both partners' health on this desirable trait
        healthParts.push((aHealth + bHealth) / 2);
      } else {
        // alignment: congruence = 100 - normalized distance
        congruenceParts.push(100 - Math.abs(av - bv));
      }
    }

    // Decide the dimension's headline score by its dominant kind.
    let score = 50;
    if (healthParts.length && healthParts.length >= congruenceParts.length) {
      scoredKind = "trait_level";
      score = Math.round(healthParts.reduce((s, v) => s + v, 0) / healthParts.length);
    } else if (congruenceParts.length) {
      scoredKind = "alignment";
      score = Math.round(congruenceParts.reduce((s, v) => s + v, 0) / congruenceParts.length);
    }

    const answered = Math.min(aDim?.answered ?? 0, bDim?.answered ?? 0);
    const total = aDim?.total ?? 0;
    const coverage = total ? answered / total : 0;
    const confidence: "high" | "medium" | "low" =
      coverage >= 0.8 ? "high" : coverage >= 0.5 ? "medium" : "low";

    alignments[dim] = {
      dimension: dim,
      level: levelFromScore(score, scoredKind),
      score,
      confidence,
      comparisons,
    };
  }

  // Overall roll-up
  const scored = DIMENSION_ORDER.map((d) => alignments[d]).filter(Boolean);
  const strengths = scored
    .filter((x) => x.level === "very_strong" || x.level === "strong")
    .map((x) => x.dimension);
  const growthAreas = scored
    .filter((x) => x.level === "needs_discussion" || x.level === "potential_conflict")
    .map((x) => x.dimension);

  // Deal-breaker flags: hard conflicts on load-bearing life dimensions.
  const HARD_DIMS: DimensionKey[] = ["children", "religion", "family", "money", "roles"];
  const dealBreakerFlags: DimensionKey[] = [];
  for (const dim of HARD_DIMS) {
    const al = alignments[dim];
    if (al && al.level === "potential_conflict") {
      dealBreakerFlags.push(dim);
    }
  }

  const avgConf = scored.filter((x) => x.confidence === "high").length / (scored.length || 1);
  const confidence: "high" | "medium" | "low" = avgConf >= 0.7 ? "high" : avgConf >= 0.4 ? "medium" : "low";

  return {
    a, b, alignments,
    overall: {
      headline: buildHeadline(strengths, growthAreas),
      strengths, growthAreas, dealBreakerFlags, confidence,
    },
  };
}

function buildHeadline(strengths: DimensionKey[], growth: DimensionKey[]): string {
  // A neutral factual headline; the LLM narrator produces the polished version.
  const s = strengths.length;
  const g = growth.length;
  if (s >= 6 && g <= 2) return "You share a strong foundation across most areas, with a few worth discussing.";
  if (g >= 6) return "You differ in several important areas — this map shows exactly where to focus your conversations.";
  return "You align well in some areas and differ in others; the details below show where each stands.";
}
