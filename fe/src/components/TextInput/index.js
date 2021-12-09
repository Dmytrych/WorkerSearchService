import React from 'react';

import './style.css';

function TextInput({ placeholder, value, onChange, type="text", }) {
    return (
        <input 
            className="form-input" 
            type={type} 
            placeholder={placeholder}
            value={value} 
            onChange={e => onChange(e.target.value)} />
    );
};

export default TextInput;