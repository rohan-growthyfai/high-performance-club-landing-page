/**
 * Marriage Intelligence Platform — core types
 * -------------------------------------------------------------
 * Shared shapes for the question bank, scoring engine, pairing,
 * and report. Grounded in the verified research foundation
 * (see src/lib/marriage/research/foundation-research.json).
 */

// ---- Dimensions (the 15 areas the assessment maps) ----
export type DimensionKey =
  | "big5"
  | "attachment"
  | "conflict"
  | "communication"
  | "values"
  | "money"
  | "family"
  | "children"
  | "career"
  | "lifestyle"
  | "religion"
  | "roles"
  | "intimacy"
  | "lifevision";

export interface DimensionMeta {
  key: DimensionKey;
  name: string;
  part: "portrait" | "life" | "pair"; // report grouping
  blurb: string;
}

// ---- How a question is scored ----
export type ScoringKind =
  | "trait_level" // score the individual's desirable level (e.g. personality, security)
  | "alignment" // similarity/difference between A and B matters (values, attitudes)
  | "descriptive"; // report only, never used for a compatibility score (e.g. love languages)

export type QuestionType = "likert5" | "scenario" | "choice" | "portrait";

export interface QuestionOption {
  label: string;
  value: number; // numeric contribution to the subDimension score
  loads?: string; // optional alternate trait/mode this option loads on
}

export interface Scoring {
  trait: string; // construct key: neuroticism, anxiety, avoidance, conformity, ...
  reverse: boolean; // higher agreement => lower trait
  kind: ScoringKind;
  weight?: number; // 1..3 relative importance within its dimension
}

export interface Question {
  id: string;
  dimension: DimensionKey;
  subDimension: string;
  text: string;
  type: QuestionType;
  options: QuestionOption[];
  scoring: Scoring;
}

// ---- A person's raw answers ----
// map of questionId -> chosen numeric value (already the option.value)
export type AnswerMap = Record<string, number>;

export interface PersonAnswers {
  name: string;
  dob?: string; // optional, for the astrology add-on
  birthTime?: string;
  birthPlace?: string;
  answers: AnswerMap;
}

// ---- Scored output for one person ----
export interface TraitScore {
  trait: string;
  raw: number; // mean of contributing items, on the item scale
  normalized: number; // 0..100
  itemCount: number;
}

export interface DimensionScore {
  dimension: DimensionKey;
  traits: Record<string, TraitScore>;
  // a headline 0..100 for the dimension (meaning depends on kind)
  summary: number;
  answered: number;
  total: number;
}

export interface PersonProfile {
  name: string;
  dimensions: Record<DimensionKey, DimensionScore>;
  // convenience: flat trait -> normalized 0..100
  traits: Record<string, number>;
}

// ---- Pair alignment ----
export type AlignmentLevel =
  | "very_strong"
  | "strong"
  | "moderate"
  | "complementary"
  | "needs_discussion"
  | "potential_conflict";

export interface DimensionAlignment {
  dimension: DimensionKey;
  level: AlignmentLevel;
  score: number; // 0..100 alignment/health for this dimension
  confidence: "high" | "medium" | "low"; // based on items answered
  // the per-trait comparison used in twin bars
  comparisons: Array<{
    trait: string;
    a: number; // 0..100
    b: number; // 0..100
    kind: ScoringKind;
    note?: string;
  }>;
}

export interface PairAnalysis {
  a: PersonProfile;
  b: PersonProfile;
  alignments: Record<DimensionKey, DimensionAlignment>;
  overall: {
    headline: string; // plain-language, not a single % as hero
    strengths: DimensionKey[];
    growthAreas: DimensionKey[];
    dealBreakerFlags: DimensionKey[];
    confidence: "high" | "medium" | "low";
  };
}
