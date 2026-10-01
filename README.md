# SnapReduce – Free Online Image Compression & Optimization Platform

SnapReduce is a production-ready, client-side image processing platform built with Next.js App Router, TypeScript, and Tailwind CSS. It is fully optimized for immediate static export deployment to Cloudflare Pages with zero backend server dependencies.

## Key Features

- **100% Client-Side Processing**: All image reading, canvas rendering, compression, resizing, and format conversions occur locally inside the user's browser. No images are ever uploaded to any remote server.
- **Exact-Size Binary Search Compression**: Dynamic binary search algorithm across JPEG/WebP quantization matrices to guarantee precise target thresholds (e.g. 50KB, 100KB, 200KB, 500KB) without blurry distortion.
- **16 Working Core Tools**:
  - Image Compressor, JPG Compressor, PNG Compressor, Photo Size Reducer
  - Image Resizer, Image Size Converter
  - JPG to PNG, PNG to JPG, JPG to WebP, WebP to JPG, HEIC to JPG, HEIC to PNG
  - Image Cropper, Aspect Ratio Calculator, Image Dimensions Calculator, Image DPI Calculator
- **13 Dedicated Exact-Size SEO Landing Pages**:
  - `/compress-jpg-to-100kb/`, `/compress-jpg-to-200kb/`, `/compress-jpg-to-500kb/`
  - `/compress-image-to-100kb/`, `/compress-image-to-200kb/`, `/compress-image-to-500kb/`
  - `/resize-image-to-50kb/`, `/resize-image-to-100kb/`, `/resize-image-to-200kb/`
  - `/compress-png-to-100kb/`, `/reduce-image-size-to-100kb/`, `/reduce-image-size-to-200kb/`
  - `/compress-passport-photo-to-100kb/`
- **Complete Blog System (28 Published Articles)**:
  - Fully populated with in-depth technical guides, step-by-step walkthroughs, comparison tables, and internal links between tools and guides.
- **Enterprise SEO & Structured Data**:
  - JSON-LD schemas (`WebSite`, `WebApplication`, `BreadcrumbList`, `Article`, `FAQPage`)
  - Dynamic `sitemap.xml` and `robots.txt`
  - Canonical URLs driven by `NEXT_PUBLIC_SITE_URL`
  - Single primary H1 per indexable page
- **Monetization Ready**:
  - Dedicated non-intrusive ad slot placeholders for header, in-content, sidebar, and bottom placements.
- **Complete Legal Suite**:
  - `/about/`, `/contact/`, `/privacy-policy/`, `/terms/`, `/disclaimer/`, `/faq/`

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```
The static HTML export bundle will be generated in the `out/` directory.

---

## Deploying to Cloudflare Pages

1. Push this repository to GitHub or GitLab.
2. In the **Cloudflare Dashboard**, navigate to **Workers & Pages** &gt; **Create application** &gt; **Pages** &gt; **Connect to Git**.
3. Select your repository and configure the build settings:
   - **Framework preset**: `Next.js (Static HTML Export)`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Node.js version**: `18.x` or `20.x` or later (set environment variable `NODE_VERSION=20` if necessary)
4. Add your custom domain under **Custom domains** in the Pages project settings.
5. Set `NEXT_PUBLIC_SITE_URL` to your production domain (e.g. `https://snapreduce.com`).
