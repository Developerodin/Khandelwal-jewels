import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonFooter, IonGrid, IonRow, IonCol } from '@ionic/react';
import './Coin.css';
import Navbar from '../components/Navbar';
import CustomTabBar from '../components/CustomTabBar';
import axios from 'axios';
import { Base_url } from "../config/BaseUrl.jsx";

const gstPercentage = 0.03;

const initialGoldRates = [
    { grams: '1 gm', rate: 0 },
    { grams: '5 gm', rate: 0 },
    { grams: '10 gm', rate: 0 },
    
    { grams: '50 gm', rate: 0 },
    
    { grams: '100 gm', rate: 0 },
    { grams: '250 gm', rate: 0 },
    { grams: '500 gm', rate: 0 },
    { grams: '1000 gm', rate: 0 },
];

const calculateFinalRates = (baseRate, gstPercentage) => {
  return initialGoldRates.map((item) => {
    const weight = parseFloat(item.grams);
    const rateWithoutGst = baseRate * weight;
    const gstAmount = rateWithoutGst * gstPercentage;
    const finalRate = rateWithoutGst + gstAmount;
    return { grams: item.grams, rate: finalRate.toFixed(2) };
  });
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN").format(price);
};

const Silver = () => {
  const [goldRates, setGoldRates] = useState(initialGoldRates);

  useEffect(() => {
    const fetchSilverPrice = () => {
        axios.get(`${Base_url}get_price`, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            const priceData = response.data.post.find(price => price.name === "Silver MCX");
            if (priceData) {
                const baseRate = parseFloat(priceData.price);
                const updatedRates = calculateFinalRates(baseRate, gstPercentage);
                setGoldRates(updatedRates);
            }
        })
        .catch(error => {
            console.error('Error fetching silver price:', error);
        });
    };

    fetchSilverPrice(); 

    const intervalId = setInterval(fetchSilverPrice, 10000); 

    return () => clearInterval(intervalId); 
}, []);

  return (
    <IonPage>
      <Navbar />
      <IonHeader />
      <IonContent className="custom-content" fullscreen style={{ '--ion-background-color': '#F8EBD8' }}>
        <div style={{ padding: '16px', marginBottom: '90px' }}>
          <div className="image-container">
            <img src="/assets/silver-coin.png" alt="Silver Coin" className="gold-image" />
          </div>
          <IonGrid>
            <IonRow className="table-header">
              <IonCol>Gms</IonCol>
              <IonCol className='ion-text-end'>Current rate with GST</IonCol>
            </IonRow>
            {goldRates.map((item, index) => (
              <IonRow key={index} className="table-row">
                <IonCol>{item.grams}</IonCol>
                <IonCol className="ion-text-end"> ₹ {formatPrice(item.rate)}</IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </div>
      </IonContent>
      <IonFooter>
        <CustomTabBar />
      </IonFooter>
    </IonPage>
  );
};

export default Silver;