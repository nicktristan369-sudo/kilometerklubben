import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kilometerklubben | Løbe-events i Danmark",
  description:
    "Deltag i Danmarks mest inspirerende løbe-events. Tilmeld dig til trail runs, byløb og maratons med Kilometerklubben.",
  keywords: ["løb", "running", "events", "Danmark", "marathon", "trail run", "kilometerklubben"],
  openGraph: {
    title: "Kilometerklubben | Løbe-events i Danmark",
    description: "Deltag i Danmarks mest inspirerende løbe-events.",
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
      <body className="antialiased bg-white text-gray-900">{children}</body>
    </html>
  );
}
