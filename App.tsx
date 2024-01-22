import React from 'react';
import AppStack from './src/routes';
import BottomIcons from './src/components/bottomIcons';
import NetStatusInfo from './src/components/netStatusInfo';
import GpsStatusInfo from './src/components/gpsStatusInfo';

import {NavigationContainer} from '@react-navigation/native';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <NetStatusInfo />
      <GpsStatusInfo />
      <AppStack />
      <BottomIcons />
    </NavigationContainer>
  );
};

export default App;
