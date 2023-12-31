import {useEffect, useState} from 'react';
import {useBetween} from 'use-between';
import {getWeatherData} from '../../../services/getWeather';
import {getForecast} from '../../../services/getForecast';
import fetchWeatherData from '../../../services/openMeteo/openMeteo';
import fetchForecastData from '../../../services/openMeteo/nextForecast';

export const useStateVariables = () => {
  const [humidity, setHumidity] = useState(0);
  const [precipitation, setPrecipitation] = useState(0);
  const [temperature, setTemperature] = useState([]);
  const [description, setDescription] = useState('');
  const [windSpeed, setWindSpeed] = useState(0);
  const [date, setDate] = useState([]);
  const [temperatureHourly, setTemperatureHourly] = useState([]);
  const [nextFourHours, setNextFourHours] = useState([]);

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
    temperatureHourly,
    setTemperatureHourly,
    nextFourHours,
    setNextFourHours,
  };
};

export const useSharedState = () => useBetween(useStateVariables);

export const useInit = () => {
  const {
    temperatureHourly,
    nextFourHours,
    setHumidity,
    setPrecipitation,
    setTemperature,
    setDescription,
    setWindSpeed,
    setTemperatureHourly,
    setNextFourHours,
  } = useSharedState();
  useEffect(() => {
    console.log('useInit funcionando em Home!!');

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
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const twoDigitHour = (currentHour < 10 ? '0' : '') + currentHour;
        const index = parseInt(twoDigitHour, 10);
        //clean the previous data to not store unecessarry data many times
        if (nextFourHours.length === 0) {
          setNextFourHours([]);
        }
        if (temperatureHourly.length === 0) {
          setNextFourHours([]);
        }
        for (let i = index; i < index + 4; i++) {
          setTemperatureHourly(prevState => [
            ...prevState,
            weatherData.hourly.temperature2m[i].toString().slice(0, 2),
          ]);
          setNextFourHours(prevState => [...prevState, i]);
        }
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };
    // ================================================
    fetchOpenMeteoData();
    // ================================================
    const fetchForecast = async () => {
      try {
        const forecastData = await fetchForecastData();
        console.log('forecastData === ', forecastData);
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };
    // ================================================
    fetchForecast();
    // ================================================
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
