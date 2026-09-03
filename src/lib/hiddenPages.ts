import { cache } from "react";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export { HIDEABLE_PAGES, HIDEABLE_PATHS } from "@/lib/hideablePages";

export const getHiddenPaths = cache(async (): Promise<string[]> => {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  const { data, error } = await supabase.from("hidden_pages").select("path");
  if (error || !data) return [];
  return data.map((r) => r.path as string);
});

/** True when the owner has hidden this exact path from /admin/pages. */
export async function isPathHidden(path: string): Promise<boolean> {
  return (await getHiddenPaths()).includes(path);
}
