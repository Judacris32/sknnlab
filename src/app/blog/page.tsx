import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { InstagramIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/Reveal";
import { posts, upcomingTopics } from "@/data/posts";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Skin Journal",
  description: "Skincare guidance, treatment explainers and routines from the SKNN LAB Aesthetic Clinic team.",
  alternates: { canonical: "/blog" },
};

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function BlogPage() {
  const hasPosts = posts.length > 0;
  return (
    <>
      <PageHero
        image="/images/treatments/tools-dark.jpg"
        alt="Professional skincare tools"
        position="50% 45%"
        eyebrow="The skin journal"
        title="Notes from the lab"
        italicFrom={2}
        subtitle="Honest skincare advice, treatment explainers and routines from our practitioners."
        crumbs={[{ label: "Blog" }]}
      />

      {hasPosts ? (
        <section className="section">
          <div className="container grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem]">
                    <Image src={p.image} alt="" fill sizes="(min-width:1024px) 33vw, 95vw" className="object-cover transition-transform duration-1000 ease-lux group-hover:scale-105" />
                  </div>
                  <p className="mt-5 !text-left font-sans text-sm text-eyebrow">
                    {dateFmt.format(new Date(p.date))}, {p.readTime}
                  </p>
                  <h2 className="mt-2 text-[2rem] transition-colors group-hover:text-accent">{p.title}</h2>
                  <p className="mt-3 text-[0.97rem]">{p.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      ) : (
        <section className="section">
          <div className="container">
            <SectionHeader
              eyebrow="Coming soon"
              title="Our first articles are on the way"
              subtitle="We're writing in-depth guides to help you understand your skin and get the most from every treatment. Here's a preview of what's coming."
            />
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {upcomingTopics.map((t, i) => (
                <Reveal key={t.title} delay={i * 0.1}>
                  <article className="group h-full overflow-hidden rounded-[1.75rem] border border-line bg-surface">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={t.image} alt="" fill sizes="(min-width:768px) 33vw, 95vw" className="object-cover grayscale-[35%] transition duration-1000 ease-lux group-hover:scale-105 group-hover:grayscale-0" />
                      <span className="absolute left-4 top-4 rounded-full bg-bg/90 px-3.5 py-1 font-sans text-xs text-eyebrow backdrop-blur">Coming soon</span>
                    </div>
                    <div className="p-8">
                      <h3 className="text-[1.9rem]">{t.title}</h3>
                      <p className="mt-3 text-[0.97rem]">{t.text}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-16 text-center">
              <p className="mx-auto max-w-md !text-center [hyphens:manual]">Until then, our Instagram is full of everyday skincare tips and real client stories.</p>
              <a href={site.social.instagram.url} target="_blank" rel="noreferrer" className="btn btn-primary mt-8">
                <InstagramIcon className="h-4 w-4" /> Follow {site.social.instagram.handle}
              </a>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
