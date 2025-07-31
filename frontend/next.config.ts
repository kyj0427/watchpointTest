import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    turbo: {},
  },
  distDir: 'dist',
  output: "export",
  reactStrictMode: true,
};

export default nextConfig;