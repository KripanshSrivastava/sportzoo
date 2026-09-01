import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import type { ImageItem } from "@/lib/blocks/schemas";

export function ClientLogosBlock({
  eyebrow,
  title,
  logos = [],
}: {
  eyebrow?: string;
  title?: string;
  logos?: ImageItem[];
}) {
  const items = logos.filter((l) => l.url || l.caption);
  if (items.length === 0) return null;

  return (
    <Section style={{ background: "var(--color-surface)" }}>
      <SectionHeading eyebrow={eyebrow} title={title ?? ""} />
      <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((logo, i) => (
          <div
            key={i}
            className="flex h-24 items-center justify-center bg-white p-4"
            style={{ border: "1px solid var(--color-divider)" }}
          >
            {logo.url ? (
              <div className="relative h-full w-full">
                <Image
                  src={logo.url}
                  alt={logo.caption || "Client logo"}
                  fill
                  sizes="200px"
                  className="object-contain"
                  unoptimized
                />
              </div>
            ) : (
              <span className="text-center text-sm font-semibold" style={{ color: "var(--color-neutral-700)" }}>
                {logo.caption}
              </span>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
