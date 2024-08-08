import { useEffect } from 'react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { useIonViewWillEnter, useIonViewDidLeave } from '@ionic/react';

const useStatusBar = (options) => {
  useIonViewWillEnter(() => {
    if (options.overlay !== undefined) {
      StatusBar.setOverlaysWebView({ overlay: options.overlay });
    }
    if (options.style !== undefined) {
      StatusBar.setStyle({ style: options.style });
    }
    if (options.color !== undefined) {
      StatusBar.setBackgroundColor({ color: options.color });
    }
  });

  useIonViewDidLeave(() => {
    // Reset to default status bar style if needed
    StatusBar.setOverlaysWebView({ overlay: false });
    StatusBar.setStyle({ style: Style.Light }); // Default style
    StatusBar.setBackgroundColor({ color: '#F8EBD8' }); // Default color
  });
};

export default useStatusBar;
