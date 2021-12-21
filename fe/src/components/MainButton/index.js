import React from 'react';

import './style.css';

function MainButton({ placeholder, value, onClick, disabled = false, visible = true }) {
    return visible ? <button className="main-button" value={value} onClick={onClick} disabled={disabled}>{placeholder}</button> : <></>
}
  
export default MainButton;
