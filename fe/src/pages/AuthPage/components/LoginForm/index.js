import React from 'react';
import { noop } from 'utils';
import texts from 'localization';
import MainButton from 'components/MainButton';
import TextInput from 'components/TextInput';
import Loader from 'components/Loader';
import Spacer from 'components/Spacer';
import SecondaryButton from 'components/SecondaryButton';
import Banner from '../Banner';

function LoginForm({ 
    email, 
    onEmailChange = noop, 
    password, 
    onPasswordChange = noop, 
    onSignInClick = noop,
    onFindWorkerClick = noop,
    onRegisterClick = noop,
    onSignOutClick = noop,
    isLoading = false, 
    isSuccess = false, 
    isError = false,
}) {
    return (
        <div className="auth-form">
            <h2>{texts.loginHeader}</h2>
            <div className="auth-loader-container flex-container-column main-axis-center">
                {isLoading && <Loader />}
                {!isLoading && isSuccess && <Banner placeholder={texts.signInSuccess} success />}
                {!isLoading && isError && <Banner placeholder={texts.signInError} error />}
            </div>
            <TextInput 
                placeholder={texts.emailPlaceholder}
                value={email}
                onChange={onEmailChange}
            />
            <TextInput 
                type="password"
                placeholder={texts.password}
                value={password}
                onChange={onPasswordChange}
            />
            <Spacer size={20} />
            <div className="flex-container-row">
                <MainButton 
                    disabled={isLoading} 
                    placeholder={isSuccess ? texts.findWorker : texts.signIn} 
                    onClick={!isSuccess ? onSignInClick : onFindWorkerClick} 
                />
                <SecondaryButton 
                    disabled={isLoading} 
                    placeholder={isSuccess ? texts.signOut : texts.register } 
                    onClick={!isSuccess ? onRegisterClick : onSignOutClick} 
                />
            </div>
        </div>
    );
};

export default LoginForm;
