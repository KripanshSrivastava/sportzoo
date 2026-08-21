import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getPageBlocks } from "@/lib/pageBlocksData";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Corporate Venue Booking & Management | Elephant Corporate",
  description:
    "Elephant Corporate sources and books conference halls, offsite resorts, and banquet venues for corporate events — capacity and AV verified before you commit.",
  path: "/venue-booking",
});

export default async function VenueBookingPage() {
  const blocks = await getPageBlocks("venue-booking-overview");
  return (
    <>
      <Breadcrumbs items={[{ name: "Venue Booking & Management", path: "/venue-booking" }]} />
      <BlockRenderer blocks={blocks} />
    </>
  );
}
