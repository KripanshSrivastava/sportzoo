import { notFound } from "next/navigation";
import { artistBookingServices } from "@/config/services";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return artistBookingServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = artistBookingServices.find((s) => s.slug === slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/artist-booking/${service.slug}`,
  });
}

export default async function ArtistBookingServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = artistBookingServices.find((s) => s.slug === slug);
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
