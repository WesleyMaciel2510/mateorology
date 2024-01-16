import Geolocation from '@react-native-community/geolocation';
type Position = {
  positionLatitude: string;
  positionLongitude: string;
};
export const getPosition = (): Promise<Position> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const positionLatitude = position.coords.latitude.toFixed(4);
        const positionLongitude = position.coords.longitude.toFixed(4);
        resolve({positionLatitude, positionLongitude});
      },
      error => {
        console.error('ERROR IN GETPOSITION = ', error);
        reject(error);
      },
    );
  });
};
