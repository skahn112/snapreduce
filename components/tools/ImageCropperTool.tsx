"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import {
  UploadCloud,
  FileDown,
  RefreshCw,
  Crop,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { cropImage, formatBytes } from "@/lib/image-processing";

export function ImageCropperTool() {
  const [file, setFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [cropResult, setCropResult] = useState<{
    url: string;
    width: number;
    height: number;
    size: number;
  } | null>(null);

  // Aspect preset: 'free' | '1:1' | '4:3' | '16:9' | 'passport'
  const [preset, setPreset] = useState<string>("1:1");

  // Crop rectangle in percentages of displayed image: [0-100]
  const [cropBox, setCropBox] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  }>({
    x: 10,
    y: 10,
    w: 80,
    h: 80,
  });

  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setImgSrc(url);
    setCropResult(null);
    setCropBox({ x: 10, y: 10, w: 80, h: 80 });
  };

  const applyCrop = async () => {
    if (!file || !imageRef.current) return;
    const img = imageRef.current;
    const naturalW = img.naturalWidth;
    const naturalH = img.naturalHeight;

    const pixelCrop = {
      x: Math.round((cropBox.x / 100) * naturalW),
      y: Math.round((cropBox.y / 100) * naturalH),
      width: Math.round((cropBox.w / 100) * naturalW),
      height: Math.round((cropBox.h / 100) * naturalH),
    };

    try {
      const res = await cropImage(file, pixelCrop, {
        format: file.type || "image/jpeg",
      });
      setCropResult(res);
    } catch (err) {
      console.error("Cropping failed", err);
    }
  };

  const handlePresetSelect = (p: string) => {
    setPreset(p);
    if (p === "1:1") {
      setCropBox({ x: 15, y: 15, w: 70, h: 70 });
    } else if (p === "16:9") {
      setCropBox({ x: 5, y: 20, w: 90, h: 50 });
    } else if (p === "4:3") {
      setCropBox({ x: 10, y: 15, w: 80, h: 60 });
    } else if (p === "passport") {
      // 35x45 ratio = ~0.777 width to height
      setCropBox({ x: 25, y: 10, w: 50, h: 65 });
    } else {
      setCropBox({ x: 10, y: 10, w: 80, h: 80 });
    }
  };

  const reset = () => {
    setFile(null);
    setImgSrc(null);
    setCropResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:p-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Interactive Browser Cropping • 100% Private</span>
        </div>
        <span className="text-xs text-slate-400">
          Zero data transmitted to remote servers
        </span>
      </div>

      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="group flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-8 text-center transition hover:border-brand-400 hover:bg-slate-50"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            accept="image/*"
            className="hidden"
          />
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-slate-200 transition-transform group-hover:scale-110">
            <Crop className="h-8 w-8 text-brand-600" />
          </div>
          <p className="mt-4 text-base font-semibold text-slate-800 sm:text-lg">
            Choose an image to crop, or{" "}
            <span className="text-brand-600 underline decoration-brand-300 underline-offset-4">
              browse files
            </span>
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Presets for Passport, Square (1:1), 16:9, 4:3, or Free selection
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Active Photo:
                </span>
                <p className="text-sm font-bold text-slate-800">{file.name}</p>
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

            {/* Presets */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">Aspect Ratio:</span>
              {[
                { id: "1:1", label: "Square (1:1)" },
                { id: "4:3", label: "Standard (4:3)" },
                { id: "16:9", label: "Widescreen (16:9)" },
                { id: "passport", label: "Passport (35x45)" },
                { id: "free", label: "Free Form" },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handlePresetSelect(p.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    preset === p.id
                      ? "bg-brand-600 text-white shadow-sm"
                      : "bg-white text-slate-700 border border-slate-200 hover:border-brand-400"
                  }`}
                >
                  {p.label}
                </button>
              ))}

              <button
                type="button"
                onClick={applyCrop}
                className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 active:scale-95"
              >
                <Crop className="h-4 w-4" />
                Apply Crop
              </button>
            </div>
          </div>

          {/* Interactive Crop Viewport */}
          <div
            ref={containerRef}
            className="relative flex items-center justify-center overflow-hidden rounded-xl border border-slate-300 bg-slate-900/10 p-4"
          >
            {imgSrc && (
              <div className="relative inline-block select-none">
                <img
                  ref={imageRef}
                  src={imgSrc}
                  alt="Crop Source"
                  className="max-h-[420px] w-auto rounded object-contain"
                />

                {/* Crop Box Overlay */}
                <div
                  style={{
                    left: `${cropBox.x}%`,
                    top: `${cropBox.y}%`,
                    width: `${cropBox.w}%`,
                    height: `${cropBox.h}%`,
                  }}
                  className="absolute border-2 border-brand-500 bg-brand-500/10 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] cursor-move"
                >
                  <div className="absolute left-1 top-1 rounded bg-brand-600 px-1 py-0.5 text-[9px] font-semibold text-white">
                    Crop Region
                  </div>
                  {/* Grid lines */}
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                    <div className="border-r border-b border-white/40" />
                    <div className="border-r border-b border-white/40" />
                    <div className="border-b border-white/40" />
                    <div className="border-r border-b border-white/40" />
                    <div className="border-r border-b border-white/40" />
                    <div className="border-b border-white/40" />
                    <div className="border-r border-white/40" />
                    <div className="border-r border-white/40" />
                    <div />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cropped Output Result */}
          {cropResult && (
            <div className="space-y-4 rounded-xl border border-emerald-200 bg-emerald-50/40 p-4">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Cropped Result Ready
                </span>
                <span className="text-xs text-emerald-700">
                  {cropResult.width} × {cropResult.height} px •{" "}
                  {formatBytes(cropResult.size)}
                </span>
              </div>

              <div className="flex justify-center p-2">
                <img
                  src={cropResult.url}
                  alt="Cropped Preview"
                  className="max-h-[300px] w-auto rounded border border-white shadow-md"
                />
              </div>

              <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
                <a
                  href={cropResult.url}
                  download={`snapreduce-cropped-${cropResult.width}x${cropResult.height}.jpg`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-700 sm:w-auto"
                >
                  <FileDown className="h-4 w-4" />
                  Download Cropped Photo
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
