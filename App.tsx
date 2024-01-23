import React from 'react';
import AppStack from './src/routes';
import BottomIcons from './src/components/bottomIcons';
import NetStatusInfo from './src/components/netStatusInfo';
import GpsStatusInfo from './src/components/gpsStatusInfo';
import {useSharedState} from './src/screens/Home/logic';

import {NavigationContainer} from '@react-navigation/native';

const App: React.FC = () => {
  const {locationPermission} = useSharedState();
  return (
    <NavigationContainer>
      <NetStatusInfo />
      {locationPermission ? <GpsStatusInfo /> : null}
      <AppStack />
      <BottomIcons />
    </NavigationContainer>
  );
};

export default App;
