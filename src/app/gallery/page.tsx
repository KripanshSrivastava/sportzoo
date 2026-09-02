import { MediaFrame } from "@/components/ui/MediaFrame";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { getGalleryByCategory } from "@/lib/galleryData";

// ISR: served from cache; admin saves call revalidateSite() to push changes live immediately.
export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Gallery | Elephant Corporate",
  description: "Photos from Elephant Corporate's corporate event, artist booking, and venue booking engagements.",
  path: "/gallery",
  noIndex: true,
});

export default async function GalleryPage() {
  const gallery = await getGalleryByCategory();
  const categories = Object.keys(gallery);

  return (
    <>
      <Breadcrumbs items={[{ name: "Gallery", path: "/gallery" }]} />

      <section className="bg-[color:var(--color-navy-950)] py-14 text-white sm:py-20">
        <div className="container-page">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Gallery</h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Photos from our events will be added here as engagements are completed and cleared for publication.
          </p>
        </div>
      </section>

      {categories.length === 0 && (
        <Section className="bg-white">
          <p className="text-muted max-w-2xl text-[15px]">
            Photos and videos from our engagements will appear here once they&apos;re completed and cleared for
            publication.
          </p>
        </Section>
      )}

      {categories.map((cat) => (
        <Section key={cat} className="border-b border-slate-100 bg-white">
          <SectionHeading title={cat} />
          {/* Manage these photos and videos at /admin/gallery */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {gallery[cat].map((src, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-slate-100">
                <MediaFrame url={src} alt={`${cat} ${i + 1}`} sizes="(min-width: 640px) 25vw, 50vw" />
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
