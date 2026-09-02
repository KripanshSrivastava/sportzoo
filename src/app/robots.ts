import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { isProduction } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    // Preview / development deployments: keep the whole thing out of search.
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin", "/thank-you"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
