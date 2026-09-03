import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getPublishedBlogPosts } from "@/lib/blogData";
import { getPublishedEvents } from "@/lib/eventsData";
import { getServicePagesForCategory } from "@/lib/servicePagesData";
import { getServiceCategories } from "@/lib/serviceCategoriesData";
import { getPublishedCities } from "@/lib/citiesData";
import { getPublishedCaseStudies } from "@/lib/caseStudiesData";
import { getHiddenPaths } from "@/lib/hiddenPages";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "",
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

  const categories = await getServiceCategories();
  const categoryPaths = categories.map((c) => `/${c.slug}`);
  const servicesByCategory = await Promise.all(categories.map((c) => getServicePagesForCategory(c.slug)));
  const servicePaths = servicesByCategory.flat().map((s) => `/${s.parentSlug}/${s.slug}`);

  const cities = await getPublishedCities();
  const cityPaths = cities.map((c) => `/corporate-event-management/${c.slug}`);

  const blogPaths = (await getPublishedBlogPosts()).map((p) => `/blog/${p.slug}`);
  const events = await getPublishedEvents();
  const eventPaths = events.map((ev) => `/events/${ev.slug}`);
  const caseStudyPaths = (await getPublishedCaseStudies()).map((c) => `/case-studies/${c.slug}`);

  const hidden = new Set(await getHiddenPaths());
  const allPaths = [
    ...staticPaths,
    ...categoryPaths,
    ...servicePaths,
    ...cityPaths,
    ...blogPaths,
    ...eventPaths,
    ...caseStudyPaths,
  ].filter((p) => !hidden.has(p));

  return allPaths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/blog") ? 0.6 : 0.8,
  }));
}
