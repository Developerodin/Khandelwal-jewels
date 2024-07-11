import React, { useState, useEffect } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";
import useStatusBar from '../hooks/useStatusBar'; 
import axios from "axios";
import "./Signup.css";
import { Base_url } from "../config/BaseUrl.jsx";
import CityStateModal from "../components/CityStateModal";
import ContactUsButton from "../components/ContactUsButton.jsx";
import { StatusBar, Style } from '@capacitor/status-bar';

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [formDetails, setFormDetails] = useState({ city: "", state: "" });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isStateModalOpen, setIsStateModalOpen] = useState(false);
  const history = useHistory();

  useStatusBar({
    overlay: false,
    style: Style.Dark,
    color: '#8E2927'
  });

  useEffect(() => {
    const fetchStatesAndCities = async () => {
      try {
        const citiesResponse = await axios.get(`${Base_url}basic/all_city`, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setCities(citiesResponse.data.post);

        const uniqueStates = [
          ...new Set(citiesResponse.data.post.map(city => city.state_name)),
        ];
        setStates(uniqueStates.map(state => ({ state_name: state })));
      } catch (error) {
        console.error("Error fetching states and cities:", error);
      }
    };

    fetchStatesAndCities();
  }, []);

  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    if (!storedPhoneNumber) {
      console.error('Phone number is missing');
    }
  }, []);

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
    formData.append('name', fullName);
    formData.append('city', formDetails.city);
    formData.append('state', formDetails.state);
    formData.append('address', "");
    formData.append('mobile_number', storedPhoneNumber);

    axios.post(`${Base_url}auth/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log('Form successfully submitted', response);
        if(response.data.status === "success"){
          history.push('/home');
          window.location.reload();
        }
       
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
    const uniqueStates = [...new Set(cities.filter(item => item.state_name === state))];
    const uniqueCity = [...new Set(uniqueStates.map(item => item.city_name))];
    setFilteredCities(uniqueCity);
    setIsStateModalOpen(false);
    setIsCityModalOpen(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleContinue();
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen style={{ "--ion-background-color": "#F8EBD8" }}>
        <div className="login-header">
          <img src="assets/Frame 1.png" alt="Logo" className="logo" />
        </div>
        <h2 style={{ fontSize: '28px' }}>New user?</h2>
        <h3 style={{ fontSize: '28px', marginTop: '0' }}>Create an account</h3>
        <div className="login-form signup">
          <label className="custom-label">Full name </label>
          <input
            value={fullName}
            placeholder="Enter your full name"
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            className="custom-input"
            onKeyDown={handleKeyDown}
          />

          <label className="custom-label">State</label>
          <input
            value={formDetails.state}
            name="state"
            placeholder="Enter or select your state"
            onFocus={() => setIsStateModalOpen(true)}
            className="custom-input"
            readOnly
            onKeyDown={handleKeyDown}
          />

          <label className="custom-label">City</label>
          <input
            value={formDetails.city}
            name="city"
            placeholder="Enter or select your city"
            onFocus={() => setIsCityModalOpen(true)}
            className="custom-input"
            readOnly
            onKeyDown={handleKeyDown}

          />

          <ContactUsButton onClick={handleContinue} buttonName="Explore" onKey />
        </div>

        <CityStateModal
          isOpen={isCityModalOpen}
          onClose={() => setIsCityModalOpen(false)}
          onSelect={handleCitySelect}
          data={filteredCities}
          selectedItem={formDetails.city}
        />

        <CityStateModal
          isOpen={isStateModalOpen}
          onClose={() => setIsStateModalOpen(false)}
          onSelect={handleStateSelect}
          data={states.map(state => state.state_name)}
          selectedItem={formDetails.state}
        />
      </IonContent>
    </IonPage>
  );
};

export default Signup;
