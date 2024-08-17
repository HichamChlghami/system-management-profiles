


// next.config.js
module.exports = {
    async redirects() {
      return [
        {
          source: '/:path*.html',
          destination: '/:path*',
          permanent: true,
        },
      ]
    },
  }
  