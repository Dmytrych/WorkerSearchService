import React, { useState, createContext } from 'react';

import { noop } from 'utils';

export const initialState = null;

export const UserContext = createContext([ initialState, noop ]);

export const UserProvider = ({ children }) => {
  const state = useState(initialState);

  return (
    <UserContext.Provider value={state}>
      { children }
    </UserContext.Provider>
  );
}
