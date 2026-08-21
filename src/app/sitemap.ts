import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { blogPosts } from "@/content/blog";
import { getPublishedEvents } from "@/lib/eventsData";
import { getServicePagesForCategory } from "@/lib/servicePagesData";
import { getPublishedCities } from "@/lib/citiesData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "",
    "/corporate-events",
    "/artist-booking",
    "/venue-booking",
    "/event-rentals",
    "/events",
    "/about",
    "/blog",
    "/request-a-quote",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
  ];

  const serviceCategories = ["corporate-events", "artist-booking", "venue-booking", "event-rentals"] as const;
  const servicesByCategory = await Promise.all(serviceCategories.map((c) => getServicePagesForCategory(c)));
  const servicePaths = servicesByCategory.flat().map((s) => `/${s.parentSlug}/${s.slug}`);

  const cities = await getPublishedCities();
  const cityPaths = cities.map((c) => `/corporate-event-management/${c.slug}`);

  const blogPaths = blogPosts.map((p) => `/blog/${p.slug}`);
  const events = await getPublishedEvents();
  const eventPaths = events.map((ev) => `/events/${ev.slug}`);

  const allPaths = [...staticPaths, ...servicePaths, ...cityPaths, ...blogPaths, ...eventPaths];

  return allPaths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/blog") ? 0.6 : 0.8,
  }));
}
