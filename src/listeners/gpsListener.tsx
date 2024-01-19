import Geolocation from '@react-native-community/geolocation';

export const gpsListener = () => {
  let gpsStatus: boolean;
  Geolocation.getCurrentPosition(
    () => {
      gpsStatus = true;
      console.log('gpsStatus = ', gpsStatus);
    },
    error => {
      gpsStatus = false;
      console.error(error);
    },
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
  );
  return gpsStatus;
};
