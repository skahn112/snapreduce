"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Search,
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  Zap,
  X,
} from "lucide-react";
import { ARTICLES, ArticleItem } from "@/data/articles";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";

export function BlogHubClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    "all",
    "Image Compression",
    "JPEG & JPG",
    "Image Formats",
    "Image Optimization",
    "Image Resizing",
    "Online Forms & Uploads",
    "Mobile Image Tools",
    "Tutorials",
  ];

  const trimmedQuery = searchTerm.trim().toLowerCase();

  const filteredArticles = ARTICLES.filter((art) => {
    const matchesSearch =
      !trimmedQuery ||
      art.title.toLowerCase().includes(trimmedQuery) ||
      art.seoTitle.toLowerCase().includes(trimmedQuery) ||
      art.metaDescription.toLowerCase().includes(trimmedQuery) ||
      art.intro.toLowerCase().includes(trimmedQuery) ||
      art.category.toLowerCase().includes(trimmedQuery);

    const matchesCategory =
      selectedCategory === "all" || art.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredArticle = ARTICLES[0]; // How to Compress a JPG to 100KB

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20 transition-colors duration-200 dark:bg-[#0a0f1d]">
      {/* Top Header */}
      <div className="border-b border-slate-200/80 bg-white py-10 transition-colors duration-200 dark:border-slate-800/80 dark:bg-slate-900/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Blog & Guides", href: "/blog/" }]} />

          <div className="mt-4 text-center sm:text-left">
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 dark:bg-brand-950/70 dark:text-brand-300">
              <BookOpen className="h-3.5 w-3.5" />
              Technical Guides &amp; Tutorials
            </span>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Image Optimization, Compression &amp; Format Guides
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
              Explore in-depth technical guides on lossy vs lossless compression, target file size reduction, format trade-offs, and optimizing web performance.
            </p>
          </div>

          {/* Search Bar - Professional & Sleek */}
          <div className="mt-8 flex flex-col gap-4">
            <div className="group relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400 transition-colors group-focus-within:text-brand-600 dark:text-slate-500 dark:group-focus-within:text-brand-400 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setSearchTerm("");
                }}
                placeholder="Search guides by keyword (e.g. 100KB, JPEG, DPI, WebP, Android, passport)..."
                className="w-full rounded-xl border border-slate-200/90 bg-white pl-10 sm:pl-11 pr-10 py-3 sm:py-3.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 shadow-sm transition-all hover:border-slate-300 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 dark:border-slate-700/80 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 dark:hover:border-slate-600 dark:focus:border-brand-400 dark:focus:ring-brand-400/15"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
                  title="Clear search (Esc)"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs sm:text-sm font-semibold capitalize transition ${
                    selectedCategory === cat
                      ? "bg-brand-600 text-white shadow-sm shadow-brand-500/25 dark:bg-brand-500"
                      : "bg-white text-slate-700 border border-slate-200/90 hover:border-brand-400 hover:text-brand-600 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:border-brand-500 dark:hover:text-white"
                  }`}
                >
                  {cat === "all" ? "All Topics" : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* Featured Article Card (if no search active) */}
        {!searchTerm && selectedCategory === "all" && featuredArticle && (
          <div className="mb-12 rounded-3xl border border-brand-200/80 bg-gradient-to-br from-brand-50/70 via-white to-white p-6 shadow-md transition-colors duration-200 dark:border-brand-900/60 dark:from-brand-950/40 dark:via-slate-900/80 dark:to-slate-900/80 sm:p-8">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-brand-600 px-3 py-0.5 text-xs font-bold text-white uppercase tracking-wider shadow-sm">
                Featured Guide
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {featuredArticle.readTime}
              </span>
            </div>
            <h2 className="mt-3 text-2xl font-extrabold text-slate-900 transition-colors hover:text-brand-600 dark:text-white dark:hover:text-brand-400 sm:text-3xl">
              <Link href={`/blog/${featuredArticle.slug}/`}>
                {featuredArticle.title}
              </Link>
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
              {featuredArticle.intro}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href={`/blog/${featuredArticle.slug}/`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-brand-500/20 transition hover:from-brand-500 hover:to-indigo-500"
              >
                Read Complete Article <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/compress-jpg-to-100kb/"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                <Zap className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
                Launch 100KB Tool
              </Link>
            </div>
          </div>
        )}

        {/* Article Grid */}
        <div className="mb-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            Published Articles:{" "}
            <strong className="text-slate-800 dark:text-slate-200">{filteredArticles.length}</strong>
          </span>
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="text-brand-600 hover:underline font-semibold dark:text-brand-400"
            >
              Reset Search
            </button>
          )}
        </div>

        {filteredArticles.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-12 text-center my-6 shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950/70 dark:text-brand-400 mb-4">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No guides found matching &quot;{searchTerm}&quot;
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              We couldn&apos;t find any articles for your search query. Try keywords like <strong className="text-slate-700 dark:text-slate-200">100KB, JPEG, WebP, PNG, or DPI</strong>.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="rounded-xl bg-brand-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-brand-700 dark:bg-brand-500 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((art) => (
              <article
                key={art.slug}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-500/60 hover:shadow-xl hover:shadow-brand-500/10 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-brand-500/50 dark:hover:shadow-brand-500/5"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
                    <span className="rounded-md bg-brand-50 px-2 py-0.5 font-bold text-brand-700 dark:bg-brand-950/70 dark:text-brand-300">
                      {art.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {art.readTime}
                    </span>
                  </div>

                  <h2 className="mt-3 text-base font-bold text-slate-900 transition-colors group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">
                    <Link href={`/blog/${art.slug}/`}>{art.title}</Link>
                  </h2>

                  <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-3">
                    {art.metaDescription}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-3 text-xs dark:border-slate-800">
                  <span className="text-slate-400 dark:text-slate-500">{art.publishDate}</span>
                  <Link
                    href={`/blog/${art.slug}/`}
                    className="flex items-center gap-1 font-semibold text-brand-600 hover:underline dark:text-brand-400"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Ad slot */}
        <AdSlot type="in-content" className="mx-auto" />
      </div>
    </main>
  );
}
