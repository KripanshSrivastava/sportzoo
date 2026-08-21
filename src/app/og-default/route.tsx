import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";
export const contentType = "image/png";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#101828",
          color: "#faf8f3",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "72px",
            height: "6px",
            background: "#c89b3c",
            marginBottom: "40px",
          }}
        />
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, letterSpacing: "-0.02em" }}>
          {siteConfig.brand}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "28px",
            fontSize: 32,
            color: "#0f766e",
            maxWidth: "920px",
            lineHeight: 1.4,
          }}
        >
          {siteConfig.shortTagline}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
