import { NextResponse } from "next/server";
import { submitResponse } from "@/lib/marriage/store";
import { QUESTION_BANK } from "@/lib/marriage/questionBank";

/**
 * Submit one person's answers via their unique token.
 * Marks their slot complete; when both are in, the report unlocks.
 *
 * POST /api/marriage/submit
 *   { token, name, answers: {qid: value}, dob?, birthTime?, birthPlace? }
 * -> { ok, code, slot, bothComplete }
 */
export const runtime = "nodejs";

const VALID_IDS = new Set(QUESTION_BANK.map((q) => q.id));

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = String(body.token || "").trim();
    const name = String(body.name || "").trim();
    const rawAnswers = (body.answers || {}) as Record<string, unknown>;

    if (!token) return NextResponse.json({ ok: false, error: "Missing assessment link." }, { status: 400 });
    if (!name) return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });

    // Keep only known question ids with numeric answers.
    const answers: Record<string, number> = {};
    for (const [id, val] of Object.entries(rawAnswers)) {
      if (VALID_IDS.has(id) && typeof val === "number") answers[id] = val;
    }
    const answeredCount = Object.keys(answers).length;
    if (answeredCount < Math.floor(QUESTION_BANK.length * 0.6)) {
      return NextResponse.json(
        { ok: false, error: `Please answer more questions before submitting (${answeredCount}/${QUESTION_BANK.length}).` },
        { status: 400 }
      );
    }

    const result = await submitResponse({
      token, name, answers,
      dob: body.dob ? String(body.dob) : undefined,
      birthTime: body.birthTime ? String(body.birthTime) : undefined,
      birthPlace: body.birthPlace ? String(body.birthPlace) : undefined,
    });

    if (!("ok" in result) || !result.ok) {
      return NextResponse.json({ ok: false, error: (result as { error: string }).error }, { status: 400 });
    }
    return NextResponse.json({ ok: true, code: result.code, slot: result.slot, bothComplete: result.bothComplete });
  } catch (e) {
    console.error("[marriage/submit]", e);
    return NextResponse.json({ ok: false, error: "Could not save your answers. Please try again." }, { status: 500 });
  }
}
