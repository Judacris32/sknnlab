import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Microscope } from "lucide-react";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import { TreatmentMarquee } from "@/components/home/TreatmentMarquee";
import { ConcernExplorer } from "@/components/home/ConcernExplorer";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { Journey } from "@/components/home/Journey";
import { PhotoMarquee } from "@/components/home/PhotoMarquee";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductCard } from "@/components/ui/ProductCard";
import { Accordion } from "@/components/ui/Accordion";
import { InstagramIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { Parallax } from "@/components/motion/Parallax";
import { SplitWords } from "@/components/motion/SplitWords";
import { getTreatment } from "@/data/treatments";
import { products } from "@/data/products";
import { generalFaqs } from "@/data/faqs";
import { site } from "@/config/site";
import { formatPrice } from "@/lib/utils";

export default function HomePage() {
  const consultation = getTreatment("consultation")!;

  return (
    <>
      <HeroSlideshow />
      <TreatmentMarquee />

      {/* 1. Who we are: a statement that lights up as you read */}
      <section className="section relative overflow-hidden bg-bg">
        <div className="container">
          <Reveal y={12}>
            <p className="eyebrow">Welcome to SKNN LAB</p>
          </Reveal>
          <ScrollWords
            className="mx-auto mt-8 max-w-5xl !text-center font-display text-[2rem] leading-[1.25] text-ink [hyphens:manual] sm:text-[2.6rem] md:text-[3.3rem]"
            text="We believe healthy skin is the foundation of confidence. Our qualified practitioners combine clinical treatments with genuine care, so every plan fits your skin, your life and your goals."
          />
          <div className="mx-auto mt-20 grid max-w-6xl items-end gap-6 md:grid-cols-12">
            <Parallax offset={40} className="relative aspect-[4/5] overflow-hidden rounded-[2rem] md:col-span-4">
              <Image src="/images/clinic/lounge.jpg" alt="The clinic lounge with the sign 'It's time for a skin reset'" fill sizes="(min-width: 768px) 30vw, 90vw" className="scale-110 object-cover" style={{ objectPosition: "35% 40%" }} />
            </Parallax>
            <Reveal className="md:col-span-4 md:pb-10" delay={0.1}>
              <div className="text-center">
                <p className="!text-center">
                  From relaxing facials to advanced treatments for acne, ageing and pigmentation, we offer a complete range of care, using the latest technology and techniques.
                </p>
                <div className="mt-8 flex flex-col items-center gap-4">
                  <Link href="/about" className="btn btn-secondary">Our story</Link>
                  <Link href="/treatments" className="link-underline">Full menu and prices <ArrowRight className="h-3.5 w-3.5" /></Link>
                </div>
              </div>
            </Reveal>
            <Parallax offset={70} className="relative aspect-[4/5] overflow-hidden rounded-[2rem] rounded-tr-[8rem] md:col-span-4">
              <Image src="/images/clinic/treatment-suite.jpg" alt="A calm SKNN LAB treatment suite with a neon “It’s glow time” sign" fill sizes="(min-width: 768px) 30vw, 90vw" className="scale-110 object-cover" style={{ objectPosition: "55% 45%" }} />
            </Parallax>
          </div>
        </div>
      </section>

      {/* 2. Founder (placed early to build trust) */}
      <section className="section overflow-hidden bg-tone">
        <div className="container grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-md lg:col-span-5">
            <div className="absolute -inset-4 -z-10 rounded-[2.75rem] border border-primary/40" aria-hidden="true" />
            <div className="relative aspect-[1451/2330] overflow-hidden rounded-[2.25rem]">
              <Image
                src="/images/founder/bridget-portrait.jpg"
                alt={`${site.founder.name}, ${site.founder.title} of SKNN LAB`}
                fill
                sizes="(min-width: 1024px) 35vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal y={12}>
              <p className="eyebrow !text-left">Meet the founder</p>
            </Reveal>
            <blockquote className="mt-6">
              <p className="!text-left font-display text-[2.6rem] leading-[1.08] text-ink [hyphens:manual] md:text-[3.8rem]">
                <SplitWords text="“Your glow is my passion.”" stagger={0.09} />
              </p>
            </blockquote>
            <Reveal delay={0.15}>
              <div className="mt-8 h-px w-16 bg-primary" />
              <p className="mt-8">
                {site.founder.name} founded SKNN LAB on a simple belief: skincare should be guided by knowledge and delivered with real care. To her, aestheticians don&apos;t just treat skin. They restore confidence, inspire self-love and help people glow from the inside.
              </p>
              <p className="mt-5">
                As Founder and Clinical Director, Bridget sets the standard of care at the clinic, from your first consultation to the aftercare that protects your results.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-8">
                <div>
                  <p className="!text-left font-display text-[1.9rem] italic leading-none text-ink">{site.founder.name}</p>
                  <p className="mt-2 !text-left font-sans text-[0.72rem] uppercase tracking-[0.24em] text-eyebrow">{site.founder.title}</p>
                </div>
                <Link href="/about" className="btn btn-ghost">
                  Read our story <ArrowRight className="arrow h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. What would you like to change? */}
      <section className="section bg-tone-2">
        <div className="container">
          <SectionHeader
            eyebrow="Start with your skin"
            title="What would you like to change?"
            subtitle="Choose a concern to see how we approach it and which treatments we usually recommend."
          />
          <div className="mt-16">
            <ConcernExplorer />
          </div>
        </div>
      </section>

      {/* 4. Treatment categories */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Our treatments"
            title="Five ways we care for your skin"
            subtitle="Every treatment is performed by trained practitioners using professional-grade products and clinic technology."
          />
          <div className="mt-16">
            <CategoryGrid />
          </div>
        </div>
      </section>

      {/* 5. How it works */}
      <section className="section bg-tone">
        <div className="container">
          <SectionHeader
            eyebrow="How it works"
            title="Your skin journey, step by step"
            subtitle="No pressure, no guesswork. Just a clear path from your first visit to results that last."
          />
          <div className="mt-20">
            <Journey />
          </div>
        </div>
      </section>

      {/* 6. Consultation feature */}
      <section className="surface-dark relative overflow-hidden bg-deep-section py-24 text-sand md:py-32">
        <div className="pointer-events-none absolute -left-40 top-1/4 h-[30rem] w-[30rem] rounded-full bg-[#BC935E]/10 blur-3xl" aria-hidden="true" />
        <div className="container grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <Reveal y={12}>
              <p className="eyebrow !text-left !text-gold">Where every journey begins</p>
            </Reveal>
            <h2 className="mt-5 text-[2.8rem] leading-[1.02] !text-cream sm:text-6xl md:text-[4.4rem]">
              <SplitWords text="Not sure where to start? Start here." italicFrom={5} />
            </h2>
            <Reveal delay={0.15}>
              <div className="mt-8 h-px w-16 bg-gold" />
              <p className="mt-8 text-sand">{consultation.summary}</p>
              <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-[#6D5240] py-7">
                {[
                  ["Fee", formatPrice(consultation.price)],
                  ["Duration", consultation.duration ?? ""],
                  ["Where", "Clinic or online"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-sans text-[0.7rem] uppercase tracking-[0.24em] text-gold">{k}</dt>
                    <dd className="mt-2 font-display text-[1.4rem] leading-tight text-cream md:text-[1.7rem]">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/book?treatment=consultation" className="btn btn-primary">
                  Book a consultation <ArrowRight className="arrow h-4 w-4" />
                </Link>
                <Link href="/treatments/consultation" className="btn btn-light">What to expect</Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="relative mx-auto w-full max-w-md">
            <Parallax offset={35} className="relative aspect-[4/5] overflow-hidden rounded-t-full">
              <Image
                src="/images/founder/bridget-skin-analysis.jpg"
                alt="Bridget Oshomah examining a client's skin under a magnifying lamp"
                fill
                sizes="(min-width: 1024px) 35vw, 90vw"
                className="scale-110 object-cover"
                style={{ objectPosition: "50% 62%" }}
              />
            </Parallax>
            <div className="absolute -bottom-6 left-1/2 w-max -translate-x-1/2 rounded-full border border-[#6D5240] bg-[#3E2F25] px-6 py-3 font-sans text-sm text-cream shadow-soft">
              <Microscope className="mr-2 inline h-4 w-4 text-gold" /> A close look at your skin
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7. Results */}
      <section className="section bg-bg">
        <div className="container">
          <SectionHeader
            eyebrow="Client results"
            title="Real skin, real progress"
            subtitle="The same client before and after her treatment journey at SKNN LAB."
          />
          <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2">
            {[
              { src: "/images/results/before-1.jpg", label: "Before" },
              { src: "/images/results/after-1.jpg", label: "After" },
            ].map((r, i) => (
              <Reveal key={r.src} delay={i * 0.12} as="figure" className="group">
                <div className="relative aspect-[1280/900] overflow-hidden rounded-[1.75rem] shadow-soft">
                  <Image
                    src={r.src}
                    alt={`Client's skin ${r.label.toLowerCase()} treatment at SKNN LAB`}
                    fill
                    sizes="(min-width: 768px) 45vw, 95vw"
                    className="object-cover transition-transform duration-1000 ease-lux group-hover:scale-105"
                  />
                </div>
                <figcaption className="mt-4 text-center font-display text-xl italic text-ink">{r.label} treatment</figcaption>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-lg !text-center font-sans text-sm text-text/80 [hyphens:manual]">
            Shared with our client&apos;s permission. Results vary from person to person, depending on skin type, concern and aftercare.
          </p>
        </div>
      </section>

      {/* 8. Inside the clinic */}
      <section className="surface-dark section overflow-hidden bg-deep-section">
        <div className="container">
          <SectionHeader
            eyebrow="Inside the clinic"
            title="A calm space, made for you"
            subtitle="Clean, quiet and considered, from the lounge to the treatment room."
            light
          />
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

      {/* 9. Shop */}
      <section className="section bg-tone-2">
        <div className="container">
          <SectionHeader
            eyebrow="The SKNN LAB shop"
            title="Take the clinic home"
            subtitle="Skincare chosen by our practitioners to protect your results between visits. Order in a tap on WhatsApp."
          />
          <div className="no-scrollbar -mx-5 mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-14 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {products.slice(0, 4).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08} className="w-[78%] shrink-0 snap-start sm:w-auto">
                <ProductCard p={p} />
              </Reveal>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link href="/shop" className="btn btn-ghost">
              Visit the shop <ArrowRight className="arrow h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Good to know"
            title="Your questions, answered"
            subtitle="Can't find what you need? Message us on WhatsApp or call, and we'll be glad to help."
          />
          <Reveal className="mx-auto mt-14 max-w-3xl">
            <Accordion items={generalFaqs} />
          </Reveal>
          <div className="mt-10 text-center">
            <Link href="/contact" className="link-underline">Contact the clinic <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
