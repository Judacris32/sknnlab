/**
 * Treatment menu: the one place prices, durations and descriptions live.
 * Only the approved price list is used: durations appear only where it gives them (massages).
 * Treatment pages, the booking form, the homepage and the emails all read from here.
 *
 * price: number in Naira, or null for "Price on consultation".
 * Prices follow the clinic's approved price list (Website Price Audit v2, Nov 2026).
 * Only services on the approved list are shown. Items marked "CONFIRM" need a final check with the clinic.
 */

export type CategorySlug =
  | "consultation"
  | "facials"
  | "microneedling"
  | "chemical-peels"
  | "skin-tags"
  | "waxing"
  | "massage";

export type Treatment = {
  slug: string;
  name: string;
  category: CategorySlug;
  price: number | null;
  duration?: string;
  /** Treatments without a summary show as a compact price-list row. */
  summary?: string;
  /** Sub-heading on the menu. Must match a group name on the category. */
  group?: string;
  featured?: boolean;
  note?: string;
};

export type Faq = { q: string; a: string };

/** Use as a fact value to show the category's lowest price, worked out from the menu. */
export const FROM_PRICE = "{from}";

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

export type MenuGroup = { name: string; intro?: string };

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
  /** Optional sub-headings that split a long menu, in display order. */
  groups?: MenuGroup[];
  details?: CategoryDetails;
};

