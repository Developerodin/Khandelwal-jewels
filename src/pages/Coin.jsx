import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonFooter, IonGrid, IonRow, IonCol, IonCard, IonCardContent } from '@ionic/react';
import './Coin.css';
import Navbar from '../components/Navbar';
import CustomTabBar from '../components/CustomTabBar';
import axios from 'axios';
import { Base_url } from "../config/BaseUrl.jsx";
import useStatusBar from '../hooks/useStatusBar'; 
import { StatusBar, Style } from '@capacitor/status-bar';
import ContactUsButton from "../components/ContactUsButton.jsx";
import { useHistory } from "react-router-dom";

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

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN").format(price);
};

const Coin = () => {
  const history = useHistory();
  const [goldRates, setGoldRates] = useState(initialGoldRates);

  useStatusBar({
    overlay: false,
    style: Style.Light,
    color: '#F8EBD8'
  });

  const handleContactUsClick = () => {
    history.push("/contact");
  };

  useEffect(() => {
    axios.get(`${Base_url}get_price`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        const priceData = response.data.post.find(price => price.name === "24k & 91.6 Gold");
        if (priceData) {
          const baseRate = parseFloat(priceData.price);
          const updatedRates = calculateFinalRates(baseRate, gstPercentage);
          setGoldRates(updatedRates);
        }
      })
      .catch(error => {
        console.error('Error fetching gold price:', error);
      });
  }, []);

  return (
    <IonPage>
      <Navbar />
      <IonHeader />
      <IonContent className="custom-content" fullscreen style={{ '--ion-background-color': '#F8EBD8' }}>
        <div style={{ padding: '16px', marginBottom: '90px' }}>
        <h1 style={{paddingLeft:'20px',fontSize:'16px',fontWeight:'600'}}>Current Rate with GST</h1>
          <IonGrid>
            <IonRow>
              {goldRates.map((item, index) => (
                <IonCol size="6" size-md="4" key={index}>
                  <IonCard className="coin-card">
                    <img src="/assets/goldcoin.png" alt={`${item.grams} Gold Coin`} className="coin-image" />
                    <IonCardContent style={{paddingTop: '0px',paddingBottom:'0px'}}>
                      <div className="coin-weight" style={{color:'black'}}>{item.grams}</div>
                      <div className="coin-price" style={{paddingTop:'5px'}}>₹ {formatPrice(item.rate)}</div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        <ContactUsButton onClick={handleContactUsClick} buttonName="Contact us" />
        </div>
      </IonContent>
      <IonFooter>
        <CustomTabBar />
      </IonFooter>
    </IonPage>
  );
};

export default Coin;
