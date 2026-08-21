import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata = buildMetadata({
  title: "Gallery | Sportzoo Corporate Events",
  description: "Photos from Sportzoo's corporate event, artist booking, and venue booking engagements.",
  path: "/gallery",
  noIndex: true,
});

const categories = [
  "Corporate Offsites",
  "Recognition Ceremonies",
  "Annual Day",
  "Sports Days",
  "Team Building",
  "Conferences",
];

export default function GalleryPage() {
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

      {categories.map((cat) => (
        <Section key={cat} className="border-b border-slate-100 bg-white">
          <SectionHeading title={cat} />
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-400"
              >
                Photo placeholder
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
