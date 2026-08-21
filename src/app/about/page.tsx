import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getPageBlocks } from "@/lib/pageBlocksData";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "About Elephant Corporate | Corporate Event Management Company",
  description:
    "Elephant Corporate is a corporate event management company built for HR, admin, and founders' teams who need one accountable partner for events, artists, venues, and rentals — not five vendors.",
  path: "/about",
});

export default async function AboutPage() {
  const blocks = await getPageBlocks("about");
  return (
    <>
      <Breadcrumbs items={[{ name: "About", path: "/about" }]} />
      <BlockRenderer blocks={blocks} />
    </>
  );
}
