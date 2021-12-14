import React from 'react';

function Spacer({ size, isHorizontal = false }) {
    return (
        <div style={{ 
            height: !isHorizontal && `${size}px`, 
            width: isHorizontal && `${size}px`,
        }}></div>
    );
  }
  
export default Spacer;
