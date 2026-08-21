import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getPageBlocks } from "@/lib/pageBlocksData";
import { siteConfig } from "@/config/site";
import { getBusinessSettings } from "@/lib/businessSettings";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const settings = await getBusinessSettings();
  return buildMetadata({
    title: `Contact ${settings.brand} | Corporate Events, Artists, Venues & Rentals`,
    description: `Contact ${settings.brand} for corporate event management, artist booking, venue booking, and event rental enquiries in ${settings.primaryCity} and across India.`,
    path: "/contact",
  });
}

export default async function ContactPage() {
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
