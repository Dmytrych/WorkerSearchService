import React from 'react';
import LargeCard from './LargeCard';
import SmallCard from './SmallCard';
import { SMALL_SIZE, LARGE_SIZE } from 'constants/index';

import './style.css';

const Card = size => props => {
    switch (size){
        case SMALL_SIZE:
            return <SmallCard {...props} />
        case LARGE_SIZE:
            return <LargeCard {...props} />
        default:
            return <SmallCard {...props} />
    }
}

export default Card;
