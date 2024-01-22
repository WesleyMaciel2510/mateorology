import {PermissionsAndroid, Alert} from 'react-native';

export const requestLocationPermission = async () => {
  try {
    console.log('chamou requestLocationPermission in askPermission');

    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    console.log('result = ', result);

    if (result === PermissionsAndroid.RESULTS.result) {
      console.log('Permission result!');
    } else {
      console.log('Permission NOT result!');
      Alert.alert(
        'Permission Denied',
        'Please grant location permission to use the app.',
      );
    }
    return result;
  } catch (err) {
    console.error('Deu erro = ', err);
  }
};

export const checkLocationPermission = async () => {
  try {
    const result = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return result;
  } catch (err) {
    console.warn('ERROR IN checkLocationPermission =', err);
    return false;
  }
};
