import { notFound } from "next/navigation";
import { PAGE_KEYS, type PageKey } from "@/lib/pageKeys";
import { PageBuilderEditor } from "@/components/admin/PageBuilderEditor";

const LABEL_BY_KEY: Record<PageKey, string> = {
  home: "Home",
  about: "About",
  contact: "Contact",
  "corporate-events-overview": "Corporate Events (overview page)",
  "artist-booking-overview": "Artist Booking (overview page)",
  "venue-booking-overview": "Venue Booking (overview page)",
  "event-rentals-overview": "Event Rentals (overview page)",
};

export default async function EditPageBlocksPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!PAGE_KEYS.includes(key as PageKey)) notFound();
  const pageKey = key as PageKey;

  return (
    <div>
      <h1>Edit {LABEL_BY_KEY[pageKey]}</h1>
      <p className="text-muted mb-6 text-sm">
        Drag the ⠿ handle to reorder sections, click Edit to change a section&apos;s text and photos, or add/remove
        sections entirely.
      </p>
      <PageBuilderEditor pageKey={pageKey} />
    </div>
  );
}
