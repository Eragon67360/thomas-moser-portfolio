import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
// The Vercel Toolbar (comments on preview deployments) loads from vercel.live.
const isPreview = process.env.VERCEL_ENV === "preview";
const toolbar = (...sources: string[]) => (isPreview ? sources : []);

/**
 * Only the origins the site uses. Next.js emits inline bootstrap scripts on every page, and per-request
 * nonces would make the ISR pages dynamic, so scripts allow 'unsafe-inline' but no third-party host.
 * Spline's runtime is bundled; its WebAssembly modules (unused by the current scene) are served from 'self'.
 */
const contentSecurityPolicy = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    "'wasm-unsafe-eval'",
    ...(isDev ? ["'unsafe-eval'"] : []),
    ...toolbar("https://vercel.live"),
  ],
  "style-src": ["'self'", "'unsafe-inline'", ...toolbar("https://vercel.live")],
  "img-src": ["'self'", "data:", "blob:", ...toolbar("https://vercel.live", "https://vercel.com")],
  "font-src": ["'self'", ...toolbar("https://vercel.live", "https://assets.vercel.com")],
  "connect-src": ["'self'", "https://prod.spline.design", ...toolbar("https://vercel.live", "wss://ws-us3.pusher.com")],
  "media-src": ["'self'"],
  "frame-src": ["https://giscus.app", ...toolbar("https://vercel.live")],
  "worker-src": ["'self'", "blob:"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "frame-ancestors": ["'none'"],
  "upgrade-insecure-requests": [],
};

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: Object.entries(contentSecurityPolicy)
      .map(([directive, sources]) => [directive, ...sources].join(" "))
      .join("; "),
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Hover videos change rarely; without this every visit revalidates them.
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
  images: {
    // Paths are scoped to the images the site shows, so the optimizer can't be used to transform
    // arbitrary files from these hosts.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/dluezegi8/image/upload/**" },
      // Deezer album covers and artist pictures
      { protocol: "https", hostname: "cdn-images.dzcdn.net", pathname: "/images/cover/**" },
      { protocol: "https", hostname: "cdn-images.dzcdn.net", pathname: "/images/artist/**" },
      // Steam avatars and store header images
      { protocol: "https", hostname: "avatars.steamstatic.com", pathname: "/*_full.jpg" },
      { protocol: "https", hostname: "shared.akamai.steamstatic.com", pathname: "/store_item_assets/steam/apps/**" },
    ],
  },
};

export default nextConfig;
