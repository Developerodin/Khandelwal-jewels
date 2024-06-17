import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonFooter, IonButton, IonIcon } from '@ionic/react';
import './Profile.css';
import CityStateModal from '../components/CityStateModal.jsx';
import ContactUsButton from '../components/ContactUsButton.jsx';
import CustomTabBar from '../components/CustomTabBar.jsx';
import Navbar from '../components/Navbar.jsx';
import axios from 'axios';
import { Base_url } from "../config/BaseUrl.jsx";
import { logOutOutline } from 'ionicons/icons';
import useStatusBar from '../hooks/useStatusBar'; 
import { StatusBar, Style } from '@capacitor/status-bar';

const Profile = () => {

  const [formDetails, setFormDetails] = useState(
    { 
      id:"",
      name:"",
      city: "", 
      state: "", 
      phoneNumber: "",
      address: "" 
    }
  );
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isStateModalOpen, setIsStateModalOpen] = useState(false);
  const [states, setStates] = useState([]); // State list
  const [cities, setCities] = useState([]); // Complete list of cities
  const [filteredCities, setFilteredCities] = useState([]); // Filtered list of cities

  useStatusBar({
    overlay: false,
    style: Style.Light,
    color: '#F8EBD8'
  });

  useEffect(() => {
    const fetchStatesAndCities = async () => {
      try {
        const citiesResponse = await axios.get(`${Base_url}basic/all_city`, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setCities(citiesResponse.data.post); // Adjust according to the API response structure

        // Extract unique states from cities data
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

  // useEffect(() => {
  //   const storedPhoneNumber = localStorage.getItem('phoneNumber');
  //   if (storedPhoneNumber) {
  //     setFormDetails({ ...formDetails, phoneNumber: storedPhoneNumber });
  //   } else {
  //     console.error('Phone number is missing');
  //   }
  // }, []);

  const handleChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    const formData = new FormData();
    formData.append('user_id', formDetails.id);
    formData.append('name', formDetails.name);
    formData.append('city', formDetails.city);
    formData.append('state', formDetails.state);
    formData.append('address', formDetails.address);

   

    axios.post(`${Base_url}auth/user_update`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log('Profile updated successfully:', response);
        // Optionally, redirect or give feedback to the user
        if (response.data.user) {
          localStorage.setItem("userDetails", JSON.stringify(response.data.user));
           
        }
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
    // Filter cities based on the selected state
    // const filtered = [
    //   ...new Set(cities.filter(city => city.state_name === state)),
    // ];
    const uniqueStates = [...new Set(cities.filter(item => item.state_name === state))];
    console.log(uniqueStates);
               const uniqueCity = [...new Set(uniqueStates.map(item => item.city_name))];
                console.log(uniqueCity);
    // const filtered = cities.filter(city => city.state_name === state);
    setFilteredCities(uniqueCity);
    setIsStateModalOpen(false);
    setIsCityModalOpen(true); // Open city modal after selecting state
  };
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleContinue();
    }
  };

  const handleLogout = ()=>{
    localStorage.clear();
    window.location.href = "/Login";
  
  }


  useEffect(()=>{
   const user = JSON.parse(localStorage.getItem("userDetails")) || null;
   const storedPhoneNumber = localStorage.getItem('phoneNumber');
   if (user){
    const userData = { 
      id:user.user_id,
      name:user.name,
      city: user.city, 
      state: user.state, 
      phoneNumber: storedPhoneNumber,
      address: user.address 
    }
     setFormDetails(userData);
   }
  
   
  },[])

  return (
    <IonPage>
      <Navbar />
      <IonContent className="ion-padding" fullscreen style={{ '--ion-background-color': '#F8EBD8' }}>
        <div className="custom-title"  >
          <span>Personal Details</span>

         
          <IonIcon onClick={handleLogout} style={{fontSize:"30px",color:"#b71c1c"}} icon={logOutOutline}></IonIcon>
          

          </div>
        <div className="form-container">
          <label htmlFor="fullName">Full name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formDetails.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            style={{ marginBottom: '16px' }}
            onKeyDown={handleKeyDown}
          />

          <label htmlFor="phoneNumber">Phone number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formDetails.phoneNumber}
        
            placeholder="Enter your phone number"
            style={{ marginBottom: '16px' }}
            onKeyDown={handleKeyDown}
          />

          <label htmlFor="state">State</label>
          <input
            value={formDetails.state}
            name="state"
            placeholder="Enter or select your state"
            onFocus={() => setIsStateModalOpen(true)}
            style={{ marginBottom: '16px' }}
            readOnly
            onKeyDown={handleKeyDown}
          />

          <label htmlFor="city">City</label>
          <input
            value={formDetails.city}
            name="city"
            placeholder="Enter or select your city"
            onFocus={() => setIsCityModalOpen(true)}
            style={{ marginBottom: '16px' }}
            readOnly
            onKeyDown={handleKeyDown}
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
            onKeyDown={handleKeyDown}
          />

          <ContactUsButton onClick={handleContinue} buttonName="Submit" />
        </div>

        <CityStateModal
          isOpen={isStateModalOpen}
          onClose={() => setIsStateModalOpen(false)}
          onSelect={handleStateSelect}
          data={states.map(state => state.state_name)} // Displaying state names
          selectedItem={formDetails.state}
        />

        <CityStateModal
          isOpen={isCityModalOpen}
          onClose={() => setIsCityModalOpen(false)}
          onSelect={handleCitySelect}
          data={filteredCities} // Displaying city names
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
