/** "What would you like to change?" — helps visitors start from their concern, not a treatment name. */
export type Concern = {
  slug: string;
  name: string;
  line: string;
  text: string;
  image: string;
  position?: string;
  treatments: string[]; // treatment slugs
};

export const concerns: Concern[] = [
  {
    slug: "acne",
    name: "Acne & breakouts",
    line: "Calm active spots and keep pores clear.",
    text: "Breakouts happen when oil, dead skin and bacteria build up in the pores. We clear the congestion, calm the inflammation and help stop new spots from forming.",
    image: "/images/treatments/high-frequency.jpg",
    position: "50% 40%",
    treatments: ["acne-control-facial", "acne-corrective-peel", "acne-facial-corrective-peel"],
  },
  {
    slug: "dark-spots",
    name: "Dark spots & uneven tone",
    line: "Fade marks left by acne, sun and time.",
    text: "Dark marks are extra pigment your skin produces after a breakout, sun exposure or irritation. Targeted peels and microneedling break it up gradually for a clearer, even tone.",
    image: "/images/treatments/brushes.jpg",
    position: "50% 50%",
    treatments: ["micro-droplets-peel", "medium-depth-peel", "microneedling-c-prof"],
  },
  {
    slug: "ageing",
    name: "Fine lines & firmness",
    line: "Rebuild collagen for smoother, firmer skin.",
    text: "From our late twenties, collagen slowly declines and lines begin to settle. Collagen-boosting treatments help your skin rebuild its own support.",
    image: "/images/treatments/microneedling.jpg",
    position: "50% 45%",
    treatments: ["microneedling-anti-ageing", "microneedling-chemical-peel", "brightening-signature-facial"],
  },
  {
    slug: "dullness",
    name: "Dullness & dehydration",
    line: "Bring back hydration, bounce and glow.",
    text: "When dead cells build up and moisture drops, skin looks flat and feels tight. Deep exfoliation and hydration restore the glow quickly, often in a single visit.",
    image: "/images/treatments/hydra-machine.jpg",
    position: "50% 40%",
    treatments: ["hydra-facial", "brightening-signature-facial", "refreshing-facial"],
  },
  {
    slug: "texture",
    name: "Scars & rough texture",
    line: "Smooth bumps, pitted scars and large pores.",
    text: "Uneven texture often comes from old acne scars or a slow rate of renewal. Resurfacing treatments encourage fresh, smoother skin to come through.",
    image: "/images/treatments/microneedling-pen.jpg",
    position: "50% 50%",
    treatments: ["microneedling-c-prof", "combination-peel", "dermaplaning-facial"],
  },
  {
    slug: "body",
    name: "Body concerns",
    line: "Care for back, chest, knees, elbows and more.",
    text: "Body acne and darker knuckles, elbows, knees or feet are common and very treatable. Our body treatments are tailored to the area and your goals.",
    image: "/images/clinic/treatment-room.jpg",
    position: "50% 60%",
    treatments: ["signature-body-peel", "back-facial"],
  },
];
