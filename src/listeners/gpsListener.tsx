import Geolocation from '@react-native-community/geolocation';

export const gpsListener = () => {
  // Check GPS status initially
  Geolocation.getCurrentPosition(
    position => {
      console.log('GPS is ON');
    },
    error => {
      if (error.code === 2) {
        console.log('GPS is OFF');
      }
    },
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
  );
  // Use setInterval for periodic checks on GPS status
  const checkGpsStatus = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('GPS is ON');
      },
      error => {
        console.log('GPS is OFF');
      },
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 3000},
    );
  };

  // Call checkGpsStatus every 10 seconds (adjust as needed)
  const intervalId = setInterval(checkGpsStatus, 10000);

  // Optionally, you can return the intervalId if you need to clear the interval later
  return intervalId;
};
