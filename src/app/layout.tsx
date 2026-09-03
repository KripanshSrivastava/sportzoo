import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { getBusinessSettings } from "@/lib/businessSettings";
import { getNavModel } from "@/lib/navData";
import { SiteConfigProvider } from "@/components/providers/SiteConfigProvider";
import { NavProvider } from "@/components/providers/NavProvider";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/components/seo/JsonLd";
import { AnalyticsScripts } from "@/components/seo/AnalyticsScripts";

const barlow = Barlow({
  variable: "--font-barlow",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Display face — headings only use 600/700.
const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  weight: ["600", "700"],
  subsets: ["latin"],
  display: "swap",
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
    // Favicon comes from src/app/icon.png + src/app/apple-icon.png (Next.js file convention).
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [settings, navModel] = await Promise.all([getBusinessSettings(), getNavModel()]);

  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteConfigProvider value={settings}>
          <NavProvider value={navModel}>
            <JsonLd data={organizationJsonLd(settings)} />
            <JsonLd data={websiteJsonLd(settings)} />
            <AnalyticsScripts />
            <SiteChrome>{children}</SiteChrome>
          </NavProvider>
        </SiteConfigProvider>
      </body>
    </html>
  );
}
