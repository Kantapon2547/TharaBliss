import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@chatscope/chat-ui-kit-react'],
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['192.168.51.59'],
};

module.exports = nextConfig;