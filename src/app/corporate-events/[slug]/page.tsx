import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { buildMetadata } from "@/lib/seo";
import { getServicePageBySlug } from "@/lib/servicePagesData";
import { corporateEventServices } from "@/config/services";

// ISR: served from cache; admin saves call revalidateSite() to push changes live immediately.
export const revalidate = 3600;

export function generateStaticParams() {
  return corporateEventServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServicePageBySlug("corporate-events", slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/corporate-events/${service.slug}`,
  });
}

export default async function CorporateEventServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServicePageBySlug("corporate-events", slug);
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
