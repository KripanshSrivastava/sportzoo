import { Section, SectionHeading } from "@/components/ui/Section";
import { Blueprint } from "@/components/ui/Blueprint";
import { MediaFrame } from "@/components/ui/MediaFrame";

export function ImageBlock({
  eyebrow,
  title,
  imageUrl,
  caption,
}: {
  eyebrow?: string;
  title?: string;
  imageUrl?: string;
  caption?: string;
}) {
  if (!imageUrl) return null;

  return (
    <Section style={{ background: "var(--color-surface)" }}>
      {(eyebrow || title) && <SectionHeading eyebrow={eyebrow} title={title ?? ""} />}
      <figure className={`m-0 ${eyebrow || title ? "mt-8" : ""}`}>
        <Blueprint className="relative aspect-video w-full overflow-hidden bg-black">
          <MediaFrame url={imageUrl} alt={caption || title || ""} sizes="(min-width: 1024px) 60vw, 100vw" />
        </Blueprint>
        {caption && (
          <figcaption className="mt-3 text-[13px]" style={{ color: "var(--color-neutral-600)" }}>
            {caption}
          </figcaption>
        )}
      </figure>
    </Section>
  );
}
