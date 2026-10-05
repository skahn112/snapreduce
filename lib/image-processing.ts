/**
 * Client-Side Image Processing Engine for SnapReduce
 * Pure browser-based processing using HTML5 Canvas & Blob APIs.
 * Zero server uploads - all processing stays strictly on the client device.
 */

export interface CompressionResult {
  blob: Blob;
  url: string;
  originalSize: number;
  outputSize: number;
  reductionPercentage: number;
  originalWidth: number;
  originalHeight: number;
  outputWidth: number;
  outputHeight: number;
  appliedQuality: number;
  format: string;
}

export interface ResizeResult {
  blob: Blob;
  url: string;
  originalSize: number;
  outputSize: number;
  originalWidth: number;
  originalHeight: number;
  outputWidth: number;
  outputHeight: number;
  format: string;
}

export interface ConversionResult {
  blob: Blob;
  url: string;
  originalSize: number;
  outputSize: number;
  width: number;
  height: number;
  format: string;
  originalFormat: string;
}

export interface CropBox {
  x: number;
  y: number;
  w: number;
  h: number;
  width?: number;
  height?: number;
  isPercentage?: boolean;
}

export interface CropResult {
  blob: Blob;
  url: string;
  width: number;
  height: number;
  size: number;
}

/**
 * Get standard file extension from MIME type
 */
export function getFormatExtension(mimeType: string): string {
  switch (mimeType) {
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/jpeg":
    case "image/jpg":
      return "jpg";
    case "image/heic":
      return "heic";
    case "image/gif":
      return "gif";
    case "image/svg+xml":
      return "svg";
    default:
      return mimeType.split("/")[1] || "jpg";
  }
}

/**
 * Format raw bytes into human-readable strings (e.g. "98.7 KB", "2.4 MB")
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Load an image File or Blob into an HTMLImageElement
 */
export function loadImageFromFile(file: File | Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image file into browser."));
    };
    img.src = url;
  });
}

/**
 * Helper to convert canvas to Blob as a promise
 */
export function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Canvas conversion to Blob failed."));
        }
      },
      mimeType,
      quality
    );
  });
}

/**
 * Binary search target file size compression algorithm
 * 1. Checks if already under target size.
 * 2. Binary searches JPEG/WebP quality between 0.05 and 0.95.
 * 3. If quality reduction alone cannot reach target size, iteratively scales down dimensions.
 */
export async function compressToTargetKB(
  file: File,
  targetKB: number,
  options: {
    format?: "image/jpeg" | "image/webp" | "image/png";
    allowDownscale?: boolean;
    minQuality?: number;
    initialQuality?: number;
  } = {}
): Promise<CompressionResult> {
  const targetBytes = targetKB * 1024;
  const format = options.format || (file.type === "image/webp" ? "image/webp" : "image/jpeg");
  const allowDownscale = options.allowDownscale ?? true;
  const minQuality = options.minQuality ?? 0.05;

  const originalSize = file.size;
  const img = await loadImageFromFile(file);
  const origW = img.naturalWidth || img.width;
  const origH = img.naturalHeight || img.height;

  let currentW = origW;
  let currentH = origH;
  let bestBlob: Blob | null = null;
  let bestQuality = 0.8;
  let bestWidth = currentW;
  let bestHeight = currentH;

  // Canvas setup
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create 2D canvas context.");

  // For PNG target compression (lossless), we scale dimensions or convert
  if (format === "image/png") {
    let scale = 1.0;
    while (scale >= 0.1) {
      canvas.width = Math.round(origW * scale);
      canvas.height = Math.round(origH * scale);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const blob = await canvasToBlob(canvas, "image/png");
      bestBlob = blob;
      bestWidth = canvas.width;
      bestHeight = canvas.height;

      if (blob.size <= targetBytes) {
        break;
      }
      scale -= 0.1;
    }
  } else {
    // Lossy JPEG / WebP target search
    let scale = 1.0;
    let attempts = 0;
    const maxDimensionReductionAttempts = allowDownscale ? 10 : 1;

    while (attempts < maxDimensionReductionAttempts) {
      currentW = Math.max(16, Math.round(origW * scale));
      currentH = Math.max(16, Math.round(origH * scale));

      canvas.width = currentW;
      canvas.height = currentH;

      // Handle white background for JPEG
      if (format === "image/jpeg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, currentW, currentH);
      } else {
        ctx.clearRect(0, 0, currentW, currentH);
      }
      ctx.drawImage(img, 0, 0, currentW, currentH);

      // Binary search quality in [minQuality, 0.95]
      let low = minQuality;
      let high = 0.95;
      let optimalBlobAtScale: Blob | null = null;
      let optimalQualityAtScale = low;

      for (let iter = 0; iter < 7; iter++) {
        const mid = (low + high) / 2;
        const testBlob = await canvasToBlob(canvas, format, mid);

        if (testBlob.size <= targetBytes) {
          optimalBlobAtScale = testBlob;
          optimalQualityAtScale = mid;
          low = mid; // try for higher quality that still fits
        } else {
          high = mid; // too large, lower quality
        }
      }

      // If we found a candidate at this scale that satisfies targetBytes
      if (optimalBlobAtScale && optimalBlobAtScale.size <= targetBytes) {
        bestBlob = optimalBlobAtScale;
        bestQuality = optimalQualityAtScale;
        bestWidth = currentW;
        bestHeight = currentH;
        break;
      }

      // If even lowest quality mid was too large, save the lowest quality result as best so far
      const lowestQualityBlob = await canvasToBlob(canvas, format, minQuality);
      if (!bestBlob || lowestQualityBlob.size < bestBlob.size) {
        bestBlob = lowestQualityBlob;
        bestQuality = minQuality;
        bestWidth = currentW;
        bestHeight = currentH;
      }

      // If we still haven't met target and downscaling is allowed, reduce scale
      if (lowestQualityBlob.size > targetBytes && allowDownscale) {
        // Compute approximate scale reduction factor based on quadratic pixel reduction
        const ratio = Math.sqrt(targetBytes / lowestQualityBlob.size);
        scale = Math.max(0.1, Math.min(scale * 0.85, scale * ratio * 0.98));
        attempts++;
      } else {
        break;
      }
    }
  }

  if (!bestBlob) {
    throw new Error("Unable to compress image to the requested parameters.");
  }

  const outputSize = bestBlob.size;
  const reductionPercentage = Math.max(
    0,
    parseFloat((((originalSize - outputSize) / originalSize) * 100).toFixed(1))
  );

  return {
    blob: bestBlob,
    url: URL.createObjectURL(bestBlob),
    originalSize,
    outputSize,
    reductionPercentage,
    originalWidth: origW,
    originalHeight: origH,
    outputWidth: bestWidth,
    outputHeight: bestHeight,
    appliedQuality: Math.round(bestQuality * 100),
    format,
  };
}

