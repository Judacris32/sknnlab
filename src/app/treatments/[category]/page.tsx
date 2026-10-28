import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertCircle, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TreatmentRow } from "@/components/ui/TreatmentRow";
import { Accordion } from "@/components/ui/Accordion";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { SplitWords } from "@/components/motion/SplitWords";
import { categories, getCategory, treatmentsIn } from "@/data/treatments";
import { whatsappLink } from "@/lib/utils";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return {
    title: c.name,
    description: `${c.short} Prices, times and booking at SKNN LAB Aesthetic Clinic, Lekki, Lagos.`,
    alternates: { canonical: `/treatments/${c.slug}` },
    openGraph: { images: [c.heroImage] },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  const list = treatmentsIn(c.slug);
  const d = c.details;
  const others = categories.filter((x) => x.slug !== c.slug);

  return (
    <>
      <PageHero
        image={c.heroImage}
        alt={c.name}
        position={c.heroPosition}
        eyebrow={c.eyebrow}
        title={c.headline}
        subtitle={c.short}
        crumbs={[{ label: "Treatments", href: "/treatments" }, { label: c.name }]}
      />

      {/* Key facts */}
      {d?.facts && (
        <div className="border-b border-line bg-surface/70 dark:bg-surface/30">
          <dl className="container grid grid-cols-3 divide-x divide-line">
            {d.facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.08} className="px-3 py-8 text-center md:py-10">
                <dt className="font-sans text-[0.68rem] uppercase tracking-[0.24em] text-eyebrow">{f.label}</dt>
                <dd className="mt-2 font-display text-[1.35rem] leading-tight text-ink md:text-[2rem]">{f.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      )}

      {/* About */}
      {d && (
        <section className="section overflow-hidden">
          <div className="container grid items-start gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <Reveal y={12}>
                <p className="eyebrow !text-left">About {c.name.toLowerCase()}</p>
              </Reveal>
              <h2 className="mt-5 text-[2.8rem] leading-[1.02] sm:text-6xl">
                <SplitWords text="What to expect" italicFrom={2} />
              </h2>
              <Reveal delay={0.1}>
                <div className="mt-8 h-px w-16 bg-primary" />
                <div className="mt-8 space-y-5">
                  {d.about.map((para) => (
                    <p key={para.slice(0, 30)}>{para}</p>
                  ))}
                </div>
                {d.notes && (
                  <ul className="mt-8 space-y-3">
                    {d.notes.map((n) => (
                      <li key={n} className="flex gap-3 font-sans text-ink">
                        <Sparkles className="mt-1.5 h-4 w-4 shrink-0 text-primary" /> {n}
                      </li>
                    ))}
                  </ul>
                )}
                {d.aftercare && (
                  <div className="mt-10 rounded-[1.5rem] border border-line bg-surface p-7">
                    <h3 className="text-[1.7rem]">Aftercare matters</h3>
                    <ul className="mt-4 space-y-2.5">
                      {d.aftercare.map((a) => (
                        <li key={a} className="flex gap-3 font-sans text-[0.97rem] leading-relaxed text-text">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-primary" /> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Reveal>
            </div>

            <div className="space-y-6 lg:col-span-5">
              <Parallax offset={35} className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                <Image
                  src={c.detailImage ?? c.image}
                  alt={c.name}
                  fill
                  sizes="(min-width: 1024px) 38vw, 95vw"
                  className="scale-110 object-cover"
                  style={{ objectPosition: c.detailImage ? "50% 50%" : c.imagePosition }}
                />
              </Parallax>

              {d.benefits && (
                <Reveal className="rounded-[1.75rem] border border-line bg-surface p-8">
                  <h3 className="text-[1.9rem]">{d.benefitsTitle ?? "Benefits"}</h3>
                  <ul className="mt-5 space-y-3.5">
                    {d.benefits.map((b) => (
                      <li key={b} className="flex gap-3 font-sans text-[0.97rem] leading-relaxed text-text">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-on-primary">
                          <Check className="h-3 w-3" />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {d.notSuitable && (
                <Reveal className="rounded-[1.75rem] border border-[#B4532A]/30 bg-[#B4532A]/[0.05] p-8 dark:border-[#E9A27F]/30">
                  <h3 className="flex items-center gap-2.5 text-[1.9rem]">
                    <AlertCircle className="h-5 w-5 text-[#B4532A] dark:text-[#E9A27F]" /> Not suitable if you have
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {d.notSuitable.map((n) => (
                      <li key={n} className="font-sans text-[0.97rem] text-text">{n}</li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm">Not sure? We&apos;ll check your suitability at your consultation.</p>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Menu */}
      <section className="section bg-surface/70 dark:bg-surface/30">
        <div className="container">
          <SectionHeader
            eyebrow={`${list.length} ${list.length === 1 ? "option" : "options"}`}
            title={`${c.name} menu`}
            subtitle="Prices and times are below. Tap the arrow on any treatment to request it."
          />
          <div className="mx-auto mt-14 max-w-5xl border-t border-line">
            {list.map((t, i) => (
              <Reveal key={t.slug} delay={Math.min(i, 4) * 0.05} y={20}>
                <TreatmentRow t={t} />
              </Reveal>
            ))}
          </div>

          {d?.extraList && (
            <Reveal className="mx-auto mt-16 max-w-4xl text-center">
              <h3 className="text-[2rem]">{d.extraList.title}</h3>
              <ul className="mt-7 flex flex-wrap justify-center gap-2.5">
                {d.extraList.items.map((item) => (
                  <li key={item} className="rounded-full border border-line bg-bg px-4 py-2 font-sans text-sm text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={`/book?treatment=${list[0]?.slug ?? ""}`} className="btn btn-primary">
              Book this treatment
            </Link>
            <a href={whatsappLink(`Hello SKNN LAB, I'd like to ask about your ${c.name} treatments.`)} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <WhatsAppIcon className="h-4 w-4" /> Ask us a question
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {d?.faqs && (
        <section className="section">
          <div className="container">
            <SectionHeader eyebrow="Questions" title={`${c.name}, explained`} />
            <Reveal className="mx-auto mt-14 max-w-3xl">
              <Accordion items={d.faqs} />
            </Reveal>
          </div>
        </section>
      )}

      {/* Other categories */}
      <section className={d?.faqs ? "pb-12" : "section pb-12"}>
        <div className="container">
          <SectionHeader eyebrow="Keep exploring" title="More ways to care for your skin" />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 0.06}>
                <Link href={`/treatments/${o.slug}`} className="group relative flex h-72 items-end overflow-hidden rounded-[1.75rem] bg-espresso p-6">
                  <Image src={o.image} alt="" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover opacity-90 transition-transform duration-1000 ease-lux group-hover:scale-110" style={{ objectPosition: o.imagePosition }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(30,22,17,0.92)] via-[rgba(30,22,17,0.3)] to-transparent" />
                  <span className="relative flex w-full items-end justify-between gap-3 font-display text-[1.9rem] leading-tight text-white">
                    {o.name}
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/40 transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-espresso">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
