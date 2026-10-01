"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import {
  UploadCloud,
  FileDown,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Layers,
} from "lucide-react";
import {
  convertImageFormat,
  formatBytes,
  getFormatExtension,
  ConversionResult,
} from "@/lib/image-processing";

interface ImageConverterToolProps {
  initialOutputFormat?: string;
  sourceFormatHint?: string; // "WebP", "PNG", "HEIC", etc.
}

export function ImageConverterTool({
  initialOutputFormat = "image/jpeg",
  sourceFormatHint,
}: ImageConverterToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>(initialOutputFormat);
  const [quality, setQuality] = useState<number>(92);
  const [bgColor, setBgColor] = useState<string>("#ffffff");

  // Processing state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setErrorMsg(null);
    setResult(null);

    const isHeic =
      f.name.toLowerCase().endsWith(".heic") ||
      f.name.toLowerCase().endsWith(".heif");

    if (!f.type.startsWith("image/") && !isHeic) {
      setErrorMsg("Please upload a valid image (JPG, PNG, WebP, or HEIC).");
      return;
    }

    setFile(f);
    runConversion(f, outputFormat, quality, bgColor);
  };

  const runConversion = async (
    targetFile: File,
    format: string,
    q: number,
    bg: string
  ) => {
    setIsProcessing(true);
    setErrorMsg(null);

    try {
      const res = await convertImageFormat(targetFile, format, {
        quality: q,
        backgroundColor: bg,
      });
      setResult(res);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        err.message ||
          "Failed to convert image. The format may not be supported by your browser."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFormatChange = (fmt: string) => {
    setOutputFormat(fmt);
    if (file) {
      runConversion(file, fmt, quality, bgColor);
    }
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setErrorMsg(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getDownloadFilename = () => {
    if (!file) return "converted-image.jpg";
    const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
    return `snapreduce-${nameWithoutExt}.${getFormatExtension(outputFormat)}`;
  };

  const isConvertingPngToJpg =
    file?.type === "image/png" && outputFormat === "image/jpeg";

  return (
    <div className="w-full rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xl sm:p-8 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-2xl dark:shadow-black/50">
      {/* Privacy Guarantee */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800/80">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>Private Client-Side Conversion • No Server Uploads</span>
        </div>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          In-browser canvas &amp; WebAssembly decoding
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
              ? "border-brand-500 bg-brand-50/70 dark:bg-brand-950/40"
              : "border-slate-300 bg-slate-50/60 hover:border-brand-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/30 dark:hover:border-brand-400 dark:hover:bg-slate-800/60"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            accept="image/*,.heic,.heif"
            className="hidden"
          />
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-slate-200 transition-transform group-hover:scale-110 dark:bg-slate-800 dark:ring-slate-700">
            <Layers className="h-8 w-8 text-brand-600 dark:text-brand-400" />
          </div>
          <p className="mt-4 text-base font-semibold text-slate-800 dark:text-slate-100 sm:text-lg">
            Choose an image to convert, or{" "}
            <span className="text-brand-600 underline decoration-brand-300 underline-offset-4 dark:text-brand-400 dark:decoration-brand-700">
              browse files
            </span>
          </p>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            {sourceFormatHint
              ? `Select a ${sourceFormatHint} file to convert`
              : "Supports JPG, PNG, WebP, and Apple iPhone HEIC"}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-4 transition-colors dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-3 dark:border-slate-700/80">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Source Image:
                </span>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {file.name}{" "}
                  <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                    ({formatBytes(file.size)})
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-red-600 transition dark:text-slate-400 dark:hover:text-red-400"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Change File
              </button>
            </div>

            {/* Target Format Switcher */}
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Target Format:
                </span>
                <div className="inline-flex rounded-lg bg-slate-200/80 p-1 text-xs font-semibold text-slate-700 dark:bg-slate-950/80 dark:text-slate-300">
                  <button
                    type="button"
                    onClick={() => handleFormatChange("image/jpeg")}
                    className={`rounded-md px-3 py-1 transition ${
                      outputFormat === "image/jpeg"
                        ? "bg-white text-brand-600 shadow-sm dark:bg-slate-800 dark:text-brand-400"
                        : "hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    JPG / JPEG
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormatChange("image/png")}
                    className={`rounded-md px-3 py-1 transition ${
                      outputFormat === "image/png"
                        ? "bg-white text-brand-600 shadow-sm dark:bg-slate-800 dark:text-brand-400"
                        : "hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    PNG
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormatChange("image/webp")}
                    className={`rounded-md px-3 py-1 transition ${
                      outputFormat === "image/webp"
                        ? "bg-white text-brand-600 shadow-sm dark:bg-slate-800 dark:text-brand-400"
                        : "hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    WebP
                  </button>
                </div>
              </div>

              {outputFormat !== "image/png" && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Quality:</span>
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
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{quality}%</span>
                </div>
              )}
            </div>

            {/* Transparency Note when converting PNG to JPG */}
            {isConvertingPngToJpg && (
              <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-2.5 text-xs text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300">
                <span className="font-semibold">Transparency Note:</span> JPEG does not
                support transparency. Any transparent background areas in your PNG have
                been filled with a clean solid white background.
              </div>
            )}
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Converted Result */}
          {result && !isProcessing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-800/50">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Original Size
                  </span>
                  <p className="text-base font-bold text-slate-800 dark:text-slate-100">
                    {formatBytes(result.originalSize)}
                  </p>
                </div>
                <div className="rounded-xl border border-brand-200 bg-brand-50 p-3 text-center dark:border-brand-900/60 dark:bg-brand-950/40">
                  <span className="text-[11px] font-medium text-brand-700 dark:text-brand-300">
                    Converted Size
                  </span>
                  <p className="text-base font-bold text-brand-700 dark:text-brand-300">
                    {formatBytes(result.outputSize)}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-800/50">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Dimensions
                  </span>
                  <p className="text-base font-bold text-slate-800 dark:text-slate-100">
                    {result.width} × {result.height} px
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center dark:border-emerald-900/60 dark:bg-emerald-950/40">
                  <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                    Format
                  </span>
                  <p className="text-base font-bold text-emerald-700 dark:text-emerald-300 uppercase">
                    {getFormatExtension(outputFormat)}
                  </p>
                </div>
              </div>

              {/* Preview */}
              <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-900/5 p-4 dark:border-slate-800 dark:bg-black/30">
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
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:from-brand-500 hover:to-indigo-500 active:scale-[0.99] sm:w-auto"
                >
                  <FileDown className="h-5 w-5" />
                  Download Converted Image ({getFormatExtension(outputFormat).toUpperCase()})
                </a>
                <button
                  type="button"
                  onClick={reset}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:w-auto"
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
