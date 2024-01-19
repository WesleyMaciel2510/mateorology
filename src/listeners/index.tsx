import {useEffect} from 'react';
import {gpsListener} from './gpsListener';
import {internetListener} from './internetListener';
import {useSharedState} from '../screens/Home/logic';

export const useStartListeners = () => {
  const {setInternetOn, setGpsOn} = useSharedState();
  useEffect(() => {
    setInterval(gpsListener, 5000);

    const netStatus = internetListener();
    console.log('internetStatus = ', netStatus);
  }, [setGpsOn, setInternetOn]);
};
