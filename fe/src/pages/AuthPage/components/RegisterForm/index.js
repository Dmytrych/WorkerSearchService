import React from 'react';
import { noop } from 'utils';
import texts from 'localization';
import MainButton from 'components/MainButton';
import TextInput from 'components/Input/TextInput';
import Loader from 'components/Loader';
import Spacer from 'components/Spacer';
import SecondaryButton from 'components/SecondaryButton';
import Banner from 'components/Banner';

function RegisterForm({ 
    email, 
    onEmailChange = noop, 
    phoneNumber, 
    onPhoneNumberChange = noop,
    password, 
    onPasswordChange = noop, 
    name, 
    onNameChange = noop,
    reenterPassword, 
    onReenterPasswordChange = noop,
    onSignInClick = noop,
    onRegisterClick = noop,
    isLoading = false, 
    success = '',
    error = '',
}) {
    return (
        <div className="form-container">
             <div className="form-loader-container flex-container-column main-axis-center">
                {isLoading && <Loader />}
                {!isLoading && !!success && <Banner placeholder={success} success />}
                {!isLoading && !!error && <Banner placeholder={error} error />}
            </div>
            <h2>{texts.registerHeader}</h2>
            <Spacer size={30} />
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
                placeholder={texts.phoneNumberPlaceholder}
                value={phoneNumber}
                onChange={onPhoneNumberChange}
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
                    placeholder={!!success ? texts.signIn : texts.register} 
                    onClick={!!success ? onSignInClick : onRegisterClick} />
                {!success && <SecondaryButton 
                    disabled={isLoading}
                    placeholder={texts.signIn } 
                    onClick={onSignInClick} 
                />}
            </div>
        </div>
    );
};

export default RegisterForm;
