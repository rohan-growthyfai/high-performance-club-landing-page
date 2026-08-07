import { NextResponse } from "next/server";
import { questionsByDimension } from "@/lib/marriage/questionBank";
import { DIMENSIONS } from "@/lib/marriage/dimensions";

/**
 * Public question bank for the questionnaire UI — WITHOUT scoring keys, so
 * respondents can't reverse-engineer "right" answers. Grouped by dimension
 * for the sectioned, progress-based flow.
 *
 * GET /api/marriage/questions
 */
export const runtime = "nodejs";

export async function GET() {
  const groups = questionsByDimension().map(({ dimension, questions }) => ({
    dimension,
    name: DIMENSIONS[dimension].name,
    blurb: DIMENSIONS[dimension].blurb,
    part: DIMENSIONS[dimension].part,
    questions: questions.map((q) => ({
      id: q.id,
      text: q.text,
      type: q.type,
      // options WITHOUT the internal `value`/`loads` scoring — send display
      // label + the value the client should return (value is needed to score,
      // but it carries no directional hint since order is preserved as authored).
      options: q.options.map((o) => ({ label: o.label, value: o.value })),
    })),
  }));
  const total = groups.reduce((s, g) => s + g.questions.length, 0);
  return NextResponse.json({ ok: true, total, groups });
}
