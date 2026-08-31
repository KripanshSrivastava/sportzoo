import { Section, SectionHeading } from "@/components/ui/Section";

function instagramEmbedSrc(raw: string): string | null {
  const m = raw.trim().match(/instagram\.com\/(?:[^/]+\/)?(p|reel|tv)\/([A-Za-z0-9_-]+)/);
  if (!m) return null;
  return `https://www.instagram.com/${m[1]}/${m[2]}/embed`;
}

function youtubeId(raw: string): string | null {
  const s = raw.trim();
  const patterns = [
    /[?&]v=([A-Za-z0-9_-]{11})/,
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/(?:embed|shorts|live)\/([A-Za-z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = s.match(p);
    if (m) return m[1];
  }
  return /^[A-Za-z0-9_-]{11}$/.test(s) ? s : null;
}

const frameStyle = { borderColor: "var(--color-divider)" };

export function SocialFeedBlock({
  eyebrow,
  title,
  description,
  instagramUrls = [],
  youtubeUrls = [],
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  instagramUrls?: string[];
  youtubeUrls?: string[];
}) {
  const igEmbeds = instagramUrls.map(instagramEmbedSrc).filter((v): v is string => Boolean(v));
  const ytIds = youtubeUrls.map(youtubeId).filter((v): v is string => Boolean(v));

  if (igEmbeds.length === 0 && ytIds.length === 0) return null;

  return (
    <Section>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ytIds.map((id) => (
          <div key={id} className="overflow-hidden border" style={frameStyle}>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${id}`}
                title="YouTube video"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              />
            </div>
          </div>
        ))}
        {igEmbeds.map((src) => (
          <div key={src} className="overflow-hidden border" style={frameStyle}>
            <iframe
              src={src}
              title="Instagram post"
              loading="lazy"
              scrolling="no"
              style={{ width: "100%", height: 480, border: 0, display: "block" }}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
