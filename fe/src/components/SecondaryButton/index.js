import React from 'react';

import './style.css';

function SecondaryButton({ placeholder, value, onClick }) {
    return <button className="secondary-button" value={value} onClick={onClick}>{placeholder}</button>
}
  
export default SecondaryButton;
