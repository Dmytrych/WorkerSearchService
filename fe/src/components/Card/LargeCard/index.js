import React from 'react';
import Spacer from 'components/Spacer';
import MainButton from 'components/MainButton';
import SecondaryButton from 'components/SecondaryButton';
import Rating from 'components/Rating';
import { noop } from 'utils';

import './style.css';

function LargeCard({ id, title, subtitle, label, rating, isRatingDisabled, onRatingChange, desctiption, disabled, mainButtonTitle, onMainButtonClick = noop, secondaryButtonTitle, onSecondaryButtonClick = noop }) {
    return (
        <div className='card-container card-container-big'>
            <h1 className="card-title">{title}</h1>
            <Spacer size={20} />
            <h3 className="card-subtitle">{subtitle}</h3>
            <Spacer size={25} />
            <div className="card-label">
                <div className="card-label-point"></div>
                <Spacer size={5} isHorizontal />
                <p>{label}</p>
            </div>
            <Spacer size={15} />
            <p className='card-desctiption-big'>{desctiption}</p>
            <Spacer size={25} />
            {!!rating && 
                <div className="flex-container-row main-axis-start">
                    <Rating id={id} value={rating} onChange={onRatingChange} disabled={isRatingDisabled} />
                </div>
            }
            <Spacer size={25} />
            <div className="flex-container-row main-axis-end">
                {secondaryButtonTitle && <SecondaryButton placeholder={secondaryButtonTitle} onClick={onSecondaryButtonClick} disabled={disabled} />}
                {mainButtonTitle && <MainButton placeholder={mainButtonTitle} onClick={onMainButtonClick} />}
            </div>
        </div>
    );
  }
  
export default LargeCard;
