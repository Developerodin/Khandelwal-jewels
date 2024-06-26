import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home.jsx';
import Coin from './pages/Coin.jsx';
import Calculator from './pages/Calculator.jsx';
import Profile from './pages/Profile.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import LoginOtp from './pages/LoginOtp.jsx';
import Signup from './pages/Signup.jsx';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App = () => {
  const Auth = localStorage.getItem("Auth") || false;

return <IonApp>
    <IonReactRouter>
      
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/coin">
            <Coin />
          </Route>
          <Route  path="/calculator">
            <Calculator />
          </Route>
          <Route  path="/profile">
            <Profile />
          </Route>
          <Route  path="/contact">
            <Contact />
          </Route>
          <Route  path="/login">
            <Login />
          </Route>
          <Route  path="/loginotp">
            <LoginOtp />
          </Route>
          <Route  path="/signup">
            <Signup />
          </Route>
          <Route exact path="/">
            <Redirect to="/Login" />
          </Route>
          <Redirect  path="/" to={Auth ? "/home" : "/Login" }  exact/>
        </IonRouterOutlet>
        
      
    </IonReactRouter>
  </IonApp>
};

export default App;