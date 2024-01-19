import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useSharedState} from '../screens/Home/logic';

const GpsStatusInfo = () => {
  const {gpsOn, setGpsOn} = useSharedState();

  const handlePress = () => {
    setGpsOn(true);
    console.log('apertou DIMISS');
    console.log('gpsOn = ', gpsOn);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No GPS Location provider detected.</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>DIMISS</Text>
      </TouchableOpacity>
    </View>
  );
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
