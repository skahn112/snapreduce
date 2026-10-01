export interface ToolStep {
  step: number;
  title: string;
  description: string;
}

export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface RelatedLink {
  name: string;
  path: string;
  description: string;
}

export interface ToolItem {
  id: string;
  slug: string;
  path: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  category: "compress" | "resize" | "convert" | "utilities" | "exact-size";
  categoryName: string;
  badge?: string;
  toolType:
    | "compressor"
    | "resizer"
    | "converter"
    | "cropper"
    | "calculator-ratio"
    | "calculator-dimensions"
    | "calculator-dpi";
  defaultTargetKB?: number;
  defaultFormat?: "image/jpeg" | "image/png" | "image/webp";
  targetFormat?: "image/jpeg" | "image/png" | "image/webp";
  intro: string;
  explanation: string;
  tradeoffExplanation: string;
  howToSteps: ToolStep[];
  faqs: ToolFAQ[];
  relatedToolSlugs: string[];
  relatedArticleSlugs: string[];
}

export const TOOLS: ToolItem[] = [
  // ==========================================
  // CORE TOOLS (/tools/...)
  // ==========================================
  {
    id: "image-compressor",
    slug: "image-compressor",
    path: "/tools/image-compressor/",
    h1: "Free Online Image Compressor",
    seoTitle: "Image Compressor – Compress JPG, PNG & WebP Online for Free",
    metaDescription:
      "Compress your JPG, PNG, and WebP images online without losing visual quality. Choose target file sizes or custom compression levels with 100% private browser processing.",
    category: "compress",
    categoryName: "Image Compression",
    badge: "Most Popular",
    toolType: "compressor",
    defaultTargetKB: 100,
    defaultFormat: "image/jpeg",
    intro:
      "SnapReduce's all-in-one Image Compressor helps you shrink heavy digital images into lightweight, web-optimized files in seconds. Whether you need to meet strict upload limits on job portals, accelerate your website load speed, or fit high-resolution photos into email attachments, our intelligent compression engine analyzes each image locally inside your web browser.",
    explanation:
      "Image compression operates by balancing visual perception against data density. JPEG and WebP algorithms eliminate redundant color information imperceptible to the human eye (chroma subsampling and discrete cosine transform quantization). Our engine runs an iterative binary search directly in your browser's canvas to reach your desired target size while preserving maximum sharpness and color fidelity.",
    tradeoffExplanation:
      "When aiming for aggressive reductions (such as turning a 5MB DSLR photograph into an 80KB thumbnail), quality compression alone may reach a floor where compression artifacts like blocking or banding become noticeable. If that threshold is encountered, our algorithm dynamically balances subtle dimension scaling with JPEG encoding to maintain clean edges rather than muddy textures.",
    howToSteps: [
      {
        step: 1,
        title: "Upload Your Image",
        description:
          "Drag and drop any JPG, PNG, or WebP photo into the upload box or browse from your desktop or phone storage.",
      },
      {
        step: 2,
        title: "Choose Target Size or Quality",
        description:
          "Select a standard preset (50KB, 100KB, 200KB, 500KB) or enter your exact custom target size in kilobytes.",
      },
      {
        step: 3,
        title: "Automatic Instant Optimization",
        description:
          "The engine runs locally inside your browser, balancing quantization and dimensions to meet your target.",
      },
      {
        step: 4,
        title: "Preview & Download",
        description:
          "Inspect the live side-by-side comparison, check the exact bytes saved, and download your optimized image.",
      },
    ],
    faqs: [
      {
        question: "Does compressing images reduce their visual quality?",
        answer:
          "Moderate compression removes redundant data that the human eye cannot discern, keeping your photo visually sharp. Severe compression (e.g. shrinking 10MB down to 50KB) requires subtle downscaling and quantization, which our engine balances to keep the output crisp.",
      },
      {
        question: "Are my images uploaded to any remote server?",
        answer:
          "No. All image reading, canvas rendering, and blob compression occur strictly within your browser's memory. Your personal photos never leave your device.",
      },
      {
        question: "What image formats are supported?",
        answer:
          "The compressor supports JPG, JPEG, PNG, WebP, and common mobile camera exports.",
      },
      {
        question: "Can I compress multiple images consecutively?",
        answer:
          "Yes! You can process an image, download it, and immediately click 'Compress Another Image' without page reloads or usage limits.",
      },
    ],
    relatedToolSlugs: [
      "compress-jpg-to-100kb",
      "compress-jpg-to-200kb",
      "image-resizer",
      "jpg-to-webp",
    ],
    relatedArticleSlugs: [
      "how-to-compress-a-jpg-to-100kb",
      "how-to-reduce-jpg-file-size-without-losing-too-much-quality",
      "jpeg-compression-explained",
      "jpeg-quality-vs-file-size",
    ],
  },
  {
    id: "jpg-compressor",
    slug: "jpg-compressor",
    path: "/tools/jpg-compressor/",
    h1: "Online JPG Compressor",
    seoTitle: "JPG Compressor – Reduce JPEG & JPG File Size Online",
    metaDescription:
      "Compress JPG and JPEG photos online. Fine-tune compression quality or set an exact target size in KB with private, instantaneous browser processing.",
    category: "compress",
    categoryName: "Image Compression",
    badge: "Fast & Lossy",
    toolType: "compressor",
    defaultTargetKB: 150,
    defaultFormat: "image/jpeg",
    intro:
      "Optimize JPG and JPEG images with surgical precision. Note that JPG and JPEG refer to the exact same image format—the three-letter extension was originally popularized by legacy MS-DOS file limits. SnapReduce lets you specify exact target kilobyte constraints or adjust perceptual quality sliders.",
    explanation:
      "JPG files use lossy Discrete Cosine Transform (DCT) compression. High-frequency image details (such as subtle grain or imperceptible gradients) are compressed first. Our browser-based JPG compressor iterates across encoding matrices to pinpoint the exact quality percentage that fits under your designated file boundary.",
    tradeoffExplanation:
      "Because JPEG compression is irreversible, repeatedly re-saving a JPG can compound compression artifacts. Our tool always takes your original pristine upload and encodes the final result in a single clean pass.",
    howToSteps: [
      {
        step: 1,
        title: "Select Your JPG File",
        description: "Upload any .jpg or .jpeg image from your computer or smartphone.",
      },
      {
        step: 2,
        title: "Adjust Target Size",
        description: "Specify your desired file size in KB or pick standard web presets.",
      },
      {
        step: 3,
        title: "Verify the Dimensions",
        description: "See original and resulting resolution before finalizing.",
      },
      {
        step: 4,
        title: "Save Output",
        description: "Click Download to save the compressed JPG to your device.",
      },
    ],
    faqs: [
      {
        question: "Is there any difference between JPG and JPEG?",
        answer:
          "None at all. They are identical file formats that adhere to the Joint Photographic Experts Group standard. Both use the same compression mechanisms and file structures.",
      },
      {
        question: "How do I compress a JPG for an official government application?",
        answer:
          "Most government and visa portals stipulate maximum file sizes like 100KB or 200KB. Use our target size feature, set the exact limit, and download the verified file.",
      },
      {
        question: "Will the EXIF metadata be stripped?",
        answer:
          "Yes. Canvas-based re-encoding strips bloated camera metadata, GPS tags, and thumbnail caches, which saves substantial kilobytes and guards your privacy.",
      },
    ],
    relatedToolSlugs: [
      "compress-jpg-to-100kb",
      "compress-jpg-to-200kb",
      "compress-jpg-to-500kb",
      "photo-size-reducer",
    ],
    relatedArticleSlugs: [
      "jpg-vs-jpeg-whats-the-difference",
      "why-are-jpeg-files-so-large",
      "what-is-jpeg-compression-and-how-does-it-work",
    ],
  },
  {
    id: "png-compressor",
    slug: "png-compressor",
    path: "/tools/png-compressor/",
    h1: "Online PNG Compressor",
    seoTitle: "PNG Compressor – Compress PNG Images Online with Transparency",
    metaDescription:
      "Compress PNG images while retaining crisp text and transparent backgrounds. Reduce PNG file sizes with smart browser-based canvas optimization.",
    category: "compress",
    categoryName: "Image Compression",
    badge: "Lossless / Smart",
    toolType: "compressor",
    defaultTargetKB: 100,
    defaultFormat: "image/png",
    intro:
      "PNG images deliver exceptional clarity for logos, screenshots, UI mockups, and graphics requiring alpha transparency. However, raw PNG files are frequently huge because they rely on lossless DEFLATE compression. SnapReduce optimizes PNGs directly in your browser.",
    explanation:
      "True PNG compression is lossless, which means color data is mathematically preserved. When an ultra-low target size (e.g. 50KB for a 4K graphic) cannot be met purely through lossless compression, our tool clearly informs you and offers dimension downscaling or WebP conversion (which supports both alpha transparency and lossy compression).",
    tradeoffExplanation:
      "If your graphic has a transparent background, keeping it as PNG or converting to WebP preserves transparency. Converting a transparent PNG to JPG will replace alpha channels with a solid background color (default white).",
    howToSteps: [
      {
        step: 1,
        title: "Upload PNG Graphic",
        description: "Select your PNG file with or without alpha transparency.",
      },
      {
        step: 2,
        title: "Select Target Size",
        description: "Choose a target size or maintain original resolution.",
      },
      {
        step: 3,
        title: "Review Transparency",
        description: "Preview confirms transparent channels are maintained intact.",
      },
      {
        step: 4,
        title: "Download PNG",
        description: "Save your optimized lightweight PNG file.",
      },
    ],
    faqs: [
      {
        question: "Does this PNG compressor keep transparent backgrounds?",
        answer:
          "Yes! When compressing as PNG, transparency is fully preserved. If you convert to JPG, transparent areas are filled with white.",
      },
      {
        question: "Why are PNG files larger than JPGs?",
        answer:
          "PNG is a lossless format designed to preserve exact pixel values and sharp edges, making it ideal for text and graphics but less efficient for complex photographic textures.",
      },
      {
        question: "Can I convert a PNG to WebP to get even smaller files?",
        answer:
          "Yes. WebP supports transparent alpha channels just like PNG, but offers lossy compression that can cut file size by up to 70% with negligible visual change.",
      },
    ],
    relatedToolSlugs: [
      "compress-png-to-100kb",
      "png-to-jpg",
      "jpg-to-webp",
      "image-compressor",
    ],
    relatedArticleSlugs: [
      "how-to-compress-a-png-to-100kb",
      "jpg-vs-png",
      "webp-vs-jpg",
    ],
  },
  {
    id: "image-resizer",
    slug: "image-resizer",
    path: "/tools/image-resizer/",
    h1: "Resize Images Online",
    seoTitle: "Image Resizer – Change Width, Height & Resolution Online",
    metaDescription:
      "Resize image dimensions online for free. Adjust width, height, lock aspect ratio, or scale by percentage with instant high-quality canvas rendering.",
    category: "resize",
    categoryName: "Resizing & Dimensions",
    badge: "Precision Sizing",
    toolType: "resizer",
    intro:
      "Need to fit an image into strict pixel dimensions for an Instagram post, YouTube banner, passport application, or website hero? SnapReduce's Image Resizer gives you total control over width, height, and scaling percentage with an automatic aspect ratio lock.",
    explanation:
      "Resizing alters the pixel matrix of an image using bicubic interpolation. Downsampling decreases the total pixel count, drastically lowering the raw byte footprint while keeping the image crisp at its intended display dimensions. Upsampling mathematically interpolates neighboring pixels.",
    tradeoffExplanation:
      "Scaling an image down enhances perceived sharpness on web displays. Conversely, upscaling a tiny 200x200 pixel icon into a 2000x2000 banner will inevitably result in soft or blurry edges due to the lack of original pixel information.",
    howToSteps: [
      {
        step: 1,
        title: "Load Image File",
        description: "Upload any JPG, PNG, or WebP photo into the resizer.",
      },
      {
        step: 2,
        title: "Set Dimensions",
        description:
          "Type in your target width or height in pixels, or use quick percentage presets (25%, 50%, 75%).",
      },
      {
        step: 3,
        title: "Toggle Aspect Ratio",
        description:
          "Keep the lock enabled to prevent stretching or distortion, or unlock for custom rectangular bounds.",
      },
      {
        step: 4,
        title: "Download Resized Photo",
        description: "Download the resized image in your preferred format.",
      },
    ],
    faqs: [
      {
        question: "What does 'Lock Aspect Ratio' mean?",
        answer:
          "Locking aspect ratio ensures that when you adjust the width, the height scales proportionally (and vice versa), preventing your image from looking squished or stretched.",
      },
      {
        question: "Does reducing dimensions also reduce file size in KB?",
        answer:
          "Yes, substantially. Because file size correlates with total pixel count, cutting dimensions in half reduces total pixels by 75%, yielding massive file size savings.",
      },
      {
        question: "Can I resize an image on my iPhone or Android device?",
        answer:
          "Yes! SnapReduce works seamlessly on mobile browsers with responsive controls and touch-friendly sliders.",
      },
    ],
    relatedToolSlugs: [
      "image-size-converter",
      "photo-size-reducer",
      "image-cropper",
      "aspect-ratio-calculator",
    ],
    relatedArticleSlugs: [
      "how-to-resize-an-image-to-an-exact-size-in-kb",
      "what-is-image-resolution",
      "how-to-reduce-image-file-size-for-websites",
    ],
  },
  {
    id: "image-size-converter",
    slug: "image-size-converter",
    path: "/tools/image-size-converter/",
    h1: "Image Size Converter",
    seoTitle: "Image Size Converter – Convert Image Dimensions and File Size",
    metaDescription:
      "Convert image size in KB, MB, and pixel dimensions simultaneously. Differentiate between file weight and canvas dimensions with clear, actionable controls.",
    category: "resize",
    categoryName: "Resizing & Dimensions",
    badge: "Dual Conversion",
    toolType: "resizer",
    intro:
      "People frequently say 'image size' to describe two different things: pixel dimensions (e.g. 1920x1080) and file storage weight (e.g. 2.4 MB). Our Image Size Converter clarifies both concepts and lets you adjust physical pixels and digital file weight in one cohesive workstation.",
    explanation:
      "An uncompressed 1080p image contains over 2 million pixels. Each pixel stores Red, Green, Blue, and sometimes Alpha channels. The Image Size Converter lets you scale down pixel density while tuning encoding compression to reach both your exact pixel boundaries and storage criteria.",
    tradeoffExplanation:
      "Meeting an upload specification that requires both 'under 200KB' and 'exactly 600x600 pixels' requires setting the dimensions first, then adjusting the compression ratio. SnapReduce automates this exact workflow.",
    howToSteps: [
      {
        step: 1,
        title: "Upload Image",
        description: "Select your image to view its current pixel dimensions and file size in KB.",
      },
      {
        step: 2,
        title: "Adjust Dimensions",
        description: "Set your target width and height in pixels or percentage.",
      },
      {
        step: 3,
        title: "Set File Size Target",
        description: "Choose an upper file boundary in KB to ensure compliance with upload forms.",
      },
      {
        step: 4,
        title: "Download",
        description: "Save your freshly converted, perfectly sized image.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between image dimensions and image file size?",
        answer:
          "Dimensions measure physical width and height in pixels (e.g. 1200 x 800 px). File size measures the storage space on a disk or memory in kilobytes or megabytes (e.g. 150 KB).",
      },
      {
        question: "Why did my file size decrease after changing dimensions?",
        answer:
          "Reducing dimensions decreases the total number of pixels that must be encoded, automatically shrinking the final file weight.",
      },
    ],
    relatedToolSlugs: [
      "image-resizer",
      "photo-size-reducer",
      "image-dimensions-calculator",
      "compress-image-to-200kb",
    ],
    relatedArticleSlugs: [
      "what-image-file-size-should-you-use-for-online-uploads",
      "what-is-image-resolution",
    ],
  },
  {
    id: "photo-size-reducer",
    slug: "photo-size-reducer",
    path: "/tools/photo-size-reducer/",
    h1: "Reduce Photo Size Online",
    seoTitle: "Photo Size Reducer – Shrink Camera & Phone Photos Online",
    metaDescription:
      "Easily reduce photo size for online forms, email, and social media. Shrink large camera and mobile pictures into small, upload-ready files.",
    category: "compress",
    categoryName: "Image Compression",
    badge: "Everyday Use",
    toolType: "compressor",
    defaultTargetKB: 200,
    defaultFormat: "image/jpeg",
    intro:
      "Modern smartphones and digital cameras capture stunning photos with 12MP to 48MP sensors, resulting in files between 4MB and 25MB. When attempting to attach these photos to job portals, visa applications, school forms, or emails, uploads frequently fail due to file size limits. SnapReduce quickly reduces photo weight for effortless sharing.",
    explanation:
      "Photos contain immense tonal variations and microscopic sensor noise. By applying intelligent chroma subsampling and adaptive quantization matrices, our Photo Size Reducer trims invisible overhead without turning your photo into a blurry mess.",
    tradeoffExplanation:
      "For mobile photos, the biggest culprit of excessive file size is unnecessarily high resolution (like 4032x3024 pixels for a simple document submission). Reducing resolution to standard HD (1920x1080) cuts 80% of file size before any visual compression is even applied.",
    howToSteps: [
      {
        step: 1,
        title: "Choose Photo",
        description: "Pick a photo taken with your iPhone, Android, or digital camera.",
      },
      {
        step: 2,
        title: "Select Form / Upload Limit",
        description: "Select typical thresholds like 100KB, 200KB, or 500KB.",
      },
      {
        step: 3,
        title: "Instant In-Browser Reduction",
        description: "Watch your 5MB photo shrink to less than 200KB in under one second.",
      },
      {
        step: 4,
        title: "Download & Submit",
        description: "Download your file and submit your application with confidence.",
      },
    ],
    faqs: [
      {
        question: "Can I reduce photo size directly on my smartphone?",
        answer:
          "Yes! SnapReduce operates on all modern mobile browsers including Safari for iOS and Chrome for Android without requiring any app installations.",
      },
      {
        question: "Why do job and government forms have strict photo size limits?",
        answer:
          "Government databases and portal servers host millions of applicant records. Strict limits (like 100KB or 200KB) conserve server storage and ensure fast database retrieval.",
      },
    ],
    relatedToolSlugs: [
      "compress-image-to-100kb",
      "compress-passport-photo-to-100kb",
      "reduce-image-size-to-100kb",
      "image-resizer",
    ],
    relatedArticleSlugs: [
      "how-to-reduce-photo-size-online",
      "how-to-compress-images-for-online-forms",
      "how-to-reduce-image-size-on-iphone",
      "how-to-compress-jpeg-images-on-android",
    ],
  },
  {
    id: "jpg-to-png",
    slug: "jpg-to-png",
    path: "/tools/jpg-to-png/",
    h1: "Convert JPG to PNG Online",
    seoTitle: "JPG to PNG Converter – Convert JPG Images to PNG Format",
    metaDescription:
      "Convert JPG and JPEG files to high-quality PNG format online. Fast, free, browser-based conversion with lossless rendering.",
    category: "convert",
    categoryName: "Format Conversion",
    badge: "Format Shift",
    toolType: "converter",
    targetFormat: "image/png",
    intro:
      "Convert your JPG photos and graphics into PNG format quickly and effortlessly. PNG is the preferred format for digital illustration, diagrams, software UI assets, and archival graphics where edge sharpness and lossless storage are required.",
    explanation:
      "When a JPG is rendered to a canvas and exported as a PNG, the lossy JPEG compression artifacts are frozen and wrapped in a lossless PNG container. This prevents any further generational degradation if you plan to edit the file repeatedly in graphic design software.",
    tradeoffExplanation:
      "Converting a JPG to PNG will not magically restore original details lost during prior JPEG compression, and the resulting PNG will typically have a larger file size than the source JPG because PNG encoding is lossless.",
    howToSteps: [
      {
        step: 1,
        title: "Upload JPG",
        description: "Select your JPG or JPEG file.",
      },
      {
        step: 2,
        title: "Process Conversion",
        description: "Click convert to render the image to the lossless PNG format.",
      },
      {
        step: 3,
        title: "Download PNG",
        description: "Save your newly generated PNG file to your storage.",
      },
    ],
    faqs: [
      {
        question: "Does converting JPG to PNG create transparency?",
        answer:
          "No. A standard JPG file does not contain an alpha transparency channel. To make the background transparent, you would need to use background removal software.",
      },
      {
        question: "Why is the converted PNG file larger than the JPG?",
        answer:
          "PNG uses lossless compression algorithms (DEFLATE). It records full pixel values without discarding color nuances, leading to higher file size for photographs.",
      },
    ],
    relatedToolSlugs: ["png-to-jpg", "jpg-to-webp", "image-compressor"],
    relatedArticleSlugs: ["jpg-vs-png", "webp-vs-jpg"],
  },
  {
    id: "png-to-jpg",
    slug: "png-to-jpg",
    path: "/tools/png-to-jpg/",
    h1: "Convert PNG to JPG Online",
    seoTitle: "PNG to JPG Converter – Convert PNG to JPEG Online",
    metaDescription:
      "Convert PNG graphics and transparent images to JPG online. Replace transparency with a clean white background and reduce file size.",
    category: "convert",
    categoryName: "Format Conversion",
    badge: "Size Saver",
    toolType: "converter",
    targetFormat: "image/jpeg",
    intro:
      "Convert hefty PNG files into lightweight, universally compatible JPG images. Ideal for sharing screenshots, social media uploads, and dramatically trimming down website storage.",
    explanation:
      "PNG images store lossless color and alpha transparency channels. When converting to JPG, which does not support transparency, our converter automatically fills transparent areas with a clean, solid white background before applying standard JPEG compression.",
    tradeoffExplanation:
      "If your original PNG features text or logos on a transparent background, the output JPG will have a solid white background. If you need transparency alongside small file sizes, consider converting to WebP instead.",
    howToSteps: [
      {
        step: 1,
        title: "Upload PNG",
        description: "Select any PNG image from your device.",
      },
      {
        step: 2,
        title: "Instant Conversion",
        description: "The browser engine converts channels and replaces transparency with white.",
      },
      {
        step: 3,
        title: "Download JPG",
        description: "Download your compressed, web-ready JPG file.",
      },
    ],
    faqs: [
      {
        question: "What happens to the transparent background in my PNG?",
        answer:
          "Because JPEG does not support transparency, transparent areas are automatically rendered with a clean white background.",
      },
      {
        question: "How much file size do I save by converting PNG to JPG?",
        answer:
          "For photographs and complex graphics, converting PNG to JPG typically reduces file size by 60% to 85%.",
      },
    ],
    relatedToolSlugs: ["jpg-to-png", "png-compressor", "jpg-to-webp"],
    relatedArticleSlugs: ["jpg-vs-png", "how-to-compress-a-png-to-100kb"],
  },
  {
    id: "jpg-to-webp",
    slug: "jpg-to-webp",
    path: "/tools/jpg-to-webp/",
    h1: "Convert JPG to WebP Online",
    seoTitle: "JPG to WebP Converter – Convert JPEG to Modern WebP Format",
    metaDescription:
      "Convert JPG images to modern WebP format online. Reduce image file sizes by up to 35% compared to JPEG while preserving identical visual fidelity.",
    category: "convert",
    categoryName: "Format Conversion",
    badge: "Next-Gen Format",
    toolType: "converter",
    targetFormat: "image/webp",
    intro:
      "WebP is Google's modern image format designed specifically for the web. Converting your JPG photos to WebP allows web pages to load faster, consume less mobile bandwidth, and rank higher on Google PageSpeed Insights.",
    explanation:
      "WebP uses predictive coding (similar to VP8 video keyframes) to predict pixel values based on neighboring blocks, followed by variable-length entropy coding. This yields file sizes 25% to 35% smaller than comparable quality JPEGs.",
    tradeoffExplanation:
      "WebP is supported by over 97% of modern browsers (Chrome, Safari, Firefox, Edge). For legacy systems (like Windows XP or Photoshop CS6 without plugins), you may occasionally need to convert back to JPG.",
    howToSteps: [
      {
        step: 1,
        title: "Upload JPG",
        description: "Drag and drop any JPG image into the converter.",
      },
      {
        step: 2,
        title: "Convert to WebP",
        description: "The browser encodes the image using modern WebP canvas routines.",
      },
      {
        step: 3,
        title: "Download WebP",
        description: "Save your ultra-compact, high-performance WebP graphic.",
      },
    ],
    faqs: [
      {
        question: "Is WebP supported on all devices?",
        answer:
          "Yes, all modern versions of iOS, Android, macOS, Windows, Chrome, Safari, and Firefox support WebP natively.",
      },
      {
        question: "Will converting to WebP boost my website SEO?",
        answer:
          "Yes. Faster page loading directly enhances Core Web Vitals (Largest Contentful Paint - LCP), which is an established Google ranking signal.",
      },
    ],
    relatedToolSlugs: ["webp-to-jpg", "jpg-compressor", "image-compressor"],
    relatedArticleSlugs: ["webp-vs-jpg", "how-to-reduce-image-file-size-for-websites"],
  },
  {
    id: "webp-to-jpg",
    slug: "webp-to-jpg",
    path: "/tools/webp-to-jpg/",
    h1: "Convert WebP to JPG Online",
    seoTitle: "WebP to JPG Converter – Convert WebP to JPEG Online for Free",
    metaDescription:
      "Convert WebP images downloaded from websites into standard JPG format. Free, private, and compatible with all desktop and mobile software.",
    category: "convert",
    categoryName: "Format Conversion",
    badge: "Universal Compatibility",
    toolType: "converter",
    targetFormat: "image/jpeg",
    intro:
      "Ever downloaded an image from the web only to find it saved as a '.webp' file that your desktop software, video editor, or email client refuses to open? SnapReduce instantly converts WebP images into standard JPGs.",
    explanation:
      "Our WebP to JPG converter decodes the WebP bitstream in your browser and re-encodes it into an universally accepted JPEG container, ensuring complete compatibility with legacy photo editors, printing services, and office suites.",
    tradeoffExplanation:
      "If the source WebP file contains transparency, converting to JPG will replace the transparent background with solid white. If transparency is required, convert to PNG instead.",
    howToSteps: [
      {
        step: 1,
        title: "Upload WebP File",
        description: "Select the .webp image you downloaded from the internet.",
      },
      {
        step: 2,
        title: "Instant Conversion",
        description: "Convert WebP to universal JPG in milliseconds.",
      },
      {
        step: 3,
        title: "Download JPG",
        description: "Open and edit your JPG in any application without compatibility errors.",
      },
    ],
    faqs: [
      {
        question: "Why won't my software open WebP files?",
        answer:
          "Older photo viewers and document editors like Word or legacy Photoshop were built before WebP was standardized, requiring conversion to JPG.",
      },
      {
        question: "Is conversion quality preserved?",
        answer:
          "Yes. We encode the output JPG at a high quality factor (92%) to prevent discernible compression degradation.",
      },
    ],
    relatedToolSlugs: ["jpg-to-webp", "png-to-jpg", "jpg-compressor"],
    relatedArticleSlugs: ["webp-vs-jpg", "jpg-vs-jpeg-whats-the-difference"],
  },
  {
    id: "heic-to-jpg",
    slug: "heic-to-jpg",
    path: "/tools/heic-to-jpg/",
    h1: "Convert HEIC to JPG Online",
    seoTitle: "HEIC to JPG Converter – Convert Apple iPhone Photos to JPEG",
    metaDescription:
      "Convert iPhone HEIC photos to standard JPG format online. Fast, secure, and processed client-side without uploading personal photos to a server.",
    category: "convert",
    categoryName: "Format Conversion",
    badge: "Apple Photos",
    toolType: "converter",
    targetFormat: "image/jpeg",
    intro:
      "Apple iPhones capture photos in High Efficiency Image Container (HEIC) format by default to save storage. However, Windows PCs, government upload forms, and non-Apple devices frequently fail to open .heic files. SnapReduce converts HEIC to standard JPG directly on your computer or phone.",
    explanation:
      "HEIC uses the High Efficiency Video Coding (HEVC) compression standard. Our client-side conversion engine loads the WebAssembly decoder in your browser to unpack the HEIC payload and re-encode it into standard JPEG without transmitting your private photos over the internet.",
    tradeoffExplanation:
      "HEIC files are technically superior in file-to-quality ratio compared to JPEG. Converting HEIC to JPG may result in a slightly larger file size in order to preserve the original visual clarity in the older JPEG format.",
    howToSteps: [
      {
        step: 1,
        title: "Select HEIC Photo",
        description: "Upload any .heic photo captured with an iPhone or iPad.",
      },
      {
        step: 2,
        title: "Browser WebAssembly Conversion",
        description: "The file is decoded and converted securely on your local device.",
      },
      {
        step: 3,
        title: "Download Standard JPG",
        description: "Save your universally viewable JPG photo.",
      },
    ],
    faqs: [
      {
        question: "What is a HEIC file?",
        answer:
          "HEIC (High Efficiency Image Container) is the default image format used by Apple devices running iOS 11 and later, offering better compression than JPEG.",
      },
      {
        question: "Why can't my Windows PC open my iPhone photos?",
        answer:
          "Windows does not bundle native HEIC codecs out of the box. Converting your files to JPG resolves this compatibility barrier immediately.",
      },
      {
        question: "Is my personal photo uploaded to a cloud server?",
        answer:
          "No. All HEIC decoding takes place in your browser memory via WebAssembly.",
      },
    ],
    relatedToolSlugs: ["heic-to-png", "photo-size-reducer", "jpg-compressor"],
    relatedArticleSlugs: [
      "how-to-reduce-image-size-on-iphone",
      "jpg-vs-jpeg-whats-the-difference",
    ],
  },
  {
    id: "heic-to-png",
    slug: "heic-to-png",
    path: "/tools/heic-to-png/",
    h1: "Convert HEIC to PNG Online",
    seoTitle: "HEIC to PNG Converter – Convert Apple Photos to Lossless PNG",
    metaDescription:
      "Convert iPhone and iPad HEIC photos into high-definition PNG format online. Keep transparency and crisp details with private browser conversion.",
    category: "convert",
    categoryName: "Format Conversion",
    badge: "Apple Photos",
    toolType: "converter",
    targetFormat: "image/png",
    intro:
      "Convert your Apple HEIC images into uncompressed, high-definition PNG format. Ideal when you need to bring mobile photos into desktop graphic editors, web development projects, or print design workflows.",
    explanation:
      "HEIC images are decoded locally using client-side WebAssembly routines and exported directly into a lossless 24-bit/32-bit PNG canvas stream.",
    tradeoffExplanation:
      "Because PNG is a lossless format, the converted file will typically be significantly larger than the original compact HEIC file.",
    howToSteps: [
      {
        step: 1,
        title: "Upload HEIC",
        description: "Select your Apple HEIC photo.",
      },
      {
        step: 2,
        title: "Convert to PNG",
        description: "Process the image locally with zero quality loss.",
      },
      {
        step: 3,
        title: "Download PNG",
        description: "Save your high-res PNG file.",
      },
    ],
    faqs: [
      {
        question: "Why should I convert HEIC to PNG instead of JPG?",
        answer:
          "Choose PNG if you plan to edit the image further in graphic design software like Photoshop, Figma, or Illustrator to avoid generational lossy compression.",
      },
    ],
    relatedToolSlugs: ["heic-to-jpg", "png-compressor", "png-to-jpg"],
    relatedArticleSlugs: ["jpg-vs-png", "how-to-reduce-image-size-on-iphone"],
  },
  {
    id: "image-cropper",
    slug: "image-cropper",
    path: "/tools/image-cropper/",
    h1: "Crop Image Online",
    seoTitle: "Image Cropper – Crop Photos to Custom and Standard Aspect Ratios",
    metaDescription:
      "Crop photos online for free. Use presets for square (1:1), 4:3, 16:9, or passport dimensions, with instant browser-based preview and download.",
    category: "utilities",
    categoryName: "Image Utilities",
    badge: "Composition",
    toolType: "cropper",
    intro:
      "Cut away unwanted backgrounds, adjust framing, or prepare headshots for passports and profile pictures with SnapReduce's interactive Image Cropper. Select standard aspect ratios or freely drag boundaries.",
    explanation:
      "Cropping extracts a designated coordinate window (x, y, width, height) from the source image. Trimming excess border areas also reduces overall pixel count and final file weight.",
    tradeoffExplanation:
      "Cropping permanently removes pixel data outside the selection box. Our tool always operates non-destructively in memory, allowing you to reposition the crop box until you are completely satisfied.",
    howToSteps: [
      {
        step: 1,
        title: "Upload Photo",
        description: "Select the photo you want to crop.",
      },
      {
        step: 2,
        title: "Adjust Crop Box",
        description: "Pick a ratio preset (1:1, 4:3, 16:9) or drag the crop box to frame your subject.",
      },
      {
        step: 3,
        title: "Preview & Download",
        description: "Inspect the final cropped result and download.",
      },
    ],
    faqs: [
      {
        question: "Can I crop a photo for a passport application?",
        answer:
          "Yes! Select the 1:1 or 35x45mm preset to frame your facial headshot centered according to official visa and passport standards.",
      },
    ],
    relatedToolSlugs: [
      "compress-passport-photo-to-100kb",
      "aspect-ratio-calculator",
      "image-resizer",
    ],
    relatedArticleSlugs: [
      "how-to-compress-a-passport-photo-to-100kb",
      "what-is-image-resolution",
    ],
  },
  {
    id: "aspect-ratio-calculator",
    slug: "aspect-ratio-calculator",
    path: "/tools/aspect-ratio-calculator/",
    h1: "Aspect Ratio Calculator",
    seoTitle: "Aspect Ratio Calculator – Calculate Dimensions & Ratios Online",
    metaDescription:
      "Calculate image aspect ratios (16:9, 4:3, 1:1, 21:9) and compute proportional width and height dimensions instantly.",
    category: "utilities",
    categoryName: "Image Utilities",
    badge: "Geometry",
    toolType: "calculator-ratio",
    intro:
      "Calculate the proportional relationship between image width and height. Determine exact pixel dimensions when scaling images for video thumbnails, responsive web banners, or print photography.",
    explanation:
      "An aspect ratio represents the proportional relationship between width and height, expressed as two numbers separated by a colon (e.g. 16:9). Knowing this ratio prevents unnatural stretching or distortion when displaying imagery on different screens.",
    tradeoffExplanation:
      "Displaying a 4:3 photo on a 16:9 display requires either letterboxing (black bars on the sides) or cropping the top and bottom of the frame.",
    howToSteps: [
      {
        step: 1,
        title: "Enter Original Dimensions",
        description: "Type in your current width and height in pixels.",
      },
      {
        step: 2,
        title: "View Reduced Ratio",
        description: "See the simplified ratio (e.g. 1920x1080 simplified to 16:9).",
      },
      {
        step: 3,
        title: "Compute New Dimensions",
        description:
          "Enter a new desired width or height to automatically calculate the corresponding proportional dimension.",
      },
    ],
    faqs: [
      {
        question: "What is the standard aspect ratio for social media?",
        answer:
          "Instagram posts commonly use 1:1 (square) or 4:5 (vertical). YouTube and modern computer displays use 16:9 (widescreen). TikTok and Instagram Reels use 9:16 (vertical mobile).",
      },
    ],
    relatedToolSlugs: [
      "image-resizer",
      "image-dimensions-calculator",
      "image-cropper",
    ],
    relatedArticleSlugs: ["what-is-image-resolution", "what-is-dpi-and-how-does-it-affect-images"],
  },
  {
    id: "image-dimensions-calculator",
    slug: "image-dimensions-calculator",
    path: "/tools/image-dimensions-calculator/",
    h1: "Image Dimensions Calculator",
    seoTitle: "Image Dimensions Calculator – Pixels, Megapixels & Print Sizes",
    metaDescription:
      "Calculate total pixels, megapixels, aspect ratios, and physical print sizes (at 72, 150, 300 DPI) for any digital image.",
    category: "utilities",
    categoryName: "Image Utilities",
    badge: "Resolution",
    toolType: "calculator-dimensions",
    intro:
      "Discover the true capabilities of your digital image. Enter or inspect pixel dimensions to calculate total megapixels, aspect ratio, and physical print size at standard resolutions (72 DPI web, 150 DPI draft, 300 DPI magazine print).",
    explanation:
      "Megapixels are calculated as (Width in Pixels × Height in Pixels) / 1,000,000. Physical print size is determined by dividing pixel counts by the output device's Dots Per Inch (DPI).",
    tradeoffExplanation:
      "An image that looks sharp on a 1080p monitor (72-96 DPI) may appear pixelated when printed as an 8x10 inch photo if it lacks the ~300 DPI density required for commercial print standards.",
    howToSteps: [
      {
        step: 1,
        title: "Input Dimensions or Upload",
        description: "Enter pixel width and height or upload a photo to auto-detect its size.",
      },
      {
        step: 2,
        title: "Inspect Megapixels & Print Metrics",
        description: "Review total megapixels and maximum print sizes in inches and centimeters.",
      },
    ],
    faqs: [
      {
        question: "How many megapixels do I need for a 4x6 inch print?",
        answer:
          "At standard 300 DPI print quality, a 4x6 inch photo requires 1200x1800 pixels, which is approximately 2.16 megapixels.",
      },
    ],
    relatedToolSlugs: [
      "image-dpi-calculator",
      "image-resizer",
      "aspect-ratio-calculator",
    ],
    relatedArticleSlugs: [
      "what-is-image-resolution",
      "what-is-dpi-and-how-does-it-affect-images",
    ],
  },
  {
    id: "image-dpi-calculator",
    slug: "image-dpi-calculator",
    path: "/tools/image-dpi-calculator/",
    h1: "Image DPI Calculator",
    seoTitle: "Image DPI Calculator – Calculate Dots Per Inch & Print Dimensions",
    metaDescription:
      "Calculate DPI, PPI, pixel dimensions, and physical print size in inches or centimeters. Ensure your photos meet high-resolution print standards.",
    category: "utilities",
    categoryName: "Image Utilities",
    badge: "Print Ready",
    toolType: "calculator-dpi",
    intro:
      "DPI (Dots Per Inch) determines print fidelity. Use this calculator to verify whether your digital image has sufficient pixel density to print cleanly without blur or pixelation.",
    explanation:
      "DPI connects virtual pixels to physical paper: Pixels = Inches × DPI. For high-resolution magazine or photography prints, 300 DPI is the universal benchmark.",
    tradeoffExplanation:
      "Changing the DPI metadata tag of a digital file does not alter its pixel count on a computer screen; it merely instructs physical printers how tightly to space the ink droplets.",
    howToSteps: [
      {
        step: 1,
        title: "Select Calculation Mode",
        description: "Calculate required pixels from print size, or calculate resulting DPI from existing pixels.",
      },
      {
        step: 2,
        title: "Enter Values",
        description: "Input width, height, and target DPI (e.g. 300 DPI).",
      },
      {
        step: 3,
        title: "Get Exact Results",
        description: "See the precise pixel dimensions or physical print capacity in real time.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between DPI and PPI?",
        answer:
          "PPI (Pixels Per Inch) refers to digital display density, while DPI (Dots Per Inch) refers to physical printer ink droplets. In digital photography, they are frequently used interchangeably.",
      },
    ],
    relatedToolSlugs: [
      "image-dimensions-calculator",
      "image-resizer",
      "image-size-converter",
    ],
    relatedArticleSlugs: [
      "what-is-dpi-and-how-does-it-affect-images",
      "what-is-image-resolution",
    ],
  },

  // ==========================================
  // EXACT-SIZE LANDING PAGES (Root routes)
  // ==========================================
  {
    id: "compress-jpg-to-100kb",
    slug: "compress-jpg-to-100kb",
    path: "/compress-jpg-to-100kb/",
    h1: "Compress JPG to 100KB Online",
    seoTitle: "Compress JPG to 100KB Online – Free JPG Compressor",
    metaDescription:
      "Compress your JPG and JPEG images to 100KB or less online for free. Perfect for job portals, government applications, and visa uploads with zero quality loss.",
    category: "exact-size",
    categoryName: "Exact File Size",
    badge: "100KB Target",
    toolType: "compressor",
    defaultTargetKB: 100,
    defaultFormat: "image/jpeg",
    intro:
      "Need to compress a JPG to 100KB for an online portal, job application, or university admission form? Upload your image, and our binary-search compression engine will automatically optimize your file to fit comfortably under 100KB without blurry artifacts.",
    explanation:
      "Reaching a precise 100KB target requires an algorithmic balance. Our client-side engine executes a binary search across JPEG quantization tables (evaluating qualities between 5% and 95%). If the image is extremely complex (e.g. detailed foliage or high-ISO noise) and cannot reach 100KB at acceptable quality, it gently downscales pixel dimensions to guarantee compliance.",
    tradeoffExplanation:
      "What if your JPG cannot reach 100KB through quality alone? If a 10MB photo is forced into 100KB purely through JPEG quantization, ugly macroblocking and color banding appear. SnapReduce instead intelligently combines modest dimension scaling (e.g. from 4000px down to 1800px) with clean quality encoding, ensuring your document remains crystal clear.",
    howToSteps: [
      {
        step: 1,
        title: "Upload Your JPG File",
        description: "Drag and drop your photo into the box or choose from your phone or PC.",
      },
      {
        step: 2,
        title: "100KB Target Is Pre-Selected",
        description: "The compressor is calibrated to optimize directly for the 100KB ceiling.",
      },
      {
        step: 3,
        title: "Automatic Processing",
        description: "Our browser engine optimizes the file locally in less than a second.",
      },
      {
        step: 4,
        title: "Preview & Download",
        description: "Verify the final file size (e.g. 96.4 KB) and download your ready-to-upload JPG.",
      },
    ],
    faqs: [
      {
        question: "How do I compress a JPG to 100KB?",
        answer:
          "Upload your JPG, verify that the 100KB target is active, and let our tool optimize the file. The compressor tests suitable JPEG quality settings and, when necessary, scales dimensions so the result fits safely under 100KB.",
      },
      {
        question: "Will my compressed 100KB JPG look blurry?",
        answer:
          "No. For standard documents, signatures, and portraits, 100KB offers more than enough data to look sharp on any modern screen or printout.",
      },
      {
        question: "Is this tool safe for sensitive ID documents and certificates?",
        answer:
          "Yes, 100%. SnapReduce processes all files inside your web browser. No photos or personal documents are ever uploaded to any remote server or stored in any database.",
      },
    ],
    relatedToolSlugs: [
      "compress-jpg-to-200kb",
      "compress-jpg-to-500kb",
      "compress-image-to-100kb",
      "compress-passport-photo-to-100kb",
      "resize-image-to-100kb",
    ],
    relatedArticleSlugs: [
      "how-to-compress-a-jpg-to-100kb",
      "how-to-reduce-jpg-file-size-without-losing-too-much-quality",
      "how-to-compress-images-for-online-forms",
    ],
  },
  {
    id: "compress-jpg-to-200kb",
    slug: "compress-jpg-to-200kb",
    path: "/compress-jpg-to-200kb/",
    h1: "Compress JPG to 200KB Online",
    seoTitle: "Compress JPG to 200KB Online – Free Image Compressor",
    metaDescription:
      "Compress JPG images to 200KB online. Fast, high-quality, and completely private browser-based file size reducer for passport, visa, and exam portals.",
    category: "exact-size",
    categoryName: "Exact File Size",
    badge: "200KB Target",
    toolType: "compressor",
    defaultTargetKB: 200,
    defaultFormat: "image/jpeg",
    intro:
      "200KB is one of the most common file size ceilings used by exam registration boards, government portals, and online submission portals. SnapReduce compresses your JPG photo directly to under 200KB with crisp clarity.",
    explanation:
      "At 200KB, a JPEG file can easily preserve high definition (up to 1920x1080 resolution) with rich color depth. Our binary search algorithm pinpoints the exact compression factor that yields the maximum possible visual fidelity right below 200,000 bytes.",
    tradeoffExplanation:
      "Starting with a 5MB phone photo? You can reach 200KB with zero noticeable loss in quality on regular screens. The engine removes unseen metadata and quantizes high-frequency color variations that the human eye cannot detect.",
    howToSteps: [
      {
        step: 1,
        title: "Select Your JPG",
        description: "Upload your image file from your computer, tablet, or phone.",
      },
      {
        step: 2,
        title: "200KB Pre-Configured",
        description: "Target size is set to 200KB for instant compliance.",
      },
      {
        step: 3,
        title: "Instant In-Browser Compression",
        description: "Canvas processes the image in milliseconds without cloud queues.",
      },
      {
        step: 4,
        title: "Download",
        description: "Save your verified under-200KB JPG file immediately.",
      },
    ],
    faqs: [
      {
        question: "Why do so many portals demand images under 200KB?",
        answer:
          "200KB strikes the sweet spot between fast server processing, low bandwidth consumption, and sufficient resolution for identity verification.",
      },
      {
        question: "Can I use this for photos taken on an iPhone?",
        answer:
          "Yes. If your iPhone captures in HEIC, use our HEIC to JPG tool first or select the file directly; our engine handles standard camera exports seamlessly.",
      },
    ],
    relatedToolSlugs: [
      "compress-jpg-to-100kb",
      "compress-jpg-to-500kb",
      "reduce-image-size-to-200kb",
      "compress-image-to-200kb",
    ],
    relatedArticleSlugs: [
      "how-to-compress-a-jpg-to-200kb",
      "how-to-reduce-image-size-to-200kb-online",
      "why-are-jpeg-files-so-large",
    ],
  },
  {
    id: "compress-jpg-to-500kb",
    slug: "compress-jpg-to-500kb",
    path: "/compress-jpg-to-500kb/",
    h1: "Compress JPG to 500KB Online",
    seoTitle: "Compress JPG to 500KB Online – Reduce JPG File Size",
    metaDescription:
      "Compress your large JPG pictures to 500KB or less online. Preserve maximum sharpness for photography, real estate listings, and portfolio uploads.",
    category: "exact-size",
    categoryName: "Exact File Size",
    badge: "500KB Target",
    toolType: "compressor",
    defaultTargetKB: 500,
    defaultFormat: "image/jpeg",
    intro:
      "When you need to send high-resolution photography via email, upload to website CMS platforms, or comply with 500KB file upload limits, SnapReduce delivers studio-grade visual quality without the heavyweight file baggage.",
    explanation:
      "A 500KB budget allows for substantial 2K and 4K image dimensions with minimal compression artifacting. Our compressor preserves fine textures, sharp typography, and vibrant gradients while stripping unnecessary camera metadata and bloat.",
    tradeoffExplanation:
      "Photos compressed to 500KB look indistinguishable from original RAW or 15MB camera files on almost all desktop monitors and mobile retina screens.",
    howToSteps: [
      {
        step: 1,
        title: "Upload JPG",
        description: "Select your high-resolution photograph or graphic.",
      },
      {
        step: 2,
        title: "Optimize to 500KB",
        description: "The engine calibrates JPEG quality to fit under 500KB.",
      },
      {
        step: 3,
        title: "Download",
        description: "Save your optimized, premium-quality JPG.",
      },
    ],
    faqs: [
      {
        question: "Is 500KB suitable for website banners?",
        answer:
          "Yes! 500KB is an excellent upper boundary for rich hero banners that need to look sharp on high-DPI displays without slowing down page load times.",
      },
    ],
    relatedToolSlugs: [
      "compress-jpg-to-200kb",
      "compress-image-to-500kb",
      "jpg-compressor",
      "image-resizer",
    ],
    relatedArticleSlugs: [
      "how-to-compress-a-jpg-to-500kb",
      "how-to-reduce-image-file-size-for-websites",
    ],
  },
  {
    id: "compress-image-to-100kb",
    slug: "compress-image-to-100kb",
    path: "/compress-image-to-100kb/",
    h1: "Compress Image to 100KB Online",
    seoTitle: "Compress Image to 100KB Online – Reduce Any Image to 100KB",
    metaDescription:
      "Compress any image (JPG, PNG, WebP) to 100KB online for free. Automatic file size reduction with live preview and no watermark.",
    category: "exact-size",
    categoryName: "Exact File Size",
    badge: "Universal 100KB",
    toolType: "compressor",
    defaultTargetKB: 100,
    defaultFormat: "image/jpeg",
    intro:
      "Universal image compression tailored to hit a 100KB ceiling regardless of your starting image format. Whether you upload a PNG screenshot, a WebP graphic, or a JPEG photo, SnapReduce shrinks it down safely under 100KB.",
    explanation:
      "Our multi-format compression pipeline converts and optimizes incoming image formats directly within your browser's canvas. It applies perceptual quantization to reach the 100KB threshold with maximum sharpness.",
    tradeoffExplanation:
      "If you upload a transparent PNG, the tool gives you the option to keep PNG format (with gentle downscaling) or convert to JPEG with a white background for smaller file weight.",
    howToSteps: [
      {
        step: 1,
        title: "Upload Any Image",
        description: "Supports JPG, PNG, or WebP formats.",
      },
      {
        step: 2,
        title: "Target 100KB",
        description: "The engine calculates optimal compression parameters automatically.",
      },
      {
        step: 3,
        title: "Download",
        description: "Download your lightweight 100KB image.",
      },
    ],
    faqs: [
      {
        question: "Can I compress PNG images to 100KB here?",
        answer:
          "Yes. For PNG images, our engine attempts lossless downscaling or allows you to convert to high-quality JPEG for maximum size reduction.",
      },
    ],
    relatedToolSlugs: [
      "compress-jpg-to-100kb",
      "compress-png-to-100kb",
      "reduce-image-size-to-100kb",
      "resize-image-to-100kb",
    ],
    relatedArticleSlugs: [
      "how-to-reduce-image-size-to-100kb",
      "how-to-compress-a-jpg-to-100kb",
    ],
  },
  {
    id: "compress-image-to-200kb",
    slug: "compress-image-to-200kb",
    path: "/compress-image-to-200kb/",
    h1: "Compress Image to 200KB Online",
    seoTitle: "Compress Image to 200KB Online – Free Photo Compressor",
    metaDescription:
      "Compress any picture to 200KB or less online. Free browser-based tool with live side-by-side preview and zero quality loss.",
    category: "exact-size",
    categoryName: "Exact File Size",
    badge: "Universal 200KB",
    toolType: "compressor",
    defaultTargetKB: 200,
    defaultFormat: "image/jpeg",
    intro:
      "Compress your photos and illustrations to under 200KB for smooth online submissions, portal uploads, and email attachments. Works entirely within your browser for instant speed and complete privacy.",
    explanation:
      "By dynamically analyzing color histograms and high-frequency pixel distribution, the compressor adjusts JPEG and WebP quantization matrices to comfortably satisfy the 200KB limit.",
    tradeoffExplanation:
      "A 200KB ceiling provides sufficient digital headroom to maintain Full HD (1920x1080) resolution without visible compression artifacts.",
    howToSteps: [
      {
        step: 1,
        title: "Upload Picture",
        description: "Choose any image file from your device.",
      },
      {
        step: 2,
        title: "Auto-Optimize",
        description: "Engine targets 200KB boundary automatically.",
      },
      {
        step: 3,
        title: "Download",
        description: "Save your optimized under-200KB photo.",
      },
    ],
    faqs: [
      {
        question: "Is there any watermark on the output?",
        answer: "Never. SnapReduce is 100% free with no watermarks, no registration, and no limits.",
      },
    ],
    relatedToolSlugs: [
      "compress-jpg-to-200kb",
      "reduce-image-size-to-200kb",
      "compress-image-to-100kb",
    ],
    relatedArticleSlugs: [
      "how-to-reduce-image-size-to-200kb-online",
      "how-to-compress-a-jpg-to-200kb",
    ],
  },
  {
    id: "compress-image-to-500kb",
    slug: "compress-image-to-500kb",
    path: "/compress-image-to-500kb/",
    h1: "Compress Image to 500KB Online",
    seoTitle: "Compress Image to 500KB Online – Shrink Photos for Web & Email",
    metaDescription:
      "Reduce image file size to 500KB online. Perfect for web design, blog headers, and email attachments without sacrificing sharpness.",
    category: "exact-size",
    categoryName: "Exact File Size",
    badge: "Universal 500KB",
    toolType: "compressor",
    defaultTargetKB: 500,
    defaultFormat: "image/jpeg",
    intro:
      "Shrink hefty 10MB+ camera images down to an agile 500KB. Retain vibrant colors and crisp details for website publishing, social platforms, and digital portfolios.",
    explanation:
      "500KB is the industry gold standard for high-resolution web imagery. Our browser-based tool strips redundant metadata and applies modern compression to preserve maximum clarity.",
    tradeoffExplanation:
      "Retaining a 500KB target ensures your graphics remain tack-sharp even on 4K retina displays.",
    howToSteps: [
      {
        step: 1,
        title: "Select Image",
        description: "Upload any large image.",
      },
      {
        step: 2,
        title: "Process to 500KB",
        description: "Instant in-browser compression.",
      },
      {
        step: 3,
        title: "Save File",
        description: "Download your compressed image.",
      },
    ],
    faqs: [
      {
        question: "Can I compress images larger than 20MB?",
        answer:
          "Yes! Because all computation runs directly in your computer's RAM, there are no artificial file size upload limits imposed by a server.",
      },
    ],
    relatedToolSlugs: [
      "compress-jpg-to-500kb",
      "compress-image-to-200kb",
      "image-compressor",
    ],
    relatedArticleSlugs: [
      "how-to-compress-a-jpg-to-500kb",
      "how-to-reduce-image-file-size-for-websites",
    ],
  },
  {
    id: "resize-image-to-50kb",
    slug: "resize-image-to-50kb",
    path: "/resize-image-to-50kb/",
    h1: "Resize Image to 50KB Online",
    seoTitle: "Resize Image to 50KB Online – Free 50KB Image Tool",
    metaDescription:
      "Resize and compress images to 50KB online. Tailored for strict portal requirements, signatures, student cards, and ID photos.",
    category: "exact-size",
    categoryName: "Exact File Size",
    badge: "50KB Target",
    toolType: "compressor",
    defaultTargetKB: 50,
    defaultFormat: "image/jpeg",
    intro:
      "Government exam portals, state licensing boards, and official identity verification systems frequently impose ultra-strict 50KB file ceilings. SnapReduce accurately resizes and compresses your photo or signature to meet the 50KB requirement.",
    explanation:
      "At 50KB, pixel count must be balanced alongside JPEG quality. Our algorithm scales dimensions to sensible display bounds (e.g. 600x600 px or 800x600 px) before applying targeted quantization, preventing severe pixelation.",
    tradeoffExplanation:
      "To reach 50KB from a 12MP photo, scaling dimensions down is essential. Trying to maintain a 4000x3000 resolution within 50KB results in extreme JPEG distortion. Our tool balances both automatically.",
    howToSteps: [
      {
        step: 1,
        title: "Upload Photo or Signature",
        description: "Select your image file.",
      },
      {
        step: 2,
        title: "Optimize for 50KB",
        description: "Engine dynamically adjusts dimensions and quality.",
      },
      {
        step: 3,
        title: "Download",
        description: "Save your verified under-50KB file ready for instant submission.",
      },
    ],
    faqs: [
      {
        question: "How do I resize a signature image to 50KB?",
        answer:
          "Upload your signature photo. Our tool crops away blank margins, scales dimensions, and compresses the image so it fits neatly under 50KB while remaining crisp and legible.",
      },
    ],
    relatedToolSlugs: [
      "resize-image-to-100kb",
      "compress-jpg-to-100kb",
      "compress-passport-photo-to-100kb",
    ],
    relatedArticleSlugs: [
      "how-to-resize-an-image-to-50kb",
      "how-to-compress-images-for-online-forms",
    ],
  },
  {
    id: "resize-image-to-100kb",
    slug: "resize-image-to-100kb",
    path: "/resize-image-to-100kb/",
    h1: "Resize Image to 100KB Online",
    seoTitle: "Resize Image to 100KB Online – Free Image Size Tool",
    metaDescription:
      "Resize and reduce image file size to 100KB online. Perfect balance of dimensions and file weight for seamless online submissions.",
    category: "exact-size",
    categoryName: "Exact File Size",
    badge: "100KB Resize",
    toolType: "compressor",
    defaultTargetKB: 100,
    defaultFormat: "image/jpeg",
    intro:
      "Achieve the exact 100KB file specification requested by application portals. Our tool adjusts both pixel dimensions and compression parameters so your image uploads without rejection.",
    explanation:
      "By harmonizing bicubic downsampling with iterative JPEG quantization, SnapReduce guarantees that your final output respects the 100KB boundary while maximizing visual clarity.",
    tradeoffExplanation:
      "Dimensions are preserved as high as possible. If the file can hit 100KB at native resolution, dimensions remain untouched; downsampling is only deployed when strictly necessary.",
    howToSteps: [
      {
        step: 1,
        title: "Upload Image",
        description: "Select any JPG or PNG file.",
      },
      {
        step: 2,
        title: "Resize to 100KB",
        description: "The engine calculates the optimal balance.",
      },
      {
        step: 3,
        title: "Download Output",
        description: "Save your 100KB compliant image.",
      },
    ],
    faqs: [
      {
        question: "Will resizing to 100KB change my aspect ratio?",
        answer:
          "No. Original aspect ratios are strictly preserved to ensure your image never appears stretched or distorted.",
      },
    ],
    relatedToolSlugs: [
      "compress-jpg-to-100kb",
      "resize-image-to-50kb",
      "resize-image-to-200kb",
      "image-resizer",
    ],
    relatedArticleSlugs: [
      "how-to-resize-an-image-to-100kb",
      "how-to-resize-an-image-to-an-exact-size-in-kb",
    ],
  },
  {
    id: "resize-image-to-200kb",
    slug: "resize-image-to-200kb",
    path: "/resize-image-to-200kb/",
    h1: "Resize Image to 200KB Online",
    seoTitle: "Resize Image to 200KB Online – Free Dimension & Size Tool",
    metaDescription:
      "Resize image dimensions and compress file size to 200KB online. Fast, secure, and accurate client-side processing.",
    category: "exact-size",
    categoryName: "Exact File Size",
    badge: "200KB Resize",
    toolType: "compressor",
    defaultTargetKB: 200,
    defaultFormat: "image/jpeg",
    intro:
      "Meet 200KB upload limits with pinpoint accuracy. Adjust dimensions and compress photos in a single fast, private browser workflow.",
    explanation:
      "SnapReduce tests encoding candidates directly on your device, stopping at the exact sweet spot where visual quality is highest and file weight is below 200KB.",
    tradeoffExplanation:
      "200KB allows for spacious 1600x1200 or 1920x1080 dimensions, making it ideal for profile headshots and high-res certificate scans.",
    howToSteps: [
      {
        step: 1,
        title: "Upload File",
        description: "Choose your picture.",
      },
      {
        step: 2,
        title: "Process to 200KB",
        description: "Instant in-memory optimization.",
      },
      {
        step: 3,
        title: "Download",
        description: "Save your ready-to-upload image.",
      },
    ],
    faqs: [
      {
        question: "Can I resize an image to 200KB on my mobile browser?",
        answer:
          "Yes! Works smoothly on iOS Safari, Android Chrome, and all desktop browsers.",
      },
    ],
    relatedToolSlugs: [
      "compress-jpg-to-200kb",
      "resize-image-to-100kb",
      "reduce-image-size-to-200kb",
    ],
    relatedArticleSlugs: [
      "how-to-reduce-image-size-to-200kb-online",
      "how-to-compress-a-jpg-to-200kb",
    ],
  },
  {
    id: "compress-png-to-100kb",
    slug: "compress-png-to-100kb",
    path: "/compress-png-to-100kb/",
    h1: "Compress PNG to 100KB Online",
    seoTitle: "Compress PNG to 100KB Online – Reduce PNG Size with Transparency",
    metaDescription:
      "Compress PNG images to 100KB online. Preserve transparent backgrounds and sharp graphic edges with smart browser optimization.",
    category: "exact-size",
    categoryName: "Exact File Size",
    badge: "PNG 100KB",
    toolType: "compressor",
    defaultTargetKB: 100,
    defaultFormat: "image/png",
    intro:
      "Compressing PNG files to 100KB while preserving alpha transparency and crisp linework can be difficult because PNG uses lossless compression. SnapReduce uses intelligent canvas downsampling and color reduction to bring your PNG files under 100KB.",
    explanation:
      "Because standard PNG compression is lossless, file size directly correlates with pixel dimensions and color palette depth. Our tool calculates the exact dimension scale factor necessary to bring the PNG payload under 100KB without dropping transparency.",
    tradeoffExplanation:
      "If a large, photographic PNG cannot reach 100KB without drastic dimension scaling, converting to WebP or JPG is recommended. Our tool provides a clear notice so you can make the right decision for your specific graphic.",
    howToSteps: [
      {
        step: 1,
        title: "Upload PNG Graphic",
        description: "Select your PNG file.",
      },
      {
        step: 2,
        title: "Target 100KB",
        description: "Our engine optimizes pixel arrays to fit under 100KB.",
      },
      {
        step: 3,
        title: "Download PNG",
        description: "Save your transparent, lightweight PNG.",
      },
    ],
    faqs: [
      {
        question: "Will my transparent background survive compression?",
        answer:
          "Yes! When compressing as PNG, transparency channels are retained completely.",
      },
    ],
    relatedToolSlugs: [
      "png-compressor",
      "compress-jpg-to-100kb",
      "png-to-jpg",
      "jpg-to-webp",
    ],
    relatedArticleSlugs: [
      "how-to-compress-a-png-to-100kb",
      "jpg-vs-png",
    ],
  },
  {
    id: "reduce-image-size-to-100kb",
    slug: "reduce-image-size-to-100kb",
    path: "/reduce-image-size-to-100kb/",
    h1: "Reduce Image Size to 100KB Online",
    seoTitle: "Reduce Image Size to 100KB Online – Free Photo Reducer",
    metaDescription:
      "Reduce image file size to 100KB online. Simple, fast, and secure tool to shrink photos for job portals, forms, and email.",
    category: "exact-size",
    categoryName: "Exact File Size",
    badge: "100KB Reducer",
    toolType: "compressor",
    defaultTargetKB: 100,
    defaultFormat: "image/jpeg",
    intro:
      "Easily reduce any heavy image down to 100KB. Perfect for users who need a hassle-free, one-click solution to satisfy website upload restrictions and email attachment limits.",
    explanation:
      "Our client-side reducer reads the image into memory, removes excess metadata, and iterates over compression coefficients to guarantee the output does not exceed 100KB.",
    tradeoffExplanation:
      "The tool targets approximately 95KB–99KB to ensure strict portal validators that reject files at 100.1KB accept your submission without issues.",
    howToSteps: [
      {
        step: 1,
        title: "Upload Image",
        description: "Drop your file into the reducer.",
      },
      {
        step: 2,
        title: "Automatic Reduction",
        description: "The engine scales and optimizes in one pass.",
      },
      {
        step: 3,
        title: "Download",
        description: "Get your under-100KB photo immediately.",
      },
    ],
    faqs: [
      {
        question: "Why did my file end up at 97KB instead of exactly 100.00KB?",
        answer:
          "To guarantee that strict upload filters with a rigid 100KB cutoff never reject your file, our algorithm targets just below the ceiling (typically 95-99KB).",
      },
    ],
    relatedToolSlugs: [
      "compress-jpg-to-100kb",
      "reduce-image-size-to-200kb",
      "photo-size-reducer",
    ],
    relatedArticleSlugs: [
      "how-to-reduce-image-size-to-100kb",
      "how-to-convert-jpg-to-100kb",
    ],
  },
  {
    id: "reduce-image-size-to-200kb",
    slug: "reduce-image-size-to-200kb",
    path: "/reduce-image-size-to-200kb/",
    h1: "Reduce Image Size to 200KB Online",
    seoTitle: "Reduce Image Size to 200KB Online – Free Online Tool",
    metaDescription:
      "Reduce photo and image size to 200KB online for free. Clean compression with zero server uploads and instant download.",
    category: "exact-size",
    categoryName: "Exact File Size",
    badge: "200KB Reducer",
    toolType: "compressor",
    defaultTargetKB: 200,
    defaultFormat: "image/jpeg",
    intro:
      "Quickly reduce digital photos to 200KB or less. Designed for official applications, school admissions, and identity portals with strict 200KB requirements.",
    explanation:
      "Processes your image in your browser using high-speed HTML5 Canvas pipelines, eliminating network latency and securing complete user privacy.",
    tradeoffExplanation:
      "Preserves rich color depth and crisp edges, making your compressed image look virtually identical to the uncompressed original on everyday screens.",
    howToSteps: [
      {
        step: 1,
        title: "Choose Photo",
        description: "Select your image from your gallery or files.",
      },
      {
        step: 2,
        title: "Instant Optimization",
        description: "Optimized to fit under 200KB in under one second.",
      },
      {
        step: 3,
        title: "Download",
        description: "Download and use your compliant file.",
      },
    ],
    faqs: [
      {
        question: "Is there any limit to how many images I can reduce?",
        answer: "None! Process as many images as you need, 100% free.",
      },
    ],
    relatedToolSlugs: [
      "compress-jpg-to-200kb",
      "reduce-image-size-to-100kb",
      "photo-size-reducer",
    ],
    relatedArticleSlugs: [
      "how-to-reduce-image-size-to-200kb-online",
      "how-to-compress-a-jpg-to-200kb",
    ],
  },
  {
    id: "compress-passport-photo-to-100kb",
    slug: "compress-passport-photo-to-100kb",
    path: "/compress-passport-photo-to-100kb/",
    h1: "Compress Passport Photo to 100KB Online",
    seoTitle: "Compress Passport Photo to 100KB Online – Visa & ID Photo Tool",
    metaDescription:
      "Compress passport and visa photos to 100KB online. Perfect for official government forms, passport renewals, and visa portals with strict size limits.",
    category: "exact-size",
    categoryName: "Exact File Size",
    badge: "Passport Ready",
    toolType: "compressor",
    defaultTargetKB: 100,
    defaultFormat: "image/jpeg",
    intro:
      "Applying for a passport renewal, national ID, driver's license, or travel visa? Official embassy and government portals almost universally require passport photos to be under 100KB (and frequently under 200KB). SnapReduce optimizes your passport headshot to meet these strict specifications with zero rejection risk.",
    explanation:
      "Passport validation algorithms scan for facial sharpness, clear eye contours, and plain backgrounds. Our tool removes extraneous EXIF camera data and fine-tunes JPEG compression matrices specifically to protect facial fidelity while driving file weight safely below 100KB.",
    tradeoffExplanation:
      "Standard passport photos are either 2x2 inches (US standard, 600x600 px at 300 DPI) or 35x45mm (Schengen/UK standard, 413x531 px at 300 DPI). At these pixel dimensions, a 100KB budget delivers pristine visual clarity with virtually zero artifacting.",
    howToSteps: [
      {
        step: 1,
        title: "Upload Your Passport Photo",
        description: "Upload your cropped headshot with a plain white or off-white background.",
      },
      {
        step: 2,
        title: "100KB Optimization",
        description: "The engine compresses the image to stay strictly under the 100KB limit.",
      },
      {
        step: 3,
        title: "Verify Details",
        description: "Ensure facial features, eyes, and background are clean and well-defined.",
      },
      {
        step: 4,
        title: "Download & Submit",
        description: "Save your compliant passport image and upload it to the official portal.",
      },
    ],
    faqs: [
      {
        question: "Will the government portal accept this compressed passport photo?",
        answer:
          "Yes! Government portals reject images that exceed maximum file size limits (like 100KB or 240KB) or have blurry features. SnapReduce keeps your photo well within the file limit while retaining sharp facial definition.",
      },
      {
        question: "Can I crop my photo before compressing it?",
        answer:
          "Yes. Use our Image Cropper tool to frame your 2x2 inch or 35x45mm passport headshot first, then compress it to 100KB here.",
      },
      {
        question: "Are my passport photos kept private?",
        answer:
          "Absolutely. Your passport photo is processed exclusively inside your browser's local sandbox memory. It is never uploaded to, stored on, or transmitted to any remote server.",
      },
    ],
    relatedToolSlugs: [
      "compress-jpg-to-100kb",
      "image-cropper",
      "photo-size-reducer",
      "compress-image-to-100kb",
    ],
    relatedArticleSlugs: [
      "how-to-compress-a-passport-photo-to-100kb",
      "how-to-compress-images-for-online-forms",
      "what-image-file-size-should-you-use-for-online-uploads",
    ],
  },
];

export function getToolBySlug(slug: string): ToolItem | undefined {
  return TOOLS.find(
    (tool) => tool.slug === slug || tool.path === slug || tool.path === `/${slug}/`
  );
}

export function getToolsByCategory(category: string): ToolItem[] {
  return TOOLS.filter((tool) => tool.category === category);
}
