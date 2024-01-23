import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useSharedState} from '../screens/Home/logic';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';

const NetStatusInfo = ({}) => {
  const {internetOn, setInternetOn} = useSharedState();

  useEffect(() => {
    // Subscribe to the event
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      if (state.isConnected) {
        console.log('Internet is ON');
        setInternetOn(true);
      } else {
        console.log('Internet is OFF');
        setInternetOn(false);
      }
    });

    // Manually check the initial internet connection status
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        setInternetOn(true);
      } else {
        setInternetOn(false);
      }
    });

    // Return a cleanup function to unsubscribe when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, [setInternetOn]);

  const handlePress = () => {
    setInternetOn(true);
  };

  return !internetOn ? (
    <View style={styles.container}>
      <Text style={styles.text}>No internet connection detected.</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>DISMISS</Text>
      </TouchableOpacity>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'red',
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

export default NetStatusInfo;
