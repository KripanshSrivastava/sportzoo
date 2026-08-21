import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getPageBlocks } from "@/lib/pageBlocksData";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Artist Booking & Entertainment for Corporate Events | Elephant Corporate",
  description:
    "Elephant Corporate books singers, bands, DJs, anchors, speakers, and comedians for corporate events — vetted, briefed, and coordinated end to end.",
  path: "/artist-booking",
});

export default async function ArtistBookingPage() {
  const blocks = await getPageBlocks("artist-booking-overview");
  return (
    <>
      <Breadcrumbs items={[{ name: "Artist Booking & Entertainment", path: "/artist-booking" }]} />
      <BlockRenderer blocks={blocks} />
    </>
  );
}
