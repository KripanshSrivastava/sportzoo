import { cache } from "react";
import { getServiceCategories } from "@/lib/serviceCategoriesData";
import { getServicePagesForCategory } from "@/lib/servicePagesData";
import { getHiddenPaths } from "@/lib/hiddenPages";

export interface NavLink {
  href: string;
  label: string;
}

export interface NavCategory {
  slug: string;
  name: string;
  href: string;
  services: NavLink[];
}

export interface NavModel {
  categories: NavCategory[];
  /** Paths the owner has hidden — the header/footer drop links to these. */
  hiddenPaths: string[];
}

/** The category → service tree used to build the header nav and footer link columns. */
export const getNavModel = cache(async (): Promise<NavModel> => {
  const [categories, hiddenPaths] = await Promise.all([getServiceCategories(), getHiddenPaths()]);
  const withServices = await Promise.all(
    categories.map(async (c): Promise<NavCategory> => {
      const services = await getServicePagesForCategory(c.slug);
      return {
        slug: c.slug,
        name: c.name,
        href: `/${c.slug}`,
        services: services.map((s) => ({ href: `/${c.slug}/${s.slug}`, label: s.name })),
      };
    })
  );
  return { categories: withServices, hiddenPaths };
});
