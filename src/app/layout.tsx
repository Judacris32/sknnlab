import type { Metadata, Viewport } from "next";
import "@fontsource-variable/cormorant-garamond/wght.css";
import "@fontsource-variable/cormorant-garamond/wght-italic.css";
import "@fontsource-variable/jost/wght.css";
import "./globals.css";
import { site } from "@/config/site";
import { Providers } from "@/components/layout/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget";
import { PreFooter } from "@/components/layout/PreFooter";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollProgress } from "@/components/motion/ScrollProgress";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SKNN LAB Aesthetic Clinic | Facials, Peels & Microneedling in Lekki, Lagos",
    template: "%s | SKNN LAB Aesthetic Clinic",
  },
  description: site.description,
  keywords: [
    "aesthetic clinic Lekki",
    "facial Lekki Lagos",
    "chemical peel Lagos",
    "microneedling Lagos",
    "acne treatment Lagos",
    "hyperpigmentation treatment Lagos",
    "SKNN LAB",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: site.legalName,
    title: "SKNN LAB Aesthetic Clinic",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF7EF" },
    { media: "(prefers-color-scheme: dark)", color: "#2E231C" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: site.legalName,
  description: site.description,
  url: site.url,
  email: site.contact.email,
  telephone: site.contact.phones.map((p) => p.tel),
  image: `${site.url}/opengraph-image.jpg`,
  founder: { "@type": "Person", name: site.founder.name, jobTitle: site.founder.title },
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: "Lekki Phase 1",
    addressRegion: "Lagos",
    postalCode: site.address.postalCode,
    addressCountry: "NG",
  },
  sameAs: [site.social.instagram.url],
  priceRange: "₦₦",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" suppressHydrationWarning>
      <body>
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
          >
            Skip to content
          </a>
          <SmoothScroll />
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <PreFooter />
          <Footer />
          <WhatsAppWidget />
        </Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
