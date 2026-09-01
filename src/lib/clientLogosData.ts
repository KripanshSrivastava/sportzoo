import { cache } from "react";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export interface ClientLogo {
  id: string;
  name: string;
  logoUrl: string | null;
  sortOrder: number;
}

/** Companies the business has worked with — names only until logos are uploaded at /admin/logos. */
const FALLBACK_NAMES = [
  "Khelomore",
  "Genpact",
  "Bain & Company",
  "SMS Group",
  "Samsung",
  "Siemens",
  "PayU",
  "Fidelity",
  "FIS",
  "HDFC",
  "Cognizant",
];

const fallback: ClientLogo[] = FALLBACK_NAMES.map((name, i) => ({ id: name, name, logoUrl: null, sortOrder: i }));

function fromRow(row: Record<string, unknown>): ClientLogo {
  return {
    id: row.id as string,
    name: (row.name as string) ?? "",
    logoUrl: (row.logo_url as string) ?? null,
    sortOrder: (row.sort_order as number) ?? 0,
  };
}

/** Public list — DB rows if configured and non-empty, else the seed company names. */
export const getClientLogos = cache(async (): Promise<ClientLogo[]> => {
  const supabase = getSupabaseAdmin();
  if (!supabase) return fallback;
  const { data, error } = await supabase.from("client_logos").select("*").order("sort_order", { ascending: true });
  if (error || !data || data.length === 0) return fallback;
  return data.map(fromRow);
});

/** Admin list — DB rows only; empty array when Supabase isn't configured. */
export async function getAllClientLogosForAdmin(): Promise<ClientLogo[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  const { data, error } = await supabase.from("client_logos").select("*").order("sort_order", { ascending: true });
  if (error || !data) return [];
  return data.map(fromRow);
}
