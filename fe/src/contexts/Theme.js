import React, { useState, createContext, useCallback } from 'react';

import { noop } from 'utils';

export const THEMES = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
};

const initialState = THEMES.LIGHT;

export const ThemeContext = createContext([ initialState, noop ]);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(initialState);
  const setLight = () => setTheme(THEMES.LIGHT);
  const setDark = () => setTheme(THEMES.DARK);

  return (
    <ThemeContext.Provider value={[theme, setLight, setDark]}>
      { children }
    </ThemeContext.Provider>
  );
}
