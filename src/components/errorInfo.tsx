import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import {useSharedState} from '../screens/Home/logic';
import {Linking} from 'react-native';
import {requestLocationPermission} from '../services/askPermission';

const ErrorInfo = () => {
  const {locationPermission} = useSharedState();
  const handlePress = () => {
    console.log('locationPermission = ', locationPermission);
    requestLocationPermission();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Permission {'\n'} Not Granted</Text>
      <View style={styles.background}>
        <LottieView
          source={require('../assets/animations/travel.json')}
          style={styles.lottieView}
          loop
          autoPlay
        />
      </View>
      <Text style={styles.text}>
        Press the Buton below to request permission again.
        {'\n'}
        {'\n'}If needed, you can go to Settings and check if the permission is
        granted.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openSettings()}>
          <Text style={styles.buttonText}>CHECK PERMISSION</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>REQUEST PERMISSION</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center vertically
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
    padding: 20,
  },
  background: {
    backgroundColor: 'white',
    borderRadius: 200, // Adjust the border radius as needed
    padding: 10, // Adjust the padding as needed
  },
  lottieView: {
    width: 300, // Adjust the width of the LottieView as needed
    height: 300, // Adjust the height of the LottieView as needed
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ErrorInfo;
