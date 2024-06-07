import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
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

const Contact = () => {
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
            <div className="contact-item">
              <IonIcon icon={mail} />
              <span>Email</span>
              <p>Khandelwalabhushan@gmail.com</p>
            </div>
            <div className="contact-item">
              <IonIcon icon={call} />
              <span>Phone</span>
              <p>0141 0000000</p>
            </div>
            <div className="contact-item">
              <IonIcon icon={logoWhatsapp} />
              <span>Whatsapp</span>
              <p>+91 987654321</p>
            </div>
            <div className="contact-item">
              <IonIcon icon={globeOutline} />
              <span>Website</span>
              <p>www.khandelwalabhushan.com</p>
            </div>
            <div className="contact-item">
              <IonIcon icon={location} />
              <span>Location</span>
              <p>M.G. road, near shani mandir, Akola</p>
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
