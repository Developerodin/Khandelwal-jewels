import React, { useState, useEffect } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import { Base_url } from "../config/BaseUrl.jsx";
import CityStateModal from "../components/CityStateModal";
import ContactUsButton from "../components/ContactUsButton.jsx";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [formDetails, setFormDetails] = useState({ city: "", state: "" });
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isStateModalOpen, setIsStateModalOpen] = useState(false);
  const history = useHistory(); // Initialize the useHistory hook

  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    if (!storedPhoneNumber) {
      // Handle the case where the phone number is missing
      console.error('Phone number is missing');
    }
  }, []);

  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Jaipur",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Surat",
  ];

  const states = [
    "Maharashtra",
    "Delhi",
    "Karnataka",
    "Tamil Nadu",
    "West Bengal",
    "Rajasthan",
    "Telangana",
    "Gujarat",
    "Uttar Pradesh",
    "Madhya Pradesh",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const handleContinue = () => {
    const storedPhoneNumber = localStorage.getItem('phoneNumber');

    if (!storedPhoneNumber) {
      console.error('Phone number is missing');
      return;
    }

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('city', formDetails.city);
    formData.append('state', formDetails.state);
    formData.append('address', ""); // Setting address as an empty string
    formData.append('mobile_number', storedPhoneNumber);

    console.log("Form Data:", formData);

    axios.post(`${Base_url}auth/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log('Form submitted successfully:', response);
        history.push('/home'); // Navigate to /home on success
      })
      .catch(error => {
        console.error('Form submission error:', error);
      });
  };

  const handleCitySelect = (city) => {
    setFormDetails({ ...formDetails, city });
    setIsCityModalOpen(false);
  };

  const handleStateSelect = (state) => {
    setFormDetails({ ...formDetails, state });
    setIsStateModalOpen(false);
  };

  return (
    <IonPage>
      <IonContent fullscreen style={{ "--ion-background-color": "#F8EBD8" }}>
        <div className="login-header">
          <img src="assets/Frame 1.png" alt="Logo" className="logo" />
          
        </div>
        <h2>New user?</h2>
          <h3>Create an account</h3>
        <div className="login-form">
          <label className="custom-label">Full name </label>
          <input
            value={fullName}
            placeholder="Enter your full name"
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            className="custom-input"
          />

          <label className="custom-label">State</label>
          <input
            value={formDetails.state}
            name="state"
            placeholder="Enter or select your state"
            onFocus={() => setIsStateModalOpen(true)}
            className="custom-input"
            readOnly
          />

          <label className="custom-label">City</label>
          <input
            value={formDetails.city}
            name="city"
            placeholder="Enter or select your city"
            onFocus={() => setIsCityModalOpen(true)}
            className="custom-input"
            readOnly
          />

          <ContactUsButton onClick={handleContinue} buttonName="Explore" />
        </div>

        <CityStateModal
          isOpen={isCityModalOpen}
          onClose={() => setIsCityModalOpen(false)}
          onSelect={handleCitySelect}
          data={cities}
          selectedItem={formDetails.city}
        />

        <CityStateModal
          isOpen={isStateModalOpen}
          onClose={() => setIsStateModalOpen(false)}
          onSelect={handleStateSelect}
          data={states}
          selectedItem={formDetails.state}
        />
      </IonContent>
    </IonPage>
  );
};

export default Signup;
