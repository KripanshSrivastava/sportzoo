import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig, isLiveLink } from "@/config/site";

function StarRow({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill={i < full ? "#F5B400" : "#E2E8F0"}>
          <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.77L10 14.77l-5.18 2.67.99-5.77L1.62 7.59l5.79-.84L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export function GoogleReviewsBlock({
  eyebrow,
  title,
  description,
  rating,
  reviewCount,
  items = [],
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  rating?: string;
  reviewCount?: string;
  items?: { quote: string; name: string; role?: string }[];
}) {
  const hasProfileLink = isLiveLink(siteConfig.google.profileUrl);
  const hasReviewLink = isLiveLink(siteConfig.google.reviewUrl);
  const numericRating = rating ? Number(rating) : null;
  const hasRating = numericRating != null && !Number.isNaN(numericRating);
  const featured = items.filter((i) => i.quote && i.name);

  // Nothing real to show and nowhere real to send people — render nothing
  // rather than a section that links nowhere or shows a fake number.
  if (!hasProfileLink && !hasReviewLink && !hasRating && featured.length === 0) return null;

  return (
    <Section>
      <SectionHeading eyebrow={eyebrow} title={title ?? "What clients say on Google"} description={description} center />

      <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
            <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.63h6.47a5.53 5.53 0 01-2.4 3.63v3h3.87c2.27-2.09 3.58-5.17 3.58-8.81z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.94-2.92l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.1A12 12 0 0012 24z" />
            <path fill="#FBBC05" d="M5.27 14.27a7.2 7.2 0 010-4.54v-3.1H1.27a12 12 0 000 10.74l4-3.1z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 001.27 6.63l4 3.1C6.22 6.86 8.87 4.75 12 4.75z" />
          </svg>
          <span className="text-sm font-semibold" style={{ color: "var(--color-neutral-800)" }}>
            Google Reviews
          </span>
        </div>

        {hasRating && (
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold" style={{ color: "var(--color-navy-900)" }}>
                {numericRating!.toFixed(1)}
              </span>
              <StarRow rating={numericRating!} />
            </div>
            {reviewCount && (
              <p className="m-0 text-xs" style={{ color: "var(--color-neutral-600)" }}>
                Based on {reviewCount} Google reviews
              </p>
            )}
          </div>
        )}

        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          {hasProfileLink && (
            <ButtonLink href={siteConfig.google.profileUrl} variant="secondary" size="md" target="_blank" rel="noopener noreferrer">
              Read our reviews
            </ButtonLink>
          )}
          {hasReviewLink && (
            <ButtonLink href={siteConfig.google.reviewUrl} variant="primary" size="md" target="_blank" rel="noopener noreferrer">
              Leave us a review
            </ButtonLink>
          )}
        </div>
      </div>

      {featured.length > 0 && (
        <div className="mt-11 grid gap-5 md:grid-cols-3">
          {featured.map((r, i) => (
            <figure key={i} className="card m-0">
              <blockquote className="m-0 text-sm italic" style={{ color: "var(--color-text)", opacity: 0.85 }}>
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-[13px] font-semibold">
                {r.name}
                {r.role && (
                  <span className="block font-normal" style={{ color: "var(--color-neutral-600)" }}>
                    {r.role}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </Section>
  );
}
