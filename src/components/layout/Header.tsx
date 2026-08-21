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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[color:var(--color-navy-900)] text-lg font-bold text-white sm:h-10 sm:w-10">
            S
          </span>
          <span className="text-xl font-bold tracking-tight text-[color:var(--color-navy-900)] sm:text-2xl">
            {siteConfig.brand}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {mainNav.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-[color:var(--color-navy-900)]"
              >
                {item.label}
                {item.dropdown && (
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </Link>
              {item.dropdown && (
                <div className="invisible absolute left-0 top-full z-50 w-72 rounded-lg border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {item.dropdown.map((d) => (
                    <Link
                      key={d.href}
                      href={d.href}
                      className="block rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[color:var(--color-navy-900)]"
                    >
                      {d.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={siteConfig.phoneHref}
            data-cta="call"
            data-location="header"
            onClick={() => trackEvent("call_click", { source: "header" })}
            className="text-sm font-semibold text-slate-700 hover:text-[color:var(--color-navy-900)]"
          >
            {siteConfig.phone}
          </a>
          <Link
            href="/request-a-quote"
            data-cta="quote"
            data-location="header"
            onClick={() => trackEvent("quote_button_click", { source: "header" })}
            className="rounded-md bg-[color:var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--color-accent-dark)]"
          >
            Request a Quote
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-slate-700 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-3" aria-label="Mobile primary">
            {mainNav.map((item) => (
              <div key={item.href}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className="flex-1 rounded-md px-2 py-2.5 text-sm font-semibold text-slate-700"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <button
                      type="button"
                      aria-label={`Toggle ${item.label} submenu`}
                      className="px-3 py-2.5 text-slate-500"
                      onClick={() =>
                        setMobileDropdown((cur) => (cur === item.href ? null : item.href))
                      }
                    >
                      {mobileDropdown === item.href ? "−" : "+"}
                    </button>
                  )}
                </div>
                {item.dropdown && mobileDropdown === item.href && (
                  <div className="ml-3 flex flex-col gap-0.5 border-l border-slate-200 pl-3">
                    {item.dropdown.map((d) => (
                      <Link
                        key={d.href}
                        href={d.href}
                        className="rounded-md px-2 py-2 text-sm text-slate-600"
                        onClick={() => setOpen(false)}
                      >
                        {d.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/request-a-quote"
              className="mt-2 rounded-md bg-[color:var(--color-accent)] px-4 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Request a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
