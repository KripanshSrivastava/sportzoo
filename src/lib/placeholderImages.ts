/**
 * Temporary placeholder photography, served from picsum.photos (free,
 * no API key, stable URLs) so the site looks finished instead of showing
 * grey boxes. Every call site that uses these is marked with a comment —
 * swap in real event photography before launch and remove this file.
 */

export function placeholderPhoto(seed: string, width: number, height: number) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}

/** Simple text-based "logo" placeholder — not a photo, just a labelled box. */
export function placeholderLogo(label: string, width = 200, height = 72) {
  const bg = "1e293b";
  const fg = "e2e8f0";
  return `https://placehold.co/${width}x${height}/${bg}/${fg}?text=${encodeURIComponent(label)}&font=roboto`;
}
