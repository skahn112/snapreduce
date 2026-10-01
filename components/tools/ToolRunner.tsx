"use client";

import { ToolItem } from "@/data/tools";
import { TargetSizeCompressor } from "./TargetSizeCompressor";
import { ImageResizerTool } from "./ImageResizerTool";
import { ImageConverterTool } from "./ImageConverterTool";
import { ImageCropperTool } from "./ImageCropperTool";
import { AspectRatioCalculatorTool } from "./AspectRatioCalculatorTool";
import { DimensionsCalculatorTool } from "./DimensionsCalculatorTool";
import { DpiCalculatorTool } from "./DpiCalculatorTool";

interface ToolRunnerProps {
  tool: ToolItem;
}

export function ToolRunner({ tool }: ToolRunnerProps) {
  switch (tool.toolType) {
    case "resizer":
      return <ImageResizerTool />;

    case "converter":
      return (
        <ImageConverterTool
          targetMimeType={tool.targetFormat || "image/jpeg"}
          headline={tool.h1}
          sourceFormatHint={
            tool.slug.startsWith("heic")
              ? "Apple HEIC"
              : tool.slug.startsWith("png")
              ? "PNG"
              : tool.slug.startsWith("webp")
              ? "WebP"
              : "JPG"
          }
        />
      );

    case "cropper":
      return <ImageCropperTool />;

    case "calculator-ratio":
      return <AspectRatioCalculatorTool />;

    case "calculator-dimensions":
      return <DimensionsCalculatorTool />;

    case "calculator-dpi":
      return <DpiCalculatorTool />;

    case "compressor":
    default:
      return (
        <TargetSizeCompressor
          initialTargetKB={tool.defaultTargetKB ?? 100}
          initialFormat={tool.defaultFormat}
          isJpgOnly={tool.slug.includes("jpg") && !tool.slug.includes("to-")}
          isPngOnly={tool.slug.includes("png") && !tool.slug.includes("to-")}
          headline={tool.h1}
        />
      );
  }
}
