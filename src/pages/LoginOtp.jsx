import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonLabel } from '@ionic/react';
import './Login.css';
import ContactUsButton from '../components/ContactUsButton.jsx';

const LoginOtp = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleContinue = () => {
    // Handle the continue button click
    console.log('Phone Number:', phoneNumber);
  };

  return (
    <IonPage>
      
      <IonContent fullscreen style={{'--ion-background-color': '#F8EBD8'}}>
        <div className="login-header">
          <img src="assets/Frame 1.png" alt="Logo" className="logo" />
          <h2>Log in to your</h2>
<h2>Account</h2>
        </div>
        <div className="login-form">
    
          <label className="custom-label">Enter the OTP send to </label>
<input
  value={phoneNumber}
  placeholder="Enter Otp"
  onChange={(e) => setPhoneNumber(e.target.value)}
  type="tel"
  className="custom-input"
/>
        
          <p className="otp-info">Didn't receive the code?</p>
          <ContactUsButton buttonName="Login" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginOtp;
