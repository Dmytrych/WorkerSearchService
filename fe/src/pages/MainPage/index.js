import React, { useState } from 'react';

import Search from './components/Search';

function MainPage() {
    const [ value, setValue ] = useState('');

    const onTipPress = e => setValue(e.target.value);

    return (
      <>
        <Search value={value} onChange={setValue} onTipPress={onTipPress} />
      </>
    );
  }
  
export default MainPage;
