import { placeholderPhoto } from "@/lib/placeholderImages";

/**
 * HOW TO ADD YOUR OWN IMAGES
 * ---------------------------------------------------------------------
 * 1. Drop your image file into the `public/images/` folder in this
 *    project (create the folder if it doesn't exist yet).
 *    Example: public/images/hero.jpg
 * 2. Change the matching line below from a placeholder URL to the local
 *    path, starting with a slash: "/images/hero.jpg"
 * 3. Save — the site picks it up automatically, no other code changes
 *    needed.
 *
 * Everything below is a temporary stock placeholder until you do this.
 * You can use .jpg, .png, .webp, or .avif files.
 */
export const siteImages = {
  // The large photo on the homepage hero section.
  hero: placeholderPhoto("sportzoo-hero-offsite", 900, 675),

  // Gallery page — 4 photos per category. Add/replace paths in each array.
  gallery: {
    "Corporate Offsites": [
      placeholderPhoto("Corporate Offsites-0", 500, 500),
      placeholderPhoto("Corporate Offsites-1", 500, 500),
      placeholderPhoto("Corporate Offsites-2", 500, 500),
      placeholderPhoto("Corporate Offsites-3", 500, 500),
    ],
    "Recognition Ceremonies": [
      placeholderPhoto("Recognition Ceremonies-0", 500, 500),
      placeholderPhoto("Recognition Ceremonies-1", 500, 500),
      placeholderPhoto("Recognition Ceremonies-2", 500, 500),
      placeholderPhoto("Recognition Ceremonies-3", 500, 500),
    ],
    "Annual Day": [
      placeholderPhoto("Annual Day-0", 500, 500),
      placeholderPhoto("Annual Day-1", 500, 500),
      placeholderPhoto("Annual Day-2", 500, 500),
      placeholderPhoto("Annual Day-3", 500, 500),
    ],
    "Sports Days": [
      placeholderPhoto("Sports Days-0", 500, 500),
      placeholderPhoto("Sports Days-1", 500, 500),
      placeholderPhoto("Sports Days-2", 500, 500),
      placeholderPhoto("Sports Days-3", 500, 500),
    ],
    "Team Building": [
      placeholderPhoto("Team Building-0", 500, 500),
      placeholderPhoto("Team Building-1", 500, 500),
      placeholderPhoto("Team Building-2", 500, 500),
      placeholderPhoto("Team Building-3", 500, 500),
    ],
    Conferences: [
      placeholderPhoto("Conferences-0", 500, 500),
      placeholderPhoto("Conferences-1", 500, 500),
      placeholderPhoto("Conferences-2", 500, 500),
      placeholderPhoto("Conferences-3", 500, 500),
    ],
  } as Record<string, string[]>,
};
