import NetInfo from '@react-native-community/netinfo';

export const internetListener = () => {
  NetInfo.addEventListener(state => {
    console.log('Connection type:', state.type); // 'wifi' or 'cellular' or 'none'
    console.log('Is connected?', state.isConnected);

    if (state.isConnected) {
      console.log('Internet is ON');
    } else {
      console.log('Internet is OFF');
    }
  });
};
