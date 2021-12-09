import React from 'react';
import TextInput from 'components/TextInput';
import SecondaryButton from 'components/SecondaryButton';
import { noop } from 'utils';
import texts from 'localization';

import './style.css';

function Search({ value = '', onChange = noop, onFindPress = noop, onTipPress = noop }) {
    return (
      <>
        <div className="search-root">
          <h1 className="search-title">{texts.mainPageTitle}</h1>
          <div className="search-input-container">
            <TextInput placeholder={texts.searchPlaceholder}
              value={value}
              onChange={onChange}
            />
            <SecondaryButton
              onClick={onFindPress}
              placeholder={texts.find}
            />
          </div>
          <div className="search-tips">
            <button value="Plumber" onClick={onTipPress}>{texts.plumber}</button>
            <button value="Cleaner" onClick={onTipPress}>{texts.cleaner}</button>
            <button value="Electrician" onClick={onTipPress}>{texts.electrician}</button>
          </div>
        </div>
      </>
    );
  }
  
export default Search;
