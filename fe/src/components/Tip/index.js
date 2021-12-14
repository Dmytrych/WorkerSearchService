import React from 'react';
import { noop } from 'utils';
import texts from 'localization';

import './style.css';

function Tip({ value, isSelected = false, onClick = noop }) {
    return (
      <button className={`tip, ${isSelected ? 'tip-selected' : ''}`} value={value} onClick={onClick}>{texts[value]}</button>
    );
  }
  
export default Tip;