export const categories: Category[] = [
  {
    slug: "consultation",
    name: "Consultation & Analysis",
    eyebrow: "Where every journey begins",
    headline: "Understand your skin before you treat it",
    short: "A close look at your skin and an honest plan for it, in the clinic, online or with our face analysis machine.",
    image: "/images/clinic/consultation-chat.jpg",
    imagePosition: "50% 62%",
    heroImage: "/images/clinic/consultation-room.jpg",
    heroPosition: "50% 58%",
    detailImage: "/images/founder/bridget-at-work.jpg",
    details: {
      about: [
        "Good results start with understanding. In your consultation we examine your skin closely and talk about what's bothering you, how you live, what you eat and what you use on your skin today.",
        "Then we agree on clear goals and map out a plan to reach them. You'll leave knowing which treatments and products suit your skin, and which ones you can skip.",
        "You can meet us at the clinic or online. For the most detailed picture of your skin, book a Face Analysis, where our machine maps what the eye can't see.",
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
        { label: "Where", value: "Clinic or online" },
        { label: "Face analysis", value: "With our machine" },
        { label: "From", value: FROM_PRICE },
      ],
      faqs: [
        {
          q: "Do I need a consultation before a treatment?",
          a: "It's the best place to start. Every chemical peel begins with a thorough consultation so we can choose the right peel for your skin. If you'd like a facial, first-time clients are encouraged to book the Customised Facial, which includes a full skin analysis.",
        },
        {
          q: "Can I have my consultation online?",
          a: "Yes. Choose the Virtual Consultation when you book and we'll meet you online. If you'd prefer to come in, book the Physical Consultation and we'll see you at the clinic.",
        },
        {
          q: "What's the difference between a consultation and a face analysis?",
          a: "A consultation is a one-to-one conversation and a close look at your skin. The Face Analysis adds our skin analysis machine, which maps texture, pigmentation and congestion beneath the surface, so your plan is based on what we can measure as well as what we can see.",
        },
      ],
    },
  },
  {
    slug: "facials",
    name: "Facials",
    eyebrow: "Cleanse, treat, glow",
    headline: "Facials that do more than pamper",
    short: "Clinical facials for glow, hydration, breakouts and texture, each built around a clear result.",
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
        { label: "Downtime", value: "None" },
        { label: "For", value: "Face and back" },
        { label: "From", value: FROM_PRICE },
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
    short: "Collagen-boosting treatments for fine lines, acne scars, dark marks and texture, on their own or combined.",
    image: "/images/treatments/microneedling-session.jpg",
    imagePosition: "45% 58%",
    heroImage: "/images/treatments/microneedling-session.jpg",
    heroPosition: "50% 55%",
    detailImage: "/images/treatments/microneedling-pen.jpg",
    groups: [
      { name: "Microneedling" },
      {
        name: "Combination treatments",
        intro: "Microneedling paired with a second treatment in the same session, for a stronger, more targeted result. We'll recommend the right pairing at your consultation.",
      },
    ],
    details: {
      about: [
        "Microneedling, also called collagen induction therapy, uses very fine sterile needles to make tiny, controlled channels in the skin. Your skin responds by repairing itself, producing fresh collagen and elastin that leave it firmer and smoother over time.",
        "It's a minimally invasive treatment with little or no downtime. We numb your skin beforehand, so the treatment itself is comfortable.",
        "Microneedling can also be combined with a chemical peel, exosomes, PRP or targeted serums in the same session, so each treatment works harder.",
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
        { label: "Options", value: "Solo or combined" },
        { label: "Downtime", value: "1–2 days of mild redness" },
        { label: "From", value: FROM_PRICE },
      ],
      notes: [
        "You'll start to see results within a few weeks.",
        "Most people need several sessions for the best result, depending on how deep the concern is.",
      ],
      faqs: [
        {
          q: "Does microneedling hurt?",
          a: "Your skin is numbed before we begin, so most clients feel only light pressure and a mild scratching sensation.",
        },
        {
          q: "What will my skin look like afterwards?",
          a: "Expect mild redness, a little like light sunburn, for one to two days, and possibly slight swelling. Downtime is minimal.",
        },
        {
          q: "How many sessions will I need?",
          a: "It depends on your concern. Fine lines may improve after a few sessions, while deeper acne scarring usually needs a longer course. We'll give you a realistic plan at your consultation.",
        },
        {
          q: "Which combination treatment is right for me?",
          a: "It depends on your skin and your goal. We'll look at your skin at your consultation and recommend the pairing that suits it, or plain microneedling if that's all you need.",
        },
      ],
    },
  },
  {
    slug: "chemical-peels",
    name: "Chemical Peels",
    eyebrow: "Exfoliate, resurface, reveal",
    headline: "Clearer, brighter skin, one layer at a time",
    short: "Face and body peels for acne, dark marks, uneven tone and texture.",
    image: "/images/treatments/category-peels.jpg",
    imagePosition: "50% 38%",
    heroImage: "/images/treatments/brushes.jpg",
    heroPosition: "50% 55%",
    detailImage: "/images/treatments/tools-dark.jpg",
    groups: [
      { name: "Face peels" },
      {
        name: "Advanced peels",
        intro: "Modern formulas for firmer, brighter skin, with little or no visible peeling.",
      },
      {
        name: "Cosmelan",
        intro: "A specialist treatment for stubborn dark patches and melasma, started in the clinic and continued at home.",
      },
      {
        name: "Body peels",
        intro: "For body acne, dark patches and uneven tone on larger areas, priced by area.",
      },
    ],
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
        { label: "Downtime", value: "Usually 2–5 days" },
        { label: "From", value: FROM_PRICE },
      ],
      aftercare: [
        "Follow your aftercare guide closely.",
        "Keep out of strong sun and wear SPF every day.",
        "Not everyone peels visibly, and that's fine. Shedding isn't a sign of how well a peel worked.",
      ],
      extraList: {
        title: "Our body peels can help with",
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
        {
          q: "What is Cosmelan, and why is it priced differently?",
          a: "Cosmelan is a specialist programme for stubborn pigmentation and melasma. It starts with a mask applied in the clinic and continues with home-care products over the following months. You can book the full programme with home care, or the in-clinic mask on its own.",
        },
      ],
    },
  },
  {
    slug: "skin-tags",
    name: "Skin Tag & DPN Removal",
    eyebrow: "Smooth, clear skin",
    headline: "Gentle removal of skin tags and DPN",
    short: "Careful removal of skin tags and DPN, priced by how many you'd like removed.",
    image: "/images/treatments/category-skin-tags.jpg",
    imagePosition: "45% 45%",
    heroImage: "/images/treatments/category-skin-tags.jpg",
    heroPosition: "45% 45%",
    detailImage: "/images/clinic/analysis-handheld.jpg",
    details: {
      about: [
        "Skin tags are small, soft growths of skin that often appear where skin rubs, such as the neck, underarms and eyelids. DPN (dermatosis papulosa nigra) are small, dark, raised spots that are very common on melanin-rich skin, usually on the cheeks, around the eyes and on the neck.",
        "Both are harmless, but many people prefer them gone. We look at every spot before we treat it, agree with you which ones to remove, and price your session by how many there are and how large they are.",
      ],
      benefitsTitle: "Good for",
      benefits: [
        "Skin tags on the neck, underarms, eyelids and body",
        "DPN on the face and neck",
        "Smoother-looking skin",
        "Removing spots that catch on jewellery or clothing",
      ],
      facts: [
        { label: "Assessment", value: "Every spot checked" },
        { label: "Pricing", value: "By number and size" },
        { label: "From", value: FROM_PRICE },
      ],
      aftercare: [
        "Keep the treated areas clean and dry.",
        "Small scabs may form. Let them fall off on their own and don't pick them.",
        "Wear SPF on treated areas to help prevent dark marks.",
      ],
      faqs: [
        {
          q: "What is DPN?",
          a: "Dermatosis papulosa nigra: small, dark, raised spots that often run in families and are very common on darker skin. They're harmless, but they can increase in number over time.",
        },
        {
          q: "How is the price worked out?",
          a: "By how many skin tags or DPN you'd like removed, and how large they are. We'll count them with you and confirm the price before we start.",
        },
        {
          q: "Will they come back?",
          a: "A spot that has been removed usually doesn't return, but new skin tags or DPN can appear over time. You're welcome to come back whenever you need.",
        },
      ],
    },
  },
  {
    slug: "waxing",
    name: "Waxing",
    eyebrow: "Face and body waxing",
    headline: "Smooth skin, from brows to full body",
    short: "Clean, careful waxing for the face and body, for women and men, with a clear price for every area.",
    image: "/images/treatments/category-waxing.jpg",
    imagePosition: "45% 50%",
    heroImage: "/images/treatments/category-waxing.jpg",
    heroPosition: "50% 50%",
    detailImage: "/images/clinic/treatment-room.jpg",
    groups: [
      { name: "Face" },
      { name: "Arms & underarms" },
      { name: "Legs" },
      { name: "Chest & stomach" },
      { name: "Bikini & intimate" },
      { name: "Full body" },
    ],
    details: {
      about: [
        "Waxing removes hair from the root, so your skin stays smoother for longer than shaving. We work cleanly and carefully, with products suited to sensitive areas, and we treat both women and men.",
        "Choose the areas you'd like below. If you're booking more than one, list them in your booking notes and we'll plan your appointment around them.",
      ],
      benefitsTitle: "Before your appointment",
      benefits: [
        "Let hair grow to about half a centimetre",
        "Gently exfoliate a day or two before",
        "Skip lotions and oils on the area that day",
        "Wear loose, comfortable clothing",
      ],
      notSuitable: [
        "Taken isotretinoin (Roaccutane) in the last six months",
        "Used retinoid creams on the area in the past week",
        "Sunburn, broken or irritated skin on the area",
        "Had a peel or microneedling on the area recently",
      ],
      facts: [
        { label: "For", value: "Women and men" },
        { label: "Areas", value: "Face to full body" },
        { label: "From", value: FROM_PRICE },
      ],
      aftercare: [
        "Avoid hot baths, saunas, the gym and strong sun for 24 hours.",
        "Wear loose clothing over freshly waxed areas.",
        "Start gentle exfoliation after two days to help prevent ingrown hairs.",
      ],
      faqs: [
        {
          q: "What's the difference between a Brazilian and a Hollywood wax?",
          a: "A Brazilian removes hair from the front, underneath and behind, and can leave a small strip at the front if you like. A Hollywood removes all of it.",
        },
        {
          q: "How long will my skin stay smooth?",
          a: "Usually three to five weeks, depending on how fast your hair grows. With regular waxing, many people find their hair grows back finer.",
        },
        {
          q: "Can I book more than one area?",
          a: "Yes. Choose the main area in the booking form and list the others in your notes. We'll confirm your total when we contact you.",
        },
      ],
    },
  },
  {
    slug: "massage",
    name: "Massage",
    eyebrow: "Relax, restore, reset",
    headline: "Massages to melt away tension",
    short: "Full-body and short massages, from gentle Swedish relaxation to deep tissue and hot stone.",
    image: "/images/treatments/category-massage.jpg",
    imagePosition: "55% 50%",
    heroImage: "/images/treatments/category-massage.jpg",
    heroPosition: "55% 45%",
    detailImage: "/images/clinic/treatment-suite.jpg",
    groups: [
      { name: "Full-body massages", intro: "One unhurried hour of full-body care." },
      { name: "Short sessions", intro: "Focused relief when you're short on time." },
    ],
    details: {
      about: [
        "Good skin and a calm mind go together. Our massages are designed to ease tension, loosen tight muscles and give you a proper pause from a busy week.",
        "Choose a full hour for the whole body, or a shorter session focused on your head, neck or feet. Not sure which to pick? Tell us how you're feeling and we'll guide you.",
      ],
      benefitsTitle: "Good for",
      benefits: [
        "Stress and tension",
        "Tight shoulders, neck and back",
        "Muscle stiffness and knots",
        "Better rest and relaxation",
      ],
      facts: [
        { label: "Duration", value: "20 mins – 1 hr" },
        { label: "Pressure", value: "Light to deep" },
        { label: "From", value: FROM_PRICE },
      ],
      notes: [
        "Pregnant, recovering from an injury or managing a health condition? Let us know when you book so we can advise the right massage for you.",
      ],
      faqs: [
        {
          q: "Which massage should I choose?",
          a: "For pure relaxation, the Swedish Relaxation Massage. For knots and stiffness, Deep-Tissue. If you love warmth, try a hot stone massage. Short on time? A head, neck or reflexology session gives quick relief.",
        },
        {
          q: "Can I ask for lighter or firmer pressure?",
          a: "Of course. Tell your therapist at any time during your massage and they'll adjust the pressure for you.",
        },
      ],
    },
  },
];

