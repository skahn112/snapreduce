export interface NavItem {
  name: string;
  href: string;
  description?: string;
  badge?: string;
}

export const SITE_CONFIG = {
  name: "SnapReduce",
  domain: "snapreduce.pages.dev",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://snapreduce.pages.dev",
  title: "SnapReduce – Free Online Image Compression, Resizing & Format Tools",
  description:
    "Free, private, browser-based image compression and optimization tools. Compress JPG, PNG, and WebP images to exact sizes (50KB, 100KB, 200KB, 500KB), resize dimensions, and convert formats with zero server uploads.",
  privacyStatement:
    "All image processing is executed entirely in your browser using modern client-side Canvas APIs. Your photos never touch a remote server, ensuring complete data privacy and security.",
  contactEmail: "worldofwordshub@gmail.com",
  socialLinks: {
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  categories: [
    {
      id: "compression",
      name: "Image Compression",
      description: "Lossy & lossless file size reduction with visual preview",
    },
    {
      id: "exact-size",
      name: "Exact File Size",
      description: "Compress or resize images to target sizes (50KB, 100KB, 200KB, 500KB)",
    },
    {
      id: "resizing",
      name: "Resizing & Cropping",
      description: "Adjust pixel dimensions, aspect ratios, and custom crops",
    },
    {
      id: "conversion",
      name: "Format Conversion",
      description: "Fast conversions between JPG, PNG, WebP, and HEIC",
    },
    {
      id: "calculators",
      name: "Image Calculators",
      description: "DPI, aspect ratio, and physical dimension tools",
    },
  ],
  popularTools: [
    { name: "Image Compressor", href: "/tools/image-compressor/" },
    { name: "Compress JPG to 100KB", href: "/compress-jpg-to-100kb/" },
    { name: "Image Resizer", href: "/tools/image-resizer/" },
    { name: "Compress Image to 200KB", href: "/compress-image-to-200kb/" },
    { name: "WebP to JPG", href: "/tools/webp-to-jpg/" },
    { name: "HEIC to JPG", href: "/tools/heic-to-jpg/" },
    { name: "Passport Photo to 100KB", href: "/compress-passport-photo-to-100kb/" },
  ],
  navigation: [
    { name: "Home", href: "/" },
    { name: "All Tools", href: "/tools/" },
    { name: "Compress to 100KB", href: "/compress-jpg-to-100kb/" },
    { name: "Blog & Guides", href: "/blog/" },
    { name: "FAQ", href: "/faq/" },
  ],
  footerLinks: {
    tools: [
      { name: "All Image Tools", href: "/tools/" },
      { name: "General Image Compressor", href: "/tools/image-compressor/" },
      { name: "JPG Compressor", href: "/tools/jpg-compressor/" },
      { name: "PNG Compressor", href: "/tools/png-compressor/" },
      { name: "Image Resizer", href: "/tools/image-resizer/" },
      { name: "Photo Size Reducer", href: "/tools/photo-size-reducer/" },
      { name: "HEIC to JPG", href: "/tools/heic-to-jpg/" },
      { name: "WebP to JPG", href: "/tools/webp-to-jpg/" },
    ],
    exactSizes: [
      { name: "Compress JPG to 100KB", href: "/compress-jpg-to-100kb/" },
      { name: "Compress JPG to 200KB", href: "/compress-jpg-to-200kb/" },
      { name: "Compress JPG to 500KB", href: "/compress-jpg-to-500kb/" },
      { name: "Compress Image to 100KB", href: "/compress-image-to-100kb/" },
      { name: "Compress Image to 200KB", href: "/compress-image-to-200kb/" },
      { name: "Resize Image to 50KB", href: "/resize-image-to-50kb/" },
      { name: "Resize Image to 100KB", href: "/resize-image-to-100kb/" },
      { name: "Passport Photo to 100KB", href: "/compress-passport-photo-to-100kb/" },
    ],
    learn: [
      { name: "Blog Hub", href: "/blog/" },
      { name: "JPEG Compression Explained", href: "/blog/jpeg-compression-explained/" },
      { name: "JPG vs PNG", href: "/blog/jpg-vs-png/" },
      { name: "WebP vs JPG", href: "/blog/webp-vs-jpg/" },
      { name: "What Is Image Resolution?", href: "/blog/what-is-image-resolution/" },
      { name: "DPI Explained", href: "/blog/what-is-dpi-and-how-does-it-affect-images/" },
    ],
    legal: [
      { name: "About SnapReduce", href: "/about/" },
      { name: "Contact Us", href: "/contact/" },
      { name: "Privacy Policy", href: "/privacy-policy/" },
      { name: "Terms of Service", href: "/terms/" },
      { name: "Disclaimer", href: "/disclaimer/" },
      { name: "Frequently Asked Questions", href: "/faq/" },
    ],
  },
};
