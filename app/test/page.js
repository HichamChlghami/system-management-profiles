// import './test.css'; // Assuming the CSS above is saved in this file

// const ProgressBarComponent = () => {
//   return (
//     <div className="progress-bar">
//       <div className="signal"></div>
//     </div>
//   );
// };

// export default ProgressBarComponent;

// 'use client'

// import React, { useState } from 'react';
// import axios from 'axios';

// const ChunkUpload = () => {
//   const [file, setFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const uploadFileInChunks = async () => {
//     if (!file) return;

//     const chunkSize = 1 * 1024 * 1024; // 1MB
//     const totalChunks = Math.ceil(file.size / chunkSize);

//     for (let i = 0; i < totalChunks; i++) {
//       const start = i * chunkSize;
//       const end = Math.min(file.size, start + chunkSize);
//       const chunk = file.slice(start, end);

//       const formData = new FormData();
//       formData.append('chunk', chunk);
//       formData.append('chunkNumber', i);
//       formData.append('totalChunks', totalChunks);
//       formData.append('fileName', file.name);

//       await axios.post('http://localhost:8080/upload1', formData, {
//         onUploadProgress: (progressEvent) => {
//           const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           setUploadProgress((prevProgress) => prevProgress + progress / totalChunks);
//         },
//       });
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={uploadFileInChunks}>Upload</button>
//       <div>Upload Progress: {uploadProgress}%</div>
//     </div>
//   );
// };

// export default ChunkUpload;





// 'use client'

// import React, { useState } from 'react';
// import axios from 'axios';

// const ChunkUpload = () => {
//   const [file, setFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const uploadFileInChunks = async () => {
//     if (!file) return;

//     const chunkSize = 1 * 1024 * 1024; // 1MB
//     const totalChunks = Math.ceil(file.size / chunkSize);

//     let totalUploaded = 0;

//     for (let i = 0; i < totalChunks; i++) {
//       const start = i * chunkSize;
//       const end = Math.min(file.size, start + chunkSize);
//       const chunk = file.slice(start, end);

//       const formData = new FormData();
//       formData.append('chunk', chunk);
//       formData.append('chunkNumber', i);
//       formData.append('totalChunks', totalChunks);
//       formData.append('fileName', file.name);

//       await axios.post('http://localhost:8080/upload1', formData, {
//         onUploadProgress: (progressEvent) => {
//           const chunkProgress = (progressEvent.loaded / chunk.size) * 100;
//           const overallProgress = ((totalUploaded + progressEvent.loaded) / file.size) * 100;
//           setUploadProgress(overallProgress);
//         },
//       });

//       totalUploaded += chunk.size;
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={uploadFileInChunks}>Upload</button>
//       <div>Upload Progress: {Math.min(uploadProgress, 100).toFixed(2)}%</div>
//     </div>
//   );
// };

// export default ChunkUpload;


// pages/checkout.js


'use client'

// pages/checkout.js
// pages/checkout.js

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post('http://localhost:5000/api/checkout', { amount: 1000 });
      const clientSecret = data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          setMessage('Payment succeeded!');
        }
      }
    } catch (error) {
      setMessage(error.response ? error.response.data.error : error.message);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || isLoading}>
        {isLoading ? 'Processing…' : 'Pay'}
      </button>
      {message && <div>{message}</div>}
    </form>
  );
};

const CheckoutPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutPage;
