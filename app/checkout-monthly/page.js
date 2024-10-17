




// // this is for payment subscriber
// "use client"
// import React, { useState , useContext } from 'react';
// import { Context } from '../context/context';
// import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
// import axios from 'axios';
// import Navbar from '../navbar/Navbar';
// import './styles.css'
// const PayPalSubscription = () => {
//   const {dispatch , email }=useContext(Context)
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//  ;
//   const handleApprove = async (data) => {

//     dispatch({ type: "LOGIN_SUCCESS_SUBSCRIBER", subscribeid: data.subscriptionID });
//     await axios.post(`${apiUrl}/users/update-subscriber`, {
//       email: email,  
//       subscribeid:data.subscriptionID
//     });

//     if(data.subscriptionID ){
//     window.location.href = '/';

//     }
    
 
//   };

//   const handleCancel = async () => {
//     await axios.post('http://localhost:8000/cancel-subscription', { subscriptionId });

//   };

//   return (

//     <div className='payment'>
// <Navbar/>


// <div className='payment_btns'>
// <PayPalScriptProvider options={{ 
//       "client-id": "AQkP0NQTC9qBpIiGVEi1csbSi9Y5fd-odNG_PvPHKb-J-uEY-H7jrL2kbZ0qg21Q-ZmNpjUXGRLWA3b4", 
//       "vault": true // Add vault here as well
//     }}>
//       <PayPalButtons
//       className='paypal_buts'
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
//     </PayPalScriptProvider>
// </div>


//     </div>
 
//   );
// };

// export default PayPalSubscription;




"use client"
import React, { useContext } from 'react';
import { Context } from '../context/context';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import './styles.css';
const PayPalSubscription = () => {
  const { dispatch, email } = useContext(Context);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleApprove = async (data) => {
    try {
      // Dispatch the action to update the state with the subscription ID
      dispatch({ type: "LOGIN_SUCCESS_SUBSCRIBER", subscriber: data.subscriptionID });

      // Send a POST request to update the user as a subscriber in your database
      await axios.post(`${apiUrl}/users/update-subscriber`, {
        email: email,
        subscriber: data.subscriptionID
      });

      // If the subscription is successful, redirect to the homepage
      if (data.subscriptionID) {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error during subscription approval:', error);
    }
  };

  return (
    <div className='payment'>
      <Navbar />


      <h1 className='title_payment'>Get Unlimited File Conversions for One Month</h1>

<p className='description_payment'  >
Enjoy 30 days of unrestricted access to convert and compress files across all formats, with premium

features included.
</p>

{/* Get Unlimited File Conversions for One Year

Get 12 months of unlimited access at our best value. Perfect for users needing frequent file conversions

and compression. */}
      <div className='payment_btns'>
        <PayPalScriptProvider options={{
          "client-id": "AbLEvlKmCT1wU3V6W7FhJ6uEcAheAU8_OX7elk1I8lr_fvWWiQtDVJm_YL_mZkHdkvyg3oXoDh7Vj_sK",
          "vault": true // Enable vault to store payment details for recurring payments
        }}>
          <PayPalButtons
            className='paypal_buts'
            createSubscription={(data, actions) => {
              return actions.subscription.create({
                plan_id: 'P-0K7522973B957250UM4IRLKQ', 
                vault: true // Recurring payments
              }).then((subscriptionId) => {
                return subscriptionId; // Subscription is created at this stage
              });
            }}
            onApprove={(data, actions) => {
              // This function is triggered after the payment is approved by PayPal
              handleApprove(data); // Now we handle subscription completion and database update
            }}
          />
        </PayPalScriptProvider>
      </div>

    </div>
  );
};

export default PayPalSubscription;
