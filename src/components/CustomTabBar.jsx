import React from 'react';
import { NavLink } from 'react-router-dom';
import './CustomTabBar.css';

const CustomTabBar = () => {
  return (
    <div className="custom-tab-bar">
      <NavLink to="/tab1" className="tab-button" activeClassName="active">
        <img src="/assets/Home.png" alt="Home" className="tab-icon" />
        
      </NavLink>
      <NavLink to="/tab2" className="tab-button" activeClassName="active">
        <img src="/assets/Coin.png" alt="Gold" className="tab-icon" />
        
      </NavLink>
      <NavLink to="/tab3" className="tab-button" activeClassName="active">
        <img src="/assets/Calculator.png" alt="Calculator" className="tab-icon" />
    
      </NavLink>
      <NavLink to="/tab4" className="tab-button" activeClassName="active">
        <img src="/assets/User.png" alt="Profile" className="tab-icon" />
        
      </NavLink>
    </div>
  );
};

export default CustomTabBar;
