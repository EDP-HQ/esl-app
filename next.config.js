/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig


const withImages = require('next-images');

module.exports = withImages({
  webpack: (config, { isServer }) => {
    // Add the rule for handling canvas.node
    config.module.rules.push({
      test: /\.node$/,
      use: 'file-loader',
    });

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Your original next.config.js settings can go here
  // For example, you can add your custom configurations like the following:
  // target: 'serverless',
  // reactStrictMode: true,
  // Add any other configurations specific to your project
});
