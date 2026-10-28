import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Accordion } from "@/components/ui/Accordion";
import { ContactForm } from "@/components/forms/ContactForm";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/Reveal";
import { generalFaqs } from "@/data/faqs";
import { site } from "@/config/site";
import { mapEmbedUrl, mapLinkUrl, whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Visit SKNN LAB Aesthetic Clinic at ${site.address.line1}, ${site.address.city}. Call, WhatsApp or email us.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const cards = [
    { icon: MapPin, title: "Visit", lines: [site.address.line1, site.address.line2, site.address.city], href: mapLinkUrl, cta: "Get directions" },
    { icon: Phone, title: "Call", lines: site.contact.phones.map((p) => p.display), href: `tel:${site.contact.phones[0].tel}`, cta: "Call now" },
    { icon: WhatsAppIcon, title: "WhatsApp", lines: ["Questions, bookings", "and product orders"], href: whatsappLink("Hello SKNN LAB, I'd like to make an enquiry."), cta: "Start a chat" },
    { icon: Mail, title: "Email", lines: [site.contact.email, "Bookings and enquiries"], href: `mailto:${site.contact.email}`, cta: "Send an email" },
  ];

  return (
    <>
      <PageHero
        image="/images/clinic/reception.jpg"
        alt="The SKNN LAB reception in Lekki Phase 1"
        position="50% 58%"
        eyebrow="Get in touch"
        title="We'd love to hear from you"
        italicFrom={3}
        subtitle="Call, message or visit us in Lekki Phase 1. We're here to help you find the right treatment."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="section">
        <div className="container">
          <div className="grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.07} className="h-full">
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex h-full flex-col bg-bg p-9 text-center transition-colors duration-500 hover:bg-surface"
                >
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-primary text-accent transition-all duration-500 group-hover:bg-primary group-hover:text-on-primary dark:text-primary">
                    <c.icon className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <h2 className="mt-6 text-[2rem]">{c.title}</h2>
                  <div className="mt-3 flex-1 font-sans text-[0.97rem] leading-relaxed text-text">
                    {c.lines.map((l) => <div key={l}>{l}</div>)}
                  </div>
                  <span className="link-underline mx-auto mt-6">{c.cta}</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-tone">
        <div className="container grid gap-8 lg:grid-cols-2">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-5">
            <div className="relative min-h-[24rem] flex-1 overflow-hidden rounded-[2rem] border border-line bg-soft">
              <iframe
                title="Map showing SKNN LAB in Lekki Phase 1, Lagos"
                src={mapEmbedUrl}
                className="absolute inset-0 h-full w-full border-0 grayscale-[35%] sepia-[20%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-line bg-bg p-6">
                <p className="flex items-center gap-2 !text-left font-sans text-sm font-medium text-ink">
                  <Clock className="h-4 w-4 text-primary" /> Opening hours
                </p>
                {site.hours.length ? (
                  <ul className="mt-3 space-y-1 font-sans text-sm text-text">
                    {site.hours.map((h) => (
                      <li key={h.days} className="flex justify-between gap-3"><span>{h.days}</span><span>{h.time}</span></li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 !text-left text-[0.95rem]">By appointment. Book online, or call to arrange a time.</p>
                )}
              </div>
              <a href={site.social.instagram.url} target="_blank" rel="noreferrer" className="group rounded-[1.5rem] border border-line bg-bg p-6 transition-colors hover:border-primary">
                <p className="flex items-center gap-2 !text-left font-sans text-sm font-medium text-ink">
                  <InstagramIcon className="h-4 w-4 text-primary" /> Instagram
                </p>
                <p className="mt-2 !text-left font-display text-[1.5rem] leading-tight text-ink">{site.social.instagram.handle}</p>
                <p className="!text-left text-sm">Tips, results and news</p>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-tone-2">
        <div className="container">
          <SectionHeader eyebrow="Good to know" title="Before you get in touch" />
          <Reveal className="mx-auto mt-14 max-w-3xl">
            <Accordion items={generalFaqs} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
