import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { nav, site } from "@/config/site";
import { categories } from "@/data/treatments";
import { mapLinkUrl, whatsappLink } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="surface-dark relative overflow-hidden bg-espresso text-sand dark:bg-[#1E1611]">
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" aria-hidden="true" />
      <div className="container relative grid grid-cols-2 gap-x-8 gap-y-14 pb-14 pt-20 lg:grid-cols-12">
        <div className="col-span-2 lg:col-span-4">
          <Logo className="h-16" />
          <p className="mt-7 max-w-sm text-[0.98rem] text-sand/85">
            An aesthetic clinic in Lekki, Lagos, bringing clinical skincare and genuine care together for healthy, confident skin.
          </p>
          <div className="mt-8 flex gap-3">
            <a
              href={site.social.instagram.url}
              target="_blank"
              rel="noreferrer"
              aria-label="SKNN LAB on Instagram"
              className="grid h-11 w-11 place-items-center rounded-full border border-[#6D5240] text-cream transition-colors hover:border-gold hover:bg-gold hover:text-espresso"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={whatsappLink("Hello SKNN LAB, I'd like to make an enquiry.")}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat with SKNN LAB on WhatsApp"
              className="grid h-11 w-11 place-items-center rounded-full border border-[#6D5240] text-cream transition-colors hover:border-gold hover:bg-gold hover:text-espresso"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <FooterCol title="Explore" className="col-span-1 lg:col-span-2">
          {nav.map((n) => (
            <FooterLink key={n.href} href={n.href}>{n.label}</FooterLink>
          ))}
          <FooterLink href="/book">Book an appointment</FooterLink>
        </FooterCol>

        <FooterCol title="Treatments" className="col-span-1 lg:col-span-3">
          {categories.map((c) => (
            <FooterLink key={c.slug} href={`/treatments/${c.slug}`}>{c.name}</FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Visit us" className="col-span-2 lg:col-span-3">
          <a href={mapLinkUrl} target="_blank" rel="noreferrer" className="flex gap-3 text-[0.95rem] leading-relaxed hover:text-cream">
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" />
            <span>
              {site.address.line1},<br />
              {site.address.line2},<br />
              {site.address.city}
            </span>
          </a>
          {site.contact.phones.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`} className="flex items-center gap-3 text-[0.95rem] hover:text-cream">
              <Phone className="h-4 w-4 text-gold" /> {p.display}
            </a>
          ))}
          <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 text-[0.95rem] hover:text-cream">
            <Mail className="h-4 w-4 text-gold" /> {site.contact.email}
          </a>
          <p className="!text-left text-[0.95rem] text-sand/80">
            {site.hours.length ? site.hours.map((h) => `${h.days}: ${h.time}`).join(", ") : "Visits by appointment"}
          </p>
        </FooterCol>
      </div>

      <div aria-hidden="true" className="container relative select-none overflow-hidden">
        <p className="text-outline !text-center font-display text-[17vw] leading-[0.8] opacity-60 lg:text-[13rem]">SKNN LAB</p>
      </div>

      <div className="container relative flex flex-col items-center justify-between gap-4 border-t border-[#6D5240]/60 py-7 font-sans text-[0.8rem] text-sand/70 md:flex-row">
        <p className="!text-center">© {year} {site.legalName}. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-cream">Privacy policy</Link>
          <a href={site.social.instagram.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-cream">
            {site.social.instagram.handle} <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h3 className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.28em] !text-gold">{title}</h3>
      <div className="mt-6 flex flex-col gap-3.5">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group w-fit text-[0.95rem] transition-colors hover:text-cream">
      <span className="bg-gradient-to-r from-gold to-gold bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
        {children}
      </span>
    </Link>
  );
}
