/**
 * Marriage Intelligence Platform — report narrator (constrained LLM)
 * -------------------------------------------------------------
 * The deterministic engine (scoring.ts) is the SOURCE OF TRUTH. This module
 * asks an LLM to do ONE job: turn the already-computed scores and alignment
 * levels into warm, human, India-aware prose — narrative per dimension,
 * blind spots, a friction forecast, and personalized discussion topics.
 *
 * The model is explicitly forbidden from inventing facts, numbers, or
 * conclusions not present in the computed input. If the LLM is unavailable,
 * `fallbackNarrative()` produces a plain, still-useful report from the
 * numbers alone — the product never hard-depends on the model.
 *
 * Uses the same OpenAI-SDK-over-Fireworks pattern as the existing duc-chat
 * route (env: FIREWORKS_API_KEY), falling back to OPENAI_API_KEY if present.
 */

import OpenAI from "openai";
import { PairAnalysis, DimensionKey, AlignmentLevel } from "./types";
import { DIMENSIONS, DIMENSION_ORDER } from "./dimensions";

export interface DimensionNarrative {
  dimension: DimensionKey;
  name: string;
  level: AlignmentLevel;
  score: number;
  confidence: "high" | "medium" | "low";
  body: string; // 2–4 sentence "reading about the two of you"
  tip?: string; // one actionable line
}

export interface BlindSpot { title: string; body: string; }
export interface DiscussionTopic { category: string; question: string; prompts: string[]; }

export interface ReportNarrative {
  headline: string;
  summary: string;
  dimensions: DimensionNarrative[];
  strengths: string[];
  blindSpots: BlindSpot[];
  frictionForecast: string;
  discussionTopics: DiscussionTopic[];
  generatedBy: "llm" | "fallback";
}

const LEVEL_LABEL: Record<AlignmentLevel, string> = {
  very_strong: "Very strong alignment",
  strong: "Strong alignment",
  moderate: "Moderate alignment",
  complementary: "Complementary",
  needs_discussion: "Needs discussion",
  potential_conflict: "Potential conflict",
};

/** Compact, model-friendly view of the computed analysis (numbers only). */
function analysisDigest(a: PairAnalysis) {
  const dims = DIMENSION_ORDER.map((d) => {
    const al = a.alignments[d];
    if (!al) return null;
    return {
      key: d,
      name: DIMENSIONS[d].name,
      level: al.level,
      score: al.score,
      confidence: al.confidence,
      traits: al.comparisons.map((c) => ({
        trait: c.trait, a: c.a, b: c.b, kind: c.kind,
      })),
    };
  }).filter(Boolean);
  return {
    personA: a.a.name,
    personB: a.b.name,
    strengths: a.overall.strengths,
    growthAreas: a.overall.growthAreas,
    dealBreakerFlags: a.overall.dealBreakerFlags,
    confidence: a.overall.confidence,
    dimensions: dims,
  };
}

function client(): { c: OpenAI; model: string } | null {
  if (process.env.FIREWORKS_API_KEY) {
    return {
      c: new OpenAI({ apiKey: process.env.FIREWORKS_API_KEY, baseURL: "https://api.fireworks.ai/inference/v1" }),
      model: "accounts/fireworks/models/gpt-oss-120b",
    };
  }
  if (process.env.OPENAI_API_KEY) {
    return { c: new OpenAI({ apiKey: process.env.OPENAI_API_KEY }), model: "gpt-4o-mini" };
  }
  return null;
}

const SYSTEM = `You are the writer for a Marriage Intelligence Report used by Indian families making a life-partner decision. You are given ONLY computed compatibility results (scores 0-100, alignment levels, and per-trait values for two people).

ABSOLUTE RULES:
- Describe ONLY what the numbers say. NEVER invent facts about the people, their history, jobs, families, or events — you know nothing about them beyond these scores.
- Never fabricate a number or a citation. Do not output percentages that aren't in the input.
- Difference is not automatically bad; matched values are good, and some differences are complementary. For gender-roles/religion/tradition, treat CONGRUENCE (both similar) as healthy — never imply progressive is "better".
- Warm, plain, respectful, culturally aware of Indian marriage context (family, parents, community). No jargon, no astrology.
- The report is decision SUPPORT, not a verdict or prediction. It helps them know each other and have the right conversations.
Return STRICT JSON only, matching the requested schema.`;

