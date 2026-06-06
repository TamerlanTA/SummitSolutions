import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Outfit, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vysota — Промышленные альпинисты в Алматы",
  description:
    "Премиальное обслуживание фасадов и высотные работы в Алматы. Профессионализм, превращённый в архитектурный стандарт.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    locale: "ru_RU",
    type: "website",
    title: "Vysota — Промышленные альпинисты в Алматы",
    description:
      "Вертикальные решения для вашего бизнеса. Фасады, швы, крыши и высотный монтаж.",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F3EA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${spaceGrotesk.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-bg text-ink antialiased font-sans overflow-x-hidden">
        <svg className="hidden">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
          </filter>
        </svg>
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
