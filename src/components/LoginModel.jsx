import React from 'react';
import { IonContent, IonModal, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './LoginModel.css';
import ContactUsButton from './ContactUsButton';

const LoginModel = ({ isOpen, onClose }) => {
  const history = useHistory();

  const handleLoginRedirect = () => {
    onClose();
    history.push('/Login');
  }

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonContent fullscreen style={{ '--ion-background-color': '#F8EBD8' }}>
        <div className="login-header">
          <img src="assets/Frame 1.png" alt="Logo" className="logo" />
        </div>
        <h2 className='welcome' style={{fontSize:'28px',color:'#a52a2a'}}>Welcome</h2>
        <div className="login-form login">
          <ContactUsButton onClick={handleLoginRedirect} buttonName='Go to Login' />
        </div>
      </IonContent>
    </IonModal>
  );
};

export default LoginModel;
