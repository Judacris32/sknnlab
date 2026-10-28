"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { DropDivider } from "./icons";
import { SplitWords } from "@/components/motion/SplitWords";

/** Inner-page hero: full-bleed photograph (lightly washed) with centered content on top. */
export function PageHero({
  image,
  alt,
  eyebrow,
  title,
  italicFrom,
  subtitle,
  position = "50% 50%",
  crumbs = [],
  compact,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  italicFrom?: number;
  subtitle?: string;
  position?: string;
  crumbs?: { label: string; href?: string }[];
  compact?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className={`surface-dark relative isolate flex items-center justify-center overflow-hidden bg-espresso pb-20 pt-40 ${
        compact ? "min-h-[56svh]" : "min-h-[78svh] md:min-h-[82vh]"
      }`}
    >
      <motion.div style={{ y: reduce ? 0 : y }} className="absolute inset-0 -z-20">
        <Image
          src={image}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="animate-kenburns object-cover"
          style={{ objectPosition: position }}
        />
      </motion.div>
      <div className="hero-wash absolute inset-0 -z-10" />

      <motion.div style={{ opacity: reduce ? 1 : fade }} className="hero-text container text-center">
        <motion.nav
          aria-label="Breadcrumb"
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <ol className="flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-sans text-[0.68rem] uppercase tracking-[0.2em] text-white/85 backdrop-blur-md">
            <li>
              <Link href="/" className="transition-colors hover:text-gold">Home</Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3" aria-hidden="true" />
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-gold">{c.label}</Link>
                ) : (
                  <span aria-current="page" className="text-gold">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </motion.nav>
        <motion.p
          className="eyebrow !text-gold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {eyebrow}
        </motion.p>
        <h1 className="mx-auto mt-5 max-w-4xl text-[3rem] leading-[1] !text-white sm:text-[4.2rem] md:text-[5.4rem]">
          <SplitWords text={title} italicFrom={italicFrom} delay={0.25} stagger={0.07} inView={false} />
        </h1>
        <motion.div initial={{ opacity: 0, scaleX: 0.4 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.9, delay: 0.6 }}>
          <DropDivider className="mt-8" />
        </motion.div>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mx-auto mt-6 max-w-2xl !text-center text-base text-white/90 [hyphens:manual] md:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
