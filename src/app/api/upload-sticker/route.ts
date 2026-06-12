import { NextResponse } from "next/server";

/**
 * One-time uploader: hosts the auto-looping "you're awesome" Step-3 sticker on
 * Supabase storage (which reliably serves .webp, unlike the Vercel /public CDN
 * for this file). Fetches the bytes from the GitHub raw URL of the committed
 * file and uploads to the `reports` bucket. Returns the stable public URL.
 *
 * Call once: POST/GET https://www.highperformanceclub.co/api/upload-sticker
 */

const FILENAME = "you-are-awesome-sticker.webp";
const SOURCE_RAW =
  "https://raw.githubusercontent.com/rohan-growthyfai/high-performance-club-landing-page/main/public/you-are-awesome-sticker.webp";

async function handle() {
  try {
    const srcRes = await fetch(SOURCE_RAW);
    if (!srcRes.ok) throw new Error(`fetch source failed: ${srcRes.status}`);
    const bytes = Buffer.from(await srcRes.arrayBuffer());

    const { putFile } = await import("@/lib/fileStore");
    const publicUrl = await putFile(FILENAME, Buffer.from(bytes), "image/webp");
    return NextResponse.json({ success: true, publicUrl, bytes: bytes.length });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET() {
  return handle();
}
export async function POST() {
  return handle();
}
