import {useEffect, useState} from 'react';
import {useBetween} from 'use-between';
import {
  getWeatherData,
  getForecast,
  getWeatherDataByCity,
} from '../../../services/getWeather';

export const useStateVariables = () => {
  const [searchText, setSearchText] = useState('');

  return {
    searchText,
    setSearchText,
  };
};

export const useSharedState = () => useBetween(useStateVariables);

export const useInit = () => {
  const {setSearchText} = useSharedState();
  useEffect(() => {
    console.log('useInit funcionando em Search!!');
  }, []);
};
