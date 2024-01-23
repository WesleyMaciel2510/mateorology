import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useSharedState} from '../screens/Home/logic';
import Geolocation from '@react-native-community/geolocation';

const GpsStatusInfo = () => {
  const {locationPermission, gpsOn, setGpsOn} = useSharedState();
  if (locationPermission) {
    Geolocation.watchPosition(
      () => {
        console.log('GPS STATUS = ', gpsOn);
        console.log('GPS DETECTADO COMO ON');
        setGpsOn(true);
      },
      error => {
        console.log('GPS STATUS = ', gpsOn);
        console.log('GPS DETECTADO COMO OFF');
        console.error(error);
        setGpsOn(false);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }

  const handlePress = () => {
    setGpsOn(true);
    console.log('apertou DIMISS');
    console.log('gpsOn = ', gpsOn);
  };
  return !gpsOn ? (
    <View style={styles.container}>
      <Text style={styles.text}>No GPS Location provider detected.</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>DIMISS</Text>
      </TouchableOpacity>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'orange',
    padding: 10,
    alignItems: 'center',
    paddingRight: 20,
  },
  text: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'left',
    paddingLeft: 20,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default GpsStatusInfo;
