import { NextResponse } from "next/server";
import { QUESTION_BANK } from "@/lib/marriage/questionBank";
import { orderQuestions, phaseFor } from "@/lib/marriage/sequence";
import { DIMENSIONS } from "@/lib/marriage/dimensions";

/**
 * Public question bank for the questionnaire UI — WITHOUT scoring keys, and in
 * the research-grounded presentation ORDER: gentle self-descriptive items
 * first, dimensions interleaved (BFI-2 style), scenarios & sensitive items
 * ramped in gradually, with a gentle close. Each item carries a friendly
 * "phase" label for the UI.
 *
 * GET /api/marriage/questions
 */
export const runtime = "nodejs";

export async function GET() {
  const ordered = orderQuestions(QUESTION_BANK);
  const total = ordered.length;
  const questions = ordered.map((q, i) => ({
    id: q.id,
    text: q.text,
    type: q.type,
    dimension: q.dimension,
    sectionName: DIMENSIONS[q.dimension].name,
    part: DIMENSIONS[q.dimension].part,
    phase: phaseFor(i / total),
    options: q.options.map((o) => ({ label: o.label, value: o.value })),
  }));
  return NextResponse.json({ ok: true, total, questions });
}
