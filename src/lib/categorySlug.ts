import { RESERVED_CATEGORY_SLUGS } from "@/lib/serviceCategoriesData";

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Returns an error message if the slug can't be used for a category, else null. */
export function validateCategorySlug(slug: string): string | null {
  if (!slug) return "A URL slug is required.";
  if (!/^[a-z0-9-]+$/.test(slug)) return "The slug can only contain lowercase letters, numbers and dashes.";
  if (RESERVED_CATEGORY_SLUGS.includes(slug)) return `"${slug}" is used by another page — pick a different slug.`;
  return null;
}
