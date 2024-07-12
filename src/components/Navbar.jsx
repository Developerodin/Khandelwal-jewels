import React from 'react';
import { IonHeader, IonToolbar } from '@ionic/react';
import './Navbar.css'; // Import the CSS file for custom styling

const Navbar = () => {
  return (
    <IonHeader style={{marginTop: '40px'}}>
      
        <div className="header-logo">
          <div className="icon-background">
            <img src="assets/Frame 1.png" alt="Khandelwal Abhushan" className="logo-icon" />
          </div>
          <div className="header-text">
            <h2 className='header-h2' style={{paddingTop:'0'}}>Khandelwal Abhushan</h2>
            <p>M.G. Road, Near Shani Mandir, Akola, MH. - 444001</p>
          </div>
        </div>
    </IonHeader>
  );
};

export default Navbar;
