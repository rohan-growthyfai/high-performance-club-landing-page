import { NextResponse } from "next/server";
import { getMatch, getResponses } from "@/lib/marriage/store";
import { QUESTION_BANK } from "@/lib/marriage/questionBank";
import { scorePerson, analyzePair } from "@/lib/marriage/scoring";
import { generateNarrative } from "@/lib/marriage/narrator";
import { generateMatchReport } from "@/lib/kundali/report";

/**
 * Generate the full Marriage Intelligence Report for a completed match.
 * Pipeline: answers -> deterministic scoring -> pair analysis ->
 * constrained LLM narrative. Optional astrology section is attached only
 * when both people supplied a date of birth (reuses the kundali engine),
 * and is kept structurally separate from the psychological analysis.
 *
 * GET /api/marriage/report?code=ABC123
 */
export const runtime = "nodejs";
export const maxDuration = 60; // LLM narration can take a moment

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    if (!code) return NextResponse.json({ ok: false, error: "Missing code." }, { status: 400 });

    const match = await getMatch(code);
    if (!match) return NextResponse.json({ ok: false, error: "No assessment found for that code." }, { status: 404 });
    if (match.status !== "complete") {
      return NextResponse.json({ ok: false, error: "Both people must finish the assessment before the report is ready.", pending: true }, { status: 409 });
    }

    const responses = await getResponses(code);
    const a = responses.find((r) => r.slot === "a");
    const b = responses.find((r) => r.slot === "b");
    if (!a || !b) return NextResponse.json({ ok: false, error: "Responses are incomplete." }, { status: 409 });

    // 1. Deterministic scoring (source of truth)
    const profileA = scorePerson(a.name, a.answers, QUESTION_BANK);
    const profileB = scorePerson(b.name, b.answers, QUESTION_BANK);
    const analysis = analyzePair(profileA, profileB, QUESTION_BANK);

    // 2. Constrained LLM narrative (describes the numbers, invents nothing)
    const narrative = await generateNarrative(analysis);

    // 3. Optional astrology — only if BOTH supplied a DOB. Clearly separated.
    let astrology: unknown = null;
    if (a.dob && b.dob) {
      try {
        astrology = generateMatchReport(
          { name: a.name, dob: a.dob },
          { name: b.name, dob: b.dob }
        );
      } catch (e) {
        console.error("[marriage/report] astrology skipped:", e);
      }
    }

    return NextResponse.json({
      ok: true,
      code,
      names: { a: a.name, b: b.name },
      analysis,
      narrative,
      astrology,
      astrologyAvailable: Boolean(astrology),
    });
  } catch (e) {
    console.error("[marriage/report]", e);
    return NextResponse.json({ ok: false, error: "Could not generate the report. Please try again." }, { status: 500 });
  }
}
