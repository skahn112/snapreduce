"use client";

import { useState, FormEvent } from "react";
import {
  Mail,
  Send,
  CheckCircle2,
  Clock,
  ExternalLink,
  Loader2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE_CONFIG } from "@/data/site-config";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("General feedback");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionNotice, setSubmissionNotice] = useState<string | null>(null);

  const categories = [
    "General feedback",
    "Tool issue",
    "Bug report",
    "Content suggestion",
    "Business inquiry",
    "Other",
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setSubmissionNotice(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, category, message }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        if (data.method === "logged") {
          setSubmissionNotice(
            "Your message was recorded! You can also click below to open your email client for immediate direct transmission."
          );
        } else {
          setSubmissionNotice(
            `Your inquiry has been sent directly to ${SITE_CONFIG.contactEmail}. We will review and reply to ${email} as soon as possible.`
          );
        }
      } else {
        // Fallback to mailto
        launchMailto();
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Submission failed, fallback to mailto:", err);
      launchMailto();
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const launchMailto = () => {
    const subject = encodeURIComponent(
      `[SnapReduce Inquiry - ${category}] from ${name}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCategory: ${category}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${SITE_CONFIG.contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20 transition-colors duration-200 dark:bg-[#0a0f1d]">
      {/* Header Banner */}
      <div className="border-b border-slate-200/80 bg-white py-10 transition-colors duration-200 dark:border-slate-800/80 dark:bg-slate-900/60">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Contact", href: "/contact/" }]} />
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Contact Support &amp; Feedback
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Have a bug to report, a tool suggestion, or feedback on our image utilities? Get in touch with our team.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Direct Info Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 mb-3 dark:bg-brand-950/70 dark:text-brand-400">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Direct Email
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                You can email our support desk directly at:
              </p>
              <a
                href={`mailto:${SITE_CONFIG.contactEmail}`}
                className="mt-2.5 inline-block break-all font-mono text-xs sm:text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400"
              >
                {SITE_CONFIG.contactEmail}
              </a>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm text-xs text-slate-500 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 text-sm">
                <Clock className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                <span>Response Time</span>
              </div>
              <p className="leading-relaxed">
                We typically respond to technical inquiries, bug reports, and user feedback within 24 to 48 business hours.
              </p>
            </div>

            <div className="rounded-2xl border border-brand-200/80 bg-brand-50/50 p-5 text-xs text-brand-900 transition-colors duration-200 dark:border-brand-900/50 dark:bg-brand-950/30 dark:text-brand-200 space-y-2">
              <div className="flex items-center gap-1.5 font-bold">
                <HelpCircle className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                <span>Quick Resolution Tip</span>
              </div>
              <p className="text-[11px] leading-relaxed text-brand-800 dark:text-brand-300">
                If reporting a compression or conversion issue, please mention the file format (JPG, PNG, WebP, HEIC) and your device/browser type.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/70">
              {submitted ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-6 text-center dark:border-emerald-900/60 dark:bg-emerald-950/40">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="mt-3 text-lg font-bold text-emerald-900 dark:text-emerald-200">
                    Inquiry Submitted Successfully!
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-emerald-800 dark:text-emerald-300 sm:text-sm">
                    {submissionNotice ||
                      `Your message has been processed for ${SITE_CONFIG.contactEmail}.`}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={launchMailto}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-white px-4 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 dark:border-emerald-800 dark:bg-slate-850 dark:text-emerald-300 dark:hover:bg-slate-800"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Open In Email Client
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setName("");
                        setEmail("");
                        setMessage("");
                      }}
                      className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Your Name:
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Johnson"
                      className="w-full rounded-xl border border-slate-200/90 bg-white p-2.5 text-sm text-slate-800 placeholder-slate-400 shadow-sm transition focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-brand-400"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Your Email Address:
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alex@example.com"
                      className="w-full rounded-xl border border-slate-200/90 bg-white p-2.5 text-sm text-slate-800 placeholder-slate-400 shadow-sm transition focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-brand-400"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Inquiry Category:
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl border border-slate-200/90 bg-white p-2.5 text-sm text-slate-800 shadow-sm transition focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:focus:border-brand-400"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Your Message:
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please describe your feedback, issue, or question in detail..."
                      className="w-full rounded-xl border border-slate-200/90 bg-white p-2.5 text-sm text-slate-800 placeholder-slate-400 shadow-sm transition focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-brand-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 py-3 text-sm font-semibold text-white shadow-md shadow-brand-500/20 transition hover:from-brand-500 hover:to-indigo-500 disabled:opacity-60 active:scale-95"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Inquiry to Support Desk</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-slate-400 dark:text-slate-500">
                    Your message will be sent to{" "}
                    <strong className="text-slate-600 dark:text-slate-400">
                      {SITE_CONFIG.contactEmail}
                    </strong>
                    . We respect your privacy.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
