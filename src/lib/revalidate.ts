import "server-only";
import { revalidatePath } from "next/cache";

/**
 * Public pages are cached (ISR, `export const revalidate`) so visitors are
 * served from the CDN instead of hitting Supabase on every request. Call this
 * after any admin write so the change goes live immediately instead of waiting
 * for the revalidation window.
 *
 * Business Info, logos, reviews and page sections are cross-cutting (they
 * appear in the header/footer/blocks on many pages), so the simplest correct
 * move is to revalidate the whole site. It's a small site — this is cheap.
 */
export function revalidateSite() {
  try {
    revalidatePath("/", "layout");
  } catch {
    // revalidatePath throws outside a request context — ignore.
  }
}
