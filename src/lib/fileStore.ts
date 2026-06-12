/**
 * Neon-backed file store — replaces Supabase storage for all generated assets
 * (welcome images, promise cards, report PDFs, banners, stickers, etc.).
 *
 * Files are stored as rows in a `generated_files` table in the same Neon
 * Postgres the WhatsApp engine uses, and served publicly via /api/file/<key>.
 * This removes the Supabase dependency entirely (it was hitting its free-tier
 * size limit and blocking all uploads).
 *
 * Requires env: DATABASE_URL (Neon pooled connection string).
 */

import { neon } from "@neondatabase/serverless";

const PUBLIC_BASE = "https://www.highperformanceclub.co";

function sql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL not configured");
  return neon(url);
}

let schemaReady = false;
async function ensureSchema() {
  if (schemaReady) return;
  const db = sql();
  await db`
    CREATE TABLE IF NOT EXISTS generated_files (
      key          TEXT PRIMARY KEY,
      content_type TEXT NOT NULL,
      bytes        BYTEA NOT NULL,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
  schemaReady = true;
}

/**
 * Upload bytes under `key` (upsert) and return the public URL WhatsApp can fetch.
 * `key` should include an extension (e.g. "welcome-rohan-123.png") so the served
 * file has the right look; the content type comes from `contentType`.
 */
export async function putFile(
  key: string,
  bytes: Buffer | Uint8Array,
  contentType: string
): Promise<string> {
  await ensureSchema();
  const db = sql();
  const buf = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
  // node-postgres / neon encode Buffer as bytea automatically.
  await db`
    INSERT INTO generated_files (key, content_type, bytes)
    VALUES (${key}, ${contentType}, ${buf})
    ON CONFLICT (key) DO UPDATE
      SET content_type = EXCLUDED.content_type,
          bytes        = EXCLUDED.bytes,
          created_at   = now()`;
  return `${PUBLIC_BASE}/api/file/${encodeURIComponent(key)}`;
}

/** Public URL for an already-stored key (no DB round-trip). */
export function fileUrl(key: string): string {
  return `${PUBLIC_BASE}/api/file/${encodeURIComponent(key)}`;
}

/** Fetch a stored file's bytes + content type (used by the serving route). */
export async function getFile(
  key: string
): Promise<{ contentType: string; bytes: Buffer } | null> {
  const db = sql();
  const rows = (await db`
    SELECT content_type, bytes FROM generated_files WHERE key = ${key} LIMIT 1`) as Array<{
    content_type: string;
    bytes: Buffer | Uint8Array;
  }>;
  if (!rows.length) return null;
  const r = rows[0];
  return { contentType: r.content_type, bytes: Buffer.from(r.bytes) };
}
// redeploy trigger: pick up DATABASE_URL env var 1781233847
