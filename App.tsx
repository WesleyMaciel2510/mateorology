import React from 'react';
import AppStack from './src/routes';
import BottomIcons from './src/components/bottomIcons';
import {NavigationContainer} from '@react-navigation/native';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AppStack />
      <BottomIcons />
    </NavigationContainer>
  );
};

export default App;
