import "server-only";

/* eslint-disable @typescript-eslint/no-explicit-any */

const MISSING_COLUMN = /Could not find the '([^']+)' column/;

function stripMissing(payload: Record<string, unknown>, message: string | undefined): string | null {
  const missing = message?.match(MISSING_COLUMN)?.[1];
  if (missing && missing in payload) {
    delete payload[missing];
    return missing;
  }
  return null;
}

/**
 * Upsert a row, automatically dropping any column the database doesn't have
 * yet. Lets the admin keep saving even when a newer column (added to
 * supabase/schema.sql) hasn't been migrated on this Supabase project — the
 * un-migrated field is skipped until the schema is updated.
 *
 * Returns { error } on a real failure, or { skipped } listing dropped columns.
 */
export async function resilientUpsert(
  supabase: any,
  table: string,
  row: Record<string, unknown>,
  options?: { onConflict?: string }
): Promise<{ error?: { message: string }; skipped: string[] }> {
  const payload: Record<string, unknown> = { ...row };
  const skipped: string[] = [];

  for (let attempt = 0; attempt < 12; attempt++) {
    const { error } = await supabase.from(table).upsert(payload, options);
    if (!error) return { skipped };
    const dropped = stripMissing(payload, error.message);
    if (dropped) {
      skipped.push(dropped);
      continue;
    }
    return { error, skipped };
  }
  return { error: { message: "Too many unknown columns — run supabase/schema.sql." }, skipped };
}

/** Same idea for an UPDATE keyed by `match` (e.g. { id }). */
export async function resilientUpdate(
  supabase: any,
  table: string,
  row: Record<string, unknown>,
  match: Record<string, unknown>
): Promise<{ error?: { message: string }; skipped: string[] }> {
  const payload: Record<string, unknown> = { ...row };
  const skipped: string[] = [];

  for (let attempt = 0; attempt < 12; attempt++) {
    const { error } = await supabase.from(table).update(payload).match(match);
    if (!error) return { skipped };
    const dropped = stripMissing(payload, error.message);
    if (dropped) {
      skipped.push(dropped);
      continue;
    }
    return { error, skipped };
  }
  return { error: { message: "Too many unknown columns — run supabase/schema.sql." }, skipped };
}

/** Same idea for an INSERT. */
export async function resilientInsert(
  supabase: any,
  table: string,
  row: Record<string, unknown>
): Promise<{ error?: { message: string }; skipped: string[]; data?: any }> {
  const payload: Record<string, unknown> = { ...row };
  const skipped: string[] = [];

  for (let attempt = 0; attempt < 12; attempt++) {
    const { data, error } = await supabase.from(table).insert(payload).select().single();
    if (!error) return { skipped, data };
    const dropped = stripMissing(payload, error.message);
    if (dropped) {
      skipped.push(dropped);
      continue;
    }
    return { error, skipped };
  }
  return { error: { message: "Too many unknown columns — run supabase/schema.sql." }, skipped };
}
