import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { buildMetadata } from "@/lib/seo";
import { getServicePageBySlug, getServicePagesForCategory } from "@/lib/servicePagesData";
import { getServiceCategories, getServiceCategoryBySlug } from "@/lib/serviceCategoriesData";

// ISR: served from cache; admin saves call revalidateSite() to push changes live immediately.
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const cats = await getServiceCategories();
  const params: { category: string; slug: string }[] = [];
  for (const c of cats) {
    const services = await getServicePagesForCategory(c.slug);
    for (const s of services) params.push({ category: c.slug, slug: s.slug });
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const service = await getServicePageBySlug(category, slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/${category}/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const cat = await getServiceCategoryBySlug(category);
  if (!cat) notFound();

  const service = await getServicePageBySlug(category, slug);
  if (!service) notFound();

  const related = (await getServicePagesForCategory(category))
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3)
    .map((s) => ({ slug: s.slug, name: s.name, parentSlug: category }));

  return <ServicePageTemplate service={service} categoryName={cat.name} related={related} />;
}
