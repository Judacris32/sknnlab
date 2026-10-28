import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { BookingForm } from "@/components/forms/BookingForm";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Request an appointment at SKNN LAB Aesthetic Clinic in Lekki, Lagos. Choose your treatment and preferred time, and we'll confirm with you directly.",
  alternates: { canonical: "/book" },
};

type Props = { searchParams: Promise<{ treatment?: string }> };

export default async function BookPage({ searchParams }: Props) {
  const { treatment } = await searchParams;
  return (
    <>
      <PageHero
        image="/images/clinic/reception.jpg"
        alt="The SKNN LAB reception"
        position="50% 60%"
        eyebrow="Book your visit"
        title="Request an appointment"
        italicFrom={2}
        compact
        subtitle="Tell us what you'd like and when suits you. We'll get in touch to confirm your time and payment."
        crumbs={[{ label: "Book" }]}
      />
      <section className="section">
        <div className="container">
          <BookingForm initialTreatment={treatment} />
        </div>
      </section>
    </>
  );
}
