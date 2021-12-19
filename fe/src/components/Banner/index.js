import React from 'react';

import './style.css';

function Banner({ placeholder, success, error }) {
    return (
      <div className={`banner ${success && 'success-banner'} ${error && 'error-banner'} flex-container-column main-axis-center cross-axis-center`}>{placeholder}</div>
    );
  }
  
export default Banner;
