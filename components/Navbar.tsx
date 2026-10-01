"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  Zap,
  Shield,
  Sparkles,
  ChevronDown,
  Layers,
  Maximize2,
  FileCode2,
  Crop,
  BookOpen,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setToolsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl transition-colors duration-200 dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo with Glow & Hover Effect */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.02]"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/25 transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-brand-500/40">
            <Zap className="h-5 w-5 fill-current transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute -inset-0.5 -z-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 opacity-0 blur transition duration-300 group-hover:opacity-60" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 transition-colors dark:text-white">
              Snap
              <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-500 bg-clip-text text-transparent dark:from-brand-400 dark:via-indigo-300 dark:to-brand-400">
                Reduce
              </span>
            </span>
            <span className="hidden text-[10px] font-medium tracking-wide text-slate-500 transition-colors dark:text-slate-400 sm:block">
              Fast • Private • Client-Side
            </span>
          </div>
        </Link>

        {/* Streamlined Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className="group relative rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors duration-150 hover:bg-slate-100/80 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-900/80 dark:hover:text-brand-400"
          >
            Home
            <span className="absolute inset-x-3 -bottom-0.5 h-0.5 scale-x-0 bg-brand-500 transition-transform duration-200 group-hover:scale-x-100" />
          </Link>

          {/* Tools Menu with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              onMouseEnter={() => setToolsDropdownOpen(true)}
              className={`group flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                toolsDropdownOpen
                  ? "bg-slate-100 text-brand-600 dark:bg-slate-900 dark:text-brand-400"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-900/80 dark:hover:text-brand-400"
              }`}
              aria-expanded={toolsDropdownOpen}
            >
              <span>Tools</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  toolsDropdownOpen ? "rotate-180 text-brand-600 dark:text-brand-400" : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500"
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {toolsDropdownOpen && (
              <div
                onMouseLeave={() => setToolsDropdownOpen(false)}
                className="absolute left-0 mt-2 w-72 origin-top-left rounded-2xl border border-slate-200/90 bg-white/95 p-2 shadow-xl shadow-slate-900/10 backdrop-blur-xl transition-all duration-200 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/50"
              >
                <div className="space-y-1">
                  <Link
                    href="/tools/image-compressor/"
                    onClick={() => setToolsDropdownOpen(false)}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-brand-50/70 dark:hover:bg-slate-800/80"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors dark:bg-slate-800 dark:text-brand-400">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">
                        Image Compressor
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Smart lossless & target KB compression
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/compress-jpg-to-100kb/"
                    onClick={() => setToolsDropdownOpen(false)}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-brand-50/70 dark:hover:bg-slate-800/80"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors dark:bg-slate-800 dark:text-emerald-400">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">
                        <span>Compress to 100KB</span>
                        <span className="rounded bg-emerald-100 px-1.5 py-0.2 text-[9px] font-bold text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400">
                          Popular
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Exact size reduction for forms & portals
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/tools/image-resizer/"
                    onClick={() => setToolsDropdownOpen(false)}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-brand-50/70 dark:hover:bg-slate-800/80"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors dark:bg-slate-800 dark:text-purple-400">
                      <Maximize2 className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">
                        Image Resizer
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Change dimensions, scale & aspect ratio
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/tools/jpg-to-webp/"
                    onClick={() => setToolsDropdownOpen(false)}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-brand-50/70 dark:hover:bg-slate-800/80"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors dark:bg-slate-800 dark:text-amber-400">
                      <FileCode2 className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">
                        Format Converters
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        JPG, PNG, WebP & iPhone HEIC
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="mt-1 border-t border-slate-100 pt-1 dark:border-slate-800">
                  <Link
                    href="/tools/"
                    onClick={() => setToolsDropdownOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-brand-600 transition-colors hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-slate-800"
                  >
                    <span className="flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5" />
                      Browse All 16 Tools
                    </span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Quick Target 100KB Featured link */}
          <Link
            href="/compress-jpg-to-100kb/"
            className="group relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors duration-150 hover:bg-slate-100/80 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-900/80 dark:hover:text-brand-400"
          >
            <span className="rounded-md bg-brand-50 px-1.5 py-0.5 text-[11px] font-bold text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-950/60 dark:text-brand-400 dark:group-hover:bg-brand-500 dark:group-hover:text-white">
              100KB
            </span>
            <span>Compress to 100KB</span>
            <span className="absolute inset-x-3 -bottom-0.5 h-0.5 scale-x-0 bg-brand-500 transition-transform duration-200 group-hover:scale-x-100" />
          </Link>

          {/* Guides / Blog */}
          <Link
            href="/blog/"
            className="group relative rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors duration-150 hover:bg-slate-100/80 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-900/80 dark:hover:text-brand-400"
          >
            Guides
            <span className="absolute inset-x-3 -bottom-0.5 h-0.5 scale-x-0 bg-brand-500 transition-transform duration-200 group-hover:scale-x-100" />
          </Link>

          {/* FAQ */}
          <Link
            href="/faq/"
            className="group relative rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors duration-150 hover:bg-slate-100/80 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-900/80 dark:hover:text-brand-400"
          >
            FAQ
            <span className="absolute inset-x-3 -bottom-0.5 h-0.5 scale-x-0 bg-brand-500 transition-transform duration-200 group-hover:scale-x-100" />
          </Link>
        </nav>

        {/* Right Action Area (Theme Switcher + CTA Button) */}
        <div className="flex items-center gap-2.5">
          {/* Theme Switcher Sun/Moon Toggle */}
          <ThemeToggle />

          {/* Primary CTA Button */}
          <Link
            href="/tools/image-compressor/"
            className="group relative hidden sm:inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand-500/20 transition-all duration-200 hover:from-brand-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-brand-500/30 active:scale-[0.98]"
          >
            <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
            <span>Compress Image</span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 p-2 text-slate-600 shadow-sm transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200/90 bg-white/95 px-4 pb-6 pt-3 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 md:hidden">
          <div className="flex flex-col space-y-1.5">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-base font-semibold text-slate-800 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              Home
            </Link>

            <Link
              href="/tools/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-xl px-3 py-2.5 text-base font-semibold text-slate-800 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              <span className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                All Image Tools
              </span>
              <span className="text-xs font-semibold text-slate-400">16 Tools</span>
            </Link>

            <Link
              href="/compress-jpg-to-100kb/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-xl px-3 py-2.5 text-base font-semibold text-slate-800 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              <span>Compress JPG to 100KB</span>
              <span className="rounded-md bg-brand-100 px-2 py-0.5 text-xs font-bold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                Popular
              </span>
            </Link>

            <Link
              href="/tools/image-resizer/"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-base font-semibold text-slate-800 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              Image Resizer
            </Link>

            <Link
              href="/blog/"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-base font-semibold text-slate-800 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              Blog & Tutorials
            </Link>

            <Link
              href="/faq/"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-base font-semibold text-slate-800 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              FAQ
            </Link>

            {/* Dark Mode Switch in Mobile Menu */}
            <div className="pt-2">
              <ThemeToggle variant="button" />
            </div>

            {/* CTA in Mobile Menu */}
            <div className="pt-2">
              <Link
                href="/tools/image-compressor/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 py-3 text-center text-sm font-semibold text-white shadow-md shadow-brand-500/25 active:scale-98"
              >
                <Zap className="h-4 w-4" />
                Start Compressing Free
              </Link>
            </div>

            <div className="mt-3 flex items-center justify-center gap-1.5 rounded-xl border border-emerald-200/80 bg-emerald-50/60 py-2 text-xs text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300">
              <Shield className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Images processed 100% locally on your device</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
