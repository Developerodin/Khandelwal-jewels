import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonFooter } from '@ionic/react';
import './Profile.css';
import CityStateModal from '../components/CityStateModal.jsx';
import ContactUsButton from '../components/ContactUsButton.jsx';
import CustomTabBar from '../components/CustomTabBar.jsx';
import Navbar from '../components/Navbar.jsx';
import axios from 'axios';
import { Base_url } from "../config/BaseUrl.jsx";

const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [formDetails, setFormDetails] = useState({ city: "", state: "", phoneNumber: "", address: "" });
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isStateModalOpen, setIsStateModalOpen] = useState(false);

  useEffect(() => {
    // Fetch existing user data here and populate the form
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    if (storedPhoneNumber) {
      setFormDetails({ ...formDetails, phoneNumber: storedPhoneNumber });
    } else {
      console.error('Phone number is missing');
    }
  }, []);

  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata",
    "Jaipur", "Hyderabad", "Pune", "Ahmedabad", "Surat",
  ];

  const states = [
    "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "West Bengal",
    "Rajasthan", "Telangana", "Gujarat", "Uttar Pradesh", "Madhya Pradesh",
  ];

  function handleChange(e) {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  }

  const handleContinue = () => {
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('city', formDetails.city);
    formData.append('state', formDetails.state);
    formData.append('address', formDetails.address);
    formData.append('mobile_number', formDetails.phoneNumber);

    axios.post(`${Base_url}auth/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log('Profile updated successfully:', response);
        // Optionally, redirect or give feedback to the user
      })
      .catch(error => {
        console.error('Error updating profile:', error);
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
      <Navbar />
      <IonContent className="ion-padding" fullscreen style={{ '--ion-background-color': '#F8EBD8' }}>
        <div className="custom-title">Personal Details</div>
        <div className="form-container">
          <label htmlFor="fullName">Full name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            style={{ marginBottom: '16px' }}
          />

          <label htmlFor="phoneNumber">Phone number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formDetails.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            style={{ marginBottom: '16px' }}
            
          />

          <label htmlFor="state">State</label>
          <input
            value={formDetails.state}
            name="state"
            placeholder="Enter or select your state"
            onFocus={() => setIsStateModalOpen(true)}
            style={{ marginBottom: '16px' }}
            readOnly
          />

          <label htmlFor="city">City</label>
          <input
            value={formDetails.city}
            name="city"
            placeholder="Enter or select your city"
            onFocus={() => setIsCityModalOpen(true)}
            style={{ marginBottom: '16px' }}
            readOnly
          />

          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formDetails.address}
            onChange={handleChange}
            placeholder="Enter your address"
            style={{ marginBottom: '16px' }}
          />

          <ContactUsButton onClick={handleContinue} buttonName="Submit" />
        </div>

        <CityStateModal
          isOpen={isStateModalOpen}
          onClose={() => setIsStateModalOpen(false)}
          onSelect={handleStateSelect}
          data={states}
          selectedItem={formDetails.state}
        />

        <CityStateModal
          isOpen={isCityModalOpen}
          onClose={() => setIsCityModalOpen(false)}
          onSelect={handleCitySelect}
          data={cities}
          selectedItem={formDetails.city}
        />
      </IonContent>
      <IonFooter>
        <CustomTabBar />
      </IonFooter>
    </IonPage>
  );
};

export default Profile;
