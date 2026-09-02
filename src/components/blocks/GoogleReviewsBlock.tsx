import { Section } from "@/components/ui/Section";
import { getBusinessSettings } from "@/lib/businessSettings";
import { getGoogleReviews } from "@/lib/googleReviewsData";

const GOLD = "#fbbc04";

function ratingWord(score: number): string {
  if (score >= 4.5) return "EXCELLENT";
  if (score >= 4) return "GREAT";
  if (score >= 3) return "GOOD";
  return "RATED";
}

function Stars({ filled = 5, size = 16 }: { filled?: number; size?: number }) {
  return (
    <span aria-hidden className="inline-flex" style={{ gap: 1 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill={i < filled ? GOLD : "var(--color-divider)"}>
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.2 1 5.9L10 15.9 4.8 18.7l1-5.9L1.5 8.7l5.9-.9z" />
        </svg>
      ))}
    </span>
  );
}

function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.7-.2-2.5H12v4.8h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-9z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1 .7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1C6.2 6.9 8.9 4.8 12 4.8z" />
    </svg>
  );
}

function VerifiedTick() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#4285F4" />
      <path d="M7 12.5l3 3 7-7" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * The homepage "Google reviews" section. Rating / review count / profile URL
 * come from Business Info; the review cards come from Admin → Google Reviews.
 * The block itself only carries the eyebrow + heading.
 */
export async function GoogleReviewsBlock({ eyebrow, title }: { eyebrow?: string; title?: string }) {
  const [settings, reviews] = await Promise.all([getBusinessSettings(), getGoogleReviews()]);

  const url = settings.googleBusinessUrl || "";
  const score = Number(settings.googleRating) || 0;
  const hasRating = score > 0;
  const countNum = Number(settings.googleReviewCount) || 0;
  const count = countNum > 0 ? String(countNum) : "";

  if (!hasRating && reviews.length === 0 && !url) return null;

  return (
    <Section style={{ background: "var(--color-surface)" }}>
      {(eyebrow || title) && (
        <div className="mb-8 max-w-2xl">
          {eyebrow && <h6 style={{ color: "var(--color-accent-700)" }}>{eyebrow}</h6>}
          {title && <h2 className="mt-1.5">{title}</h2>}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:items-start">
        {(hasRating || url) && (
          <div className="text-center lg:text-left">
            {hasRating && (
              <>
                <p className="m-0 text-lg font-bold tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
                  {ratingWord(score)}
                </p>
                <div className="mt-1 flex justify-center lg:justify-start">
                  <Stars filled={Math.round(score)} size={20} />
                </div>
              </>
            )}
            {count && (
              <p className="mt-1 text-[13px]" style={{ color: "var(--color-neutral-600)" }}>
                Based on {count} reviews
              </p>
            )}
            <div className="mt-2 flex items-center justify-center gap-1.5 lg:justify-start">
              <GoogleG />
              <span className="text-sm font-semibold" style={{ color: "var(--color-neutral-700)" }}>
                Google
              </span>
            </div>
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-semibold"
                style={{ color: "var(--color-accent)" }}
              >
                Read all reviews →
              </a>
            )}
          </div>
        )}

        {reviews.length > 0 && (
          <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "thin" }}>
            {reviews.map((r) => (
              <figure
                key={r.id}
                className="m-0 flex w-[280px] shrink-0 flex-col bg-white p-4"
                style={{ border: "1px solid var(--color-divider)" }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-white"
                      style={{ background: "var(--color-accent-700)" }}
                      aria-hidden
                    >
                      {(r.author || "?").charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <p className="m-0 text-[13px] font-semibold">{r.author}</p>
                      {r.whenLabel && (
                        <p className="m-0 text-xs" style={{ color: "var(--color-neutral-600)" }}>
                          {r.whenLabel}
                        </p>
                      )}
                    </div>
                  </div>
                  <GoogleG size={16} />
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <Stars filled={r.rating} size={14} />
                  <VerifiedTick />
                </div>
                <blockquote className="mt-2 line-clamp-4 text-[13px] leading-relaxed" style={{ color: "var(--color-neutral-700)" }}>
                  {r.text}
                </blockquote>
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-[13px] font-medium"
                    style={{ color: "var(--color-accent)" }}
                  >
                    Read more
                  </a>
                )}
              </figure>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
