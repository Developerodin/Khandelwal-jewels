import React, { useState } from "react";
import {
  IonContent,
  IonPage,
} from "@ionic/react";
import "./Signup.css";
import CityStateModal from "../components/CityStateModal";
import ContactUsButton from "../components/ContactUsButton.jsx";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [formDetails, setFormDetails] = useState({ city: "", state: "" });
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isStateModalOpen, setIsStateModalOpen] = useState(false);

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
    // Handle the continue button click
    const formData = {
      fullName,
      ...formDetails,
    };
    console.log("Form Data:", formData);
    
    // Add your form submission logic here, e.g., API call to save data
    // axios.post('your_api_endpoint', formData)
    //   .then(response => {
    //     console.log('Form submitted successfully:', response);
    //   })
    //   .catch(error => {
    //     console.error('Form submission error:', error);
    //   });
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
          <h2>New user?</h2>
          <h2>Create an account</h2>
        </div>
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
