"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  Zap,
  ArrowRight,
  Layers,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { SITE_CONFIG } from "@/data/site-config";

interface FAQGroup {
  category: string;
  items: { question: string; answer: string }[];
}

const faqGroups: FAQGroup[] = [
  {
    category: "General & How-To",
    items: [
      {
        question: "How do I compress a JPG to 100KB?",
        answer:
          "Upload your JPG to our Compress JPG to 100KB tool, ensure the 100KB target is active, and the tool will automatically adjust the JPEG quality and dimensions if necessary to produce a sharp file under 100KB. Then click Download.",
      },
      {
        question: "Is SnapReduce completely free?",
        answer:
          "Yes! All tools on SnapReduce are 100% free with no hidden fees, no subscriptions, and no registration required.",
      },
      {
        question: "Can I compress images on my smartphone?",
        answer:
          "Yes. SnapReduce works smoothly in mobile browsers on iOS (Safari) and Android (Chrome) without installing external apps.",
      },
    ],
  },
  {
    category: "Image Quality & File Sizes",
    items: [
      {
        question: "Can I compress a JPEG without losing quality?",
        answer:
          "JPEG is a lossy compression format, which means mathematical rounding removes imperceptible color data. The practical goal is to reduce file size enough while keeping the result visually indistinguishable from the original.",
      },
      {
        question: "Why did my file compress to 96KB instead of exactly 100.0KB?",
        answer:
          "We calibrate our algorithms to target just below your maximum threshold (typically 95KB-99KB) to ensure that strict upload validators with zero tolerance for 100.1KB never reject your submission.",
      },
      {
        question: "Why is my JPEG photo so large originally?",
        answer:
          "High megapixel camera sensors, 100% quality camera presets, detailed textures, and extensive camera EXIF metadata all contribute to bloated file sizes.",
      },
    ],
  },
  {
    category: "Privacy & Data Security",
    items: [
      {
        question: "Are my photos uploaded to any remote server?",
        answer:
          "No. All image operations are executed directly within your web browser's local sandbox memory using HTML5 Canvas. Your personal files never leave your device.",
      },
      {
        question: "Is it safe to compress passport photos and ID cards here?",
        answer:
          "Yes, absolutely. Because no files are uploaded over the internet or stored on cloud disks, your confidential identity documents remain strictly private to you.",
      },
    ],
  },
  {
    category: "Formats & Conversions",
    items: [
      {
        question: "What is the difference between JPG and JPEG?",
        answer:
          "There is no difference whatsoever. They refer to the exact same image format. The 3-letter extension '.jpg' was created because older MS-DOS operating systems only allowed 3-letter extensions.",
      },
      {
        question: "What happens to transparency when converting PNG to JPG?",
        answer:
          "Because JPEG does not support alpha transparency channels, any transparent background in a PNG will be rendered with a clean, solid white background.",
      },
      {
        question: "Can I convert Apple iPhone HEIC photos to JPG?",
        answer:
          "Yes! Our HEIC to JPG tool decodes Apple HEIC photos client-side via WebAssembly and exports standard universally compatible JPGs.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>("General & How-To-0");

  const toggle = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  const allItems = faqGroups.flatMap((g) => g.items);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allItems.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />

      <main className="min-h-screen bg-slate-50/50 pb-20 transition-colors duration-200 dark:bg-[#0a0f1d]">
        <div className="border-b border-slate-200/80 bg-white py-10 transition-colors duration-200 dark:border-slate-800/80 dark:bg-slate-900/60">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ name: "FAQ", href: "/faq/" }]} />
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Frequently Asked Questions
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              Got questions about image compression, file formats, exact sizes, or privacy? Find direct, expert answers below.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8 space-y-10">
          {faqGroups.map((group) => (
            <section
              key={group.category}
              className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/70"
            >
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl border-b border-slate-100 pb-3 dark:border-slate-800 dark:text-white">
                {group.category}
              </h2>
              <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
                {group.items.map((item, idx) => {
                  const id = `${group.category}-${idx}`;
                  const isOpen = openIndex === id;

                  return (
                    <div key={item.question} className="py-4">
                      <button
                        type="button"
                        onClick={() => toggle(id)}
                        className="flex w-full items-center justify-between text-left text-sm font-bold text-slate-900 hover:text-brand-600 dark:text-slate-100 dark:hover:text-brand-400 sm:text-base transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span>{item.question}</span>
                        <ChevronDown
                          className={`ml-2 h-4 w-4 shrink-0 text-slate-400 transition-transform dark:text-slate-500 ${
                            isOpen ? "rotate-180 text-brand-600 dark:text-brand-400" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="mt-2 pr-4 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          {/* Quick CTA banner */}
          <div className="rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-50 to-brand-100/60 p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-200 dark:border-brand-900/60 dark:from-brand-950/40 dark:to-slate-900/80">
            <div>
              <h3 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                Still have a question or need a new tool?
              </h3>
              <p className="mt-1 text-xs text-slate-600 sm:text-sm dark:text-slate-300">
                Check our tools directory or reach out directly to our technical support team.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/tools/"
                className="rounded-xl bg-brand-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-700 transition"
              >
                All Tools
              </Link>
              <Link
                href="/contact/"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
