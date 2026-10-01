import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE_CONFIG } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Terms of Service – SnapReduce",
  description:
    "SnapReduce Terms of Service. Understand terms of use, intellectual property, disclaimer of warranties, and permitted use of our image utilities.",
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/terms/`,
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50/50 pb-20">
      <div className="border-b border-slate-200/80 bg-white py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Terms of Service", href: "/terms/" }]} />
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Last Updated: September 28, 2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 space-y-8 text-sm leading-relaxed text-slate-700 sm:text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and using SnapReduce ({SITE_CONFIG.domain}), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our image tools or content.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Permitted Use</h2>
            <p>
              SnapReduce grants you a non-exclusive, revocable, royalty-free license to use our web-based image compression, resizing, conversion, and calculation tools for personal, educational, and commercial purposes.
            </p>
            <p>
              You agree not to use automated bots, scrapers, or scripts to flood or maliciously disrupt our web infrastructure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. Ownership of Image Content</h2>
            <p>
              You retain 100% full, exclusive copyright and ownership of any images, photographs, or graphics you process through SnapReduce. Because processing runs in your browser, SnapReduce claims zero ownership, license, or rights to your media files.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. Disclaimer of Warranties</h2>
            <p>
              SnapReduce and all associated image tools are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, either express or implied.
            </p>
            <p>
              While our compression algorithms strive to meet designated target sizes accurately, variations in image entropy, browser hardware memory, and format codecs mean that output sizes and visual results may vary. Users are advised to verify final file dimensions and sizes prior to critical portal submissions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">5. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, SnapReduce shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from the use or inability to use our tools.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">6. Modifications to Service</h2>
            <p>
              We reserve the right to modify, update, or temporarily suspend any tool or feature at our discretion without prior notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">7. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with standard international internet commerce principles and applicable local jurisdictions.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
