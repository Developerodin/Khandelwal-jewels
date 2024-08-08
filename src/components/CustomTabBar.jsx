import React from 'react';
import { NavLink } from 'react-router-dom';
import './CustomTabBar.css';

const CustomTabBar = () => {
  return (
    <div className="custom-tab-bar">
      <NavLink to="/home" className="tab-button" activeClassName="active">
        <img src="/assets/Home.png" alt="Home" className="tab-icon" />
        
      </NavLink>
      <NavLink to="/coin" className="tab-button" activeClassName="active">
        <img src="/assets/Coin.png" alt="Gold" className="tab-icon"  />
        
      </NavLink>
      <NavLink to="/silver" className="tab-button" activeClassName="active">
        <img src="/assets/Silver.png" alt="Gold" className="tab-icon" style={{height:'24px',width:'24px'}}/>
        
      </NavLink>

      <NavLink to="/calculator" className="tab-button" activeClassName="active">
        <img src="/assets/Calculator.png" alt="Calculator" className="tab-icon" />
    
      </NavLink>
      <NavLink to="/profile" className="tab-button" activeClassName="active">
        <img src="/assets/User.png" alt="Profile" className="tab-icon" />
        
      </NavLink>
    </div>
  );
};

export default CustomTabBar;
