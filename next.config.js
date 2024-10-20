// // next.config.js
// module.exports = {
//     async redirects() {
//       return [
//         {
//           source: '/:path*.html',
//           destination: '/:path*',
//           permanent: true,
//         },
//       ]
//     },
//   }
  



// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/test2/:path*',
          destination: '/:path*', // Redirect to the same path without /test2
          permanent: true, // This will send a 308 status code
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  