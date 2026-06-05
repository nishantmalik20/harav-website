import type { Metadata } from "next";
import { Marcellus, Jost } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/components/shop/cart-provider";
import { CartDrawer } from "@/components/shop/cart-drawer";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://haravsalonspa.ca";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Harav Salon & Spa: Facials, Sugaring & Lash | Winnipeg",
    template: "%s | Harav Salon & Spa",
  },
  description:
    "A women's salon & spa on Pembina Hwy in Winnipeg. Facials, body sugaring, waxing, lashes, nails and massage. Book your appointment online.",
  keywords: [
    "salon and spa Winnipeg",
    "body sugaring Winnipeg",
    "facial Winnipeg",
    "waxing Winnipeg",
    "lash extensions Winnipeg",
    "women's spa Winnipeg",
  ],
  openGraph: {
    title: "Harav Salon & Spa in Winnipeg",
    description:
      "A women's salon & spa in Winnipeg. Facials, sugaring, lashes, nails and massage, in warm light and careful hands.",
    url: siteUrl,
    siteName: "Harav Salon & Spa",
    locale: "en_CA",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${marcellus.variable} ${jost.variable}`}>
      <body className="min-h-screen bg-ivory font-body text-espresso antialiased">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
