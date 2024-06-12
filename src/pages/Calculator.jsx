import React, { useEffect, useState } from "react";
import { IonContent, IonHeader, IonPage, IonFooter } from "@ionic/react";
import "./Calculator.css";
import CustomTabBar from "../components/CustomTabBar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Base_url } from "../config/BaseUrl.jsx";

const gstPercentage = 0.03;

const ratesTable = {
  Coins: { makingChargesPercentage: 0.02 },
  Bars: { makingChargesPercentage: 0.02 },
  Jewellery: { makingChargesPercentage: 0.1 },
  Others: { makingChargesPercentage: 0.1 },
};

const Calculator = () => {
  const [formDetails, setFormDetails] = useState({
    type: "",
    coin: "",
    makingCharges: 0,
    finalRate: 0,
  });
  const [goldRatePerGram, setGoldRatePerGram] = useState(0);

  const types = ["Coins", "Bars", "Jewellery", "Others"];
  const coins = ["1gm", "2gm", "5gm", "10gm", "25gm", "50gm", "75gm", "100gm"];

  useEffect(() => {
    axios.get(`${Base_url}get_price`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        const priceData = response.data.post.find(price => price.name === "24k & 91.6 Gold");
        if (priceData) {
          setGoldRatePerGram(parseFloat(priceData.price));
        }
      })
      .catch(error => {
        console.error('Error fetching gold price:', error);
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
      const gst = goldCost * gstPercentage;
      const finalRate = goldCost + makingCharges + gst;

      updatedDetails.makingCharges = makingCharges.toFixed(2);
      updatedDetails.finalRate = finalRate.toFixed(2);
    } else {
      updatedDetails.makingCharges = 0;
      updatedDetails.finalRate = 0;
    }

    setFormDetails(updatedDetails);
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
            <label htmlFor="coin">Enter Weight for the item</label>

            <input
              list="coin-list"
              id="coin"
              name="coin"
              value={formDetails.coin}
              onChange={handleSelection}
              placeholder="eg. 10 gms"
            />
            <datalist id="coin-list">
              {coins.map((coin, index) => (
                <option key={index} value={coin} style={{ color: 'blue', backgroundColor: 'yellow' }} />
              ))}
            </datalist>
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
    </IonPage>
  );
};

export default Calculator;
