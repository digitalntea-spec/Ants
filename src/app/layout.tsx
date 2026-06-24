import type { Metadata } from "next";
import { Inter, Luckiest_Guy } from "next/font/google";
import "./globals.css";
import { siteMeta } from "@/data/content";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const graffiti = Luckiest_Guy({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-graffiti",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: siteMeta.title,
  description: siteMeta.description,
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    url: siteMeta.url,
    siteName: "ANTS",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${sans.variable} ${graffiti.variable} font-sans bg-ants-bg text-ants-ink`}>
        {children}
      </body>
    </html>
  );
}
