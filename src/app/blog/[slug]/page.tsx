import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd, articleJsonLd } from "@/components/seo/JsonLd";
import { blogPosts, getBlogPostBySlug } from "@/content/blog";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({ title: post.title, description: post.description, path: `/blog/${post.slug}` });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          path: `/blog/${post.slug}`,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          authorName: siteConfig.brand,
        })}
      />
      <Breadcrumbs items={[{ name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]} />

      <section className="bg-[color:var(--color-navy-950)] py-14 text-white sm:py-16">
        <div className="container-page">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">{post.cluster}</p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
          <time dateTime={post.datePublished} className="mt-4 block text-sm text-slate-400">
            Published {new Date(post.datePublished).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
          </time>
        </div>
      </section>

      <Section className="bg-white">
        <article className="max-w-3xl space-y-5 text-base leading-relaxed text-slate-700">
          {post.body.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2 key={i} className="pt-2 text-2xl font-bold text-[color:var(--color-navy-900)]">
                  {block.text}
                </h2>
              );
            }
            if (block.type === "ul") {
              return (
                <ul key={i} className="list-disc space-y-2 pl-5">
                  {block.items?.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }
            return <p key={i}>{block.text}</p>;
          })}
        </article>

        <div className="mt-10 max-w-3xl rounded-xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm text-slate-600">
            Related service:{" "}
            <Link href={post.relatedServicePath} className="font-semibold text-[color:var(--color-electric)]">
              {post.relatedServiceLabel} →
            </Link>
          </p>
        </div>
      </Section>

      <LeadFormSection sourcePage={post.title} />
      <FinalCta />
    </>
  );
}
