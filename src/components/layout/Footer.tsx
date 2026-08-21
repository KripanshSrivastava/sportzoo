"use client";

import Link from "next/link";
import { siteConfig, targetCities } from "@/config/site";
import { eventsDropdown, artistDropdown, venueDropdown, rentalsDropdown } from "@/config/nav";
import { trackEvent } from "@/lib/analytics";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="bg-[color:var(--color-navy-950)] pb-20 pt-16 text-slate-300 sm:pb-16">
      <div className="container-page grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
        <div className="sm:col-span-2 lg:col-span-2">
          <span className="text-xl font-bold tracking-tight text-white">{siteConfig.brand}</span>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">{siteConfig.description}</p>
          <div className="mt-5 space-y-2 text-sm">
            <p>
              <a href={siteConfig.phoneHref} className="hover:text-white">
                {siteConfig.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </p>
            <p className="text-slate-400">{siteConfig.officeAddress}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Corporate Events</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {eventsDropdown.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-slate-400 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Artist Booking</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {artistDropdown.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-slate-400 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Venue Booking</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {venueDropdown.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-slate-400 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-white">Event Rentals</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {rentalsDropdown.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-slate-400 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Company</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/about" className="text-slate-400 hover:text-white">
                About Sportzoo
              </Link>
            </li>
            <li>
              <Link href="/case-studies" className="text-slate-400 hover:text-white">
                Our Work
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="text-slate-400 hover:text-white">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-slate-400 hover:text-white">
                Blog & Resources
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-slate-400 hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/request-a-quote"
                onClick={() => trackEvent("quote_button_click", { source: "footer" })}
                className="font-semibold text-[color:var(--color-accent)] hover:text-white"
              >
                Request a Quote
              </Link>
            </li>
          </ul>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-white">Service Locations</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {targetCities.map((c) => (
              <li key={c.slug}>
                <Link href={`/corporate-event-management/${c.slug}`} className="text-slate-400 hover:text-white">
                  Events in {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {year} {siteConfig.legalName}. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/privacy-policy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="hover:text-white">
            Terms and Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
