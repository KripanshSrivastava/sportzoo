import Image from "next/image";
import type { BlogBlock } from "@/content/blog";

/**
 * Renders the free-form body used by blog posts and service pages:
 * `## heading`, paragraphs, `- bullet` lists, and image URLs.
 */
export function RichBody({ blocks, className }: { blocks: BlogBlock[]; className?: string }) {
  return (
    <article className={className ?? "max-w-3xl space-y-5 text-base leading-relaxed text-slate-700"}>
      {blocks.map((block, i) => {
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
        if (block.type === "image" && block.imageUrl) {
          return (
            <span key={i} className="relative block aspect-video w-full overflow-hidden rounded-lg bg-slate-100">
              <Image
                src={block.imageUrl}
                alt=""
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
                unoptimized
              />
            </span>
          );
        }
        return <p key={i}>{block.text}</p>;
      })}
    </article>
  );
}
