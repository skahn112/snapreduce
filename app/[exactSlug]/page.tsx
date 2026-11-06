import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TOOLS } from "@/data/tools";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { SITE_CONFIG } from "@/data/site-config";

interface PageProps {
  params: {
    exactSlug: string;
  };
}

export function generateStaticParams() {
  return TOOLS.filter((tool) => tool.category === "exact-size").map((tool) => ({
    exactSlug: tool.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const tool = TOOLS.find(
    (t) => t.slug === params.exactSlug && t.category === "exact-size"
  );
  if (!tool) return {};

  const ogImageUrl = `${SITE_CONFIG.baseUrl}/og-image.png`;

  const title = tool.seoTitle.includes("SnapReduce")
    ? tool.seoTitle
    : tool.seoTitle.length <= 46
    ? `${tool.seoTitle} | SnapReduce`
    : tool.seoTitle;

  return {
    title: {
      absolute: title,
    },
    description: tool.metaDescription,
    alternates: {
      canonical: `${SITE_CONFIG.baseUrl}${tool.path}`,
    },
    openGraph: {
      title,
      description: tool.metaDescription,
      url: `${SITE_CONFIG.baseUrl}${tool.path}`,
      siteName: SITE_CONFIG.name,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: tool.h1,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.seoTitle,
      description: tool.metaDescription,
      images: [ogImageUrl],
    },
  };
}

export default function ExactSizePage({ params }: PageProps) {
  const tool = TOOLS.find(
    (t) => t.slug === params.exactSlug && t.category === "exact-size"
  );

  if (!tool) {
    notFound();
  }

  return <ToolPageLayout tool={tool} />;
}
