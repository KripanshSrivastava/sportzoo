import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { siteImages } from "@/config/images";

export const metadata = buildMetadata({
  title: "Gallery | Sportzoo Corporate Events",
  description: "Photos from Sportzoo's corporate event, artist booking, and venue booking engagements.",
  path: "/gallery",
  noIndex: true,
});

const categories = Object.keys(siteImages.gallery);

export default function GalleryPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Gallery", path: "/gallery" }]} />

      <section className="bg-[color:var(--color-navy-950)] py-14 text-white sm:py-20">
        <div className="container-page">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Gallery</h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Photos from our events will be added here as engagements are completed and cleared for publication.
            The photos below are temporary demo images, not real Sportzoo events.
          </p>
        </div>
      </section>

      {categories.map((cat) => (
        <Section key={cat} className="border-b border-slate-100 bg-white">
          <SectionHeading title={cat} />
          {/* To change these photos, see src/config/images.ts (siteImages.gallery) */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {siteImages.gallery[cat].map((src, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={src}
                  alt={`${cat} example ${i + 1}`}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </Section>
      ))}

      <LeadFormSection sourcePage="Gallery" />
      <FinalCta />
    </>
  );
}
