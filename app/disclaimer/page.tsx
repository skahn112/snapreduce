import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE_CONFIG } from "@/data/site-config";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer – SnapReduce",
  description:
    "SnapReduce Disclaimer. Clarification regarding target file size approximations, browser execution limits, and government portal compliance.",
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/disclaimer/`,
  },
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-slate-50/50 pb-20 transition-colors duration-200 dark:bg-[#0a0f1d]">
      <div className="border-b border-slate-200/80 bg-white py-10 transition-colors duration-200 dark:border-slate-800/80 dark:bg-slate-900/60">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Disclaimer", href: "/disclaimer/" }]} />
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Legal &amp; Operational Disclaimer
          </h1>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Last Updated: September 28, 2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-10 space-y-8 text-sm leading-relaxed text-slate-700 sm:text-base transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
          <div className="rounded-xl border border-amber-200/90 bg-amber-50/60 p-5 flex items-start gap-3 transition-colors duration-200 dark:border-amber-900/60 dark:bg-amber-950/30">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="font-bold text-amber-900 dark:text-amber-200 text-sm sm:text-base">
                Important Notice for Official Portal Submissions
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-amber-800 dark:text-amber-300">
                While SnapReduce is engineered to optimize images to strict kilobyte ceilings (e.g., 50KB, 100KB, 200KB), users must always double-check the final downloaded file properties and dimensions against the specific guidelines published by their target institution or government body.
              </p>
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              1. Target File Size Estimates
            </h2>
            <p>
              Digital image compression depends heavily on high-frequency visual content, sensor grain, color distribution, and browser canvas implementations. While our binary search algorithms iteratively calibrate encoding parameters to meet target boundaries, exact byte-level output cannot be guaranteed for every unique photograph.
            </p>
            <p>
              Our tools typically produce files slightly below the specified target (e.g. 96KB for a 100KB target) to safeguard against validation rejections caused by server-side rounding.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              2. Browser Execution &amp; Device Constraints
            </h2>
            <p>
              All image operations are executed within the user&apos;s local web browser environment. Very large raw images (exceeding 50MB) or devices with limited available RAM may experience browser memory limits or performance slowdowns beyond our direct control.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              3. Independent Operation
            </h2>
            <p>
              SnapReduce is an independent online utility platform. We are not affiliated with, endorsed by, or partnered with any government department, passport agency, visa authority, or academic examination board mentioned in our educational guides.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              4. External Links &amp; Informational Guides
            </h2>
            <p>
              Our blog articles, calculators, and tutorials are provided for informational and educational purposes only. We make reasonable efforts to maintain accuracy, but technology specifications and portal rules change frequently.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
