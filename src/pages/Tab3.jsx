import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption,IonFooter } from '@ionic/react';
import './Tab3.css';
import CustomTabBar from '../components/CustomTabBar';
import Navbar from '../components/Navbar';

const Tab3 = () =>  {
  const [formDetails, setFormDetails] = useState({
    fullName: '',
    phoneNumber: '',
    city: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value
    });
  };

  const handleSelectChange = (e) => {
    setFormDetails({
      ...formDetails,
      city: e.detail.value
    });
  };

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Jaipur', 'Hyderabad', 'Pune', 'Ahmedabad', 'Surat'];

  return (
    <IonPage>
      <Navbar />
  
      <IonHeader>
       
      </IonHeader>
      <IonContent className="ion-padding" fullscreen style={{'--ion-background-color': '#F8EBD8'}}>
          <div className="custom-title">Rate Calculator</div>
        <div className="form-container">
          <div className="form-item">
            <label htmlFor="city">Select the item</label>
            <input
              list="city-list"
              id="city"
              name="city"
              value={formDetails.city}
              onChange={handleChange}
              placeholder="eg. Coins"
            />
            <datalist id="city-list">
              {cities.map((city, index) => (
                <option key={index} value={city} />
              ))}
            </datalist>
          </div>
          <div className="form-item">
            <label htmlFor="city">Enter Weight for the item</label>
            <input
              list="city-list"
              id="city"
              name="city"
              value={formDetails.city}
              onChange={handleChange}
              placeholder="eg. 10 gms"
            />
            <datalist id="city-list">
              {cities.map((city, index) => (
                <option key={index} value={city} />
              ))}
            </datalist>
          </div>
          <div className="form-item ">
            <label htmlFor="makingCharges">Making Charges</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formDetails.address}
              onChange={handleChange}
              placeholder="00000"
            />
          </div>
          <div className="form-item ">
            <label htmlFor="finalRate">Final rate with GST</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formDetails.address}
              onChange={handleChange}
              placeholder="000000"
            />
          </div>
        </div>
      </IonContent>
      <IonFooter>
  
  <CustomTabBar />
</IonFooter>
    </IonPage>
  );
};

export default Tab3;
