"use client";

import { useState, FormEvent } from "react";
import { Mail, Send, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE_CONFIG } from "@/data/site-config";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("General feedback");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    "General feedback",
    "Tool issue",
    "Bug report",
    "Content suggestion",
    "Business inquiry",
    "Other",
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Build mailto link so user's client email is prefilled accurately
    const subject = encodeURIComponent(`[SnapReduce Inquiry - ${category}] from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCategory: ${category}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${SITE_CONFIG.contactEmail}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20">
      <div className="border-b border-slate-200/80 bg-white py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Contact", href: "/contact/" }]} />
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Contact Support &amp; Feedback
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Have a bug to report, a tool suggestion, or feedback on our image utilities? Get in touch with our team.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Direct Info */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 mb-3">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="text-base font-bold text-slate-900">Direct Email</h2>
              <p className="mt-1 text-xs text-slate-500">
                You can email our support desk directly at:
              </p>
              <a
                href={`mailto:${SITE_CONFIG.contactEmail}`}
                className="mt-2 inline-block font-mono text-sm font-semibold text-brand-600 hover:underline"
              >
                {SITE_CONFIG.contactEmail}
              </a>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-xs text-slate-500 space-y-2">
              <h3 className="font-bold text-slate-800 text-sm">Response Time</h3>
              <p>
                We typically respond to technical issue inquiries and tool bug reports within 24 to 48 business hours.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              {submitted ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
                  <h3 className="mt-3 text-base font-bold text-emerald-900">
                    Email Client Launched
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-emerald-800 sm:text-sm">
                    Your message draft has been transferred to your email application addressed to{" "}
                    <strong>{SITE_CONFIG.contactEmail}</strong>. If your email client did not open automatically, please send your inquiry directly to our address.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Your Name:
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Johnson"
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Your Email Address:
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alex@example.com"
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Inquiry Category:
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-sm text-slate-800 focus:border-brand-500 focus:outline-none"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Your Message:
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please describe your feedback, issue, or question in detail..."
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white shadow-md shadow-brand-500/20 transition hover:bg-brand-700 active:scale-95"
                  >
                    <Send className="h-4 w-4" />
                    Send Inquiry to Support
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
