import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getPageBlocks } from "@/lib/pageBlocksData";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Corporate Event Management Company | Elephant Corporate",
  description:
    "Elephant Corporate is a corporate event management company handling offsites, annual day, recognition ceremonies, sports days, team building, gifting, and conferences — end to end.",
  path: "/corporate-events",
});

export default async function CorporateEventsPage() {
  const blocks = await getPageBlocks("corporate-events-overview");
  return (
    <>
      <Breadcrumbs items={[{ name: "Corporate Events", path: "/corporate-events" }]} />
      <BlockRenderer blocks={blocks} />
    </>
  );
}
