import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { blogPosts } from "@/content/blog";

export const metadata = buildMetadata({
  title: "Blog & Resources | Elephant Corporate",
  description:
    "Practical guides on corporate event planning, offsites, employee engagement, artist booking, and venue selection from the Elephant Corporate team.",
  path: "/blog",
});

export default function BlogIndexPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />

      <section className="bg-[color:var(--color-navy-950)] py-14 text-white sm:py-16">
        <div className="container-page">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Blog &amp; Resources
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Practical guides on corporate event planning, artist booking, and venue selection, written from
            real planning experience.
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <SectionHeading eyebrow="Latest" title="All articles" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-accent-dark)]">
                {post.cluster}
              </p>
              <h2 className="mt-2 text-lg font-semibold text-[color:var(--color-navy-900)]">{post.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{post.description}</p>
              <time dateTime={post.datePublished} className="mt-4 text-xs text-slate-400">
                {new Date(post.datePublished).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
              </time>
            </Link>
          ))}
        </div>
      </Section>

      <LeadFormSection sourcePage="Blog" />
    </>
  );
}
