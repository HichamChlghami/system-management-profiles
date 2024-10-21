'use client'

import React, {  useContext , useEffect} from 'react';

import { Context } from './context/context';

import Design from './components/design';
import Head from 'next/head';

function App() {

  const {  dispatch , name , email  } = useContext(Context);

  useEffect(() => {
    const payerUpdated = localStorage.getItem('payerUpdated');
    const scheduledTime = localStorage.getItem('scheduledTime');

    if (payerUpdated && scheduledTime) {
        const currentTime = Date.now();
        const timeToSchedule = parseInt(scheduledTime, 10);

        // Check if 24 hours have passed
        if (currentTime >= timeToSchedule) {
          dispatch({ type: "LOGIN_SUCCESS_USER", name:name, email: email });

            localStorage.removeItem('payerUpdated'); // Clean up
            localStorage.removeItem('scheduledTime'); // Clean up
        } else {
            // Set an interval to check every hour
            const interval = setInterval(() => {
                const currentTime = Date.now();
                if (currentTime >= timeToSchedule) {
                    dispatch({ type: "LOGIN_SUCCESS_USER", name:name, email: email });
                    localStorage.removeItem('payerUpdated'); // Clean up
                    localStorage.removeItem('scheduledTime'); // Clean up
                    clearInterval(interval); // Stop checking
                }
            },  60 * 60 * 1000); // Check every hour

            return () => clearInterval(interval); // Cleanup on unmount
        }
    } else if (payerUpdated) {
        // If payerUpdated exists but scheduledTime doesn't, set it
        const newScheduledTime = Date.now() + 24 * 60 *60 * 1000; // 24 hours from now
        localStorage.setItem('scheduledTime', newScheduledTime);
    }
}, [dispatch, name, email]);


  

  const title_home = " Convert Files Seamlessly with Sitfile";
  const des_home = "Easily convert files  between formats directly from your web browser using  <span class='sitfile_span'>sitfile</span> ";



  const title1 = 'How to convert a file?';
  const des1 = '1. Convert your files easily by starting with selecting them using the "Choose Files" button';
  const des2 = '2. Initiate the conversion process by choosing the desired format and clicking convert to';
  const des3 = '3. Once the conversion is complete, click "Download" to retrieve your converted files';

  const title2 = 'Simplicity at its Core';
  const how_des1 = 'Just upload your files and tap "Convert". Our tool guarantees the highest quality conversion. Unbeatable Features';

  const title3 = 'Unbeatable Features';
  const how_des2 = 'Effortlessly convert batches of files with our tool, which accommodates any file formats.';

  const title4 = "Privacy-Focused";
  const how_des3 = "Enjoy the benefits of secure, and universally compatible tool accessible from any web browser. For added security and privacy, Files are automatically deleted after a few hours.";

  const type_file = 'files';
  const format_type = 'file';

  return (
    <>
      <Head>
      <title>sitfile | file converter and compression tool for easy format management</title>
        <meta name="description" content="Convert & compress Files Above 1500+ Formats, Fast, Secure and Easy-to-use online tool, Supports Images, Documents, Audios, Videos and more" />
        <link rel="canonical" href="https://www.sitfile.com" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9350232533240680" crossorigin="anonymous"></script>
      </Head>
      <Design 
        format_type={format_type}
        type_file={type_file}
        title_home={title_home}
        des_home={des_home}
        title1={title1}
        des1={des1}
        des2={des2}
        des3={des3}
        title2={title2}
        how_des1={how_des1}
        title3={title3}
        how_des2={how_des2}
        title4={title4}
        how_des3={how_des3}
      />
    </>
  );
}

export default App;




















// "use client";

// // src/GoogleAds.js
// import React, { useEffect } from 'react';

// const GoogleAds = () => {


//     useEffect(() => {
//         // Load the Google Ads script
//         const script = document.createElement('script');
//         script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9350232533240680";
//         script.async = true;
//         script.crossOrigin = "anonymous";
//         document.body.appendChild(script);

//         // Push the ad requests after the script is loaded
//         script.onload = () => {
           
//             // Push the second ad request
//             (window.adsbygoogle = window.adsbygoogle || []).push({});
//             (window.adsbygoogle = window.adsbygoogle || []).push({});
//             (window.adsbygoogle = window.adsbygoogle || []).push({});
//             (window.adsbygoogle = window.adsbygoogle || []).push({});
//             (window.adsbygoogle = window.adsbygoogle || []).push({});
//             (window.adsbygoogle = window.adsbygoogle || []).push({});
   
