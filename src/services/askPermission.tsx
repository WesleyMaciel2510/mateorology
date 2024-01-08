import {PermissionsAndroid} from 'react-native';

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //console.log('Permission granted!');
    }
    return granted;
  } catch (err) {
    console.warn('Deu erro = ', err);
  }
};

export const checkLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return granted;
  } catch (err) {
    console.warn(err);
    return false;
  }
};
