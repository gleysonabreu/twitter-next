/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-665a1a79c83b4c14bd2df56cc7d750b3.r2.dev',
      },
    ],
  },
};

module.exports = nextConfig;
