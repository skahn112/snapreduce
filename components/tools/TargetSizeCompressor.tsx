"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import {
  UploadCloud,
  FileDown,
  RefreshCw,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ImageIcon,
} from "lucide-react";
import {
  compressToTargetKB,
  compressWithQuality,
  formatBytes,
  CompressionResult,
} from "@/lib/image-processing";

interface TargetSizeCompressorProps {
  initialTargetKB?: number;
  initialFormat?: "image/jpeg" | "image/png" | "image/webp";
  isJpgOnly?: boolean;
  isPngOnly?: boolean;
  headline?: string;
}

export function TargetSizeCompressor({
  initialTargetKB = 100,
  initialFormat,
  isJpgOnly = false,
  isPngOnly = false,
  headline,
}: TargetSizeCompressorProps) {
  const [file, setFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  // Mode: 'target' (specify KB) or 'quality' (1-100%)
  const [mode, setMode] = useState<"target" | "quality">("target");
  const [targetKB, setTargetKB] = useState<number>(initialTargetKB);
  const [customKBInput, setCustomKBInput] = useState<string>(
    initialTargetKB ? String(initialTargetKB) : "100"
  );
  const [qualityPercent, setQualityPercent] = useState<number>(80);

  // Processing state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progressText, setProgressText] = useState<string>("");
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Drag state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Predefined quick targets
  const quickTargets = [20, 50, 100, 150, 200, 300, 500, 1000];

  const handleFileSelection = (selectedFile: File) => {
    setErrorMessage(null);
    setResult(null);

    // Validate type
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/heic",
    ];
    const isHeic =
      selectedFile.name.toLowerCase().endsWith(".heic") ||
      selectedFile.name.toLowerCase().endsWith(".heif");

    if (
      !validTypes.includes(selectedFile.type) &&
      !isHeic &&
      !selectedFile.type.startsWith("image/")
    ) {
      setErrorMessage(
        "Unsupported image format. Please upload a JPG, PNG, WebP, or HEIC file."
      );
      return;
    }

    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setOriginalPreview(objectUrl);

    // Inspect dimensions
    const img = new Image();
    img.onload = () => {
      setOriginalDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      // Trigger instant initial compression
      executeCompression(selectedFile, targetKB, mode, qualityPercent);
    };
    img.onerror = () => {
      // If HEIC or unrenderable directly in Image tag, still proceed to compression
      executeCompression(selectedFile, targetKB, mode, qualityPercent);
    };
    img.src = objectUrl;
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const executeCompression = async (
    targetFile: File | null = file,
    kbValue: number = targetKB,
    compressionMode: "target" | "quality" = mode,
    qualVal: number = qualityPercent
  ) => {
    if (!targetFile) return;

    setIsProcessing(true);
    setErrorMessage(null);
    setProgressText("Reading file and preparing canvas...");

    try {
      let formatChoice: "image/jpeg" | "image/png" | "image/webp" | undefined =
        initialFormat;

      if (isJpgOnly) formatChoice = "image/jpeg";
      if (isPngOnly) formatChoice = "image/png";

      if (compressionMode === "target") {
        setProgressText(`Analyzing and binary searching for ~${kbValue} KB...`);
        const res = await compressToTargetKB(targetFile, kbValue, {
          format: formatChoice,
          allowDownscale: true,
        });
        setResult(res);
      } else {
        setProgressText(`Applying ${qualVal}% quality matrix...`);
        const res = await compressWithQuality(targetFile, qualVal, {
          format: formatChoice,
        });
        setResult(res);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message ||
          "An error occurred while processing the image. Please try a slightly larger target size or a different image."
      );
    } finally {
      setIsProcessing(false);
      setProgressText("");
    }
  };

  const handleTargetChange = (kb: number) => {
    setTargetKB(kb);
    setCustomKBInput(String(kb));
    if (file) {
      executeCompression(file, kb, "target", qualityPercent);
    }
  };

  const handleCustomKBSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(customKBInput, 10);
    if (!isNaN(parsed) && parsed > 5) {
      setTargetKB(parsed);
      if (file) {
        executeCompression(file, parsed, "target", qualityPercent);
      }
    }
  };

  const handleQualityChange = (q: number) => {
    setQualityPercent(q);
    if (file) {
      executeCompression(file, targetKB, "quality", q);
    }
  };

  const resetAll = () => {
    setFile(null);
    setOriginalPreview(null);
    setResult(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getDownloadFilename = () => {
    if (!file) return "compressed-image.jpg";
    const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
    const ext =
      result?.format === "image/png"
        ? "png"
        : result?.format === "image/webp"
        ? "webp"
        : "jpg";
    return `snapreduce-${nameWithoutExt}-${targetKB}kb.${ext}`;
  };

  return (
    <div className="w-full rounded-3xl border border-slate-200/90 bg-white/95 p-5 shadow-xl shadow-slate-200/40 backdrop-blur-xl transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-2xl dark:shadow-black/50 sm:p-8">
      {/* Privacy Tag */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800/80">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>100% Client-Side Image Processing</span>
        </div>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          Files are processed in memory and never leave your device
        </span>
      </div>

      {headline && (
        <h2 className="mb-5 text-center text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
          {headline}
        </h2>
      )}

      {/* Upload Zone (if no file loaded) */}
      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`group flex min-h-[270px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
            isDragging
              ? "border-brand-500 bg-brand-50/70 scale-[0.99] dark:bg-brand-950/40"
              : "border-slate-300/80 bg-slate-50/70 hover:border-brand-500 hover:bg-brand-50/20 dark:border-slate-700/80 dark:bg-slate-800/30 dark:hover:border-brand-400 dark:hover:bg-slate-800/60"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept="image/jpeg,image/jpg,image/png,image/webp,image/heic,.heic"
            className="hidden"
          />
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-slate-200/80 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg dark:bg-slate-800 dark:ring-slate-700">
            <UploadCloud className="h-8 w-8 text-brand-600 transition-transform duration-300 group-hover:-translate-y-0.5 dark:text-brand-400" />
          </div>
          <p className="mt-4 text-base font-semibold text-slate-800 transition-colors group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400 sm:text-lg">
            Drag & drop your image here, or{" "}
            <span className="text-brand-600 underline decoration-brand-300 underline-offset-4 dark:text-brand-400 dark:decoration-brand-700">
              browse files
            </span>
          </p>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            Supports JPG, JPEG, PNG, WebP & iPhone HEIC • Up to 50MB
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full bg-slate-200/70 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              Target: {targetKB} KB
            </span>
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              No Watermark
            </span>
            <span className="rounded-full bg-brand-100 px-2.5 py-1 text-xs font-medium text-brand-800 dark:bg-brand-950/60 dark:text-brand-300">
              Free & Unlimited
            </span>
          </div>
        </div>
      ) : (
        /* Workspace when file is selected */
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="rounded-2xl border border-slate-200/90 bg-slate-50/80 p-4 transition-colors dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Mode switch */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Mode:
                </span>
                <div className="inline-flex rounded-xl bg-slate-200/80 p-1 text-xs font-medium text-slate-700 dark:bg-slate-950/80 dark:text-slate-300">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("target");
                      executeCompression(file, targetKB, "target", qualityPercent);
                    }}
                    className={`rounded-lg px-3 py-1.5 transition ${
                      mode === "target"
                        ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                        : "hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Target Size (KB)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("quality");
                      executeCompression(file, targetKB, "quality", qualityPercent);
                    }}
                    className={`rounded-lg px-3 py-1.5 transition ${
                      mode === "quality"
                        ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                        : "hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Quality Slider (%)
                  </button>
                </div>
              </div>

              {/* Reset / Pick another */}
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 transition hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Change Image
              </button>
            </div>

            {/* Target KB selector */}
            {mode === "target" ? (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/80">
                <label className="mb-2 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Select Target File Size (KB):
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {quickTargets.map((kb) => (
                    <button
                      key={kb}
                      type="button"
                      onClick={() => handleTargetChange(kb)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                        targetKB === kb
                          ? "bg-brand-600 text-white shadow-sm shadow-brand-500/25 dark:bg-brand-500"
                          : "bg-white text-slate-700 border border-slate-200/90 hover:border-brand-400 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:border-brand-500"
                      }`}
                    >
                      {kb >= 1000 ? `${kb / 1000} MB` : `${kb} KB`}
                    </button>
                  ))}
                  {/* Custom KB Input */}
                  <form
                    onSubmit={handleCustomKBSubmit}
                    className="flex items-center gap-1.5"
                  >
                    <input
                      type="number"
                      min={10}
                      max={10000}
                      value={customKBInput}
                      onChange={(e) => setCustomKBInput(e.target.value)}
                      placeholder="Custom"
                      className="w-20 rounded-xl border border-slate-200/90 bg-white px-2.5 py-1 text-xs text-slate-800 placeholder-slate-400 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-brand-400"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-slate-800 px-3 py-1 text-xs font-medium text-white transition hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
                    >
                      Set
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              /* Quality slider mode */
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/80">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Compression Quality Level:</span>
                  <span className="rounded-md bg-brand-50 px-2 py-0.5 font-bold text-brand-700 dark:bg-brand-950/80 dark:text-brand-300">
                    {qualityPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={98}
                  value={qualityPercent}
                  onChange={(e) => handleQualityChange(parseInt(e.target.value, 10))}
                  className="mt-2 w-full accent-brand-600"
                />
                <div className="mt-1 flex justify-between text-[10px] text-slate-400 dark:text-slate-500">
                  <span>Smallest File (Low Quality)</span>
                  <span>Balanced (80%)</span>
                  <span>Best Quality (Large File)</span>
                </div>
              </div>
            )}
          </div>

          {/* Processing / Progress State */}
          {isProcessing && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-brand-200/80 bg-brand-50/50 p-6 text-center dark:border-brand-900/60 dark:bg-brand-950/40">
              <RefreshCw className="h-6 w-6 animate-spin text-brand-600 dark:text-brand-400" />
              <p className="mt-2 text-sm font-semibold text-brand-900 dark:text-brand-200">
                Compressing locally in your browser...
              </p>
              <p className="text-xs text-brand-700 dark:text-brand-400">{progressText}</p>
            </div>
          )}

          {/* Error Message if any */}
          {errorMessage && (
            <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
              <div className="text-xs sm:text-sm">
                <p className="font-semibold">Compression Adjustment Notice</p>
                <p className="mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Results Side-by-Side Comparison */}
          {result && !isProcessing && (
            <div className="space-y-6">
              {/* Metrics Header */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-2xl border border-slate-200/90 bg-slate-50 p-3.5 text-center dark:border-slate-800 dark:bg-slate-800/50">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Original Size
                  </span>
                  <p className="text-base font-bold text-slate-800 dark:text-slate-100">
                    {formatBytes(result.originalSize)}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">
                    {result.originalWidth} × {result.originalHeight} px
                  </p>
                </div>

                <div className="rounded-2xl border border-brand-200/90 bg-brand-50/60 p-3.5 text-center dark:border-brand-900/60 dark:bg-brand-950/50">
                  <span className="text-[11px] font-medium text-brand-700 dark:text-brand-300">
                    Compressed Output
                  </span>
                  <p className="text-base font-bold text-brand-700 dark:text-brand-400">
                    {formatBytes(result.outputSize)}
                  </p>
                  <p className="text-[10px] text-brand-600 dark:text-brand-400">
                    {result.outputWidth} × {result.outputHeight} px
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-200/90 bg-emerald-50/60 p-3.5 text-center dark:border-emerald-900/60 dark:bg-emerald-950/50">
                  <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                    Space Saved
                  </span>
                  <p className="text-base font-bold text-emerald-700 dark:text-emerald-400">
                    -{result.reductionPercentage}%
                  </p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400">
                    {formatBytes(result.originalSize - result.outputSize)} reduced
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200/90 bg-slate-50 p-3.5 text-center dark:border-slate-800 dark:bg-slate-800/50">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Format & Quality
                  </span>
                  <p className="text-base font-bold text-slate-800 dark:text-slate-100">
                    {result.format.replace("image/", "").toUpperCase()}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">
                    Quality: {result.appliedQuality}%
                  </p>
                </div>
              </div>

              {/* Side-by-Side Visual Preview */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Original Preview */}
                <div className="flex flex-col rounded-2xl border border-slate-200 overflow-hidden bg-slate-100/50 dark:border-slate-800 dark:bg-slate-950/60">
                  <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-200">
                    <span>Original Image</span>
                    <span className="text-slate-400 font-normal dark:text-slate-500">
                      {formatBytes(result.originalSize)}
                    </span>
                  </div>
                  <div className="flex min-h-[220px] max-h-[360px] items-center justify-center p-3">
                    {originalPreview && (
                      <img
                        src={originalPreview}
                        alt="Original Upload Preview"
                        className="max-h-[340px] w-auto rounded-lg object-contain shadow-sm"
                      />
                    )}
                  </div>
                </div>

                {/* Compressed Preview */}
                <div className="flex flex-col rounded-2xl border border-brand-200/90 overflow-hidden bg-slate-100/50 ring-2 ring-brand-500/20 dark:border-brand-800/80 dark:bg-slate-950/60 dark:ring-brand-400/20">
                  <div className="flex items-center justify-between border-b border-brand-100 bg-brand-50 px-3.5 py-2.5 text-xs font-semibold text-brand-900 dark:border-brand-900/60 dark:bg-brand-950/80 dark:text-brand-200">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
                      Compressed Result
                    </span>
                    <span className="rounded-md bg-brand-600 px-2 py-0.5 text-white text-[11px] font-bold">
                      {formatBytes(result.outputSize)}
                    </span>
                  </div>
                  <div className="flex min-h-[220px] max-h-[360px] items-center justify-center p-3">
                    <img
                      src={result.url}
                      alt="Compressed Result Preview"
                      className="max-h-[340px] w-auto rounded-lg object-contain shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
                <a
                  href={result.url}
                  download={getDownloadFilename()}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition-all duration-200 hover:from-brand-500 hover:to-indigo-500 hover:shadow-xl hover:shadow-brand-500/35 active:scale-[0.98] sm:w-auto"
                >
                  <FileDown className="h-5 w-5" />
                  Download Compressed Image ({formatBytes(result.outputSize)})
                </a>

                <button
                  type="button"
                  onClick={resetAll}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200/90 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white sm:w-auto"
                >
                  <RefreshCw className="h-4 w-4" />
                  Compress Another Image
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
