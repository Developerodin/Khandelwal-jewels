import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption,IonFooter } from '@ionic/react';
import './Calculator.css';
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

  const types = ['Coins', 'Bars', 'Jewellery', 'Others'];
     
  const coins = ['1gm', '2gm', '5gm', '10gm', '25gm', '50gm', '75gm', '100gm'];

  return (
    <IonPage>
      <Navbar />
  
      <IonHeader>
       
      </IonHeader>
      <IonContent className="ion-padding" fullscreen style={{'--ion-background-color': '#F8EBD8'}}>
          <div className="custom-title">Rate Calculator</div>
        <div className="form-container">
          <div className="form-item">
            <label htmlFor="type">Select the item</label>
            <input
              list="type-list"
              id="type"
              name="type"
              value={formDetails.type}
              onChange={handleChange}
              placeholder="eg. Coins"
            />
          <datalist id="type-list">
              {types.map((type, index) => (
                <option key={index} value={type} />
              ))}
            </datalist>
          </div>
          <div className="form-item">
            <label htmlFor="coin">Enter Weight for the item</label>
            <input
              list="coin-list"
              id="coin"
              name="coin"
              value={formDetails.coin}
              onChange={handleChange}
              placeholder="eg. 10 gms"
            />
            <datalist id="coin-list">
              {coins.map((coin, index) => (
                <option key={index} value={coin} />
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
