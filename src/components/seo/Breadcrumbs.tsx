import Link from "next/link";
import { JsonLd, breadcrumbJsonLd } from "./JsonLd";

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const full = [{ name: "Home", path: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-slate-50">
      <JsonLd data={breadcrumbJsonLd(full)} />
      <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 px-4 py-3 text-sm text-slate-500 sm:px-6 lg:px-8">
        {full.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === full.length - 1 ? (
              <span className="font-medium text-slate-700" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link href={item.path} className="hover:text-[color:var(--color-accent)]">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
