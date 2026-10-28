/**
 * BLOG POSTS
 * While this list is empty, /blog shows the "coming soon" page.
 * To publish an article, add an object below. It appears on /blog
 * and gets its own page at /blog/<slug> automatically.
 *
 * body: an array of blocks. Use { type: "h2", text } for headings,
 * { type: "p", text } for paragraphs and { type: "list", items } for bullet lists.
 */

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  readTime: string;
  image: string;
  body: PostBlock[];
};

export const posts: Post[] = [];

/** Shown on the coming-soon page as a preview of what's planned. */
export const upcomingTopics = [
  {
    title: "Before getting a facial",
    text: "What every client should know before their first treatment, and how to prepare your skin.",
    image: "/images/treatments/tools-dark.jpg",
  },
  {
    title: "Chemical peels, explained",
    text: "Superficial, medium or combination? How we choose the right peel, and what recovery really looks like.",
    image: "/images/treatments/brushes.jpg",
  },
  {
    title: "Your glow-up starts here",
    text: "Cleanse, tone, serum, moisturise, SPF: building a daily routine that protects your results.",
    image: "/images/clinic/product-shelf.jpg",
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
