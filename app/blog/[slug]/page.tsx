import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  Calendar,
  User,
  Zap,
  ArrowRight,
  BookOpen,
  Layers,
  ChevronDown,
  HelpCircle,
  Share2,
} from "lucide-react";
import { ARTICLES, ArticleItem, getArticleBySlug } from "@/data/articles";
import { getToolBySlug, ToolItem } from "@/data/tools";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { SITE_CONFIG } from "@/data/site-config";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  const url = `${SITE_CONFIG.baseUrl}/blog/${article.slug}/`;

  return {
    title: article.seoTitle,
    description: article.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.seoTitle,
      description: article.metaDescription,
      url,
      siteName: SITE_CONFIG.name,
      type: "article",
      publishedTime: article.publishDate,
      modifiedTime: article.updateDate,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.metaDescription,
    },
  };
}

export default function ArticlePage({ params }: PageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    author: {
      "@type": "Organization",
      name: article.author,
      url: SITE_CONFIG.baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
    },
    datePublished: article.publishDate,
    dateModified: article.updateDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.baseUrl}/blog/${article.slug}/`,
    },
  };

  const relatedTools = article.relatedToolSlugs
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean) as ToolItem[];

  const relatedArticles = article.relatedArticleSlugs
    .map((slug) => getArticleBySlug(slug))
    .filter(Boolean) as ArticleItem[];

  return (
    <>
      <JsonLd data={articleSchema} />

      <main className="min-h-screen bg-slate-50/50 pb-20 transition-colors duration-200 dark:bg-[#0a0f1d]">
        {/* Header */}
        <div className="border-b border-slate-200/80 bg-white py-10 transition-colors duration-200 dark:border-slate-800/80 dark:bg-slate-900/60">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: "Blog", href: "/blog/" },
                { name: article.category, href: "/blog/" },
                { name: article.title, href: `/blog/${article.slug}/` },
              ]}
            />

            <div className="mt-4">
              <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 dark:bg-brand-950/70 dark:text-brand-300">
                {article.category}
              </span>
              <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl sm:leading-tight">
                {article.title}
              </h1>

              {/* Author & Date metadata */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                  <User className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
                  {article.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Published {article.publishDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Ad */}
        <div className="mx-auto max-w-4xl px-4">
          <AdSlot type="header" className="mx-auto" />
        </div>

        {/* Article Body */}
        <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/70 sm:p-10">
            {/* Intro Lead */}
            <p className="text-base font-normal leading-relaxed text-slate-700 dark:text-slate-200 sm:text-lg">
              {article.intro}
            </p>

            {/* Table of Contents */}
            {article.toc.length > 0 && (
              <div className="my-8 rounded-2xl border border-slate-200/90 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-800/40">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Table of Contents
                </span>
                <ol className="mt-3 space-y-1.5 text-sm">
                  {article.toc.map((item, idx) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-slate-600 transition-colors hover:text-brand-600 hover:underline dark:text-slate-400 dark:hover:text-brand-400"
                      >
                        <span className="text-slate-400 dark:text-slate-500 mr-2 font-mono text-xs">
                          {idx + 1}.
                        </span>
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Content Sections */}
            <div className="space-y-10 text-slate-800 dark:text-slate-200">
              {article.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 space-y-3"
                >
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl border-b border-slate-100 pb-2 dark:border-slate-800 dark:text-white">
                    {section.heading}
                  </h2>
                  <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base whitespace-pre-line">
                    {section.body}
                  </div>
                </section>
              ))}
            </div>

            {/* Tool CTA Box */}
            <div className="my-10 rounded-2xl border border-brand-200/90 bg-gradient-to-r from-brand-50 to-brand-100/50 p-6 dark:border-brand-900/60 dark:from-brand-950/40 dark:to-slate-900/80 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                    Recommended Utility
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
                    {article.toolCta.title}
                  </h3>
                  <p className="mt-1 max-w-xl text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
                    {article.toolCta.description}
                  </p>
                </div>
                <Link
                  href={article.toolCta.toolPath}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand-500/20 transition hover:from-brand-500 hover:to-indigo-500 active:scale-95"
                >
                  <Zap className="h-4 w-4" />
                  {article.toolCta.buttonText}
                </Link>
              </div>
            </div>

            {/* Mid-Article Ad Slot */}
            <AdSlot type="in-content" className="mx-auto" />

            {/* Article FAQs if present */}
            {article.faqs.length > 0 && (
              <section className="mt-10 border-t border-slate-200 pt-8 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Questions &amp; Answers
                  </h2>
                </div>
                <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
                  {article.faqs.map((f) => (
                    <div key={f.question} className="py-4">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 sm:text-base">
                        {f.question}
                      </h3>
                      <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 sm:text-sm leading-relaxed">
                        {f.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <div className="mt-10 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Related Working Image Tools
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {relatedTools.map((t) => (
                  <Link
                    key={t.slug}
                    href={t.path}
                    className="group rounded-xl border border-slate-200/90 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-500/60 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40 dark:hover:border-brand-500/50 dark:hover:bg-slate-800/70"
                  >
                    <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                      {t.categoryName}
                    </span>
                    <h3 className="mt-1 text-sm font-bold text-slate-900 transition-colors group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">
                      {t.h1}
                    </h3>
                    <span className="mt-2 inline-flex items-center text-xs font-semibold text-brand-600 dark:text-brand-400">
                      <span>Open Tool</span>
                      <span className="ml-1 transition-transform group-hover:translate-x-0.5">&rarr;</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-8 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Related Guides &amp; Tutorials
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {relatedArticles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}/`}
                    className="group rounded-xl border border-slate-200/90 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-500/60 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40 dark:hover:border-brand-500/50 dark:hover:bg-slate-800/70"
                  >
                    <span className="text-xs text-slate-400 dark:text-slate-500">{a.category}</span>
                    <h3 className="mt-1 text-sm font-bold text-slate-900 transition-colors group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">
                      {a.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {a.metaDescription}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Ad */}
          <AdSlot type="bottom" className="mx-auto" />
        </div>
      </main>
    </>
  );
}
