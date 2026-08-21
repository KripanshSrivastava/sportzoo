import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { buildMetadata } from "@/lib/seo";
import { getServicePageBySlug } from "@/lib/servicePagesData";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServicePageBySlug("artist-booking", slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/artist-booking/${service.slug}`,
  });
}

export default async function ArtistBookingServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServicePageBySlug("artist-booking", slug);
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
