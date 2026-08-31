"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { siteConfig, targetCities } from "@/config/site";
import { eventsDropdown, artistDropdown, venueDropdown, rentalsDropdown } from "@/config/nav";
import { trackEvent } from "@/lib/analytics";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";

const linkStyle = { color: "var(--color-neutral-400)" };
const headingStyle = { color: "var(--color-neutral-100)" };

const SOCIAL_ICONS: Record<string, ReactNode> = {
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.4 8.65 22 11.1 22 14.3V21h-4v-6c0-1.43-.03-3.27-2-3.27-2 0-2.3 1.56-2.3 3.17V21h-4V9Z" />
  ),
  instagram: (
    <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5.01-4.74.07-.9.04-1.38.2-1.7.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.12.32-.28.8-.32 1.7C3.43 8.5 3.42 8.85 3.42 12s.01 3.5.07 4.74c.04.9.2 1.38.32 1.7.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.12.8.28 1.7.32 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.38-.2 1.7-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.12-.32.28-.8.32-1.7.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.9-.2-1.38-.32-1.7a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.32-.12-.8-.28-1.7-.32C15.5 4.01 15.15 4 12 4Zm0 3.06A4.94 4.94 0 1 1 12 17a4.94 4.94 0 0 1 0-9.88Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.03-.9a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />
  ),
  facebook: (
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
  ),
  youtube: (
    <path d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 3.9 12 3.9 12 3.9s-7.5 0-9.4.5A3 3 0 0 0 .5 6.5C0 8.4 0 12 0 12s0 3.6.5 5.5a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.6 24 12 24 12s0-3.6-.5-5.5ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
  ),
};

function SocialIcon({ href, label, path }: { href: string; label: string; path: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="transition-opacity hover:opacity-70"
      style={{ color: "var(--color-neutral-400)" }}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        {path}
      </svg>
    </a>
  );
}

export function Footer() {
  const settings = useSiteConfig();
  const year = new Date().getFullYear();

  const socialLinks = [
    { key: "linkedin", label: "LinkedIn", href: settings.linkedinUrl },
    { key: "instagram", label: "Instagram", href: settings.instagramUrl },
    { key: "facebook", label: "Facebook", href: settings.facebookUrl },
    { key: "youtube", label: "YouTube", href: settings.youtubeUrl },
  ].filter((s) => s.href);

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
          {(socialLinks.length > 0 || settings.googleBusinessUrl) && (
            <div className="mt-4 flex items-center gap-4">
              {socialLinks.map((s) => (
                <SocialIcon key={s.key} href={s.href} label={s.label} path={SOCIAL_ICONS[s.key]} />
              ))}
              {settings.googleBusinessUrl && (
                <a
                  href={settings.googleBusinessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] hover:underline"
                  style={{ color: "var(--color-accent-300)" }}
                >
                  Google Reviews
                  {settings.googleRating ? ` ★ ${settings.googleRating}` : ""}
                </a>
              )}
            </div>
          )}
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
