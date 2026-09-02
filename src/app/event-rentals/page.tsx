import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getPageBlocks } from "@/lib/pageBlocksData";

// ISR: served from cache; admin saves call revalidateSite() to push changes live immediately.
export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Event Rentals & Equipment for Corporate Events | Elephant Corporate",
  description:
    "Elephant Corporate rents and manages AV equipment, decor and branding, and engagement activities for corporate events — staffed on-site, not just dropped off.",
  path: "/event-rentals",
});

export default async function EventRentalsPage() {
  const blocks = await getPageBlocks("event-rentals-overview");
  return (
    <>
      <Breadcrumbs items={[{ name: "Event Rentals & Equipment", path: "/event-rentals" }]} />
      <BlockRenderer blocks={blocks} />
    </>
  );
}
