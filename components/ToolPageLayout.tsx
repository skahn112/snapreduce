"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Layers,
  HelpCircle,
  FileCheck,
} from "lucide-react";
import { ToolItem, getToolBySlug } from "@/data/tools";
import { getArticleBySlug } from "@/data/articles";
import { Breadcrumbs } from "./Breadcrumbs";
import { ToolRunner } from "./tools/ToolRunner";
import { AdSlot } from "./AdSlot";
import { JsonLd } from "./JsonLd";
import { SITE_CONFIG } from "@/data/site-config";

interface ToolPageLayoutProps {
  tool: ToolItem;
}

export function ToolPageLayout({ tool }: ToolPageLayoutProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Structured data: WebApplication + FAQPage
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.h1,
    url: `${SITE_CONFIG.baseUrl}${tool.path}`,
    description: tool.metaDescription,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All modern web browsers (Chrome, Safari, Firefox, Edge)",
    browserRequirements: "Requires JavaScript and HTML5 Canvas support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "100% Client-Side In-Browser Image Processing",
      "No file uploads to remote cloud servers",
      "Exact target size binary search compression",
      "Aspect ratio lock and bicubic resampling",
      "Fast instant preview and one-click download",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Resolve related tools & articles
  const relatedToolsList = tool.relatedToolSlugs
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean) as ToolItem[];

  const relatedArticlesList = tool.relatedArticleSlugs
    .map((slug) => getArticleBySlug(slug))
    .filter((art): art is NonNullable<typeof art> => Boolean(art));

  const isExactSizeRoute = tool.category === "exact-size";

  return (
    <>
      <JsonLd data={webAppSchema} />
      <JsonLd data={faqSchema} />

      <main className="min-h-screen bg-slate-50/50 pb-20 transition-colors duration-200 dark:bg-[#0a0f1d]">
        {/* Top Header & Breadcrumbs */}
        <div className="border-b border-slate-200/80 bg-white py-8 transition-colors duration-200 dark:border-slate-800/80 dark:bg-slate-900/60">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={
                isExactSizeRoute
                  ? [{ name: tool.h1, href: tool.path }]
                  : [
                      { name: "Tools", href: "/tools/" },
                      { name: tool.categoryName, href: "/tools/" },
                      { name: tool.h1, href: tool.path },
                    ]
              }
            />

            {/* Header info */}
            <div className="mt-2 text-center sm:text-left">
              {tool.badge && (
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 ring-1 ring-inset ring-brand-600/20 dark:bg-brand-950/70 dark:text-brand-300 dark:ring-brand-500/30">
                  <Sparkles className="h-3 w-3" />
                  {tool.badge}
                </span>
              )}
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                {tool.h1}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                {tool.intro}
              </p>
            </div>
          </div>
        </div>

        {/* Tool Container Area */}
        <section className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 lg:px-8">
          {/* Working Tool Component */}
          <div className="relative">
            <ToolRunner tool={tool} />
          </div>

          {/* Leaderboard Ad Placeholder */}
          <AdSlot type="header" className="mx-auto" />
        </section>

        {/* Content Sections */}
        <div className="mx-auto max-w-5xl space-y-12 px-4 pt-8 sm:px-6 lg:px-8">
          {/* How to use */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/70 sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
              How to Use {tool.h1}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {tool.howToSteps.map((s) => (
                <div
                  key={s.step}
                  className="relative flex flex-col rounded-xl border border-slate-100 bg-slate-50/80 p-4 transition-all duration-200 hover:border-brand-300 hover:bg-brand-50/30 dark:border-slate-800 dark:bg-slate-800/40 dark:hover:border-brand-500/50 dark:hover:bg-slate-800/80"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-600 text-xs font-bold text-white shadow-sm">
                    {s.step}
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-slate-100">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Explanation */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/70 sm:p-8">
            <div className="max-w-3xl space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                  How the Processing Engine Works
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                  {tool.explanation}
                </p>
              </div>

              {tool.tradeoffExplanation && (
                <div className="rounded-xl border border-amber-200/80 bg-amber-50/60 p-5 dark:border-amber-900/50 dark:bg-amber-950/30">
                  <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200 sm:text-base">
                    Balancing Quality, Dimensions &amp; Target Size
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-amber-800 dark:text-amber-300 sm:text-sm">
                    {tool.tradeoffExplanation}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* In-Content Ad Placeholder */}
          <AdSlot type="in-content" className="mx-auto" />

          {/* Frequently Asked Questions */}
          {tool.faqs.length > 0 && (
            <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/70 sm:p-8">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="mt-6 divide-y divide-slate-200 border-t border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                {tool.faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div key={faq.question} className="py-4">
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="flex w-full items-center justify-between text-left text-sm font-bold text-slate-900 transition-colors hover:text-brand-600 dark:text-slate-100 dark:hover:text-brand-400 sm:text-base"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`ml-2 h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-brand-600 dark:text-brand-400" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="mt-3 pr-4 text-xs leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Related Tools */}
          {relatedToolsList.length > 0 && (
            <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/70 sm:p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Related Image Tools
                  </h2>
                </div>
                <Link
                  href="/tools/"
                  className="group inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  <span>View All Tools</span>
                  <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                </Link>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedToolsList.map((rt) => (
                  <Link
                    key={rt.slug}
                    href={rt.path}
                    className="group flex flex-col justify-between rounded-xl border border-slate-200/90 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-500/60 hover:bg-slate-50/80 hover:shadow-md dark:border-slate-800 dark:bg-slate-800/40 dark:hover:border-brand-500/50 dark:hover:bg-slate-800/80"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                          {rt.categoryName}
                        </span>
                        {rt.badge && (
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            {rt.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-2 text-sm font-bold text-slate-900 transition-colors group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">
                        {rt.h1}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                        {rt.metaDescription}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center text-xs font-semibold text-brand-600 dark:text-brand-400">
                      <span>Use Tool</span>
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Related Guides / Learn More */}
          {relatedArticlesList.length > 0 && (
            <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/70 sm:p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Related Guides &amp; Tutorials
                  </h2>
                </div>
                <Link
                  href="/blog/"
                  className="group inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  <span>Visit Blog</span>
                  <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                </Link>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {relatedArticlesList.map((art) => (
                  <Link
                    key={art.slug}
                    href={`/blog/${art.slug}/`}
                    className="group flex flex-col justify-between rounded-xl border border-slate-200/90 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-500/60 hover:bg-slate-50/80 hover:shadow-md dark:border-slate-800 dark:bg-slate-800/40 dark:hover:border-brand-500/50 dark:hover:bg-slate-800/80"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
                        <span className="font-semibold text-brand-700 dark:text-brand-400">
                          {art.category}
                        </span>
                        <span>{art.readTime}</span>
                      </div>
                      <h3 className="mt-2 text-sm font-bold text-slate-900 transition-colors group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">
                        {art.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                        {art.metaDescription}
                      </p>
                    </div>
                    <span className="mt-3 inline-flex items-center text-xs font-semibold text-brand-600 dark:text-brand-400">
                      <span>Read Guide</span>
                      <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Bottom Ad Slot */}
          <AdSlot type="bottom" className="mx-auto" />
        </div>
      </main>
    </>
  );
}
