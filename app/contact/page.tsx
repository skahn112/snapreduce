import type { Metadata } from "next";
import { ContactClient } from "@/components/ContactClient";
import { SITE_CONFIG } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Contact Support & Feedback – SnapReduce",
  description:
    "Have a bug to report, a tool suggestion, or feedback on our image utilities? Get in touch with our technical team.",
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/contact/`,
  },
  openGraph: {
    title: "Contact Support & Feedback – SnapReduce",
    description:
      "Have a bug to report, a tool suggestion, or feedback on our image utilities? Get in touch with our technical team.",
    url: `${SITE_CONFIG.baseUrl}/contact/`,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Support & Feedback – SnapReduce",
    description:
      "Have a bug to report, a tool suggestion, or feedback on our image utilities?",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
