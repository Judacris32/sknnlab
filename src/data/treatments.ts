/**
 * Treatment menu: the one place prices, durations and descriptions live.
 * Treatment pages, the booking form and the emails all read from here.
 * price: number in Naira, or null for "Price on consultation".
 */

export type CategorySlug = "consultation" | "facials" | "microneedling" | "chemical-peels" | "advanced";

export type Treatment = {
  slug: string;
  name: string;
  category: CategorySlug;
  price: number | null;
  duration?: string;
  summary: string;
  featured?: boolean;
  note?: string;
};

export type Faq = { q: string; a: string };

export type CategoryDetails = {
  about: string[];
  benefitsTitle?: string;
  benefits?: string[];
  notSuitable?: string[];
  facts?: { label: string; value: string }[];
  aftercare?: string[];
  notes?: string[];
  extraList?: { title: string; items: string[] };
  faqs?: Faq[];
};

export type Category = {
  slug: CategorySlug;
  name: string;
  eyebrow: string;
  headline: string;
  short: string;
  image: string;
  imagePosition?: string;
  heroImage: string;
  heroPosition?: string;
  /** Image beside the intro on the category page (defaults to `image`). */
  detailImage?: string;
  details?: CategoryDetails;
};

export const categories: Category[] = [
  {
    slug: "consultation",
    name: "Consultation & Analysis",
    eyebrow: "Where every journey begins",
    headline: "Understand your skin before you treat it",
    short: "A close look at your skin and an honest plan for it, in the clinic or online.",
    image: "/images/clinic/consultation-desk.jpg",
    imagePosition: "80% 50%",
    heroImage: "/images/founder/bridget-skin-analysis.jpg",
    heroPosition: "50% 35%",
    detailImage: "/images/founder/bridget-at-work.jpg",
    details: {
      about: [
        "Good results start with understanding. In your consultation we examine your skin closely and talk about what's bothering you, how you live, what you eat and what you use on your skin today.",
        "Then we agree on clear goals and map out a plan to reach them. You'll leave knowing which treatments and products suit your skin, and which ones you can skip.",
      ],
      benefitsTitle: "What we cover together",
      benefits: [
        "A thorough analysis of your skin",
        "Your concerns, lifestyle, diet and current routine",
        "Clear, realistic goals",
        "A treatment plan made for you",
        "Product advice for your skin type",
      ],
      facts: [
        { label: "Duration", value: "30 minutes" },
        { label: "Where", value: "In clinic or online" },
        { label: "Fee", value: "₦10,000" },
      ],
      faqs: [
        {
          q: "Do I need a consultation before a treatment?",
          a: "It's the best place to start. Every chemical peel begins with a thorough consultation so we can choose the right peel for your skin. If you'd like a facial, first-time clients are encouraged to book the Customised Facial, which includes a full skin analysis.",
        },
        {
          q: "Can I have my consultation online?",
          a: "Yes. Consultations are available in person at the clinic or virtually, and the fee is the same.",
        },
      ],
    },
  },
  {
    slug: "facials",
    name: "Facials",
    eyebrow: "Cleanse, treat, glow",
    headline: "Facials that do more than pamper",
    short: "Eight clinical facials for glow, hydration, breakouts and texture, each built around a clear result.",
    image: "/images/treatments/facial-mask.jpg",
    imagePosition: "50% 35%",
    heroImage: "/images/treatments/facial-mask.jpg",
    heroPosition: "50% 40%",
    detailImage: "/images/treatments/high-frequency.jpg",
    details: {
      about: [
        "Every facial at SKNN LAB has a purpose. Some deep-clean congested pores, some calm breakouts, others bring back hydration and glow. We use professional-grade products alongside clinic technology such as LED light, high-frequency and hydra therapy.",
        "New to us? Start with the Customised Facial. It opens with a full skin analysis, so the treatment is shaped around what your skin needs on the day.",
      ],
      benefitsTitle: "Good for",
      benefits: [
        "Dull, tired or uneven skin",
        "Congested pores and breakouts",
        "Dehydrated skin that feels tight",
        "Glowing skin before an event",
        "Expectant mothers (Refreshing Facial)",
      ],
      facts: [
        { label: "Duration", value: "From 50 mins" },
        { label: "Downtime", value: "None" },
        { label: "From", value: "₦38,500" },
      ],
      faqs: [
        {
          q: "How often should I have a facial?",
          a: "Many people book every four to six weeks, in step with the skin's natural renewal cycle. We'll recommend a rhythm that suits your goals.",
        },
        {
          q: "Will my skin be red afterwards?",
          a: "Most facials leave you with a fresh glow you can walk straight out with. If you've had extractions, you may notice a little temporary redness.",
        },
      ],
    },
  },
  {
    slug: "microneedling",
    name: "Microneedling",
    eyebrow: "Collagen induction therapy",
    headline: "Smoother, firmer skin, built from within",
    short: "Collagen-boosting treatments for fine lines, acne scars, dark marks and texture.",
    image: "/images/treatments/microneedling.jpg",
    imagePosition: "50% 45%",
    heroImage: "/images/treatments/microneedling.jpg",
    heroPosition: "50% 45%",
    detailImage: "/images/treatments/microneedling-pen.jpg",
    details: {
      about: [
        "Microneedling, also called collagen induction therapy, uses very fine sterile needles to make tiny, controlled channels in the skin. Your skin responds by repairing itself, producing fresh collagen and elastin that leave it firmer and smoother over time.",
        "It's a minimally invasive treatment with little or no downtime. We numb your skin for an hour beforehand, so the treatment itself is comfortable.",
      ],
      benefitsTitle: "What it can do",
      benefits: [
        "Soften fine lines and wrinkles",
        "Reduce acne scars, stretch marks and surgical scars",
        "Fade hyperpigmentation and sun damage",
        "Make enlarged pores look smaller",
        "Refine overall texture for younger-looking skin",
      ],
      notSuitable: [
        "Active acne",
        "Poor wound healing",
        "Moderate to severe psoriasis or eczema",
        "A tendency to form keloids",
        "Rosacea",
      ],
      facts: [
        { label: "Treatment time", value: "1 hour" },
        { label: "Numbing", value: "1 hour before" },
        { label: "Downtime", value: "1–2 days of mild redness" },
      ],
      notes: [
        "You'll start to see results within a few weeks.",
        "Most people need several sessions for the best result, depending on how deep the concern is.",
      ],
      faqs: [
        {
          q: "Does microneedling hurt?",
          a: "Your skin is numbed for an hour before we begin, so most clients feel only light pressure and a mild scratching sensation.",
        },
        {
          q: "What will my skin look like afterwards?",
          a: "Expect mild redness, a little like light sunburn, for one to two days, and possibly slight swelling. Downtime is minimal.",
        },
        {
          q: "How many sessions will I need?",
          a: "It depends on your concern. Fine lines may improve after a few sessions, while deeper acne scarring usually needs a longer course. We'll give you a realistic plan at your consultation.",
        },
      ],
    },
  },
  {
    slug: "chemical-peels",
    name: "Chemical Peels",
    eyebrow: "Exfoliate, resurface, reveal",
    headline: "Clearer, brighter skin, one layer at a time",
    short: "Peels for acne, dark marks, uneven tone and texture, for your face and your body.",
    image: "/images/treatments/brushes.jpg",
    imagePosition: "50% 50%",
    heroImage: "/images/treatments/brushes.jpg",
    heroPosition: "50% 55%",
    detailImage: "/images/treatments/tools-dark.jpg",
    details: {
      about: [
        "A chemical peel uses a carefully chosen solution to lift away the top layer of dead skin, revealing fresher, clearer skin underneath. Peels can soften fine lines and improve acne, scarring and uneven colouring. Results can last weeks or months, depending on the depth of the peel and how you care for your skin afterwards.",
        "No two skins are the same, so we keep a range of peels with different ingredients and strengths. After your consultation we choose the one that suits your skin and your goals, and give you products to prepare your skin beforehand.",
      ],
      benefitsTitle: "What peels can do",
      benefits: [
        "Minimise large pores, dullness and discolouration",
        "Reveal plump, dewy, glowing skin",
        "Treat acne and help prevent future breakouts",
        "Fade dark marks left by acne (PIH)",
        "Improve skin tone and texture",
        "Calm inflammation in active spots",
      ],
      facts: [
        { label: "Peel depth", value: "Superficial to medium" },
        { label: "Downtime", value: "2–5 days" },
        { label: "From", value: "₦85,500" },
      ],
      aftercare: [
        "Follow your aftercare guide closely.",
        "Keep out of strong sun and wear SPF every day.",
        "Not everyone peels visibly, and that's fine. Shedding isn't a sign of how well a peel worked.",
      ],
      extraList: {
        title: "The Signature Body Peel can help with",
        items: [
          "Hyperpigmentation",
          "Body acne",
          "Chest acne",
          "Keratosis pilaris",
          "Sun damage",
          "Dark knuckles",
          "Dark feet",
          "Dark elbows and knees",
          "Acne scars on the body",
          "Post-inflammatory hyperpigmentation",
        ],
      },
      faqs: [
        {
          q: "Will I peel a lot?",
          a: "It depends on the strength of the peel and your skin. Some people shed lightly for a few days, others don't visibly peel at all. Both are normal.",
        },
        {
          q: "Are peels safe for darker skin tones?",
          a: "Yes, when the right peel is chosen and your skin is properly prepared. That's why every peel at SKNN LAB starts with a consultation and a short preparation routine.",
        },
      ],
    },
  },
  {
    slug: "advanced",
    name: "Advanced & Wellness",
    eyebrow: "Beyond the facial",
    headline: "Advanced care, planned around you",
    short: "Exosome treatment, IV infusion and waxing, each assessed and priced at your consultation.",
    image: "/images/treatments/hydra-machine.jpg",
    imagePosition: "50% 40%",
    heroImage: "/images/clinic/treatment-room.jpg",
    heroPosition: "50% 50%",
    details: {
      about: [
        "Alongside our main menu, we offer advanced and wellness treatments. Because suitability and pricing depend on your skin and your health, we talk each one through with you at your consultation before anything is booked.",
      ],
      facts: [
        { label: "Pricing", value: "At consultation" },
        { label: "Suitability", value: "Assessed first" },
        { label: "Start with", value: "A consultation" },
      ],
    },
  },
];

