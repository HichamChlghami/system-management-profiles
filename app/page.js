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







  const title_home = "Convert Files Seamlessly with Sitfile test";
  const des_home = "Seamlessly switch file formats with <span class='sitfile_span'>sitfile</span> ";

  const title1 = 'How to convert a file?';
  const des1 = '1. Convert your files easily by starting with selecting them using the "Choose Files" button';
  const des2 = '2. Initiate the conversion process by choosing the desired format and clicking convert to';
  const des3 = '3. Once the conversion is complete, click "Download" to retrieve your converted files';

  const title2 = 'Simplicity at its Core';
  const how_des1 = 'Just upload your files and tap "Convert". Our tool guarantees the highest quality conversion. Unbeatable Features';

  const title3 = 'Unbeatable Features';
  const how_des2 = 'Effortlessly convert batches of files with our tool, which accommodates any file formats.';

  const title4 = 'Free and Secure';
  const how_des3 = 'Enjoy the benefits of a free, secure, and universally compatible tool accessible from any web browser. For added security and privacy, files are automatically deleted after a few hours.';

  const type_file = 'files';
  const format_type = 'file';

  return (
    <>
      <Head>
        <title>sitfile | converter, compression and background remover platform</title>
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






// // this is for payment subscriber
// "use client"
// import React, { useState } from 'react';
// import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
// import axios from 'axios';

// const PayPalSubscription = () => {
//   const [subscriptionId, setSubscriptionId] = useState(null);
//   const [isSubscribed, setIsSubscribed] = useState(false);

//   const handleApprove = async (data) => {
//     setSubscriptionId(data.subscriptionID);
//     setIsSubscribed(true);
//   };

//   const handleCancel = async () => {
//     await axios.post('http://localhost:8000/cancel-subscription', { subscriptionId });
//     setIsSubscribed(false);
//     setSubscriptionId(null);
//   };

//   return (
//     <PayPalScriptProvider options={{ 
//       "client-id": "AQkP0NQTC9qBpIiGVEi1csbSi9Y5fd-odNG_PvPHKb-J-uEY-H7jrL2kbZ0qg21Q-ZmNpjUXGRLWA3b4", 
//       "vault": true // Add vault here as well
//     }}>
//       <PayPalButtons
//         createSubscription={(data, actions) => {
//           return actions.subscription.create({
//             plan_id: 'P-4D581074SR8210342M37LGUA', // Replace with your actual plan ID
//             vault: true // Make sure vault is set to true here
//           }).then((subscriptionId) => {
//             handleApprove({ subscriptionID: subscriptionId });
//             return subscriptionId;
//           });
//         }}
//         onApprove={(data, actions) => {
//           handleApprove(data);
//         }}
//       />
//       {isSubscribed && <button onClick={handleCancel}>Cancel Subscription</button>}
//     </PayPalScriptProvider>
//   );
// };

