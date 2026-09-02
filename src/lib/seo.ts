import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { isProduction } from "@/lib/env";

interface PageMetaInput {
  title: string;
  description: string;
  path: string; // e.g. "/corporate-events/corporate-offsite-planning"
  noIndex?: boolean;
  ogImage?: string;
}

const isProd = isProduction;

export function buildMetadata({ title, description, path, noIndex, ogImage }: PageMetaInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  const image = ogImage ?? `${siteConfig.url}/og-default`;
  const shouldIndex = isProd && !noIndex;

  // Callers may or may not already include the brand suffix — normalise to
  // exactly one, since the root layout's title template is bypassed below.
  const fullTitle = title.includes(siteConfig.brand) ? title : `${title} | ${siteConfig.brand}`;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    robots: {
      index: shouldIndex,
      follow: shouldIndex,
      googleBot: {
        index: shouldIndex,
        follow: shouldIndex,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.brand,
      locale: "en_IN",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
