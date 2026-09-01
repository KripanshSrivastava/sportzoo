import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Blueprint } from "@/components/ui/Blueprint";

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
        <Blueprint className="relative aspect-[16/9] w-full overflow-hidden">
          <Image src={imageUrl} alt={caption || title || ""} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" unoptimized />
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
