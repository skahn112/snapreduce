import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TOOLS, ToolItem } from "@/data/tools";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { SITE_CONFIG } from "@/data/site-config";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  // Only include tools whose path starts with /tools/
  return TOOLS.filter((tool) => tool.path.startsWith("/tools/")).map((tool) => ({
    slug: tool.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const tool = TOOLS.find((t) => t.slug === params.slug);
  if (!tool) return {};

  const ogImageUrl = `${SITE_CONFIG.baseUrl}/og-image.png`;

  return {
    title: tool.seoTitle,
    description: tool.metaDescription,
    alternates: {
      canonical: `${SITE_CONFIG.baseUrl}${tool.path}`,
    },
    openGraph: {
      title: tool.seoTitle,
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

export default function ToolPage({ params }: PageProps) {
  const tool = TOOLS.find((t) => t.slug === params.slug);
  if (!tool) {
    notFound();
  }

  return <ToolPageLayout tool={tool} />;
}
