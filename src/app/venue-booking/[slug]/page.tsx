import { notFound } from "next/navigation";
import { venueBookingServices } from "@/config/services";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return venueBookingServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = venueBookingServices.find((s) => s.slug === slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/venue-booking/${service.slug}`,
  });
}

export default async function VenueBookingServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = venueBookingServices.find((s) => s.slug === slug);
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
