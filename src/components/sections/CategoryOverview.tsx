import Link from "next/link";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { isVideoUrl } from "@/lib/media";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { QuoteButton, WhatsAppButton, CallButton } from "@/components/cta/CtaLinks";
import { getServicePagesForCategory } from "@/lib/servicePagesData";
import type { ServiceCategoryRecord } from "@/lib/serviceCategoriesData";

/**
 * The default overview page for a service category. The original four
 * categories render from the page builder instead (see src/app/[category]/page.tsx);
 * this is what every other category — and any of the four before it's been
 * customised — gets: heading, intro, the category's services, and a lead form.
 */
export async function CategoryOverview({ category }: { category: ServiceCategoryRecord }) {
  const services = await getServicePagesForCategory(category.slug);
  const heading = category.h1 || category.name;
  const hasImage = category.heroImageUrl && !isVideoUrl(category.heroImageUrl);

  return (
    <>
      <section className="relative overflow-hidden bg-[color:var(--color-navy-950)] py-14 text-white sm:py-20">
        {hasImage && (
          <>
            <Image src={category.heroImageUrl} alt="" fill sizes="100vw" className="object-cover opacity-30" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-navy-950)] via-[color:var(--color-navy-950)]/85 to-transparent" />
          </>
        )}
        <div className="container-page relative">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{heading}</h1>
          {category.intro && <p className="mt-6 max-w-2xl text-lg text-slate-300">{category.intro}</p>}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <QuoteButton />
            <WhatsAppButton pageLabel={category.name} variant="outline" size="lg" />
            <CallButton variant="outline" size="lg" />
          </div>
        </div>
      </section>

      {category.heroImageUrl && isVideoUrl(category.heroImageUrl) && (
        <div className="relative aspect-video w-full bg-black">
          <MediaFrame url={category.heroImageUrl} alt={category.name} sizes="100vw" />
        </div>
      )}

      {services.length > 0 ? (
        <Section className="bg-white">
          <SectionHeading eyebrow={category.name} title="What we offer" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/${category.slug}/${s.slug}`}
                className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[color:var(--color-electric)] hover:shadow-lg"
              >
                <h3 className="text-base font-semibold text-[color:var(--color-navy-900)] group-hover:text-[color:var(--color-electric)]">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{(s.intro[0] ?? "").slice(0, 120)}…</p>
                <span className="mt-4 inline-block text-sm font-semibold text-[color:var(--color-accent-dark)]">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </Section>
      ) : (
        <Section className="bg-white">
          <p className="text-slate-600">
            Service details for {category.name.toLowerCase()} are on the way. In the meantime, tell us what you need and
            we&apos;ll put together a proposal.
          </p>
        </Section>
      )}

      <LeadFormSection sourcePage={category.name} />
      <FinalCta pageLabel={category.name} />
    </>
  );
}
