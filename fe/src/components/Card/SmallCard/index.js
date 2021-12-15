import React from 'react';
import Spacer from 'components/Spacer';
import MainButton from 'components/MainButton';
import SecondaryButton from 'components/SecondaryButton';
import { noop } from 'utils';

import './style.css';

function SmallCard({ title, subtitle, label, desctiption, disabled, mainButtonTitle, onMainButtonClick = noop, secondaryButtonTitle, onSecondaryButtonClick = noop }) {
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
            <p className='card-desctiption-small'>{desctiption}</p>
            <Spacer size={15} />
            <div className="flex-container-row main-axis-end">
                {secondaryButtonTitle && <SecondaryButton placeholder={secondaryButtonTitle} onClick={onSecondaryButtonClick} disabled={disabled} />}
                {mainButtonTitle && <MainButton placeholder={mainButtonTitle} onClick={onMainButtonClick} />}
            </div>
        </div>
    );
  }
  
export default SmallCard;
