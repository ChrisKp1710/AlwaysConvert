import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config();

const nextConfig: NextConfig = {
  images: {
    domains: ["kodechris.dev"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
