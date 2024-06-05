import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import ContactUsButton from '../components/ContactUsButton.jsx';
import { Base_url } from "../config/BaseUrl.jsx";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleContinue = async () => {
    try {
      const response = await axios.post(`${Base_url}/send-otp`, { phoneNumber });

      if (response.data.success) {
        console.log('OTP sent successfully');
        localStorage.setItem('phoneNumber', phoneNumber); 
        history.push('/loginotp');
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('An error occurred while sending OTP. Please try again.');
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen style={{ '--ion-background-color': '#F8EBD8' }}>
        <div className="login-header">
          <img src="assets/Frame 1.png" alt="Logo" className="logo" />
          <h2>Welcome</h2>
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
          {error && <p className="error-message">{error}</p>}
          <ContactUsButton onClick={handleContinue} buttonName="Continue" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
