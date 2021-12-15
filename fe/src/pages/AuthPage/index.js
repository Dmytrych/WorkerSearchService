import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { login, register } from 'api';

import './style.css';

function AuthPage() {
  const navigate = useNavigate();
  const [ registerMode, setRegisterMode ] = useState(false);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ name, setName ] = useState('');
  const [ reenterPassword, setReenterPassword ] = useState('');

  const [ user, setUser ] = useState(null);

  const [ auth, setAuth ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isError, setIsError ] = useState(false);
  const [ isSuccess, setIsSuccess ] = useState(false);

  const resetData = () => {
    setIsSuccess(false);
    setIsLoading(false);
    setIsError(false);
    setEmail('');
    setPassword('');
    setName('');
    setReenterPassword('');
  };

  const onSignInClick = () => {
    if(registerMode) {
      resetData();
      setRegisterMode(false);
    } else {
      setAuth(true);
    }
  };
  const onFindWorkerClick = () => navigate('/');
  const onRegisterClick = () => {
    if(registerMode) {
      setAuth(true);
    } else {
      resetData();
      setRegisterMode(true);
    }
  }
  const onSignOutClick = () => resetData();

  useEffect(async () => {
    if(auth && registerMode) {
      if(password !== reenterPassword) {
        setIsError(true);
      } else {
        setIsError(false);
        setIsLoading(true);
        await register(name, email, password);
        setIsLoading(false);
        setIsSuccess(true);
      }
      setAuth(false);
    }
  }, [auth]);
     
  useEffect(async () => {
    if(auth && !registerMode) {
      setIsLoading(true);
      const user = await login(email, password);
      setUser(user);
      setIsLoading(false);
      setIsSuccess(true);
      setAuth(false);
    }
  }, [auth]);

  return (
    <div className="auth-page">
      {!registerMode && <LoginForm 
        email={email}
        onEmailChange={setEmail}
        password={password}
        onPasswordChange={setPassword}
        onSignInClick={onSignInClick}
        onFindWorkerClick={onFindWorkerClick}
        onRegisterClick={onRegisterClick}
        onSignOutClick={onSignOutClick}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />}
      {registerMode && 
        <RegisterForm
          email={email}
          onEmailChange={setEmail}
          password={password}
          onPasswordChange={setPassword}
          name={name}
          onNameChange={setName}
          reenterPassword={reenterPassword}
          onReenterPasswordChange={setReenterPassword}
          onSignInClick={onSignInClick}
          onRegisterClick={onRegisterClick}
          onSignOutClick={onSignOutClick}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
      />}
    </div>
  );
}
  
export default AuthPage;
