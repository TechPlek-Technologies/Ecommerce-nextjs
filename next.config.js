const headers = require("./headers");

const next_config = {
  reactStrictMode: false,
  images: {
    domains: ["app.techplek.website"], // Ensure your domain is explicitly allowed
    remotePatterns: [
      {
        protocol: "https",
        hostname: "app.techplek.website", // Replace ** with actual domain
      },
    ],
    unoptimized: false, // Set to `true` if `_next/image` still causes issues
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
};

module.exports = next_config;
