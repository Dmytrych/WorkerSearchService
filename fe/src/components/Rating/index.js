import React from 'react';

import { SMALL_SIZE, RATINGS } from 'constants/index';
import { noop } from 'utils';
import Star from './Star';

import './style.css';

function Rating({ id, value, size, onChange = noop, disabled = false }) {
    return (
        <div className="feedback">
            <div className={`rating ${size === SMALL_SIZE ? 'small' : 'large'}`}>
                <Star id="rating-5" name={`rating-${id}`} value={RATINGS.FIVE} onChange={onChange} checked={value === RATINGS.FIVE} disabled={disabled} />
                <Star id="rating-4" name={`rating-${id}`} value={RATINGS.FOUR} onChange={onChange} checked={value === RATINGS.FOUR} disabled={disabled} />
                <Star id="rating-3" name={`rating-${id}`} value={RATINGS.THREE} onChange={onChange} checked={value === RATINGS.THREE} disabled={disabled} />
                <Star id="rating-2" name={`rating-${id}`} value={RATINGS.TWO} onChange={onChange} checked={value === RATINGS.TWO} disabled={disabled} />
                <Star id="rating-1" name={`rating-${id}`} value={RATINGS.ONE} onChange={onChange} checked={value === RATINGS.ONE} disabled={disabled} />
            </div>
        </div>
    )
};

export default Rating;
