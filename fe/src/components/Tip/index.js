import React from 'react';
import { noop } from 'utils';

import './style.css';

function Tip({ value, label, isSelected = false, onClick = noop }) {
    return (
      <button className={`tip ${isSelected ? 'tip-selected' : ''}`} value={value} onClick={onClick}>{label}</button>
    );
  }
  
export default Tip;
