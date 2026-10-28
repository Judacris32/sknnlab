import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { formatPrice, whatsappLink } from "@/lib/utils";
import { WhatsAppIcon } from "./icons";

export function ProductCard({ p }: { p: Product }) {
  return (
    <article className="group flex h-full flex-col">
      <Link href={`/shop/${p.slug}`} className="relative block aspect-[5/6] overflow-hidden rounded-2xl bg-soft">
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {p.bestseller && (
          <span className="absolute left-4 top-4 rounded-full bg-bg/90 px-3 py-1 font-sans text-[0.64rem] font-medium uppercase tracking-[0.2em] text-eyebrow backdrop-blur">
            Bestseller
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col pt-5">
        <p className="!text-left font-sans text-[0.68rem] uppercase tracking-[0.24em] text-eyebrow">{p.category} · {p.size}</p>
        <h3 className="mt-2 text-[1.75rem] leading-tight">
          <Link href={`/shop/${p.slug}`} className="transition-colors hover:text-accent dark:hover:text-primary">{p.name}</Link>
        </h3>
        <p className="mt-2 flex-1 text-[0.95rem]">{p.short}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="font-sans text-lg font-medium text-ink">{formatPrice(p.price)}</span>
          <a
            href={whatsappLink(`Hello SKNN LAB, I'd like to order the ${p.name} (${formatPrice(p.price)}).`)}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost !px-4 !py-2.5 !text-[0.7rem]"
          >
            <WhatsAppIcon className="h-4 w-4" /> Order
          </a>
        </div>
      </div>
    </article>
  );
}
