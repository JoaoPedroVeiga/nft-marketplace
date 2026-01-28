import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'softstar.s3.amazonaws.com',
        pathname: '/items/**',
      },
      // Adicione outros domínios se necessário
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
    // Opcional: configure tamanhos se necessário
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Habilita output standalone para Docker
  output: 'standalone',
};

export default nextConfig;
