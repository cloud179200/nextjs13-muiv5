/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  sassOptions: {
    includePaths: ["./assets/scss"],
  },
};

module.exports = nextConfig;
