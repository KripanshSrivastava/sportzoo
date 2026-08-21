import { buildMetadata } from "@/lib/seo";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getPageBlocks } from "@/lib/pageBlocksData";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

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
