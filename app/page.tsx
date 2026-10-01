import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap,
  Shield,
  Layers,
  Sparkles,
  ArrowRight,
  Lock,
  Clock,
  CheckCircle2,
  FileCheck,
  Maximize2,
  Crop,
  HelpCircle,
} from "lucide-react";
import { TargetSizeCompressor } from "@/components/tools/TargetSizeCompressor";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { SITE_CONFIG } from "@/data/site-config";
import { TOOLS } from "@/data/tools";
import { ARTICLES } from "@/data/articles";

export const metadata: Metadata = {
  title: "SnapReduce – Free Online Image Compression, Resizing & Conversion Tools",
  description:
    "Free online image compressor, resizer, and converter. Reduce image file size to 100KB, 200KB, or 500KB. Compress photos, resize images, and convert JPG, PNG, WebP, and HEIC with 100% private browser-based processing.",
  alternates: {
    canonical: SITE_CONFIG.baseUrl,
  },
};

const homeFaqs = [
  {
    question: "How do I compress a JPG to 100KB?",
    answer:
      "Upload your JPG, choose a 100KB target, and start compression. The tool tests suitable JPEG settings and, when necessary, adjusts image dimensions to produce a practical file near the requested size. Download the result and verify the final file size before uploading it.",
  },
  {
    question: "Can I compress a JPEG without losing quality?",
    answer:
      "JPEG compression is normally lossy, so reducing the file size can remove some image information. The practical goal is to reduce the file enough while keeping the result visually suitable for its intended use without noticeable blur or pixelation.",
  },
  {
    question: "What is the difference between JPG and JPEG?",
    answer:
      "JPG and JPEG refer to the same image format. The shorter JPG extension became common because some older MS-DOS systems used three-character file extensions. Both extensions use identical encoding structures and produce identical image fidelity.",
  },
  {
    question: "Are my images uploaded to a server?",
    answer:
      "No. All image compression, resizing, and format conversions are performed locally on your device using client-side HTML5 Canvas and browser APIs. Your photos never leave your computer or smartphone, guaranteeing complete privacy.",
  },
  {
    question: "Why is my JPEG file so large?",
    answer:
      "Large pixel dimensions from high-megapixel phone cameras, high-quality encoding matrices, sensor grain in low light, and unneeded camera EXIF metadata all contribute to an unnecessarily heavy JPEG file.",
  },
  {
    question: "How do I compress a photo for an online form?",
    answer:
      "Online forms typically require images under 100KB or 200KB. Use our dedicated target size tools, select your form's exact threshold, and download the optimized photo ready for submission.",
  },
];

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const exactSizeTools = TOOLS.filter((t) => t.category === "exact-size").slice(0, 8);
  const formatConverters = TOOLS.filter((t) => t.category === "convert");
  const popularGuides = ARTICLES.slice(0, 6);

  return (
    <>
      <JsonLd data={faqSchema} />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-brand-50/60 via-slate-50/50 to-white py-14 sm:py-24 transition-colors duration-200 dark:border-slate-800/80 dark:from-[#0e172e] dark:via-[#0a0f1d] dark:to-[#0a0f1d]">
          {/* Subtle Ambient Background Glows */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-[700px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl dark:bg-brand-500/15" />
          <div className="pointer-events-none absolute top-48 right-10 -z-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/15" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              {/* Pill badge with subtle glow */}
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-brand-50/80 px-4 py-1.5 text-xs font-semibold text-brand-700 shadow-sm backdrop-blur-sm transition hover:border-brand-300 dark:border-brand-900/60 dark:bg-brand-950/60 dark:text-brand-300 dark:hover:border-brand-800">
                <Shield className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
                <span>100% In-Browser Privacy • Zero Server Uploads</span>
              </div>

              {/* H1 with Gradient Shine */}
              <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl sm:leading-tight dark:text-white">
                <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent transition-all duration-300 hover:brightness-110 dark:from-white dark:via-slate-100 dark:to-slate-300">
                  Free Online Image Compression, Resizing &amp; Conversion Tools
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                Effortlessly <span className="font-semibold text-slate-900 dark:text-white">reduce image file size</span>,{" "}
                <span className="font-semibold text-slate-900 dark:text-white">compress photos</span> to exact limits like 100KB,{" "}
                <span className="font-semibold text-slate-900 dark:text-white">resize images</span>, and{" "}
                <span className="font-semibold text-slate-900 dark:text-white">convert JPG, PNG, WebP, and HEIC</span> with fast, private{" "}
                <span className="font-semibold text-brand-600 dark:text-brand-400">browser-based processing</span>.
              </p>

              {/* Buttons */}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#compressor"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand-500/25 transition-all duration-200 hover:from-brand-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-brand-500/35 active:scale-95"
                >
                  <Zap className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                  Compress an Image
                </a>
                <Link
                  href="/tools/"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200/90 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-brand-300 hover:bg-slate-50 hover:text-brand-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-brand-400"
                >
                  <Layers className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  Explore All Tools
                </Link>
              </div>
            </div>

            {/* Main Interactive Tool On Hero */}
            <div id="compressor" className="mx-auto mt-12 max-w-4xl scroll-mt-24">
              <TargetSizeCompressor
                initialTargetKB={100}
                headline="Compress Any Image Locally in Your Browser"
              />
            </div>
          </div>
        </section>

        {/* Leaderboard Ad Placeholder */}
        <div className="mx-auto max-w-5xl px-4">
          <AdSlot type="header" className="mx-auto" />
        </div>

        {/* Exact File-Size Tools Section */}
        <section className="py-16 bg-slate-50/70 border-b border-slate-200/80 transition-colors duration-200 dark:bg-slate-950/60 dark:border-slate-800/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  Target Size Reducer
                </span>
                <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                  Exact File-Size Compression Tools
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
                  Meet rigid portal limits without guessing. Dedicated tools calibrated for specific kilobyte thresholds.
                </p>
              </div>
              <Link
                href="/tools/"
                className="group inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                <span>Browse all exact tools</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {exactSizeTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={tool.path}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-500/60 hover:shadow-xl hover:shadow-brand-500/10 dark:border-slate-800/90 dark:bg-slate-900/70 dark:hover:border-brand-500/50 dark:hover:shadow-brand-500/5"
                >
                  <div>
                    <span className="rounded-md bg-brand-50 px-2 py-1 text-xs font-bold text-brand-700 dark:bg-brand-950/70 dark:text-brand-300">
                      {tool.badge || "Target KB"}
                    </span>
                    <h3 className="mt-3 text-base font-bold text-slate-900 transition-colors group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">
                      {tool.h1}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {tool.metaDescription}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center text-xs font-semibold text-brand-600 dark:text-brand-400">
                    <span>Compress Now</span>
                    <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Format Converters Section */}
        <section className="py-16 bg-white border-b border-slate-200/80 transition-colors duration-200 dark:bg-slate-900/40 dark:border-slate-800/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Format Shifter
              </span>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Fast In-Browser Format Converters
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Seamlessly convert between modern and standard image formats with zero quality compromises.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {formatConverters.map((tool) => (
                <Link
                  key={tool.slug}
                  href={tool.path}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-200/90 bg-slate-50/60 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-500/60 hover:bg-white hover:shadow-lg hover:shadow-brand-500/10 dark:border-slate-800/90 dark:bg-slate-900/50 dark:hover:border-brand-500/50 dark:hover:bg-slate-800/70"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm text-brand-600 group-hover:scale-105 group-hover:bg-brand-600 group-hover:text-white transition-all duration-200 dark:bg-slate-800 dark:border-slate-700 dark:text-brand-400 dark:group-hover:bg-brand-500 dark:group-hover:text-white">
                    <Layers className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-slate-900 transition-colors group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">
                      {tool.h1}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {tool.metaDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why SnapReduce / Privacy Guarantee */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
                Privacy By Design
              </span>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-4xl">
                Why Millions Choose SnapReduce
              </h2>
              <p className="mt-3 text-sm text-slate-400 sm:text-base">
                Traditional image compression tools upload your personal photographs and documents to remote third-party servers. SnapReduce completely changes that.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">
                  100% Client-Side Privacy
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                  All rendering and compression algorithms run inside your web browser using HTML5 Canvas. Your photos never touch a remote cloud database.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">
                  Zero Upload Wait Times
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                  Because files don't need to be uploaded to an external server and downloaded back, compression completes in milliseconds on your local CPU.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">
                  Exact Target Size Accuracy
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                  Our iterative binary-search algorithm systematically adjusts quality matrices and dimensions to strictly satisfy your designated target size.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white border-b border-slate-200/80 transition-colors duration-200 dark:bg-slate-900/40 dark:border-slate-800/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Simple Workflow
              </span>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                How SnapReduce Works in 4 Steps
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200/90 bg-slate-50/60 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-500/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-brand-500/40">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-sm font-bold text-white shadow-md shadow-brand-500/25">
                  1
                </span>
                <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-slate-100">
                  Select Your Photo
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  Drag and drop any JPG, PNG, WebP, or iPhone HEIC image into the tool.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-slate-50/60 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-500/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-brand-500/40">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-sm font-bold text-white shadow-md shadow-brand-500/25">
                  2
                </span>
                <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-slate-100">
                  Choose Target or Quality
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  Set 50KB, 100KB, 200KB, or adjust the perceptual quality slider.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-slate-50/60 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-500/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-brand-500/40">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-sm font-bold text-white shadow-md shadow-brand-500/25">
                  3
                </span>
                <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-slate-100">
                  Instant Local Processing
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  HTML5 Canvas optimizes quantization and scales pixels inside your browser memory.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-slate-50/60 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-500/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-brand-500/40">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-sm font-bold text-white shadow-md shadow-brand-500/25">
                  4
                </span>
                <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-slate-100">
                  Download &amp; Share
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  Inspect the live side-by-side comparison and download your compliant photo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Blog Guides */}
        <section className="py-16 bg-slate-50/70 border-b border-slate-200/80 transition-colors duration-200 dark:bg-slate-950/60 dark:border-slate-800/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  Learning Center
                </span>
                <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                  Popular Image Optimization Guides
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Deep-dive technical tutorials on image formats, quality preservation, and web performance.
                </p>
              </div>
              <Link
                href="/blog/"
                className="group inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                <span>Read all 28 articles</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {popularGuides.map((art) => (
                <Link
                  key={art.slug}
                  href={`/blog/${art.slug}/`}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-500/60 hover:shadow-xl hover:shadow-brand-500/10 dark:border-slate-800/90 dark:bg-slate-900/70 dark:hover:border-brand-500/50 dark:hover:shadow-brand-500/5"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
                      <span className="font-semibold text-brand-600 dark:text-brand-400">
                        {art.category}
                      </span>
                      <span>{art.readTime}</span>
                    </div>
                    <h3 className="mt-2.5 text-base font-bold text-slate-900 transition-colors group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">
                      {art.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">
                      {art.metaDescription}
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center text-xs font-semibold text-brand-600 dark:text-brand-400">
                    <span>Read Guide</span>
                    <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Homepage FAQ Section */}
        <section className="py-16 bg-white border-b border-slate-200/80 transition-colors duration-200 dark:bg-slate-900/40 dark:border-slate-800/80">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <HelpCircle className="mx-auto h-8 w-8 text-brand-600 dark:text-brand-400" />
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Everything you need to know about online image compression, formats, and privacy.
              </p>
            </div>

            <div className="mt-8 divide-y divide-slate-200 border-t border-slate-200 dark:divide-slate-800 dark:border-slate-800">
              {homeFaqs.map((faq) => (
                <div key={faq.question} className="py-5">
                  <h3 className="text-base font-bold text-slate-900 transition-colors hover:text-brand-600 dark:text-slate-100 dark:hover:text-brand-400">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden py-16 bg-gradient-to-tr from-brand-600 via-indigo-600 to-brand-700 text-white shadow-2xl">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-indigo-400/20 blur-2xl" />

          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black tracking-tight sm:text-4xl">
              Ready to Shrink Your Images Fast &amp; Privately?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-brand-100 sm:text-base">
              No registration, no subscriptions, and zero cloud uploads. Start compressing your photos right now in your browser.
            </p>
            <div className="mt-7">
              <a
                href="#compressor"
                className="group inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-base font-bold text-brand-700 shadow-xl transition-all duration-200 hover:bg-brand-50 hover:shadow-2xl active:scale-95"
              >
                <Zap className="h-5 w-5 fill-current text-brand-600 transition-transform duration-200 group-hover:scale-110" />
                Compress an Image Now
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
