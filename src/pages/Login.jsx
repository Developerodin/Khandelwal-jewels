import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import ContactUsButton from '../components/ContactUsButton.jsx';
import { Base_url } from "../config/BaseUrl.jsx";

const Login = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    phoneNumber: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const showToast = (type, message) => {
    alert(`${type}: ${message}`); 
  };

  const checkMobile = async () => {
    try {
      setLoading(true);
      const url = `${Base_url}auth/number_check`;
      const formData1 = new FormData();
      formData1.append('mobile_number', formData.phoneNumber);

      const response = await axios.post(url, formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      console.log("Response check mobile", response.data);

      if (response.data.status === "success") {
        setLoading(false);
        history.push("/verify-otp");
        setFormData({
          phoneNumber: '',
        });
        return;
      } else {
        showToast("error", "Try After Some Time");
        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      showToast("error", "Try After Some Time");
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    if (formData.phoneNumber.length !== 10) {
      showToast('error', 'Wrong mobile number');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${Base_url}/send-otp`, { phoneNumber: formData.phoneNumber });

      if (response.data.success) {
        console.log('OTP sent successfully');
        localStorage.setItem('phoneNumber', formData.phoneNumber);
        checkMobile(); 
      } else {
        showToast('error', 'Failed to send OTP. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      showToast('error', 'An error occurred while sending OTP. Please try again.');
      setLoading(false);
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
            name="phoneNumber"
            value={formData.phoneNumber}
            placeholder="Your number"
            onChange={handleChange}
            type="tel"
            className="custom-input"
          />
          <p className="otp-info">We'll send an OTP to the above phone number.</p>
          {error && <p className="error-message">{error}</p>}
          <ContactUsButton onClick={handleContinue} buttonName={loading ? 'Loading...' : 'Continue'} disabled={loading} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
