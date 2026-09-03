import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { CategoryOverview } from "@/components/sections/CategoryOverview";
import { getPageBlocks } from "@/lib/pageBlocksData";
import { PAGE_KEYS } from "@/lib/pageKeys";
import { buildMetadata } from "@/lib/seo";
import { getServiceCategories, getServiceCategoryBySlug } from "@/lib/serviceCategoriesData";

// ISR: served from cache; admin saves call revalidateSite() to push changes live immediately.
export const revalidate = 3600;
export const dynamicParams = true;

/** The original four categories keep their page-builder overview pages. */
const BUILDER_OVERVIEW_KEY: Record<string, string> = {
  "corporate-events": "corporate-events-overview",
  "artist-booking": "artist-booking-overview",
  "venue-booking": "venue-booking-overview",
  "event-rentals": "event-rentals-overview",
};

export async function generateStaticParams() {
  return (await getServiceCategories()).map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = await getServiceCategoryBySlug(category);
  if (!cat) return {};
  return buildMetadata({
    title: cat.metaTitle || `${cat.name} | Elephant Corporate`,
    description: cat.metaDescription || cat.intro,
    path: `/${cat.slug}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = await getServiceCategoryBySlug(category);
  if (!cat) notFound();

  const builderKey = BUILDER_OVERVIEW_KEY[cat.slug];
  const blocks =
    builderKey && (PAGE_KEYS as readonly string[]).includes(builderKey) ? await getPageBlocks(builderKey as never) : [];

  return (
    <>
      <Breadcrumbs items={[{ name: cat.name, path: `/${cat.slug}` }]} />
      {blocks.length > 0 ? <BlockRenderer blocks={blocks} /> : <CategoryOverview category={cat} />}
    </>
  );
}
