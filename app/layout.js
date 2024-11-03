



// import './globals.css'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         {children}

//         {/* This is for Google Analytics */}
//         <script
//           async
//           src="https://www.googletagmanager.com/gtag/js?id=G-XB2QZ2P7EQ"
//         />
//         <script dangerouslySetInnerHTML={{ __html: `
//           window.dataLayer = window.dataLayer || [];
//           function gtag() {
//             window.dataLayer.push(arguments);
//           }
//           gtag('js', new Date());
//           gtag('config', 'G-XB2QZ2P7EQ');
//         `}} />

//         {/* Google Tag Manager */}
//         <script async src="https://www.googletagmanager.com/gtag/js?id=AW-11346633417"></script>
//         <script dangerouslySetInnerHTML={{ __html: `
//           window.dataLayer = window.dataLayer || [];
//           function gtag() {
//             dataLayer.push(arguments);
//           }
//           gtag('js', new Date());
//           gtag('config', 'AW-11346633417');
//         `}} />

//         {/* Show ads from AdSense */}
//         <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9350232533240680" crossorigin="anonymous"></script>
      
//       </body>
//     </html>
//   )
// }



import './globals.css'
import { Inter } from 'next/font/google'
import { ContextProvider } from './context/context'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <ContextProvider>
      <html lang="en">
        <head>
          {/* This is for Google Analytics */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-XB2QZ2P7EQ"
          />
          <script dangerouslySetInnerHTML={{ __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              window.dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'G-XB2QZ2P7EQ');
          `}} />

          {/* Google Tag Manager */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=AW-11346633417"></script>
          <script dangerouslySetInnerHTML={{ __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'AW-11346633417');
          `}} />

          {/* Google Ads Conversion Tracking */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=AW-10789184238"></script>
          <script dangerouslySetInnerHTML={{ __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'AW-10789184238');
          `}} />

          {/* Show ads from AdSense */}
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9350232533240680" crossOrigin="anonymous"></script>
        </head>
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ContextProvider>
  )
}
