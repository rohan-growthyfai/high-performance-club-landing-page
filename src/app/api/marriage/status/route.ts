import { NextResponse } from "next/server";
import { getMatch, resolveToken } from "@/lib/marriage/store";

/**
 * Check the state of a match — used by the "waiting for partner" screen and
 * to resolve a token to its slot + whether the person already answered.
 *
 * GET /api/marriage/status?code=ABC123
 * GET /api/marriage/status?token=<uuid>
 */
export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const token = searchParams.get("token");

    if (token) {
      const resolved = await resolveToken(token);
      if (!resolved) return NextResponse.json({ ok: false, error: "Invalid link." }, { status: 404 });
      const { match, slot } = resolved;
      const youSubmitted = slot === "a" ? match.submittedA : match.submittedB;
      const partnerSubmitted = slot === "a" ? match.submittedB : match.submittedA;
      const yourName = slot === "a" ? match.nameA : match.nameB;
      const partnerName = slot === "a" ? match.nameB : match.nameA;
      return NextResponse.json({
        ok: true, code: match.code, slot, youSubmitted, partnerSubmitted,
        yourName, partnerName, status: match.status,
      });
    }

    if (code) {
      const match = await getMatch(code);
      if (!match) return NextResponse.json({ ok: false, error: "No assessment found for that code." }, { status: 404 });
      return NextResponse.json({
        ok: true, code: match.code, status: match.status,
        submittedA: match.submittedA, submittedB: match.submittedB,
        nameA: match.nameA, nameB: match.nameB,
      });
    }

    return NextResponse.json({ ok: false, error: "Provide a code or token." }, { status: 400 });
  } catch (e) {
    console.error("[marriage/status]", e);
    return NextResponse.json({ ok: false, error: "Could not check status." }, { status: 500 });
  }
}
