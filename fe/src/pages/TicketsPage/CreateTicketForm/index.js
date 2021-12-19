import React from 'react';
import { noop } from 'utils';
import texts from 'localization';
import MainButton from 'components/MainButton';
import TextInput from 'components/Input/TextInput';
import TextareaInput from 'components/Input/TextareaInput';
import SelectInput from 'components/Input/SelectInput';
import Loader from 'components/Loader';
import Spacer from 'components/Spacer';
import Banner from 'components/Banner';

function CreateTicketForm({ 
    name,
    onNameChange = noop,
    price, 
    onPriceChange = noop, 
    category,
    categories = [],
    onCategoryChange = noop,
    descriprion, 
    onDescriptionChange = noop,
    onAddClick = noop,
    onResetClick = noop,
    isLoading = false, 
    isSuccess = false,
}) {
    return (
        <div className="form-container">
             <div className="form-loader-container flex-container-column main-axis-center">
                {isLoading && <Loader />}
                {!isLoading && isSuccess && <Banner placeholder={texts.createTicketSuccess} success />}
            </div>
            <h2>{texts.createTicket}</h2>
            <Spacer size={30} />
            <TextInput 
                placeholder={texts.namePlaceholder}
                value={name}
                onChange={onNameChange}
            />
            <TextInput 
                placeholder={texts.priceWithCurrency}
                value={price}
                onChange={onPriceChange}
            />
            <SelectInput 
                options={categories}
                placeholder={texts.category}
                value={category}
                onChange={onCategoryChange}
            />
            <TextareaInput
                placeholder={texts.descriprion}
                value={descriprion}
                onChange={onDescriptionChange}
            />
            <Spacer size={20} />
            <div className="flex-container-row">
                <MainButton 
                    disabled={isLoading}
                    placeholder={isSuccess ? texts.reset : texts.create} 
                    onClick={isSuccess ? onResetClick : onAddClick} />
            </div>
        </div>
    );
};

export default CreateTicketForm;
