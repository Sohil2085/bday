import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow placeholder images to render without optimization errors
  // Remove this once you add real photos
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
