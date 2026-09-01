import { Section, SectionHeading } from "@/components/ui/Section";
import { MediaFrame } from "@/components/ui/MediaFrame";
import type { ImageItem } from "@/lib/blocks/schemas";

export function MediaGalleryBlock({
  eyebrow,
  title,
  items = [],
}: {
  eyebrow?: string;
  title?: string;
  items?: ImageItem[];
}) {
  const media = items.filter((i) => i.url);
  if (media.length === 0) return null;

  return (
    <Section style={{ background: "var(--color-surface)" }}>
      {(eyebrow || title) && <SectionHeading eyebrow={eyebrow} title={title ?? ""} />}
      <div className={`${eyebrow || title ? "mt-8" : ""} grid gap-4 sm:grid-cols-2 lg:grid-cols-3`}>
        {media.map((m, i) => (
          <figure key={i} className="m-0">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-slate-200">
              <MediaFrame url={m.url} alt={m.caption || ""} sizes="(min-width: 640px) 33vw, 100vw" />
            </div>
            {m.caption && (
              <figcaption className="mt-2 text-[13px]" style={{ color: "var(--color-neutral-600)" }}>
                {m.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </Section>
  );
}
