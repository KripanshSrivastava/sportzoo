import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { PAGE_KEYS, type PageKey } from "@/lib/pageKeys";
import { DEFAULT_BLOCKS } from "@/lib/blocks/defaults";
import { BLOCK_TYPES } from "@/lib/blocks/types";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!PAGE_KEYS.includes(key as PageKey)) {
    return NextResponse.json({ ok: false, message: "Unknown page." }, { status: 404 });
  }
  const pageKey = key as PageKey;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: true, blocks: DEFAULT_BLOCKS[pageKey] });

  const { data, error } = await supabase.from("page_blocks").select("blocks").eq("page_key", pageKey).maybeSingle();
  // Fall back to the built-in layout (not an error response) if the table isn't set up yet —
  // the editor should always open pre-populated with the page's current effective content.
  const blocks = !error && Array.isArray(data?.blocks) && data.blocks.length > 0 ? data.blocks : DEFAULT_BLOCKS[pageKey];
  return NextResponse.json({ ok: true, blocks });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!PAGE_KEYS.includes(key as PageKey)) {
    return NextResponse.json({ ok: false, message: "Unknown page." }, { status: 404 });
  }
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const body = await req.json().catch(() => null);
  if (!Array.isArray(body)) {
    return NextResponse.json({ ok: false, message: "Expected an array of blocks." }, { status: 400 });
  }
  for (const block of body) {
    if (!block?.id || !BLOCK_TYPES.includes(block.type)) {
      return NextResponse.json({ ok: false, message: `Invalid block: ${JSON.stringify(block)}` }, { status: 400 });
    }
  }

  const { error } = await supabase
    .from("page_blocks")
    .upsert({ page_key: key, blocks: body, updated_at: new Date().toISOString() }, { onConflict: "page_key" });

  if (error) {
    console.error("[elephant-corporate] Saving page blocks failed:", error.message);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
