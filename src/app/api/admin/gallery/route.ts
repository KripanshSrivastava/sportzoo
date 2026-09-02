import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { getAllGalleryImagesForAdmin } from "@/lib/galleryData";
import { revalidateSite } from "@/lib/revalidate";

export async function GET() {
  const rows = await getAllGalleryImagesForAdmin();
  return NextResponse.json({ ok: true, images: rows });
}

export async function POST(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const body = await req.json().catch(() => null);
  if (!body?.category || !body?.imageUrl) {
    return NextResponse.json({ ok: false, message: "category and imageUrl are required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("gallery_images")
    .insert({ category: body.category, image_url: body.imageUrl, sort_order: body.sortOrder ?? 0 })
    .select()
    .single();

  if (error) {
    console.error("[elephant-corporate] Saving gallery image failed:", error.message);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
  revalidateSite();
  return NextResponse.json({ ok: true, image: data });
}
