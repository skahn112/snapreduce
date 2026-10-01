"use client";

import { useState, useRef, ChangeEvent, DragEvent, useEffect } from "react";
import {
  UploadCloud,
  FileDown,
  RefreshCw,
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Maximize2,
} from "lucide-react";
import { resizeImage, formatBytes, ResizeResult } from "@/lib/image-processing";

export function ImageResizerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [origW, setOrigW] = useState<number>(0);
  const [origH, setOrigH] = useState<number>(0);

  // Dimension settings
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [lockAspect, setLockAspect] = useState<boolean>(true);
  const [selectedFormat, setSelectedFormat] = useState<string>("image/jpeg");
  const [quality, setQuality] = useState<number>(90);

  // Processing state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<ResizeResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setErrorMsg(null);
    setResult(null);

    if (!f.type.startsWith("image/")) {
      setErrorMsg("Please upload a valid image file (JPG, PNG, WebP).");
      return;
    }

    setFile(f);
    const url = URL.createObjectURL(f);
    setOriginalUrl(url);

    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      setOrigW(w);
      setOrigH(h);
      setWidth(w);
      setHeight(h);
      setSelectedFormat(f.type || "image/jpeg");
      runResize(f, w, h, f.type || "image/jpeg", 90);
    };
    img.onerror = () => {
      setErrorMsg("Failed to read image dimensions.");
    };
    img.src = url;
  };

  const runResize = async (
    targetFile: File,
    w: number,
    h: number,
    fmt: string,
    q: number
  ) => {
    if (w <= 0 || h <= 0) return;
    setIsProcessing(true);
    setErrorMsg(null);

    try {
      const res = await resizeImage(targetFile, w, h, {
        format: fmt,
        quality: q,
      });
      setResult(res);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to resize image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWidthChange = (newW: number) => {
    setWidth(newW);
    let newH = height;
    if (lockAspect && origW > 0) {
      newH = Math.round((newW * origH) / origW);
      setHeight(newH);
    }
    if (file && newW > 10 && newH > 10) {
      runResize(file, newW, newH, selectedFormat, quality);
    }
  };

  const handleHeightChange = (newH: number) => {
    setHeight(newH);
    let newW = width;
    if (lockAspect && origH > 0) {
      newW = Math.round((newH * origW) / origH);
      setWidth(newW);
    }
    if (file && newW > 10 && newH > 10) {
      runResize(file, newW, newH, selectedFormat, quality);
    }
  };

  const applyScalePercent = (percent: number) => {
    if (origW > 0 && origH > 0 && file) {
      const newW = Math.round((origW * percent) / 100);
      const newH = Math.round((origH * percent) / 100);
      setWidth(newW);
      setHeight(newH);
      runResize(file, newW, newH, selectedFormat, quality);
    }
  };

  const handleFormatChange = (fmt: string) => {
    setSelectedFormat(fmt);
    if (file && width > 0 && height > 0) {
      runResize(file, width, height, fmt, quality);
    }
  };

  const reset = () => {
    setFile(null);
    setOriginalUrl(null);
    setResult(null);
    setOrigW(0);
    setOrigH(0);
    setWidth(0);
    setHeight(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getDownloadFilename = () => {
    if (!file) return "resized-image.jpg";
    const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
    const ext =
      selectedFormat === "image/png"
        ? "png"
        : selectedFormat === "image/webp"
        ? "webp"
        : "jpg";
    return `snapreduce-${nameWithoutExt}-${width}x${height}.${ext}`;
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:p-8">
      {/* Privacy Guarantee Banner */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Pure Browser Resizing • Zero Uploads</span>
        </div>
        <span className="text-xs text-slate-400">
          High-performance canvas interpolation in local memory
        </span>
      </div>

      {!file ? (
        <div
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => fileInputRef.current?.click()}
          className={`group flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-all ${
            isDragging
              ? "border-brand-500 bg-brand-50/70"
              : "border-slate-300 bg-slate-50/60 hover:border-brand-400 hover:bg-slate-50"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            accept="image/*"
            className="hidden"
          />
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-slate-200 transition-transform group-hover:scale-110">
            <Maximize2 className="h-8 w-8 text-brand-600" />
          </div>
          <p className="mt-4 text-base font-semibold text-slate-800 sm:text-lg">
            Choose an image to resize, or{" "}
            <span className="text-brand-600 underline decoration-brand-300 underline-offset-4">
              browse files
            </span>
          </p>
          <p className="mt-1.5 text-xs text-slate-500 sm:text-sm">
            Adjust pixel width, height, aspect ratios, or scale by percentage
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Dimension Controls */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Original Dimensions:
                </span>
                <p className="text-sm font-bold text-slate-800">
                  {origW} × {origH} px{" "}
                  <span className="text-xs font-normal text-slate-500">
                    ({formatBytes(file.size)})
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-red-600"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Change Image
              </button>
            </div>

            {/* Inputs grid */}
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* Width */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Width (Pixels):
                </label>
                <input
                  type="number"
                  min={1}
                  max={20000}
                  value={width}
                  onChange={(e) => handleWidthChange(parseInt(e.target.value, 10) || 1)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 focus:border-brand-500 focus:outline-none"
                />
              </div>

              {/* Aspect Ratio Lock Toggle */}
              <div className="flex flex-col items-center justify-center pt-2 sm:pt-4">
                <button
                  type="button"
                  onClick={() => setLockAspect(!lockAspect)}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                    lockAspect
                      ? "border-brand-300 bg-brand-50 text-brand-700"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {lockAspect ? (
                    <>
                      <Lock className="h-3.5 w-3.5" />
                      Aspect Ratio Locked
                    </>
                  ) : (
                    <>
                      <Unlock className="h-3.5 w-3.5" />
                      Unlocked (Free)
                    </>
                  )}
                </button>
              </div>

              {/* Height */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Height (Pixels):
                </label>
                <input
                  type="number"
                  min={1}
                  max={20000}
                  value={height}
                  onChange={(e) => handleHeightChange(parseInt(e.target.value, 10) || 1)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Quick Percentage Presets */}
            <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-slate-200">
              <span className="text-xs font-semibold text-slate-600">Quick Scale:</span>
              {[25, 50, 75, 100].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => applyScalePercent(pct)}
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-brand-400 hover:text-brand-600"
                >
                  {pct}%
                </button>
              ))}

              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">Format:</span>
                <select
                  value={selectedFormat}
                  onChange={(e) => handleFormatChange(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-800 focus:outline-none"
                >
                  <option value="image/jpeg">JPG / JPEG</option>
                  <option value="image/png">PNG</option>
                  <option value="image/webp">WebP</option>
                </select>
              </div>
            </div>
          </div>

          {/* Error notice */}
          {errorMsg && (
            <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-800">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Results Comparison */}
          {result && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                  <span className="text-[11px] font-medium text-slate-500">
                    Original Size
                  </span>
                  <p className="text-base font-bold text-slate-800">
                    {formatBytes(result.originalSize)}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {origW} × {origH} px
                  </p>
                </div>
                <div className="rounded-xl border border-brand-200 bg-brand-50 p-3 text-center">
                  <span className="text-[11px] font-medium text-brand-700">
                    Resized Size
                  </span>
                  <p className="text-base font-bold text-brand-700">
                    {formatBytes(result.outputSize)}
                  </p>
                  <p className="text-[10px] text-brand-600">
                    {result.outputWidth} × {result.outputHeight} px
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center">
                  <span className="text-[11px] font-medium text-emerald-700">
                    Resolution Change
                  </span>
                  <p className="text-base font-bold text-emerald-700">
                    {Math.round(((result.outputWidth * result.outputHeight) / (origW * origH)) * 100)}%
                  </p>
                  <p className="text-[10px] text-emerald-600">of original pixels</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                  <span className="text-[11px] font-medium text-slate-500">Format</span>
                  <p className="text-base font-bold text-slate-800">
                    {result.format.replace("image/", "").toUpperCase()}
                  </p>
                  <p className="text-[10px] text-slate-400">High Quality Render</p>
                </div>
              </div>

              {/* Resized Image Preview */}
              <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-900/5 p-4">
                <img
                  src={result.url}
                  alt="Resized Output"
                  className="max-h-[380px] w-auto rounded object-contain shadow-sm"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
                <a
                  href={result.url}
                  download={getDownloadFilename()}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-700 active:scale-[0.99] sm:w-auto"
                >
                  <FileDown className="h-5 w-5" />
                  Download Resized Image ({width} × {height} px)
                </a>
                <button
                  type="button"
                  onClick={reset}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:w-auto"
                >
                  <RefreshCw className="h-4 w-4" />
                  Resize Another Image
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
