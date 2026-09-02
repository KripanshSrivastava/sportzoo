import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getPublishedBlogPosts } from "@/lib/blogData";
import { getPublishedEvents } from "@/lib/eventsData";
import { getServicePagesForCategory } from "@/lib/servicePagesData";
import { getPublishedCities } from "@/lib/citiesData";
import { getPublishedCaseStudies } from "@/lib/caseStudiesData";

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
    "/case-studies",
    "/gallery",
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

  const blogPaths = (await getPublishedBlogPosts()).map((p) => `/blog/${p.slug}`);
  const events = await getPublishedEvents();
  const eventPaths = events.map((ev) => `/events/${ev.slug}`);
  const caseStudyPaths = (await getPublishedCaseStudies()).map((c) => `/case-studies/${c.slug}`);

  const allPaths = [
    ...staticPaths,
    ...servicePaths,
    ...cityPaths,
    ...blogPaths,
    ...eventPaths,
    ...caseStudyPaths,
  ];

  return allPaths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/blog") ? 0.6 : 0.8,
  }));
}
