import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

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
    title: "Benjamin — Field Notes",
    description:
      "Benjamin, 18: Sport, Musik, Code und Meer – als persönliches digitales Field-Notes-Heft.",
    openGraph: {
      title: "Benjamin — Field Notes",
      description: "18 / Sport / Musik / Code / Meer",
      url: origin,
      siteName: "Benjamin",
      locale: "de_DE",
      type: "website",
      images: [
        {
          url: `${origin}/og-v2.png`,
          width: 1734,
          height: 907,
          alt: "Benjamin — 18 / Sport / Musik / Code / Meer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Benjamin — Field Notes",
      description: "18 / Sport / Musik / Code / Meer",
      images: [`${origin}/og-v2.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
