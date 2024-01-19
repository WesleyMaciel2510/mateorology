import NetInfo from '@react-native-community/netinfo';

export const internetListener = () => {
  let internetStatus: boolean;
  NetInfo.addEventListener(state => {
    if (state.isConnected) {
      console.log('Internet is ON');
      internetStatus = true;
    } else {
      console.log('Internet is OFF');
      internetStatus = false;
    }
    return internetStatus;
  });
};
