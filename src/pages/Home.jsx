import React from 'react';
import { IonContent, IonPage, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonFooter, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import ContactUsButton from '../components/ContactUsButton.jsx';
import CustomTabBar from '../components/CustomTabBar.jsx';

import './Home.css';

const Tab1 = () => {
const history = useHistory();

const handleContactUsClick = () => {
  history.push('/contact');
};

  return (
    <IonPage>
      <Navbar />
      <IonContent fullscreen style={{'--ion-background-color': '#F8EBD8'}}>
        <div style={{ padding: '16px',backgroundColor: '#F8EBD8' }}>
        <div className="gold-prices">
      <h1 className="custom-h1">Today's Gold Price</h1>
      <IonCard className="custom-card">
        <IonCardHeader style={{paddingBottom:'0'}}>
        <div className="price-row">
        <IonCardTitle style={{ fontSize: '19px', lineHeight: '22px', color: '#B87115',fontWeight:'700' ,paddingBottom: '0'
        
         }}>
  24K & 91.6 Gold
</IonCardTitle>
          <span>70,000</span>
          </div>
        </IonCardHeader >
        <IonCardContent className="custom-content">
          
          <div className="price-row">
            <span>Making: 2%</span>
            <span>71,400</span>
          </div>
          <div className="price-row">
            <span>GST: 3%</span>
            <span>73,542</span>
          </div>
        </IonCardContent>
      </IonCard>
      <IonCard className="custom-card">
        <IonCardHeader style={{paddingBottom:'0'}}>
        <div className="price-row">
          <IonCardTitle style={{ fontSize: '19px', lineHeight: '22px', color: '#B87115' }}>916 Hallmark</IonCardTitle>
            <span>64,120</span>
          </div>
        </IonCardHeader>
        <IonCardContent className="custom-content">
          
          <div className="price-row">
            <span>Making: 11.35%</span>
            <span>71,400</span>
          </div>
          <div className="price-row">
            <span>GST: 3%</span>
            <span>73,542</span>
          </div>
        </IonCardContent>
      </IonCard>
      <h1 className="custom-h1">Today's Gold Price</h1>
      <IonCard className="custom-card">
        <IonCardHeader style={{paddingBottom:'0'}}>
        <div className="price-row">
          <IonCardTitle style={{ fontSize: '19px', lineHeight: '22px', color: '#B87115' }}>Old Gold 24k</IonCardTitle>
            <span>62,838</span>
          </div>
        </IonCardHeader>
        <IonCardContent className="custom-content">
          
        </IonCardContent>
      </IonCard>
      <IonCard className="custom-card">
        <IonCardHeader style={{paddingBottom:'0'}}>
        <div className="price-row">
          <IonCardTitle style={{ fontSize: '19px', lineHeight: '22px', color: '#B87115' }}>Old Gold 916</IonCardTitle>
            <span>68,600</span>
          </div>
        </IonCardHeader>
        <IonCardContent className="custom-content">
         
          <div className="price-row">
            <span>Making: -8.4%</span>
            <span>62,838</span>
          </div>
        </IonCardContent>
      </IonCard>
      <IonCard className="custom-card">
        <IonCardHeader style={{paddingBottom:'0'}}>
        <div className="price-row">
          <IonCardTitle style={{ fontSize: '19px', lineHeight: '22px', color: '#B87115' }}>Old Gold 916 Branded</IonCardTitle>
            <span>62,838</span>
          </div>
        </IonCardHeader>
        <IonCardContent className="custom-content">
         
        </IonCardContent>
      </IonCard>
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

export default Tab1;
