import { cache } from "react";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { PAGE_KEYS, type PageKey } from "@/lib/pageKeys";
import { DEFAULT_BLOCKS } from "@/lib/blocks/defaults";
import type { Block } from "@/lib/blocks/types";

export { PAGE_KEYS };
export type { PageKey };

/** A page's block list — the DB row if one has been saved, else its built-in default layout. */
export const getPageBlocks = cache(async (pageKey: PageKey): Promise<Block[]> => {
  const supabase = getSupabaseAdmin();
  if (!supabase) return DEFAULT_BLOCKS[pageKey];

  const { data, error } = await supabase.from("page_blocks").select("blocks").eq("page_key", pageKey).maybeSingle();
  if (error || !data || !Array.isArray(data.blocks) || data.blocks.length === 0) return DEFAULT_BLOCKS[pageKey];
  return data.blocks as Block[];
});

export async function getRawPageBlocksForAdmin(pageKey: PageKey): Promise<Block[] | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const { data } = await supabase.from("page_blocks").select("blocks").eq("page_key", pageKey).maybeSingle();
  if (!data || !Array.isArray(data.blocks) || data.blocks.length === 0) return null;
  return data.blocks as Block[];
}
