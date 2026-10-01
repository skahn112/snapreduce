"use client";

import { useState } from "react";
import { UploadCloud, CheckCircle2, Sliders, Layers } from "lucide-react";
import { getAspectRatioString } from "@/lib/image-processing";

export function DimensionsCalculatorTool() {
  const [width, setWidth] = useState<number>(3840);
  const [height, setHeight] = useState<number>(2160);

  const totalPixels = width * height;
  const megapixels = (totalPixels / 1000000).toFixed(2);
  const ratio = getAspectRatioString(width, height);

  // Print sizes at different DPIs
  const print72 = {
    w: (width / 72).toFixed(1),
    h: (height / 72).toFixed(1),
  };
  const print150 = {
    w: (width / 150).toFixed(1),
    h: (height / 150).toFixed(1),
  };
  const print300 = {
    w: (width / 300).toFixed(1),
    h: (height / 300).toFixed(1),
  };

  const handleFileUpload = (f: File) => {
    const url = URL.createObjectURL(f);
    const img = new Image();
    img.onload = () => {
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:p-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-800">
          Digital Pixel & Print Dimensions Calculator
        </h3>
        <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100">
          <UploadCloud className="h-3.5 w-3.5 text-brand-600" />
          Auto-Detect from Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            className="hidden"
          />
        </label>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">
            Width (Pixels):
          </label>
          <input
            type="number"
            min={1}
            value={width}
            onChange={(e) => setWidth(parseInt(e.target.value, 10) || 1)}
            className="w-full rounded-lg border border-slate-200 p-2.5 text-sm font-semibold text-slate-800 focus:border-brand-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">
            Height (Pixels):
          </label>
          <input
            type="number"
            min={1}
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value, 10) || 1)}
            className="w-full rounded-lg border border-slate-200 p-2.5 text-sm font-semibold text-slate-800 focus:border-brand-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
          <span className="text-xs text-slate-500">Megapixels</span>
          <p className="mt-1 text-2xl font-bold text-brand-600">{megapixels} MP</p>
          <span className="text-[10px] text-slate-400">Camera sensor class</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
          <span className="text-xs text-slate-500">Total Pixels</span>
          <p className="mt-1 text-lg font-bold text-slate-800">
            {totalPixels.toLocaleString()}
          </p>
          <span className="text-[10px] text-slate-400">Raw pixel cells</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
          <span className="text-xs text-slate-500">Aspect Ratio</span>
          <p className="mt-1 text-2xl font-bold text-emerald-600">{ratio}</p>
          <span className="text-[10px] text-slate-400">Proportional shape</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
          <span className="text-xs text-slate-500">Video Standard</span>
          <p className="mt-1 text-base font-bold text-slate-800">
            {width >= 3840 ? "4K UHD" : width >= 1920 ? "1080p FHD" : "Standard"}
          </p>
          <span className="text-[10px] text-slate-400">Display grade</span>
        </div>
      </div>

      {/* Physical Print Dimensions Table */}
      <div className="mt-6 rounded-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-700">
          Physical Print Capacity at Standard Resolutions
        </div>
        <div className="divide-y divide-slate-100 bg-white text-xs">
          <div className="flex items-center justify-between p-3">
            <div>
              <p className="font-semibold text-slate-800">300 DPI (Magazine / Photo Print)</p>
              <p className="text-slate-400">Commercial photographic sharpness</p>
            </div>
            <div className="text-right font-bold text-slate-900">
              {print300.w} × {print300.h} inches{" "}
              <span className="font-normal text-slate-500">
                ({(parseFloat(print300.w) * 2.54).toFixed(1)} ×{" "}
                {(parseFloat(print300.h) * 2.54).toFixed(1)} cm)
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3">
            <div>
              <p className="font-semibold text-slate-800">150 DPI (Flyer / Desktop Print)</p>
              <p className="text-slate-400">Acceptable casual viewing distance</p>
            </div>
            <div className="text-right font-bold text-slate-900">
              {print150.w} × {print150.h} inches{" "}
              <span className="font-normal text-slate-500">
                ({(parseFloat(print150.w) * 2.54).toFixed(1)} ×{" "}
                {(parseFloat(print150.h) * 2.54).toFixed(1)} cm)
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3">
            <div>
              <p className="font-semibold text-slate-800">72 DPI (Standard Web Display)</p>
              <p className="text-slate-400">Legacy screen pixel density</p>
            </div>
            <div className="text-right font-bold text-slate-900">
              {print72.w} × {print72.h} inches{" "}
              <span className="font-normal text-slate-500">
                ({(parseFloat(print72.w) * 2.54).toFixed(1)} ×{" "}
                {(parseFloat(print72.h) * 2.54).toFixed(1)} cm)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
