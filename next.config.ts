import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',      // Increase from 1mb
      allowedOrigins: ['*'],      // Optional: set allowed origins if needed
    },
  },
};

export default nextConfig;
