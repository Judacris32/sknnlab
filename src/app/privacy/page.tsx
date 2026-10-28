import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How SKNN LAB Aesthetic Clinic collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

const sections: { h: string; p: string[]; list?: string[] }[] = [
  {
    h: "Who we are",
    p: [
      `${site.legalName} ("SKNN LAB", "we", "us") is an aesthetic clinic located at ${site.address.line1}, ${site.address.line2}, ${site.address.city}, ${site.address.country}. We are responsible for the personal information you share with us through this website.`,
    ],
  },
  {
    h: "What we collect",
    p: ["When you use our booking or contact forms, or message us on WhatsApp, we collect the information you choose to give us:"],
    list: [
      "Your name, phone number and email address",
      "The treatment you're interested in and your preferred date and time",
      "Any notes you add, which may include details about your skin or health",
      "Basic technical information such as your IP address, used only to protect our forms from spam",
    ],
  },
  {
    h: "How we use it",
    p: ["We use your information only to:"],
    list: [
      "Respond to your enquiry and confirm, reschedule or follow up on your appointment",
      "Arrange payment, product orders and delivery or pickup",
      "Prepare for your treatment safely, including checking suitability",
      "Keep accurate records of the care we provide",
    ],
  },
  {
    h: "Sensitive information",
    p: [
      "Information about your skin or health is treated as sensitive. We use it only to provide safe, appropriate care and never share it for marketing. Please only include what you're comfortable sharing in online forms; we'll ask anything else we need during your consultation.",
    ],
  },
  {
    h: "Who we share it with",
    p: [
      "We do not sell your personal information. We use trusted service providers to run this website and deliver emails (for example our hosting and email delivery providers), who process data on our behalf and only as needed to provide their service. We may disclose information where required by law.",
    ],
  },
  {
    h: "How long we keep it",
    p: [
      "We keep booking and enquiry records only for as long as needed to provide our services and meet our legal and record-keeping obligations, after which they are securely deleted.",
    ],
  },
  {
    h: "Your rights",
    p: [
      "Under the Nigeria Data Protection Act 2023, you have the right to access the personal information we hold about you, ask us to correct or delete it, object to or restrict how we use it, and withdraw your consent at any time. You may also lodge a complaint with the Nigeria Data Protection Commission.",
      `To make a request, email us at ${site.contact.email} or call ${site.contact.phones[0].display}.`,
    ],
  },
  {
    h: "Cookies",
    p: [
      "This website does not use advertising or tracking cookies. Your light or dark display preference is stored in your browser so the site remembers it on your next visit.",
    ],
  },
  {
    h: "Changes to this policy",
    p: ["We may update this policy from time to time. The latest version will always be available on this page."],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        image="/images/clinic/hallway.jpg"
        alt="SKNN LAB clinic hallway"
        position="50% 40%"
        eyebrow="Your information"
        title="Privacy policy"
        compact
        crumbs={[{ label: "Privacy Policy" }]}
      />
      <section className="section">
        <div className="container max-w-3xl">
          <p className="!text-left font-sans text-sm uppercase tracking-[0.2em] text-eyebrow">Last updated: October 2026</p>
          <div className="mt-10 space-y-12">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="text-[2.2rem]">
                                    {s.h}
                </h2>
                <div className="mt-4 space-y-4">
                  {s.p.map((t) => <p key={t}>{t}</p>)}
                  {s.list && (
                    <ul className="list-disc space-y-2 pl-6 marker:text-primary">
                      {s.list.map((l) => <li key={l}>{l}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
