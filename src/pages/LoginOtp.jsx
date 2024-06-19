import React, { useState, useEffect } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom'; 
import useStatusBar from '../hooks/useStatusBar'; 
import { StatusBar, Style } from '@capacitor/status-bar';
import axios from 'axios';
import './Login.css';
import ContactUsButton from '../components/ContactUsButton.jsx';
import { Base_url } from "../config/BaseUrl.jsx";

const LoginOtp = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory(); 
  const [phoneNumber, setPhoneNumber] = useState('');

  // Ensure the hook is used correctly
  useStatusBar({
    overlay: false,
    style: Style.Dark,
    color: '#8E2927'
  });

  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    if (storedPhoneNumber) {
      setPhoneNumber(storedPhoneNumber);
    } else {
      history.push('/login'); 
    }
  }, [history]);

  const showToast = (type, message) => {
    alert(`${type}: ${message}`); 
  };

  const handleLogin = async () => {
    if (!otp) {
      showToast('error', 'Please enter the OTP');
      return;
    }

    setLoading(true);
    try {
      const formData1 = new FormData();
      formData1.append('mobile_number', phoneNumber);
      formData1.append('otp', otp);

      const response = await axios.post(`${Base_url}auth/verify_otp/${otp}`, formData1, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status === 'success') {
        console.log('OTP verified successfully');
        localStorage.setItem("Auth", true);
        localStorage.setItem("token", response.data.access_token);
        if (response.data.user) {
          localStorage.setItem("userDetails", JSON.stringify(response.data.user));
        }
        // showToast("success", response.data.message);
        history.push('/home', 'root', 'replace');
      } else if (response.data === "user not found") {
        history.push("/Signup");
        setOtp("");
      } else {
        showToast('error', 'Wrong Otp');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      showToast('error', 'Wrong Otp.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post(`${Base_url}auth/number_check`, { phoneNumber }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        console.log('OTP Resent successfully');
      } else {
        console.log('Failed to resend OTP');
      }
    } catch (error) {
      console.error('An error occurred while resending the OTP:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen style={{ '--ion-background-color': '#F8EBD8' }}>
        <div className="login-header">
          <img src="assets/Frame 1.png" alt="Logo" className="logo" />
        </div>
        <h2 style={{fontSize:'28px'}}>Log in to your Account</h2>
        <div className="loginotp" style={{padding:'120px 20px 0px 20px '}}>
          <label className="custom-label">Enter the OTP sent to +91 {phoneNumber}</label>
          <input
            value={otp}
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
            type="tel"
            className="custom-input"
            onKeyDown={handleKeyDown}
          />
          <p className="otp-info">
            <a href="#" onClick={handleResendCode} className="otp-info" style={{textDecorationLine:"none"}}>Didn't receive the code?</a>
          </p>
          {error && <p className="error-message">{error}</p>}
          <ContactUsButton onClick={handleLogin} buttonName={loading ? 'Loading...' : 'Login'} disabled={loading} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginOtp;
