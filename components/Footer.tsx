import Link from "next/link";
import { Zap, Shield, Heart, Lock, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300 transition-colors duration-200 dark:border-slate-800 dark:bg-[#060a12]">
      {/* Privacy Callout Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-6 dark:border-slate-850 dark:bg-[#0a0f1d]/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Zero Cloud Uploads • 100% Client-Side
              </p>
              <p className="text-xs text-slate-400">
                All image processing runs in your browser via HTML5 Canvas. Your files never touch our servers.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Private & Secure
            </span>
            <span className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-brand-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              No Registration
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand info */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Zap className="h-5 w-5 fill-current" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Snap<span className="text-brand-400">Reduce</span>
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              Free, private, browser-based image compression, resizing, and conversion tools. Optimize JPG, PNG, and WebP images to exact sizes without losing visual fidelity.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <Shield className="h-4 w-4 text-emerald-400" />
              <span>Compliant with privacy & data sovereignty standards.</span>
            </div>
          </div>

          {/* Core Tools */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-100">
              Image Tools
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SITE_CONFIG.footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 transition hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Exact-Size Tools */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-100">
              Exact Sizes
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SITE_CONFIG.footerLinks.exactSizes.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 transition hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog & Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-100">
              Resources & Legal
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SITE_CONFIG.footerLinks.learn.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 transition hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Legal
                </span>
              </li>
              {SITE_CONFIG.footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 transition hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved. Built for speed, privacy, and precision.
          </p>
          <div className="mt-4 flex items-center space-x-6 sm:mt-0">
            <Link
              href="/privacy-policy/"
              className="text-xs text-slate-400 transition hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms/"
              className="text-xs text-slate-400 transition hover:text-white"
            >
              Terms of Service
            </Link>
            <Link
              href="/disclaimer/"
              className="text-xs text-slate-400 transition hover:text-white"
            >
              Disclaimer
            </Link>
            <Link
              href="/contact/"
              className="text-xs text-slate-400 transition hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
