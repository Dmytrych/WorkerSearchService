import React from 'react';
import { Link } from 'react-router-dom';
import texts from 'localization';

import './style.css';

function Navigation() {
    return (
        <nav className="navigation">
            <Link to='/' className="link"><p>{texts.mainPage}</p></Link>
            <Link to='/auth' className="link"><p>{texts.authpage}</p></Link>
            <Link to='/orders' className="link"><p>{texts.orders}</p></Link>
        </nav>
    );
  }
  
export default Navigation;
