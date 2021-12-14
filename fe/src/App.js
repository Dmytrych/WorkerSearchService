import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navigation from 'components/Navigation';
import MainPage from 'pages/MainPage';
import AuthPage from 'pages/AuthPage';
import ProDetailsPage from 'pages/ProDetailsPage';
import OrdersPage from 'pages/OrdersPage';

import './index.css';
import './styles/colors.css';
import './styles/shared.css';

function App() {
  return (
    <div className="app-container">
      <Router>
        <Navigation />
        <Routes>
          <Route exact path='/' element={<MainPage />} />
          <Route exact path='/auth' element={<AuthPage />} />
          <Route path='/prodetails/:id' element={<ProDetailsPage />} />
          <Route path='/orders'  element={<OrdersPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
