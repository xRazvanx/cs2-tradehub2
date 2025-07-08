/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-icons'],
  },
  webpack: (config) => {
    // Basic webpack optimizations
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    // Module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    };

    return config;
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Image optimization
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig; 