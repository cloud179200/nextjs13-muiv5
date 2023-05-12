/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  sassOptions: {
    includePaths: ["./assets/scss"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|jsx|tsx|md)x?$/] },
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: { plugins: [{ removeViewBox: false }] },
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;