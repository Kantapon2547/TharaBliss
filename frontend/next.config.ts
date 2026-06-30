import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@chatscope/chat-ui-kit-react'],
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;