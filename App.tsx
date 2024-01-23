import React from 'react';
import AppStack from './src/routes';
import BottomIcons from './src/components/bottomIcons';
import NetStatusInfo from './src/components/netStatusInfo';
import GpsStatusInfo from './src/components/gpsStatusInfo';
import {useSharedState} from './src/screens/Home/logic';
import Spinner from 'react-native-loading-spinner-overlay';

import {NavigationContainer} from '@react-navigation/native';

const App: React.FC = () => {
  const {locationPermission, loading} = useSharedState();
  return (
    <NavigationContainer>
      <Spinner
        visible={loading}
        textContent={'Fetching Weather Data...'}
        textStyle={{color: '#FFF'}}
      />
      <NetStatusInfo />
      {locationPermission && locationPermission === !null ? (
        <GpsStatusInfo />
      ) : null}
      <AppStack />
      <BottomIcons />
    </NavigationContainer>
  );
};

export default App;
