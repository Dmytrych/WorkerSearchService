import React from 'react';

import './style.css';

function MainButton({ placeholder, value, onClick }) {
    return <button className="main-button" value={value} onClick={onClick}>{placeholder}</button>
}
  
export default MainButton;
