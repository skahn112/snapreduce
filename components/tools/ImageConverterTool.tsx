"use client";

import { useState, useRef } from "react";
import {
  UploadCloud,
  FileDown,
  RefreshCw,
  ArrowRight,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { convertImageFormat, formatBytes, ConversionResult } from "@/lib/image-processing";

interface ImageConverterToolProps {
  targetMimeType?: string; // e.g. "image/png", "image/jpeg", "image/webp"
  headline?: string;
  sourceFormatHint?: string;
}

export function ImageConverterTool({
  targetMimeType = "image/jpeg",
  headline,
  sourceFormatHint,
}: ImageConverterToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>(targetMimeType);
  const [quality, setQuality] = useState<number>(92);
  const [bgColor, setBgColor] = useState<string>("#FFFFFF");

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setErrorMsg(null);
    setResult(null);
    setFile(f);

    const isHeic =
      f.type === "image/heic" ||
      f.name.toLowerCase().endsWith(".heic") ||
      f.name.toLowerCase().endsWith(".heif");

    if (!isHeic) {
      setOriginalUrl(URL.createObjectURL(f));
    } else {
      setOriginalUrl(null);
    }

    runConversion(f, outputFormat, quality, bgColor);
  };

  const runConversion = async (
    targetFile: File,
    format: string,
    qual: number,
    bg: string
  ) => {
    setIsProcessing(true);
    setErrorMsg(null);

    try {
      const res = await convertImageFormat(targetFile, format, {
        quality: qual,
        backgroundColor: bg,
      });
      setResult(res);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        err.message ||
          "Failed to convert image. Please ensure the file is not corrupted."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFormatChange = (fmt: string) => {
    setOutputFormat(fmt);
    if (file) runConversion(file, fmt, quality, bgColor);
  };

  const reset = () => {
    setFile(null);
    setOriginalUrl(null);
    setResult(null);
    setErrorMsg(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getFormatExtension = (mime: string) => {
    switch (mime) {
      case "image/png":
        return "png";
      case "image/webp":
        return "webp";
      default:
        return "jpg";
    }
  };

  const getDownloadFilename = () => {
    if (!file) return `converted-image.${getFormatExtension(outputFormat)}`;
    const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
    return `snapreduce-${nameWithoutExt}.${getFormatExtension(outputFormat)}`;
  };

  const isConvertingPngToJpg =
    file?.type === "image/png" && outputFormat === "image/jpeg";

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:p-8">
      {/* Privacy Guarantee */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Private Client-Side Conversion • No Server Uploads</span>
        </div>
        <span className="text-xs text-slate-400">
          In-browser canvas & WebAssembly decoding
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
            accept="image/*,.heic,.heif"
            className="hidden"
          />
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-slate-200 transition-transform group-hover:scale-110">
            <Layers className="h-8 w-8 text-brand-600" />
          </div>
          <p className="mt-4 text-base font-semibold text-slate-800 sm:text-lg">
            Choose an image to convert, or{" "}
            <span className="text-brand-600 underline decoration-brand-300 underline-offset-4">
              browse files
            </span>
          </p>
          <p className="mt-1.5 text-xs text-slate-500 sm:text-sm">
            {sourceFormatHint
              ? `Select a ${sourceFormatHint} file to convert`
              : "Supports JPG, PNG, WebP, and Apple iPhone HEIC"}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Source Image:
                </span>
                <p className="text-sm font-bold text-slate-800">
                  {file.name}{" "}
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
                Change File
              </button>
            </div>

            {/* Target Format Switcher */}
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-700">
                  Target Format:
                </span>
                <div className="inline-flex rounded-lg bg-slate-200/80 p-1 text-xs font-semibold text-slate-700">
                  <button
                    type="button"
                    onClick={() => handleFormatChange("image/jpeg")}
                    className={`rounded-md px-3 py-1 transition ${
                      outputFormat === "image/jpeg"
                        ? "bg-white text-brand-600 shadow-sm"
                        : "hover:text-slate-900"
                    }`}
                  >
                    JPG / JPEG
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormatChange("image/png")}
                    className={`rounded-md px-3 py-1 transition ${
                      outputFormat === "image/png"
                        ? "bg-white text-brand-600 shadow-sm"
                        : "hover:text-slate-900"
                    }`}
                  >
                    PNG
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormatChange("image/webp")}
                    className={`rounded-md px-3 py-1 transition ${
                      outputFormat === "image/webp"
                        ? "bg-white text-brand-600 shadow-sm"
                        : "hover:text-slate-900"
                    }`}
                  >
                    WebP
                  </button>
                </div>
              </div>

              {outputFormat !== "image/png" && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-700">Quality:</span>
                  <input
                    type="range"
                    min={40}
                    max={100}
                    value={quality}
                    onChange={(e) => {
                      const q = parseInt(e.target.value, 10);
                      setQuality(q);
                      runConversion(file, outputFormat, q, bgColor);
                    }}
                    className="w-28 accent-brand-600"
                  />
                  <span className="text-xs font-bold text-slate-700">{quality}%</span>
                </div>
              )}
            </div>

            {/* Transparency Note when converting PNG to JPG */}
            {isConvertingPngToJpg && (
              <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-2.5 text-xs text-amber-800">
                <span className="font-semibold">Transparency Note:</span> JPEG does not
                support transparency. Any transparent background areas in your PNG have
                been filled with a clean solid white background.
              </div>
            )}
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-800">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Converted Result */}
          {result && !isProcessing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                  <span className="text-[11px] font-medium text-slate-500">
                    Original Size
                  </span>
                  <p className="text-base font-bold text-slate-800">
                    {formatBytes(result.originalSize)}
                  </p>
                </div>
                <div className="rounded-xl border border-brand-200 bg-brand-50 p-3 text-center">
                  <span className="text-[11px] font-medium text-brand-700">
                    Converted Size
                  </span>
                  <p className="text-base font-bold text-brand-700">
                    {formatBytes(result.outputSize)}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                  <span className="text-[11px] font-medium text-slate-500">
                    Dimensions
                  </span>
                  <p className="text-base font-bold text-slate-800">
                    {result.width} × {result.height} px
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center">
                  <span className="text-[11px] font-medium text-emerald-700">
                    Format
                  </span>
                  <p className="text-base font-bold text-emerald-700 uppercase">
                    {getFormatExtension(outputFormat)}
                  </p>
                </div>
              </div>

              {/* Preview */}
              <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-900/5 p-4">
                <img
                  src={result.url}
                  alt="Converted Output Preview"
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
                  Download Converted Image ({getFormatExtension(outputFormat).toUpperCase()})
                </a>
                <button
                  type="button"
                  onClick={reset}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:w-auto"
                >
                  <RefreshCw className="h-4 w-4" />
                  Convert Another Image
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
