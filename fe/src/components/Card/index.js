import React from 'react';
import LargeCard from './LargeCard';
import SmallCard from './SmallCard';
import { SMALL_SIZE } from 'constants/index';

import './style.css';

const Card = size => props => size === SMALL_SIZE ? <SmallCard {...props} /> : <LargeCard {...props} />

export default Card;
