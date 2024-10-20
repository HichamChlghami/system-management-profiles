


  /** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          has: [
            {
              type: 'host',
              value: 'sitfile.com',
            },
          ],
          destination: 'https://www.sitfile.com/',
          permanent: true,
        },
      ]
    },
  }
  
  module.exports = nextConfig;
  
