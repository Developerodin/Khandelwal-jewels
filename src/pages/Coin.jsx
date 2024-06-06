import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonFooter,IonGrid,IonRow,IonCol } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Coin.css';
import Navbar from '../components/Navbar';

import CustomTabBar from '../components/CustomTabBar';
const goldRates = [
  { grams: '1 gm', rate: '000000' },
  { grams: '2 gm', rate: '000000' },
  { grams: '5 gm', rate: '000000' },
  { grams: '10 gm', rate: '000000' },
  { grams: '25 gm', rate: '000000' },
  { grams: '50 gm', rate: '000000' },
  { grams: '75 gm', rate: '000000' },
  { grams: '100 gm', rate: '000000' },
];



const Coin = () => {
  return (
    <IonPage>
      <Navbar />
      <IonHeader>
        
      </IonHeader>
      <IonContent className=" custom-content" fullscreen style={{'--ion-background-color': '#F8EBD8'}}>
        <div style={{ padding: '16px',marginBottom:'90px'}}>
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
