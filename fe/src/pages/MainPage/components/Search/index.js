import React from 'react';
import TextInput from 'components/TextInput';
import SecondaryButton from 'components/SecondaryButton';
import { noop } from 'utils';
import texts from 'localization';

import './style.css';

function Search({ value = '', onChange = noop, onFindClick = noop }) {
    return (
      <div className="search-input-container">
        <TextInput placeholder={texts.searchPlaceholder}
          value={value}
          onChange={onChange}
        />
        <SecondaryButton
          onClick={onFindClick}
          placeholder={texts.find}
        />
      </div>
    );
  }
  
export default Search;
