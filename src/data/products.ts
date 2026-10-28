/**
 * SHOP PRODUCTS — PLACEHOLDERS.
 * Replace names, prices, copy and images with the clinic's real products.
 * Images: drop photos into /public/images/products/ and update `image`.
 * (Square or 5:6 portrait photos on a plain background work best.)
 */

export type Product = {
  slug: string;
  name: string;
  category: "Cleanse" | "Treat" | "Hydrate" | "Protect";
  price: number;
  size: string;
  image: string;
  short: string;
  description: string;
  benefits: string[];
  howToUse: string;
  skinTypes: string[];
  bestseller?: boolean;
};

export const products: Product[] = [
  {
    slug: "gentle-foaming-cleanser",
    name: "Gentle Foaming Cleanser",
    category: "Cleanse",
    price: 18500,
    size: "150 ml",
    image: "/images/products/gentle-foaming-cleanser.svg",
    short: "A soft, low-foam cleanser that lifts away oil and SPF without stripping.",
    description:
      "A daily cleanser that removes makeup, sunscreen and excess oil while respecting your skin barrier. Skin feels clean and comfortable, never tight.",
    benefits: ["Removes oil, SPF and makeup", "Barrier-friendly formula", "Suitable for morning and evening"],
    howToUse:
      "Massage a small amount onto damp skin for 60 seconds, then rinse with lukewarm water. Use morning and evening.",
    skinTypes: ["All skin types", "Sensitive"],
    bestseller: true,
  },
  {
    slug: "brightening-vitamin-c-serum",
    name: "Brightening Vitamin C Serum",
    category: "Treat",
    price: 32000,
    size: "30 ml",
    image: "/images/products/brightening-vitamin-c-serum.svg",
    short: "An antioxidant serum for dullness and uneven tone.",
    description:
      "A lightweight serum to help brighten dull skin and even out tone over time. Layers easily under moisturiser and SPF.",
    benefits: ["Brightens dull skin", "Supports an even tone", "Antioxidant protection"],
    howToUse: "Apply 3–4 drops to clean, dry skin each morning, before moisturiser and SPF.",
    skinTypes: ["Normal", "Combination", "Oily"],
    bestseller: true,
  },
  {
    slug: "hydrating-barrier-cream",
    name: "Hydrating Barrier Cream",
    category: "Hydrate",
    price: 26500,
    size: "50 ml",
    image: "/images/products/hydrating-barrier-cream.svg",
    short: "A rich, comforting moisturiser for dry or post-treatment skin.",
    description:
      "A nourishing cream that replenishes moisture and comforts skin, especially after peels and microneedling.",
    benefits: ["Long-lasting hydration", "Comforts post-treatment skin", "Non-comedogenic"],
    howToUse: "Smooth over face and neck morning and evening after serum.",
    skinTypes: ["Dry", "Normal", "Post-treatment"],
  },
  {
    slug: "daily-mineral-spf-50",
    name: "Daily Mineral SPF 50",
    category: "Protect",
    price: 24000,
    size: "50 ml",
    image: "/images/products/daily-mineral-spf-50.svg",
    short: "Broad-spectrum protection with no white cast on deeper skin tones.",
    description:
      "Daily sun protection is the single most important step after any treatment. This lightweight SPF protects against UVA and UVB without leaving a cast.",
    benefits: ["Broad-spectrum SPF 50", "No white cast", "Lightweight finish"],
    howToUse:
      "Apply generously as the last step of your morning routine. Reapply every two hours when outdoors.",
    skinTypes: ["All skin types"],
    bestseller: true,
  },
  {
    slug: "clarifying-acne-gel",
    name: "Clarifying Acne Gel",
    category: "Treat",
    price: 21000,
    size: "30 ml",
    image: "/images/products/clarifying-acne-gel.svg",
    short: "A targeted gel for breakouts and congested pores.",
    description: "A clear gel that helps calm active breakouts and keep pores clear between treatments.",
    benefits: ["Targets active breakouts", "Helps keep pores clear", "Fast-absorbing gel"],
    howToUse: "Apply a thin layer to affected areas once or twice daily after cleansing.",
    skinTypes: ["Oily", "Acne-prone"],
  },
  {
    slug: "exfoliating-glow-toner",
    name: "Exfoliating Glow Toner",
    category: "Treat",
    price: 19500,
    size: "200 ml",
    image: "/images/products/exfoliating-glow-toner.svg",
    short: "A gentle exfoliating toner for smoother, brighter skin.",
    description: "A daily toner that gently exfoliates to refine texture and help skin look brighter.",
    benefits: ["Refines texture", "Boosts radiance", "Preps skin for serums"],
    howToUse: "Sweep over clean skin with a cotton pad in the evening. Start 3 times a week.",
    skinTypes: ["Normal", "Combination", "Oily"],
  },
  {
    slug: "overnight-repair-mask",
    name: "Overnight Repair Mask",
    category: "Hydrate",
    price: 28000,
    size: "75 ml",
    image: "/images/products/overnight-repair-mask.svg",
    short: "A leave-on night mask that restores softness while you sleep.",
    description: "A cushiony overnight mask that seals in moisture and helps skin recover overnight.",
    benefits: ["Overnight hydration", "Softer, plumper skin by morning", "Seals in serums"],
    howToUse: "Apply a generous layer as the last step of your evening routine, 2–3 nights a week.",
    skinTypes: ["Dry", "Normal", "Dehydrated"],
  },
  {
    slug: "dark-spot-corrector",
    name: "Dark Spot Corrector",
    category: "Treat",
    price: 34500,
    size: "30 ml",
    image: "/images/products/dark-spot-corrector.svg",
    short: "A concentrated serum for dark marks and hyperpigmentation.",
    description:
      "A targeted serum to help fade dark marks left by acne and sun damage. Pairs well with peel and microneedling programmes.",
    benefits: ["Targets dark marks", "Helps even skin tone", "Suitable for melanin-rich skin"],
    howToUse:
      "Apply 2–3 drops to clean skin in the evening. Always use SPF the following morning.",
    skinTypes: ["All skin types", "Hyperpigmentation"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
