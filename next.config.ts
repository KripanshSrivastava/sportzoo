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
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // Canonical host: everything served from https://www.elephantcorporate.app
      {
        source: "/:path*",
        has: [{ type: "host", value: "elephantcorporate.app" }],
        destination: "https://www.elephantcorporate.app/:path*",
        permanent: true,
      },
    ];
  },
  // No remote image hosts — every image is an uploaded asset or an admin-set URL.
};

export default nextConfig;
