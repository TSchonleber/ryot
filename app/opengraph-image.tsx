import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "$RYOT — He made it. Most don't.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export default async function OgImage() {
  const photoSrc = `${getBaseUrl()}/ryot/pond.jpg`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#1a1612",
          color: "#f5e9d4",
          fontFamily: "serif",
        }}
      >
        {/* Hero photo, full bleed */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "45% 28%",
          }}
        />

        {/* Cinematic gradient overlay for legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(to top, rgba(26,22,18,0.92) 0%, rgba(26,22,18,0.55) 38%, rgba(26,22,18,0.15) 70%, rgba(26,22,18,0.55) 100%)",
          }}
        />

        {/* Copy block */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            width: "100%",
            padding: "72px",
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.7,
              marginBottom: 20,
            }}
          >
            $RYOT · 90% to Northshore Humane Society
          </div>
          <div
            style={{
              fontSize: 124,
              fontWeight: 600,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>He made it.</span>
            <span style={{ color: "#c97a3f" }}>Most don&#x27;t.</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
