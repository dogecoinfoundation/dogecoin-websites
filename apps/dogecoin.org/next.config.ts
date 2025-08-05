import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig = {
  reactStrictMode: true,
  webpack(config: Configuration) {
    (config.module ??= {}).rules ??= [];
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  }
};

export default nextConfig;
