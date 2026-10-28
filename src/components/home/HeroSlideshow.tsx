"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { DropDivider } from "@/components/ui/icons";
import { SplitWords } from "@/components/motion/SplitWords";
import { cn } from "@/lib/utils";

type Slide = {
  image: string;
  alt: string;
  position: string;
  eyebrow: string;
  title: string;
  italicFrom: number;
  text: string;
  cta: { label: string; href: string };
};

const slides: Slide[] = [
  {
    image: "/images/clinic/reception.jpg",
    alt: "The SKNN LAB reception and lounge in Lekki, Lagos",
    position: "50% 58%",
    eyebrow: "Aesthetic clinic in Lekki, Lagos",
    title: "Redefining beauty through science and self-care",
    italicFrom: 3,
    text: "Clinical facials, peels and microneedling, planned around your skin by people who take the time to understand it.",
    cta: { label: "Explore treatments", href: "/treatments" },
  },
  {
    image: "/images/clinic/treatment-room.jpg",
    alt: "A SKNN LAB treatment room with professional skincare equipment",
    position: "50% 55%",
    eyebrow: "Expert care, visible results",
    title: "Treatments built around your skin",
    italicFrom: 3,
    text: "Every plan starts with a close look at your skin, so each treatment targets what it actually needs.",
    cta: { label: "Book a consultation", href: "/book?treatment=consultation" },
  },
  {
    image: "/images/founder/bridget-treatment-room.jpg",
    alt: "Bridget Oshomah, founder of SKNN LAB, in the clinic's treatment room",
    position: "50% 36%",
    eyebrow: "Led by founder Bridget Oshomah",
    title: "Beautiful skin requires commitment, not a miracle",
    italicFrom: 3,
    text: "Honest advice, realistic goals and steady care from a team that stays with you for the whole journey.",
    cta: { label: "Meet the founder", href: "/about" },
  },
  {
    image: "/images/treatments/facial-mask.jpg",
    alt: "A client receiving a professional facial mask at SKNN LAB",
    position: "50% 42%",
    eyebrow: "It's glow time",
    title: "It's time for a skin reset",
    italicFrom: 4,
    text: "From a 50-minute refreshing facial to our Brightening Signature Facial, find the treatment that fits your skin and your day.",
    cta: { label: "View facials", href: "/treatments/facials" },
  },
];

const DURATION = 7000;

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-12%"]);

  const go = useCallback((i: number) => setIndex((i + slides.length) % slides.length), []);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, DURATION);
    return () => clearTimeout(t);
  }, [index, paused, next]);

  const slide = slides[index];
  const Heading = index === 0 ? "h1" : "h2";

  return (
    <section
      ref={ref}
      aria-roledescription="carousel"
      aria-label="Welcome to SKNN LAB"
      className="surface-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-espresso"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
    >
      <motion.div style={{ y: reduce ? 0 : imageY }} className="absolute inset-0 -z-20">
        {slides.map((s, i) => (
          <div
            key={s.image}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1600ms] ease-out",
              i === index ? "opacity-100" : "opacity-0",
            )}
          >
            <div key={i === index ? `on-${index}` : "off"} className={cn("absolute inset-0", i === index && "animate-kenburns")}>
              <Image
                src={s.image}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: s.position }}
              />
            </div>
          </div>
        ))}
      </motion.div>
      <div className="hero-wash absolute inset-0 -z-10" />

      <motion.div
        style={{ opacity: reduce ? 1 : contentOpacity, y: reduce ? 0 : contentY }}
        className="hero-text container flex flex-1 items-center justify-center pb-40 pt-36 text-center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -18, transition: { duration: 0.45 } }}
            aria-live="polite"
          >
            <motion.p
              className="eyebrow !text-gold"
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {slide.eyebrow}
            </motion.p>
            <Heading className="mx-auto mt-6 max-w-5xl text-[3.1rem] leading-[0.98] !text-white sm:text-[4.6rem] md:text-[6rem] lg:text-[6.8rem]">
              <SplitWords text={slide.title} italicFrom={slide.italicFrom} inView={false} delay={0.15} stagger={0.08} />
            </Heading>
            <motion.div initial={{ opacity: 0, scaleX: 0.3 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 1, delay: 0.6 }}>
              <DropDivider className="mt-8" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              className="mx-auto mt-7 max-w-xl !text-center text-base text-white/90 [hyphens:manual] md:text-lg"
            >
              {slide.text}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85 }}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            >
              <Link href="/book" className="btn btn-primary w-full sm:w-auto">
                Book an appointment <ArrowRight className="arrow h-4 w-4" />
              </Link>
              <Link href={slide.cta.href} className="btn btn-light w-full sm:w-auto">
                {slide.cta.label}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Bottom bar: key facts and slide controls */}
      <div className="absolute inset-x-0 bottom-0 border-t border-white/15 bg-gradient-to-t from-black/30 to-transparent backdrop-blur-[2px]">
        <div className="container flex items-center justify-between gap-6 py-5">
          <ul className="hidden items-center gap-8 font-sans text-[0.8rem] text-white/85 lg:flex">
            <li>Consultations from ₦10,000</li>
            <li className="h-4 w-px bg-white/30" aria-hidden="true" />
            <li>In clinic or online</li>
            <li className="h-4 w-px bg-white/30" aria-hidden="true" />
            <li>Lekki Phase 1, Lagos</li>
          </ul>
          <div className="flex w-full items-center justify-center gap-5 lg:w-auto lg:justify-end">
            <p className="hidden font-sans text-xs tracking-[0.3em] text-white/80 sm:block">
              <span className="text-gold">{String(index + 1).padStart(2, "0")}</span> / {String(slides.length).padStart(2, "0")}
            </p>
            <div className="flex items-center gap-2.5" role="tablist" aria-label="Choose slide">
              {slides.map((s, i) => (
                <button
                  key={s.image}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => go(i)}
                  className="relative h-[3px] w-10 overflow-hidden rounded-full bg-white/30 md:w-14"
                >
                  {i === index && (
                    <span
                      key={`p-${index}-${paused}`}
                      className="absolute inset-0 origin-left bg-gold"
                      style={{
                        animation: paused || reduce ? "none" : `progress ${DURATION}ms linear forwards`,
                        transform: paused || reduce ? "scaleX(1)" : undefined,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <button type="button" onClick={prev} aria-label="Previous slide" className="grid h-11 w-11 place-items-center rounded-full border border-white/40 text-white transition-colors hover:border-gold hover:bg-gold hover:text-espresso">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button type="button" onClick={next} aria-label="Next slide" className="grid h-11 w-11 place-items-center rounded-full border border-white/40 text-white transition-colors hover:border-gold hover:bg-gold hover:text-espresso">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
