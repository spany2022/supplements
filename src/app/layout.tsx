import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE_URL, store } from "@/lib/store-config";
import { Providers } from "@/components/layout/Providers";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Toast } from "@/components/layout/Toast";

const display = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap" });
const sans = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const bebas = Bebas_Neue({ variable: "--font-bebas-neue", subsets: ["latin"], weight: "400", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kynetic — Premium Sports Nutrition & Supplements in India",
    template: "%s | Kynetic",
  },
  description: store.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Kynetic",
    locale: "en_IN",
    title: "Kynetic — Built for your next level",
    description: store.description,
  },
  twitter: { card: "summary_large_image" },
  // Prototype builds stay out of search indexes until real data is loaded.
  robots: store.isPrototype ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0B0D10",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable} ${bebas.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-lime focus:px-5 focus:py-3 focus:text-ink"
          >
            Skip to content
          </a>
          <AnnouncementBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
