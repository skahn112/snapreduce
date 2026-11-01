import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/data/site-config";
import { TOOLS } from "@/data/tools";
import { ARTICLES } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.baseUrl;
  const siteReleaseDate = new Date("2026-10-22T00:00:00.000Z");

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: siteReleaseDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools/`,
      lastModified: siteReleaseDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: siteReleaseDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq/`,
      lastModified: siteReleaseDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: siteReleaseDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: siteReleaseDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy/`,
      lastModified: siteReleaseDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms/`,
      lastModified: siteReleaseDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer/`,
      lastModified: siteReleaseDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Tool routes (both /tools/... and exact-size root routes)
  const toolRoutes: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${baseUrl}${tool.path}`,
    lastModified: siteReleaseDate,
    changeFrequency: "weekly",
    priority: tool.category === "exact-size" ? 0.95 : 0.85,
  }));

  // Blog articles (all 28)
  const articleRoutes: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}/`,
    lastModified: new Date(article.updateDate || article.publishDate),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...toolRoutes, ...articleRoutes];
}
