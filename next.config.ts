import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Hashed build assets never change — cache them forever.
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/_next/image",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
  async redirects() {
    return [
      // Canonical host: the bare domain (no www). www → apex, one hop.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.elephantcorporate.app" }],
        destination: "https://elephantcorporate.app/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    // Uploaded media lives in Supabase Storage; let the Next image optimizer
    // resize it and serve AVIF/WebP with a responsive srcset.
    remotePatterns: [{ protocol: "https", hostname: "**.supabase.co", pathname: "/storage/v1/object/public/**" }],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400, // 31 days — optimized images rarely change
  },
};

export default nextConfig;
