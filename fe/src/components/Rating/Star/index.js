import React from 'react';

import { noop } from 'utils';

import './style.css';

function Star({ id, name, value, onChange = noop, checked = false, disabled = false }) {
    return (
        <>
            <input type="radio" name={name} id={id} className={!disabled && 'enabled'} value={value} onChange={onChange} checked={checked} disabled={disabled} />
            <label for={id}></label>
        </>
    )
};

export default Star;
