"use client";

import Link from "next/link";
import { siteConfig, targetCities, isLiveLink } from "@/config/site";
import { eventsDropdown, artistDropdown, venueDropdown, rentalsDropdown } from "@/config/nav";
import { trackEvent } from "@/lib/analytics";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";

const linkStyle = { color: "var(--color-neutral-400)" };
const headingStyle = { color: "var(--color-neutral-100)" };

const socialLinks = [
  {
    key: "linkedin",
    href: siteConfig.social.linkedin,
    label: "LinkedIn",
    path: "M19 3A2 2 0 0121 5v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.34 18.34V10.5H5.67v7.84h2.67zM7 9.4a1.55 1.55 0 100-3.1 1.55 1.55 0 000 3.1zm11.34 8.94v-4.3c0-2.3-1.23-3.37-2.87-3.37a2.47 2.47 0 00-2.24 1.23h-.03V10.5h-2.56c.03.72 0 7.84 0 7.84h2.56v-4.38c0-.23.02-.47.09-.63.19-.47.62-.96 1.35-.96.96 0 1.34.73 1.34 1.79v4.18h2.36z",
  },
  {
    key: "instagram",
    href: siteConfig.social.instagram,
    label: "Instagram",
    path: "M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.5.5.87 1.05 1.15 1.76.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 01-1.15 1.76 4.9 4.9 0 01-1.76 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.76-1.15 4.9 4.9 0 01-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76a4.9 4.9 0 011.76-1.15c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 1.8c-2.67 0-2.99.01-4.04.06-.86.04-1.33.18-1.64.3-.41.16-.71.35-1.02.66-.31.31-.5.61-.66 1.02-.12.31-.26.78-.3 1.64C4.29 8.53 4.28 8.85 4.28 12s.01 3.47.06 4.52c.04.86.18 1.33.3 1.64.16.41.35.71.66 1.02.31.31.61.5 1.02.66.31.12.78.26 1.64.3 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.86-.04 1.33-.18 1.64-.3.41-.16.71-.35 1.02-.66.31-.31.5-.61.66-1.02.12-.31.26-.78.3-1.64.05-1.05.06-1.37.06-4.52s-.01-3.47-.06-4.52c-.04-.86-.18-1.33-.3-1.64a2.75 2.75 0 00-.66-1.02 2.75 2.75 0 00-1.02-.66c-.31-.12-.78-.26-1.64-.3C14.99 3.81 14.67 3.8 12 3.8zm0 3.06a5.14 5.14 0 110 10.28 5.14 5.14 0 010-10.28zm0 1.8a3.34 3.34 0 100 6.68 3.34 3.34 0 000-6.68zm5.34-1.98a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z",
  },
  {
    key: "facebook",
    href: siteConfig.social.facebook,
    label: "Facebook",
    path: "M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.56c0-.86.24-1.44 1.47-1.44h1.57V4.47C16.24 4.4 15.32 4.32 14.24 4.32c-2.24 0-3.77 1.37-3.77 3.87v2.15H7.9v2.96h2.57V21h3.03z",
  },
  {
    key: "youtube",
    href: siteConfig.social.youtube,
    label: "YouTube",
    path: "M23.5 6.5s-.23-1.64-.94-2.36c-.9-.94-1.9-.94-2.36-1C17 3 12 3 12 3h-.01s-5 0-8.19.14c-.46.06-1.46.06-2.36 1C.73 4.86.5 6.5.5 6.5S.27 8.42.27 10.34v1.8c0 1.92.23 3.84.23 3.84s.23 1.64.94 2.36c.9.94 2.08.9 2.6 1C5.9 19.5 12 19.6 12 19.6s5.01-.01 8.2-.15c.46-.06 1.46-.06 2.36-1 .71-.72.94-2.36.94-2.36s.23-1.92.23-3.84v-1.8c0-1.92-.23-3.84-.23-3.84zM9.7 14.16V7.9l5.6 3.14-5.6 3.12z",
  },
] as const;

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

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {socialLinks
            .filter((s) => isLiveLink(s.href))
            .map((s) => (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${siteConfig.brand} on ${s.label}`}
                onClick={() => trackEvent("social_click", { network: s.key, source: "footer" })}
                style={{ color: "var(--color-neutral-400)" }}
                className="transition-colors hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          {isLiveLink(siteConfig.google.profileUrl) && (
            <a
              href={siteConfig.google.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("social_click", { network: "google", source: "footer" })}
              style={{ color: "var(--color-neutral-400)" }}
              className="transition-colors hover:text-white"
            >
              Google Reviews
            </a>
          )}
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
