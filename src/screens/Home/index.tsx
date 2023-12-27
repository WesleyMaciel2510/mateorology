import React from 'react';
import Weather from '../../services/getWeather';
import BottomIcons from '../../components/bottomIcons';
import {StatusBar, StyleSheet, View} from 'react-native';

interface Props {
  navigation: any;
}

export default function Home(props: Props) {
  // ============================================================================
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: false, // Set this to false to hide the header
      headerLeft: () => null, // Hide the back arrow
    });
  }, [props.navigation]);
  // ============================================================================
  return (
    <>
      <StatusBar backgroundColor={'#30acdd'} />
      <View style={styles.container}>
        <Weather />
        <BottomIcons />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#30acdd',
  },
});
