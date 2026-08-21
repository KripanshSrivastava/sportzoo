import { notFound } from "next/navigation";
import { eventRentalServices } from "@/config/services";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return eventRentalServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = eventRentalServices.find((s) => s.slug === slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/event-rentals/${service.slug}`,
  });
}

export default async function EventRentalsServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = eventRentalServices.find((s) => s.slug === slug);
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
