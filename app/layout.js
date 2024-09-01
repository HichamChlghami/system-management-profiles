import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

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

        {/* Show ads from AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9350232533240680" crossorigin="anonymous"></script>
      </body>
    </html>
  )
}
