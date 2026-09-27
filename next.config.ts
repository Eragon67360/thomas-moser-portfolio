import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/dluezegi8/image/upload/**" },
      // Spotify album and artist artwork
      { protocol: "https", hostname: "i.scdn.co" },
      // Deezer album covers and artist pictures
      { protocol: "https", hostname: "cdn-images.dzcdn.net" },
      // Steam avatars and store header images
      { protocol: "https", hostname: "**.steamstatic.com" },
    ],
  },
};

export default nextConfig;
