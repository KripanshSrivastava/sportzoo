import type { CSSProperties } from "react";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import type { ImageItem } from "@/lib/blocks/schemas";

const MIN_PER_COPY = 6;

function LogoTile({ logo }: { logo: ImageItem }) {
  return (
    <div
      className="flex h-20 w-[150px] shrink-0 items-center justify-center bg-white p-3.5"
      style={{ border: "1px solid var(--color-divider)" }}
    >
      {logo.url ? (
        <div className="relative h-full w-full">
          <Image src={logo.url} alt={logo.caption || "Client logo"} fill sizes="150px" className="object-contain" unoptimized />
        </div>
      ) : (
        <span className="text-center text-[13px] font-semibold leading-tight" style={{ color: "var(--color-neutral-700)" }}>
          {logo.caption}
        </span>
      )}
    </div>
  );
}

function MarqueeRow({ logos, reverse }: { logos: ImageItem[]; reverse: boolean }) {
  // Pad the row so a single copy is wide enough to fill the viewport, then
  // duplicate it once — the track animates 0 → -50% for a seamless loop.
  let seq = logos;
  while (seq.length < MIN_PER_COPY) seq = seq.concat(logos);
  const duration = Math.min(80, Math.max(22, seq.length * 4));

  return (
    <div className="marquee">
      <div
        className={`marquee-track${reverse ? " is-reverse" : ""}`}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {[...seq, ...seq].map((logo, i) => (
          <LogoTile key={i} logo={logo} />
        ))}
      </div>
    </div>
  );
}

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

  const rowCount = items.length > 16 ? 3 : items.length > 6 ? 2 : 1;
  const rows: ImageItem[][] = Array.from({ length: rowCount }, () => []);
  items.forEach((item, i) => rows[i % rowCount].push(item));

  return (
    <Section style={{ background: "var(--color-surface)" }}>
      {(eyebrow || title) && <SectionHeading eyebrow={eyebrow} title={title ?? ""} />}
      <div className={`${eyebrow || title ? "mt-9" : ""} flex flex-col gap-3.5`}>
        {rows.map((row, i) => (
          <MarqueeRow key={i} logos={row} reverse={i % 2 === 1} />
        ))}
      </div>
    </Section>
  );
}
