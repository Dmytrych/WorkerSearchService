import React from 'react';
import { noop } from 'utils';
import Tip from 'components/Tip';

import './style.css';

function Filter({ selectedValue, values = [], onTipClick = noop }) {
    return (
      <div className="search-tips">
        <Tip value={values[0]} onClick={onTipClick} isSelected={selectedValue === values[0]} />
        <Tip value={values[1]} onClick={onTipClick} isSelected={selectedValue === values[1]} />
        <Tip value={values[2]} onClick={onTipClick} isSelected={selectedValue === values[2]} />
      </div>
    );
  }
  
export default Filter;
