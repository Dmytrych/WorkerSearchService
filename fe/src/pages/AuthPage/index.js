import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router";

import { login, register } from 'api';
import { getDefaultAsyncState, isEmail, init, loading, success, error } from 'utils';
import { UserContext } from 'contexts/User';
import texts from 'localization';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

import './style.css';

function AuthPage() {
  const navigate = useNavigate();

  const [ registerMode, setRegisterMode ] = useState(false);
  const [ user, setUser ] = useContext(UserContext);
  const [ asyncState, setAsyncState ] = useState(getDefaultAsyncState());

  const [ email, setEmail ] = useState('');
  const [ phoneNumber, setPhoneNumber ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ name, setName ] = useState('');
  const [ reenterPassword, setReenterPassword ] = useState('');

  const resetData = () => {
    setAsyncState(getDefaultAsyncState());
    setEmail('');
    setPhoneNumber('');
    setPassword('');
    setName('');
    setReenterPassword('');
  };

  const isSignInFormField = () => email && password;
  const isRegisterFormField = () => email && phoneNumber && password && name && reenterPassword;

  const onSignInClick = () => {
    if(registerMode) {
      resetData();
      setRegisterMode(false);
    } else {
      setAsyncState(init(true));
    }
  };
  const onFindWorkerClick = () => navigate('/');
  const onRegisterClick = () => {
    if(registerMode) {
      setAsyncState(init(true));
    } else {
      resetData();
      setRegisterMode(true);
    }
  }
  const onCreateTicketClick = () => navigate('/tickets');

  useEffect(() => {
    async function fetchData() {
      if(asyncState.init && registerMode) {
        if(!isRegisterFormField()) {
          setAsyncState(init(false));
          return setAsyncState(error(texts.fillForm));
        }
        if(!isEmail(email)) {
          setAsyncState(init(false));
          return setAsyncState(error(texts.invalidEmail));
        }
        if(password !== reenterPassword) {
          setAsyncState(init(false));
          return setAsyncState(error(texts.passwordDontMatch));
        } 

        setAsyncState(error(''));
        setAsyncState(loading(true));

        await register({ name, email, phoneNumber, password });

        setAsyncState(loading(false));
        setAsyncState(success(texts.signInSuccess));
      }
    }
    fetchData();
  }, [asyncState.init]);
     
  useEffect(() => {
    async function fetchData() {
      if(asyncState.init && !registerMode) {
        if(!isSignInFormField()) {
          setAsyncState(init(false));
          return setAsyncState(error(texts.fillForm));
        }

        setAsyncState(error(''));
        setAsyncState(loading(true));

        const user = await login(email, password);
        setUser(user);

        setAsyncState(loading(false));
        setAsyncState(success(texts.signInSuccess));
        setAsyncState(init(false));
      }
    };
    fetchData();
  }, [asyncState.init]);

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
        onCreateTicketClick={onCreateTicketClick}
        isLoading={asyncState.loading}
        success={user && asyncState.success}
        error={asyncState.error}
      />}
      {registerMode && 
        <RegisterForm
          email={email}
          onEmailChange={setEmail}
          phoneNumber={phoneNumber}
          onPhoneNumberChange={setPhoneNumber}
          password={password}
          onPasswordChange={setPassword}
          name={name}
          onNameChange={setName}
          reenterPassword={reenterPassword}
          onReenterPasswordChange={setReenterPassword}
          onSignInClick={onSignInClick}
          onRegisterClick={onRegisterClick}
          isLoading={asyncState.loading}
          success={asyncState.success}
          error={asyncState.error}
      />}
    </div>
  );
}
  
export default AuthPage;
