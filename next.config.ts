import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: false,
  },
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
