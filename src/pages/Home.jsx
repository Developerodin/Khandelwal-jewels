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

  useStatusBar({
    overlay: false,
    style: Style.Light,
    color: '#F8EBD8'
  });

  useEffect(() => {
    axios
      .get(`${Base_url}get_price`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const sortedPrices = response.data.post.sort((a, b) => {
          if (a.id === "6") return -1;
          if (b.id === "6") return 1;
          return a.id - b.id;
        });
        setPrices(sortedPrices);
      })
      .catch((error) => {
        console.error("Error fetching prices:", error);
      });
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

            {prices.length > 0 &&
              prices.map((price) => (
                <IonCard className="custom-card" key={price.id}>
                  <IonCardHeader style={{ paddingBottom: "0" }}>
                    <div className="price-row">
                      <IonCardTitle
                        style={{
                          fontSize: "19px",
                          lineHeight: "22px",
                          color: "#B87115",
                          fontWeight: "700",
                          paddingBottom: "0",
                        }}
                      >
                        {price.name}
                      </IonCardTitle>
                      <span> ₹ {formatPrice(parseFloat(price.price) * 10)}</span>
                    </div>
                  </IonCardHeader>

                  <IonCardContent className="custom-content">
                    {price.name === "24k & 91.6 Gold" && (
                      <>
                        <div className="price-row">
                          <span>Making: 2%</span>
                          <span>
                            ₹ {formatPrice(calculateFinalPrice(price.price * 10, 2))}
                          </span>
                        </div>
                        <div className="price-row">
                          <span>GST: 3%</span>
                          <span>
                            ₹ {formatPrice(calculateFinalPriceWithGst(price.price * 10, 2))}
                          </span>
                        </div>
                      </>
                    )}
                    {price.name === "916 Hallmark" && (
                      <>
                        <div className="price-row">
                          <span>Making: 11.35%</span>
                          <span>
                            ₹ {formatPrice(calculateFinalPrice(price.price * 10, 11.35))}
                          </span>
                        </div>
                        <div className="price-row">
                          <span>GST: 3%</span>
                          <span>
                            ₹ {formatPrice(calculateFinalPriceWithGst(price.price * 10, 11.35))}
                          </span>
                        </div>
                      </>
                    )}

                    {price.name === "Old Gold 916" && (
                      <div className="price-row">
                        <span>Making: -8.4%</span>
                        <span>
                          ₹ {formatPrice(calculateFinalPrice(price.price * 10, -8.4))}
                        </span>
                      </div>
                    )}
                  </IonCardContent>
                </IonCard>
              ))}
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

export default Home;