/**
 * Standard quality-based compressor (manual quality slider 1-100%)
 */
export async function compressWithQuality(
  file: File,
  qualityPercent: number,
  options: {
    format?: "image/jpeg" | "image/webp" | "image/png";
    maxWidth?: number;
    maxHeight?: number;
  } = {}
): Promise<CompressionResult> {
  const originalSize = file.size;
  const format = options.format || (file.type === "image/png" ? "image/jpeg" : file.type);
  const quality = Math.min(1, Math.max(0.01, qualityPercent / 100));

  const img = await loadImageFromFile(file);
  const origW = img.naturalWidth || img.width;
  const origH = img.naturalHeight || img.height;

  let targetW = origW;
  let targetH = origH;

  if (options.maxWidth && targetW > options.maxWidth) {
    targetH = Math.round((targetH * options.maxWidth) / targetW);
    targetW = options.maxWidth;
  }
  if (options.maxHeight && targetH > options.maxHeight) {
    targetW = Math.round((targetW * options.maxHeight) / targetH);
    targetH = options.maxHeight;
  }

  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create 2D canvas context.");

  if (format === "image/jpeg") {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, targetW, targetH);
  } else {
    ctx.clearRect(0, 0, targetW, targetH);
  }
  ctx.drawImage(img, 0, 0, targetW, targetH);

  const blob = await canvasToBlob(canvas, format, quality);
  const outputSize = blob.size;
  const reductionPercentage = Math.max(
    0,
    parseFloat((((originalSize - outputSize) / originalSize) * 100).toFixed(1))
  );

  return {
    blob,
    url: URL.createObjectURL(blob),
    originalSize,
    outputSize,
    reductionPercentage,
    originalWidth: origW,
    originalHeight: origH,
    outputWidth: targetW,
    outputHeight: targetH,
    appliedQuality: qualityPercent,
    format,
  };
}

/**
 * Resize image with dimension controls, aspect ratio lock, and background fill
 */
