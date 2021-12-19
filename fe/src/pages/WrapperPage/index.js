import React, { useContext } from 'react';

import { ThemeContext, THEMES } from 'contexts/Theme'; 

import 'styles/colors.css';

function WrapperPage({ children }) {
  const [ theme ] = useContext(ThemeContext);
  console.log(theme)
  return (
    <div className={`app-container ${theme === THEMES.DARK ? 'dark-theme' : 'light-theme'}`}>
        {children}
    </div>
  );
}

export default WrapperPage;
