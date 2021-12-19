import React from 'react';

import { noop } from 'utils';
import texts from 'localization';

import '../style.css';

function SelectInput({ options = [], placeholder = '', value = '', onChange = noop }) {
    return (
        <select className="form-input" value={value} onChange={e => onChange(e.target.value)}>
            <option value="" selected disabled hidden>{placeholder}</option>
            {options.map(option => <option key={option.id} value={option.id}>{texts[option.name]}</option>)}
        </select>
    );
};

export default SelectInput;