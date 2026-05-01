import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ryot's Story — Four months old. Two strikes.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export default async function StoryOgImage() {
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

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(to top, rgba(26,22,18,0.95) 0%, rgba(26,22,18,0.6) 40%, rgba(26,22,18,0.2) 75%, rgba(26,22,18,0.55) 100%)",
          }}
        />

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
            $RYOT · His story
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 600,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Four months old.</span>
            <span style={{ color: "#c97a3f" }}>Two strikes.</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
