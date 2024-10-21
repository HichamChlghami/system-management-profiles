/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/test2/:path*', // Match any path under /test2
        destination: '/:path*', // Redirect to the same path without /test2
        permanent: true, // 301 redirect
      },
    ];
  },
};

module.exports = nextConfig;






