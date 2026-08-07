import { NextResponse } from "next/server";
import { createMatch } from "@/lib/marriage/store";

/**
 * Start a new compatibility assessment (a "match").
 * The starter answers as slot A and receives a link to share with their
 * partner (slot B). Each person answers independently.
 *
 * POST /api/marriage/create  { name }
 * -> { ok, code, selfToken, partnerToken }
 */
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    if (!name) return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });

    const { code, selfToken, partnerToken } = await createMatch(name, "a");
    return NextResponse.json({ ok: true, code, selfToken, partnerToken });
  } catch (e) {
    console.error("[marriage/create]", e);
    return NextResponse.json({ ok: false, error: "Could not start the assessment. Please try again." }, { status: 500 });
  }
}
