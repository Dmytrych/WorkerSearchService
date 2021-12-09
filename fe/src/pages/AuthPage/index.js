import React, { useState } from 'react';

import LoginForm from './components/Form';

import './style.css';

function AuthPage() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    return (
      <div className="auth-page">
        <LoginForm 
          email={email}
          onEmailChange={setEmail}
          password={password}
          onPasswordChange={setPassword}
        />
      </div>
    );
  }
  
export default AuthPage;
