import {useEffect, useState} from 'react';
import {useBetween} from 'use-between';
import {getWeatherData} from '../../../services/getWeather';
import {getForecast} from '../../../services/getForecast';
import fetchWeatherData from '../../../services/openMeteo/openMeteo';

export const useStateVariables = () => {
  const [humidity, setHumidity] = useState(0);
  const [precipitation, setPrecipitation] = useState(0);
  const [temperature, setTemperature] = useState([]);
  const [description, setDescription] = useState('');
  const [windSpeed, setWindSpeed] = useState(0);
  const [date, setDate] = useState([]);

  return {
    humidity,
    setHumidity,
    precipitation,
    setPrecipitation,
    temperature,
    setTemperature,
    description,
    setDescription,
    windSpeed,
    setWindSpeed,
    date,
    setDate,
  };
};

export const useSharedState = () => useBetween(useStateVariables);

export const useInit = () => {
  const {
    setHumidity,
    setPrecipitation,
    setTemperature,
    setDescription,
    setWindSpeed,
  } = useSharedState();
  useEffect(() => {
    console.log('useInit funcionando em Home!!');
    //fetchWeatherData();

    // ================================================
    const fetchOpenMeteoData = async () => {
      try {
        const weatherData = await fetchWeatherData();
        // TITLE  ===================================
        setTemperature([
          weatherData.current.temperature2m.toString().slice(0, 2),
          weatherData.daily.temperature2mMin[0].toString().slice(0, 2),
          weatherData.daily.temperature2mMax[0].toString().slice(0, 2),
        ]);
        console.log(
          'Wind Speed at 10m Km/h= ',
          weatherData.current.windSpeed10m.toString().slice(0, 3),
        );

        setWindSpeed(weatherData.current.windSpeed10m.toString().slice(0, 3));
        // TODAY AREA ===================================
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };
    fetchOpenMeteoData();
    // ================================================

    /* const fetchData = async () => {
      try {
        const weatherData = await getForecast();
        //setHumidity(weatherData.main.humidity);
        console.log('weatherData === ', weatherData);

        //setPrecipitation(weatherData.main.rain);

        // setTemperature([
        //  weatherData.main.temp.toString().slice(0, 2),
        //  weatherData.main.temp_min,
        //  weatherData.main.temp_max,
        //]);
        //setDescription(weatherData.weather[0].description);
        //setWindSpeed(weatherData.wind.speed);
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };
    fetchData(); */
  }, []);
  useOnGetDate();
};

export const useOnGetDate = () => {
  const {setDate} = useSharedState();
  useEffect(() => {
    console.log('chamou useOnGetDate');
    const getCurrentDate = () => {
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = getCurrentMonth(currentDate.getMonth());

      setDate([day, month]);
    };

    const getCurrentMonth = (monthIndex: number): string => {
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      return months[monthIndex];
    };

    getCurrentDate();
  }, [setDate]);
};

/* export const useOnAnimation = () => {
}; */
