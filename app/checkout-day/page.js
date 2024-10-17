'use client'

import { useState, useEffect, useContext } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import '../checkout-monthly/styles.css';
import { Context } from "../context/context";
import Navbar from "../navbar/Navbar";
const App = () => {
  const { email, dispatch } = useContext(Context);
  const [clientToken, setClientToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReloadMessage, setShowReloadMessage] = useState(false); // State for showing reload message
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  async function createOrderCallback() {
    try {
      const response = await axios.post(`${apiUrl}/api/orders`, {
        cart: [
          {
            id: "YOUR_PRODUCT_ID",
            quantity: "YOUR_PRODUCT_QUANTITY",
          },
        ],
      });

      const orderData = response.data;

      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      return `Could not initiate PayPal Checkout...${error}`;
    }
  }

  async function onApproveCallback(data, actions) {
    try {
      const response = await axios.post(`${apiUrl}/api/orders/${data.orderID}/capture`);
      const orderData = response.data;
      const transaction =
        orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
        orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED" && !data.card && actions) {
        return actions.restart();
      } else if (errorDetail || !transaction || transaction.status === "DECLINED") {
        let errorMessage;
        if (transaction) {
          errorMessage = `Transaction ${transaction.status}: ${transaction.id}`;
        } else if (errorDetail) {
          errorMessage = `${errorDetail.description} (${orderData.debug_id})`;
        } else {
          errorMessage = JSON.stringify(orderData);
        }

        throw new Error(errorMessage);
      } else {
        await axios.post(`${apiUrl}/users/update-payer`, {
          email: email,  // Use email from context
        });

        // Dispatch login success action
        dispatch({ type: "LOGIN_SUCCESS_PAYER" });

        localStorage.setItem('payerUpdated', 'true');

        window.location.href = '/';
      }
    } catch (error) {
      alert(`Sorry, your transaction could not be processed. ${error}`);
    }
  }

  const initialOptions = {
    "client-id": "AbLEvlKmCT1wU3V6W7FhJ6uEcAheAU8_OX7elk1I8lr_fvWWiQtDVJm_YL_mZkHdkvyg3oXoDh7Vj_sK",
    "data-client-token": clientToken,
    components: "hosted-fields,buttons",
    "enable-funding": "paylater,venmo",
    "data-sdk-integration-source": "integrationbuilder_ac",
  };

  useEffect(() => {
    (async () => {
      const response = await axios.post(`${apiUrl}/api/token`);
      const { client_token } = response.data;
      setClientToken(client_token);
      setLoading(false); // Stop loading once token is received
    })();

    // Timeout to check if the PayPal buttons failed to load
    const timeout = setTimeout(() => {
      if (!clientToken  &&  loading === false) {
        setShowReloadMessage(true); // Show reload message if buttons haven't loaded
      }
    }, 10000); // Wait for 10 seconds

    return () => clearTimeout(timeout); // Cleanup the timeout on component unmount
  }, [clientToken]);

  return (
    <div>
      <Navbar />
      <h1 className='title_payment'>Get Unlimited File Conversions for 24 Hours</h1>

<p className='description_payment'  >
Convert documents, videos, images, and audios without limits. Access all our premium tools for just 24

hours!
</p>
   
      <div className="payment_btns_day">
    
        {loading ? (
          <div className="spinner"></div> // Show spinner while loading
        ) : (
          clientToken ? (
            <PayPalScriptProvider options={initialOptions}>
              <div>
                <PayPalButtons
                  className="paypal_buts"
                  style={{
                    shape: "rect",
                    layout: "vertical",
                  }}
                  createOrder={createOrderCallback}
                  onApprove={onApproveCallback}
                />
              </div>
            </PayPalScriptProvider>
          ) : (
            <h4  className="message_paypal_h4" >Unable to load PayPal client token, reload the page</h4>
          )
        )}
        {showReloadMessage && (
          <div className="reload-message">
            <h4 className="message_paypal_h4" >It seems the PayPal buttons didn't load. Please reload the page.</h4>
          </div>
        )}
        
         
      </div>

    </div>
  );
};

