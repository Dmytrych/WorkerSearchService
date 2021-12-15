import React from 'react';

import './style.css';

function SecondaryButton({ placeholder, value, onClick, disabled = false }) {
    return <button className="secondary-button" value={value} onClick={onClick} disabled={disabled}>{placeholder}</button>
}
  
export default SecondaryButton;
