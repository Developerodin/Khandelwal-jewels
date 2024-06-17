import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonCard,
  IonCardContent,
  IonIcon,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import {
  mail,
  call,
  logoWhatsapp,
  globeOutline,
  location,
  arrowBackSharp,
} from "ionicons/icons";
import "./Contact.css";
import Navbar from "../components/Navbar.jsx";
import useStatusBar from '../hooks/useStatusBar'; 
import { StatusBar, Style } from '@capacitor/status-bar';

const Contact = () => {
  useStatusBar({
    overlay: false,
    style: Style.Light,
    color: '#F8EBD8'
  });

  return (
    <IonPage>
      <Navbar />
      <IonHeader></IonHeader>
      <IonContent
        className="ion-padding"
        fullscreen
        style={{ "--ion-background-color": "#F8EBD8" }}
      >
        <IonButtons slot="">
          <IonBackButton
            defaultHref="/"
            text=""
            className="back-button"
            icon={arrowBackSharp}
          />
        </IonButtons>
        <div className="custom-title">Contact</div>
        <IonCard>
          <IonCardContent style={{ backgroundColor: "#F2DFC4" }}>
            <div>
            <div className="contact-item">
              <IonIcon icon={mail} />
              <div>
                <span>Email</span>
              </div>
             
            </div>
            <p style={{marginTop:"4px",color:"black"}}>khandelwalabhushan@gmail.com</p>
            </div>
            <div>
            <div className="contact-item">
              <IonIcon icon={call} />
              <div>
                <span>Phone</span>
              </div>
            </div>
                <p style={{marginTop:"4px",color:"black"}} >0141 0000000</p>
            </div>
            <div>
            <div className="contact-item">
              <IonIcon icon={logoWhatsapp} />
              <div>
                <span>Whatsapp</span>
              </div>
            </div>
                <p style={{marginTop:"4px",color:"black"}}>+91 9876543210</p>
            </div>
            <div>
            <div className="contact-item">
              <IonIcon icon={globeOutline} />
              <div>
                <span>Website</span>
              </div>
            </div>
                <p style={{marginTop:"4px",color:"black"}}>www.khandelwalabhushan.com</p>
            </div>
            <div>
            <div className="contact-item">
              <IonIcon icon={location} />
              <div>
                <span>Location</span>
              </div>
            </div>
                <p style={{marginTop:"4px",color:"black",marginBottom:'6px'}} >M.G. Road, Near Shani Mandir, Akola, MH. - 444001</p>
            </div>
          </IonCardContent>
        </IonCard>
        <div className="custom-title">Bank Details</div>
        <IonCard>
          <IonCardContent style={{ backgroundColor: "#F2DFC4" }}>
            <p>Bank details information will be here.</p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Contact;