export const treatments: Treatment[] = [
  // Consultation & Analysis
  {
    slug: "consultation",
    name: "Skin Consultation",
    category: "consultation",
    price: 10000,
    duration: "30 mins",
    note: "In clinic or online",
    summary:
      "We examine your skin and talk through your concerns, routine and lifestyle. Together we set clear goals and build a plan, with advice on the treatments and products that suit you.",
    featured: true,
  },
  {
    slug: "skin-analysis",
    name: "Skin Analysis",
    category: "consultation",
    price: null,
    summary:
      "A detailed, magnified look at your skin's texture, congestion, pigmentation and hydration, so every recommendation is based on what we can actually see.",
  },

  // Facials
  {
    slug: "refreshing-facial",
    name: "Refreshing Facial",
    category: "facials",
    price: 38500,
    duration: "50 mins",
    summary:
      "Our classic facial: a double cleanse, gentle exfoliation, extractions and a mask. An easy way to glow without an intensive treatment, and a lovely choice during pregnancy.",
  },
  {
    slug: "customised-facial",
    name: "Customised Facial",
    category: "facials",
    price: 75000,
    duration: "1 hr 30 mins",
    note: "Best for first visits",
    summary:
      "We start with a full skin analysis, then build the facial around your concerns and goals. The best place to begin if you're new to SKNN LAB.",
    featured: true,
  },
  {
    slug: "dermaplaning-facial",
    name: "Dermaplaning Facial",
    category: "facials",
    price: 45350,
    duration: "1 hr 30 mins",
    summary:
      "A fine blade gently removes dead skin and soft facial hair for a smooth, bright finish, followed by a hydrating jelly mask.",
  },
  {
    slug: "gentlemans-facial",
    name: "Gentleman's Facial",
    category: "facials",
    price: 65000,
    duration: "1 hr 30 mins",
    summary:
      "Designed for men's skin: purifying, detoxifying and rebalancing, with LED light therapy and a relaxing face and chest massage.",
  },
  {
    slug: "brightening-signature-facial",
    name: "Brightening Signature Facial",
    category: "facials",
    price: 85900,
    duration: "1 hr 30 mins",
    note: "Our signature",
    summary:
      "Made for big days, or whenever you want plump, glowing skin. Massage, hydra therapy, extractions, LED light and a nourishing mask, finished with a gentle brightening peel.",
    featured: true,
  },
  {
    slug: "acne-control-facial",
    name: "Acne Control Facial",
    category: "facials",
    price: 57500,
    duration: "1 hr 20 mins",
    summary:
      "Clears excess oil and congestion, then uses high-frequency therapy to calm breakouts and support healthy skin renewal.",
  },
  {
    slug: "hydra-facial",
    name: "Hydra Facial",
    category: "facials",
    price: 64500,
    duration: "1 hr 20 mins",
    summary:
      "Lifts away dry, dead skin while infusing a hydrating serum at the same time. It also boosts circulation for a fresh, even, dewy finish.",
  },
  {
    slug: "back-facial",
    name: "Back Facial",
    category: "facials",
    price: 70000,
    // TODO: brochure says "1 hour 39 minutes". Confirm with the clinic.
    duration: "1 hr 39 mins",
    summary:
      "A deep clean for the back: cleansing and extractions with antibacterial ingredients to clear congestion, then a healing mask and non-clogging finish.",
  },

  // Microneedling
  {
    slug: "microneedling-anti-ageing",
    name: "Microneedling with Anti-Ageing Cocktail",
    category: "microneedling",
    price: 115800,
    duration: "1 hr",
    summary:
      "Targets fine lines, loss of firmness, dullness and uneven texture, leaving skin smoother, plumper and more radiant.",
  },
  {
    slug: "microneedling-c-prof",
    name: "Microneedling (C PROF)",
    category: "microneedling",
    price: 138600,
    duration: "1 hr",
    summary:
      "For dark marks, acne scars, pitted scarring and stretch marks. Boosts collagen to improve firmness and even out your overall tone.",
    featured: true,
  },
  {
    slug: "microneedling-chemical-peel",
    name: "Microneedling with Chemical Peel",
    category: "microneedling",
    price: 150000,
    duration: "1 hr",
    summary:
      "Two clinical treatments in one session. Microneedling helps the peel work deeper, so fresh skin comes through faster and results go further.",
  },

  // Chemical peels
  {
    slug: "superficial-peel",
    name: "Superficial Peel",
    category: "chemical-peels",
    price: 85500,
    duration: "30 mins",
    summary:
      "A gentle peel that refines texture and evens tone. Suitable for every skin type, including sensitive skin.",
  },
  {
    slug: "acne-corrective-peel",
    name: "Acne Corrective Peel",
    category: "chemical-peels",
    price: 119900,
    duration: "30 mins",
    summary:
      "Unclogs pores, calms active acne and redness, controls excess oil and fades the dark marks breakouts leave behind.",
  },
  {
    slug: "acne-facial-corrective-peel",
    name: "Acne Facial & Corrective Peel",
    category: "chemical-peels",
    price: 145000,
    duration: "1 hr 45 mins",
    summary:
      "Our most complete acne treatment: deep cleanse, enzyme exfoliation, extractions, steam and LED light, followed by a medium-depth peel.",
    featured: true,
  },
  {
    slug: "medium-depth-peel",
    name: "Medium Depth Peel",
    category: "chemical-peels",
    price: 120000,
    duration: "30 mins",
    summary:
      "A stronger peel, prescribed after your consultation. Ideal for patches of pigmentation or uneven tone caused by sun, ageing or environment.",
  },
  {
    slug: "combination-peel",
    name: "Combination Peel",
    category: "chemical-peels",
    price: 125000,
    duration: "40 mins",
    summary:
      "Two peels layered and tailored to your concerns for a stronger result on acne, pigmentation, texture and enlarged pores.",
  },
  {
    slug: "micro-droplets-peel",
    name: "Micro-Droplets Peel",
    category: "chemical-peels",
    price: 130500,
    duration: "1 hr",
    summary:
      "Tiny, precise droplets spot-treat dark marks left by acne, for a smooth, natural and subtle result.",
  },
  {
    slug: "signature-body-peel",
    name: "Signature Body Peel",
    category: "chemical-peels",
    price: 105000,
    duration: "30 mins – 1 hr",
    summary:
      "Your body deserves the same care as your face. Clears body and chest acne and brightens dark knuckles, elbows, knees and feet.",
  },

  // Advanced & wellness
  {
    slug: "exosome-treatment",
    name: "Exosome Treatment",
    category: "advanced",
    price: null,
    summary:
      "An advanced regenerative skin treatment. We'll assess your skin and explain whether it suits your goals at your consultation.",
  },
  {
    slug: "iv-infusion",
    name: "IV Infusion",
    category: "advanced",
    price: null,
    summary: "Intravenous therapy given in the clinic. We check your suitability at consultation before any infusion.",
  },
  {
    slug: "waxing",
    name: "Waxing",
    category: "advanced",
    price: null,
    summary: "Professional hair removal. Tell us which areas you'd like treated when you book and we'll confirm the price.",
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getTreatment = (slug: string) => treatments.find((t) => t.slug === slug);
export const treatmentsIn = (slug: CategorySlug) => treatments.filter((t) => t.category === slug);
export const featuredTreatments = () => treatments.filter((t) => t.featured);

export function fromPrice(slug: CategorySlug) {
  const prices = treatmentsIn(slug)
    .map((t) => t.price)
    .filter((p): p is number => p !== null);
  return prices.length ? Math.min(...prices) : null;
}
