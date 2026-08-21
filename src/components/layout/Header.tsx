"use client";

import { useState } from "react";
import Link from "next/link";
import { mainNav } from "@/config/nav";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur"
      style={{
        background: "color-mix(in srgb, var(--color-bg) 92%, transparent)",
        borderBottom: "1px solid var(--color-divider)",
      }}
    >
      <div className="container-page flex h-16 items-center gap-4 sm:h-20">
        <Link
          href="/"
          className="mr-auto flex items-center gap-2 text-lg font-semibold"
          style={{ color: "var(--color-text)", fontFamily: "var(--font-heading)" }}
        >
          <span
            className="flex h-7 w-7 items-center justify-center text-lg font-semibold"
            style={{ border: "1px solid var(--color-accent)", color: "var(--color-accent)" }}
          >
            S
          </span>
          {siteConfig.brand}
        </Link>

        <nav className="hidden items-stretch gap-4 self-stretch xl:flex" aria-label="Primary">
          {mainNav.map((item) => (
            <div key={item.href} className="group relative flex shrink-0 items-center">
              <Link href={item.href} className="flex items-center gap-1 py-2 whitespace-nowrap">
                {item.label}
                {item.dropdown && (
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 opacity-60" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </Link>
              {item.dropdown && (
                // display:none (not visibility/opacity) so the closed panel can't
                // inflate this flex item's intrinsic width — see header overflow fix.
                <div
                  className="blueprint absolute left-0 top-full z-50 hidden w-72 group-hover:block group-focus-within:block"
                  style={{ background: "var(--color-bg)", boxShadow: "var(--shadow-md)", padding: "8px" }}
                >
                  {item.dropdown.map((d) => (
                    <Link key={d.href} href={d.href} className="block px-3 py-2 text-sm" style={{ color: "var(--color-neutral-700)" }}>
                      {d.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3.5 xl:flex" style={{ marginLeft: "16px" }}>
          <a
            href={siteConfig.phoneHref}
            data-cta="call"
            data-location="header"
            onClick={() => trackEvent("call_click", { source: "header" })}
            className="text-sm font-medium"
            style={{ color: "var(--color-text)" }}
          >
            Call Us
          </a>
          <Link
            href="/request-a-quote"
            data-cta="quote"
            data-location="header"
            onClick={() => trackEvent("quote_button_click", { source: "header" })}
            className="btn btn-primary"
          >
            Request a Quote
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center xl:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          style={{ color: "var(--color-text)" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="xl:hidden" style={{ borderTop: "1px solid var(--color-divider)", background: "var(--color-bg)" }}>
          <nav className="container-page flex flex-col gap-1 py-3" aria-label="Mobile primary">
            {mainNav.map((item) => (
              <div key={item.href}>
                <div className="flex items-center justify-between">
                  <Link href={item.href} className="flex-1 py-2.5 text-sm font-medium" onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <button
                      type="button"
                      aria-label={`Toggle ${item.label} submenu`}
                      className="px-3 py-2.5 text-muted"
                      onClick={() => setMobileDropdown((cur) => (cur === item.href ? null : item.href))}
                    >
                      {mobileDropdown === item.href ? "−" : "+"}
                    </button>
                  )}
                </div>
                {item.dropdown && mobileDropdown === item.href && (
                  <div className="ml-3 flex flex-col gap-0.5 pl-3" style={{ borderLeft: "1px solid var(--color-divider)" }}>
                    {item.dropdown.map((d) => (
                      <Link key={d.href} href={d.href} className="py-2 text-sm text-muted" onClick={() => setOpen(false)}>
                        {d.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/request-a-quote" className="btn btn-primary btn-block text-center" onClick={() => setOpen(false)}>
              Request a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
