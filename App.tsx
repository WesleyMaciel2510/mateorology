import React from 'react';
import AppStack from './src/routes';
import BottomIcons from './src/components/bottomIcons';
import NetStatusInfo from './src/components/netStatusInfo';
import GpsStatusInfo from './src/components/gpsStatusInfo';

import {NavigationContainer} from '@react-navigation/native';
import {useSharedState} from './src/screens/Home/logic';

const App: React.FC = () => {
  const {internetOn, gpsOn} = useSharedState();

  return (
    <NavigationContainer>
      {internetOn ? null : <NetStatusInfo />}
      {!gpsOn ? <GpsStatusInfo /> : null}
      <AppStack />
      <BottomIcons />
    </NavigationContainer>
  );
};

export default App;
