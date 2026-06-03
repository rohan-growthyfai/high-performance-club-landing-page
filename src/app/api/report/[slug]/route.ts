/**
 * Serves report files from the GitHub reports branch with correct headers.
 * WhatsApp requires a clean URL with proper Content-Type.
 * GET /api/report/rohan-mote-1234567890.html
 */
import { NextResponse } from "next/server";

const REPO   = "rohan-growthyfai/high-performance-club-landing-page";
const BRANCH = "reports";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!slug || !slug.endsWith(".html")) {
    return new NextResponse("Not found", { status: 404 });
  }

  const rawUrl = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/public/reports/${slug}`;

  try {
    const res = await fetch(rawUrl, { next: { revalidate: 0 } });
    if (!res.ok) return new NextResponse("Report not found", { status: 404 });

    const htmlBuffer = Buffer.from(await res.arrayBuffer());

    return new NextResponse(htmlBuffer, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Length": String(htmlBuffer.length),
        "Content-Disposition": `attachment; filename="HPC-Progress-Report.html"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new NextResponse("Failed to load report", { status: 500 });
  }
}
