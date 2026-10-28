import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Droplet, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/ui/ProductCard";
import { WhatsAppIcon } from "@/components/ui/icons";
import { getProduct, products } from "@/data/products";
import { formatPrice, whatsappLink } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.short,
    alternates: { canonical: `/shop/${p.slug}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const related = products.filter((x) => x.slug !== p.slug).slice(0, 4);
  const orderMessage = `Hello SKNN LAB, I'd like to order the ${p.name} (${p.size}, ${formatPrice(p.price)}).`;

  return (
    <>
      <PageHero
        image="/images/clinic/product-shelf.jpg"
        alt="SKNN LAB clinic shelves"
        position="50% 35%"
        eyebrow={`${p.category} · ${p.size}`}
        title={p.name}
        compact
        crumbs={[{ label: "Shop", href: "/shop" }, { label: p.name }]}
      />

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative aspect-[5/6] overflow-hidden rounded-[2rem] bg-soft">
            <Image src={p.image} alt={p.name} fill priority sizes="(min-width: 1024px) 45vw, 95vw" className="object-cover" />
          </Reveal>

          <Reveal delay={0.1} className="lg:py-6">
            <Link href="/shop" className="link-underline">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to shop
            </Link>
            <p className="eyebrow mt-10 !text-left">{p.category}</p>
            <h2 className="mt-4 text-4xl md:text-5xl">{p.name}</h2>
            <div className="mt-5 flex items-baseline gap-4">
              <span className="font-display text-3xl text-ink">{formatPrice(p.price)}</span>
              <span className="font-sans text-sm text-text">{p.size}</span>
            </div>
            <div className="mt-7 h-px w-16 bg-primary" />
            <p className="mt-7">{p.description}</p>

            <ul className="mt-7 space-y-3">
              {p.benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 font-sans text-ink">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-soft text-accent dark:text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-line/70 bg-surface p-5">
                <p className="flex items-center gap-2 !text-left font-sans text-[0.68rem] uppercase tracking-[0.22em] text-eyebrow">
                  <Droplet className="h-3.5 w-3.5" /> How to use
                </p>
                <p className="mt-2 text-[0.93rem]">{p.howToUse}</p>
              </div>
              <div className="rounded-2xl border border-line/70 bg-surface p-5">
                <p className="flex items-center gap-2 !text-left font-sans text-[0.68rem] uppercase tracking-[0.22em] text-eyebrow">
                  <ShieldCheck className="h-3.5 w-3.5" /> Best for
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.skinTypes.map((s) => (
                    <span key={s} className="rounded-full bg-soft px-3 py-1 font-sans text-xs text-ink">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappLink(orderMessage)} target="_blank" rel="noreferrer" className="btn btn-primary flex-1">
                <WhatsAppIcon className="h-4 w-4" /> Order on WhatsApp
              </a>
              <Link href="/book?treatment=consultation" className="btn btn-ghost flex-1">
                Get a skin consultation
              </Link>
            </div>
            <p className="mt-5 text-sm text-text/80">
              Payment and pickup or delivery are confirmed directly with the clinic on WhatsApp.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-surface/60 pt-20 dark:bg-surface/30">
        <div className="container">
          <SectionHeader eyebrow="Complete your routine" title="You may also like" />
          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.slug} p={r} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
