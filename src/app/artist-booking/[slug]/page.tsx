import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { buildMetadata } from "@/lib/seo";
import { getServicePageBySlug } from "@/lib/servicePagesData";
import { artistBookingServices } from "@/config/services";

// ISR: served from cache; admin saves call revalidateSite() to push changes live immediately.
export const revalidate = 3600;

export function generateStaticParams() {
  return artistBookingServices.map((s) => ({ slug: s.slug }));
}

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
