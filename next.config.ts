import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Keep the development badge from covering the bottom-left Music switch.
  devIndicators: false,
};

export default nextConfig;
