import {useEffect, useState} from 'react';
import {useBetween} from 'use-between';

export const useStateVariables = () => {
  const [humidity, setHumidity] = useState(0);

  return {
    humidity,
    setHumidity,
  };
};

export const useSharedState = () => useBetween(useStateVariables);

export const useInit = () => {
  const {} = useSharedState();
  useEffect(() => {
    console.log('chamou useInit');
  }, []);
};
