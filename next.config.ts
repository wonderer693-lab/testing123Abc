import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  outputFileTracingRoot: path.join(__dirname, "../../"),
};

export default nextConfig;
