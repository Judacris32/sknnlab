import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { InstagramIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { SplitWords } from "@/components/motion/SplitWords";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { PhotoMarquee } from "@/components/home/PhotoMarquee";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet SKNN LAB Aesthetic Clinic in Lekki, Lagos, founded by Bridget Oshomah. Clinical skincare and genuine care, together.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    image: "/images/founder/bridget-skin-analysis.jpg",
    alt: "Bridget examining a client's skin under a magnifying lamp",
    position: "50% 45%",
    title: "Science first",
    text: "We choose treatments based on evidence and a close look at your skin, never on trends. We'll always explain what we recommend and why.",
  },
  {
    image: "/images/founder/bridget-at-work.jpg",
    alt: "Bridget giving a client one-to-one care",
    position: "60% 50%",
    title: "Personal, always",
    text: "No two clients get the same plan. Your skin type, lifestyle and goals shape every decision we make together.",
  },
  {
    image: "/images/treatments/facial-mask.jpg",
    alt: "A client relaxing during a facial treatment",
    position: "50% 40%",
    title: "Honest results",
    text: "Beautiful skin takes commitment, not a miracle. We set realistic expectations and stay with you for the whole journey.",
  },
  {
    image: "/images/clinic/treatment-room.jpg",
    alt: "A clean, well-equipped SKNN LAB treatment room",
    position: "50% 55%",
    title: "Clinical standards",
    text: "Professional-grade products, modern equipment and careful hygiene in every treatment room.",
  },
];

