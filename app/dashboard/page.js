
'use client'



import React, { useState  , useContext} from 'react';
import './dashboard.css'
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import { Context } from '../context/context';
import Link from 'next/link';

const SubscriptionTable = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const { dispatch , email  , payer  , subscriber} = useContext(Context);


  const [showModal, setShowModal] = useState(false);



  // Handle delete button click to show the modal
  const handleDeleteClick = () => {
    setShowModal(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handle delete confirmation
  const handleConfirmDelete = async () => {
    try {
      await axios.post(`${apiUrl}/cancel-subscription`, { subscriptionId: subscriber });
      dispatch({ type: "LOGIN_SUBSCRIBER_FINISHED" });
      await axios.post(`${apiUrl}/cancel-user-subscription`, { email: email });
      setShowModal(false);
      window.location.href = '/';
    } catch (error) {
      console.error("Error canceling subscription:", error);
    }
  };
  

  return (

<div className='subscription_page'>
<Navbar/>



<div className="subscription-section">
      {/* <h2>Subscriptions</h2> */}
      <table className="subscription-table">
        <thead>
          <tr>
            <th>Package</th>
            <th>compression</th>
            <th>conversion</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        <tr  className={subscriber ? 'two':'one'}>
          {payer ? <td data-label="Package">Paid </td> :<td data-label="Package">Free</td>}

          { payer?<td data-label="compression">Unlimited</td>:<td data-label="compression">limited</td>}
          
          {payer ? <td data-label="conversion">Unlimited</td>:<td data-label="conversion">limited</td> }
            
              <td data-label="Status">active</td>
              <td data-label="Action">
                <Link   href='/pricing'className="upgrade-btn">Upgrade</Link>
                {
                    subscriber &&(
                <button className="delete-btn" onClick={handleDeleteClick}>Delete</button>

                    )
                }
              </td>
            </tr>
        </tbody>
      </table>

      {/* Modal for delete confirmation */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure you want to delete your subscription?</h3>
            <p>Canceling your subscription will remove unlimited authentication, and your account will go back to a regular user.</p>
            <div className="modal-actions">
              <button className="confirm-delete-btn" onClick={handleConfirmDelete}>Delete</button>
              <button className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
</div>



  );
};

export default SubscriptionTable;






