import React from 'react';

import { SMALL_SIZE, RATINGS } from 'constants/index';
import { noop } from 'utils';

import './style.css';

function Rating({ id, value, size, onChange = noop, disabled = false }) {
    console.log(value)
    return (
        <div className="feedback">
            <div className={`rating ${size === SMALL_SIZE ? 'small' : 'large'}`}>
                <input type="radio" name={`rating-${id}`} id="rating-5" className={!disabled && 'enabled'} value={RATINGS.FIVE} onChange={onChange} checked={value === RATINGS.FIVE} disabled={disabled} />
                <label for="rating-5"></label>
                <input type="radio" name={`rating-${id}`} id="rating-4" className={!disabled && 'enabled'} value={value === RATINGS.FOUR} onChange={onChange} checked={value === RATINGS.FOUR} disabled={disabled} />
                <label for="rating-4"></label>
                <input type="radio" name={`rating-${id}`} id="rating-3" className={!disabled && 'enabled'} value={value === RATINGS.THREE} onChange={onChange} checked={value === RATINGS.THREE} disabled={disabled} />
                <label for="rating-3"></label>
                <input type="radio" name={`rating-${id}`} id="rating-2" className={!disabled && 'enabled'} value={value === RATINGS.TWO} onChange={onChange} checked={value === RATINGS.TWO} disabled={disabled} />
                <label for="rating-2"></label>
                <input type="radio" name={`rating-${id}`} id="rating-1" className={!disabled && 'enabled'} value={value === RATINGS.ONE} onChange={onChange} checked={value === RATINGS.ONE} disabled={disabled} />
                <label for="rating-1"></label>   
            </div>
        </div>
    )
};

export default Rating;
