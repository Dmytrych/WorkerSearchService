import React from 'react';
import { noop } from 'utils';
import Tip from 'components/Tip';
import texts from 'localization';

import './style.css';

function Filter({ selectedValueId = '', values = [], onTipClick = noop }) {
    return (
      <div className="search-tips">
        {values.map(value => <Tip value={value.id} label={texts[value.name]} onClick={onTipClick} isSelected={selectedValueId === value.id} />)}
      </div>
    );
  }
  
export default Filter;
