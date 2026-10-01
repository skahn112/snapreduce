"use client";

import { useState } from "react";
import { Printer, ArrowRightLeft, Sparkles } from "lucide-react";

export function DpiCalculatorTool() {
  const [mode, setMode] = useState<"print-to-pixels" | "pixels-to-dpi">(
    "print-to-pixels"
  );
  const [unit, setUnit] = useState<"inches" | "cm">("inches");

  // State for print-to-pixels
  const [printW, setPrintW] = useState<number>(8);
  const [printH, setPrintH] = useState<number>(10);
  const [targetDpi, setTargetDpi] = useState<number>(300);

  // State for pixels-to-dpi
  const [pixelW, setPixelW] = useState<number>(2400);
  const [pixelH, setPixelH] = useState<number>(3000);
  const [desiredPrintW, setDesiredPrintW] = useState<number>(8);

  // Calculations
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
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:p-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Printer className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold text-slate-800">
            Image DPI & PPI Print Calculator
          </span>
        </div>

        <div className="inline-flex rounded-lg bg-slate-100 p-1 text-xs font-semibold text-slate-700">
          <button
            type="button"
            onClick={() => setMode("print-to-pixels")}
            className={`rounded-md px-3 py-1 transition ${
              mode === "print-to-pixels"
                ? "bg-white text-brand-600 shadow-sm"
                : "hover:text-slate-900"
            }`}
          >
            Print Size → Pixels Needed
          </button>
          <button
            type="button"
            onClick={() => setMode("pixels-to-dpi")}
            className={`rounded-md px-3 py-1 transition ${
              mode === "pixels-to-dpi"
                ? "bg-white text-brand-600 shadow-sm"
                : "hover:text-slate-900"
            }`}
          >
            Pixels → Resulting DPI
          </button>
        </div>
      </div>

      {mode === "print-to-pixels" ? (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-slate-700">Unit:</span>
            <div className="inline-flex gap-2">
              <button
                type="button"
                onClick={() => setUnit("inches")}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium border ${
                  unit === "inches"
                    ? "border-brand-500 bg-brand-50 text-brand-700 font-semibold"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                Inches (in)
              </button>
              <button
                type="button"
                onClick={() => setUnit("cm")}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium border ${
                  unit === "cm"
                    ? "border-brand-500 bg-brand-50 text-brand-700 font-semibold"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Print Width ({unit}):
              </label>
              <input
                type="number"
                step="any"
                min={0.1}
                value={printW}
                onChange={(e) => setPrintW(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-200 p-2.5 text-sm font-semibold text-slate-800 focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Print Height ({unit}):
              </label>
              <input
                type="number"
                step="any"
                min={0.1}
                value={printH}
                onChange={(e) => setPrintH(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-200 p-2.5 text-sm font-semibold text-slate-800 focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Target DPI:
              </label>
              <select
                value={targetDpi}
                onChange={(e) => setTargetDpi(parseInt(e.target.value, 10))}
                className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm font-semibold text-slate-800 focus:border-brand-500 focus:outline-none"
              >
                <option value={300}>300 DPI (Magazine / Professional Photo)</option>
                <option value={200}>200 DPI (Good Quality Print)</option>
                <option value={150}>150 DPI (Newspaper / Flyer)</option>
                <option value={72}>72 DPI (Standard Web Display)</option>
              </select>
            </div>
          </div>

          {/* Result Card */}
          <div className="rounded-xl border border-brand-200 bg-brand-50/70 p-6 text-center">
            <span className="text-xs font-semibold text-brand-800 uppercase tracking-wider">
              Required Pixel Resolution
            </span>
            <p className="mt-2 text-3xl font-extrabold text-brand-700">
              {calculatedPixelsW} × {calculatedPixelsH} px
            </p>
            <p className="mt-1 text-xs text-brand-600">
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
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Image Width (Pixels):
              </label>
              <input
                type="number"
                min={1}
                value={pixelW}
                onChange={(e) => setPixelW(parseInt(e.target.value, 10) || 1)}
                className="w-full rounded-lg border border-slate-200 p-2.5 text-sm font-semibold text-slate-800 focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Image Height (Pixels):
              </label>
              <input
                type="number"
                min={1}
                value={pixelH}
                onChange={(e) => setPixelH(parseInt(e.target.value, 10) || 1)}
                className="w-full rounded-lg border border-slate-200 p-2.5 text-sm font-semibold text-slate-800 focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Desired Physical Print Width ({unit}):
              </label>
              <input
                type="number"
                step="any"
                min={0.1}
                value={desiredPrintW}
                onChange={(e) => setDesiredPrintW(parseFloat(e.target.value) || 0.1)}
                className="w-full rounded-lg border border-slate-200 p-2.5 text-sm font-semibold text-slate-800 focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-6 text-center">
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              Calculated Print Quality
            </span>
            <p className="mt-2 text-3xl font-extrabold text-emerald-700">
              {calculatedDpi} DPI
            </p>
            <p className="mt-1 text-xs text-emerald-600">
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
