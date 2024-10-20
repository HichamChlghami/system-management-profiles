// next.config.js
module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          has: [
            {
              type: 'host',
              value: 'sitfile.com', // The non-www domain
            },
          ],
          destination: 'https://www.sitfile.com/', // Redirect to the www version
          permanent: true, // This will issue a 301 redirect
        },
      ];
    },
  };
  