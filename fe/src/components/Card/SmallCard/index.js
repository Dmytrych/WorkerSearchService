import React from 'react';
import Spacer from 'components/Spacer';
import MainButton from 'components/MainButton';
import SecondaryButton from 'components/SecondaryButton';
import Rating from 'components/Rating';
import { noop } from 'utils';
import { SMALL_SIZE } from 'constants/index';

import './style.css';

function SmallCard({ id, title, subtitle, label, rating, isRatingDisabled, onRatingChange, description, disabled, mainButtonTitle, onMainButtonClick = noop, secondaryButtonTitle, onSecondaryButtonClick = noop }) {
    return (
        <div className='card-container , card-container-small'>
            <h3 className="card-title">{title}</h3>
            <Spacer size={10} />
            <h5 className="card-subtitle">{subtitle}</h5>
            <Spacer size={15} />
            <div className="card-label">
                <div className="card-label-point"></div>
                <Spacer size={5} isHorizontal />
                <p>{label}</p>
            </div>
            <Spacer size={15} />
            {description && <p className='card-description-small'>{description}</p>}
            <Spacer size={15} />
            {!!rating && 
                <div className="flex-container-row main-axis-start">
                    <Rating id={id} size={SMALL_SIZE} value={rating} onChange={onRatingChange} disabled={isRatingDisabled} />
                </div>
            }
            <Spacer size={15} />
            <div className="flex-container-row main-axis-end">
                {secondaryButtonTitle && <SecondaryButton placeholder={secondaryButtonTitle} onClick={onSecondaryButtonClick} disabled={disabled} />}
                {mainButtonTitle && <MainButton placeholder={mainButtonTitle} onClick={onMainButtonClick} disabled={disabled} />}
            </div>
        </div>
    );
  }
  
export default SmallCard;
