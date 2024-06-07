import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonGrid, IonRow, IonCol } from '@ionic/react';
import './Coin.css';
import Navbar from '../components/Navbar';
import CustomTabBar from '../components/CustomTabBar';

const baseRate = 7610;
const gstPercentage = 0.03;

const initialGoldRates = [
  { grams: '1 gm', rate: 0 },
  { grams: '2 gm', rate: 0 },
  { grams: '5 gm', rate: 0 },
  { grams: '10 gm', rate: 0 },
  { grams: '25 gm', rate: 0 },
  { grams: '50 gm', rate: 0 },
  { grams: '75 gm', rate: 0 },
  { grams: '100 gm', rate: 0 },
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

const Coin = () => {
  const [goldRates, setGoldRates] = useState(initialGoldRates);

  useEffect(() => {
    const updatedRates = calculateFinalRates(baseRate, gstPercentage);
    setGoldRates(updatedRates);
  }, []);

  return (
    <IonPage>
      <Navbar />
      <IonHeader>
      </IonHeader>
      <IonContent className="custom-content" fullscreen style={{ '--ion-background-color': '#F8EBD8' }}>
        <div style={{ padding: '16px', marginBottom: '90px' }}>
          <div className="image-container">
            <img src="/assets/goldcoin.png" alt="Gold Coin" className="gold-image" />
          </div>
          <IonGrid>
            <IonRow className="table-header">
              <IonCol>Gms</IonCol>
              <IonCol className='ion-text-end'>Live rate with GST</IonCol>
            </IonRow>
            {goldRates.map((item, index) => (
              <IonRow key={index} className="table-row ">
                <IonCol>{item.grams}</IonCol>
                <IonCol className="ion-text-end">{item.rate}</IonCol>
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

export default Coin;