//         };

//         // Clean up the script on component unmount
//         return () => {
//             document.body.removeChild(script);
//         };
//     }, []);





//     return (
//         <div>
//             <ins className="adsbygoogle"
//                  style={{ display: 'block' }}
//                  data-ad-client="ca-pub-9350232533240680"
//                  data-ad-slot="7489432268"
//                  data-ad-format="auto"
//                  data-full-width-responsive="true"></ins>
//             <p>This is the description for the first ad.</p>

//             <p>This is the description for the second ad.</p>
//             <ins className="adsbygoogle"
//                  style={{ display: 'block' }}
//                  data-ad-client="ca-pub-9350232533240680"
//                  data-ad-slot="6405754185"
//                  data-ad-format="auto"
//                  data-full-width-responsive="true"></ins>
//             <p>This is the description for the fourth ad.</p>
        

//             <p>This is the description for the second ad.</p>
//             <ins className="adsbygoogle"
//                  style={{ display: 'block' }}
//                  data-ad-client="ca-pub-9350232533240680"
//                  data-ad-slot="2298988213"
//                  data-ad-format="auto"
//                  data-full-width-responsive="true"></ins>
//             <p>This is the description for the fourth ad.</p>

//             <p>This is the description for the second ad.</p>
//             <ins className="adsbygoogle"
//                  style={{ display: 'block' }}
//                  data-ad-client="ca-pub-9350232533240680"
//                  data-ad-slot="4573163300"
//                  data-ad-format="auto"
//                  data-full-width-responsive="true"></ins>
//             <p>This is the description for the fourth ad.</p>
//             <h1>verticle</h1>
//             <ins className="adsbygoogle"
//                  style={{ display: 'block' }}
//                  data-ad-client="ca-pub-9350232533240680"
//                  data-ad-slot="9254644344"
//                  data-ad-format="auto"
//                  data-full-width-responsive="true"></ins>







// <h1>verticle</h1>
//             <ins className="adsbygoogle"
//                  style={{ display: 'block' }}
//                  data-ad-client="ca-pub-9350232533240680"
//                  data-ad-slot="6628481004"
//                  data-ad-format="auto"
//                  data-full-width-responsive="true"></ins>





//         </div>
//     );
// };

// export default GoogleAds;


















// "use client"

// // src/GoogleAds.js
// import React, { useEffect } from 'react';

// const GoogleAds = () => {
//     useEffect(() => {
//         // Load the Google Ads script
//         const script = document.createElement('script');
//         script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
//         script.async = true;
//         script.crossOrigin = "anonymous";
//         document.body.appendChild(script);

//         // Push the ad requests after the script is loaded
//         script.onload = () => {
//             (window.adsbygoogle = window.adsbygoogle || []).push({});
//         };

//         return () => {
//             document.body.removeChild(script);
//         };
//     }, []);






//     useEffect(() => {
//       const script = document.createElement('script');
//       script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9350232533240680';
//       script.async = true;
//       script.crossOrigin = 'anonymous';
//       document.body.appendChild(script);
  
//       (window.adsbygoogle = window.adsbygoogle || []).push({});
//     }, []);



    
//     useEffect(() => {
//       const script = document.createElement('script');
//       script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9350232533240680';
//       script.async = true;
//       script.crossOrigin = 'anonymous';
//       document.body.appendChild(script);
  
//       (window.adsbygoogle = window.adsbygoogle || []).push({});
//     }, []);




//     return (
//         <div>
          
//           <ins className="adsbygoogle"
//                  style={{ display: 'block' }}
//                  data-ad-client="ca-pub-9350232533240680"
//                  data-ad-slot="9254644344"
//                  data-ad-format="auto"
//                  data-full-width-responsive="true"></ins>







// <h1>verticle</h1>
//             <ins className="adsbygoogle"
//                  style={{ display: 'block' }}
//                  data-ad-client="ca-pub-9350232533240680"
//                  data-ad-slot="6628481004"
//                  data-ad-format="auto"
//                  data-full-width-responsive="true"></ins>

//         </div>
//     );
// };

// export default GoogleAds;
