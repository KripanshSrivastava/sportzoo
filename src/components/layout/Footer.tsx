"use client";

import Link from "next/link";
import { siteConfig, targetCities } from "@/config/site";
import { eventsDropdown, artistDropdown, venueDropdown, rentalsDropdown } from "@/config/nav";
import { trackEvent } from "@/lib/analytics";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";

const linkStyle = { color: "var(--color-neutral-400)" };
const headingStyle = { color: "var(--color-neutral-100)" };

export function Footer() {
  const settings = useSiteConfig();
  const year = new Date().getFullYear();

  return (
    <footer
      id="site-footer"
      className="px-6 pb-24 pt-16 text-sm sm:pb-16"
      style={{ background: "var(--color-accent-900)", color: "var(--color-neutral-300)" }}
    >
      <div className="container-page grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
        <div className="sm:col-span-2 lg:col-span-2">
          <p className="m-0 text-xl" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--color-neutral-100)" }}>
            {settings.brand}
          </p>
          <p className="mt-3 max-w-[280px] text-[13px] leading-relaxed" style={{ color: "var(--color-neutral-400)" }}>
            {settings.description}
          </p>
          <div className="mt-4 flex flex-col gap-1.5 text-[13px]" style={{ color: "var(--color-neutral-400)" }}>
            <a href={settings.phoneHref} className="hover:underline" style={{ color: "inherit" }}>
              {settings.phone}
            </a>
            <a href={`mailto:${settings.email}`} className="hover:underline" style={{ color: "inherit" }}>
              {settings.email}
            </a>
          </div>
        </div>

        <div>
          <h6 style={headingStyle}>Corporate Events</h6>
          <div className="mt-3 flex flex-col gap-2 text-[13px]">
            {eventsDropdown.map((l) => (
              <Link key={l.href} href={l.href} style={linkStyle}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h6 style={headingStyle}>Artist Booking</h6>
          <div className="mt-3 flex flex-col gap-2 text-[13px]">
            {artistDropdown.map((l) => (
              <Link key={l.href} href={l.href} style={linkStyle}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h6 style={headingStyle}>Venue &amp; Rentals</h6>
          <div className="mt-3 flex flex-col gap-2 text-[13px]">
            {venueDropdown.map((l) => (
              <Link key={l.href} href={l.href} style={linkStyle}>
                {l.label}
              </Link>
            ))}
            {rentalsDropdown.map((l) => (
              <Link key={l.href} href={l.href} style={linkStyle}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h6 style={headingStyle}>Company</h6>
          <div className="mt-3 flex flex-col gap-2 text-[13px]">
            <Link href="/about" style={linkStyle}>
              About
            </Link>
            <Link href="/case-studies" style={linkStyle}>
              Our Work
            </Link>
            <Link href="/gallery" style={linkStyle}>
              Gallery
            </Link>
            <Link href="/blog" style={linkStyle}>
              Blog &amp; Resources
            </Link>
            <Link href="/contact" style={linkStyle}>
              Contact
            </Link>
            <Link
              href="/request-a-quote"
              onClick={() => trackEvent("quote_button_click", { source: "footer" })}
              className="font-semibold"
              style={{ color: "var(--color-accent-300)" }}
            >
              Request a Quote
            </Link>
          </div>
          <h6 className="mt-5" style={headingStyle}>
            Service Locations
          </h6>
          <div className="mt-3 flex flex-col gap-2 text-[13px]">
            {targetCities.map((c) => (
              <Link key={c.slug} href={`/corporate-event-management/${c.slug}`} style={linkStyle}>
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        className="container-page mt-10 flex flex-col gap-3 pt-5 text-xs sm:flex-row sm:items-center sm:justify-between"
        style={{ borderTop: "1px solid color-mix(in srgb, var(--color-neutral-100) 15%, transparent)", color: "var(--color-neutral-500)" }}
      >
        <p className="m-0">
          &copy; {year} {siteConfig.legalName}. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/privacy-policy" style={{ color: "inherit" }}>
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" style={{ color: "inherit" }}>
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
