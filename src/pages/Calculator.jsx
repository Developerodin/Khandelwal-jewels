import React, { useEffect, useState } from "react";
import { IonContent, IonHeader, IonPage, IonFooter, IonModal } from "@ionic/react";
import "./Calculator.css";
import CustomTabBar from "../components/CustomTabBar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Base_url } from "../config/BaseUrl.jsx";
import useStatusBar from '../hooks/useStatusBar'; 
import { StatusBar, Style } from '@capacitor/status-bar';
import LoginModel from "../components/LoginModel";
import { useHistory } from 'react-router-dom';

const gstPercentage = 0.03;

const ratesTable = {
  Coins: { makingChargesPercentage: 0.02 },
  Bars: { makingChargesPercentage: 0.02 },
  Jewellery: { makingChargesPercentage: 0.2 },
  Others: { makingChargesPercentage: 0.2 },
};

const Calculator = () => {
  useStatusBar({
    overlay: false,
    style: Style.Light,
    color: '#F8EBD8'
  });

  const [formDetails, setFormDetails] = useState({
    type: "",
    coin: "",
    makingCharges: 0,
    finalRate: 0,
  });
  const [goldRatePerGram, setGoldRatePerGram] = useState(0);

  const types = ["Coins", "Bars", "Jewellery", "Others"];
  const coins = ["1gm", "2gm", "5gm", "10gm", "25gm", "50gm", "75gm", "100gm"];

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDetails")) || null;
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    if (user) {
      const userData = {
        id: user.user_id,
        name: user.name,
        city: user.city,
        state: user.state,
        phoneNumber: storedPhoneNumber,
      }
    } else {
      setIsLoginModalOpen(true);
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${Base_url}get_price`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const priceData = response.data.post.find(
          (price) => price.name === "24k & 91.6 Gold"
        );
        if (priceData) {
          setGoldRatePerGram(parseFloat(priceData.price));
        }
      })
      .catch((error) => {
        console.error("Error fetching gold price:", error);
      });
  }, []);

  const handleSelection = (e) => {
    const { name, value } = e.target;
    let updatedDetails = { ...formDetails, [name]: value };

    const type = name === "type" ? value : formDetails.type;
    const coin = name === "coin" ? value : formDetails.coin;
    const weight = parseFloat(coin.replace("gm", ""));

    if (type && !isNaN(weight) && goldRatePerGram > 0) {
      const goldCost = goldRatePerGram * weight;
      const makingCharges = goldCost * ratesTable[type].makingChargesPercentage;
      const subtotal = goldCost + makingCharges;
      const gst = subtotal * gstPercentage;
      const finalRate = subtotal + gst;

      updatedDetails.makingCharges = formatPrice(makingCharges.toFixed(0));
      updatedDetails.finalRate = formatPrice(finalRate.toFixed(0));
    } else {
      updatedDetails.makingCharges = 0;
      updatedDetails.finalRate = 0;
    }

    setFormDetails(updatedDetails);
  };

  const formatPrice = (price) => {
    return `₹ ${new Intl.NumberFormat("en-IN").format(price)}`;
  };

  const handleInitialModalClose = () => {
    setIsLoginModalOpen(false);
    history.push("/Login");
  };

  return (
    <IonPage>
      <Navbar />
      <IonHeader></IonHeader>
      <IonContent
        className="ion-padding"
        fullscreen
        style={{ "--ion-background-color": "#F8EBD8" }}
      >
        <div className="custom-title">Rate Calculator</div>
        <div className="form-container">
          <div className="form-item">
            <label htmlFor="type">Select the item</label>
            <select
              id="type"
              name="type"
              value={formDetails.type}
              onChange={handleSelection}
            >
              <option value="">Select...</option>
              {types.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="form-item">
            <label htmlFor="coin">Enter Weight for the item (gm)</label>
            <input
              list="coin-list"
              id="coin"
              name="coin"
              value={formDetails.coin}
              onChange={handleSelection}
              placeholder="eg. 10 gms"
            />
          </div>
          <div className="form-item">
            <label htmlFor="makingCharges">Making Charges</label>
            <input
              type="text"
              id="makingCharges"
              name="makingCharges"
              value={formDetails.makingCharges}
              readOnly
              placeholder="00000"
              style={{ borderRadius: "8px", backgroundColor: "#F2DFC4" }}
            />
          </div>
          <div className="form-item">
            <label htmlFor="finalRate">Final rate with GST</label>
            <input
              type="text"
              id="finalRate"
              name="finalRate"
              value={formDetails.finalRate}
              readOnly
              placeholder="000000"
              style={{ borderRadius: "8px", backgroundColor: "#F2DFC4" }}
            />
          </div>
        </div>
      </IonContent>
      <IonFooter>
        <CustomTabBar />
      </IonFooter>

      <LoginModel isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </IonPage>
  );
};

export default Calculator;
