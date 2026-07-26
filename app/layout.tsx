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
    title: "Benjamin — Sport, Musik, Code & Meer",
    description:
      "Hi, ich bin Benjamin. 18 Jahre, neugierig und immer bereit für das nächste Level.",
    openGraph: {
      title: "Benjamin — Sport, Musik, Code & Meer",
      description: "Vier Interessen. Unendlich viele Möglichkeiten.",
      url: origin,
      siteName: "Benjamin",
      locale: "de_DE",
      type: "website",
      images: [
        {
          url: `${origin}/og.png`,
          width: 1734,
          height: 907,
          alt: "Benjamin — Sport, Musik, Code & Meer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Benjamin — Sport, Musik, Code & Meer",
      description: "Vier Interessen. Unendlich viele Möglichkeiten.",
      images: [`${origin}/og.png`],
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