function buildPrompt(a: PairAnalysis): string {
  const digest = analysisDigest(a);
  return `Here are the computed results for ${digest.personA} (A) and ${digest.personB} (B):

${JSON.stringify(digest, null, 1)}

Trait values are 0-100 for each person. For "trait_level" traits, healthy direction matters (e.g. lower neuroticism/anxiety/avoidance is healthier; higher agreeableness/conscientiousness/extraversion/emotional_regulation/empathy is healthier). For "alignment" traits, closeness between A and B is what matters. "descriptive" traits are for description only.

Write the report as JSON with this exact shape:
{
  "headline": "one plain sentence naming their biggest shared strength AND biggest area to discuss",
  "summary": "2-3 sentences framing this as an honest map, not a score/verdict",
  "dimensions": [ { "dimension": "<key>", "body": "2-4 sentences reading about the two of them on this dimension, referring to them by name", "tip": "one short actionable line (optional)" } ],   // one per dimension present in the input, same order
  "strengths": ["3-5 short phrases naming where they naturally align"],
  "blindSpots": [ { "title": "short", "body": "1-2 sentences on something they'd likely overlook" } ],   // 3-4 items, drawn from growthAreas/dealBreakerFlags/low-confidence areas
  "frictionForecast": "a short paragraph on where and why friction is most likely, and how much it matters",
  "discussionTopics": [ { "category": "e.g. Family", "question": "the conversation to have", "prompts": ["2-4 bullet sub-points"] } ]   // 5-8 items, personalized to their growth areas
}
Refer to them by name (${digest.personA}, ${digest.personB}). Keep each dimension body specific to that dimension's scores.`;
}

export async function generateNarrative(a: PairAnalysis): Promise<ReportNarrative> {
  const cl = client();
  if (!cl) return fallbackNarrative(a);
  try {
    const completion = await cl.c.chat.completions.create({
      model: cl.model,
      temperature: 0.6,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: buildPrompt(a) },
      ],
    });
    const text = completion.choices[0]?.message?.content || "";
    const parsed = JSON.parse(text);
    return normalizeLLM(parsed, a);
  } catch (e) {
    console.error("[marriage narrator] LLM failed, using fallback:", e);
    return fallbackNarrative(a);
  }
}

/** Merge LLM prose with engine truth (engine controls level/score/confidence). */
function normalizeLLM(parsed: Record<string, unknown>, a: PairAnalysis): ReportNarrative {
  const llmDims = new Map<string, { body?: string; tip?: string }>();
  for (const d of (parsed.dimensions as Array<Record<string, unknown>> | undefined) || []) {
    llmDims.set(String(d.dimension), { body: d.body as string, tip: d.tip as string });
  }
  const dimensions: DimensionNarrative[] = DIMENSION_ORDER.filter((d) => a.alignments[d]).map((d) => {
    const al = a.alignments[d];
    const llm = llmDims.get(d);
    return {
      dimension: d,
      name: DIMENSIONS[d].name,
      level: al.level,
      score: al.score,
      confidence: al.confidence,
      body: llm?.body || fallbackDimBody(d, al.level, a),
      tip: llm?.tip,
    };
  });
  return {
    headline: (parsed.headline as string) || a.overall.headline,
    summary: (parsed.summary as string) || defaultSummary,
    dimensions,
    strengths: (parsed.strengths as string[]) || a.overall.strengths.map((s) => DIMENSIONS[s].name),
    blindSpots: (parsed.blindSpots as BlindSpot[]) || fallbackBlindSpots(a),
    frictionForecast: (parsed.frictionForecast as string) || fallbackFriction(a),
    discussionTopics: (parsed.discussionTopics as DiscussionTopic[]) || fallbackTopics(a),
    generatedBy: "llm",
  };
}

// ---------- Fallback (no-LLM) narrative — plain but honest ----------

const defaultSummary =
  "This is an honest map of where the two of you already move together, where you differ, and the specific things worth talking through. Difference isn't a red flag — unexamined difference is.";

