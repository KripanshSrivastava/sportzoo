import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { buildMetadata } from "@/lib/seo";
import { getServicePageBySlug } from "@/lib/servicePagesData";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServicePageBySlug("venue-booking", slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/venue-booking/${service.slug}`,
  });
}

export default async function VenueBookingServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServicePageBySlug("venue-booking", slug);
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