export async function resizeImage(
  file: File,
  targetWidth: number,
  targetHeight: number,
  options: {
    format?: string;
    quality?: number;
    backgroundColor?: string;
  } = {}
): Promise<ResizeResult> {
  const originalSize = file.size;
  const format = options.format || file.type || "image/jpeg";
  const quality = (options.quality ?? 90) / 100;
  const bgColor = options.backgroundColor || "#FFFFFF";

  const img = await loadImageFromFile(file);
  const origW = img.naturalWidth || img.width;
  const origH = img.naturalHeight || img.height;

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create 2D canvas context.");

  if (format === "image/jpeg") {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  } else {
    ctx.clearRect(0, 0, targetWidth, targetHeight);
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  const blob = await canvasToBlob(canvas, format, quality);

  return {
    blob,
    url: URL.createObjectURL(blob),
    originalSize,
    outputSize: blob.size,
    originalWidth: origW,
    originalHeight: origH,
    outputWidth: targetWidth,
    outputHeight: targetHeight,
    format,
  };
}

/**
 * Convert Image Format (e.g. PNG to JPG, JPG to WebP, etc.)
 */
export async function convertImageFormat(
  file: File,
  targetMimeType: string,
  options: {
    quality?: number;
    backgroundColor?: string;
  } = {}
): Promise<ConversionResult> {
  const originalSize = file.size;
  const quality = (options.quality ?? 92) / 100;
  const bgColor = options.backgroundColor || "#FFFFFF";

  let img: HTMLImageElement;

  // Handle HEIC files if requested
  if (
    file.type === "image/heic" ||
    file.name.toLowerCase().endsWith(".heic") ||
    file.name.toLowerCase().endsWith(".heif")
  ) {
    try {
      const heic2any = (await import("heic2any")).default;
      const convertedBlobOrBlobs = await heic2any({
        blob: file,
        toType: targetMimeType === "image/png" ? "image/png" : "image/jpeg",
        quality,
      });
      const singleBlob = Array.isArray(convertedBlobOrBlobs)
        ? convertedBlobOrBlobs[0]
        : convertedBlobOrBlobs;

      img = await loadImageFromFile(singleBlob);
    } catch (err: any) {
      throw new Error(
        "HEIC decoding failed. This browser may not have WebAssembly enabled, or the HEIC file is corrupted."
      );
    }
  } else {
    img = await loadImageFromFile(file);
  }

  const width = img.naturalWidth || img.width;
  const height = img.naturalHeight || img.height;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create canvas context.");

  // If converting transparent PNG to JPG, fill background with white
  if (targetMimeType === "image/jpeg") {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
  } else {
    ctx.clearRect(0, 0, width, height);
  }

  ctx.drawImage(img, 0, 0, width, height);
  const blob = await canvasToBlob(canvas, targetMimeType, quality);

  return {
    blob,
    url: URL.createObjectURL(blob),
    originalSize,
    outputSize: blob.size,
    width,
    height,
    format: targetMimeType,
    originalFormat: file.type || "unknown",
  };
}

/**
 * Crop image based on pixel bounding box or percentage crop box
 */
export async function cropImage(
  file: File,
  cropArea: CropBox | { x: number; y: number; width: number; height: number },
  options: {
    format?: string;
    quality?: number;
  } = {}
): Promise<CropResult> {
  const img = await loadImageFromFile(file);
  const format = options.format || file.type || "image/jpeg";
  const quality = (options.quality ?? 95) / 100;

  const naturalW = img.naturalWidth || img.width;
  const naturalH = img.naturalHeight || img.height;

  const rawW = "w" in cropArea && cropArea.w !== undefined ? cropArea.w : (cropArea as any).width ?? naturalW;
  const rawH = "h" in cropArea && cropArea.h !== undefined ? cropArea.h : (cropArea as any).height ?? naturalH;

  const isPercent =
    ("isPercentage" in cropArea && cropArea.isPercentage !== undefined)
      ? cropArea.isPercentage
      : ("w" in cropArea || (cropArea.x <= 100 && cropArea.y <= 100 && rawW <= 100 && rawH <= 100));

  const pixelX = isPercent ? (cropArea.x / 100) * naturalW : cropArea.x;
  const pixelY = isPercent ? (cropArea.y / 100) * naturalH : cropArea.y;
  const pixelW = Math.max(1, Math.round(isPercent ? (rawW / 100) * naturalW : rawW));
  const pixelH = Math.max(1, Math.round(isPercent ? (rawH / 100) * naturalH : rawH));

  const canvas = document.createElement("canvas");
  canvas.width = pixelW;
  canvas.height = pixelH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create canvas context.");

  if (format === "image/jpeg") {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(
    img,
    pixelX,
    pixelY,
    pixelW,
    pixelH,
    0,
    0,
    canvas.width,
    canvas.height
  );

  const blob = await canvasToBlob(canvas, format, quality);
  return {
    blob,
    url: URL.createObjectURL(blob),
    width: canvas.width,
    height: canvas.height,
    size: blob.size,
  };
}

/**
 * Calculates Greatest Common Divisor for Aspect Ratios
 */
export function calculateGCD(a: number, b: number): number {
  return b === 0 ? a : calculateGCD(b, a % b);
}

export function getAspectRatioString(width: number, height: number): string {
  if (!width || !height) return "1:1";
  const gcd = calculateGCD(Math.round(width), Math.round(height));
  const rW = Math.round(width) / gcd;
  const rH = Math.round(height) / gcd;

  // Standard checks for common floating ratios like 16:9 (1.777), 4:3 (1.333), 3:2 (1.5)
  const ratio = width / height;
  if (Math.abs(ratio - 16 / 9) < 0.02) return "16:9";
  if (Math.abs(ratio - 4 / 3) < 0.02) return "4:3";
  if (Math.abs(ratio - 3 / 2) < 0.02) return "3:2";
  if (Math.abs(ratio - 1) < 0.01) return "1:1";
  if (Math.abs(ratio - 9 / 16) < 0.02) return "9:16";

  if (rW > 100 || rH > 100) {
    return `${(width / height).toFixed(2)}:1`;
  }
  return `${rW}:${rH}`;
}
