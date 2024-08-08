import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonFooter,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import ContactUsButton from "../components/ContactUsButton.jsx";
import CustomTabBar from "../components/CustomTabBar.jsx";
import { Base_url } from "../config/BaseUrl.jsx";
import useStatusBar from '../hooks/useStatusBar'; 
import { StatusBar, Style } from '@capacitor/status-bar';
import "./Home.css";

const Home = () => {
  const [prices, setPrices] = useState([]);
  const history = useHistory();
  const [goldRates, setGoldRates] = useState([]);
  const [oldGoldRates, setOldGoldRates] = useState([]);
  const [updateRates, setUpdateRates] = useState([]);
  const [dateTime, setDateTime] = useState(getISTDateTime());

  useStatusBar({
    overlay: false,
    style: Style.Light,
    color: '#F8EBD8'
  });

  const fetchPriceData = async () => {
    try {
      const response = await axios.get(`${Base_url}/get_price`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200 && response.data.status === 'success') {
        const data = response.data.post;
  
        
        const mcxGoldItem = data.find(item => item.id === '6');
        const mcxSilverItem = data.find(item => item.id === '7');

        const updateRates = [
          mcxGoldItem && {
            type: 'Gold MCX (10gm) ',
            rate: '10gm',
            makingCharges: 2.00, 
            amountAfterMaking: mcxGoldItem.price * 10 * 1.02,
            gst: 3.00,
            amount: mcxGoldItem.price * 10 ,
          },
          mcxSilverItem && {
            type: 'Silver MCX (1kg) ',
            rate: '1kg',
            makingCharges: 2.00,
            amountAfterMaking: mcxSilverItem.price * 10 * 1.02,
            gst: 3.00,
            amount: mcxSilverItem.price * 1000,
          }
        ].filter(Boolean);

  
        
        const updatedGoldRates = [
          
          {
            type: 'Gold 99.50 & 91.6 Hallmark',
            rate: data.find(item => item.name === '24k & 91.6 Gold').price * 10,
            makingCharges: 2.00,
            amountAfterMaking: data.find(item => item.name === '24k & 91.6 Gold').price * 10 * 1.02,
            gst: 3.00,
            amount: data.find(item => item.name === '24k & 91.6 Gold').price * 10 * 1.02 * 1.03,
          },
          {
            type: 'Gold 916 (KA Brand)',
            rate: data.find(item => item.name === '24k & 91.6 Gold').price * 10  * (1 - 0.084),
            makingCharges: 11.35,
            amountAfterMaking: data.find(item => item.name === '24k & 91.6 Gold').price * 10 * 1.1135371 * (1 - 0.084),
            gst: 3.00,
            amount: data.find(item => item.name === '24k & 91.6 Gold').price * 10 * 1.1135371 * 1.03 * (1 - 0.084),
          }
        ];
  
        const updatedOldGoldRates = [
          {
            type: 'Old Gold 99.50',
            rate: data.find(item => item.name === '24k & 91.6 Gold').price * 10 * 0.98,
            makingCharges: 2.00,
            amountAfterMaking: data.find(item => item.name === '24k & 91.6 Gold').price * 10 * 1.02,
            amount: data.find(item => item.name === '24k & 91.6 Gold').price * 10 * 0.98,
          },
          {
            type: 'Old Gold 916 Hallmark',
            rate: data.find(item => item.name === '24k & 91.6 Gold').price * 10 * 0.98 * (1 - 0.084),
            makingCharges: -8.40,
            amountAfterMaking: data.find(item => item.name === '24k & 91.6 Gold').price * 10 * 0.916 * (1 - 0.084),
            amount: data.find(item => item.name === '24k & 91.6 Gold').price * 10 * 0.98 * (1 - 0.084),
          },
          
        ];
  
        setGoldRates(updatedGoldRates);
        setOldGoldRates(updatedOldGoldRates);
        setUpdateRates(updateRates);
      } else {
        console.error('Error fetching price data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching price data:', error);
    }
  };

  useEffect(() => {
    fetchPriceData();
    const interval = setInterval(() => {
      fetchPriceData();
    }, 10000); 
    
    const timeIntervalId = setInterval(() => {
      setDateTime(getISTDateTime());
    }, 1000); 


    return () => {
      clearInterval(interval);
      clearInterval(timeIntervalId);
    }
  }, []);


  const handleContactUsClick = () => {
    history.push("/contact");
  };

  const calculateFinalPrice = (basePrice, percentage) => {
    const finalPrice = basePrice + basePrice * (percentage / 100);
    return finalPrice.toFixed(0);
  };

  const calculateFinalPriceWithGst = (basePrice, makingPercentage) => {
    const makingPrice = basePrice * (makingPercentage / 100);
    const intermediatePrice = basePrice + makingPrice;
    const gst = intermediatePrice * 0.03;
    const finalPrice = intermediatePrice + gst;
    return finalPrice.toFixed(0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };

  return (
    <IonPage>
      <Navbar />
      <IonContent fullscreen style={{ "--ion-background-color": "#F8EBD8" }}>
        <div style={{ padding: "16px", backgroundColor: "#F8EBD8" }}>
          <div className="gold-prices">
            <h1 className="custom-h1">Today's Gold Price</h1>
            <div className="header-info">
            <p>Date: {dateTime.date}</p>
            <p>Time: {dateTime.time}</p>
          </div>


             {updateRates.length > 0 ? (
                updateRates.map((item, index) => (
                  <IonCard className="custom-card" key={index}>
                    <IonCardHeader style={{ paddingBottom: "0" }}>
                      <div className="price-row">
                        <IonCardTitle
                          style={{
                            fontSize: "17px",
                            lineHeight: "22px",
                            color: "#B87115",
                            fontWeight: "700",
                            paddingBottom: "0",
                          }}
                        >
                          {item.type} 
                        </IonCardTitle>
                        <span style={{fontWeight:'bold'}}> ₹{item.amount.toFixed(2)}</span>
                      </div>
                    </IonCardHeader>
          
                    <IonCardContent className="custom-content">
                      {/* <div className="price-row">
                        <span>Amount: ₹{item.amount.toFixed(2)}</span>
                      </div> */}
                    </IonCardContent>
                  </IonCard>
                ))
              ) : (
                <p>Loading data...</p>
              )}
            </div>


            <div className="card-container">
              {goldRates.length > 0 ? (
                goldRates.map((item, index) => (
                  <IonCard className="custom-card" key={index}>
                    <IonCardHeader style={{ paddingBottom: "0" }}>
                      <div className="price-row">
                        <IonCardTitle
                          style={{
                            fontSize: "17px",
                            lineHeight: "22px",
                            color: "#B87115",
                            fontWeight: "700",
                            paddingBottom: "0",
                          }}
                        >
                          {item.type}
                        </IonCardTitle>
                        <span>₹{item.rate.toFixed(2)}</span>
                      </div>
                    </IonCardHeader>
          
                    <IonCardContent className="custom-content">
                      
                      <div className="price-row">
                        <span>Making: {item.makingCharges}%</span>
                        <span >₹{item.amountAfterMaking.toFixed(2)}</span>
                      </div>
                     
                      <div className="price-row">
                        <span >GST: 3%</span>
                        <span style={{fontWeight:'bold'}}>₹{item.amount.toFixed(2)}</span>
                      </div>
                     
                    </IonCardContent>
                  </IonCard>
                ))
              ) : (
                <p>Loading data...</p>
              )}
            </div>
            <div className="card-container">
              {oldGoldRates.length > 0 ? (
                oldGoldRates.map((item, index) => (
                  <IonCard className="custom-card" key={index}>
                    <IonCardHeader style={{ paddingBottom: "0",paddingInlineStart:'16px' }}>
                      <div className="price-row">
                        <IonCardTitle
                          style={{
                            fontSize: "17px",
                            lineHeight: "22px",
                            color: "#B87115",
                            fontWeight: "700",
                            paddingBottom: "0",
                            paddingLeft: "0",
                            
                          }}
                        >
                          {item.type}
                        </IonCardTitle>
                        <span style={{fontWeight:'bold'}}>₹{item.rate.toFixed(2)}</span>
                      </div>
                    </IonCardHeader>
          
                    <IonCardContent className="custom-content">
                      {/* <div className="price-row">
                        <span>Rate per 10 GM:</span>
                        <span>₹{item.rate.toFixed(2)}</span>
                      </div> */}
                      {/* <div className="price-row">
                        <span>Making: {item.makingCharges}%</span>
                        <span>₹{item.amountAfterMaking.toFixed(2)}</span>
                      </div>
                      <div className="price-row">
                        <span>GST: 3%</span>
                        <span>₹{item.amount.toFixed(2)}</span>
                      </div> */}
                    </IonCardContent>
                  </IonCard>
                ))
              ) : (
                <p>Loading data...</p>
              )}
            </div>


          <ContactUsButton onClick={handleContactUsClick} buttonName="Contact us" />
        </div>
      </IonContent>
      <IonFooter>
        <CustomTabBar />
      </IonFooter>
    </IonPage>
  );
};

function getISTDateTime() {
  const options = { timeZone: 'Asia/Kolkata', hour12: true };
  const now = new Date();
  const date = now.toLocaleDateString('en-IN', options);
  const time = now.toLocaleTimeString('en-IN', options);
  return { date, time };
}

export default Home;
