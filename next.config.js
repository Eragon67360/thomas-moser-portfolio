/** @type {import('next').NextConfig} */

const securityHeaders = [
    {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN'
    },
]


const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) =>
    {
        config.module.rules.push({
            test: /\.pdf$/i,
            type: 'asset/source'
        })

        return config
    },
    
}

// next.config.js

module.exports = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
module.exports = nextConfig
// module.exports = {
//   webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
//     config.resolve.fallback = {
//       process: require.resolve("process/browser"),
//       zlib: require.resolve("browserify-zlib"),
//       stream: require.resolve("stream-browserify"),
//       util: require.resolve("util"),
//       buffer: require.resolve("buffer"),
//       asset: require.resolve("assert"),
//     };
//     config.plugins.push(
//       new webpack.ProvidePlugin({
//         Buffer: ["buffer", "Buffer"],
//         process: "process/browser",
//       })
//     );
//     return config;
//   },
// };
