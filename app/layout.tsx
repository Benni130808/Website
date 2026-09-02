import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "benjamin-next-level.benni0808.chatgpt.site";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: "Benjamin —  Portfolio",
    description:
      "Benjamin, 18: Sport, Musik, Code und Meer – als persönliches digitales Portfolio.",
    openGraph: {
      title: "Benjamin — Portfolio",
      description: "18 / Sport / Musik / Code / Meer",
      url: origin,
      siteName: "Benjamin",
      locale: "de_DE",
      type: "website",
      images: [
        {
          url: `${origin}/og-v4.png`,
          width: 1200,
          height: 630,
          alt: "Benjamin — 18 / Sport / Musik / Code / Meer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Benjamin — Portfolio",
      description: "18 / Sport / Musik / Code / Meer",
      images: [`${origin}/og-v4.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
