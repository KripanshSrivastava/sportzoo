import type { CSSProperties } from "react";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getClientLogos } from "@/lib/clientLogosData";

const MIN_FOR_MARQUEE = 6;
const MIN_PER_COPY = 8;

interface Logo {
  key: string;
  url: string | null;
  name: string;
}

function LogoTile({ logo }: { logo: Logo }) {
  return (
    <div
      className="flex h-28 w-[210px] shrink-0 items-center justify-center bg-white p-4 sm:h-32 sm:w-[240px]"
      style={{ border: "1px solid var(--color-divider)" }}
    >
      {logo.url ? (
        <div className="relative h-full w-full">
          <Image src={logo.url} alt={logo.name || "Client logo"} fill sizes="240px" className="object-contain" />
        </div>
      ) : (
        <span className="text-center text-sm font-semibold leading-tight" style={{ color: "var(--color-neutral-700)" }}>
          {logo.name}
        </span>
      )}
    </div>
  );
}

function MarqueeRow({ logos, reverse }: { logos: Logo[]; reverse: boolean }) {
  // Pad a single copy wide enough to fill the viewport by repeating the whole
  // set (A B C A B C …), then duplicate it once — the track animates 0 → -50%.
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

/**
 * The "Companies that trust our work" banner. The logos themselves are managed
 * in one place at Admin → Client Logos; this block only controls where the
 * banner sits and its heading.
 */
export async function ClientLogosBlock({ eyebrow, title }: { eyebrow?: string; title?: string }) {
  const logos: Logo[] = (await getClientLogos())
    .filter((l) => l.logoUrl || l.name)
    .map((l) => ({ key: l.id, url: l.logoUrl, name: l.name }));

  if (logos.length === 0) return null;

  return (
    <Section style={{ background: "var(--color-surface)" }}>
      {(eyebrow || title) && <SectionHeading eyebrow={eyebrow} title={title ?? ""} />}

      {logos.length < MIN_FOR_MARQUEE ? (
        <div className={`${eyebrow || title ? "mt-9" : ""} flex flex-wrap justify-center gap-4`}>
          {logos.map((logo) => (
            <LogoTile key={logo.key} logo={logo} />
          ))}
        </div>
      ) : (
        <div className={`${eyebrow || title ? "mt-9" : ""} flex flex-col gap-4`}>
          {logos.length >= 14 ? (
            <>
              <MarqueeRow logos={logos.filter((_, i) => i % 2 === 0)} reverse={false} />
              <MarqueeRow logos={logos.filter((_, i) => i % 2 === 1)} reverse />
            </>
          ) : (
            <MarqueeRow logos={logos} reverse={false} />
          )}
        </div>
      )}
    </Section>
  );
}
