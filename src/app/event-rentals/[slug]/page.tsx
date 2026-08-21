import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { buildMetadata } from "@/lib/seo";
import { getServicePageBySlug } from "@/lib/servicePagesData";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServicePageBySlug("event-rentals", slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/event-rentals/${service.slug}`,
  });
}

export default async function EventRentalsServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServicePageBySlug("event-rentals", slug);
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
