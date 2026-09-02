import Image from "next/image";
import { QuoteButton, WhatsAppButton } from "@/components/cta/CtaLinks";
import { BlueprintCorners } from "@/components/ui/Blueprint";

export function HeroBlock({ eyebrow, title, description, imageUrl }: { eyebrow?: string; title: string; description?: string; imageUrl?: string }) {
  if (!imageUrl) {
    return (
      <section className="bg-[color:var(--color-navy-950)] py-14 text-white sm:py-20">
        <div className="container-page">
          {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">{eyebrow}</p>}
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{title}</h1>
          {description && <p className="mt-6 max-w-2xl text-lg text-slate-300">{description}</p>}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <QuoteButton />
            <WhatsAppButton pageLabel={title} variant="outline" size="lg" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden" style={{ background: "var(--color-accent-900)", color: "var(--color-neutral-100)" }}>
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--color-bg) 8%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-bg) 8%, transparent) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="container-page relative grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 lg:py-24">
        <div>
          {eyebrow && (
            <span className="tag tag-outline" style={{ color: "var(--color-accent-300)", borderColor: "var(--color-accent-300)", marginBottom: "20px" }}>
              {eyebrow}
            </span>
          )}
          <h1 className="mt-5 max-w-[620px] text-[34px] leading-[1.08] sm:text-[42px] lg:text-[52px] lg:leading-[1.06]">{title}</h1>
          {description && (
            <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed" style={{ color: "var(--color-neutral-300)" }}>
              {description}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <QuoteButton label="Get a Custom Quote" size="lg" />
            <WhatsAppButton pageLabel={title} label="Chat on WhatsApp" variant="outline" size="lg" />
          </div>
        </div>

        <div className="blueprint relative aspect-[4/3] w-full overflow-hidden" style={{ borderColor: "color-mix(in srgb, var(--color-neutral-100) 30%, transparent)" }}>
          <BlueprintCorners color="var(--color-neutral-300)" />
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, color-mix(in srgb, var(--color-accent-900) 70%, transparent), transparent)" }} />
        </div>
      </div>
    </section>
  );
}
