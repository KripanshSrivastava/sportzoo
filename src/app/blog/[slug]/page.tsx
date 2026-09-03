import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { RichBody } from "@/components/sections/RichBody";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd, articleJsonLd } from "@/components/seo/JsonLd";
import { getPublishedBlogPostBySlug } from "@/lib/blogData";
import { blogPosts as staticBlogPosts } from "@/content/blog";
import { siteConfig } from "@/config/site";

// ISR: served from cache; admin saves call revalidateSite() to push changes live immediately.
export const revalidate = 3600;

export function generateStaticParams() {
  return staticBlogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({ title: post.title, description: post.description, path: `/blog/${post.slug}` });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);
  if (!post) notFound();

  const dateLabel = post.datePublished
    ? new Date(post.datePublished).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })
    : "";

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
          {post.cluster && <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">{post.cluster}</p>}
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
          {dateLabel && (
            <time dateTime={post.datePublished} className="mt-4 block text-sm text-slate-400">
              Published {dateLabel}
            </time>
          )}
        </div>
      </section>

      {post.coverImageUrl && (
        <div className="relative aspect-[21/9] w-full bg-slate-100">
          <Image src={post.coverImageUrl} alt={post.title} fill sizes="100vw" className="object-cover" priority />
        </div>
      )}

      <Section className="bg-white">
        <RichBody blocks={post.body} />

        {post.relatedServicePath && (
          <div className="mt-10 max-w-3xl rounded-xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-600">
              Related service:{" "}
              <Link href={post.relatedServicePath} className="font-semibold text-[color:var(--color-electric)]">
                {post.relatedServiceLabel || "Learn more"} →
              </Link>
            </p>
          </div>
        )}
      </Section>

      <LeadFormSection sourcePage={post.title} />
      <FinalCta />
    </>
  );
}
