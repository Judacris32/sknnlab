/**
 * Single source of truth for clinic details.
 * Change a value here and it updates everywhere on the site
 * (navbar, footer, contact page, WhatsApp widget, emails, SEO).
 */
export const site = {
  name: "SKNN LAB",
  legalName: "SKNN LAB Aesthetic Clinic",
  tagline: "Redefining beauty through science & self-care",
  description:
    "SKNN LAB is an aesthetic clinic in Lekki Phase 1, Lagos, offering medical-grade facials, microneedling, chemical peels and personalised skin consultations.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sknnlab.com",
  founded: "October 2025",

  founder: {
    name: "Bridget Oshomah",
    title: "Founder & Clinical Director",
  },

  contact: {
    email: "Sknnlab@gmail.com",
    phones: [
      { display: "0906 919 2211", tel: "+2349069192211" },
      { display: "0706 041 2223", tel: "+2347060412223" },
    ],
    /**
     * WhatsApp number in international format, digits only (no +, no spaces).
     * TODO: replace with the clinic's confirmed WhatsApp line.
     * Currently set to the appointments line listed on the clinic's Instagram.
     */
    whatsapp: "2349069192211",
  },

  address: {
    line1: "Flat 14, Abayomi Durosinmi-Etti Street",
    line2: "Zone 10, off T. Kuboye, Maruwa",
    city: "Lekki Phase 1, Lagos",
    country: "Nigeria",
    postalCode: "106104",
    mapQuery: "Abayomi Durosinmi-Etti Street, Maruwa, Lekki Phase 1, Lagos",
  },

  /**
   * Opening hours. Leave empty to show "By appointment" everywhere.
   * Example: [{ days: "Monday – Friday", time: "9:00am – 6:00pm" }]
   */
  hours: [] as { days: string; time: string }[],

  social: {
    instagram: { handle: "@sknnlabaesthetic", url: "https://www.instagram.com/sknnlabaesthetic/" },
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Treatments", href: "/treatments" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;
