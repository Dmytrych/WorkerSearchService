import React from 'react';
import { noop } from 'utils';
import texts from 'localization';
import MainButton from 'components/MainButton';
import TextInput from 'components/Input/TextInput';
import Loader from 'components/Loader';
import Spacer from 'components/Spacer';
import SecondaryButton from 'components/SecondaryButton';
import Banner from 'components/Banner';

function LoginForm({ 
    email, 
    onEmailChange = noop, 
    password, 
    onPasswordChange = noop, 
    onSignInClick = noop,
    onFindWorkerClick = noop,
    onRegisterClick = noop,
    onCreateTicketClick = noop,
    isLoading = false, 
    success = false, 
    error = false,
}) {
    return (
        <div className="form-container">
            <div className="form-loader-container flex-container-column main-axis-center">
                {isLoading && <Loader />}
                {!isLoading && !!success && <Banner placeholder={success} success />}
                {!isLoading && !!error && <Banner placeholder={error} error />}
            </div>
            <h2>{texts.loginHeader}</h2>
            <Spacer size={10} />
            <h5>{texts.signInActionsDescription}</h5>
            <Spacer size={30} />
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
                    placeholder={!!success ? texts.findWorker : texts.signIn} 
                    onClick={!!success ? onFindWorkerClick : onSignInClick} 
                />
                <SecondaryButton 
                    disabled={isLoading} 
                    placeholder={!!success ? texts.createTicket : texts.register } 
                    onClick={!!success ? onCreateTicketClick : onRegisterClick} 
                />
            </div>
        </div>
    );
};

export default LoginForm;
