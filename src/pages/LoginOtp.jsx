import React, { useState, useEffect } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom'; 
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

      if (response.data.success) {
        console.log('OTP verified successfully');
        localStorage.setItem("Auth", true);
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("userDetails", JSON.stringify(response.data.user));
        localStorage.setItem("role", response.data.user.role);
        showToast("success", response.data.message);
        setLoading(false);
        history.push('/Signup', 'root', 'replace');
      } 
      
      if(response.data === "user not found"){
        history.push("/Signup");
        setOtp("");
        setLoading(false)
        return;
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      showToast('error', 'An error occurred while verifying OTP. Please try again.');
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
  
  return (
    <IonPage>
      <IonContent fullscreen style={{ '--ion-background-color': '#F8EBD8' }}>
        <div className="login-header">
          <img src="assets/Frame 1.png" alt="Logo" className="logo" />
          
        </div>
        <h2>Log in to your</h2>
          <h3>Account</h3>
        <div className="login-form">
          <label className="custom-label">Enter the OTP sent to +91 {phoneNumber}</label>
          <input
            value={otp}
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
            type="tel"
            className="custom-input"
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
