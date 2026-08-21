import type { MetadataRoute } from "next";
import { siteConfig, targetCities } from "@/config/site";
import { allServices } from "@/config/services";
import { blogPosts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/corporate-events",
    "/artist-booking",
    "/venue-booking",
    "/event-rentals",
    "/about",
    "/blog",
    "/request-a-quote",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
  ];

  const servicePaths = allServices.map((s) => `/${s.parentSlug}/${s.slug}`);
  const cityPaths = targetCities.map((c) => `/corporate-event-management/${c.slug}`);
  const blogPaths = blogPosts.map((p) => `/blog/${p.slug}`);

  const allPaths = [...staticPaths, ...servicePaths, ...cityPaths, ...blogPaths];

  return allPaths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/blog") ? 0.6 : 0.8,
  }));
}
