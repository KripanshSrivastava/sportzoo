import Link from "next/link";
import { PAGE_KEYS } from "@/lib/pageKeys";

const LABEL_BY_KEY: Record<string, string> = {
  home: "Home",
  about: "About",
  contact: "Contact",
  "corporate-events-overview": "Corporate Events (overview page)",
  "artist-booking-overview": "Artist Booking (overview page)",
  "venue-booking-overview": "Venue Booking (overview page)",
  "event-rentals-overview": "Event Rentals (overview page)",
};

const PATH_BY_KEY: Record<string, string> = {
  home: "/",
  about: "/about",
  contact: "/contact",
  "corporate-events-overview": "/corporate-events",
  "artist-booking-overview": "/artist-booking",
  "venue-booking-overview": "/venue-booking",
  "event-rentals-overview": "/event-rentals",
};

export default function AdminPagesPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="m-0">Pages</h1>
        <p className="text-muted text-sm">
          Drag to reorder sections, edit each section&apos;s content and photos, or add/remove sections entirely —
          like editing a page in WordPress.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {PAGE_KEYS.map((key) => (
          <div key={key} className="card flex items-center justify-between p-4">
            <div>
              <p className="m-0 text-sm font-semibold">{LABEL_BY_KEY[key]}</p>
              <p className="text-muted m-0 text-xs">{PATH_BY_KEY[key]}</p>
            </div>
            <Link href={`/admin/pages/${key}`} className="btn btn-secondary">
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
