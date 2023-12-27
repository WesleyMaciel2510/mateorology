import React from 'react';
import {View, StyleSheet} from 'react-native';
import Weather from './src/services/weather';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Weather />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
