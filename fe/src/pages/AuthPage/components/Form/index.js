import React from 'react';
import { noop } from 'utils';
import texts from 'localization';
import MainButton from 'components/MainButton';
import TextInput from 'components/TextInput';

import './style.css';

function LoginForm({ email, onEmailChange = noop, password, onPasswordChange = noop }) {
    return (
        <div className="login-form">
            <h2>{texts.loginHeader}</h2>
            <TextInput 
                placeholder={texts.emailPlaceholder}
                value={email}
                onChange={onEmailChange}
            />
            <TextInput 
                type="password"
                placeholder='Password'
                value={password}
                onChange={onPasswordChange}
            />
            <MainButton placeholder="Sign in" />
        </div>
    );
};

export default LoginForm;
