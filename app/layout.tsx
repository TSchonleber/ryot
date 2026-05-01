import type { Metadata } from "next";
import { Fraunces, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "$RYOT — He made it. Most don't.",
  description:
    "$RYOT is a memecoin funding North Shore Animal League America — the world's largest no-kill animal rescue. 90% of pump.fun creator fees go directly to NSAL.",
  metadataBase: new URL("https://ryotcoin.vercel.app"),
  openGraph: {
    title: "$RYOT — He made it. Most don't.",
    description:
      "Ryot got a second chance. Most animals don't. $RYOT exists so more do.",
    url: "https://ryotcoin.vercel.app",
    siteName: "$RYOT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "$RYOT — He made it. Most don't.",
    description:
      "Ryot got a second chance. Most animals don't. $RYOT exists so more do.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
