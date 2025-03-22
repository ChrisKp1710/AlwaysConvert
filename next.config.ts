import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config();

const nextConfig: NextConfig = {
  images: {
    domains: ["kodechris.dev"],
  },
};

export default nextConfig;
