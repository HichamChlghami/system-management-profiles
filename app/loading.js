import React from 'react';
import './loading.css'; 

function loading() {
  return (
    <div className="loading-container">
      <div className="loader">
        <div className="dot"></div>
        <div className="dot1"></div>
        <div className="dot2"></div>

      </div>
      <h1 className='loading_h1'>Loading...</h1>
    </div>
  );
}

export default loading;