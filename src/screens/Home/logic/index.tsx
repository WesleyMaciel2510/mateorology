import {useEffect, useState} from 'react';
import {useBetween} from 'use-between';
import {getWeatherData} from '../../../services/getWeather';

export const useStateVariables = () => {
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [temperature, setTemperature] = useState([]);
  const [description, setDescription] = useState('');
  const [windSpeed, setWindSpeed] = useState(0);

  return {
    humidity,
    setHumidity,
    pressure,
    setPressure,
    temperature,
    setTemperature,
    description,
    setDescription,
    windSpeed,
    setWindSpeed,
  };
};

export const useSharedState = () => useBetween(useStateVariables);

export const useInit = () => {
  const {
    setHumidity,
    setPressure,
    setTemperature,
    setDescription,
    setWindSpeed,
  } = useSharedState();
  useEffect(() => {
    console.log('useInit funcionando em Home!!');
    const fetchData = async () => {
      try {
        const weatherData = await getWeatherData();
        setHumidity(weatherData.main.humidity);
        setPressure(weatherData.main.pressure);
        setTemperature([
          weatherData.main.temp,
          weatherData.main.temp_min,
          weatherData.main.temp_max,
        ]);
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };
    fetchData();
  }, []);
};
