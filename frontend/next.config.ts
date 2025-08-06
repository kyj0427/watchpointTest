import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    turbo: {},
  },
  distDir: 'dist',
  
  reactStrictMode: true,
};

export default nextConfig;