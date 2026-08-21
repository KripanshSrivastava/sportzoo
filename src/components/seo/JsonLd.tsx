import { siteConfig } from "@/config/site";
import type { BusinessSettings } from "@/lib/businessSettings";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function organizationJsonLd(settings: BusinessSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#organization`,
    name: settings.brand,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    description: settings.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.officeAddress,
      addressLocality: settings.primaryCity,
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: settings.phone,
      email: settings.email,
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    sameAs: Object.values(siteConfig.social).filter((v) => v && !v.startsWith("[") && v !== "#"),
  };
}

export function websiteJsonLd(settings: BusinessSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: settings.brand,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceJsonLd(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: `${siteConfig.url}${input.path}`,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: "IN",
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: `${siteConfig.url}${input.path}`,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: { "@type": "Organization", name: input.authorName },
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}
