import React from 'react';

import '../style.css';

function TextareaInput({ placeholder, value, onChange, type="text", }) {
    return (
        <textarea 
            className="form-input form-textarea" 
            type={type} 
            placeholder={placeholder}
            value={value} 
            onChange={e => onChange(e.target.value)} />
    );
};

export default TextareaInput;