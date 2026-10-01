"use client";

import { useState } from "react";
import { Printer, Sparkles, CheckCircle2 } from "lucide-react";

export function DpiCalculatorTool() {
  const [mode, setMode] = useState<"print-to-pixels" | "pixels-to-dpi">("print-to-pixels");

  // Print to Pixels
  const [printW, setPrintW] = useState<number>(4);
  const [printH, setPrintH] = useState<number>(6);
  const [unit, setUnit] = useState<"inches" | "cm">("inches");
  const [targetDpi, setTargetDpi] = useState<number>(300);

  // Pixels to DPI
  const [pixelW, setPixelW] = useState<number>(1920);
  const [pixelH, setPixelH] = useState<number>(1080);
  const [desiredPrintW, setDesiredPrintW] = useState<number>(6.4);

  const calculatedPixelsW =
    unit === "inches"
      ? Math.round(printW * targetDpi)
      : Math.round((printW / 2.54) * targetDpi);

  const calculatedPixelsH =
    unit === "inches"
      ? Math.round(printH * targetDpi)
      : Math.round((printH / 2.54) * targetDpi);

  const calculatedDpi =
    desiredPrintW > 0
      ? unit === "inches"
        ? Math.round(pixelW / desiredPrintW)
        : Math.round(pixelW / (desiredPrintW / 2.54))
      : 0;

  return (
    <div className="w-full rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xl sm:p-8 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-2xl dark:shadow-black/50">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950/70 dark:text-brand-400">
            <Printer className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
            Image DPI &amp; PPI Print Calculator
          </span>
        </div>

        <div className="inline-flex rounded-lg bg-slate-100 p-1 text-xs font-semibold text-slate-700 dark:bg-slate-950/80 dark:text-slate-300">
          <button
            type="button"
            onClick={() => setMode("print-to-pixels")}
            className={`rounded-md px-3 py-1 transition ${
              mode === "print-to-pixels"
                ? "bg-white text-brand-600 shadow-sm dark:bg-slate-800 dark:text-brand-400"
                : "hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Print Size &rarr; Pixels Needed
          </button>
          <button
            type="button"
            onClick={() => setMode("pixels-to-dpi")}
            className={`rounded-md px-3 py-1 transition ${
              mode === "pixels-to-dpi"
                ? "bg-white text-brand-600 shadow-sm dark:bg-slate-800 dark:text-brand-400"
                : "hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Pixels &rarr; Resulting DPI
          </button>
        </div>
      </div>

      {mode === "print-to-pixels" ? (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Unit:</span>
            <div className="inline-flex gap-2">
              <button
                type="button"
                onClick={() => setUnit("inches")}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium border transition ${
                  unit === "inches"
                    ? "border-brand-500 bg-brand-50 text-brand-700 font-semibold dark:border-brand-800 dark:bg-brand-950/60 dark:text-brand-300"
                    : "border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                Inches (in)
              </button>
              <button
                type="button"
                onClick={() => setUnit("cm")}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium border transition ${
                  unit === "cm"
                    ? "border-brand-500 bg-brand-50 text-brand-700 font-semibold dark:border-brand-800 dark:bg-brand-950/60 dark:text-brand-300"
                    : "border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Print Width ({unit}):
              </label>
              <input
                type="number"
                step="any"
                min={0.1}
                value={printW}
                onChange={(e) => setPrintW(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm font-semibold text-slate-800 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-brand-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Print Height ({unit}):
              </label>
              <input
                type="number"
                step="any"
                min={0.1}
                value={printH}
                onChange={(e) => setPrintH(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm font-semibold text-slate-800 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-brand-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Target DPI:
              </label>
              <select
                value={targetDpi}
                onChange={(e) => setTargetDpi(parseInt(e.target.value, 10))}
                className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm font-semibold text-slate-800 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-brand-400"
              >
                <option value={300}>300 DPI (Magazine / Professional Photo)</option>
                <option value={200}>200 DPI (Good Quality Print)</option>
                <option value={150}>150 DPI (Newspaper / Flyer)</option>
                <option value={72}>72 DPI (Standard Web Display)</option>
              </select>
            </div>
          </div>

          {/* Result Card */}
          <div className="rounded-xl border border-brand-200 bg-brand-50/70 p-6 text-center transition-colors dark:border-brand-900/60 dark:bg-brand-950/40">
            <span className="text-xs font-semibold text-brand-800 uppercase tracking-wider dark:text-brand-300">
              Required Pixel Resolution
            </span>
            <p className="mt-2 text-3xl font-extrabold text-brand-700 dark:text-brand-300">
              {calculatedPixelsW} × {calculatedPixelsH} px
            </p>
            <p className="mt-1 text-xs text-brand-600 dark:text-brand-400">
              Total: {((calculatedPixelsW * calculatedPixelsH) / 1000000).toFixed(2)}{" "}
              Megapixels needed
            </p>
          </div>
        </div>
      ) : (
        /* Pixels to DPI mode */
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Image Width (Pixels):
              </label>
              <input
                type="number"
                min={1}
                value={pixelW}
                onChange={(e) => setPixelW(parseInt(e.target.value, 10) || 1)}
                className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm font-semibold text-slate-800 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-brand-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Image Height (Pixels):
              </label>
              <input
                type="number"
                min={1}
                value={pixelH}
                onChange={(e) => setPixelH(parseInt(e.target.value, 10) || 1)}
                className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm font-semibold text-slate-800 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-brand-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Desired Physical Print Width ({unit}):
              </label>
              <input
                type="number"
                step="any"
                min={0.1}
                value={desiredPrintW}
                onChange={(e) => setDesiredPrintW(parseFloat(e.target.value) || 0.1)}
                className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm font-semibold text-slate-800 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-brand-400"
              />
            </div>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-6 text-center transition-colors dark:border-emerald-900/60 dark:bg-emerald-950/40">
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider dark:text-emerald-300">
              Calculated Print Quality
            </span>
            <p className="mt-2 text-3xl font-extrabold text-emerald-700 dark:text-emerald-300">
              {calculatedDpi} DPI
            </p>
            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
              {calculatedDpi >= 300
                ? "Excellent (Razor sharp photo grade)"
                : calculatedDpi >= 150
                ? "Good (Suitable for desktop printing & viewing from arm length)"
                : "Low (May appear soft or pixelated if viewed up close)"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
