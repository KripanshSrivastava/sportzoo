import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { getPublishedBlogPosts } from "@/lib/blogData";

// ISR: served from cache; admin saves call revalidateSite() to push changes live immediately.
export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Blog & Resources | Elephant Corporate",
  description:
    "Practical guides on corporate event planning, offsites, employee engagement, artist booking, and venue selection from the Elephant Corporate team.",
  path: "/blog",
});

export default async function BlogIndexPage() {
  const blogPosts = await getPublishedBlogPosts();
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
        {blogPosts.length === 0 ? (
          <p className="text-muted max-w-2xl text-[15px]">Articles are on the way — check back soon.</p>
        ) : (
          <>
            <SectionHeading eyebrow="Latest" title="All articles" />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg"
                >
                  {post.coverImageUrl && (
                    <div className="relative aspect-[16/10] bg-slate-100">
                      <Image src={post.coverImageUrl} alt={post.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    {post.cluster && (
                      <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-accent-dark)]">{post.cluster}</p>
                    )}
                    <h2 className="mt-2 text-lg font-semibold text-[color:var(--color-navy-900)]">{post.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{post.description}</p>
                    {post.datePublished && (
                      <time dateTime={post.datePublished} className="mt-4 text-xs text-slate-400">
                        {new Date(post.datePublished).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                      </time>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </Section>

      <LeadFormSection sourcePage="Blog" />
    </>
  );
}
