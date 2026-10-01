"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Layers,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
} from "lucide-react";
import { TOOLS, ToolItem } from "@/data/tools";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { SITE_CONFIG } from "@/data/site-config";

export default function ToolsDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Tools" },
    { id: "compress", label: "Compress" },
    { id: "exact-size", label: "Exact File Size" },
    { id: "resize", label: "Resize & Dimensions" },
    { id: "convert", label: "Convert Formats" },
    { id: "utilities", label: "Calculators & Crop" },
  ];

  const filteredTools = TOOLS.filter((tool) => {
    const matchesSearch =
      tool.h1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.metaDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.categoryName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || tool.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20 transition-colors duration-200 dark:bg-[#0a0f1d]">
      {/* Top Header */}
      <div className="border-b border-slate-200/80 bg-white py-10 transition-colors duration-200 dark:border-slate-800/80 dark:bg-slate-900/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Tools Directory", href: "/tools/" }]} />

          <div className="mt-4 text-center sm:text-left">
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 dark:bg-brand-950/70 dark:text-brand-300">
              <Layers className="h-3.5 w-3.5" />
              All Utilities
            </span>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Free Online Image Tools Directory
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
              Browse our complete suite of browser-based image compression, resizing, conversion, and calculation tools. All 100% free with no registration.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tools (e.g., 100KB, JPG, WebP, Resize, Passport)..."
                className="w-full rounded-2xl border border-slate-200/90 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-brand-400"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                    selectedCategory === cat.id
                      ? "bg-brand-600 text-white shadow-sm shadow-brand-500/25 dark:bg-brand-500"
                      : "bg-white text-slate-700 border border-slate-200/90 hover:border-brand-400 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:border-brand-500"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            Showing <strong className="text-slate-800 dark:text-slate-200">{filteredTools.length}</strong>{" "}
            tools
          </span>
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="text-brand-600 hover:underline font-semibold dark:text-brand-400"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.path}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-500/60 hover:shadow-xl hover:shadow-brand-500/10 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-brand-500/50 dark:hover:shadow-brand-500/5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    {tool.categoryName}
                  </span>
                  {tool.badge && (
                    <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700 dark:bg-brand-950/70 dark:text-brand-300">
                      {tool.badge}
                    </span>
                  )}
                </div>
                <h2 className="mt-3 text-lg font-bold text-slate-900 transition-colors group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">
                  {tool.h1}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-3">
                  {tool.metaDescription}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-brand-600 dark:border-slate-800 dark:text-brand-400">
                <span>Launch Tool</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900/50">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No tools matched your search term "{searchTerm}".
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Try searching for "100KB", "compress", "resize", or "convert".
            </p>
          </div>
        )}

        {/* Ad slot */}
        <AdSlot type="in-content" className="mx-auto" />
      </div>
    </main>
  );
}
