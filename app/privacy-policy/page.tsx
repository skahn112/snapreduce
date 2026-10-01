import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE_CONFIG } from "@/data/site-config";
import { ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy – SnapReduce",
  description:
    "SnapReduce Privacy Policy. Understand our client-side image processing architecture, cookie usage, analytics, and advertising disclosure.",
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/privacy-policy/`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50/50 pb-20">
      <div className="border-b border-slate-200/80 bg-white py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Privacy Policy", href: "/privacy-policy/" }]} />
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Last Updated: September 28, 2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 space-y-8 text-sm leading-relaxed text-slate-700 sm:text-base">
          {/* Key Highlight Banner */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5 flex items-start gap-3">
            <Lock className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="font-bold text-emerald-900 text-sm sm:text-base">
                Core Privacy Guarantee: Zero Image Uploads
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-emerald-800">
                SnapReduce executes image compression, resizing, cropping, and format conversion directly inside your browser using HTML5 Canvas and WebAssembly. Your photos, documents, and personal images are never uploaded to, transmitted across, or stored on our servers.
              </p>
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Image Data Handling</h2>
            <p>
              When you select or drag-and-drop a file into SnapReduce, the file is read into your device's local Random Access Memory (RAM). The image pixels are manipulated entirely by your local browser runtime. When you click "Download", your browser writes the output file directly from local memory onto your disk storage.
            </p>
            <p>
              We do not possess a cloud file storage bucket, backend image processing queue, or server database of user uploads.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Information We Collect</h2>
            <p>While your image files remain strictly local, our web platform collects standard operational information:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>
                <strong>Web Analytics</strong>: We may collect anonymized traffic metrics (such as page views, referring URLs, browser versions, and device screen sizes) to measure tool reliability and optimize performance.
              </li>
              <li>
                <strong>Contact Inquiries</strong>: If you contact us via our contact form or direct email, we retain your email address and message contents solely to respond to your support request.
              </li>
              <li>
                <strong>Server Access Logs</strong>: Standard hosting logs provided by our infrastructure provider (such as Cloudflare Pages) which log IP addresses and timestamps for cybersecurity defense.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. Cookies &amp; Local Storage</h2>
            <p>
              SnapReduce does not require cookies for normal image tool usage. We may use HTML5 LocalStorage to remember your user preferences (such as your preferred default compression target or UI layout settings) across visits.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. Advertising Disclosures</h2>
            <p>
              To maintain free access to all our tools without charging subscriptions or fees, SnapReduce displays third-party advertisements (such as Google AdSense or Adsterra). These advertising partners may use cookies or web beacons to serve contextually relevant ads.
            </p>
            <p>
              You can control personalized advertising settings through your browser privacy preferences or industry opt-out portals like the Network Advertising Initiative (NAI).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">5. Data Retention</h2>
            <p>
              Because image files are never uploaded to our servers, there is zero image data retention on our end. Support emails sent to our help desk are archived for a maximum of 12 months for quality assurance before permanent deletion.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">6. Contact for Privacy Matters</h2>
            <p>
              If you have any questions or data protection requests regarding this Privacy Policy, please email our Data Protection Officer at:{" "}
              <a
                href={`mailto:${SITE_CONFIG.contactEmail}`}
                className="font-mono text-brand-600 font-semibold hover:underline"
              >
                {SITE_CONFIG.contactEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
