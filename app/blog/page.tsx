import type { Metadata } from "next";
import { BlogHubClient } from "@/components/BlogHubClient";
import { SITE_CONFIG } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Image Optimization, Compression & Format Guides – SnapReduce",
  description:
    "Explore in-depth technical guides on lossy vs lossless compression, target file size reduction, format trade-offs, and optimizing web performance.",
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/blog/`,
  },
  openGraph: {
    title: "Image Optimization, Compression & Format Guides – SnapReduce",
    description:
      "Explore in-depth technical guides on lossy vs lossless compression, target file size reduction, format trade-offs, and optimizing web performance.",
    url: `${SITE_CONFIG.baseUrl}/blog/`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Optimization, Compression & Format Guides – SnapReduce",
    description:
      "Explore in-depth technical guides on lossy vs lossless compression, target file size reduction, and format trade-offs.",
  },
};

export default function BlogHubPage() {
  return <BlogHubClient />;
}
