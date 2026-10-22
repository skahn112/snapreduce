import type { Metadata } from "next";
import { ToolsDirectoryClient } from "@/components/ToolsDirectoryClient";
import { SITE_CONFIG } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Free Online Image Tools Directory – SnapReduce",
  description:
    "Browse our complete suite of browser-based image compression, resizing, conversion, and calculation tools. All 100% free, private, and client-side with no file uploads.",
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/tools/`,
  },
  openGraph: {
    title: "Free Online Image Tools Directory – SnapReduce",
    description:
      "Browse our complete suite of browser-based image compression, resizing, conversion, and calculation tools. All 100% free, private, and client-side with no file uploads.",
    url: `${SITE_CONFIG.baseUrl}/tools/`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Image Tools Directory – SnapReduce",
    description:
      "Browse our complete suite of browser-based image compression, resizing, conversion, and calculation tools.",
  },
};

export default function ToolsDirectoryPage() {
  return <ToolsDirectoryClient />;
}
