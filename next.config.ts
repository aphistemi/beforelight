import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname), // "@/..." => repo root
    };
    return config;
  },
  // optional: can silence the "multiple lockfiles" warning
  // outputFileTracingRoot: __dirname,
};

export default nextConfig;
