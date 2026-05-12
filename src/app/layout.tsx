import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kilometerklubben · Silkeborg | Bevægelse · Fællesskab · Livsglæde",
  description:
    "Kilometerklubben er et nyt løbefællesskab i Silkeborg. Vi løber for glæden, naturen og fællesskabet. Alle er velkomne — uanset tempo og erfaring.",
  keywords: [
    "løb",
    "løbefællesskab",
    "Silkeborg",
    "running",
    "fællesskab",
    "trail",
    "kilometerklubben",
    "natur",
  ],
  openGraph: {
    title: "Kilometerklubben · Silkeborg",
    description:
      "Bevægelse · Fællesskab · Livsglæde — Et nyt løbefællesskab i Silkeborg for alle der elsker at løbe.",
    url: "https://kilometerklubben.dk",
    siteName: "Kilometerklubben",
    locale: "da_DK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" className={inter.variable}>
      <body className="antialiased bg-[var(--color-primary)] text-white">
        <AuthProvider>{children}</AuthProvider>
        {/* Facebook SDK */}
        <div id="fb-root"></div>
        <Script
          strategy="lazyOnload"
          src="https://connect.facebook.net/da_DK/sdk.js#xfbml=1&version=v19.0"
          crossOrigin="anonymous"
          nonce="random123"
        />
      </body>
    </html>
  );
}
