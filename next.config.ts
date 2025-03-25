import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import dotenv from "dotenv";

dotenv.config();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kodechris.dev', // 👈 la tua icona personale
      },
      {
        protocol: 'https',
        hostname: 'img.shields.io', // 👈 i badge SVG
      },
    ],
    dangerouslyAllowSVG: true, // 👈 richiesto per i badge SVG remoti
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);