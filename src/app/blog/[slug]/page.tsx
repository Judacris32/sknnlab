import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { getPost, posts } from "@/data/posts";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  return p ? { title: p.title, description: p.excerpt, alternates: { canonical: `/blog/${p.slug}` } } : {};
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <PageHero
        image={post.image}
        alt=""
        eyebrow={post.readTime}
        title={post.title}
        crumbs={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
      />
      <article className="section">
        <div className="container max-w-3xl">
          <Link href="/blog" className="link-underline">
            <ArrowLeft className="h-3.5 w-3.5" /> All articles
          </Link>
          <div className="mt-10 space-y-6 text-lg">
            {post.body.map((b, i) =>
              b.type === "h2" ? (
                <h2 key={i} className="pt-6 text-[2.3rem]">{b.text}</h2>
              ) : b.type === "list" ? (
                <ul key={i} className="list-disc space-y-2 pl-6 marker:text-primary">
                  {b.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              ) : (
                <p key={i}>{b.text}</p>
              ),
            )}
          </div>
        </div>
      </article>
    </>
  );
}
