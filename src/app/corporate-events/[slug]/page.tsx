import { notFound } from "next/navigation";
import { corporateEventServices } from "@/config/services";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return corporateEventServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = corporateEventServices.find((s) => s.slug === slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/corporate-events/${service.slug}`,
  });
}

export default async function CorporateEventServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = corporateEventServices.find((s) => s.slug === slug);
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
