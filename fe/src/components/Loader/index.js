import React from 'react';

import './style.css';

function Loader() {
    return (
        <div className="flex-container-row main-axis-center cross-axis-center">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    );
  }
  
export default Loader;
