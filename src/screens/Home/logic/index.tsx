import {useEffect, useState} from 'react';
import {useBetween} from 'use-between';
import fetchWeatherData from '../../../services/openMeteo/openMeteo';
import fetchForecastData from '../../../services/openMeteo/nextForecast';
import {
  requestLocationPermission,
  checkLocationPermission,
} from '../../../services/askPermission';
import {PermissionsAndroid} from 'react-native';

type PositionType = {
  latitude: number;
  longitude: number;
};

export const useStateVariables = () => {
  const [locationPermission, setLocationPermission] = useState(false);
  const [cityName, setCityName] = useState('');
  const [humidity, setHumidity] = useState(0);
  const [precipitation, setPrecipitation] = useState(0);
  const [temperature, setTemperature] = useState([]);
  const [windSpeed, setWindSpeed] = useState('');
  const [date, setDate] = useState([]);
  const [temperatureHourly, setTemperatureHourly] = useState([]);
  const [nextFourHours, setNextFourHours] = useState([]);
  const [week, setWeek] = useState([]);
  const [forecastTemperature, setForecastTemperature] = useState<{
    temperature2mMin: string[];
    temperature2mMax: string[];
  }>({temperature2mMin: [], temperature2mMax: []});
  const [position, setPosition] = useState<PositionType | null>(null);
  const [weatherCode, setWeatherCode] = useState(null);

  return {
    locationPermission,
    setLocationPermission,
    cityName,
    setCityName,
    humidity,
    setHumidity,
    precipitation,
    setPrecipitation,
    temperature,
    setTemperature,
    windSpeed,
    setWindSpeed,
    date,
    setDate,
    temperatureHourly,
    setTemperatureHourly,
    nextFourHours,
    setNextFourHours,
    week,
    setWeek,
    forecastTemperature,
    setForecastTemperature,
    position,
    setPosition,
    weatherCode,
    setWeatherCode,
  };
};

export const useSharedState = () => useBetween(useStateVariables);

export const useInit = () => {
  const {
    setLocationPermission,
    setCityName,
    temperatureHourly,
    nextFourHours,
    setHumidity,
    setPrecipitation,
    setTemperature,
    setWindSpeed,
    setTemperatureHourly,
    setNextFourHours,
    setForecastTemperature,
    setWeatherCode,
  } = useSharedState();
  useEffect(() => {
    console.log('useInit funcionando em Home!!');

    // ================================================
    //Asking for Permission only if not granted to optimize the app
    const requestLocation = async () => {
      const locationStatus = await requestLocationPermission();

      if (locationStatus === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('1 @ PEGOU PERMISSAO !');
        setLocationPermission(true);
      }
      if (locationStatus === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log('O USUÁRIO DEVE LIMPAR OS DADOS');
      }
    };
    const checkLocation = async () => {
      const locationStatus = await checkLocationPermission();
      console.log('Location permission:', locationStatus);
      if (locationStatus === false) {
        requestLocation();
      } else {
        setLocationPermission(true);
      }
    };
    checkLocation();

    // ================================================
    const fetchOpenMeteoData = async () => {
      try {
        const weatherData = await fetchWeatherData();
        console.log('2 @ PEGOU weatherData !');

        // TITLE  ===================================
        setCityName(weatherData.current.name);
        //formatting to use one decimal number in case of temperatures below 10
        function formatTemperatureData(temperature) {
          const temperatureString = temperature.toString();
          const hasDecimal = temperatureString.includes('.');
          return hasDecimal
            ? temperatureString.slice(0, 2).replace(/\.+$/, '')
            : temperatureString.slice(0, 1);
        }
        const formattedTemperature = formatTemperatureData(
          weatherData.current.temperature2m,
        );
        const formattedTempMin = formatTemperatureData(
          weatherData.daily.temperature2mMin[0],
        );
        const formattedTempMax = formatTemperatureData(
          weatherData.daily.temperature2mMax[0],
        );
        // ================================================
        // filling the variables here
        setWeatherCode(weatherData.current.weatherCode);

        setTemperature([
          formattedTemperature,
          formattedTempMin,
          formattedTempMax,
        ]);
        /* console.log(
          'Wind Speed at 10m Km/h= ',
          weatherData.current.windSpeed10m.toString().slice(0, 3),
        ); */
        setHumidity(weatherData.current.relativeHumidity2m);
        //console.log('precipitation === ', weatherData.current.precipitation);
        //console.log('rain === ', weatherData.current.rain);
        /* console.log(
          'precipitationSum === ',
          weatherData.daily.precipitationSum,
        ); */

        setWindSpeed(weatherData.current.windSpeed10m.toString().slice(0, 2));
        // TODAY AREA ===================================
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const twoDigitHour = (currentHour < 10 ? '0' : '') + currentHour;
        const index = parseInt(twoDigitHour, 10);
        //clean the previous data to not store unnecessary data many times
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
        //formatting to get only the two digits of the arrays
        const oldArrayMin = forecastData.daily.temperature2mMin;
        const formattedArrayToMin = oldArrayMin.map((value: string) => {
          const formattedValue = parseInt(value, 10).toString();
          return formattedValue;
        });
        //console.log('formattedArrayMin === ', formattedArrayToMin);
        // ----------------------------------------------------------
        const oldArrayMax = forecastData.daily.temperature2mMax;
        const formattedArrayToMax = oldArrayMax.map((value: string) => {
          const formattedValue = parseInt(value, 10).toString();
          return formattedValue;
        });
        //console.log('formattedArrayMax === ', formattedArrayToMax);

        // ----------------------------------------------------------
        const newTemperatureObject = {
          temperature2mMin: formattedArrayToMin,
          temperature2mMax: formattedArrayToMax,
        };
        setForecastTemperature(newTemperatureObject);
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };
    // ================================================
    fetchForecast();
    // ================================================
  }, []);
  useOnGetDate();
  useOnGetWeek();
};

export const useOnGetDate = () => {
  const {setDate} = useSharedState();
  useEffect(() => {
    //console.log('chamou useOnGetDate');
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

export const useOnGetWeek = () => {
  const {setWeek} = useSharedState();

  const getWeekdays = () => {
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const today = new Date();
    const currentDayIndex = today.getDay();
    const currentWeekdays = [];

    for (let i = 0; i < 7; i++) {
      const index = (currentDayIndex + i) % 7;
      currentWeekdays.push(weekdays[index]);
    }

    return currentWeekdays;
  };

  useEffect(() => {
    const weekDays = getWeekdays();
    setWeek(weekDays);
  }, [setWeek]);
};
