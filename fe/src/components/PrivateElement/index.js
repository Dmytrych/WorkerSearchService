import React, { useContext } from "react";

import { Navigate } from "react-router-dom";
import { UserContext } from 'contexts/User';

const PrivateElement = ({ children }) => {
  const [ user ] = useContext(UserContext);
  return user ? children : <Navigate to="/auth" />;
}

export default PrivateElement;