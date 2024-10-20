/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/test2/:path*',
        destination: '/:path*', // Redirect from /test2 to root
        permanent: true, // Permanent redirect
      },
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'www.sitfile.com',
          },
        ],
        destination: 'https://sitfile.com', // Redirect www to non-www
        permanent: true, // Permanent redirect
      },
    ];
  },
};

module.exports = nextConfig;
