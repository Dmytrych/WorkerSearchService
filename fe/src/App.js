import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navigation from 'components/Navigation';
import MainPage from 'pages/MainPage';
import AuthPage from 'pages/AuthPage';
import TicketDetailsPage from 'pages/TicketDetailsPage';
import OrdersPage from 'pages/OrdersPage';
import PrivateElement from 'components/PrivateElement';
import TicketsPage from 'pages/TicketsPage';
import WrapperPage from 'pages/WrapperPage';
import { UserProvider } from 'contexts/User'; 
import { ThemeProvider, ThemeContext, THEMES } from 'contexts/Theme'; 

import './index.css';
import './styles/colors.css';
import './styles/shared.css';

function App() {
  const [ theme ] = useContext(ThemeContext);
  console.log(theme)
  return (
    <UserProvider>
      <ThemeProvider>
        <WrapperPage>
          <Router>
            <Navigation />
            <Routes>
              <Route exact path='/' element={<MainPage />} />
              <Route exact path='/auth' element={<AuthPage />} />
              <Route path='/ticket/:id' element={<TicketDetailsPage />} />
              <Route path='/orders' element={
                <PrivateElement>
                  <OrdersPage />
                </PrivateElement>
              } />
              <Route path='/tickets' element={
                <PrivateElement>
                  <TicketsPage />
                </PrivateElement>
              } />
            </Routes>
          </Router>
        </WrapperPage>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
