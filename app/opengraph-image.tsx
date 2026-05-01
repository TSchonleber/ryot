import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "$RYOT — He made it. Most don't.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px",
          background:
            "linear-gradient(160deg, #1a1612 0%, #2a2520 40%, #3d2f24 100%)",
          color: "#f5e9d4",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: 0.55,
            marginBottom: 24,
          }}
        >
          $RYOT · 90% to Northshore Humane Society
        </div>
        <div
          style={{
            fontSize: 120,
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>He made it.</span>
          <span style={{ color: "#c97a3f" }}>Most don't.</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
