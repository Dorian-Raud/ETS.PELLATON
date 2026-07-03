import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Galerie d'art",
  description: "Galerie d'art contemporain — œuvres et artistes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/mxf1gbl.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
