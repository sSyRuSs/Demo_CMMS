import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  outputFileTracingRoot: path.resolve(),
  images: { unoptimized: true },
};

export default nextConfig;
