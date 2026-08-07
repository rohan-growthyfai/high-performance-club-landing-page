/**
 * Marriage Intelligence Platform — question bank loader
 * -------------------------------------------------------------
 * 268 research-grounded, India-adapted questions across 14 dimensions,
 * authored + audited + repaired via multi-agent workflows grounded in the
 * verified research foundation. See research/foundation-research.json.
 *
 * The bank is stored as JSON and typed here as Question[].
 */
import bankData from "./research/question-bank-final.json";
import { Question, DimensionKey } from "./types";
import { DIMENSION_ORDER } from "./dimensions";

export const QUESTION_BANK: Question[] = bankData as unknown as Question[];

/** Questions grouped by dimension, in display order. */
export function questionsByDimension(): Array<{ dimension: DimensionKey; questions: Question[] }> {
  const map = new Map<DimensionKey, Question[]>();
  for (const q of QUESTION_BANK) {
    const arr = map.get(q.dimension) || [];
    arr.push(q);
    map.set(q.dimension, arr);
  }
  return DIMENSION_ORDER
    .filter((d) => map.has(d))
    .map((d) => ({ dimension: d, questions: map.get(d)! }));
}

export const TOTAL_QUESTIONS = QUESTION_BANK.length;
