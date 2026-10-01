"use client";

import { useState } from "react";
import { Calculator, ArrowRight, Sparkles } from "lucide-react";
import { getAspectRatioString, calculateGCD } from "@/lib/image-processing";

export function AspectRatioCalculatorTool() {
  const [origW, setOrigW] = useState<number>(1920);
  const [origH, setOrigH] = useState<number>(1080);

  const [newW, setNewW] = useState<number>(1280);
  const [newH, setNewH] = useState<number>(720);

  const ratioString = getAspectRatioString(origW, origH);

  const handleOrigWChange = (w: number) => {
    setOrigW(w);
    if (w > 0 && origH > 0) {
      setNewH(Math.round((newW * origH) / w));
    }
  };

  const handleOrigHChange = (h: number) => {
    setOrigH(h);
    if (origW > 0 && h > 0) {
      setNewH(Math.round((newW * h) / origW));
    }
  };

  const handleNewWChange = (w: number) => {
    setNewW(w);
    if (origW > 0 && origH > 0) {
      setNewH(Math.round((w * origH) / origW));
    }
  };

  const handleNewHChange = (h: number) => {
    setNewH(h);
    if (origW > 0 && origH > 0) {
      setNewW(Math.round((h * origW) / origH));
    }
  };

  const applyPreset = (w: number, h: number) => {
    setOrigW(w);
    setOrigH(h);
    setNewW(w);
    setNewH(h);
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:p-8">
      <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Calculator className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold text-slate-800">
            Aspect Ratio & Proportional Scaler
          </span>
        </div>
        <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
          Ratio: {ratioString}
        </span>
      </div>

      {/* Preset Buttons */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-600">Standard Presets:</span>
        {[
          { label: "16:9 (Widescreen)", w: 1920, h: 1080 },
          { label: "4:3 (Classic TV)", w: 1600, h: 1200 },
          { label: "1:1 (Square)", w: 1080, h: 1080 },
          { label: "9:16 (Stories/Reels)", w: 1080, h: 1920 },
          { label: "21:9 (Ultrawide)", w: 2560, h: 1080 },
          { label: "3:2 (35mm DSLR)", w: 1800, h: 1200 },
        ].map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => applyPreset(p.w, p.h)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-brand-400 hover:bg-white hover:text-brand-600"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Step 1: Original dimensions */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-700">
            1. Original Base Dimensions (Width × Height)
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">
                Width (px):
              </label>
              <input
                type="number"
                min={1}
                value={origW}
                onChange={(e) => handleOrigWChange(parseInt(e.target.value, 10) || 1)}
                className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm font-semibold text-slate-800 focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">
                Height (px):
              </label>
              <input
                type="number"
                min={1}
                value={origH}
                onChange={(e) => handleOrigHChange(parseInt(e.target.value, 10) || 1)}
                className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm font-semibold text-slate-800 focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-white p-3 border border-slate-200 text-center">
            <span className="text-xs text-slate-500">Simplified Ratio:</span>
            <p className="text-xl font-bold text-brand-600">{ratioString}</p>
            <p className="text-[11px] text-slate-400">
              GCD: {calculateGCD(origW, origH)} • Factor: {(origW / origH).toFixed(3)}:1
            </p>
          </div>
        </div>

        {/* Step 2: Calculate new target */}
        <div className="rounded-xl border border-brand-200 bg-brand-50/50 p-4">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-brand-900">
            2. Scaled Proportional Dimensions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">
                New Width (px):
              </label>
              <input
                type="number"
                min={1}
                value={newW}
                onChange={(e) => handleNewWChange(parseInt(e.target.value, 10) || 1)}
                className="w-full rounded-lg border border-brand-200 bg-white p-2.5 text-sm font-semibold text-slate-800 focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">
                Calculated Height (px):
              </label>
              <input
                type="number"
                min={1}
                value={newH}
                onChange={(e) => handleNewHChange(parseInt(e.target.value, 10) || 1)}
                className="w-full rounded-lg border border-brand-200 bg-white p-2.5 text-sm font-semibold text-slate-800 focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Visual box preview */}
          <div className="mt-4 flex flex-col items-center justify-center rounded-lg border border-brand-200 bg-white p-4">
            <span className="text-[11px] font-medium text-slate-400 mb-2">
              Visual Aspect Preview
            </span>
            <div
              style={{
                aspectRatio: `${origW} / ${origH}`,
                maxHeight: "100px",
                maxWidth: "180px",
              }}
              className="flex h-20 w-36 items-center justify-center rounded border-2 border-dashed border-brand-500 bg-brand-50/70 p-2 text-xs font-bold text-brand-700 shadow-inner"
            >
              {ratioString}
            </div>
            <p className="mt-2 text-xs font-medium text-slate-600">
              {newW} × {newH} pixels
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
