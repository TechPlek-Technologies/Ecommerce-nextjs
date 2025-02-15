const headers = require("./headers");

const next_config = {
  reactStrictMode: false,
   output: "export",
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "bn", "ar", "fr"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers,
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["@styled-icons/bootstrap"],
  },
};

module.exports = next_config;