const firstVisit = [
  { title: "A warm welcome", text: "Settle into the lounge. There's no rush, and no question is too small." },
  { title: "Your skin, up close", text: "We examine your skin and talk through your concerns, routine and goals." },
  { title: "Your treatment", text: "Relax in a private room while we work with care and explain each step." },
  { title: "Aftercare and next steps", text: "You leave with clear aftercare advice and a plan for what comes next." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="/images/clinic/lounge.jpg"
        alt="The SKNN LAB lounge"
        position="40% 45%"
        eyebrow="Our story"
        title="Where science meets self-care"
        italicFrom={3}
        subtitle="An aesthetic clinic in the heart of Lekki, built on the belief that healthy skin is the foundation of confidence."
        crumbs={[{ label: "About" }]}
      />

      {/* Story */}
      <section className="section overflow-hidden">
        <div className="container grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <Reveal y={12}>
              <p className="eyebrow !text-left">Since {site.founded}</p>
            </Reveal>
            <h2 className="mt-5 text-[2.8rem] leading-[1.02] sm:text-6xl">
              <SplitWords text="A clinic built on knowledge and care" italicFrom={4} />
            </h2>
            <Reveal delay={0.15}>
              <div className="mt-8 h-px w-16 bg-primary" />
              <div className="mt-8 space-y-5">
                <p>
                  SKNN LAB Aesthetic Clinic opened in Lekki Phase 1 in {site.founded} with one purpose: to bring clinical expertise and genuine care together under one roof. Our team of qualified medical practitioners and skincare specialists creates solutions for each person, using the latest technology and techniques.
                </p>
                <p>
                  From relaxing facials to advanced treatments for acne, ageing and pigmentation, our menu covers every stage of your skin journey. Clients come to us for results, and they come back because they feel properly looked after.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Parallax offset={30} className="relative mt-16 aspect-[3/4] overflow-hidden rounded-[1.75rem]">
              <Image src="/images/clinic/treatment-suite.jpg" alt="A treatment suite with a neon “It’s glow time” sign" fill sizes="(min-width:1024px) 22vw, 45vw" className="scale-110 object-cover" style={{ objectPosition: "55% 45%" }} />
            </Parallax>
            <Parallax offset={60} className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem]">
              <Image src="/images/clinic/logo-wall.jpg" alt="The SKNN LAB logo wall in a treatment room" fill sizes="(min-width:1024px) 22vw, 45vw" className="scale-110 object-cover" style={{ objectPosition: "50% 35%" }} />
            </Parallax>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="surface-dark relative overflow-hidden bg-deep-section py-24 text-sand md:py-32">
        <div className="container grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-md lg:col-span-5">
            <div className="absolute -inset-4 rounded-[2.75rem] border border-gold/30" aria-hidden="true" />
            <div className="relative aspect-[1451/2330] overflow-hidden rounded-[2.25rem]">
              <Image
                src="/images/founder/bridget-portrait.jpg"
                alt={`${site.founder.name}, ${site.founder.title}`}
                fill
                sizes="(min-width: 1024px) 35vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal y={12}>
              <p className="eyebrow !text-left !text-gold">Meet the founder</p>
            </Reveal>
            <h2 className="mt-5 text-[3rem] leading-none !text-cream sm:text-6xl md:text-7xl">
              <SplitWords text={site.founder.name} />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-4 !text-left font-sans text-[0.75rem] uppercase tracking-[0.26em] text-gold">{site.founder.title}</p>
              <div className="mt-8 h-px w-16 bg-gold" />
              {/* TODO: replace with Bridget's own bio (qualifications, experience, why she started SKNN LAB). */}
              <div className="mt-8 space-y-5">
                <p className="text-sand">
                  Bridget founded SKNN LAB to offer what she felt many people were missing: skincare guided by knowledge and delivered with patience and real attention. As a licensed aesthetician and the clinic&apos;s Clinical Director, she oversees the standard of every treatment, from the first skin analysis to the aftercare plan.
                </p>
                <p className="text-sand">
                  For her, the work goes deeper than skin. In her words, aestheticians &ldquo;don&apos;t just treat skin; they restore confidence, inspire self-love, and help you glow from the inside.&rdquo;
                </p>
              </div>
              <blockquote className="mt-10 border-l-2 border-gold pl-6 font-display text-[1.8rem] italic leading-snug text-cream md:text-[2.2rem]">
                Thank you for letting me be part of your transformation.
              </blockquote>
              <Link href="/book?treatment=consultation" className="btn btn-primary mt-10">
                Book a consultation <ArrowRight className="arrow h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Philosophy statement */}
      <section className="section bg-tone-2">
        <div className="container">
          <Reveal y={12}>
            <p className="eyebrow">Our philosophy</p>
          </Reveal>
          <ScrollWords
            className="mx-auto mt-8 max-w-5xl !text-center font-display text-[2rem] leading-[1.25] text-ink [hyphens:manual] sm:text-[2.6rem] md:text-[3.2rem]"
            text="Beautiful skin requires commitment, not a miracle. So we promise honest advice, treatments that suit you, and care that continues long after you leave the clinic."
          />
        </div>
      </section>

      {/* Values */}
      <section className="section bg-tone">
        <div className="container">
          <SectionHeader
            eyebrow="What we stand for"
            title="Four promises we keep"
            subtitle="They guide every consultation, every treatment and every conversation at SKNN LAB."
          />
          <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line shadow-soft sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 0.08}
                className="group flex h-full flex-col bg-bg p-3 pb-9"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={v.image}
                    alt={v.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-lux group-hover:scale-105"
                    style={{ objectPosition: v.position }}
                  />
                </div>
                <div className="px-5 pt-7">
                  <h3 className="text-[2rem] leading-tight">{v.title}</h3>
                  <div className="mt-4 h-px w-12 bg-primary" />
                  <p className="mt-5 !text-left text-[0.97rem] leading-relaxed">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* First visit */}
      <section className="section">
        <div className="container grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <Parallax offset={40} className="relative order-2 aspect-[4/5] overflow-hidden rounded-[2rem] lg:order-1">
            <Image src="/images/founder/bridget-at-work.jpg" alt="Bridget treating a client in natural light" fill sizes="(min-width:1024px) 45vw, 95vw" className="scale-110 object-cover" style={{ objectPosition: "60% 55%" }} />
          </Parallax>
          <div className="order-1 lg:order-2">
            <SectionHeader eyebrow="Your first visit" title="What to expect when you arrive" />
            <ol className="mt-12 space-y-8">
              {firstVisit.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 0.08} className="flex gap-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-primary font-display text-xl italic text-accent dark:text-primary">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-[1.7rem]">{s.title}</h3>
                    <p className="mt-1.5">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Inside the clinic */}
      <section className="surface-dark section overflow-hidden bg-deep-section">
        <div className="container">
          <SectionHeader eyebrow="Inside the clinic" title="A space made for you" subtitle="Calm, clean and considered, from the reception lounge to our treatment rooms." light />
        </div>
        <div className="mt-16">
          <PhotoMarquee />
        </div>
        <div className="mt-12 text-center">
          <a href={site.social.instagram.url} target="_blank" rel="noreferrer" className="btn btn-light">
            <InstagramIcon className="h-4 w-4" /> Follow {site.social.instagram.handle}
          </a>
        </div>
      </section>
    </>
  );
}
