import Script from "next/script";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig, isLiveLink } from "@/config/site";

function youTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export function SocialFeedBlock({
  eyebrow,
  title,
  description,
  instagramUrls = [],
  youtubeUrls = [],
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  instagramUrls?: string[];
  youtubeUrls?: string[];
}) {
  const instaPosts = instagramUrls.filter((u) => u.includes("instagram.com/"));
  const videos = youtubeUrls.map((u) => youTubeId(u)).filter((id): id is string => Boolean(id));

  const hasInstagramLink = isLiveLink(siteConfig.social.instagram);
  const hasYoutubeLink = isLiveLink(siteConfig.social.youtube);

  // Nothing to embed and nowhere real to send people — skip the section
  // rather than showing an empty "Follow us" block.
  if (instaPosts.length === 0 && videos.length === 0 && !hasInstagramLink && !hasYoutubeLink) return null;

  return (
    <Section>
      <SectionHeading eyebrow={eyebrow} title={title ?? "Recent posts"} description={description} center />

      {(instaPosts.length > 0 || videos.length > 0) && (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {instaPosts.map((url) => (
            <blockquote
              key={url}
              className="instagram-media m-0 w-full overflow-hidden rounded-2xl border"
              style={{ borderColor: "var(--color-divider)" }}
              data-instgrm-permalink={url}
              data-instgrm-version="14"
            />
          ))}
          {videos.map((id) => (
            <div key={id} className="aspect-video w-full overflow-hidden rounded-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          ))}
        </div>
      )}

      {instaPosts.length > 0 && <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" />}

      {(hasInstagramLink || hasYoutubeLink) && (
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {hasInstagramLink && (
            <ButtonLink href={siteConfig.social.instagram} variant="secondary" size="md" target="_blank" rel="noopener noreferrer">
              Follow on Instagram
            </ButtonLink>
          )}
          {hasYoutubeLink && (
            <ButtonLink href={siteConfig.social.youtube} variant="secondary" size="md" target="_blank" rel="noopener noreferrer">
              Subscribe on YouTube
            </ButtonLink>
          )}
        </div>
      )}
    </Section>
  );
}
