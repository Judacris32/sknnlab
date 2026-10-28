import type { Metadata } from "next";
import { MessageCircle, PackageCheck, ShoppingBag } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ShopGrid } from "@/components/shop/ShopGrid";

export const metadata: Metadata = {
  title: "Shop Skincare",
  description:
    "Practitioner-selected skincare from SKNN LAB Aesthetic Clinic, Lekki. Browse cleansers, serums, moisturisers and SPF, and order on WhatsApp.",
  alternates: { canonical: "/shop" },
};

const steps = [
  { icon: ShoppingBag, title: "Choose", text: "Browse the shop and pick what suits your skin." },
  { icon: MessageCircle, title: "Message us", text: "Tap “Order” and a WhatsApp message with the product details is ready to send." },
  { icon: PackageCheck, title: "Pay and collect", text: "We confirm availability, payment and pickup or delivery with you directly." },
];

export default function ShopPage() {
  return (
    <>
      <PageHero
        image="/images/clinic/product-shelf.jpg"
        alt="Professional skincare products on the SKNN LAB clinic shelves"
        position="50% 35%"
        eyebrow="The SKNN LAB shop"
        title="Skincare our practitioners trust"
        italicFrom={2}
        subtitle="Products chosen to support your treatments and protect your results at home. Order in a tap on WhatsApp."
        crumbs={[{ label: "Shop" }]}
      />

      <section className="section pb-0">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.07} className="flex items-start gap-5 rounded-2xl border border-line/70 bg-surface p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-soft text-accent dark:text-primary">
                  <s.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="text-xl">
                                        {s.title}
                  </h3>
                  <p className="mt-1.5 !text-left text-[0.93rem]">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Shop by need"
            title="Clinic-approved essentials"
            subtitle="Not sure what your skin needs? Ask us on WhatsApp, or book a consultation for a routine made for you."
          />
          <div className="mt-12">
            <ShopGrid />
          </div>
        </div>
      </section>

    </>
  );
}
