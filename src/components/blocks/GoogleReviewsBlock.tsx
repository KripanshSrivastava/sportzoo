import { Section, SectionHeading } from "@/components/ui/Section";
import { Blueprint } from "@/components/ui/Blueprint";
import { getBusinessSettings } from "@/lib/businessSettings";

const STAR = "var(--color-accent-2-500)";

export async function GoogleReviewsBlock({
  eyebrow,
  title,
  rating,
  reviewCount,
  profileUrl,
  items = [],
}: {
  eyebrow?: string;
  title: string;
  rating?: string;
  reviewCount?: string;
  profileUrl?: string;
  items?: { quote: string; name: string; date: string }[];
}) {
  const settings = await getBusinessSettings();
  const url = (profileUrl || settings.googleBusinessUrl || "").trim();
  const score = (rating || settings.googleRating || "").trim();
  const count = (reviewCount || settings.googleReviewCount || "").trim();
  const realItems = items.filter((i) => i.quote?.trim());

  // Nothing real to show — render nothing rather than a fake badge.
  if (!url && !score && realItems.length === 0) return null;

  return (
    <Section style={{ background: "var(--color-surface)" }}>
      <SectionHeading eyebrow={eyebrow} title={title} />

      {(score || url) && (
        <div className="mt-6 flex flex-wrap items-center gap-5">
          {score && (
            <Blueprint className="elev-sm flex flex-row items-center gap-3 p-3.5">
              <span
                className="m-0 text-3xl"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600, lineHeight: 1 }}
              >
                {score}
              </span>
              <span>
                <span aria-hidden className="block text-base tracking-widest" style={{ color: STAR }}>
                  ★★★★★
                </span>
                {count && (
                  <span className="text-xs" style={{ color: "var(--color-neutral-600)" }}>
                    {count} Google reviews
                  </span>
                )}
              </span>
            </Blueprint>
          )}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold"
              style={{ color: "var(--color-accent)" }}
            >
              Read all reviews on Google →
            </a>
          )}
        </div>
      )}

      {realItems.length > 0 && (
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {realItems.map((t, i) => (
            <Blueprint key={i} as="figure" className="elev-sm m-0 p-4">
              <span aria-hidden className="text-sm tracking-widest" style={{ color: STAR }}>
                ★★★★★
              </span>
              <blockquote className="card-body mt-2 not-italic">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-3 text-[13px] font-semibold">
                {t.name}
                {t.date && (
                  <span className="block font-normal" style={{ color: "var(--color-neutral-600)" }}>
                    {t.date}
                  </span>
                )}
              </figcaption>
            </Blueprint>
          ))}
        </div>
      )}
    </Section>
  );
}
