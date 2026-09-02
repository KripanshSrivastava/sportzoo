import { buildMetadata } from "@/lib/seo";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getPageBlocks } from "@/lib/pageBlocksData";
import { siteConfig } from "@/config/site";

// ISR: served from cache; admin saves call revalidateSite() to push changes live immediately.
export const revalidate = 3600;

export const metadata = buildMetadata({
  title: `Corporate Event Management Company | ${siteConfig.brand}`,
  description:
    "Elephant Corporate is a corporate event management company serving companies across India — offsites, annual day, rewards ceremonies, artist booking, venue booking, and event rentals.",
  path: "/",
});

export default async function HomePage() {
  const blocks = await getPageBlocks("home");
  return <BlockRenderer blocks={blocks} />;
}
