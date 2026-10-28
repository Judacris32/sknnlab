import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { categories } from "@/data/treatments";
import { products } from "@/data/products";
import { posts } from "@/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "",
    "/about",
    "/treatments",
    ...categories.map((c) => `/treatments/${c.slug}`),
    "/shop",
    ...products.map((p) => `/shop/${p.slug}`),
    "/blog",
    ...posts.map((p) => `/blog/${p.slug}`),
    "/contact",
    "/book",
    "/privacy",
  ];
  return paths.map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : p.startsWith("/treatments") || p === "/book" ? 0.8 : 0.6,
  }));
}
