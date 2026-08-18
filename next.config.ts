import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avoid pulling Three.js into every compile path; Hero loads it dynamically.
  images: {
    qualities: [75, 100],
  },
};

export default nextConfig;
