import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import texts from 'localization';
import SecondaryButton from 'components/SecondaryButton';
import { UserContext, initialState } from 'contexts/User';
import { ThemeContext, THEMES } from 'contexts/Theme';

import './style.css';
import Spacer from 'components/Spacer';

function Navigation() {
    const [ user, setUser ] = useContext(UserContext);
    const [ theme, setLight, setDark ] = useContext(ThemeContext);

    return (
        <nav className="navigation">
            <div className="flex-container-row">
                <Link to='/' className="link"><p>{texts.mainPage}</p></Link>
                {!user && <Link to='/auth' className="link"><p>{texts.authpage}</p></Link>}
                {user && <Link to='/orders' className="link"><p>{texts.orders}</p></Link>}
                {user && <Link to='/tickets' className="link"><p>{texts.tickets}</p></Link>}
            </div>
            <div className="flex-container-row">
                <SecondaryButton 
                    onClick={theme === THEMES.LIGHT ? setDark : setLight } 
                    placeholder={theme === THEMES.LIGHT ? texts.setDarkTheme : texts.setLightTheme} 
                />
                {user && <SecondaryButton onClick={() => setUser(initialState)} placeholder={texts.signOut} />}
                <Spacer size={60} isHorizontal />
            </div>
        </nav>
    );
  }
  
export default Navigation;
