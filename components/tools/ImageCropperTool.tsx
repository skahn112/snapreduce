"use client";

import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from "react";
import {
  FileDown,
  RefreshCw,
  Crop,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { cropImage, formatBytes, CropBox, CropResult } from "@/lib/image-processing";

export function ImageCropperTool() {
  const [file, setFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [cropBox, setCropBox] = useState<CropBox>({
    x: 10,
    y: 10,
    w: 80,
    h: 80,
  });
  const [preset, setPreset] = useState<string>("free");
  const [cropResult, setCropResult] = useState<CropResult | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imgSrc) URL.revokeObjectURL(imgSrc);
      if (cropResult?.url) URL.revokeObjectURL(cropResult.url);
    };
  }, [imgSrc, cropResult]);

  const getPresetAspect = (id: string): number | null => {
    switch (id) {
      case "1:1":
        return 1;
      case "4:3":
        return 4 / 3;
      case "16:9":
        return 16 / 9;
      case "passport":
        return 35 / 45; // ~0.778
      default:
        return null;
    }
  };

  const calculateCropBoxForAspect = (targetAspect: number | null): CropBox => {
    if (!targetAspect || !imageRef.current) {
      return { x: 10, y: 10, w: 80, h: 80 };
    }
    const img = imageRef.current;
    const imgW = img.naturalWidth || img.width || 1;
    const imgH = img.naturalHeight || img.height || 1;
    const imgAspect = imgW / imgH;

    if (imgAspect >= targetAspect) {
      // Image is wider than target aspect: anchor height at 80%
      const h = 80;
      const w = Math.min(96, Math.max(10, 80 * (targetAspect / imgAspect)));
      const x = Math.max(0, (100 - w) / 2);
      const y = (100 - h) / 2;
      return { x, y, w, h };
    } else {
      // Image is taller than target aspect: anchor width at 80%
      const w = 80;
      const h = Math.min(96, Math.max(10, 80 * (imgAspect / targetAspect)));
      const x = (100 - w) / 2;
      const y = Math.max(0, (100 - h) / 2);
      return { x, y, w, h };
    }
  };

  const handleFile = (f: File) => {
    if (imgSrc) URL.revokeObjectURL(imgSrc);
    if (cropResult?.url) URL.revokeObjectURL(cropResult.url);

    setFile(f);
    setCropResult(null);
    setPreset("free");
    const url = URL.createObjectURL(f);
    setImgSrc(url);
    setCropBox({ x: 10, y: 10, w: 80, h: 80 });
  };

  const handlePresetSelect = (id: string) => {
    setPreset(id);
    const aspect = getPresetAspect(id);
    setCropBox(calculateCropBoxForAspect(aspect));
  };

  const onImageLoad = () => {
    if (preset !== "free") {
      const aspect = getPresetAspect(preset);
      setCropBox(calculateCropBoxForAspect(aspect));
    }
  };

  const startDrag = (
    e: ReactMouseEvent | ReactTouchEvent,
    type: "move" | "nw" | "ne" | "sw" | "se"
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const startX = clientX;
    const startY = clientY;
    const startBox = { ...cropBox };

    const wrapper = imageRef.current?.parentElement;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();

    const onPointerMove = (moveEv: MouseEvent | TouchEvent) => {
      const currentX = "touches" in moveEv ? moveEv.touches[0].clientX : moveEv.clientX;
      const currentY = "touches" in moveEv ? moveEv.touches[0].clientY : moveEv.clientY;

      const deltaXPercent = ((currentX - startX) / rect.width) * 100;
      const deltaYPercent = ((currentY - startY) / rect.height) * 100;

      if (type === "move") {
        const nextX = Math.max(0, Math.min(100 - startBox.w, startBox.x + deltaXPercent));
        const nextY = Math.max(0, Math.min(100 - startBox.h, startBox.y + deltaYPercent));
        setCropBox((prev) => ({ ...prev, x: nextX, y: nextY }));
      } else {
        const currentTargetAspect = getPresetAspect(preset);
        const imgW = imageRef.current?.naturalWidth || rect.width;
        const imgH = imageRef.current?.naturalHeight || rect.height;
        const imgAspect = imgW / imgH;

        let nextX = startBox.x;
        let nextY = startBox.y;
        let nextW = startBox.w;
        let nextH = startBox.h;

        if (type === "se") {
          nextW = Math.max(8, Math.min(100 - startBox.x, startBox.w + deltaXPercent));
          if (currentTargetAspect) {
            nextH = nextW * (imgAspect / currentTargetAspect);
            if (nextY + nextH > 100) {
              nextH = 100 - nextY;
              nextW = nextH * (currentTargetAspect / imgAspect);
            }
          } else {
            nextH = Math.max(8, Math.min(100 - startBox.y, startBox.h + deltaYPercent));
          }
        } else if (type === "sw") {
          const maxLeftShift = startBox.x;
          const shift = Math.min(maxLeftShift, Math.max(-startBox.w + 8, -deltaXPercent));
          nextX = startBox.x - shift;
          nextW = startBox.w + shift;
          if (currentTargetAspect) {
            nextH = nextW * (imgAspect / currentTargetAspect);
            if (nextY + nextH > 100) {
              nextH = 100 - nextY;
              nextW = nextH * (currentTargetAspect / imgAspect);
              nextX = startBox.x + startBox.w - nextW;
            }
          } else {
            nextH = Math.max(8, Math.min(100 - startBox.y, startBox.h + deltaYPercent));
          }
        } else if (type === "ne") {
          nextW = Math.max(8, Math.min(100 - startBox.x, startBox.w + deltaXPercent));
          if (currentTargetAspect) {
            nextH = nextW * (imgAspect / currentTargetAspect);
            nextY = startBox.y + startBox.h - nextH;
            if (nextY < 0) {
              nextY = 0;
              nextH = startBox.y + startBox.h;
              nextW = nextH * (currentTargetAspect / imgAspect);
            }
          } else {
            const shiftY = Math.min(startBox.y, Math.max(-startBox.h + 8, -deltaYPercent));
            nextY = startBox.y - shiftY;
            nextH = startBox.h + shiftY;
          }
        } else if (type === "nw") {
          const shiftX = Math.min(startBox.x, Math.max(-startBox.w + 8, -deltaXPercent));
          nextX = startBox.x - shiftX;
          nextW = startBox.w + shiftX;
          if (currentTargetAspect) {
            nextH = nextW * (imgAspect / currentTargetAspect);
            nextY = startBox.y + startBox.h - nextH;
            if (nextY < 0) {
              nextY = 0;
              nextH = startBox.y + startBox.h;
              nextW = nextH * (currentTargetAspect / imgAspect);
              nextX = startBox.x + startBox.w - nextW;
            }
          } else {
            const shiftY = Math.min(startBox.y, Math.max(-startBox.h + 8, -deltaYPercent));
            nextY = startBox.y - shiftY;
            nextH = startBox.h + shiftY;
          }
        }

        setCropBox({
          x: Math.max(0, Math.min(100, nextX)),
          y: Math.max(0, Math.min(100, nextY)),
          w: Math.max(5, Math.min(100, nextW)),
          h: Math.max(5, Math.min(100, nextH)),
        });
      }
    };

    const onPointerUp = () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
    };

    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    window.addEventListener("touchmove", onPointerMove);
    window.addEventListener("touchend", onPointerUp);
  };

  const applyCrop = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const res = await cropImage(file, cropBox);
      setCropResult(res);
    } catch (err) {
      console.error("Crop error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    if (imgSrc) URL.revokeObjectURL(imgSrc);
    if (cropResult?.url) URL.revokeObjectURL(cropResult.url);
    setFile(null);
    setImgSrc(null);
    setCropResult(null);
    setPreset("free");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xl sm:p-8 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-2xl dark:shadow-black/50">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800/80">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>Interactive Browser Cropping • 100% Private</span>
        </div>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          Zero data transmitted to remote servers
        </span>
      </div>

      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="group flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-8 text-center transition hover:border-brand-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/30 dark:hover:border-brand-400 dark:hover:bg-slate-800/60"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            accept="image/*"
            className="hidden"
          />
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-slate-200 transition-transform group-hover:scale-110 dark:bg-slate-800 dark:ring-slate-700">
            <Crop className="h-8 w-8 text-brand-600 dark:text-brand-400" />
          </div>
          <p className="mt-4 text-base font-semibold text-slate-800 dark:text-slate-100 sm:text-lg">
            Choose an image to crop, or{" "}
            <span className="text-brand-600 underline decoration-brand-300 underline-offset-4 dark:text-brand-400 dark:decoration-brand-700">
              browse files
            </span>
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Presets for Passport, Square (1:1), 16:9, 4:3, or Free selection
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls */}
          <div className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-4 transition-colors dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-3 dark:border-slate-700/80">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Active Photo:
                </span>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{file.name}</p>
              </div>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-red-600 transition dark:text-slate-400 dark:hover:text-red-400"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Change Image
              </button>
            </div>

            {/* Presets */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Aspect Ratio:</span>
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
                      ? "bg-brand-600 text-white shadow-sm dark:bg-brand-500"
                      : "bg-white text-slate-700 border border-slate-200 hover:border-brand-400 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:border-brand-500"
                  }`}
                >
                  {p.label}
                </button>
              ))}

              <button
                type="button"
                onClick={applyCrop}
                disabled={isProcessing}
                className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 active:scale-95 transition dark:bg-emerald-500 dark:hover:bg-emerald-600"
              >
                <Crop className="h-4 w-4" />
                {isProcessing ? "Cropping..." : "Apply Crop"}
              </button>
            </div>
          </div>

          {/* Interactive Crop Viewport */}
          <div
            ref={containerRef}
            className="relative flex items-center justify-center overflow-hidden rounded-xl border border-slate-300 bg-slate-900/10 p-4 dark:border-slate-800 dark:bg-black/40"
          >
            {imgSrc && (
              <div className="relative inline-block select-none touch-none">
                <img
                  ref={imageRef}
                  src={imgSrc}
                  alt="Crop Source"
                  onLoad={onImageLoad}
                  className="max-h-[420px] w-auto rounded object-contain shadow-sm pointer-events-none"
                />

                {/* Crop Box Overlay */}
                <div
                  onMouseDown={(e) => startDrag(e, "move")}
                  onTouchStart={(e) => startDrag(e, "move")}
                  style={{
                    left: `${cropBox.x}%`,
                    top: `${cropBox.y}%`,
                    width: `${cropBox.w}%`,
                    height: `${cropBox.h}%`,
                  }}
                  className="absolute border-2 border-brand-500 bg-brand-500/10 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] cursor-move select-none touch-none"
                >
                  <div className="absolute left-1 top-1 rounded bg-brand-600 px-1 py-0.5 text-[9px] font-semibold text-white shadow pointer-events-none">
                    Crop Region
                  </div>

                  {/* Corner Resize Handles */}
                  <div
                    onMouseDown={(e) => startDrag(e, "nw")}
                    onTouchStart={(e) => startDrag(e, "nw")}
                    className="absolute -left-1.5 -top-1.5 h-3.5 w-3.5 rounded-sm border-2 border-brand-600 bg-white shadow cursor-nwse-resize dark:bg-slate-900"
                  />
                  <div
                    onMouseDown={(e) => startDrag(e, "ne")}
                    onTouchStart={(e) => startDrag(e, "ne")}
                    className="absolute -right-1.5 -top-1.5 h-3.5 w-3.5 rounded-sm border-2 border-brand-600 bg-white shadow cursor-nesw-resize dark:bg-slate-900"
                  />
                  <div
                    onMouseDown={(e) => startDrag(e, "sw")}
                    onTouchStart={(e) => startDrag(e, "sw")}
                    className="absolute -left-1.5 -bottom-1.5 h-3.5 w-3.5 rounded-sm border-2 border-brand-600 bg-white shadow cursor-nesw-resize dark:bg-slate-900"
                  />
                  <div
                    onMouseDown={(e) => startDrag(e, "se")}
                    onTouchStart={(e) => startDrag(e, "se")}
                    className="absolute -right-1.5 -bottom-1.5 h-3.5 w-3.5 rounded-sm border-2 border-brand-600 bg-white shadow cursor-nwse-resize dark:bg-slate-900"
                  />

                  {/* Rule of Thirds Grid lines */}
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                    <div className="border-r border-b border-white/40" />
                    <div className="border-r border-b border-white/40" />
                    <div className="border-b border-white/40" />
                    <div className="border-r border-b border-white/40" />
                    <div className="border-r border-b border-white/40" />
                    <div className="border-b border-white/40" />
                    <div className="border-r border-b border-white/40" />
                    <div className="border-r border-b border-white/40" />
                    <div />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cropped Output Result */}
          {cropResult && (
            <div className="space-y-4 rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 transition-colors dark:border-emerald-900/60 dark:bg-emerald-950/30">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-2 dark:border-emerald-900/60">
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  Cropped Result Ready
                </span>
                <span className="text-xs text-emerald-700 dark:text-emerald-400">
                  {cropResult.width} × {cropResult.height} px •{" "}
                  {formatBytes(cropResult.size)}
                </span>
              </div>

              <div className="flex justify-center p-2">
                <img
                  src={cropResult.url}
                  alt="Cropped Preview"
                  className="max-h-[300px] w-auto rounded border border-white/60 shadow-md dark:border-slate-800"
                />
              </div>

              <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
                <a
                  href={cropResult.url}
                  download={`snapreduce-cropped-${cropResult.width}x${cropResult.height}.jpg`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:from-brand-500 hover:to-indigo-500 sm:w-auto"
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
