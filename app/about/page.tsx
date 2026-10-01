import type { Metadata } from "next";
import Link from "next/link";
import { Zap, ShieldCheck, Cpu, Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE_CONFIG } from "@/data/site-config";

export const metadata: Metadata = {
  title: "About SnapReduce – Private Browser-Based Image Tools",
  description:
    "Learn about SnapReduce's mission to provide fast, completely private, client-side image compression, resizing, and format conversion utilities.",
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/about/`,
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50/50 pb-20 transition-colors duration-200 dark:bg-[#0a0f1d]">
      <div className="border-b border-slate-200/80 bg-white py-10 transition-colors duration-200 dark:border-slate-800/80 dark:bg-slate-900/60">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "About", href: "/about/" }]} />
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            About SnapReduce
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Free, privacy-first image utilities engineered to run directly inside your browser.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-10 space-y-8 text-slate-700 leading-relaxed transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">What We Do</h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              SnapReduce is a specialized collection of browser-based image utilities built to solve everyday digital frustrations. We help users:
            </p>
            <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-sm">
              <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Reduce image file sizes to exact target limits (50KB, 100KB, 200KB)</span>
              </li>
              <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Resize camera photos and document scans to custom pixel dimensions</span>
              </li>
              <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Convert between JPG, PNG, modern WebP, and Apple HEIC</span>
              </li>
              <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Prepare passport, visa, and exam portal application photos</span>
              </li>
              <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Optimize website images for Google Core Web Vitals (LCP)</span>
              </li>
            </ul>
          </section>

          <section className="rounded-xl border border-emerald-200/80 bg-emerald-50/60 p-6 space-y-3 transition-colors duration-200 dark:border-emerald-900/60 dark:bg-emerald-950/30">
            <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-bold text-base">
              <Lock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span>Our Privacy Architecture</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300">
              Most image compression websites upload your personal photos, ID documents, and sensitive certificates to their remote cloud servers. SnapReduce operates on a completely different architecture: <strong>all processing happens locally in your browser memory</strong> using HTML5 Canvas and WebAssembly.
            </p>
            <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300">
              Your files are never transmitted across the network, never stored in databases, and never viewed by anyone else.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Why Browser-Based Processing?</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200/90 p-4 bg-slate-50/70 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-850/60">
                <Cpu className="h-6 w-6 text-brand-600 dark:text-brand-400 mb-2" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Ultra Fast</h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Zero upload and download latency. Instant processing powered by your device's hardware.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/90 p-4 bg-slate-50/70 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-850/60">
                <ShieldCheck className="h-6 w-6 text-brand-600 dark:text-brand-400 mb-2" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">100% Confidential</h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Ideal for sensitive IDs, signatures, passport photos, and confidential documents.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/90 p-4 bg-slate-50/70 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-850/60">
                <Zap className="h-6 w-6 text-brand-600 dark:text-brand-400 mb-2" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">No Accounts Needed</h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  No sign-ups, no subscription traps, and no artificial daily limits.
                </p>
              </div>
            </div>
          </section>

          <div className="border-t border-slate-200 pt-6 flex flex-wrap items-center justify-between gap-4 dark:border-slate-800">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Have questions or feedback? We'd love to hear from you.
            </span>
            <Link
              href="/contact/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:underline dark:text-brand-400"
            >
              Contact Support <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
