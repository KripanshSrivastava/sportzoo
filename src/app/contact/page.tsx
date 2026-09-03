import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { isPathHidden } from "@/lib/hiddenPages";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getPageBlocks } from "@/lib/pageBlocksData";
import { siteConfig } from "@/config/site";
import { getBusinessSettings } from "@/lib/businessSettings";

// ISR: served from cache; admin saves call revalidateSite() to push changes live immediately.
export const revalidate = 3600;

export async function generateMetadata() {
  const settings = await getBusinessSettings();
  return buildMetadata({
    title: `Contact ${settings.brand} | Corporate Events, Artists, Venues & Rentals`,
    description: `Contact ${settings.brand} for corporate event management, artist booking, venue booking, and event rental enquiries in ${settings.primaryCity} and across India.`,
    path: "/contact",
  });
}

export default async function ContactPage() {
  if (await isPathHidden("/contact")) notFound();

  const settings = await getBusinessSettings();
  const blocks = await getPageBlocks("contact");
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: `Contact ${settings.brand}`,
          url: `${siteConfig.url}/contact`,
        }}
      />
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
      <BlockRenderer blocks={blocks} />
    </>
  );
}
