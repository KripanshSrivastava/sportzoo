import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, MEDIA_BUCKET } from "@/lib/supabaseAdmin";

const MAX_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

export async function POST(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, message: "Supabase isn't configured — set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." },
      { status: 500 }
    );
  }

  const formData = await req.formData().catch(() => null);
  const file = formData?.get("file");
  const folder = String(formData?.get("folder") ?? "uploads").replace(/[^a-z0-9-]/gi, "");

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, message: "No file provided." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ ok: false, message: "Unsupported file type. Use JPG, PNG, WEBP, AVIF, or GIF." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ ok: false, message: "File is too large (max 8MB)." }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) {
    console.error("[elephant-corporate] Storage upload failed:", error.message);
    const hint = /bucket not found/i.test(error.message)
      ? ` Create a public bucket named "${MEDIA_BUCKET}" in Supabase → Storage.`
      : "";
    return NextResponse.json({ ok: false, message: `${error.message}${hint}` }, { status: 500 });
  }

  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return NextResponse.json({ ok: true, url: data.publicUrl });
}
