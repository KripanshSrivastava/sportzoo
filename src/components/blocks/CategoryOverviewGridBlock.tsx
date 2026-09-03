import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { getServiceCategories } from "@/lib/serviceCategoriesData";
import { getServicePagesForCategory } from "@/lib/servicePagesData";

function CategoryCard({ title, blurb }: { title: string; blurb: string }) {
  return (
    <div className="card elev-sm p-3.5">
      <p className="card-title">{title}</p>
      <p className="card-body">{blurb}</p>
    </div>
  );
}

export async function CategoryOverviewGridBlock({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  const categories = await getServiceCategories();
  const groups = await Promise.all(
    categories.map(async (c) => ({ category: c, services: await getServicePagesForCategory(c.slug) }))
  );
  const visible = groups.filter((g) => g.services.length > 0);
  if (visible.length === 0) return null;

  return (
    <Section className="bg-transparent">
      {eyebrow && <h6 style={{ color: "var(--color-accent-700)" }}>{eyebrow}</h6>}
      {title && <h2 className="mt-1.5 max-w-xl">{title}</h2>}
      {description && <p className="text-muted max-w-xl text-[15px]">{description}</p>}

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        {visible.map(({ category, services }) => (
          <div key={category.slug} className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="m-0 text-[19px]">{category.name}</h3>
              <Link href={`/${category.slug}`} className="text-[13px] font-semibold">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {services.slice(0, 4).map((s) => (
                <Link key={s.slug} href={`/${category.slug}/${s.slug}`} className="block">
                  <CategoryCard title={s.name} blurb={(s.intro[0] ?? "").slice(0, 100) + "…"} />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
