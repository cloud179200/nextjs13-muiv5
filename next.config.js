/** @type {import('next').NextConfig} */
import chalk from "chalk";
const nextConfig = {
  experimental: {
    appDir: true,
  },
  sassOptions: {
    includePaths: ["./app/assets/scss"],
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack(config, { webpack }) {
    config.plugins.push(
      new webpack.ProgressPlugin({
        activeModules: false,
        entries: false,
        handler(percentage, message, ...args) {
          console.log(
            chalk.hex("#2ecc71").bold(`${Math.round(percentage * 100)}%`),
            chalk.hex("#f1c40f").italic(message),
            ...args
          );
        },
        modules: false,
        profile: false,
        dependencies: true,
        percentBy: "dependencies",
      })
    );
    return config;
  },
};

export default nextConfig;
