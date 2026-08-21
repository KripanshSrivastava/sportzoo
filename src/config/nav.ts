import { corporateEventServices, artistBookingServices, venueBookingServices, eventRentalServices } from "./services";

export const eventsDropdown = [
  { href: "/corporate-events", label: "Corporate Events Overview" },
  ...corporateEventServices.map((s) => ({
    href: `/corporate-events/${s.slug}`,
    label: s.name,
  })),
];

export const artistDropdown = [
  { href: "/artist-booking", label: "Artist Booking Overview" },
  ...artistBookingServices.map((s) => ({
    href: `/artist-booking/${s.slug}`,
    label: s.name,
  })),
];

export const venueDropdown = [
  { href: "/venue-booking", label: "Venue Booking Overview" },
  ...venueBookingServices.map((s) => ({
    href: `/venue-booking/${s.slug}`,
    label: s.name,
  })),
];

export const rentalsDropdown = [
  { href: "/event-rentals", label: "Event Rentals Overview" },
  ...eventRentalServices.map((s) => ({
    href: `/event-rentals/${s.slug}`,
    label: s.name,
  })),
];

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/corporate-events", label: "Corporate Events", dropdown: eventsDropdown },
  { href: "/artist-booking", label: "Artist Booking", dropdown: artistDropdown },
  { href: "/venue-booking", label: "Venue Booking", dropdown: venueDropdown },
  { href: "/event-rentals", label: "Event Rentals", dropdown: rentalsDropdown },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export const footerServiceLinks = eventsDropdown
  .slice(1)
  .concat(artistDropdown.slice(1), venueDropdown.slice(1), rentalsDropdown.slice(1));
