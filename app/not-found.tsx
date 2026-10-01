import Link from "next/link";
import { Zap, Home, Layers, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-slate-50/50 px-4 py-16">
      <div className="mx-auto max-w-lg text-center">
        <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700">
          Error 404
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          The image tool or page you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/tools/"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Layers className="h-4 w-4 text-slate-500" />
            Browse All Tools
          </Link>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-xs text-slate-500">
          <span>Popular Tools: </span>
          <Link href="/compress-jpg-to-100kb/" className="text-brand-600 font-semibold hover:underline">
            Compress JPG to 100KB
          </Link>
          {" • "}
          <Link href="/tools/image-resizer/" className="text-brand-600 font-semibold hover:underline">
            Image Resizer
          </Link>
          {" • "}
          <Link href="/tools/webp-to-jpg/" className="text-brand-600 font-semibold hover:underline">
            WebP to JPG
          </Link>
        </div>
      </div>
    </main>
  );
}
