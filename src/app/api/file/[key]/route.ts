import { NextResponse } from "next/server";
import { getFile } from "@/lib/fileStore";

/**
 * Serves a file previously stored in Neon via fileStore.putFile().
 * Public URL shape: /api/file/<key>  (e.g. /api/file/welcome-rohan-123.png)
 *
 * Returns the raw bytes with the stored content type and long cache headers so
 * WhatsApp (and browsers/CDNs) can fetch it like any static asset.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;
    const decoded = decodeURIComponent(key);
    const file = await getFile(decoded);
    if (!file) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
    return new NextResponse(new Uint8Array(file.bytes), {
      status: 200,
      headers: {
        "Content-Type": file.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Length": String(file.bytes.length),
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
