import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
  images: {
    // En dev, la résolution DNS locale renvoie une adresse NAT64 (64:ff9b::…)
    // que l'optimiseur Next bloque (protection anti-SSRF). On charge donc les
    // images directement depuis le navigateur en dev ; la prod reste optimisée.
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
