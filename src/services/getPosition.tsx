import Geolocation from '@react-native-community/geolocation';

export const getPosition = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error),
    );
  });
};
