import type { Metadata } from "next";
import { FaqClient } from "@/components/FaqClient";
import { SITE_CONFIG } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Frequently Asked Questions – SnapReduce",
  description:
    "Got questions about image compression, file formats, exact sizes (50KB, 100KB, 200KB), or browser privacy? Find direct, expert answers.",
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/faq/`,
  },
  openGraph: {
    title: "Frequently Asked Questions – SnapReduce",
    description:
      "Got questions about image compression, file formats, exact sizes, or browser privacy? Find direct, expert answers.",
    url: `${SITE_CONFIG.baseUrl}/faq/`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions – SnapReduce",
    description:
      "Got questions about image compression, file formats, exact sizes, or browser privacy?",
  },
};

export default function FAQPage() {
  return <FaqClient />;
}
