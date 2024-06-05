import React, { useState, useEffect } from 'react';
import {
  IonModal,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonIcon,
} from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import './CityStateModal.css';

const CityStateModal = ({ isOpen, onClose, onSelect, data, selectedItem }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(data);
  }, [data]);

  const handleInput = (ev) => {
    const query = ev.target.value.toLowerCase();
    setResults(data.filter((item) => item.toLowerCase().includes(query)));
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} className="custom-modal">
      <IonContent className="custom-content">
        <div className="modal-header">
          <IonIcon onClick={onClose} icon={chevronBackOutline} style={{ fontSize: '24px' }} />
          <IonSearchbar debounce={300} onIonInput={handleInput} placeholder="Search..." />
        </div>
        <IonList>
          {results.map((item, index) => (
            <IonItem
              key={index}
              button
              onClick={() => onSelect(item)}
              className={`custom-item ${selectedItem === item ? 'selected' : ''}`}
            >
              {item}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default CityStateModal;