export default App;


























// 'use client'

// import { useState, useEffect, useContext } from "react";
// import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
// import axios from "axios";
// import '../checkout/styles.css';
// import { Context } from "../context/context";
// import Navbar from "../navbar/Navbar";

// const App = () => {
//   const {  email, dispatch } = useContext(Context);
//   const [clientToken, setClientToken] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;




//   async function createOrderCallback() {
//     try {
//       const response = await axios.post(`${apiUrl}/api/orders`, {
//         cart: [
//           {
//             id: "YOUR_PRODUCT_ID",
//             quantity: "YOUR_PRODUCT_QUANTITY",
//           },
//         ],
//       });

//       const orderData = response.data;

//       if (orderData.id) {
//         return orderData.id;
//       } else {
//         const errorDetail = orderData?.details?.[0];
//         const errorMessage = errorDetail
//           ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
//           : JSON.stringify(orderData);

//         throw new Error(errorMessage);
//       }
//     } catch (error) {
//       console.error(error);
//       return `Could not initiate PayPal Checkout...${error}`;
//     }
//   }

//   async function onApproveCallback(data, actions) {
//     try {
//       const response = await axios.post(`${apiUrl}/api/orders/${data.orderID}/capture`);
//       const orderData = response.data;
//       const transaction =
//         orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
//         orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
//       const errorDetail = orderData?.details?.[0];

//       if (errorDetail?.issue === "INSTRUMENT_DECLINED" && !data.card && actions) {
//         return actions.restart();
//       } else if (errorDetail || !transaction || transaction.status === "DECLINED") {
//         let errorMessage;
//         if (transaction) {
//           errorMessage = `Transaction ${transaction.status}: ${transaction.id}`;
//         } else if (errorDetail) {
//           errorMessage = `${errorDetail.description} (${orderData.debug_id})`;
//         } else {
//           errorMessage = JSON.stringify(orderData);
//         }

//         throw new Error(errorMessage);
//       } else {
//         await axios.post(`${apiUrl}/users/update-payer`, {
//           email: email,  // Use email from context
//         });

//         // Dispatch login success action
//         dispatch({ type: "LOGIN_SUCCESS_PAYER" });

//         localStorage.setItem('payerUpdated', 'true');



//         window.location.href = '/';
//       }
//     } catch (error) {
//       alert(`Sorry, your transaction could not be processed. ${error}`);
//     }
//   }

//   const initialOptions = {
//     "client-id": "AQkP0NQTC9qBpIiGVEi1csbSi9Y5fd-odNG_PvPHKb-J-uEY-H7jrL2kbZ0qg21Q-ZmNpjUXGRLWA3b4",
//     "data-client-token": clientToken,
//     components: "hosted-fields,buttons",
//     "enable-funding": "paylater,venmo",
//     "data-sdk-integration-source": "integrationbuilder_ac",
//   };

//   useEffect(() => {
//     (async () => {
//       const response = await axios.post(`${apiUrl}/api/token`);
//       const { client_token } = response.data;
//       setClientToken(client_token);
//       setLoading(false); // Stop loading once token is received
//     })();
//   }, []);

//   return (
//     <div>
//       <Navbar />


//       <div className="payment_btns_day">
//         {loading ? (
//           <div className="spinner"></div> // Show spinner while loading
//         ) : (
//           clientToken ? (
//             <PayPalScriptProvider options={initialOptions}>
//               <div>
//                 <PayPalButtons
//                   className="paypal_buts"
//                   style={{
//                     shape: "rect",
//                     layout: "vertical",
//                   }}
//                   createOrder={createOrderCallback}
//                   onApprove={onApproveCallback}
//                 />
//               </div>
//             </PayPalScriptProvider>
//           ) : (
//             <h4>Unable to load PayPal client token, reload the page</h4>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;
