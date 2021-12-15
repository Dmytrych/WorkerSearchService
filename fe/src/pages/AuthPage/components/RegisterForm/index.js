import React from 'react';
import { noop } from 'utils';
import texts from 'localization';
import MainButton from 'components/MainButton';
import TextInput from 'components/TextInput';
import Loader from 'components/Loader';
import Spacer from 'components/Spacer';
import SecondaryButton from 'components/SecondaryButton';
import Banner from '../Banner';

function RegisterForm({ 
    email, 
    onEmailChange = noop, 
    password, 
    onPasswordChange = noop, 
    name, 
    onNameChange = noop,
    reenterPassword, 
    onReenterPasswordChange = noop,
    onSignInClick = noop,
    onRegisterClick = noop,
    isLoading = false, 
    isSuccess = false,
    isError = false,
}) {
    return (
        <div className="auth-form">
            <h2>{texts.registerHeader}</h2>
            <div className="auth-loader-container flex-container-column main-axis-center">
                {isLoading && <Loader />}
                {!isLoading && isSuccess && <Banner placeholder={texts.registerSuccess} success />}
                {!isLoading && isError && <Banner placeholder={texts.passwordDontMatch} error />}
            </div>
            <TextInput 
                placeholder={texts.namePlaceholder}
                value={name}
                onChange={onNameChange}
            />
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
            <TextInput 
                type="password"
                placeholder={texts.reenterPassword}
                value={reenterPassword}
                onChange={onReenterPasswordChange}
            />
            <Spacer size={20} />
            <div className="flex-container-row">
                <MainButton 
                    disabled={isLoading}
                    placeholder={isSuccess ? texts.signIn : texts.register} 
                    onClick={isSuccess ? onSignInClick : onRegisterClick} />
                {!isSuccess && <SecondaryButton 
                    disabled={isLoading}
                    placeholder={texts.signIn } 
                    onClick={onSignInClick} 
                />}
            </div>
        </div>
    );
};

export default RegisterForm;
