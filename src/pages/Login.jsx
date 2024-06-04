import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonLabel } from '@ionic/react';
import './Login.css';
import ContactUsButton from '../components/ContactUsButton.jsx';

const Login = () => {
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
          <h2 >Welcome</h2>
        </div>
        <div className="login-form">
    
          <label className="custom-label">Enter your phone number</label>
<input
  value={phoneNumber}
  placeholder="Your number"
  onChange={(e) => setPhoneNumber(e.target.value)}
  type="tel"
  className="custom-input"
/>
        
          <p className="otp-info">We'll send an OTP to the above phone number.</p>
          <ContactUsButton buttonName="Continue" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
