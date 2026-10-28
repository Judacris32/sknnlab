"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { DropDivider, WhatsAppIcon } from "@/components/ui/icons";
import { site } from "@/config/site";
import { whatsappLink } from "@/lib/utils";

/**
 * Centered booking banner shown above the footer on every page (except the booking page).
 * A contained photo banner with everything centred inside it.
 */
export function PreFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/book")) return null;

  return (
    <section aria-label="Book your visit" className="bg-bg py-20 md:py-28">
      <div className="container">
        <Reveal y={24} className="mx-auto max-w-5xl">
          <div className="surface-dark relative isolate overflow-hidden rounded-[2.25rem] bg-espresso px-6 py-14 text-center shadow-soft sm:px-12 md:px-20 md:py-20">
            {/* Background photo, softly washed so the text stays readable */}
            <Image
              src="/images/clinic/lounge.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="-z-20 object-cover"
              style={{ objectPosition: "40% 50%" }}
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[rgba(30,22,17,0.7)]" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_50%_0%,rgba(212,175,124,0.25),transparent_70%)]" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-3 rounded-[1.85rem] border border-gold/30 md:inset-4" />

            <p className="eyebrow !text-gold">Book your visit</p>
            <h2 className="mx-auto mt-5 max-w-2xl text-[2.4rem] leading-[1.05] !text-cream sm:text-5xl md:text-[3.6rem]">
              Your best skin starts with <em className="font-normal italic text-gold">one conversation</em>
            </h2>
            <DropDivider className="mt-7" />
            <p className="mx-auto mt-6 max-w-xl !text-center text-sand [hyphens:manual] md:text-lg">
              Request an appointment online in under two minutes, or message us on WhatsApp. We&apos;ll confirm your time and take care of the rest.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link href="/book" className="btn btn-primary w-full sm:w-auto">
                Book an appointment <ArrowRight className="arrow h-4 w-4" />
              </Link>
              <a
                href={whatsappLink("Hello SKNN LAB, I'd like to make an enquiry.")}
                target="_blank"
                rel="noreferrer"
                className="btn btn-light w-full sm:w-auto"
              >
                <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 font-sans text-sm text-sand sm:flex-row sm:gap-10">
              <a href={`tel:${site.contact.phones[0].tel}`} className="inline-flex items-center gap-2 transition-colors hover:text-gold">
                <Phone className="h-4 w-4 text-gold" /> {site.contact.phones[0].display}
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" /> {site.address.city}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