function fallbackDimBody(d: DimensionKey, level: AlignmentLevel, a: PairAnalysis): string {
  const name = DIMENSIONS[d].name.toLowerCase();
  const A = a.a.name, B = a.b.name;
  switch (level) {
    case "very_strong":
    case "strong":
      return `${A} and ${B} align well on ${name}. This is a natural strength you can build on.`;
    case "moderate":
      return `${A} and ${B} are broadly compatible on ${name}, with some differences worth a light conversation.`;
    case "complementary":
      return `${A} and ${B} differ on ${name} in ways that can complement each other if understood — different, not opposed.`;
    case "needs_discussion":
      return `${A} and ${B} differ meaningfully on ${name}. This is worth an honest conversation before deciding.`;
    case "potential_conflict":
      return `${A} and ${B} are far apart on ${name}. This is one of the most important areas for the two of you to discuss directly.`;
  }
}

function fallbackBlindSpots(a: PairAnalysis): BlindSpot[] {
  const areas: DimensionKey[] = [...a.overall.growthAreas, ...a.overall.dealBreakerFlags];
  const uniq = Array.from(new Set(areas)).slice(0, 4);
  return uniq.map((d) => ({
    title: `${DIMENSIONS[d].name} is worth a real conversation`,
    body: `Your answers on ${DIMENSIONS[d].name.toLowerCase()} differ enough that it's easy to assume you agree when you may not. Compare notes directly.`,
  }));
}

function fallbackFriction(a: PairAnalysis): string {
  const g = a.overall.growthAreas.map((d) => DIMENSIONS[d].name.toLowerCase());
  if (!g.length) return "No major friction areas stood out. Keep talking openly as life changes.";
  return `The areas most likely to need attention are ${g.slice(0, 3).join(", ")}. These aren't dealbreakers on their own — they're where honest conversation before marriage prevents misunderstanding after it.`;
}

function fallbackTopics(a: PairAnalysis): DiscussionTopic[] {
  const map: Partial<Record<DimensionKey, DiscussionTopic>> = {
    family: { category: "Family", question: "How involved should our parents be in day-to-day decisions?", prompts: ["Who lives with us, and when?", "Financial support for both sets of parents", "Handling disagreements with in-laws"] },
    money: { category: "Money", question: "How do we want to run our finances together?", prompts: ["Joint, separate, or a mix?", "Saving vs. spending now", "Who decides on big purchases?"] },
    children: { category: "Children", question: "What do we each expect about children?", prompts: ["Whether and when", "How many", "Parenting and schooling approach"] },
    conflict: { category: "Conflict", question: "How do we want to handle disagreements?", prompts: ["Is a pause allowed, and how long?", "Do we resolve before bed?", "What's off-limits when angry?"] },
    career: { category: "Career", question: "What happens if a big opportunity means relocating?", prompts: ["Would either of us move abroad?", "Whose career leads, and when?"] },
    religion: { category: "Religion", question: "How will we handle faith and traditions?", prompts: ["Festivals and rituals", "Raising children's faith", "Community expectations"] },
    roles: { category: "Household", question: "How will we divide home and earning?", prompts: ["Chores and cooking", "Both working?", "Decision authority"] },
  };
  const picks = [...a.overall.growthAreas, ...a.overall.dealBreakerFlags, "family", "money", "conflict"] as DimensionKey[];
  const seen = new Set<string>();
  const out: DiscussionTopic[] = [];
  for (const d of picks) {
    const t = map[d];
    if (t && !seen.has(t.category)) { seen.add(t.category); out.push(t); }
    if (out.length >= 6) break;
  }
  return out;
}

export function fallbackNarrative(a: PairAnalysis): ReportNarrative {
  const dimensions: DimensionNarrative[] = DIMENSION_ORDER.filter((d) => a.alignments[d]).map((d) => {
    const al = a.alignments[d];
    return {
      dimension: d, name: DIMENSIONS[d].name, level: al.level, score: al.score,
      confidence: al.confidence, body: fallbackDimBody(d, al.level, a),
    };
  });
  return {
    headline: a.overall.headline,
    summary: defaultSummary,
    dimensions,
    strengths: a.overall.strengths.map((s) => DIMENSIONS[s].name),
    blindSpots: fallbackBlindSpots(a),
    frictionForecast: fallbackFriction(a),
    discussionTopics: fallbackTopics(a),
    generatedBy: "fallback",
  };
}

export { LEVEL_LABEL };
