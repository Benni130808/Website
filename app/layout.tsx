import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Benjamin — Sport, Musik, Code & Meer",
  description: "Hi, ich bin Benjamin. 18 Jahre, neugierig und immer bereit für das nächste Level.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
