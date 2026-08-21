import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { getBusinessSettings } from "@/lib/businessSettings";
import { SiteConfigProvider } from "@/components/providers/SiteConfigProvider";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/components/seo/JsonLd";
import { AnalyticsScripts } from "@/components/seo/AnalyticsScripts";

const barlow = Barlow({
  variable: "--font-barlow",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getBusinessSettings();
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${settings.brand} | ${settings.shortTagline}`,
      template: `%s | ${settings.brand}`,
    },
    description: settings.description,
    verification: siteConfig.analytics.gscVerification
      ? { google: siteConfig.analytics.gscVerification }
      : undefined,
    icons: { icon: "/favicon.ico" },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getBusinessSettings();

  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteConfigProvider value={settings}>
          <JsonLd data={organizationJsonLd()} />
          <JsonLd data={websiteJsonLd()} />
          <AnalyticsScripts />
          <SiteChrome>{children}</SiteChrome>
        </SiteConfigProvider>
      </body>
    </html>
  );
}