export const treatments: Treatment[] = [
  // ── Consultation & Analysis ────────────────────────────────────────────
  {
    slug: "consultation",
    name: "Physical Consultation",
    category: "consultation",
    price: 25000,
    note: "At the clinic",
    summary:
      "We examine your skin and talk through your concerns, routine and lifestyle. Together we set clear goals and build a plan, with advice on the treatments and products that suit you.",
    featured: true,
  },
  {
    slug: "virtual-consultation",
    name: "Virtual Consultation",
    category: "consultation",
    price: 20000,
    note: "Online",
    summary:
      "The same honest conversation, wherever you are. We talk through your skin, your concerns and your routine online, then send you a clear plan.",
  },
  {
    // CONFIRM: audit asks whether "Face Analysis with the Machine" is the service formerly called Skin Analysis.
    slug: "skin-analysis",
    name: "Face Analysis with Machine",
    category: "consultation",
    price: 50000,
    summary:
      "Our skin analysis machine maps texture, pigmentation, congestion and hydration beneath the surface. We explain every result, so your plan is based on what we can measure, not guesswork.",
  },

  // ── Facials ────────────────────────────────────────────────────────────
  {
    slug: "refreshing-facial",
    name: "Refreshing Facial",
    category: "facials",
    price: 42100,
    summary:
      "Our classic facial: a double cleanse, gentle exfoliation, extractions and a mask. An easy way to glow without an intensive treatment, and a lovely choice during pregnancy.",
  },
  {
    slug: "dermaplaning-facial",
    name: "Dermaplaning Facial",
    category: "facials",
    price: 52500,
    summary:
      "A fine blade gently removes dead skin and soft facial hair for a smooth, bright finish, followed by a hydrating jelly mask.",
  },
  {
    slug: "hydra-facial",
    name: "Hydra Facial",
    category: "facials",
    price: 64500,
    summary:
      "Lifts away dry, dead skin while infusing a hydrating serum at the same time. It also boosts circulation for a fresh, even, dewy finish.",
  },
  {
    slug: "gentlemans-facial",
    name: "Gentleman's Facial",
    category: "facials",
    price: 65000,
    summary:
      "Designed for men's skin: purifying, detoxifying and rebalancing, with LED light therapy and a relaxing face and chest massage.",
  },
  {
    slug: "acne-control-facial",
    name: "Acne Control Facial",
    category: "facials",
    price: 66800,
    summary:
      "Clears excess oil and congestion, then uses high-frequency therapy to calm breakouts and support healthy skin renewal.",
  },
  {
    slug: "back-facial",
    name: "Back Facial",
    category: "facials",
    price: 70000,
    summary:
      "A deep clean for the back: cleansing and extractions with antibacterial ingredients to clear congestion, then a healing mask and non-clogging finish.",
  },
  {
    slug: "customised-facial",
    name: "Customised Facial",
    category: "facials",
    price: 75000,
    note: "Best for first visits",
    summary:
      "We start with a full skin analysis, then build the facial around your concerns and goals. The best place to begin if you're new to SKNN LAB.",
    featured: true,
  },
  {
    slug: "deep-cleansing-resetting-facial",
    name: "Deep Cleansing & Resetting Facial",
    category: "facials",
    price: 75000,
    summary:
      "A thorough reset for congested, tired skin. Deep cleansing, exfoliation and extractions clear the pores, then calming care leaves your skin balanced and fresh.",
  },
  {
    // CONFIRM: the approved list prints this as "Signature Brightening Signature Facial".
    slug: "brightening-signature-facial",
    name: "Brightening Signature Facial",
    category: "facials",
    price: 100000,
    note: "Our signature",
    summary:
      "Made for big days, or whenever you want plump, glowing skin. Massage, hydra therapy, extractions, LED light and a nourishing mask, finished with a gentle brightening peel.",
    featured: true,
  },

  // ── Microneedling ──────────────────────────────────────────────────────
  {
    slug: "microneedling-anti-ageing",
    name: "Microneedling with Anti-Ageing Cocktail",
    category: "microneedling",
    group: "Microneedling",
    price: 115800,
    summary:
      "Targets fine lines, loss of firmness, dullness and uneven texture, leaving skin smoother, plumper and more radiant.",
  },
  {
    slug: "microneedling-c-prof",
    name: "Microneedling + C PROF",
    category: "microneedling",
    group: "Microneedling",
    price: 155900,
    summary:
      "For dark marks, acne scars, pitted scarring and stretch marks. Boosts collagen to improve firmness and even out your overall tone.",
    featured: true,
  },
  {
    slug: "prp-microneedling",
    name: "PRP Microneedling",
    category: "microneedling",
    group: "Microneedling",
    price: 155900,
    summary:
      "Microneedling with PRP (platelet-rich plasma), prepared from a small sample of your own blood, to support repair and collagen for scars, texture and tired skin.",
  },
  {
    slug: "chemical-peel-microneedling",
    name: "Chemical Peel + Microneedling",
    category: "microneedling",
    group: "Combination treatments",
    price: 158500,
    summary:
      "A peel to resurface, paired with microneedling to boost collagen. A strong combination for dark marks, scarring and uneven texture.",
  },
  {
    // CONFIRM: was "Microneedling with Chemical Peel" at ₦150,000. Mapped to the approved
    // "Microneedling + Chemical Peels" (₦175,000). The clinic should confirm this mapping.
    slug: "microneedling-chemical-peel",
    name: "Microneedling + Chemical Peels",
    category: "microneedling",
    group: "Combination treatments",
    price: 175000,
    summary:
      "Two clinical treatments in one session. Microneedling helps the peel work deeper, so fresh skin comes through faster and results go further.",
  },
  {
    slug: "microneedling-c-prof-x-prof",
    name: "Microneedling + C PROF and X PROF",
    category: "microneedling",
    group: "Combination treatments",
    price: 175000,
    summary:
      "Our C PROF microneedling with X PROF added, for a more intensive, targeted treatment of stubborn marks and uneven tone.",
  },
  {
    slug: "microneedling-exosomes",
    name: "Microneedling + Exosomes",
    category: "microneedling",
    group: "Combination treatments",
    price: 180000,
    summary:
      "Microneedling followed by exosomes, an advanced regenerative treatment, to support faster recovery and a stronger collagen response.",
  },
  {
    slug: "microneedling-c-prof-pep",
    name: "Microneedling + C PROF and PEP",
    category: "microneedling",
    group: "Combination treatments",
    price: 180000,
    summary:
      "Our C PROF microneedling paired with PEP, to support firmness and repair while evening out your tone.",
  },

  // ── Chemical peels ─────────────────────────────────────────────────────
  {
    slug: "superficial-peel",
    name: "Superficial Peel",
    category: "chemical-peels",
    group: "Face peels",
    price: 102000,
    summary:
      "A gentle peel that refines texture and evens tone. Suitable for every skin type, including sensitive skin.",
  },
  {
    slug: "acne-corrective-peel",
    name: "Acne Corrective Peel",
    category: "chemical-peels",
    group: "Face peels",
    price: 126000,
    summary:
      "Unclogs pores, calms active acne and redness, controls excess oil and fades the dark marks breakouts leave behind.",
  },
  {
    slug: "acne-facial-corrective-peel",
    name: "Acne Facial + Acne Peel",
    category: "chemical-peels",
    group: "Face peels",
    price: 145000,
    summary:
      "Our most complete acne treatment: deep cleanse, enzyme exfoliation, extractions, steam and LED light, followed by an acne peel.",
    featured: true,
  },
  {
    slug: "medium-depth-peel",
    name: "Medium Depth Peel",
    category: "chemical-peels",
    group: "Face peels",
    price: 150000,
    summary:
      "A stronger peel, prescribed after your consultation. Ideal for patches of pigmentation or uneven tone caused by sun, ageing or environment.",
  },
  {
    slug: "combination-peel",
    name: "Combination Peel",
    category: "chemical-peels",
    group: "Face peels",
    price: 155500,
    summary:
      "Two peels layered and tailored to your concerns for a stronger result on acne, pigmentation, texture and enlarged pores.",
  },
  {
    slug: "prx-t33-peel",
    name: "PRX T33 Peel",
    category: "chemical-peels",
    group: "Advanced peels",
    price: 170000,
    summary:
      "A modern peel that firms, brightens and refines texture, so you can get straight back to your day.",
  },
  {
    slug: "prx-t33-peel-exosomes",
    name: "PRX T33 Peel + Exosomes",
    category: "chemical-peels",
    group: "Advanced peels",
    price: 250000,
    summary:
      "The PRX T33 Peel followed by exosomes, for deeper renewal and a smoother, more radiant result.",
  },
  {
    slug: "cosmelan-mask-peel",
    name: "Cosmelan Mask Peel Alone",
    category: "chemical-peels",
    group: "Cosmelan",
    price: 500000,
    summary: "The in-clinic Cosmelan depigmentation mask on its own, without the home-care products.",
  },
  {
    slug: "cosmelan-peel-home-care",
    name: "Cosmelan Peel + Home Care",
    category: "chemical-peels",
    group: "Cosmelan",
    price: 985000,
    note: "Full programme",
    summary:
      "The complete Cosmelan programme for stubborn pigmentation and melasma: the in-clinic mask, plus the home-care products that continue the work over the following months.",
  },
  { slug: "half-arms-peel", name: "Half-Arms Peel", category: "chemical-peels", group: "Body peels", price: 175500 },
  { slug: "full-arm-peel", name: "Full-Arm Peel", category: "chemical-peels", group: "Body peels", price: 195000 },
  { slug: "full-leg-peel", name: "Full-Leg Peel", category: "chemical-peels", group: "Body peels", price: 205000 },
  { slug: "full-back-peel", name: "Full-Back Peel", category: "chemical-peels", group: "Body peels", price: 222500 },

  // ── Skin tag & DPN removal ─────────────────────────────────────────────
  // CONFIRM: the printed list reads "DPW". DPN (dermatosis papulosa nigra) is used here.
  {
    slug: "skin-tag-removal-small",
    name: "Skin Tags / DPN: fewer than 5",
    category: "skin-tags",
    price: 50000,
    summary: "Removal of up to four skin tags or DPN in one session. We check each spot with you before we begin.",
  },
  {
    slug: "skin-tag-removal-large",
    name: "Skin Tags / DPN: 5 to 12",
    category: "skin-tags",
    price: 100000,
    note: "Varies by size and number",
    summary:
      "Removal of five to twelve skin tags or DPN. The final price depends on their size and number, and we'll confirm it with you before we start.",
  },

  // ── Waxing ─────────────────────────────────────────────────────────────
  { slug: "wax-upper-lip", name: "Upper Lip Wax", category: "waxing", group: "Face", price: 7000 },
  { slug: "wax-chin-ladies", name: "Chin Wax (Ladies)", category: "waxing", group: "Face", price: 8000 },
  { slug: "wax-brows", name: "Brows Wax", category: "waxing", group: "Face", price: 10000 },
  { slug: "wax-nose", name: "Nose Wax", category: "waxing", group: "Face", price: 10000 },
  { slug: "wax-ears", name: "Ears Wax", category: "waxing", group: "Face", price: 10000 },
  { slug: "wax-chin-men", name: "Chin Wax (Men)", category: "waxing", group: "Face", price: 20000 },

  { slug: "wax-underarms", name: "Underarm Wax", category: "waxing", group: "Arms & underarms", price: 18000 },
  { slug: "wax-half-arm", name: "Half-Arm Wax", category: "waxing", group: "Arms & underarms", price: 18000 },
  { slug: "wax-full-arms", name: "Full-Arms Wax", category: "waxing", group: "Arms & underarms", price: 30000 },

  { slug: "wax-half-leg", name: "Half-Leg Wax", category: "waxing", group: "Legs", price: 30000 },
  { slug: "wax-full-legs", name: "Full-Legs Wax", category: "waxing", group: "Legs", price: 40000 },

  { slug: "wax-upper-chest-ladies", name: "Upper Chest Wax (Ladies)", category: "waxing", group: "Chest & stomach", price: 20000 },
  { slug: "wax-upper-chest-men", name: "Upper Chest Wax (Men)", category: "waxing", group: "Chest & stomach", price: 30000 },
  { slug: "wax-chest-stomach-women", name: "Chest to Stomach Wax (Ladies)", category: "waxing", group: "Chest & stomach", price: 35000 },
  { slug: "wax-chest-stomach-men", name: "Chest to Stomach Wax (Men)", category: "waxing", group: "Chest & stomach", price: 35000 },

  { slug: "wax-bikini", name: "Bikini Wax", category: "waxing", group: "Bikini & intimate", price: 16000 },
  { slug: "wax-brazilian", name: "Brazilian Wax", category: "waxing", group: "Bikini & intimate", price: 35000 },
  { slug: "wax-hollywood", name: "Hollywood Wax", category: "waxing", group: "Bikini & intimate", price: 40000 },

  { slug: "wax-full-body", name: "Full Body Wax (without Brazilian)", category: "waxing", group: "Full body", price: 100000 },
  // CONFIRM: ₦150,000 appears handwritten on the printed list. Clinic to sign off before launch.
  { slug: "wax-full-body-brazilian", name: "Full Body Wax (with Brazilian)", category: "waxing", group: "Full body", price: 150000 },

  // ── Massage ────────────────────────────────────────────────────────────
  {
    slug: "swedish-relaxation-massage",
    name: "Swedish Relaxation Massage",
    category: "massage",
    group: "Full-body massages",
    price: 50000,
    duration: "1 hr",
    summary: "Long, flowing strokes that ease tension and calm the mind. Our gentlest full-body massage.",
  },
  {
    slug: "stress-cure-massage",
    name: "Stress-Cure Massage",
    category: "massage",
    group: "Full-body massages",
    price: 60000,
    duration: "1 hr",
    summary: "Focused on the places stress settles, the neck, shoulders and back, to help you unwind and reset.",
  },
  {
    slug: "deep-tissue-massage",
    name: "Deep-Tissue Massage",
    category: "massage",
    group: "Full-body massages",
    price: 70000,
    duration: "1 hr",
    summary: "Slow, firm pressure that works into the deeper layers of muscle to release knots and stiffness.",
  },
  {
    slug: "deep-tissue-hot-stone-massage",
    name: "Deep-Tissue Hot Stone Massage",
    category: "massage",
    group: "Full-body massages",
    price: 85000,
    duration: "1 hr",
    summary: "Deep-tissue techniques with warm stones, which help the pressure reach deeper while your muscles relax.",
  },
  {
    slug: "hot-stone-swedish-massage",
    name: "Hot Stone (Swedish) Massage",
    category: "massage",
    group: "Full-body massages",
    price: 90000,
    duration: "1 hr",
    summary: "A Swedish massage with smooth, heated stones that melt away tension and leave you deeply relaxed.",
  },
  {
    slug: "head-relief-massage",
    name: "Head Relief Massage",
    category: "massage",
    group: "Short sessions",
    price: 30000,
    duration: "20 mins",
    summary: "A short, soothing massage for the scalp, temples and head to ease tension.",
  },
  {
    slug: "head-neck-massage",
    name: "Head and Neck Massage",
    category: "massage",
    group: "Short sessions",
    price: 35000,
    duration: "30 mins",
    summary: "Releases tightness in the head, neck and shoulders. Ideal if you spend long hours at a desk.",
  },
  {
    slug: "reflexology-massage",
    name: "Reflexology Massage",
    category: "massage",
    group: "Short sessions",
    price: 30000,
    duration: "35 mins",
    summary: "Gentle, targeted pressure on points across the feet for a deeply calming treatment.",
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

/** The menu for a category, split into its groups (one unnamed group if it has none). */
export function menuFor(slug: CategorySlug) {
  const category = getCategory(slug)!;
  const list = treatmentsIn(slug);
  if (!category.groups) return [{ group: null, items: list }];
  return category.groups
    .map((group) => ({ group, items: list.filter((t) => t.group === group.name) }))
    .filter((g) => g.items.length > 0);
}

/** A sentence describing a treatment, falling back to its group or category for price-list items. */
export function describeTreatment(t: Treatment) {
  if (t.summary) return t.summary;
  const category = getCategory(t.category);
  const group = category?.groups?.find((g) => g.name === t.group);
  return group?.intro ?? category?.short ?? "";
}
