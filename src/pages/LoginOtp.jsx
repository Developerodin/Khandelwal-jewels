import React, { useState, useEffect } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import axios from 'axios';
import './Login.css';
import ContactUsButton from '../components/ContactUsButton.jsx';
import { Base_url } from "../config/BaseUrl.jsx";

const LoginOtp = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const history = useHistory(); // Use useHistory
  const [phoneNumber, setPhoneNumber] = useState('');

  // useEffect(() => {
  //   // Retrieve phone number from local storage
  //   const storedPhoneNumber = localStorage.getItem('phoneNumber');
  //   if (storedPhoneNumber) {
  //     setPhoneNumber(storedPhoneNumber);
  //   } else {
  //     history.push('/Login'); // Navigate back to login if phone number is missing
  //   }
  // }, [history]);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${Base_url}/verify-otp`, {
        phoneNumber,
        otp,
      });

      if (response.data.success) {
        console.log('OTP verified successfully');
        history.push('/signup');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('An error occurred while verifying OTP. Please try again.');
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen style={{ '--ion-background-color': '#F8EBD8' }}>
        <div className="login-header">
          <img src="assets/Frame 1.png" alt="Logo" className="logo" />
          <h2>Log in to your</h2>
          <h2>Account</h2>
        </div>
        <div className="login-form">
          <label className="custom-label">Enter the OTP sent to {phoneNumber}</label>
          <input
            value={otp}
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
            type="tel"
            className="custom-input"
          />
          <p className="otp-info">Didn't receive the code?</p>
          {error && <p className="error-message">{error}</p>}
          <ContactUsButton onClick={handleLogin} buttonName="Login" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginOtp;
