import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { TreatmentRow } from "@/components/ui/TreatmentRow";
import { CategoryNav } from "@/components/treatments/CategoryNav";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { SplitWords } from "@/components/motion/SplitWords";
import { categories, treatmentsIn } from "@/data/treatments";

export const metadata: Metadata = {
  title: "Treatments & Prices",
  description:
    "Facials, microneedling, chemical peels, skin consultations and advanced treatments at SKNN LAB in Lekki, Lagos. See the full menu with prices and times.",
  alternates: { canonical: "/treatments" },
};

export default function TreatmentsPage() {
  return (
    <>
      <PageHero
        image="/images/clinic/treatment-room.jpg"
        alt="A SKNN LAB treatment room"
        position="50% 55%"
        eyebrow="Menu and prices"
        title="Treatments for every skin story"
        italicFrom={3}
        subtitle="Clinical skincare for acne, dark spots, ageing and glow. Every price is listed, and every plan is tailored to you."
        crumbs={[{ label: "Treatments" }]}
      />

      <CategoryNav />

      <div className="container">
        {categories.map((c, ci) => {
          const list = treatmentsIn(c.slug);
          return (
            <section key={c.slug} id={c.slug} className="scroll-mt-40 border-b border-line py-24 last:border-b-0 md:py-32">
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-44">
                    <Parallax offset={25} className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] lg:aspect-[4/5]">
                      <Image src={c.image} alt={c.name} fill sizes="(min-width:1024px) 30vw, 95vw" className="scale-110 object-cover" style={{ objectPosition: c.imagePosition }} />
                    </Parallax>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <Reveal y={12}>
                    <p className="eyebrow !text-left">{c.eyebrow}</p>
                  </Reveal>
                  <h2 className="mt-4 text-[2.8rem] leading-none md:text-[4rem]">
                    <SplitWords text={c.name} />
                  </h2>
                  <Reveal delay={0.1}>
                    <p className="mt-5 max-w-2xl text-lg">{c.short}</p>
                    <Link href={`/treatments/${c.slug}`} className="link-underline mt-6">
                      Learn more about {c.name.toLowerCase()} <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </Reveal>
                  <div className="mt-8 border-t border-line">
                    {list.map((t, i) => (
                      <Reveal key={t.slug} delay={Math.min(i, 4) * 0.05} y={20}>
                        <TreatmentRow t={t} />
                      </Reveal>
                    ))}
                  </div>
                  {ci === 0 && (
                    <Reveal className="mt-10 rounded-[1.5rem] bg-soft/60 p-7 dark:bg-surface/60">
                      <p className="!text-left">
                        <strong className="font-medium text-ink">First time here?</strong> A consultation or our Customised Facial is the easiest place to start. Both include a full look at your skin.
                      </p>
                    </Reveal>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="pb-8">
        <div className="container text-center">
          <Link href="/book" className="btn btn-primary">
            Book an appointment <ArrowRight className="arrow h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
