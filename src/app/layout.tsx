import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy 50th Birthday, Papa ❤️",
  description:
    "A personal digital memory experience celebrating 50 years of love, laughter, and family.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Happy 50th Birthday, Papa ❤️",
    description:
      "A personal digital memory experience celebrating 50 years of love, laughter, and family.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0a0e17" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Caveat:wght@400;500;600;700&family=Noto+Sans+Gujarati:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
